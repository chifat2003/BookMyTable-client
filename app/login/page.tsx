import type { Metadata } from "next";
import AuthForm from "@/components/auth/AuthForm";

export const metadata: Metadata = {
  title: "Login — BookMyTable",
  description: "Login to your BookMyTable account and reserve your table.",
};

export default function LoginPage() {
  return (
    <main>
      <AuthForm mode="login" />
    </main>
  );
}
