import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  const { data } = await req.json();

  const isExisted = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (isExisted) {
    return NextResponse.json(
      { message: "User already existed!!!" },
      { status: 409 }
    );
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPasswrod = await bcrypt.hash(data.password, salt);
  const newUser = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPasswrod,
    },
  });
  console.log(newUser);
  return NextResponse.json(
    { message: "User created successfully", user: newUser },
    { status: 201 }
  );
}
