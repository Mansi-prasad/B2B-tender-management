"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";

type CompanyProfile = {
  id: string;
  name: string;
  description: string;
  industry: string;
  logoUrl: string;
};
export default function ProfilePage() {
  const [profile, setProfile] = useState<CompanyProfile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
       const { data } = await api.get<CompanyProfile>("/companies/me");
      setProfile(data);
    };
    fetchProfile();
  }, []);

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="max-w-md mx-auto mt-6">
      <img src={profile.logoUrl} alt="" className="w-32 h-32 object-cover rounded mb-4" />
      <h1 className="text-2xl font-bold">{profile.name}</h1>
      <p className="text-gray-600">{profile.industry}</p>
      <p>{profile.description}</p>
    </div>
  );
}
