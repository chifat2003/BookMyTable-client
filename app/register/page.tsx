import type { Metadata } from "next";
import AuthForm from "@/components/auth/AuthForm";

export const metadata: Metadata = {
  title: "Sign Up — BookMyTable",
  description: "Create a new BookMyTable account to book restaurants.",
};

export default function RegisterPage() {
  return (
    <main>
      <AuthForm mode="register" />
    </main>
  );
}
