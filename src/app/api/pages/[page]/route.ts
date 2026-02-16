import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";


export async function GET(
  req: Request,
  { params }: { params: Promise<{ page: string }> }
) {
  try {
    const { page } = await params;
    const { data: pageContent, error } = await supabase
      .from("PageContent")
      .select("*")
      .eq("page", page);

    if (error) throw error;

    return NextResponse.json(pageContent);
  } catch (error) {
    console.error("[PAGES_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
