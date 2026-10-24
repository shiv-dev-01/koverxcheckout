/**
 * Post Affiliate Pro (PAP) — click + sale tracking for Koverx checkout.
 * Matches official PAP JS snippets:
 *   https://koverx.postaffiliatepro.com/scripts/74ehzmj
 */

export const PAP_SCRIPT_ID = "pap_x2s6df8d";
export const PAP_SCRIPT_SRC =
  "https://koverx.postaffiliatepro.com/scripts/74ehzmj";
export const PAP_ACCOUNT_ID = "default1";

const AID_SESSION_KEY = "koverx_pap_a_aid";
const BID_SESSION_KEY = "koverx_pap_a_bid";
const SALE_DONE_PREFIX = "koverx_pap_sale_";
const TRACKER_WAIT_MS = 20000;
const TRACKER_POLL_MS = 50;

function papDebugEnabled() {
  try {
    if (typeof window === "undefined") return false;
    const params = new URLSearchParams(window.location.search);
    if (params.get("pap_debug") === "1") return true;
    return sessionStorage.getItem("PAP_DEBUG") === "1";
  } catch {
    return false;
  }
}

function papLog(...args) {
  // Always log in debug mode; also use console.warn for real failures
  if (papDebugEnabled()) {
    // eslint-disable-next-line no-console
    console.info("[PAP]", ...args);
  }
}

function papWarn(...args) {
  // eslint-disable-next-line no-console
  console.warn("[PAP]", ...args);
}

function getTracker() {
  if (typeof window === "undefined") return undefined;
  return window.PostAffTracker;
}

function persistAffiliateParams(aAid, aBid) {
  try {
    if (aAid) sessionStorage.setItem(AID_SESSION_KEY, aAid);
    if (aBid) sessionStorage.setItem(BID_SESSION_KEY, aBid);
  } catch {
    /* ignore */
  }
}

export function getPersistedAffiliateAid() {
  try {
    return sessionStorage.getItem(AID_SESSION_KEY) || "";
  } catch {
    return "";
  }
}

export function getPersistedAffiliateBid() {
  try {
    return sessionStorage.getItem(BID_SESSION_KEY) || "";
  } catch {
    return "";
  }
}

/**
 * Support #a_aid=REF, #a_bid=…, and shorthand #REF → promote into query string
 * via history.replaceState; persist a_aid/a_bid in sessionStorage for sale fallback.
 */
export function preparePapAffiliateInBrowserUrl() {
  if (typeof window === "undefined") return;

  try {
    const url = new URL(window.location.href);
    const params = url.searchParams;
    const hash = url.hash || "";
    let changed = false;

    const qAid = params.get("a_aid")?.trim();
    const qBid = params.get("a_bid")?.trim();
    if (qAid || qBid) {
      persistAffiliateParams(qAid, qBid);
      papLog("persisted from query", { a_aid: qAid, a_bid: qBid });
    }

    if (!hash || hash === "#") return;

    const fragment = hash.startsWith("#") ? hash.slice(1) : hash;
    let hashAid = "";
    let hashBid = "";

    if (fragment.includes("=")) {
      const hashParams = new URLSearchParams(fragment);
      hashAid = hashParams.get("a_aid")?.trim() || "";
      hashBid = hashParams.get("a_bid")?.trim() || "";
    } else {
      const shorthand = fragment.trim();
      if (
        shorthand &&
        !shorthand.includes("/") &&
        !shorthand.includes("?") &&
        /^[A-Za-z0-9_-]+$/.test(shorthand)
      ) {
        hashAid = shorthand;
      }
    }

    if (hashAid && !params.get("a_aid")) {
      params.set("a_aid", hashAid);
      changed = true;
    }
    if (hashBid && !params.get("a_bid")) {
      params.set("a_bid", hashBid);
      changed = true;
    }

    if (hashAid || hashBid) {
      persistAffiliateParams(
        hashAid || params.get("a_aid")?.trim(),
        hashBid || params.get("a_bid")?.trim()
      );
    }

    if (changed) {
      const next =
        url.pathname +
        (params.toString() ? `?${params.toString()}` : "") +
        hash;
      // Preserve React Router history.state (orderId, etc.) — never wipe with {}
      window.history.replaceState(window.history.state, "", next);
      papLog("promoted hash affiliate params to query", next);
    }
  } catch (err) {
    papWarn("preparePapAffiliateInBrowserUrl error", err);
  }
}

/**
 * Ensure the official PAP script is present.
 * Never use async — matches PAP docs (blocking load so PostAffTracker is ready).
 */
