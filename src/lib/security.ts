import { supabase } from "@/lib/supabase";
import { headers } from "next/headers";

// ─── Rate Limiting ───────────────────────────────────────────────────────────
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
export const MAX_LOGIN_ATTEMPTS = 5;
const BLOCK_DURATION_MS = 2 * 60 * 60 * 1000; // 2 hours auto-block

export async function checkRateLimit(key: string): Promise<{
  allowed: boolean;
  remaining: number;
  retryAfter?: number;
}> {
  const now = new Date();
  const windowStart = new Date(now.getTime() - RATE_LIMIT_WINDOW_MS);

  // Clean expired entries
  await supabase
    .from("RateLimit")
    .delete()
    .lt("expiresAt", now.toISOString());

  // Check current count
  const { data: existing } = await supabase
    .from("RateLimit")
    .select("*")
    .eq("key", key)
    .single();

  if (existing) {
    if (existing.count >= MAX_LOGIN_ATTEMPTS) {
      const expiresAt = new Date(existing.expiresAt);
      const retryAfter = Math.ceil((expiresAt.getTime() - now.getTime()) / 1000);
      return {
        allowed: false,
        remaining: 0,
        retryAfter: retryAfter > 0 ? retryAfter : 0,
      };
    }

    // Increment
    await supabase
      .from("RateLimit")
      .update({ count: existing.count + 1 })
      .eq("key", key);

    return {
      allowed: true,
      remaining: MAX_LOGIN_ATTEMPTS - existing.count - 1,
    };
  }

  // Create new entry
  await supabase.from("RateLimit").insert({
    key,
    count: 1,
    windowStart: now.toISOString(),
    expiresAt: new Date(now.getTime() + RATE_LIMIT_WINDOW_MS).toISOString(),
  });

  return { allowed: true, remaining: MAX_LOGIN_ATTEMPTS - 1 };
}

export async function resetRateLimit(key: string): Promise<void> {
  await supabase.from("RateLimit").delete().eq("key", key);
}

// ─── IP Blocking ─────────────────────────────────────────────────────────────

export async function isIPBlocked(ip: string): Promise<{
  blocked: boolean;
  reason?: string;
}> {
  const now = new Date().toISOString();

  const { data } = await supabase
    .from("BlockedIP")
    .select("*")
    .eq("ipAddress", ip)
    .eq("isActive", true)
    .single();

  if (!data) return { blocked: false };

  // Check if expired
  if (data.expiresAt && new Date(data.expiresAt) < new Date()) {
    // Deactivate expired block
    await supabase
      .from("BlockedIP")
      .update({ isActive: false })
      .eq("id", data.id);
    return { blocked: false };
  }

  return { blocked: true, reason: data.reason };
}

export async function blockIP(
  ip: string,
  reason: string,
  blockedBy?: string,
  durationMs?: number
): Promise<void> {
  const expiresAt = durationMs
    ? new Date(Date.now() + durationMs).toISOString()
    : null;

  await supabase.from("BlockedIP").upsert(
    {
      ipAddress: ip,
      reason,
      blockedBy: blockedBy || null,
      expiresAt,
      isActive: true,
      blockedAt: new Date().toISOString(),
    },
    { onConflict: "ipAddress" }
  );
}

export async function autoBlockOnExcessiveFailures(
  ip: string,
  threshold: number = 10
): Promise<boolean> {
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();

  const { count } = await supabase
    .from("LoginLog")
    .select("*", { count: "exact", head: true })
    .eq("ipAddress", ip)
    .eq("status", "FAILED")
    .gte("createdAt", oneHourAgo);

  if (count && count >= threshold) {
    await blockIP(
      ip,
      `Auto-blocked: ${count} failed login attempts in 1 hour`,
      undefined,
      BLOCK_DURATION_MS
    );
    return true;
  }
  return false;
}

// ─── Login Logging with Location ─────────────────────────────────────────────

interface GeoData {
  city?: string;
  region?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
}

async function getGeoLocation(ip: string): Promise<GeoData> {
  // Skip for localhost/private IPs
  if (
    ip === "127.0.0.1" ||
    ip === "::1" ||
    ip.startsWith("192.168.") ||
    ip.startsWith("10.") ||
    ip === "server-side"
  ) {
    return { city: "Local", region: "Local", country: "Local" };
  }

  try {
    // Using ipapi.co (HTTPS supported, free tier available)
    const res = await fetch(`https://ipapi.co/${ip}/json/`, {
      signal: AbortSignal.timeout(2000), // 2 second timeout
    });
    if (!res.ok) return {};
    const data = await res.json();
    return {
      city: data.city,
      region: data.region,
      country: data.country_name,
      latitude: data.latitude,
      longitude: data.longitude,
    };
  } catch {
    return {};
  }
}

export async function logLoginAttempt(params: {
  userId?: string;
  email: string;
  ipAddress: string;
  userAgent: string;
  status: "SUCCESS" | "FAILED" | "BLOCKED";
  failReason?: string;
}): Promise<void> {
  const geo = await getGeoLocation(params.ipAddress).catch(() => ({}));

  await supabase.from("LoginLog").insert({
    userId: params.userId || null,
    email: params.email,
    ipAddress: params.ipAddress,
    city: (geo as any).city || null,
    region: (geo as any).region || null,
    country: (geo as any).country || null,
    latitude: (geo as any).latitude || null,
    longitude: (geo as any).longitude || null,
    userAgent: params.userAgent || null,
    status: params.status,
    failReason: params.failReason || null,
  });
}

// ─── Request Helpers ─────────────────────────────────────────────────────────

export async function getClientIP(): Promise<string> {
  try {
    const headersList = await headers();
    return (
      headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      headersList.get("x-real-ip") ||
      headersList.get("cf-connecting-ip") ||
      "unknown"
    );
  } catch {
    return "unknown";
  }
}

export async function getUserAgent(): Promise<string> {
  try {
    const headersList = await headers();
    return headersList.get("user-agent") || "unknown";
  } catch {
    return "unknown";
  }
}

/**
 * Strips HTML tags and suspicious script patterns from a string.
 * This is a server-side defense against XSS and injection.
 */
export function sanitizeInput(input: string | any): any {
  if (typeof input !== "string") return input;

  return input
    .replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gim, "") // Remove <script> tags
    .replace(/on\w+="[^"]*"/gim, "") // Remove inline event handlers like onclick=...
    .replace(/javascript:[^"']*/gim, "") // Remove javascript: URLs
    .replace(/<[^>]*>?/gm, "") // Strip all other HTML tags
    .trim();
}

/**
 * Recursively sanitizes all string properties in an object.
 */
export function sanitizeObject<T>(obj: T): T {
  if (obj === null || typeof obj !== "object") {
    return (typeof obj === "string" ? sanitizeInput(obj) : obj) as T;
  }

  const sanitized: any = Array.isArray(obj) ? [] : {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      if (typeof value === "object" && value !== null) {
        sanitized[key] = sanitizeObject(value);
      } else if (typeof value === "string") {
        sanitized[key] = sanitizeInput(value);
      } else {
        sanitized[key] = value;
      }
    }
  }

  return sanitized as T;
}
