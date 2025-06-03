import ReminderCard from "@/components/reminder-card";
import { fetchReminders } from "@/lib/network";
import { format } from "date-fns";

export default async function RemindersPage() {
  const { data: reminders = [], error } = await fetchReminders();

  if (error) {
    return (
      <div className="px-6 py-4.5 text-red-500">
        Error loading reminders: {error}
      </div>
    );
  }

  const today = new Date();

  // Static calendar days for display
  const daysOfWeek = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
  const calendarDays = [26, 27, 28, 29, 30, 1, 2];

  return (
    <main className="px-6 py-4.5 min-h-screen space-y-6 pb-20">
      <h1 className="text-3xl font-bold text-gray-900">Reminders ⏰</h1>

      <div className="bg-emerald-400 rounded-xl p-4">
        <p className="text-sm mb-2">{format(today, "MMMM yyyy")}</p>
        <div className="grid grid-cols-7 gap-2 text-center">
          {daysOfWeek.map((day) => (
            <div key={day} className="text-xs">
              {day}
            </div>
          ))}

          {calendarDays.map((day, i) => (
            <div
              key={i}
              className={`rounded-full w-8 h-8 flex items-center justify-center text-sm
                ${
                  day >= 28 && day <= 30
                    ? "bg-white/80 text-emerald-500 font-bold"
                    : "bg-white/20"
                }`}
            >
              {day}
            </div>
          ))}
        </div>
      </div>

      <section>
        <h2 className="text-lg font-semibold text-gray-600 mb-3">Today</h2>
        <div className="space-y-4">
          {!reminders ||
            (!reminders.length && (
              <p className="text-gray-500 text-center py-4">
                No reminders for today
              </p>
            ))}
          {reminders &&
            reminders
              .filter((reminder) => reminder.status === "pending")
              .map((reminder) => (
                <ReminderCard key={reminder.id} reminder={reminder} />
              ))}
          {reminders &&
            reminders.filter((r) => r.status === "pending").length === 0 && (
              <p className="text-gray-500 text-center py-4">
                No pending reminders
              </p>
            )}
        </div>
      </section>

      {reminders && reminders.some((r) => r.status === "completed") && (
        <section className="pb-10">
          <h2 className="text-lg font-semibold text-gray-600 mt-8 mb-3">
            Completed
          </h2>
          {reminders
            .filter((r) => r.status === "completed")
            .map((reminder) => (
              <ReminderCard key={reminder.id} reminder={reminder} />
            ))}
        </section>
      )}
    </main>
  );
}
