import Link from "next/link";

type Cuisine = {
  name: string;
  icon: string;
  count: number;
};

const cuisines: Cuisine[] = [
  { name: "Italian", icon: "🍕", count: 240 },
  { name: "Japanese", icon: "🍣", count: 185 },
  { name: "Indian", icon: "🍛", count: 310 },
  { name: "Chinese", icon: "🥡", count: 275 },
  { name: "Mexican", icon: "🌮", count: 198 },
  { name: "American", icon: "🍔", count: 420 },
  { name: "Thai", icon: "🍜", count: 145 },
  { name: "Mediterranean", icon: "🫒", count: 167 },
];

const CuisineSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-orange-500 text-sm font-medium mb-1">Explore</p>
          <h2 className="text-3xl font-bold text-gray-900">Browse by Cuisine</h2>
          <p className="text-gray-500 mt-3 text-sm">Find your favorite cuisine and discover great restaurants nearby.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {cuisines.map((c) => (
            <Link
              key={c.name}
              href={`/restaurants?cuisine=${c.name.toLowerCase()}`}
              className="flex flex-col items-center gap-2 p-4 bg-gray-50 hover:bg-orange-50 rounded-2xl border border-transparent hover:border-orange-200 transition-all group"
            >
              <span className="text-4xl group-hover:scale-110 transition-transform">{c.icon}</span>
              <span className="text-sm font-medium text-gray-700 group-hover:text-orange-500 transition-colors text-center">
                {c.name}
              </span>
              <span className="text-xs text-gray-400">{c.count}+</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CuisineSection;
