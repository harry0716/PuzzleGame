const GAME_DURATION = 12;
const MAX_LEADERBOARD = 8;
const LOCAL_BOARD_KEY = "ai-lab-board";

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

const QUESTIONS = [
  {
    id: "q1",
    prompt: "AI 實驗室中最能代表高階 AI 訓練能力的設備是什麼？",
    description: "這題在考你有沒有注意到實驗室的核心亮點。",
    correctId: "a",
    topic: "AI 設備",
    answers: [
      { id: "a", label: "NVIDIA H100 AI 伺服器", detail: "大型模型訓練等級的核心設備。", trait: "ai" },
      { id: "b", label: "一般文書電腦", detail: "適合日常作業，但不是實驗室主角。", trait: "system" },
      { id: "c", label: "傳統投影機", detail: "簡報可用，但不是 AI 計算主力。", trait: "maker" },
      { id: "d", label: "桌上型印表機", detail: "跟 AI 訓練沒有直接關係。", trait: "industry" }
    ]
  },
  {
    id: "q2",
    prompt: "正修電子系 AI 實驗室想讓學生看見的特色是什麼？",
    description: "電子工程不只做硬體，而是跟 AI、控制、系統整合一起學。",
    correctId: "c",
    topic: "跨域整合",
    answers: [
      { id: "a", label: "只學電路焊接", detail: "太單一，已經不是現在的全貌。", trait: "maker" },
      { id: "b", label: "只學寫報告", detail: "不是實驗室培養的核心能力。", trait: "system" },
      { id: "c", label: "電子 + AI + 控制 + 系統整合", detail: "這正是未來產業最需要的跨域能力。", trait: "system" },
      { id: "d", label: "只背理論不動手做", detail: "與實作導向相反。", trait: "ai" }
    ]
  },
  {
    id: "q3",
    prompt: "Factory IO 平台最貼近哪一種應用情境？",
    description: "這題對應智慧製造與自動化模擬。",
    correctId: "b",
    topic: "智慧製造",
    answers: [
      { id: "a", label: "社群貼文排版", detail: "和工控模擬無關。", trait: "maker" },
      { id: "b", label: "智慧工廠與自動化流程模擬", detail: "這是 Factory IO 的代表用途。", trait: "industry" },
      { id: "c", label: "線上購物推薦", detail: "偏資料分析，不是重點。", trait: "ai" },
      { id: "d", label: "音樂剪輯", detail: "與課程主題不符。", trait: "system" }
    ]
  },
  {
    id: "q4",
    prompt: "如果你喜歡把感測器、裝置、AI 判斷串在一起，你可能最適合哪一類方向？",
    description: "這題偏向興趣導向，也會影響最後的人才分類。",
    correctId: "d",
    topic: "職涯方向",
    answers: [
      { id: "a", label: "純文字校稿", detail: "不是實驗室強調的方向。", trait: "maker" },
      { id: "b", label: "平面廣告排版", detail: "不是本次參訪主軸。", trait: "maker" },
      { id: "c", label: "單一文書行政", detail: "與 AIoT 跨域能力不同。", trait: "system" },
      { id: "d", label: "AIoT 系統整合", detail: "把電子、感測、AI 與應用串起來。", trait: "system" }
    ]
  },
  {
    id: "q5",
    prompt: "以下哪一個最像正修電子系 AI 實驗室培養的未來職涯？",
    description: "最後一題，把今天看到的內容和未來工作連起來。",
    correctId: "a",
    topic: "未來職缺",
    answers: [
      { id: "a", label: "AI 工程師 / 自動化工程師 / AIoT 整合人才", detail: "這些都和實驗室能力直接對接。", trait: "ai" },
      { id: "b", label: "只做紙本資料整理", detail: "和核心技術能力不相符。", trait: "maker" },
      { id: "c", label: "只學單機文書作業", detail: "無法反映跨域產業需求。", trait: "system" },
      { id: "d", label: "完全與科技無關", detail: "和本次參訪目的不符。", trait: "industry" }
    ]
  }
];

