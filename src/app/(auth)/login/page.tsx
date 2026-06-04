"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LogoCalaza from "@/components/LogoCalaza";
import { isAuthed, signIn } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // se ja logado, redireciona direto pro dashboard
  useEffect(() => {
    if (isAuthed()) router.replace("/dashboard");
  }, [router]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    setLoading(true);
    setTimeout(() => {
      if (signIn(usuario, senha)) {
        router.replace("/dashboard");
      } else {
        setErro("Usuário ou senha incorretos.");
        setLoading(false);
      }
    }, 350);
  }

  return (
    <main
      className="min-h-screen grid place-items-center px-4"
      style={{
        background:
          "radial-gradient(1200px 600px at 50% -10%, #1e4284 0%, #0f1a36 45%, #06091a 100%)",
      }}
    >
      <div className="w-full max-w-[400px] text-center">
        {/* Logo branca centralizada */}
        <div className="mb-10 flex justify-center" style={{ color: "#ffffff" }}>
          <LogoCalaza height={56} />
        </div>

        <form
          onSubmit={onSubmit}
          className="rounded-2xl p-8 text-left"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.10)",
            backdropFilter: "blur(8px)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
          }}
        >
          <h1 className="text-[18px] font-semibold text-white">Acesso restrito</h1>
          <p className="text-[12.5px] mt-1" style={{ color: "rgba(255,255,255,0.6)" }}>
            Entre com suas credenciais pra acessar o CRM.
          </p>

          <div className="mt-6 space-y-3">
            <Field
              label="Usuário"
              value={usuario}
              onChange={setUsuario}
              autoComplete="username"
              autoFocus
            />
            <Field
              label="Senha"
              value={senha}
              onChange={setSenha}
              type="password"
              autoComplete="current-password"
            />
          </div>

          {erro && (
            <div
              className="mt-4 rounded-lg px-3 py-2 text-[12.5px]"
              style={{
                background: "rgba(159,18,57,0.18)",
                color: "#ffb4c2",
                border: "1px solid rgba(159,18,57,0.45)",
              }}
            >
              {erro}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !usuario || !senha}
            className="mt-5 w-full rounded-lg py-2.5 text-[13.5px] font-semibold text-white transition"
            style={{
              background: loading ? "rgba(30,66,132,0.6)" : "#1e4284",
              opacity: loading || !usuario || !senha ? 0.65 : 1,
              cursor: loading || !usuario || !senha ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Entrando…" : "Entrar"}
          </button>

          <div
            className="mt-5 pt-4 text-center text-[11px]"
            style={{
              color: "rgba(255,255,255,0.4)",
              borderTop: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            CRM • Calaza Doreto Advocacia · v0.1
          </div>
        </form>
      </div>
    </main>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  autoComplete,
  autoFocus,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  autoComplete?: string;
  autoFocus?: boolean;
}) {
  return (
    <label className="block">
      <div className="text-[11px] uppercase tracking-wider mb-1.5" style={{ color: "rgba(255,255,255,0.55)" }}>
        {label}
      </div>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        className="w-full rounded-lg px-3 py-2.5 text-[14px] text-white outline-none"
        style={{
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.14)",
        }}
      />
    </label>
  );
}
