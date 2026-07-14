"use client";

import { useState, type FormEvent } from "react";
import { authClient } from "@/lib/auth-client";
import { postRestaurant } from "@/lib/api";

type AddRestaurantFormData = {
  name: string;
  cuisine: string;
  address: string;
  location: string;
  phone: string;
  email: string;
  website: string;
  imageLinks: string[];
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
  imageLinks: [""],
  priceRange: "",
  capacity: "",
  description: "",
};

const AddRestaurantForm = () => {
  const { data: session, isPending } = authClient.useSession();
  const userRole = (session?.user as any)?.role;
  const isOwner = userRole === "Owner";

  const [form, setForm] = useState<AddRestaurantFormData>(initialForm);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: Exclude<keyof AddRestaurantFormData, "imageLinks">, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleImageLinkChange = (index: number, value: string) => {
    setForm((current) => {
      const nextLinks = [...current.imageLinks];
      nextLinks[index] = value;
      return { ...current, imageLinks: nextLinks };
    });
  };

  const addImageLink = () => {
    setForm((current) => ({ ...current, imageLinks: [...current.imageLinks, ""] }));
  };

  const removeImageLink = (index: number) => {
    setForm((current) => ({
      ...current,
      imageLinks: current.imageLinks.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
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
    try {
      const payload = {
        name: form.name,
        cuisineType: form.cuisine,
        address: form.address,
        location: form.location,
        phone: form.phone,
        email: form.email,
        website: form.website || '',
        imageUrls: Array.isArray(form.imageLinks) ? form.imageLinks.filter(Boolean) : [],
        priceRange: form.priceRange,
        capacity: Number(form.capacity) || 0,
        description: form.description,
      };

      const res = await postRestaurant(payload);

      setSuccess(null);
      setForm(initialForm);
    } catch (err: any) {
      setError(err?.message ?? null);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isPending) {
    return (
      <div className="rounded-[2rem] border border-gray-200 bg-white p-8 shadow-xl shadow-slate-200/40">
        <p className="text-lg font-semibold text-slate-900">Checking access...</p>
        <p className="mt-3 text-sm text-slate-500">Please wait while we verify your account.</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="rounded-[2rem] border border-gray-200 bg-white p-8 shadow-xl shadow-slate-200/40">
        <p className="text-lg font-semibold text-slate-900">Owner access required</p>
        <p className="mt-3 text-sm text-slate-500">
          Only restaurant owners can submit a restaurant. Please log in or sign up with the Owner role to continue.
        </p>
      </div>
    );
  }

  if (!isOwner) {
    return (
      <div className="rounded-[2rem] border border-gray-200 bg-white p-8 shadow-xl shadow-slate-200/40">
        <p className="text-lg font-semibold text-slate-900">Access denied</p>
        <p className="mt-3 text-sm text-slate-500">
          Your account does not have Owner access. Restaurant submission is only available to users with the Owner role.
        </p>
      </div>
    );
  }

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

          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm font-medium text-slate-700">Image URLs</span>
              <button
                type="button"
                onClick={addImageLink}
                className="rounded-full bg-orange-50 px-4 py-2 text-xs font-semibold text-orange-600 transition hover:bg-orange-100"
              >
                Add another
              </button>
            </div>
            <div className="space-y-3">
              {form.imageLinks.map((link, index) => (
                <div key={index} className="flex items-center gap-3">
                  <input
                    value={link}
                    onChange={(event) => handleImageLinkChange(index, event.target.value)}
                    className="flex-1 rounded-3xl border border-gray-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:bg-white"
                    placeholder="https://example.com/restaurant-photo.jpg"
                  />
                  {form.imageLinks.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeImageLink(index)}
                      className="rounded-full bg-gray-100 px-3 py-2 text-xs text-slate-600 transition hover:bg-gray-200"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <label className="space-y-2 text-sm text-slate-700">
            Price range
            <select
              value={form.priceRange}
              onChange={(event) => handleChange("priceRange", event.target.value)}
              className="w-full rounded-3xl border border-gray-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:bg-white"
            >
              <option value="50+">USD 14.99+ </option>
              <option value="$$">USD 15.00 - $25.00</option>
              <option value="$$$">USD 25.00 - $50.00</option>
              <option value="$$$$">USD 50.00 - $100.00</option>
              <option value="$$$$$">USD 100.00+</option>
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
