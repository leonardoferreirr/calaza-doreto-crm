import Link from "next/link";
import { BRAND_DEFAULT } from "@/lib/brand";

// Cabeçalho com a logo do tenant sobre o navy escuro (white-label).
export default function BrandHeader() {
  const b = BRAND_DEFAULT;
  return (
    <header
      className="flex items-center justify-between px-6 py-3"
      style={{ background: b.corFundo }}
    >
      <Link href="/kanban" className="flex items-center gap-3">
        {/* logo branca sobre fundo escuro */}
        <img src={b.logoUrl} alt={b.nome} style={{ height: 28 }} />
      </Link>
      <nav className="flex items-center gap-5 text-sm text-white/80">
        <Link href="/kanban" className="hover:text-white">Cobranças</Link>
        <Link href="/clientes/novo" className="hover:text-white">+ Cliente</Link>
      </nav>
    </header>
  );
}
