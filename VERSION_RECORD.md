# 版次紀錄

## 版本資訊
- 版本名稱：`PuzzleGame v1.0.0`
- 記錄日期：`2026-04-08`
- Git branch：`main`
- Git commit：`b7c65e03442bd448bdd52e9f3241da3f3db0c991`
- GitHub Repo：[https://github.com/harry0716/PuzzleGame](https://github.com/harry0716/PuzzleGame)
- GitHub Pages 正式站：[https://harry0716.github.io/PuzzleGame/](https://harry0716.github.io/PuzzleGame/)

## 本版定位
- 這是可正式對外使用的參訪互動遊戲版本。
- 已具備手機遊玩、GitHub Pages 部署、Supabase 共用排行榜、獨立排行榜頁、主持人投影頁。

## 已完成功能
- 手機優先單頁遊戲流程：
  - 首頁
  - 暱稱輸入
  - 5 題快問快答
  - 即時回饋
  - 結果卡
- 結果卡內建排行榜區塊：
  - 保留原本流程
  - 已強化視覺呈現
- Supabase 共用排行榜：
  - 前端已接上 `config.js`
  - SQL 建表與 RLS 規則已提供
- 獨立排行榜頁：
  - `/leaderboard.html`
- 主持人大螢幕頁：
  - `/presenter.html`
  - 顯示 QR Code 與即時排行榜
- PWA / 靜態站支援：
  - `manifest.webmanifest`
  - `service-worker.js`
  - `icon.svg`
- GitHub Pages / Netlify / Vercel 部署檔已具備

## 正式網址
- 遊戲入口：
  - [https://harry0716.github.io/PuzzleGame/](https://harry0716.github.io/PuzzleGame/)
- 獨立排行榜頁：
  - [https://harry0716.github.io/PuzzleGame/leaderboard.html](https://harry0716.github.io/PuzzleGame/leaderboard.html)
- 主持人投影頁：
  - [https://harry0716.github.io/PuzzleGame/presenter.html](https://harry0716.github.io/PuzzleGame/presenter.html)

## Supabase 設定狀態
- 排行榜模式：`supabase`
- Supabase URL：`https://lneulgqugggylsryhrnt.supabase.co`
- 排行榜資料表：`leaderboard_entries`
- 活動代碼：`puzzlegame-visit-2026-04-08`

## 核心檔案
- 入口頁：[index.html](C:/Users/harry/.codex/Interactive_puzzle_game/index.html)
- 遊戲主程式：[app.js](C:/Users/harry/.codex/Interactive_puzzle_game/app.js)
- 樣式：[styles.css](C:/Users/harry/.codex/Interactive_puzzle_game/styles.css)
- 設定檔：[config.js](C:/Users/harry/.codex/Interactive_puzzle_game/config.js)
- 共用排行榜模組：[leaderboard-shared.js](C:/Users/harry/.codex/Interactive_puzzle_game/leaderboard-shared.js)
- 獨立排行榜頁：[leaderboard.html](C:/Users/harry/.codex/Interactive_puzzle_game/leaderboard.html)
- 主持人頁：[presenter.html](C:/Users/harry/.codex/Interactive_puzzle_game/presenter.html)
- 主持人腳本：[presenter.js](C:/Users/harry/.codex/Interactive_puzzle_game/presenter.js)
- 排行榜頁腳本：[leaderboard-page.js](C:/Users/harry/.codex/Interactive_puzzle_game/leaderboard-page.js)

## 文件清單
- 活動與技術總規劃：[DELIVERY.md](C:/Users/harry/.codex/Interactive_puzzle_game/DELIVERY.md)
- 部署說明：[DEPLOYMENT.md](C:/Users/harry/.codex/Interactive_puzzle_game/DEPLOYMENT.md)
- GitHub Pages 上線指南：[GITHUB_PAGES.md](C:/Users/harry/.codex/Interactive_puzzle_game/GITHUB_PAGES.md)
- 排行榜設定說明：[LEADERBOARD_SETUP.md](C:/Users/harry/.codex/Interactive_puzzle_game/LEADERBOARD_SETUP.md)
- 簡報稿：[SLIDES.md](C:/Users/harry/.codex/Interactive_puzzle_game/SLIDES.md)
- Supabase SQL：[supabase-leaderboard.sql](C:/Users/harry/.codex/Interactive_puzzle_game/supabase-leaderboard.sql)

## 最近關鍵提交
- `b7c65e0` Add standalone and presenter leaderboard pages
- `a2a9d6c` Configure Supabase leaderboard
- `238aa6a` Add Supabase leaderboard setup templates
- `044a7fe` Merge remote main into local project
- `ec525d2` Sync local project to GitHub repo

## 當前狀態判定
- 本機與 GitHub `main` 同步
- GitHub Pages 已啟用
- Supabase SQL 已建立
- 正式站可供學生以手機連線使用

## 下一版可考慮項目
- 主持人投影頁大字版強化
- QR Code 投影海報頁
- 排行榜自動輪播與動畫
- 場次管理機制
- 教師端控制台
