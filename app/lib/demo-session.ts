// This browser-only session supports the dummy UI; it is not production authentication.
const SESSION_KEY = "dukcapil-demo-session";
const SESSION_DURATION = 8 * 60 * 60 * 1000;
// A new page load starts in public mode; signing in unlocks institution services.
export type DemoRole = "admin" | "user";
export type DemoAccount = { username: string; name: string; role: DemoRole };
let signedInAccount: DemoAccount | null = null;

export const DEMO_USERNAME = "admin";
export const DEMO_PASSWORD = "Admin123!";
export const DEMO_ACCOUNTS = [
  { username: DEMO_USERNAME, password: DEMO_PASSWORD, name: "Admin Dukcapil", role: "admin" as const },
  { username: "user", password: "User123!", name: "User Lembaga", role: "user" as const },
];

export function validateDemoCredentials(username: string, password: string): DemoAccount | null {
  const account = DEMO_ACCOUNTS.find(item => item.username === username.trim() && item.password === password);
  if (!account) return null;
  return { username: account.username, name: account.name, role: account.role };
}

export function hasDemoSession(): boolean {
  if (!signedInAccount) return false;
  try {
    const expiresAt = Number(sessionStorage.getItem(SESSION_KEY));
    return Number.isFinite(expiresAt) && expiresAt > Date.now();
  } catch { return false; }
}

export function getDemoAccount(): DemoAccount | null {
  return hasDemoSession() ? signedInAccount : null;
}

export function startDemoSession(account: DemoAccount) {
  sessionStorage.setItem(SESSION_KEY, String(Date.now() + SESSION_DURATION));
  signedInAccount = account;
}

export function endDemoSession() {
  signedInAccount = null;
  sessionStorage.removeItem(SESSION_KEY);
}
