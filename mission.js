(() => {
  "use strict";

  const intro = document.querySelector("#intro");
  const game = document.querySelector("#game");
  const ending = document.querySelector("#ending");
  const workCard = document.querySelector("#work-card");
  const evidence = [
    { id: "power", icon: "⚡", name: "查看電源", short: "12V 穩定", detail: "攝影機電源燈亮著，供電維持在 12V。畫面全黑不是因為沒有電。" },
    { id: "sensor", icon: "◉", name: "測試鏡頭", short: "晶片有輸出", detail: "影像感測器晶片能產生測試畫面，代表它有在工作。" },
    { id: "processor", icon: "▣", name: "檢查處理器", short: "收到 0 畫格", detail: "處理晶片運作正常，卻收不到鏡頭送來的畫格；輸入接頭也有鬆動痕跡。" }
  ];
  const diagnoses = [
    { id: "power", label: "攝影機完全沒有供電" },
    { id: "link", label: "鏡頭到處理晶片的訊號中斷" },
    { id: "audience", label: "直播平台沒有觀眾" }
  ];
  const gardenEvidence = [
    { id: "soil", icon: "✳", name: "手持量測", short: "28% 偏乾", detail: "手持儀器量到土壤含水量 28%。這面植物牆需要澆水。" },
    { id: "sensor", icon: "◉", name: "查看感測器", short: "顯示 52%", detail: "固定式感測器顯示 52%，比手持量測高了 24 個百分點。" },
    { id: "pump", icon: "↗", name: "測試水泵", short: "可以啟動", detail: "水泵手動測試正常；控制晶片只會在讀數低於 35% 時啟動它。" }
  ];
  const parts = [
    { id: "sensor", name: "影像感測器", detail: "把光轉成電子訊號" },
    { id: "processor", name: "影像處理晶片", detail: "整理與運算畫面" },
    { id: "encoder", name: "直播編碼器", detail: "送出可播放的影像" },
    { id: "light", name: "舞台燈控", detail: "控制現場照明" }
  ];
  const route = ["sensor", "processor", "encoder"];
  const cases = [
    { title: "校慶直播大救援", career: "影像系統工程師", icon: "◉", color: "mint", skill: "追查訊號、重接影像路徑並調校畫面", eyebrow: "CASE 01 / LIVE RESCUE", steps: ["01 找出故障", "02 接好訊號", "03 調校畫面"], label: "LIVE / 校慶主舞台", footer: "◉ 影像感測器　→　▣ 處理晶片　→　▰ 直播畫面" },
    { title: "智慧花圃誤報", career: "感測控制工程師", icon: "✳", color: "lime", skill: "比對量測資料，校正感測器與灌溉控制", eyebrow: "CASE 02 / SENSOR RESCUE", steps: ["01 查出誤報", "02 校正感測器"], label: "SENSOR / 校園植物牆", footer: "◉ 土壤感測器　→　▣ 控制晶片　→　● 灌溉水泵" },
    { title: "晶片檢測站", career: "半導體品保工程師", icon: "◇", color: "blue", skill: "辨識走線缺陷並以電性量測攔下瑕疵", eyebrow: "CASE 03 / CHIP INSPECTION", steps: ["01 找出斷線", "02 電性複測"], label: "QC / 晶片檢測線", footer: "◇ 外觀檢查　→　⌁ 電性量測　→　✓ 合格出貨" },
    { title: "智慧工廠分揀線", career: "自動化控制工程師", icon: "▤", color: "orange", skill: "設定判斷規則，讓產線正確分流瑕疵品", eyebrow: "CASE 04 / FACTORY LOGIC", steps: ["01 讀懂訊號", "02 設定分流"], label: "AUTO / 智慧工廠", footer: "◉ 光學感測器　→　▣ 控制規則　→　⇥ 分流臂" },
    { title: "無人機避障測試", career: "嵌入式飛控工程師", icon: "✦", color: "violet", skill: "規劃安全航線並設定即時避障反應", eyebrow: "CASE 05 / FLIGHT TEST", steps: ["01 規劃航線", "02 設定避障"], label: "FLIGHT / 校園測試場", footer: "◉ 距離感測器　→　▣ 飛控晶片　→　↗ 安全航線" }
  ];
  const chipLetters = ["A", "B", "C", "D", "E", "F"];
  let caseIndex = 0;
  let completed = [];
  let state;

  function createChipSet() {
    const defects = [false, true, false, false, true, false];
    for (let index = defects.length - 1; index > 0; index--) {
      const other = Math.floor(Math.random() * (index + 1));
      [defects[index], defects[other]] = [defects[other], defects[index]];
    }
    return chipLetters.map((id, index) => ({ id, defect: defects[index] }));
  }

  function initialState(index) {
    return {
      phase: 1,
      tests: 3,
      inspected: new Set(),
      selectedParts: [],
      filter: 30,
      notice: null,
      hintUsed: false,
      lastClue: ["先查看現場線索，找出訊號在哪裡中斷。", "植物牆很乾，水泵卻沒有啟動。先比對現場與感測器讀數。", "這批晶片準備出貨，請先找出表面走線異常的兩顆。", "正常品反射值 68、瑕疵品 32；分流臂只該攔下低反射值物件。", "從起點規劃到終點的路，避開兩個障礙格。"][index],
      gardenOffset: 0,
      chipSelection: [],
      chips: createChipSet(),
      factorySignal: null,
      factoryRule: null,
      flightPath: [6]
    };
  }

  function start() {
    completed = [];
    startCase(0);
  }

  function startCase(index) {
    caseIndex = index;
    state = initialState(index);
    intro.hidden = true;
    ending.hidden = true;
    game.hidden = false;
    render();
    game.scrollIntoView({ behavior: "auto", block: "start" });
    document.querySelector("#work-card h2")?.focus();
  }

  function accuracy(filter) {
    return {
      noise: Math.max(0, Math.round(100 - filter * 1.1)),
      detail: Math.max(0, Math.round(100 - Math.max(0, filter - 55) * 1.5))
    };
  }

  function useTest(feedback) {
    state.tests -= 1;
    if (state.tests <= 0) {
      showFailure(feedback);
      return false;
    }
    state.notice = { kind: "bad", text: `${feedback} 還有 ${state.tests} 次測試機會，可以換個方法。` };
    render();
    return true;
  }

  function inspect(id) {
    const item = evidence.find((entry) => entry.id === id);
    if (!item) return;
    state.inspected.add(id);
    state.lastClue = item.detail;
    state.notice = null;
    render();
    document.querySelector(`[data-evidence="${id}"]`)?.focus();
  }

  function diagnose(id) {
    if (id === "link") {
      state.phase = 2;
      state.notice = { kind: "good", text: "找到了！鏡頭與處理晶片都在運作，問題出在兩者之間。接下來建立一條備援影像路徑。" };
      state.lastClue = "故障已定位：鏡頭晶片 → 處理晶片之間的訊號中斷。";
      render();
    } else if (id === "power") {
      useTest("電源燈和 12V 讀數都正常，這次判斷沒有找到故障點。");
    } else {
      useTest("觀眾人數不會讓攝影機失去輸入畫格，請回到設備訊號尋找原因。");
    }
  }

  function selectPart(id) {
    if (!parts.some((part) => part.id === id)) return;
    if (state.selectedParts.includes(id)) {
      state.selectedParts = state.selectedParts.filter((entry) => entry !== id);
    } else if (state.selectedParts.length < 3) {
      state.selectedParts.push(id);
    }
    render();
    document.querySelector(`[data-part="${id}"]`)?.focus();
  }

  function testRoute() {
    if (state.selectedParts.length !== 3) return;
    const correct = route.every((id, index) => state.selectedParts[index] === id);
    if (correct) {
      state.phase = 3;
      state.notice = { kind: "good", text: "訊號恢復了！影像感測器送出畫格，經處理晶片運算，再交給編碼器直播。現在畫面有雜訊，還需要調校。" };
      state.lastClue = "影像訊號已恢復，但直播畫面仍有明顯雜訊。";
      render();
    } else {
      state.selectedParts = [];
      useTest("訊號沒有通過。影像必須先被感測器擷取，再處理，最後才能編碼送出。");
    }
  }

  function tune() {
    const result = accuracy(state.filter);
    if (result.noise <= 30 && result.detail >= 65) {
      completeCase();
    } else if (result.noise > 30) {
      useTest("畫面還有太多雜訊，稍微增加濾波強度再觀察。");
    } else {
      useTest("雜訊雖然降低，舞台文字卻被抹得太模糊了；請減少濾波強度。");
    }
  }

  function inspectGarden(id) {
    const item = gardenEvidence.find((entry) => entry.id === id);
    if (!item) return;
    state.inspected.add(id);
    state.lastClue = item.detail;
    state.notice = null;
    render();
    document.querySelector(`[data-garden-evidence="${id}"]`)?.focus();
  }

  function diagnoseGarden(id) {
    if (id === "offset") {
      state.phase = 2;
      state.lastClue = "固定感測器比現場實測多顯示 24%。調整校正值後，控制晶片才能正確啟動水泵。";
      state.notice = { kind: "good", text: "找到了！固定感測器讀數偏高，水泵因此誤以為土壤仍然潮濕。" };
      render();
    } else if (id === "pump") {
      useTest("手動測試證明水泵能運轉；再比對兩個濕度讀數。");
    } else {
      useTest("手持量測只有 28%，植物牆確實需要澆水。");
    }
  }

  function gardenReading() {
    return 52 + state.gardenOffset;
  }

  function submitGarden() {
    const reading = gardenReading();
    if (Math.abs(reading - 28) <= 3 && reading < 35) {
      completeCase();
    } else if (reading > 31) {
      useTest("校正後仍比現場量測偏高，控制晶片可能繼續錯過澆水時機。");
    } else {
      useTest("校正值太低了；讓感測器讀數接近手持量測的 28%。");
    }
  }

  function renderGardenDiagnosis() {
    workCard.innerHTML = `
      <span class="section-label">CASE 02 / INVESTIGATE</span><h2 tabindex="-1">植物牆為什麼不澆水？</h2>
      <p>葉子明顯下垂，控制器卻顯示「土壤夠濕」。查看三項免費線索，再選出最可能的問題。</p>
      <div class="subhead">現場線索 ${state.inspected.size}/3</div>
      <div class="evidence-grid">${gardenEvidence.map((item) => `<button class="tile-button ${state.inspected.has(item.id) ? "seen" : ""}" data-garden-evidence="${item.id}" type="button"><strong>${item.icon} ${item.name}</strong><small>${state.inspected.has(item.id) ? item.short : "點擊檢查"}</small></button>`).join("")}</div>
      <div class="clue-panel" role="status">${state.lastClue}</div>
      <div class="subhead">你要先修正什麼？</div>
      <div class="choice-grid"><button class="choice-button" data-garden-diagnosis="pump" type="button"><strong>更換水泵 →</strong></button><button class="choice-button" data-garden-diagnosis="offset" type="button"><strong>校正固定式感測器 →</strong></button><button class="choice-button" data-garden-diagnosis="soil" type="button"><strong>繼續等待土壤變乾 →</strong></button></div>
      ${renderNotice()}`;
    workCard.querySelectorAll("[data-garden-evidence]").forEach((button) => button.addEventListener("click", () => inspectGarden(button.dataset.gardenEvidence)));
    workCard.querySelectorAll("[data-garden-diagnosis]").forEach((button) => button.addEventListener("click", () => diagnoseGarden(button.dataset.gardenDiagnosis)));
  }

  function renderGardenTune() {
    workCard.innerHTML = `
      <span class="section-label">CASE 02 / CALIBRATE</span><h2 tabindex="-1">把感測器校準</h2>
      <p>手持儀器量到 28%，固定式感測器卻顯示 52%。調整校正值，讓兩者接近，水泵才會在低於 35% 時啟動。</p>
      <div class="condition">目標：校正後讀數與 28% 相差不超過 3%；水泵必須啟動。</div>
      <div class="tune-control"><label for="garden-slider">感測器校正值 <strong id="garden-offset">${state.gardenOffset > 0 ? "+" : ""}${state.gardenOffset}</strong></label><input id="garden-slider" type="range" min="-30" max="10" value="${state.gardenOffset}" /><div class="tune-scale"><span>降低顯示值</span><span>提高顯示值</span></div></div>
      <div class="reading-pair"><div><small>手持實測</small><strong>28%</strong></div><div><small>校正後讀數</small><strong id="garden-reading">${gardenReading()}%</strong></div></div>
      <div class="condition" id="pump-status">${gardenReading() < 35 ? "水泵：已啟動" : "水泵：待命中"}</div>
      <div class="action-row"><button class="secondary-button" id="submit-garden" type="button">測試灌溉系統</button></div>
      ${renderNotice()}`;
    workCard.querySelector("#garden-slider").addEventListener("input", (event) => {
      state.gardenOffset = Number(event.target.value);
      updateGardenVisuals();
    });
    workCard.querySelector("#submit-garden").addEventListener("click", submitGarden);
    updateGardenVisuals();
  }

  function updateGardenVisuals() {
    const reading = gardenReading();
    const corrected = document.querySelector("#garden-reading");
    if (corrected) corrected.textContent = `${reading}%`;
    const offset = document.querySelector("#garden-offset");
    if (offset) offset.textContent = `${state.gardenOffset > 0 ? "+" : ""}${state.gardenOffset}`;
    const pump = document.querySelector("#pump-status");
    if (pump) pump.textContent = reading < 35 ? "水泵：已啟動" : "水泵：待命中";
    document.querySelector("#case-visual")?.classList.toggle("water-on", state.phase === 2 && reading < 35);
    const visualReading = document.querySelector("#visual-reading");
    if (visualReading) visualReading.textContent = `${reading}%`;
  }

  function chipFace(defect) {
    return `<span class="chip-face ${defect ? "broken" : ""}" aria-hidden="true"><i class="chip-trace"></i><i class="chip-core"></i><i class="chip-pad top"></i><i class="chip-pad bottom"></i></span>`;
  }

  function toggleChip(id) {
    if (state.chipSelection.includes(id)) state.chipSelection = state.chipSelection.filter((item) => item !== id);
    else if (state.chipSelection.length < 2) state.chipSelection.push(id);
    render();
    document.querySelector(`[data-chip="${id}"]`)?.focus();
  }

  function testChips() {
    if (state.chipSelection.length !== 2) return;
    const defectIds = state.chips.filter((chip) => chip.defect).map((chip) => chip.id);
    if (defectIds.every((id) => state.chipSelection.includes(id))) {
      state.phase = 2;
      state.lastClue = "兩顆走線不連續的晶片已挑出。現在用電性量測找出外觀檢查看不見的問題。";
      state.notice = { kind: "good", text: "外觀檢查完成！下一批有一顆藏著電性故障，請看量測數字。" };
      render();
    } else {
      useTest("有晶片被漏掉或誤挑。請對照合格樣本，留意中央金色導線是否斷開。");
    }
  }

  function chooseElectrical(id) {
    if (id === "B") completeCase();
    else useTest("這顆晶片的阻值落在 1–3 Ω 正常範圍。請找出不導通的一顆。");
  }

  function renderChipVisual() {
    workCard.innerHTML = `
      <span class="section-label">CASE 03 / VISUAL CHECK</span><h2 tabindex="-1">挑出兩顆斷線晶片</h2>
      <p>合格晶片的中央金色導線是連續的。請從這六顆晶片選出兩顆有缺口的，點擊已選晶片可取消。</p>
      <div class="reference-chip"><span>合格樣本</span>${chipFace(false)}<small>看中央走線</small></div>
      <div class="chip-grid">${state.chips.map((chip) => `<button class="chip-tile ${state.chipSelection.includes(chip.id) ? "chosen" : ""}" data-chip="${chip.id}" type="button" aria-pressed="${state.chipSelection.includes(chip.id)}" aria-label="晶片 ${chip.id}，中央導線${chip.defect ? "有缺口" : "連續"}">${chipFace(chip.defect)}<strong>${chip.id}</strong></button>`).join("")}</div>
      <div class="selected-path">已選 ${state.chipSelection.length}/2：${state.chipSelection.join("、") || "尚未選擇"}</div>
      <div class="action-row"><button class="secondary-button" id="test-chips" type="button" ${state.chipSelection.length !== 2 ? "disabled" : ""}>送交外觀檢查</button></div>
      ${renderNotice()}`;
    workCard.querySelectorAll("[data-chip]").forEach((button) => button.addEventListener("click", () => toggleChip(button.dataset.chip)));
    workCard.querySelector("#test-chips").addEventListener("click", testChips);
  }

  function renderChipElectrical() {
    workCard.innerHTML = `
      <span class="section-label">CASE 03 / ELECTRICAL CHECK</span><h2 tabindex="-1">外觀看不出的故障</h2>
      <p>第二批晶片外觀都完整，但有一顆無法導通。正常阻值為 1–3 Ω；請選出需要攔下的晶片。</p>
      <div class="reading-choices"><button class="choice-button" data-electrical="A" type="button"><strong>晶片 A</strong><small>1.4 Ω</small></button><button class="choice-button" data-electrical="B" type="button"><strong>晶片 B</strong><small>∞ Ω · 不導通</small></button><button class="choice-button" data-electrical="C" type="button"><strong>晶片 C</strong><small>2.1 Ω</small></button></div>
      ${renderNotice()}`;
    workCard.querySelectorAll("[data-electrical]").forEach((button) => button.addEventListener("click", () => chooseElectrical(button.dataset.electrical)));
  }

  function inspectFactory(id) {
    const clues = {
      sensor: "光學感測器正常：合格品讀值 68，瑕疵品讀值 32。",
      arm: "分流臂手動測試正常；收到攔截指令就會推開物件。",
      log: "目前控制規則寫成『讀值高於 45 就攔截』，結果合格品被推出去了。"
    };
    state.inspected.add(id);
    state.lastClue = clues[id];
    state.notice = null;
    render();
  }

  function diagnoseFactory(id) {
    if (id === "rule") {
      state.phase = 2;
      state.lastClue = "感測器與分流臂都正常；要修的是兩者之間的判斷規則。";
      state.notice = { kind: "good", text: "故障已定位。現在設定哪種讀值要啟動分流臂。" };
      render();
    } else {
      useTest("設備手動測試正常。看看控制紀錄裡的判斷方向。 ");
    }
  }

  function submitFactory() {
    if (state.factoryRule === "below") completeCase();
    else useTest("目前的規則會攔下反射值 68 的合格品；請讓反射值 32 的瑕疵品被分流。 ");
  }

  function renderFactoryDiagnosis() {
    const clues = [
      ["sensor", "◉ 感測器讀值", "檢查光學讀數"],
      ["arm", "⇥ 分流臂", "執行手動測試"],
      ["log", "▣ 控制紀錄", "查詢目前規則"]
    ];
    workCard.innerHTML = `
      <span class="section-label">CASE 04 / INVESTIGATE</span><h2 tabindex="-1">合格品為什麼被推出去？</h2>
      <p>產線把正常產品當成瑕疵品。先看三項線索，再判斷要修哪個環節。</p>
      <div class="evidence-grid">${clues.map(([id, title, label]) => `<button class="tile-button ${state.inspected.has(id) ? "seen" : ""}" data-factory-evidence="${id}" type="button"><strong>${title}</strong><small>${state.inspected.has(id) ? "已查看" : label}</small></button>`).join("")}</div>
      <div class="clue-panel" role="status">${state.lastClue}</div>
      <div class="choice-grid"><button class="choice-button" data-factory-diagnosis="sensor" type="button"><strong>更換光學感測器 →</strong></button><button class="choice-button" data-factory-diagnosis="rule" type="button"><strong>修正控制規則 →</strong></button><button class="choice-button" data-factory-diagnosis="arm" type="button"><strong>更換分流臂 →</strong></button></div>
      ${renderNotice()}`;
    workCard.querySelectorAll("[data-factory-evidence]").forEach((button) => button.addEventListener("click", () => inspectFactory(button.dataset.factoryEvidence)));
    workCard.querySelectorAll("[data-factory-diagnosis]").forEach((button) => button.addEventListener("click", () => diagnoseFactory(button.dataset.factoryDiagnosis)));
  }

  function renderFactoryRule() {
    const below = state.factoryRule === "below";
    const above = state.factoryRule === "above";
    workCard.innerHTML = `
      <span class="section-label">CASE 04 / CONTROL LOGIC</span><h2 tabindex="-1">設定分流條件</h2>
      <p>合格品反射值 68，瑕疵品 32。兩者都會經過感測器。選擇一條規則，再執行測試。</p>
      <div class="factory-flow"><span>◉ 量測反射值</span><span>→</span><span>▣ 比較 45</span><span>→</span><span>⇥ 啟動分流臂</span></div>
      <div class="choice-grid"><button class="choice-button ${below ? "selected" : ""}" data-factory-rule="below" aria-pressed="${below}" type="button"><strong>低於 45 → 分流</strong><small>攔下低反射值物件</small></button><button class="choice-button ${above ? "selected" : ""}" data-factory-rule="above" aria-pressed="${above}" type="button"><strong>高於 45 → 分流</strong><small>攔下高反射值物件</small></button></div>
      <div class="factory-test"><span>合格品 68：<strong>${state.factoryRule ? (above ? "被誤攔" : "正常通過") : "等待規則"}</strong></span><span>瑕疵品 32：<strong>${state.factoryRule ? (below ? "成功攔下" : "錯誤通過") : "等待規則"}</strong></span></div>
      <div class="action-row"><button class="secondary-button" id="submit-factory" type="button" ${state.factoryRule ? "" : "disabled"}>執行產線測試</button></div>${renderNotice()}`;
    workCard.querySelectorAll("[data-factory-rule]").forEach((button) => button.addEventListener("click", () => { state.factoryRule = button.dataset.factoryRule; render(); }));
    workCard.querySelector("#submit-factory").addEventListener("click", submitFactory);
  }

  const flightObstacles = [4, 7];
  function selectFlightTile(index) {
    const path = state.flightPath;
    const last = path[path.length - 1];
    if (index === last && path.length > 1) path.pop();
    else if (!flightObstacles.includes(index) && !path.includes(index) && Math.abs(Math.floor(index / 3) - Math.floor(last / 3)) + Math.abs(index % 3 - last % 3) === 1) path.push(index);
    else state.notice = { kind: "bad", text: "只能前往相鄰的安全格；點選航線最後一格可撤回。" };
    render();
  }

  function submitFlightPath() {
    if (state.flightPath.at(-1) === 2) {
      state.phase = 2;
      state.lastClue = "航線已避開固定障礙；接下來處理飛行途中突然出現的物件。";
      state.notice = { kind: "good", text: "航線通過靜態測試。現在設定距離感測器的即時反應。" };
      render();
    }
  }

  function renderFlightPath() {
    workCard.innerHTML = `
      <span class="section-label">CASE 05 / PATH PLANNING</span><h2 tabindex="-1">畫一條安全航線</h2>
      <p>從左下角起點出發，到右上角終點。只能走相鄰格；深色格是障礙，點選航線最後一格可撤回。</p>
      <div class="flight-grid" aria-label="三乘三飛行場地">${Array.from({ length: 9 }, (_, index) => `<button class="flight-tile ${flightObstacles.includes(index) ? "obstacle" : ""} ${state.flightPath.includes(index) ? "route" : ""}" data-flight-tile="${index}" type="button" ${flightObstacles.includes(index) ? "disabled" : ""} aria-label="${index === 6 ? "起點" : index === 2 ? "終點" : flightObstacles.includes(index) ? "障礙" : `安全格 ${index + 1}`}">${index === 6 ? "起飛" : index === 2 ? "終點 ✦" : flightObstacles.includes(index) ? "障礙" : state.flightPath.includes(index) ? String(state.flightPath.indexOf(index) + 1).padStart(2, "0") : "·"}</button>`).join("")}</div>
      <div class="selected-path">已規劃 ${state.flightPath.length - 1} 步 ${state.flightPath.at(-1) === 2 ? "· 已抵達終點" : "· 尚未抵達終點"}</div>
      <div class="action-row"><button class="secondary-button" id="submit-flight-path" type="button" ${state.flightPath.at(-1) === 2 ? "" : "disabled"}>測試航線</button><button class="text-button" id="reset-flight-path" type="button">重畫航線</button></div>${renderNotice()}`;
    workCard.querySelectorAll("[data-flight-tile]").forEach((button) => button.addEventListener("click", () => selectFlightTile(Number(button.dataset.flightTile))));
    workCard.querySelector("#submit-flight-path").addEventListener("click", submitFlightPath);
    workCard.querySelector("#reset-flight-path").addEventListener("click", () => { state.flightPath = [6]; state.notice = null; render(); });
  }

  function renderFlightSafety() {
    workCard.innerHTML = `
      <span class="section-label">CASE 05 / SAFETY LOGIC</span><h2 tabindex="-1">突然偵測到前方障礙</h2>
      <p>飛行中，距離感測器回報前方 0.7 公尺出現物件，安全距離設定為 1.5 公尺。飛控晶片應該發出哪個指令？</p>
      <div class="reading-pair"><div><small>目前距離</small><strong>0.7 m</strong></div><div><small>安全距離</small><strong>1.5 m</strong></div></div>
      <div class="choice-grid"><button class="choice-button" data-flight-action="speed" type="button"><strong>加速通過 →</strong></button><button class="choice-button" data-flight-action="stop" type="button"><strong>煞停、保持距離並重新規劃 →</strong></button><button class="choice-button" data-flight-action="ignore" type="button"><strong>忽略訊號，照原航線前進 →</strong></button></div>${renderNotice()}`;
    workCard.querySelectorAll("[data-flight-action]").forEach((button) => button.addEventListener("click", () => {
      if (button.dataset.flightAction === "stop") completeCase();
      else useTest("0.7 公尺小於 1.5 公尺安全距離，飛控應先避免碰撞。 ");
    }));
  }

  function renderNotice() {
    return state.notice ? `<div class="feedback ${state.notice.kind}" role="status">${state.notice.text}</div>` : "";
  }

  function renderDiagnosis() {
    workCard.innerHTML = `
      <span class="section-label">STEP 01 / OBSERVE</span>
      <h2 tabindex="-1">先找出故障點</h2>
      <p>直播畫面沒有輸入。你可以免費查看三項現場線索，再決定要修哪裡。判斷錯誤會用掉一次測試機會。</p>
      <div class="subhead">查看線索 <span aria-label="已查看 ${state.inspected.size} 項">${state.inspected.size}/3</span></div>
      <div class="evidence-grid">${evidence.map((item) => `<button class="tile-button ${state.inspected.has(item.id) ? "seen" : ""}" data-evidence="${item.id}" type="button"><strong>${item.icon} ${item.name}</strong><small>${state.inspected.has(item.id) ? item.short : "點擊檢查"}</small></button>`).join("")}</div>
      <div class="clue-panel" role="status">${state.lastClue}</div>
      <div class="subhead">你要修哪裡？</div>
      <div class="choice-grid">${diagnoses.map((item) => `<button class="choice-button" data-diagnosis="${item.id}" type="button"><strong>${item.label} →</strong></button>`).join("")}</div>
      ${renderNotice()}`;
    workCard.querySelectorAll("[data-evidence]").forEach((button) => button.addEventListener("click", () => inspect(button.dataset.evidence)));
    workCard.querySelectorAll("[data-diagnosis]").forEach((button) => button.addEventListener("click", () => diagnose(button.dataset.diagnosis)));
  }

  function renderRoute() {
    const chosen = state.selectedParts.map((id) => parts.find((part) => part.id === id)?.name);
    workCard.innerHTML = `
      <span class="section-label">STEP 02 / RECONNECT</span>
      <h2 tabindex="-1">接好備援訊號路徑</h2>
      <p>依照影像產生、處理、送出直播的順序，選三個元件。點選已選元件可撤回；測試錯誤會用掉一次機會。</p>
      <div class="subhead">可選元件</div>
      <div class="parts-grid">${parts.map((part) => `<button type="button" class="part-button ${state.selectedParts.includes(part.id) ? "selected" : ""}" data-part="${part.id}" aria-pressed="${state.selectedParts.includes(part.id)}"><strong>${part.name}</strong><small>${part.detail}</small></button>`).join("")}</div>
      <div class="subhead">你的訊號路徑</div>
      <div class="selected-path" aria-label="目前選擇：${chosen.join("，") || "尚未選擇"}">${chosen.length ? chosen.map((name, index) => `${index ? '<span class="path-arrow">→</span>' : ""}<span class="path-node">${name}</span>`).join("") : "依序點選上方的三個元件"}</div>
      <div class="action-row"><button class="secondary-button" id="test-route" type="button" ${chosen.length !== 3 ? "disabled" : ""}>測試訊號路徑</button><button class="text-button" id="clear-route" type="button">清空重選</button></div>
      ${renderNotice()}`;
    workCard.querySelectorAll("[data-part]").forEach((button) => button.addEventListener("click", () => selectPart(button.dataset.part)));
    workCard.querySelector("#test-route").addEventListener("click", testRoute);
    workCard.querySelector("#clear-route").addEventListener("click", () => { state.selectedParts = []; render(); });
  }

  function renderTune() {
    const result = accuracy(state.filter);
    workCard.innerHTML = `
      <span class="section-label">STEP 03 / TUNE</span>
      <h2 tabindex="-1">把畫面調清楚</h2>
      <p>訊號接通了，畫面卻有雜訊。拉動濾波強度，觀察左側直播畫面與指標，找出清晰又保留細節的設定。</p>
      <div class="condition">直播要求：雜訊 ≤ 30、細節 ≥ 65。這是遊戲中的簡化影像模型。</div>
      <div class="tune-control"><label for="filter-slider">濾波強度 <strong id="filter-value">${state.filter}</strong></label><input id="filter-slider" type="range" min="0" max="100" value="${state.filter}" /><div class="tune-scale"><span>保留細節</span><span>降低雜訊</span></div></div>
      <div class="metric"><span>雜訊</span><div class="meter"><i id="noise-meter" style="width:${result.noise}%"></i></div><strong id="noise-value">${result.noise}</strong></div>
      <div class="metric"><span>畫面細節</span><div class="meter"><i id="detail-meter" style="width:${result.detail}%"></i></div><strong id="detail-value">${result.detail}</strong></div>
      <div class="action-row"><button class="secondary-button" id="submit-tune" type="button">送出直播畫面</button></div>
      ${renderNotice()}`;
    workCard.querySelector("#filter-slider").addEventListener("input", (event) => {
      state.filter = Number(event.target.value);
      updateTuneVisuals();
    });
    workCard.querySelector("#submit-tune").addEventListener("click", tune);
  }

  function updateTuneVisuals() {
    const result = accuracy(state.filter);
    const setText = (selector, value) => { const node = document.querySelector(selector); if (node) node.textContent = value; };
    const setWidth = (selector, value, warn) => { const node = document.querySelector(selector); if (node) { node.style.width = `${value}%`; node.classList.toggle("warn", warn); } };
    setText("#filter-value", state.filter);
    setText("#noise-value", result.noise);
    setText("#detail-value", result.detail);
    setWidth("#noise-meter", result.noise, result.noise > 30);
    setWidth("#detail-meter", result.detail, result.detail < 65);
    document.querySelector("#screen-noise").style.opacity = String(Math.min(.7, result.noise / 110));
    document.querySelector("#stage-art").style.filter = `blur(${Math.max(0, 65 - result.detail) / 8}px)`;
  }

  function render() {
    const currentCase = cases[caseIndex];
    document.querySelector("#case-eyebrow").textContent = currentCase.eyebrow;
    document.querySelector("#case-title").textContent = currentCase.title;
    document.querySelector("#stage-counter").textContent = `案件 ${caseIndex + 1}/${cases.length} · 任務 ${state.phase}/${currentCase.steps.length}`;
    document.querySelector("#test-counter").textContent = `可用測試 ${state.tests} 次`;
    document.querySelector("#stepper").style.gridTemplateColumns = `repeat(${currentCase.steps.length}, 1fr)`;
    for (let step = 1; step <= 3; step++) {
      const node = document.querySelector(`#step-${step}`);
      node.hidden = step > currentCase.steps.length;
      if (!node.hidden) {
        node.textContent = currentCase.steps[step - 1];
        node.className = step === state.phase ? "active" : step < state.phase ? "done" : "";
      }
    }
    document.querySelector("#monitor-note").textContent = state.lastClue;
    document.querySelector("#monitor-label").textContent = currentCase.label;
    document.querySelector(".monitor-card").setAttribute("aria-label", `${currentCase.title}現場監控器`);
    document.querySelector("#monitor-footer").textContent = currentCase.footer;
    const signalBack = caseIndex === 0 && state.phase === 3;
    document.querySelector("#no-signal").hidden = caseIndex !== 0 || signalBack;
    document.querySelector("#stage-art").classList.toggle("visible", signalBack);
    document.querySelector("#stage-art").hidden = caseIndex !== 0;
    const caseVisual = document.querySelector("#case-visual");
    caseVisual.hidden = caseIndex === 0;
    caseVisual.className = `case-visual case-${caseIndex + 1}`;
    if (caseIndex === 1) {
      caseVisual.innerHTML = `<div class="garden-scene"><span class="garden-sun">☀</span><span class="garden-plant">✿</span><span class="garden-soil"></span><span class="garden-water">✦ ✦ ✦</span><div class="garden-readout">固定感測器 <strong id="visual-reading">${gardenReading()}%</strong><small>手持實測 28%</small></div></div>`;
    } else if (caseIndex === 2) {
      caseVisual.innerHTML = `<div class="chip-scene"><span>SEMICONDUCTOR QC</span><div class="chip-scene-grid">${Array.from({ length: 9 }, () => chipFace(false)).join("")}</div><strong>檢查外觀與導通狀態</strong></div>`;
    } else if (caseIndex === 3) {
      caseVisual.innerHTML = `<div class="factory-scene"><span class="visual-kicker">SMART FACTORY / LINE 04</span><div class="factory-belt"><span class="factory-product good">68</span><span class="factory-product bad">32</span><span class="factory-sensor">◉</span><span class="factory-arm">⇥</span></div><strong>讀取 · 判斷 · 分流</strong></div>`;
    } else if (caseIndex === 4) {
      caseVisual.innerHTML = `<div class="flight-scene"><span class="visual-kicker">FLIGHT CONTROL / TEST FIELD</span><span class="flight-drone">✦</span><div class="flight-radar"></div><strong>感測距離 · 規劃安全航線</strong></div>`;
    } else {
      caseVisual.innerHTML = "";
    }
    const monitorState = document.querySelector("#monitor-state");
    monitorState.textContent = [signalBack ? "SIGNAL RESTORED" : "NO SIGNAL", "SENSOR MISMATCH", "QC REVIEW", "SORTING ERROR", "FLIGHT TEST"][caseIndex];
    monitorState.classList.toggle("online", signalBack);
    document.querySelector("#screen-noise").style.opacity = "0";
    if (caseIndex === 0) {
      if (state.phase === 1) renderDiagnosis();
      if (state.phase === 2) renderRoute();
      if (state.phase === 3) { renderTune(); updateTuneVisuals(); }
    } else if (caseIndex === 1) {
      if (state.phase === 1) renderGardenDiagnosis();
      else renderGardenTune();
      updateGardenVisuals();
    } else if (caseIndex === 2) {
      if (state.phase === 1) renderChipVisual();
      else renderChipElectrical();
    } else if (caseIndex === 3) {
      if (state.phase === 1) renderFactoryDiagnosis();
      else renderFactoryRule();
    } else {
      if (state.phase === 1) renderFlightPath();
      else renderFlightSafety();
    }
  }

  function openEnding() {
    game.hidden = true;
    ending.hidden = false;
    ending.scrollIntoView({ behavior: "auto", block: "start" });
    ending.querySelector("h1")?.setAttribute("tabindex", "-1");
    ending.querySelector("h1")?.focus();
  }

  function completeCase() {
    const details = [
      `修復影像訊號，濾波 ${state.filter}：雜訊 ${accuracy(state.filter).noise} / 細節 ${accuracy(state.filter).detail}`,
      `把固定感測器從 52% 校正到 ${gardenReading()}%，讓水泵恢復工作`,
      `挑出兩顆斷線晶片，再以電性量測攔下不導通晶片`,
      `修正分流條件，讓反射值 68 的合格品通過、32 的瑕疵品被攔下`,
      `規劃 ${state.flightPath.length - 1} 步安全航線，並設定障礙前煞停與重新規劃`
    ];
    completed.push({ ...cases[caseIndex], detail: details[caseIndex], testsUsed: 3 - state.tests, hintUsed: state.hintUsed });
    if (caseIndex === cases.length - 1) showFinal();
    else showCheckpoint();
  }

  function showCheckpoint() {
    const card = completed.at(-1);
    ending.innerHTML = `
      <span class="eyebrow">CASE ${String(caseIndex + 1).padStart(2, "0")} COMPLETE / ${completed.length} OF ${cases.length}</span>
      <h1>任務完成。<br /><span class="ending-accent">解鎖第 ${completed.length} 張職人卡！</span></h1>
      ${careerCard(card, caseIndex)}
      <p class="result-note">這張卡記錄你完成的任務，並不判定職業適性。</p>
      <div class="case-progress">${cases.map((item, index) => `<span class="${index <= caseIndex ? "finished" : ""}">${index <= caseIndex ? "✓" : "○"} ${item.career}</span>`).join("")}</div>
      <button class="primary-button" id="next-case" type="button">前往第 ${caseIndex + 2} 案 ↗</button>`;
    ending.querySelector("#next-case").addEventListener("click", () => startCase(caseIndex + 1));
    openEnding();
  }

  function showFinal() {
    const totalTests = completed.reduce((sum, item) => sum + item.testsUsed, 0);
    ending.innerHTML = `
      <span class="eyebrow">ALL CASES COMPLETE / 5 張職人卡已解鎖</span>
      <h1>五起事件，都修好了。<br /><span class="ending-accent">你的職人卡冊完成！</span></h1>
      <p>你完成了五種不同的電子與半導體工作。每張卡記錄你實際做過的操作，不替你判定職業適性。</p>
      <div class="career-gallery">${completed.map((card, index) => careerCard(card, index)).join("")}</div>
      <p class="result-note">總計 ${totalTests} 次錯誤測試；${completed.filter((item) => item.hintUsed).length} 案使用提示。紀錄只存在這次遊玩畫面，不會上傳姓名或成績。</p>
      <div class="end-actions"><button class="primary-button" id="retry-all" type="button">重新挑戰五案 ↗</button><button class="secondary-button" id="copy-card" type="button">複製五張卡文字</button></div>`;
    ending.querySelector("#retry-all").addEventListener("click", start);
    ending.querySelector("#copy-card").addEventListener("click", async (event) => {
      const summary = `電子工程救援隊｜5/5 職人卡\n${completed.map((item) => `${item.career}｜${item.title}：${item.detail}`).join("\n")}`;
      try {
        await navigator.clipboard.writeText(summary);
        event.currentTarget.textContent = "已複製！";
      } catch {
        event.currentTarget.textContent = "無法自動複製，請手動選取卡片文字";
      }
    });
    openEnding();
  }

  function careerCard(card, index) {
    return `<article class="career-card ${card.color}"><div class="career-card-top"><span>CAREER CARD 0${index + 1}</span><span class="career-card-icon" aria-hidden="true">${card.icon}</span></div><h2>${card.career}</h2><p class="career-case">${card.title}</p><div class="career-card-art" aria-hidden="true"><span>${card.icon}</span><i></i><i></i><i></i></div><p class="career-skill">${card.skill}</p><div class="career-proof"><strong>這次的實作</strong><span>${card.detail}</span></div></article>`;
  }

  function showFailure(reason) {
    ending.innerHTML = `
      <span class="eyebrow">CASE PAUSED / 測試用盡</span>
      <h1>這一案還沒完成。<br /><span class="ending-accent">線索已經更清楚了。</span></h1>
      <div class="failure-card">${reason}<br />重試這一案時，前面已完成的案件仍保留。先看免費線索，再使用測試機會。</div>
      <button class="primary-button" id="retry-case" type="button">重試這一案 ↗</button>`;
    ending.querySelector("#retry-case").addEventListener("click", () => startCase(caseIndex));
    openEnding();
  }

  document.querySelector("#start-button").addEventListener("click", start);
  document.querySelector("#hint-button").addEventListener("click", () => {
    if (!state) return;
    const hints = [
      { 1: "先比較電源、鏡頭與處理器：哪兩個正常運作，卻沒有把畫面交到下一站？", 2: "影像先由感測器產生，再交給晶片處理，最後由編碼器送出。", 3: "數值要同時符合雜訊 ≤ 30 與細節 ≥ 65；濾波太弱或太強都不行。" },
      { 1: "比較手持量測 28% 與固定感測器 52%，再確認水泵能不能正常運轉。", 2: "讓 52% 加上校正值後，接近手持量測的 28%。" },
      { 1: "合格樣本的中央金色走線完整；缺口很細，請一顆一顆比對。", 2: "正常阻值在 1–3 Ω；∞ Ω 代表這條路徑不導通。" },
      { 1: "感測器與分流臂都正常。比較控制紀錄的『高於 45』與兩種產品讀值。", 2: "瑕疵品反射值 32，低於 45；合格品 68，高於 45。" },
      { 1: "從起點往上走到左上角，再沿上排前往終點。", 2: "0.7 公尺小於 1.5 公尺安全距離，應先煞停並重新規劃。" }
    ];
    state.hintUsed = true;
    state.notice = { kind: "good", text: hints[caseIndex][state.phase] };
    render();
  });
})();
