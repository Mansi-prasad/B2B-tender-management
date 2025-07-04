"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Tender {
  id: number;
  title: string;
  description: string;
  budget: string;
  deadline: string;
  createdAt: string;
}

export default function MyTendersPage() {
  const router=useRouter();
  const [tenders, setTenders] = useState<Tender[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTenders = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          toast.error("Please log in first.");
          router.push("/auth/login");
          return;
        }

        const response = await api.get(`/tenders/mytenders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setTenders(response.data);
      } catch (error) {
        console.error("Error loading tenders:", error);
        toast.error("Failed to load tenders.");
      } finally {
        setLoading(false);
      }
    };

    fetchTenders();
  }, [router]);

  if (loading) {
    return <p className="text-center mt-10 text-2xl">Loading your tenders...</p>;
  }

  if (tenders.length === 0) {
    return (
      <div className="text-center mt-10">
        <p>No tenders found for your company.</p>
        <button
          onClick={() => router.push("/dashboard/tenders/create")}
          className="mt-4 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded"
        >
          Create your first tender
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow rounded">
      <div className="flex justify-between items-center my-4">
        <h1 className="text-2xl font-bold mb-4">Your Company Tenders</h1>
      <button
          onClick={() => router.push(`/dashboard/tenders/create`)}
          className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded cursor-pointer"
        >
          Create new tender
        </button>
      </div>
      <div className="grid gap-4">
        {tenders.map((tender) => (
          <Link href={`/dashboard/tenders/${tender.id}`} key={tender.id} >
          <div className="border p-4 rounded hover:shadow transition">
            <h2 className="text-xl font-semibold">{tender.title}</h2>
            <p className="text-gray-700 mb-2">{tender.description}</p>
            <p className="text-sm my-1">
              <strong>Budget:</strong> Rs.{tender.budget}
            </p>
            <p className="text-sm mb-1">
              <strong>Deadline:</strong> {new Date(tender.deadline).toLocaleDateString()}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Posted on {new Date(tender.createdAt).toLocaleDateString()}
            </p>
          </div></Link>
        ))}
      </div>
    </div>
  );
}
