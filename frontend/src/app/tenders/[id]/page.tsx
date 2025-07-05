"use client"
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { api } from "@/lib/api";
import ApplyButton from "./ApplyButton";
type Tender = {
  id: string;
  title: string;
  description: string;
  deadline: string;
  budget: number;
  companyId: string;
};

type Company = {
  id: string;
  name: string;
};

export default function TenderDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [tender, setTender] = useState<Tender | null>(null);
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
    const fetchTender = async () => {
      try {
        const { data: tenderData } = await api.get(`/tenders/${id}`);
        setTender(tenderData);

        const { data: companyData } = await api.get(`/company/${tenderData.companyId}`);
        setCompany(companyData);
      } catch (error) {
        console.error("Error loading tender or company:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchTender();
  }, [id]);


   if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (!tender) {
    return (
      <div className="max-w-3xl mx-auto mt-8 p-6 bg-white border rounded shadow">
        <h1 className="text-xl font-bold">Tender Not Found</h1>
      </div>
    );
  }
  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">{tender.title}</h1>

      <p className="mb-4 text-gray-700">{tender.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="p-4 border rounded bg-gray-50">
          <h2 className="text-sm font-semibold text-gray-500 uppercase mb-1">Deadline</h2>
          <p className="text-gray-800">
            {new Date(tender.deadline).toLocaleDateString()}
          </p>
        </div>
        <div className="p-4 border rounded bg-gray-50">
          <h2 className="text-sm font-semibold text-gray-500 uppercase mb-1">Budget</h2>
          <p className="text-gray-800">${tender.budget.toFixed(2)}</p>
        </div>
        <div className="p-4 border rounded bg-gray-50">
          <h2 className="text-sm font-semibold text-gray-500 uppercase mb-1">Company</h2>
          <p className="text-gray-800">{company ? company.name : "Unknown Company"}</p>
        </div>
      </div>

      {/* This is now a Client Component */}
      <ApplyButton tenderId={tender.id} companyId={tender.companyId} />
    </div>
  );
}
