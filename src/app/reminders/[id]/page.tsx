import { fetchReminderById } from "@/lib/network";
import ReminderForm from "@/components/reminder-form";
import { notFound } from "next/navigation";

interface EditReminderPageProps {
  params: { id: string };
}

export default async function EditReminderPage({
  params,
}: EditReminderPageProps) {
  const { id } = params;
  const { data: reminder, error, statusCode } = await fetchReminderById(id);

  if (statusCode === 404 || !reminder) {
    notFound();
  }

  if (error || !reminder) {
    throw new Error(error || "Failed to load reminder");
  }

  return <ReminderForm initialData={reminder} isEdit={true} />;
}