const TALENTS = {
  ai: {
    name: "AI 模型探索者",
    summary: "你對 AI 推理、影像辨識與模型應用最有感，看到新技術會想知道它怎麼做到。",
    fit: "很適合往 AI 工程、邊緣 AI 應用或智慧辨識系統發展。",
    skills: ["影像辨識", "AI 模型應用", "資料處理", "邊緣 AI 實作"],
    hook: "如果你對 H100 伺服器和 GPU 計算特別有興趣，這條路會很對味。 "
  },
  system: {
    name: "AIoT 系統整合師",
    summary: "你喜歡把不同裝置、感測器、控制邏輯和 AI 判斷串成完整系統。",
    fit: "很適合往 AIoT、智慧設備整合、跨域系統設計前進。",
    skills: ["感測器整合", "控制邏輯", "系統設計", "跨域協作"],
    hook: "電子工程加上 AI 的價值，就在於你能把零件與智慧變成真正可用的系統。 "
  },
  industry: {
    name: "智慧製造指揮員",
    summary: "你對工廠流程、自動化設備和智慧製造情境特別敏感，喜歡看系統如何穩定運作。",
    fit: "未來可朝智慧工廠、自動化工程、工業 AI 應用發展。",
    skills: ["自動化概念", "流程優化", "工控應用", "智慧製造模擬"],
    hook: "如果你覺得 Factory IO 很酷，代表你對產線數位化很可能有天分。 "
  },
  maker: {
    name: "科技創意實作者",
    summary: "你對做中學、快速嘗試與把想法落地很有興趣，是現場最有行動力的類型。",
    fit: "很適合從基礎電子、專題實作、智慧裝置開發一路往上升級。",
    skills: ["專題實作", "硬體基礎", "原型驗證", "問題拆解"],
    hook: "只要願意動手做，電子工程會讓你的想法更快變成作品。 "
  }
};

const app = document.querySelector("#app");
const deployStatusNode = document.querySelector("#deploy-status");
const leaderboardModeNode = document.querySelector("#leaderboard-mode");

const state = {
  index: 0,
  score: 0,
  correct: 0,
  answers: [],
  player: "參訪者",
  questionLocked: false,
  traitCount: { ai: 0, system: 0, industry: 0, maker: 0 }
};

let timerId = null;
let timeLeft = GAME_DURATION;
let questionStart = 0;
let autoPlayAnswerTimer = null;

function hasSharedLeaderboard() {
  const options = APP_CONFIG.leaderboard || {};
  return Boolean(
    options.provider === "supabase" &&
      options.supabaseUrl &&
      options.supabaseAnonKey &&
      options.table &&
      options.eventCode
  );
}

const leaderboardStore = {
  mode: hasSharedLeaderboard() ? "shared" : "local",

  async getEntries() {
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
    if (this.mode === "shared") {
      try {
        await window.LeaderboardShared.clearLeaderboardEntries();
        return true;
      } catch (error) {
        console.error("Shared leaderboard clear failed.", error);
        return false;
      }
    }
    window.localStorage.removeItem(LOCAL_BOARD_KEY);
    return true;
  }
};

function renderTemplate(id) {
  const template = document.querySelector(id);
  return template.content.cloneNode(true);
}

function sanitizeNickname(value) {
  const trimmed = value.trim();
  return trimmed ? trimmed.slice(0, 12) : "參訪者";
}

function resetState() {
  state.index = 0;
  state.score = 0;
  state.correct = 0;
  state.answers = [];
  state.questionLocked = false;
  state.traitCount = { ai: 0, system: 0, industry: 0, maker: 0 };
  clearTimer();
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
  deployStatusNode.textContent = "靜態部署就緒";
  leaderboardModeNode.textContent =
    leaderboardStore.mode === "shared" ? "排行榜：共用雲端模式" : "排行榜：本機模式";
}

