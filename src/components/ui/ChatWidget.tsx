"use client";

import { useState } from "react";
import { MessageSquare, X, Send, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newMessages = [...messages, { role: "user", content: text }];
    setMessages(newMessages);
    setText("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();

      let assistantText = "";

      while (true) {
        const { done, value } = await reader!.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const json = line.replace("data: ", "").trim();
            if (json === "[DONE]") continue;

            try {
              const parsed = JSON.parse(json);

              if (parsed.type === "text-delta") {
                assistantText += parsed.delta;
                setMessages((prev) => {
                  const copy = [...prev];
                  const last = copy[copy.length - 1];

                  if (last?.role === "assistant") {
                    copy[copy.length - 1].content = assistantText;
                  } else {
                    copy.push({
                      role: "assistant",
                      content: assistantText,
                    });
                  }

                  return copy;
                });
              }
            } catch {}
          }
        }
      }
    } catch (err) {
      console.error("Chat error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <div
        className={cn(
          "mb-4 w-[350px] sm:w-[400px] h-[500px] bg-[#0A0F0A] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col transition-all duration-300 origin-bottom-right",
          isOpen
            ? "scale-100 opacity-100 translate-y-0"
            : "scale-95 opacity-0 translate-y-10 pointer-events-none"
        )}
      >
        <div className="bg-[#111] border-b border-white/5 p-4 flex justify-between items-center">
          <h3 className="text-white font-semibold text-sm">
            SDE Abroad Guide
          </h3>
          <button onClick={() => setIsOpen(false)}>
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
          {messages.map((m, i) => (
            <div
              key={i}
              className={cn(
                "p-3 rounded-2xl text-sm max-w-[85%]",
                m.role === "user"
                  ? "self-end bg-[#111] text-white"
                  : "self-start bg-[#1A1A1A] text-white"
              )}
            >
              {m.content}
            </div>
          ))}

          {loading && (
            <Loader2 className="w-4 h-4 animate-spin text-white" />
          )}
        </div>

        <form onSubmit={handleSend} className="p-3 border-t border-white/5">
          <div className="relative flex items-center">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Ask a question..."
              className="w-full bg-black border border-white/10 rounded-full py-3 pl-4 pr-12 text-sm text-white"
            />
            <button
              type="submit"
              disabled={!text.trim() || loading}
              className="absolute right-2 p-2 rounded-full bg-[#00E5FF]/20"
            >
              <Send className="w-4 h-4 text-[#00E5FF]" />
            </button>
          </div>
        </form>
      </div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-green-600 text-white flex items-center justify-center"
      >
        {isOpen ? <X /> : <MessageSquare />}
      </button>
    </div>
  );
};