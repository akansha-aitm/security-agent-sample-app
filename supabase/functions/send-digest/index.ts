Deno.serve(async (req) => {
  const { to } = await req.json();
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { authorization: `Bearer ${Deno.env.get("RESEND_API_KEY")}`, "content-type": "application/json" },
    body: JSON.stringify({ from: "digest@example.com", to, subject: "Your digest", text: "..." }),
  });
  return new Response("sent");
});
