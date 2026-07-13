import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="min-h-[calc(100vh-64px)] bg-slate-50 px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-gray-200 bg-white p-10 shadow-xl shadow-slate-200/40">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-orange-500">Page not found</p>
          <h1 className="mt-6 text-4xl font-semibold text-slate-900 sm:text-5xl">We couldn't find that table.</h1>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            The page you were looking for does not exist on BookMyTable. Use the links below to browse restaurants or submit your own.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <Link
            href="/"
            className="rounded-3xl border border-gray-200 bg-slate-50 px-5 py-4 text-center text-sm font-semibold text-slate-900 transition hover:border-orange-300 hover:bg-orange-50"
          >
            Home
          </Link>
          <Link
            href="/restaurants"
            className="rounded-3xl border border-gray-200 bg-slate-50 px-5 py-4 text-center text-sm font-semibold text-slate-900 transition hover:border-orange-300 hover:bg-orange-50"
          >
            Browse restaurants
          </Link>
          <Link
            href="/contact"
            className="rounded-3xl border border-gray-200 bg-slate-50 px-5 py-4 text-center text-sm font-semibold text-slate-900 transition hover:border-orange-300 hover:bg-orange-50"
          >
            Add a restaurant
          </Link>
        </div>
      </div>
    </main>
  );
}
