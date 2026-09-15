create table public.family_app_state(
  family_id uuid primary key references public.families on delete cascade,
  state jsonb not null default '{}',
  updated_at timestamptz not null default now()
);
alter table public.family_app_state enable row level security;
create policy own_family_app_state on public.family_app_state for all using(public.owns_family(family_id)) with check(public.owns_family(family_id));
revoke all on public.family_app_state from anon;
grant select,insert,update,delete on public.family_app_state to authenticated;

create or replace function public.touch_updated_at() returns trigger language plpgsql as $$ begin new.updated_at=now(); return new; end $$;
create trigger family_app_state_updated before update on public.family_app_state for each row execute function public.touch_updated_at();
