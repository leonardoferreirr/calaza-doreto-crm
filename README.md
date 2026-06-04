# CRM de Cobrança (white-label) — scaffold

App multi-tenant pra automação de NF + cobrança + follow-up. Cliente atual: **Calaza Doreto**.
Stack: Next.js 14 (App Router, TS) + Tailwind + Supabase. Tema de marca por tenant (CSS vars).

## Rodar localmente
```bash
npm install
cp .env.example .env.local # preencher Supabase
npm run dev # http://localhost:3000 → /kanban
```
> O scaffold roda com dados mock no Kanban mesmo sem Supabase configurado.

## Estrutura
- `src/app/(app)/kanban` — board de cobranças (mock por enquanto)
- `src/app/(app)/clientes/novo` — cadastro de cliente
- `src/app/(auth)/login` — login (placeholder)
- `src/lib/supabase` — clients browser/server
- `supabase/migrations` — schema + RLS

## Próximos passos
1. Supabase Auth + escopo de tenant (middleware de sessão).
2. Kanban ligado ao banco + arrastar card → "Pago" (baixa manual).
3. Integração Asaas (sandbox): criar cliente, cobrança, webhook de pagamento.
4. Crons: dia 20 (emite NF + cobrança + e-mail branded) e diário (régua).
5. Adapter NFS-e Padrão Nacional (homologação → produção com certificado A1).
6. E-mail transacional com domínio autenticado (remetente bruno@calazadoreto.com.br).
