import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { alumniSchema } from "@/lib/validations";

type Props = { params: Promise<{ id: string }> };

export async function PUT(req: Request, props: Props) {
  try {
    const params = await props.params;
    const id = params.id;
    const body = await req.json();
    const validatedData = alumniSchema.parse(body);

    const { data, error } = await supabase
      .from("Alumni")
      .update({
        name: validatedData.name,
        image_url: validatedData.imageUrl,
        batch: validatedData.batch,
        role: validatedData.role,
        company: validatedData.company,
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

export async function DELETE(req: Request, props: Props) {
  try {
    const params = await props.params;
    const id = params.id;
    const { error } = await supabase.from("Alumni").delete().eq("id", id);
    if (error) throw error;

    return NextResponse.json({ message: "Alumni deleted" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
