"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
interface Company {
  id: number;
  name: string;
  industry: string;
  description: string;
  logoUrl: string;
  images: string;
  address: string;
  email: string;
  phone: string;
}

export default function CompanyProfilePage() {
  const router=useRouter();
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Unauthorized! Please login first.");
        router.push("/auth/login");
        return;
      }

      try {
        const res = await api.get("/company/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCompany(res.data);
      } catch (err) {
        console.error("Error loading company profile:", err);
        toast.error("Failed to load company profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <p className="mt-10 text-center">Loading company profile...</p>;
  }

  if (!company) {
    return <p className="mt-10 text-center">No company data found.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded shadow">
      <div className="flex justify-center items-center gap-4">
      {company.logoUrl && (
        <div className="mb-4">
          <img
            src={company.logoUrl}
            alt="Company Logo"
            className="h-20 w-20 shadow rounded-full"
          />
        </div>
      )}
      <h1 className="text-2xl font-bold mb-6">Company Profile</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p><span className="font-semibold">Name:</span> {company.name}</p>
          <p><span className="font-semibold">Industry:</span> {company.industry}</p>
          <p><span className="font-semibold">Email:</span> {company.email}</p>
          <p><span className="font-semibold">Phone:</span> {company.phone}</p>
          <p><span className="font-semibold">Address:</span> {company.address}</p>
        </div>
        <div>
          <p><span className="font-semibold">Description:</span></p>
          <p className="text-gray-700">{company.description}</p>
          {company.images && (
            <div className="mt-4">
              <span className="font-semibold">Images:</span>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {company.images.split(",").map((url, idx) => (
                  <img
                    key={idx}
                    src={url}
                    alt={`Image ${idx + 1}`}
                    className="h-24 w-full object-cover rounded shadow"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
