const presenterMode = document.querySelector("#presenter-mode");
const presenterBoard = document.querySelector("#presenter-board");
const refreshPresenter = document.querySelector("#refresh-presenter");
const presenterQr = document.querySelector("#presenter-qr");
const presenterUrl = document.querySelector("#presenter-url");
const presenterScene = document.querySelector("#presenter-scene");
const presenterBaseUrl = document.querySelector("#presenter-base-url");
const presenterSceneLabel = document.querySelector("#presenter-scene-label");
const presenterBoardTitle = document.querySelector("#presenter-board-title");
const presenterBoardCopy = document.querySelector("#presenter-board-copy");
const presenterParams = new URLSearchParams(window.location.search);

const DEFAULT_PUBLIC_BASE_URL =
  window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost"
    ? "https://harry0716.github.io/PuzzleGame/"
    : new URL("./", window.location.href).toString();

function getPresenterScenes() {
  return window.SceneRegistry?.getAllScenes?.() || [];
}

function getSelectedScene() {
  return getPresenterScenes().find((scene) => scene.id === presenterScene.dataset.selectedScene) || getPresenterScenes()[0] || null;
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
  const scene = getSelectedScene();
  presenterQr.src = `https://quickchart.io/qr?text=${encodeURIComponent(playUrl)}&size=360`;
  presenterUrl.textContent = playUrl;
  if (presenterSceneLabel && scene) {
    presenterSceneLabel.textContent = `目前導流場景：${scene.title}`;
  }
}

function populatePresenterSceneSelect() {
  const scenes = getPresenterScenes();
  const initialSceneId = presenterParams.get("scene");
  const defaultSceneId =
    presenterScene.dataset.selectedScene ||
    (scenes.some((scene) => scene.id === initialSceneId) ? initialSceneId : "") ||
    scenes[0]?.id ||
    "";
  presenterScene.dataset.selectedScene = defaultSceneId;
  presenterScene.innerHTML = scenes
    .map((scene) => {
      const isActive = scene.id === presenterScene.dataset.selectedScene;
      return `<button class="preset-option${isActive ? " is-active" : ""}" type="button" data-scene-id="${scene.id}">${scene.title}</button>`;
    })
    .join("");

  presenterScene.querySelectorAll("[data-scene-id]").forEach((button) => {
    button.addEventListener("click", () => {
      presenterScene.dataset.selectedScene = button.dataset.sceneId;
      presenterParams.set("scene", button.dataset.sceneId);
      window.history.replaceState({}, "", `${window.location.pathname}?${presenterParams.toString()}`);
      populatePresenterSceneSelect();
      syncPresenterQr();
      loadPresenterBoard();
    });
  });
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
  if (presenterBoardTitle && scene) {
    presenterBoardTitle.textContent = `${scene.title} 排行榜`;
  }
  if (presenterBoardCopy && scene) {
    presenterBoardCopy.textContent = `右側顯示的是 ${scene.title} 對應的排行榜資料。`;
  }
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

presenterBaseUrl.addEventListener("input", () => {
  syncPresenterQr();
});

function registerPresenterServiceWorker() {
  if (!("serviceWorker" in navigator)) {
    return;
  }

  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js?v=20260419d").catch(() => {});
  });
}

registerPresenterServiceWorker();
window.setInterval(loadPresenterBoard, 5000);
loadPresenterBoard();
