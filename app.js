const GAME_DURATION = 12;
const MAX_LEADERBOARD = 8;
const LOCAL_BOARD_KEY = "ai-lab-board";
const TIMER_PRESET_KEY = "ai-lab-timer-preset";
const TIMER_CUSTOM_SECONDS_KEY = "ai-lab-custom-timer-seconds";
const SCORING_MODE_KEY = "ai-lab-scoring-mode";
const TIMER_PRESETS = {
  relaxed: { label: "從容模式", multiplier: 1.6, description: "每題時間延長，適合導覽或首次體驗。" },
  standard: { label: "標準模式", multiplier: 1, description: "維持目前預設節奏。" },
  challenge: { label: "挑戰模式", multiplier: 0.8, description: "節奏較快，適合熟悉流程後使用。" },
  custom: { label: "自訂秒數", multiplier: 1, description: "手動輸入每題秒數，適合依現場狀況調整。" }
};

const SCORING_MODES = {
  showcase: { label: "展示模式", description: "保留較明顯的速度差異，適合自由體驗與展示活動。" },
  competition: { label: "競賽模式", description: "以答對為主、速度為輔，較適合正式闖關與排行。" }
};

const APP_CONFIG = window.APP_CONFIG || {
  appName: "AI Lab Talent Sprint",
  leaderboard: {
    provider: "local",
    supabaseUrl: "",
    supabaseAnonKey: "",
    table: "leaderboard_entries",
    eventCode: "ai-lab-visit"
  }
};

const SEARCH_PARAMS = new URLSearchParams(window.location.search);
const AUTO_PLAY = SEARCH_PARAMS.get("autoplay") === "1";
const INITIAL_SCENE_ID = SEARCH_PARAMS.get("scene");
const LOCKED_MODE = SEARCH_PARAMS.get("locked") === "1";
const SCENES = window.SceneRegistry?.getAllScenes?.() || [];

const app = document.querySelector("#app");
const deployStatusNode = document.querySelector("#deploy-status");
const leaderboardModeNode = document.querySelector("#leaderboard-mode");
const heroEyebrowNode = document.querySelector("#hero-eyebrow");
const heroTitleNode = document.querySelector("#hero-title");
const heroCopyNode = document.querySelector("#hero-copy");

const state = {
  currentSceneId: INITIAL_SCENE_ID || null,
  index: 0,
  score: 0,
  correct: 0,
  answers: [],
  player: "玩家",
  questionLocked: false,
  traitCount: {},
  orderingDraft: [],
  matchingDraft: {},
  currentQuestionId: null,
  pendingNextQuestionId: null,
  currentQuestionType: null,
  timerPresetKey: window.localStorage.getItem(TIMER_PRESET_KEY) || "standard",
  customTimerSeconds: window.localStorage.getItem(TIMER_CUSTOM_SECONDS_KEY) || "15",
  scoringModeKey: window.localStorage.getItem(SCORING_MODE_KEY) || "showcase"
};

let timerId = null;
let timeLeft = GAME_DURATION;
let questionStart = 0;
let autoPlayAnswerTimer = null;

function getCurrentScene() {
  return SCENES.find((scene) => scene.id === state.currentSceneId) || null;
}

function isLockedSceneMode() {
  return LOCKED_MODE;
}

function getSceneQuestions() {
  return getCurrentScene()?.questions || [];
}

function getQuestionById(questionId) {
  return getSceneQuestions().find((question) => question.id === questionId) || null;
}

function getCurrentQuestion() {
  if (state.currentQuestionId) {
    return getQuestionById(state.currentQuestionId);
  }

  return getSceneQuestions()[0] || null;
}

function shuffleArray(items, options = {}) {
  const {
    avoidSameOrder = false,
    avoidSameIndexForId = null
  } = options;

  if (!Array.isArray(items) || items.length < 2) {
    return [...items];
  }

  const originalItems = [...items];
  const originalIndexById = new Map(
    originalItems.map((item, index) => [item?.id ?? index, index])
  );

  const isSameOrder = (candidate) =>
    candidate.every((item, index) => (item?.id ?? index) === (originalItems[index]?.id ?? index));

  const isTrackedItemAtSameIndex = (candidate) => {
    if (!avoidSameIndexForId) {
      return false;
    }

    const originalIndex = originalIndexById.get(avoidSameIndexForId);
    const nextIndex = candidate.findIndex((item) => item?.id === avoidSameIndexForId);
    return originalIndex !== undefined && originalIndex === nextIndex;
  };

  for (let attempt = 0; attempt < 8; attempt += 1) {
    const nextItems = [...originalItems];
    for (let index = nextItems.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [nextItems[index], nextItems[swapIndex]] = [nextItems[swapIndex], nextItems[index]];
    }

    if (avoidSameOrder && isSameOrder(nextItems)) {
      continue;
    }

    if (isTrackedItemAtSameIndex(nextItems)) {
      continue;
    }

    return nextItems;
  }

  const rotatedItems = [...originalItems.slice(1), originalItems[0]];
  if (!isTrackedItemAtSameIndex(rotatedItems)) {
    return rotatedItems;
  }

  return [...originalItems.slice(2), ...originalItems.slice(0, 2)];
}

function getSceneTalents() {
  return getCurrentScene()?.results || {};
}

function getTimerPreset() {
  return TIMER_PRESETS[state.timerPresetKey] || TIMER_PRESETS.standard;
}

