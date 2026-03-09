"use client";

import { useState } from "react";
import { Link2, Search, Edit3, ShieldAlert } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ParaphraseEditor() {
    const [text, setText] = useState("");
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [results, setResults] = useState<{ paraphrase: string, citations: any, claim: string, score: number } | null>(null);

    const handleAnalyze = () => {
        setIsAnalyzing(true);
        setTimeout(() => {
            setResults({
                paraphrase: "By assessing structural limitations, developers can deploy microservices to independently scale databases and computational bottlenecks.",
                citations: [{ type: "APA", text: "Fowler, M. (2014). Microservices Architecture. Addison-Wesley." }],
                claim: "Microservices fix scaling limits.",
                score: 12.5,
            });
            setIsAnalyzing(false);
        }, 1500);
    };

    return (
        <div className="space-y-6 max-w-5xl mx-auto flex flex-col h-[calc(100vh-8rem)]">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold tracking-tight flex items-center gap-2">
                    <Edit3 className="w-6 h-6 text-primary" />
                    Academic Writing Helper
                </h1>
                <div className="flex bg-slate-100 p-1 rounded-lg">
                    <Button variant="ghost" className="bg-white shadow-sm h-8" size="sm">
                        Paraphrase & Citations
                    </Button>
                    <Button variant="ghost" className="h-8 text-muted-foreground" size="sm" onClick={() => window.location.href = "/app/writing/evidence-map"}>
                        <Link2 className="w-4 h-4 mr-2" />
                        Evidence Map
                    </Button>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 flex-1 min-h-0">
                <Card className="flex flex-col">
                    <CardHeader>
                        <CardTitle className="text-lg">Original Text (Draft)</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col gap-4">
                        <textarea
                            className="flex-1 w-full p-4 rounded-md border resize-none focus:outline-none focus:ring-2 ring-primary/50"
                            placeholder="Paste your paragraph or unedited claim here..."
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                        <Button className="w-full" onClick={handleAnalyze} disabled={!text || isAnalyzing}>
                            {isAnalyzing ? "Analyzing Semantics..." : "Check Integrity & Suggest"}
                        </Button>
                    </CardContent>
                </Card>

                <div className="flex flex-col space-y-6 overflow-y-auto pr-2">
                    {results ? (
                        <>
                            <Card className="border-green-200 bg-green-50/30">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm text-green-800 flex items-center justify-between">
                                        Similarity Risk
                                        <span className="text-lg font-bold">{results.score}%</span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-green-700">Excellent! Below the 15% threshold. Safe for Turnitin submission.</p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm flex items-center gap-2 text-primary">
                                        <Search className="w-4 h-4" />
                                        Paraphrase Suggestion
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm leading-relaxed">{results.paraphrase}</p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm flex items-center gap-2 text-primary">
                                        <ShieldAlert className="w-4 h-4" />
                                        Required Citations (APA)
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {results.citations.map((cit: any, i: number) => (
                                        <div key={i} className="bg-slate-50 p-3 rounded border text-sm flex justify-between items-center group">
                                            <span className="font-mono text-xs">{cit.text}</span>
                                            <Button size="sm" variant="outline" className="opacity-0 group-hover:opacity-100 transition-opacity h-7 text-xs">Copy</Button>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        </>
                    ) : (
                        <div className="flex items-center justify-center h-full border-2 border-dashed rounded-xl text-muted-foreground p-8 text-center bg-gray-50/50">
                            Paste your text on the left to securely generate paraphrases, verify claims, and format citations automatically.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
