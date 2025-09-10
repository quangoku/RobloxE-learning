import React from "react";
import { getLessonsByCourseId, getVideoPlayBackIdByLessonId } from "@/lib/data";
import Link from "next/link";
import Video from "@/components/Video";
export default async function page({
  params,
}: {
  params: Promise<{ courseId: string; lessonId: string }>;
}) {
  const { courseId, lessonId } = await params;
  const lessons = await getLessonsByCourseId(courseId);
  const currentLesson = lessons.find((l) => l.id === lessonId);
  const videoPlayBackId = await getVideoPlayBackIdByLessonId(currentLesson?.id);
  return (
    <div className="flex h-screen  ">
      <div className="w-1/4 border-r p-4 space-y-4 ">
        {lessons.map((lesson) => (
          <div key={lesson.id} className={`p-3  cursor-pointer border-b  `}>
            <Link href={`/course/${courseId}/lesson/${lesson.id}`}>
              <p className="hover:scale-105 transition  "> {lesson.title}</p>
            </Link>
          </div>
        ))}
      </div>

      <div className="flex-1 p-6 flex flex-col space-y-4">
        <div className="flex justify-between ">
          <span className="font-semibold text-2xl">{currentLesson?.title}</span>
          <button className=" border px-4 py-2 rounded-sm cursor-pointer hover:scale-105 transition">
            Mark Done
          </button>
        </div>
        {/*video*/}
        <div className="flex-1  flex items-center justify-center  p-2 ">
          <Video videoPlayBackId={videoPlayBackId}></Video>
        </div>
      </div>
    </div>
  );
}
