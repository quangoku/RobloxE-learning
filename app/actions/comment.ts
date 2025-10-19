"use server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";
export async function addComment(formdata: FormData) {
  try {
    const content = formdata.get("content");
    const courseId = formdata.get("courseId");
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { message: "Unauthorized" };
    }
    await prisma.comment.create({
      data: {
        content: content as string,
        userId: session?.user.id,
        courseId: courseId as string,
      },
    });
    revalidatePath(`/course/${courseId}`);
    return { completed: true, message: "comment added " };
  } catch (error) {
    return { completed: false, message: "failed to add comment " };
  }
}
export async function deleteComment(formdata: FormData) {
  try {
    const commentId = formdata.get("commentId");
    const courseId = formdata.get("courseId");

    await prisma.comment.delete({
      where: {
        id: commentId as string,
      },
    });
    revalidatePath(`/course/${courseId}`);
  } catch (error) {
    throw new Error("failed to delete comment");
  }
}
