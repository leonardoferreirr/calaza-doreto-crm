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

// Converte tokens do tenant em CSS vars pra aplicar no <html>/<body>.
export function brandToCssVars(b: Brand): CSSProperties {
  return {
    ["--brand" as any]: b.corMarca,
    ["--ink" as any]: b.corFundo,
    ["--surface" as any]: b.corTexto,
  };
}
