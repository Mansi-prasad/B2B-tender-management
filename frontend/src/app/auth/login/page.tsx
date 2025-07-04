"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      const { data } = await api.post("/company/login", {
        email,
        password,
      });

      if (!data.token) {
        throw new Error("No token received from server.");
      }

      // Store token
      localStorage.setItem("token", data.token);

      toast.success("Login successful!");
      router.push("/dashboard");
    } catch (error) {
      let errorMessage = "An unexpected error occurred.";

      if (axios.isAxiosError(error)) {
        // Prefer backend message
        errorMessage = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        // JS error
        errorMessage = error.message;
      }

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 rounded shadow-sm shadow-teal-700">
      <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border p-2 rounded"
          placeholder="Company's Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full border p-2 rounded"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="text-sm">
          <span>Haven't created a company yet? </span>
          <Link href="/auth/register" className="text-blue-700">
            Register here
          </Link>
        </div>
        <button
          type="submit"
          className="w-full bg-teal-600 text-white p-2 rounded hover:bg-teal-700 cursor-pointer"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
