type Tender = {
  id: string;
  title: string;
  description: string;
   deadline: string;
  budget: number;
};

export default function TenderCard({ tender }: { tender: Tender }) {
  return (
    <div
      className="block border rounded p-4 shadow hover:shadow-md transition hover:bg-gray-50"
    >
      <h2 className="text-lg font-semibold mb-2">{tender.title}</h2>
      <p className="text-gray-800 line-clamp-2">{tender.description}</p>
      <div className="mt-2 flex justify-between text-sm text-gray-900">
        <div><span className="font-semibold">Deadline: </span><span>{new Date(tender.deadline).toLocaleDateString()}</span></div>
        <div><span className="font-semibold">Budget: </span><span> ${tender.budget.toFixed(2)}</span></div>
      </div>
    </div>
  );
}
