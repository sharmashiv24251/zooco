import { deletePet, fetchPetById } from "@/lib/network";
import { BackButton } from "@/components/back-button";
import Link from "next/link";
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback } from "@/components/ui/avatar";
import { Calendar, Clock } from "lucide-react";
import DeleteButton from "@/components/delete-button";

interface PageProps {
  params: { id: string };
}

const PetDetailPage = async ({ params }: PageProps) => {
  const { id: petId } = await params;
  const { data, statusCode } = await fetchPetById(petId);

  if (!data || statusCode !== 200) {
    return (
      <div className="p-4">
        <BackButton />
        <div className="bg-red-100 text-red-800 p-4 rounded-xl mt-6">
          <p className="text-lg">Pet not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-lg mx-auto">
      <BackButton />

      <div className="mt-6 space-y-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-24 w-24">
            <AvatarFallback className="text-3xl bg-green-100 text-green-700">
              {data.name[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold">{data.name}</h1>
            <p className="text-xl text-gray-500">
              {data.breed} · {data.age} yrs
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md space-y-4">
          <h2 className="text-2xl font-semibold">Reminders</h2>
          {data.reminders.length === 0 ? (
            <p className="text-gray-500">No reminders set</p>
          ) : (
            <div className="space-y-4">
              {data.reminders.map((reminder) => (
                <div
                  key={reminder.id}
                  className="border rounded-lg p-4 space-y-2"
                >
                  <h3 className="font-medium text-lg">{reminder.title}</h3>
                  <div className="flex gap-4 text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar size={16} />
                      {reminder.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={16} />
                      {reminder.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <Link
          href={`/pets/${petId}/edit`}
          className="block w-full bg-green-500 text-white text-xl py-4 rounded-xl font-semibold text-center hover:bg-green-600"
        >
          Edit Pet
        </Link>

        <DeleteButton type="pet" id={petId} />
        <div className="h-20" />
      </div>
    </div>
  );
};

export default PetDetailPage;
