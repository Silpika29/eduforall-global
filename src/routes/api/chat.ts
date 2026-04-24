import { createFileRoute } from "@tanstack/react-router";

const SYSTEM_PROMPT = `You are EduAI Mentor — a warm, encouraging tutor and mentor for children, volunteers, and sponsors on the EduForAll platform.

Your mission is to make education feel possible and joyful for every child on Earth. You can:
- Explain concepts (math, science, reading, languages) at a child-friendly level
- Translate phrases between any languages
- Suggest learning activities, study plans, and creative projects
- Help volunteers prepare lessons and help sponsors understand impact
- Always be kind, patient, optimistic, and inclusive.

Keep replies concise (2-6 short paragraphs), use markdown, emojis sparingly, and end with a small follow-up question that invites the next step.`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const { messages } = (await request.json()) as {
            messages: Array<{ role: "user" | "assistant"; content: string }>;
          };

          const LOVABLE_API_KEY = process.env.LOVABLE_API_KEY;
          if (!LOVABLE_API_KEY) {
            return new Response(
              JSON.stringify({ error: "AI is not configured." }),
              { status: 500, headers: { "Content-Type": "application/json" } },
            );
          }

          const response = await fetch(
            "https://ai.gateway.lovable.dev/v1/chat/completions",
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${LOVABLE_API_KEY}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                model: "google/gemini-3-flash-preview",
                stream: true,
                messages: [
                  { role: "system", content: SYSTEM_PROMPT },
                  ...messages,
                ],
              }),
            },
          );

          if (!response.ok) {
            if (response.status === 429) {
              return new Response(
                JSON.stringify({
                  error: "Too many requests, please try again in a moment.",
                }),
                {
                  status: 429,
                  headers: { "Content-Type": "application/json" },
                },
              );
            }
            if (response.status === 402) {
              return new Response(
                JSON.stringify({
                  error:
                    "AI usage limit reached. Please add credits in your Lovable workspace.",
                }),
                {
                  status: 402,
                  headers: { "Content-Type": "application/json" },
                },
              );
            }
            const text = await response.text();
            console.error("AI gateway error", response.status, text);
            return new Response(
              JSON.stringify({ error: "AI gateway error" }),
              {
                status: 500,
                headers: { "Content-Type": "application/json" },
              },
            );
          }

          return new Response(response.body, {
            headers: {
              "Content-Type": "text/event-stream",
              "Cache-Control": "no-cache",
            },
          });
        } catch (err) {
          console.error("chat route error", err);
          return new Response(
            JSON.stringify({ error: "Unexpected error" }),
            { status: 500, headers: { "Content-Type": "application/json" } },
          );
        }
      },
    },
  },
});