import { notFound } from "next/navigation";
import { getCourseById, getLessonsByCourseId } from "@/lib/data";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default async function Page({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  const course = await getCourseById(courseId);
  if (!course) {
    notFound();
  }
  const lessons = await getLessonsByCourseId(courseId);
  return (
    <div className="flex justify-center items-center  ">
      <div className="w-1/4 border-r pr-4">
        <h2 className="text-3xl font-bold mb-4 border-b-2 ">Lessons</h2>
        <ul className="space-y-2">
          {lessons.map((lesson) => (
            <li key={lesson.id}>
              <Link
                href={`/course/${courseId}/lesson/${lesson.id}`}
                className="block p-2 rounded hover:bg-gray-100 hover:text-black"
              >
                {lesson.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-sm p-5 w-xs border  cursor-pointer ">
        <div className="relative w-full h-60 mb-4">
          <Image
            src={course.image ? course.image : "/RobloxIcon.svg"}
            alt="Card Image"
            fill
            className="rounded-xl object-cover -z-10"
          />
        </div>
        <p className="text-lg font-semibold mb-2">{course.title}</p>
        <p className="text-gray-700 mb-4">{course.description}</p>
        <Link href={`/course/${courseId}/lesson/${lessons[0].id}`}>
          <Button className="w-full cursor-pointer hover:scale-[1.02]">
            Start
          </Button>
        </Link>
      </div>
    </div>
  );
}
