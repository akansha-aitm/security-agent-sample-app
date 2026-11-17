import { createBrowserClient } from "@supabase/ssr";

// PLANTED (low): legacy anon key, to migrate to the publishable key
export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);
