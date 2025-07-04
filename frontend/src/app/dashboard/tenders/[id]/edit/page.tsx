"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { api } from "@/lib/api";
import toast from "react-hot-toast";
import axios from "axios";
export default function EditTenderPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [form, setForm] = useState({
    title: "",
    description: "",
    budget: "",
    deadline: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTender = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get(`/tenders/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const tender = res.data;
        setForm({
          title: tender.title,
          description: tender.description,
          budget: tender.budget,
          deadline: tender.deadline.slice(0,10),
        });
      } catch (err) {
        console.error(err);
        toast.error("Failed to load tender.");
      } finally {
        setLoading(false);
      }
    };

    fetchTender();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleUpdate = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const token = localStorage.getItem("token");

    // Convert budget to number
    const payload = {
      ...form,
      budget: Number(form.budget),
      // Convert date to ISO string
      deadline: new Date(form.deadline).toISOString(),
    };

    await api.put(`/tenders/${id}`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });

    toast.success("Tender updated successfully!");
    router.push(`/dashboard/tenders/${id}`);
  } catch (err) {
    console.error("Update error:", err);
    if (axios.isAxiosError(err)) {
      const res = err.response?.data;
      if (res?.errors?.length) {
        res.errors.forEach((e: any) => toast.error(`${e.field}: ${e.message}`));
      } else if (res?.message) {
        toast.error(res.message);
      } else {
        toast.error("Something went wrong.");
      }
    } else {
      toast.error("Unexpected error occurred.");
    }
  }
};

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this tender?")) return;
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/tenders/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Tender deleted successfully!");
      router.push("/dashboard/tenders");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete tender.");
    }
  };

  if (loading) return <p className="mt-10 text-center">Loading tender...</p>;

  console.log("Form data being sent:", form);
  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Edit Tender</h1>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full border p-2 rounded"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border p-2 rounded"
        />
        <input
        type="number"
          name="budget"
          value={form.budget}
          onChange={handleChange}
          placeholder="Budget"
          className="w-full border p-2 rounded"
        />
        <input
          type="date"
          name="deadline"
          value={form.deadline}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        
        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded cursor-pointer"
          >
            Update Tender
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded cursor-pointer"
          >
            Delete Tender
          </button>
        </div>
      </form>
    </div>
  );
}
