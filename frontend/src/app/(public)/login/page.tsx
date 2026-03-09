"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { setSession, UserRole } from "@/lib/auth";

export default function LoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const simulateLogin = (role: UserRole) => {
        setIsLoading(true);
        setTimeout(() => {
            setSession({
                id: 1,
                email: `${role.toLowerCase()}@university.edu`,
                role: role,
                token: "mock-jwt-token"
            });

            switch (role) {
                case "STUDENT": router.push("/app"); break;
                case "TEACHER": router.push("/teacher"); break;
                case "ADMIN": router.push("/admin"); break;
            }
        }, 500);
    };

    return (
        <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
            <Card className="w-[400px]">
                <CardHeader className="text-center">
                    <CardTitle>One Platform Login</CardTitle>
                    <CardDescription>Select a demo role to proceed</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Button
                        className="w-full"
                        variant="default"
                        onClick={() => simulateLogin("STUDENT")}
                        disabled={isLoading}
                    >
                        Login as Student
                    </Button>
                    <Button
                        className="w-full"
                        variant="secondary"
                        onClick={() => simulateLogin("TEACHER")}
                        disabled={isLoading}
                    >
                        Login as Teacher
                    </Button>
                    <Button
                        className="w-full"
                        variant="outline"
                        onClick={() => simulateLogin("ADMIN")}
                        disabled={isLoading}
                    >
                        Login as Admin
                    </Button>
                </CardContent>
                <CardFooter className="justify-center">
                    <p className="text-xs text-muted-foreground">Backend Auth is mocked for this Demo</p>
                </CardFooter>
            </Card>
        </div>
    );
}
