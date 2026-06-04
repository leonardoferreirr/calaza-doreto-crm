// Auth leve client-side pra protecao da demo enquanto Supabase Auth nao entra.
// Nao e seguro contra usuario malicioso (qualquer dev abre devtools e bypassa),
// mas evita que o link publico seja navegavel pra leigos.
// Substituir por Supabase Auth quando a base for plugada.

const KEY = "crm-auth";
const USERNAME = "admin";
const PASSWORD = "Crm@CD#2026!";

export function signIn(username: string, password: string): boolean {
  if (username.trim() === USERNAME && password === PASSWORD) {
    if (typeof window !== "undefined") localStorage.setItem(KEY, "ok");
    return true;
  }
  return false;
}

export function isAuthed(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(KEY) === "ok";
}

export function signOut() {
  if (typeof window !== "undefined") localStorage.removeItem(KEY);
}
