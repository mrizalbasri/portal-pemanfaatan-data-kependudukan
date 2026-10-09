// This browser-only session supports the dummy UI; it is not production authentication.
const SESSION_KEY = "dukcapil-demo-session";
const SESSION_DURATION = 8 * 60 * 60 * 1000;

export const DEMO_USERNAME = "admin";
export const DEMO_PASSWORD = "Admin123!";

export function hasDemoSession(): boolean {
  try {
    const expiresAt = Number(sessionStorage.getItem(SESSION_KEY));
    return Number.isFinite(expiresAt) && expiresAt > Date.now();
  } catch { return false; }
}

export function startDemoSession() {
  sessionStorage.setItem(SESSION_KEY, String(Date.now() + SESSION_DURATION));
}

export function endDemoSession() {
  sessionStorage.removeItem(SESSION_KEY);
}