function showLanding() {
  clearTimer();
  app.innerHTML = "";
  app.appendChild(renderTemplate("#landing-template"));
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
      resetState();
      showQuestion();
    }, 120);
  }
}

function showQuestion() {
  clearTimer();
  state.questionLocked = false;
  const question = QUESTIONS[state.index];
  app.innerHTML = "";
  app.appendChild(renderTemplate("#question-template"));

  document.querySelector("#question-number").textContent = `${state.index + 1}/${QUESTIONS.length}`;
  document.querySelector("#question-title").textContent = question.prompt;
  document.querySelector("#question-description").textContent = question.description;

  const list = document.querySelector("#answer-list");
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.className = "answer-button";
    button.type = "button";
    button.innerHTML = `<strong>${answer.label}</strong><small>${answer.detail}</small>`;
    button.addEventListener("click", () => handleAnswer(answer.id));
    list.appendChild(button);
  });

  if (AUTO_PLAY) {
    autoPlayAnswerTimer = window.setTimeout(() => {
      handleAnswer(question.correctId);
    }, 300);
  }

  questionStart = Date.now();
  timeLeft = GAME_DURATION;
  updateTimerUI();
  timerId = window.setInterval(() => {
    timeLeft -= 1;
    updateTimerUI();
    if (timeLeft <= 0) {
      handleAnswer(null);
    }
  }, 1000);
}

function updateTimerUI() {
  const timeNode = document.querySelector("#time-left");
  const progressBar = document.querySelector("#progress-bar");
  if (!timeNode || !progressBar) {
    return;
  }

  timeNode.textContent = `${Math.max(timeLeft, 0)}s`;
  progressBar.style.transform = `scaleX(${Math.max(timeLeft, 0) / GAME_DURATION})`;
}

function handleAnswer(selectedId) {
  if (state.questionLocked) {
    return;
  }

  state.questionLocked = true;
  clearTimer();
  const question = QUESTIONS[state.index];
  const buttons = Array.from(document.querySelectorAll(".answer-button"));
  const elapsed = Math.min(GAME_DURATION, Math.round((Date.now() - questionStart) / 1000));
  const chosen = question.answers.find((answer) => answer.id === selectedId);
  const correct = selectedId === question.correctId;

  buttons.forEach((button, index) => {
    const answer = question.answers[index];
    button.disabled = true;
    if (answer.id === question.correctId) {
      button.classList.add("is-correct");
    }
    if (selectedId && answer.id === selectedId && !correct) {
      button.classList.add("is-wrong");
    }
  });

  if (chosen) {
    state.traitCount[chosen.trait] += 1;
  }

  let earned = 0;
  let tag = "這題主要是幫你快速建立印象。";
  if (correct) {
    earned = 60 + Math.max(0, (GAME_DURATION - elapsed) * 8);
    state.score += earned;
    state.correct += 1;
    tag = `答對加 ${earned} 分，速度也算進去了。`;
  } else if (!selectedId) {
    tag = "時間到，下一題我們繼續。";
  } else {
    tag = "這題答錯沒關係，後面還能追回來。";
  }

  state.answers.push({
    questionId: question.id,
    selectedId,
    correct,
    earned,
    topic: question.topic
  });

  window.setTimeout(() => {
    showFeedback(correct, tag, question);
  }, 450);
}

function showFeedback(correct, tag, question) {
  app.innerHTML = "";
  app.appendChild(renderTemplate("#feedback-template"));

  document.querySelector("#feedback-title").textContent = correct ? "答對了" : "重點補充";
  document.querySelector("#feedback-copy").textContent = correct
    ? `${question.topic} 這題你掌握得不錯。`
    : `正確答案是「${question.answers.find((item) => item.id === question.correctId).label}」。`;
  document.querySelector("#score-total").textContent = `${state.score} 分`;
  document.querySelector("#feedback-tag").textContent = tag;

  window.setTimeout(() => {
    state.index += 1;
    if (state.index < QUESTIONS.length) {
      showQuestion();
    } else {
      showResult();
    }
  }, 1500);
}

