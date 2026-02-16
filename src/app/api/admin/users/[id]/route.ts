import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import bcrypt from "bcryptjs";
import { z } from "zod";

const updateUserSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
  role: z.enum(["SUPER_ADMIN", "EDITOR", "FACULTY_ADMIN"]).optional(),
});

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== "SUPER_ADMIN") {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const { id } = await params;
    const body = await req.json();
    const validatedData = updateUserSchema.parse(body);

    const updates: any = { ...validatedData, updatedAt: new Date().toISOString() };

    if (validatedData.password) {
      updates.password = await bcrypt.hash(validatedData.password, 10);
    } else {
      delete updates.password;
    }

    const { data: user, error } = await supabase
      .from("User")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    await supabase.from("AuditLog").insert({
      userId: (session.user as any).id,
      action: "UPDATE",
      entity: "User",
      entityId: user.id || "unknown",
      details: `Updated user ${user.email}`,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json(user);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return new NextResponse("Invalid data", { status: 422 });
    }
    console.error("[USERS_PUT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== "SUPER_ADMIN") {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const { id } = await params;

    // Prevent deleting self
    if (id === (session.user as any).id) {
        return new NextResponse("Cannot delete yourself", { status: 400 });
    }

    const { error } = await supabase
      .from("User")
      .delete()
      .eq("id", id);

    if (error) throw error;

    await supabase.from("AuditLog").insert({
      userId: (session.user as any).id,
      action: "DELETE",
      entity: "User",
      entityId: id,
      details: `Deleted user ${id}`,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("[USERS_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
