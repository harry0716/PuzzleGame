(function attachSceneRegistry(global) {
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
      tags: ["單選題", "限時", "AI", "晶片", "系統整合"]
    },
    theme: {
      accent: "#0a7f6f",
      surface: "#f4ede3"
    },
    landing: {
      title: "開始晶片獵人挑戰",
      copy: "你將在 5 題限時問答裡，認識 AI 實驗室設備、智慧工廠與 AIoT 系統整合。",
      rules: [
        "共 5 題，每題預設 12 秒。",
        "答對可得分，越快作答分數越高。",
        "結果卡會依照你的選擇傾向給出適合方向。"
      ]
    },
    leaderboard: {
      eventCode: "puzzlegame-visit-2026-04-08"
    },
    settings: {
      questionCount: 5,
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
        type: "single-choice",
        prompt: "Factory IO 展示最接近哪一種能力？",
        description: "它對應的是智慧工廠與產線模擬的概念。",
        correctId: "b",
        topic: "智慧製造",
        answers: [
          { id: "a", label: "手繪海報設計", detail: "跟工業模擬沒有直接關聯。", trait: "maker" },
          { id: "b", label: "產線控制與智慧製造模擬", detail: "這就是 Factory IO 的展示重點。", trait: "industry" },
          { id: "c", label: "社群直播拍攝", detail: "不是本場景的主題能力。", trait: "ai" },
          { id: "d", label: "文書整理報告", detail: "不屬於工業控制主軸。", trait: "system" }
        ]
      },
      {
        id: "q4",
        type: "single-choice",
        prompt: "如果把 AI 放進電子系的學習脈絡，最適合搭配的是哪一種發展方向？",
        description: "這題在看你能不能把硬體、系統和 AI 聯想到一起。",
        correctId: "d",
        topic: "系統應用",
        answers: [
          { id: "a", label: "只做平面美編設計", detail: "不是這次活動的發展主軸。", trait: "maker" },
          { id: "b", label: "只研究剪輯與影音", detail: "和電子系核心展示不符。", trait: "maker" },
          { id: "c", label: "單純記背理論名詞", detail: "不是實驗室強調的實作方向。", trait: "system" },
          { id: "d", label: "AIoT 系統整合應用", detail: "這是 AI 與電子工程結合最有代表性的方向之一。", trait: "system" }
        ]
      },
      {
        id: "q5",
        type: "single-choice",
        prompt: "如果你對實驗室的 AI 伺服器、GPU 與推理能力最有感，最可能偏向哪個方向？",
        description: "看看你比較像是 AI 模型應用派，還是其他類型。",
        correctId: "a",
        topic: "興趣傾向",
        answers: [
          { id: "a", label: "AI 應用 / 邊緣運算 / 模型實作", detail: "這條線最接近 AI 裝置與模型應用。", trait: "ai" },
          { id: "b", label: "手作裝置與機構製作", detail: "更偏向 maker 的方向。", trait: "maker" },
          { id: "c", label: "感測器控制與設備串接", detail: "比較接近系統整合類型。", trait: "system" },
          { id: "d", label: "工廠流程與智慧產線", detail: "較偏向智慧製造方向。", trait: "industry" }
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
