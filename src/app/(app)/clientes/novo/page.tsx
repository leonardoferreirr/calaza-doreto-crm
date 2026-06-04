"use client";

import { useState } from "react";
import BrandHeader from "@/components/BrandHeader";

type Form = {
  cnpj: string;
  razao_social: string;
  nome_fantasia: string;
  inscricao_municipal: string;
  cep: string;
  logradouro: string;
  numero: string;
  bairro: string;
  cidade: string;
  uf: string;
  responsavel_nome: string;
  responsavel_cargo: string;
  email_responsavel: string;
  email_financeiro: string;
  whatsapp: string;
  fixo: string;
  valor_mensal: string;
  dia_vencimento: string;
  servico_descricao: string;
};

const VAZIO: Form = {
  cnpj: "", razao_social: "", nome_fantasia: "", inscricao_municipal: "",
  cep: "", logradouro: "", numero: "", bairro: "", cidade: "", uf: "",
  responsavel_nome: "", responsavel_cargo: "", email_responsavel: "",
  email_financeiro: "", whatsapp: "", fixo: "",
  valor_mensal: "", dia_vencimento: "10", servico_descricao: "",
};

function mascaraCnpj(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 14);
  return d
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2");
}

function mascaraTel(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 10) return d.replace(/^(\d{2})(\d{4})(\d)/, "($1) $2-$3");
  return d.replace(/^(\d{2})(\d{5})(\d)/, "($1) $2-$3");
}

function mascaraCep(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 8);
  return d.replace(/^(\d{2})(\d{3})(\d)/, "$1.$2-$3");
}

