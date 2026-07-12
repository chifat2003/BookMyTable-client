import type { Review } from "../restaurantData";

type Props = {
  reviews: Review[];
  rating: number;
  reviewCount: number;
};

const StarRating = ({ rating, size = "sm" }: { rating: number; size?: "sm" | "lg" }) => (
  <div className={`flex gap-0.5 ${size === "lg" ? "text-2xl" : "text-sm"}`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <span key={i} className={i < rating ? "text-amber-400" : "text-gray-200"}>★</span>
    ))}
  </div>
);

const ReviewsSection = ({ reviews, rating, reviewCount }: Props) => {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-6">Reviews</h2>

      {/* Rating summary */}
      <div className="bg-orange-50 rounded-2xl p-6 flex items-center gap-6 mb-6">
        <div className="text-center">
          <p className="text-5xl font-bold text-orange-500">{rating}</p>
          <StarRating rating={Math.round(rating)} size="lg" />
          <p className="text-xs text-gray-400 mt-1">{reviewCount} reviews</p>
        </div>
        <div className="flex-1 space-y-2">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = reviews.filter((r) => r.rating === star).length;
            const pct   = reviews.length ? Math.round((count / reviews.length) * 100) : 0;
            return (
              <div key={star} className="flex items-center gap-2 text-xs text-gray-500">
                <span className="w-4 text-right">{star}★</span>
                <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                  <div className="bg-amber-400 h-1.5 rounded-full" style={{ width: `${pct}%` }} />
                </div>
                <span className="w-6">{pct}%</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Review cards */}
      <div className="space-y-4">
        {reviews.map((r) => (
          <div key={r.id} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                  {r.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{r.author}</p>
                  <p className="text-xs text-gray-400">{r.date}</p>
                </div>
              </div>
              <StarRating rating={r.rating} />
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">&ldquo;{r.comment}&rdquo;</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsSection;
