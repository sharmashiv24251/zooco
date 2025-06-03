"use client";

import { updatePet, createPet } from "@/lib/network";
import { BackButton } from "@/components/back-button";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface InitialData {
  id: string;
  name: string;
  breed: string;
  age: number;
}

const PetForm = ({ initialData }: { initialData?: InitialData }) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    breed: initialData?.breed || "",
    age: initialData?.age || 1,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const result = initialData
        ? await updatePet(initialData.id, formData)
        : await createPet(formData);

      if (result.statusCode === 200) {
        router.push("/pets");
      } else {
        setError(result.error || "Something went wrong");
      }
    } catch (err) {
      setError("Failed to save pet");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <BackButton />
      <h1 className="text-3xl font-bold my-6">
        {initialData ? "Edit Pet" : "Add New Pet"}
      </h1>

      {error && (
        <div className="bg-red-100 text-red-800 p-4 rounded-xl mb-6">
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-lg font-medium">Pet Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-4 rounded-xl border text-lg bg-white"
            placeholder="Enter pet name"
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="space-y-2">
          <label className="text-lg font-medium">Breed</label>
          <input
            type="text"
            value={formData.breed}
            onChange={(e) =>
              setFormData({ ...formData, breed: e.target.value })
            }
            className="w-full p-4 rounded-xl border bg-white text-lg"
            placeholder="Enter breed"
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="space-y-2">
          <label className="text-lg font-medium">Age (years)</label>
          <input
            type="number"
            value={formData.age}
            onChange={(e) =>
              setFormData({ ...formData, age: Number(e.target.value) })
            }
            className="w-full p-4 rounded-xl bg-white border text-lg"
            required
            min="0"
            max="30"
            disabled={isSubmitting}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-green-500 text-white text-xl py-4 rounded-xl font-semibold hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting
            ? "Saving..."
            : initialData
            ? "Save Changes"
            : "Add Pet"}
        </button>
      </form>
    </div>
  );
};

export default PetForm;
