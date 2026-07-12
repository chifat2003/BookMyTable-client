import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getRestaurantDetail, allRestaurants } from "@/components/restaurants/restaurantData";
import RestaurantDetailHero from "@/components/restaurants/detail/RestaurantDetailHero";
import RestaurantInfo from "@/components/restaurants/detail/RestaurantInfo";
import MenuSection from "@/components/restaurants/detail/MenuSection";
import ReviewsSection from "@/components/restaurants/detail/ReviewsSection";
import ReservationWidget from "@/components/restaurants/detail/ReservationWidget";

type Props = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  return allRestaurants.map((r) => ({ id: r.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const restaurant = getRestaurantDetail(id);
  if (!restaurant) return { title: "Restaurant Not Found" };
  return {
    title: `${restaurant.name} — BookMyTable`,
    description: restaurant.description,
  };
}

export default async function RestaurantDetailPage({ params }: Props) {
  const { id } = await params;
  const restaurant = getRestaurantDetail(id);

  if (!restaurant) notFound();

  return (
    <main>
      <RestaurantDetailHero restaurant={restaurant} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: info + menu + reviews */}
          <div className="lg:col-span-2 space-y-10">
            <RestaurantInfo restaurant={restaurant} />
            <MenuSection menu={restaurant.menu} />
            <ReviewsSection reviews={restaurant.reviews} rating={restaurant.rating} reviewCount={restaurant.reviewCount} />
          </div>
          {/* Right: sticky reservation widget */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <ReservationWidget restaurant={restaurant} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
