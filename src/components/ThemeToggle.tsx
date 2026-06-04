"use client";

import { useEffect, useState } from "react";

// Toggle de tema estilo iPhone (sol/lua). Persiste em localStorage.
// O <script> de no-flash no layout.tsx já aplica .dark antes do paint inicial.
export default function ThemeToggle() {
  const [dark, setDark] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  }

  // Evita hydration mismatch: só renderiza depois de montar
  if (!mounted) {
    return <div style={{ width: 56, height: 30 }} aria-hidden />;
  }

  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Ativar modo claro" : "Ativar modo escuro"}
      title={dark ? "Modo claro" : "Modo escuro"}
      className="relative inline-flex items-center rounded-full shadow-inner focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
      style={{
        width: 56,
        height: 30,
        background: dark
          ? "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)"
          : "linear-gradient(135deg, #fcd34d 0%, #f59e0b 100%)",
        transition: "background .35s ease",
      }}
    >
      {/* Stars (visíveis no dark) */}
      <span
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          opacity: dark ? 1 : 0,
          transition: "opacity .35s ease",
          pointerEvents: "none",
        }}
      >
        <span style={{ position: "absolute", top: 7, left: 9, width: 2, height: 2, borderRadius: "50%", background: "white", opacity: 0.8 }} />
        <span style={{ position: "absolute", top: 14, left: 16, width: 1.5, height: 1.5, borderRadius: "50%", background: "white", opacity: 0.6 }} />
        <span style={{ position: "absolute", top: 20, left: 11, width: 1.5, height: 1.5, borderRadius: "50%", background: "white", opacity: 0.5 }} />
      </span>

      {/* Knob */}
      <span
        style={{
          position: "absolute",
          top: 3,
          left: 3,
          width: 24,
          height: 24,
          borderRadius: "50%",
          background: dark ? "#e2e8f0" : "#ffffff",
          boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
          transform: dark ? "translateX(26px)" : "translateX(0)",
          transition: "transform .32s cubic-bezier(.34,1.56,.64,1), background .35s ease",
          display: "grid",
          placeItems: "center",
        }}
      >
        {dark ? (
          // Lua
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path
              d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"
              fill="#1e293b"
            />
          </svg>
        ) : (
          // Sol
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2.4" strokeLinecap="round">
            <circle cx="12" cy="12" r="4" fill="#d97706" />
            <line x1="12" y1="2" x2="12" y2="4.5" />
            <line x1="12" y1="19.5" x2="12" y2="22" />
            <line x1="2" y1="12" x2="4.5" y2="12" />
            <line x1="19.5" y1="12" x2="22" y2="12" />
            <line x1="4.6" y1="4.6" x2="6.4" y2="6.4" />
            <line x1="17.6" y1="17.6" x2="19.4" y2="19.4" />
            <line x1="4.6" y1="19.4" x2="6.4" y2="17.6" />
            <line x1="17.6" y1="6.4" x2="19.4" y2="4.6" />
          </svg>
        )}
      </span>
    </button>
  );
}
