"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Home,
  Heart,
  Image as ImageIcon,
  Settings,
  LogOut,
  User,
  Bell,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Folder,
  Layers,
} from "lucide-react"
import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"

interface DashboardSidebarProps {
  user: {
    name: string
    email: string
    role: string
  }
  onLogout: () => void
}

export function DashboardSidebar({ user, onLogout }: DashboardSidebarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const navigationItems = [
    {
      label: "Dashboard",
      icon: Home,
      href: "/dashboard",
    },
    {
      label: "New Donation",
      icon: Heart,
      href: "/donations",
    },
    {
      label: "Gallery",
      icon: ImageIcon,
      href: "/dashboard/gallery",
    },
    {
      label: "Blogs",
      icon: BookOpen,
      href: "/dashboard/blogs",
    },
    {
      label: "Media",
      icon: Folder,
      href: "/dashboard/media",
    },
    {
      label: "Banners",
      icon: Layers,
      href: "/dashboard/banners",
    },
  ]

  const bottomItems = [
    {
      label: "Notifications",
      icon: Bell,
      href: "/notifications",
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/settings",
    },
  ]

  return (
    <div className={`bg-card border-r border-border h-screen transition-all duration-300 ${
      isCollapsed ? "w-16" : "w-64"
    } flex flex-col`}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Heart className="h-4 w-4 text-white" />
              </div>
              <span className="font-semibold text-sm">Anshika</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 h-8 w-8"
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* User Info */}
      {!isCollapsed && (
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm truncate">{user.name}</div>
              <div className="text-xs text-muted-foreground truncate">{user.email}</div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-2">
          <div className="space-y-1">
            {navigationItems.map((item, index) => {
              const isActive = pathname === item.href
              return (
                <Button
                  key={index}
                  asChild
                  variant={isActive ? "default" : "ghost"}
                  className={`w-full justify-start ${
                    isCollapsed ? "px-2" : "px-3"
                  } h-10`}
                >
                  <Link href={item.href}>
                    <item.icon className={`h-4 w-4 ${isCollapsed ? "" : "mr-3"}`} />
                    {!isCollapsed && <span className="text-sm">{item.label}</span>}
                  </Link>
                </Button>
              )
            })}
          </div>
        </div>

        <Separator className="mx-2" />

        <div className="p-2">
          <div className="space-y-1">
            {bottomItems.map((item, index) => {
              const isActive = pathname === item.href
              return (
                <Button
                  key={index}
                  asChild
                  variant={isActive ? "default" : "ghost"}
                  className={`w-full justify-start ${
                    isCollapsed ? "px-2" : "px-3"
                  } h-10`}
                >
                  <Link href={item.href}>
                    <item.icon className={`h-4 w-4 ${isCollapsed ? "" : "mr-3"}`} />
                    {!isCollapsed && <span className="text-sm">{item.label}</span>}
                  </Link>
                </Button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-2 border-t border-border">
        <Button
          variant="ghost"
          onClick={onLogout}
          className={`w-full justify-start ${
            isCollapsed ? "px-2" : "px-3"
          } h-10 text-red-600 hover:text-red-700 hover:bg-red-50`}
        >
          <LogOut className={`h-4 w-4 ${isCollapsed ? "" : "mr-3"}`} />
          {!isCollapsed && <span className="text-sm">Logout</span>}
        </Button>
      </div>
    </div>
  )
}
