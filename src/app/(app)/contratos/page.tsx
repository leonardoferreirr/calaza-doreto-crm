import { CLIENTES, CONTRATOS, fmtBRL } from "@/lib/mock";

export default function ContratosPage() {
  const total = CONTRATOS.reduce((a, c) => a + c.valor_num, 0);

  return (
    <div className="px-6 py-6">
      <header className="flex items-center justify-between gap-3 flex-wrap mb-5">
        <div>
          <h1 className="text-xl font-semibold">Contratos</h1>
          <p className="text-[13px] mt-0.5" style={{ color: "var(--text-soft)" }}>
            Contratos vigentes que geram cobrança mensal automática.
          </p>
        </div>
        <button
          className="rounded-lg px-4 py-2 text-[13px] font-semibold text-white"
          style={{ background: "var(--brand)" }}
        >
          + Novo contrato
        </button>
      </header>

      {/* Totalizadores */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        <Card label="Contratos vigentes" value={String(CONTRATOS.filter((c) => c.status === "Vigente").length)} />
        <Card label="Receita recorrente" value={fmtBRL(total)} accent="var(--brand)" />
        <Card label="Ticket médio" value={fmtBRL(total / CONTRATOS.length)} />
      </div>

      <div
        className="rounded-xl border overflow-hidden"
        style={{ background: "var(--surface)", borderColor: "var(--border)" }}
      >
        <table className="w-full text-[13px]">
          <thead>
            <tr style={{ background: "var(--bg)" }}>
              <Th>Nº contrato</Th>
              <Th>Cliente</Th>
              <Th>Tipo</Th>
              <Th>Escopo</Th>
              <Th>Mensalidade</Th>
              <Th>Vencimento</Th>
              <Th>Vigência</Th>
              <Th>Status</Th>
            </tr>
          </thead>
          <tbody>
            {CONTRATOS.map((ct) => {
              const cli = CLIENTES.find((c) => c.id === ct.cliente_id)!;
              return (
                <tr key={ct.id} style={{ borderTop: "1px solid var(--border)" }} className="hover:bg-[var(--bg)] transition">
                  <td className="px-4 py-3 font-mono text-[12px]" style={{ color: "var(--text-soft)" }}>
                    {ct.numero}
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium">{cli.razao_social}</div>
                    <div className="text-[11.5px] font-mono" style={{ color: "var(--text-muted)" }}>
                      {cli.cnpj}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <TipoChip tipo={ct.tipo} />
                  </td>
                  <td className="px-4 py-3 max-w-md" style={{ color: "var(--text-soft)" }}>
                    <div className="truncate" title={ct.escopo}>
                      {ct.escopo}
                    </div>
                  </td>
                  <td className="px-4 py-3 font-semibold" style={{ color: "var(--brand)" }}>
                    {fmtBRL(ct.valor_num)}
                  </td>
                  <td className="px-4 py-3" style={{ color: "var(--text-soft)" }}>
                    Todo dia {ct.dia_venc}
                  </td>
                  <td className="px-4 py-3 text-[12.5px]">
                    <div>desde {ct.inicio}</div>
                    <div className="text-[11px]" style={{ color: "var(--text-muted)" }}>
                      {ct.fim ? `até ${ct.fim}` : "sem prazo"}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <StatusChip status={ct.status} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
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

function Card({ label, value, accent }: { label: string; value: string; accent?: string }) {
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
    </div>
  );
}

function TipoChip({ tipo }: { tipo: string }) {
  const cor = tipo === "Contencioso" ? "#9f1239" : tipo === "Pontual" ? "#b54708" : "var(--brand)";
  return (
    <span
      className="text-[11px] font-semibold uppercase tracking-wide rounded px-2 py-0.5"
      style={{ background: `${cor}1a`, color: cor }}
    >
      {tipo}
    </span>
  );
}

function StatusChip({ status }: { status: string }) {
  const map: Record<string, { bg: string; fg: string }> = {
    Vigente: { bg: "rgba(30,122,58,0.12)", fg: "#1e7a3a" },
    Encerrado: { bg: "rgba(100,100,100,0.12)", fg: "var(--text-muted)" },
    Suspenso: { bg: "rgba(181,71,8,0.12)", fg: "#b54708" },
  };
  const m = map[status] ?? map.Vigente;
  return (
    <span
      className="text-[11px] font-semibold uppercase tracking-wide rounded px-2 py-0.5"
      style={{ background: m.bg, color: m.fg }}
    >
      {status}
    </span>
  );
}
