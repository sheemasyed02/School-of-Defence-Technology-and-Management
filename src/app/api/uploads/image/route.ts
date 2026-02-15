import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return new NextResponse("No file uploaded", { status: 400 });
    }

    // This is a minimal implementation.
    // In production, upload to S3/Cloudinary using SDK.
    // Here we just return a fake URL or save locally if supported (vercel doesn't support local write)

    // For now, we'll implement a Mock response to simulate success so UI works
    // To support real upload without keys, we can't do much.

    // Generate a mock URL based on file name (or random)
    // In a real app, this would be the S3 URL

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save to public/uploads (works locally/VPS, not Vercel)
    // Unique name
    const name = Date.now() + '-' + file.name.replace(/\s/g, '-');
    const path = join(process.cwd(), 'public/uploads', name);

    await writeFile(path, buffer);
    const url = `/uploads/${name}`;

    return NextResponse.json({ url });
  } catch (error) {
    console.error("[UPLOAD_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
