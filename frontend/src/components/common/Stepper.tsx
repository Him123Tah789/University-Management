import { Check } from "lucide-react";

interface Step {
    title: string;
    subTitle?: string;
    isCompleted: boolean;
    isActive: boolean;
}

interface StepperProps {
    steps: Step[];
}

export function Stepper({ steps }: StepperProps) {
    return (
        <div className="flex flex-col md:flex-row w-full mb-8">
            {steps.map((step, index) => (
                <div key={index} className="flex-1 flex flex-col items-center relative">
                    {index !== 0 && (
                        <div
                            className={`hidden md:block absolute w-[calc(100%-2rem)] h-1 top-4 right-1/2 -z-10 bg-slate-200`}
                        >
                            <div
                                className={`h-full bg-primary transition-all duration-300 ${step.isCompleted || step.isActive ? 'w-full' : 'w-0'}`}
                            />
                        </div>
                    )}
                    <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm transition-colors border-2 z-10 
              ${step.isCompleted ? "bg-primary text-primary-foreground border-primary"
                                : step.isActive ? "bg-background text-primary border-primary"
                                    : "bg-background text-muted-foreground border-slate-200"}`}
                    >
                        {step.isCompleted ? <Check className="w-4 h-4" /> : index + 1}
                    </div>
                    <div className="mt-2 text-center">
                        <p className={`text-sm font-medium ${step.isActive ? "text-primary" : "text-muted-foreground"}`}>{step.title}</p>
                        {step.subTitle && <p className="text-xs text-muted-foreground">{step.subTitle}</p>}
                    </div>
                </div>
            ))}
        </div>
    );
}
