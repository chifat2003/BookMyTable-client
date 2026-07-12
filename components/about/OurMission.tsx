const OurMission = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Visual */}
          <div className="relative">
            <div className="bg-gradient-to-br from-orange-400 to-amber-300 rounded-3xl h-80 flex items-center justify-center shadow-xl">
              <span className="text-8xl">🍽️</span>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-lg p-4 flex items-center gap-3">
              <span className="text-3xl">🚀</span>
              <div>
                <p className="text-sm font-bold text-gray-900">Founded 2020</p>
                <p className="text-xs text-gray-500">Growing every day</p>
              </div>
            </div>
          </div>

          {/* Text */}
          <div>
            <p className="text-orange-500 text-sm font-medium mb-2">Our Mission</p>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Connecting People Through Great Food
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">
              We started BookMyTable in 2020 with a single goal: eliminate the friction between wanting a great meal and actually having one. Whether it&apos;s a romantic dinner, a family celebration, or a business lunch — we make the reservation process invisible so you can focus on the experience.
            </p>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">
              Today we partner with over 10,000 restaurants across 50 cities, serving half a million diners who trust us to help them make memories around the table.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="bg-orange-50 rounded-2xl p-4 flex-1">
                <p className="text-2xl font-bold text-orange-500 mb-1">10K+</p>
                <p className="text-xs text-gray-500">Restaurant Partners</p>
              </div>
              <div className="bg-orange-50 rounded-2xl p-4 flex-1">
                <p className="text-2xl font-bold text-orange-500 mb-1">50+</p>
                <p className="text-xs text-gray-500">Cities Worldwide</p>
              </div>
              <div className="bg-orange-50 rounded-2xl p-4 flex-1">
                <p className="text-2xl font-bold text-orange-500 mb-1">500K+</p>
                <p className="text-xs text-gray-500">Happy Diners</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurMission;
