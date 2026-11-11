"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowLeft, Briefcase } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectGroup, SelectItem } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"

export default function NewJobPage() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = Object.fromEntries(new FormData(event.currentTarget).entries())
    console.log("New Job Form Data:", data)
    // TODO: Integrate with API later
  }

  return (
    <div className="min-h-svh flex flex-col bg-background">
      <div className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-8 flex items-center gap-2">
            <Link
              href="/dashboard/recruiter"
              className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:bg-muted/50 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-foreground">Create Job Post</h1>
              <p className="text-sm text-muted-foreground">
                Post a new job opening to find the right talent
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Job Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Job Title</Label>
              <Input
                id="title"
                name="title"
                type="text"
                required
                placeholder="e.g. Frontend Developer"
                className="h-10"
              />
            </div>

            {/* Company */}
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                name="company"
                type="text"
                required
                placeholder="e.g. TechFlow Systems"
                className="h-10"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Job Description</Label>
              <Textarea
                id="description"
                name="description"
                required
                rows={6}
                placeholder="Describe the role, responsibilities, and what you're looking for in a candidate..."
                className="h-48"
              />
            </div>

            <Separator />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  type="text"
                  placeholder="e.g. Remote, New York, USA"
                  className="h-10"
                />
              </div>

              {/* Job Type */}
              <div className="space-y-2">
                <Label htmlFor="jobType">Job Type</Label>
                <Select id="jobType" name="jobType" defaultValue="full-time">
                  <SelectGroup>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="freelance">Freelance</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                  </SelectGroup>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select id="category" name="category">
                  <SelectGroup>
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="product">Product</SelectItem>
                    <SelectItem value="data">Data & Analytics</SelectItem>
                    <SelectItem value="operations">Operations</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectGroup>
                </Select>
              </div>

              {/* Salary */}
              <div className="space-y-2">
                <Label htmlFor="salary">Salary (optional)</Label>
                <Input
                  id="salary"
                  name="salary"
                  type="text"
                  placeholder="e.g. €25–€40/hour or $80k–$120k/year"
                  className="h-10"
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full py-3"
              size="lg"
            >
              <Briefcase className="w-4 h-4 mr-2" /> Post Job
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
