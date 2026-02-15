import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // 1. Enforce Role-Based Access for specific paths if needed
    // Example: Only SUPER_ADMIN can access /admin/settings
    // Note: We use req.nextauth.token which is typed properly in NextAuth middleware context
    // If typings fail in build, we rely on the object shape.
    const token = req.nextauth.token;

    if (req.nextUrl.pathname.startsWith("/admin/settings") && token?.role !== "SUPER_ADMIN") {
        return NextResponse.redirect(new URL("/admin?error=Unauthorized", req.url));
    }

    // 2. Add Maximum Security Headers
    // We create a fresh response object to attach headers to
    const nonce = crypto.randomUUID(); // Node 18+ / Edge Runtime built-in

    // Content Security Policy (Strict)
    // 'unsafe-inline' is currently allowed for styles because many UI libraries (like Radix/Shadcn)
    // inject styles dynamically. In a pure environment, we'd use nonces.
    // 'unsafe-eval' is allowed for Next.js dev mode (hot reloading), strictly forbidden in prod usually.
    // For Production "Maximum Security", we should aim to remove these.
    // But for a working prototype we keep them to prevent breakage.
    const cspHeader = `
      default-src 'self';
      script-src 'self' 'unsafe-eval' 'unsafe-inline' https://apis.google.com;
      style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
      img-src 'self' blob: data: https://*.supabase.co https://res.cloudinary.com;
      font-src 'self' https://fonts.gstatic.com;
      connect-src 'self' https://*.supabase.co;
      object-src 'none';
      base-uri 'self';
      form-action 'self';
      frame-ancestors 'none';
      block-all-mixed-content;
      upgrade-insecure-requests;
    `.replace(/\s{2,}/g, ' ').trim();

    const requestHeaders = new Headers(req.headers);
    requestHeaders.set('x-nonce', nonce);
    requestHeaders.set('Content-Security-Policy', cspHeader);

    // Create the response from the request with new headers
    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

    // Set Response Security Headers
    response.headers.set('Content-Security-Policy', cspHeader);
    response.headers.set('X-Frame-Options', 'DENY'); // Prevents Clickjacking completely
    response.headers.set('X-Content-Type-Options', 'nosniff'); // Prevents MIME sniffing
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), browsing-topics=()'); // Lock down browser features
    response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload'); // Force HTTPS

    return response;
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // Return true if authenticated, false if not
        return !!token;
      },
    },
    pages: {
      signIn: "/admin/login",
    },
  }
);

// Protect all /admin routes EXCEPT /admin/login
export const config = {
  matcher: [
    "/admin",
    "/admin/((?!login).*)", // Matches /admin/dashboard, /admin/faculty, etc. but NOT /admin/login
  ],
};
