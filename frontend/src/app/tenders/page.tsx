
"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import TenderCard from '@/components/TenderCard';
import Link from "next/link";

type Tender = {
  id: string;
  title: string;
  description: string;
  deadline: string;
  budget: number;
  companyId: string;
};
export default function TendersPage() {
  const [tenders, setTenders] = useState<Tender[]>([]);

  useEffect(() => {
    const fetchTenders = async () => {
      const { data } = await api.get("/tenders");
      console.log(data.tenders)
      setTenders(data.tenders);
    };
    fetchTenders();
  }, []);
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Tenders</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> 
      {
          tenders.map((tender) => (
            <Link key={tender.id} href={`/tenders/${tender.id}`} className="hover:bg-gray-50 cursor-pointer transition">
            <TenderCard tender={tender} />
            </Link>
          ))
        }
    </div>
    </div>
  );
}
