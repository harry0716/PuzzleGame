(function attachSceneRegistry(global) {
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

    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  }

  const CHIP_HUNTER_SCENE = {
    id: "chip-hunter",
    title: "晶片獵人",
    subtitle: "AI Lab Talent Sprint",
    description: "從 AI 設備、智慧工廠到系統整合，快速體驗晶片與 AI 場景的核心亮點。",
    hero: {
      eyebrow: "CHIP HUNTER",
      title: "晶片獵人",
      copy: "這是第一個完成場景化搬移的內容版本，後續新活動主題都會沿用同一套場景系統加入。"
    },
    panel: {
      badge: "現行活動場景",
      level: "入門探索",
      tags: ["單選題", "排序題", "圖片題", "配對題", "分支題", "限時", "AI", "系統整合"]
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
        topic: "圖像辨識",
        correctId: "server",
        options: [
          {
            id: "server",
            label: "AI 伺服器機櫃",
            detail: "代表高效運算與模型訓練設備。",
            alt: "AI 伺服器機櫃示意圖",
            image: buildSceneIllustration({
              title: "AI Server",
              subtitle: "High Compute",
              accent: "#0a7f6f",
              highlight: "#16325c",
              symbol: "▦"
            }),
            trait: "ai"
          },
          {
            id: "printer",
            label: "一般印表機",
            detail: "辦公用途常見，但不是 AI 訓練核心。",
            alt: "印表機示意圖",
            image: buildSceneIllustration({
              title: "Printer",
              subtitle: "Office Device",
              accent: "#d46a3b",
              highlight: "#ffb36e",
              symbol: "▤"
            }),
            trait: "maker"
          },
          {
            id: "projector",
            label: "簡報投影機",
            detail: "展示可用，但不是高效運算設備。",
            alt: "投影機示意圖",
            image: buildSceneIllustration({
              title: "Projector",
              subtitle: "Presentation",
              accent: "#445a7a",
              highlight: "#7aa2c8",
              symbol: "◫"
            }),
            trait: "system"
          }
        ]
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
        name: "實作創意工程師",
        summary: "你對實際動手做、把點子變成可展示的作品這件事最有熱情。",
        fit: "未來可往裝置實作、互動系統、原型開發與跨域作品設計發展。",
        skills: ["原型製作", "動手實作", "創意轉化", "展示表達"],
        hook: "當你願意把想法做出來，就很容易在跨域專題裡脫穎而出。 "
      }
    }
  };

  const scenes = [CHIP_HUNTER_SCENE];

  global.SceneRegistry = {
    getAllScenes() {
      return scenes.slice();
    },
    getSceneById(id) {
      return scenes.find((scene) => scene.id === id) || null;
    }
  };
})(window);
