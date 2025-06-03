import { fetchPetById, updatePet } from "@/lib/network";
import { Link2 } from "lucide-react";
import Link from "next/link";
import PetForm from "../../pet-form";

interface PageProps {
  params: { id: string };
}

const PetDetailPage = async ({ params }: PageProps) => {
  const petId = await params.id;
  const { data, statusCode } = await fetchPetById(petId);

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

      <PetForm initialData={data} />
    </div>
  );
};

export default PetDetailPage;
