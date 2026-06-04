// Dados mock compartilhados entre todas as telas do CRM (Dashboard,
// Cobranças, Clientes, Contratos, Notas Fiscais, etc.).
// Quando partir pra produção, substituir por queries Supabase server-side.

export const COLUNAS = ["A emitir", "Enviada", "Vencida", "Em cobrança", "Pago"] as const;
export type Coluna = typeof COLUNAS[number];

export type Cliente = {
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
  valor_num: number;
  venc: string;
  competencia: string;
  coluna: Coluna;
  status_cliente: "ativo" | "inadimplente" | "suspenso";
  historico: { competencia: string; valor: string; status: string; pago_em?: string }[];
};

export const CLIENTES: Cliente[] = [
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
    valor_num: 8500,
    venc: "10/07",
    competencia: "Jul/26",
    coluna: "A emitir",
    status_cliente: "ativo",
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
    valor_num: 12000,
    venc: "10/07",
    competencia: "Jul/26",
    coluna: "A emitir",
    status_cliente: "ativo",
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
    valor_num: 6400,
    venc: "10/07",
    competencia: "Jul/26",
    coluna: "A emitir",
    status_cliente: "ativo",
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
    valor_num: 9800,
    venc: "10/06",
    competencia: "Jun/26",
    coluna: "Enviada",
    status_cliente: "ativo",
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
    valor_num: 7100,
    venc: "10/06",
    competencia: "Jun/26",
    coluna: "Enviada",
    status_cliente: "ativo",
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
    valor_num: 15200,
    venc: "10/05",
    competencia: "Mai/26",
    coluna: "Vencida",
    status_cliente: "inadimplente",
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
    valor_num: 5700,
    venc: "10/05",
    competencia: "Mai/26",
    coluna: "Vencida",
    status_cliente: "inadimplente",
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
    valor_num: 4300,
    venc: "10/04",
    competencia: "Abr/26",
    coluna: "Em cobrança",
    status_cliente: "inadimplente",
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
    valor_num: 11500,
    venc: "10/06",
    competencia: "Jun/26",
    coluna: "Pago",
    status_cliente: "ativo",
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
    valor_num: 3900,
    venc: "10/06",
    competencia: "Jun/26",
    coluna: "Pago",
    status_cliente: "ativo",
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
    valor_num: 6850,
    venc: "10/06",
    competencia: "Jun/26",
    coluna: "Pago",
    status_cliente: "ativo",
    historico: [
      { competencia: "Mai/26", valor: "R$ 6.850,00", status: "Paga", pago_em: "10/05" },
    ],
  },
];

// ─── Contratos ────────────────────────────────────────────────────────────────
export type Contrato = {
  id: string;
  cliente_id: string;
  numero: string;
  tipo: "Honorários recorrentes" | "Contencioso" | "Pontual";
  escopo: string;
  valor: string;
  valor_num: number;
  dia_venc: number;
  inicio: string;
  fim: string | null;
  status: "Vigente" | "Encerrado" | "Suspenso";
};

export const CONTRATOS: Contrato[] = CLIENTES.map((c, i) => ({
  id: `CT-${String(2024100 + i).padStart(7, "0")}`,
  cliente_id: c.id,
  numero: `${2024000 + i}/24`,
  tipo: c.id === "epsilon" ? "Contencioso" : "Honorários recorrentes",
  escopo: c.servico_descricao,
  valor: c.valor,
  valor_num: c.valor_num,
  dia_venc: 10,
  inicio: c.cliente_desde,
  fim: null,
  status: c.status_cliente === "suspenso" ? "Suspenso" : "Vigente",
}));

// ─── Notas Fiscais ────────────────────────────────────────────────────────────
export type NF = {
  id: string;
  numero: string;
  cliente_id: string;
  cliente_nome: string;
  competencia: string;
  emitida_em: string;
  valor: string;
  valor_num: number;
  status: "Autorizada" | "Pendente" | "Rejeitada" | "Cancelada";
  motivo_rejeicao?: string;
};

