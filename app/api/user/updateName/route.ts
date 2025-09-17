import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const id = session?.user.id;
    const body = await req.json();
    await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        name: body.username,
      },
    });
    return NextResponse.json({ username: body.username }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "server failed" }, { status: 500 });
  }
}
