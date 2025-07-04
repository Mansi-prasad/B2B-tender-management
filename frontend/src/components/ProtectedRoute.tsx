// "use client";
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";

// export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
//   const router = useRouter();

//   useEffect(() => {
//     const token = document.cookie.includes("token");
//     if (!token) router.push("/auth/login");
//   }, []);

//   return <>{children}</>;
// }

'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { isAuthenticated } from '@/lib/auth';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace('/login');
    }
  }, []);

  return <>{children}</>;
}
