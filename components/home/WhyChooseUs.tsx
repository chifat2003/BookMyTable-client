type Feature = {
  icon: string;
  title: string;
  description: string;
};

const features: Feature[] = [
  {
    icon: "🔍",
    title: "Easy Discovery",
    description: "Search thousands of restaurants by cuisine, location, price, and more with our smart filters.",
  },
  {
    icon: "⚡",
    title: "Instant Booking",
    description: "Check real-time table availability and confirm your reservation in seconds.",
  },
  {
    icon: "⭐",
    title: "Verified Reviews",
    description: "Read honest reviews from real diners to make confident dining decisions.",
  },
  {
    icon: "🔔",
    title: "Smart Reminders",
    description: "Get timely notifications and reminders so you never miss your reservation.",
  },
  {
    icon: "🎁",
    title: "Exclusive Deals",
    description: "Unlock special offers, discounts, and perks available only through BookMyTable.",
  },
  {
    icon: "🛡️",
    title: "Secure & Reliable",
    description: "Your data and bookings are protected with enterprise-grade security.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-orange-500 text-sm font-medium mb-1">Why Us</p>
          <h2 className="text-3xl font-bold text-gray-900">Why Choose BookMyTable?</h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm">
            We make dining out effortless. From discovery to dessert, we've got you covered.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-2xl mb-4">
                {f.icon}
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
