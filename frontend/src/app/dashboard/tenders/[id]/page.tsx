"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { api } from "@/lib/api";
import toast from "react-hot-toast";

interface Tender {
  id: number;
  title: string;
  description: string;
  budget: string;
  deadline: string;
  createdAt: string;
}

export default function TenderDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [tender, setTender] = useState<Tender | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTender = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get(`/tenders/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTender(response.data);
      } catch (error) {
        console.error("Error loading tender:", error);
        toast.error("Failed to load tender.");
      } finally {
        setLoading(false);
      }
    };

    fetchTender();
  }, [id]);

  if (loading) return <p className="mt-10 text-center">Loading tender details...</p>;
  if (!tender) return <p className="mt-10 text-center">Tender not found.</p>;

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">{tender.title}</h1>
      <p className="mb-2 text-gray-700">{tender.description}</p>
      <p><strong>Budget:</strong> {tender.budget}</p>
      <p><strong>Deadline:</strong> {new Date(tender.deadline).toLocaleDateString()}</p>
      <p className="text-xs text-gray-500 mt-2">
        Posted on {new Date(tender.createdAt).toLocaleDateString()}
      </p>
      <div className="flex gap-4 mt-6">
        <button
          onClick={() => router.push(`/dashboard/tenders/${id}/edit`)}
          className="bg-teal-600 text-white px-4 py-2 rounded cursor-pointer"
        >
          Update Tender
        </button>
      </div>
    </div>
  );
}
