"use client";

import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/common/DataTable";
import { StatusBadge } from "@/components/common/StatusBadge";
import { AlertCircle, CheckCircle, Clock } from "lucide-react";

export default function RegistrationResult() {
    const router = useRouter();

    const MOCK_SCHEDULE = [
        { id: 101, title: "Data Structures", time: "Mon/Wed 10:00 AM", status: "OPEN" },
        { id: 102, title: "Calculus I", time: "Tue/Thu 1:00 PM", status: "OPEN" },
    ];

    const MOCK_WARNINGS = [
        { type: "conflict", msg: "Calculus I schedule overlaps slightly with requested afternoon break." },
        { type: "full", msg: "Algorithms is currently full. Added to Waitlist option." }
    ];

    const WaitlistOptions = [
        { id: 201, title: "Algorithms", type: "Core Required" }
    ];

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold tracking-tight">Generated Schedule</h1>
                <StatusBadge status="PENDING" />
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {/* Main Schedule View */}
                <div className="md:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-green-600" />
                                Recommended Sections
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <DataTable
                                data={MOCK_SCHEDULE}
                                columns={[
                                    { header: "Course", accessorKey: "title" },
                                    { header: "Schedule", accessorKey: "time" },
                                    {
                                        header: "Availability",
                                        accessorKey: "status",
                                        cell: (item) => <StatusBadge status={item.status} />
                                    }
                                ]}
                            />
                        </CardContent>
                        <CardFooter className="flex justify-end gap-4">
                            <Button variant="outline" onClick={() => router.push("/app/registration/new")}>
                                Recalculate
                            </Button>
                            <Button onClick={() => router.push("/app")}>
                                Confirm Enrollments
                            </Button>
                        </CardFooter>
                    </Card>
                </div>

                {/* Sidebar Warnings & Waitlist */}
                <div className="space-y-6">
                    <Card className="border-orange-200 bg-orange-50/30">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-lg text-orange-800 flex items-center gap-2">
                                <AlertCircle className="w-5 h-5" />
                                System Notices
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {MOCK_WARNINGS.map((warn, i) => (
                                <div key={i} className="text-sm text-orange-900 border-l-2 border-orange-400 pl-3">
                                    {warn.msg}
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Clock className="w-5 h-5 text-muted-foreground" />
                                Waitlist Options
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {WaitlistOptions.map(w => (
                                <div key={w.id} className="flex flex-col space-y-2 border-b pb-3 last:border-0">
                                    <span className="font-medium text-sm">{w.title}</span>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs text-muted-foreground">{w.type}</span>
                                        <Button size="sm" variant="secondary" onClick={() => alert("Added to Waitlist! Notifications active.")}>
                                            Join Waitlist
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
