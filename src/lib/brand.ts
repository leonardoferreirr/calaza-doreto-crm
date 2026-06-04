import type { CSSProperties } from "react";

// Tokens de marca (white-label). Default = Calaza Doreto.
// Em produção, estes valores vêm do registro `tenants` e são injetados como CSS vars.
export type Brand = {
  nome: string;
  logoUrl: string;
  corMarca: string;   // azul
  corFundo: string;   // navy escuro
  corTexto: string;   // branco
};

export const BRAND_DEFAULT: Brand = {
  nome: "Calaza Doreto",
  logoUrl: "/logo-branco.svg",
  corMarca: "#1e4284",
  corFundo: "#101422",
  corTexto: "#ffffff",
};

// Aplica APENAS --brand do tenant. As vars de tema (--surface, --bg, --text,
// --header-bg, --ink) vivem em globals.css e respondem ao html.dark.
export function brandToCssVars(b: Brand): CSSProperties {
  return {
    ["--brand" as any]: b.corMarca,
  };
}
