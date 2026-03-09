"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, RefreshCw, Trash2 } from "lucide-react";
import { DataTable } from "@/components/common/DataTable";
import { StatusBadge } from "@/components/common/StatusBadge";

export default function AdminEnrollmentsPage() {
    const MOCK_ENROLLMENTS = [
        { id: 1001, student: "Alice Smith", class: "Advanced Algorithms", batch: "Mon/Wed", status: "ACTIVE", joined: "2026-03-01" },
        { id: 1002, student: "Bob Jones", class: "Database Systems", batch: "Tue/Thu", status: "COMPLETED", joined: "2026-01-15" },
        { id: 1003, student: "Charlie Davis", class: "Machine Learning Concepts", batch: "Waitlisted", status: "WAITLISTED", joined: "2026-03-09" },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold tracking-tight">Live Class Enrollments</h1>
                <div className="space-x-2">
                    <Button variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Export CSV
                    </Button>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Student Enrollments</CardTitle>
                </CardHeader>
                <CardContent>
                    <DataTable
                        data={MOCK_ENROLLMENTS}
                        columns={[
                            { header: "ID", accessorKey: "id" },
                            { header: "Student", accessorKey: "student" },
                            { header: "Class", accessorKey: "class" },
                            { header: "Batch", accessorKey: "batch" },
                            { header: "Date Joined", accessorKey: "joined" },
                            {
                                header: "Status",
                                accessorKey: "status",
                                cell: (item) => <StatusBadge status={item.status} />
                            },
                            {
                                header: "Manage",
                                accessorKey: "id",
                                cell: (item) => (
                                    <div className="flex gap-2">
                                        <Button size="sm" variant="secondary" title="Re-sync Zoom Link">
                                            <RefreshCw className="w-3 h-3" />
                                        </Button>
                                        <Button size="sm" variant="destructive" title="Cancel Enrollment">
                                            <Trash2 className="w-3 h-3" />
                                        </Button>
                                    </div>
                                )
                            }
                        ]}
                    />
                </CardContent>
            </Card>
        </div>
    );
}
