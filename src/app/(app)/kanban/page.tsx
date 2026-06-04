import BrandHeader from "@/components/BrandHeader";
import KanbanBoard from "@/components/KanbanBoard";

export default function KanbanPage() {
  return (
    <main>
      <BrandHeader />
      <div className="px-6 pt-5">
        <h1 className="text-lg font-semibold text-ink">Cobranças · competência atual</h1>
        <p className="text-sm text-black/50">
          Demonstração com dados fictícios. Pagamento confirmado move o card pra “Pago” automaticamente (webhook Asaas).
        </p>
      </div>
      <KanbanBoard />
    </main>
  );
}
