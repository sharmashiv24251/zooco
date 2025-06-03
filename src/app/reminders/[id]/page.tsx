import { BackButton } from "@/components/back-button";
import { fetchReminderById } from "@/lib/network";
import { Reminder } from "@prisma/client";
import { format } from "date-fns";

// Type definitions

interface PageProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = params;
  const {
    data: reminder,
    error,
  }: { data: Reminder | null; error: string | null } = await fetchReminderById(
    id
  );

  if (error || !reminder) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-xl p-6 text-center">
            <div className="text-red-500 text-lg font-medium">
              {error ? `Error: ${error}` : "Reminder not found"}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <BackButton />
          <h1 className="text-lg font-semibold text-gray-900">
            Reminder Details
          </h1>
          <div className="w-10" /> {/* Spacer */}
        </div>
      </div>

      <div className="px-4 py-6">
        <div className="max-w-md mx-auto space-y-6">
          {/* Pet and Category Selection Display */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">
                Pet
              </label>
              <div className="bg-white rounded-lg border border-gray-200 p-3">
                <div className="flex items-center space-x-3">
                  {reminder.pet?.avatar ? (
                    <img
                      src={reminder.pet.avatar}
                      alt={reminder.pet.name}
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-orange-200 rounded-full flex items-center justify-center">
                      <span className="text-orange-600 text-sm font-medium">
                        {reminder.pet?.name?.charAt(0) || "?"}
                      </span>
                    </div>
                  )}
                  <span className="font-medium text-gray-900">
                    {reminder.pet?.name || "Unknown Pet"}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">
                Category
              </label>
              <div className="bg-white rounded-lg border border-gray-200 p-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-blue-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="font-medium text-gray-900">
                    {reminder.category}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Reminder Info Section */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="bg-black text-white px-4 py-3 rounded-t-lg">
              <h2 className="font-semibold">Reminder Info</h2>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Reminder for...
                </label>
                <div className="bg-gray-50 rounded-lg p-3 min-h-[60px] flex items-start">
                  <span className="text-gray-700">{reminder.title}</span>
                </div>
              </div>

              {reminder.note && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-900">
                      Notes
                    </label>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 min-h-[60px] flex items-start">
                    <span className="text-gray-700">{reminder.note}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Reminder Settings Section */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="bg-black text-white px-4 py-3 rounded-t-lg flex items-center justify-between">
              <h2 className="font-semibold">Reminder Settings</h2>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Start Date
                </label>
                <div className="bg-gray-50 rounded-lg p-3 flex items-center justify-between">
                  <span className="text-gray-700">
                    {reminder.date
                      ? format(new Date(reminder.date), "dd.MM.yyyy")
                      : "N/A"}
                  </span>
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Reminder Time
                </label>
                <div className="bg-gray-50 rounded-lg p-3 flex items-center justify-between">
                  <span className="text-gray-700">{reminder.time}</span>
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Reminder Frequency
                </label>
                <div className="text-xs text-gray-500 mb-2">
                  How often should this reminder repeat?
                </div>
                <div className="bg-gray-50 rounded-lg p-3 flex items-center justify-between">
                  <span className="text-gray-700 capitalize">
                    {reminder.frequency}
                  </span>
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>

              {/* Status Display */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Status
                </label>
                <div className="bg-gray-50 rounded-lg p-3">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      reminder.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {reminder.status === "completed"
                      ? "✓ Completed"
                      : "⏳ Pending"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Created Date */}
          <div className="text-center ">
            <div className="text-xs text-gray-400">
              Created:{" "}
              {format(new Date(reminder.createdAt), "MMM dd, yyyy 'at' h:mm a")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
