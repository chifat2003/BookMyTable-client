import type { Metadata } from "next";
import { fetchRestaurants } from "@/lib/api";
import RestaurantsHero from "@/components/restaurants/RestaurantsHero";
import RestaurantsList from "@/components/restaurants/RestaurantsList";

export const metadata: Metadata = {
  title: "Restaurants — BookMyTable",
  description: "Browse and book from thousands of top-rated restaurants.",
};

export default async function RestaurantsPage() {
  let restaurants = await fetchRestaurants().catch(() => []);

  return (
    <main>
      <RestaurantsHero />
      <RestaurantsList initialData={restaurants} />
    </main>
  );
}
