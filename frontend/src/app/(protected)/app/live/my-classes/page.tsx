"use client";

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Calendar as CalendarIcon, History } from "lucide-react";
import { StatusBadge } from "@/components/common/StatusBadge";

const MY_CLASSES = [
    {
        id: 1,
        title: "Advanced Algorithms",
        batch: "Mon/Wed 10:00 AM",
        zoom_link: "https://zoom.us/j/123456789",
        status: "ACTIVE",
        next_class: "Tomorrow, 10:00 AM"
    },
    {
        id: 2,
        title: "Database Systems",
        batch: "Tue/Thu 2:00 PM",
        zoom_link: "https://zoom.us/j/987654321",
        status: "COMPLETED",
        next_class: "Course Finished"
    }
];

export default function MyClassesPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold tracking-tight">My Live Classes</h1>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {MY_CLASSES.map((cls) => (
                    <Card key={cls.id} className="flex flex-col">
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <CardTitle className="text-xl">{cls.title}</CardTitle>
                                <StatusBadge status={cls.status} />
                            </div>
                            <p className="text-sm text-muted-foreground flex items-center gap-2 mt-2">
                                <CalendarIcon className="w-4 h-4" />
                                {cls.batch}
                            </p>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <div className="bg-slate-50 p-4 rounded-lg border">
                                <p className="text-sm font-medium text-slate-800 mb-1">Next Session</p>
                                <p className="text-sm text-slate-600">{cls.next_class}</p>
                            </div>
                        </CardContent>
                        <CardFooter className="flex gap-2">
                            <Button
                                className="flex-1"
                                disabled={cls.status === "COMPLETED"}
                                onClick={() => window.open(cls.zoom_link, "_blank")}
                            >
                                <ExternalLink className="w-4 h-4 mr-2" />
                                Join Zoom
                            </Button>
                            <Button variant="outline" size="icon" title="View Recordings">
                                <History className="w-4 h-4" />
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
