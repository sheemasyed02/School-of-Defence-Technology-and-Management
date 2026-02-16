import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { pageContentSchema } from "@/lib/validations";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("PageContent")
      .select("*")
      .order("page", { ascending: true })
      .order("section", { ascending: true }); // Then by section

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = pageContentSchema.parse(body);

    const { data, error } = await supabase
      .from("PageContent")
      .insert({
        page: validatedData.page,
        section: validatedData.section,
        content: validatedData.content,
        is_visible: validatedData.isVisible ?? true,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
