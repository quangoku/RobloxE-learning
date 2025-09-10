import prisma from "./prisma";
export async function getAllCourse() {
  const courses = await prisma.course.findMany();
  return courses;
}
export async function getCourseById(id: string) {
  const course = await prisma.course.findUnique({
    where: {
      id: id,
    },
  });
  return course;
}
export async function getLessonsByCourseId(courseId: string) {
  const lessons = await prisma.lesson.findMany({
    where: {
      courseId: courseId,
    },
    orderBy: {
      position: "asc",
    },
  });
  return lessons;
}
export async function getLessonById(id: string) {
  const lesson = await prisma.lesson.findUnique({
    where: {
      id: id,
    },
  });
}
export async function getVideoPlayBackIdByLessonId(lessonId: string) {
  const video = await prisma.video.findUnique({
    where: {
      lessonId: lessonId,
    },
  });
  return video?.playbackId;
}
