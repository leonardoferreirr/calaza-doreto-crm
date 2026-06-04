"use client";

import { useEffect, useState } from "react";
import { CLIENTES, COLUNAS, type Cliente, type Coluna, totalColuna } from "@/lib/mock";

function corColuna(col: string) {
  if (col === "Pago") return "#1e7a3a";
  if (col === "Vencida") return "#b54708";
  if (col === "Em cobrança") return "#9f1239";
  return "var(--brand)";
}

export default function KanbanBoard() {
  const [selected, setSelected] = useState<Cliente | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setSelected(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <div className="grid grid-cols-5 gap-3 p-6">
        {COLUNAS.map((col) => {
          const t = totalColuna(col);
          return (
            <div
              key={col}
              className="rounded-xl shadow-sm border"
              style={{ background: "var(--surface)", borderColor: "var(--border)" }}
            >
              <div
                className="px-3 py-2.5 text-xs font-semibold uppercase tracking-wide text-white rounded-t-xl flex items-center justify-between"
                style={{ background: corColuna(col) }}
              >
                <span>{col}</span>
                <span className="text-[10px] font-medium opacity-90">
                  {t.count} · {t.somaFmt}
                </span>
              </div>
              <div className="p-2 space-y-2 min-h-32">
                {CLIENTES.filter((c) => c.coluna === col).map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelected(c)}
                    className="w-full text-left rounded-lg border p-3 text-sm cursor-pointer hover:scale-[1.01] transition"
                    style={{
                      background: "var(--surface)",
                      borderColor: "var(--border)",
                      color: "var(--text)",
                    }}
                  >
                    <div className="font-medium leading-tight">{c.razao_social}</div>
                    <div className="text-[11px] mt-0.5 font-mono" style={{ color: "var(--text-soft)" }}>
                      {c.cnpj}
                    </div>
                    <div className="text-[11px] mt-0.5 italic" style={{ color: "var(--text-muted)" }}>
                      {c.segmento}
                    </div>
                    <div className="mt-2 flex items-center justify-between text-[12px]">
                      <span className="font-semibold" style={{ color: "var(--brand)" }}>
                        {c.valor}
                      </span>
                      <span style={{ color: "var(--text-soft)" }}>vence {c.venc}</span>
                    </div>
                    <div
                      className="text-[10px] mt-1 uppercase tracking-wide"
                      style={{ color: "var(--text-muted)" }}
                    >
                      competência {c.competencia}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {selected && <ClienteDrawer cliente={selected} onClose={() => setSelected(null)} />}
    </>
  );
}

export function ClienteDrawer({ cliente: c, onClose }: { cliente: Cliente; onClose: () => void }) {
  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 z-40"
        style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(2px)" }}
      />
      <aside
        className="fixed top-0 right-0 z-50 h-full w-full max-w-[520px] shadow-2xl overflow-y-auto"
        style={{
          background: "var(--surface)",
          color: "var(--text)",
          animation: "slideIn .28s ease-out",
        }}
      >
        <style>{`@keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }`}</style>

        <div
          className="px-6 py-5 sticky top-0 z-10 border-b"
          style={{ background: "var(--surface)", borderColor: "var(--border)" }}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="text-[11px] uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                {c.segmento} · cliente desde {c.cliente_desde}
              </div>
              <h2 className="text-lg font-semibold mt-1 leading-tight">{c.razao_social}</h2>
              <div className="text-sm mt-0.5" style={{ color: "var(--text-soft)" }}>
                {c.nome_fantasia}
              </div>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg w-9 h-9 grid place-items-center hover:opacity-70 flex-shrink-0"
              style={{ border: "1px solid var(--border)", color: "var(--text-soft)" }}
              aria-label="Fechar"
            >
              ✕
            </button>
          </div>
          <ChipStatus coluna={c.coluna} />
        </div>

        <div className="px-6 py-5 space-y-6">
          <Section title="Identificação">
            <Field label="Razão social" value={c.razao_social} />
            <Field label="Nome fantasia" value={c.nome_fantasia} />
            <Field label="CNPJ" value={c.cnpj} mono />
            <Field label="Inscrição municipal" value={c.inscricao_municipal} mono />
          </Section>

          <Section title="Contato">
            <Field label="Responsável" value={`${c.responsavel_nome} · ${c.responsavel_cargo}`} />
            <Field label="E-mail responsável" value={c.email_responsavel} />
            <Field label="E-mail financeiro (cobrança)" value={c.email_financeiro} />
            <Field label="Celular / WhatsApp" value={c.telefone} />
            <Field label="Telefone fixo" value={c.telefone_fixo} />
          </Section>

          <Section title="Endereço">
            <Field label="Logradouro" value={c.endereco.logradouro} />
            <div className="grid grid-cols-2 gap-3">
              <Field label="Bairro" value={c.endereco.bairro} />
              <Field label="CEP" value={c.endereco.cep} mono />
            </div>
            <Field label="Cidade / UF" value={`${c.endereco.cidade} / ${c.endereco.uf}`} />
          </Section>

          <Section title="Contrato ativo">
            <Field label="Serviço prestado (corpo da NF)" value={c.servico_descricao} />
            <div className="grid grid-cols-3 gap-3">
              <Field label="Valor mensal" value={c.valor} highlight />
              <Field label="Vencimento" value={`dia 10`} />
              <Field label="Competência" value={c.competencia} />
            </div>
          </Section>

          <Section title="Histórico de cobranças">
            <div className="rounded-lg overflow-hidden border" style={{ borderColor: "var(--border)" }}>
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ background: "var(--bg)" }}>
                    <th className="text-left px-3 py-2 text-[11px] uppercase tracking-wide font-semibold" style={{ color: "var(--text-soft)" }}>
                      Competência
                    </th>
                    <th className="text-left px-3 py-2 text-[11px] uppercase tracking-wide font-semibold" style={{ color: "var(--text-soft)" }}>
                      Valor
                    </th>
                    <th className="text-left px-3 py-2 text-[11px] uppercase tracking-wide font-semibold" style={{ color: "var(--text-soft)" }}>
                      Status
                    </th>
                    <th className="text-left px-3 py-2 text-[11px] uppercase tracking-wide font-semibold" style={{ color: "var(--text-soft)" }}>
                      Pago em
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {c.historico.map((h, i) => (
                    <tr key={i} style={{ borderTop: "1px solid var(--border)" }}>
                      <td className="px-3 py-2">{h.competencia}</td>
                      <td className="px-3 py-2 font-mono text-[13px]">{h.valor}</td>
                      <td className="px-3 py-2">
                        <span className="text-[11px] font-semibold uppercase tracking-wide rounded px-2 py-0.5"
                          style={{ background: "rgba(30,122,58,0.12)", color: "#1e7a3a" }}>
                          {h.status}
                        </span>
                      </td>
                      <td className="px-3 py-2" style={{ color: "var(--text-soft)" }}>{h.pago_em ?? "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          <div className="flex gap-2 pt-2">
            <button
              className="flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold text-white"
              style={{ background: "var(--brand)" }}
            >
              Reenviar NF + boleto
            </button>
            <button
              className="rounded-lg px-4 py-2.5 text-sm font-semibold"
              style={{ border: "1px solid var(--border)", color: "var(--text)" }}
            >
              Dar baixa manual
            </button>
          </div>
          <button
            className="w-full rounded-lg px-4 py-2.5 text-sm font-medium"
            style={{ border: "1px solid var(--border)", color: "var(--text-soft)" }}
          >
            Abrir conversa no WhatsApp
          </button>
        </div>
      </aside>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-2.5">
      <h3 className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: "var(--brand)" }}>
        {title}
      </h3>
      <div className="space-y-2">{children}</div>
    </section>
  );
}

function Field({ label, value, mono, highlight }: { label: string; value: string; mono?: boolean; highlight?: boolean }) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>
        {label}
      </div>
      <div
        className={`text-sm mt-0.5 ${mono ? "font-mono" : ""} ${highlight ? "font-semibold" : ""}`}
        style={{ color: highlight ? "var(--brand)" : "var(--text)" }}
      >
        {value}
      </div>
    </div>
  );
}

function ChipStatus({ coluna }: { coluna: Coluna }) {
  const cor =
    coluna === "Pago" ? "#1e7a3a" :
    coluna === "Vencida" ? "#b54708" :
    coluna === "Em cobrança" ? "#9f1239" :
    "var(--brand)";
  return (
    <span
      className="inline-block mt-3 text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full text-white"
      style={{ background: cor }}
    >
      {coluna}
    </span>
  );
}
