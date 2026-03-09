"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserRole } from "@/lib/auth";
import { LayoutDashboard, BookOpen, Key, Calendar, FileText, CheckSquare, Edit3, Type, Settings } from "lucide-react";

interface SidebarProps {
    role: UserRole;
}

export function Sidebar({ role }: SidebarProps) {
    const pathname = usePathname();

    const getLinks = () => {
        switch (role) {
            case "STUDENT":
                return [
                    { label: "Dashboard", href: "/app", icon: LayoutDashboard },
                    { label: "Semester Registration", href: "/app/registration", icon: BookOpen },
                    { label: "Study Planner", href: "/app/planner", icon: FileText },
                    { label: "Group Projects", href: "/app/projects", icon: CheckSquare },
                    { label: "Writing Helper", href: "/app/writing", icon: Edit3 },
                    { label: "Live Classes", href: "/app/live", icon: Type },
                    { label: "Calendar", href: "/app/calendar", icon: Calendar },
                ];
            case "TEACHER":
                return [
                    { label: "Dashboard", href: "/teacher", icon: LayoutDashboard },
                    { label: "My Batches", href: "/teacher/batches", icon: BookOpen },
                ];
            case "ADMIN":
                return [
                    { label: "Admin Panel", href: "/admin", icon: LayoutDashboard },
                    { label: "Live Classes Admin", href: "/admin/live/enrollments", icon: BookOpen },
                    { label: "University Admin", href: "/admin/university/courses", icon: Key },
                ];
            default:
                return [];
        }
    };

    const links = getLinks();

    return (
        <aside className="w-64 border-r bg-gray-50/50 hidden md:block min-h-screen">
            <div className="p-6">
                <h2 className="text-xl font-bold tracking-tight">One Platform</h2>
                <p className="text-xs text-muted-foreground uppercase mt-1">{role} PORTAL</p>
            </div>
            <nav className="space-y-1 px-3 mt-4">
                {links.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${isActive ? "bg-primary text-primary-foreground" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                }`}
                        >
                            <Icon className={`mr-3 h-4 w-4 ${isActive ? "text-primary-foreground" : "text-gray-400"}`} />
                            {link.label}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}
