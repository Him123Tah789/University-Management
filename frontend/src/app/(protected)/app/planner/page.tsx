"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Target, AlertTriangle, BookOpen, CheckCircle2, Circle } from "lucide-react";

export default function StudyPlannerDashboard() {
    const MOCK_TASKS = [
        { id: 1, title: "Week 1: Algorithmic Complexity", course: "Advanced Algorithms", type: "Reading", due: "Tomorrow", completed: true },
        { id: 2, title: "Week 2: Divide and Conquer", course: "Advanced Algorithms", type: "Assignment", due: "Friday", completed: false },
        { id: 3, title: "Midterm Preparation", course: "Database Systems", type: "Exam Prep", due: "Next Week", completed: false },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold tracking-tight">Study Planner</h1>
                <Link href="/app/planner/upload">
                    <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        New Syllabus
                    </Button>
                </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Exam Readiness Score</CardTitle>
                        <Target className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">85%</div>
                        <p className="text-xs text-muted-foreground">Based on completed revisions</p>
                    </CardContent>
                </Card>

                <Card className="border-orange-200 bg-orange-50/50">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-orange-900">Behind Schedule</CardTitle>
                        <AlertTriangle className="w-4 h-4 text-orange-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-orange-700">1 Course</div>
                        <p className="text-xs text-orange-700">Database Systems requires attention</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Syllabuses</CardTitle>
                        <BookOpen className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">2</div>
                        <p className="text-xs text-muted-foreground">Tracking 24 upcoming tasks</p>
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-4">
                <h2 className="text-lg font-medium tracking-tight">Upcoming Deadlines</h2>
                <div className="grid gap-3">
                    {MOCK_TASKS.map(task => (
                        <div key={task.id} className="flex items-center justify-between p-4 bg-white border rounded-lg shadow-sm">
                            <div className="flex items-start gap-3">
                                <button className="mt-0.5 text-muted-foreground hover:text-primary transition-colors">
                                    {task.completed ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Circle className="w-5 h-5" />}
                                </button>
                                <div>
                                    <h3 className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                                        {task.title}
                                    </h3>
                                    <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                                        <span className="font-medium text-primary/80">{task.course}</span>
                                        <span>•</span>
                                        <span>{task.type}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-sm font-medium whitespace-nowrap">
                                {task.due}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