export default function NovoClientePage() {
  const [form, setForm] = useState<Form>(VAZIO);
  const [buscando, setBuscando] = useState(false);
  const [erroCnpj, setErroCnpj] = useState<string | null>(null);
  const [ok, setOk] = useState(false);

  function set<K extends keyof Form>(k: K, v: Form[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function buscarCnpj() {
    const limpo = form.cnpj.replace(/\D/g, "");
    if (limpo.length !== 14) {
      setErroCnpj("CNPJ precisa ter 14 dígitos.");
      return;
    }
    setErroCnpj(null);
    setBuscando(true);
    setOk(false);
    try {
      const r = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${limpo}`);
      if (!r.ok) throw new Error("CNPJ não encontrado na base pública.");
      const d = await r.json();
      // Cada busca SUBSTITUI os campos vindos da API (identificação + endereço +
      // fixo da Receita + sugestão de serviço). Campos manuais (responsável,
      // e-mails, WhatsApp, IM, valor, dia venc) ficam intactos.
      setForm((f) => ({
        ...f,
        razao_social: d.razao_social ?? "",
        nome_fantasia: d.nome_fantasia ?? "",
        cep: d.cep ? mascaraCep(d.cep) : "",
        logradouro: [d.descricao_tipo_de_logradouro, d.logradouro].filter(Boolean).join(" "),
        numero: d.numero ?? "",
        bairro: d.bairro ?? "",
        cidade: d.municipio ?? "",
        uf: d.uf ?? "",
        servico_descricao: d.cnae_fiscal_descricao
          ? `Assessoria jurídica empresarial para ${d.cnae_fiscal_descricao.toLowerCase()} — honorários mensais`
          : "",
        fixo: d.ddd_telefone_1
          ? mascaraTel(d.ddd_telefone_1.toString().replace(/\D/g, ""))
          : "",
      }));
      setOk(true);
    } catch (e: any) {
      setErroCnpj(e?.message || "Erro ao buscar CNPJ.");
    } finally {
      setBuscando(false);
    }
  }

  const fieldCls =
    "w-full rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/40";
  const fieldStyle: React.CSSProperties = {
    background: "var(--surface)",
    border: "1px solid var(--border)",
    color: "var(--text)",
  };
  const labelCls = "text-[11px] font-semibold uppercase tracking-wider";
  const labelStyle: React.CSSProperties = { color: "var(--text-muted)" };
  const sectionTitle: React.CSSProperties = { color: "var(--brand)" };

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text)" }}>
      <BrandHeader />
      <div className="max-w-3xl mx-auto p-6 space-y-6">
        <div>
          <h1 className="text-lg font-semibold">Novo Cliente</h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-soft)" }}>
            Digite o CNPJ e clique em buscar. Identificação e endereço são preenchidos automaticamente
            via base pública (BrasilAPI). Contato e contrato são manuais.
          </p>
        </div>

        {/* CNPJ lookup */}
        <section className="rounded-xl p-5 space-y-3" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
          <h2 className="text-[11px] font-semibold uppercase tracking-wider" style={sectionTitle}>
            Consulta CNPJ
          </h2>
          <div className="flex gap-2">
            <div className="flex-1 space-y-1">
              <label className={labelCls} style={labelStyle}>CNPJ</label>
              <input
                className={fieldCls + " font-mono"}
                style={fieldStyle}
                placeholder="00.000.000/0001-00"
                value={form.cnpj}
                onChange={(e) => set("cnpj", mascaraCnpj(e.target.value))}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); buscarCnpj(); } }}
              />
            </div>
            <button
              type="button"
              onClick={buscarCnpj}
              disabled={buscando || form.cnpj.replace(/\D/g, "").length !== 14}
              className="self-end rounded-lg px-4 py-2 text-sm font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ background: "var(--brand)", height: 38 }}
            >
              {buscando ? "Buscando…" : "Buscar dados"}
            </button>
          </div>
          {erroCnpj && (
            <p className="text-sm" style={{ color: "#dc2626" }}>{erroCnpj}</p>
          )}
          {ok && !erroCnpj && (
            <p className="text-sm" style={{ color: "#16a34a" }}>
              ✓ Dados encontrados. Confira e ajuste o que precisar.
            </p>
          )}
        </section>

        {/* Identificação */}
        <Section title="Identificação">
          <Field label="Razão social" value={form.razao_social} onChange={(v) => set("razao_social", v)} />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Nome fantasia" value={form.nome_fantasia} onChange={(v) => set("nome_fantasia", v)} />
            <Field label="Inscrição municipal" value={form.inscricao_municipal} onChange={(v) => set("inscricao_municipal", v)} mono />
          </div>
        </Section>

        {/* Endereço */}
        <Section title="Endereço">
          <div className="grid grid-cols-[2fr_1fr] gap-3">
            <Field label="Logradouro" value={form.logradouro} onChange={(v) => set("logradouro", v)} />
            <Field label="Número" value={form.numero} onChange={(v) => set("numero", v)} />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <Field label="Bairro" value={form.bairro} onChange={(v) => set("bairro", v)} />
            <Field label="CEP" value={form.cep} onChange={(v) => set("cep", mascaraCep(v))} mono />
            <Field label="UF" value={form.uf} onChange={(v) => set("uf", v.toUpperCase().slice(0, 2))} mono />
          </div>
          <Field label="Cidade" value={form.cidade} onChange={(v) => set("cidade", v)} />
        </Section>

        {/* Contato — manual */}
        <Section title="Contato">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Responsável (nome)" value={form.responsavel_nome} onChange={(v) => set("responsavel_nome", v)} />
            <Field label="Cargo do responsável" value={form.responsavel_cargo} onChange={(v) => set("responsavel_cargo", v)} />
          </div>
          <Field label="E-mail do responsável" type="email" value={form.email_responsavel} onChange={(v) => set("email_responsavel", v)} />
          <Field label="E-mail financeiro (cobrança)" type="email" value={form.email_financeiro} onChange={(v) => set("email_financeiro", v)} />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Celular / WhatsApp" value={form.whatsapp} onChange={(v) => set("whatsapp", mascaraTel(v))} />
            <Field label="Telefone fixo" value={form.fixo} onChange={(v) => set("fixo", mascaraTel(v))} />
          </div>
        </Section>

        {/* Contrato */}
        <Section title="Contrato">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Valor mensal (R$)" type="number" step="0.01" value={form.valor_mensal} onChange={(v) => set("valor_mensal", v)} />
            <Field label="Dia de vencimento" type="number" value={form.dia_vencimento} onChange={(v) => set("dia_vencimento", v)} />
          </div>
          <FieldTextarea
            label="Descrição do serviço (corpo da NF)"
            value={form.servico_descricao}
            onChange={(v) => set("servico_descricao", v)}
          />
        </Section>

        <div className="flex justify-end gap-2 pt-2 sticky bottom-3">
          <button
            type="button"
            className="rounded-lg px-4 py-2.5 text-sm font-semibold"
            style={{ border: "1px solid var(--border)", color: "var(--text)", background: "var(--surface)" }}
          >
            Cancelar
          </button>
          <button
            type="button"
            className="rounded-lg px-5 py-2.5 text-sm font-semibold text-white shadow-lg"
            style={{ background: "var(--brand)" }}
          >
            Salvar cliente
          </button>
        </div>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl p-5 space-y-3" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
      <h2 className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: "var(--brand)" }}>
        {title}
      </h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

function Field({
  label, value, onChange, type, step, mono,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  step?: string;
  mono?: boolean;
}) {
  return (
    <div className="space-y-1">
      <label className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
        {label}
      </label>
      <input
        type={type ?? "text"}
        step={step}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/40 ${mono ? "font-mono" : ""}`}
        style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)" }}
      />
    </div>
  );
}

function FieldTextarea({
  label, value, onChange,
}: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="space-y-1">
      <label className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className="w-full rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/40"
        style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)" }}
      />
    </div>
  );
}
