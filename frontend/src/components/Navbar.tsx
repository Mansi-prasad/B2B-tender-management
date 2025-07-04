"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { AiOutlineLogin } from "react-icons/ai";
export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const isLoggedIn = pathname.startsWith("/dashboard");
  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem("token");

    toast.success("Logged out successfully");

    // Redirect to home
    router.push("/");
  };

  return (
    <nav className="bg-teal-600 text-gray-200 p-4 flex justify-between">
      <div className="space-x-4">
        <Link href={isLoggedIn ? "/dashboard" : "/"}>Home</Link>
        <Link href={isLoggedIn ? "/dashboard/tenders" : "/tenders"}>Tenders</Link>
        {!isLoggedIn && <Link href="/companies">Companies</Link>}
        {isLoggedIn && <Link href="/dashboard/update-profile">Update Profile</Link>}
      </div>
      <div>
        {!isLoggedIn ? (
          <Link
            href="/auth/login"
            className="bg-white text-teal-800 px-6 py-1 rounded font-semibold flex gap-2 items-center"
          ><AiOutlineLogin />
            Login
          </Link>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-white text-teal-800 px-6 py-1.5 rounded font-semibold flex gap-2 items-center"
          >
            Logout <RiLogoutCircleRLine />
          </button>
        )}
      </div>
    </nav>
  );
}
