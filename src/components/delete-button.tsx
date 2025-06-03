"use client";

import { deletePet, deleteReminder } from "@/lib/network";
import { Button } from "./ui/button";

const DeleteButton = ({
  type,
  id,
}: {
  type: "pet" | "reminder";
  id: string;
}) => {
  const handleDelete = async () => {
    let response;
    if (type === "pet") {
      response = await deletePet(id);
      if (response.statusCode === 200) {
        window.location.href = "/pets";
      } else {
        alert("Failed to delete pet");
      }
    } else if (type === "reminder") {
      response = await deleteReminder(id);
      if (response.statusCode === 200) {
        window.location.href = "/reminders";
      } else {
        alert("Failed to delete reminder");
      }
    }
  };

  return (
    <Button
      onClick={handleDelete}
      variant="destructive"
      className="w-full  text-xl py-4 h-auto"
    >
      {type === "pet" ? "Delete Pet" : "Delete Reminder"}
    </Button>
  );
};

export default DeleteButton;
