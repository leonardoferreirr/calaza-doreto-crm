import { createBrowserClient } from "@supabase/ssr";

// Cliente Supabase pro browser (respeita RLS via sessão do usuário).
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
