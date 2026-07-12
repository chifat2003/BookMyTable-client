type Stat = {
  value: string;
  label: string;
  icon: string;
};

const stats: Stat[] = [
  { value: "10,000+", label: "Restaurants Listed", icon: "🏪" },
  { value: "500K+", label: "Happy Diners", icon: "😊" },
  { value: "50+", label: "Cities Covered", icon: "🌆" },
  { value: "4.9/5", label: "Average Rating", icon: "⭐" },
];

const StatisticsSection = () => {
  return (
    <section className="py-16 bg-orange-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-4xl mb-3">{s.icon}</div>
              <p className="text-3xl sm:text-4xl font-bold text-white mb-1">{s.value}</p>
              <p className="text-orange-100 text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
