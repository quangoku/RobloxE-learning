import React from "react";
import {
  getLessonsByCourseId,
  getVideoPlayBackIdByLessonId,
  isFinishedProgress,
} from "@/lib/data";
import Link from "next/link";
import Video from "./Video";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ToggleProgress from "./ToggleProgress";

export default async function page({
  params,
}: {
  params: Promise<{ courseId: string; lessonId: string }>;
}) {
  const { courseId, lessonId } = await params;
  const session = await getServerSession(authOptions);
  const lessons = await getLessonsByCourseId(courseId);
  const currentLesson = lessons.find((l) => l.id === lessonId);
  const videoPlayBackId = currentLesson?.Video?.playbackId;
  const isDone = await isFinishedProgress(session?.user?.id, lessonId);
  return (
    <div className="flex h-screen  ">
      <div className="w-1/4 border-r p-4 space-y-4 ">
        {lessons.map((lesson) => (
          <div
            key={lesson.id}
            className={`p-3  cursor-pointer rounded-sm  border-b ${
              lesson.id === currentLesson?.id ? "bg-gray-400" : ""
            } `}
          >
            <Link href={`/course/${courseId}/lesson/${lesson.id}`}>
              <p className="hover:scale-105 transition  "> {lesson.title}</p>
            </Link>
          </div>
        ))}
      </div>

      <div className="flex-1 p-6 flex flex-col space-y-4">
        <div className="flex justify-between ">
          <span className="font-semibold text-2xl">{currentLesson?.title}</span>

          <ToggleProgress
            isDone={isDone}
            userId={session?.user?.id}
            lessonId={lessonId}
          ></ToggleProgress>
        </div>
        {/*video*/}
        <div className="flex-1  flex items-center justify-center  p-2 ">
          {videoPlayBackId ? (
            <Video
              videoPlayBackId={videoPlayBackId}
              key={videoPlayBackId}
            ></Video>
          ) : (
            "Video not found"
          )}
        </div>
      </div>
    </div>
  );
}
