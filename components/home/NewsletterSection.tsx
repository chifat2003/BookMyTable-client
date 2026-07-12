"use client";

import { useState } from "react";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-orange-500 to-amber-400 rounded-3xl px-8 py-12 text-center relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full -translate-x-1/2 translate-y-1/2" />

          <div className="relative">
            <p className="text-orange-100 text-sm font-medium mb-2">Stay Updated</p>
            <h2 className="text-3xl font-bold text-white mb-3">Get Exclusive Dining Deals</h2>
            <p className="text-orange-100 text-sm max-w-md mx-auto mb-8">
              Subscribe to our newsletter and receive hand-picked restaurant recommendations, special offers, and foodie news.
            </p>

            {submitted ? (
              <div className="bg-white bg-opacity-20 rounded-2xl px-6 py-4 inline-block">
                <p className="text-white font-semibold">🎉 You&apos;re subscribed! Welcome aboard.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 px-4 py-3 rounded-xl text-sm text-gray-700 outline-none focus:ring-2 focus:ring-white"
                />
                <button
                  type="submit"
                  className="bg-gray-900 hover:bg-gray-800 text-white text-sm font-semibold px-6 py-3 rounded-xl transition-colors whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            )}

            <p className="text-orange-100 text-xs mt-4">No spam. Unsubscribe anytime.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
