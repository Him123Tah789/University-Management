"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/common/StatusBadge";
import { DataTable } from "@/components/common/DataTable";
import { Calendar, AlertCircle } from "lucide-react";

export default function StudentDashboard() {
    const mockTasks = [
        { id: 1, title: "Week 1 Reading: Intro", module: "Planner", due: "Tomorrow" },
        { id: 2, title: "Database Schema Draft", module: "Group Project", due: "In 3 Days" },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold tracking-tight">Student Dashboard</h1>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Registration Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold mb-2">Early Bird</div>
                        <StatusBadge status="ELIGIBLE" />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Exam Readiness</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">85%</div>
                        <p className="text-xs text-muted-foreground">On Track!</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Waitlisted Seats</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1</div>
                        <p className="text-xs text-muted-foreground">Data Structures II</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Today's Tasks</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">3</div>
                        <p className="text-xs text-muted-foreground">Action required</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle className="text-lg font-medium flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-muted-foreground" />
                            Timeline (7 Days)
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <DataTable
                            data={mockTasks}
                            columns={[
                                { header: "Task", accessorKey: "title" },
                                { header: "Module", accessorKey: "module" },
                                { header: "Due", accessorKey: "due" }
                            ]}
                        />
                    </CardContent>
                </Card>

                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle className="text-lg font-medium flex items-center gap-2">
                            <AlertCircle className="w-5 h-5 text-muted-foreground" />
                            Alerts
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-start gap-4 p-3 rounded-lg bg-orange-50 border border-orange-100">
                            <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5" />
                            <div>
                                <p className="text-sm font-medium text-orange-900">Registration Expiry</p>
                                <p className="text-xs text-orange-700">Your registration window closes in 2 days.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-3 rounded-lg bg-blue-50 border border-blue-100">
                            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                            <div>
                                <p className="text-sm font-medium text-blue-900">Live Class Reminder</p>
                                <p className="text-xs text-blue-700">Algorithms starts at 10:00 AM on Zoom.</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
