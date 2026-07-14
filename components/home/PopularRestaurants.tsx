import Link from "next/link";
import { fetchRestaurants, type Restaurant } from "@/lib/api";

const RestaurantCard = ({ restaurant }: { restaurant: Restaurant }) => {
  const image = restaurant.imageUrls?.[0];
  return (
  <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 group">
    <div className="relative h-48 bg-gradient-to-br from-orange-100 to-amber-50 flex items-center justify-center overflow-hidden">
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={image} alt={restaurant.name} className="w-full h-full object-cover" />
      ) : (
        <span className="text-6xl">🍴</span>
      )}
      <span className="absolute top-3 right-3 bg-white text-orange-500 text-xs font-bold px-2 py-1 rounded-full shadow">
        {restaurant.priceRange}
      </span>
      <span className={`absolute top-3 left-3 text-xs font-medium px-2 py-1 rounded-full ${restaurant.openNow ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-500"}`}>
        {restaurant.openNow ? "Open Now" : "Closed"}
      </span>
    </div>
    <div className="p-4">
      <div className="flex items-start justify-between mb-1">
        <h3 className="font-semibold text-gray-900 group-hover:text-orange-500 transition-colors">
          {restaurant.name}
        </h3>
        <span className="flex items-center gap-1 text-sm font-medium text-amber-500 shrink-0 ml-2">
          ⭐ {restaurant.rating}
        </span>
      </div>
      <p className="text-xs text-orange-500 font-medium mb-1">{restaurant.cuisine}</p>
      <p className="text-xs text-gray-400 mb-4">📍 {restaurant.location}</p>
      <Link
        href={`/restaurants/${restaurant.id}`}
        className="block w-full text-center text-sm font-medium bg-orange-50 hover:bg-orange-500 text-orange-500 hover:text-white py-2 rounded-xl transition-colors"
      >
        Reserve a Table
      </Link>
    </div>
  </div>
  );
};

const PopularRestaurants = async () => {
  const all = await fetchRestaurants().catch(() => []);
  // Show top 6 by rating
  const restaurants = [...all].sort((a, b) => b.rating - a.rating).slice(0, 6);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-orange-500 text-sm font-medium mb-1">Featured</p>
            <h2 className="text-3xl font-bold text-gray-900">Popular Restaurants</h2>
          </div>
          <Link href="/restaurants" className="text-sm font-medium text-orange-500 hover:underline hidden sm:block">
            View All →
          </Link>
        </div>

        {restaurants.length === 0 ? (
          <div className="text-center py-12 text-gray-400 text-sm">
            Could not load restaurants right now.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.map((r) => (
              <RestaurantCard key={r.id} restaurant={r} />
            ))}
          </div>
        )}

        <div className="mt-8 text-center sm:hidden">
          <Link href="/restaurants" className="text-sm font-medium text-orange-500 hover:underline">
            View All Restaurants →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularRestaurants;
