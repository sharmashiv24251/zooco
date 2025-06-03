import { fetchPetById, updatePet } from "@/lib/network";
import { Link2 } from "lucide-react";
import Link from "next/link";
import PetForm from "../../pet-form";

interface PageProps {
  params: { id: string };
}

const PetDetailPage = async ({ params }: PageProps) => {
  const { data, statusCode } = await fetchPetById(params.id);

  if (!data || statusCode !== 200) {
    return (
      <div className="p-4">
        <div className="bg-red-100 text-red-800 p-4 rounded-xl">
          <p className="text-lg">Pet not found</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1>{data?.name}</h1>
      <p>{data?.breed}</p>
      <p>{data?.age}</p>

      <Link
        href={`/pets/${params.id}`}
        className="text-blue-500 hover:underline flex items-center space-x-2"
      >
        <span>Back to Pet</span>
        <Link2 className="h-4 w-4" />
      </Link>
      {statusCode !== 200 && (
        <div className="bg-red-100 text-red-800 p-4 rounded-lg mt-4">
          <p>Error fetching pet details. Please try again later.</p>
        </div>
      )}
      {!data && statusCode === 200 && (
        <div className="bg-yellow-100 text-yellow-800 p-4 rounded-lg mt-4">
          <p>No pet found with this ID.</p>
        </div>
      )}

      <Link href={`/pets/${data?.id}/edit`}>edit pet</Link>
      <PetForm initialData={data} />
    </div>
  );
};

export default PetDetailPage;
