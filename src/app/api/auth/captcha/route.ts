import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// Use require for CJS compatibility in Next.js App Router
const svgCaptcha = require("svg-captcha");

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Generate captcha
    const captcha = svgCaptcha.create({
      size: 6,
      noise: 3,
      color: true,
      background: '#f0f0f0'
    });

    // Store in DB
    const { data, error } = await supabase
      .from('Captcha')
      .insert({ answer: captcha.text })
      .select('id')
      .single();

    if (error) {
      console.error('Error storing captcha:', error);
      return NextResponse.json({ error: 'Failed to generate captcha' }, { status: 500 });
    }

    return NextResponse.json({
      id: data.id,
      svg: captcha.data
    });
  } catch (error) {
    console.error('Captcha error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
