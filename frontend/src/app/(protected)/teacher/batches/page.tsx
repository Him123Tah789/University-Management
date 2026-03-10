import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, BookOpen } from "lucide-react";
import Link from "next/link";

export default function BatchesPage() {
    return (
        <div className="space-y-6 max-w-5xl mx-auto pb-10">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">My Batches</h1>
                    <p className="text-muted-foreground">Manage your classes and take attendance.</p>
                </div>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((batch) => (
                    <Card key={batch}>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg flex justify-between items-start">
                                <span>CS10{batch} - Data Structures</span>
                                <span className="text-xs font-normal px-2 py-1 bg-primary/10 text-primary rounded-full">Active</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 py-4">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Users className="w-4 h-4" />
                                45 Students Enrolled
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <BookOpen className="w-4 h-4" />
                                Fall Semester
                            </div>
                        </CardContent>
                        <CardFooter className="pt-2 border-t">
                            <Link href={`/teacher/attendance/batch-${batch}`} className="w-full">
                                <Button className="w-full" variant="outline">Take Attendance</Button>
                            </Link>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
