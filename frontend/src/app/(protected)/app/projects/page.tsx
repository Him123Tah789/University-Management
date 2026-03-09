"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FolderKanban, Users, Clock } from "lucide-react";

export default function GroupProjectsPage() {
    const MOCK_PROJECTS = [
        { id: 101, title: "Database Architecture Design", course: "Database Systems", members: 4, due: "Next Friday" },
        { id: 102, title: "ML Model Deployment", course: "Machine Learning Concepts", members: 3, due: "In 3 Weeks" },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold tracking-tight">Group Projects</h1>
                <Button>
                    <FolderKanban className="w-4 h-4 mr-2" />
                    Create New Project
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {MOCK_PROJECTS.map(proj => (
                    <Card key={proj.id} className="flex flex-col">
                        <CardHeader>
                            <CardTitle className="text-xl">{proj.title}</CardTitle>
                            <CardDescription>{proj.course}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 space-y-4">
                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                                <span className="flex items-center gap-2">
                                    <Users className="w-4 h-4" />
                                    {proj.members} Members
                                </span>
                                <span className="flex items-center gap-2 text-orange-600">
                                    <Clock className="w-4 h-4" />
                                    {proj.due}
                                </span>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Link href={`/app/projects/${proj.id}`} className="w-full">
                                <Button variant="secondary" className="w-full">View Kanban Board</Button>
                            </Link>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
