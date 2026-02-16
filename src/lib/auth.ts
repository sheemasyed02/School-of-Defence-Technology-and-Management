import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { supabase } from "@/lib/supabase";
import bcrypt from "bcryptjs";
import {
  checkRateLimit,
  resetRateLimit,
  isIPBlocked,
  logLoginAttempt,
  autoBlockOnExcessiveFailures,
  getClientIP,
  getUserAgent,
  MAX_LOGIN_ATTEMPTS,
} from "@/lib/security";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 8 * 60 * 60, // 8 hours
  },
  pages: {
    signIn: "/admin/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        captchaId: { label: "Captcha ID", type: "text" },
        captchaAnswer: { label: "Captcha Answer", type: "text" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        const ip = await getClientIP();
        const userAgent = await getUserAgent();
        const email = credentials.email.toLowerCase().trim();
        const rateLimitKey = `login:${ip}`;
        const emailLimitKey = `login_email:${email}`;

        // ─── USER LOOKUP (Moved up to check role) ───
        const { data: user, error: userError } = await supabase
          .from("User")
          .select("*")
          .eq("email", email)
          .single();

        const isSuperAdmin = user?.role === "SUPER_ADMIN";

        // ─── CHECK IP BLOCK ───
        const ipCheck = await isIPBlocked(ip);
        if (ipCheck.blocked && !isSuperAdmin) {
          await logLoginAttempt({
            email,
            ipAddress: ip,
            userAgent,
            status: "BLOCKED",
            failReason: ipCheck.reason || "IP is blocked",
          });
          throw new Error("BLOCK_SCREEN: Access denied. Your IP has been temporarily blocked for 2 hours.");
        }

        // ─── RATE LIMITING (IP) ───
        if (!isSuperAdmin) {
          const rateCheck = await checkRateLimit(rateLimitKey);
          if (!rateCheck.allowed) {
            await logLoginAttempt({
              email,
              ipAddress: ip,
              userAgent,
              status: "FAILED",
              failReason: "Rate limited (IP)",
            });

            await autoBlockOnExcessiveFailures(ip);
            throw new Error("BLOCK_SCREEN: Too many login attempts. Access blocked for 2 hours.");
          }
        }

        // ─── RATE LIMITING (EMAIL) ───
        if (!isSuperAdmin) {
          const emailRateCheck = await checkRateLimit(emailLimitKey);
          if (!emailRateCheck.allowed) {
            await logLoginAttempt({
              email,
              ipAddress: ip,
              userAgent,
              status: "FAILED",
              failReason: "Rate limited (Account)",
            });
            throw new Error("BLOCK_SCREEN: Account temporarily locked for 2 hours due to multiple failures.");
          }
        }

        // ─── CAPTCHA VERIFICATION ───
        if (!credentials.captchaId || !credentials.captchaAnswer) {
          throw new Error("Captcha required");
        }

        const { data: captchaData, error: captchaError } = await supabase
          .from("Captcha")
          .select("*")
          .eq("id", credentials.captchaId)
          .single();

        if (captchaError || !captchaData) {
          throw new Error("Invalid or expired captcha");
        }

        if (captchaData.answer.toLowerCase() !== credentials.captchaAnswer.toLowerCase()) {
          throw new Error("Incorrect captcha solution");
        }

        await supabase.from("Captcha").delete().eq("id", credentials.captchaId);

        // ─── USER VALIDATION ───
        if (userError || !user) {
          await logLoginAttempt({
            email,
            ipAddress: ip,
            userAgent,
            status: "FAILED",
            failReason: "User not found",
          });
          throw new Error("Invalid credentials");
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          // Get remaining attempts for the message
          const { data: rt } = await supabase.from("RateLimit").select("count").eq("key", rateLimitKey).single();
          const attemptsLeft = MAX_LOGIN_ATTEMPTS - (rt?.count || 0);

          await logLoginAttempt({
            email,
            ipAddress: ip,
            userAgent,
            status: "FAILED",
            failReason: "Invalid password",
          });

          if (!isSuperAdmin && attemptsLeft > 0) {
            throw new Error(`Invalid credentials. ${attemptsLeft} attempts left.`);
          } else if (!isSuperAdmin && attemptsLeft <= 0) {
             await autoBlockOnExcessiveFailures(ip);
             throw new Error("BLOCK_SCREEN: Maximum attempts reached. Your account is blocked for 2 hours.");
          }

          throw new Error("Invalid credentials");
        }

        // ─── SUCCESS ───
        await resetRateLimit(rateLimitKey); // Clear IP rate limit on success
        await resetRateLimit(emailLimitKey); // Clear Email rate limit on success
        await logLoginAttempt({
          userId: user.id,
          email,
          ipAddress: ip,
          userAgent,
          status: "SUCCESS",
        });

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },
  },
};
