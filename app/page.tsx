import Card from "@/components/Card";
import { getAllCourse, getUserProgress } from "@/lib/data";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
export default async function Home() {
  const rawCourses = await getAllCourse();
  const session = await getServerSession(authOptions);

  let courses;
  if (session?.user) {
    courses = await Promise.all(
      rawCourses.map(async (course) => {
        const progress = await getUserProgress(course.id, session?.user?.id);
        return { ...course, progress };
      })
    );
  } else {
    courses = rawCourses.map((course) => ({ ...course, progress: 0 }));
  }

  return (
    <div className="flex justify-center  flex-wrap gap-3 ">
      {courses.length === 0 ? (
        <p>No courses available</p>
      ) : (
        courses.map((course) => <Card course={course} key={course.id} />)
      )}
    </div>
  );
}