function getScoringMode() {
  return SCORING_MODES[state.scoringModeKey] || SCORING_MODES.showcase;
}

function getCustomTimerSeconds() {
  const parsed = Number.parseInt(state.customTimerSeconds, 10);
  if (Number.isFinite(parsed)) {
    return Math.min(60, Math.max(6, parsed));
  }
  return 15;
}

function getEffectiveTimeLimit(question) {
  const scene = getCurrentScene();
  const baseTimeLimit = question.timeLimit || scene?.settings?.defaultTimeLimit || GAME_DURATION;
  if (state.timerPresetKey === "custom") {
    return getCustomTimerSeconds();
  }
  return Math.max(6, Math.round(baseTimeLimit * getTimerPreset().multiplier));
}

function calculateEarnedScore(timeLimit, elapsed) {
  const remaining = Math.max(0, timeLimit - elapsed);

  if (state.scoringModeKey === "competition") {
    const bonus = Math.round((remaining / Math.max(timeLimit, 1)) * 20);
    return 80 + bonus;
  }

  return 60 + (remaining * 8);
}

function getActiveEventCode() {
  return getCurrentScene()?.leaderboard?.eventCode || APP_CONFIG.leaderboard.eventCode;
}

function getDefaultTraitCount() {
  const results = getSceneTalents();
  return Object.keys(results).reduce((accumulator, key) => {
    accumulator[key] = 0;
    return accumulator;
  }, {});
}

function getLocalLeaderboardKey() {
  return `${LOCAL_BOARD_KEY}:${getCurrentScene()?.id || "default"}`;
}

function hasSharedLeaderboard() {
  const options = APP_CONFIG.leaderboard || {};
  return Boolean(
    options.provider === "supabase" &&
      options.supabaseUrl &&
      options.supabaseAnonKey &&
      options.table &&
      getActiveEventCode()
  );
}

const leaderboardStore = {
  mode: hasSharedLeaderboard() ? "shared" : "local",

  syncMode() {
    this.mode = hasSharedLeaderboard() ? "shared" : "local";
    updateHeaderMeta();
  },

  async getEntries() {
    this.syncMode();

    if (this.mode === "shared") {
      try {
        return await fetchSharedLeaderboard();
      } catch (error) {
        console.error("Shared leaderboard unavailable, fallback to local.", error);
        this.mode = "local";
        updateHeaderMeta();
      }
    }

    return getLocalLeaderboard();
  },

  async saveEntry(entry) {
    this.syncMode();

    if (this.mode === "shared") {
      try {
        await createSharedEntry(entry);
        return await fetchSharedLeaderboard();
      } catch (error) {
        console.error("Shared leaderboard save failed, fallback to local.", error);
        this.mode = "local";
        updateHeaderMeta();
      }
    }

    return saveLocalLeaderboard(entry);
  },

  async clearEntries() {
    this.syncMode();

    if (this.mode === "shared") {
      try {
        await window.LeaderboardShared.clearLeaderboardEntries({
          eventCode: getActiveEventCode()
        });
        return true;
      } catch (error) {
        console.error("Shared leaderboard clear failed.", error);
        return false;
      }
    }

    window.localStorage.removeItem(getLocalLeaderboardKey());
    return true;
  }
};

function renderTemplate(id) {
  const template = document.querySelector(id);
  return template.content.cloneNode(true);
}

function sanitizeNickname(value) {
  const trimmed = value.trim();
  return trimmed ? trimmed.slice(0, 12) : "玩家";
}

function resetState() {
  state.index = 0;
  state.score = 0;
  state.correct = 0;
  state.answers = [];
  state.questionLocked = false;
  state.traitCount = getDefaultTraitCount();
  state.orderingDraft = [];
  state.matchingDraft = {};
  state.currentQuestionId = null;
  state.pendingNextQuestionId = null;
  state.currentQuestionType = null;
  clearTimer();
}

function setCurrentScene(sceneId) {
  state.currentSceneId = sceneId;
  resetState();
  leaderboardStore.syncMode();
  updateHero();
}

function clearTimer() {
  if (timerId) {
    window.clearInterval(timerId);
    timerId = null;
  }

  if (autoPlayAnswerTimer) {
    window.clearTimeout(autoPlayAnswerTimer);
    autoPlayAnswerTimer = null;
  }
}

function updateHeaderMeta() {
  const scene = getCurrentScene();
  deployStatusNode.textContent = scene ? `場景：${scene.title}` : "靜態部署就緒";
  leaderboardModeNode.textContent =
    leaderboardStore.mode === "shared" ? "排行榜：共用雲端模式" : "排行榜：本機模式";
}

function updateHero() {
  const scene = getCurrentScene();

  if (!scene) {
    heroEyebrowNode.textContent = "MULTI SCENE PUZZLE GAME";
    heroTitleNode.textContent = APP_CONFIG.appName;
    heroCopyNode.textContent = "從前端切換不同活動場景，讓同一套互動遊戲可以對應不同參訪主題與展示需求。";
    updateHeaderMeta();
    return;
  }

  heroEyebrowNode.textContent = scene.hero?.eyebrow || scene.title.toUpperCase();
  heroTitleNode.textContent = scene.hero?.title || scene.title;
  heroCopyNode.textContent = scene.hero?.copy || scene.description;
  updateHeaderMeta();
}

