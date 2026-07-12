type Testimonial = {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  review: string;
};

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "Food Blogger",
    avatar: "SJ",
    rating: 5,
    review: "BookMyTable made our anniversary dinner absolutely perfect. The reservation process was seamless and the restaurant recommendations were spot on!",
  },
  {
    id: "2",
    name: "Marcus Lee",
    role: "Business Executive",
    avatar: "ML",
    rating: 5,
    review: "I use BookMyTable for all my client dinners. It saves me so much time — I can find great restaurants and book a table in under a minute.",
  },
  {
    id: "3",
    name: "Priya Sharma",
    role: "Travel Enthusiast",
    avatar: "PS",
    rating: 5,
    review: "As someone who travels frequently, this platform is a lifesaver. I can always find amazing local restaurants wherever I am.",
  },
];

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <span key={i} className={i < rating ? "text-amber-400" : "text-gray-200"}>
        ★
      </span>
    ))}
  </div>
);

const TestimonialsSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-orange-500 text-sm font-medium mb-1">Testimonials</p>
          <h2 className="text-3xl font-bold text-gray-900">What Our Diners Say</h2>
          <p className="text-gray-500 mt-3 text-sm">
            Real reviews from real food lovers who use BookMyTable every day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <StarRating rating={t.rating} />
              <p className="text-gray-600 text-sm leading-relaxed mt-4 mb-6">
                &ldquo;{t.review}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
