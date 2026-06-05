import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { ArrowLeftRight, Receipt, Users, Wallet, CreditCard, ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/_app/payments")({
  head: () => ({ meta: [{ title: "Payments & Transfers — Central Bank" }] }),
  component: PaymentsPage,
});

const tiles = [
  { to: "/pay-bills", icon: Receipt, label: "Pay Bills" },
  { to: "/transfer", icon: ArrowLeftRight, label: "Transfer Funds" },
  { to: "/beneficiaries", icon: Users, label: "Manage Payee" },
  { to: "/pay-bills", icon: Wallet, label: "Manage Billers" },
  { to: "/payments", icon: ArrowUpRight, label: "Standing Instructions" },
  { to: "/payments", icon: CreditCard, label: "Manage FasTag" },
];

function PaymentsPage() {
  return (
    <div>
      <PageHeader title="Payments & Transfers" subtitle="Send money, pay bills, and manage standing instructions" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tiles.map((t) => (
          <Link key={t.label} to={t.to} className="bank-card flex items-center gap-4 p-5 hover:shadow-md">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-primary/10 text-primary"><t.icon className="h-5 w-5" /></span>
            <p className="font-semibold">{t.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
