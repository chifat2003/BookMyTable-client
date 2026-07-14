// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export { authClient } from "@/lib/auth-client";

export type RestaurantRequestBody = {
  name: string;
  cuisineType: string;
  address: string;
  location?: string;
  phone: string;
  email: string;
  website?: string;
  imageUrls?: string[];
  priceRange: string;
  capacity: number;
  description: string;
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

export type Restaurant = {
  id: string;
  _id?: string;
  name: string;
  cuisine: string;
  location: string;
  rating: number;
  priceRange: string;
  reviewCount: number;
  openNow: boolean;
  imageUrls?: string[];
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

export type ReservationRequestBody = {
  restaurantId: string;
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: string;
  note?: string;
};

export type Reservation = {
  id: string;
  _id?: string;
  restaurantId: string;
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: string;
  note: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const BASE_URL = process.env.NEXT_PUBLIC_API_URL
  ? process.env.NEXT_PUBLIC_API_URL.replace(/\/?$/, "/")
  : "";

async function handleResponse<T>(res: Response): Promise<T> {
  const text = await res.text();
  let json: T;
  try {
    json = text ? (JSON.parse(text) as T) : ({} as T);
  } catch {
    throw new Error(`Unexpected response: ${text}`);
  }
  if (!res.ok) {
    const msg =
      (json as { message?: string })?.message ?? res.statusText ?? "Request failed";
    const error = new Error(msg) as Error & { status: number; body: T };
    error.status = res.status;
    error.body = json;
    throw error;
  }
  return json;
}

// ---------------------------------------------------------------------------
// Restaurant API calls
// ---------------------------------------------------------------------------

// Normalize _id → id for MongoDB-style responses
function normalizeId<T extends { id?: string; _id?: string }>(item: T): T & { id: string } {
  const id = (item.id ?? item._id ?? "") as string;
  return { ...item, id };
}

/** Fetch all restaurants — handles both a plain array and common envelope shapes:
 *  { data: [] } | { restaurants: [] } | { result: [] } | Restaurant[]
 */
export async function fetchRestaurants(): Promise<Restaurant[]> {
  const res = await fetch(`${BASE_URL}restaurants`, { next: { revalidate: 60 } });
  const raw = await handleResponse<unknown>(res);

  let arr: unknown[] = [];

  if (Array.isArray(raw)) {
    arr = raw;
  } else if (raw && typeof raw === "object") {
    const obj = raw as Record<string, unknown>;
    for (const key of ["data", "restaurants", "result", "results", "items"]) {
      if (Array.isArray(obj[key])) { arr = obj[key] as unknown[]; break; }
    }
  }

  return (arr as Restaurant[]).map(normalizeId);
}

/** Fetch a single restaurant by id — handles plain object or { data: {} } envelope */
export async function fetchRestaurantById(id: string): Promise<RestaurantDetail> {
  const res = await fetch(`${BASE_URL}restaurants/${id}`, {
    next: { revalidate: 60 },
  });
  const raw = await handleResponse<unknown>(res);

  if (raw && typeof raw === "object" && !Array.isArray(raw)) {
    const obj = raw as Record<string, unknown>;
    // Look for envelope keys in order
    for (const key of ["data", "restaurant", "result"]) {
      const candidate = obj[key];
      if (candidate && typeof candidate === "object" && !Array.isArray(candidate)) {
        const doc = candidate as RestaurantDetail;
        // Ensure all required fields exist with sensible defaults
        return normalizeId({
          ...doc,
          tags: doc.tags ?? [],
          hours: doc.hours ?? [],
          menu: doc.menu ?? [],
          reviews: doc.reviews ?? [],
          rating: doc.rating ?? 0,
          reviewCount: doc.reviewCount ?? 0,
          openNow: doc.openNow ?? false,
          parkingAvailable: doc.parkingAvailable ?? false,
          reservationRequired: doc.reservationRequired ?? false,
        } as RestaurantDetail);
      }
    }
    // Fallback: treat raw as the document directly
    return normalizeId(raw as RestaurantDetail);
  }

  throw new Error(`Unexpected response shape for restaurant ${id}`);
}

/** Create a new restaurant */
export async function postRestaurant(payload: RestaurantRequestBody): Promise<RestaurantDetail> {
  const res = await fetch(`${BASE_URL}restaurants`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse<RestaurantDetail>(res);
}

/** Create a new reservation */
export async function postReservation(payload: ReservationRequestBody): Promise<{ id: string; status: string; createdAt: string }> {
  const res = await fetch(`${BASE_URL}reservations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const raw = await handleResponse<unknown>(res);

  if (raw && typeof raw === "object" && !Array.isArray(raw)) {
    const obj = raw as Record<string, unknown>;
    const data = obj.data as Record<string, unknown>;
    if (data) {
      return {
        id: (data._id ?? data.id ?? "") as string,
        status: (data.status ?? "pending") as string,
        createdAt: (data.createdAt ?? new Date().toISOString()) as string,
      };
    }
  }

  throw new Error("Unexpected response shape for reservation");
}

/** Fetch reservations for a restaurant (owner dashboard) */
export async function fetchReservationsByRestaurant(restaurantId: string): Promise<Reservation[]> {
  const res = await fetch(`${BASE_URL}reservations/restaurant/${restaurantId}`, { next: { revalidate: 30 } });
  const raw = await handleResponse<unknown>(res);

  let arr: unknown[] = [];

  if (Array.isArray(raw)) {
    arr = raw;
  } else if (raw && typeof raw === "object") {
    const obj = raw as Record<string, unknown>;
    for (const key of ["data", "reservations", "result"]) {
      if (Array.isArray(obj[key])) {
        arr = obj[key] as unknown[];
        break;
      }
    }
  }

  return (arr as Reservation[]).map(normalizeId);
}

/** Fetch reservations for a user (user dashboard) */
export async function fetchReservationsByEmail(email: string): Promise<Reservation[]> {
  const res = await fetch(`${BASE_URL}reservations/user/${email}`, { next: { revalidate: 30 } });
  const raw = await handleResponse<unknown>(res);

  let arr: unknown[] = [];

  if (Array.isArray(raw)) {
    arr = raw;
  } else if (raw && typeof raw === "object") {
    const obj = raw as Record<string, unknown>;
    for (const key of ["data", "reservations", "result"]) {
      if (Array.isArray(obj[key])) {
        arr = obj[key] as unknown[];
        break;
      }
    }
  }

  return (arr as Reservation[]).map(normalizeId);
}

export default { fetchRestaurants, fetchRestaurantById, postRestaurant, postReservation, fetchReservationsByRestaurant, fetchReservationsByEmail };
