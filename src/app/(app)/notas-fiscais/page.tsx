"use client";

import { useMemo, useState } from "react";
import { NOTAS_FISCAIS, fmtBRL, type NF } from "@/lib/mock";

type Filtro = "todas" | "autorizadas" | "pendentes" | "rejeitadas" | "canceladas";

export default function NotasFiscaisPage() {
  const [filtro, setFiltro] = useState<Filtro>("todas");
  const [busca, setBusca] = useState("");

  const lista = useMemo(() => {
    let l = NOTAS_FISCAIS;
    if (filtro === "autorizadas") l = l.filter((n) => n.status === "Autorizada");
    if (filtro === "pendentes") l = l.filter((n) => n.status === "Pendente");
    if (filtro === "rejeitadas") l = l.filter((n) => n.status === "Rejeitada");
    if (filtro === "canceladas") l = l.filter((n) => n.status === "Cancelada");
    if (busca.trim()) {
      const q = busca.trim().toLowerCase();
      l = l.filter(
        (n) =>
          n.cliente_nome.toLowerCase().includes(q) ||
          n.numero.includes(q) ||
          n.competencia.toLowerCase().includes(q)
      );
    }
    return [...l].sort((a, b) => b.numero.localeCompare(a.numero));
  }, [filtro, busca]);

  const counts = {
    todas: NOTAS_FISCAIS.length,
    autorizadas: NOTAS_FISCAIS.filter((n) => n.status === "Autorizada").length,
    pendentes: NOTAS_FISCAIS.filter((n) => n.status === "Pendente").length,
    rejeitadas: NOTAS_FISCAIS.filter((n) => n.status === "Rejeitada").length,
    canceladas: NOTAS_FISCAIS.filter((n) => n.status === "Cancelada").length,
  };

  const totalAutorizada = NOTAS_FISCAIS
    .filter((n) => n.status === "Autorizada")
    .reduce((a, n) => a + n.valor_num, 0);

  return (
    <div className="px-6 py-6">
      <header className="flex items-center justify-between gap-3 flex-wrap mb-5">
        <div>
          <h1 className="text-xl font-semibold">Notas Fiscais</h1>
          <p className="text-[13px] mt-0.5" style={{ color: "var(--text-soft)" }}>
            NFS-e emitidas via Padrão Nacional (gov.br) · Uberlândia/MG.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            className="rounded-lg px-4 py-2 text-[13px] font-semibold border"
            style={{
              background: "var(--surface)",
              borderColor: "var(--border)",
              color: "var(--text)",
            }}
          >
            Exportar XML/PDF
          </button>
          <button
            className="rounded-lg px-4 py-2 text-[13px] font-semibold text-white"
            style={{ background: "var(--brand)" }}
          >
            + Emitir NFS-e
          </button>
        </div>
      </header>

      {/* Totalizadores */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        <Card label="Emitidas no histórico" value={String(counts.autorizadas)} />
        <Card label="Faturamento autorizado" value={fmtBRL(totalAutorizada)} accent="#1e7a3a" />
        <Card label="Rejeitadas" value={String(counts.rejeitadas)} accent="#b54708" />
        <Card label="Próxima emissão" value="10/07/2026" help="Conforme régua de cobrança" />
      </div>

      {/* Filtros + busca */}
      <div className="flex items-center justify-between gap-3 flex-wrap mb-4">
        <div className="flex gap-1.5 flex-wrap">
          {(
            [
              ["todas", "Todas"],
              ["autorizadas", "Autorizadas"],
              ["pendentes", "Pendentes"],
              ["rejeitadas", "Rejeitadas"],
              ["canceladas", "Canceladas"],
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
          placeholder="Buscar NF, cliente ou competência…"
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

      <div
        className="rounded-xl border overflow-hidden"
        style={{ background: "var(--surface)", borderColor: "var(--border)" }}
      >
        <table className="w-full text-[13px]">
          <thead>
            <tr style={{ background: "var(--bg)" }}>
              <Th>Nº</Th>
              <Th>Cliente</Th>
              <Th>Competência</Th>
              <Th>Emitida em</Th>
              <Th>Valor</Th>
              <Th>Status</Th>
              <Th>Ações</Th>
            </tr>
          </thead>
          <tbody>
            {lista.map((n) => (
              <NFRow key={n.id} n={n} />
            ))}
            {lista.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center text-[13px]" style={{ color: "var(--text-soft)" }}>
                  Nenhuma nota nesse filtro.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function NFRow({ n }: { n: NF }) {
  return (
    <>
      <tr style={{ borderTop: "1px solid var(--border)" }} className="hover:bg-[var(--bg)] transition">
        <td className="px-4 py-3 font-mono text-[12px]" style={{ color: "var(--text-soft)" }}>
          {n.numero}
        </td>
        <td className="px-4 py-3 font-medium">{n.cliente_nome}</td>
        <td className="px-4 py-3" style={{ color: "var(--text-soft)" }}>
          {n.competencia}
        </td>
        <td className="px-4 py-3" style={{ color: "var(--text-soft)" }}>
          {n.emitida_em}
        </td>
        <td className="px-4 py-3 font-semibold" style={{ color: "var(--brand)" }}>
          {n.valor}
        </td>
        <td className="px-4 py-3">
          <NFStatus s={n.status} />
        </td>
        <td className="px-4 py-3">
          <div className="flex gap-2 text-[11.5px] font-semibold">
            <button style={{ color: "var(--brand)" }}>PDF</button>
            <button style={{ color: "var(--brand)" }}>XML</button>
            {n.status === "Rejeitada" && (
              <button style={{ color: "#b54708" }}>Reemitir</button>
            )}
          </div>
        </td>
      </tr>
      {n.motivo_rejeicao && (
        <tr style={{ borderTop: "1px solid var(--border)", background: "rgba(181,71,8,0.04)" }}>
          <td colSpan={7} className="px-4 py-2 text-[12px]" style={{ color: "#b54708" }}>
            <strong>Motivo da rejeição:</strong> {n.motivo_rejeicao}
          </td>
        </tr>
      )}
    </>
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

function Card({ label, value, accent, help }: { label: string; value: string; accent?: string; help?: string }) {
  return (
    <div
      className="rounded-xl border px-5 py-4"
      style={{ background: "var(--surface)", borderColor: "var(--border)" }}
    >
      <div className="text-[11px] uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
        {label}
      </div>
      <div className="text-xl font-semibold mt-1.5" style={{ color: accent ?? "var(--text)" }}>
        {value}
      </div>
      {help && (
        <div className="text-[11.5px] mt-1" style={{ color: "var(--text-muted)" }}>
          {help}
        </div>
      )}
    </div>
  );
}

function NFStatus({ s }: { s: string }) {
  const map: Record<string, { bg: string; fg: string }> = {
    Autorizada: { bg: "rgba(30,122,58,0.12)", fg: "#1e7a3a" },
    Pendente: { bg: "rgba(30,66,132,0.12)", fg: "var(--brand)" },
    Rejeitada: { bg: "rgba(181,71,8,0.12)", fg: "#b54708" },
    Cancelada: { bg: "rgba(100,100,100,0.12)", fg: "var(--text-muted)" },
  };
  const m = map[s];
  return (
    <span
      className="text-[11px] font-semibold uppercase tracking-wide rounded px-2 py-0.5"
      style={{ background: m.bg, color: m.fg }}
    >
      {s}
    </span>
  );
}
