import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { studentSchema } from "@/lib/validations";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("Student")
      .select("*")
      .order("order", { ascending: true }); // Then by name? .order("name")

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = studentSchema.parse(body);

    const { data, error } = await supabase
      .from("Student")
      .insert({
        name: validatedData.name,
        image_url: validatedData.imageUrl,
        program_type: validatedData.program_type,
        order: validatedData.order,
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
