"use client"

import * as React from "react"
import { cn } from "cn"

function Select({
  className,
  children,
  ...props
}: React.ComponentProps<"select">) {
  return (
    <select
      data-slot="select"
      className={cn(
        "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80",
        className
      )}
      {...props}
    >
      {children}
    </select>
  )
}

function SelectGroup({
  className,
  children,
  ...props
}: React.ComponentProps<"optgroup">) {
  return (
    <optgroup data-slot="select-group" className={className} {...props}>
      {children}
    </optgroup>
  )
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<"option">) {
  return (
    <option data-slot="select-item" className={className} {...props}>
      {children}
    </option>
  )
}

export { Select, SelectGroup, SelectItem }
