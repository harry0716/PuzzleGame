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
      {
        id: "agri-tech",
        title: "技術題組",
        group: "技術與系統",
        description: "聚焦感測器、影像辨識、無人機巡田與資料平台，從技術角度理解智慧農業。",
        focusLabel: "感測與平台",
        questionCountLabel: "10 題規劃中",
        enabled: false
      },
      {
        id: "farm-energy",
        title: "能源題組",
        group: "技術與系統",
        description: "從抽水、冷鏈、溫室控制到再生能源，理解智慧農業的電力與能源議題。",
        focusLabel: "能源效率",
        questionCountLabel: "10 題規劃中",
        enabled: false
      },
      {
        id: "farm-business",
        title: "商業題組",
        group: "經營與市場",
        description: "從缺工、投資回收、可追溯性到農產品價值，理解智慧農業導入背後的商業現實。",
        focusLabel: "投資與回收",
        questionCountLabel: "10 題規劃中",
        enabled: false
      },
      {
        id: "global-market",
        title: "國際市場題組",
        group: "經營與市場",
        description: "從品質穩定、標準、透明度與出口邏輯，理解全球市場為什麼在意智慧農業。",
        focusLabel: "市場信任",
        questionCountLabel: "10 題規劃中",
        enabled: false
      },
      {
        id: "farm-esg",
        title: "ESG 題組",
        group: "永續與治理",
        description: "從資源效率、數位落差與韌性農業，理解智慧農業和 ESG 之間的關係。",
        focusLabel: "永續轉型",
        questionCountLabel: "10 題規劃中",
        enabled: false
      },
      {
        id: "water-governance",
        title: "水資源治理題組",
        group: "永續與治理",
        description: "從分配、公平、監測與治理角度，理解農業用水為什麼是政策與社會議題。",
        focusLabel: "治理與公平",
        questionCountLabel: "10 題規劃中",
        enabled: false
      }
    ]
  };

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
