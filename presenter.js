const presenterMode = document.querySelector("#presenter-mode");
const presenterBoard = document.querySelector("#presenter-board");
const refreshPresenter = document.querySelector("#refresh-presenter");
const presenterQr = document.querySelector("#presenter-qr");
const presenterUrl = document.querySelector("#presenter-url");

const gameUrl = new URL("./index.html", window.location.href).toString();
presenterQr.src = `https://quickchart.io/qr?text=${encodeURIComponent(gameUrl)}&size=360`;
presenterUrl.textContent = gameUrl;

function renderPresenterBoard(entries) {
  presenterBoard.innerHTML = "";
  if (!entries.length) {
    const item = document.createElement("li");
    item.className = "leaderboard-row empty";
    item.textContent = "目前還沒有排行榜資料。";
    presenterBoard.appendChild(item);
    return;
  }

  entries.forEach((entry, index) => {
    const item = document.createElement("li");
    item.className = `leaderboard-row presenter-row rank-${Math.min(index + 1, 4)}`;
    item.innerHTML = `
      <span class="leaderboard-rank">#${index + 1}</span>
      <div class="leaderboard-entry-main">
        <strong>${entry.player}</strong>
        <small>${entry.talent}</small>
      </div>
      <div class="leaderboard-entry-score">${entry.score} 分</div>
    `;
    presenterBoard.appendChild(item);
  });
}

async function loadPresenterBoard() {
  presenterMode.textContent = window.LeaderboardShared.hasSharedLeaderboard()
    ? "Supabase 雲端模式"
    : "本機模式";
  const entries = await window.LeaderboardShared.getLeaderboardEntries();
  renderPresenterBoard(entries);
}

refreshPresenter.addEventListener("click", () => {
  loadPresenterBoard();
});

window.setInterval(loadPresenterBoard, 5000);
loadPresenterBoard();
