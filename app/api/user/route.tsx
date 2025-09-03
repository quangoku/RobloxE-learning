import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
export async function POST() {
  const user = await prisma.user.create({
    data: {
      email: "quangoku@gmail.com",
      name: "quangoku",
    },
  });
  return NextResponse.json(user);
}
