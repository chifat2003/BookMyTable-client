"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  cuisineOptions,
  priceOptions,
  sortOptions,
  type Restaurant,
  type SortOption,
} from "./restaurantData";

type Props = { initialData: Restaurant[] };

const RestaurantCard = ({ r }: { r: Restaurant }) => {
  const image = r.imageUrls?.[0];
  return (
  <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 group">
    <div className="relative h-44 bg-gradient-to-br from-orange-100 to-amber-50 flex items-center justify-center overflow-hidden">
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={image} alt={r.name} className="w-full h-full object-cover" />
      ) : (
        <span className="text-6xl">🍴</span>
      )}
      <span className="absolute top-3 right-3 bg-white text-orange-500 text-xs font-bold px-2 py-1 rounded-full shadow">
        {r.priceRange}
      </span>
      <span className={`absolute top-3 left-3 text-xs font-medium px-2 py-1 rounded-full ${r.openNow ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-500"}`}>
        {r.openNow ? "Open Now" : "Closed"}
      </span>
    </div>
    <div className="p-4">
      <div className="flex items-start justify-between mb-1">
        <h3 className="font-semibold text-gray-900 group-hover:text-orange-500 transition-colors leading-tight">
          {r.name}
        </h3>
        <span className="flex items-center gap-0.5 text-sm font-medium text-amber-500 shrink-0 ml-2">
          ⭐ {r.rating}
        </span>
      </div>
      <p className="text-xs text-orange-500 font-medium mb-1">{r.cuisine}</p>
      <p className="text-xs text-gray-400 mb-1">📍 {r.location}</p>
      <p className="text-xs text-gray-400 mb-4">{r.reviewCount} reviews</p>
      <Link
        href={`/restaurants/${r.id}`}
        className="block w-full text-center text-sm font-medium bg-orange-50 hover:bg-orange-500 text-orange-500 hover:text-white py-2 rounded-xl transition-colors"
      >
        Reserve a Table
      </Link>
    </div>
  </div>
  );
};

const RestaurantsList = ({ initialData }: Props) => {
  // Guard: ensure initialData is always an array (API envelope safety net)
  const data = Array.isArray(initialData) ? initialData : [];
  const [search, setSearch]     = useState("");
  const [cuisine, setCuisine]   = useState("All");
  const [price, setPrice]       = useState("All");
  const [openOnly, setOpenOnly] = useState(false);
  const [sort, setSort]         = useState<SortOption>("Top Rated");

  const clearFilters = () => {
    setSearch(""); setCuisine("All"); setPrice("All"); setOpenOnly(false); setSort("Top Rated");
  };

  const filtered = useMemo(() => {
    let list = data.filter((r) => {
      const q = search.toLowerCase();
      const matchSearch  = r.name.toLowerCase().includes(q) || r.cuisine.toLowerCase().includes(q) || r.location.toLowerCase().includes(q);
      const matchCuisine = cuisine === "All" || r.cuisine === cuisine;
      const matchPrice   = price === "All" || r.priceRange === price;
      const matchOpen    = !openOnly || r.openNow;
      return matchSearch && matchCuisine && matchPrice && matchOpen;
    });
    if (sort === "Top Rated")     list = [...list].sort((a, b) => b.rating - a.rating);
    if (sort === "Most Reviewed") list = [...list].sort((a, b) => b.reviewCount - a.reviewCount);
    if (sort === "Name A–Z")      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [data, search, cuisine, price, openOnly, sort]);

  return (
    <section className="py-10 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Search + filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-8 space-y-4">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, cuisine, or location..."
              className="w-full pl-9 pr-4 py-2.5 text-sm text-gray-700 border border-gray-200 rounded-xl outline-none focus:border-orange-400 transition-colors"
            />
          </div>
          <div className="flex flex-wrap gap-3 items-center">
            <select value={cuisine} onChange={(e) => setCuisine(e.target.value)} className="text-sm border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-orange-400 text-gray-700 bg-white">
              {cuisineOptions.map((c) => <option key={c} value={c}>{c === "All" ? "All Cuisines" : c}</option>)}
            </select>
            <select value={price} onChange={(e) => setPrice(e.target.value)} className="text-sm border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-orange-400 text-gray-700 bg-white">
              {priceOptions.map((p) => <option key={p} value={p}>{p === "All" ? "Any Price" : p}</option>)}
            </select>
            <select value={sort} onChange={(e) => setSort(e.target.value as SortOption)} className="text-sm border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-orange-400 text-gray-700 bg-white">
              {sortOptions.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer select-none">
              <input type="checkbox" checked={openOnly} onChange={(e) => setOpenOnly(e.target.checked)} className="accent-orange-500 w-4 h-4 rounded" />
              Open Now
            </label>
            <button onClick={clearFilters} className="ml-auto text-xs text-gray-400 hover:text-orange-500 transition-colors">
              Clear filters
            </button>
          </div>
        </div>

        {/* Empty state — API offline */}
        {data.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-200">
            <span className="text-5xl block mb-3">📡</span>
            <p className="font-medium text-gray-700 mb-1">Could not load restaurants</p>
            <p className="text-sm text-gray-400">The API may be unavailable. Please try again later.</p>
          </div>
        )}

        {initialData.length > 0 && (
          <>
            <p className="text-sm text-gray-500 mb-6">
              Showing <span className="font-semibold text-gray-800">{filtered.length}</span> restaurant{filtered.length !== 1 ? "s" : ""}
            </p>

            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filtered.map((r) => <RestaurantCard key={r.id} r={r} />)}
              </div>
            ) : (
              <div className="text-center py-20">
                <span className="text-6xl block mb-4">🍽️</span>
                <p className="text-gray-500 font-medium">No restaurants match your filters.</p>
                <button onClick={clearFilters} className="mt-4 text-sm text-orange-500 hover:underline">
                  Clear all filters
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default RestaurantsList;
