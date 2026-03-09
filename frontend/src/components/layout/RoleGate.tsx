"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getSession, UserRole } from "@/lib/auth";

interface RoleGateProps {
    children: React.ReactNode;
    allowedRoles?: UserRole[];
}

export function RoleGate({ children, allowedRoles }: RoleGateProps) {
    const router = useRouter();
    const pathname = usePathname();
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

    useEffect(() => {
        const session = getSession();

        if (!session) {
            router.replace(`/login?redirect=${pathname}`);
            return;
        }

        if (allowedRoles && !allowedRoles.includes(session.role)) {
            // Redirect to their respective dashboard if they try to access another role's route
            if (session.role === "STUDENT") router.replace("/app");
            else if (session.role === "TEACHER") router.replace("/teacher");
            else router.replace("/admin");
            return;
        }

        setIsAuthorized(true);
    }, [router, pathname, allowedRoles]);

    if (isAuthorized === null) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
    }

    return <>{children}</>;
}
