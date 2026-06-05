import { useEffect, useState } from "react";
import logo from "@/assets/bank-logo.png";

export function LoadingOverlay({ duration = 900 }: { duration?: number }) {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(t);
  }, [duration]);
  if (!visible) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center backdrop-blur-md bg-background/60 animate-in fade-in">
      <div className="flex flex-col items-center gap-4">
        <img src={logo} alt="Central Bank" width={96} height={96} className="animate-pulse drop-shadow-lg" />
        <div className="h-1 w-40 overflow-hidden rounded-full bg-border">
          <div className="h-full w-1/2 bg-primary animate-[loading_1s_ease-in-out_infinite]" style={{ animation: "loading 1.2s ease-in-out infinite" }} />
        </div>
      </div>
      <style>{`@keyframes loading { 0% { transform: translateX(-100%);} 100% { transform: translateX(200%);} }`}</style>
    </div>
  );
}
