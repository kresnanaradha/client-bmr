import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div className="ocean-page flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <Image src="/logo.png" alt="Bali Water Activity" width={256} height={256} className="mb-5 h-20 w-auto" unoptimized priority />
          <span className="aq-eyebrow mb-2">Admin</span>
          <h1 className="font-display text-3xl text-[var(--aq-text)]">Sign in to the dashboard</h1>
          <p className="mt-2 text-sm text-[var(--aq-muted)]">See who visits the website and who contacts you.</p>
        </div>

        <div className="aq-panel p-6 sm:p-8">
          <LoginForm />
        </div>

        <p className="mt-6 text-center text-xs">
          <Link href="/" className="text-[var(--aq-muted)] hover:text-[var(--aq-aqua)]">
            ← Back to website
          </Link>
        </p>
      </div>
    </div>
  );
}
