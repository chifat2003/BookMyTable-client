# Restaurant JSON Data Structure Reference

## Overview
The `restaurants.json` file contains comprehensive restaurant data that powers the BookMyTable application.

## JSON Schema

```json
{
  "restaurants": [
    {
      "id": "string (unique identifier)",
      "name": "string (restaurant name)",
      "cuisine": "string (cuisine type)",
      "location": "string (general location, e.g., 'Manhattan, NY')",
      "address": "string (full street address)",
      "rating": "number (0-5 stars)",
      "reviewCount": "number (total reviews)",
      "priceRange": "string ('$', '$$', '$$$', or '$$$$')",
      "phone": "string (phone number with +1 format)",
      "email": "string (email address)",
      "website": "string (website URL)",
      "description": "string (detailed restaurant description)",
      "image": "string (path to image)",
      "tags": ["string array (features/keywords)"],
      "capacity": "number (seating capacity)",
      "parkingAvailable": "boolean",
      "reservationRequired": "boolean",
      "openNow": "boolean",
      "hours": [
        {
          "day": "string (day of week)",
          "hours": "string (opening hours)"
        }
      ],
      "menu": [
        {
          "category": "string (menu section)",
          "items": [
            {
              "name": "string (dish name)",
              "description": "string (dish description)",
              "price": "string (formatted price, e.g., '$24')"
            }
          ]
        }
      ],
      "reviews": [
        {
          "id": "string (review ID)",
          "author": "string (reviewer name)",
          "avatar": "string (emoji or initials)",
          "rating": "number (1-5)",
          "date": "string (review date)",
          "comment": "string (review text)"
        }
      ]
    }
  ]
}
```

## Example Entry

```json
{
  "id": "1",
  "name": "La Bella Italia",
  "cuisine": "Italian",
  "location": "Manhattan, NY",
  "address": "123 5th Avenue, Manhattan, NY 10016",
  "rating": 4.8,
  "reviewCount": 342,
  "priceRange": "$$$",
  "phone": "+1 (212) 555-0101",
  "email": "info@labellaItalia.com",
  "website": "www.labellaItalia.com",
  "description": "Authentic Italian cuisine with a modern twist. Our chefs bring traditional recipes from Southern Italy with fresh, locally-sourced ingredients.",
  "image": "/globe.svg",
  "tags": ["Italian", "Fine Dining", "Romantic", "Wine Bar"],
  "capacity": 120,
  "parkingAvailable": true,
  "reservationRequired": true,
  "openNow": true,
  "hours": [
    { "day": "Monday", "hours": "5:00 PM - 11:00 PM" },
    { "day": "Tuesday", "hours": "5:00 PM - 11:00 PM" },
    { "day": "Wednesday", "hours": "5:00 PM - 11:00 PM" },
    { "day": "Thursday", "hours": "5:00 PM - 11:00 PM" },
    { "day": "Friday", "hours": "5:00 PM - 12:00 AM" },
    { "day": "Saturday", "hours": "4:00 PM - 12:00 AM" },
    { "day": "Sunday", "hours": "4:00 PM - 10:00 PM" }
  ],
  "menu": [
    {
      "category": "Appetizers",
      "items": [
        {
          "name": "Bruschetta al Pomodoro",
          "description": "Toasted bread with fresh tomatoes and basil",
          "price": "$8"
        },
        {
          "name": "Calamari Fritti",
          "description": "Crispy fried squid with lemon aioli",
          "price": "$12"
        }
      ]
    },
    {
      "category": "Main Courses",
      "items": [
        {
          "name": "Osso Buco",
          "description": "Braised veal shanks with saffron risotto",
          "price": "$32"
        }
      ]
    }
  ],
  "reviews": [
    {
      "id": "r1",
      "author": "John Smith",
      "avatar": "👨",
      "rating": 5,
      "date": "2024-06-15",
      "comment": "Amazing experience! The pasta was cooked to perfection and the service was excellent."
    }
  ]
}
```

## Field Descriptions

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `id` | string | Unique identifier | "1" |
| `name` | string | Restaurant name | "La Bella Italia" |
| `cuisine` | string | Type of cuisine | "Italian", "Japanese" |
| `location` | string | General location | "Manhattan, NY" |
| `address` | string | Full address | "123 5th Avenue, Manhattan, NY 10016" |
| `rating` | number | Star rating | 4.8 |
| `reviewCount` | number | Total number of reviews | 342 |
| `priceRange` | string | Price range indicator | "$$$" |
| `phone` | string | Phone number | "+1 (212) 555-0101" |
| `email` | string | Email address | "info@labellaItalia.com" |
| `website` | string | Website URL | "www.labellaItalia.com" |
| `description` | string | Detailed description | "Authentic Italian cuisine..." |
| `image` | string | Image path | "/globe.svg" |
| `tags` | array | Feature tags | ["Italian", "Fine Dining"] |
| `capacity` | number | Seating capacity | 120 |
| `parkingAvailable` | boolean | Has parking | true/false |
| `reservationRequired` | boolean | Requires reservation | true/false |
| `openNow` | boolean | Currently open | true/false |
| `hours` | array | Operating hours by day | see example |
| `menu` | array | Menu categories with items | see example |
| `reviews` | array | Customer reviews | see example |

## How Data Flows

```
restaurants.json
       ↓
restaurantData.ts (loads JSON and creates typed objects)
       ↓
┌──────────────────────────────────────┐
│       Two Main Exports               │
├──────────────────────────────────────┤
│ 1. allRestaurants[] (Restaurant[])   │ ← Used for lists & filtering
│ 2. restaurantDetails {} (map)        │ ← Used for detail pages
└──────────────────────────────────────┘
       ↓
┌──────────────────────────────────────┐
│      Components That Use It          │
├──────────────────────────────────────┤
│ • PopularRestaurants.tsx (home)      │
│ • RestaurantsList.tsx (all list)     │
│ • Restaurant detail page [id]        │
└──────────────────────────────────────┘
```

## Tips for Maintenance

1. **Keep JSON Valid** - Ensure all required fields are present
2. **Price Format** - Always use "$" format (e.g., "$24" not "24")
3. **Hours Format** - Use "HH:MM AM/PM - HH:MM AM/PM" or "Closed"
4. **Unique IDs** - Each restaurant must have a unique `id`
5. **Review Count** - Keep this updated when adding/removing reviews
6. **Tags** - Use consistent tag names for better filtering

## TypeScript Types

```typescript
type Restaurant = {
  id: string;
  name: string;
  cuisine: string;
  location: string;
  rating: number;
  priceRange: string;
  reviewCount: number;
  openNow: boolean;
};

type RestaurantDetail = Restaurant & {
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
```
