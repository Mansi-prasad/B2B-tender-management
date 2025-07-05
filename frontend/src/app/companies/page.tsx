"use client";
import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import CompanyCard from "@/components/CompanyCard";
import axios from "axios";
import Link from "next/link";
import type { Company } from "@/types/company";
export default function CompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
const [loading, setLoading] = useState(false);

  const fetchCompanies = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/company");
      setCompanies(data);
      setError("");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "Failed to load companies.");
      } else {
      setError("An unexpected error occurred.");
  }
}finally{
  setLoading(false);
}
  };
const handleSearch = async () => {
  if (!search.trim()) {
    // If search box is empty, re-fetch all companies
    fetchCompanies();
    return;
  }

  setLoading(true);
  try {
    const { data } = await api.get(`/search?query=${encodeURIComponent(search)}`);
    setCompanies(data);
    setError("");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      setError(error.response?.data?.message || "Failed to search companies.");
    } else {
      setError("An unexpected error occurred.");
    }
  } finally {
    setLoading(false);
  }
};
   useEffect(() => {
    fetchCompanies();
  }, []);
  if(loading){
    return( <div className="flex justify-center items-center h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>);
  }
  return (
    <div className="max-w-4xl mx-auto mt-6">
      <div className="flex mb-4">
        <input
          className="flex-grow border p-2 rounded"
          placeholder="Search companies by their name and industry..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch} className="ml-2 bg-teal-600 text-white px-4 rounded">
          Search
        </button>
      </div>

      {error && (
        <div className="text-red-600 mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {
          companies.map((company) => (
            <Link key={company.id} href={`/companies/${company.id}`} className="hover:bg-gray-50 cursor-pointer transition">
            <CompanyCard company={company} />
            </Link>
          ))
        }
      </div>
    </div>
  );
}
