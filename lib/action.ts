"use server";
import prisma from "./prisma";

export async function ToggleUserProgress(userId: string, lessonId: string) {
  const existing = await prisma.userProgress.findUnique({
    where: {
      userId_lessonId: {
        userId,
        lessonId,
      },
    },
  });
  if (existing) {
    return prisma.userProgress.update({
      where: {
        userId_lessonId: {
          userId,
          lessonId,
        },
      },
      data: {
        isCompleted: !existing.isCompleted,
      },
    });
  } else {
    return prisma.userProgress.create({
      data: {
        userId,
        lessonId,
        isCompleted: true,
      },
    });
  }
}
