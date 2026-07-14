"use client";

import { useState } from "react";
import type { RestaurantDetail } from "@/lib/api";

type Props = { restaurant: RestaurantDetail };

const AddReviewForm = ({ restaurant }: Props) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [author, setAuthor] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (author && comment && rating) {
      setSubmitted(true);
      setAuthor("");
      setComment("");
      setRating(5);
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <div className="bg-gray-50 rounded-2xl p-5">
      <h3 className="font-semibold text-gray-900 mb-4">Add Your Review</h3>
      {submitted ? (
        <div className="text-center py-4">
          <p className="text-sm text-green-600 font-medium">✓ Review submitted successfully!</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-2">Your Name</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Full name"
              required
              className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-orange-400 text-gray-700"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-2">Rating</label>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-orange-400 text-gray-700 bg-white"
            >
              <option value={5}>⭐⭐⭐⭐⭐ Excellent</option>
              <option value={4}>⭐⭐⭐⭐ Good</option>
              <option value={3}>⭐⭐⭐ Average</option>
              <option value={2}>⭐⭐ Poor</option>
              <option value={1}>⭐ Terrible</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-2">Your Review</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience at this restaurant..."
              rows={4}
              required
              className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-orange-400 text-gray-700 resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors"
          >
            Submit Review
          </button>
        </form>
      )}
    </div>
  );
};

export default AddReviewForm;
