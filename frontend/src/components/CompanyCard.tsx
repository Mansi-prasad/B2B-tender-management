import type { Company } from "@/types/company";

export default function CompanyCard({ company }: { company: Company }) {
  return (
    <div className="border p-4 rounded shadow-md bg-white h-50" >
      <div className="flex gap-6 items-center">
        {company.logoUrl && <img src={company.logoUrl} alt={company.name} className="w-20 h-20 object-cover mb-2 rounded-full" />}
        <h2 className="text-xl font-semibold">{company.name}</h2>
      </div>
      <p>{company.description}</p>
    </div>
  );
}
