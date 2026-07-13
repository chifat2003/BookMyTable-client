"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useCallback } from "react";

interface UserProfileProps {
  onMenuClose?: () => void;
}

export default function UserProfile({ onMenuClose }: UserProfileProps) {
  const { data: session, isPending } = authClient.useSession();

  const handleLogout = useCallback(async () => {
    await authClient.signOut();
    window.location.href = "/";
  }, []);

  if (isPending) {
    return null;
  }

  if (session) {
    return (
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-semibold text-slate-900">
            Hi, {session.user.name || session.user.email}
          </p>
          <p className="text-xs text-slate-500">{session.user.email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 w-full md:w-auto flex-col md:flex-row">
      <Link
        href="/login"
        onClick={onMenuClose}
        className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors w-full md:w-auto text-center md:text-left"
      >
        Login
      </Link>
      <Link
        href="/register"
        onClick={onMenuClose}
        className="text-sm font-medium bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition-colors w-full md:w-auto text-center"
      >
        Sign Up
      </Link>
    </div>
  );
}
