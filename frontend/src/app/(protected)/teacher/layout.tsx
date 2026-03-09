"use client";

import { RoleGate } from "@/components/layout/RoleGate";

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
    return (
        <RoleGate allowedRoles={["TEACHER"]}>
            <div className="space-y-6">
                {children}
            </div>
        </RoleGate>
    );
}