let nfSeq = 1247;
const nfsHistorico: NF[] = CLIENTES.flatMap((c) =>
  c.historico.map((h) => ({
    id: `nf-${c.id}-${h.competencia.replace("/", "")}`,
    numero: String(nfSeq++).padStart(6, "0"),
    cliente_id: c.id,
    cliente_nome: c.razao_social,
    competencia: h.competencia,
    emitida_em: h.competencia === "Jun/26" ? "10/06/2026" : h.competencia === "Mai/26" ? "10/05/2026" : h.competencia === "Abr/26" ? "10/04/2026" : h.competencia === "Mar/26" ? "10/03/2026" : "10/02/2026",
    valor: h.valor,
    valor_num: parseFloat(h.valor.replace(/[^\d,]/g, "").replace(",", ".")),
    status: "Autorizada",
  }))
);

const nfsExtras: NF[] = [
  {
    id: "nf-delta-jun26",
    numero: String(nfSeq++).padStart(6, "0"),
    cliente_id: "delta",
    cliente_nome: "Delta Logística Express S/A",
    competencia: "Jun/26",
    emitida_em: "10/06/2026",
    valor: "R$ 9.800,00",
    valor_num: 9800,
    status: "Autorizada",
  },
  {
    id: "nf-theta-jun26",
    numero: String(nfSeq++).padStart(6, "0"),
    cliente_id: "theta",
    cliente_nome: "Theta Software House Ltda",
    competencia: "Jun/26",
    emitida_em: "10/06/2026",
    valor: "R$ 7.100,00",
    valor_num: 7100,
    status: "Autorizada",
  },
  {
    id: "nf-epsilon-mai26",
    numero: String(nfSeq++).padStart(6, "0"),
    cliente_id: "epsilon",
    cliente_nome: "Épsilon Construções Ltda",
    competencia: "Mai/26",
    emitida_em: "10/05/2026",
    valor: "R$ 15.200,00",
    valor_num: 15200,
    status: "Rejeitada",
    motivo_rejeicao: "Inscrição municipal do tomador divergente — verificar cadastro na prefeitura",
  },
  {
    id: "nf-eta-mai26",
    numero: String(nfSeq++).padStart(6, "0"),
    cliente_id: "eta",
    cliente_nome: "Eta Comércio Atacadista Ltda",
    competencia: "Mai/26",
    emitida_em: "10/05/2026",
    valor: "R$ 5.700,00",
    valor_num: 5700,
    status: "Autorizada",
  },
  {
    id: "nf-zeta-abr26",
    numero: String(nfSeq++).padStart(6, "0"),
    cliente_id: "zeta",
    cliente_nome: "Zeta Serviços Médicos S/S",
    competencia: "Abr/26",
    emitida_em: "10/04/2026",
    valor: "R$ 4.300,00",
    valor_num: 4300,
    status: "Autorizada",
  },
];

export const NOTAS_FISCAIS: NF[] = [...nfsHistorico, ...nfsExtras];

// ─── Régua de cobrança ────────────────────────────────────────────────────────
export type ReguaPasso = {
  id: string;
  offset: number;
  rotulo: string;
  canal: "Email" | "WhatsApp" | "Email + WhatsApp";
  ativo: boolean;
  assunto: string;
  corpo: string;
};

