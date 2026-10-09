// This browser-only session supports the dummy UI; it is not production authentication.
const SESSION_KEY = "dukcapil-demo-session";
const SESSION_DURATION = 8 * 60 * 60 * 1000;
// Reset by a full page load so every new visit starts at the login form.
let signedInOnThisPage = false;

export const DEMO_USERNAME = "admin";
export const DEMO_PASSWORD = "Admin123!";

export function hasDemoSession(): boolean {
  if (!signedInOnThisPage) return false;
  try {
    const expiresAt = Number(sessionStorage.getItem(SESSION_KEY));
    return Number.isFinite(expiresAt) && expiresAt > Date.now();
  } catch { return false; }
}

export function startDemoSession() {
  sessionStorage.setItem(SESSION_KEY, String(Date.now() + SESSION_DURATION));
  signedInOnThisPage = true;
}

export function endDemoSession() {
  signedInOnThisPage = false;
  sessionStorage.removeItem(SESSION_KEY);
}
