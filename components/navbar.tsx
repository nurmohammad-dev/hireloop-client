"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { MenuIcon } from "lucide-react"

import { cn } from "cn"
import logo from "@/app/images/logo.png"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const navLinks = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Company", href: "/company" },
  { label: "Pricing", href: "/pricing" },
]

function Logo() {
  return (
    <Link href="/" aria-label="HireLoop home" className="shrink-0">
      <Image
        src={logo}
        alt="HireLoop"
        width={154}
        height={44}
        className="h-10 w-auto"
        priority
      />
    </Link>
  )
}

function ActionBar({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <Button
        render={<Link href="/sign-in" />}
        nativeButton={false}
        size="lg"
        className="h-11 rounded-xl bg-white px-5 text-[17px] font-semibold text-brand hover:bg-white/90 dark:text-brand"
      >
        Sign In
      </Button>
      <Button
        render={<Link href="/sign-up" />}
        nativeButton={false}
        size="lg"
        className="h-11 rounded-xl bg-brand px-6 text-[17px] text-white shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)] hover:bg-brand/90"
      >
        Get Started
      </Button>
    </div>
  )
}

export function Navbar() {
  const [open, setOpen] = React.useState(false)

  return (
    <header className="sticky top-4 z-40 w-full">
      <div className="mx-auto w-full max-w-[1320px] px-4 sm:px-6">
        <nav
          data-slot="navbar"
          className="flex h-[74px] items-center gap-2 rounded-2xl border border-border/60 bg-surface-3/95 pr-2 pl-4 shadow-sm backdrop-blur-md sm:pl-6"
        >
          <Logo />

          {/* Desktop links */}
          <div className="ml-auto hidden items-center gap-2 lg:flex">
            <div className="flex items-center gap-10 pr-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[15px] tracking-tight text-foreground transition-colors hover:text-brand"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <Separator
              orientation="vertical"
              className="mx-4 h-7 w-px bg-foreground/15"
            />
            <ActionBar />
          </div>

          {/* Mobile hamburger */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-auto size-11 text-foreground lg:hidden"
                  aria-label="Open menu"
                />
              }
            >
              <MenuIcon />
            </SheetTrigger>
            <SheetContent side="right" className="bg-surface-3 gap-6 p-6">
              <SheetTitle className="sr-only">Navigation menu</SheetTitle>
              <div className="mt-4 flex items-center justify-between">
                <Logo />
              </div>
              <nav className="flex flex-col">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-3 py-3 text-lg text-foreground transition-colors hover:bg-surface-2 hover:text-brand"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <Separator className="bg-foreground/10" />
              <ActionBar className="flex-col" />
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  )
}
