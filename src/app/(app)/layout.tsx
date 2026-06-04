import Sidebar from "@/components/Sidebar";
import ThemeToggle from "@/components/ThemeToggle";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen" style={{ background: "var(--bg)", color: "var(--text)" }}>
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        {/* topbar minimalista — só ações globais (tema, busca, perfil) */}
        <header
          className="h-14 flex items-center justify-end gap-3 px-6 border-b shrink-0"
          style={{ borderColor: "var(--border)", background: "var(--surface)" }}
        >
          <ThemeToggle />
        </header>
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
