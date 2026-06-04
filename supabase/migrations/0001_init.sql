-- CRM Calaza Doreto — schema inicial multi-tenant
-- Postgres / Supabase. Isolamento por tenant via RLS.

create extension if not exists "pgcrypto";

create type invoice_status as enum
  ('a_emitir','emitida','enviada','vencida','em_cobranca','paga','cancelada');
create type nfse_status as enum ('pendente','autorizada','erro');
create type client_status as enum ('ativo','inativo');
create type user_role as enum ('admin','operador');
create type event_type as enum
  ('nf_emitida','email_enviado','cobranca_1','cobranca_2','tarefa_ligacao','webhook_pago','baixa_manual','erro');

create table tenants (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  slug text unique not null,
  cnpj text,
  logo_url text,
  cor_marca text default '#1e4284',
  cor_fundo text default '#101422',
  remetente_nome text,
  remetente_email text,
  assinatura_email_html text,
  asaas_ambiente text default 'sandbox',
  nfse_adapter text default 'nacional',
  nfse_config jsonb default '{}'::jsonb,
  regua_config jsonb default '{"cobranca_1":1,"cobranca_2":2,"ligacao":3}'::jsonb,
  timezone text default 'America/Sao_Paulo',
  created_at timestamptz default now()
);

create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  tenant_id uuid references tenants(id) on delete cascade,
  nome text,
  email text,
  role user_role not null default 'operador',
  created_at timestamptz default now()
);

create table clients (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  razao_social text not null,
  nome_fantasia text,
  cnpj text not null,
  inscricao_municipal text,
  emails jsonb default '[]'::jsonb,
  telefone text,
  endereco jsonb default '{}'::jsonb,
  servico_descricao text,
  valor_mensal numeric(12,2) not null,
  dia_vencimento int not null default 10,
  asaas_customer_id text,
  status client_status not null default 'ativo',
  created_at timestamptz default now()
);
create index on clients (tenant_id);

create table invoices (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  client_id uuid not null references clients(id) on delete cascade,
  competencia text not null,
  valor numeric(12,2) not null,
  status invoice_status not null default 'a_emitir',
  kanban_coluna text default 'A emitir',
  vencimento date not null,
  nfse_status nfse_status default 'pendente',
  nfse_numero text,
  nfse_chave text,
  nfse_pdf_url text,
  nfse_xml_url text,
  asaas_payment_id text,
  boleto_url text,
  pix_copia_cola text,
  emitida_em timestamptz,
  enviada_em timestamptz,
  paga_em timestamptz,
  created_at timestamptz default now(),
  unique (client_id, competencia)
);
create index on invoices (tenant_id);
create index on invoices (status);

create table events (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  invoice_id uuid references invoices(id) on delete cascade,
  tipo event_type not null,
  payload jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);
create index on events (tenant_id);

create table tasks (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  client_id uuid references clients(id) on delete cascade,
  invoice_id uuid references invoices(id) on delete cascade,
  tipo text not null default 'ligacao',
  due_date date,
  status text not null default 'aberta',
  assignee uuid references profiles(id),
  created_at timestamptz default now()
);
create index on tasks (tenant_id);

create or replace function current_tenant_id()
returns uuid language sql stable security definer set search_path = public as $$
  select tenant_id from profiles where id = auth.uid()
$$;

alter table tenants  enable row level security;
alter table profiles enable row level security;
alter table clients  enable row level security;
alter table invoices enable row level security;
alter table events   enable row level security;
alter table tasks    enable row level security;

create policy tenant_isolation_select on tenants
  for select using (id = current_tenant_id());

create policy profiles_self on profiles
  for select using (id = auth.uid() or tenant_id = current_tenant_id());

create policy clients_tenant on clients
  using (tenant_id = current_tenant_id()) with check (tenant_id = current_tenant_id());
create policy invoices_tenant on invoices
  using (tenant_id = current_tenant_id()) with check (tenant_id = current_tenant_id());
create policy events_tenant on events
  using (tenant_id = current_tenant_id()) with check (tenant_id = current_tenant_id());
create policy tasks_tenant on tasks
  using (tenant_id = current_tenant_id()) with check (tenant_id = current_tenant_id());
