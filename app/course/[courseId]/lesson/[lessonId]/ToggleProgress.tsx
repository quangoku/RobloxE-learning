"use client";
import { Button } from "@/components/ui/button";
import { ToggleUserProgress } from "@/lib/data";
import { toast } from "sonner";
import React, { useState } from "react";

export default function ToggleProgress({
  isDone,
  userId,
  lessonId,
}: {
  isDone: boolean;
  userId: string;
  lessonId: string;
}) {
  const [state, setState] = useState(isDone);
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    setLoading(true);
    try {
      const res = await ToggleUserProgress(userId, lessonId);
      if (res) {
        setState(res.isCompleted);
        toast.success("Updated Successfully", {
          duration: 3000,
          description: new Date(res.updatedAt).toLocaleString("en-US"),
          action: {
            label: "x",
          },
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleToggle}
      disabled={loading}
      className={`cursor-pointer transition text-black bg-green-100 dark:text-black ${
        loading
          ? "opacity-50 cursor-not-allowed"
          : "hover:scale-105 hover:bg-green-200"
      }`}
    >
      {loading ? "Updating..." : state ? "Mark UnDone" : "Mark Done"}
    </Button>
  );
}
