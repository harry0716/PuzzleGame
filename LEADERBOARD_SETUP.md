# 共用排行榜設定說明

## 1. 目前設計
- 這個專案已支援兩種排行榜模式：
- `local`：每支手機只看自己的瀏覽器本機排行榜。
- `supabase`：所有手機共用同一份雲端排行榜。

## 2. 啟用步驟

### 建立 Supabase 專案
1. 到 Supabase 建立一個新專案。
2. 取得：
   - Project URL
   - anon public key

### 建立資料表
在 Supabase SQL Editor 執行：

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
```

## 3. 修改 `config.js`

將 [config.js](C:/Users/harry/.codex/Interactive_puzzle_game/config.js) 改成：

```js
window.APP_CONFIG = {
  appName: "AI Lab Talent Sprint",
  leaderboard: {
    provider: "supabase",
    supabaseUrl: "https://your-project.supabase.co",
    supabaseAnonKey: "your-anon-key",
    table: "leaderboard_entries",
    eventCode: "ai-lab-visit-2026-04-07"
  }
};
```

如果你不想手動重打，也可以直接把 [config.supabase.example.js](C:/Users/harry/.codex/Interactive_puzzle_game/config.supabase.example.js) 的內容複製到 [config.js](C:/Users/harry/.codex/Interactive_puzzle_game/config.js)，再把裡面的 4 個值換成正式值。

## 3.1 可直接貼進 Supabase 的 SQL 檔
- 我已經另外放好一份 [supabase-leaderboard.sql](C:/Users/harry/.codex/Interactive_puzzle_game/supabase-leaderboard.sql)。
- 你可以直接把這個檔案內容貼進 Supabase SQL Editor 執行。

## 4. 建議做法
- 每一場活動用不同 `eventCode`，避免不同場次資料混在一起。
- 若只是校內單場體驗，匿名寫入就夠用了。
- 若未來要做教師控制台，再加上主持端登入和刪除權限。

## 5. 備註
- 前端目前只會讀取前 8 名。
- 雲端模式下，前端不提供清空排行榜，避免任何學生誤刪。
- 如果雲端服務不可用，程式會自動退回本機模式。
- GitHub Pages 與 Supabase 可以同時使用：前端頁面放 GitHub Pages，排行榜資料放 Supabase。
