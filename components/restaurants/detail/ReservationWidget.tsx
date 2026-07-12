"use client";

import { useState } from "react";
import type { RestaurantDetail } from "../restaurantData";

type Props = { restaurant: RestaurantDetail };

const guestOptions = ["1 Guest", "2 Guests", "3 Guests", "4 Guests", "5 Guests", "6 Guests", "7 Guests", "8+ Guests"];
const timeSlots    = ["11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM"];

const ReservationWidget = ({ restaurant }: Props) => {
  const [date, setDate]       = useState("");
  const [time, setTime]       = useState("");
  const [guests, setGuests]   = useState("2 Guests");
  const [name, setName]       = useState("");
  const [phone, setPhone]     = useState("");
  const [note, setNote]       = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (date && time && name && phone) setSubmitted(true);
  };

  return (
    <div id="reservation" className="bg-white border border-gray-100 rounded-2xl shadow-md p-6">
      <h2 className="text-lg font-bold text-gray-900 mb-1">Reserve a Table</h2>
      <p className="text-xs text-gray-400 mb-5">at {restaurant.name}</p>

      {submitted ? (
        <div className="text-center py-8">
          <span className="text-5xl block mb-3">🎉</span>
          <p className="font-semibold text-gray-900 mb-1">Reservation Requested!</p>
          <p className="text-sm text-gray-500">
            We&apos;ll confirm your table for{" "}
            <span className="font-medium text-orange-500">{guests}</span> on{" "}
            <span className="font-medium text-orange-500">{date}</span> at{" "}
            <span className="font-medium text-orange-500">{time}</span>.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-5 text-sm text-orange-500 hover:underline"
          >
            Make another reservation
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              min={new Date().toISOString().split("T")[0]}
              className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2.5 outline-none focus:border-orange-400 text-gray-700"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Time</label>
            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
              className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2.5 outline-none focus:border-orange-400 text-gray-700 bg-white"
            >
              <option value="">Select a time</option>
              {timeSlots.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Guests</label>
            <select
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2.5 outline-none focus:border-orange-400 text-gray-700 bg-white"
            >
              {guestOptions.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Your Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
              required
              className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2.5 outline-none focus:border-orange-400 text-gray-700"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 (555) 000-0000"
              required
              className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2.5 outline-none focus:border-orange-400 text-gray-700"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Special Requests <span className="text-gray-300">(optional)</span></label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Allergies, special occasion, seating preference..."
              rows={3}
              className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2.5 outline-none focus:border-orange-400 text-gray-700 resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold py-3 rounded-xl transition-colors"
          >
            Confirm Reservation
          </button>

          <p className="text-xs text-gray-400 text-center">
            Free cancellation up to 2 hours before your reservation.
          </p>
        </form>
      )}
    </div>
  );
};

export default ReservationWidget;
