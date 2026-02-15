
"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Lock, Loader2, ArrowLeft, RefreshCw, Smartphone } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    captchaAnswer: "",
  });

  const [captcha, setCaptcha] = useState<{ id: string; svg: string } | null>(null);
  const [captchaLoading, setCaptchaLoading] = useState(true);

  const fetchCaptcha = useCallback(async () => {
    setCaptchaLoading(true);
    try {
      const res = await fetch('/api/auth/captcha');
      const data = await res.json();
      if (data.svg) {
        setCaptcha(data);
      }
    } catch (e) {
      console.error("Failed to load captcha", e);
    } finally {
      setCaptchaLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCaptcha();
  }, [fetchCaptcha]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.captchaAnswer) {
      alert("Please enter the captcha solution.");
      return;
    }

    setLoading(true);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
        captchaId: captcha?.id,
        captchaAnswer: formData.captchaAnswer,
      });

      if (result?.error) {
        alert(result.error); // Show specific error (e.g. Invalid Captcha)
        setLoading(false);
        setFormData(prev => ({ ...prev, captchaAnswer: "" }));
        fetchCaptcha(); // Refresh captcha on failure
      } else {
        router.push("/admin");
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-8">
      <div className="w-full max-w-sm space-y-8 bg-white p-8 rounded-lg shadow-md border border-gray-100">
        <div className="text-center">
          <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Lock className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-primary">Admin Sign In</h2>
          <p className="mt-2 text-sm text-gray-500">
            Secure administrative portal access.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md shadow-sm">
            <div className="space-y-1">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <Input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:z-10 focus:border-primary focus:ring-primary sm:text-sm"
                placeholder="Email address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:z-10 focus:border-primary focus:ring-primary sm:text-sm"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>

            {/* Captcha Section */}
            <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
               <div className="flex items-center justify-between mb-2">
                 <label className="text-xs font-semibold text-gray-500 uppercase">Security Check</label>
                 <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={fetchCaptcha}
                    className="h-6 w-6 p-0"
                    title="Refresh Captcha"
                 >
                    <RefreshCw className={`h-3 w-3 ${captchaLoading ? 'animate-spin' : ''}`} />
                 </Button>
               </div>

               <div className="mb-3 bg-white border p-2 rounded flex items-center justify-center h-16"
                    dangerouslySetInnerHTML={{ __html: captcha?.svg || '' }}
               />

               <Input
                  type="text"
                  placeholder="Enter the characters above"
                  className="text-center tracking-widest"
                  required
                  value={formData.captchaAnswer}
                  onChange={(e) => setFormData({ ...formData, captchaAnswer: e.target.value })}
               />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              disabled={loading}
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin text-white" aria-hidden="true" />
                ) : (
                  <Lock className="h-5 w-5 text-indigo-300 group-hover:text-indigo-400" aria-hidden="true" />
                )}
              </span>
              {loading ? "Verifying..." : "Sign in"}
            </Button>
          </div>
        </form>

        <div className="text-center mt-4">
            <Link href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-primary transition-colors">
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back to Website
            </Link>
        </div>
      </div>
    </div>
  );
}
