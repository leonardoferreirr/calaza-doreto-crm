"use client";

import { useEffect, useState } from "react";

// Kanban de demonstração (dados mock). Próximo passo: ligar ao Supabase + arrastar card.
const COLUNAS = ["A emitir", "Enviada", "Vencida", "Em cobrança", "Pago"] as const;

type Cliente = {
  id: string;
  razao_social: string;
  nome_fantasia: string;
  cnpj: string;
  inscricao_municipal: string;
  segmento: string;
  telefone: string;
  telefone_fixo: string;
  email_financeiro: string;
  email_responsavel: string;
  responsavel_nome: string;
  responsavel_cargo: string;
  endereco: { logradouro: string; bairro: string; cidade: string; uf: string; cep: string };
  servico_descricao: string;
  cliente_desde: string;
  valor: string;
  venc: string;
  competencia: string;
  coluna: typeof COLUNAS[number];
  historico: { competencia: string; valor: string; status: string; pago_em?: string }[];
};

const MOCK: Cliente[] = [
  {
    id: "alfa",
    razao_social: "Alfa Tecnologia da Informação S/A",
    nome_fantasia: "Alfa TI",
    cnpj: "12.345.678/0001-90",
    inscricao_municipal: "38.471.205-7",
    segmento: "Software & SaaS",
    telefone: "(34) 99812-4470",
    telefone_fixo: "(34) 3236-8800",
    email_financeiro: "financeiro@alfati.com.br",
    email_responsavel: "ricardo.menezes@alfati.com.br",
    responsavel_nome: "Ricardo Menezes",
    responsavel_cargo: "Diretor Financeiro",
    endereco: { logradouro: "Av. Rondon Pacheco, 4.142, sala 1207", bairro: "Tibery", cidade: "Uberlândia", uf: "MG", cep: "38.405-142" },
    servico_descricao: "Assessoria jurídica empresarial — contratos de software, LGPD e propriedade intelectual",
    cliente_desde: "Mar/2024",
    valor: "R$ 8.500,00",
    venc: "10/07",
    competencia: "Jul/26",
    coluna: "A emitir",
    historico: [
      { competencia: "Jun/26", valor: "R$ 8.500,00", status: "Paga", pago_em: "08/06" },
      { competencia: "Mai/26", valor: "R$ 8.500,00", status: "Paga", pago_em: "10/05" },
      { competencia: "Abr/26", valor: "R$ 8.500,00", status: "Paga", pago_em: "12/04" },
    ],
  },
  {
    id: "beta",
    razao_social: "Beta Participações Holding Ltda",
    nome_fantasia: "Beta Holding",
    cnpj: "12.345.679/0001-71",
    inscricao_municipal: "38.502.118-3",
    segmento: "Holding patrimonial",
    telefone: "(34) 99751-2230",
    telefone_fixo: "(34) 3214-5519",
    email_financeiro: "financeiro@betaholding.com.br",
    email_responsavel: "patricia.guimaraes@betaholding.com.br",
    responsavel_nome: "Patrícia Guimarães",
    responsavel_cargo: "Sócia administradora",
    endereco: { logradouro: "Av. Floriano Peixoto, 1.875, 8º andar", bairro: "Centro", cidade: "Uberlândia", uf: "MG", cep: "38.400-103" },
    servico_descricao: "Reorganização societária, planejamento sucessório e governança familiar",
    cliente_desde: "Set/2022",
    valor: "R$ 12.000,00",
    venc: "10/07",
    competencia: "Jul/26",
    coluna: "A emitir",
    historico: [
      { competencia: "Jun/26", valor: "R$ 12.000,00", status: "Paga", pago_em: "10/06" },
      { competencia: "Mai/26", valor: "R$ 12.000,00", status: "Paga", pago_em: "10/05" },
    ],
  },
  {
    id: "gama",
    razao_social: "Gama Indústria e Comércio Ltda",
    nome_fantasia: "Gama Metais",
    cnpj: "12.345.680/0001-15",
    inscricao_municipal: "38.671.443-9",
    segmento: "Indústria metalúrgica",
    telefone: "(34) 99403-1180",
    telefone_fixo: "(34) 3268-7700",
    email_financeiro: "ap@gamametais.ind.br",
    email_responsavel: "carlos.tavares@gamametais.ind.br",
    responsavel_nome: "Carlos Tavares",
    responsavel_cargo: "Controller",
    endereco: { logradouro: "Rod. BR-365, km 626, galpão 4", bairro: "Distrito Industrial", cidade: "Uberlândia", uf: "MG", cep: "38.402-307" },
    servico_descricao: "Consultoria trabalhista e tributária recorrente — pareceres mensais e revisão de contratos",
    cliente_desde: "Jul/2023",
    valor: "R$ 6.400,00",
    venc: "10/07",
    competencia: "Jul/26",
    coluna: "A emitir",
    historico: [
      { competencia: "Jun/26", valor: "R$ 6.400,00", status: "Paga", pago_em: "11/06" },
      { competencia: "Mai/26", valor: "R$ 6.400,00", status: "Paga", pago_em: "13/05" },
    ],
  },
  {
    id: "delta",
    razao_social: "Delta Logística Express S/A",
    nome_fantasia: "Delta Express",
    cnpj: "12.345.681/0001-95",
    inscricao_municipal: "38.704.992-2",
    segmento: "Logística & transporte",
    telefone: "(34) 99685-7700",
    telefone_fixo: "(34) 3219-4400",
    email_financeiro: "contasapagar@deltaexpress.com.br",
    email_responsavel: "fernanda.alencar@deltaexpress.com.br",
    responsavel_nome: "Fernanda Alencar",
    responsavel_cargo: "Gerente Administrativo-Financeira",
    endereco: { logradouro: "Av. João Naves de Ávila, 2.121, 14º andar", bairro: "Saraiva", cidade: "Uberlândia", uf: "MG", cep: "38.408-100" },
    servico_descricao: "Assessoria contratual com transportadoras parceiras + contencioso trabalhista preventivo",
    cliente_desde: "Fev/2024",
    valor: "R$ 9.800,00",
    venc: "10/06",
    competencia: "Jun/26",
    coluna: "Enviada",
    historico: [
      { competencia: "Mai/26", valor: "R$ 9.800,00", status: "Paga", pago_em: "10/05" },
      { competencia: "Abr/26", valor: "R$ 9.800,00", status: "Paga", pago_em: "10/04" },
    ],
  },
  {
    id: "theta",
    razao_social: "Theta Software House Ltda",
    nome_fantasia: "Theta Code",
    cnpj: "12.345.685/0001-19",
    inscricao_municipal: "38.812.554-6",
    segmento: "Desenvolvimento de sistemas",
    telefone: "(34) 99887-2210",
    telefone_fixo: "(34) 3232-1100",
    email_financeiro: "financeiro@thetacode.dev",
    email_responsavel: "leonardo.pessoa@thetacode.dev",
    responsavel_nome: "Leonardo Pessoa",
    responsavel_cargo: "CEO",
    endereco: { logradouro: "R. Bambuí, 980, sala 402", bairro: "Santa Mônica", cidade: "Uberlândia", uf: "MG", cep: "38.408-302" },
    servico_descricao: "Revisão de contratos com clientes e fornecedores + assessoria em propriedade intelectual",
    cliente_desde: "Jun/2025",
    valor: "R$ 7.100,00",
    venc: "10/06",
    competencia: "Jun/26",
    coluna: "Enviada",
    historico: [
      { competencia: "Mai/26", valor: "R$ 7.100,00", status: "Paga", pago_em: "09/05" },
    ],
  },
  {
    id: "epsilon",
    razao_social: "Épsilon Construções Ltda",
    nome_fantasia: "Épsilon Engenharia",
    cnpj: "12.345.682/0001-76",
    inscricao_municipal: "38.420.117-1",
    segmento: "Construção civil",
    telefone: "(34) 99312-8800",
    telefone_fixo: "(34) 3225-9900",
    email_financeiro: "ap@epsilonengenharia.com.br",
    email_responsavel: "roberto.castro@epsilonengenharia.com.br",
    responsavel_nome: "Roberto Castro",
    responsavel_cargo: "Diretor de Obras",
    endereco: { logradouro: "Av. Cesário Crosara, 3.450", bairro: "Segismundo Pereira", cidade: "Uberlândia", uf: "MG", cep: "38.408-216" },
    servico_descricao: "Contencioso cível + assessoria em licitações públicas",
    cliente_desde: "Out/2021",
    valor: "R$ 15.200,00",
    venc: "10/05",
    competencia: "Mai/26",
    coluna: "Vencida",
    historico: [
      { competencia: "Abr/26", valor: "R$ 15.200,00", status: "Paga", pago_em: "14/04" },
      { competencia: "Mar/26", valor: "R$ 15.200,00", status: "Paga", pago_em: "10/03" },
    ],
  },
  {
    id: "eta",
    razao_social: "Eta Comércio Atacadista Ltda",
    nome_fantasia: "Eta Atacado",
    cnpj: "12.345.684/0001-38",
    inscricao_municipal: "38.555.018-4",
    segmento: "Atacado",
    telefone: "(34) 99225-4470",
    telefone_fixo: "(34) 3211-7700",
    email_financeiro: "ap@etaatacado.com.br",
    email_responsavel: "marina.lobato@etaatacado.com.br",
    responsavel_nome: "Marina Lobato",
    responsavel_cargo: "Gerente Financeira",
    endereco: { logradouro: "R. Tenente Virmondes, 412", bairro: "Centro", cidade: "Uberlândia", uf: "MG", cep: "38.400-258" },
    servico_descricao: "Assessoria tributária permanente + contencioso fiscal",
    cliente_desde: "Jan/2024",
    valor: "R$ 5.700,00",
    venc: "10/05",
    competencia: "Mai/26",
    coluna: "Vencida",
    historico: [
      { competencia: "Abr/26", valor: "R$ 5.700,00", status: "Paga", pago_em: "11/04" },
    ],
  },
  {
    id: "zeta",
    razao_social: "Zeta Serviços Médicos S/S",
    nome_fantasia: "Clínica Zeta",
    cnpj: "12.345.683/0001-57",
    inscricao_municipal: "38.617.029-5",
    segmento: "Clínica médica",
    telefone: "(34) 99584-3320",
    telefone_fixo: "(34) 3258-0011",
    email_financeiro: "financeiro@clinicazeta.com.br",
    email_responsavel: "dra.juliana.barros@clinicazeta.com.br",
    responsavel_nome: "Dra. Juliana Barros",
    responsavel_cargo: "Sócia diretora",
    endereco: { logradouro: "Av. Belarmino Cotta Pacheco, 715, sala 1302", bairro: "Saraiva", cidade: "Uberlândia", uf: "MG", cep: "38.408-114" },
    servico_descricao: "Compliance de planos de saúde + assessoria em LGPD aplicada à saúde",
    cliente_desde: "Nov/2022",
    valor: "R$ 4.300,00",
    venc: "10/04",
    competencia: "Abr/26",
    coluna: "Em cobrança",
    historico: [
      { competencia: "Mar/26", valor: "R$ 4.300,00", status: "Paga", pago_em: "12/03" },
      { competencia: "Fev/26", valor: "R$ 4.300,00", status: "Paga", pago_em: "10/02" },
    ],
  },
  {
    id: "iota",
    razao_social: "Iota Engenharia e Projetos Ltda",
    nome_fantasia: "Iota Projetos",
    cnpj: "12.345.686/0001-00",
    inscricao_municipal: "38.402.219-8",
    segmento: "Engenharia consultiva",
    telefone: "(34) 99732-5060",
    telefone_fixo: "(34) 3257-2240",
    email_financeiro: "financeiro@iotaprojetos.com.br",
    email_responsavel: "andre.galvao@iotaprojetos.com.br",
    responsavel_nome: "André Galvão",
    responsavel_cargo: "Sócio diretor",
    endereco: { logradouro: "R. Mato Grosso, 1.610, 5º andar", bairro: "Umuarama", cidade: "Uberlândia", uf: "MG", cep: "38.405-368" },
    servico_descricao: "Estruturação de SPEs para projetos de infraestrutura",
    cliente_desde: "Ago/2023",
    valor: "R$ 11.500,00",
    venc: "10/06",
    competencia: "Jun/26",
    coluna: "Pago",
    historico: [
      { competencia: "Mai/26", valor: "R$ 11.500,00", status: "Paga", pago_em: "10/05" },
    ],
  },
  {
    id: "kappa",
    razao_social: "Kappa Comunicação Visual Ltda",
    nome_fantasia: "Kappa Mídia",
    cnpj: "12.345.687/0001-83",
    inscricao_municipal: "38.741.207-2",
    segmento: "Mídia & publicidade",
    telefone: "(34) 99411-6680",
    telefone_fixo: "(34) 3229-1170",
    email_financeiro: "ap@kappamidia.com.br",
    email_responsavel: "vitor.queiroz@kappamidia.com.br",
    responsavel_nome: "Vitor Queiroz",
    responsavel_cargo: "Diretor de Operações",
    endereco: { logradouro: "Av. dos Vinhedos, 980", bairro: "Patrimônio", cidade: "Uberlândia", uf: "MG", cep: "38.411-156" },
    servico_descricao: "Direito autoral, marcas e contratos com creators",
    cliente_desde: "Mai/2024",
    valor: "R$ 3.900,00",
    venc: "10/06",
    competencia: "Jun/26",
    coluna: "Pago",
    historico: [
      { competencia: "Mai/26", valor: "R$ 3.900,00", status: "Paga", pago_em: "11/05" },
    ],
  },
  {
    id: "lambda",
    razao_social: "Lambda Distribuidora Ltda",
    nome_fantasia: "Lambda Distrib",
    cnpj: "12.345.688/0001-64",
    inscricao_municipal: "38.318.660-9",
    segmento: "Distribuição",
    telefone: "(34) 99558-3320",
    telefone_fixo: "(34) 3247-1880",
    email_financeiro: "financeiro@lambdadistrib.com.br",
    email_responsavel: "renata.coelho@lambdadistrib.com.br",
    responsavel_nome: "Renata Coelho",
    responsavel_cargo: "Diretora Administrativa",
    endereco: { logradouro: "Av. Pará, 2.770", bairro: "Brasil", cidade: "Uberlândia", uf: "MG", cep: "38.405-321" },
    servico_descricao: "Recuperação de crédito + ações cíveis contra inadimplentes",
    cliente_desde: "Jul/2023",
    valor: "R$ 6.850,00",
    venc: "10/06",
    competencia: "Jun/26",
    coluna: "Pago",
    historico: [
      { competencia: "Mai/26", valor: "R$ 6.850,00", status: "Paga", pago_em: "10/05" },
    ],
  },
];