function showLockedSceneUnavailable() {
  app.innerHTML = `
    <section class="screen">
      <h2>目前無法開啟指定場景</h2>
      <p class="hero-copy">這個活動入口需要有效的場景代碼。請重新確認 QR code 或活動網址。</p>
    </section>
  `;
}

function showSceneSelect() {
  if (isLockedSceneMode()) {
    if (getCurrentScene()) {
      showLanding();
    } else {
      showLockedSceneUnavailable();
    }
    return;
  }

  clearTimer();
  state.currentSceneId = null;
  updateHero();

  app.innerHTML = "";
  app.appendChild(renderTemplate("#scene-select-template"));

  const grid = document.querySelector("#scene-grid");
  SCENES.forEach((scene) => {
    const card = document.createElement("article");
    card.className = "scene-card";
    card.innerHTML = `
      <div class="scene-card-media" style="--scene-accent: ${scene.theme.accent}; --scene-surface: ${scene.theme.surface}; ${scene.previewImage ? `background-image: linear-gradient(rgba(9, 20, 32, 0.18), rgba(9, 20, 32, 0.18)), url('${scene.previewImage}'); background-size: cover; background-position: center;` : ""}">
        <span class="scene-card-chip">${scene.panel.badge}</span>
        <h3>${scene.title}</h3>
        <p>${scene.subtitle}</p>
      </div>
      <div class="scene-card-body">
        <p class="scene-card-description">${scene.description}</p>
        <div class="scene-card-tags">
          ${scene.panel.tags.map((tag) => `<span class="scene-tag">${tag}</span>`).join("")}
        </div>
        <div class="scene-card-meta">
          <span>${scene.questions.length} 題</span>
          <span>${scene.panel.level}</span>
        </div>
        <button class="cta-button scene-start-button" type="button">進入場景</button>
      </div>
    `;

    card.querySelector(".scene-start-button").addEventListener("click", () => {
      setCurrentScene(scene.id);
      showLanding();
    });

    grid.appendChild(card);
  });
}

function showLanding() {
  const scene = getCurrentScene();
  if (!scene) {
    if (isLockedSceneMode()) {
      showLockedSceneUnavailable();
    } else {
      showSceneSelect();
    }
    return;
  }

  clearTimer();
  updateHero();
  app.innerHTML = "";
  app.appendChild(renderTemplate("#landing-template"));

  document.querySelector("#scene-pill").textContent = scene.panel.badge;
  document.querySelector("#landing-title").textContent = scene.landing.title;
  document.querySelector("#landing-copy").textContent = scene.landing.copy;

  const timerPresetSelect = document.querySelector("#timer-preset");
  const timerPresetHint = document.querySelector("#timer-preset-hint");
  const customTimerWrap = document.querySelector("#custom-timer-wrap");
  const customTimerInput = document.querySelector("#custom-timer-seconds");
  if (timerPresetSelect && timerPresetHint) {
    const syncTimerUi = () => {
      if (customTimerInput) {
        customTimerInput.value = `${getCustomTimerSeconds()}`;
      }
      if (customTimerWrap) {
        customTimerWrap.hidden = state.timerPresetKey !== "custom";
      }
      timerPresetHint.textContent =
        state.timerPresetKey === "custom"
          ? `${getTimerPreset().description} 目前設定：${getCustomTimerSeconds()} 秒。`
          : getTimerPreset().description;
    };

    timerPresetSelect.innerHTML = Object.entries(TIMER_PRESETS)
      .map(
        ([key, preset]) => `
          <button
            class="preset-option ${key === state.timerPresetKey ? "is-active" : ""}"
            type="button"
            data-preset="${key}"
            aria-pressed="${key === state.timerPresetKey ? "true" : "false"}"
          >
            ${preset.label}
          </button>
        `
      )
      .join("");
    syncTimerUi();
    timerPresetSelect.querySelectorAll(".preset-option").forEach((button) => {
      button.addEventListener("click", () => {
        state.timerPresetKey = button.dataset.preset;
        window.localStorage.setItem(TIMER_PRESET_KEY, state.timerPresetKey);
        timerPresetSelect.querySelectorAll(".preset-option").forEach((item) => {
          const active = item.dataset.preset === state.timerPresetKey;
          item.classList.toggle("is-active", active);
          item.setAttribute("aria-pressed", active ? "true" : "false");
        });
        syncTimerUi();
      });
    });

    if (customTimerInput) {
      customTimerInput.value = `${getCustomTimerSeconds()}`;
      customTimerInput.addEventListener("input", (event) => {
        state.customTimerSeconds = event.target.value;
        window.localStorage.setItem(TIMER_CUSTOM_SECONDS_KEY, state.customTimerSeconds);
        if (state.timerPresetKey === "custom") {
          syncTimerUi();
        }
      });
      customTimerInput.addEventListener("blur", () => {
        state.customTimerSeconds = `${getCustomTimerSeconds()}`;
        window.localStorage.setItem(TIMER_CUSTOM_SECONDS_KEY, state.customTimerSeconds);
        syncTimerUi();
      });
    }
  }

  const scoringModeWrap = document.querySelector("#scoring-mode");
  const scoringModeHint = document.querySelector("#scoring-mode-hint");
  if (scoringModeWrap && scoringModeHint) {
    const syncScoringUi = () => {
      scoringModeHint.textContent = getScoringMode().description;
    };

    scoringModeWrap.innerHTML = Object.entries(SCORING_MODES)
      .map(
        ([key, mode]) => `
          <button
            class="preset-option ${key === state.scoringModeKey ? "is-active" : ""}"
            type="button"
            data-score-mode="${key}"
            aria-pressed="${key === state.scoringModeKey ? "true" : "false"}"
          >
            ${mode.label}
          </button>
        `
      )
      .join("");
    syncScoringUi();
    scoringModeWrap.querySelectorAll(".preset-option").forEach((button) => {
      button.addEventListener("click", () => {
        state.scoringModeKey = button.dataset.scoreMode;
        window.localStorage.setItem(SCORING_MODE_KEY, state.scoringModeKey);
        scoringModeWrap.querySelectorAll(".preset-option").forEach((item) => {
          const active = item.dataset.scoreMode === state.scoringModeKey;
          item.classList.toggle("is-active", active);
          item.setAttribute("aria-pressed", active ? "true" : "false");
        });
        syncScoringUi();
      });
    });
  }

  const rulesNode = document.querySelector("#scene-rules");
  scene.landing.rules.forEach((rule) => {
    const item = document.createElement("li");
    item.textContent = rule;
    rulesNode.appendChild(item);
  });

  const backToScenesButton = document.querySelector("#back-to-scenes");
  if (backToScenesButton) {
    backToScenesButton.hidden = isLockedSceneMode();
    if (!isLockedSceneMode()) {
      backToScenesButton.addEventListener("click", () => {
        showSceneSelect();
      });
    }
  }

  const form = document.querySelector("#player-form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const value = document.querySelector("#nickname").value;
    state.player = sanitizeNickname(value);
    resetState();
    showQuestion();
  });

  if (AUTO_PLAY) {
    document.querySelector("#nickname").value = "測試員";
    window.setTimeout(() => {
      state.player = "測試員";
      state.timerPresetKey = "standard";
      state.customTimerSeconds = "15";
      state.scoringModeKey = "showcase";
      resetState();
      showQuestion();
    }, 120);
  }
}

