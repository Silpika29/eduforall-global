import { useEffect, useRef, useState } from "react";
import { Bot, Send, Sparkles, X } from "lucide-react";
import ReactMarkdown from "react-markdown";

type Msg = { role: "user" | "assistant"; content: string };

const STARTER_PROMPTS = [
  "Explain photosynthesis to a 9-year-old",
  "Translate 'Keep going, you are amazing' to Swahili",
  "Give me a 10-minute reading activity",
];

export function AIChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm **EduAI Mentor** ✨. Ask me to explain a concept, translate a phrase, or plan a lesson — I'm here for every learner.",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  const send = async (text: string) => {
    const userMsg: Msg = { role: "user", content: text };
    setMessages((p) => [...p, userMsg]);
    setInput("");
    setLoading(true);

    let assistantSoFar = "";
    const upsert = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant" && last.content !== messages[messages.length - 1]?.content) {
          // Replace the streaming assistant message
          if (prev[prev.length - 1].content === assistantSoFar.slice(0, prev[prev.length - 1].content.length)) {
            return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar } : m));
          }
        }
        return [...prev, { role: "assistant", content: assistantSoFar }];
      });
    };

    try {
      const resp = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg].filter((m) => m.role !== "assistant" || m.content !== messages[0].content) }),
      });

      if (!resp.ok || !resp.body) {
        const errData = await resp.json().catch(() => ({ error: "Failed to start chat" }));
        setMessages((p) => [...p, { role: "assistant", content: `⚠️ ${errData.error || "Something went wrong."}` }]);
        setLoading(false);
        return;
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let done = false;
      // Seed assistant message
      setMessages((p) => [...p, { role: "assistant", content: "" }]);

      while (!done) {
        const { done: streamDone, value } = await reader.read();
        if (streamDone) break;
        buffer += decoder.decode(value, { stream: true });
        let nl: number;
        while ((nl = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, nl);
          buffer = buffer.slice(nl + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6).trim();
          if (data === "[DONE]") {
            done = true;
            break;
          }
          try {
            const parsed = JSON.parse(data);
            const delta = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (delta) {
              assistantSoFar += delta;
              setMessages((prev) =>
                prev.map((m, i) => (i === prev.length - 1 && m.role === "assistant" ? { ...m, content: assistantSoFar } : m)),
              );
            }
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }
    } catch (e) {
      console.error(e);
      setMessages((p) => [...p, { role: "assistant", content: "⚠️ Connection failed. Please try again." }]);
    } finally {
      setLoading(false);
    }
    // suppress unused upsert lint
    void upsert;
  };

  return (
    <>
      <button
        aria-label="Open EduAI Mentor"
        onClick={() => setOpen((v) => !v)}
        className="brutal hover-lift bg-gradient-primary fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-2xl text-primary-foreground shadow-glow animate-pulse-glow"
      >
        {open ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
      </button>

      {open && (
        <div className="glass brutal animate-fade-up fixed bottom-24 right-5 z-50 flex h-[32rem] w-[min(22rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-3xl">
          <div className="bg-gradient-primary flex items-center gap-2 px-4 py-3 text-primary-foreground">
            <Sparkles className="h-4 w-4" />
            <div className="font-display text-sm font-bold">EduAI Mentor</div>
            <span className="ml-auto rounded-full bg-background/20 px-2 py-0.5 text-[10px] font-semibold">LIVE</span>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-3 py-3 text-sm">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-2xl px-3 py-2 ${
                  m.role === "user"
                    ? "ml-auto bg-foreground text-background"
                    : "brutal-sm bg-card text-card-foreground"
                }`}
              >
                <div className="prose prose-sm max-w-none dark:prose-invert prose-p:my-1 prose-headings:my-1">
                  <ReactMarkdown>{m.content || "…"}</ReactMarkdown>
                </div>
              </div>
            ))}
            {loading && messages[messages.length - 1]?.role === "user" && (
              <div className="brutal-sm w-fit rounded-2xl bg-card px-3 py-2 text-xs text-muted-foreground">EduAI is thinking…</div>
            )}
          </div>

          {messages.length <= 1 && (
            <div className="flex flex-wrap gap-1.5 px-3 pb-2">
              {STARTER_PROMPTS.map((p) => (
                <button
                  key={p}
                  onClick={() => send(p)}
                  className="brutal-sm rounded-full bg-secondary px-2.5 py-1 text-[11px] font-medium hover:bg-secondary/80"
                >
                  {p}
                </button>
              ))}
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (input.trim() && !loading) send(input.trim());
            }}
            className="flex items-center gap-2 border-t border-border bg-background/50 px-3 py-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything…"
              className="flex-1 rounded-xl bg-secondary px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="brutal-sm bg-gradient-primary grid h-9 w-9 place-items-center rounded-xl text-primary-foreground disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}