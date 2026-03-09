"use client";

import { Link2, FileText, ArrowLeft, ZoomIn } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function EvidenceMapPage() {
    const MOCK_MAPPING = [
        {
            id: 1,
            claim: "Microservices fix scaling limits.",
            source: "Fowler, M. (2014)",
            confidence: 95,
            snippet: "deploy microservices to independently scale databases"
        },
        {
            id: 2,
            claim: "Machine Learning improves over time.",
            source: "No Source Mapped",
            confidence: 12,
            snippet: ""
        }
    ];

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold tracking-tight flex items-center gap-2">
                    <Link2 className="w-6 h-6 text-primary" />
                    Evidence Map
                </h1>
                <div className="flex bg-slate-100 p-1 rounded-lg">
                    <Button variant="ghost" className="h-8 text-muted-foreground" size="sm" onClick={() => window.location.href = "/app/writing"}>
                        Paraphrase & Citations
                    </Button>
                    <Button variant="ghost" className="bg-white shadow-sm h-8" size="sm">
                        <Link2 className="w-4 h-4 mr-2" />
                        Evidence Map
                    </Button>
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Claim Traceability</h2>

                {MOCK_MAPPING.map(map => (
                    <Card key={map.id} className={map.confidence < 50 ? "border-red-200 bg-red-50/20" : ""}>
                        <CardContent className="p-4">
                            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">

                                {/* Left side: Claim */}
                                <div className="flex-1 space-y-1">
                                    <div className="text-xs font-semibold text-muted-foreground flex items-center gap-1 mb-2">
                                        <FileText className="w-3 h-3" /> Extracted Claim
                                    </div>
                                    <p className="font-medium text-sm leading-relaxed">{map.claim}</p>
                                </div>

                                {/* Center: Connect / Confidence */}
                                <div className="flex flex-col items-center justify-center shrink-0 px-4 md:border-x border-y md:border-y-0 py-2 md:py-0 border-dashed border-gray-300">
                                    <div className={`text-xs font-bold ${map.confidence > 50 ? 'text-green-600' : 'text-red-600'}`}>
                                        {map.confidence}% MATCH
                                    </div>
                                    <ArrowLeft className="w-4 h-4 text-muted-foreground my-1 hidden md:block" />
                                </div>

                                {/* Right side: Source */}
                                <div className="flex-1 space-y-1">
                                    <div className="text-xs font-semibold text-muted-foreground flex items-center gap-1 mb-2">
                                        <ZoomIn className="w-3 h-3" /> Mapped Reference
                                    </div>
                                    {map.snippet ? (
                                        <>
                                            <p className="text-sm text-slate-700 italic border-l-2 pl-2 border-slate-300">"{map.snippet}"</p>
                                            <p className="text-xs font-medium text-slate-500 mt-2">— {map.source}</p>
                                        </>
                                    ) : (
                                        <div className="text-sm text-red-600 font-medium flex items-center justify-between">
                                            Unsubstantiated Claim
                                            <Button size="sm" variant="outline" className="h-7 text-xs">Find Source</Button>
                                        </div>
                                    )}
                                </div>

                            </div>
                        </CardContent>
                    </Card>
                ))}

            </div>
        </div>
    );
}
