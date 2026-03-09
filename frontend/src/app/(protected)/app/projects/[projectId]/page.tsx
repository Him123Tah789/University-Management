"use client";

import { use } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, GripVertical, CheckSquare, Link2, Plus } from "lucide-react";

export default function KanbanBoardPage({ params }: { params: Promise<{ projectId: string }> }) {
    const resolvedParams = use(params);

    const MOCK_BOARD = {
        TODO: [{ id: 1, title: "Draft ERD Schema", assignee: "Alice" }],
        IN_PROGRESS: [{ id: 2, title: "Setup Database Container", assignee: "Bob" }],
        DONE: [{ id: 3, title: "Initialize Repo", assignee: "Charlie" }],
    };

    return (
        <div className="space-y-6 flex flex-col h-[calc(100vh-8rem)]">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/app/projects">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <h1 className="text-2xl font-semibold tracking-tight">Project #{resolvedParams.projectId} Board</h1>
                </div>
                <div className="flex bg-slate-100 p-1 rounded-lg">
                    <Button variant="ghost" className="bg-white shadow-sm h-8" size="sm">
                        Kanban
                    </Button>
                    <Button variant="ghost" className="h-8 text-muted-foreground" size="sm">
                        <CheckSquare className="w-4 h-4 mr-2" />
                        Checklist
                    </Button>
                    <Button variant="ghost" className="h-8 text-muted-foreground" size="sm">
                        <Link2 className="w-4 h-4 mr-2" />
                        Links
                    </Button>
                </div>
            </div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 overflow-hidden">
                {/* To Do Column */}
                <div className="flex flex-col bg-slate-50/50 border rounded-xl overflow-hidden">
                    <div className="p-3 border-b bg-white font-medium flex items-center justify-between text-sm">
                        <span>TO DO</span>
                        <span className="bg-slate-100 px-2 py-0.5 rounded text-xs text-muted-foreground">{MOCK_BOARD.TODO.length}</span>
                    </div>
                    <div className="flex-1 overflow-y-auto p-3 space-y-3">
                        {MOCK_BOARD.TODO.map(task => (
                            <Card key={task.id} className="cursor-move hover:border-primary/50 transition-colors">
                                <CardContent className="p-3">
                                    <div className="flex items-start gap-2">
                                        <GripVertical className="w-4 h-4 text-slate-300 mt-0.5" />
                                        <div className="flex-1">
                                            <p className="text-sm font-medium">{task.title}</p>
                                            <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                                                <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded">@ {task.assignee}</span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                        <Button variant="ghost" className="w-full justify-start text-muted-foreground" size="sm">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Task
                        </Button>
                    </div>
                </div>

                {/* In Progress Column */}
                <div className="flex flex-col bg-slate-50/50 border rounded-xl overflow-hidden">
                    <div className="p-3 border-b bg-white font-medium flex justify-between items-center text-sm">
                        <span>IN PROGRESS</span>
                        <span className="bg-slate-100 px-2 py-0.5 rounded text-xs text-muted-foreground">{MOCK_BOARD.IN_PROGRESS.length}</span>
                    </div>
                    <div className="flex-1 overflow-y-auto p-3 space-y-3">
                        {MOCK_BOARD.IN_PROGRESS.map(task => (
                            <Card key={task.id} className="cursor-move hover:border-primary/50 transition-colors">
                                <CardContent className="p-3">
                                    <div className="flex items-start gap-2">
                                        <GripVertical className="w-4 h-4 text-slate-300 mt-0.5" />
                                        <div className="flex-1">
                                            <p className="text-sm font-medium">{task.title}</p>
                                            <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                                                <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded">@ {task.assignee}</span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Done Column */}
                <div className="flex flex-col bg-slate-50/50 border rounded-xl overflow-hidden">
                    <div className="p-3 border-b bg-white font-medium flex justify-between items-center text-sm">
                        <span>DONE</span>
                        <span className="bg-slate-100 px-2 py-0.5 rounded text-xs text-muted-foreground">{MOCK_BOARD.DONE.length}</span>
                    </div>
                    <div className="flex-1 overflow-y-auto p-3 space-y-3">
                        {MOCK_BOARD.DONE.map(task => (
                            <Card key={task.id} className="cursor-move hover:border-primary/50 transition-colors opacity-75">
                                <CardContent className="p-3">
                                    <div className="flex items-start gap-2">
                                        <GripVertical className="w-4 h-4 text-slate-300 mt-0.5" />
                                        <div className="flex-1">
                                            <p className="text-sm font-medium line-through text-muted-foreground">{task.title}</p>
                                            <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                                                <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded">@ {task.assignee}</span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
