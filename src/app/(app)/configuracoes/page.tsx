"use client";

import { useState } from "react";

type Aba = "escritorio" | "asaas" | "nfse" | "branding" | "usuarios" | "emails";

export default function ConfiguracoesPage() {
  const [aba, setAba] = useState<Aba>("escritorio");

  return (
    <div className="px-6 py-6 max-w-6xl">
      <header className="mb-5">
        <h1 className="text-xl font-semibold">Configurações</h1>
        <p className="text-[13px] mt-0.5" style={{ color: "var(--text-soft)" }}>
          Dados do escritório, integrações fiscais e bancárias, e usuários.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-5">
        {/* Sub-menu lateral */}
        <nav className="space-y-1 text-[13px]">
          {(
            [
              ["escritorio", "Escritório", "🏛"],
              ["asaas", "Asaas (cobrança)", "💳"],
              ["nfse", "NFS-e Nacional", "📄"],
              ["emails", "E-mail transacional", "✉"],
              ["branding", "Branding", "🎨"],
              ["usuarios", "Usuários", "👥"],
            ] as const
          ).map(([key, lbl]) => (
            <button
              key={key}
              onClick={() => setAba(key)}
              className="w-full text-left px-3 py-2 rounded-lg transition"
              style={{
                background: aba === key ? "var(--bg)" : "transparent",
                color: aba === key ? "var(--brand)" : "var(--text)",
                fontWeight: aba === key ? 600 : 500,
              }}
            >
              {lbl}
            </button>
          ))}
        </nav>

        <div
          className="rounded-xl border p-6 space-y-5"
          style={{ background: "var(--surface)", borderColor: "var(--border)" }}
        >
          {aba === "escritorio" && <Escritorio />}
          {aba === "asaas" && <Asaas />}
          {aba === "nfse" && <NFSe />}
          {aba === "emails" && <Emails />}
          {aba === "branding" && <Branding />}
          {aba === "usuarios" && <Usuarios />}
        </div>
      </div>
    </div>
  );
}

function Section({ title, sub, children }: { title: string; sub?: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-[14px] font-semibold">{title}</h2>
      {sub && (
        <p className="text-[12.5px] mt-0.5" style={{ color: "var(--text-soft)" }}>
          {sub}
        </p>
      )}
      <div className="mt-3 space-y-3">{children}</div>
    </div>
  );
}

function Field({
  label,
  value,
  mono,
  type = "text",
}: {
  label: string;
  value: string;
  mono?: boolean;
  type?: string;
}) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-wide mb-1" style={{ color: "var(--text-muted)" }}>
        {label}
      </div>
      <input
        type={type}
        defaultValue={value}
        className={`w-full rounded-lg border px-3 py-2 text-[13px] ${mono ? "font-mono" : ""}`}
        style={{
          background: "var(--bg)",
          borderColor: "var(--border)",
          color: "var(--text)",
        }}
      />
    </div>
  );
}

function StatusPill({ ok, label }: { ok: boolean; label: string }) {
  return (
    <span
      className="text-[11px] font-semibold uppercase tracking-wide rounded-full px-2.5 py-1"
      style={{
        background: ok ? "rgba(30,122,58,0.12)" : "rgba(181,71,8,0.12)",
        color: ok ? "#1e7a3a" : "#b54708",
      }}
    >
      {ok ? "● " : "○ "}
      {label}
    </span>
  );
}

function SaveBar() {
  return (
    <div className="flex gap-2 pt-3 border-t" style={{ borderColor: "var(--border)" }}>
      <button
        className="rounded-lg px-4 py-2 text-[13px] font-semibold text-white"
        style={{ background: "var(--brand)" }}
      >
        Salvar alterações
      </button>
      <button
        className="rounded-lg px-4 py-2 text-[13px] font-semibold border"
        style={{
          borderColor: "var(--border)",
          color: "var(--text)",
          background: "var(--surface)",
        }}
      >
        Cancelar
      </button>
    </div>
  );
}

function Escritorio() {
  return (
    <>
      <Section title="Dados do escritório" sub="Aparecem na nota fiscal e nos e-mails de cobrança.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Field label="Razão social" value="Calaza Doreto Sociedade de Advogados" />
          <Field label="Nome fantasia" value="Calaza Doreto Advocacia" />
          <Field label="CNPJ" value="00.000.000/0001-00" mono />
          <Field label="Inscrição municipal" value="38.000.000-0" mono />
          <Field label="Telefone" value="(34) 3000-0000" />
          <Field label="E-mail principal" value="contato@calazadoreto.com.br" />
        </div>
        <Field label="Endereço completo" value="Av. Floriano Peixoto, 0, Centro, Uberlândia/MG, 38.400-000" />
      </Section>
      <SaveBar />
    </>
  );
}

function Asaas() {
  return (
    <>
      <Section title="Integração Asaas" sub="Motor de cobrança que emite boletos/PIX e processa baixa automática.">
        <div className="flex items-center gap-3 mb-2">
          <StatusPill ok={false} label="Aguardando API key" />
        </div>
        <Field label="API Key (token Asaas)" value="" type="password" mono />
        <Field label="Webhook URL" value="https://calazadoreto.vercel.app/api/webhooks/asaas" mono />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Field label="Modo" value="Sandbox (testes)" />
          <Field label="Plano" value="Asaas Avançado" />
        </div>
        <div className="rounded-lg p-3 text-[12px]" style={{ background: "var(--bg)", color: "var(--text-soft)" }}>
          Para ativar produção, o plano precisa ter API + Webhook + NFS-e Nacional liberados pela Asaas.
          Encaminhar e-mail de validação do Bruno antes de virar a chave.
        </div>
      </Section>
      <SaveBar />
    </>
  );
}

