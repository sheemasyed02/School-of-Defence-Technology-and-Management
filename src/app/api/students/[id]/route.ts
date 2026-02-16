import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { studentSchema } from "@/lib/validations";

type Props = { params: { id: string } };

export async function PUT(req: Request, props: { params: Promise<{ id: string }> }) {
  try {
    const params = await props.params;
    const id = params.id;
    const body = await req.json();
    const validatedData = studentSchema.parse(body);

    const { data, error } = await supabase
      .from("Student")
      .update({
        name: validatedData.name,
        image_url: validatedData.imageUrl,
        program_type: validatedData.program_type,
        order: validatedData.order,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(req: Request, props: { params: Promise<{ id: string }> }) {
  try {
    const params = await props.params;
    const id = params.id;
    const { error } = await supabase.from("Student").delete().eq("id", id);
    if (error) throw error;

    return NextResponse.json({ message: "Student deleted" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
