import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { password: true },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        hasPassword: !!user.password,
        message: !!user.password
          ? "User has password"
          : "User does not have password",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error checking password:", error);
    return NextResponse.json(
      { message: "Server failed to get user" },
      { status: 500 }
    );
  }
}
