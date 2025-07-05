
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
interface ApplyButtonProps {
  tenderId: string;
  companyId: string; // you might also get this from user context instead
}

export default function ApplyButton({ tenderId, companyId }: ApplyButtonProps) {
  const [proposalText, setProposalText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

 const handleApply = async () => {
  if (!proposalText.trim()) {
    toast.error("Proposal text cannot be empty.");
    return;
  }

  setIsLoading(true);

  try {
    const token = localStorage.getItem("token");

    if (!token) {
      // No token at all (user not logged in)
      toast.error(" Please login first.");
      router.push("/auth/login");
      return;
    }

    await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}` + "/api/applications",
      {
        tenderId,
        companyId,
        proposalText,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    toast.success("Application submitted successfully!");
    router.push("/applications");
  } catch (err: unknown) {
  if (axios.isAxiosError(err)) {
    console.error("Error submitting application:", err);

    if (err.response?.status === 401) {
      toast.error("Please login first.");
      router.push("/auth/login");
    } else {
      toast.error(
        err.response?.data?.message || "Something went wrong. Try again."
      );
    }
  } else {
    console.error("Unexpected error:", err);
    toast.error("Something went wrong. Try again.");
  }
} finally {
    setIsLoading(false);
  }
};

  return (
    <div className="border rounded p-4 bg-gray-50 space-y-3">
      <textarea
        placeholder="Write your proposal..."
        value={proposalText}
        onChange={(e) => setProposalText(e.target.value)}
        className="w-full border rounded p-2 resize-y"
        rows={4}
      />
      <button
        onClick={handleApply}
        disabled={isLoading}
        className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition disabled:opacity-50"
      >
        {isLoading ? "Applying..." : "Apply for Tender"}
      </button>
    </div>
  );
}

