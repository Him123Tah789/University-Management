"use client";

import { useEffect, useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { getSession, UserSession } from "@/lib/auth";
import { ChatBot } from "@/components/common/ChatBot";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
    const [session, setSession] = useState<UserSession | null>(null);

    useEffect(() => {
        setSession(getSession());
    }, []);

    return (
        <div className="flex h-screen overflow-hidden bg-gray-50 relative">
            {session && <Sidebar role={session.role} />}
            <div className="flex flex-col flex-1 overflow-hidden">
                <Topbar session={session} />
                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    {children}
                </main>
            </div>
            {/* AI Assistant Chatbot */}
            <ChatBot />
        </div>
    );
}
