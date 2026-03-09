"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UploadCloud, FileType2, Loader2 } from "lucide-react";

export default function SyllabusUploadPage() {
    const router = useRouter();
    const [isUploading, setIsUploading] = useState(false);

    const handleUpload = () => {
        setIsUploading(true);
        // Simulate ML PDF Extraction delay
        setTimeout(() => {
            setIsUploading(false);
            router.push("/app/planner");
        }, 2000);
    };

    return (
        <div className="space-y-6 max-w-3xl mx-auto">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold tracking-tight">Upload Syllabus</h1>
                <Link href="/app/planner">
                    <Button variant="outline">Cancel</Button>
                </Link>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>AI Study Plan Generator</CardTitle>
                    <CardDescription>
                        Upload your course syllabus (PDF or DOCX). Our AI will automatically extract weeks, topics,
                        reading assignments, and exam dates to build a custom study tracker.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="border-2 border-dashed border-gray-200 rounded-xl p-12 text-center hover:bg-gray-50 transition-colors cursor-pointer">
                        <div className="mx-auto w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
                            <UploadCloud className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-medium">Click to upload or drag and drop</h3>
                        <p className="text-sm text-muted-foreground mt-1">PDF, DOCX up to 10MB</p>

                        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                            <FileType2 className="w-4 h-4" />
                            <span>Supports complex tables and weekly schedule formats</span>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button
                        className="w-full"
                        size="lg"
                        onClick={handleUpload}
                        disabled={isUploading}
                    >
                        {isUploading ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Extracting Deadlines & Topics...
                            </>
                        ) : (
                            "Generate Study Plan"
                        )}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
