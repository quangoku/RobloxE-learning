import Card from "@/components/Card";
import { getAllCourse } from "@/lib/data";
export default async function Home() {
  const courses = await getAllCourse();
  return (
    <div className="flex justify-center  flex-wrap gap-3">
      {courses.map((course) => (
        <Card course={course} key={course.id}></Card>
      ))}
    </div>
  );
}
