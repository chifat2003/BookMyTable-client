"use client";

import { useState, type FormEvent } from "react";

type AddRestaurantFormData = {
  name: string;
  cuisine: string;
  address: string;
  location: string;
  phone: string;
  email: string;
  website: string;
  priceRange: string;
  capacity: string;
  description: string;
};

const initialForm: AddRestaurantFormData = {
  name: "",
  cuisine: "",
  address: "",
  location: "",
  phone: "",
  email: "",
  website: "",
  priceRange: "$$",
  capacity: "",
  description: "",
};

const AddRestaurantForm = () => {
  const [form, setForm] = useState<AddRestaurantFormData>(initialForm);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof AddRestaurantFormData, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    if (!form.name.trim() || !form.cuisine.trim() || !form.address.trim() || !form.email.trim() || !form.phone.trim()) {
      setError("Please fill in all required fields before submitting.");
      return;
    }

    if (!form.email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess("Your restaurant submission has been received. We will review it and be in touch soon.");
      setForm(initialForm);
    }, 900);
  };

  return (
    <div className="rounded-[2rem] border border-gray-200 bg-white p-8 shadow-xl shadow-slate-200/40">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-500">Contact Us</p>
        <h2 className="mt-4 text-3xl font-semibold text-slate-900 sm:text-4xl">Add your restaurant to BookMyTable</h2>
        <p className="mt-3 text-sm leading-6 text-slate-500">
          Fill out the form below and our team will review your restaurant for listing.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-2 text-sm text-slate-700">
            Restaurant name <span className="text-red-500">*</span>
            <input
              value={form.name}
              onChange={(event) => handleChange("name", event.target.value)}
              className="w-full rounded-3xl border border-gray-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:bg-white"
              placeholder="La Bella Italia"
            />
          </label>

          <label className="space-y-2 text-sm text-slate-700">
            Cuisine type <span className="text-red-500">*</span>
            <input
              value={form.cuisine}
              onChange={(event) => handleChange("cuisine", event.target.value)}
              className="w-full rounded-3xl border border-gray-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:bg-white"
              placeholder="Italian, Japanese, Mexican"
            />
          </label>

          <label className="space-y-2 text-sm text-slate-700">
            Address <span className="text-red-500">*</span>
            <input
              value={form.address}
              onChange={(event) => handleChange("address", event.target.value)}
              className="w-full rounded-3xl border border-gray-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:bg-white"
              placeholder="123 Main Street, City, State"
            />
          </label>

          <label className="space-y-2 text-sm text-slate-700">
            Location
            <input
              value={form.location}
              onChange={(event) => handleChange("location", event.target.value)}
              className="w-full rounded-3xl border border-gray-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:bg-white"
              placeholder="Manhattan, NY"
            />
          </label>

          <label className="space-y-2 text-sm text-slate-700">
            Phone <span className="text-red-500">*</span>
            <input
              value={form.phone}
              onChange={(event) => handleChange("phone", event.target.value)}
              className="w-full rounded-3xl border border-gray-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:bg-white"
              placeholder="(123) 456-7890"
            />
          </label>

          <label className="space-y-2 text-sm text-slate-700">
            Email <span className="text-red-500">*</span>
            <input
              value={form.email}
              onChange={(event) => handleChange("email", event.target.value)}
              className="w-full rounded-3xl border border-gray-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:bg-white"
              placeholder="restaurant@example.com"
            />
          </label>

          <label className="space-y-2 text-sm text-slate-700">
            Website
            <input
              value={form.website}
              onChange={(event) => handleChange("website", event.target.value)}
              className="w-full rounded-3xl border border-gray-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:bg-white"
              placeholder="www.restaurant.com"
            />
          </label>

          <label className="space-y-2 text-sm text-slate-700">
            Price range
            <select
              value={form.priceRange}
              onChange={(event) => handleChange("priceRange", event.target.value)}
              className="w-full rounded-3xl border border-gray-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:bg-white"
            >
              <option value="$">$</option>
              <option value="$$">$$</option>
              <option value="$$$">$$$</option>
              <option value="$$$$">$$$$</option>
            </select>
          </label>

          <label className="space-y-2 text-sm text-slate-700">
            Capacity
            <input
              type="number"
              value={form.capacity}
              onChange={(event) => handleChange("capacity", event.target.value)}
              min={0}
              className="w-full rounded-3xl border border-gray-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:bg-white"
              placeholder="120"
            />
          </label>
        </div>

        <label className="space-y-2 text-sm text-slate-700">
          Description
          <textarea
            value={form.description}
            onChange={(event) => handleChange("description", event.target.value)}
            className="min-h-[140px] w-full rounded-[1.5rem] border border-gray-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:bg-white"
            placeholder="Tell us about your restaurant, cuisine style, specialties, or service highlights."
          />
        </label>

        {error && <div className="rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
        {success && <div className="rounded-3xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{success}</div>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex w-full items-center justify-center rounded-3xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-orange-300"
        >
          {isSubmitting ? "Submitting..." : "Submit Restaurant"}
        </button>
      </form>
    </div>
  );
};

export default AddRestaurantForm;
