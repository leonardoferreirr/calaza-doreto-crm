import BrandHeader from "@/components/BrandHeader";
import KanbanBoard from "@/components/KanbanBoard";

export default function KanbanPage() {
  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text)" }}>
      <BrandHeader />
      <div className="px-6 pt-5">
        <h1 className="text-lg font-semibold">Cobranças · competência atual</h1>
        <p className="text-sm" style={{ color: "var(--text-soft)" }}>
          Demonstração com dados fictícios. Pagamento confirmado move o card pra &ldquo;Pago&rdquo; automaticamente (webhook Asaas). Clique em qualquer card pra ver o detalhe do cliente.
        </p>
      </div>
      <KanbanBoard />
    </main>
  );
}
