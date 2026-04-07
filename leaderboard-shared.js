(function attachLeaderboardShared(global) {
  const MAX_LEADERBOARD = 8;
  const LOCAL_BOARD_KEY = "ai-lab-board";
  const APP_CONFIG = global.APP_CONFIG || {
    leaderboard: {
      provider: "local",
      supabaseUrl: "",
      supabaseAnonKey: "",
      table: "leaderboard_entries",
      eventCode: "ai-lab-visit"
    }
  };

  function sanitizeNickname(value) {
    const trimmed = String(value || "").trim();
    return trimmed ? trimmed.slice(0, 12) : "參訪者";
  }

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

  function normalizeBoard(entries) {
    return entries
      .map((entry) => ({
        player: sanitizeNickname(entry.player || "參訪者"),
        score: Number(entry.score || 0),
        talent: entry.talent || "未分類",
        playedAt:
          entry.playedAt ||
          new Date().toLocaleTimeString("zh-TW", {
            hour: "2-digit",
            minute: "2-digit"
          })
      }))
      .sort((left, right) => right.score - left.score)
      .slice(0, MAX_LEADERBOARD);
  }

  function getLocalLeaderboard() {
    try {
      return JSON.parse(global.localStorage.getItem(LOCAL_BOARD_KEY) || "[]");
    } catch (error) {
      return [];
    }
  }

  async function fetchSharedLeaderboard() {
    const options = APP_CONFIG.leaderboard;
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

  async function getLeaderboardEntries() {
    if (hasSharedLeaderboard()) {
      return fetchSharedLeaderboard();
    }
    return normalizeBoard(getLocalLeaderboard());
  }

  global.LeaderboardShared = {
    APP_CONFIG,
    MAX_LEADERBOARD,
    hasSharedLeaderboard,
    getLeaderboardEntries,
    normalizeBoard,
    sanitizeNickname
  };
})(window);
