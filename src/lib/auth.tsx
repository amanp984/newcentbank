import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";

type AuthState = { isAuthed: boolean; login: () => void; logout: () => void };
const Ctx = createContext<AuthState | null>(null);

const IDLE_MS = 3 * 60 * 1000; // 3 minutes

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthed, setIsAuthed] = useState(false);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Hydrate from sessionStorage on mount. sessionStorage is cleared on
  // beforeunload below, so a refresh always lands here unauthenticated.
  useEffect(() => {
    if (typeof window === "undefined") return;
    setIsAuthed(window.sessionStorage.getItem("cbi_auth") === "1");

    const clear = () => window.sessionStorage.removeItem("cbi_auth");
    window.addEventListener("beforeunload", clear);
    window.addEventListener("pagehide", clear);
    return () => {
      window.removeEventListener("beforeunload", clear);
      window.removeEventListener("pagehide", clear);
    };
  }, []);

  const logout = () => {
    if (typeof window !== "undefined") {
      window.sessionStorage.removeItem("cbi_auth");
    }
    setIsAuthed(false);
    if (idleTimer.current) clearTimeout(idleTimer.current);
    if (typeof window !== "undefined" && window.location.pathname !== "/") {
      window.location.replace("/");
    }
  };

  const login = () => {
    window.sessionStorage.setItem("cbi_auth", "1");
    setIsAuthed(true);
  };

  // Inactivity auto-logout
  useEffect(() => {
    if (!isAuthed || typeof window === "undefined") return;

    const reset = () => {
      if (idleTimer.current) clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => {
        logout();
      }, IDLE_MS);
    };

    const events: (keyof WindowEventMap)[] = [
      "mousemove",
      "mousedown",
      "keydown",
      "touchstart",
      "scroll",
      "click",
    ];
    events.forEach((e) => window.addEventListener(e, reset, { passive: true }));
    reset();

    return () => {
      events.forEach((e) => window.removeEventListener(e, reset));
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, [isAuthed]);

  return <Ctx.Provider value={{ isAuthed, login, logout }}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}
