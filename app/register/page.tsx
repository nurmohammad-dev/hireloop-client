import type { Metadata } from "next"

import { AuthForm } from "@/components/auth/auth-form"

export const metadata: Metadata = {
  title: "Sign Up — HireLoop",
}

export default function RegisterPage() {
  return (
    <main className="relative isolate flex min-h-[calc(100svh-90px)] items-center justify-center overflow-hidden bg-[#0b0b0c] px-4 py-16">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[640px] max-w-full -translate-x-1/2 rounded-full bg-brand/20 blur-[120px]"
      />
      <AuthForm mode="signup" />
    </main>
  )
}