function showQuestion() {
  clearTimer();
  state.questionLocked = false;
  state.orderingDraft = [];
  state.matchingDraft = {};

  const scene = getCurrentScene();
  const questions = getSceneQuestions();
  const question = getCurrentQuestion();

  if (!scene || !question) {
    showResult();
    return;
  }

  state.currentQuestionType = question.type;
  app.innerHTML = "";
  app.appendChild(renderTemplate("#question-template"));

  document.querySelector("#question-number").textContent = `${state.index + 1}/${questions.length}`;
  document.querySelector("#question-title").textContent = question.prompt;
  document.querySelector("#question-description").textContent = question.description;

  renderQuestionByType(question);

  const timeLimit = getEffectiveTimeLimit(question);

  if (AUTO_PLAY) {
    scheduleAutoPlay(question);
  }

  questionStart = Date.now();
  timeLeft = timeLimit;
  updateTimerUI(timeLimit);
  timerId = window.setInterval(() => {
    timeLeft -= 1;
    updateTimerUI(timeLimit);
    if (timeLeft <= 0) {
      handleAnswer(getTimeoutPayload(question));
    }
  }, 1000);
}

function renderQuestionByType(question) {
  switch (question.type) {
    case "timed-choice":
      renderTimedChoiceQuestion(question);
      break;
    case "ordering":
      renderOrderingQuestion(question);
      break;
    case "matching":
      renderMatchingQuestion(question);
      break;
    case "image-choice":
      renderImageChoiceQuestion(question);
      break;
    case "branching":
      renderBranchingQuestion(question);
      break;
    case "single-choice":
    default:
      renderSingleChoiceQuestion(question);
      break;
  }
}

function renderTimedChoiceQuestion(question) {
  const list = document.querySelector("#answer-list");
  list.innerHTML = "";

  const intro = document.createElement("div");
  intro.className = "timed-question-callout";
  intro.innerHTML = `
    <strong>${question.countdownLabel || "限時決策"}</strong>
    <span>${question.urgencyText || "這題秒數更短，請快速判斷最合理的答案。"}</span>
  `;
  list.appendChild(intro);

  shuffleArray(question.answers, {
    avoidSameOrder: true,
    avoidSameIndexForId: question.correctId
  }).forEach((answer) => {
    const button = document.createElement("button");
    button.className = "answer-button";
    button.type = "button";
    button.innerHTML = `<strong>${answer.label}</strong><small>${answer.detail}</small>`;
    button.addEventListener("click", () => handleAnswer(answer.id));
    list.appendChild(button);
  });
}

function renderSingleChoiceQuestion(question) {
  const list = document.querySelector("#answer-list");
  list.innerHTML = "";

  shuffleArray(question.answers, {
    avoidSameOrder: true,
    avoidSameIndexForId: question.correctId
  }).forEach((answer) => {
    const button = document.createElement("button");
    button.className = "answer-button";
    button.type = "button";
    button.innerHTML = `<strong>${answer.label}</strong><small>${answer.detail}</small>`;
    button.addEventListener("click", () => handleAnswer(answer.id));
    list.appendChild(button);
  });
}

function renderBranchingQuestion(question) {
  const list = document.querySelector("#answer-list");
  list.innerHTML = "";

  shuffleArray(question.choices, {
    avoidSameOrder: true
  }).forEach((choice) => {
    const button = document.createElement("button");
    button.className = "answer-button";
    button.type = "button";
    button.innerHTML = `<strong>${choice.label}</strong><small>${choice.detail}</small>`;
    button.addEventListener("click", () => handleAnswer(choice.id));
    list.appendChild(button);
  });
}

