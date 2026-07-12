import Image from "next/image";
import Link from "next/link";
import restaurantsData from "@/data/restaurants.json";

type Restaurant = {
  id: string;
  name: string;
  image: string;
  cuisine: string;
  location: string;
  rating: number;
  priceRange: string;
};

const restaurants: Restaurant[] = restaurantsData.restaurants.map((r: any) => ({
  id: r.id,
  name: r.name,
  image: r.image,
  cuisine: r.cuisine,
  location: r.location,
  rating: r.rating,
  priceRange: r.priceRange,
}));

const RestaurantCard = ({ restaurant }: { restaurant: Restaurant }) => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 group">
    <div className="relative h-48 bg-gradient-to-br from-orange-100 to-amber-50 flex items-center justify-center overflow-hidden">
      <span className="text-6xl">🍴</span>
      <span className="absolute top-3 right-3 bg-white text-orange-500 text-xs font-bold px-2 py-1 rounded-full shadow">
        {restaurant.priceRange}
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

const PopularRestaurants = () => {
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map((r) => (
            <RestaurantCard key={r.id} restaurant={r} />
          ))}
        </div>

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
