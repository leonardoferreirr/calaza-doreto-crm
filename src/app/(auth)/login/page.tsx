import { BRAND_DEFAULT } from "@/lib/brand";

// Login placeholder (scaffold). Próximo passo: Supabase Auth (e-mail/senha ou magic link)
// e escopo do tenant via profile.
export default function LoginPage() {
  const b = BRAND_DEFAULT;
  return (
    <main className="min-h-screen grid place-items-center" style={{ background: b.corFundo }}>
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl">
        <img src={b.logoUrl} alt={b.nome} style={{ height: 30, filter: "invert(1)" }} className="mb-6" />
        <h1 className="text-lg font-semibold text-ink mb-4">Entrar</h1>
        <input className="w-full rounded-lg border border-black/10 px-3 py-2 text-sm mb-3" placeholder="E-mail" />
        <input className="w-full rounded-lg border border-black/10 px-3 py-2 text-sm mb-4" type="password" placeholder="Senha" />
        <button className="w-full rounded-lg py-2 text-sm font-semibold text-white" style={{ background: "var(--brand)" }}>
          Entrar
        </button>
      </div>
    </main>
  );
}
