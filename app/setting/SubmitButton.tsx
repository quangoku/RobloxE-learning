import { Button } from "@/components/ui/button";
import React from "react";
import { useFormStatus } from "react-dom";

export default function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button className="cursor-pointer" type="submit" disabled={pending}>
      {pending ? "Setting ..." : "Set Password"}
    </Button>
  );
}