export const REGUA_PADRAO: ReguaPasso[] = [
  {
    id: "d-3",
    offset: -3,
    rotulo: "D-3 · Lembrete amigável",
    canal: "Email",
    ativo: true,
    assunto: "Lembrete · Honorários {competencia} vencem em 3 dias",
    corpo:
      "Olá, {responsavel}.\n\n" +
      "Este é um lembrete amigável de que a cobrança referente à competência {competencia}, no valor de {valor}, vence no dia {vencimento}.\n\n" +
      "Boleto e nota fiscal já estão disponíveis no e-mail enviado em {data_envio}. Em caso de dúvida, basta responder este e-mail.\n\n" +
      "Atenciosamente,\nCalaza Doreto Advocacia",
  },
  {
    id: "d-0",
    offset: 0,
    rotulo: "D0 · Vencimento hoje",
    canal: "Email + WhatsApp",
    ativo: true,
    assunto: "Vence hoje · Honorários {competencia}",
    corpo:
      "Olá, {responsavel}.\n\n" +
      "A cobrança da competência {competencia}, no valor de {valor}, vence hoje. Caso o pagamento já tenha sido realizado, por favor desconsidere.\n\n" +
      "Link para 2ª via do boleto: {link_boleto}\n\n" +
      "Atenciosamente,\nCalaza Doreto Advocacia",
  },
  {
    id: "d3",
    offset: 3,
    rotulo: "D+3 · Cobrança suave",
    canal: "Email",
    ativo: true,
    assunto: "Pendência · {competencia}",
    corpo:
      "Olá, {responsavel}.\n\n" +
      "Identificamos que a cobrança da competência {competencia} ainda consta em aberto em nosso controle. Pode ser apenas atraso no processamento bancário, então pedimos a gentileza de confirmar.\n\n" +
      "Em caso de necessidade de nova data ou parcelamento, podemos conversar.\n\n" +
      "Atenciosamente,\nCalaza Doreto Advocacia",
  },
  {
    id: "d7",
    offset: 7,
    rotulo: "D+7 · Cobrança firme",
    canal: "Email + WhatsApp",
    ativo: true,
    assunto: "Importante · Honorários em aberto",
    corpo:
      "Olá, {responsavel}.\n\n" +
      "A cobrança da competência {competencia}, vencida em {vencimento}, permanece em aberto. Para mantermos os serviços de assessoria sem interrupção, pedimos a regularização nos próximos dias.\n\n" +
      "Caso tenha havido pagamento, basta encaminhar o comprovante para baixa imediata.\n\n" +
      "Calaza Doreto Advocacia",
  },
  {
    id: "d15",
    offset: 15,
    rotulo: "D+15 · Escalada",
    canal: "Email + WhatsApp",
    ativo: false,
    assunto: "Última comunicação antes da escalada — {competencia}",
    corpo:
      "Olá, {responsavel}.\n\n" +
      "Esta é a última comunicação administrativa antes de o caso ser encaminhado ao setor de contencioso interno. A cobrança da competência {competencia} encontra-se em aberto há {dias_atraso} dias.\n\n" +
      "Por favor, entrem em contato até {prazo_final} para evitar a escalada.\n\n" +
      "Calaza Doreto Advocacia",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
export function fmtBRL(n: number) {
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function clientesPorColuna(coluna: Coluna) {
  return CLIENTES.filter((c) => c.coluna === coluna);
}

export function totalColuna(coluna: Coluna) {
  const itens = clientesPorColuna(coluna);
  const soma = itens.reduce((acc, c) => acc + c.valor_num, 0);
  return { count: itens.length, soma, somaFmt: fmtBRL(soma) };
}

// Métricas executivas pro dashboard
export function metricas() {
  const previsto = CLIENTES.reduce((a, c) => a + c.valor_num, 0);
  const recebido = clientesPorColuna("Pago").reduce((a, c) => a + c.valor_num, 0);
  const inadimplente = CLIENTES.filter((c) => c.status_cliente === "inadimplente")
    .reduce((a, c) => a + c.valor_num, 0);
  const mrr = CLIENTES.filter((c) => c.status_cliente !== "suspenso")
    .reduce((a, c) => a + c.valor_num, 0);
  const taxaInadimplencia = previsto === 0 ? 0 : (inadimplente / previsto) * 100;
  return {
    previsto,
    recebido,
    inadimplente,
    mrr,
    taxaInadimplencia,
    clientesAtivos: CLIENTES.filter((c) => c.status_cliente === "ativo").length,
    clientesInadimplentes: CLIENTES.filter((c) => c.status_cliente === "inadimplente").length,
    nfsRejeitadas: NOTAS_FISCAIS.filter((n) => n.status === "Rejeitada").length,
  };
}
