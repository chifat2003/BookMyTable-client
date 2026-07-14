// Re-export shared types from the central api module
export type {
  Restaurant,
  RestaurantDetail,
  MenuItem,
  MenuCategory,
  Review,
  OpeningHours,
} from "@/lib/api";

// Filter / sort constants used by the UI
export const cuisineOptions = [
  "All", "Italian", "Japanese", "Indian", "American",
  "Chinese", "Mexican", "Mediterranean", "Thai", "French",
];
export const priceOptions = ["All", "$", "$$", "$$$", "$$$$"];
export const sortOptions  = ["Top Rated", "Most Reviewed", "Name A–Z"] as const;
export type SortOption    = (typeof sortOptions)[number];
