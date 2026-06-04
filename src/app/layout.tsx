import type { Metadata } from "next";
import "./globals.css";
import { BRAND_DEFAULT, brandToCssVars } from "@/lib/brand";

export const metadata: Metadata = {
  title: "CRM de Cobrança",
  description: "Gestão de cobranças, NFS-e e follow-up — white-label.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Em produção, o brand vem do tenant logado. Aqui usamos o default (Calaza Doreto).
  return (
    <html lang="pt-BR" style={brandToCssVars(BRAND_DEFAULT)}>
      <body>{children}</body>
    </html>
  );
}
