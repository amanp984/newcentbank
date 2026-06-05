import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { CUSTOMER } from "@/lib/bank-data";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

export const Route = createFileRoute("/_app/settings")({
  head: () => ({ meta: [{ title: "Settings — Central Bank" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  const [open, setOpen] = useState(false);

  const items = [
    { label: "Customer ID", value: CUSTOMER.customerId },
    { label: "CIF", value: CUSTOMER.cif },
    { label: "Account Number", value: CUSTOMER.accountNumber },
    { label: "IFSC", value: CUSTOMER.ifsc },
    { label: "KYC Number", value: CUSTOMER.kyc },
    { label: "Registered Mobile", value: CUSTOMER.mobile },
    { label: "Registered Email", value: CUSTOMER.email },
    { label: "Registered Address", value: CUSTOMER.address },
    { label: "Branch Address", value: CUSTOMER.branch },
    { label: "Account Limit", value: CUSTOMER.accountLimit },
  ];

  return (
    <div>
      <PageHeader title="Profile & Settings" subtitle="Manage your account details and preferences" />
      <div className="bank-card divide-y">
        {items.map((it) => (
          <div key={it.label} className="flex flex-wrap items-center justify-between gap-3 px-6 py-4">
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">{it.label}</p>
              <p className="mt-0.5 font-medium">{it.value}</p>
            </div>
            {it.label === "Account Limit" && (
              <Button variant="outline" onClick={() => setOpen(true)}>Manage Limit</Button>
            )}
          </div>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Limit Upgrade Request</DialogTitle>
            <DialogDescription>
              Please contact your branch for account limit upgrades. For your security, this change cannot be processed online.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter><Button onClick={() => setOpen(false)}>OK</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
