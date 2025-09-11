"use client";
import React, { useState } from "react";
import Image from "next/image";
import SignIn from "./authentication/SignIn";
import { Progress } from "./ui/progress";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
}

export default function Card({ course }: { course: Course }) {
  const [showForm, setShowForm] = useState(false);

  const session = useSession();
  const router = useRouter();
  function handleRedirect() {
    if (session.data) {
      router.push(`/course/${course.id}`);
    } else {
      setShowForm(true);
    }
  }
  return (
    // <Link href={`/course/${course.id}`}>
    <>
      <div
        className="rounded-sm p-5 w-xl border transition-transform cursor-pointer hover:scale-[1.02]"
        onClick={handleRedirect}
      >
        <div className="relative w-full h-60 mb-4">
          <Image
            src={course.image ? course.image : "/RobloxIcon.svg"}
            alt="Card Image"
            fill
            className="rounded-xl object-cover -z-10 "
          />
        </div>
        <p className="text-lg font-semibold mb-2">{course.title}</p>
        <p className="text-gray-700 mb-4">{course.description}</p>
        <Progress value={10} className="h-2 rounded-full" />
      </div>
      {showForm ? (
        <SignIn
          onClose={() => {
            setShowForm(false);
          }}
        ></SignIn>
      ) : (
        ""
      )}
    </>
    // </Link>
  );
}
