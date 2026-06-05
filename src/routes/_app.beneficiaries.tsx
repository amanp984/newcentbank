import { createFileRoute, Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/PageHeader";
import { BENEFICIARIES } from "@/lib/bank-data";
import { BadgeCheck, Building2, Eye, UserPlus, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/_app/beneficiaries")({
  head: () => ({ meta: [{ title: "Beneficiaries — Central Bank" }] }),
  component: BeneficiariesPage,
});

function BeneficiariesPage() {
  return (
    <div>
      <PageHeader
        title="Beneficiaries"
        subtitle="Manage your saved payees for quick transfers"
        action={<Button><UserPlus className="mr-1.5 h-4 w-4" /> Add Beneficiary</Button>}
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {BENEFICIARIES.map((b) => (
          <div key={b.id} className="bank-card p-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-primary/10 text-primary font-semibold">
                  {b.name.split(" ").map((p) => p[0]).slice(0, 2).join("")}
                </span>
                <div>
                  <p className="font-semibold">{b.name}</p>
                  <p className="text-xs text-muted-foreground">Added on {b.addedOn}</p>
                </div>
              </div>
              <Badge className="bg-success/10 text-success hover:bg-success/10"><BadgeCheck className="mr-1 h-3.5 w-3.5" />{b.status}</Badge>
            </div>
            <div className="mt-4 space-y-1.5 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Bank</span><span className="font-medium flex items-center gap-1"><Building2 className="h-3.5 w-3.5" />{b.bank}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">UPI ID</span><span className="font-medium font-mono">{b.upi}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Account</span><span className="font-medium font-mono">{b.account}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">IFSC</span><span className="font-medium font-mono">{b.ifsc}</span></div>
            </div>
            <div className="mt-4 flex gap-2">
              <Button variant="outline" className="flex-1"><Eye className="mr-1 h-4 w-4" /> View</Button>
              <Link to="/transfer" search={{ payee: b.id }} className="flex-1">
                <Button className="w-full">Transfer <ArrowRight className="ml-1 h-4 w-4" /></Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
