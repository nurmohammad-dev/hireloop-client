import {
  BarChart3,
  Boxes,
  Bug,
  Code,
  Megaphone,
  Palette,
  Server,
  Settings2,
  type LucideIcon,
} from "lucide-react"

export type JobType = "full-time" | "part-time" | "contract" | "internship"
/**
 * A job post — fields mirror what the "Post a New Job" form collects
 * (title, company, category, jobType, remote, location, salary range,
 * frequency, deadline, responsibilities, qualifications) plus the
 * manage-table fields (id, applicants, status, postedAt).
 */
export type JobPost = {
  id?: string
  _id?: string // Mongo id from the API
  title: string
  company: string
  category: string // free-form from the API ("IT", "Design", ...)
  jobType: string // "full-time" or "Full-time"
  remote: boolean
  location: string
  minSalary: string
  maxSalary: string
  frequency: string // "hour" or "Monthly"
  deadline: string // yyyy-mm-dd
  responsibilities: string
  qualifications: string
  // manage table fields
  applicants: number
  status: string // "active", "Active", "Pending", ...
  postedAt: string // yyyy-mm-dd
}

export const CATEGORY_LABELS: Record<string, string> = {
  engineering: "Engineering",
  design: "Design",
  marketing: "Marketing",
  product: "Product",
  data: "Data",
  operations: "Operations",
}

const FALLBACK_CATEGORY_META = { icon: Boxes, className: "bg-muted text-muted-foreground" }

export function getCategoryMeta(category: string) {
  return CATEGORY_META[category] ?? FALLBACK_CATEGORY_META
}

export const CATEGORY_META: Record<string, { icon: LucideIcon; className: string }> = {
  engineering: { icon: Code, className: "bg-sky-500/10 text-sky-400" },
  design: { icon: Palette, className: "bg-orange-500/10 text-orange-400" },
  marketing: { icon: Megaphone, className: "bg-purple-500/10 text-purple-400" },
  product: { icon: Boxes, className: "bg-violet-500/10 text-violet-400" },
  data: { icon: BarChart3, className: "bg-teal-500/10 text-teal-400" },
  operations: { icon: Settings2, className: "bg-amber-500/10 text-amber-400" },
}

const FREQ_SHORT: Record<string, string> = {
  hour: "hr",
  day: "day",
  month: "mo",
  year: "yr",
}

export function formatCompensation(
  job: Pick<JobPost, "minSalary" | "maxSalary" | "frequency">
) {
  const unit = FREQ_SHORT[job.frequency.toLowerCase()] ?? job.frequency.toLowerCase()
  return `${job.minSalary} - ${job.maxSalary} /${unit}`
}

export function formatJobType(jobType: string) {
  return jobType.charAt(0).toUpperCase() + jobType.slice(1)
}

export function formatLocation(job: Pick<JobPost, "remote" | "location">) {
  return job.remote ? `Remote / ${job.location}` : job.location
}

export function formatDeadline(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export function formatPostedAgo(iso: string) {
  const days = Math.max(1, Math.round(Math.abs(Date.now() - new Date(`${iso}T00:00:00`).getTime()) / 86_400_000))
  const span = days >= 30 ? `${Math.round(days / 30)}mo` : days >= 7 ? `${Math.round(days / 7)}w` : `${days}d`
  return `Posted ${span} ago`
}

export const MOCK_JOBS: JobPost[] = [
  {
    id: "HL-90210",
    title: "Frontend Developer",
    company: "HirePulse Network",
    category: "engineering",
    jobType: "full-time",
    remote: true,
    location: "New York, USA",
    minSalary: "€ 25",
    maxSalary: "€ 40",
    frequency: "hour",
    deadline: "2026-11-30",
    responsibilities: "Build responsive, accessible interfaces in React and TypeScript.",
    qualifications: "3+ years of experience with React, TypeScript, and modern state architectures.",
    applicants: 24,
    status: "active",
    postedAt: "2026-11-08",
  },
  {
    id: "HL-88231",
    title: "Senior Product Designer",
    company: "HirePulse Labs",
    category: "design",
    jobType: "full-time",
    remote: false,
    location: "London, UK (Hybrid)",
    minSalary: "€ 90k",
    maxSalary: "€ 115k",
    frequency: "year",
    deadline: "2026-12-14",
    responsibilities: "Own end-to-end product design from discovery to polished UI.",
    qualifications: "Solid understanding of DOM performance and component-driven designs.",
    applicants: 19,
    status: "active",
    postedAt: "2026-10-29",
  },
  {
    id: "HL-77410",
    title: "DevOps Specialist",
    company: "HirePulse Platform",
    category: "operations",
    jobType: "full-time",
    remote: false,
    location: "Berlin, Germany",
    minSalary: "€ 105k",
    maxSalary: "€ 130k",
    frequency: "year",
    deadline: "2026-12-30",
    responsibilities: "Automate CI/CD pipelines and keep our infrastructure reliable.",
    qualifications: "Experienced partnering closely with product teams and UI/UX designers.",
    applicants: 12,
    status: "active",
    postedAt: "2026-11-09",
  },
  {
    id: "HL-66012",
    title: "Product Marketing Lead",
    company: "HirePulse Network",
    category: "marketing",
    jobType: "full-time",
    remote: true,
    location: "Worldwide",
    minSalary: "€ 80k",
    maxSalary: "€ 105k",
    frequency: "year",
    deadline: "2027-01-12",
    responsibilities: "Shape positioning and launch plans for new hiring products.",
    qualifications: "5+ years of B2B SaaS marketing experience.",
    applicants: 27,
    status: "active",
    postedAt: "2026-11-04",
  },
  {
    id: "HL-55020",
    title: "QA Automation Engineer",
    company: "HirePulse Platform",
    category: "engineering",
    jobType: "part-time",
    remote: false,
    location: "Dublin, Ireland (Hybrid)",
    minSalary: "€ 35",
    maxSalary: "€ 50",
    frequency: "hour",
    deadline: "2026-11-01",
    responsibilities: "Build automated test suites and keep regression coverage healthy.",
    qualifications: "Hands-on experience with Playwright and modern testing stacks.",
    applicants: 8,
    status: "expired",
    postedAt: "2026-11-01",
  },
]
