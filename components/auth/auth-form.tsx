"use client"

import * as React from "react"
import Link from "next/link"
import { EyeIcon, EyeOffIcon } from "lucide-react"

import { cn } from "cn"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function AuthTabs({ mode }: { mode: "signin" | "signup" }) {
  const tabs = [
    { href: "/login", label: "Sign In", active: mode === "signin" },
    { href: "/register", label: "Sign Up", active: mode === "signup" },
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

const inputClasses =
  "h-10 rounded-lg border-white/10 bg-[#0c0c0f] px-3 text-[15px] text-white focus-visible:border-brand/60 focus-visible:ring-brand/30 placeholder:text-white/40"

export function AuthForm({ mode }: { mode: "signin" | "signup" }) {
  const [showPassword, setShowPassword] = React.useState(false)
  const isSignIn = mode === "signin"

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData.entries())
    // TODO: wire up to auth integration later
    console.log(isSignIn ? "Sign in form data:" : "Sign up form data:", data)
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
                href="/login"
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
              {showPassword ? <EyeOffIcon className="size-4" /> : <EyeIcon className="size-4" />}
            </button>
          </div>
          {!isSignIn && (
            <p className="text-xs text-muted-foreground">Minimum 8 characters.</p>
          )}
        </div>

        {isSignIn && (
          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            <Checkbox name="remember" className="border-white/20" />
            Remember me for 30 days
          </label>
        )}

        <Button
          type="submit"
          size="lg"
          className="mt-2 h-11 rounded-xl bg-brand text-[15px] font-semibold text-white hover:bg-brand/90"
        >
          {isSignIn ? "Sign In" : "Create Account"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
        <Link
          href={isSignIn ? "/register" : "/login"}
          className="font-medium text-brand hover:underline"
        >
          {isSignIn ? "Sign Up" : "Sign In"}
        </Link>
      </p>
    </div>
  )
}
