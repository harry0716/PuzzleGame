# 部署與網站化說明

## 1. 現在已具備的靜態網站能力
- 可直接部署到 GitHub Pages、Netlify、Vercel 或任何靜態空間。
- 已加入 `manifest.webmanifest`，可作為手機安裝式網頁。
- 已加入 `service-worker.js`，可快取核心檔案，現場網路不穩時更穩定。
- 已提供 `icon.svg`、`netlify.toml`、`vercel.json`，部署時不需要再額外補設定。

## 2. 最快部署方式

### GitHub Pages
1. 建立一個公開的 GitHub repository。
2. 將專案內容 push 到 `main` branch。
3. 到 `Settings -> Pages`。
4. Source 選 `Deploy from a branch`。
5. Branch 選 `main`，Folder 選 `/ (root)`。
6. 儲存後等待 GitHub 產生正式網址。
7. 用正式網址產生 QR Code 給學生掃。

### Netlify
1. 把整個資料夾上傳到 Netlify。
2. Publish directory 設為專案根目錄。
3. 部署完成後取得網址。
4. 將該網址轉成 QR Code，投影到現場即可。

### Vercel
1. 匯入此資料夾或 Git 儲存庫。
2. Framework Preset 選 `Other`。
3. 不需要 build command。
4. 部署完成後即可使用。

## 3. 現場部署建議
- 活動前一天先在 2 至 3 支手機上測試網址開啟速度。
- 現場用短網址或 QR Code，避免學生手打網址。
- 若有校內 Wi-Fi，先確認手機是否能正常開啟靜態站。
- 若怕網路波動，建議主持人備一台已打開網站的平板或筆電作示範。

## 4. MVP 已完成 vs 仍需外部設定

### 已完成
- 靜態網站結構
- 手機優先 RWD
- 可安裝式 Web App
- 快取與離線基礎保護
- 本機排行榜
- 共用排行榜介面支援

### 仍需你填值才會啟用
- 若要全班共用排行榜，需在 `config.js` 中填入 Supabase 設定。
