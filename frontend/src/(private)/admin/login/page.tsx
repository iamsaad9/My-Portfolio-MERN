"use client";
import { useState } from "react";

export default function AdminLoginPage() {
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    const res = await fetch("/api/admin/login", {
      method: "POST",
      body: form,
    });

    if (res.ok) {
      window.location.href = "/admin"; // redirect to admin panel
    } else {
      const data = await res.json();
      setError(data.error);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm space-y-4 border p-6 rounded-xl"
      >
        <h1 className="text-2xl font-bold">Admin Login</h1>

        <input
          name="username"
          type="text"
          placeholder="Username"
          className="w-full border rounded p-2"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full border rounded p-2"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button className="w-full bg-black text-white py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
