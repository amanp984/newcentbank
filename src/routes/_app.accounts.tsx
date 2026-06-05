import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Construction } from "lucide-react";
import { Button } from "@/components/ui/button";

export function makeComingSoon(title: string, description: string) {
  return function Page() {
    return (
      <div>
        <PageHeader title={title} subtitle={description} />
        <div className="bank-card flex flex-col items-center justify-center gap-4 p-12 text-center">
          <div className="grid h-16 w-16 place-items-center rounded-full bg-amber-50 text-amber-600"><Construction className="h-7 w-7" /></div>
          <div>
            <p className="text-base font-semibold">This service is being upgraded</p>
            <p className="mt-1 max-w-md text-sm text-muted-foreground">We're working to bring you the best experience. Please check back soon or contact your branch for assistance.</p>
          </div>
          <Link to="/dashboard"><Button variant="outline">Back to Dashboard</Button></Link>
        </div>
      </div>
    );
  };
}

export const Route = createFileRoute("/_app/accounts")({
  head: () => ({ meta: [{ title: "Accounts — Central Bank" }] }),
  component: AccountsPage,
});

import { CUSTOMER } from "@/lib/bank-data";
import { Badge } from "@/components/ui/badge";

function AccountsPage() {
  return (
    <div>
      <PageHeader title="My Accounts" subtitle="View and manage your accounts" />
      <div className="bank-card p-6">
        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Current Account</p>
            <p className="mt-1 text-lg font-semibold">{CUSTOMER.accountNumber}</p>
            <p className="text-sm text-muted-foreground">IFSC: {CUSTOMER.ifsc}</p>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Available Balance</p>
            <p className="font-mono text-2xl font-bold">₹ 1,48,230.75</p>
            <Badge className="mt-1 bg-success/10 text-success hover:bg-success/10">● Active</Badge>
          </div>
        </div>
        <div className="grid gap-4 pt-4 sm:grid-cols-3">
          <Stat label="Account Type" value="Current — Primary" />
          <Stat label="Branch" value="Mumbai Andheri East" />
          <Stat label="Account Holder" value={CUSTOMER.name} />
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border bg-muted/40 p-4">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-1 font-medium">{value}</p>
    </div>
  );
}
