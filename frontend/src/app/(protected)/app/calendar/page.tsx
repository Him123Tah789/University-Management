import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";

export default function CalendarPage() {
    return (
        <div className="space-y-6 max-w-5xl mx-auto pb-10">
            <div>
                <h1 className="text-2xl font-semibold tracking-tight">Calendar</h1>
                <p className="text-muted-foreground">View your upcoming classes and events.</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Calendar className="w-5 h-5" />
                        Schedule
                    </CardTitle>
                </CardHeader>
                <CardContent className="h-[400px] flex items-center justify-center text-muted-foreground border-t">
                    Calendar interface will be loaded here.
                </CardContent>
            </Card>
        </div>
    );
}
