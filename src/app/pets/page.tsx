export default function PetsPage() {
  return (
    <main className="px-6 py-8  min-h-screen space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Your Pets 🐶</h1>

      <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Browny</h2>
          <p className="text-base text-gray-500">Golden Retriever · 4 yrs</p>
        </div>
        <span className="bg-green-100 text-green-800 text-sm px-4 py-1 rounded-full">
          Active
        </span>
      </div>

      <button className="w-full bg-green-500 text-white text-lg py-4 rounded-2xl font-semibold shadow-md hover:bg-green-600">
        + Add New Pet
      </button>
    </main>
  );
}
