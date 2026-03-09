"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";

export default function RegistrationOverview() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold tracking-tight">Smart Semester Registration</h1>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Fall 2026 Registration</CardTitle>
                        <CardDescription>Status: Window Open</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                            Build your optimal schedule automatically. Our engine checks your prerequisites,
                            avoids time conflicts, and finds the best section gaps.
                        </p>
                    </CardContent>
                    <CardFooter>
                        <Link href="/app/registration/new" className="w-full">
                            <Button className="w-full">
                                <PlayCircle className="w-4 h-4 mr-2" />
                                Start Registration Wizard
                            </Button>
                        </Link>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
