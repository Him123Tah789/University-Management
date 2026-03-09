"use client";

import { use } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check, X, Download } from "lucide-react";
import { DataTable } from "@/components/common/DataTable";
import { Badge } from "@/components/ui/badge";

export default function TeacherAttendancePage({ params }: { params: Promise<{ batchId: string }> }) {
    const resolvedParams = use(params);

    const MOCK_ROSTER = [
        { id: 1, name: "Alice Smith", email: "alice@student.edu", status: "PRESENT", notes: "" },
        { id: 2, name: "Bob Jones", email: "bob@student.edu", status: "ABSENT", notes: "Excused - Sick" },
        { id: 3, name: "Charlie Davis", email: "charlie@student.edu", status: "PENDING", notes: "" },
    ];

    const handleMark = (id: number, status: string) => {
        alert(`Marking student ${id} as ${status}`);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/teacher">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <h1 className="text-2xl font-semibold tracking-tight">Batch {resolvedParams.batchId} Attendance</h1>
            </div>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Today's Roster</CardTitle>
                    <div className="space-x-2">
                        <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Export
                        </Button>
                        <Button size="sm">Submit Attendance</Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <DataTable
                        data={MOCK_ROSTER}
                        columns={[
                            { header: "Student", accessorKey: "name" },
                            { header: "Email", accessorKey: "email" },
                            {
                                header: "Status",
                                accessorKey: "status",
                                cell: (item) => (
                                    <Badge variant={item.status === 'PRESENT' ? 'secondary' : item.status === 'ABSENT' ? 'destructive' : 'outline'}>
                                        {item.status}
                                    </Badge>
                                )
                            },
                            { header: "Notes", accessorKey: "notes" },
                            {
                                header: "Actions",
                                accessorKey: "id",
                                cell: (item) => (
                                    <div className="flex gap-2">
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            className="text-green-600 hover:text-green-700 hover:bg-green-50"
                                            onClick={() => handleMark(item.id, "PRESENT")}
                                        >
                                            <Check className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                            onClick={() => handleMark(item.id, "ABSENT")}
                                        >
                                            <X className="w-4 h-4" />
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
