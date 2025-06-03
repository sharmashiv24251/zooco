import { Reminder, Pet } from "@prisma/client";
import Link from "next/link";
import React from "react";
import { format } from "date-fns";

// Extend Reminder to possibly include pet
type ReminderWithPet = Reminder & { pet?: Pet | null };

const ReminderCard = ({ reminder }: { reminder: ReminderWithPet }) => {
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
        <div>
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
        <div
          className={`w-6 h-6 rounded-full  text-white flex items-center justify-center text-sm ${
            reminder.status === "completed" ? "bg-black" : "bg-green-500"
          }`}
        >
          ✓
        </div>
      </div>
    </Link>
  );
};

export default ReminderCard;
