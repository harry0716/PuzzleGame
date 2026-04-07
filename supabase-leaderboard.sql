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
