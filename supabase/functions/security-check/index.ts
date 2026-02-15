
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

console.log("Hello from Security Check Function!")

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { content } = await req.json()

    // 1. Basic XSS Pattern Detection (Script tags)
    const xssPattern = /<script\b[^>]*>([\s\S]*?)<\/script>/gm
    const hasXSS = xssPattern.test(content)

    if (hasXSS) {
      return new Response(
        JSON.stringify({ valid: false, reason: "Potential XSS vector detected (script tag)" }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
      )
    }

    // 2. Length Check
    if (content && content.length > 50000) {
       return new Response(
        JSON.stringify({ valid: false, reason: "Content size exceeds limit" }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
      )
    }

    return new Response(
      JSON.stringify({ valid: true, sanitized: content }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    )
  }
})
