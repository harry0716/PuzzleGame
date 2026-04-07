const leaderboardModePage = document.querySelector("#leaderboard-mode-page");
const standaloneBoard = document.querySelector("#standalone-board");
const refreshStandalone = document.querySelector("#refresh-standalone");

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

loadStandaloneBoard();
