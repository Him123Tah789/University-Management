"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "system", content: "You are a helpful university assistant working within the Student Integrating Platform. You are friendly and concise." },
    { role: "assistant", content: "Hi there! How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage];
    
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      // Dynamically resolve backend base URL based on frontend host
      const apiHost = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
      const response = await fetch(`http://${apiHost}:8000/chat/local`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: updatedMessages,
          temperature: 0.3,
          max_tokens: 400
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();
      
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply }
      ]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I couldn't reach the AI model right now. Make sure the local server is running!" }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="w-[380px] h-[500px] bg-white rounded-xl shadow-2xl border flex flex-col mb-4 overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-200">
          {/* Header */}
          <div className="bg-primary px-4 py-3 flex items-center justify-between text-primary-foreground">
            <div className="flex items-center gap-2 font-medium">
              <Bot className="w-5 h-5" />
              <span>Shadow AI Assistant</span>
              <span className="text-[10px] bg-primary-foreground/20 px-1.5 py-0.5 rounded ml-1">Local Model</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-primary-foreground/80 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
            {messages.filter(m => m.role !== "system").map((msg, index) => (
              <div 
                key={index}
                className={`flex gap-2 max-w-[85%] ${msg.role === "user" ? "ml-auto flex-row-reverse" : ""}`}
              >
                <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-1 ${
                  msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground border"
                }`}>
                  {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div className={`p-3 rounded-xl text-sm ${
                  msg.role === "user" 
                    ? "bg-primary text-primary-foreground rounded-tr-none" 
                    : "bg-white border text-gray-800 rounded-tl-none shadow-sm"
                }`}>
                  {msg.content.split('\\n').map((line, i) => (
                    <span key={i}>
                      {line}
                      <br />
                    </span>
                  ))}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-2 max-w-[85%]">
                <div className="shrink-0 w-8 h-8 rounded-full bg-muted text-muted-foreground border flex items-center justify-center mt-1">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-white border text-gray-800 p-3 rounded-xl rounded-tl-none shadow-sm flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Ask me anything..."
                className="flex-1 px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
              />
              <Button 
                size="icon" 
                onClick={handleSend} 
                disabled={!input.trim() || isLoading}
                className="shrink-0"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="icon"
        className="w-14 h-14 rounded-full shadow-xl shadow-primary/20 hover:scale-105 transition-transform"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </Button>
    </div>
  );
}