function renderImageChoiceQuestion(question) {
  const list = document.querySelector("#answer-list");
  list.innerHTML = "";
  list.classList.add("image-answer-list");

  shuffleArray(question.options, {
    avoidSameOrder: true,
    avoidSameIndexForId: question.correctId
  }).forEach((option) => {
    const button = document.createElement("button");
    button.className = "answer-button image-answer-button";
    button.type = "button";
    button.innerHTML = `
      <img class="image-answer-visual" src="${option.image}" alt="${option.alt}" />
      <strong>${option.label}</strong>
      <small>${option.detail}</small>
    `;
    button.addEventListener("click", () => handleAnswer(option.id));
    list.appendChild(button);
  });
}

function renderOrderingQuestion(question) {
  const list = document.querySelector("#answer-list");
  list.innerHTML = "";
  state.orderingDraft = shuffleArray(question.items, {
    avoidSameOrder: true
  });

  const wrapper = document.createElement("div");
  wrapper.className = "ordering-question";

  const help = document.createElement("p");
  help.className = "ordering-help";
  help.textContent = question.instructions || "請用上下移動按鈕排出你認為正確的順序，再按送出。";
  wrapper.appendChild(help);

  const orderingList = document.createElement("div");
  orderingList.className = "ordering-list";
  wrapper.appendChild(orderingList);

  const actions = document.createElement("div");
  actions.className = "ordering-actions";

  const submitButton = document.createElement("button");
  submitButton.className = "cta-button";
  submitButton.type = "button";
  submitButton.textContent = "送出排序";
  submitButton.addEventListener("click", () => {
    handleAnswer(state.orderingDraft.map((item) => item.id));
  });

  actions.appendChild(submitButton);
  wrapper.appendChild(actions);
  list.appendChild(wrapper);

  renderOrderingDraft(orderingList);
}

function renderOrderingDraft(container) {
  container.innerHTML = "";

  state.orderingDraft.forEach((item, index) => {
    const row = document.createElement("div");
    row.className = "ordering-row";
    row.innerHTML = `
      <span class="ordering-index">${index + 1}</span>
      <div class="ordering-content">
        <strong>${item.label}</strong>
        <small>${item.detail || ""}</small>
      </div>
      <div class="ordering-controls">
        <button class="ghost-button ordering-move" type="button" ${index === 0 ? "disabled" : ""}>上移</button>
        <button class="ghost-button ordering-move" type="button" ${index === state.orderingDraft.length - 1 ? "disabled" : ""}>下移</button>
      </div>
    `;

    const [upButton, downButton] = row.querySelectorAll(".ordering-move");
    upButton.addEventListener("click", () => moveOrderingItem(index, -1, container));
    downButton.addEventListener("click", () => moveOrderingItem(index, 1, container));

    container.appendChild(row);
  });
}

function moveOrderingItem(index, delta, container) {
  const nextIndex = index + delta;
  if (nextIndex < 0 || nextIndex >= state.orderingDraft.length) {
    return;
  }

  const nextDraft = [...state.orderingDraft];
  [nextDraft[index], nextDraft[nextIndex]] = [nextDraft[nextIndex], nextDraft[index]];
  state.orderingDraft = nextDraft;
  renderOrderingDraft(container);
}

function renderMatchingQuestion(question) {
  const list = document.querySelector("#answer-list");
  list.innerHTML = "";
  state.matchingDraft = {};
  const shuffledLeftItems = shuffleArray(question.leftItems, {
    avoidSameOrder: true
  });
  const shuffledRightItems = shuffleArray(question.rightItems, {
    avoidSameOrder: true
  });

  const wrapper = document.createElement("div");
  wrapper.className = "matching-question";

  const help = document.createElement("p");
  help.className = "ordering-help";
  help.textContent = question.instructions || "請將左側概念配對到右側正確說明，再按送出。";
  wrapper.appendChild(help);

  const board = document.createElement("div");
  board.className = "matching-board";

  shuffledLeftItems.forEach((leftItem) => {
    const row = document.createElement("div");
    row.className = "matching-row";

    const left = document.createElement("div");
    left.className = "matching-left";
    left.innerHTML = `<strong>${leftItem.label}</strong><small>${leftItem.detail || ""}</small>`;

    const selector = document.createElement("select");
    selector.className = "matching-select";
    selector.innerHTML = `
      <option value="">請選擇對應項目</option>
      ${shuffledRightItems.map((rightItem) => `<option value="${rightItem.id}">${rightItem.label}</option>`).join("")}
    `;
    selector.addEventListener("change", (event) => {
      state.matchingDraft[leftItem.id] = event.target.value;
    });

    const right = document.createElement("div");
    right.className = "matching-right";
    right.appendChild(selector);

    row.appendChild(left);
    row.appendChild(right);
    board.appendChild(row);
  });

  wrapper.appendChild(board);

  const actions = document.createElement("div");
  actions.className = "ordering-actions";

  const submitButton = document.createElement("button");
  submitButton.className = "cta-button";
  submitButton.type = "button";
  submitButton.textContent = "送出配對";
  submitButton.addEventListener("click", () => {
    handleAnswer({ ...state.matchingDraft });
  });

  actions.appendChild(submitButton);
  wrapper.appendChild(actions);
  list.appendChild(wrapper);
}

