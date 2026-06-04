import KanbanBoard from "@/components/KanbanBoard";

const COMPETENCIAS = ["Jul/26", "Jun/26", "Mai/26", "Abr/26"];

export default function CobrancasPage() {
  return (
    <div>
      <div className="px-6 pt-6 pb-2 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-xl font-semibold">Cobranças</h1>
          <p className="text-[13px] mt-0.5" style={{ color: "var(--text-soft)" }}>
            Pipeline de emissão, envio e baixa por competência.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-[12px]" style={{ color: "var(--text-muted)" }}>
            Competência:
          </label>
          <select
            defaultValue="Jul/26"
            className="rounded-lg border px-2.5 py-1.5 text-[13px]"
            style={{
              background: "var(--surface)",
              borderColor: "var(--border)",
              color: "var(--text)",
            }}
          >
            {COMPETENCIAS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>
      <KanbanBoard />
    </div>
  );
}
