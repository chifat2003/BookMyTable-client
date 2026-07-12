const RestaurantsHero = () => {
  return (
    <section className="bg-gradient-to-br from-orange-50 to-amber-50 pt-28 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="inline-block bg-orange-100 text-orange-600 text-sm font-medium px-3 py-1 rounded-full mb-4">
          10,000+ Restaurants
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          Find Your <span className="text-orange-500">Perfect Restaurant</span>
        </h1>
        <p className="text-gray-500 text-lg max-w-xl mx-auto mb-8">
          Explore top-rated restaurants by cuisine, location, and price. Book your table instantly.
        </p>
      </div>
    </section>
  );
};

export default RestaurantsHero;