function scheduleAutoPlay(question) {
  if (question.type === "ordering") {
    autoPlayAnswerTimer = window.setTimeout(() => {
      handleAnswer([...question.correctOrder]);
    }, 350);
    return;
  }

  if (question.type === "matching") {
    autoPlayAnswerTimer = window.setTimeout(() => {
      const autoPairs = question.pairs.reduce((accumulator, pair) => {
        accumulator[pair.leftId] = pair.rightId;
        return accumulator;
      }, {});
      handleAnswer(autoPairs);
    }, 380);
    return;
  }

  if (question.type === "image-choice" || question.type === "branching") {
    autoPlayAnswerTimer = window.setTimeout(() => {
      handleAnswer(question.correctId);
    }, 340);
    return;
  }

  autoPlayAnswerTimer = window.setTimeout(() => {
    handleAnswer(question.correctId);
  }, 300);
}

function getTimeoutPayload(question) {
  if (question.type === "ordering" || question.type === "matching") {
    return null;
  }

  return null;
}

function updateTimerUI(timeLimit) {
  const timeNode = document.querySelector("#time-left");
  const progressBar = document.querySelector("#progress-bar");
  if (!timeNode || !progressBar) {
    return;
  }

  timeNode.textContent = `${Math.max(timeLeft, 0)}s`;
  progressBar.style.transform = `scaleX(${Math.max(timeLeft, 0) / timeLimit})`;
}

function isAnswerCorrect(question, selectedValue) {
  if (question.type === "ordering") {
    if (!Array.isArray(selectedValue)) {
      return false;
    }

    return question.correctOrder.every((id, index) => selectedValue[index] === id);
  }

  if (question.type === "matching") {
    if (!selectedValue || typeof selectedValue !== "object") {
      return false;
    }

    return question.pairs.every((pair) => selectedValue[pair.leftId] === pair.rightId);
  }

  return selectedValue === question.correctId;
}

function getAwardedTrait(question, selectedValue, correct) {
  if (question.type === "ordering" || question.type === "matching") {
    return correct ? question.trait : null;
  }

  if (question.type === "image-choice") {
    const chosen = question.options.find((option) => option.id === selectedValue);
    return chosen?.trait || null;
  }

  if (question.type === "branching") {
    const chosen = question.choices.find((choice) => choice.id === selectedValue);
    return chosen?.trait || null;
  }

  const chosen = question.answers.find((answer) => answer.id === selectedValue);
  return chosen?.trait || null;
}

function formatCorrectAnswer(question) {
  if (question.type === "ordering") {
    return question.correctOrder
      .map((id) => question.items.find((item) => item.id === id)?.label || id)
      .join(" → ");
  }

  if (question.type === "matching") {
    return question.pairs
      .map((pair) => {
        const left = question.leftItems.find((item) => item.id === pair.leftId)?.label || pair.leftId;
        const right = question.rightItems.find((item) => item.id === pair.rightId)?.label || pair.rightId;
        return `${left} → ${right}`;
      })
      .join("；");
  }

  if (question.type === "image-choice") {
    return question.options.find((item) => item.id === question.correctId)?.label || "";
  }

  if (question.type === "branching") {
    return question.choices.find((item) => item.id === question.correctId)?.label || "";
  }

  return question.answers.find((item) => item.id === question.correctId)?.label || "";
}

function decorateQuestionResult(question, selectedValue, correct) {
  if (question.type === "ordering" || question.type === "matching") {
    return;
  }

  const buttons = Array.from(document.querySelectorAll(".answer-button"));
  const collection =
    question.type === "image-choice"
      ? question.options
      : question.type === "branching"
        ? question.choices
        : question.answers;

  buttons.forEach((button, index) => {
    const answer = collection[index];
    button.disabled = true;
    if (answer.id === question.correctId) {
      button.classList.add("is-correct");
    }
    if (selectedValue && answer.id === selectedValue && !correct) {
      button.classList.add("is-wrong");
    }
  });
}

function getNextQuestionId(question, selectedValue) {
  if (question.type === "branching") {
    const chosen = question.choices.find((choice) => choice.id === selectedValue);
    if (chosen?.next) {
      return chosen.next;
    }
  }

  if (question.next) {
    return question.next;
  }

  const questions = getSceneQuestions();
  const currentIndex = questions.findIndex((item) => item.id === question.id);
  return questions[currentIndex + 1]?.id || null;
}

function handleAnswer(selectedValue) {
  if (state.questionLocked) {
    return;
  }

  state.questionLocked = true;
  clearTimer();

  const scene = getCurrentScene();
  const question = getCurrentQuestion();
  const timeLimit = getEffectiveTimeLimit(question);
  const elapsed = Math.min(timeLimit, Math.round((Date.now() - questionStart) / 1000));
  const correct = isAnswerCorrect(question, selectedValue);
  const awardedTrait = getAwardedTrait(question, selectedValue, correct);
  state.pendingNextQuestionId = getNextQuestionId(question, selectedValue);

  decorateQuestionResult(question, selectedValue, correct);

  if (awardedTrait && state.traitCount[awardedTrait] !== undefined) {
    state.traitCount[awardedTrait] += 1;
  }

  let earned = 0;
  let tag = "這題可惜了，但你已經更接近場景核心主題。";
  if (correct) {
    earned = calculateEarnedScore(timeLimit, elapsed);
    state.score += earned;
    state.correct += 1;
    tag = `答對！本題獲得 ${earned} 分（${getScoringMode().label}）。`;
  } else if (!selectedValue) {
    tag = "時間到，這題沒有得分。";
  }

  state.answers.push({
    questionId: question.id,
    type: question.type,
    selectedValue,
    correct,
    earned,
    topic: question.topic
  });

  window.setTimeout(() => {
    showFeedback(correct, tag, question);
  }, 300);
}

