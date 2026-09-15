-- Complete family isolation for every V1 user-owned table.
create or replace function public.owns_family(fid uuid) returns boolean language sql stable security definer set search_path=public as $$ select exists(select 1 from public.families where id=fid and owner_id=auth.uid() and status='active') $$;
create or replace function public.owns_player(pid uuid) returns boolean language sql stable security definer set search_path=public as $$ select exists(select 1 from public.players p where p.id=pid and public.owns_family(p.family_id)) $$;
create or replace function public.owns_game(gid uuid) returns boolean language sql stable security definer set search_path=public as $$ select exists(select 1 from public.games g where g.id=gid and public.owns_player(g.player_id)) $$;

alter table public.consents enable row level security;
alter table public.parent_security enable row level security;
alter table public.teams enable row level security;
alter table public.chapter_progress enable row level security;
alter table public.challenges enable row level security;
alter table public.badges enable row level security;
alter table public.pre_game enable row level security;
alter table public.post_game enable row level security;
alter table public.signals enable row level security;
alter table public.recommendations enable row level security;
alter table public.reminders enable row level security;

create policy own_consents on public.consents for all using(public.owns_family(family_id)) with check(public.owns_family(family_id));
create policy own_parent_security on public.parent_security for all using(public.owns_family(family_id)) with check(public.owns_family(family_id));
create policy own_teams on public.teams for all using(public.owns_player(player_id)) with check(public.owns_player(player_id));
create policy own_progress on public.chapter_progress for all using(public.owns_player(player_id)) with check(public.owns_player(player_id));
create policy own_challenges on public.challenges for all using(public.owns_player(player_id)) with check(public.owns_player(player_id));
create policy own_badges on public.badges for all using(public.owns_player(player_id)) with check(public.owns_player(player_id));
create policy own_pre_game on public.pre_game for all using(public.owns_game(game_id)) with check(public.owns_game(game_id));
create policy own_post_game on public.post_game for all using(public.owns_game(game_id)) with check(public.owns_game(game_id));
create policy own_recommendations on public.recommendations for all using(public.owns_player(player_id)) with check(public.owns_player(player_id));
create policy own_reminders on public.reminders for all using(public.owns_game(game_id)) with check(public.owns_game(game_id));

-- Private AI-derived signals are service-role only; never exposed to the browser.
revoke all on public.signals from anon,authenticated;

-- Enforce immutable submission creation timestamps and edit windows in the database.
create or replace function public.enforce_edit_window() returns trigger language plpgsql as $$
begin
  if new.created_at <> old.created_at then raise exception 'created_at is immutable'; end if;
  if tg_table_name='post_game' and now()>old.created_at+interval '24 hours' then raise exception 'player reflection edit window closed'; end if;
  if tg_table_name='parent_dugout' and now()>old.created_at+interval '7 days' then raise exception 'parent entry edit window closed'; end if;
  new.updated_at=now(); return new;
end $$;
create trigger post_game_edit_window before update on public.post_game for each row execute function public.enforce_edit_window();
create trigger parent_dugout_edit_window before update on public.parent_dugout for each row execute function public.enforce_edit_window();

create table public.calendar_sources(id uuid primary key default gen_random_uuid(), player_id uuid not null references public.players on delete cascade, name text not null, ics_url text, last_imported_at timestamptz, created_at timestamptz not null default now());
alter table public.calendar_sources enable row level security;
create policy own_calendar_sources on public.calendar_sources for all using(public.owns_player(player_id)) with check(public.owns_player(player_id));

create table public.reminder_preferences(id uuid primary key default gen_random_uuid(), player_id uuid not null references public.players on delete cascade, team_id uuid references public.teams on delete cascade, pre_game_hours int not null default 24 check(pre_game_hours between 0 and 168), post_game_hours int not null default 4 check(post_game_hours between 0 and 168), enabled boolean not null default true, unique(player_id,team_id));
alter table public.reminder_preferences enable row level security;
create policy own_reminder_preferences on public.reminder_preferences for all using(public.owns_player(player_id)) with check(public.owns_player(player_id));