export function loadPostAffScript() {
  return new Promise((resolve, reject) => {
    if (typeof document === "undefined") {
      reject(new Error("No document"));
      return;
    }

    if (getTracker()?.track) {
      resolve(getTracker());
      return;
    }

    const existing = document.getElementById(PAP_SCRIPT_ID);
    if (existing) {
      waitForPostAffTracker().then(resolve).catch(reject);
      return;
    }

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.id = PAP_SCRIPT_ID;
    script.src = PAP_SCRIPT_SRC;
    // Do NOT set async — official PAP snippet is synchronous
    script.onload = () => {
      waitForPostAffTracker().then(resolve).catch(reject);
    };
    script.onerror = () => {
      papWarn("Failed to load PAP script:", PAP_SCRIPT_SRC);
      reject(new Error("Failed to load PAP script"));
    };
    (document.head || document.body || document.documentElement).appendChild(
      script
    );
    papLog("injected PAP script", PAP_SCRIPT_SRC);
  });
}

export function waitForPostAffTracker(timeoutMs = TRACKER_WAIT_MS) {
  return new Promise((resolve, reject) => {
    const existing = getTracker();
    if (existing?.track) {
      resolve(existing);
      return;
    }

    const started = Date.now();
    const timer = setInterval(() => {
      const pap = getTracker();
      if (pap?.track) {
        clearInterval(timer);
        resolve(pap);
        return;
      }
      if (Date.now() - started >= timeoutMs) {
        clearInterval(timer);
        papWarn(
          "Timed out waiting for window.PostAffTracker — check script URL / ad blockers"
        );
        reject(new Error("Timed out waiting for PostAffTracker"));
      }
    }, TRACKER_POLL_MS);
  });
}

function applyCookieDomain(pap) {
  try {
    if (typeof pap.setCookieDomain !== "function") return;
    const host = window.location.hostname || "";
    if (host === "vigmd.com" || host.endsWith(".vigmd.com")) {
      pap.setCookieDomain(".vigmd.com");
    } else if (host === "koverx.com" || host.endsWith(".koverx.com")) {
      pap.setCookieDomain(".koverx.com");
    } else if (host === "koverx.co" || host.endsWith(".koverx.co")) {
      pap.setCookieDomain(".koverx.co");
    }
  } catch {
    /* ignore */
  }
}

/**
 * Official click tracking:
 *   PostAffTracker.setAccountId('default1');
 *   PostAffTracker.track();
 *
 * Deferred so SPA navigations don't call track() while the document/script
 * node is mid-update (avoids parentNode null errors from PAP).
 */
export async function trackPostAffiliateClick() {
  try {
    preparePapAffiliateInBrowserUrl();

    // Skip re-click on thank-you — sale tracking runs there instead
    const path = window.location.pathname || "";
    if (path.includes("thankyou-page") || path.includes("SuccessPage")) {
      papLog("skip click track on confirmation page");
      return;
    }

    const pap = await loadPostAffScript();
    if (!pap?.track) {
      papWarn("PostAffTracker.track missing after script load");
      return;
    }

    await new Promise((r) => setTimeout(r, 0));
    if (!document.body) {
      papWarn("document.body missing — skip click track");
      return;
    }

    applyCookieDomain(pap);
    pap.setAccountId(PAP_ACCOUNT_ID);
    try {
      pap.track();
    } catch (err) {
      papWarn("PostAffTracker.track() threw", err);
      return;
    }

    // eslint-disable-next-line no-console
    console.info("[PAP] click tracked", window.location.href);
  } catch (err) {
    papWarn("trackPostAffiliateClick error", err);
  }
}

const THANKYOU_ORDER_KEY = "koverx_thankyou_order";

/** Persist order details so thank-you can register PAP sale even if router state is lost */
export function saveThankYouOrderSnapshot(snapshot) {
  try {
    sessionStorage.setItem(THANKYOU_ORDER_KEY, JSON.stringify(snapshot));
  } catch {
    /* ignore */
  }
}

