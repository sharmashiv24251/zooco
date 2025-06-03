"use client";

import { Reminder, Pet } from "@prisma/client";
import Link from "next/link";
import React, { useState } from "react";
import { format } from "date-fns";
import { updateReminderStatus } from "@/lib/network";
import { useRouter } from "next/navigation";

// Extend Reminder to possibly include pet
type ReminderWithPet = Reminder & { pet?: Pet | null };

const ReminderCard = ({ reminder }: { reminder: ReminderWithPet }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();

  const handleStatusToggle = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation
    setIsUpdating(true);
    try {
      const newStatus =
        reminder.status === "completed" ? "pending" : "completed";
      const response = await updateReminderStatus(reminder.id, newStatus);
      if (response.statusCode === 200) {
        router.refresh();
      }
    } catch (error) {
      console.error("Failed to update status:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  function formatTime(timeString: string) {
    try {
      // Convert "HH:mm" format to a valid date
      const [hours, minutes] = timeString.split(":");
      const date = new Date();
      date.setHours(parseInt(hours), parseInt(minutes));
      return format(date, "h:mm a");
    } catch (error) {
      console.error("Error formatting time:", error);
      return "Invalid time";
    }
  }
  return (
    <Link href={`/reminders/${reminder.id}`} className="block">
      <div className="bg-white rounded-2xl shadow p-5 flex items-center justify-between border border-gray-200">
        <div className="flex-1">
          <p
            className={`text-xl font-semibold text-gray-800 ${
              reminder.status === "completed" ? "line-through" : ""
            }`}
          >
            {reminder.title}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            For {reminder.pet?.name ?? "Unknown Pet"} •{" "}
            {formatTime(reminder.time)} • {reminder.frequency}
          </p>
        </div>
        {/* Increased touch target with invisible padding */}
        <div
          className="relative p-4 -m-4" // Negative margin to maintain layout
          onClick={handleStatusToggle}
        >
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center text-sm
              ${
                isUpdating
                  ? "bg-gray-400"
                  : reminder.status === "completed"
                  ? "bg-black"
                  : "bg-green-500"
              }
              transition-colors duration-200
            `}
          >
            {isUpdating ? (
              <svg
                className="w-3 h-3 animate-spin text-white"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
            ) : (
              <span className="text-white">✓</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ReminderCard;
