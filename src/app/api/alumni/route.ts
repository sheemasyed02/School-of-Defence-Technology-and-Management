import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { alumniSchema } from "@/lib/validations";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("Alumni")
      .select("*")
      .order("batch", { ascending: false })
      .order("order", { ascending: true });

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = alumniSchema.parse(body);

    const { data, error } = await supabase
      .from("Alumni")
      .insert({
        name: validatedData.name,
        image_url: validatedData.imageUrl,
        batch: validatedData.batch,
        role: validatedData.role,
        company: validatedData.company,
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
