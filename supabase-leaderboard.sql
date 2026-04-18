create table if not exists leaderboard_entries (
  id bigint generated always as identity primary key,
  event_code text not null,
  player text not null,
  score integer not null default 0,
  talent text not null,
  played_at text not null,
  created_at timestamptz not null default now()
);

alter table leaderboard_entries enable row level security;

drop policy if exists "public read leaderboard" on leaderboard_entries;
drop policy if exists "public insert leaderboard" on leaderboard_entries;
drop policy if exists "public delete leaderboard" on leaderboard_entries;

create policy "public read leaderboard"
on leaderboard_entries
for select
to anon
using (true);

create policy "public insert leaderboard"
on leaderboard_entries
for insert
to anon
with check (true);

create policy "public delete leaderboard"
on leaderboard_entries
for delete
to anon
using (true);
