import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function CoursesAdminPage() {
    return (
        <div className="space-y-6 max-w-5xl mx-auto pb-10">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">University Courses</h1>
                    <p className="text-muted-foreground">Manage the university course catalog.</p>
                </div>
                <Button className="flex items-center gap-2">
                    <PlusCircle className="w-4 h-4" />
                    Add Course
                </Button>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle>Course Catalog</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <div className="p-4 text-center text-sm text-muted-foreground py-10">
                            Course management interface will be loaded here.
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
