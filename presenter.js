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
const presenterEntryMode = document.querySelector("#presenter-entry-mode");
const presenterEntryModeHint = document.querySelector("#presenter-entry-mode-hint");
const presenterParams = new URLSearchParams(window.location.search);

const ENTRY_MODES = {
  locked: {
    label: "鎖定入口",
    description: "掃碼後直接進入指定場景，且不顯示其他場景。"
  },
  open: {
    label: "一般入口",
    description: "掃碼後進入指定場景，但仍保留一般多場景導覽能力。"
  }
};

const DEFAULT_PUBLIC_BASE_URL =
  window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost"
    ? "https://harry0716.github.io/PuzzleGame/"
    : new URL("./", window.location.href).toString();

function getPresenterScenes() {
  return window.SceneRegistry?.getAllScenes?.() || [];
}

function getSelectedScene() {
  return (
    getPresenterScenes().find((scene) => scene.id === presenterScene.dataset.selectedScene) ||
    getPresenterScenes()[0] ||
    null
  );
}

function getSelectedEntryMode() {
  return presenterEntryMode?.dataset.entryMode || "locked";
}

function buildPlayUrl() {
  const baseUrl = presenterBaseUrl.value.trim() || DEFAULT_PUBLIC_BASE_URL;
  const scene = getSelectedScene();
  const url = new URL("./index.html", baseUrl);
  if (scene?.id) {
    url.searchParams.set("scene", scene.id);
  }
  if (getSelectedEntryMode() === "locked") {
    url.searchParams.set("locked", "1");
  } else {
    url.searchParams.delete("locked");
  }
  return url.toString();
}

function syncPresenterQr() {
  const playUrl = buildPlayUrl();
  const scene = getSelectedScene();
  presenterQr.src = `https://quickchart.io/qr?text=${encodeURIComponent(playUrl)}&size=360`;
  presenterUrl.textContent = playUrl;
  if (presenterSceneLabel && scene) {
    presenterSceneLabel.textContent = `目前導流場景：${scene.title}｜${ENTRY_MODES[getSelectedEntryMode()].label}`;
  }
}

function populatePresenterEntryMode() {
  if (!presenterEntryMode || !presenterEntryModeHint) {
    return;
  }

  const initialMode = presenterParams.get("locked") === "1" ? "locked" : (presenterEntryMode.dataset.entryMode || "locked");
  presenterEntryMode.dataset.entryMode = initialMode;
  presenterEntryMode.innerHTML = Object.entries(ENTRY_MODES)
    .map(([key, mode]) => {
      const isActive = key === presenterEntryMode.dataset.entryMode;
      return `<button class="preset-option${isActive ? " is-active" : ""}" type="button" data-entry-mode="${key}">${mode.label}</button>`;
    })
    .join("");
  presenterEntryModeHint.textContent = ENTRY_MODES[presenterEntryMode.dataset.entryMode].description;

  presenterEntryMode.querySelectorAll("[data-entry-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      presenterEntryMode.dataset.entryMode = button.dataset.entryMode;
      if (button.dataset.entryMode === "locked") {
        presenterParams.set("locked", "1");
      } else {
        presenterParams.delete("locked");
      }
      window.history.replaceState({}, "", `${window.location.pathname}?${presenterParams.toString()}`);
      populatePresenterEntryMode();
      syncPresenterQr();
    });
  });
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
    item.textContent = "目前還沒有排行榜紀錄。";
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
    presenterBoardCopy.textContent = `目前顯示的是 ${scene.title} 對應的排行榜資料。`;
  }
  presenterMode.textContent = window.LeaderboardShared.hasSharedLeaderboard({
    eventCode: scene?.leaderboard?.eventCode
  })
    ? "Supabase 雲端模式"
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
populatePresenterEntryMode();
syncPresenterQr();

presenterBaseUrl.addEventListener("input", () => {
  syncPresenterQr();
});

function registerPresenterServiceWorker() {
  if (!("serviceWorker" in navigator)) {
    return;
  }

  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js?v=20260419g").catch(() => {});
  });
}

registerPresenterServiceWorker();
window.setInterval(loadPresenterBoard, 5000);
loadPresenterBoard();
