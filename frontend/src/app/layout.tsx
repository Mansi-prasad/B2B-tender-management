// // src/app/layout.tsx
// import "../styles/globals.css";
// import Link from "next/link";
// import { ReactNode } from "react";

// export default function RootLayout({ children }: { children: ReactNode }) {
//   return (
//     <html lang="en">
//       <body className="bg-gray-50 min-h-screen">
//         <nav className="shadow p-4 flex gap-4 bg-white">
//           <Link href="/" className=" font-semibold">Home</Link>
//           <Link href="/dashboard">Dashboard</Link>
//           <Link href="/tenders">Tenders</Link>
//           <Link href="/companies">Companies</Link>
//           <Link href="/profile">Profile</Link>
//           <Link href="/auth/register">Login</Link>
//         </nav>
//         <main className="container mx-auto p-4">{children}</main>
//       </body>
//     </html>
//   );
// }
import { Toaster } from 'react-hot-toast';
import Navbar from '@/components/Navbar';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <Navbar />
        <main className="p-6">
          <Toaster/>
          {children}</main>
      </body>
    </html>
  );
}
