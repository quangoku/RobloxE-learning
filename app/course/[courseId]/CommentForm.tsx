"use client";
import { addComment } from "@/app/actions/comment";
import SubmitButton from "@/app/setting/SubmitButton";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

export default function CommentForm({ courseId }: { courseId: string }) {
  return (
    <form
      action={async (formData: FormData) => {
        formData.set("courseId", courseId);
        await addComment(formData);
      }}
      className="mb-8 p-4 border rounded-lg "
    >
      <h4 className="font-semibold mb-2">Your comment here :</h4>
      <Textarea
        placeholder="Write your comment here..."
        required
        className="mb-3"
        name="content"
      />

      <SubmitButton text="Comment"></SubmitButton>
    </form>
  );
}
