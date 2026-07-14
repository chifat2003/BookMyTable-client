import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { fetchReservationsByEmail } from "@/lib/api";
import { auth } from "@/lib/auth";

export const metadata = {
  title: "My Reservations — BookMyTable",
  description: "View and manage your restaurant reservations.",
};

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("better-auth.session_token")?.value;

  if (!sessionCookie) {
    redirect("/login");
  }

  // Get session from better-auth
  const session = await auth.api.getSession({
    headers: {
      cookie: `better-auth.session_token=${sessionCookie}`,
    },
  });

  if (!session?.user?.email) {
    redirect("/login");
  }

  const reservations = await fetchReservationsByEmail(session.user.email).catch(() => []);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Reservations</h1>
          <p className="text-gray-500 mt-1">View and manage all your restaurant bookings</p>
        </div>

        {reservations.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
            <span className="text-5xl block mb-3">📅</span>
            <p className="text-gray-500 mb-4">You don't have any reservations yet.</p>
            <a
              href="/restaurants"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors"
            >
              Browse Restaurants
            </a>
          </div>
        ) : (
          <div className="grid gap-4">
            {reservations.map((reservation) => (
              <ReservationCard key={reservation.id} reservation={reservation} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

function ReservationCard({ reservation }: { reservation: any }) {
  const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-700",
    confirmed: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  };

  const statusColor = statusColors[reservation.status] || "bg-gray-100 text-gray-700";

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Reservation Details</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500 text-xs font-medium uppercase tracking-wide">Date & Time</p>
              <p className="text-gray-900 font-medium">{reservation.date} at {reservation.time}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs font-medium uppercase tracking-wide">Guests</p>
              <p className="text-gray-900 font-medium">{reservation.guests}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs font-medium uppercase tracking-wide">Name</p>
              <p className="text-gray-900 font-medium">{reservation.name}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs font-medium uppercase tracking-wide">Phone</p>
              <p className="text-gray-900 font-medium">{reservation.phone}</p>
            </div>
          </div>
          {reservation.note && (
            <div className="mt-3">
              <p className="text-gray-500 text-xs font-medium uppercase tracking-wide">Notes</p>
              <p className="text-gray-700 text-sm">{reservation.note}</p>
            </div>
          )}
        </div>
        <div className="text-right">
          <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${statusColor}`}>
            {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
          </span>
          <p className="text-xs text-gray-400 mt-2">
            Booked on {new Date(reservation.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
