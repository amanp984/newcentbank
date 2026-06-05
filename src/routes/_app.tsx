import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { AppSidebar } from "@/components/AppSidebar";
import { AppHeader } from "@/components/AppHeader";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";

export const Route = createFileRoute("/_app")({
  beforeLoad: () => {
    if (typeof window !== "undefined") {
      const ok = window.sessionStorage.getItem("cbi_auth") === "1";
      if (!ok) throw redirect({ to: "/" });
    }
  },
  component: AppLayout,
});

function AppLayout() {
  const path = useRouterState({ select: (r) => r.location.pathname });
  const [loadingKey, setLoadingKey] = useState(path);
  useEffect(() => { setLoadingKey(path); }, [path]);

  return (
    <div className="flex min-h-screen w-full bg-background">
      <AppSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <AppHeader />
        <main className="flex-1 p-6">
          <LoadingOverlay key={loadingKey} duration={800} />
          <Outlet />
        </main>
      </div>
    </div>
  );
}
