"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { metricas } from "@/lib/mock";
import LogoCalaza from "./LogoCalaza";

type Item = {
  href: string;
  label: string;
  icon: React.ReactNode;
  badge?: number;
  badgeTone?: "default" | "warn" | "danger";
};

// SVG icons inline (stroke 1.5, lucide-style)
const I = {
  dashboard: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/></svg>
  ),
  cobrancas: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18"/><path d="M7 15h3"/></svg>
  ),
  clientes: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/><circle cx="10" cy="7" r="4"/><path d="M21 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
  ),
  contratos: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M8 13h8"/><path d="M8 17h5"/></svg>
  ),
  nfs: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M16 2H8a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8l-3-6z"/><path d="M9 13h6"/><path d="M9 17h4"/><path d="M9 9h2"/></svg>
  ),
  regua: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M21 4H3a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1z"/><path d="M6 4v3"/><path d="M10 4v5"/><path d="M14 4v3"/><path d="M18 4v5"/></svg>
  ),
  config: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
  ),
  plus: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
  ),
};

function Badge({ n, tone = "default" }: { n: number; tone?: "default" | "warn" | "danger" }) {
  if (!n) return null;
  const bg = tone === "danger" ? "#9f1239" : tone === "warn" ? "#b54708" : "var(--brand)";
  return (
    <span
      className="ml-auto text-[10px] font-semibold leading-none rounded-full px-1.5 py-1 text-white min-w-[18px] text-center"
      style={{ background: bg }}
    >
      {n}
    </span>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const m = metricas();

  const principal: Item[] = [
    { href: "/dashboard", label: "Dashboard", icon: I.dashboard },
    { href: "/cobrancas", label: "Cobranças", icon: I.cobrancas, badge: m.clientesInadimplentes, badgeTone: "danger" },
    { href: "/clientes", label: "Clientes", icon: I.clientes },
    { href: "/contratos", label: "Contratos", icon: I.contratos },
    { href: "/notas-fiscais", label: "Notas Fiscais", icon: I.nfs, badge: m.nfsRejeitadas, badgeTone: "warn" },
  ];

  const automacao: Item[] = [
    { href: "/regua", label: "Régua", icon: I.regua },
  ];

  const sistema: Item[] = [
    { href: "/configuracoes", label: "Configurações", icon: I.config },
  ];

  function isActive(href: string) {
    if (href === "/dashboard") return pathname === "/dashboard" || pathname === "/";
    return pathname?.startsWith(href);
  }

  return (
    <aside
      className="hidden md:flex flex-col w-[232px] shrink-0 h-screen sticky top-0 border-r"
      style={{ background: "var(--surface)", borderColor: "var(--border)", color: "var(--text)" }}
    >
      {/* Logo do tenant — azul no light, branca no dark via .logo-calaza */}
      <div
        className="px-5 py-5 border-b flex items-center"
        style={{ borderColor: "var(--border)" }}
      >
        <LogoCalaza className="logo-calaza" height={32} />
      </div>

      {/* Botão primário: nova cobrança/cliente */}
      <div className="px-3 pt-3">
        <Link
          href="/clientes/novo"
          className="flex items-center justify-center gap-1.5 w-full rounded-lg px-3 py-2 text-[13px] font-semibold text-white hover:opacity-90 transition"
          style={{ background: "var(--brand)" }}
        >
          {I.plus} Novo cliente
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 pt-3 pb-4 text-[13px] space-y-4">
        <NavGroup items={principal} isActive={isActive} />
        <NavGroup label="Automação" items={automacao} isActive={isActive} />
        <NavGroup label="Sistema" items={sistema} isActive={isActive} />
      </nav>

      {/* User */}
      <div
        className="px-4 py-3 border-t flex items-center gap-3"
        style={{ borderColor: "var(--border)" }}
      >
        <div
          className="w-9 h-9 rounded-full grid place-items-center text-white font-semibold text-sm shrink-0"
          style={{ background: "#3a5fa8" }}
        >
          BD
        </div>
        <div className="min-w-0 leading-tight">
          <div className="text-[13px] font-medium truncate">Bruno Doreto</div>
          <div className="text-[11px] truncate" style={{ color: "var(--text-muted)" }}>
            Diretor operacional
          </div>
        </div>
      </div>
    </aside>
  );
}

function NavGroup({
  label,
  items,
  isActive,
}: {
  label?: string;
  items: Item[];
  isActive: (href: string) => boolean;
}) {
  return (
    <div className="space-y-0.5">
      {label && (
        <div
          className="px-3 pb-1.5 text-[10px] font-semibold uppercase tracking-wider"
          style={{ color: "var(--text-muted)" }}
        >
          {label}
        </div>
      )}
      {items.map((it) => {
        const active = isActive(it.href);
        return (
          <Link
            key={it.href}
            href={it.href}
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg transition"
            style={{
              background: active ? "var(--bg)" : "transparent",
              color: active ? "var(--brand)" : "var(--text)",
              fontWeight: active ? 600 : 500,
            }}
          >
            <span style={{ color: active ? "var(--brand)" : "var(--text-soft)" }}>{it.icon}</span>
            <span>{it.label}</span>
            {it.badge ? <Badge n={it.badge} tone={it.badgeTone} /> : null}
          </Link>
        );
      })}
    </div>
  );
}
