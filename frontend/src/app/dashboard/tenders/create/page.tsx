"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { api } from "@/lib/api";
import { AxiosError } from "axios";
interface TenderInput {
  title: string;
  description: string;
  deadline: string;
  budget: number;
}

export default function CreateTenderPage() {
  const router = useRouter();
  const [form, setForm] = useState<TenderInput>({
    title: "",
    description: "",
    deadline: "",
    budget: 0,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "budget" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title || !form.description || !form.deadline || !form.budget) {
      toast.error("All fields are required.");
      return;
    }

    const isoDeadline = new Date(form.deadline).toISOString();

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Authentication required. Please log in.");
        router.push("/auth/login");
        return;
      }
      await api.post(
        "/tenders",
        {
          title: form.title,
          description: form.description,
          deadline: isoDeadline,
          budget: form.budget,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Tender created successfully!");
      router.push("/dashboard/tenders");
    } catch (error: unknown) {
  if (error instanceof AxiosError && error.response?.data?.message) {
    toast.error(error.response.data.message);
  } else {
    toast.error("Unexpected error while creating tender.");
  }
} finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 rounded shadow-sm shadow-teal-600">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-700">Create Tender</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Deadline</label>
          <input
            type="date"
            name="deadline"
            value={form.deadline}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Budget</label>
          <input
            type="number"
            name="budget"
            value={form.budget || ""}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 hover:cursor-pointer"
        >
          {loading ? "Creating..." : "Create Tender"}
        </button>
      </form>
    </div>
  );
}
