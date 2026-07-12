import type { Metadata } from "next";
import AddRestaurantForm from "@/components/contact/AddRestaurantForm";

export const metadata: Metadata = {
  title: "Contact — BookMyTable",
  description: "Contact BookMyTable and add your restaurant to our listings.",
};

export default function ContactPage() {
  return (
    <main className="bg-slate-50">
      <section className="relative overflow-hidden py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_560px] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-500">
                Contact us
              </p>
              <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
                Submit your restaurant and join our dining community.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600">
                Fill out the form to add your restaurant to BookMyTable. We will review your submission and contact you with next steps.
              </p>

              <div className="mt-10 grid gap-6 sm:grid-cols-2">
                <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                  <p className="text-sm font-semibold text-slate-900">Email</p>
                  <p className="mt-3 text-sm text-slate-600">support@bookmytable.com</p>
                </div>
                <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                  <p className="text-sm font-semibold text-slate-900">Phone</p>
                  <p className="mt-3 text-sm text-slate-600">+1 (800) 123-4567</p>
                </div>
              </div>
            </div>

            <AddRestaurantForm />
          </div>
        </div>
      </section>
    </main>
  );
}
