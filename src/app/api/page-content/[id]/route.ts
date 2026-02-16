import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { pageContentSchema } from "@/lib/validations";

type Props = { params: Promise<{ id: string }> };

export async function PUT(req: Request, { params }: Props) {
  try {
    const { id } = await params;
    const body = await req.json();
    const validatedData = pageContentSchema.parse(body);

    const { data, error } = await supabase
      .from("PageContent")
      .update({
        page: validatedData.page,
        section: validatedData.section,
        content: validatedData.content,
        is_visible: validatedData.isVisible ?? true,
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

export async function DELETE(req: Request, { params }: Props) {
  try {
    const { id } = await params;
    const { error } = await supabase.from("PageContent").delete().eq("id", id);
    if (error) throw error;

    return NextResponse.json({ message: "Content deleted" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
