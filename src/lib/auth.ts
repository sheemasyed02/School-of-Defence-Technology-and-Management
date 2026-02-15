
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { supabase } from "@/lib/supabase";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
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
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        // --- CAPTCHA VERIFICATION ---
        // Skip for hardcoded demo user if needed, OR verify explicitly
        // We enforce captcha for everyone in "maximum security" mode

        if (!credentials.captchaId || !credentials.captchaAnswer) {
           throw new Error("Captcha required");
        }

        const { data: captchaData, error: captchaError } = await supabase
           .from('Captcha')
           .select('*')
           .eq('id', credentials.captchaId)
           .single();

        if (captchaError || !captchaData) {
            throw new Error("Invalid or expired captcha");
        }

        // Check if answer matches (case-insensitive)
        if (captchaData.answer.toLowerCase() !== credentials.captchaAnswer.toLowerCase()) {
             throw new Error("Incorrect captcha solution");
        }

        // Delete used captcha to prevent replay attacks
        await supabase.from('Captcha').delete().eq('id', credentials.captchaId);
        // ----------------------------

        // --- DEMO USER FOR UI TESTING ---
        if (
          credentials.email === "admin@example.com" &&
          credentials.password === "admin123"
        ) {
          return {
            id: "demo-admin-id",
            email: "admin@example.com",
            name: "Demo Admin",
            role: "SUPER_ADMIN",
          };
        }
        // --------------------------------

        const { data: user, error } = await supabase
          .from("User")
          .select("*")
          .eq("email", credentials.email)
          .single();

        if (error || !user) {
          throw new Error("User not found");
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

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
