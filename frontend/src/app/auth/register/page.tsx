"use client";
import { useState } from "react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import Link from 'next/link';
export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    industry: "",
    description: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.post("/auth/register", form);
    router.push("/dashboard");
  };

  return (
    <div className="max-w-md mx-auto mt-6 p-6 rounded shadow-sm shadow-teal-600">
      <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="w-full border p-2 rounded" placeholder="Company's logo url" type="text" name="logo" onChange={handleChange}/>
        <div className="flex gap-2">
          <input className="w-full border p-2 rounded" placeholder="Company Name" name="name" onChange={handleChange}/>
         <input className="w-full border p-2 rounded" placeholder="Industry" name="industry" onChange={handleChange}/>
        </div>
        <textarea className="w-full border p-2 rounded" placeholder="Description" name="description" onChange={handleChange}/>
       <div className="flex gap-4">
         <input className="w-full border p-2 rounded" placeholder="Email" name="email" onChange={handleChange}/>
        <input className="w-full border p-2 rounded" placeholder="Password" type="password" name="password" onChange={handleChange}/>
       </div>
        <input className="w-full border p-2 rounded" placeholder="Address" type="text" name="address" onChange={handleChange}/>
        <input className="w-full border p-2 rounded" placeholder="Phone" type="number" name="phone" onChange={handleChange}/>
        <input className="w-full border p-2 rounded" placeholder="Company images url (comma separeted)" type="text" name="images" onChange={handleChange}/>
         <div>
          <span>Already have company?</span> <Link href="/auth/login" className="text-blue-600">login here</Link>
        </div>
        <button type="submit" className="w-full bg-teal-600 text-white p-2 rounded hover:bg-teal-700 cursor-pointer">Register</button>
      </form>
    </div>
  );
}
