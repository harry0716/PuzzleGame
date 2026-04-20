const presenterMode = document.querySelector("#presenter-mode");
const presenterBoard = document.querySelector("#presenter-board");
const refreshPresenter = document.querySelector("#refresh-presenter");
const presenterQr = document.querySelector("#presenter-qr");
const presenterUrl = document.querySelector("#presenter-url");
const presenterScene = document.querySelector("#presenter-scene");
const presenterModule = document.querySelector("#presenter-module");
const presenterModuleHint = document.querySelector("#presenter-module-hint");
const presenterDifficulty = document.querySelector("#presenter-difficulty");
const presenterDifficultyHint = document.querySelector("#presenter-difficulty-hint");
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

const DIFFICULTY_LEVELS = {
  easy: { label: "初階 / easy", shortLabel: "初階" },
  medium: { label: "標準 / medium", shortLabel: "標準" },
  hard: { label: "進階 / hard", shortLabel: "進階" }
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

function getSelectedDifficulty() {
  const requestedDifficulty = presenterDifficulty?.dataset.selectedDifficulty || presenterParams.get("difficulty") || "medium";
  return DIFFICULTY_LEVELS[requestedDifficulty] ? requestedDifficulty : "medium";
}

function getSelectedDifficultyConfig() {
  return DIFFICULTY_LEVELS[getSelectedDifficulty()] || DIFFICULTY_LEVELS.medium;
}

function appendDifficultySuffix(baseValue) {
  if (!baseValue) {
    return baseValue;
  }

  const suffix = `-${getSelectedDifficulty()}`;
  return baseValue.endsWith(suffix) ? baseValue : `${baseValue}${suffix}`;
}

function getActiveEventCode() {
  const scene = getSelectedScene();
  const module = getSelectedModule();
  return appendDifficultySuffix(module?.leaderboard?.eventCode || scene?.leaderboard?.eventCode);
}

function getLocalBoardKey() {
  const scene = getSelectedScene();
  const module = getSelectedModule();
  if (!scene) {
    return undefined;
  }
  const baseKey = module ? `ai-lab-board:${scene.id}:${module.id}` : `ai-lab-board:${scene.id}`;
  return `${baseKey}:${getSelectedDifficulty()}`;
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

  url.searchParams.set("difficulty", getSelectedDifficulty());

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

function syncPresenterStatusLabel() {
  const scene = getSelectedScene();
  const module = getSelectedModule();
  const mode = ENTRY_MODES[getSelectedEntryMode()];
  const difficulty = getSelectedDifficultyConfig();

  if (!presenterSceneLabel) {
    return;
  }

  const sceneLabel = scene?.title || "未選場景";
  const moduleLabel = module ? ` / ${module.title}` : "";
  presenterSceneLabel.textContent = `目前導流：${sceneLabel}${moduleLabel} / ${difficulty.shortLabel} / ${mode.label}`;
}

function populatePresenterDifficulty() {
  if (!presenterDifficulty || !presenterDifficultyHint) {
    return;
  }

  const selectedDifficulty = getSelectedDifficulty();
  presenterDifficulty.dataset.selectedDifficulty = selectedDifficulty;
  presenterParams.set("difficulty", selectedDifficulty);

  presenterDifficulty.innerHTML = Object.entries(DIFFICULTY_LEVELS)
    .map(([key, difficulty]) => {
      const active = key === selectedDifficulty;
      return `<button class="preset-option${active ? " is-active" : ""}" type="button" data-difficulty="${key}" aria-pressed="${active ? "true" : "false"}">${difficulty.label}</button>`;
    })
    .join("");

  presenterDifficultyHint.textContent = `已選難度：${getSelectedDifficultyConfig().label}。掃碼後會直接用這個難度進入活動。`;

  presenterDifficulty.querySelectorAll("[data-difficulty]").forEach((button) => {
    button.addEventListener("click", () => {
      presenterDifficulty.dataset.selectedDifficulty = button.dataset.difficulty;
      presenterParams.set("difficulty", button.dataset.difficulty);
      window.history.replaceState({}, "", `${window.location.pathname}?${presenterParams.toString()}`);
      populatePresenterDifficulty();
      syncPresenterQr();
      syncPresenterStatusLabel();
      loadPresenterBoard();
    });
  });
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
      syncPresenterStatusLabel();
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
      syncPresenterStatusLabel();
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
      populatePresenterDifficulty();
      syncPresenterQr();
      syncPresenterStatusLabel();
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

  const difficultyLabel = getSelectedDifficultyConfig().label;
  const displayLabel = module
    ? `${scene.title} / ${module.title} / ${difficultyLabel}`
    : `${scene?.title || "未選場景"} / ${difficultyLabel}`;

  if (presenterBoardTitle) {
    presenterBoardTitle.textContent = `${displayLabel} 排行榜`;
  }

  if (presenterBoardCopy) {
    presenterBoardCopy.textContent = module
      ? `目前顯示 ${module.title} 的 ${difficultyLabel} 排行榜。`
      : `目前顯示 ${displayLabel} 的排行榜。`;
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
populatePresenterDifficulty();
populatePresenterEntryMode();
syncPresenterQr();
syncPresenterStatusLabel();

presenterBaseUrl.addEventListener("input", () => {
  syncPresenterQr();
  syncPresenterStatusLabel();
});

function registerPresenterServiceWorker() {
  if (!("serviceWorker" in navigator)) {
    return;
  }

  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js?v=20260420e").catch(() => {});
  });
}

registerPresenterServiceWorker();
window.setInterval(loadPresenterBoard, 5000);
loadPresenterBoard();
