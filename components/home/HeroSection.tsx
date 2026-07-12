const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-orange-50 to-amber-50 pt-24 pb-16 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-0 w-96 h-96 bg-orange-200 rounded-full opacity-20 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-200 rounded-full opacity-20 -translate-x-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div>
            <span className="inline-block bg-orange-100 text-orange-600 text-sm font-medium px-3 py-1 rounded-full mb-4">
              #1 Restaurant Reservation Platform
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-4">
              Find & Reserve Your{" "}
              <span className="text-orange-500">Perfect Table</span>
            </h1>
            <p className="text-gray-500 text-lg mb-8 leading-relaxed">
              Discover thousands of restaurants, check real-time availability, and book your table instantly — all in one place.
            </p>

            {/* Search Bar */}
            <div className="bg-white rounded-2xl shadow-lg p-2 flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder="Restaurant name or cuisine..."
                className="flex-1 px-4 py-3 text-sm text-gray-700 outline-none rounded-xl"
              />
              <input
                type="text"
                placeholder="Location"
                className="flex-1 px-4 py-3 text-sm text-gray-700 outline-none rounded-xl border-t sm:border-t-0 sm:border-l border-gray-100"
              />
              <button className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-6 py-3 rounded-xl transition-colors whitespace-nowrap">
                Search
              </button>
            </div>

            {/* Stats row */}
            <div className="flex gap-8 mt-8">
              {[
                { value: "10K+", label: "Restaurants" },
                { value: "500K+", label: "Reservations" },
                { value: "4.9★", label: "Avg Rating" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-2xl font-bold text-gray-900">{s.value}</p>
                  <p className="text-sm text-gray-500">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Image Placeholder */}
          <div className="hidden lg:flex justify-center items-center">
            <div className="relative w-full max-w-md aspect-square rounded-3xl bg-gradient-to-br from-orange-400 to-amber-300 flex items-center justify-center shadow-2xl">
              <span className="text-9xl">🍽️</span>
              {/* Floating card */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg p-4 flex items-center gap-3">
                <span className="text-3xl">⭐</span>
                <div>
                  <p className="text-sm font-bold text-gray-900">Top Rated</p>
                  <p className="text-xs text-gray-500">500+ reviews</p>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-lg p-4">
                <p className="text-sm font-bold text-gray-900">🎉 Table Ready!</p>
                <p className="text-xs text-gray-500">Instant confirmation</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
