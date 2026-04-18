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

  const scenes = [CHIP_HUNTER_SCENE, DUAL_EXPERIENCE_SCENE];

  global.SceneRegistry = {
    getAllScenes() {
      return scenes.slice();
    },
    getSceneById(id) {
      return scenes.find((scene) => scene.id === id) || null;
    }
  };
})(window);
