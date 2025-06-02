export default function FavouritesPage() {
  return (
    <main className="px-6 py-8 space-y-6  min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900">Favorites ❤️</h1>
      <p className="text-lg text-gray-600">
        Quick access to routines and reminders you love.
      </p>

      <div className="bg-gray-100 rounded-xl p-6 shadow-inner border border-gray-200 text-center">
        <p className="text-gray-500 text-base italic">
          You haven't added any favorites yet.
        </p>
      </div>
    </main>
  );
}