function NFSe() {
  return (
    <>
      <Section title="NFS-e Padrão Nacional" sub="Uberlândia aderiu ao Padrão Nacional em 01/01/2026. Emissão via gov.br.">
        <div className="flex items-center gap-3 mb-2">
          <StatusPill ok={true} label="Adapter Padrão Nacional conectado" />
          <StatusPill ok={false} label="Certificado e-CNPJ A1 pendente" />
        </div>
        <Field label="Município de emissão" value="Uberlândia/MG · IBGE 3170206" />
        <Field label="Item da lista de serviços (LC 116/03)" value="17.13 — Assessoria jurídica" />
        <Field label="Alíquota ISS" value="2,00%" />
        <Field label="Regime tributário" value="Sociedade simples — recolhimento por sócio" />
        <div className="rounded-lg p-3 text-[12px]" style={{ background: "var(--bg)", color: "var(--text-soft)" }}>
          Subir certificado e-CNPJ A1 (.pfx) abaixo. Senha do certificado é criptografada e nunca exibida.
        </div>
        <div className="flex gap-2">
          <button
            className="rounded-lg px-4 py-2 text-[13px] font-semibold border"
            style={{
              borderColor: "var(--border)",
              color: "var(--text)",
              background: "var(--surface)",
            }}
          >
            Subir certificado A1 (.pfx)
          </button>
          <button
            className="rounded-lg px-4 py-2 text-[13px] font-semibold border"
            style={{
              borderColor: "var(--border)",
              color: "var(--text)",
              background: "var(--surface)",
            }}
          >
            Testar emissão (homologação)
          </button>
        </div>
      </Section>
      <SaveBar />
    </>
  );
}

function Emails() {
  return (
    <>
      <Section title="Remetente de cobrança" sub="E-mail que aparece pro cliente final. Recomendado SPF/DKIM no domínio.">
        <div className="flex items-center gap-3 mb-2">
          <StatusPill ok={true} label="SPF · DKIM · DMARC OK" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Field label="Nome do remetente" value="Calaza Doreto · Financeiro" />
          <Field label="E-mail remetente" value="bruno@calazadoreto.com.br" />
          <Field label="Responder para (reply-to)" value="financeiro@calazadoreto.com.br" />
          <Field label="Provedor SMTP" value="Resend" />
        </div>
        <Field label="Assinatura padrão (HTML)" value="<p>Atenciosamente,<br>Bruno Calaza · Diretor Operacional<br>Calaza Doreto Advocacia</p>" mono />
      </Section>
      <SaveBar />
    </>
  );
}

function Branding() {
  return (
    <>
      <Section title="Identidade visual (white-label)" sub="Cores e logo que aparecem no CRM e nos e-mails enviados ao cliente.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Field label="Cor principal (hex)" value="#1e4284" mono />
          <Field label="Cor de fundo do header (hex)" value="#101422" mono />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <div className="text-[11px] uppercase tracking-wide mb-1" style={{ color: "var(--text-muted)" }}>
              Logo (versão clara)
            </div>
            <div
              className="rounded-lg border-2 border-dashed p-6 text-center text-[12px]"
              style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
            >
              Arraste o SVG ou PNG transparente aqui
            </div>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-wide mb-1" style={{ color: "var(--text-muted)" }}>
              Favicon
            </div>
            <div
              className="rounded-lg border-2 border-dashed p-6 text-center text-[12px]"
              style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
            >
              .ico ou PNG 64×64
            </div>
          </div>
        </div>
      </Section>
      <SaveBar />
    </>
  );
}

function Usuarios() {
  const u = [
    { nome: "Bruno Calaza", email: "bruno@calazadoreto.com.br", cargo: "Diretor Operacional", role: "Admin", iniciais: "BC", avatar: "/avatar-bruno.png" },
    { nome: "Eliana Calaza", email: "eliana@calazadoreto.com.br", cargo: "Sócia fundadora", role: "Admin", iniciais: "EC", avatar: null },
    { nome: "Marcos Doreto", email: "marcos@calazadoreto.com.br", cargo: "Sócio fundador", role: "Admin", iniciais: "MD", avatar: null },
  ];
  return (
    <>
      <Section title="Usuários com acesso" sub="Quem pode operar este painel.">
        <div className="space-y-2">
          {u.map((x) => (
            <div
              key={x.email}
              className="rounded-lg border px-4 py-3 flex items-center gap-3"
              style={{ borderColor: "var(--border)" }}
            >
              {x.avatar ? (
                <img
                  src={x.avatar}
                  alt={x.nome}
                  className="w-9 h-9 rounded-full object-cover"
                  style={{ border: "1px solid var(--border)" }}
                />
              ) : (
                <div
                  className="w-9 h-9 rounded-full grid place-items-center text-white font-semibold text-[12px]"
                  style={{ background: "var(--brand)" }}
                >
                  {x.iniciais}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-medium">{x.nome}</div>
                <div className="text-[11.5px]" style={{ color: "var(--text-muted)" }}>
                  {x.email} · {x.cargo}
                </div>
              </div>
              <span
                className="text-[11px] font-semibold uppercase tracking-wide rounded px-2 py-0.5"
                style={{ background: "rgba(30,66,132,0.12)", color: "var(--brand)" }}
              >
                {x.role}
              </span>
              <button className="text-[12px] font-semibold" style={{ color: "var(--text-soft)" }}>
                Editar
              </button>
            </div>
          ))}
        </div>
        <button
          className="rounded-lg px-4 py-2 text-[13px] font-semibold text-white"
          style={{ background: "var(--brand)" }}
        >
          + Convidar usuário
        </button>
      </Section>
    </>
  );
}
