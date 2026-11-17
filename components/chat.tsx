"use client";
// PLANTED (critical): the OpenAI key is shipped to every visitor's browser
export async function ask(prompt: string) {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}` },
    body: JSON.stringify({ model: "gpt-5", messages: [{ role: "user", content: prompt }] }),
  });
  return res.json();
}
