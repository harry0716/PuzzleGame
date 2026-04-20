const presenterMode = document.querySelector("#presenter-mode");
const presenterBoard = document.querySelector("#presenter-board");
const refreshPresenter = document.querySelector("#refresh-presenter");
const presenterQr = document.querySelector("#presenter-qr");
const presenterUrl = document.querySelector("#presenter-url");
const presenterScene = document.querySelector("#presenter-scene");
const presenterModule = document.querySelector("#presenter-module");
const presenterModuleHint = document.querySelector("#presenter-module-hint");
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
    description: "學生掃碼後會直接進入指定場景，並鎖定在該活動流程裡。"
  },
  open: {
    label: "一般入口",
    description: "學生掃碼後仍可看到一般入口流程，適合自由探索。"
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
  return getPresenterScenes().find((scene) => scene.id === presenterScene.dataset.selectedScene) || null;
}

function getEnabledModulesForScene(scene) {
  return scene?.modules?.filter((module) => module.enabled !== false) || [];
}

function getSelectedModule() {
  const scene = getSelectedScene();
  const selectedModuleId = presenterModule?.dataset.selectedModule || "";
  return getEnabledModulesForScene(scene).find((module) => module.id === selectedModuleId) || null;
}

function getSelectedEntryMode() {
  return presenterEntryMode?.dataset.entryMode || "locked";
}

function getActiveEventCode() {
  const scene = getSelectedScene();
  const module = getSelectedModule();
  return module?.leaderboard?.eventCode || scene?.leaderboard?.eventCode;
}

function getLocalBoardKey() {
  const scene = getSelectedScene();
  const module = getSelectedModule();
  if (!scene) {
    return undefined;
  }
  return module ? `ai-lab-board:${scene.id}:${module.id}` : `ai-lab-board:${scene.id}`;
}

function buildPlayUrl() {
  const baseUrl = presenterBaseUrl.value.trim() || DEFAULT_PUBLIC_BASE_URL;
  const scene = getSelectedScene();
  const module = getSelectedModule();
  const url = new URL("./index.html", baseUrl);

  if (scene?.id) {
    url.searchParams.set("scene", scene.id);
  }

  if (module?.id) {
    url.searchParams.set("module", module.id);
  } else {
    url.searchParams.delete("module");
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
  const module = getSelectedModule();
  const mode = ENTRY_MODES[getSelectedEntryMode()];

  presenterQr.src = `https://quickchart.io/qr?text=${encodeURIComponent(playUrl)}&size=360`;
  presenterUrl.textContent = playUrl;

  if (presenterSceneLabel) {
    presenterSceneLabel.textContent = module
      ? `目前導流：${scene.title} / ${module.title} / ${mode.label}`
      : `目前導流：${scene?.title || "未選擇"} / ${mode.label}`;
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
      const active = key === presenterEntryMode.dataset.entryMode;
      return `<button class="preset-option${active ? " is-active" : ""}" type="button" data-entry-mode="${key}" aria-pressed="${active ? "true" : "false"}">${mode.label}</button>`;
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

function populatePresenterModuleSelect() {
  const scene = getSelectedScene();
  const modules = getEnabledModulesForScene(scene);

  if (!presenterModule || !presenterModuleHint) {
    return;
  }

  if (!modules.length) {
    presenterModule.dataset.selectedModule = "";
    presenterParams.delete("module");
    presenterModule.innerHTML = `<button class="preset-option is-active" type="button" disabled>不分題組</button>`;
    presenterModuleHint.textContent = "目前這個場景不需要再選題組，掃碼後會直接進入該場景。";
    return;
  }

  const requestedModuleId = presenterParams.get("module");
  const selectedModuleId =
    modules.some((module) => module.id === presenterModule.dataset.selectedModule)
      ? presenterModule.dataset.selectedModule
      : modules.some((module) => module.id === requestedModuleId)
        ? requestedModuleId
        : modules[0].id;

  presenterModule.dataset.selectedModule = selectedModuleId;
  presenterParams.set("module", selectedModuleId);

  presenterModule.innerHTML = modules
    .map((module) => {
      const active = module.id === presenterModule.dataset.selectedModule;
      return `<button class="preset-option${active ? " is-active" : ""}" type="button" data-module-id="${module.id}" aria-pressed="${active ? "true" : "false"}">${module.title}</button>`;
    })
    .join("");

  const selectedModule = modules.find((module) => module.id === selectedModuleId);
  presenterModuleHint.textContent = `已選題組：${selectedModule.title}。掃碼後會直接進入這個題組的活動流程。`;

  presenterModule.querySelectorAll("[data-module-id]").forEach((button) => {
    button.addEventListener("click", () => {
      presenterModule.dataset.selectedModule = button.dataset.moduleId;
      presenterParams.set("module", button.dataset.moduleId);
      window.history.replaceState({}, "", `${window.location.pathname}?${presenterParams.toString()}`);
      populatePresenterModuleSelect();
      syncPresenterQr();
      loadPresenterBoard();
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
      const active = scene.id === presenterScene.dataset.selectedScene;
      return `<button class="preset-option${active ? " is-active" : ""}" type="button" data-scene-id="${scene.id}" aria-pressed="${active ? "true" : "false"}">${scene.title}</button>`;
    })
    .join("");

  presenterScene.querySelectorAll("[data-scene-id]").forEach((button) => {
    button.addEventListener("click", () => {
      presenterScene.dataset.selectedScene = button.dataset.sceneId;
      presenterParams.set("scene", button.dataset.sceneId);
      presenterParams.delete("module");
      window.history.replaceState({}, "", `${window.location.pathname}?${presenterParams.toString()}`);
      populatePresenterSceneSelect();
      populatePresenterModuleSelect();
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
  const module = getSelectedModule();
  const boardLabel = module ? `${scene.title} / ${module.title}` : scene?.title || "未選擇場景";

  if (presenterBoardTitle) {
    presenterBoardTitle.textContent = `${boardLabel} 排行榜`;
  }

  if (presenterBoardCopy) {
    presenterBoardCopy.textContent = module
      ? `目前顯示的是 ${module.title} 的成績。`
      : `目前顯示的是 ${boardLabel} 的成績。`;
  }

  presenterMode.textContent = window.LeaderboardShared.hasSharedLeaderboard({
    eventCode: getActiveEventCode()
  })
    ? "Supabase 雲端模式"
    : "本機模式";

  const entries = await window.LeaderboardShared.getLeaderboardEntries({
    eventCode: getActiveEventCode(),
    localKey: getLocalBoardKey()
  });
  renderPresenterBoard(entries);
}

refreshPresenter.addEventListener("click", () => {
  loadPresenterBoard();
});

presenterBaseUrl.value = DEFAULT_PUBLIC_BASE_URL;
populatePresenterSceneSelect();
populatePresenterModuleSelect();
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
    navigator.serviceWorker.register("./service-worker.js?v=20260420b").catch(() => {});
  });
}

registerPresenterServiceWorker();
window.setInterval(loadPresenterBoard, 5000);
loadPresenterBoard();