function getTalentKey() {
  const traitEntries = Object.entries(state.traitCount).sort((left, right) => {
    if (right[1] !== left[1]) {
      return right[1] - left[1];
    }
    return left[0].localeCompare(right[0]);
  });

  return traitEntries[0][1] > 0 ? traitEntries[0][0] : "system";
}

function getLocalLeaderboard() {
  try {
    return JSON.parse(window.localStorage.getItem(LOCAL_BOARD_KEY) || "[]");
  } catch (error) {
    return [];
  }
}

function saveLocalLeaderboard(entry) {
  const board = getLocalLeaderboard();
  const next = normalizeBoard([entry, ...board]);
  window.localStorage.setItem(LOCAL_BOARD_KEY, JSON.stringify(next));
  return next;
}

function normalizeBoard(entries) {
  return entries
    .map((entry) => ({
      player: sanitizeNickname(entry.player || "參訪者"),
      score: Number(entry.score || 0),
      talent: entry.talent || "未分類",
      playedAt: entry.playedAt || new Date().toLocaleTimeString("zh-TW", { hour: "2-digit", minute: "2-digit" })
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
    `?select=player,score,talent,played_at&event_code=eq.${encodeURIComponent(options.eventCode)}` +
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
      event_code: options.eventCode,
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
  const talentKey = getTalentKey();
  const talent = TALENTS[talentKey];
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
  document.querySelector("#result-summary").textContent = talent.summary;
  document.querySelector("#final-score").textContent = `${state.score}`;
  document.querySelector("#correct-count").textContent = `${state.correct} / ${QUESTIONS.length}`;
  document.querySelector("#result-fit").textContent = talent.fit;
  document.querySelector("#result-hook").textContent = `${talent.hook}現場如果對這個方向有感，可以直接記住正修電子系的 AI 實作特色。`;

  const skillList = document.querySelector("#result-skills");
  talent.skills.forEach((skill) => {
    const item = document.createElement("li");
    item.textContent = skill;
    skillList.appendChild(item);
  });

  syncLeaderboardDescription();
  renderLeaderboard(board);

  document.querySelector("#restart-game").addEventListener("click", () => {
    showLanding();
  });

  document.querySelector("#share-result").addEventListener("click", async () => {
    const text = `${state.player} 完成 AI Lab Talent Sprint，得到 ${state.score} 分，結果是 ${talent.name}。`;
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      document.querySelector("#share-result").textContent = "已複製";
      window.setTimeout(() => {
        document.querySelector("#share-result").textContent = "複製結果文字";
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
        ? "確定要重置雲端排行榜嗎？目前活動代碼下的分數都會被刪除。"
        : "確定要清空目前裝置上的排行榜嗎？"
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
        ? "目前活動代碼下的雲端排行榜已重置。"
        : "本機排行榜已清除。";
  });
}

function syncLeaderboardDescription() {
  const title = document.querySelector("#leaderboard-title");
  const copy = document.querySelector("#leaderboard-copy");
  const clearButton = document.querySelector("#clear-board");
  if (!title || !copy || !clearButton) {
    return;
  }

  if (leaderboardStore.mode === "shared") {
    title.textContent = "全班共用排行榜";
    copy.textContent = "目前使用 Supabase 雲端排行榜，所有裝置會看到同一份成績。";
    clearButton.disabled = false;
  } else {
    title.textContent = "本機排行榜";
    copy.textContent = "目前使用瀏覽器本機紀錄。若要全班共用，請先填入 config.js 的 Supabase 設定。";
    clearButton.disabled = false;
  }
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
    navigator.serviceWorker.register("./service-worker.js").catch((error) => {
      console.error("Service worker registration failed.", error);
    });
  });
}

updateHeaderMeta();
registerServiceWorker();
showLanding();
