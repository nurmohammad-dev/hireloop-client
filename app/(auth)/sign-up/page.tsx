
"use client"

import { AuthForm, type AuthFormValues } from "@/components/auth/auth-form"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

export default function SignUpPage() {

  const router = useRouter()

  const handleSignUp = async (values: AuthFormValues) => {
    const { data, error } = await authClient.signUp.email({
      name: values.name ?? "",
      email: values.email,
      password: values.password,
      callbackURL: "/",
      role: values.role ?? "seeker",
    } as any)

    if (error) {
        console.error("Signup Error:", error)
      return
    }

    if(!error) {
      router.push('/')
    }

    console.log(data)
  }

  return (
    <main className="relative isolate flex min-h-[calc(100svh-90px)] items-center justify-center overflow-hidden bg-[#0b0b0c] px-4 py-16">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[640px] max-w-full -translate-x-1/2 rounded-full bg-brand/20 blur-[120px]"
      />

      <AuthForm mode="signup" onSubmit={handleSignUp} />
    </main>
  )
}
