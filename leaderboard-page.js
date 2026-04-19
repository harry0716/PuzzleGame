const leaderboardModePage = document.querySelector("#leaderboard-mode-page");
const standaloneBoard = document.querySelector("#standalone-board");
const refreshStandalone = document.querySelector("#refresh-standalone");
const clearStandalone = document.querySelector("#clear-standalone");

function renderStandaloneBoard(entries) {
  standaloneBoard.innerHTML = "";
  if (!entries.length) {
    const item = document.createElement("li");
    item.className = "leaderboard-row empty";
    item.textContent = "目前還沒有排行榜資料。";
    standaloneBoard.appendChild(item);
    return;
  }

  entries.forEach((entry, index) => {
    const item = document.createElement("li");
    item.className = `leaderboard-row rank-${Math.min(index + 1, 4)}`;
    item.innerHTML = `
      <span class="leaderboard-rank">#${index + 1}</span>
      <div class="leaderboard-entry-main">
        <strong>${entry.player}</strong>
        <small>${entry.talent}</small>
      </div>
      <div class="leaderboard-entry-score">${entry.score} 分</div>
    `;
    standaloneBoard.appendChild(item);
  });
}

async function loadStandaloneBoard() {
  leaderboardModePage.textContent = window.LeaderboardShared.hasSharedLeaderboard()
    ? "Supabase 雲端排行榜"
    : "本機排行榜";
  const entries = await window.LeaderboardShared.getLeaderboardEntries();
  renderStandaloneBoard(entries);
}

refreshStandalone.addEventListener("click", () => {
  loadStandaloneBoard();
});

clearStandalone.addEventListener("click", async () => {
  const isShared = window.LeaderboardShared.hasSharedLeaderboard();
  const confirmed = window.confirm(
    isShared
      ? "確定要重置雲端排行榜嗎？目前活動代碼下的分數都會被刪除。"
      : "確定要清空目前裝置上的排行榜嗎？"
  );
  if (!confirmed) {
    return;
  }

  try {
    await window.LeaderboardShared.clearLeaderboardEntries();
    loadStandaloneBoard();
  } catch (error) {
    window.alert(
      isShared
        ? "雲端排行榜重置失敗，請確認 Supabase 已開啟 delete 權限。"
        : "本機排行榜清空失敗。"
    );
  }
});

function registerLeaderboardServiceWorker() {
  if (!("serviceWorker" in navigator)) {
    return;
  }

  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js?v=20260419c").catch(() => {});
  });
}

registerLeaderboardServiceWorker();
loadStandaloneBoard();