export function loadThankYouOrderSnapshot() {
  try {
    const raw = sessionStorage.getItem(THANKYOU_ORDER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearThankYouOrderSnapshot() {
  try {
    sessionStorage.removeItem(THANKYOU_ORDER_KEY);
  } catch {
    /* ignore */
  }
}

function saleDoneKey(orderId) {
  return `${SALE_DONE_PREFIX}${orderId}`;
}

function markSaleDone(orderId) {
  try {
    sessionStorage.setItem(saleDoneKey(orderId), "1");
  } catch {
    /* ignore */
  }
}

function isSaleDone(orderId) {
  try {
    return sessionStorage.getItem(saleDoneKey(orderId)) === "1";
  } catch {
    return false;
  }
}

/**
 * PAP General solution (official thank-you / order confirmation snippet):
 *
 * <script id="pap_x2s6df8d" src="https://koverx.postaffiliatepro.com/scripts/74ehzmj"></script>
 * <script>
 *   PostAffTracker.setAccountId('default1');
 *   var sale = PostAffTracker.createSale();
 *   sale.setTotalCost('...');
 *   sale.setOrderID('...');
 *   sale.setProductID('...');
 *   PostAffTracker.register();
 * </script>
 *
 * Injects that exact pattern with real order values.
 */
export function injectOfficialPapSaleSnippet(opts) {
  if (typeof document === "undefined") return false;

  const orderId = String(opts?.orderId ?? "").trim();
  const totalCost = String(opts?.totalCost ?? "0").trim() || "0";
  const productId = String(opts?.productId ?? "").trim() || orderId;

  if (!orderId) {
    papWarn("official sale snippet skipped — missing orderId");
    return false;
  }
  if (isSaleDone(orderId)) {
    papLog("sale already registered for", orderId);
    return true;
  }

  const mount = document.body || document.head;
  if (!mount) {
    papWarn("official sale snippet skipped — no document body/head");
    return false;
  }

  try {
    // 1) Tracker script (same id/src as PAP docs) — keep one copy in the DOM
    let tracker = document.getElementById(PAP_SCRIPT_ID);
    if (!tracker) {
      tracker = document.createElement("script");
      tracker.type = "text/javascript";
      tracker.id = PAP_SCRIPT_ID;
      tracker.src = PAP_SCRIPT_SRC;
      mount.appendChild(tracker);
    }

    const runSale = () => {
      if (isSaleDone(orderId)) return;

      // Remove prior sale inline for this order (Strict Mode remounts)
      document.querySelectorAll("script[data-pap-sale-inline]").forEach((n) => {
        if (n.getAttribute("data-pap-sale-inline") === orderId) n.remove();
      });

      // 2) Inline sale script — identical to PAP General solution
      const inline = document.createElement("script");
      inline.type = "text/javascript";
      inline.setAttribute("data-pap-sale-inline", orderId);
      inline.text = `
PostAffTracker.setAccountId(${JSON.stringify(PAP_ACCOUNT_ID)});
var sale = PostAffTracker.createSale();
sale.setTotalCost(${JSON.stringify(totalCost)});
sale.setOrderID(${JSON.stringify(orderId)});
sale.setProductID(${JSON.stringify(productId)});
PostAffTracker.register();
`.trim();
      mount.appendChild(inline);
      markSaleDone(orderId);
      // eslint-disable-next-line no-console
      console.info("[PAP] General solution sale snippet fired", {
        orderId,
        totalCost,
        productId,
      });
    };

    if (getTracker()?.createSale) {
      runSale();
      return true;
    }

    // Wait for tracker script load, then fire sale inline
    const onLoad = () => {
      waitForPostAffTracker(8000)
        .then(() => runSale())
        .catch((err) => papWarn("sale snippet wait failed", err));
    };
    tracker.addEventListener("load", onLoad, { once: true });
    // If load already fired, poll
    waitForPostAffTracker(8000)
      .then(() => {
        tracker.removeEventListener("load", onLoad);
        runSale();
      })
      .catch(() => {
        /* onLoad may still succeed */
      });
    return true;
  } catch (err) {
    papWarn("injectOfficialPapSaleSnippet failed", err);
    return false;
  }
}

/**
 * Prefer PAP General solution (official thank-you snippet).
 * Also used right after order create when values are available.
 */
export function registerPostAffiliateSale(opts) {
  return injectOfficialPapSaleSnippet(opts);
}

/**
 * Async wrapper — load tracker if needed, then fire official sale snippet.
 */
export async function registerPostAffiliateSaleAsync(opts) {
  try {
    await loadPostAffScript().catch(() => undefined);
    await waitForPostAffTracker(8000).catch(() => undefined);
    await new Promise((r) => setTimeout(r, 100));
    return injectOfficialPapSaleSnippet(opts);
  } catch (err) {
    papWarn("registerPostAffiliateSaleAsync error", err);
    return injectOfficialPapSaleSnippet(opts);
  }
}
