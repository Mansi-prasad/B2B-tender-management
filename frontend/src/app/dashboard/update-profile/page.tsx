"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import axios from "axios";
import toast from "react-hot-toast";

export default function UpdateProfilePage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    industry: "",
    description: "",
    logoUrl: "",
    images: "",
    address: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(true);

  // Fetch existing data
  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Please login first.");
          router.push("/auth/login");
          return;
        }

        const response = await api.get(`/company/single`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const companyData = response.data;
        setForm({
          name: companyData.name || "",
          industry: companyData.industry || "",
          description: companyData.description || "",
          logoUrl: companyData.logoUrl || "",
          images: companyData.images || "",
          address: companyData.address || "",
          email: companyData.email || "",
          phone: companyData.phone || "",
        });
      } catch (error) {
        console.error("Error fetching company:", error);
        toast.error("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, [router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Please login first.");
        return;
      }

      await api.put(`/company`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Profile updated successfully!");
      router.push("/dashboard");
    } catch (error) {
      console.error("Update error:", error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Update failed.");
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

   if(loading){
    return( <div className="flex justify-center items-center h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow max-w-lg mx-auto"
    >
      <h2 className="text-xl font-bold mb-4 text-center">Update your Profile</h2>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Company name</label>
        <input
        id="name"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Company Name"
        className="w-full mb-3 p-2 border rounded"
      />
      </div>
      <div>
        <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
        <input
        id="industry"
        name="industry"
        value={form.industry}
        onChange={handleChange}
        placeholder="Industry"
        className="w-full mb-3 p-2 border rounded"
      />
      </div>
      <div>
        <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full mb-3 p-2 border rounded"
      />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
        id="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        className="w-full mb-3 p-2 border rounded"
      />
      </div>
      <div>
        <label htmlFor="logoUrl" className="block text-sm font-medium text-gray-700 mb-1">Logo URL</label>
        <input
        id="logoUrl"
        name="logoUrl"
        value={form.logoUrl}
        onChange={handleChange}
        placeholder="Logo URL"
        className="w-full mb-3 p-2 border rounded"
      />
      </div>
      <div>
        <label htmlFor="images" className="block text-sm font-medium text-gray-700 mb-1">Images</label>
        <input
        id="images"
        name="images"
        value={form.images}
        onChange={handleChange}
        placeholder="Images URLs (comma-separated)"
        className="w-full mb-3 p-2 border rounded"
      />
      </div>
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
        <input
        id="address"
        name="address"
        value={form.address}
        onChange={handleChange}
        placeholder="Address"
        className="w-full mb-3 p-2 border rounded"
      />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
        <input
        id="phone"
        name="phone"
        value={form.phone}
        onChange={handleChange}
        placeholder="Phone"
        className="w-full mb-3 p-2 border rounded"
      />
      </div>
      <div>
        <button
        type="submit"
        className="bg-teal-600 text-white px-4 py-2 rounded hover:cursor-pointer"
      >
        Update profile
      </button>
      </div>
    </form>
  );
}
