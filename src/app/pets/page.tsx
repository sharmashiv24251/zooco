import { fetchPets } from "@/lib/network";
import Link from "next/link";
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback } from "@/components/ui/avatar";

export default async function PetsPage() {
  const { data, statusCode } = await fetchPets();

  return (
    <main className="px-4 py-6 min-h-screen space-y-6 max-w-lg mx-auto">
      <h1 className="text-4xl font-bold text-gray-900">Your Pets 🐶</h1>

      {statusCode !== 200 && (
        <div className="bg-red-100 text-red-800 p-4 rounded-xl">
          <p className="text-lg">
            Error fetching pets. Please try again later.
          </p>
        </div>
      )}

      {data && data.length === 0 && (
        <div className="bg-yellow-100 text-yellow-800 p-4 rounded-xl">
          <p className="text-lg">No pets found. Add your first pet!</p>
        </div>
      )}

      <div className="space-y-4 mb-10">
        {data &&
          data.length > 0 &&
          data.map((pet) => (
            <Link
              href={`/pets/${pet.id}`}
              key={pet.id}
              className="bg-white rounded-xl shadow-md p-4 border border-gray-100 flex items-center gap-4 hover:shadow-lg transition-shadow"
            >
              <Avatar className="h-16 w-16">
                <AvatarFallback className="text-lg bg-green-100 text-green-700">
                  {pet.name[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  {pet.name}
                </h2>
                <p className="text-lg text-gray-500">
                  {pet.breed} · {pet.age} yrs
                </p>
              </div>
            </Link>
          ))}
      </div>

      <Link
        href="/pets/add"
        className="fixed bottom-25 left-4 right-4 max-w-lg mx-auto bg-green-500 p-4 text-white text-xl py-4 rounded-xl font-semibold shadow-lg hover:bg-green-600 flex items-center justify-center gap-2"
      >
        + Add New Pet
      </Link>
    </main>
  );
}
