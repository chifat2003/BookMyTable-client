"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { authClient } from "@/lib/auth-client";

type AuthMode = "login" | "register";

type AuthFormProps = {
  mode: AuthMode;
};

const AuthForm = ({ mode }: AuthFormProps) => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isRegister = mode === "register";
  const title = isRegister ? "Create your account" : "Welcome back";
  const subtitle = isRegister
    ? "Sign up now to reserve the best tables in your city."
    : "Log in to manage your reservations and restaurant favorites.";
  const buttonLabel = isRegister ? "Create account" : "Log in";
  const helpText = isRegister
    ? "Already have an account?"
    : "New here?";
  const actionLink = isRegister ? "/login" : "/register";
  const actionLabel = isRegister ? "Login" : "Sign up";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    if (!email.trim() || !password.trim() || (isRegister && !name.trim())) {
      setError("Please complete all required fields.");
      return;
    }

    if (isRegister && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setIsSubmitting(true);
    try {
      if (isRegister) {
        const res = await authClient.signUp.email({
          email,
          password,
          name,
        });
        
        if (res.error) {
          setError((res.error as any).message || "Sign up failed");
          setIsSubmitting(false);
          return;
        }
        
        setSuccess("Account created successfully!");
        setTimeout(() => {
          router.push("/login");
        }, 1000);
      } else {
        const res = await authClient.signIn.email({
          email,
          password,
        });
        
        if (res.error) {
          setError((res.error as any).message || "Login failed");
          setIsSubmitting(false);
          return;
        }
        
        setSuccess("Logged in successfully!");
        setTimeout(() => {
          router.push("/restaurants");
        }, 1000);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 py-20 px-4 sm:px-6">
      <div className="mx-auto w-full max-w-xl rounded-[2rem] border border-gray-200 bg-white p-8 shadow-xl shadow-slate-200/40">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-500">
            {isRegister ? "Sign Up" : "Login"}
          </p>
          <h1 className="mt-4 text-3xl font-semibold text-slate-900 sm:text-4xl">{title}</h1>
          <p className="mt-3 text-sm leading-6 text-slate-500">{subtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {isRegister && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700">
                Full name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="John Doe"
                className="mt-2 w-full rounded-3xl border border-gray-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:bg-white"
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700">
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="mt-2 w-full rounded-3xl border border-gray-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:bg-white"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              className="mt-2 w-full rounded-3xl border border-gray-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:bg-white"
            />
          </div>

          {isRegister && (
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700">
                Confirm password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="Repeat your password"
                className="mt-2 w-full rounded-3xl border border-gray-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:bg-white"
              />
            </div>
          )}

          {error && <div className="rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
          {success && <div className="rounded-3xl border border-green-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{success}</div>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex w-full items-center justify-center rounded-3xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-orange-300"
          >
            {isSubmitting ? "Submitting..." : buttonLabel}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          {helpText}{" "}
          <Link href={actionLink} className="font-semibold text-orange-500 hover:text-orange-600">
            {actionLabel}
          </Link>
        </p>

        <div className="mt-8 rounded-3xl border border-dashed border-gray-200 bg-slate-50 px-5 py-4 text-sm text-slate-500">
          <p className="font-medium text-slate-700">Demo notice</p>
          <p className="mt-1 leading-6">
            This is a static demo form. Submitting will redirect you to the restaurants page without a real account.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
