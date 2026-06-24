-- HubsteriaCarePro Phase 4 SaaS foundation schema.
-- Designed for tenant isolation, facility scoping, role permissions, and auditability.

create table tenants (
  id text primary key,
  name text not null,
  status text not null default 'active',
  created_at timestamptz not null default now()
);

create table facilities (
  id text primary key,
  tenant_id text not null references tenants(id),
  name text not null,
  timezone text not null,
  status text not null default 'active',
  created_at timestamptz not null default now()
);

create table role_assignments (
  id text primary key,
  tenant_id text not null references tenants(id),
  facility_id text references facilities(id),
  user_id text not null,
  role_name text not null,
  permissions jsonb not null,
  created_at timestamptz not null default now()
);

create table residents (
  id text primary key,
  tenant_id text not null references tenants(id),
  facility_id text not null references facilities(id),
  display_name text not null,
  room text not null,
  care_level text not null,
  status text not null default 'active'
);

create table med_admin_events (
  id text primary key,
  tenant_id text not null references tenants(id),
  facility_id text not null references facilities(id),
  resident_id text not null references residents(id),
  medication_name text not null,
  status text not null,
  required_check text,
  nurse_note text,
  documented_by text not null,
  documented_at timestamptz not null default now()
);

create table order_reviews (
  id text primary key,
  tenant_id text not null references tenants(id),
  facility_id text not null references facilities(id),
  resident_id text not null references residents(id),
  order_type text not null,
  summary text not null,
  review_status text not null,
  reviewed_by text,
  reviewed_at timestamptz
);

create table audit_events (
  id text primary key,
  tenant_id text not null references tenants(id),
  facility_id text references facilities(id),
  actor_user_id text not null,
  action text not null,
  entity_type text not null,
  entity_id text not null,
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now()
);
