"use client";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="flex items-center gap-2 text-gray-600 hover:text-gray-900 p-2"
    >
      <ChevronLeft size={24} />
      <span className="text-lg">Back</span>
    </button>
  );
}
