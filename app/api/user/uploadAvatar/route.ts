import cloudinary from "@/lib/cloudinary";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import type { UploadApiResponse } from "cloudinary";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  try {
    const formData = await req.formData();
    const file = formData.get("image");

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ message: "File not found" }, { status: 404 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadRespone: UploadApiResponse = await new Promise((res, rej) => {
      cloudinary.uploader
        .upload_stream((err, result) => {
          if (err || !result) rej(err);
          else res(result);
        })
        .end(buffer);
    });

    await prisma.user.update({
      data: {
        image: uploadRespone.secure_url,
      },
      where: {
        id: session?.user.id,
      },
    });

    return NextResponse.json(
      {
        url: uploadRespone.secure_url,
      },
      {
        status: 200,
      }
    );
  } catch {
    return NextResponse.json(
      {
        message: "Failed to upload img",
      },
      { status: 500 }
    );
  }
}
