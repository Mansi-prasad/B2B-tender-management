"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { api } from "@/lib/api";

type Company = {
  id: string;
  name: string;
  description: string;
  industry: string;
  address: string;
  email: string;
  phone: string;
  logoUrl: string | null;
  images: string | null;
};

export default function CompanyDetailPage() {
  const params = useParams();
  const { id } = params as { id: string };
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const { data } = await api.get<Company>(`/company/${id}`);
        setCompany(data);
      } catch (err) {
        console.error("Error fetching company:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, [id]);

  if (!company) {
  return <div>Company not found.</div>;
}
if (loading) {
  return <div>Loading Company...</div>;
}
 const imageUrls =
    company.images?.split(",").map((url) => url.trim()) || [];

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      {/* Logo */}
      {company.logoUrl && (
        <div className="flex justify-center mb-6">
          <img
            src={company.logoUrl}
            alt={`${company.name} logo`}
            width={120}
            height={120}
            className="rounded shadow-md object-contain"
          />
        </div>
      )}

      {/* Company Name */}
      <h1 className="text-3xl font-bold mb-2 text-center">{company.name}</h1>
      <p className="text-gray-600 text-center mb-6">{company.industry}</p>

      {/* Description */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Description</h2>
        <p className="text-gray-700">{company.description}</p>
      </div>

      {/* Contact Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="p-4 border rounded shadow-sm">
          <h3 className="text-lg font-medium mb-1">Address</h3>
          <p className="text-gray-700">{company.address}</p>
        </div>
        <div className="p-4 border rounded shadow-sm">
          <h3 className="text-lg font-medium mb-1">Contact</h3>
          <p className="text-gray-700">Email: {company.email}</p>
          <p className="text-gray-700">Phone: {company.phone}</p>
        </div>
      </div>

      {/* Images */}
      {imageUrls.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {imageUrls.map((url: string, index: number) => (
              <div key={index} className="w-full h-48 relative">
                <img
                  src={url}
                  alt={`Company image ${index + 1}`}
                  
                  className="object-cover rounded h-full w-full"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