function corColuna(col: string) {
  if (col === "Pago") return "#1e7a3a";
  if (col === "Vencida") return "#b54708";
  if (col === "Em cobrança") return "#9f1239";
  return "var(--brand)";
}

function totalCol(col: string) {
  const itens = MOCK.filter((c) => c.coluna === col);
  const soma = itens.reduce(
    (acc, c) => acc + parseFloat(c.valor.replace(/[^\d,]/g, "").replace(",", ".")),
    0
  );
  return {
    count: itens.length,
    soma: soma.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }),
  };
}

export default function KanbanBoard() {
  const [selected, setSelected] = useState<Cliente | null>(null);

  // ESC fecha
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
          const t = totalCol(col);
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
                  {t.count} · {t.soma}
                </span>
              </div>
              <div className="p-2 space-y-2 min-h-32">
                {MOCK.filter((c) => c.coluna === col).map((c) => (
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

function ClienteDrawer({ cliente: c, onClose }: { cliente: Cliente; onClose: () => void }) {
  return (
    <>
      {/* overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-40"
        style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(2px)" }}
      />
      {/* drawer */}
      <aside
        className="fixed top-0 right-0 z-50 h-full w-full max-w-[520px] shadow-2xl overflow-y-auto"
        style={{
          background: "var(--surface)",
          color: "var(--text)",
          animation: "slideIn .28s ease-out",
        }}
      >
        <style>{`@keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }`}</style>

        {/* Header */}
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

          {/* Ações */}
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

function ChipStatus({ coluna }: { coluna: string }) {
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
