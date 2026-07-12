type Value = {
  icon: string;
  title: string;
  description: string;
};

const values: Value[] = [
  {
    icon: "❤️",
    title: "Passion for Food",
    description: "We're food lovers first. Every decision we make is driven by a genuine love of great dining experiences.",
  },
  {
    icon: "🤝",
    title: "Trust & Transparency",
    description: "Honest reviews, real availability, no hidden fees. We believe trust is the foundation of every good relationship.",
  },
  {
    icon: "🌍",
    title: "Community First",
    description: "We support local restaurants and empower communities to thrive through the power of shared meals.",
  },
  {
    icon: "💡",
    title: "Constant Innovation",
    description: "We're always improving — building smarter tools so finding and booking the perfect table gets easier every day.",
  },
];

const OurValues = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-orange-500 text-sm font-medium mb-1">What We Stand For</p>
          <h2 className="text-3xl font-bold text-gray-900">Our Core Values</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v) => (
            <div key={v.title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
              <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
                {v.icon}
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{v.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{v.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurValues;
