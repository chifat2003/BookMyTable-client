import restaurantsDataJSON from "@/data/restaurants.json";

export type Restaurant = {
  id: string;
  name: string;
  cuisine: string;
  location: string;
  rating: number;
  priceRange: string;
  reviewCount: number;
  openNow: boolean;
};

export type MenuItem = {
  name: string;
  description: string;
  price: string;
};

export type MenuCategory = {
  category: string;
  items: MenuItem[];
};

export type Review = {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
};

export type OpeningHours = {
  day: string;
  hours: string;
};

export type RestaurantDetail = Restaurant & {
  description: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  tags: string[];
  hours: OpeningHours[];
  menu: MenuCategory[];
  reviews: Review[];
  capacity: number;
  parkingAvailable: boolean;
  reservationRequired: boolean;
};

// Load restaurants from JSON and create allRestaurants array
export const allRestaurants: Restaurant[] = restaurantsDataJSON.restaurants.map((r: any) => ({
  id: r.id,
  name: r.name,
  cuisine: r.cuisine,
  location: r.location,
  rating: r.rating,
  priceRange: r.priceRange,
  reviewCount: r.reviewCount,
  openNow: r.openNow,
}));

// Create restaurant details map from JSON
export const restaurantDetails: Record<string, RestaurantDetail> = {};
restaurantsDataJSON.restaurants.forEach((r: any) => {
  restaurantDetails[r.id] = {
    id: r.id,
    name: r.name,
    cuisine: r.cuisine,
    location: r.location,
    address: r.address,
    rating: r.rating,
    priceRange: r.priceRange,
    reviewCount: r.reviewCount,
    openNow: r.openNow,
    description: r.description,
    phone: r.phone,
    email: r.email,
    website: r.website,
    tags: r.tags,
    hours: r.hours,
    menu: r.menu,
    reviews: r.reviews,
    capacity: r.capacity,
    parkingAvailable: r.parkingAvailable,
    reservationRequired: r.reservationRequired,
  };
});

// Extract unique cuisines for filter options
const uniqueCuisines = Array.from(
  new Set(restaurantsDataJSON.restaurants.map((r: any) => r.cuisine))
);

export const cuisineOptions = ["All", ...uniqueCuisines.sort()];
export const priceOptions = ["All", "$", "$$", "$$$", "$$$$"];
export const sortOptions = ["Top Rated", "Most Reviewed", "Name A–Z"] as const;
export type SortOption = typeof sortOptions[number];

export function getRestaurantDetail(id: string): RestaurantDetail | null {
  return restaurantDetails[id] ?? null;
}
