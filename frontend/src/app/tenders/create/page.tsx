"use client";
import { useState } from "react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function CreateTenderPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    description: "",
    deadline: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.post("/tenders", form);
    router.push("/tenders");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded">
      <h1 className="text-2xl font-bold mb-4">Create Tender</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border p-2 rounded"
          placeholder="Title"
          name="title"
          onChange={handleChange}
        />
        <textarea
          className="w-full border p-2 rounded"
          placeholder="Description"
          name="description"
          onChange={handleChange}
        />
        <input
          className="w-full border p-2 rounded"
          placeholder="Deadline (YYYY-MM-DD)"
          name="deadline"
          onChange={handleChange}
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
          Create
        </button>
      </form>
    </div>
  );
}
