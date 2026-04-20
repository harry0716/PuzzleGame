(function attachSceneRegistry(global) {
  function encodeSvg(svg) {
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  }

  function buildSceneIllustration({ title, subtitle, accent, highlight, symbol }) {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 320" role="img" aria-label="${title}">
        <defs>
          <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stop-color="${accent}" />
            <stop offset="100%" stop-color="${highlight}" />
          </linearGradient>
        </defs>
        <rect width="480" height="320" rx="32" fill="url(#bg)" />
        <circle cx="390" cy="82" r="52" fill="rgba(255,255,255,0.18)" />
        <circle cx="110" cy="250" r="74" fill="rgba(255,255,255,0.12)" />
        <text x="42" y="82" font-family="Segoe UI, Noto Sans TC, sans-serif" font-size="26" fill="rgba(255,255,255,0.92)">${subtitle}</text>
        <text x="42" y="144" font-family="Segoe UI, Noto Sans TC, sans-serif" font-size="54" font-weight="700" fill="#fffaf3">${title}</text>
        <text x="42" y="238" font-family="Segoe UI, Noto Sans TC, sans-serif" font-size="120" fill="rgba(255,255,255,0.9)">${symbol}</text>
      </svg>
    `;

    return encodeSvg(svg);
  }

  function buildBoothPreviewSvg() {
    return encodeSvg(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 400" role="img" aria-label="電子工程雙體驗">
        <defs>
          <linearGradient id="dual-bg" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stop-color="#102640" />
            <stop offset="50%" stop-color="#0b7668" />
            <stop offset="100%" stop-color="#ff8b3d" />
          </linearGradient>
        </defs>
        <rect width="640" height="400" rx="30" fill="url(#dual-bg)" />
        <rect x="38" y="60" width="260" height="240" rx="24" fill="rgba(255,255,255,0.14)" />
        <rect x="342" y="60" width="260" height="240" rx="24" fill="rgba(255,255,255,0.14)" />
        <rect x="70" y="104" width="196" height="112" rx="18" fill="rgba(255,255,255,0.16)" stroke="rgba(255,255,255,0.32)" />
        <rect x="104" y="138" width="62" height="44" rx="10" fill="#7af5da" />
        <rect x="178" y="138" width="62" height="44" rx="10" fill="#ffd26e" />
        <circle cx="472" cy="168" r="48" fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="10" />
        <path d="M468 140h8l22 22-22 22h-8l18-22z" fill="#fff3de" />
        <path d="M440 190c22 24 66 24 88 0" fill="none" stroke="rgba(255,255,255,0.6)" stroke-width="8" stroke-linecap="round" />
        <circle cx="320" cy="196" r="34" fill="#fff3de" opacity="0.95" />
        <path d="M310 188l10-24 10 24-10 8z" fill="#ff8b3d" />
        <rect x="304" y="196" width="32" height="12" rx="6" fill="#102640" />
        <text x="54" y="44" font-family="Segoe UI, Noto Sans TC, sans-serif" font-size="28" fill="rgba(255,255,255,0.88)">一個攤位，兩種沉浸體驗</text>
        <text x="78" y="266" font-family="Segoe UI, Noto Sans TC, sans-serif" font-size="24" fill="#fdf6eb">AI 闖關區</text>
        <text x="382" y="266" font-family="Segoe UI, Noto Sans TC, sans-serif" font-size="24" fill="#fdf6eb">VR 無人機區</text>
        <text x="170" y="338" font-family="Segoe UI, Noto Sans TC, sans-serif" font-size="52" fill="rgba(255,255,255,0.92)">晶片 × 飛行</text>
      </svg>
    `);
  }

  function buildRoleIconSvg({ title, accent, symbol }) {
    return encodeSvg(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" role="img" aria-label="${title}">
        <defs>
          <linearGradient id="role-bg" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stop-color="${accent}" />
            <stop offset="100%" stop-color="#102640" />
          </linearGradient>
        </defs>
        <rect width="200" height="200" rx="32" fill="url(#role-bg)" />
        <circle cx="100" cy="100" r="58" fill="rgba(255,255,255,0.16)" />
        <text x="100" y="116" text-anchor="middle" font-family="Segoe UI, Noto Sans TC, sans-serif" font-size="74" fill="#fff7ef">${symbol}</text>
      </svg>
    `);
  }

  function cloneData(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function selectQuestionOptions(question, limit) {
    if (question.answers) {
      const correct = question.answers.find((item) => item.id === question.correctId);
      const distractors = question.answers.filter((item) => item.id !== question.correctId).slice(0, Math.max(0, limit - 1));
      question.answers = [correct, ...distractors].filter(Boolean);
    }

    if (question.options) {
      const correct = question.options.find((item) => item.id === question.correctId);
      const distractors = question.options.filter((item) => item.id !== question.correctId).slice(0, Math.max(0, limit - 1));
      question.options = [correct, ...distractors].filter(Boolean);
    }

    return question;
  }

  function simplifyMatchingQuestion(question, limit) {
    if (!question.leftItems || !question.rightItems || !question.pairs) {
      return question;
    }

    const leftItems = question.leftItems.slice(0, limit);
    const leftIds = new Set(leftItems.map((item) => item.id));
    const pairs = question.pairs.filter((pair) => leftIds.has(pair.leftId)).slice(0, limit);
    const rightIds = new Set(pairs.map((pair) => pair.rightId));

    question.leftItems = leftItems;
    question.pairs = pairs;
    question.rightItems = question.rightItems.filter((item) => rightIds.has(item.id));
    return question;
  }

  function createSmartIrrigationDifficultySet(level, baseQuestions, baseResults) {
    const questions = cloneData(baseQuestions).map((question) => {
      const nextQuestion = { ...question };

      if (level === "easy") {
        nextQuestion.prompt = `【初階】${question.prompt}`;
        nextQuestion.description = question.description
          ? `${question.description} 這一版會把判斷重點說得更直接。`
          : "這一版會把判斷重點說得更直接。";

        if (question.type === "single-choice" || question.type === "timed-choice") {
          selectQuestionOptions(nextQuestion, 3);
        } else if (question.type === "image-choice") {
          selectQuestionOptions(nextQuestion, 3);
        } else if (question.type === "matching") {
          simplifyMatchingQuestion(nextQuestion, 3);
        }

        if (question.type === "timed-choice") {
          nextQuestion.timeLimit = Math.min((question.timeLimit || 8) + 4, 16);
          nextQuestion.countdownLabel = `${nextQuestion.timeLimit} 秒初階判斷`;
          nextQuestion.urgencyText = "先抓最核心的線索，再做選擇。";
        }

        return nextQuestion;
      }

      if (level === "hard") {
        nextQuestion.prompt = `【進階】${question.prompt} 請同時考量資源效率、現場條件與決策理由。`;
        nextQuestion.description = question.description
          ? `${question.description} 這一版希望你把答案背後的取捨一起想進去。`
          : "這一版希望你把答案背後的取捨一起想進去。";

        if (question.type === "timed-choice") {
          nextQuestion.timeLimit = Math.max(6, (question.timeLimit || 8) - 2);
          nextQuestion.countdownLabel = `${nextQuestion.timeLimit} 秒進階判斷`;
          nextQuestion.urgencyText = "時間更短，請更快判斷哪個條件真正影響灌溉。";
        }

        return nextQuestion;
      }

      return nextQuestion;
    });

    const difficultyMeta = {
      easy: {
        title: "智慧灌溉題組啟動",
        copy: "這是初階版智慧灌溉題組。你會用更清楚、較低干擾的題目，先建立土壤濕度、灌溉時機與節水判斷的基本觀念。",
        rules: [
          "共 10 題，題意更直接，適合導覽、暖身或第一次接觸智慧灌溉。",
          "部分題型會使用較少選項，幫助你更聚焦地建立判斷概念。",
          "完成後仍會得到完整的智慧灌溉結果卡。"
        ],
        settings: { questionCount: 10, defaultTimeLimit: 18 }
      },
      medium: {
        title: "智慧灌溉題組啟動",
        copy: "這是標準版智慧灌溉題組。你會從農場現場的角度，理解土壤、天氣、設備與調度如何影響真正的灌溉決策。",
        rules: [
          "共 10 題，題型包含單選、限時、分支、圖片、配對與排序。",
          "重點不是背設備名稱，而是理解為什麼灌溉不能只靠習慣。",
          "結果卡會依你的作答傾向，回饋你在智慧灌溉中的判斷風格。"
        ],
        settings: { questionCount: 10, defaultTimeLimit: 14 }
      },
      hard: {
        title: "智慧灌溉題組啟動",
        copy: "這是進階版智慧灌溉題組。題目會更強調取捨、條件交叉與全球水壓力脈絡，適合競賽或較熟悉主題的參與者。",
        rules: [
          "共 10 題，保留完整題型，但會要求你一起思考時機、資源與決策理由。",
          "限時題秒數更短，整體閱讀與判斷壓力更高。",
          "結果卡仍使用同一套角色，但更能反映你在高壓條件下的判斷傾向。"
        ],
        settings: { questionCount: 10, defaultTimeLimit: 11 }
      }
    };

    return {
      landing: {
        title: difficultyMeta[level].title,
        copy: difficultyMeta[level].copy,
        rules: difficultyMeta[level].rules
      },
      settings: difficultyMeta[level].settings,
      questions,
      results: cloneData(baseResults)
    };
  }

  const CHIP_HUNTER_SCENE = {
    id: "chip-hunter",
    title: "晶片獵人",
    subtitle: "AI Lab Talent Sprint",
    description: "從 AI 設備、智慧工廠到系統整合，快速體驗晶片與 AI 場景的核心亮點。",
    hero: {
      eyebrow: "CHIP HUNTER",
      title: "晶片獵人",
      copy: "從前端切換不同活動場景，讓同一套互動遊戲也能對應 AI、工廠與系統整合等不同主題。"
    },
    panel: {
      badge: "現行活動場景",
      level: "入門探索",
      tags: ["單選題", "限時題", "排序題", "圖片題", "配對題", "分支題", "AI", "系統整合"]
    },
    theme: {
      accent: "#0a7f6f",
      surface: "#f4ede3"
    },
    landing: {
      title: "開始晶片獵人挑戰",
      copy: "你將在 7 個互動節點中，認識 AI 實驗室設備、智慧工廠與 AIoT 系統整合。",
      rules: [
        "共 7 個互動節點，每題預設 12 秒。",
        "目前支援單選題、限時題、排序題、圖片題、配對題、分支題。",
        "答對可得分，越快作答分數越高。",
        "結果卡會依照你的選擇傾向給出適合方向。"
      ]
    },
    leaderboard: {
      eventCode: "puzzlegame-visit-2026-04-08"
    },
    settings: {
      questionCount: 7,
      defaultTimeLimit: 12
    },
    resultOutro: "如果你對這個方向有感，現場可以直接把它和正修電子系的 AI 實作特色連起來。",
    questions: [
      {
        id: "q1",
        type: "single-choice",
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
        type: "single-choice",
        prompt: "正修電子系 AI 實驗室想讓學生看見的特色是什麼？",
        description: "電子工程不只做硬體，而是跟 AI、控制、系統整合一起學。",
        correctId: "c",
        topic: "跨域整合",
        answers: [
          { id: "a", label: "只學焊接與電路板", detail: "硬體重要，但不是這裡的全部。", trait: "maker" },
          { id: "b", label: "只做感測器接線", detail: "是能力之一，但不足以代表整體特色。", trait: "system" },
          { id: "c", label: "電子 + AI + 控制 + 系統整合", detail: "這正是實驗室想傳達的核心。", trait: "system" },
          { id: "d", label: "只做手機 App", detail: "不是這次實驗室展示的主軸。", trait: "ai" }
        ]
      },
      {
        id: "q3",
        type: "timed-choice",
        prompt: "如果導覽老師只給你 8 秒，你會怎麼快速判斷哪個展示最有 AI 核心價值？",
        description: "這是一題明確的限時題型，會用更短的秒數考驗你的直覺判斷。",
        topic: "限時判斷",
        correctId: "gpu-first",
        timeLimit: 8,
        countdownLabel: "8 秒快答",
        urgencyText: "先抓出真正代表 AI 算力的設備，時間到就直接進下一題。",
        answers: [
          { id: "gpu-first", label: "先找 GPU / AI 伺服器", detail: "算力是 AI 展示最核心的辨識點。", trait: "ai" },
          { id: "poster-first", label: "先看海報文字", detail: "資訊有幫助，但不一定最快抓到核心。", trait: "industry" },
          { id: "lights-first", label: "先看燈光最亮的設備", detail: "視覺吸睛不一定代表技術重點。", trait: "maker" },
          { id: "crowd-first", label: "哪裡人多就先看哪裡", detail: "熱鬧不等於是場景中的核心設備。", trait: "system" }
        ]
      },
      {
        id: "q4",
        type: "ordering",
        prompt: "請把這個參訪理解流程排出較合理的順序。",
        description: "這題先用排序題試跑新的題型引擎。",
        topic: "場景流程",
        trait: "industry",
        instructions: "把體驗順序從先接觸到最後整合理解排出來。",
        items: [
          { id: "observe", label: "先觀察展示設備", detail: "先看見具體設備與展示物件。" },
          { id: "understand", label: "理解設備用途", detail: "知道這些設備在做什麼。" },
          { id: "connect", label: "連結到 AI / 系統應用", detail: "把設備與應用場景對起來。" },
          { id: "reflect", label: "推回自己的興趣方向", detail: "思考自己適合的學習方向。" }
        ],
        correctOrder: ["observe", "understand", "connect", "reflect"]
      },
      {
        id: "q5",
        type: "branching",
        prompt: "如果你現在站在展示區，第一步最值得先看哪一區？",
        description: "這題會根據你的選擇，導向不同的後續題目。",
        topic: "探索路徑",
        correctId: "server-first",
        choices: [
          {
            id: "server-first",
            label: "先看 AI 伺服器與運算設備",
            detail: "先理解核心算力，再往應用延伸。",
            trait: "ai",
            next: "q5-image"
          },
          {
            id: "system-first",
            label: "先看系統整合與應用情境",
            detail: "先理解整體用途，再回頭看設備角色。",
            trait: "system",
            next: "q5-image"
          }
        ]
      },
      {
        id: "q5-image",
        type: "image-choice",
        prompt: "哪一張圖最接近本場景的 AI 高效運算設備？",
        description: "用圖片辨識的方式找出最符合 AI 實驗室亮點的設備。",
        topic: "圖片辨識",
        correctId: "server",
        options: [
          {
            id: "server",
            label: "AI 伺服器機櫃",
            detail: "高效運算與模型推理最常對應的設備。",
            alt: "AI 伺服器機櫃示意圖",
            image: buildSceneIllustration({
              title: "AI Server",
              subtitle: "High Compute",
              accent: "#0a7f6f",
              highlight: "#16325c",
              symbol: "◆"
            }),
            trait: "ai"
          },
          {
            id: "printer",
            label: "辦公室印表機",
            detail: "和文件輸出有關，但不是 AI 核心裝置。",
            alt: "印表機示意圖",
            image: buildSceneIllustration({
              title: "Printer",
              subtitle: "Office Device",
              accent: "#d46a3b",
              highlight: "#ffb36e",
              symbol: "●"
            }),
            trait: "maker"
          },
          {
            id: "projector",
            label: "投影展示設備",
            detail: "能呈現內容，但不是運算主角。",
            alt: "投影設備示意圖",
            image: buildSceneIllustration({
              title: "Projector",
              subtitle: "Presentation",
              accent: "#445a7a",
              highlight: "#7aa2c8",
              symbol: "▲"
            }),
            trait: "system"
          }
        ],
        next: "q6"
      },
      {
        id: "q6",
        type: "matching",
        prompt: "把展示主題和最接近的對應說明配對起來。",
        description: "這題用來驗證新的配對題型。",
        topic: "概念配對",
        trait: "system",
        instructions: "左邊是場景中的主題，右邊是它最接近的說明。",
        leftItems: [
          { id: "ai-server", label: "AI 伺服器", detail: "與高效推理和模型訓練有關。" },
          { id: "factory-io", label: "Factory IO", detail: "和智慧工廠展示連得上。" },
          { id: "aiot", label: "AIoT", detail: "把 AI 和設備整合起來。" }
        ],
        rightItems: [
          { id: "compute", label: "高效運算與模型訓練" },
          { id: "factory", label: "智慧產線與工業模擬" },
          { id: "integration", label: "感測器、控制與系統整合" }
        ],
        pairs: [
          { leftId: "ai-server", rightId: "compute" },
          { leftId: "factory-io", rightId: "factory" },
          { leftId: "aiot", rightId: "integration" }
        ]
      }
    ],
    results: {
      ai: {
        name: "AI 模型探索者",
        summary: "你對 AI 推理、影像辨識與模型應用最有感，看到新技術會想知道它怎麼做到。",
        fit: "很適合往 AI 工程、邊緣 AI 應用或智慧辨識系統發展。",
        skills: ["影像辨識", "AI 模型應用", "資料處理", "邊緣 AI 實作"],
        hook: "如果你對 H100 伺服器和 GPU 計算特別有興趣，這條路會很對味。"
      },
      system: {
        name: "AIoT 系統整合師",
        summary: "你喜歡把不同裝置、感測器、控制邏輯和 AI 判斷串成完整系統。",
        fit: "很適合往 AIoT、智慧設備整合、跨域系統設計前進。",
        skills: ["感測器整合", "控制邏輯", "系統設計", "跨域協作"],
        hook: "電子工程加上 AI 的價值，就在於你能把零件與智慧變成真正可用的系統。"
      },
      industry: {
        name: "智慧製造指揮員",
        summary: "你對工廠流程、自動化設備和智慧製造情境特別敏感，喜歡看系統如何穩定運作。",
        fit: "未來可朝智慧工廠、自動化工程、工業 AI 應用發展。",
        skills: ["自動化概念", "流程優化", "工控應用", "智慧製造模擬"],
        hook: "如果你覺得 Factory IO 很酷，代表你對產線數位化很可能有天分。"
      },
      maker: {
        name: "實作創意工程師",
        summary: "你對實際動手做、把點子變成可展示的作品這件事最有熱情。",
        fit: "未來可往裝置實作、互動系統、原型開發與跨域作品設計發展。",
        skills: ["原型製作", "動手實作", "創意轉化", "展示表達"],
        hook: "當你願意把想法做出來，就很容易在跨域專題裡脫穎而出。"
      }
    }
  };

  const DUAL_EXPERIENCE_SCENE = {
    id: "electronics-dual-experience",
    title: "電子工程雙體驗",
    subtitle: "One Booth, Dual Missions",
    description: "把 AI 晶片互動和 VR 無人機挑戰串成同一個電子工程故事，讓學生既動腦又動手。",
    hero: {
      eyebrow: "DUAL EXPERIENCE",
      title: "電子工程雙體驗",
      copy: "一邊在螢幕上認識 AI 晶片與系統，一邊用飛手視角理解無人機控制，最後把兩條線收束成同一個電子工程故事。"
    },
    panel: {
      badge: "嘉年華新場景",
      level: "展攤任務",
      tags: ["雙路徑", "限時題", "圖片題", "配對題", "排序題", "職涯卡", "AI", "無人機"]
    },
    theme: {
      accent: "#16325c",
      surface: "#efe4d4"
    },
    cover: "./assets/scenes/electronics-dual-experience/cover.svg",
    previewImage: buildBoothPreviewSvg(),
    landing: {
      title: "開始電子工程雙體驗",
      copy: "你將在同一個展攤中，先後接觸 AI 闖關區與 VR 無人機區，最後看懂它們其實都屬於電子工程師的舞台。",
      rules: [
        "共 7 個互動節點，會先選擇一條短分支再回到主線。",
        "AI 區與無人機區都會進入題目內容，不會只當背景。",
        "限時題會縮短秒數，模擬展攤現場快速判斷的壓力。",
        "完成後可得到職涯角色卡，並附上一個體驗風格標籤。"
      ]
    },
    leaderboard: {
      eventCode: "electronics-dual-experience-2026-carnival"
    },
    settings: {
      questionCount: 7,
      defaultTimeLimit: 12
    },
    resultOutro: "當你把螢幕上的 AI 與空中的飛行任務連起來時，就會看見電子工程其實是同一個完整故事。",
    questions: [
      {
        id: "dual-q1",
        type: "single-choice",
        prompt: "這個展攤最大的特色是什麼？",
        description: "先抓到整個攤位想傳達的核心，再進入後面的雙線任務。",
        correctId: "same-story",
        topic: "展攤定位",
        answers: [
          { id: "same-story", label: "用兩種不同體驗，講同一個電子工程產業故事", detail: "這是整個攤位最重要的設計概念。", trait: "signal" },
          { id: "two-games", label: "把兩個熱門活動放在一起，讓攤位更熱鬧", detail: "有熱鬧感，但這不是最核心的訊息。", trait: "maker" },
          { id: "free-choice", label: "讓大家只挑自己喜歡的活動，不必理解另一區", detail: "現場可以自由選，但最終希望理解兩邊關聯。", trait: "flight" },
          { id: "separate-subjects", label: "AI 和無人機其實代表完全不同科系", detail: "這正是場景想打破的誤解。", trait: "chip" }
        ]
      },
      {
        id: "dual-q2",
        type: "branching",
        prompt: "如果你現在排到攤位前，想先挑戰哪一區？",
        description: "你可以自己選入口，但兩條線最後都會回到同一個電子工程主題。",
        topic: "任務入口",
        correctId: "ai-first",
        choices: [
          {
            id: "ai-first",
            label: "先進 AI 闖關區",
            detail: "從晶片、算力與智慧系統開始認識這個攤位。",
            trait: "chip",
            next: "dual-ai-q3"
          },
          {
            id: "drone-first",
            label: "先進 VR 無人機區",
            detail: "從飛手視角、飛控與即時判斷開始挑戰。",
            trait: "flight",
            next: "dual-drone-q3"
          }
        ]
      },
      {
        id: "dual-ai-q3",
        type: "timed-choice",
        prompt: "你只有 8 秒看懂 AI 區的核心，最值得先注意哪一個重點？",
        description: "先抓住真正代表 AI 區價值的設備，而不是被表面熱鬧吸走注意力。",
        topic: "AI 區快判",
        correctId: "chip-core",
        timeLimit: 8,
        countdownLabel: "AI 區 8 秒快判",
        urgencyText: "現場只給你一眼的時間，先抓核心算力設備。",
        answers: [
          { id: "chip-core", label: "AI 伺服器與運算晶片", detail: "這才是 AI 闖關區真正的核心。", trait: "chip" },
          { id: "poster-wall", label: "先看海報上的所有說明", detail: "資訊很多，但不一定最快抓到重點。", trait: "signal" },
          { id: "flashy-light", label: "先找燈光最亮的裝置", detail: "吸睛不代表技術最核心。", trait: "maker" },
          { id: "crowd-flow", label: "哪裡人多就先往哪裡看", detail: "人多可能代表熱門，但不一定代表核心。", trait: "flight" }
        ],
        next: "dual-ai-q4"
      },
      {
        id: "dual-ai-q4",
        type: "image-choice",
        prompt: "哪一個最接近 AI 闖關區背後真正重要的設備角色？",
        description: "看圖辨識 AI 區的核心設備。",
        topic: "AI 區辨識",
        correctId: "ai-zone-core",
        options: [
          {
            id: "ai-zone-core",
            label: "AI 伺服器與晶片運算設備",
            detail: "代表 AI 任務背後的算力核心。",
            alt: "AI 伺服器與晶片設備示意圖",
            image: "./assets/scenes/electronics-dual-experience/ai-zone.svg",
            trait: "chip"
          },
          {
            id: "office-device",
            label: "一般辦公設備",
            detail: "能支援日常工作，但不是本區的技術核心。",
            alt: "一般辦公設備示意圖",
            image: buildSceneIllustration({
              title: "Office Tools",
              subtitle: "Daily Support",
              accent: "#9a7451",
              highlight: "#c9ab84",
              symbol: "□"
            }),
            trait: "signal"
          },
          {
            id: "display-device",
            label: "展示輸出設備",
            detail: "有助於呈現內容，但不負責 AI 運算本身。",
            alt: "展示輸出設備示意圖",
            image: buildSceneIllustration({
              title: "Display",
              subtitle: "Presentation",
              accent: "#49668b",
              highlight: "#8eb3cf",
              symbol: "△"
            }),
            trait: "maker"
          }
        ],
        next: "dual-q5"
      },
      {
        id: "dual-drone-q3",
        type: "timed-choice",
        prompt: "戴上 FPV 頭盔後，飛手最需要即時注意哪一件事？",
        description: "這題用更短秒數，模擬無人機闖關時的即時判斷壓力。",
        topic: "飛手即時判斷",
        correctId: "flight-awareness",
        timeLimit: 8,
        countdownLabel: "飛手 8 秒快判",
        urgencyText: "這裡不是單看畫面，而是要快速理解方向、距離和路線。",
        answers: [
          { id: "flight-awareness", label: "無人機方向、障礙物距離和回到起飛點的路線", detail: "這正是飛手需要同時處理的核心資訊。", trait: "flight" },
          { id: "staff-shirt", label: "先記住工作人員穿什麼顏色", detail: "和闖關無關，不是飛手當下最重要的資訊。", trait: "signal" },
          { id: "treat-like-game", label: "只要像玩遊戲一樣直衝就好", detail: "飛行需要穩定判斷，不能只靠直覺衝刺。", trait: "maker" },
          { id: "music", label: "只要注意現場音樂夠不夠熱血", detail: "氣氛重要，但不影響飛行安全與任務完成。", trait: "maker" }
        ],
        next: "dual-drone-q4"
      },
      {
        id: "dual-drone-q4",
        type: "image-choice",
        prompt: "哪一個最接近空中冒險區的核心操作情境？",
        description: "從畫面裡辨識飛手視角和無人機任務的重點。",
        topic: "無人機區辨識",
        correctId: "drone-zone-core",
        options: [
          {
            id: "drone-zone-core",
            label: "戴上 FPV 頭盔並即時操控無人機",
            detail: "這正是 VR 無人機區的核心沉浸體驗。",
            alt: "FPV 飛手操控無人機示意圖",
            image: "./assets/scenes/electronics-dual-experience/drone-zone.svg",
            trait: "flight"
          },
          {
            id: "watch-only",
            label: "站在旁邊看別人操作",
            detail: "能看懂一部分，但不是親自挑戰的核心體驗。",
            alt: "旁觀無人機示意圖",
            image: buildSceneIllustration({
              title: "Watch Mode",
              subtitle: "Observer",
              accent: "#6a5f8f",
              highlight: "#a19aca",
              symbol: "◌"
            }),
            trait: "signal"
          },
          {
            id: "video-only",
            label: "坐著看無人機介紹影片",
            detail: "有助理解背景，但不等於飛手任務本身。",
            alt: "觀看介紹影片示意圖",
            image: buildSceneIllustration({
              title: "Video Intro",
              subtitle: "Passive View",
              accent: "#6f7b41",
              highlight: "#b5be7a",
              symbol: "▷"
            }),
            trait: "chip"
          }
        ],
        next: "dual-q5"
      },
      {
        id: "dual-q5",
        type: "matching",
        prompt: "把展攤中的技術和最接近的功能配對起來。",
        description: "看懂每個展攤元素在整個體驗裡扮演的角色。",
        topic: "技術配對",
        trait: "signal",
        instructions: "把左邊的技術元件，對到最接近的功能說明。",
        leftItems: [
          { id: "ai-chip", label: "AI 晶片", detail: "支撐闖關系統中的推理與運算。" },
          { id: "fpv-headset", label: "FPV / VR 頭盔", detail: "讓飛手看到第一人稱視角。" },
          { id: "flight-control", label: "飛控系統", detail: "維持姿態、方向與穩定性。" },
          { id: "wireless-link", label: "無線傳輸", detail: "讓影像與控制訊號能即時往返。" }
        ],
        rightItems: [
          { id: "compute", label: "高速運算與模型推理" },
          { id: "view", label: "第一人稱畫面接收" },
          { id: "stability", label: "姿態與方向控制" },
          { id: "link", label: "影像與控制訊號連線" }
        ],
        pairs: [
          { leftId: "ai-chip", rightId: "compute" },
          { leftId: "fpv-headset", rightId: "view" },
          { leftId: "flight-control", rightId: "stability" },
          { leftId: "wireless-link", rightId: "link" }
        ]
      },
      {
        id: "dual-q6",
        type: "ordering",
        prompt: "如果要完整體驗這個展攤，哪個流程最合理？",
        description: "這題會把雙區體驗和最後的成果收束在一起。",
        topic: "完整流程",
        trait: "signal",
        instructions: "把完整體驗雙區與帶走成果的流程排成合理順序。",
        items: [
          { id: "pick-route", label: "選擇先挑戰哪一區", detail: "決定從 AI 區或無人機區開始。" },
          { id: "finish-first", label: "完成第一區體驗", detail: "先完成你選的第一條任務路徑。" },
          { id: "finish-second", label: "進入另一區補完任務", detail: "兩邊都完成才算完整理解這個攤位。" },
          { id: "connect-story", label: "理解兩區背後的共同電子工程核心", detail: "把晶片、飛控、傳輸與系統整合串起來。" },
          { id: "collect-result", label: "帶走集章或職涯結果卡", detail: "完成整體挑戰後取得成果。" }
        ],
        correctOrder: ["pick-route", "finish-first", "finish-second", "connect-story", "collect-result"]
      },
      {
        id: "dual-q7",
        type: "single-choice",
        prompt: "為什麼 AI 闖關和 VR 無人機都能代表電子工程師的舞台？",
        description: "最後一題把整個雙體驗收束回電子工程的核心價值。",
        correctId: "engineering-core",
        topic: "核心訊息",
        answers: [
          { id: "speed-only", label: "因為兩邊都只是比誰玩得快", detail: "有競賽感，但不是這個攤位要傳達的重點。", trait: "flight" },
          { id: "engineering-core", label: "因為背後都需要晶片、控制、傳輸與系統整合", detail: "這正是兩區被放在同一個攤位的理由。", trait: "signal" },
          { id: "different-majors", label: "因為一邊比較像資訊，一邊比較像體育活動", detail: "這其實忽略了兩邊背後共同的工程核心。", trait: "maker" },
          { id: "screen-plus-controller", label: "只要有螢幕和遙控器，就算是電子工程", detail: "電子工程不只表面裝置，還包含背後整個系統。", trait: "chip" }
        ]
      }
    ],
    results: {
      chip: {
        name: "AI 晶片探索者",
        styleLabel: "核心洞察型",
        summary: "你會優先看見技術核心，對 AI 晶片、算力設備和模型運作最有感。看到展示時，你不只想知道它能做什麼，還想知道它靠什麼做到。",
        fit: "很適合往 AI 硬體、智慧運算、邊緣 AI 與半導體應用理解方向發展。",
        skills: ["晶片與算力理解", "AI 設備觀察", "模型應用辨識", "技術核心判斷"],
        hook: "如果你一走進攤位就會先盯著 AI 伺服器和運算設備看，這條線很可能就是你的興趣入口。",
        resultIcon: "./assets/results/ai-chip-explorer.svg"
      },
      flight: {
        name: "飛控任務操控手",
        styleLabel: "即時反應型",
        summary: "你對速度感、空間判斷和任務操作很有感，面對飛行挑戰時會自然進入專注模式。你適合在需要快速判斷與穩定操控的情境中發揮。",
        fit: "可往無人機操作、智慧載具、飛控應用與即時控制系統理解方向發展。",
        skills: ["飛行判斷", "空間反應", "任務操作", "壓力下穩定決策"],
        hook: "如果你看到 FPV 頭盔和障礙關卡就想親自上場，代表你很可能對飛控與即時任務有天然興趣。",
        resultIcon: "./assets/results/flight-operator.svg"
      },
      signal: {
        name: "訊號整合工程師",
        styleLabel: "系統統籌型",
        summary: "你最容易看見不同裝置如何合作完成任務。從 VR 畫面、飛控判斷到 AI 設備，你會自然去想訊號怎麼傳、資料怎麼接、系統怎麼串起來。",
        fit: "可往感測、控制、通訊、AIoT 與跨系統整合方向發展。",
        skills: ["訊號與傳輸理解", "控制與串接", "跨系統整合", "整體架構思考"],
        hook: "如果你最在意的是不同裝置怎麼彼此合作，那你很可能就是把整套系統串起來的那個人。",
        resultIcon: "./assets/results/signal-integrator.svg"
      },
      maker: {
        name: "沉浸互動實作家",
        styleLabel: "體驗打造型",
        summary: "你很擅長把技術想成體驗，把抽象功能變成可以看、可以玩、可以操作的內容。你會對展攤互動、裝置實作和體驗設計特別有感。",
        fit: "可往互動裝置、跨域專題、展示實作與科技體驗設計方向發展。",
        skills: ["互動發想", "展示實作", "體驗設計", "創意轉化"],
        hook: "如果你不只想懂技術，還想把它做成讓別人一玩就記住的體驗，那這張卡很像你。",
        resultIcon: "./assets/results/immersive-maker.svg"
      }
    }
  };

  const SMART_FACTORY_SCENE = {
    id: "smart-factory-mission-station",
    title: "智慧工廠任務站",
    subtitle: "Smart Factory Mission Station",
    description: "透過感測、控制、檢測與產線判斷任務，理解電子工程如何讓智慧工廠穩定運作。",
    hero: {
      eyebrow: "SMART FACTORY",
      title: "智慧工廠任務站",
      copy: "你將進入一條出現異常訊號的示範產線，從感測、控制、檢測到流程判斷，體驗電子工程如何讓智慧工廠恢復穩定。"
    },
    panel: {
      badge: "第三場景",
      level: "工廠任務",
      tags: ["感測器", "自動化", "品質檢測", "控制邏輯", "排序題", "配對題", "智慧工廠", "產線"]
    },
    theme: {
      accent: "#355f6f",
      surface: "#efe3d1"
    },
    cover: "./assets/scenes/smart-factory-mission-station/cover.svg",
    previewImage: "./assets/scenes/smart-factory-mission-station/cover.svg",
    landing: {
      title: "開始智慧工廠任務站",
      copy: "一條示範產線亮起警示，你要幫忙判斷哪個訊號最重要、設備扮演什麼角色，以及正確的處理流程。",
      rules: [
        "共 7 個互動節點，會先選一條短分支再回到主線。",
        "你會接觸感測器、檢測站、控制器與產線流程判斷。",
        "限時題會模擬異常發生時的快速決策壓力。",
        "完成後可得到一張屬於你的智慧工廠職涯角色卡。"
      ]
    },
    leaderboard: {
      eventCode: "smart-factory-mission-station-2026"
    },
    settings: {
      questionCount: 7,
      defaultTimeLimit: 12
    },
    resultOutro: "當你能把感測、控制、檢測和流程整合成一套穩定系統時，就正在接近智慧工廠背後真正的電子工程能力。",
    questions: [
      {
        id: "factory-q1",
        type: "single-choice",
        prompt: "智慧工廠和傳統工廠最大的差別是什麼？",
        description: "先抓住核心觀念：智慧工廠不是只有機器，而是感測、控制、資料與設備一起協作。",
        correctId: "smart-system",
        topic: "智慧工廠概念",
        answers: [
          { id: "fresh-paint", label: "機器設備看起來比較新", detail: "外觀更新不等於具備智慧能力。", trait: "operations" },
          { id: "smart-system", label: "感測、控制、資料與設備可以協作判斷", detail: "這才是智慧工廠真正的核心。", trait: "automation" },
          { id: "no-human", label: "工廠裡一定完全沒有人", detail: "智慧工廠不代表完全無人，而是更聰明地協作。", trait: "control" },
          { id: "robot-only", label: "只要有機械手臂就算智慧工廠", detail: "單一設備不等於完整的智慧系統。", trait: "maker" }
        ]
      },
      {
        id: "factory-q2",
        type: "branching",
        prompt: "警示燈亮起後，你想先從哪裡開始檢查？",
        description: "你可以先看感測器警示，也可以先看產線節奏，兩條線最後都會回到同一個工廠任務結論。",
        topic: "任務入口",
        correctId: "sensor-first",
        choices: [
          {
            id: "sensor-first",
            label: "先看感測器和警示訊號",
            detail: "從數據和異常訊號切入，先抓出最可能的問題來源。",
            trait: "inspection",
            next: "factory-q3-sensor"
          },
          {
            id: "line-first",
            label: "先看產線流程和機台動作",
            detail: "從流程節奏切入，先找出哪個動作卡住了整條線。",
            trait: "operations",
            next: "factory-q3-line"
          }
        ]
      },
      {
        id: "factory-q3-sensor",
        type: "timed-choice",
        prompt: "你只有 8 秒判斷，哪個訊號最值得先處理？",
        description: "當警示同時出現時，要先抓最能代表異常風險的訊號。",
        topic: "感測器快判",
        correctId: "temp-alert",
        timeLimit: 8,
        countdownLabel: "8 秒快判",
        urgencyText: "先找出真正代表設備異常的訊號，時間到就要立刻決定。",
        answers: [
          { id: "temp-alert", label: "溫度持續超標且警示燈轉紅", detail: "這通常代表設備狀態已經不穩定。", trait: "inspection" },
          { id: "poster-crooked", label: "牆上海報有點歪", detail: "和產線異常沒有直接關係。", trait: "maker" },
          { id: "staff-chat", label: "工作人員剛好在聊天", detail: "不一定和設備警示有關。", trait: "operations" },
          { id: "music-loud", label: "背景音樂突然變大聲", detail: "和產線控制無關。", trait: "maker" }
        ],
        next: "factory-q4-sensor"
      },
      {
        id: "factory-q4-sensor",
        type: "image-choice",
        prompt: "哪個最像是在智慧工廠中負責蒐集狀態資料的區域？",
        description: "用圖片辨識最接近感測器監測站的設備區塊。",
        topic: "感測區辨識",
        correctId: "sensor-station",
        options: [
          {
            id: "sensor-station",
            label: "感測器監測站",
            detail: "負責蒐集溫度、狀態與異常訊號等資料。",
            alt: "感測器監測站示意圖",
            image: "./assets/scenes/smart-factory-mission-station/sensor-line.svg",
            trait: "inspection"
          },
          {
            id: "office-desk",
            label: "一般辦公桌區",
            detail: "不是工廠現場蒐集資料的核心區域。",
            alt: "辦公桌區示意圖",
            image: buildSceneIllustration({
              title: "Office Desk",
              subtitle: "Support Area",
              accent: "#8a7a62",
              highlight: "#cbb597",
              symbol: "□"
            }),
            trait: "operations"
          },
          {
            id: "billboard",
            label: "展示看板區",
            detail: "可以說明內容，但不直接蒐集狀態資料。",
            alt: "展示看板區示意圖",
            image: buildSceneIllustration({
              title: "Info Board",
              subtitle: "Display Only",
              accent: "#526b7a",
              highlight: "#9ec0cf",
              symbol: "△"
            }),
            trait: "maker"
          }
        ],
        next: "factory-q5"
      },
      {
        id: "factory-q3-line",
        type: "timed-choice",
        prompt: "如果產線節奏突然變慢，你最先該注意什麼？",
        description: "流程卡住時，先找最可能影響整條線節奏的原因。",
        topic: "流程快判",
        correctId: "belt-sync",
        timeLimit: 8,
        countdownLabel: "8 秒快判",
        urgencyText: "先找出讓整條線變慢的關鍵環節，別被旁邊資訊分心。",
        answers: [
          { id: "belt-sync", label: "輸送帶和機台動作是否不同步", detail: "節奏不同步常常會直接拖慢整條產線。", trait: "operations" },
          { id: "wall-color", label: "工廠牆面是不是太暗", detail: "和產線節奏無關。", trait: "maker" },
          { id: "visitor-photo", label: "參觀者有沒有在拍照", detail: "不會直接造成流程變慢。", trait: "inspection" },
          { id: "poster-font", label: "海報字體夠不夠大", detail: "和機台節奏沒有直接關係。", trait: "maker" }
        ],
        next: "factory-q4-line"
      },
      {
        id: "factory-q4-line",
        type: "image-choice",
        prompt: "哪個最像是在智慧工廠中執行搬運或流程動作的設備？",
        description: "辨識最接近產線執行設備的圖像。",
        topic: "產線設備辨識",
        correctId: "inspection-line",
        options: [
          {
            id: "inspection-line",
            label: "輸送帶與檢測 / 執行站",
            detail: "最接近產線節奏與動作執行的現場設備。",
            alt: "輸送帶與檢測站示意圖",
            image: "./assets/scenes/smart-factory-mission-station/inspection-station.svg",
            trait: "control"
          },
          {
            id: "meeting-room",
            label: "會議桌區",
            detail: "不是現場執行產線動作的設備。",
            alt: "會議桌區示意圖",
            image: buildSceneIllustration({
              title: "Meeting Room",
              subtitle: "Discussion",
              accent: "#6a6f79",
              highlight: "#b1bac6",
              symbol: "○"
            }),
            trait: "operations"
          },
          {
            id: "poster-area",
            label: "宣傳海報區",
            detail: "用來說明，不是執行產線動作的核心站點。",
            alt: "宣傳海報區示意圖",
            image: buildSceneIllustration({
              title: "Poster Area",
              subtitle: "Visual Guide",
              accent: "#7e6749",
              highlight: "#d0ae82",
              symbol: "◇"
            }),
            trait: "maker"
          }
        ],
        next: "factory-q5"
      },
      {
        id: "factory-q5",
        type: "matching",
        prompt: "請把工廠設備和最接近的功能配對起來。",
        description: "看懂感測、檢測、控制與執行設備在智慧工廠中的不同角色。",
        topic: "設備功能配對",
        trait: "automation",
        instructions: "把左邊的設備，配到右邊最適合的功能說明。",
        leftItems: [
          { id: "sensor", label: "感測器", detail: "負責讀取溫度、狀態與異常資料。" },
          { id: "camera", label: "檢測相機", detail: "負責觀察瑕疵、偏差與品質問題。" },
          { id: "controller", label: "控制器", detail: "負責協調設備反應與流程調整。" },
          { id: "conveyor", label: "輸送帶 / 執行站", detail: "負責搬運、動作與實際流程執行。" }
        ],
        rightItems: [
          { id: "collect", label: "蒐集狀態資料" },
          { id: "inspect", label: "找出瑕疵或異常" },
          { id: "coordinate", label: "協調機台反應" },
          { id: "execute", label: "執行搬運或動作" }
        ],
        pairs: [
          { leftId: "sensor", rightId: "collect" },
          { leftId: "camera", rightId: "inspect" },
          { leftId: "controller", rightId: "coordinate" },
          { leftId: "conveyor", rightId: "execute" }
        ]
      },
      {
        id: "factory-q6",
        type: "ordering",
        prompt: "如果產線出現異常，哪個處理順序最合理？",
        description: "當產線不穩時，先做哪一步，後做哪一步，決定了整個恢復效率。",
        topic: "異常處理流程",
        trait: "operations",
        instructions: "把異常處理流程排成最合理的順序。",
        items: [
          { id: "detect", label: "先偵測異常", detail: "從警示、數據或檢測結果發現問題。" },
          { id: "judge", label: "判斷是哪個環節出問題", detail: "確認問題來源與影響範圍。" },
          { id: "adjust", label: "調整設備或流程", detail: "依照判斷結果做出調整。" },
          { id: "verify", label: "再次檢查結果", detail: "確認異常是否真的解除。" },
          { id: "resume", label: "恢復正常運作", detail: "在確認穩定後讓產線回到原本節奏。" }
        ],
        correctOrder: ["detect", "judge", "adjust", "verify", "resume"]
      },
      {
        id: "factory-q7",
        type: "single-choice",
        prompt: "為什麼智慧工廠也是電子工程師的重要舞台？",
        description: "最後一題把感測、控制、檢測與自動化整合拉回電子工程的核心價值。",
        correctId: "engineering-stage",
        topic: "核心訊息",
        answers: [
          { id: "machine-only", label: "因為只要有機器就一定和電子工程有關", detail: "太過簡化，沒有說到真正的整合能力。", trait: "control" },
          { id: "engineering-stage", label: "因為感測、控制、檢測與自動化整合都需要電子工程能力", detail: "這正是智慧工廠成為電子工程舞台的原因。", trait: "automation" },
          { id: "more-fun", label: "因為工廠比實驗室更熱鬧", detail: "熱鬧與否不是這個場景想表達的重點。", trait: "maker" },
          { id: "all-ai", label: "因為工廠裡每台設備都一定是 AI", detail: "智慧工廠不等於所有設備都只是 AI。", trait: "inspection" }
        ]
      }
    ],
    results: {
      control: {
        name: "產線控制指揮員",
        styleLabel: "穩定判斷型",
        summary: "你很擅長看懂機台節奏與控制邏輯，遇到異常時會優先思考怎麼讓設備恢復穩定、正確地運作。",
        fit: "很適合往設備控制、控制系統、智慧產線協調與現場控制應用方向發展。",
        skills: ["控制邏輯", "機台節奏判讀", "設備狀態分析", "穩定運作思維"],
        hook: "如果你看到產線卡住時第一個想到的是怎麼讓節奏重新穩下來，這張卡很像你。",
        resultIcon: "./assets/results/line-control-director.svg"
      },
      inspection: {
        name: "品質檢測觀察員",
        styleLabel: "細節敏感型",
        summary: "你很容易注意到細節差異與異常訊號，適合站在品質檢查與狀態判讀的第一線，提早發現問題。",
        fit: "可往品質檢測、影像檢查、感測判讀與異常辨識方向發展。",
        skills: ["異常辨識", "品質觀察", "感測資料判讀", "細節追蹤"],
        hook: "如果你會被警示燈號、數據變化和檢測結果吸引，代表你有很強的檢測敏感度。",
        resultIcon: "./assets/results/quality-inspection-observer.svg"
      },
      automation: {
        name: "自動化整合工程師",
        styleLabel: "系統串接型",
        summary: "你最擅長看見不同設備與資料如何合作成一套流程，會自然去想感測、控制與執行該怎麼整合在一起。",
        fit: "很適合往智慧工廠、自動化系統、AIoT 整合與工業控制應用方向發展。",
        skills: ["系統整合", "流程協作", "自動化概念", "跨設備串接"],
        hook: "如果你會不自覺地把感測器、控制器和產線流程想成一整套系統，那你很像真正的整合者。",
        resultIcon: "./assets/results/automation-integration-engineer.svg"
      },
      operations: {
        name: "智慧維運調度員",
        styleLabel: "流程推進型",
        summary: "你擅長從現場流程和節奏出發，判斷先後順序與實際應變方式，會優先思考怎麼讓整條線順利恢復。",
        fit: "很適合往智慧維運、現場調度、流程優化與生產協調方向發展。",
        skills: ["流程判斷", "現場應變", "產線調度", "恢復運作規劃"],
        hook: "如果你最在意的是整條產線怎麼重新順起來，代表你很有現場調度與維運思維。",
        resultIcon: "./assets/results/smart-operations-coordinator.svg"
      }
    }
  };

  const SMART_CARE_SCENE = {
    id: "smart-care-mission-station",
    title: "智慧照護任務站",
    subtitle: "Smart Care Mission Station",
    description: "把智慧醫療與長照照護情境帶進互動任務，理解科技如何幫助安全、陪伴與照護判斷。",
    hero: {
      eyebrow: "SMART CARE",
      title: "智慧照護任務站",
      copy: "你將走進一個結合智慧醫療與長照支持的照護空間，從生命徵象、離床提醒到遠距關懷，體驗電子工程如何讓照護更即時也更有溫度。"
    },
    panel: {
      badge: "第四場景",
      level: "照護任務",
      tags: ["智慧醫療", "長照", "生命徵象", "安全提醒", "遠距照護", "10 題", "情境題", "關懷科技"]
    },
    theme: {
      accent: "#6e9e9b",
      surface: "#f3ede4"
    },
    cover: "./assets/scenes/smart-care-mission-station/cover.svg",
    previewImage: "./assets/scenes/smart-care-mission-station/cover.svg",
    landing: {
      title: "開始智慧照護任務站",
      copy: "今天你要協助一個智慧照護中心判讀提醒、理解裝置功能，並從長者、照護者與家屬三個角度思考科技真正想幫助的是什麼。",
      rules: [
        "共 10 個互動節點，會先選擇一條短分支，再回到共同主線。",
        "題目敘述更長，會帶入長者、照護現場與家屬情境。",
        "限時題會模擬提醒出現時的快速判斷壓力。",
        "完成後可得到一張屬於你的智慧照護角色卡。"
      ]
    },
    leaderboard: {
      eventCode: "smart-care-mission-station-2026"
    },
    settings: {
      questionCount: 10,
      defaultTimeLimit: 14
    },
    resultOutro: "當科技能幫助照護者更早看見風險、讓家屬更安心、也讓長者保有更多安全與尊嚴時，電子工程就不只是技術，而是更貼近人的照護支持。",
    questions: [
      {
        id: "care-q1",
        type: "single-choice",
        prompt: "林奶奶剛入住智慧照護中心。照護團隊希望在不頻繁打擾她休息的情況下，仍能更早注意到身體狀況與安全風險。從這個情境來看，智慧照護最核心想幫助的是什麼？",
        description: "這一題先建立場景的價值觀：科技不是為了炫耀，而是為了更細緻地支持照護。",
        correctId: "care-support",
        topic: "智慧照護核心",
        answers: [
          { id: "look-high-tech", label: "讓照護空間看起來更高科技", detail: "有科技感不等於真正幫到照護。", trait: "systems" },
          { id: "care-support", label: "讓提醒、感測與照護判斷更即時，幫助安全與陪伴", detail: "這才是智慧照護真正的核心。", trait: "care" },
          { id: "replace-people", label: "讓所有照護工作都完全交給機器", detail: "科技應該協助人，而不是完全取代人。", trait: "support" },
          { id: "family-ignore", label: "讓家屬完全不用再關心長者狀況", detail: "智慧照護反而能讓家屬更安心、更有連結。", trait: "vitals" }
        ]
      },
      {
        id: "care-q2",
        type: "branching",
        prompt: "今天早上系統同時出現兩種提醒：一個是生命徵象面板有波動，另一個是房間環境出現離床警示。你想先從哪裡開始看？",
        description: "你可以先看生命徵象，也可以先看環境警示，兩條線最後都會回到同一個照護任務主線。",
        topic: "任務入口",
        correctId: "vitals-first",
        choices: [
          {
            id: "vitals-first",
            label: "先看生命徵象與感測資料",
            detail: "從血氧、心率等變化切入，先判斷身體狀況是否值得優先處理。",
            trait: "vitals",
            next: "care-q3-vitals"
          },
          {
            id: "room-first",
            label: "先看環境與離床提醒",
            detail: "從安全風險與照護空間切入，先確認長者是不是正在面臨跌倒風險。",
            trait: "care",
            next: "care-q3-room"
          }
        ]
      },
      {
        id: "care-q3-vitals",
        type: "timed-choice",
        prompt: "陳伯伯剛做完復健回房，系統突然顯示血氧下降、心率略快，同時也跳出一則一般活動提醒。你只有 8 秒先做判斷，哪一個資訊最值得先關注？",
        description: "當多個提醒一起出現時，先找最能代表身體狀況風險的那一項。",
        topic: "生命徵象快判",
        correctId: "oxygen-first",
        timeLimit: 8,
        countdownLabel: "8 秒快判",
        urgencyText: "先抓出真正代表身體風險的訊號，再決定下一步。",
        answers: [
          { id: "oxygen-first", label: "血氧下降與生命徵象波動", detail: "這是最直接反映身體狀況的警訊。", trait: "vitals" },
          { id: "tv-program", label: "房內電視目前正在播放哪個節目", detail: "和照護判斷沒有直接關係。", trait: "support" },
          { id: "poster-straight", label: "牆上海報是否放正", detail: "不是照護風險重點。", trait: "systems" },
          { id: "hall-busy", label: "今天大廳是不是比較熱鬧", detail: "無法直接幫助身體狀況判斷。", trait: "care" }
        ],
        next: "care-q4-vitals"
      },
      {
        id: "care-q4-vitals",
        type: "image-choice",
        prompt: "如果照護團隊想在不一直打擾長者休息的情況下，持續掌握基本生理變化，哪種設備最符合這個需求？",
        description: "找出最接近生命徵象監測用途的智慧照護設備。",
        topic: "生命徵象設備辨識",
        correctId: "vitals-monitor",
        options: [
          {
            id: "vitals-monitor",
            label: "智慧生命徵象監測設備",
            detail: "能在較低干擾下持續協助掌握生理狀況。",
            alt: "智慧生命徵象監測設備示意圖",
            image: "./assets/scenes/smart-care-mission-station/vitals-monitor.svg",
            trait: "vitals"
          },
          {
            id: "office-printer",
            label: "辦公室印表設備",
            detail: "和生命徵象追蹤沒有直接關係。",
            alt: "辦公室印表設備示意圖",
            image: buildSceneIllustration({
              title: "Office Printer",
              subtitle: "Admin Device",
              accent: "#907962",
              highlight: "#d5b695",
              symbol: "□"
            }),
            trait: "support"
          },
          {
            id: "display-wall",
            label: "宣傳展示螢幕",
            detail: "能呈現資訊，但不是主要監測設備。",
            alt: "宣傳展示螢幕示意圖",
            image: buildSceneIllustration({
              title: "Display Wall",
              subtitle: "Info Screen",
              accent: "#5f7e8f",
              highlight: "#b5d1d8",
              symbol: "△"
            }),
            trait: "systems"
          }
        ],
        next: "care-q5"
      },
      {
        id: "care-q3-room",
        type: "timed-choice",
        prompt: "黃奶奶半夜常會自己起身找水喝。今晚系統突然跳出離床提醒，而她最近又有跌倒風險紀錄。你只有 8 秒先做判斷，最值得先注意的是哪個面向？",
        description: "當安全提醒出現時，要先找對真正和風險相關的線索。",
        topic: "安全提醒快判",
        correctId: "leave-bed-risk",
        timeLimit: 8,
        countdownLabel: "8 秒快判",
        urgencyText: "先看最可能和跌倒風險直接相關的訊號。",
        answers: [
          { id: "leave-bed-risk", label: "是否有離床與跌倒風險需要立刻確認", detail: "這是最直接的安全風險。", trait: "care" },
          { id: "curtain-color", label: "她房間窗簾顏色是否太深", detail: "和風險判斷沒有直接關聯。", trait: "systems" },
          { id: "family-sticker", label: "家屬傳來的貼圖是不是很可愛", detail: "可以帶來關心，但不是當下優先資訊。", trait: "support" },
          { id: "dinner-menu", label: "今天晚餐菜色是不是清淡", detail: "不是這一刻最關鍵的判斷。", trait: "vitals" }
        ],
        next: "care-q4-room"
      },
      {
        id: "care-q4-room",
        type: "image-choice",
        prompt: "如果想在長者夜間起身時更早注意到風險，哪種設備最符合智慧照護的用途？",
        description: "辨識最接近離床或床邊安全提醒用途的設備。",
        topic: "床邊安全設備辨識",
        correctId: "bedside-sensor",
        options: [
          {
            id: "bedside-sensor",
            label: "床邊感測 / 離床提醒設備",
            detail: "能更早幫助照護團隊注意夜間安全風險。",
            alt: "床邊感測與離床提醒設備示意圖",
            image: "./assets/scenes/smart-care-mission-station/bedside-sensor.svg",
            trait: "care"
          },
          {
            id: "meeting-monitor",
            label: "會議室投影設備",
            detail: "和夜間長者安全監測沒有直接關係。",
            alt: "會議室投影設備示意圖",
            image: buildSceneIllustration({
              title: "Meeting Display",
              subtitle: "Conference Use",
              accent: "#667383",
              highlight: "#c2c9d4",
              symbol: "○"
            }),
            trait: "support"
          },
          {
            id: "poster-rack",
            label: "展示立牌",
            detail: "不負責夜間安全監測。",
            alt: "展示立牌示意圖",
            image: buildSceneIllustration({
              title: "Poster Rack",
              subtitle: "Display Only",
              accent: "#8c7b67",
              highlight: "#dbc5a8",
              symbol: "◇"
            }),
            trait: "systems"
          }
        ],
        next: "care-q5"
      },
      {
        id: "care-q5",
        type: "single-choice",
        prompt: "一位長者在照護中心內行走比較不穩，但又不希望被過度打擾。從照護角度來看，跌倒偵測或離床提醒設備最大的價值是什麼？",
        description: "這題要把科技和長者感受一起放進判斷，不只是看功能而已。",
        topic: "安全提醒價值",
        correctId: "safety-first",
        answers: [
          { id: "safety-first", label: "讓照護者能更早注意風險，必要時即時協助", detail: "這是安全提醒最重要的價值。", trait: "care" },
          { id: "more-tech", label: "讓照護空間看起來更像科技展", detail: "有科技感不代表真正幫到照護。", trait: "systems" },
          { id: "no-rounds", label: "讓照護者完全不用再巡房", detail: "科技可以輔助，但不能把照護責任完全拿掉。", trait: "support" },
          { id: "no-move", label: "讓長者永遠不要自己活動", detail: "照護目標是安全與尊嚴，不是完全限制。", trait: "vitals" }
        ]
      },
      {
        id: "care-q6",
        type: "matching",
        prompt: "請把智慧照護裝置和最接近的功能配對起來。",
        description: "看懂不同裝置在照護現場各自幫助的是哪一種需求。",
        topic: "裝置功能配對",
        trait: "systems",
        instructions: "把左邊的裝置，配到最適合的功能說明。",
        leftItems: [
          { id: "oxygen-sensor", label: "血氧 / 生命徵象感測", detail: "協助掌握基本生理狀況。" },
          { id: "bed-alert", label: "離床提醒設備", detail: "協助照護團隊留意安全風險。" },
          { id: "med-reminder", label: "用藥提醒設備", detail: "協助長者規律照護。" },
          { id: "remote-platform", label: "遠距照護平台", detail: "協助家屬與照護團隊掌握狀況。" }
        ],
        rightItems: [
          { id: "track-vitals", label: "監測生理狀況" },
          { id: "notice-safety", label: "協助注意安全風險" },
          { id: "support-med", label: "協助規律照護" },
          { id: "share-status", label: "讓家屬或團隊掌握狀況" }
        ],
        pairs: [
          { leftId: "oxygen-sensor", rightId: "track-vitals" },
          { leftId: "bed-alert", rightId: "notice-safety" },
          { leftId: "med-reminder", rightId: "support-med" },
          { leftId: "remote-platform", rightId: "share-status" }
        ]
      },
      {
        id: "care-q7",
        type: "branching",
        prompt: "下午同時出現兩件事：一位長者的提醒燈亮起，另一邊家屬也透過遠距平台查詢今天的狀況。你會先處理哪一件？",
        description: "這題不是要否定任何一方，而是看你會先怎麼安排照護現場優先順序。",
        topic: "現場優先順序",
        correctId: "resident-first",
        choices: [
          {
            id: "resident-first",
            label: "先確認現場長者目前是否安全",
            detail: "先確保現場安全，再回應其他查詢會比較合理。",
            trait: "care",
            next: "care-q8"
          },
          {
            id: "family-first",
            label: "先回覆家屬查詢，讓對方安心",
            detail: "家屬安心很重要，但通常仍要先確認現場狀況。",
            trait: "support",
            next: "care-q8"
          }
        ]
      },
      {
        id: "care-q8",
        type: "ordering",
        prompt: "當照護系統發出異常提醒後，哪一個處理順序最合理？",
        description: "科技給的是提醒，但好的照護還需要合理的處理流程。",
        topic: "異常處理流程",
        trait: "support",
        instructions: "把照護異常事件的處理順序排成最合理的流程。",
        items: [
          { id: "check-alert", label: "先確認警示內容", detail: "先看系統提醒代表的是哪一種狀況。" },
          { id: "check-person", label: "判斷長者當下狀況", detail: "把提醒和現場實際情況對起來。" },
          { id: "assist", label: "必要時通知照護者或前往協助", detail: "根據判斷結果做出實際支援。" },
          { id: "record", label: "記錄與回報狀況", detail: "讓資訊回到照護團隊流程中。" },
          { id: "follow-up", label: "持續追蹤後續變化", detail: "確認狀況是否穩定，不只處理當下。" }
        ],
        correctOrder: ["check-alert", "check-person", "assist", "record", "follow-up"]
      },
      {
        id: "care-q9",
        type: "single-choice",
        prompt: "智慧照護系統可以協助提醒、判讀與追蹤，但在長照現場，哪一件事仍然最不能被科技取代？",
        description: "這題是整個場景很重要的情緒核心，提醒我們科技價值在於支持人，而不是讓人消失。",
        topic: "科技與陪伴",
        correctId: "human-care",
        answers: [
          { id: "human-care", label: "人的陪伴、關心與實際互動", detail: "科技能協助，但無法取代真正的陪伴與照護關係。", trait: "care" },
          { id: "numbers-only", label: "所有決策都只看儀器數值", detail: "數據重要，但不能取代現場照護判斷。", trait: "systems" },
          { id: "no-talk", label: "完全不用再和長者說話", detail: "這會讓照護失去溫度。", trait: "support" },
          { id: "no-experience", label: "只要有數據就不需要照護經驗", detail: "照護經驗仍然很重要。", trait: "vitals" }
        ]
      },
      {
        id: "care-q10",
        type: "single-choice",
        prompt: "為什麼智慧醫療與長照照護也屬於電子工程的重要舞台？",
        description: "最後一題把感測、警示、資料傳輸、裝置設計與系統整合收束回電子工程的核心。",
        correctId: "engineering-care",
        topic: "核心收束",
        answers: [
          { id: "everything-ai", label: "因為只要出現在醫療場域的設備都一定是 AI", detail: "太過簡化，不是重點。", trait: "vitals" },
          { id: "engineering-care", label: "因為感測、警示、資料傳輸、裝置設計與系統整合都需要電子工程能力", detail: "這正是智慧照護成為電子工程舞台的原因。", trait: "systems" },
          { id: "doctor-only", label: "因為醫療設備只和醫師有關，和工程沒有關係", detail: "這忽略了設備與系統背後的工程支撐。", trait: "support" },
          { id: "software-only", label: "因為照護問題只靠軟體畫面就能解決", detail: "真正的照護還需要設備、感測、流程與人。", trait: "care" }
        ]
      }
    ],
    results: {
      vitals: {
        name: "生命訊號觀察員",
        styleLabel: "細膩判讀型",
        summary: "你很容易注意到生理數據與身體狀況的細微變化，會自然去觀察哪些訊號值得更早被看見。",
        fit: "很適合往生命徵象監測、感測資料判讀、智慧醫療設備理解與健康科技應用方向發展。",
        skills: ["生命徵象觀察", "感測資料判讀", "異常早期辨識", "狀態變化敏感度"],
        hook: "如果你總會先注意到身體狀況是否出現細微波動，這張卡會很像你。",
        resultIcon: "./assets/results/vitals-signal-observer.svg"
      },
      care: {
        name: "智慧照護協調員",
        styleLabel: "安心守護型",
        summary: "你最在意的不只是系統有沒有提醒，而是長者是否真的被好好照顧、是否感受到安全與陪伴。",
        fit: "很適合往智慧照護、長照支持、照護安全與人本科技應用方向發展。",
        skills: ["照護敏感度", "安全關懷", "人本判斷", "照護需求整合"],
        hook: "如果你關心的是長者當下有沒有安心，而不只是設備有沒有發聲，這張卡很有你的味道。",
        resultIcon: "./assets/results/smart-care-coordinator.svg"
      },
      systems: {
        name: "醫療系統整合師",
        styleLabel: "訊號串接型",
        summary: "你最容易看見裝置、平台、訊號與資料之間的關係，很像把整套智慧照護系統串起來的人。",
        fit: "很適合往醫療資訊系統、照護平台整合、智慧感測設備與跨系統應用方向發展。",
        skills: ["系統整合", "訊號與資料串接", "平台思維", "裝置協同理解"],
        hook: "如果你會自然去想不同裝置和平台怎麼合作，代表你很像整合整套系統的人。",
        resultIcon: "./assets/results/medical-systems-integrator.svg"
      },
      support: {
        name: "長照科技守護員",
        styleLabel: "流程陪伴型",
        summary: "你重視的不只是科技功能，而是它能不能真的幫到照護現場、減輕壓力、讓家屬更放心。",
        fit: "很適合往長照科技、智慧照護支援、照護流程優化與現場協作方向發展。",
        skills: ["照護流程理解", "現場支援", "協作思維", "家屬安心導向"],
        hook: "如果你很在意科技到底有沒有真的幫上人，而不是只停在功能展示，這張卡就很適合你。",
        resultIcon: "./assets/results/long-term-care-guardian.svg"
      }
    }
  };

  const SMART_FARM_TECH_MODULE = {
    id: "agri-tech",
    title: "技術題組",
    group: "技術與系統",
    description: "聚焦感測器、影像辨識、無人機巡田與資料平台，從技術角度理解智慧農業。",
    focusLabel: "感測與平台",
    landingPill: "技術與感測",
    questionCountLabel: "10 題",
    enabled: true,
    landing: {
      title: "技術題組啟動",
      copy: "你將從田間設備、感測資料與平台整合的角度，理解智慧農業怎麼把農場現場變成可觀察、可判斷、可調度的系統。",
      rules: [
        "共 10 題，聚焦感測器、影像、無人機、平台與資料流。",
        "這一組不只問設備名稱，更重視設備怎麼串成一套系統。",
        "結果卡會回饋你在智慧農業技術應用中的判斷風格。"
      ]
    },
    leaderboard: {
      eventCode: "smart-farm-global-mission-agri-tech"
    },
    settings: {
      questionCount: 10,
      defaultTimeLimit: 14
    },
    questions: [
      {
        id: "agri-tech-q1",
        type: "single-choice",
        prompt: "農場主人說：「我只看到田裡多了幾個設備，為什麼這就叫智慧農業？」哪一個回答最能說明真正的差別？",
        description: "這題想先建立：智慧農業不是把工具變多，而是讓農場變得更能判斷。",
        topic: "智慧農業核心概念",
        correctId: "data-loop",
        answers: [
          { id: "data-loop", label: "因為它能把感測、資料判讀與現場控制串成決策流程", detail: "關鍵不是設備數量，而是資訊能不能轉成行動。", trait: "systems" },
          { id: "more-machines", label: "只要裝越多機器，就一定越智慧", detail: "設備多不代表決策更好。", trait: "sensing" },
          { id: "phone-check", label: "只要可以用手機查看，就算智慧農業", detail: "遠端查看只是其中一部分。", trait: "analytics" },
          { id: "drone-only", label: "只要有無人機巡田，就已經完整智慧化", detail: "無人機很重要，但不是全部。", trait: "imaging" }
        ]
      },
      {
        id: "agri-tech-q2",
        type: "single-choice",
        prompt: "如果農場想更早發現環境異常，第一步最值得補上的技術能力是什麼？",
        description: "智慧農業常常先從「看得更早」開始，而不是從最複雜的 AI 開始。",
        topic: "感測基礎",
        correctId: "sensor-baseline",
        answers: [
          { id: "sensor-baseline", label: "先建立穩定的感測資料來源，例如土壤、溫濕度或環境監測", detail: "沒有基本資料，後面的判斷就不穩。", trait: "sensing" },
          { id: "buy-dashboard", label: "先買最漂亮的管理儀表板", detail: "沒有可靠資料，畫面再好也不夠。", trait: "systems" },
          { id: "skip-data", label: "先省略感測，等有問題再處理", detail: "這樣很難提早發現異常。", trait: "analytics" },
          { id: "full-robot", label: "先全面自動化所有流程", detail: "沒有資料基礎就直接自動化，風險很高。", trait: "automation" }
        ]
      },
      {
        id: "agri-tech-q3",
        type: "timed-choice",
        prompt: "一座農場儀表板突然顯示：某區溫度異常升高、濕度下降，且影像辨識標記葉面顏色改變。你先抓哪個重點？",
        description: "限時題模擬的是多來源訊號同時出現時，先判斷什麼最重要。",
        topic: "異常判讀",
        correctId: "multi-signal",
        timeLimit: 8,
        countdownLabel: "8 秒快速判斷",
        urgencyText: "先抓關鍵，不要看到警示就只盯著單一畫面。",
        answers: [
          { id: "multi-signal", label: "先確認這些異常是否互相呼應，判斷是不是同一個現場問題", detail: "智慧農業常常需要合併多個訊號一起看。", trait: "systems" },
          { id: "camera-only", label: "只看影像畫面就好，其他資料先忽略", detail: "只看單一來源容易誤判。", trait: "imaging" },
          { id: "temperature-only", label: "只看溫度高低，其他警示先不管", detail: "環境變化通常不是只靠一個數值判斷。", trait: "sensing" },
          { id: "wait-next-day", label: "等明天再觀察一次，今天先不處理", detail: "如果訊號已經同步異常，拖延可能錯過處理時機。", trait: "analytics" }
        ]
      },
      {
        id: "agri-tech-q4",
        type: "image-choice",
        prompt: "下面哪一組畫面最像是智慧農業中「感測 + 平台」一起工作的樣子？",
        description: "這題不是要你記設備外觀，而是理解哪種組合最接近資料化農場。",
        topic: "設備辨識",
        correctId: "sensor-platform",
        options: [
          {
            id: "sensor-platform",
            label: "感測器、天氣站與管理面板一起運作",
            detail: "它代表田間資訊能被收集並送進判讀平台。",
            alt: "感測器與平台整合示意",
            image: buildSceneIllustration({ title: "Field Sensors", subtitle: "Platform Linked", accent: "#2f7b4f", highlight: "#a6d39b", symbol: "感" }),
            trait: "sensing"
          },
          {
            id: "tractor-only",
            label: "大型農機作業畫面",
            detail: "農機重要，但不等於資料化監測平台。",
            alt: "大型農機示意",
            image: buildSceneIllustration({ title: "Farm Machine", subtitle: "Field Work", accent: "#9b6b2a", highlight: "#e8c66e", symbol: "機" }),
            trait: "automation"
          },
          {
            id: "warehouse-only",
            label: "倉儲空間與堆疊箱",
            detail: "這比較接近物流或倉儲情境，不是田間感測本體。",
            alt: "倉儲空間示意",
            image: buildSceneIllustration({ title: "Warehouse", subtitle: "Storage", accent: "#536272", highlight: "#c8d0d9", symbol: "倉" }),
            trait: "analytics"
          },
          {
            id: "market-stall",
            label: "農產品市集攤位",
            detail: "這更偏銷售現場，而不是農場監測系統。",
            alt: "市集攤位示意",
            image: buildSceneIllustration({ title: "Market Stall", subtitle: "Retail", accent: "#7e4f7b", highlight: "#d8a8d4", symbol: "售" }),
            trait: "imaging"
          }
        ]
      },
      {
        id: "agri-tech-q5",
        type: "single-choice",
        prompt: "無人機巡田在智慧農業中的價值，最接近下面哪一種說法？",
        description: "很多人先想到空拍，但真正有價值的是它和現場管理怎麼連起來。",
        topic: "無人機應用",
        correctId: "coverage-alert",
        answers: [
          { id: "coverage-alert", label: "它能快速巡視較大範圍，幫助農場提早發現異常區域", detail: "重點是提高觀察效率與異常定位能力。", trait: "imaging" },
          { id: "replace-all", label: "有無人機後，就不需要地面感測器", detail: "影像和感測資料通常是互補，不是完全取代。", trait: "sensing" },
          { id: "marketing-only", label: "主要用途是拍宣傳影片，和管理沒有太大關係", detail: "巡田的管理價值才是智慧農業裡的重點。", trait: "automation" },
          { id: "fly-everywhere", label: "只要每天飛一次，就一定能解決所有農場問題", detail: "工具再強，也需要搭配正確的判讀流程。", trait: "systems" }
        ]
      },
      {
        id: "agri-tech-q6",
        type: "branching",
        prompt: "農場收到 AI 警示：某區疑似有病害風險。團隊一派想立刻處理，另一派想先用更多資料交叉確認。你會先採哪個方向？",
        description: "這題要你感受智慧農業中的『快速反應』和『避免誤判』之間的平衡。",
        topic: "AI 警示決策",
        correctId: "confirm-first",
        choices: [
          {
            id: "act-first",
            label: "先直接處理，避免風險擴大",
            detail: "這代表你傾向先控制風險，但可能增加誤判成本。",
            trait: "automation",
            next: "agri-tech-q7"
          },
          {
            id: "confirm-first",
            label: "先用感測與現場資料交叉確認，再決定處理",
            detail: "這更接近資料驅動的穩健判斷。",
            trait: "analytics",
            next: "agri-tech-q7"
          }
        ]
      },
      {
        id: "agri-tech-q7",
        type: "matching",
        prompt: "請把智慧農場常見工具和它最接近的功能配對起來。",
        description: "這題重點不是背名稱，而是知道各工具各自在系統裡扮演什麼角色。",
        topic: "工具與功能配對",
        trait: "sensing",
        leftItems: [
          { id: "soil-sensor", label: "土壤感測器" },
          { id: "camera-ai", label: "影像辨識系統" },
          { id: "drone-scout", label: "巡田無人機" },
          { id: "dashboard", label: "農場儀表板" }
        ],
        rightItems: [
          { id: "see-soil", label: "持續掌握田間環境數值" },
          { id: "see-pattern", label: "辨識畫面中的異常樣態" },
          { id: "see-area", label: "快速巡視大範圍作物區域" },
          { id: "combine-data", label: "整合多來源資訊供管理判斷" }
        ],
        pairs: [
          { leftId: "soil-sensor", rightId: "see-soil" },
          { leftId: "camera-ai", rightId: "see-pattern" },
          { leftId: "drone-scout", rightId: "see-area" },
          { leftId: "dashboard", rightId: "combine-data" }
        ]
      },
      {
        id: "agri-tech-q8",
        type: "ordering",
        prompt: "如果要讓一個田間異常從『被發現』走到『變成行動』，下面流程最合理的順序是什麼？",
        description: "智慧農業真正重要的是讓資料最後能走到現場處理。",
        topic: "資料流與決策流",
        trait: "systems",
        instructions: "請拖曳排序，從資料出現到農場採取行動。",
        items: [
          { id: "collect", label: "先取得田間感測或影像資料", detail: "系統第一步是有可靠資訊。" },
          { id: "analyze", label: "平台判讀資料並標出異常點", detail: "資料要先被整理成可理解的訊號。" },
          { id: "decide", label: "管理者判斷是否要介入處理", detail: "不是每個警示都會直接變成行動。" },
          { id: "respond", label: "現場執行巡查、調整或處理", detail: "最後一段才是具體行動。" }
        ],
        correctOrder: ["collect", "analyze", "decide", "respond"]
      },
      {
        id: "agri-tech-q9",
        type: "single-choice",
        prompt: "為什麼智慧農業裡常常要把感測器、影像與平台一起談，而不是各做各的？",
        description: "這題要收束『工具整合』而不是『工具堆疊』。",
        topic: "系統整合",
        correctId: "integration-value",
        answers: [
          { id: "integration-value", label: "因為單一工具只看到部分現場，整合後才更容易形成可靠判斷", detail: "智慧農業強調跨資料來源的判讀能力。", trait: "systems" },
          { id: "same-thing", label: "因為這三種工具其實功能完全一樣", detail: "它們通常是互補，不是一樣。", trait: "sensing" },
          { id: "cheaper-only", label: "主要只是因為整合比較便宜", detail: "整合有成本，真正價值在於判斷品質。", trait: "analytics" },
          { id: "replace-farmers", label: "因為整合後就能完全取代農場人員", detail: "智慧農業通常是協助判斷，不是把人完全拿掉。", trait: "automation" }
        ]
      },
      {
        id: "agri-tech-q10",
        type: "single-choice",
        prompt: "如果要用一句話說明『智慧農業技術題組』的核心精神，哪一個最貼切？",
        description: "最後一題收束的是：技術存在的目的，不只是把農場變酷。",
        topic: "技術的真正價值",
        correctId: "better-judgment",
        answers: [
          { id: "better-judgment", label: "讓農場更早看見問題、用更好的資訊做判斷", detail: "這是智慧農業技術真正的價值。", trait: "analytics" },
          { id: "more-screens", label: "讓農場畫面看起來更數位、更先進", detail: "好看不是核心目的。", trait: "imaging" },
          { id: "collect-all", label: "盡量蒐集越多資料越好，不必管怎麼用", detail: "資料不是越多越好，而是要能轉成決策。", trait: "sensing" },
          { id: "automation-only", label: "只要能自動化，就一定是最好的技術方向", detail: "自動化是工具，不是唯一目標。", trait: "automation" }
        ]
      }
    ],
    results: {
      sensing: {
        name: "田間感測觀察員",
        styleLabel: "訊號捕捉型",
        summary: "你很會先抓到田間真正值得被量測與持續觀察的訊號，適合站在農場最前線，讓資料從現場開始變得可信。",
        fit: "很適合往農業感測、環境監測、田間設備配置與資料採集方向發展。",
        skills: ["現場觀察", "感測思維", "數據意識", "環境訊號理解"],
        hook: "如果你會自然去問『先量哪裡、怎麼量比較準』，代表你很像把農場資料基礎打穩的人。",
        resultIcon: buildRoleIconSvg({ title: "田間感測觀察員", accent: "#2f7b4f", symbol: "感" })
      },
      imaging: {
        name: "作物影像判讀手",
        styleLabel: "畫面辨識型",
        summary: "你擅長從畫面與空間分布去理解農場異常，很像把影像資訊轉成管理線索的人。",
        fit: "很適合往影像辨識、農業巡檢、無人機應用與視覺判讀方向發展。",
        skills: ["視覺判讀", "異常察覺", "空間觀察", "巡檢邏輯"],
        hook: "如果你很會從場景變化和畫面細節找到問題，這張卡就很適合你。",
        resultIcon: buildRoleIconSvg({ title: "作物影像判讀手", accent: "#4f8c6a", symbol: "影" })
      },
      systems: {
        name: "農業系統整合師",
        styleLabel: "平台串接型",
        summary: "你最容易看到設備、資料與管理流程怎麼被串成一整套系統，很像把智慧農業真正落地的人。",
        fit: "很適合往農業 IoT、平台整合、智慧控制與跨設備應用方向發展。",
        skills: ["系統整合", "資料流理解", "平台思維", "跨工具協調"],
        hook: "如果你總是在想『這些工具怎麼合作』，代表你很像系統整合型人才。",
        resultIcon: buildRoleIconSvg({ title: "農業系統整合師", accent: "#227f67", symbol: "整" })
      },
      analytics: {
        name: "預測與平台分析員",
        styleLabel: "判讀決策型",
        summary: "你重視的不只是收資料，而是資料最後能不能轉成更好的判斷，像是讓農場管理真正變聰明的人。",
        fit: "很適合往資料分析、AI 預測、農場管理決策與儀表板判讀方向發展。",
        skills: ["資料判讀", "決策邏輯", "趨勢觀察", "平台分析"],
        hook: "如果你很在意『資料到底怎麼幫助決策』，這張卡很符合你的節奏。",
        resultIcon: buildRoleIconSvg({ title: "預測與平台分析員", accent: "#3e6fb1", symbol: "析" })
      }
    }
  };

  const SMART_FARM_ENERGY_MODULE = {
    id: "farm-energy",
    title: "能源題組",
    group: "技術與系統",
    description: "從抽水、冷鏈、溫室控制到再生能源，理解智慧農業的電力與能源議題。",
    focusLabel: "能源效率",
    landingPill: "能源調度",
    questionCountLabel: "10 題",
    enabled: true,
    landing: {
      title: "能源題組啟動",
      copy: "你將從抽水、冷藏、環控與再生能源的角度，理解智慧農業不是只省勞力，也要面對真實的用電壓力與能源選擇。",
      rules: [
        "共 10 題，聚焦農場哪裡用電、如何節能，以及自動化與能源的取捨。",
        "這一組不只談設備，更會帶到排程、效率與再生能源整合。",
        "結果卡會回饋你在農場能源議題中的思考風格。"
      ]
    },
    leaderboard: {
      eventCode: "smart-farm-global-mission-farm-energy"
    },
    settings: {
      questionCount: 10,
      defaultTimeLimit: 14
    },
    questions: [
      {
        id: "farm-energy-q1",
        type: "single-choice",
        prompt: "很多人以為農場只在『抽水』時才會用電。其實智慧農業中，哪一種說法更接近真實情況？",
        description: "先建立：智慧農場的能源議題不只在某一台機器上。",
        topic: "農場用電概念",
        correctId: "many-places",
        answers: [
          { id: "many-places", label: "抽水、冷鏈、溫室控制、感測與通訊都可能持續用電", detail: "智慧農場的電力分布比直覺更廣。", trait: "efficiency" },
          { id: "pump-only", label: "只有抽水設備才算真正的農業用電", detail: "其他控制與保存環節也常是重要用電來源。", trait: "pumping" },
          { id: "solar-only", label: "只要裝太陽能，能源問題就等於解決了", detail: "能源來源和能源管理是兩回事。", trait: "transition" },
          { id: "sensor-none", label: "感測器和平台的耗電可以完全忽略", detail: "個別裝置小，但系統累積起來仍需管理。", trait: "scheduling" }
        ]
      },
      {
        id: "farm-energy-q2",
        type: "single-choice",
        prompt: "如果一個農場的用電高峰常出現在抽水時段，最值得先理解的是什麼？",
        description: "這題強調：能源管理常常先從理解負載結構開始。",
        topic: "抽水負載",
        correctId: "timing-load",
        answers: [
          { id: "timing-load", label: "先看抽水時段、頻率與是否能調整排程", detail: "負載何時發生，會直接影響能源效率。", trait: "pumping" },
          { id: "ignore-pattern", label: "先不用看時段，電就是用越少越好", detail: "不知道峰值怎麼出現，很難真的改善。", trait: "efficiency" },
          { id: "buy-bigger", label: "直接換更大的抽水設備就能解決", detail: "設備升級不一定會降低整體耗能。", trait: "transition" },
          { id: "cut-sensors", label: "把感測器全部關掉，先省其他地方的小電", detail: "真正的大宗負載可能還是在抽水排程。", trait: "scheduling" }
        ]
      },
      {
        id: "farm-energy-q3",
        type: "timed-choice",
        prompt: "溫室系統警示：中午外部高溫將到、內部溫度正在上升、循環風扇與灌溉都可介入。你先抓哪個判斷？",
        description: "限時題模擬的是環控與用電選擇要一起看的時刻。",
        topic: "溫室環控判斷",
        correctId: "heat-load-priority",
        timeLimit: 8,
        countdownLabel: "8 秒快速判斷",
        urgencyText: "先抓最影響能耗與作物風險的核心條件。",
        answers: [
          { id: "heat-load-priority", label: "先判斷高溫風險與各種介入方式的負載差異", detail: "環控不是只開設備，而是判斷哪種方式更合適。", trait: "scheduling" },
          { id: "run-all", label: "所有設備全部一起開，最安全也最快", detail: "看似安全，但可能帶來不必要的高耗能。", trait: "pumping" },
          { id: "wait-manual", label: "等人員巡場再處理，現在先不動", detail: "若高溫已逼近，延後判斷可能增加風險。", trait: "transition" },
          { id: "ignore-energy", label: "只看作物舒適度，不用管設備負載", detail: "智慧農業常常要兼顧生產與能源效率。", trait: "efficiency" }
        ]
      },
      {
        id: "farm-energy-q4",
        type: "image-choice",
        prompt: "哪一種畫面最接近智慧農業中『能源使用要被管理』的情境？",
        description: "這題想讓你看到：能源議題常常藏在設備組合與調度邏輯裡。",
        topic: "能源場景辨識",
        correctId: "pump-panel",
        options: [
          {
            id: "pump-panel",
            label: "抽水與控制面板一起出現的灌溉節點",
            detail: "這類畫面最能直接連到農場負載與排程管理。",
            alt: "抽水與控制節點示意",
            image: buildSceneIllustration({ title: "Pump Control", subtitle: "Energy Node", accent: "#315f86", highlight: "#9fd0dc", symbol: "電" }),
            trait: "pumping"
          },
          {
            id: "fruit-basket",
            label: "採收完成的果物籃",
            detail: "它和生產有關，但不是能源管理核心畫面。",
            alt: "採收果物示意",
            image: buildSceneIllustration({ title: "Harvest Basket", subtitle: "Produce", accent: "#c37b2f", highlight: "#f1d08c", symbol: "果" }),
            trait: "efficiency"
          },
          {
            id: "open-field",
            label: "一般田區空景",
            detail: "沒有顯示足夠的能源調度資訊。",
            alt: "田區空景示意",
            image: buildSceneIllustration({ title: "Open Field", subtitle: "Landscape", accent: "#6f9852", highlight: "#d3e298", symbol: "田" }),
            trait: "transition"
          },
          {
            id: "market-box",
            label: "市場物流紙箱",
            detail: "偏向銷售或供應鏈，不是現場能源管理畫面。",
            alt: "物流紙箱示意",
            image: buildSceneIllustration({ title: "Logistics Box", subtitle: "Transport", accent: "#8a6b5a", highlight: "#dbc2b4", symbol: "箱" }),
            trait: "scheduling"
          }
        ]
      },
      {
        id: "farm-energy-q5",
        type: "single-choice",
        prompt: "冷鏈或儲存系統在智慧農業裡為什麼也屬於能源議題？",
        description: "這題想讓玩家看見：農業用電不只在田裡，也延伸到保存階段。",
        topic: "冷鏈能耗",
        correctId: "postharvest-energy",
        answers: [
          { id: "postharvest-energy", label: "因為採收後的保鮮與冷藏也會持續消耗電力，影響品質與成本", detail: "智慧農業的能源思考常常延續到田外。", trait: "efficiency" },
          { id: "only-transport", label: "冷鏈只是物流問題，和農場完全無關", detail: "很多農場的品質管理正好和冷鏈緊密相關。", trait: "transition" },
          { id: "no-electricity", label: "冷藏主要靠自然降溫，不太會用到電", detail: "實際上冷藏常是明顯的用電來源。", trait: "pumping" },
          { id: "quality-only", label: "冷鏈只影響外觀，和經營效率無關", detail: "品質穩定與電力成本都會受到影響。", trait: "scheduling" }
        ]
      },
      {
        id: "farm-energy-q6",
        type: "branching",
        prompt: "農場想降電費，一派主張先換高效率設備，另一派主張先調整運轉時段與排程。你會先採哪一種方向？",
        description: "這題讓你感受『設備升級』和『管理升級』都是能源優化的一部分。",
        topic: "節能策略選擇",
        correctId: "schedule-first",
        choices: [
          {
            id: "equipment-first",
            label: "先升級設備，因為效率高的硬體最直接",
            detail: "設備更新有價值，但不一定是第一步。",
            trait: "transition",
            next: "farm-energy-q7"
          },
          {
            id: "schedule-first",
            label: "先看排程與運轉邏輯，找出負載高峰和浪費點",
            detail: "這通常更接近能源管理的起點。",
            trait: "scheduling",
            next: "farm-energy-q7"
          }
        ]
      },
      {
        id: "farm-energy-q7",
        type: "matching",
        prompt: "請把農場常見的能源情境，和它最接近的效果配對起來。",
        description: "這題要把設備、耗能與管理效果連起來看。",
        topic: "能源工具配對",
        trait: "efficiency",
        leftItems: [
          { id: "pump", label: "抽水系統" },
          { id: "cold-chain", label: "冷藏設備" },
          { id: "solar", label: "太陽能支援" },
          { id: "scheduler", label: "用電排程系統" }
        ],
        rightItems: [
          { id: "move-water", label: "提供灌溉所需的主要動力" },
          { id: "keep-fresh", label: "維持採後品質與保存條件" },
          { id: "support-source", label: "補充部分能源來源並降低依賴" },
          { id: "shift-peak", label: "協助調整高峰負載與使用時段" }
        ],
        pairs: [
          { leftId: "pump", rightId: "move-water" },
          { leftId: "cold-chain", rightId: "keep-fresh" },
          { leftId: "solar", rightId: "support-source" },
          { leftId: "scheduler", rightId: "shift-peak" }
        ]
      },
      {
        id: "farm-energy-q8",
        type: "ordering",
        prompt: "如果農場想開始做能源優化，下面哪個順序最合理？",
        description: "先理解、再判斷、再調整、再驗證，通常比直接買設備更穩。",
        topic: "節能流程",
        trait: "scheduling",
        instructions: "請從『開始優化』排到『持續驗證』。",
        items: [
          { id: "see-load", label: "先看主要用電來自哪些環節", detail: "先理解負載結構。" },
          { id: "find-peak", label: "找出高峰時段與浪費點", detail: "確認問題集中在哪裡。" },
          { id: "adjust", label: "調整排程或設備運轉方式", detail: "把改善策略落地。" },
          { id: "review", label: "追蹤改善後的耗能與效果", detail: "確認優化是不是有效。" }
        ],
        correctOrder: ["see-load", "find-peak", "adjust", "review"]
      },
      {
        id: "farm-energy-q9",
        type: "single-choice",
        prompt: "智慧農業談能源，最容易被忽略但其實很重要的一點是什麼？",
        description: "能源議題不只在『多裝設備』，還在『怎麼管理它們』。",
        topic: "能源與管理",
        correctId: "management-matters",
        answers: [
          { id: "management-matters", label: "即使設備一樣，排程與管理方式不同，耗能表現也會差很多", detail: "能源效率常常是設備與管理共同決定的。", trait: "efficiency" },
          { id: "machines-alone", label: "只要換最新設備，就不再需要能源管理", detail: "設備更新不能取代後續管理。", trait: "transition" },
          { id: "ignore-storage", label: "冷藏和保存通常不需要納入能源討論", detail: "採後環節常常是重要能耗來源。", trait: "pumping" },
          { id: "same-all-farms", label: "所有農場的能源解法都差不多", detail: "不同作物、環境與規模會有不同策略。", trait: "scheduling" }
        ]
      },
      {
        id: "farm-energy-q10",
        type: "single-choice",
        prompt: "下面哪句話最能代表智慧農業能源題組的核心？",
        description: "最後一題收束『能源不是附帶問題，而是智慧農場的一部分』。",
        topic: "核心收束",
        correctId: "energy-is-core",
        answers: [
          { id: "energy-is-core", label: "智慧農業不只是會用電，更要知道在哪裡、何時、怎麼把能源用得更好", detail: "這是能源題組最核心的觀念。", trait: "transition" },
          { id: "electricity-bad", label: "最好的智慧農場就是完全不用電", detail: "重點不是完全不用，而是更合理地使用。", trait: "efficiency" },
          { id: "solar-solves-all", label: "只要有再生能源，所有農場能源問題都會消失", detail: "能源來源重要，但管理仍不可少。", trait: "pumping" },
          { id: "automation-opposite", label: "自動化和節能一定彼此衝突，不能並存", detail: "好的設計可以兼顧效率與能源表現。", trait: "scheduling" }
        ]
      }
    ],
    results: {
      pumping: {
        name: "抽水調度觀察員",
        styleLabel: "負載掌握型",
        summary: "你很擅長先看出農場哪個環節真的在消耗主要動力，很像第一個把抽水與灌溉負載看清楚的人。",
        fit: "很適合往灌溉設備、抽水控制、現場運轉觀察與農業機電方向發展。",
        skills: ["負載觀察", "現場設備理解", "灌溉動力判讀", "運轉節奏感"],
        hook: "如果你總是先去看『哪裡最耗力、哪裡最吃電』，這張卡就很符合你。",
        resultIcon: buildRoleIconSvg({ title: "抽水調度觀察員", accent: "#355c8a", symbol: "抽" })
      },
      scheduling: {
        name: "能源效率規劃手",
        styleLabel: "排程優化型",
        summary: "你擅長從時段、節奏與流程去找節能空間，很像讓農場運作更聰明的人。",
        fit: "很適合往能源管理、設備排程、智慧控制與效率優化方向發展。",
        skills: ["排程思維", "節能判斷", "流程優化", "高峰負載管理"],
        hook: "如果你自然會去想『是不是換個時段或方式就更好』，這張卡很適合你。",
        resultIcon: buildRoleIconSvg({ title: "能源效率規劃手", accent: "#4f7aa6", symbol: "省" })
      },
      efficiency: {
        name: "農場電力整合師",
        styleLabel: "系統平衡型",
        summary: "你會把抽水、環控、冷鏈和資料平台一起看，像是在農場裡做整體能源平衡的人。",
        fit: "很適合往農場能源系統、跨設備整合與智慧電力管理方向發展。",
        skills: ["整體觀", "跨設備協調", "能源系統理解", "效率平衡"],
        hook: "如果你會直覺地把不同用電環節放在同一張圖上思考，你很像整合型人才。",
        resultIcon: buildRoleIconSvg({ title: "農場電力整合師", accent: "#227f67", symbol: "整" })
      },
      transition: {
        name: "再生轉型推進者",
        styleLabel: "長期布局型",
        summary: "你不只看今天怎麼省，還會去想未來的能源來源、韌性與轉型方向，很像幫農場規劃下一步的人。",
        fit: "很適合往再生能源整合、永續轉型與農業能源策略方向發展。",
        skills: ["轉型思維", "永續視角", "能源策略", "長期規劃"],
        hook: "如果你總會把『現在怎麼做』和『未來要怎麼走』一起想，這張卡就很像你。",
        resultIcon: buildRoleIconSvg({ title: "再生轉型推進者", accent: "#6b8d3a", symbol: "轉" })
      }
    }
  };

  const SMART_FARM_BUSINESS_MODULE = {
    id: "farm-business",
    title: "商業題組",
    group: "經營與市場",
    description: "從缺工、投資回收、可追溯性到農產品價值，理解智慧農業導入背後的商業現實。",
    focusLabel: "投資與回收",
    landingPill: "經營決策",
    questionCountLabel: "10 題",
    enabled: true,
    landing: {
      title: "商業題組啟動",
      copy: "你將從農場經營者的角度，理解智慧農業為什麼會被考慮導入、為什麼有時候又推不動，以及技術價值如何轉成商業價值。",
      rules: [
        "共 10 題，聚焦缺工、投資、回收、供應鏈與導入門檻。",
        "這一組不只問『技術能不能做』，也會問『經營上值不值得做』。",
        "結果卡會回饋你在智慧農業商業判斷上的風格。"
      ]
    },
    leaderboard: {
      eventCode: "smart-farm-global-mission-farm-business"
    },
    settings: {
      questionCount: 10,
      defaultTimeLimit: 14
    },
    questions: [
      {
        id: "farm-business-q1",
        type: "single-choice",
        prompt: "為什麼越來越多農場會開始注意智慧農業，不只是把它當成高科技展示？",
        description: "商業題組先建立：智慧農業被看見，常常是因為真實壓力，而不是流行而已。",
        topic: "導入動機",
        correctId: "labour-pressure",
        answers: [
          { id: "labour-pressure", label: "因為缺工、效率與品質穩定的壓力，讓農場必須思考新的管理方式", detail: "商業導入通常來自真實經營問題。", trait: "labor" },
          { id: "trend-only", label: "主要只是因為大家都在談 AI，農場不跟上會沒面子", detail: "真實世界裡，導入通常要有經營理由。", trait: "value" },
          { id: "replace-sales", label: "只要用了智慧農業，銷售就會自動提升", detail: "銷售成果通常不會這麼直接。", trait: "roi" },
          { id: "no-cost", label: "因為智慧農業通常沒有導入成本", detail: "實際上成本與回收正是重要問題。", trait: "adoption" }
        ]
      },
      {
        id: "farm-business-q2",
        type: "single-choice",
        prompt: "當農場面臨人力老化與缺工時，智慧農業最有可能先被期待解決哪一種問題？",
        description: "這題聚焦商業現實裡很常見的導入理由：人力壓力。",
        topic: "缺工問題",
        correctId: "reduce-routine",
        answers: [
          { id: "reduce-routine", label: "降低部分重複巡查、記錄與管理負擔，讓有限人力更有效使用", detail: "它常常先從『減少重複工作』開始。", trait: "labor" },
          { id: "zero-people", label: "讓農場完全不需要任何人力", detail: "智慧農業通常是協助，不是完全無人。", trait: "adoption" },
          { id: "only-marketing", label: "主要是讓農場更容易做行銷包裝", detail: "缺工壓力更常是核心。", trait: "value" },
          { id: "instant-profit", label: "導入後第一個月就一定能獲利", detail: "回收期通常需要評估。", trait: "roi" }
        ]
      },
      {
        id: "farm-business-q3",
        type: "timed-choice",
        prompt: "你是一位農場經營者，眼前有一筆有限預算。你只能先做一件事：補感測監測、換更新設備，或加聘臨時人力。你會先抓哪個判斷？",
        description: "限時題模擬的是投資決策不是只看『想要什麼』，而是要看『最卡的是哪裡』。",
        topic: "投資優先序",
        correctId: "solve-bottleneck",
        timeLimit: 8,
        countdownLabel: "8 秒快速判斷",
        urgencyText: "先想清楚現在最卡的是流程哪一段。",
        answers: [
          { id: "solve-bottleneck", label: "先判斷當前最主要的瓶頸是人力、資訊還是設備，再做投資", detail: "經營判斷比直覺購買更重要。", trait: "roi" },
          { id: "buy-most-expensive", label: "先買最貴的技術，代表一次做到位", detail: "最貴不一定最符合當下需求。", trait: "adoption" },
          { id: "copy-neighbor", label: "照隔壁農場買一樣的系統就好", detail: "每個農場的瓶頸條件不同。", trait: "labor" },
          { id: "delay-all", label: "什麼都先不做，等問題變大再說", detail: "有些投資就是為了避免之後更大的成本。", trait: "value" }
        ]
      },
      {
        id: "farm-business-q4",
        type: "single-choice",
        prompt: "為什麼『投資回收期』在智慧農業導入裡會是一個核心問題？",
        description: "這題讓玩家知道：技術再好，也要回到經營時間尺度。",
        topic: "回收期",
        correctId: "cashflow",
        answers: [
          { id: "cashflow", label: "因為農場需要知道投入的成本多久能透過效率、品質或減損慢慢回來", detail: "回收期關係到農場能不能承受導入。", trait: "roi" },
          { id: "always-fast", label: "因為所有智慧農業設備通常都能立刻回本", detail: "現實上並沒有這麼直接。", trait: "value" },
          { id: "not-important", label: "回收期不重要，只要技術看起來先進就好", detail: "經營者通常不會這樣判斷。", trait: "adoption" },
          { id: "same-everywhere", label: "不管什麼作物或規模，回收期都差不多", detail: "作物、產值與規模都會影響回收。", trait: "labor" }
        ]
      },
      {
        id: "farm-business-q5",
        type: "branching",
        prompt: "某農場有一筆預算，只能先做一件事：一是導入更完整的感測與記錄系統，二是優先投資採後分級與可追溯流程。你會先選哪個方向？",
        description: "這題故意把『生產現場效率』和『市場價值提升』放在同一個投資選擇裡。",
        topic: "價值選擇",
        correctId: "match-bottleneck",
        choices: [
          {
            id: "field-first",
            label: "先補生產現場監測，因為目前連基本決策都不夠穩",
            detail: "如果前端生產不穩，後端價值提升也會受限。",
            trait: "roi",
            next: "farm-business-q6"
          },
          {
            id: "market-first",
            label: "先補分級與追溯，因為目前卡在品質說服與市場信任",
            detail: "如果問題在市場端，這也是合理方向。",
            trait: "value",
            next: "farm-business-q6"
          }
        ]
      },
      {
        id: "farm-business-q6",
        type: "image-choice",
        prompt: "哪一種畫面最像『智慧農業的商業價值』正在被放大？",
        description: "這題不只看設備，而是看技術如何進到品質與市場。",
        topic: "商業場景辨識",
        correctId: "traceability",
        options: [
          {
            id: "traceability",
            label: "農產品分級與數位追溯資訊一起出現",
            detail: "這最能顯示技術如何支撐品質與信任。",
            alt: "分級與追溯示意",
            image: buildSceneIllustration({ title: "Traceability", subtitle: "Quality Record", accent: "#2f7b4f", highlight: "#c6d96c", symbol: "值" }),
            trait: "value"
          },
          {
            id: "random-field",
            label: "一般田區遠景",
            detail: "看不出商業價值是怎麼被建立的。",
            alt: "田區遠景示意",
            image: buildSceneIllustration({ title: "Open Field", subtitle: "Field Only", accent: "#6f9852", highlight: "#d4e39d", symbol: "田" }),
            trait: "labor"
          },
          {
            id: "drone-fly",
            label: "無人機飛行畫面",
            detail: "它偏技術應用，不一定直接呈現商業價值。",
            alt: "無人機飛行示意",
            image: buildSceneIllustration({ title: "Drone Flight", subtitle: "Inspection", accent: "#356a8b", highlight: "#a9cee8", symbol: "飛" }),
            trait: "adoption"
          },
          {
            id: "tractor-row",
            label: "農機整齊排放畫面",
            detail: "這更像設備展示，而不是價值創造過程。",
            alt: "農機排列示意",
            image: buildSceneIllustration({ title: "Farm Fleet", subtitle: "Machines", accent: "#8f6a3d", highlight: "#e0c38a", symbol: "機" }),
            trait: "roi"
          }
        ]
      },
      {
        id: "farm-business-q7",
        type: "matching",
        prompt: "請把智慧農業常見的商業壓力，和它最接近的導入理由配對起來。",
        description: "商業導入通常不是單點原因，而是壓力與需求對應出來的。",
        topic: "壓力與價值配對",
        trait: "labor",
        leftItems: [
          { id: "labour-short", label: "人力短缺" },
          { id: "quality-gap", label: "品質穩定度不足" },
          { id: "buyer-demand", label: "買方要求更多資訊" },
          { id: "loss-risk", label: "管理失誤造成損失" }
        ],
        rightItems: [
          { id: "reduce-routine", label: "希望降低重複巡查與記錄負擔" },
          { id: "better-grading", label: "希望提高分級與一致性" },
          { id: "more-trace", label: "希望建立可追溯與透明資料" },
          { id: "earlier-alert", label: "希望提早發現問題減少損失" }
        ],
        pairs: [
          { leftId: "labour-short", rightId: "reduce-routine" },
          { leftId: "quality-gap", rightId: "better-grading" },
          { leftId: "buyer-demand", rightId: "more-trace" },
          { leftId: "loss-risk", rightId: "earlier-alert" }
        ]
      },
      {
        id: "farm-business-q8",
        type: "ordering",
        prompt: "如果要評估一項智慧農業投資值不值得做，下面順序最合理的是什麼？",
        description: "這題用流程方式教玩家：投資不是看感覺，而是看問題、成本、效益與回收。",
        topic: "投資評估流程",
        trait: "roi",
        instructions: "請從『先理解問題』排到『追蹤效果』。",
        items: [
          { id: "problem", label: "先確認目前最主要的經營痛點", detail: "不知道問題，就很難選對投資。" },
          { id: "cost", label: "估算導入成本與維運負擔", detail: "不是只有買設備的價格。" },
          { id: "benefit", label: "判斷可能帶來的效率、品質或減損效果", detail: "效益要盡量具體。" },
          { id: "review", label: "導入後持續追蹤是否真的有改善", detail: "投資完成後仍要驗證。" }
        ],
        correctOrder: ["problem", "cost", "benefit", "review"]
      },
      {
        id: "farm-business-q9",
        type: "single-choice",
        prompt: "為什麼有些智慧農業技術明明看起來很厲害，卻不一定被農場大量採用？",
        description: "這題直指『技術價值』和『採用現實』之間的差距。",
        topic: "導入困境",
        correctId: "fit-and-cost",
        answers: [
          { id: "fit-and-cost", label: "因為導入成本、維護能力、數位門檻與農場需求未必能對得上", detail: "採用困境常常不是技術不夠好，而是不夠合適。", trait: "adoption" },
          { id: "farmers-dislike-tech", label: "主要只是因為農民都排斥新技術", detail: "這樣的說法太簡化，忽略了成本與條件。", trait: "labor" },
          { id: "buyers-dont-care", label: "因為市場完全不在意品質與透明度", detail: "很多市場其實非常在意。", trait: "value" },
          { id: "roi-never", label: "因為所有智慧農業技術都不可能回本", detail: "有些情境是有回收空間的，關鍵在適配。", trait: "roi" }
        ]
      },
      {
        id: "farm-business-q10",
        type: "single-choice",
        prompt: "如果要用一句話總結商業題組的核心，哪個最貼切？",
        description: "最後一題把智慧農業拉回『能不能真正進入經營現場』。",
        topic: "核心收束",
        correctId: "business-fit",
        answers: [
          { id: "business-fit", label: "智慧農業要真正發揮價值，必須同時回答經營痛點、成本與回收問題", detail: "這是商業題組最核心的觀念。", trait: "adoption" },
          { id: "technology-first", label: "只要技術夠先進，商業面自然會跟上", detail: "現實中的導入通常沒有這麼直線。", trait: "roi" },
          { id: "price-only", label: "農業商業價值只看賣價高不高", detail: "品質、風險、效率與信任也很重要。", trait: "value" },
          { id: "less-people-only", label: "智慧農業的商業價值只在於少用人", detail: "人力是一部分，但不是全部。", trait: "labor" }
        ]
      }
    ],
    results: {
      roi: {
        name: "投資回收評估員",
        styleLabel: "效益判斷型",
        summary: "你很會先看一項投入到底能不能真正回到經營現場，像是幫農場把錢花在更有機會產生效果的地方。",
        fit: "很適合往農業投資評估、成本效益分析與技術導入規劃方向發展。",
        skills: ["成本效益", "投資判斷", "回收思維", "效益衡量"],
        hook: "如果你總會先問『這筆投入真的值得嗎』，這張卡就很像你。",
        resultIcon: buildRoleIconSvg({ title: "投資回收評估員", accent: "#7d6a34", symbol: "回" })
      },
      labor: {
        name: "缺工策略協調手",
        styleLabel: "現場平衡型",
        summary: "你很能理解農場人力壓力怎麼影響管理與導入選擇，像是幫團隊找到更可持續的工作方式的人。",
        fit: "很適合往農場營運、現場協調、人力流程優化與導入支援方向發展。",
        skills: ["人力理解", "流程協調", "現場判斷", "缺工應對"],
        hook: "如果你很容易先看到『人現在真的撐不撐得住』，這張卡很符合你。",
        resultIcon: buildRoleIconSvg({ title: "缺工策略協調手", accent: "#87644f", symbol: "協" })
      },
      value: {
        name: "農產品價值設計師",
        styleLabel: "市場連結型",
        summary: "你擅長看見技術如何幫助品質、追溯與市場信任，像是把農場努力轉成商品價值的人。",
        fit: "很適合往品牌溝通、產品分級、供應鏈資訊與市場價值設計方向發展。",
        skills: ["價值辨識", "品質思維", "市場連結", "透明度理解"],
        hook: "如果你自然會去想『這能不能讓買方更相信我們』，這張卡就很像你。",
        resultIcon: buildRoleIconSvg({ title: "農產品價值設計師", accent: "#2f7b4f", symbol: "值" })
      },
      adoption: {
        name: "導入風險規劃員",
        styleLabel: "落地評估型",
        summary: "你很清楚技術好不好和能不能落地是兩回事，很像幫農場把導入風險與現實條件看清楚的人。",
        fit: "很適合往技術導入、農場顧問、風險管理與數位轉型規劃方向發展。",
        skills: ["導入判斷", "風險意識", "現實評估", "條件匹配"],
        hook: "如果你總是在想『這東西實際上推不推得動』，這張卡非常適合你。",
        resultIcon: buildRoleIconSvg({ title: "導入風險規劃員", accent: "#3e6fb1", symbol: "策" })
      }
    }
  };

  const SMART_FARM_GLOBAL_MARKET_MODULE = {
    id: "global-market",
    title: "國際市場題組",
    group: "經營與市場",
    description: "從品質穩定、標準、透明度與出口邏輯，理解全球市場為什麼在意智慧農業。",
    focusLabel: "市場信任",
    landingPill: "全球市場",
    questionCountLabel: "10 題",
    enabled: true,
    landing: {
      title: "國際市場題組啟動",
      copy: "你將從品質穩定、可追溯、標準與市場信任的角度，理解智慧農業為什麼不只是提高產量，也和全球競爭力有關。",
      rules: [
        "共 10 題，聚焦品質、追溯、標準、出口與供應鏈透明度。",
        "這一組重點不是背國貿術語，而是理解市場為什麼在意資訊與一致性。",
        "結果卡會回饋你在國際市場與信任建構上的思考風格。"
      ]
    },
    leaderboard: {
      eventCode: "smart-farm-global-mission-global-market"
    },
    settings: {
      questionCount: 10,
      defaultTimeLimit: 14
    },
    questions: [
      {
        id: "global-market-q1",
        type: "single-choice",
        prompt: "為什麼國際市場會越來越在意農產品背後的資料，而不只看最後的外觀？",
        description: "這題先建立『市場信任』和『資訊透明』之間的關係。",
        topic: "追溯與信任",
        correctId: "trust-data",
        answers: [
          { id: "trust-data", label: "因為市場想知道產品怎麼被生產、管理是否穩定，以及品質是否可被追蹤", detail: "資料透明有助於降低資訊落差。", trait: "trace" },
          { id: "looks-only", label: "因為現在國際市場已經不看外觀，只看檔案", detail: "外觀仍重要，但不是唯一依據。", trait: "quality" },
          { id: "faster-shipping", label: "因為有資料就一定可以縮短運輸時間", detail: "資料透明和物流速度不是同一件事。", trait: "export" },
          { id: "cheaper-always", label: "因為有資料後價格一定會更便宜", detail: "資料更常和信任、品質溝通有關。", trait: "trust" }
        ]
      },
      {
        id: "global-market-q2",
        type: "single-choice",
        prompt: "如果一個農場想打進要求較高的外銷市場，最先要建立的能力通常是什麼？",
        description: "這題想讓玩家理解：出口不是只看產量，而是看穩定性。",
        topic: "出口準備",
        correctId: "consistent-quality",
        answers: [
          { id: "consistent-quality", label: "讓品質表現更穩定，並能留下可被信任的生產與管理紀錄", detail: "穩定和紀錄常常是市場門檻。", trait: "quality" },
          { id: "just-more-yield", label: "只要產量夠多，就自然能打進國際市場", detail: "產量不是唯一決定因素。", trait: "export" },
          { id: "only-ads", label: "先做漂亮的品牌廣告最重要", detail: "品牌有幫助，但仍要有品質基礎。", trait: "trust" },
          { id: "remove-records", label: "先把生產流程簡化，不要記錄太多細節", detail: "高要求市場往往更在意紀錄。", trait: "trace" }
        ]
      },
      {
        id: "global-market-q3",
        type: "timed-choice",
        prompt: "買方突然提出：希望看到某批農產品的生產紀錄與管理證據。你第一時間最該確認什麼？",
        description: "限時題模擬的是市場信任常常建立在能不能快速拿出可信資料。",
        topic: "資訊回應能力",
        correctId: "records-ready",
        timeLimit: 8,
        countdownLabel: "8 秒快速判斷",
        urgencyText: "先想能不能拿出具體、可信、對得起來的紀錄。",
        answers: [
          { id: "records-ready", label: "先確認該批產品是否有完整且對得上的生產與追溯紀錄", detail: "市場要求常常落在『能不能證明』。", trait: "trace" },
          { id: "promise-later", label: "先口頭承諾品質很好，資料之後再補", detail: "高要求市場通常不會只接受口頭保證。", trait: "trust" },
          { id: "hide-batch", label: "如果資料不齊，就把批次混在一起送出", detail: "這會直接破壞信任。", trait: "export" },
          { id: "ignore-request", label: "只要產品看起來漂亮，就不用管這種要求", detail: "國際市場往往比這更嚴格。", trait: "quality" }
        ]
      },
      {
        id: "global-market-q4",
        type: "image-choice",
        prompt: "哪一種畫面最能代表『農場到市場之間的信任鏈』？",
        description: "這題想讓玩家把生產、紀錄與市場要求連起來。",
        topic: "信任鏈辨識",
        correctId: "graded-batch",
        options: [
          {
            id: "graded-batch",
            label: "分級後的農產品搭配批次資料與標示",
            detail: "這最能代表品質與追溯一起出現。",
            alt: "分級與批次資料示意",
            image: buildSceneIllustration({ title: "Batch Trace", subtitle: "Quality Chain", accent: "#2f7b4f", highlight: "#d8d26f", symbol: "信" }),
            trait: "trust"
          },
          {
            id: "empty-field",
            label: "一般田區空景",
            detail: "看不出市場端怎麼建立信任。",
            alt: "田區空景",
            image: buildSceneIllustration({ title: "Open Field", subtitle: "Farm View", accent: "#6b9151", highlight: "#d7e49d", symbol: "田" }),
            trait: "quality"
          },
          {
            id: "tractor-line",
            label: "農機列隊展示",
            detail: "比較偏設備展示，不是市場信任核心。",
            alt: "農機展示",
            image: buildSceneIllustration({ title: "Machine Line", subtitle: "Equipment", accent: "#87633c", highlight: "#e2c88f", symbol: "機" }),
            trait: "export"
          },
          {
            id: "city-shelf",
            label: "零售架上的包裝商品",
            detail: "離市場很近，但沒有呈現來源透明資訊。",
            alt: "零售架示意",
            image: buildSceneIllustration({ title: "Retail Shelf", subtitle: "Store", accent: "#7a587e", highlight: "#dfb6df", symbol: "售" }),
            trait: "trace"
          }
        ]
      },
      {
        id: "global-market-q5",
        type: "single-choice",
        prompt: "為什麼『品質穩定』對國際市場很重要，而不只是偶爾出現很好的產品？",
        description: "市場最怕的常常不是偶爾普通，而是不穩定與不可預期。",
        topic: "品質一致性",
        correctId: "consistency",
        answers: [
          { id: "consistency", label: "因為買方需要長期可預期的品質，才能建立合作與信任", detail: "穩定性常常比單次驚艷更重要。", trait: "quality" },
          { id: "one-batch", label: "只要有一批特別好，就足以代表全部表現", detail: "市場合作更重視長期穩定。", trait: "trust" },
          { id: "price-only", label: "品質穩不穩不重要，重點只有價格低", detail: "高要求市場常常不會只看價格。", trait: "export" },
          { id: "ads-decide", label: "只要品牌宣傳做得好，品質波動不是問題", detail: "信任最後還是要落回產品表現。", trait: "trace" }
        ]
      },
      {
        id: "global-market-q6",
        type: "branching",
        prompt: "一位農場經營者想外銷，但目前只能先補一項能力：一是品質追溯資料，二是採後分級穩定度。你會先建議從哪裡著手？",
        description: "這題把『看得見的品質』和『能證明的品質』放在一起思考。",
        topic: "市場優先序",
        correctId: "match-market-gap",
        choices: [
          {
            id: "trace-first",
            label: "先補追溯資料，因為目前買方最在意透明度",
            detail: "如果市場最卡的是信任，這是合理方向。",
            trait: "trace",
            next: "global-market-q7"
          },
          {
            id: "quality-first",
            label: "先補分級穩定度，因為目前品質表現波動太大",
            detail: "如果品質本身不穩，紀錄再完整也不夠。",
            trait: "quality",
            next: "global-market-q7"
          }
        ]
      },
      {
        id: "global-market-q7",
        type: "matching",
        prompt: "請把國際市場在意的元素，和它帶來的主要效果配對起來。",
        description: "這題幫玩家把標準、資料與市場信任之間的關係接起來。",
        topic: "市場元素配對",
        trait: "trust",
        leftItems: [
          { id: "trace", label: "可追溯資料" },
          { id: "grading", label: "穩定分級" },
          { id: "records", label: "數位紀錄" },
          { id: "visibility", label: "供應鏈透明度" }
        ],
        rightItems: [
          { id: "source-check", label: "更容易確認來源與批次" },
          { id: "quality-match", label: "更容易維持品質一致性" },
          { id: "prove-process", label: "更容易證明管理過程" },
          { id: "reduce-gap", label: "更容易降低資訊不對稱" }
        ],
        pairs: [
          { leftId: "trace", rightId: "source-check" },
          { leftId: "grading", rightId: "quality-match" },
          { leftId: "records", rightId: "prove-process" },
          { leftId: "visibility", rightId: "reduce-gap" }
        ]
      },
      {
        id: "global-market-q8",
        type: "ordering",
        prompt: "如果要讓一批農產品從農場一路走到更高要求的市場，下面哪個順序最合理？",
        description: "這題用流程帶出從生產到市場的信任鏈。",
        topic: "農場到市場流程",
        trait: "export",
        instructions: "請排序出比較合理的市場信任建立流程。",
        items: [
          { id: "produce", label: "先把生產管理與品質控制做好", detail: "品質基礎先穩住。" },
          { id: "record", label: "留下可追溯與可查驗的紀錄", detail: "透明度開始建立。" },
          { id: "grade", label: "依標準完成分級與批次整理", detail: "讓產品更容易對應市場要求。" },
          { id: "present", label: "把資訊帶到買方與市場端溝通", detail: "最後才是信任轉成交易機會。" }
        ],
        correctOrder: ["produce", "record", "grade", "present"]
      },
      {
        id: "global-market-q9",
        type: "single-choice",
        prompt: "智慧農業和國際市場之間最重要的連結點，最接近哪一種說法？",
        description: "這題收束的是：智慧農業不是只有田間效率，也和市場可見度有關。",
        topic: "智慧農業與市場",
        correctId: "confidence-link",
        answers: [
          { id: "confidence-link", label: "它能幫助農場把品質、管理與資訊透明轉成市場信任", detail: "這是兩者之間最重要的橋梁。", trait: "trust" },
          { id: "yield-only", label: "只要提高產量，就等於提高國際競爭力", detail: "競爭力常常還包括品質與資訊。", trait: "quality" },
          { id: "marketing-only", label: "它最主要只是幫助農場做國際宣傳", detail: "宣傳不是唯一核心。", trait: "export" },
          { id: "records-useless", label: "市場端最不在意的就是生產紀錄", detail: "很多高要求市場恰恰很在意這一點。", trait: "trace" }
        ]
      },
      {
        id: "global-market-q10",
        type: "single-choice",
        prompt: "如果要用一句話總結國際市場題組的核心，哪一個最貼切？",
        description: "最後一題收束的是：全球化競爭不只比產量，也比可信度。",
        topic: "核心收束",
        correctId: "global-trust",
        answers: [
          { id: "global-trust", label: "全球市場重視的不只是產量，而是品質穩定、透明度與能不能被信任", detail: "這就是國際市場題組最核心的觀念。", trait: "export" },
          { id: "price-alone", label: "國際市場只看價格，其他都不重要", detail: "這太簡化現實市場。", trait: "quality" },
          { id: "trace-no-need", label: "外銷不需要追溯，只要包裝好看就行", detail: "高要求市場通常不會這樣運作。", trait: "trace" },
          { id: "quality-no-record", label: "只要品質好，紀錄與透明度都可以省略", detail: "很多市場需要兩者一起存在。", trait: "trust" }
        ]
      }
    ],
    results: {
      quality: {
        name: "國際品質協調員",
        styleLabel: "穩定要求型",
        summary: "你很能抓到市場為什麼重視『穩定』而不只是單次表現，像是把品質變成長期承諾的人。",
        fit: "很適合往品質管理、農產品分級、標準化流程與出口品控方向發展。",
        skills: ["品質一致性", "標準理解", "分級思維", "穩定判斷"],
        hook: "如果你總會先想『能不能一直維持這樣的品質』，這張卡很像你。",
        resultIcon: buildRoleIconSvg({ title: "國際品質協調員", accent: "#7b8a37", symbol: "品" })
      },
      trace: {
        name: "追溯鏈資料規劃手",
        styleLabel: "資訊透明型",
        summary: "你很重視來源、批次與紀錄能不能對得起來，很像幫農場建立可信資料鏈的人。",
        fit: "很適合往可追溯系統、數位紀錄、供應鏈資料與透明治理方向發展。",
        skills: ["資料鏈理解", "來源追蹤", "透明度意識", "紀錄規劃"],
        hook: "如果你很在意『這些資料最後能不能對得起來』，這張卡非常符合你。",
        resultIcon: buildRoleIconSvg({ title: "追溯鏈資料規劃手", accent: "#2f7b4f", symbol: "溯" })
      },
      trust: {
        name: "市場信任整合師",
        styleLabel: "關係建立型",
        summary: "你看到的不只是產品本身，而是產品、資料與買方之間的信任如何被建立，很像把農場努力轉成合作關係的人。",
        fit: "很適合往供應鏈協作、市場溝通、信任建構與品質資訊整合方向發展。",
        skills: ["信任建立", "資訊整合", "市場理解", "供應鏈視角"],
        hook: "如果你自然會去想『買方會不會放心』，這張卡就很像你。",
        resultIcon: buildRoleIconSvg({ title: "市場信任整合師", accent: "#3e6fb1", symbol: "信" })
      },
      export: {
        name: "出口準備策劃者",
        styleLabel: "全球競爭型",
        summary: "你會把品質、紀錄、流程與市場要求一起看，像是在幫農場做外銷準備的人。",
        fit: "很適合往國際市場、出口規劃、標準對接與農業全球競爭力方向發展。",
        skills: ["出口視角", "市場門檻理解", "流程規劃", "全球連結"],
        hook: "如果你常把農場放到更大的市場情境中思考，這張卡很適合你。",
        resultIcon: buildRoleIconSvg({ title: "出口準備策劃者", accent: "#5d6c9a", symbol: "出" })
      }
    }
  };

  const SMART_FARM_ESG_MODULE = {
    id: "farm-esg",
    title: "ESG 題組",
    group: "永續與治理",
    description: "從資源效率、數位落差與韌性農業，理解智慧農業和 ESG 之間的關係。",
    focusLabel: "永續轉型",
    landingPill: "ESG 與韌性",
    questionCountLabel: "10 題",
    enabled: true,
    landing: {
      title: "ESG 題組啟動",
      copy: "你將從環境、社會與治理的角度，理解智慧農業不是只追求效率，而是要問這些技術到底有沒有讓農業更永續、更公平、更有韌性。",
      rules: [
        "共 10 題，聚焦資源效率、包容性、資料責任與農業韌性。",
        "這一組不只談環保，也會談數位落差與治理責任。",
        "結果卡會回饋你在永續與農業轉型中的思考風格。"
      ]
    },
    leaderboard: {
      eventCode: "smart-farm-global-mission-farm-esg"
    },
    settings: {
      questionCount: 10,
      defaultTimeLimit: 14
    },
    questions: [
      {
        id: "farm-esg-q1",
        type: "single-choice",
        prompt: "當我們把 ESG 放到智慧農業裡，最貼切的理解是什麼？",
        description: "這題先建立：ESG 不只是企業口號，也和農業現場很有關係。",
        topic: "ESG 基本概念",
        correctId: "resource-fair-govern",
        answers: [
          { id: "resource-fair-govern", label: "同時看資源效率、照顧不同農戶的公平性，以及技術使用的治理責任", detail: "這比較接近 ESG 在農業中的實際意義。", trait: "governance" },
          { id: "environment-only", label: "只要有節水減碳，就等於全部 ESG", detail: "環境重要，但不是全部。", trait: "environment" },
          { id: "social-only", label: "只要照顧農民感受，其他都不重要", detail: "ESG 是多面向的。", trait: "inclusion" },
          { id: "governance-only", label: "只要制度和文件做得完整就夠了", detail: "治理也要回到環境與社會效果。", trait: "resilience" }
        ]
      },
      {
        id: "farm-esg-q2",
        type: "single-choice",
        prompt: "智慧農業常被說能提升資源效率，最接近的意思是什麼？",
        description: "這題把 ESG 先落回最直觀的資源使用問題。",
        topic: "資源效率",
        correctId: "less-waste",
        answers: [
          { id: "less-waste", label: "讓水、電、肥料與管理行動更接近真正需求，減少浪費", detail: "這是資源效率的核心。", trait: "environment" },
          { id: "use-none", label: "代表未來農場可以完全不用任何資源", detail: "效率不是零使用，而是更合理使用。", trait: "resilience" },
          { id: "cost-only", label: "只要成本變低，就一定代表 ESG 做好了", detail: "成本下降不一定代表永續表現提升。", trait: "governance" },
          { id: "big-farms", label: "只有大農場才需要談資源效率", detail: "任何規模的農場都可能面對資源議題。", trait: "inclusion" }
        ]
      },
      {
        id: "farm-esg-q3",
        type: "timed-choice",
        prompt: "一個農業計畫主打數位轉型，但現場有許多農戶對設備與平台不熟悉。你先抓哪個 ESG 重點？",
        description: "限時題把『技術導入』和『包容性』放在一起看。",
        topic: "數位落差",
        correctId: "inclusion-support",
        timeLimit: 8,
        countdownLabel: "8 秒快速判斷",
        urgencyText: "先抓出最可能讓好技術變成落差的關鍵。",
        answers: [
          { id: "inclusion-support", label: "要考慮教育訓練、可用性與不同農戶能否真正參與", detail: "這是智慧農業 ESG 很關鍵的一面。", trait: "inclusion" },
          { id: "launch-fast", label: "先全面上線，之後不會用的人再慢慢適應", detail: "這可能讓落差擴大。", trait: "governance" },
          { id: "ignore-small", label: "小農不會用也沒關係，先服務大規模農場", detail: "這會弱化包容性與公平性。", trait: "environment" },
          { id: "just-app", label: "只要 App 好看，使用問題就不大", detail: "介面友善不等於真正可使用。", trait: "resilience" }
        ]
      },
      {
        id: "farm-esg-q4",
        type: "image-choice",
        prompt: "哪一種畫面最能代表『智慧農業和 ESG 正在一起被考慮』？",
        description: "這題要讓玩家看到永續和資料化管理可以一起出現。",
        topic: "永續場景辨識",
        correctId: "monitor-resource",
        options: [
          {
            id: "monitor-resource",
            label: "田間監測搭配資源使用與管理資訊",
            detail: "它最接近『效率 + 責任 + 判讀』一起出現的場景。",
            alt: "資源監測示意",
            image: buildSceneIllustration({ title: "Resource Monitor", subtitle: "Farm ESG", accent: "#2f7b4f", highlight: "#9fd0b0", symbol: "永" }),
            trait: "environment"
          },
          {
            id: "random-machines",
            label: "單純展示很多新設備",
            detail: "看不出 ESG 議題是否被納入考慮。",
            alt: "設備展示",
            image: buildSceneIllustration({ title: "Machine Showcase", subtitle: "Display", accent: "#866544", highlight: "#d8be8a", symbol: "機" }),
            trait: "governance"
          },
          {
            id: "retail-only",
            label: "零售架包裝畫面",
            detail: "比較偏消費端，不足以呈現 ESG 管理本體。",
            alt: "零售架示意",
            image: buildSceneIllustration({ title: "Retail", subtitle: "Store Shelf", accent: "#7b5c7f", highlight: "#d7bfdc", symbol: "售" }),
            trait: "inclusion"
          },
          {
            id: "empty-road",
            label: "一般鄉間道路風景",
            detail: "看不出資源與治理脈絡。",
            alt: "鄉間道路示意",
            image: buildSceneIllustration({ title: "Country Road", subtitle: "Landscape", accent: "#6b8551", highlight: "#d2e59a", symbol: "路" }),
            trait: "resilience" 
          }
        ]
      },
      {
        id: "farm-esg-q5",
        type: "single-choice",
        prompt: "為什麼小農能不能真正用上智慧農業，也會是 ESG 議題的一部分？",
        description: "這題把 ESG 的社會面向具體化。",
        topic: "包容性",
        correctId: "fair-access",
        answers: [
          { id: "fair-access", label: "因為技術若只被少數有資源者使用，可能會讓產業差距更大", detail: "智慧農業也要思考誰能參與。", trait: "inclusion" },
          { id: "small-not-matter", label: "因為小農規模小，所以不必納入考慮", detail: "這會忽略農業結構中的公平問題。", trait: "governance" },
          { id: "environment-only", label: "只要有節水效果，誰用得到都不重要", detail: "環境效益不能完全取代社會公平。", trait: "environment" },
          { id: "training-no-need", label: "只要設備便宜，就不需要教育訓練", detail: "價格不是唯一門檻。", trait: "resilience" }
        ]
      },
      {
        id: "farm-esg-q6",
        type: "branching",
        prompt: "一個智慧農業計畫資源有限，一派主張先追求最快的節水成效，另一派主張先把農戶參與與教育訓練做好。你會先採哪個方向？",
        description: "這題讓玩家感受 ESG 不同面向可能會互相拉扯。",
        topic: "永續優先序",
        correctId: "balanced-view",
        choices: [
          {
            id: "impact-first",
            label: "先追求最快的節水成效，因為環境壓力最急迫",
            detail: "這條路有其合理性，但也可能忽略參與門檻。",
            trait: "environment",
            next: "farm-esg-q7"
          },
          {
            id: "people-first",
            label: "先把農戶參與與訓練做好，避免技術只停在少數人手上",
            detail: "這條路強調包容與長期落地。",
            trait: "inclusion",
            next: "farm-esg-q7"
          }
        ]
      },
      {
        id: "farm-esg-q7",
        type: "matching",
        prompt: "請把智慧農業的 ESG 面向，和它最接近的問題意識配對起來。",
        description: "環境、社會與治理要能被清楚地分辨出來。",
        topic: "ESG 面向配對",
        trait: "governance",
        leftItems: [
          { id: "environment", label: "環境面" },
          { id: "social", label: "社會面" },
          { id: "governance", label: "治理面" },
          { id: "resilience", label: "韌性思維" }
        ],
        rightItems: [
          { id: "resource-use", label: "資源效率與減少浪費" },
          { id: "access-gap", label: "誰能參與、誰被排除" },
          { id: "data-rules", label: "資料與制度是否負責任" },
          { id: "future-shock", label: "面對極端風險時能否維持運作" }
        ],
        pairs: [
          { leftId: "environment", rightId: "resource-use" },
          { leftId: "social", rightId: "access-gap" },
          { leftId: "governance", rightId: "data-rules" },
          { leftId: "resilience", rightId: "future-shock" }
        ]
      },
      {
        id: "farm-esg-q8",
        type: "ordering",
        prompt: "如果要讓一個智慧農業專案更符合 ESG，下面哪個順序比較合理？",
        description: "這題把理想的永續流程收成具體步驟。",
        topic: "ESG 導入流程",
        trait: "resilience",
        instructions: "請從『先確認問題』排到『持續檢視』。",
        items: [
          { id: "see-risk", label: "先確認現場的資源、落差與治理風險", detail: "先看問題在哪裡。" },
          { id: "design", label: "設計兼顧效率與包容性的方案", detail: "不是只追單一目標。" },
          { id: "support", label: "提供導入支援與使用者協助", detail: "讓技術更有機會被真的使用。" },
          { id: "review", label: "持續追蹤是否真的帶來永續改善", detail: "ESG 需要被驗證，不只是宣稱。" }
        ],
        correctOrder: ["see-risk", "design", "support", "review"]
      },
      {
        id: "farm-esg-q9",
        type: "single-choice",
        prompt: "智慧農業若只追求效率、完全不管資料責任或使用公平，最可能出現什麼問題？",
        description: "這題直指 ESG 為什麼不能只談『效率』。",
        topic: "效率與責任",
        correctId: "imbalance",
        answers: [
          { id: "imbalance", label: "可能讓技術看起來有效率，卻在公平性、信任與長期採用上出現問題", detail: "這是 ESG 要避免的失衡。", trait: "governance" },
          { id: "always-fine", label: "只要效率提高，其他問題自然都會被解決", detail: "現實上不會這麼簡單。", trait: "environment" },
          { id: "social-no-impact", label: "公平與參與對智慧農業沒什麼影響", detail: "這會忽略社會面向。", trait: "inclusion" },
          { id: "resilience-later", label: "韌性可以等未來再談，現在先衝成效就好", detail: "極端風險本來就是當前議題。", trait: "resilience" }
        ]
      },
      {
        id: "farm-esg-q10",
        type: "single-choice",
        prompt: "如果要用一句話總結 ESG 題組的核心，哪一個最貼切？",
        description: "最後一題收束的是：智慧農業的成功不只看效率，也看它對人與環境造成什麼長期影響。",
        topic: "核心收束",
        correctId: "sustainable-smart",
        answers: [
          { id: "sustainable-smart", label: "真正的智慧農業，要同時回應環境效率、社會公平與治理責任", detail: "這就是 ESG 題組的核心。", trait: "resilience" },
          { id: "green-only", label: "只要有節水節電，就已經是完整的智慧農業永續方案", detail: "這太狹窄了。", trait: "environment" },
          { id: "policy-only", label: "ESG 只和政策文件有關，和現場技術無關", detail: "智慧農業現場本身就會碰到 ESG 問題。", trait: "governance" },
          { id: "social-secondary", label: "包容性與公平只是額外加分，不是核心問題", detail: "在很多場域它其實很核心。", trait: "inclusion" }
        ]
      }
    ],
    results: {
      environment: {
        name: "永續資源觀察員",
        styleLabel: "環境效率型",
        summary: "你很容易先注意到資源是不是被浪費，像是讓農場在效率和環境之間更平衡的人。",
        fit: "很適合往資源管理、環境監測、節水節能與永續農業方向發展。",
        skills: ["資源意識", "環境判讀", "效率思維", "永續視角"],
        hook: "如果你看到農場問題時，第一個會想到水、電、肥料怎麼用得更好，這張卡就很像你。",
        resultIcon: buildRoleIconSvg({ title: "永續資源觀察員", accent: "#2f7b4f", symbol: "永" })
      },
      inclusion: {
        name: "農村共好協調手",
        styleLabel: "包容推進型",
        summary: "你很在意技術能不能真的讓不同條件的農戶都參與進來，像是在幫智慧農業保留人味與公平的人。",
        fit: "很適合往農村發展、教育推廣、使用者支援與包容設計方向發展。",
        skills: ["包容思維", "使用者同理", "推廣協調", "公平意識"],
        hook: "如果你很自然會去想『誰可能被落下』，這張卡很適合你。",
        resultIcon: buildRoleIconSvg({ title: "農村共好協調手", accent: "#6f8f56", symbol: "共" })
      },
      governance: {
        name: "ESG治理整合師",
        styleLabel: "責任設計型",
        summary: "你會把資料、制度、責任與風險一起看，像是在幫智慧農業建立更可靠運作規則的人。",
        fit: "很適合往資料治理、制度設計、農業政策與責任型數位轉型方向發展。",
        skills: ["治理判斷", "責任思維", "制度理解", "風險整合"],
        hook: "如果你總會去問『這套系統誰負責、怎麼被管理』，這張卡非常像你。",
        resultIcon: buildRoleIconSvg({ title: "ESG治理整合師", accent: "#3e6fb1", symbol: "治" })
      },
      resilience: {
        name: "韌性農場策劃者",
        styleLabel: "長期承受型",
        summary: "你不只關心眼前成果，也很在意農場面對未來風險能不能撐得住，很像在幫農場做長期布局的人。",
        fit: "很適合往氣候韌性、永續農場規劃、風險應對與長期轉型方向發展。",
        skills: ["長期思維", "風險應對", "韌性規劃", "整體布局"],
        hook: "如果你總會先想『未來遇到更大的壓力時怎麼辦』，這張卡就很適合你。",
        resultIcon: buildRoleIconSvg({ title: "韌性農場策劃者", accent: "#60739c", symbol: "韌" })
      }
    }
  };

  const SMART_FARM_WATER_GOVERNANCE_MODULE = {
    id: "water-governance",
    title: "水資源治理題組",
    group: "永續與治理",
    description: "從分配、公平、監測與治理角度，理解農業用水為什麼是政策與社會議題。",
    focusLabel: "治理與公平",
    landingPill: "水治理",
    questionCountLabel: "10 題",
    enabled: true,
    landing: {
      title: "水資源治理題組啟動",
      copy: "你將從水權、分配、公平與監測的角度，理解農業用水不是只有工程問題，也會牽涉制度、社會與全球壓力。",
      rules: [
        "共 10 題，聚焦水壓力、分配、公平、監測與治理流程。",
        "這一組會比純技術更偏政策與社會判斷。",
        "結果卡會回饋你在農業水治理中的思考風格。"
      ]
    },
    leaderboard: {
      eventCode: "smart-farm-global-mission-water-governance"
    },
    settings: {
      questionCount: 10,
      defaultTimeLimit: 14
    },
    questions: [
      {
        id: "water-governance-q1",
        type: "single-choice",
        prompt: "為什麼農業用水常被說不只是『技術問題』，也是『治理問題』？",
        description: "這題先建立：水不只是怎麼送到田裡，還包括怎麼被分配與管理。",
        topic: "治理概念",
        correctId: "allocation-fairness",
        answers: [
          { id: "allocation-fairness", label: "因為農業用水牽涉分配、公平、資料透明與不同使用者之間的協調", detail: "這就是它超出純工程範圍的地方。", trait: "allocation" },
          { id: "pipes-only", label: "只要水管和設備做得好，治理就不是問題", detail: "設備不能取代分配與制度問題。", trait: "monitoring" },
          { id: "farmers-alone", label: "用水只跟單一農戶有關，和整體社會無關", detail: "農業用水往往與更大的系統連動。", trait: "fairness" },
          { id: "weather-only", label: "農業缺水完全只是天氣造成，和管理無關", detail: "氣候重要，但治理也會影響結果。", trait: "resilience" }
        ]
      },
      {
        id: "water-governance-q2",
        type: "single-choice",
        prompt: "當我們說某地區農業面臨『高水壓力』，最接近的意思是什麼？",
        description: "這題把全球水壓力概念轉成玩家容易理解的判斷。",
        topic: "高水壓力",
        correctId: "demand-pressure",
        answers: [
          { id: "demand-pressure", label: "表示可用水量與用水需求之間的壓力很高，分配變得更敏感", detail: "這是水壓力概念的核心。", trait: "resilience" },
          { id: "no-rain-only", label: "代表完全沒下雨才叫高水壓力", detail: "水壓力不只由降雨決定。", trait: "monitoring" },
          { id: "big-farms-only", label: "只會影響大規模農場，和一般農戶無關", detail: "不同規模都可能受影響。", trait: "fairness" },
          { id: "water-price", label: "只代表水費變貴，和資源本身無關", detail: "價格只是可能的表現之一。", trait: "allocation" }
        ]
      },
      {
        id: "water-governance-q3",
        type: "timed-choice",
        prompt: "乾旱期來臨，灌區水量有限，不同農戶都希望先取得灌溉水。你先抓哪個治理重點？",
        description: "限時題模擬的是水資源緊張時，最先要思考的不是『誰喊最大聲』。",
        topic: "乾旱下分配",
        correctId: "rules-data",
        timeLimit: 8,
        countdownLabel: "8 秒快速判斷",
        urgencyText: "先抓水資源緊張時最需要被守住的治理基礎。",
        answers: [
          { id: "rules-data", label: "先確認分配規則與可被信任的用水資料", detail: "缺水時，規則與資訊會變得更重要。", trait: "allocation" },
          { id: "first-come", label: "誰先來要水就先給誰", detail: "這不一定公平，也不一定有效。", trait: "fairness" },
          { id: "largest-field", label: "地比較大的先配給，因為產量影響較大", detail: "這不一定能代表公平與整體效益。", trait: "monitoring" },
          { id: "ignore-data", label: "缺水時不用看資料，先照舊習慣處理", detail: "越緊張時越需要透明資訊。", trait: "resilience" }
        ]
      },
      {
        id: "water-governance-q4",
        type: "image-choice",
        prompt: "哪一種畫面最能代表『水治理』不只是工程，而是有監測與分配脈絡？",
        description: "這題要讓玩家看到治理比單一灌溉設備更大。",
        topic: "治理場景辨識",
        correctId: "monitor-allocation",
        options: [
          {
            id: "monitor-allocation",
            label: "監測資訊與灌溉分配節點一起出現",
            detail: "這最接近水資料與分配治理一起工作的畫面。",
            alt: "水治理監測示意",
            image: buildSceneIllustration({ title: "Water Governance", subtitle: "Monitor + Allocation", accent: "#2b6c8a", highlight: "#b6d9ea", symbol: "水" }),
            trait: "monitoring"
          },
          {
            id: "single-pipe",
            label: "單一灌溉水管設備",
            detail: "它屬於工程的一部分，但不足以代表治理。",
            alt: "單一水管示意",
            image: buildSceneIllustration({ title: "Single Pipe", subtitle: "Irrigation Tool", accent: "#5c7c90", highlight: "#d7e7ef", symbol: "管" }),
            trait: "allocation"
          },
          {
            id: "harvest-crate",
            label: "採收箱與果物",
            detail: "這和水治理沒有直接關聯。",
            alt: "採收箱示意",
            image: buildSceneIllustration({ title: "Harvest", subtitle: "Produce", accent: "#a36d2f", highlight: "#efd08d", symbol: "果" }),
            trait: "fairness"
          },
          {
            id: "market-road",
            label: "通往市場的道路",
            detail: "比較偏物流，不是水治理核心。",
            alt: "道路示意",
            image: buildSceneIllustration({ title: "Road", subtitle: "Transport", accent: "#6d7550", highlight: "#d6df9f", symbol: "路" }),
            trait: "resilience"
          }
        ]
      },
      {
        id: "water-governance-q5",
        type: "single-choice",
        prompt: "為什麼『誰先拿到水』常常不能只靠現場聲量或既有習慣決定？",
        description: "這題聚焦公平性與可被接受的規則。",
        topic: "公平分配",
        correctId: "shared-rules",
        answers: [
          { id: "shared-rules", label: "因為有限資源需要有較透明且可被理解的分配邏輯，避免衝突與不信任", detail: "這就是治理存在的原因之一。", trait: "fairness" },
          { id: "loudest-first", label: "因為誰喊得比較急，代表誰比較需要", detail: "急迫不一定等於最合理的分配。", trait: "allocation" },
          { id: "old-habit", label: "只要沿用舊習慣就不會有問題", detail: "當環境條件改變時，舊規則可能不再足夠。", trait: "monitoring" },
          { id: "biggest-only", label: "因為大農戶最重要，所以優先給大農戶就好", detail: "這會引發公平爭議。", trait: "resilience" }
        ]
      },
      {
        id: "water-governance-q6",
        type: "branching",
        prompt: "某灌區準備導入新的監測系統，一派主張先把設備裝齊，另一派主張先把資料公開規則和分配機制談清楚。你會先採哪個方向？",
        description: "這題把『技術建置』和『治理規則』放在一起比較。",
        topic: "治理優先序",
        correctId: "rules-first",
        choices: [
          {
            id: "devices-first",
            label: "先裝好設備，資料自然就會改善治理",
            detail: "設備很重要，但不一定能自動解決規則問題。",
            trait: "monitoring",
            next: "water-governance-q7"
          },
          {
            id: "rules-first",
            label: "先談清楚資料怎麼用、誰能看、分配怎麼對應",
            detail: "這更接近治理思維的起點。",
            trait: "governance",
            next: "water-governance-q7"
          }
        ]
      },
      {
        id: "water-governance-q7",
        type: "matching",
        prompt: "請把水治理相關元素，和它最接近的功能配對起來。",
        description: "這題把資料、規則、公平與韌性拆開看清楚。",
        topic: "治理元素配對",
        trait: "monitoring",
        leftItems: [
          { id: "water-data", label: "用水監測資料" },
          { id: "allocation-rule", label: "分配規則" },
          { id: "public-info", label: "資訊公開" },
          { id: "drought-plan", label: "乾旱應變計畫" }
        ],
        rightItems: [
          { id: "see-usage", label: "了解水到底怎麼被使用" },
          { id: "share-order", label: "在有限資源下安排先後與比例" },
          { id: "reduce-dispute", label: "降低不信任與資訊不對稱" },
          { id: "prepare-risk", label: "在極端條件下維持基本應對能力" }
        ],
        pairs: [
          { leftId: "water-data", rightId: "see-usage" },
          { leftId: "allocation-rule", rightId: "share-order" },
          { leftId: "public-info", rightId: "reduce-dispute" },
          { leftId: "drought-plan", rightId: "prepare-risk" }
        ]
      },
      {
        id: "water-governance-q8",
        type: "ordering",
        prompt: "如果一個地區要更有系統地面對農業用水風險，哪個順序比較合理？",
        description: "這題把治理思維整理成可以理解的流程。",
        topic: "治理流程",
        trait: "resilience",
        instructions: "請從『先看現況』排到『持續調整』。",
        items: [
          { id: "observe", label: "先掌握用水現況與壓力來源", detail: "先知道問題在哪裡。" },
          { id: "discuss", label: "討論分配原則與資料使用方式", detail: "建立共同基礎。" },
          { id: "act", label: "導入監測與執行分配措施", detail: "把規則落地。" },
          { id: "adjust", label: "依乾旱與現場變化持續調整", detail: "治理需要動態修正。" }
        ],
        correctOrder: ["observe", "discuss", "act", "adjust"]
      },
      {
        id: "water-governance-q9",
        type: "single-choice",
        prompt: "為什麼水資源治理會被視為全球性的農業議題，而不只是某一個地方的煩惱？",
        description: "這題回應你要求的全球視角。",
        topic: "全球水壓力",
        correctId: "global-scarcity",
        answers: [
          { id: "global-scarcity", label: "因為農業是大量用水部門，而許多地區都在面對水壓力與分配挑戰", detail: "這讓它成為全球性議題。", trait: "resilience" },
          { id: "only-desert", label: "只有乾旱沙漠地區才需要談水治理", detail: "很多地區都可能有水治理壓力。", trait: "allocation" },
          { id: "tech-solves-all", label: "只要技術夠進步，治理就不再重要", detail: "技術不能完全取代治理。", trait: "monitoring" },
          { id: "price-fixes", label: "只要提高水價，就不需要其他治理工具", detail: "價格只是治理工具的一部分。", trait: "fairness" }
        ]
      },
      {
        id: "water-governance-q10",
        type: "single-choice",
        prompt: "如果要用一句話總結水資源治理題組的核心，哪一個最貼切？",
        description: "最後一題收束的是：水問題不只是工程，也關乎制度與公平。",
        topic: "核心收束",
        correctId: "water-governance-core",
        answers: [
          { id: "water-governance-core", label: "農業用水要長久穩定，不只靠設備，也要靠資料、規則與公平的治理", detail: "這就是水治理題組最核心的觀念。", trait: "allocation" },
          { id: "pipes-enough", label: "只要灌溉工程做得夠多，水治理問題就會自然消失", detail: "這太低估治理層面的難題。", trait: "monitoring" },
          { id: "first-come-best", label: "水最好的分配方式就是先到先用", detail: "有限資源下這未必公平或穩定。", trait: "fairness" },
          { id: "local-only", label: "農業用水是地方小事，和全球永續無關", detail: "全球水壓力正好說明不是如此。", trait: "resilience" }
        ]
      }
    ],
    results: {
      allocation: {
        name: "用水分配觀察員",
        styleLabel: "配置判斷型",
        summary: "你很會先看到有限資源要怎麼分配才比較合理，像是在協助用水決策更穩的人。",
        fit: "很適合往灌區管理、水資源分配、農業調度與政策實務方向發展。",
        skills: ["分配思維", "資源配置", "優先序判斷", "治理意識"],
        hook: "如果你總在想『有限的水要怎麼分比較合理』，這張卡很像你。",
        resultIcon: buildRoleIconSvg({ title: "用水分配觀察員", accent: "#2b6c8a", symbol: "配" })
      },
      monitoring: {
        name: "水資料監測規劃手",
        styleLabel: "監測落地型",
        summary: "你很能理解治理要站在資料之上，像是幫農業用水建立可被看見基礎的人。",
        fit: "很適合往水監測、資料平台、環境資訊與灌區管理支援方向發展。",
        skills: ["監測意識", "資料規劃", "資訊透明", "現況掌握"],
        hook: "如果你會先問『到底有沒有可靠資料』，這張卡就很符合你。",
        resultIcon: buildRoleIconSvg({ title: "水資料監測規劃手", accent: "#4f86a3", symbol: "測" })
      },
      fairness: {
        name: "治理公平協調員",
        styleLabel: "公平溝通型",
        summary: "你很敏感於規則是否被理解、是否讓不同使用者都有被公平對待的空間，很像幫系統維持信任的人。",
        fit: "很適合往公共協調、制度溝通、社會參與與農業治理協商方向發展。",
        skills: ["公平意識", "協調溝通", "制度理解", "衝突敏感度"],
        hook: "如果你總會先想到『這樣分真的公平嗎』，這張卡非常像你。",
        resultIcon: buildRoleIconSvg({ title: "治理公平協調員", accent: "#6f8f56", symbol: "公" })
      },
      resilience: {
        name: "韌性水務策劃者",
        styleLabel: "風險應對型",
        summary: "你不只看今天的分配，也會想到乾旱、極端氣候與長期水壓力下怎麼維持農業運作，很像在為未來做準備的人。",
        fit: "很適合往乾旱應對、水風險規劃、韌性農業與長期治理設計方向發展。",
        skills: ["風險預判", "乾旱應對", "長期布局", "韌性治理"],
        hook: "如果你總會先想到『水再少下去怎麼辦』，這張卡會很適合你。",
        resultIcon: buildRoleIconSvg({ title: "韌性水務策劃者", accent: "#3e6fb1", symbol: "韌" })
      }
    }
  };

  const SMART_FARM_GLOBAL_SCENE = {
    id: "smart-farm-global-mission",
    title: "智慧農場全球任務站",
    subtitle: "Smart Farm Global Mission",
    description: "從田間感測、精準灌溉，到商業導入、能源效率與永續治理，這個主場景讓玩家先選方向，再深入理解智慧農業如何同時面對在地生產與全球挑戰。",
    hero: {
      eyebrow: "SMART FARM GLOBAL MISSION",
      title: "智慧農場全球任務站",
      copy: "這不是只有設備辨識的農業問答，而是一個結合 AIoT、資源調度、商業現實與全球永續議題的智慧農場任務站。"
    },
    panel: {
      badge: "第五場景",
      level: "擴充主題型",
      tags: ["智慧農業", "AIoT", "模組化", "節水", "永續", "全球視角", "商業導入", "農場決策"]
    },
    theme: {
      accent: "#2f7b4f",
      surface: "#f2efe5"
    },
    previewImage: buildSceneIllustration({
      title: "智慧農場",
      subtitle: "Global Mission",
      accent: "#2f7b4f",
      highlight: "#b8d77f",
      symbol: "農"
    }),
    intro: {
      title: "先選方向，再深入智慧農業現場",
      copy: "智慧農業不只是在田裡裝感測器。它還關係到農場用水、用電、投資回收、國際市場、ESG 與水資源治理。這個場景會先帶你進入主題，再由你選擇一個題組深入挑戰。",
      rules: [
        "先閱讀主題說明，再從七個題組中選一個方向。",
        "一旦選定題組，本輪就會鎖定在該題組完成 10 題。",
        "目前先開放智慧灌溉題組作為第一個 pilot module。",
        "未來會逐步補上技術、商業、能源、ESG、國際市場與水治理題組。"
      ]
    },
    moduleSelector: {
      pill: "題組分流",
      title: "選擇你想先深入的智慧農業方向",
      copy: "不同題組代表不同觀點。有人從技術切入，有人從商業與市場看問題，也有人從水、能源與永續治理來思考未來農業。",
      groupDescriptions: {
        "技術與系統": "從感測、灌溉與農場設備出發，理解智慧農業如何在田間真正運作。",
        "經營與市場": "從投資、採用門檻到國際市場，理解智慧農業怎麼變成可持續的商業行動。",
        "永續與治理": "從水資源、能源與 ESG 的角度，思考智慧農業如何在未來面對更大的環境壓力。"
      }
    },
    landing: {
      title: "智慧農場任務啟動",
      copy: "這是智慧農業主場景的共用入口。若你是從一般模式進來，下一步請先選擇一個題組。",
      rules: [
        "本主場景將逐步擴充成多題組結構。",
        "目前先開放智慧灌溉題組。"
      ]
    },
    leaderboard: {
      eventCode: "smart-farm-global-mission"
    },
    settings: {
      questionCount: 10,
      defaultTimeLimit: 14
    },
    resultOutro: "你剛剛完成的是智慧農場主場景中的一個題組切片。接下來，這個主場景還會再延伸到商業、市場、能源與治理等更多方向。",
    modules: [
      {
        id: "smart-irrigation",
        title: "智慧灌溉題組",
        group: "技術與系統",
        description: "從土壤濕度、灌溉時機、設備辨識，到水電取捨與全球水壓力，理解智慧灌溉不是固定澆水，而是用資料做更好的判斷。",
        focusLabel: "節水與決策",
        landingPill: "智慧灌溉",
        questionCountLabel: "10 題 pilot",
        enabled: true,
        landing: {
          title: "智慧灌溉題組啟動",
          copy: "你將從農場現場的角度，理解土壤、天氣、設備與調度如何影響真正的灌溉決策。這一組不只談技術，也會帶到缺水壓力與水電取捨。",
          rules: [
            "共 10 題，題型包含單選、限時、分支、圖片、配對與排序。",
            "重點不是背設備名稱，而是理解為什麼灌溉不能只靠習慣。",
            "結果卡會依你的作答傾向，回饋你在智慧灌溉中的判斷風格。"
          ]
        },
        leaderboard: {
          eventCode: "smart-farm-global-mission-smart-irrigation"
        },
        settings: {
          questionCount: 10,
          defaultTimeLimit: 14
        },
        questions: [
          {
            id: "farm-irrigation-q1",
            type: "single-choice",
            prompt: "農場管理員說：「我們本來就每天固定澆水，為什麼還需要智慧灌溉？」哪一個回答最能說明兩者的差別？",
            description: "這一題不是要否定傳統經驗，而是要理解智慧灌溉多了哪些判斷依據。",
            topic: "智慧灌溉概念",
            correctId: "data-based",
            answers: [
              { id: "data-based", label: "智慧灌溉會結合土壤濕度、天氣與作物狀態調整時機與水量", detail: "它不是只把澆水變自動，而是讓澆水更有根據。", trait: "systems" },
              { id: "more-water", label: "智慧灌溉就是讓田裡永遠保持比較多的水", detail: "水量多不等於判斷更好，過多反而可能造成浪費。", trait: "moisture" },
              { id: "same-time", label: "智慧灌溉只是把人工固定排程改成電腦固定排程", detail: "如果沒有依條件調整，本質上還是不夠智慧。", trait: "timing" },
              { id: "camera-only", label: "智慧灌溉只要裝攝影機看葉子顏色就夠了", detail: "影像有幫助，但灌溉判斷不會只靠單一來源。", trait: "resilience" }
            ]
          },
          {
            id: "farm-irrigation-q2",
            type: "single-choice",
            prompt: "一塊田在正中午看起來表面偏乾，但土壤濕度感測器顯示較深層仍有足夠水分。這時團隊最該先理解什麼？",
            description: "現場判讀常常會遇到「肉眼看到的」和「數據顯示的」不完全一致。",
            topic: "土壤濕度判讀",
            correctId: "surface-vs-depth",
            answers: [
              { id: "surface-vs-depth", label: "表面乾不一定代表根系區缺水，還要看感測深度與作物需求", detail: "智慧灌溉強調的是根據有效資訊做判斷。", trait: "moisture" },
              { id: "always-water", label: "只要表面看起來乾，就先立刻大量灌溉", detail: "這容易造成不必要的用水。", trait: "timing" },
              { id: "ignore-sensor", label: "感測器數據先不用理，現場經驗永遠最準", detail: "智慧灌溉強調的是經驗與數據一起判讀。", trait: "systems" },
              { id: "pause-days", label: "表示未來幾天都完全不需要再看這塊田", detail: "一筆數據不代表後續不用持續觀察。", trait: "resilience" }
            ]
          },
          {
            id: "farm-irrigation-q3",
            type: "timed-choice",
            prompt: "你正在看農場儀表板：午前高溫將至、某區土壤濕度接近警戒值、抽水系統可在 30 分鐘內啟動。你必須先做哪個判斷？",
            description: "限時題模擬的是現場要快速抓重點，而不是盲目地先把水打開。",
            topic: "灌溉時機判斷",
            correctId: "threshold-weather",
            timeLimit: 8,
            countdownLabel: "8 秒快速判斷",
            urgencyText: "先抓真正影響灌溉的關鍵，不要只靠直覺下決定。",
            answers: [
              { id: "threshold-weather", label: "先確認濕度是否真的跨過門檻，並結合即將到來的天氣條件", detail: "智慧灌溉重點是把時機和條件一起判讀。", trait: "timing" },
              { id: "water-now", label: "先把所有區域一起灌滿再說", detail: "先灌再說看似安全，實際上可能造成浪費。", trait: "systems" },
              { id: "ignore-noon", label: "只看現在畫面，不用管中午氣溫和蒸散變化", detail: "天氣是灌溉的重要背景資訊。", trait: "resilience" },
              { id: "wait-random", label: "今天先完全不處理，等明天再說", detail: "如果真的接近閾值，延後處理可能錯過最佳時機。", trait: "moisture" }
            ]
          },
          {
            id: "farm-irrigation-q4",
            type: "branching",
            prompt: "一位資深工作人員主張每天固定清晨六點灌溉，另一位年輕工程師建議依感測器和作物狀況彈性調整。你會先採哪種方向？",
            description: "這題想讓你感受「固定排程的安心感」和「精準調整的價值」之間的差異。",
            topic: "固定排程與精準灌溉",
            correctId: "precision-first",
            choices: [
              {
                id: "fixed-first",
                label: "先維持固定排程，因為大家已經習慣這樣做",
                detail: "這條路代表穩定與熟悉，但不一定是最省水或最準確的做法。",
                trait: "resilience",
                next: "farm-irrigation-q5"
              },
              {
                id: "precision-first",
                label: "先改成依感測資料與作物條件調整灌溉",
                detail: "這條路更接近智慧灌溉的核心精神。",
                trait: "systems",
                next: "farm-irrigation-q5"
              }
            ]
          },
          {
            id: "farm-irrigation-q5",
            type: "single-choice",
            prompt: "如果某地區進入短期乾旱壓力，智慧灌溉最大的價值是什麼？",
            description: "乾旱情境下，真正重要的通常不是「有沒有灌」，而是「怎麼分配」。",
            topic: "乾旱與韌性",
            correctId: "prioritize",
            answers: [
              { id: "prioritize", label: "幫助農場更精準地決定哪裡最需要水、什麼時候最該灌", detail: "有限水量下的優先順序，就是智慧灌溉的重要價值。", trait: "resilience" },
              { id: "same-all", label: "讓所有地塊用完全一樣的灌溉量，避免麻煩", detail: "看似公平，但不一定符合實際需求。", trait: "timing" },
              { id: "more-pumps", label: "只要增加抽水設備，就能解決乾旱問題", detail: "設備能幫忙，但乾旱不是只靠多抽水就能解決。", trait: "systems" },
              { id: "ignore-data", label: "乾旱時不需要看數據，直接照最保守方式全部灌滿", detail: "極端保守也可能帶來新的浪費。", trait: "moisture" }
            ]
          },
          {
            id: "farm-irrigation-q6",
            type: "image-choice",
            prompt: "下面哪一組設備最像是智慧灌溉現場會用來做判斷與控制的組合？",
            description: "不只是有水管就算智慧灌溉，關鍵在於感測、判讀與控制是否串起來。",
            topic: "設備辨識",
            correctId: "smart-station",
            options: [
              {
                id: "smart-station",
                label: "土壤感測器 + 控制面板 + 灌溉節點",
                detail: "這類組合能把田間資訊接到決策與執行端。",
                alt: "智慧灌溉感測與控制站",
                image: buildSceneIllustration({
                  title: "Irrigation Station",
                  subtitle: "Sensor + Control",
                  accent: "#2f7b4f",
                  highlight: "#9ed38a",
                  symbol: "水"
                }),
                trait: "systems"
              },
              {
                id: "tractor-only",
                label: "大型曳引機",
                detail: "它很重要，但不等於智慧灌溉控制站。",
                alt: "農用曳引機",
                image: buildSceneIllustration({
                  title: "Farm Tractor",
                  subtitle: "Field Power",
                  accent: "#9a6a2a",
                  highlight: "#e5bf73",
                  symbol: "車"
                }),
                trait: "timing"
              },
              {
                id: "warehouse-only",
                label: "倉儲貨架與包裝區",
                detail: "這比較接近收成與物流，不是灌溉決策核心。",
                alt: "農產品倉儲區",
                image: buildSceneIllustration({
                  title: "Storage Area",
                  subtitle: "Postharvest",
                  accent: "#58636f",
                  highlight: "#c4ccd6",
                  symbol: "倉"
                }),
                trait: "resilience"
              }
            ],
            next: "farm-irrigation-q7"
          },
          {
            id: "farm-irrigation-q7",
            type: "matching",
            prompt: "請把智慧灌溉相關工具和它最貼近的效果配對起來。",
            description: "理解工具和結果之間的連結，比背設備名稱更重要。",
            topic: "工具與效果配對",
            trait: "moisture",
            instructions: "把左邊的工具對到右邊最適合的用途或效果。",
            leftItems: [
              { id: "soil-sensor", label: "土壤濕度感測器", detail: "協助掌握根系區附近的含水狀態" },
              { id: "weather-station", label: "田間氣象站", detail: "觀察氣溫、日照、風與降雨趨勢" },
              { id: "valve-control", label: "自動閥門控制", detail: "讓灌溉能依指令啟停或分區" },
              { id: "dashboard", label: "灌溉儀表板", detail: "把感測與設備資料集中顯示" }
            ],
            rightItems: [
              { id: "see-moisture", label: "知道土壤是否接近缺水門檻" },
              { id: "watch-weather", label: "把即將到來的天氣變化納入判斷" },
              { id: "execute-zones", label: "把不同區域的灌溉動作分開控制" },
              { id: "combine-signals", label: "把多來源資訊整合成決策畫面" }
            ],
            pairs: [
              { leftId: "soil-sensor", rightId: "see-moisture" },
              { leftId: "weather-station", rightId: "watch-weather" },
              { leftId: "valve-control", rightId: "execute-zones" },
              { leftId: "dashboard", rightId: "combine-signals" }
            ]
          },
          {
            id: "farm-irrigation-q8",
            type: "ordering",
            prompt: "如果農場想讓灌溉更有效率，下面哪一個流程順序最合理？",
            description: "這題要你把智慧灌溉當成一個決策流程，而不是單一設備。",
            topic: "灌溉決策流程",
            trait: "timing",
            instructions: "把這些步驟排成比較合理的智慧灌溉順序。",
            items: [
              { id: "collect", label: "先收集土壤、天氣與設備資料", detail: "感測與現場資料是決策起點" },
              { id: "judge", label: "判斷是否接近灌溉門檻", detail: "不是每次收到數據都一定要灌水" },
              { id: "decide", label: "決定灌溉區域、時機與水量", detail: "讓行動更符合當下條件" },
              { id: "review", label: "執行後回看結果再修正下一次策略", detail: "智慧灌溉需要持續調整，不是一勞永逸" }
            ],
            correctOrder: ["collect", "judge", "decide", "review"]
          },
          {
            id: "farm-irrigation-q9",
            type: "single-choice",
            prompt: "農場希望節水，但抽水、控制系統與感測設備也會用電。哪一個想法最接近智慧灌溉真正想追求的方向？",
            description: "這題把用水與用電放在同一張桌上思考。",
            topic: "水電取捨",
            correctId: "balance-water-energy",
            answers: [
              { id: "balance-water-energy", label: "同時考慮節水和能源效率，避免只優化其中一邊", detail: "真正的智慧灌溉不會只看單一資源。", trait: "systems" },
              { id: "water-only", label: "只要省水就好，用多少電不需要管", detail: "這會忽略農場整體運作成本與永續性。", trait: "moisture" },
              { id: "energy-only", label: "只要省電就好，水量多一點沒關係", detail: "這同樣只看單一面向。", trait: "timing" },
              { id: "manual-only", label: "乾脆全部回到人工開關最省事", detail: "人工不一定比較省，也不一定能即時應對。", trait: "resilience" }
            ]
          },
          {
            id: "farm-irrigation-q10",
            type: "single-choice",
            prompt: "如果把眼光放到全球，為什麼智慧灌溉會被視為未來智慧農業的重要方向之一？",
            description: "最後一題要把你剛剛的田間判斷拉回更大的世界背景。",
            topic: "全球視角與未來",
            correctId: "global-pressure",
            answers: [
              { id: "global-pressure", label: "因為農業同時面對水壓力、氣候變遷與糧食需求增加，灌溉必須更精準", detail: "這就是智慧灌溉從在地走向全球的重要原因。", trait: "resilience" },
              { id: "more-machines", label: "因為未來每一塊田都一定會完全自動化，不再需要人判斷", detail: "科技會更進步，但人的判斷不會完全消失。", trait: "systems" },
              { id: "more-water", label: "因為未來水源會越來越多，所以可以更放心灌溉", detail: "全球現況其實更接近相反方向。", trait: "moisture" },
              { id: "local-only", label: "智慧灌溉只適合少數地區，和全球農業沒有太大關係", detail: "全球糧食、安全與資源議題都讓它更重要。", trait: "timing" }
            ]
          }
        ],
        results: {
          timing: {
            name: "灌溉節奏觀察員",
            styleLabel: "時機判讀型",
            summary: "你會先看時間點、條件變化與灌溉節奏，而不是一遇到乾燥感就立刻下水。這種特質很適合在灌溉決策中抓住真正的先後順序。",
            fit: "你適合往需要觀察時機、調度流程與快速判斷的智慧農業角色發展。",
            skills: ["灌溉時機判讀", "流程節奏安排", "條件變化觀察", "現場快速決策"],
            hook: "你在智慧灌溉裡看到的，不只是要不要澆水，而是什麼時候澆、先處理哪裡、如何避免錯過最佳時機。",
            resultIcon: buildRoleIconSvg({ title: "灌溉節奏觀察員", accent: "#2f7b4f", symbol: "時" })
          },
          moisture: {
            name: "土壤濕度判讀員",
            styleLabel: "訊號敏感型",
            summary: "你很在意資料和現場狀況是否一致，特別會去分辨表面看起來乾與真正缺水之間的差異。這種敏感度是精準灌溉的核心能力之一。",
            fit: "你適合往田間監測、感測判讀與農場數據分析這類角色發展。",
            skills: ["濕度訊號判讀", "感測資料理解", "現場與數據比對", "水分狀態觀察"],
            hook: "你知道智慧灌溉不能只看表面，而要把真正對作物有意義的水分訊號讀懂。",
            resultIcon: buildRoleIconSvg({ title: "土壤濕度判讀員", accent: "#4d8b59", symbol: "土" })
          },
          systems: {
            name: "精準灌溉整合手",
            styleLabel: "系統整合型",
            summary: "你傾向把感測器、儀表板、控制系統與現場操作看成一整套系統，而不是分散的設備。這種整合視角很接近智慧農業真正的工程思維。",
            fit: "你適合往智慧農業系統整合、IoT 應用與農場自動化規劃等方向發展。",
            skills: ["系統整合", "設備功能對應", "多來源資訊判讀", "灌溉策略設計"],
            hook: "你看到的不是一個水閥、一顆感測器，而是一整條從資料到行動的智慧灌溉決策鏈。",
            resultIcon: buildRoleIconSvg({ title: "精準灌溉整合手", accent: "#227f67", symbol: "整" })
          },
          resilience: {
            name: "智慧用水調度者",
            styleLabel: "韌性規劃型",
            summary: "你很自然會把乾旱、水壓力與資源分配放進思考裡。這種特質讓你更像一位會在有限條件下安排優先順序的調度者。",
            fit: "你適合往資源調度、韌性農業與長期永續規劃相關角色發展。",
            skills: ["資源優先順序安排", "乾旱情境判斷", "風險與韌性思考", "永續調度視角"],
            hook: "你關心的不只是今天有沒有灌到，而是在未來壓力更大的情況下，農場如何更聰明地把每一滴水用在最需要的地方。",
            resultIcon: buildRoleIconSvg({ title: "智慧用水調度者", accent: "#3e6fb1", symbol: "水" })
          }
        }
      },
      SMART_FARM_TECH_MODULE,
      SMART_FARM_ENERGY_MODULE,
      SMART_FARM_BUSINESS_MODULE,
      SMART_FARM_GLOBAL_MARKET_MODULE,
      SMART_FARM_ESG_MODULE,
      SMART_FARM_WATER_GOVERNANCE_MODULE
    ]
  };

  const smartIrrigationModule = SMART_FARM_GLOBAL_SCENE.modules.find((module) => module.id === "smart-irrigation");
  if (smartIrrigationModule) {
    const irrigationBaseQuestions = cloneData(smartIrrigationModule.questions || []);
    const irrigationBaseResults = cloneData(smartIrrigationModule.results || {});

    smartIrrigationModule.difficultySets = {
      easy: createSmartIrrigationDifficultySet("easy", irrigationBaseQuestions, irrigationBaseResults),
      medium: createSmartIrrigationDifficultySet("medium", irrigationBaseQuestions, irrigationBaseResults),
      hard: createSmartIrrigationDifficultySet("hard", irrigationBaseQuestions, irrigationBaseResults)
    };
    smartIrrigationModule.questionCountLabel = "10 題 / 三段難度";
  }

  const scenes = [CHIP_HUNTER_SCENE, DUAL_EXPERIENCE_SCENE, SMART_FACTORY_SCENE, SMART_CARE_SCENE, SMART_FARM_GLOBAL_SCENE];

  global.SceneRegistry = {
    getAllScenes() {
      return scenes.slice();
    },
    getSceneById(id) {
      return scenes.find((scene) => scene.id === id) || null;
    }
  };
})(window);
