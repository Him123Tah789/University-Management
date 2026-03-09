"use client";

import { RoleGate } from "@/components/layout/RoleGate";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <RoleGate allowedRoles={["ADMIN"]}>
            <div className="space-y-6">
                {children}
            </div>
        </RoleGate>
    );
}
