"use client";

import { useState } from "react";
import type { MenuCategory } from "../restaurantData";

type Props = { menu: MenuCategory[] };

const MenuSection = ({ menu }: Props) => {
  const [activeCategory, setActiveCategory] = useState(menu[0]?.category ?? "");

  const current = menu.find((m) => m.category === activeCategory);

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-4">Menu</h2>

      {/* Category tabs */}
      <div className="flex gap-2 flex-wrap mb-6">
        {menu.map((m) => (
          <button
            key={m.category}
            onClick={() => setActiveCategory(m.category)}
            className={`text-sm font-medium px-4 py-2 rounded-xl border transition-colors ${
              activeCategory === m.category
                ? "bg-orange-500 text-white border-orange-500"
                : "bg-white text-gray-600 border-gray-200 hover:border-orange-300 hover:text-orange-500"
            }`}
          >
            {m.category}
          </button>
        ))}
      </div>

      {/* Items */}
      {current && (
        <div className="space-y-3">
          {current.items.map((item) => (
            <div
              key={item.name}
              className="flex items-start justify-between gap-4 bg-gray-50 rounded-2xl p-4 hover:bg-orange-50 transition-colors"
            >
              <div className="flex items-start gap-3">
                <span className="text-xl mt-0.5">🍴</span>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{item.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{item.description}</p>
                </div>
              </div>
              <span className="text-sm font-bold text-orange-500 shrink-0">{item.price}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuSection;
