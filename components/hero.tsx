import Image from "next/image"
import Link from "next/link"
import { BriefcaseBusinessIcon, MapPinIcon, SearchIcon } from "lucide-react"

import globe from "@/app/images/globe.png"
import { Button } from "@/components/ui/button"
import { cn } from "cn"

const trendingRoles = ["Product Designer", "AI Engineering", "Dev-ops Engineer"]

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#0b0b0c]">
      {/* ambient purple glow behind the headline */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[900px] max-w-full -translate-x-1/2 rounded-full bg-brand/25 blur-[140px]"
      />

      <div className="relative mx-auto flex w-full max-w-[832px] flex-col items-center px-6 pt-36 pb-16 text-center sm:pt-40 md:pt-44 md:pb-0">
        {/* live-activity badge */}
        <div className="flex items-center gap-6">
          <div
            aria-hidden
            className="hidden h-px w-16 rounded-full bg-gradient-to-r from-transparent to-white/25 sm:block"
          />
          <div className="rounded-full bg-[linear-gradient(90deg,#ff00ff,#0000ff,#00ffff,#00ff00,#ffff00,#ffbf00,#ff0000)] p-px">
            <div className="flex items-center gap-4 rounded-full bg-gradient-to-b from-[#474747] via-[#1a1a1b] to-[#010102] px-5 py-2.5 shadow-[inset_0_0_12px_rgba(0,0,0,0.3)] ring-1 ring-white/20">
              <BriefcaseBusinessIcon className="size-6 text-white/90" />
              <span className="text-sm font-medium text-white whitespace-nowrap md:text-base leading-tight">
                50,000+ new jobs this month
              </span>
            </div>
          </div>
          <div
            aria-hidden
            className="hidden h-px w-16 rounded-full bg-gradient-to-l from-transparent to-white/25 sm:block"
          />
        </div>

        {/* headline */}
        <h1 className="mt-8 text-balance text-[40px] font-bold leading-[1.15] tracking-[-0.02em] text-white sm:text-5xl md:mt-8 md:text-[56px]">
          Find Your Dream Job Today
        </h1>
        <p className="mt-4 text-pretty text-lg leading-relaxed text-white/70 sm:text-xl md:leading-[1.6]">
          HireLoop connects top talent with world-class companies. Browse
          thousands of curated opportunities and land your next role — faster.
        </p>

        {/* search bar */}
        <form
          action="/jobs"
          method="get"
          className="mt-12 flex w-full flex-col gap-2 rounded-2xl border border-white/10 bg-[#0c0c0f] p-2 shadow-2xl md:flex-row md:items-center"
        >
          <label className="flex min-w-0 flex-1 items-center gap-3 px-3 py-1.5 md:pl-6">
            <SearchIcon className="size-5 shrink-0 text-white/80" />
            <input
              name="q"
              type="search"
              placeholder="Job title, skill or company"
              autoComplete="off"
              className="h-11 w-full min-w-0 bg-transparent text-base text-white outline-none placeholder:text-white/60"
            />
          </label>
          <div aria-hidden className="hidden h-5 w-px shrink-0 bg-white/15 md:block" />
          <label className="flex min-w-0 flex-1 items-center gap-3 px-3 py-1.5 md:pl-6 md:pr-4">
            <MapPinIcon className="size-5 shrink-0 text-white/80" />
            <input
              name="location"
              type="search"
              placeholder="Location or Remote"
              autoComplete="off"
              className="h-11 w-full min-w-0 bg-transparent text-base text-white outline-none placeholder:text-white/60"
            />
          </label>
          <Button
            type="submit"
            size="icon-lg"
            aria-label="Search jobs"
            className="size-12 shrink-0 self-stretch rounded-xl bg-brand text-white hover:bg-brand/90 md:self-auto"
          >
            <SearchIcon />
          </Button>
        </form>

        {/* trending chips */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <span className="text-base text-white/70">Trending Position</span>
          {trendingRoles.map((role) => (
            <Link
              key={role}
              href={`/jobs?q=${encodeURIComponent(role)}`}
              className="rounded-full border border-white/10 bg-[#1a1a1b] px-3.5 py-1.5 text-sm text-white/90 transition-colors hover:border-brand/60 hover:text-white"
            >
              {role}
            </Link>
          ))}
        </div>
      </div>

      {/* globe art */}
      <div
        aria-hidden
        className="pointer-events-none relative mx-auto -mt-10 h-[58vw] max-h-[836px] sm:-mt-14 lg:-mt-16"
      >
        <Image
          src={globe}
          alt=""
          priority
          className="absolute left-1/2 top-0 h-auto w-[1440px] max-w-none -translate-x-1/2 max-sm:w-auto max-sm:min-w-[560px]"
        />
      </div>
    </section>
  )
}
