import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { facultySchema } from "@/lib/validations";
import { z } from "zod";


export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { id } = await params;

    const userRole = session.user.role;
    if (!["SUPER_ADMIN", "EDITOR", "FACULTY_ADMIN"].includes(userRole)) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    const body = await req.json();
    const validatedData = facultySchema.parse(body);

    const { data: faculty, error } = await supabase
      .from("Faculty")
      .update(validatedData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json(faculty);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse("Invalid data", { status: 422 });
    }
    console.error("[FACULTY_PUT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { id } = await params;

    const userRole = session.user.role;
    if (!["SUPER_ADMIN", "EDITOR", "FACULTY_ADMIN"].includes(userRole)) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    const { data: faculty, error } = await supabase
      .from("Faculty")
      .delete()
      .eq("id", id)
      .select()
      .single();

    if (error) {
        throw error;
    }

    return NextResponse.json(faculty);
  } catch (error) {
    console.error("[FACULTY_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
