"use client"

import Link from "next/link"
import { Ellipsis, Pencil, Plus, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  CATEGORY_LABELS,
  CATEGORY_META,
  MOCK_JOBS,
  formatCompensation,
  formatDeadline,
  formatJobType,
  formatLocation,
  formatPostedAgo,
  type JobPost,
} from "@/lib/jobs"

const table = MOCK_JOBS

function StatusBadge({ status }: { status: JobPost["status"] }) {
  const active = status === "active"
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${
        active
          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
          : "border-border bg-muted text-muted-foreground"
      }`}
    >
      <span className={`size-1.5 rounded-full ${active ? "bg-emerald-400" : "bg-muted-foreground"}`} />
      {active ? "Active" : "Expired"}
    </span>
  )
}

function TypeBadge({ jobType }: { jobType: JobPost["jobType"] }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border bg-surface-2 px-2.5 py-1 text-xs text-muted-foreground">
      {formatJobType(jobType)}
    </span>
  )
}

export default function ManageJobsPage() {
  return (
    <div className="flex flex-col">
      <div className="w-full px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-3 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Link
            href="/dashboard/recruiter/jobs"
            className="transition-colors hover:text-foreground"
          >
            Manage Jobs
          </Link>
          <span aria-hidden>&gt;</span>
          <span className="text-foreground">Job Listings &amp; Postings</span>
        </nav>

        {/* Header */}
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Manage Job Posts</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Review listings, monitor applicants, and update job details across
              your organization.
            </p>
          </div>
          <Button nativeButton={false} render={<Link href="/dashboard/recruiter/jobs/new" />}>
            <Plus className="size-4" /> New Job Posts
          </Button>
        </div>

        {/* Table */}
        <div className="rounded-xl border border-border bg-surface-1">
          <Table className="min-w-[960px]">
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Job Title &amp; Dept</TableHead>
                <TableHead>Company &amp; Location</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Compensation</TableHead>
                <TableHead>Applicants</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Deadline</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {table.map((job) => {
                const meta = CATEGORY_META[job.category]
                const Icon = meta.icon
                return (
                  <TableRow key={job.id}>
                    {/* Job Title & Dept */}
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <span
                          className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${meta.className}`}
                        >
                          <Icon className="size-4" />
                        </span>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-foreground">
                            {job.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {CATEGORY_LABELS[job.category]}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    {/* Company & Location */}
                    <TableCell>
                      <p className="text-sm text-foreground">{job.company}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatLocation(job)}
                      </p>
                    </TableCell>

                    {/* Type */}
                    <TableCell>
                      <TypeBadge jobType={job.jobType} />
                    </TableCell>

                    {/* Compensation */}
                    <TableCell className="text-sm whitespace-nowrap text-muted-foreground">
                      {formatCompensation(job)}
                    </TableCell>

                    {/* Applicants */}
                    <TableCell>
                      <span className="inline-flex items-center gap-1.5 text-sm whitespace-nowrap text-foreground">
                        <Users className="size-4 text-brand" />
                        {job.applicants} Candidates
                      </span>
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      <StatusBadge status={job.status} />
                    </TableCell>

                    {/* Deadline */}
                    <TableCell>
                      <p className="text-sm whitespace-nowrap text-foreground">
                        {formatDeadline(job.deadline)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatPostedAgo(job.postedAt)}
                      </p>
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="text-right">
                      <div className="inline-flex items-center gap-1">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-brand/40 text-brand hover:bg-brand/10 hover:text-brand"
                        >
                          <Pencil className="size-3.5" /> Update
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8 text-muted-foreground"
                          aria-label="More actions"
                        >
                          <Ellipsis className="size-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
