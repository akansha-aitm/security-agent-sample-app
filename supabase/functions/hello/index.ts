Deno.serve(() => new Response(JSON.stringify({ hello: "world" }), { headers: { "content-type": "application/json" } }));
