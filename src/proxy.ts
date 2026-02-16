import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// Next.js 16 requires a named "proxy" export instead of "middleware"
export const proxy = withAuth(
  function proxy(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;
    const isLoginPage = path === "/admin/login";

    // If authenticated and trying to access login page, redirect to admin
    if (isLoginPage && !!token) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }

    // ─── Role-Based Access Control ───

    // Super Admin Only Routes
    if (
      (path.startsWith("/admin/settings") ||
       path.startsWith("/admin/users") ||
       path.startsWith("/admin/audit-logs") ||
       path.startsWith("/admin/login-logs") ||
       path.startsWith("/admin/blocked-ips")) &&
      token?.role !== "SUPER_ADMIN"
    ) {
      return NextResponse.redirect(
        new URL("/admin?error=Unauthorized", req.url)
      );
    }

    // Faculty Admins can only access specific routes
    if (token?.role === "FACULTY_ADMIN") {
      const allowedPaths = [
        "/admin",
        "/admin/faculty",
        "/admin/research",
      ];
      // Check if current path matches any allowed path (exact or sub-path)
      const isAllowed = allowedPaths.some(
        (p) => path === p || path.startsWith(p + "/")
      );
      if (!isAllowed) {
        return NextResponse.redirect(
          new URL("/admin?error=Unauthorized", req.url)
        );
      }
    }

    // ─── Security Headers ───
    const nonce = crypto.randomUUID();

    const cspHeader = `
      default-src 'self';
      script-src 'self' 'unsafe-eval' 'unsafe-inline' https://apis.google.com;
      style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
      img-src 'self' blob: data: https://*.supabase.co https://res.cloudinary.com;
      font-src 'self' https://fonts.gstatic.com;
      connect-src 'self' https://*.supabase.co http://ip-api.com;
      object-src 'none';
      base-uri 'self';
      form-action 'self';
      frame-ancestors 'none';
      upgrade-insecure-requests;
    `
      .replace(/\s{2,}/g, " ")
      .trim();

    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-nonce", nonce);
    requestHeaders.set("Content-Security-Policy", cspHeader);

    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

    response.headers.set("Content-Security-Policy", cspHeader);
    response.headers.set("X-Frame-Options", "DENY");
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    response.headers.set(
      "Permissions-Policy",
      "camera=(), microphone=(), geolocation=(), browsing-topics=()"
    );
    response.headers.set(
      "Strict-Transport-Security",
      "max-age=63072000; includeSubDomains; preload"
    );

    return response;
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow access to login page without a token
        if (req.nextUrl.pathname === "/admin/login") {
          return true;
        }
        // Require token for all other admin routes
        return !!token;
      },
    },
    pages: {
      signIn: "/admin/login",
    },
  }
);

// Protect all /admin routes
export const config = {
  matcher: ["/admin/:path*"],
};
