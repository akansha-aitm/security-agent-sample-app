import OpenAI from "openai";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { ratelimit } from "@/lib/ratelimit";

export const maxDuration = 60;
const Body = z.object({ message: z.string().min(1).max(4000) });
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return new Response("Unauthorized", { status: 401 });
  const { success } = await ratelimit.limit(user.id);
  if (!success) return new Response("Too many requests", { status: 429 });
  const { message } = Body.parse(await req.json());
  const completion = await openai.chat.completions.create({
    model: "gpt-5-mini",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: message },
    ],
  });
  return Response.json({ answer: completion.choices[0].message.content });
}
