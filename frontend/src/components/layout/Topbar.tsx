"use client";

import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserSession, clearSession } from "@/lib/auth";

export function Topbar({ session }: { session: UserSession | null }) {
    const handleLogout = () => {
        clearSession();
        window.location.href = "/login";
    };

    return (
        <header className="h-16 border-b bg-white flex items-center justify-between px-6 z-10 sticky top-0">
            <div className="flex items-center gap-4">
                {/* Mobile menu trigger could go here */}
                <h1 className="text-lg font-semibold md:hidden">Platform</h1>
            </div>
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon">
                    <Bell className="h-5 w-5" />
                </Button>
                {session ? (
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground hidden md:inline-block">
                            {session.email}
                        </span>
                        <Button variant="outline" size="sm" onClick={handleLogout}>
                            Logout
                        </Button>
                    </div>
                ) : (
                    <div className="text-sm text-gray-400">Not signed in</div>
                )}
            </div>
        </header>
    );
}
