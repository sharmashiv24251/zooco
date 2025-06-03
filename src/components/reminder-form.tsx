"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Pet,
  Reminder,
  createReminder,
  updateReminder,
  fetchPets,
} from "@/lib/network";

interface ReminderFormProps {
  initialData?: Partial<Reminder> & { pet?: Pet | null };
  isEdit?: boolean;
}

export default function ReminderForm({
  initialData,
  isEdit,
}: ReminderFormProps) {
  const router = useRouter();
  const [pets, setPets] = useState<Pet[]>([]);
  const [petsLoading, setPetsLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    note: initialData?.note || "",
    petId: initialData?.petId || "", // Will be set after pets are loaded
    time: initialData?.time || "12:00",
    date: initialData?.date
      ? new Date(initialData.date).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0], // Set today as default
    frequency: initialData?.frequency || "Everyday",
    category: initialData?.category || "General",
    status: initialData?.status || "pending",
  });

  const categories = ["General", "Health", "Lifestyle"];
  const frequencies = ["Everyday", "Weekly", "Monthly", "Custom"];

  useEffect(() => {
    loadPets();
  }, []);

  const loadPets = async () => {
    setPetsLoading(true);
    try {
      const response = await fetchPets();
      if (response.data && response.data.length > 0) {
        setPets(response.data);
        // Set initial petId if not already set
        if (!formData.petId) {
          setFormData((prev) => ({ ...prev, petId: response.data[0].id }));
        }
      } else {
        setError("No pets found. Please add a pet first.");
      }
    } catch (err) {
      setError("Failed to load pets");
      console.error(err);
    } finally {
      setPetsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const reminderData = {
        ...formData,
        date: new Date(formData.date).toISOString(), // Properly format date
      };

      const response =
        isEdit && initialData?.id
          ? await updateReminder(initialData.id, reminderData)
          : await createReminder(reminderData);

      if (response.statusCode === 200 && response.data) {
        router.push("/reminders");
        router.refresh(); // Refresh the page to show updated data
      } else {
        setError(response.error || "Failed to save reminder");
      }
    } catch (err) {
      setError("An error occurred while saving");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const selectedPet = pets.find((pet) => pet.id === formData.petId);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="p-2 -ml-2 text-gray-600 hover:text-gray-800"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <h1 className="text-lg font-semibold text-gray-900">
            {isEdit ? "Edit Reminder" : "Add Reminder"}
          </h1>
          <button
            onClick={handleSubmit}
            disabled={loading || !formData.title || !formData.petId}
            className="px-4 py-2 bg-green-500 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-4 space-y-6">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {/* Pet and Category Selection */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">
              Select Pet
            </label>
            <div className="relative">
              {petsLoading ? (
                <div className="w-full bg-gray-100 h-11 rounded-lg animate-pulse" />
              ) : pets.length === 0 ? (
                <div className="text-red-500 text-sm">
                  No pets found.{" "}
                  <a href="/pets/add" className="underline">
                    Add a pet first
                  </a>
                </div>
              ) : (
                <select
                  value={formData.petId}
                  onChange={(e) => handleInputChange("petId", e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 pr-10 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  {pets.map((pet) => (
                    <option key={pet.id} value={pet.id}>
                      {pet.name}
                    </option>
                  ))}
                </select>
              )}
              <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
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
            {selectedPet && (
              <div className="flex items-center mt-2">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-2">
                  <span className="text-orange-600 text-sm font-medium">
                    {selectedPet.name.charAt(0)}
                  </span>
                </div>
                <span className="text-sm text-gray-600">
                  {selectedPet.name}
                </span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">
              Select Category
            </label>
            <div className="relative">
              <select
                value={formData.category}
                onChange={(e) => handleInputChange("category", e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 pr-10 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
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
            <div className="flex items-center mt-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                <svg
                  className="w-4 h-4 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-sm text-gray-600">{formData.category}</span>
            </div>
          </div>
        </div>

        {/* Reminder Info */}
        <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
          <div className="bg-black text-white px-4 py-3">
            <h2 className="font-medium">Reminder Info</h2>
          </div>

          <div className="p-4 space-y-4">
            <div>
              <label className="block text-lg font-medium text-gray-900 mb-3">
                Set a reminder for...
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="Type here..."
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  maxLength={100}
                  required
                />
                <div className="absolute right-3 top-3 text-sm text-gray-400">
                  {formData.title.length}/100
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">
                  Add Notes (Optional)
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    const textarea = document.createElement("textarea");
                    textarea.value = formData.note;
                    textarea.placeholder = "Add your notes here...";
                    textarea.className =
                      "w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none";
                    textarea.rows = 3;
                    textarea.onchange = (e) =>
                      handleInputChange(
                        "note",
                        (e.target as HTMLTextAreaElement).value
                      );

                    const container =
                      document.getElementById("notes-container");
                    if (container && !container.querySelector("textarea")) {
                      container.appendChild(textarea);
                    }
                  }}
                  className="text-green-500 font-medium"
                >
                  Add
                </button>
              </div>
              <div id="notes-container">
                {formData.note && (
                  <textarea
                    value={formData.note}
                    onChange={(e) => handleInputChange("note", e.target.value)}
                    placeholder="Add your notes here..."
                    className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    rows={3}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Reminder Settings */}
        <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
          <div className="bg-black text-white px-4 py-3 flex items-center justify-between">
            <h2 className="font-medium">Reminder Settings</h2>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 15l7-7 7 7"
              />
            </svg>
          </div>

          <div className="p-4 space-y-6">
            {/* Start Date */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Start Date
              </h3>
              <div className="relative">
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <div className="absolute right-3 top-3 text-gray-400">
                  <svg
                    className="w-5 h-5"
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

              <button
                type="button"
                className="mt-3 text-gray-500 text-sm flex items-center"
                onClick={() => {
                  // Add end date functionality if needed
                }}
              >
                <span className="mr-2">+</span>
                Add End Date
              </button>
            </div>

            {/* Reminder Time */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Reminder Time
              </h3>
              <div className="relative">
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) => handleInputChange("time", e.target.value)}
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="absolute right-3 top-3 text-gray-400">
                  <svg
                    className="w-5 h-5"
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
            </div>

            {/* Reminder Frequency */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                Reminder Frequency
              </h3>
              <p className="text-gray-500 text-sm mb-3">
                How often should this reminder repeat?
              </p>

              <div className="relative">
                <select
                  value={formData.frequency}
                  onChange={(e) =>
                    handleInputChange("frequency", e.target.value)
                  }
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 pr-10 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {frequencies.map((frequency) => (
                    <option key={frequency} value={frequency}>
                      {frequency}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
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
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
