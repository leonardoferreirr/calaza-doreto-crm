import type { Config } from "tailwindcss";

// Tema base. As cores de marca também vêm por CSS vars (por-tenant, white-label).
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: "var(--brand, #1e4284)",
        ink: "var(--ink, #101422)",
        surface: "var(--surface, #ffffff)",
      },
    },
  },
  plugins: [],
};
export default config;
