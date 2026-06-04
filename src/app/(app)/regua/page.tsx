"use client";

import { useState } from "react";
import { REGUA_PADRAO, type ReguaPasso } from "@/lib/mock";

export default function ReguaPage() {
  const [passos, setPassos] = useState<ReguaPasso[]>(REGUA_PADRAO);
  const [editando, setEditando] = useState<string | null>(null);

  function toggle(id: string) {
    setPassos((p) => p.map((x) => (x.id === id ? { ...x, ativo: !x.ativo } : x)));
  }

  return (
    <div className="px-6 py-6 max-w-5xl">
      <header className="mb-5">
        <h1 className="text-xl font-semibold">Régua de cobrança</h1>
        <p className="text-[13px] mt-0.5" style={{ color: "var(--text-soft)" }}>
          Sequência automática de comunicações a partir do vencimento da cobrança. Cada passo
          dispara no offset (em dias) configurado.
        </p>
      </header>

      {/* Timeline visual */}
      <div
        className="rounded-xl border p-5 mb-5"
        style={{ background: "var(--surface)", borderColor: "var(--border)" }}
      >
        <div className="text-[11px] font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--brand)" }}>
          Linha do tempo
        </div>
        <div className="relative">
          <div
            className="absolute left-0 right-0 top-1/2 h-px"
            style={{ background: "var(--border)" }}
          />
          <div className="relative grid grid-cols-5 gap-2">
            {passos.map((p) => (
              <div key={p.id} className="flex flex-col items-center text-center">
                <div
                  className="w-8 h-8 rounded-full grid place-items-center text-[11px] font-bold border-2 z-10"
                  style={{
                    background: p.ativo ? "var(--brand)" : "var(--surface)",
                    color: p.ativo ? "#fff" : "var(--text-muted)",
                    borderColor: p.ativo ? "var(--brand)" : "var(--border)",
                  }}
                >
                  {p.offset === 0 ? "D0" : p.offset > 0 ? `+${p.offset}` : p.offset}
                </div>
                <div className="text-[11px] mt-1.5 font-medium leading-tight">
                  {p.rotulo.split("·")[1]?.trim() ?? p.rotulo}
                </div>
                <div className="text-[10px] mt-0.5" style={{ color: "var(--text-muted)" }}>
                  {p.canal}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lista de passos editáveis */}
      <div className="space-y-3">
        {passos.map((p) => (
          <div
            key={p.id}
            className="rounded-xl border overflow-hidden"
            style={{ background: "var(--surface)", borderColor: "var(--border)" }}
          >
            <div className="px-5 py-3.5 flex items-center gap-3 border-b" style={{ borderColor: "var(--border)" }}>
              <div
                className="w-10 h-10 rounded-lg grid place-items-center text-[12px] font-bold shrink-0"
                style={{
                  background: p.ativo ? "var(--brand)" : "var(--bg)",
                  color: p.ativo ? "#fff" : "var(--text-muted)",
                }}
              >
                {p.offset === 0 ? "D0" : p.offset > 0 ? `+${p.offset}` : p.offset}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[14px] font-semibold">{p.rotulo}</div>
                <div className="text-[12px]" style={{ color: "var(--text-soft)" }}>
                  Canal: {p.canal} · {p.offset > 0 ? `${p.offset} dias após vencimento` : p.offset === 0 ? "no dia do vencimento" : `${Math.abs(p.offset)} dias antes`}
                </div>
              </div>
              <button
                onClick={() => setEditando(editando === p.id ? null : p.id)}
                className="text-[12px] font-semibold px-3 py-1.5 rounded border"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--text)",
                  background: "var(--surface)",
                }}
              >
                {editando === p.id ? "Fechar" : "Editar template"}
              </button>
              <Switch on={p.ativo} onChange={() => toggle(p.id)} />
            </div>

            {editando === p.id && (
              <div className="p-5 space-y-3" style={{ background: "var(--bg)" }}>
                <div>
                  <Label>Assunto do e-mail</Label>
                  <input
                    defaultValue={p.assunto}
                    className="w-full rounded-lg border px-3 py-2 text-[13px]"
                    style={{
                      background: "var(--surface)",
                      borderColor: "var(--border)",
                      color: "var(--text)",
                    }}
                  />
                </div>
                <div>
                  <Label>Corpo da mensagem</Label>
                  <textarea
                    defaultValue={p.corpo}
                    rows={8}
                    className="w-full rounded-lg border px-3 py-2 text-[13px] font-mono"
                    style={{
                      background: "var(--surface)",
                      borderColor: "var(--border)",
                      color: "var(--text)",
                    }}
                  />
                </div>
                <div className="text-[11.5px]" style={{ color: "var(--text-muted)" }}>
                  Variáveis disponíveis:{" "}
                  <code style={{ color: "var(--brand)" }}>
                    {"{responsavel}"} {"{competencia}"} {"{valor}"} {"{vencimento}"} {"{link_boleto}"} {"{data_envio}"} {"{dias_atraso}"} {"{prazo_final}"}
                  </code>
                </div>
                <div className="flex gap-2 pt-1">
                  <button
                    className="rounded-lg px-4 py-2 text-[13px] font-semibold text-white"
                    style={{ background: "var(--brand)" }}
                  >
                    Salvar template
                  </button>
                  <button
                    className="rounded-lg px-4 py-2 text-[13px] font-semibold border"
                    style={{
                      borderColor: "var(--border)",
                      color: "var(--text)",
                      background: "var(--surface)",
                    }}
                  >
                    Enviar teste
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div
        className="mt-5 rounded-xl border p-5"
        style={{ background: "var(--surface)", borderColor: "var(--border)" }}
      >
        <h3 className="text-[13px] font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--brand)" }}>
          Regras gerais
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-[12.5px]">
          <Toggle label="Parar ao receber pagamento" defaultChecked />
          <Toggle label="Parar se cliente responder" defaultChecked />
          <Toggle label="Pular fins de semana" defaultChecked />
          <Toggle label="Pular feriados nacionais" defaultChecked />
          <Toggle label="Suspender cliente após D+15" />
          <Toggle label="Notificar Bruno antes da escalada" defaultChecked />
        </div>
      </div>
    </div>
  );
}

function Switch({ on, onChange }: { on: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className="relative rounded-full transition shrink-0"
      style={{
        width: 38,
        height: 22,
        background: on ? "var(--brand)" : "var(--border)",
      }}
      aria-pressed={on}
    >
      <span
        className="absolute top-[2px] rounded-full bg-white shadow"
        style={{
          width: 18,
          height: 18,
          left: on ? 18 : 2,
          transition: "left .2s cubic-bezier(.34,1.56,.64,1)",
        }}
      />
    </button>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[11px] uppercase tracking-wide mb-1" style={{ color: "var(--text-muted)" }}>
      {children}
    </div>
  );
}

function Toggle({ label, defaultChecked }: { label: string; defaultChecked?: boolean }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input type="checkbox" defaultChecked={defaultChecked} className="accent-[var(--brand)] w-4 h-4" />
      <span>{label}</span>
    </label>
  );
}
