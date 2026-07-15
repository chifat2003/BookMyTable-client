"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { fetchRestaurants, fetchReservationsByRestaurant } from "@/lib/api";
import type { Restaurant, Reservation } from "@/lib/api";

export default function OwnerDashboardPage() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [reservationsMap, setReservationsMap] = useState<Record<string, Reservation[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isPending && !session?.user?.email) {
      router.push("/login");
      return;
    }

    if (session?.user?.email) {
      fetchRestaurants()
        .then(async (data) => {
          setRestaurants(data);
          // Fetch reservations for each restaurant
          const reservations: Record<string, Reservation[]> = {};
          for (const restaurant of data) {
            const resId = restaurant.id || restaurant._id || "";
            if (resId) {
              reservations[resId] = await fetchReservationsByRestaurant(resId).catch(() => []);
            }
          }
          setReservationsMap(reservations);
        })
        .catch(() => {
          setRestaurants([]);
          setReservationsMap({});
        })
        .finally(() => setLoading(false));
    }
  }, [session, isPending, router]);

  if (isPending || loading) {
    return (
      <main className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mb-4"></div>
          <p className="text-gray-500">Loading restaurants...</p>
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
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Owner Dashboard</h1>
          <p className="text-gray-500 mt-2">Manage reservations for your restaurants</p>
        </div>

        {restaurants.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
            <span className="text-6xl block mb-4">🏪</span>
            <p className="text-lg font-semibold text-gray-900 mb-2">No restaurants yet</p>
            <p className="text-gray-500 mb-6">Start by adding your first restaurant!</p>
            <a
              href="/restaurants/new"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
            >
              Add a Restaurant
            </a>
          </div>
        ) : (
          <div className="grid gap-8">
            {restaurants.map((restaurant) => {
              const restaurantId = restaurant.id || restaurant._id || "";
              const reservations = reservationsMap[restaurantId] || [];
              return (
                <RestaurantReservations key={restaurantId} restaurant={restaurant} reservations={reservations} />
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}

function RestaurantReservations({ restaurant, reservations }: { restaurant: Restaurant; reservations: Reservation[] }) {
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
