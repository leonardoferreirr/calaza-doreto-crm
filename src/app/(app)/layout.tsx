"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import ThemeToggle from "@/components/ThemeToggle";
import { isAuthed, signOut } from "@/lib/auth";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!isAuthed()) {
      router.replace("/login");
    } else {
      setReady(true);
    }
  }, [router]);

  if (!ready) {
    return (
      <div
        className="min-h-screen grid place-items-center"
        style={{ background: "var(--bg)", color: "var(--text-muted)", fontSize: 13 }}
      >
        Carregando…
      </div>
    );
  }

  function logout() {
    signOut();
    router.replace("/login");
  }

  return (
    <div className="flex min-h-screen" style={{ background: "var(--bg)", color: "var(--text)" }}>
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <header
          className="h-14 flex items-center justify-end gap-3 px-6 border-b shrink-0"
          style={{ borderColor: "var(--border)", background: "var(--surface)" }}
        >
          <button
            onClick={logout}
            className="text-[12.5px] font-medium px-3 py-1.5 rounded-lg border transition"
            style={{
              borderColor: "var(--border)",
              color: "var(--text-soft)",
              background: "transparent",
            }}
            title="Sair"
          >
            Sair
          </button>
          <ThemeToggle />
        </header>
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
