# GitHub Pages Setup

## Repository

- Repo: [https://github.com/harry0716/PuzzleGame](https://github.com/harry0716/PuzzleGame)
- Branch used for deployment: `main`

## Enable GitHub Pages

1. Open the GitHub repository
2. Go to `Settings`
3. Open `Pages`
4. Under `Build and deployment`, choose `Deploy from a branch`
5. Select branch `main`
6. Select folder `/ (root)`
7. Click `Save`

## Published URLs

- Main: [https://harry0716.github.io/PuzzleGame/](https://harry0716.github.io/PuzzleGame/)
- Leaderboard: [https://harry0716.github.io/PuzzleGame/leaderboard.html](https://harry0716.github.io/PuzzleGame/leaderboard.html)
- Presenter: [https://harry0716.github.io/PuzzleGame/presenter.html](https://harry0716.github.io/PuzzleGame/presenter.html)

## Updating The Site

Whenever local code changes are ready:

```powershell
git add .
git commit -m "Describe the change"
git push origin main
```

GitHub Pages will deploy the latest `main` branch automatically.

## Common Troubleshooting

### The website still looks old after push

- wait a few minutes for Pages to redeploy
- hard refresh with `Ctrl + F5`
- check whether `service-worker.js` cache version was updated

### The site opens but leaderboard data is wrong

Check `config.js`:

- `provider`
- `supabaseUrl`
- `supabaseAnonKey`
- `table`
- `eventCode`

### Front-end leaderboard reset does not work

Make sure Supabase has the delete policy enabled:

```sql
create policy "public delete leaderboard"
on leaderboard_entries
for delete
to anon
using (true);
```

See `LEADERBOARD_SETUP.md` for the full setup.
