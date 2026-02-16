import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "SUPER_ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Fetch entries that start with 'login_email:'
    // Also including 'login:' (IP based rate limits) might be useful?
    // User specifically asked for "User", implying email.
    // The key format in lib/auth.ts is `login_email:${email}`

    const { data, error } = await supabase
      .from("RateLimit")
      .select("*")
      .like("key", "login_email:%")
      .order("expiresAt", { ascending: false });

    if (error) throw error;

    // Parse email from key for frontend convenience
    const formatted = data.map((item: any) => ({
      ...item,
      email: item.key.replace("login_email:", ""),
    }));

    return NextResponse.json(formatted);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "SUPER_ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const key = searchParams.get("key");

    if (!key) {
      return NextResponse.json({ error: "Key is required" }, { status: 400 });
    }

    const { error } = await supabase
      .from("RateLimit")
      .delete()
      .eq("key", key);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
