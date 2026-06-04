import BrandHeader from "@/components/BrandHeader";
import KanbanBoard from "@/components/KanbanBoard";

export default function KanbanPage() {
  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text)" }}>
      <BrandHeader />
      <div className="px-6 pt-5">
        <h1 className="text-lg font-semibold">Cobranças · Competência Atual</h1>
      </div>
      <KanbanBoard />
    </main>
  );
}
