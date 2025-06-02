export default function RemindersPage() {
  return (
    <main className="px-6 py-4.5 min-h-screen space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Reminders ⏰</h1>

      <section>
        <h2 className="text-lg font-semibold text-gray-600 mb-3">Today</h2>
        <div className="space-y-4">
          {["Morning Walk", "Breakfast", "Vet Visit"].map((task, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow p-5 flex items-center justify-between border border-gray-200"
            >
              <div>
                <p className="text-xl font-semibold text-gray-800">{task}</p>
                <p className="text-sm text-gray-500 mt-1">
                  For Browny • 2:00 PM • Daily
                </p>
              </div>
              <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-sm">
                ✓
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-gray-600 mt-8 mb-3">
          Completed
        </h2>
        <div className="bg-white px-5 py-4 rounded-2xl line-through text-gray-500 text-base shadow-inner">
          Morning Walk
        </div>
      </section>
    </main>
  );
}
