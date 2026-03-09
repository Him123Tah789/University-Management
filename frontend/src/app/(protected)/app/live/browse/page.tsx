"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const MOCK_CLASSES = [
    { id: 1, title: "Advanced Algorithms", tutor: "Dr. Smith", price: "$150", duration: "8 Weeks", seats: 5, tag: "Popular" },
    { id: 2, title: "Database Systems", tutor: "Prof. Johnson", price: "$120", duration: "6 Weeks", seats: 0, tag: "Full" },
    { id: 3, title: "Machine Learning Basics", tutor: "Dr. Lee", price: "$200", duration: "10 Weeks", seats: 12, tag: "New" },
];

export default function BrowseLiveClasses() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold tracking-tight">Browse Live Classes</h1>
                <Link href="/app/live/my-classes">
                    <Button variant="outline">My Classes</Button>
                </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {MOCK_CLASSES.map((cls) => (
                    <Card key={cls.id} className="flex flex-col">
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <CardTitle className="text-xl">{cls.title}</CardTitle>
                                <Badge variant={cls.seats > 0 ? "secondary" : "destructive"}>
                                    {cls.tag}
                                </Badge>
                            </div>
                            <CardDescription>Instructor: {cls.tutor}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Duration:</span>
                                    <span className="font-medium">{cls.duration}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Price:</span>
                                    <span className="font-medium">{cls.price}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Availability:</span>
                                    <span className={`font-medium ${cls.seats > 0 ? "text-green-600" : "text-destructive"}`}>
                                        {cls.seats > 0 ? `${cls.seats} seats left` : "Waitlist"}
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Link href={`/app/live/class/${cls.id}`} className="w-full">
                                <Button className="w-full" variant={cls.seats > 0 ? "default" : "secondary"}>
                                    {cls.seats > 0 ? "View Batches" : "Join Waitlist"}
                                </Button>
                            </Link>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
