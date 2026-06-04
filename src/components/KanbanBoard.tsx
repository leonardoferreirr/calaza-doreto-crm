"use client";

// Kanban de demonstração (dados mock).
// No próximo passo: ligar ao Supabase e habilitar arrastar card -> "Pago" (baixa manual).
const COLUNAS = ["A emitir", "Enviada", "Vencida", "Em cobrança", "Pago"] as const;

type Card = {
  cliente: string;
  cnpj: string;
  segmento: string;
  valor: string;
  venc: string;
  competencia: string;
  coluna: typeof COLUNAS[number];
};

const MOCK: Card[] = [
  // A emitir
  { cliente: "Alfa Tecnologia da Informação S/A", cnpj: "12.345.678/0001-90", segmento: "Software & SaaS", valor: "R$ 8.500,00", venc: "10/07", competencia: "Jul/26", coluna: "A emitir" },
  { cliente: "Beta Participações Holding Ltda", cnpj: "12.345.679/0001-71", segmento: "Holding patrimonial", valor: "R$ 12.000,00", venc: "10/07", competencia: "Jul/26", coluna: "A emitir" },
  { cliente: "Gama Indústria e Comércio Ltda", cnpj: "12.345.680/0001-15", segmento: "Indústria metalúrgica", valor: "R$ 6.400,00", venc: "10/07", competencia: "Jul/26", coluna: "A emitir" },

  // Enviada
  { cliente: "Delta Logística Express S/A", cnpj: "12.345.681/0001-95", segmento: "Logística & transporte", valor: "R$ 9.800,00", venc: "10/06", competencia: "Jun/26", coluna: "Enviada" },
  { cliente: "Theta Software House Ltda", cnpj: "12.345.685/0001-19", segmento: "Desenvolvimento de sistemas", valor: "R$ 7.100,00", venc: "10/06", competencia: "Jun/26", coluna: "Enviada" },

  // Vencida
  { cliente: "Épsilon Construções Ltda", cnpj: "12.345.682/0001-76", segmento: "Construção civil", valor: "R$ 15.200,00", venc: "10/05", competencia: "Mai/26", coluna: "Vencida" },
  { cliente: "Eta Comércio Atacadista Ltda", cnpj: "12.345.684/0001-38", segmento: "Atacado", valor: "R$ 5.700,00", venc: "10/05", competencia: "Mai/26", coluna: "Vencida" },

  // Em cobrança
  { cliente: "Zeta Serviços Médicos S/S", cnpj: "12.345.683/0001-57", segmento: "Clínica médica", valor: "R$ 4.300,00", venc: "10/04", competencia: "Abr/26", coluna: "Em cobrança" },

  // Pago
  { cliente: "Iota Engenharia e Projetos Ltda", cnpj: "12.345.686/0001-00", segmento: "Engenharia consultiva", valor: "R$ 11.500,00", venc: "10/06", competencia: "Jun/26", coluna: "Pago" },
  { cliente: "Kappa Comunicação Visual Ltda", cnpj: "12.345.687/0001-83", segmento: "Mídia & publicidade", valor: "R$ 3.900,00", venc: "10/06", competencia: "Jun/26", coluna: "Pago" },
  { cliente: "Lambda Distribuidora Ltda", cnpj: "12.345.688/0001-64", segmento: "Distribuição", valor: "R$ 6.850,00", venc: "10/06", competencia: "Jun/26", coluna: "Pago" },
];

function corColuna(col: string) {
  if (col === "Pago") return "#1e7a3a";
  if (col === "Vencida") return "#b54708";
  if (col === "Em cobrança") return "#9f1239";
  return "var(--brand)";
}

function totalCol(col: string) {
  const itens = MOCK.filter((c) => c.coluna === col);
  const soma = itens.reduce((acc, c) => acc + parseFloat(c.valor.replace(/[^\d,]/g, "").replace(",", ".")), 0);
  return { count: itens.length, soma: soma.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) };
}

export default function KanbanBoard() {
  return (
    <div className="grid grid-cols-5 gap-3 p-6">
      {COLUNAS.map((col) => {
        const t = totalCol(col);
        return (
          <div key={col} className="rounded-xl bg-white shadow-sm border border-black/5">
            <div
              className="px-3 py-2.5 text-xs font-semibold uppercase tracking-wide text-white rounded-t-xl flex items-center justify-between"
              style={{ background: corColuna(col) }}
            >
              <span>{col}</span>
              <span className="text-[10px] font-medium opacity-90">{t.count} · {t.soma}</span>
            </div>
            <div className="p-2 space-y-2 min-h-32">
              {MOCK.filter((c) => c.coluna === col).map((c) => (
                <div key={c.cnpj} className="rounded-lg border border-black/5 hover:border-black/15 transition p-3 text-sm bg-white cursor-grab">
                  <div className="font-medium text-ink leading-tight">{c.cliente}</div>
                  <div className="text-[11px] text-black/55 mt-0.5 font-mono">{c.cnpj}</div>
                  <div className="text-[11px] text-black/50 mt-0.5 italic">{c.segmento}</div>
                  <div className="mt-2 flex items-center justify-between text-[12px]">
                    <span className="font-semibold" style={{ color: "var(--brand)" }}>{c.valor}</span>
                    <span className="text-black/55">vence {c.venc}</span>
                  </div>
                  <div className="text-[10px] text-black/40 mt-1 uppercase tracking-wide">competência {c.competencia}</div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
