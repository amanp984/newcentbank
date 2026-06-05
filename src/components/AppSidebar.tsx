import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutGrid, Wallet, ArrowLeftRight, PiggyBank, Banknote, TrendingUp, Shield, PieChart,
  FileText, Landmark, Users, Receipt, Smartphone, CreditCard, Settings, HelpCircle, LogOut, ChevronLeft, ChevronRight,
} from "lucide-react";
import logo from "@/assets/bank-logo.png";
import { useAuth } from "@/lib/auth";
import { useState } from "react";
import { cn } from "@/lib/utils";

const items = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutGrid },
  { to: "/accounts", label: "Accounts", icon: Wallet },
  { to: "/payments", label: "Payments & Transfers", icon: ArrowLeftRight },
  { to: "/deposits", label: "Deposits", icon: PiggyBank },
  { to: "/loans", label: "Loans", icon: Banknote },
  { to: "/investments", label: "Investments", icon: TrendingUp },
  { to: "/insurance", label: "Insurance", icon: Shield },
  { to: "/pfm", label: "PFM", icon: PieChart },
  { to: "/asba-ipo", label: "ASBA / IPO", icon: FileText },
  { to: "/govt-schemes", label: "Government Schemes", icon: Landmark },
  { to: "/beneficiaries", label: "Beneficiaries", icon: Users },
  { to: "/pay-bills", label: "Pay Bills", icon: Receipt },
  { to: "/mobile-recharge", label: "Mobile Recharge", icon: Smartphone },
  { to: "/cards", label: "Cards", icon: CreditCard },
  { to: "/settings", label: "Settings", icon: Settings },
  { to: "/support", label: "Support", icon: HelpCircle },
] as const;

export function AppSidebar() {
  const path = useRouterState({ select: (r) => r.location.pathname });
  const [collapsed, setCollapsed] = useState(false);
  const { logout } = useAuth();

  return (
    <aside
      className={cn(
        "sticky top-0 z-30 flex h-screen flex-col bg-sidebar text-sidebar-foreground transition-all",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center gap-3 border-b border-white/10 px-4 py-4">
        <img src={logo} alt="Central Bank" width={36} height={36} className="shrink-0 rounded-md bg-white p-1" />
        {!collapsed && (
          <div className="leading-tight">
            <p className="text-sm font-semibold">Central Bank</p>
            <p className="text-[10px] uppercase tracking-wider opacity-75">Internet Banking</p>
          </div>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto px-2 py-3">
        <ul className="space-y-0.5">
          {items.map((it) => {
            const active = path === it.to || path.startsWith(it.to + "/");
            const Icon = it.icon;
            return (
              <li key={it.to}>
                <Link
                  to={it.to}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors",
                    active ? "bg-white/15 font-semibold" : "hover:bg-white/10 opacity-90"
                  )}
                >
                  <Icon className="h-[18px] w-[18px] shrink-0" />
                  {!collapsed && <span className="truncate">{it.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-white/10 p-2">
        <button
          onClick={() => {
            logout();
            window.location.href = "/";
          }}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm hover:bg-white/10"
        >
          <LogOut className="h-[18px] w-[18px]" />
          {!collapsed && <span>Logout</span>}
        </button>
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="mt-1 flex w-full items-center justify-center gap-2 rounded-md px-3 py-2 text-xs opacity-75 hover:bg-white/10"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : (<><ChevronLeft className="h-4 w-4" /> Collapse</>)}
        </button>
      </div>
    </aside>
  );
}
