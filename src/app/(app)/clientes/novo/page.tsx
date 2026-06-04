import BrandHeader from "@/components/BrandHeader";

// Cadastro de cliente (scaffold visual). No próximo passo: validação + gravar no Supabase
// e criar o customer no Asaas.
export default function NovoClientePage() {
  const field = "w-full rounded-lg border border-black/10 px-3 py-2 text-sm";
  return (
    <main>
      <BrandHeader />
      <form className="max-w-2xl mx-auto p-6 space-y-4">
        <h1 className="text-lg font-semibold text-ink">Novo cliente</h1>

        <div className="grid grid-cols-2 gap-4">
          <label className="text-sm">Razão social
            <input className={field} placeholder="Indústria Alfa Ltda" />
          </label>
          <label className="text-sm">CNPJ
            <input className={field} placeholder="00.000.000/0001-00" />
          </label>
          <label className="text-sm">Inscrição municipal
            <input className={field} />
          </label>
          <label className="text-sm">E-mail de cobrança
            <input className={field} type="email" placeholder="financeiro@cliente.com.br" />
          </label>
          <label className="text-sm">Valor mensal (R$)
            <input className={field} type="number" step="0.01" placeholder="4500.00" />
          </label>
          <label className="text-sm">Dia de vencimento
            <input className={field} type="number" defaultValue={10} />
          </label>
        </div>

        <label className="text-sm block">Descrição do serviço (vai no corpo da NF)
          <textarea className={field} rows={3} placeholder="Assessoria jurídica empresarial — honorários mensais" />
        </label>

        <button
          type="button"
          className="rounded-lg px-4 py-2 text-sm font-semibold text-white"
          style={{ background: "var(--brand)" }}
        >
          Salvar cliente
        </button>
      </form>
    </main>
  );
}
