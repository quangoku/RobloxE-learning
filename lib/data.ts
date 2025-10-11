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
    include: {
      Lessons: true,
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
    include: {
      Video: true,
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
  return lesson;
}
export async function getVideoPlayBackIdByLessonId(lessonId: string) {
  const video = await prisma.video.findUnique({
    where: {
      lessonId: lessonId,
    },
  });
  return video?.playbackId;
}
export async function isFinishedProgress(userId: string, lessonId: string) {
  const progress = await prisma.userProgress.findUnique({
    where: {
      userId_lessonId: {
        userId,
        lessonId,
      },
    },
  });
  return progress?.isCompleted;
}

export async function getUserProgress(courseId: string, userId: string) {
  const lessons = await getLessonsByCourseId(courseId);
  const lessonIds = lessons.map((l) => l.id);
  if (lessons.length === 0) return 0;
  const finished = await prisma.userProgress.findMany({
    where: {
      isCompleted: true,
      lessonId: { in: lessonIds },
      userId: userId,
    },
  });
  if (finished.length === 0) {
    return 0;
  }
  return Math.floor((finished.length / lessons.length) * 100);
}
