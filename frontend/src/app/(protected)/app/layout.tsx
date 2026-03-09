"use client";

import { RoleGate } from "@/components/layout/RoleGate";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <RoleGate allowedRoles={["STUDENT"]}>
            <div className="space-y-6">
                {children}
            </div>
        </RoleGate>
    );
}
