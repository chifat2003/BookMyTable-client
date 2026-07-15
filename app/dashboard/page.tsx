"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { fetchReservationsByEmail } from "@/lib/api";
import type { Reservation } from "@/lib/api";

export default function DashboardPage() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isPending && !session?.user?.email) {
      router.push("/login");
      return;
    }

    if (session?.user?.email) {
      fetchReservationsByEmail(session.user.email)
        .then(setReservations)
        .catch(() => setReservations([]))
        .finally(() => setLoading(false));
    }
  }, [session, isPending, router]);

  if (isPending || loading) {
    return (
      <main className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mb-4"></div>
          <p className="text-gray-500">Loading reservations...</p>
        </div>
      </main>
    );
  }

  if (!session?.user?.email) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">My Reservations</h1>
          <p className="text-gray-500 mt-2">Manage all your restaurant bookings in one place</p>
        </div>

        {/* User Info */}
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-6 mb-8 text-white">
          <p className="text-sm opacity-90">Logged in as</p>
          <p className="text-lg font-semibold">{session.user.name || session.user.email}</p>
        </div>

        {/* Reservations */}
        {reservations.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
            <span className="text-6xl block mb-4">📅</span>
            <p className="text-lg font-semibold text-gray-900 mb-2">No reservations yet</p>
            <p className="text-gray-500 mb-6">Start exploring restaurants and make your first reservation!</p>
            <a
              href="/restaurants"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
            >
              Browse Restaurants
            </a>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-sm text-gray-600">
                Total reservations: <span className="font-semibold text-gray-900">{reservations.length}</span>
              </p>
            </div>
            <div className="grid gap-4">
              {reservations.map((reservation) => (
                <ReservationCard key={reservation.id} reservation={reservation} />
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}

function ReservationCard({ reservation }: { reservation: Reservation }) {
  const statusColors: Record<string, { bg: string; text: string; icon: string }> = {
    pending: { bg: "bg-yellow-50", text: "text-yellow-700", icon: "⏳" },
    confirmed: { bg: "bg-green-50", text: "text-green-700", icon: "✓" },
    cancelled: { bg: "bg-red-50", text: "text-red-700", icon: "✕" },
  };

  const status = statusColors[reservation.status] || statusColors.pending;
  const resDate = new Date(reservation.date);
  const today = new Date();
  const isUpcoming = resDate > today;

  return (
    <div className={`rounded-2xl border p-6 shadow-sm hover:shadow-md transition-all ${status.bg}`}>
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        {/* Left: Details */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">{status.icon}</span>
            <span className={`text-sm font-bold px-3 py-1 rounded-full ${status.text} bg-white`}>
              {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
            </span>
            {isUpcoming && <span className="text-xs font-medium px-3 py-1 rounded-full bg-blue-100 text-blue-700">Upcoming</span>}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">Date</p>
              <p className="text-sm font-semibold text-gray-900">{resDate.toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">Time</p>
              <p className="text-sm font-semibold text-gray-900">{reservation.time}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">Guests</p>
              <p className="text-sm font-semibold text-gray-900">👥 {reservation.guests}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">Phone</p>
              <p className="text-sm font-semibold text-gray-900">{reservation.phone}</p>
            </div>
          </div>

          {reservation.note && (
            <div className="mt-4 pt-4 border-t border-gray-200 border-opacity-50">
              <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">Special Requests</p>
              <p className="text-sm text-gray-700">{reservation.note}</p>
            </div>
          )}
        </div>

        {/* Right: Booking Info */}
        <div className="sm:text-right">
          <p className="text-xs text-gray-500 mb-4">Booked {new Date(reservation.createdAt).toLocaleDateString()}</p>
          <button className="text-sm font-medium px-4 py-2 rounded-lg bg-white hover:bg-gray-100 transition-colors text-gray-700 border border-gray-200">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
