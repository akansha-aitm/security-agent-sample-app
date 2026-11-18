import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function GET(req: Request) {
  const prompt = new URL(req.url).searchParams.get("prompt") ?? "";
  const msg = await anthropic.messages.create({ model: "claude-haiku-4-5", max_tokens: 1024, messages: [{ role: "user", content: prompt }] });
  return Response.json(msg);
}

export async function POST(req: Request) {
  const { model, system, prompt } = await req.json();
  const msg = await anthropic.messages.create({ model, system, max_tokens: 4096, messages: [{ role: "user", content: prompt }] });
  return Response.json(msg);
}
