import type { Metadata } from "next";
import "./globals.css";
import { BRAND_DEFAULT, brandToCssVars } from "@/lib/brand";

export const metadata: Metadata = {
  title: "CRM de Cobrança",
  description: "Gestão de cobranças, NFS-e e follow-up — white-label.",
};

// Script inline pra aplicar o tema ANTES do paint inicial (evita flash).
const noFlashScript = `
(function() {
  try {
    var stored = localStorage.getItem('theme');
    var systemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    var dark = stored ? stored === 'dark' : systemDark;
    if (dark) document.documentElement.classList.add('dark');
  } catch (e) {}
})();
`.trim();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Em produção, o brand vem do tenant logado. Aqui usamos o default (Calaza Doreto).
  return (
    <html lang="pt-BR" style={brandToCssVars(BRAND_DEFAULT)} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlashScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
