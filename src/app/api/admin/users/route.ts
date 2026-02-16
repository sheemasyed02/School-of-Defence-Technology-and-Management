import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import bcrypt from "bcryptjs";
import { z } from "zod";

const userSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6), // Required for creation
  role: z.enum(["SUPER_ADMIN", "EDITOR", "FACULTY_ADMIN"]),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== "SUPER_ADMIN") {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const body = await req.json();
    const validatedData = userSchema.parse(body);

    // Check if email already exists
    const { data: existing } = await supabase
      .from("User")
      .select("id")
      .eq("email", validatedData.email)
      .single();

    if (existing) {
      return new NextResponse("User with this email already exists", { status: 409 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    const { data: user, error } = await supabase
      .from("User")
      .insert({
        name: validatedData.name,
        email: validatedData.email,
        password: hashedPassword,
        role: validatedData.role,
        updatedAt: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;

    // Log audit
    await supabase.from("AuditLog").insert({
      userId: (session.user as any).id,
      action: "CREATE",
      entity: "User",
      entityId: user.id || "unknown",
      details: `Created user ${user.email} with role ${user.role}`,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json(user);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return new NextResponse("Invalid data", { status: 422 });
    }
    console.error("[USERS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
