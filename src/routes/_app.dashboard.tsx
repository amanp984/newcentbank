import { createFileRoute, Link } from "@tanstack/react-router";
import { Eye, EyeOff, FileText, CreditCard as CreditCardIcon, Settings as SettingsIcon, ArrowUpRight, ArrowDownLeft, ChevronRight, Receipt, ArrowLeftRight, Users, Wallet, Smartphone, Plane, Building2, ShoppingBag, Gift, MoreHorizontal, Banknote, PiggyBank, Target, Shield, TrendingUp, Calculator, Sparkles } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CUSTOMER, TRANSACTIONS, computeBalance, formatINR } from "@/lib/bank-data";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — Central Bank" }] }),
  component: Dashboard,
});

function Dashboard() {
  const [showBal, setShowBal] = useState(false);
  const balance = formatINR(computeBalance());

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Welcome, {CUSTOMER.name.split(" ")[0]}</h1>
        <p className="text-sm text-muted-foreground">Have a secure banking session · CIF {CUSTOMER.cif}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Account Overview */}
        <section className="bank-card p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Account Overview</h2>
            <button onClick={() => setShowBal(v => !v)} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
              {showBal ? <><EyeOff className="h-3.5 w-3.5" /> Hide</> : <><Eye className="h-3.5 w-3.5" /> Show</>}
            </button>
          </div>
          <div className="gradient-account rounded-xl p-5 text-white shadow-md">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs opacity-80">My Current A/C</p>
                <p className="mt-1 text-base font-medium tracking-wider">{CUSTOMER.accountNumber}</p>
              </div>
              <Badge className="bg-amber-400 text-amber-900 hover:bg-amber-400">PRIMARY</Badge>
            </div>
            <div className="mt-5">
              <p className="text-xs opacity-80">Available Balance</p>
              <p className="mt-1 font-mono text-2xl font-bold">{showBal ? `₹ ${balance}` : "₹ ••••••••"}</p>
            </div>
            <div className="mt-4">
              <Badge variant="secondary" className="bg-white/15 text-white hover:bg-white/20">● ACTIVE</Badge>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            <Link to="/transactions" className="rounded-lg border bg-card px-2 py-3 text-center text-xs font-medium hover:bg-accent">
              <FileText className="mx-auto mb-1 h-5 w-5 text-primary" /> View Statement
            </Link>
            <Link to="/cards" className="rounded-lg border bg-card px-2 py-3 text-center text-xs font-medium hover:bg-accent">
              <CreditCardIcon className="mx-auto mb-1 h-5 w-5 text-primary" /> Manage Debit Card
            </Link>
            <Link to="/settings" className="rounded-lg border bg-card px-2 py-3 text-center text-xs font-medium hover:bg-accent">
              <SettingsIcon className="mx-auto mb-1 h-5 w-5 text-primary" /> Apply Services
            </Link>
          </div>
        </section>

        {/* Payments */}
        <section className="bank-card p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Payments</h2>
            <Link to="/payments" className="flex items-center gap-1 text-xs font-semibold text-primary">Go to Payments <ChevronRight className="h-3.5 w-3.5" /></Link>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <Tile to="/pay-bills" icon={Receipt} label="Pay Bills" />
            <Tile to="/transfer" icon={ArrowLeftRight} label="Transfer Funds" />
            <Tile to="/beneficiaries" icon={Users} label="Manage Payee" />
            <Tile to="/pay-bills" icon={Wallet} label="Manage Billers" />
            <Tile to="/payments" icon={ArrowUpRight} label="Manage SI" />
            <Tile to="/payments" icon={CreditCardIcon} label="Manage FasTag" />
          </div>
        </section>

        {/* Discover More */}
        <section className="bank-card p-5">
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Discover More</h2>
          <div className="grid grid-cols-2 gap-3">
            <DiscoverTile to="/apply-loan" icon={Banknote} title="Apply Loan" subtitle="Get best interest rates" tone="pink" />
            <DiscoverTile to="/open-fd" icon={PiggyBank} title="Open Fixed Deposit" subtitle="Create Fixed deposits" tone="cyan" />
            <DiscoverTile to="/pfm" icon={Target} title="Financial Goals" subtitle="Manage your personal goals" tone="amber" />
            <DiscoverTile to="/insurance" icon={Shield} title="Get Insurance" subtitle="Provide financial cover" tone="rose" />
          </div>
        </section>
      </div>

      {/* Recent Transactions */}
      <div className="grid gap-6 lg:grid-cols-3">
        <section className="bank-card overflow-hidden p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Recent Transactions</h2>
            <Link to="/transactions" className="flex items-center gap-1 text-xs font-semibold text-primary">View All <ChevronRight className="h-3.5 w-3.5" /></Link>
          </div>
          {TRANSACTIONS.length === 0 ? (
            <EmptyTxns />
          ) : (
            <div className="overflow-hidden rounded-lg border">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr className="text-left text-xs font-semibold text-muted-foreground">
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Description</th>
                    <th className="px-4 py-3">Reference</th>
                    <th className="px-4 py-3 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {TRANSACTIONS.slice(0, 5).map((t) => (
                    <tr key={t.id} className="border-t hover:bg-accent/40">
                      <td className="px-4 py-3 text-muted-foreground">{t.date}</td>
                      <td className="px-4 py-3 font-medium">
                        <span className="inline-flex items-center gap-2">
                          {t.type === "credit"
                            ? <ArrowDownLeft className="h-4 w-4 text-success" />
                            : <ArrowUpRight className="h-4 w-4 text-debit" />}
                          {t.description}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{t.reference}</td>
                      <td className={`px-4 py-3 text-right font-semibold ${t.type === "credit" ? "text-success" : "text-debit"}`}>
                        {t.type === "credit" ? "+" : "-"} ₹{t.amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Wealth */}
        <section className="bank-card p-5">
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Wealth Planning</h2>
          <div className="grid grid-cols-3 gap-3">
            <Tile to="/investments" icon={TrendingUp} label="Mutual Funds" />
            <Tile to="/govt-schemes" icon={Calculator} label="Govt. Schemes" />
            <Tile to="/asba-ipo" icon={Sparkles} label="Apply for IPO" />
          </div>
        </section>
      </div>

      {/* Offers */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Offers for you</h2>
          <Link to="/dashboard" className="text-xs font-semibold text-primary">View All Offers</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <Offer color="from-sky-500 to-blue-700" title="Get 10 points" subtitle="per debit card purchase of ₹2000 or more" />
          <Offer color="from-rose-600 to-red-800" title="Earn 100 points" subtitle="for spending over ₹30,000 monthly with debit card" />
          <Offer color="from-indigo-700 to-blue-900" title="Receive 500 points" subtitle="for a new retail loan (up to 5 bills per month)" />
        </div>
      </section>

      {/* Shopping */}
      <section className="bank-card p-5">
        <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Shopping</h2>
        <div className="grid grid-cols-3 gap-3 md:grid-cols-6">
          <Tile to="/dashboard" icon={Plane} label="Book Flights" />
          <Tile to="/dashboard" icon={Building2} label="Book Hotels" />
          <Tile to="/dashboard" icon={ShoppingBag} label="Shop & Earn" />
          <Tile to="/dashboard" icon={Smartphone} label="Entertainment" />
          <Tile to="/dashboard" icon={Gift} label="Get e-Vouchers" />
          <Tile to="/dashboard" icon={MoreHorizontal} label="Explore More" />
        </div>
      </section>
    </div>
  );
}

function Tile({ to, icon: Icon, label }: { to: string; icon: any; label: string }) {
  return (
    <Link to={to} className="group flex flex-col items-center gap-2 rounded-lg p-3 text-center hover:bg-accent">
      <span className="grid h-12 w-12 place-items-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
        <Icon className="h-5 w-5" />
      </span>
      <span className="text-[11px] font-medium leading-tight">{label}</span>
    </Link>
  );
}

function DiscoverTile({ to, icon: Icon, title, subtitle, tone }: { to: string; icon: any; title: string; subtitle: string; tone: "pink" | "cyan" | "amber" | "rose" }) {
  const tones = {
    pink: "bg-pink-50 text-pink-600",
    cyan: "bg-cyan-50 text-cyan-600",
    amber: "bg-amber-50 text-amber-700",
    rose: "bg-rose-50 text-rose-600",
  } as const;
  return (
    <Link to={to} className="flex items-center gap-3 rounded-lg border bg-card p-3 hover:bg-accent">
      <span className={`grid h-10 w-10 place-items-center rounded-full ${tones[tone]}`}><Icon className="h-5 w-5" /></span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold">{title}</p>
        <p className="truncate text-[11px] text-muted-foreground">{subtitle}</p>
      </div>
      <ChevronRight className="h-4 w-4 text-primary" />
    </Link>
  );
}

function Offer({ color, title, subtitle }: { color: string; title: string; subtitle: string }) {
  return (
    <div className={`rounded-xl bg-gradient-to-br ${color} p-5 text-white shadow-md`}>
      <p className="text-xl font-bold">{title}</p>
      <p className="mt-1 text-sm opacity-90">{subtitle}</p>
    </div>
  );
}

function EmptyTxns() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
      <div className="grid h-14 w-14 place-items-center rounded-full bg-muted"><FileText className="h-6 w-6 text-muted-foreground" /></div>
      <p className="font-medium">No Recent Transactions Available</p>
      <p className="text-sm text-muted-foreground">Your transactions will appear here once you make one.</p>
    </div>
  );
}
