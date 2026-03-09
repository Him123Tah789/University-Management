"use client";

import { use } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { DataTable } from "@/components/common/DataTable";

export default function ClassDetailPage({ params }: { params: Promise<{ classId: string }> }) {
    const resolvedParams = use(params);

    // Mock data based on classId
    const classDetail = {
        id: resolvedParams.classId,
        title: "Advanced Algorithms",
        description: "Deep dive into complex algorithmic structures and their applications.",
        tutor: "Dr. Smith",
        price: "$150",
    };

    const MOCK_BATCHES = [
        { id: 101, schedule: "Mon/Wed 10:00 AM", seats: 2, action: "enroll" },
        { id: 102, schedule: "Tue/Thu 2:00 PM", seats: 0, action: "waitlist" },
        { id: 103, schedule: "Sat 9:00 AM", seats: 15, action: "enroll" },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/app/live/browse">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <h1 className="text-2xl font-semibold tracking-tight">{classDetail.title}</h1>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Class Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{classDetail.description}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                        <div>
                            <p className="text-sm text-muted-foreground">Instructor</p>
                            <p className="font-medium">{classDetail.tutor}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Price</p>
                            <p className="font-medium">{classDetail.price}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Access Level</p>
                            <p className="font-medium">Lifetime Materials</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-4">
                <h2 className="text-xl font-medium tracking-tight">Available Batches</h2>
                <DataTable
                    data={MOCK_BATCHES}
                    columns={[
                        { header: "Schedule", accessorKey: "schedule" },
                        {
                            header: "Seats Remaining",
                            accessorKey: "seats",
                            cell: (item) => (
                                <span className={item.seats > 0 ? "text-green-600 font-medium" : "text-destructive font-medium"}>
                                    {item.seats > 0 ? item.seats : "Full"}
                                </span>
                            )
                        },
                        {
                            header: "Action",
                            accessorKey: "action",
                            cell: (item) => (
                                <Button
                                    size="sm"
                                    variant={item.seats > 0 ? "default" : "secondary"}
                                    onClick={() => alert(`Simulating checkout/waitlist for batch ${item.id}`)}
                                >
                                    {item.seats > 0 ? "Enroll Now" : "Join Waitlist"}
                                </Button>
                            )
                        }
                    ]}
                />
            </div>
        </div>
    );
}
