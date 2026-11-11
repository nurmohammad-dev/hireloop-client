"use client"

import { useSession } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function DashboardPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const role = session?.user?.role || "seeker"

  useEffect(() => {
    router.replace(`/dashboard/${role}`)
  }, [router, role])

  return null
}
