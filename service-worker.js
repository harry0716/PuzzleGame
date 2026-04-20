const CACHE_NAME = "ai-lab-talent-sprint-v24";
const ASSET_VERSION = "20260420e";
const PRECACHE_URLS = [
  "./",
  "./index.html",
  "./leaderboard.html",
  "./presenter.html",
  `./styles.css?v=${ASSET_VERSION}`,
  `./app.js?v=${ASSET_VERSION}`,
  `./scene-registry.js?v=${ASSET_VERSION}`,
  `./config.js?v=${ASSET_VERSION}`,
  `./leaderboard-shared.js?v=${ASSET_VERSION}`,
  `./leaderboard-page.js?v=${ASSET_VERSION}`,
  `./presenter.js?v=${ASSET_VERSION}`,
  `./manifest.webmanifest?v=${ASSET_VERSION}`,
  `./icon.svg?v=${ASSET_VERSION}`,
  "./assets/scenes/electronics-dual-experience/cover.svg",
  "./assets/scenes/electronics-dual-experience/ai-zone.svg",
  "./assets/scenes/electronics-dual-experience/drone-zone.svg",
  "./assets/scenes/smart-factory-mission-station/cover.svg",
  "./assets/scenes/smart-factory-mission-station/sensor-line.svg",
  "./assets/scenes/smart-factory-mission-station/inspection-station.svg",
  "./assets/scenes/smart-care-mission-station/cover.svg",
  "./assets/scenes/smart-care-mission-station/vitals-monitor.svg",
  "./assets/scenes/smart-care-mission-station/bedside-sensor.svg",
  "./assets/results/ai-chip-explorer.svg",
  "./assets/results/flight-operator.svg",
  "./assets/results/signal-integrator.svg",
  "./assets/results/immersive-maker.svg",
  "./assets/results/line-control-director.svg",
  "./assets/results/quality-inspection-observer.svg",
  "./assets/results/automation-integration-engineer.svg",
  "./assets/results/smart-operations-coordinator.svg",
  "./assets/results/vitals-signal-observer.svg",
  "./assets/results/smart-care-coordinator.svg",
  "./assets/results/medical-systems-integrator.svg",
  "./assets/results/long-term-care-guardian.svg"
];

function isSameOrigin(requestUrl) {
  return new URL(requestUrl).origin === self.location.origin;
}

async function networkFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  try {
    const response = await fetch(request);
    if (response && response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    const cached = await cache.match(request);
    if (cached) {
      return cached;
    }
    if (request.mode === "navigate") {
      return cache.match("./index.html");
    }
    throw error;
  }
}

async function cacheFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  if (cached) {
    return cached;
  }

  const response = await fetch(request);
  if (response && response.ok) {
    cache.put(request, response.clone());
  }
  return response;
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET" || !isSameOrigin(event.request.url)) {
    return;
  }

  const requestUrl = new URL(event.request.url);
  const isHtmlNavigation = event.request.mode === "navigate";
  const isVersionedCoreAsset =
    requestUrl.searchParams.get("v") === ASSET_VERSION &&
    ["style", "script"].includes(event.request.destination);

  if (isHtmlNavigation || isVersionedCoreAsset) {
    event.respondWith(networkFirst(event.request));
    return;
  }

  event.respondWith(cacheFirst(event.request));
});
