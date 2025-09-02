import { AuthInfo } from "../types";

// PUBLIC_INTERFACE
export function getAuth(): AuthInfo {
  /** Retrieve mock auth state. Replace with real backend auth later. */
  const g: any = typeof globalThis !== "undefined" ? (globalThis as any) : undefined;
  const ls = g?.localStorage;
  if (!ls) return { isLoggedIn: false };
  const raw = ls.getItem("notes-app-auth");
  if (!raw) return { isLoggedIn: false };
  try {
    return JSON.parse(raw) as AuthInfo;
  } catch {
    return { isLoggedIn: false };
  }
}

// PUBLIC_INTERFACE
export function loginMock(userName: string): AuthInfo {
  /** Mock login - stores session locally for demo. */
  const g: any = typeof globalThis !== "undefined" ? (globalThis as any) : undefined;
  const ls = g?.localStorage;
  const auth: AuthInfo = { isLoggedIn: true, userName };
  if (ls) {
    ls.setItem("notes-app-auth", JSON.stringify(auth));
  }
  return auth;
}

// PUBLIC_INTERFACE
export function logoutMock(): AuthInfo {
  /** Mock logout - clears local session. */
  const g: any = typeof globalThis !== "undefined" ? (globalThis as any) : undefined;
  const ls = g?.localStorage;
  if (ls) {
    ls.removeItem("notes-app-auth");
  }
  return { isLoggedIn: false };
}