function showFeedback(correct, tag, question) {
  app.innerHTML = "";
  app.appendChild(renderTemplate("#feedback-template"));

  document.querySelector("#feedback-title").textContent = correct ? "答對了" : "再挑戰一次";
  document.querySelector("#feedback-copy").textContent = correct
    ? `${question.topic} 這一題你掌握得很好。`
    : `正確答案是「${formatCorrectAnswer(question)}」。`;
  document.querySelector("#score-total").textContent = `${state.score} 分`;
  document.querySelector("#feedback-tag").textContent = tag;

  window.setTimeout(() => {
    state.index += 1;
    state.currentQuestionId = state.pendingNextQuestionId;
    state.pendingNextQuestionId = null;

    if (state.currentQuestionId) {
      showQuestion();
    } else {
      showResult();
    }
  }, 1500);
}

function getTalentKey() {
  const entries = Object.entries(state.traitCount).sort((left, right) => {
    if (right[1] !== left[1]) {
      return right[1] - left[1];
    }
    return left[0].localeCompare(right[0]);
  });

  return entries[0]?.[1] > 0 ? entries[0][0] : Object.keys(getSceneTalents())[0];
}

function getLocalLeaderboard() {
  try {
    return JSON.parse(window.localStorage.getItem(getLocalLeaderboardKey()) || "[]");
  } catch (error) {
    return [];
  }
}

function saveLocalLeaderboard(entry) {
  const board = getLocalLeaderboard();
  const next = normalizeBoard([entry, ...board]);
  window.localStorage.setItem(getLocalLeaderboardKey(), JSON.stringify(next));
  return next;
}

function normalizeBoard(entries) {
  const scene = getCurrentScene();

  return entries
    .map((entry) => ({
      player: sanitizeNickname(entry.player || "玩家"),
      score: Number(entry.score || 0),
      talent: entry.talent || scene?.title || "未分類",
      playedAt:
        entry.playedAt ||
        new Date().toLocaleTimeString("zh-TW", { hour: "2-digit", minute: "2-digit" })
    }))
    .sort((left, right) => right.score - left.score)
    .slice(0, MAX_LEADERBOARD);
}

function getSupabaseOptions() {
  return APP_CONFIG.leaderboard;
}

async function fetchSharedLeaderboard() {
  const options = getSupabaseOptions();
  const endpoint =
    `${options.supabaseUrl}/rest/v1/${options.table}` +
    `?select=player,score,talent,played_at&event_code=eq.${encodeURIComponent(getActiveEventCode())}` +
    `&order=score.desc&limit=${MAX_LEADERBOARD}`;

  const response = await fetch(endpoint, {
    headers: {
      apikey: options.supabaseAnonKey,
      Authorization: `Bearer ${options.supabaseAnonKey}`
    }
  });

  if (!response.ok) {
    throw new Error(`Fetch leaderboard failed: ${response.status}`);
  }

  const rows = await response.json();
  return normalizeBoard(
    rows.map((row) => ({
      player: row.player,
      score: row.score,
      talent: row.talent,
      playedAt: row.played_at
    }))
  );
}

