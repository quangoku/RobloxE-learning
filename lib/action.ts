"use server";
import prisma from "./prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import bcrypt from "bcryptjs";

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

export async function changePassword(formData: FormData) {
  try {
    const currentPassword = formData.get("currentPassword");
    const newPassword = formData.get("newPassword");
    const confirmPassword = formData.get("confirmPassword");

    if (
      !currentPassword ||
      !newPassword ||
      !confirmPassword ||
      typeof currentPassword !== "string" ||
      typeof newPassword !== "string" ||
      typeof confirmPassword !== "string"
    ) {
      return { success: false, message: "All fields are required" };
    }

    if (newPassword !== confirmPassword) {
      return { success: false, message: "Passwords do not match" };
    }

    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return { success: false, message: "Unauthorized" };
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user?.password) {
      return { success: false, message: "user haven't set have password" };
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return { success: false, message: "Current password is incorrect" };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await prisma.user.update({
      where: { id: session.user.id },
      data: { password: hashedPassword },
    });

    return { success: true, message: "Password changed successfully" };
  } catch (e) {
    console.error(e);
    return { success: false, message: "Server failed to change password" };
  }
}

export async function setPassword(formData: FormData) {
  try {
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");
    if (password !== confirmPassword) {
      return { success: false, message: "Password didn't match" };
    }
    const session = await getServerSession(authOptions);
    const salt = await bcrypt.genSalt(10);
    const hashedPasswrod = await bcrypt.hash(password as string, salt);

    await prisma.user.update({
      where: { id: session?.user?.id },
      data: {
        password: hashedPasswrod,
      },
    });
    return { success: true, message: "Password updated successfully" };
  } catch (e) {
    console.log(e);
    return { success: false, message: "Server Failed to update password" };
  }
}
