import { createFileRoute, Link } from "@tanstack/react-router";
import { Zap, Smartphone, Droplet, Flame, CreditCard } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/_app/pay-bills/")({
  head: () => ({ meta: [{ title: "Pay Bills — Central Bank" }] }),
  component: PayBillsHub,
});

const tiles = [
  { to: "/pay-bills/electricity", label: "Electricity Bill", icon: Zap, tone: "bg-amber-50 text-amber-600" },
  { to: "/pay-bills/mobile", label: "Mobile Bill", icon: Smartphone, tone: "bg-sky-50 text-sky-600" },
  { to: "/pay-bills/water", label: "Water Bill", icon: Droplet, tone: "bg-cyan-50 text-cyan-600" },
  { to: "/pay-bills/gas", label: "Gas Bill", icon: Flame, tone: "bg-orange-50 text-orange-600" },
  { to: "/pay-bills/credit-card", label: "Credit Card Bill", icon: CreditCard, tone: "bg-rose-50 text-rose-600" },
];

function PayBillsHub() {
  return (
    <div>
      <PageHeader title="Pay Bills" subtitle="Pay all your bills in one place" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tiles.map((t) => (
          <Link key={t.to} to={t.to} className="bank-card flex items-center gap-4 p-5 hover:shadow-md transition-shadow">
            <span className={`grid h-14 w-14 place-items-center rounded-full ${t.tone}`}><t.icon className="h-6 w-6" /></span>
            <div>
              <p className="font-semibold">{t.label}</p>
              <p className="text-xs text-muted-foreground">Quick & secure payment</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