async function createSharedEntry(entry) {
  const options = getSupabaseOptions();
  const response = await fetch(`${options.supabaseUrl}/rest/v1/${options.table}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: options.supabaseAnonKey,
      Authorization: `Bearer ${options.supabaseAnonKey}`,
      Prefer: "return=minimal"
    },
    body: JSON.stringify({
      event_code: getActiveEventCode(),
      player: entry.player,
      score: entry.score,
      talent: entry.talent,
      played_at: entry.playedAt
    })
  });

  if (!response.ok) {
    throw new Error(`Create leaderboard entry failed: ${response.status}`);
  }
}

async function showResult() {
  clearTimer();

  const scene = getCurrentScene();
  const talentKey = getTalentKey();
  const talent = getSceneTalents()[talentKey];
  const entry = {
    player: state.player,
    score: state.score,
    talent: talent.name,
    playedAt: new Date().toLocaleTimeString("zh-TW", { hour: "2-digit", minute: "2-digit" })
  };
  const board = await leaderboardStore.saveEntry(entry);

  app.innerHTML = "";
  app.appendChild(renderTemplate("#result-template"));

  document.querySelector("#result-name").textContent = `${state.player}，你是「${talent.name}」`;
  const styleNode = document.querySelector("#result-style");
  if (styleNode) {
    styleNode.textContent = talent.styleLabel ? `體驗風格：${talent.styleLabel}` : "";
    styleNode.hidden = !talent.styleLabel;
  }
  const iconNode = document.querySelector("#result-icon");
  if (iconNode) {
    if (talent.resultIcon) {
      iconNode.src = talent.resultIcon;
      iconNode.alt = talent.name;
      iconNode.hidden = false;
    } else {
      iconNode.hidden = true;
    }
  }
  document.querySelector("#result-summary").textContent = talent.summary;
  document.querySelector("#final-score").textContent = `${state.score}`;
  document.querySelector("#score-mode-note").textContent = `本次採用：${getScoringMode().label}`;
  document.querySelector("#correct-count").textContent = `${state.correct} / ${state.index}`;
  document.querySelector("#result-fit").textContent = talent.fit;
  document.querySelector("#result-hook").textContent = `${talent.hook}${scene.resultOutro}`;

  const skillList = document.querySelector("#result-skills");
  talent.skills.forEach((skill) => {
    const item = document.createElement("li");
    item.textContent = skill;
    skillList.appendChild(item);
  });

  syncLeaderboardDescription();
  renderLeaderboard(board);

  document.querySelector("#restart-game").addEventListener("click", () => {
    resetState();
    showLanding();
  });

  const chooseAnotherSceneButton = document.querySelector("#choose-another-scene");
  if (chooseAnotherSceneButton) {
    chooseAnotherSceneButton.hidden = isLockedSceneMode();
    if (!isLockedSceneMode()) {
      chooseAnotherSceneButton.addEventListener("click", () => {
        showSceneSelect();
      });
    }
  }

  document.querySelector("#share-result").addEventListener("click", async () => {
    const text = `${state.player} 完成 ${scene.title}，得到 ${state.score} 分，結果是 ${talent.name}。`;
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      document.querySelector("#share-result").textContent = "已複製";
      window.setTimeout(() => {
        document.querySelector("#share-result").textContent = "複製分享文字";
      }, 1200);
    }
  });

  document.querySelector("#refresh-board").addEventListener("click", async () => {
    const latest = await leaderboardStore.getEntries();
    syncLeaderboardDescription();
    renderLeaderboard(latest);
  });

  document.querySelector("#clear-board").addEventListener("click", async () => {
    const confirmed = window.confirm(
      leaderboardStore.mode === "shared"
        ? "確定要重置此場景的雲端排行榜嗎？目前活動代碼下的分數都會被刪除。"
        : "確定要清空目前裝置上此場景的排行榜嗎？"
    );
    if (!confirmed) {
      return;
    }

    const cleared = await leaderboardStore.clearEntries();
    if (!cleared) {
      document.querySelector("#leaderboard-copy").textContent =
        leaderboardStore.mode === "shared"
          ? "雲端排行榜重置失敗，請確認 Supabase 已開啟 delete 權限。"
          : "本機排行榜清空失敗。";
      return;
    }

    renderLeaderboard([]);
    document.querySelector("#leaderboard-copy").textContent =
      leaderboardStore.mode === "shared"
        ? "此場景目前活動代碼下的雲端排行榜已重置。"
        : "此場景的本機排行榜已清除。";
  });
}

function syncLeaderboardDescription() {
  const title = document.querySelector("#leaderboard-title");
  const copy = document.querySelector("#leaderboard-copy");
  const clearButton = document.querySelector("#clear-board");
  const scene = getCurrentScene();

  if (!title || !copy || !clearButton) {
    return;
  }

  if (leaderboardStore.mode === "shared") {
    title.textContent = `${scene.title} 共用排行榜`;
    copy.textContent = `目前使用 Supabase 雲端排行榜，所有裝置都會看到 ${scene.title} 的同一份成績。`;
  } else {
    title.textContent = `${scene.title} 本機排行榜`;
    copy.textContent = `目前使用瀏覽器本機紀錄。若要跨裝置共用，請先填入 config.js 的 Supabase 設定。`;
  }

  clearButton.disabled = false;
}

function renderLeaderboard(board) {
  const list = document.querySelector("#leaderboard-list");
  list.innerHTML = "";

  if (!board.length) {
    const item = document.createElement("li");
    item.className = "leaderboard-row empty";
    item.textContent = "目前還沒有排行榜紀錄。";
    list.appendChild(item);
    return;
  }

  board.forEach((entry, index) => {
    const item = document.createElement("li");
    item.className = `leaderboard-row rank-${Math.min(index + 1, 4)}`;
    item.innerHTML = `
      <span class="leaderboard-rank">#${index + 1}</span>
      <div class="leaderboard-entry-main">
        <strong>${entry.player}</strong>
        <small>${entry.talent} · ${entry.playedAt}</small>
      </div>
      <div class="leaderboard-entry-score">${entry.score} 分</div>
    `;
    list.appendChild(item);
  });
}

function registerServiceWorker() {
  if (AUTO_PLAY) {
    return;
  }

  if (!("serviceWorker" in navigator)) {
    return;
  }

  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js?v=20260419g").catch((error) => {
      console.error("Service worker registration failed.", error);
    });
  });
}

function boot() {
  if (!SCENES.length) {
    app.innerHTML = `
      <section class="screen">
        <h2>目前沒有可用場景</h2>
        <p class="hero-copy">請先確認 scene-registry.js 已正確註冊至少一個場景。</p>
      </section>
    `;
    return;
  }

  if (INITIAL_SCENE_ID && window.SceneRegistry.getSceneById(INITIAL_SCENE_ID)) {
    setCurrentScene(INITIAL_SCENE_ID);
    showLanding();
  } else if (isLockedSceneMode()) {
    updateHero();
    showLockedSceneUnavailable();
  } else {
    updateHero();
    showSceneSelect();
  }

  registerServiceWorker();
}

boot();
