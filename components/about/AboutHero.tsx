const AboutHero = () => {
  return (
    <section className="bg-gradient-to-br from-orange-50 to-amber-50 pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="inline-block bg-orange-100 text-orange-600 text-sm font-medium px-3 py-1 rounded-full mb-4">
          Our Story
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          We&apos;re on a Mission to Make <br className="hidden sm:block" />
          <span className="text-orange-500">Dining Delightful</span>
        </h1>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
          BookMyTable was born from a simple belief — finding a great restaurant and securing a table should be effortless. We connect diners with unforgettable experiences, one reservation at a time.
        </p>
      </div>
    </section>
  );
};

export default AboutHero;
