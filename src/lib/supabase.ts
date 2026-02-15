
import { createClient } from '@supabase/supabase-js';

const envUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const envKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Fallback to a valid dummy URL if the environment variable is missing or is just a placeholder
// This prevents the app from crashing during build/start if the user hasn't set up Supabase yet.
const supabaseUrl = (envUrl && !envUrl.includes("[PROJECT-REF]"))
  ? envUrl
  : "https://placeholder-project.supabase.co";

const supabaseKey = (envKey && !envKey.includes("[ANON-KEY]"))
  ? envKey
  : "placeholder-key-for-demo-mode";

// Note: In backend/API routes, use service role key for admin privileges if available.
// In frontend/client components, use anon key.
// This client is intended for server-side usage (API routes, Server Components) where we might need admin access.
export const supabase = createClient(supabaseUrl, supabaseKey);
