'use client'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useSession } from "@/lib/auth-client"
import {
  LayoutDashboard,
  Building2,
  Briefcase,
  FileText,
  Bookmark,
  CreditCard,
  Users,
  Settings,
  PlusCircle,
} from "lucide-react"
import Link from "next/link"

export type MenuItem = {
  id: string
  name: string
  url: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

const ICON_MAP: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  Dashboard: LayoutDashboard,
  "My Company": Building2,
  "Manage Jobs": Briefcase,
  Applications: FileText,
  "Saved Jobs": Bookmark,
  Jobs: FileText,
  Billing: CreditCard,
  Payments: CreditCard,
  Users: Users,
  Settings: Settings,
}

export const menuItemsByRole: Record<string, MenuItem[]> = {
  seeker: [
    { id: "dashboard", name: "Dashboard", url: "/dashboard/seeker", icon: LayoutDashboard },
    { id: "my-company", name: "My Company", url: "/dashboard/seeker/my-company", icon: Building2 },
    { id: "manage-jobs", name: "Manage Jobs", url: "/dashboard/seeker/manage-jobs", icon: Briefcase },
    { id: "applications", name: "Applications", url: "/dashboard/seeker/applications", icon: FileText },
    { id: "settings", name: "Settings", url: "/dashboard/seeker/settings", icon: Settings },
  ],
  recruiter: [
    { id: "dashboard", name: "Dashboard", url: "/dashboard/recruiter", icon: LayoutDashboard },
    { id: "my-company", name: "My Company", url: "/dashboard/recruiter/my-company", icon: Building2 },
    { id: "manage-jobs", name: "Manage Jobs", url: "/dashboard/recruiter/manage-jobs", icon: Briefcase },
    { id: "add-job", name: "Add Job", url: "/dashboard/recruiter/jobs/new", icon: PlusCircle },
    { id: "applications", name: "Applications", url: "/dashboard/recruiter/applications", icon: FileText },
    { id: "settings", name: "Settings", url: "/dashboard/settings", icon: Settings },
  ],
  admin: [
    { id: "dashboard", name: "Dashboard", url: "/dashboard/admin", icon: LayoutDashboard },
    { id: "users", name: "Users", url: "/dashboard/admin/users", icon: Users },
    { id: "companies", name: "Companies", url: "/dashboard/admin/companies", icon: Building2 },
    { id: "jobs", name: "Jobs", url: "/dashboard/admin/jobs", icon: FileText },
    { id: "payments", name: "Payments", url: "/dashboard/admin/payments", icon: CreditCard },
    { id: "settings", name: "Settings", url: "/dashboard/admin/settings", icon: Settings },
  ],
}

export function DashboardSidebar() {
  const { data: session, isPending } = useSession()
  const role = session?.user?.role || "seeker"
  const items = menuItemsByRole[role] || menuItemsByRole.seeker

  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
        <SidebarGroup>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton render={<Link href={item.url} />}>
                  <item.icon />
                  <span>{item.name}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
