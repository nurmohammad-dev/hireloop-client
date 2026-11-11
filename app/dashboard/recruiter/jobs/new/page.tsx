"use client"

import * as React from "react"
import Link from "next/link"
import {
  ArrowRight,
  Building,
  Calendar,
  Circle,
  MapPin,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectGroup, SelectItem } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"

const JOB_TYPES = [
  { value: "full-time", label: "Full-time" },
  { value: "part-time", label: "Part-time" },
  { value: "contract", label: "Contract" },
  { value: "internship", label: "Internship" },
]

function SectionTitle({ index, title }: { index: number; title: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="size-1.5 rounded-full bg-brand" />
      <h2 className="text-sm font-semibold text-foreground">
        {index}. {title}
      </h2>
    </div>
  )
}

function FieldLabel({ htmlFor, children, badge }: { htmlFor: string; children: React.ReactNode; badge?: string }) {
  return (
    <div className="flex items-center gap-2">
      <Label htmlFor={htmlFor}>
        {children} <span className="text-brand">*</span>
      </Label>
      {badge ? (
        <span className="rounded-full border border-border px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
          {badge}
        </span>
      ) : null}
    </div>
  )
}

function IconInput({ icon, className, ...props }: React.ComponentProps<"input"> & { icon: React.ReactNode }) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground [&_svg]:size-4">
        {icon}
      </span>
      <Input className={`pl-8 ${className ?? ""}`} {...props} />
    </div>
  )
}

export default function NewJobPage() {
  const [remoteAllowed, setRemoteAllowed] = React.useState(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = Object.fromEntries(new FormData(event.currentTarget).entries())
    console.log("New Job Form Data:", data)
    // TODO: Integrate with API later
  }

  return (
    <div className="flex flex-col">
      <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-3 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Link
            href="/dashboard/recruiter/jobs"
            className="transition-colors hover:text-foreground"
          >
            Manage Jobs
          </Link>
          <span aria-hidden>&gt;</span>
          <span className="text-foreground">Create New Listing</span>
        </nav>

        {/* Header */}
        <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Post a New Job</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Fill in job specifications to attract qualified talent across our
              networks.
            </p>
          </div>
          <Button type="submit" form="new-job-form">
            Publish Job <ArrowRight className="size-4" />
          </Button>
        </div>

        {/* Form */}
        <form id="new-job-form" onSubmit={handleSubmit} className="space-y-8">
          {/* 1. Basic Information */}
          <section className="space-y-5">
            <SectionTitle index={1} title="Basic Information" />

            <div className="space-y-2">
              <FieldLabel htmlFor="title">Job Title</FieldLabel>
              <Input
                id="title"
                name="title"
                type="text"
                required
                placeholder="Frontend Developer"
                className="h-10"
              />
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <FieldLabel htmlFor="company">Company Name</FieldLabel>
                <IconInput
                  id="company"
                  name="company"
                  icon={<Building />}
                  required
                  placeholder="HirePulse Network"
                  className="h-10"
                />
              </div>
              <div className="space-y-2">
                <FieldLabel htmlFor="category">Job Category</FieldLabel>
                <Select id="category" name="category" required defaultValue="engineering" className="h-10">
                  <SelectGroup>
                    <SelectItem value="engineering">Engineering &amp; Tech</SelectItem>
                    <SelectItem value="design">Design &amp; Creative</SelectItem>
                    <SelectItem value="marketing">Marketing &amp; Growth</SelectItem>
                    <SelectItem value="product">Product &amp; Management</SelectItem>
                    <SelectItem value="data">Data &amp; Analytics</SelectItem>
                    <SelectItem value="operations">Operations &amp; Support</SelectItem>
                  </SelectGroup>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <FieldLabel htmlFor="jobType">Job Type</FieldLabel>
              <div
                id="jobType"
                role="radiogroup"
                aria-label="Job Type"
                className="grid grid-cols-2 gap-3 sm:grid-cols-4"
              >
                {JOB_TYPES.map((type) => (
                  <label key={type.value} className="cursor-pointer">
                    <input
                      type="radio"
                      name="jobType"
                      value={type.value}
                      defaultChecked={type.value === "full-time"}
                      className="peer sr-only"
                    />
                    <span className="flex h-10 items-center justify-center rounded-lg border border-input text-sm text-muted-foreground transition-colors outline-none peer-checked:border-brand peer-checked:bg-brand/10 peer-checked:text-foreground peer-focus-visible:ring-3 peer-focus-visible:ring-ring/50">
                      {type.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </section>

          <Separator />

          {/* 2. Location, Compensation & Timeline */}
          <section className="space-y-5">
            <SectionTitle index={2} title="Location, Compensation & Timeline" />

            {/* Remote toggle row */}
            <div className="flex items-center justify-between gap-4 rounded-xl border border-border bg-surface-1 px-4 py-3">
              <div className="flex items-start gap-2.5">
                <Circle className="mt-0.5 size-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Remote Work Allowed{" "}
                    <span className="text-muted-foreground">(Optional)</span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Enable worldwide or distributed candidate applications
                  </p>
                </div>
              </div>
              <input type="hidden" name="remote" value={remoteAllowed ? "true" : "false"} />
              <Switch
                checked={remoteAllowed}
                onCheckedChange={setRemoteAllowed}
                aria-label="Remote Work Allowed"
              />
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <FieldLabel htmlFor="location" badge="Required">
                  Job Location
                </FieldLabel>
                <IconInput
                  id="location"
                  name="location"
                  icon={<MapPin />}
                  type="text"
                  placeholder="New York, USA"
                  className="h-10"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="deadline">Application Deadline (Deadline)</Label>
                <IconInput
                  id="deadline"
                  name="deadline"
                  icon={<Calendar />}
                  type="date"
                  className="h-10"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="minSalary">Min Salary / Rate</Label>
                <Input
                  id="minSalary"
                  name="minSalary"
                  type="text"
                  placeholder="€ 25"
                  className="h-10"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxSalary">Max Salary / Rate</Label>
                <Input
                  id="maxSalary"
                  name="maxSalary"
                  type="text"
                  placeholder="€ 40"
                  className="h-10"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="frequency">Frequency</Label>
                <Select id="frequency" name="frequency" defaultValue="hour" className="h-10">
                  <SelectGroup>
                    <SelectItem value="hour">per hour</SelectItem>
                    <SelectItem value="day">per day</SelectItem>
                    <SelectItem value="month">per month</SelectItem>
                    <SelectItem value="year">per year</SelectItem>
                  </SelectGroup>
                </Select>
              </div>
            </div>
          </section>

          <Separator />

          {/* 3. Responsibilities & Requirements */}
          <section className="space-y-5">
            <SectionTitle index={3} title="Responsibilities & Requirements" />

            <div className="space-y-2">
              <FieldLabel htmlFor="responsibilities">Key Responsibilities</FieldLabel>
              <Textarea
                id="responsibilities"
                name="responsibilities"
                required
                rows={4}
                placeholder="Showcase your commitment to delivering exceptional user interfaces and digital experiences. You will collaborate directly with systems designers and backend engineers to craft responsive, micro-interaction rich products."
              />
            </div>

            <div className="space-y-2">
              <FieldLabel htmlFor="qualifications">Qualifications &amp; Requirements</FieldLabel>
              <Textarea
                id="qualifications"
                name="qualifications"
                required
                rows={5}
                placeholder={"• 3+ years of experience with React, TypeScript, and modern state architectures\n• Solid understanding of DOM performance and component-driven designs\n• Experienced partnering closely with product teams and UI/UX designers"}
              />
            </div>
          </section>
        </form>
      </div>
    </div>
  )
}
