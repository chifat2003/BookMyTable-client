import Link from "next/link";
import type { RestaurantDetail } from "../restaurantData";

type Props = { restaurant: RestaurantDetail };

const RestaurantDetailHero = ({ restaurant }: Props) => {
  return (
    <section className="pt-16">
      {/* Banner */}
      <div className="relative h-64 sm:h-80 bg-gradient-to-br from-orange-400 to-amber-300 flex items-center justify-center">
        <span className="text-8xl opacity-30">🍽️</span>
        <div className="absolute inset-0 bg-black/20" />
        {/* Breadcrumb */}
        <nav className="absolute top-4 left-4 sm:left-8 flex items-center gap-2 text-sm text-white/80">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link href="/restaurants" className="hover:text-white transition-colors">Restaurants</Link>
          <span>/</span>
          <span className="text-white font-medium">{restaurant.name}</span>
        </nav>
      </div>

      {/* Info bar */}
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 flex-wrap mb-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{restaurant.name}</h1>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${restaurant.openNow ? "bg-green-100 text-green-600" : "bg-red-100 text-red-500"}`}>
                {restaurant.openNow ? "Open Now" : "Closed"}
              </span>
            </div>
            <div className="flex items-center gap-3 flex-wrap text-sm text-gray-500">
              <span className="text-orange-500 font-medium">{restaurant.cuisine}</span>
              <span>·</span>
              <span>{restaurant.priceRange}</span>
              <span>·</span>
              <span>📍 {restaurant.location}</span>
              <span>·</span>
              <span className="flex items-center gap-1 text-amber-500 font-semibold">
                ⭐ {restaurant.rating}
                <span className="text-gray-400 font-normal">({restaurant.reviewCount} reviews)</span>
              </span>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {restaurant.tags.map((tag) => (
                <span key={tag} className="text-xs bg-orange-50 text-orange-500 border border-orange-100 px-2 py-0.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <Link
            href="#reservation"
            className="shrink-0 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-6 py-3 rounded-xl transition-colors text-center"
          >
            Reserve a Table
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RestaurantDetailHero;
