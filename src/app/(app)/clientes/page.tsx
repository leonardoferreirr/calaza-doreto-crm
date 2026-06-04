"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CLIENTES, type Cliente, fmtBRL } from "@/lib/mock";
import { ClienteDrawer } from "@/components/KanbanBoard";

type Filtro = "todos" | "ativos" | "inadimplentes" | "suspensos";

export default function ClientesPage() {
  const [filtro, setFiltro] = useState<Filtro>("todos");
  const [busca, setBusca] = useState("");
  const [selected, setSelected] = useState<Cliente | null>(null);

  const lista = useMemo(() => {
    let l = CLIENTES;
    if (filtro === "ativos") l = l.filter((c) => c.status_cliente === "ativo");
    if (filtro === "inadimplentes") l = l.filter((c) => c.status_cliente === "inadimplente");
    if (filtro === "suspensos") l = l.filter((c) => c.status_cliente === "suspenso");
    if (busca.trim()) {
      const q = busca.trim().toLowerCase();
      l = l.filter(
        (c) =>
          c.razao_social.toLowerCase().includes(q) ||
          c.nome_fantasia.toLowerCase().includes(q) ||
          c.cnpj.includes(q)
      );
    }
    return l;
  }, [filtro, busca]);

  const counts = {
    todos: CLIENTES.length,
    ativos: CLIENTES.filter((c) => c.status_cliente === "ativo").length,
    inadimplentes: CLIENTES.filter((c) => c.status_cliente === "inadimplente").length,
    suspensos: CLIENTES.filter((c) => c.status_cliente === "suspenso").length,
  };

  return (
    <div className="px-6 py-6">
      <header className="flex items-center justify-between gap-3 flex-wrap mb-5">
        <div>
          <h1 className="text-xl font-semibold">Clientes</h1>
          <p className="text-[13px] mt-0.5" style={{ color: "var(--text-soft)" }}>
            Base de clientes recorrentes do escritório.
          </p>
        </div>
        <Link
          href="/clientes/novo"
          className="rounded-lg px-4 py-2 text-[13px] font-semibold text-white"
          style={{ background: "var(--brand)" }}
        >
          + Novo cliente
        </Link>
      </header>

      {/* Filtros + busca */}
      <div className="flex items-center justify-between gap-3 flex-wrap mb-4">
        <div className="flex gap-1.5">
          {(
            [
              ["todos", "Todos"],
              ["ativos", "Ativos"],
              ["inadimplentes", "Inadimplentes"],
              ["suspensos", "Suspensos"],
            ] as const
          ).map(([key, lbl]) => (
            <button
              key={key}
              onClick={() => setFiltro(key)}
              className="rounded-lg px-3 py-1.5 text-[12.5px] font-medium border transition"
              style={{
                background: filtro === key ? "var(--brand)" : "var(--surface)",
                color: filtro === key ? "#fff" : "var(--text)",
                borderColor: filtro === key ? "var(--brand)" : "var(--border)",
              }}
            >
              {lbl}{" "}
              <span style={{ color: filtro === key ? "rgba(255,255,255,0.7)" : "var(--text-muted)" }}>
                · {counts[key]}
              </span>
            </button>
          ))}
        </div>
        <input
          type="search"
          placeholder="Buscar por razão social, fantasia ou CNPJ…"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="rounded-lg border px-3 py-2 text-[13px] w-72"
          style={{
            background: "var(--surface)",
            borderColor: "var(--border)",
            color: "var(--text)",
          }}
        />
      </div>

      {/* Tabela */}
      <div
        className="rounded-xl border overflow-hidden"
        style={{ background: "var(--surface)", borderColor: "var(--border)" }}
      >
        <table className="w-full text-[13px]">
          <thead>
            <tr style={{ background: "var(--bg)" }}>
              <Th>Cliente</Th>
              <Th>CNPJ</Th>
              <Th>Segmento</Th>
              <Th>Responsável</Th>
              <Th>Mensalidade</Th>
              <Th>Status</Th>
              <Th>Cliente desde</Th>
            </tr>
          </thead>
          <tbody>
            {lista.map((c) => (
              <tr
                key={c.id}
                onClick={() => setSelected(c)}
                className="cursor-pointer hover:bg-[var(--bg)] transition"
                style={{ borderTop: "1px solid var(--border)" }}
              >
                <td className="px-4 py-3">
                  <div className="font-medium">{c.razao_social}</div>
                  <div className="text-[11.5px]" style={{ color: "var(--text-muted)" }}>
                    {c.nome_fantasia}
                  </div>
                </td>
                <td className="px-4 py-3 font-mono text-[12px]" style={{ color: "var(--text-soft)" }}>
                  {c.cnpj}
                </td>
                <td className="px-4 py-3" style={{ color: "var(--text-soft)" }}>
                  {c.segmento}
                </td>
                <td className="px-4 py-3">
                  <div>{c.responsavel_nome}</div>
                  <div className="text-[11.5px]" style={{ color: "var(--text-muted)" }}>
                    {c.responsavel_cargo}
                  </div>
                </td>
                <td className="px-4 py-3 font-semibold" style={{ color: "var(--brand)" }}>
                  {fmtBRL(c.valor_num)}
                </td>
                <td className="px-4 py-3">
                  <StatusChip s={c.status_cliente} />
                </td>
                <td className="px-4 py-3" style={{ color: "var(--text-soft)" }}>
                  {c.cliente_desde}
                </td>
              </tr>
            ))}
            {lista.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center text-[13px]" style={{ color: "var(--text-soft)" }}>
                  Nenhum cliente nesse filtro.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-3 text-[12px]" style={{ color: "var(--text-muted)" }}>
        Mostrando {lista.length} de {CLIENTES.length} clientes · Total mensal:{" "}
        <strong style={{ color: "var(--text)" }}>
          {fmtBRL(lista.reduce((a, c) => a + c.valor_num, 0))}
        </strong>
      </div>

      {selected && <ClienteDrawer cliente={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th
      className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-wider"
      style={{ color: "var(--text-soft)" }}
    >
      {children}
    </th>
  );
}

function StatusChip({ s }: { s: "ativo" | "inadimplente" | "suspenso" }) {
  const map = {
    ativo: { bg: "rgba(30,122,58,0.12)", fg: "#1e7a3a", txt: "Ativo" },
    inadimplente: { bg: "rgba(181,71,8,0.12)", fg: "#b54708", txt: "Inadimplente" },
    suspenso: { bg: "rgba(100,100,100,0.12)", fg: "var(--text-muted)", txt: "Suspenso" },
  } as const;
  const m = map[s];
  return (
    <span
      className="text-[11px] font-semibold uppercase tracking-wide rounded px-2 py-0.5"
      style={{ background: m.bg, color: m.fg }}
    >
      {m.txt}
    </span>
  );
}
