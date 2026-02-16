import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { sanitizeObject } from "@/lib/security";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userRole = (session.user as any).role;
    if (!["SUPER_ADMIN", "EDITOR", "FACULTY_ADMIN"].includes(userRole)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const rawBody = await req.json();
    const body = sanitizeObject(rawBody);

    const { error } = await supabase.from("Gallery").insert([body]);

    if (error) throw error;

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error: any) {
    console.error("Gallery API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const rawBody = await req.json();
    const { id, ...data } = sanitizeObject(rawBody);

    if (!id) {
      return NextResponse.json({ error: "Missing ID" }, { status: 400 });
    }

    const { error } = await supabase
      .from("Gallery")
      .update(data)
      .eq("id", id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Gallery API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
