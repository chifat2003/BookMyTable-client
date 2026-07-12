import type { Metadata } from "next";
import RestaurantsHero from "@/components/restaurants/RestaurantsHero";
import RestaurantsList from "@/components/restaurants/RestaurantsList";

export const metadata: Metadata = {
  title: "Restaurants — BookMyTable",
  description: "Browse and book from thousands of top-rated restaurants.",
};

export default function RestaurantsPage() {
  return (
    <main>
      <RestaurantsHero />
      <RestaurantsList />
    </main>
  );
}
