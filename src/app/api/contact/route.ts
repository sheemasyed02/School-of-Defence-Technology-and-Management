import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { sanitizeObject } from "@/lib/security";

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.json();

    // Honeypot check
    if (rawBody.hp_field) {
      return NextResponse.json({ success: true, message: "Thank you for your message!" }, { status: 201 }); // Silent drop
    }

    const body = sanitizeObject(rawBody);
    const { name, email, subject, message } = body;

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    // Simple email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Rate limit: max 3 submissions per email per day
    const oneDayAgo = new Date(
      Date.now() - 24 * 60 * 60 * 1000
    ).toISOString();
    const { count } = await supabase
      .from("Contact")
      .select("*", { count: "exact", head: true })
      .eq("email", email)
      .gte("createdAt", oneDayAgo);

    if (count && count >= 3) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again later." },
        { status: 429 }
      );
    }

    const { data, error } = await supabase
      .from("Contact")
      .insert({
        name,
        email,
        subject: subject || null,
        message,
        status: "NEW",
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(
      { success: true, message: "Thank you for your message!" },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to submit form" },
      { status: 500 }
    );
  }
}
