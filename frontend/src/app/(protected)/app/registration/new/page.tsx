"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Stepper } from "@/components/common/Stepper";
import { StatusBadge } from "@/components/common/StatusBadge";
import { AlertCircle, CheckCircle } from "lucide-react";

const COURSES = [
    { id: 1, code: "CS201", title: "Data Structures", prereqs: true, credits: 3 },
    { id: 2, code: "CS301", title: "Algorithms", prereqs: false, reason: "Needs CS201", credits: 3 },
    { id: 3, code: "MTH101", title: "Calculus I", prereqs: true, credits: 4 },
];

export default function RegistrationWizard() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [selectedCourses, setSelectedCourses] = useState<number[]>([]);

    const handleNext = () => setStep(s => Math.min(s + 1, 4));
    const handleBack = () => setStep(s => Math.max(s - 1, 1));
    const handleGenerate = () => router.push("/app/registration/result");

    const steps = [
        { title: "Select Semester", isActive: step === 1, isCompleted: step > 1 },
        { title: "Choose Courses", isActive: step === 2, isCompleted: step > 2 },
        { title: "Preferences", isActive: step === 3, isCompleted: step > 3 },
    ];

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-semibold tracking-tight">Create Schedule</h1>

            <Stepper steps={steps} />

            <Card>
                <CardContent className="pt-6">
                    {step === 1 && (
                        <div className="space-y-4">
                            <h2 className="text-lg font-medium">Select Semester</h2>
                            <select className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                                <option>Fall 2026</option>
                                <option>Spring 2027</option>
                            </select>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-4">
                            <h2 className="text-lg font-medium">Choose Courses</h2>
                            <div className="space-y-3">
                                {COURSES.map(course => (
                                    <div key={course.id} className="flex items-center justify-between p-4 border rounded-lg">
                                        <div className="flex items-center gap-4">
                                            <input
                                                type="checkbox"
                                                disabled={!course.prereqs}
                                                checked={selectedCourses.includes(course.id)}
                                                onChange={(e) => {
                                                    if (e.target.checked) setSelectedCourses(p => [...p, course.id]);
                                                    else setSelectedCourses(p => p.filter(id => id !== course.id));
                                                }}
                                                className="w-4 h-4"
                                            />
                                            <div>
                                                <p className="font-medium">{course.code} - {course.title}</p>
                                                <p className="text-xs text-muted-foreground">{course.credits} Credits</p>
                                            </div>
                                        </div>
                                        {course.prereqs ? (
                                            <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                                                <CheckCircle className="w-4 h-4" /> Eligible
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-end gap-1">
                                                <StatusBadge status="NOT_ELIGIBLE" />
                                                <span className="text-xs flex items-center gap-1 text-destructive">
                                                    <AlertCircle className="w-3 h-3" /> {course.reason}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-4">
                            <h2 className="text-lg font-medium">Time Preferences</h2>
                            <div className="grid gap-4">
                                <div>
                                    <label className="text-sm font-medium">Preferred Time of Day</label>
                                    <select className="flex h-10 w-full rounded-md border px-3 py-2 mt-1">
                                        <option>Morning (8AM - 12PM)</option>
                                        <option>Afternoon (1PM - 5PM)</option>
                                        <option>No Preference</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-sm font-medium">Days to Avoid</label>
                                    <select className="flex h-10 w-full rounded-md border px-3 py-2 mt-1">
                                        <option>None</option>
                                        <option>Friday</option>
                                        <option>Monday</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            <div className="flex justify-between">
                <Button variant="outline" onClick={handleBack} disabled={step === 1}>Back</Button>
                {step < 3 ? (
                    <Button onClick={handleNext}>Continue</Button>
                ) : (
                    <Button onClick={handleGenerate}>Generate Schedule</Button>
                )}
            </div>
        </div>
    );
}
