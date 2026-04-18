# Leaderboard Setup

## Modes

The project supports two leaderboard modes.

### Local Mode

- stored in browser `localStorage`
- useful for offline demos or single-device testing
- no backend setup required

### Supabase Mode

- shared across devices
- filtered by `eventCode`
- suitable for live events and presenter ranking

## Required Supabase Information

You need:

- Project URL
- anon public key
- table name
- event code for the current activity

## SQL Setup

Run this in the Supabase SQL Editor:

```sql
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
```

Notes:

- `delete` permission is required for the front-end reset button
- rerunning the script is safe because policies are dropped first

## `config.js` Example

```js
window.APP_CONFIG = {
  appName: "AI Lab Talent Sprint",
  leaderboard: {
    provider: "supabase",
    supabaseUrl: "https://your-project.supabase.co",
    supabaseAnonKey: "your-anon-key",
    table: "leaderboard_entries",
    eventCode: "your-event-code"
  }
};
```

## Current Project Values

Current repository configuration uses:

- provider: `supabase`
- table: `leaderboard_entries`
- event code: `puzzlegame-visit-2026-04-08`

Check the live value directly in `config.js` before each event.

## Front-End Reset Behavior

The reset button clears only rows matching the active `eventCode`.

That means:

- one event can be reset without deleting every historical event
- using a new `eventCode` is the safest way to start a fresh activity

## Recommended Event Workflow

Before a new event:

1. choose a new `eventCode`
2. update `config.js`
3. deploy the site
4. test ranking insert and reset once

## Troubleshooting

### Reset button fails

Likely causes:

- delete policy not enabled
- wrong Supabase URL or anon key
- deployed site still using an old cached version

### Rankings do not appear

Check:

- `provider` is set to `supabase`
- `eventCode` matches the inserted rows
- network request to Supabase succeeds

### Local mode is being used unexpectedly

If Supabase fetch fails, the app may fall back to local mode.
Confirm the live site has valid values in `config.js`.
