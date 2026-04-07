# GitHub Pages 上線指南

## 1. 這個專案適合直接放 GitHub Pages
- 目前是純靜態網站，不需要後端伺服器。
- `index.html`、`styles.css`、`app.js` 都使用相對路徑，適合部署在 GitHub Pages 的 repo 子路徑。
- 已加入 `.nojekyll`，避免 GitHub Pages 做不必要的 Jekyll 處理。

## 2. 建議的 repository 名稱
- 建議用英文與連字號，例如：
  - `ai-lab-talent-sprint`
  - `csu-ai-lab-visit-game`

這樣最後網址會比較好記，例如：
- `https://你的帳號.github.io/ai-lab-talent-sprint/`

## 3. 最短上線步驟

### 建立 repo
1. 到 GitHub 建立一個新的 repository。
2. 建議設為 `Public`，這樣學生手機可以直接開。

### 上傳專案
如果你用 Git：

```powershell
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/你的帳號/你的repo.git
git push -u origin main
```

### 啟用 GitHub Pages
1. 打開 repository。
2. 進入 `Settings`。
3. 點左側 `Pages`。
4. `Source` 選 `Deploy from a branch`。
5. `Branch` 選 `main`。
6. Folder 選 `/ (root)`。
7. 按 `Save`。

## 4. 正式網址長什麼樣
- 啟用後通常會是：
  - `https://你的帳號.github.io/你的repo/`

例如：
- `https://harry-example.github.io/ai-lab-talent-sprint/`

正式 QR Code 應該指向這個網址，不要再用本機 IP。

## 5. 上線後必做檢查
- 用電腦開一次正式網址。
- 用手機 Wi‑Fi 開一次。
- 用手機 4G/5G 再開一次。
- 確認首頁、答題、結果卡都正常。
- 如果要雲端排行榜，再確認 `config.js` 的 Supabase 設定已經改成正式值。

## 6. 如果要給學生當天使用
- 請用 GitHub Pages 的正式網址產生 QR Code。
- 建議同時準備一個短網址。
- 活動前至少用 2 支不同手機實測。

## 7. 目前這份專案在 GitHub Pages 上的注意事項
- 本機 `preview-server.js` 不需要上線執行，它只是本地測試工具。
- 若之後有修改內容，只要重新 `git push`，GitHub Pages 就會更新。
- `config.js` 若填入正式 Supabase 金鑰，記得這是公開前端設定，只能使用 anon key，不要放 service role key。
