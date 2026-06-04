import Link from "next/link";
import {
  CLIENTES,
  NOTAS_FISCAIS,
  clientesPorColuna,
  fmtBRL,
  metricas,
} from "@/lib/mock";

export default function DashboardPage() {
  const m = metricas();
  const proximos = [...clientesPorColuna("A emitir"), ...clientesPorColuna("Enviada")]
    .sort((a, b) => a.venc.localeCompare(b.venc))
    .slice(0, 5);

  const precisaDeVoce = [
    ...NOTAS_FISCAIS.filter((n) => n.status === "Rejeitada").map((n) => ({
      tipo: "NFS-e rejeitada" as const,
      cor: "#b54708",
      titulo: `NF ${n.numero} · ${n.cliente_nome}`,
      sub: n.motivo_rejeicao ?? "Verificar SEFAZ municipal",
      href: "/notas-fiscais",
    })),
    ...CLIENTES.filter((c) => c.coluna === "Vencida" || c.coluna === "Em cobrança").map((c) => ({
      tipo: c.coluna === "Em cobrança" ? ("Em cobrança há > 30d" as const) : ("Vencida" as const),
      cor: c.coluna === "Em cobrança" ? "#9f1239" : "#b54708",
      titulo: c.razao_social,
      sub: `${c.valor} · venceu ${c.venc}`,
      href: "/cobrancas",
    })),
  ].slice(0, 6);

  return (
    <div className="px-6 py-6 space-y-6">
      <header>
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <p className="text-[13px] mt-0.5" style={{ color: "var(--text-soft)" }}>
          Visão executiva da operação de cobrança · Julho/2026
        </p>
      </header>

      {/* Cards de métricas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <Card
          label="Previsto · Jul/26"
          value={fmtBRL(m.previsto)}
          help={`${CLIENTES.length} cobranças no mês`}
        />
        <Card
          label="Recebido até hoje"
          value={fmtBRL(m.recebido)}
          help={`${m.previsto === 0 ? 0 : Math.round((m.recebido / m.previsto) * 100)}% da meta`}
          accent="#1e7a3a"
        />
        <Card
          label="Inadimplência"
          value={`${m.taxaInadimplencia.toFixed(1)}%`}
          help={`${fmtBRL(m.inadimplente)} em ${m.clientesInadimplentes} clientes`}
          accent="#b54708"
        />
        <Card
          label="MRR ativo"
          value={fmtBRL(m.mrr)}
          help={`${m.clientesAtivos} clientes ativos`}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Precisa de você */}
        <div
          className="lg:col-span-2 rounded-xl border"
          style={{ background: "var(--surface)", borderColor: "var(--border)" }}
        >
          <div className="px-5 py-3.5 border-b flex items-center justify-between" style={{ borderColor: "var(--border)" }}>
            <div>
              <h2 className="text-[13px] font-semibold uppercase tracking-wider" style={{ color: "var(--brand)" }}>
                Precisa de você
              </h2>
              <p className="text-[12px] mt-0.5" style={{ color: "var(--text-soft)" }}>
                Itens que travam o fluxo de cobrança automático.
              </p>
            </div>
            <span
              className="text-[11px] font-semibold rounded-full px-2.5 py-1"
              style={{ background: "rgba(159,18,57,0.10)", color: "#9f1239" }}
            >
              {precisaDeVoce.length} aberto{precisaDeVoce.length === 1 ? "" : "s"}
            </span>
          </div>
          <ul>
            {precisaDeVoce.length === 0 && (
              <li className="px-5 py-8 text-center text-[13px]" style={{ color: "var(--text-soft)" }}>
                Nada pendente. Boa hora pra fechar mais um cliente.
              </li>
            )}
            {precisaDeVoce.map((it, i) => (
              <li
                key={i}
                className="px-5 py-3 flex items-center gap-3 border-t hover:bg-[var(--bg)] transition"
                style={{ borderColor: "var(--border)" }}
              >
                <span
                  className="text-[10px] font-bold uppercase tracking-wider rounded px-2 py-1 text-white shrink-0"
                  style={{ background: it.cor }}
                >
                  {it.tipo}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-medium truncate">{it.titulo}</div>
                  <div className="text-[11.5px] truncate" style={{ color: "var(--text-soft)" }}>
                    {it.sub}
                  </div>
                </div>
                <Link
                  href={it.href}
                  className="text-[11.5px] font-semibold whitespace-nowrap"
                  style={{ color: "var(--brand)" }}
                >
                  Resolver →
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Próximos vencimentos */}
        <div
          className="rounded-xl border"
          style={{ background: "var(--surface)", borderColor: "var(--border)" }}
        >
          <div className="px-5 py-3.5 border-b" style={{ borderColor: "var(--border)" }}>
            <h2 className="text-[13px] font-semibold uppercase tracking-wider" style={{ color: "var(--brand)" }}>
              Próximos vencimentos
            </h2>
            <p className="text-[12px] mt-0.5" style={{ color: "var(--text-soft)" }}>
              Janela 7 dias.
            </p>
          </div>
          <ul>
            {proximos.map((c) => (
              <li
                key={c.id}
                className="px-5 py-3 flex items-center justify-between gap-3 border-t"
                style={{ borderColor: "var(--border)" }}
              >
                <div className="min-w-0">
                  <div className="text-[12.5px] font-medium truncate">{c.nome_fantasia}</div>
                  <div className="text-[11px]" style={{ color: "var(--text-muted)" }}>
                    {c.competencia} · {c.coluna}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-[12.5px] font-semibold" style={{ color: "var(--brand)" }}>
                    {c.valor}
                  </div>
                  <div className="text-[11px]" style={{ color: "var(--text-soft)" }}>
                    {c.venc}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Distribuição por status */}
      <div
        className="rounded-xl border p-5"
        style={{ background: "var(--surface)", borderColor: "var(--border)" }}
      >
        <h2 className="text-[13px] font-semibold uppercase tracking-wider mb-4" style={{ color: "var(--brand)" }}>
          Pipeline da competência
        </h2>
        <PipelineBar />
      </div>
    </div>
  );
}

function Card({
  label,
  value,
  help,
  accent,
}: {
  label: string;
  value: string;
  help: string;
  accent?: string;
}) {
  return (
    <div
      className="rounded-xl border px-5 py-4"
      style={{ background: "var(--surface)", borderColor: "var(--border)" }}
    >
      <div className="text-[11px] uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
        {label}
      </div>
      <div className="text-2xl font-semibold mt-1.5" style={{ color: accent ?? "var(--text)" }}>
        {value}
      </div>
      <div className="text-[12px] mt-1" style={{ color: "var(--text-soft)" }}>
        {help}
      </div>
    </div>
  );
}

function PipelineBar() {
  const cols = [
    { nome: "A emitir", cor: "var(--brand)" },
    { nome: "Enviada", cor: "#3a5fa8" },
    { nome: "Vencida", cor: "#b54708" },
    { nome: "Em cobrança", cor: "#9f1239" },
    { nome: "Pago", cor: "#1e7a3a" },
  ] as const;

  const total = CLIENTES.reduce((a, c) => a + c.valor_num, 0);
  const segs = cols.map((col) => {
    const itens = CLIENTES.filter((c) => c.coluna === col.nome);
    const soma = itens.reduce((a, c) => a + c.valor_num, 0);
    return { ...col, count: itens.length, soma, pct: total === 0 ? 0 : (soma / total) * 100 };
  });

  return (
    <div>
      <div className="flex w-full h-3 rounded-full overflow-hidden">
        {segs.map((s) => (
          <div
            key={s.nome}
            style={{ width: `${s.pct}%`, background: s.cor }}
            title={`${s.nome}: ${fmtBRL(s.soma)}`}
          />
        ))}
      </div>
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-5 gap-3">
        {segs.map((s) => (
          <div key={s.nome}>
            <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide" style={{ color: "var(--text-soft)" }}>
              <span className="inline-block w-2 h-2 rounded-full" style={{ background: s.cor }} />
              {s.nome}
            </div>
            <div className="text-[14px] font-semibold mt-1">{fmtBRL(s.soma)}</div>
            <div className="text-[11px]" style={{ color: "var(--text-muted)" }}>
              {s.count} cobrança{s.count === 1 ? "" : "s"} · {s.pct.toFixed(0)}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
