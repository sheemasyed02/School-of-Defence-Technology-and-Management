import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";


export async function PUT(
  req: Request,
  { params }: { params: Promise<{ page: string; section: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { page, section } = await params;

    // Check role - Editor and above can edit content
    const userRole = session.user.role;
    if (!["SUPER_ADMIN", "EDITOR"].includes(userRole)) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    const body = await req.json();
    const { content, isVisible } = body;

    // Validate content is provided (even if empty string/object, must be present)
    if (content === undefined) {
         return new NextResponse("Content is required", { status: 400 });
    }

    const payload = {
        page,
        section,
        content: JSON.stringify(content),
        isVisible: isVisible ?? true,
        updatedAt: new Date().toISOString()
    };

    const { data: pageContent, error } = await supabase
        .from("PageContent")
        .upsert(payload, { onConflict: 'page, section' })
        .select()
        .single();

    if (error) {
        throw error;
    }

    return NextResponse.json(pageContent);
  } catch (error) {
    console.error("[PAGES_SECTION_PUT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
