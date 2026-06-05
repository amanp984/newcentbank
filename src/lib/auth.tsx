import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type AuthState = { isAuthed: boolean; login: () => void; logout: () => void };
const Ctx = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthed, setIsAuthed] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsAuthed(window.sessionStorage.getItem("cbi_auth") === "1");
    }
  }, []);
  const login = () => {
    window.sessionStorage.setItem("cbi_auth", "1");
    setIsAuthed(true);
  };
  const logout = () => {
    window.sessionStorage.removeItem("cbi_auth");
    setIsAuthed(false);
  };
  return <Ctx.Provider value={{ isAuthed, login, logout }}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}
