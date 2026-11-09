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
} from "lucide-react"

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
    { id: "dashboard", name: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { id: "my-company", name: "My Company", url: "/dashboard/my-company", icon: Building2 },
    { id: "manage-jobs", name: "Manage Jobs", url: "/dashboard/manage-jobs", icon: Briefcase },
    { id: "applications", name: "Applications", url: "/dashboard/applications", icon: FileText },
    { id: "settings", name: "Settings", url: "/dashboard/settings", icon: Settings },
  ],
  recruiter: [
    { id: "dashboard", name: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { id: "jobs", name: "Jobs", url: "/dashboard/jobs", icon: FileText },
    { id: "saved-jobs", name: "Saved Jobs", url: "/dashboard/saved-jobs", icon: Bookmark },
    { id: "applications", name: "Applications", url: "/dashboard/applications", icon: FileText },
    { id: "billing", name: "Billing", url: "/dashboard/billing", icon: CreditCard },
    { id: "settings", name: "Settings", url: "/dashboard/settings", icon: Settings },
  ],
  admin: [
    { id: "dashboard", name: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { id: "users", name: "Users", url: "/dashboard/users", icon: Users },
    { id: "companies", name: "Companies", url: "/dashboard/companies", icon: Building2 },
    { id: "jobs", name: "Jobs", url: "/dashboard/jobs", icon: FileText },
    { id: "payments", name: "Payments", url: "/dashboard/payments", icon: CreditCard },
    { id: "settings", name: "Settings", url: "/dashboard/settings", icon: Settings },
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
                <SidebarMenuButton render={<a href={item.url} />}>
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
