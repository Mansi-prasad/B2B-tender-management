// Import your API helper
import { api } from "@/lib/api";
import ApplyButton from "./ApplyButton";

export default async function TenderDetailPage({ params }: { params: { id: string } }) {
  let tender = null;
  let company = null;

  try {
    const { data } = await api.get(`/tenders/${params.id}`);
    tender = data;
  } catch (error) {
    console.error("Error fetching tender:", error);
    return (
      <div className="max-w-3xl mx-auto mt-8 p-6 bg-white border rounded shadow">
        <h1 className="text-xl font-bold">Tender Not Found</h1>
      </div>
    );
  }

  try {
    const { data } = await api.get(`/company/${tender.companyId}`);
    company = data;
  } catch (error) {
    console.error("Error fetching company:", error);
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
