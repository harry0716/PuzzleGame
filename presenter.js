const presenterMode = document.querySelector("#presenter-mode");
const presenterBoard = document.querySelector("#presenter-board");
const refreshPresenter = document.querySelector("#refresh-presenter");
const presenterQr = document.querySelector("#presenter-qr");
const presenterUrl = document.querySelector("#presenter-url");
const presenterScene = document.querySelector("#presenter-scene");
const presenterBaseUrl = document.querySelector("#presenter-base-url");

const DEFAULT_PUBLIC_BASE_URL =
  window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost"
    ? "https://harry0716.github.io/PuzzleGame/"
    : new URL("./", window.location.href).toString();

function getPresenterScenes() {
  return window.SceneRegistry?.getAllScenes?.() || [];
}

function getSelectedScene() {
  return getPresenterScenes().find((scene) => scene.id === presenterScene.value) || getPresenterScenes()[0] || null;
}

function buildPlayUrl() {
  const baseUrl = presenterBaseUrl.value.trim() || DEFAULT_PUBLIC_BASE_URL;
  const scene = getSelectedScene();
  const url = new URL("./index.html", baseUrl);
  if (scene?.id) {
    url.searchParams.set("scene", scene.id);
  }
  return url.toString();
}

function syncPresenterQr() {
  const playUrl = buildPlayUrl();
  presenterQr.src = `https://quickchart.io/qr?text=${encodeURIComponent(playUrl)}&size=360`;
  presenterUrl.textContent = playUrl;
}

function populatePresenterSceneSelect() {
  presenterScene.innerHTML = getPresenterScenes()
    .map((scene) => `<option value="${scene.id}">${scene.title}</option>`)
    .join("");
}

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
  const scene = getSelectedScene();
  presenterMode.textContent = window.LeaderboardShared.hasSharedLeaderboard({
    eventCode: scene?.leaderboard?.eventCode
  })
    ? "Supabase 共用雲端模式"
    : "本機模式";

  const entries = await window.LeaderboardShared.getLeaderboardEntries({
    eventCode: scene?.leaderboard?.eventCode,
    localKey: scene ? `ai-lab-board:${scene.id}` : undefined
  });
  renderPresenterBoard(entries);
}

refreshPresenter.addEventListener("click", () => {
  loadPresenterBoard();
});

presenterBaseUrl.value = DEFAULT_PUBLIC_BASE_URL;
populatePresenterSceneSelect();
syncPresenterQr();

presenterScene.addEventListener("change", () => {
  syncPresenterQr();
  loadPresenterBoard();
});

presenterBaseUrl.addEventListener("input", () => {
  syncPresenterQr();
});

window.setInterval(loadPresenterBoard, 5000);
loadPresenterBoard();
