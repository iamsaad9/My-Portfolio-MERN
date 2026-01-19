"use client";
import { useState } from "react";
import axios from "axios";

export default function AdminLoginPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      // Use the same base URL as your main auth
      const res = await axios.post(
        `${import.meta.env.VITE_DB_URL}/auth/admin/login`, // Note the /auth prefix
        payload,
        { withCredentials: true },
      );

      if (res.status === 200) {
        window.location.href = "/admin";
      }
    } catch (err: any) {
      // Access the message from your backend response
      const message = err.response?.data?.message || "Login failed";
      setError(message);
    } finally {
      setLoading(false);
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
          name="username" // Ensure this matches passport strategy
          type="text"
          placeholder="Username"
          required
          className="w-full border rounded p-2 text-white"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          className="w-full border rounded p-2 text-white"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded disabled:bg-gray-400"
        >
          {loading ? "Verifying..." : "Login"}
        </button>
      </form>
    </div>
  );
}
