// // // src/components/CompanyCard.tsx
// // import Link from "next/link";
// // import { Company } from "@/lib/types";

// // export default function CompanyCard({ company }: { company: Company }) {
// //   return (
// //     <div className="border bg-white p-4 rounded shadow flex gap-4 items-center">
// //       <img src={company.logoUrl} alt={company.name} className="w-16 h-16 object-cover rounded" />
// //       <div>
// //         <h3 className="text-lg font-semibold">{company.name}</h3>
// //         <p className="text-gray-700">{company.industry}</p>
// //         <Link
// //           href={`/companies/${company.id}`}
// //           className="text-blue-600 hover:underline text-sm"
// //         >
// //           View Details
// //         </Link>
// //       </div>
// //     </div>
// //   );
// // }


// import Link from "next/link";

// export default function CompanyCard({ company }: { company: any }) {
//   return (
//     <div className="border p-4 rounded shadow hover:shadow-lg flex items-center">
//       {company.logoUrl && (
//         <img src={company.logoUrl} alt="" className="w-16 h-16 object-cover rounded mr-4" />
//       )}
//       <div>
//         <h2 className="text-lg font-semibold">{company.name}</h2>
//         <p className="text-gray-500">{company.industry}</p>
//         <Link href={`/companies/${company.id}`} className="text-blue-600">View Profile</Link>
//       </div>
//     </div>
//   );
// }

type Company = {
  id: string;
  name: string;
  description: string;
  logoUrl?: string;
};

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
