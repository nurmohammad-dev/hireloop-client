
"use client"

import * as React from "react"
import Link from "next/link"
import { EyeIcon, EyeOffIcon } from "lucide-react"

import { cn } from "cn"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export interface AuthFormValues {
  name?: string
  email: string
  password: string
  role?: "seeker" | "recruiter" | "admin"
}

interface AuthFormProps {
  mode: "signin" | "signup"
  onSubmit: (values: AuthFormValues) => Promise<void>
}

function AuthTabs({ mode }: { mode: "signin" | "signup" }) {
  const tabs = [
    { href: "/sign-in", label: "Sign In", active: mode === "signin" },
    { href: "/sign-up", label: "Sign Up", active: mode === "signup" },
  ] as const

  return (
    <div
      role="tablist"
      aria-label="Authentication"
      className="grid grid-cols-2 gap-1 rounded-xl bg-surface-2 p-1"
    >
      {tabs.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          role="tab"
          aria-selected={tab.active}
          className={cn(
            "flex h-9 items-center justify-center rounded-lg px-4 text-sm font-medium transition-colors",
            tab.active
              ? "bg-brand text-white shadow-sm"
              : "text-muted-foreground hover:bg-surface-3 hover:text-foreground"
          )}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  )
}

const ROLE_OPTIONS = [
  { value: "seeker", label: "Job Seeker" },
  { value: "recruiter", label: "Recruiter" },
  { value: "admin", label: "Admin" },
] as const

const inputClasses =
  "h-10 rounded-lg border-white/10 bg-[#0c0c0f] px-3 text-[15px] text-white focus-visible:border-brand/60 focus-visible:ring-brand/30 placeholder:text-white/40"

export function AuthForm({ mode, onSubmit }: AuthFormProps) {
  const [showPassword, setShowPassword] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [selectedRole, setSelectedRole] = React.useState<"seeker" | "recruiter" | "admin">("seeker")

  const isSignIn = mode === "signin"

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const values: AuthFormValues = {
      name: (formData.get("name") as string) || undefined,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      role: selectedRole,
    }

    try {
      setIsLoading(true)
      await onSubmit(values)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md rounded-2xl border border-white/[0.06] bg-surface-3 p-6 shadow-2xl sm:p-8">
      <AuthTabs mode={mode} />

      <h1 className="mt-6 text-center text-2xl font-bold tracking-tight text-foreground">
        {isSignIn ? "Welcome back" : "Create your account"}
      </h1>

      <p className="mt-1.5 text-center text-sm text-muted-foreground">
        {isSignIn
          ? "Sign in to continue your job hunt."
          : "Start discovering your next opportunity."}
      </p>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        {!isSignIn && (
          <div className="flex flex-col gap-2">
            <Label htmlFor="name" className="text-foreground">
              Full name
            </Label>

            <Input
              id="name"
              name="name"
              type="text"
              required
              placeholder="John Doe"
              autoComplete="name"
              className={inputClasses}
            />
          </div>
        )}

        <div className="flex flex-col gap-2">
          <Label htmlFor="email" className="text-foreground">
            Email
          </Label>

          <Input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            autoComplete="email"
            className={inputClasses}
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-foreground">
              Password
            </Label>

            {isSignIn && (
              <Link
                href="/forgot-password"
                className="text-xs text-muted-foreground hover:text-brand"
              >
                Forgot password?
              </Link>
            )}
          </div>

          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              minLength={8}
              placeholder="••••••••"
              autoComplete={isSignIn ? "current-password" : "new-password"}
              className={cn(inputClasses, "pr-10")}
            />

            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute inset-y-0 right-0 grid w-10 place-content-center text-muted-foreground hover:text-foreground"
            >
              {showPassword ? (
                <EyeOffIcon className="size-4" />
              ) : (
                <EyeIcon className="size-4" />
              )}
            </button>
          </div>

          {!isSignIn && (
            <p className="text-xs text-muted-foreground">
              Minimum 8 characters.
            </p>
          )}
        </div>

        {!isSignIn && (
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-foreground">
              Joining HireLoop as
            </p>
            <div className="grid grid-cols-3 gap-3">
              {ROLE_OPTIONS.map((r) => {
                const isSelected = selectedRole === r.value;
                return (
                  <button
                    key={r.value}
                    type="button"
                    onClick={() => setSelectedRole(r.value)}
                    aria-pressed={isSelected}
                    className={cn(
                      "flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border transition-all duration-200",
                      isSelected
                        ? "border-brand bg-brand/10 text-brand shadow-[0_0_20px_rgba(92,83,254,0.25)]"
                        : "border-white/10 text-muted-foreground hover:border-white/30 hover:bg-white/5"
                    )}
                  >
                    <div
                      className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center",
                        isSelected
                          ? "bg-brand text-white"
                          : "bg-white/5 text-muted-foreground"
                      )}
                    >
                      {r.value === "seeker" && (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"></path></svg>
                      )}
                      {r.value === "recruiter" && (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
                      )}
                      {r.value === "admin" && (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      )}
                    </div>
                    <span className="text-sm font-medium">{r.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {isSignIn && (
          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            <Checkbox name="remember" className="border-white/20" />
            Remember me for 30 days
          </label>
        )}

        <Button
          type="submit"
          size="lg"
          disabled={isLoading}
          className="mt-2 h-11 rounded-xl bg-brand text-[15px] font-semibold text-white hover:bg-brand/90"
        >
          {isLoading
            ? "Please wait..."
            : isSignIn
              ? "Sign In"
              : "Create Account"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}

        <Link
          href={isSignIn ? "/sign-up" : "/sign-in"}
          className="font-medium text-brand hover:underline"
        >
          {isSignIn ? "Sign Up" : "Sign In"}
        </Link>
      </p>
    </div>
  )
}
