const KEY = "portfolio-started";

// Plays only on a first visit to the home page, so deep links are never delayed.
export function shouldShowGate(pathname) {
  if (pathname !== "/" || matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  try {
    return !sessionStorage.getItem(KEY);
  } catch {
    return false;
  }
}

export function rememberGate() {
  try {
    sessionStorage.setItem(KEY, "1");
  } catch {
    // Storage can be blocked; the intro just plays again next time.
  }
}
