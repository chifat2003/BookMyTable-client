import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { fetchRestaurants, fetchReservationsByRestaurant } from "@/lib/api";
import { auth } from "@/lib/auth";

export const metadata = {
  title: "Owner Dashboard — BookMyTable",
  description: "Manage reservations for your restaurants.",
};

export default async function OwnerDashboardPage() {
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

  // For now, fetch all restaurants. In a real app, restaurants would have an owner field.
  const restaurants = await fetchRestaurants().catch(() => []);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Owner Dashboard</h1>
          <p className="text-gray-500 mt-1">Manage reservations for your restaurants</p>
        </div>

        {restaurants.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
            <span className="text-5xl block mb-3">🏪</span>
            <p className="text-gray-500 mb-4">You don't have any restaurants yet.</p>
            <a
              href="/restaurants/new"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors"
            >
              Add a Restaurant
            </a>
          </div>
        ) : (
          <div className="grid gap-8">
            {restaurants.map((restaurant) => (
              <RestaurantReservations key={restaurant.id || restaurant._id} restaurant={restaurant} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

async function RestaurantReservations({ restaurant }: { restaurant: any }) {
  const restaurantId = restaurant.id || restaurant._id;
  const reservations = await fetchReservationsByRestaurant(restaurantId).catch(() => []);

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-700",
    confirmed: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-4">
        <h2 className="text-xl font-bold text-white">{restaurant.name}</h2>
        <p className="text-orange-100 text-sm">{restaurant.location}</p>
      </div>

      <div className="p-6">
        {reservations.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No reservations for this restaurant yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Date & Time</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Guests</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Phone</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((reservation) => {
                  const statusColor = statusColors[reservation.status] || "bg-gray-100 text-gray-700";
                  return (
                    <tr key={reservation.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium text-gray-900">{reservation.name}</td>
                      <td className="py-3 px-4 text-gray-600">
                        {reservation.date} at {reservation.time}
                      </td>
                      <td className="py-3 px-4 text-gray-600">{reservation.guests}</td>
                      <td className="py-3 px-4 text-gray-600">{reservation.phone}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${statusColor}`}>
                          {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
