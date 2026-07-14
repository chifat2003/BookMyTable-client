import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { fetchRestaurantById } from "@/lib/api";
import RestaurantDetailHero from "@/components/restaurants/detail/RestaurantDetailHero";
import RestaurantInfo from "@/components/restaurants/detail/RestaurantInfo";
import MenuSection from "@/components/restaurants/detail/MenuSection";
import ReviewsSection from "@/components/restaurants/detail/ReviewsSection";
import AddReviewForm from "@/components/restaurants/detail/AddReviewForm";
import ReservationWidget from "@/components/restaurants/detail/ReservationWidget";

type Props = { params: Promise<{ id: string }> };

// Dynamic rendering — IDs come from the live API, not known at build time
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  try {
    const restaurant = await fetchRestaurantById(id);
    return {
      title: `${restaurant.name} — BookMyTable`,
      description: restaurant.description,
    };
  } catch {
    return { title: "Restaurant Not Found — BookMyTable" };
  }
}

export default async function RestaurantDetailPage({ params }: Props) {
  const { id } = await params;

  let restaurant;
  try {
    restaurant = await fetchRestaurantById(id);
  } catch (err) {
    console.error(`[RestaurantDetailPage] Failed to fetch restaurant "${id}":`, err);
    notFound();
  }

  if (!restaurant) notFound();

  return (
    <main>
      <RestaurantDetailHero restaurant={restaurant} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-10">
            <RestaurantInfo restaurant={restaurant} />
            <MenuSection menu={restaurant.menu} />
            <ReviewsSection
              reviews={restaurant.reviews}
              rating={restaurant.rating}
              reviewCount={restaurant.reviewCount}
            />
            <AddReviewForm restaurant={restaurant} />
          </div>
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
