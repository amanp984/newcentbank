import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageHeader } from "@/components/PageHeader";
import { BENEFICIARIES } from "@/lib/bank-data";
import { OtpDialog } from "@/components/OtpDialog";
import { RestrictionDialog } from "@/components/RestrictionDialog";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/_app/transfer")({
  validateSearch: (s: Record<string, unknown>) => ({ payee: typeof s.payee === "string" ? s.payee : undefined }),
  head: () => ({ meta: [{ title: "Transfer Funds — Central Bank" }] }),
  component: TransferPage,
});

function TransferPage() {
  const { payee } = Route.useSearch();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selected, setSelected] = useState(payee ?? BENEFICIARIES[0]?.id ?? "");
  const [amount, setAmount] = useState("");
  const [remarks, setRemarks] = useState("");
  const [otpOpen, setOtpOpen] = useState(false);
  const [restriction, setRestriction] = useState(false);
  const navigate = useNavigate();

  const ben = BENEFICIARIES.find((b) => b.id === selected);

  const goNext = () => {
    if (step === 1 && !selected) return toast.error("Select a beneficiary");
    if (step === 2) {
      const parsed = z.coerce.number().positive().max(500000).safeParse(amount);
      if (!parsed.success) return toast.error("Enter a valid amount (max ₹5,00,000)");
    }
    if (step === 3) { setOtpOpen(true); return; }
    setStep((s) => (s + 1) as 1 | 2 | 3);
  };

  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader title="Transfer Funds" subtitle="Securely send money to your beneficiaries" />

      <ol className="mb-6 flex items-center gap-2">
        {["Select Payee", "Enter Amount", "Review & Proceed"].map((label, i) => {
          const n = (i + 1) as 1 | 2 | 3;
          const active = step === n; const done = step > n;
          return (
            <li key={label} className="flex flex-1 items-center gap-2">
              <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold ${done ? "bg-success text-success-foreground" : active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                {done ? <CheckCircle2 className="h-4 w-4" /> : n}
              </span>
              <span className={`text-xs font-medium ${active ? "text-foreground" : "text-muted-foreground"}`}>{label}</span>
              {i < 2 && <span className="h-px flex-1 bg-border" />}
            </li>
          );
        })}
      </ol>

      <div className="bank-card p-6">
        {step === 1 && (
          <div className="space-y-4">
            <Label>Select Beneficiary</Label>
            <Select value={selected} onValueChange={setSelected}>
              <SelectTrigger><SelectValue placeholder="Choose a payee" /></SelectTrigger>
              <SelectContent>
                {BENEFICIARIES.map((b) => <SelectItem key={b.id} value={b.id}>{b.name} — {b.bank}</SelectItem>)}
              </SelectContent>
            </Select>
            {ben && (
              <div className="rounded-lg border bg-muted/40 p-4 text-sm">
                <p className="font-semibold">{ben.name}</p>
                <p className="text-muted-foreground">{ben.bank} · {ben.account}</p>
                <p className="text-muted-foreground">UPI: {ben.upi}</p>
              </div>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="amt">Amount (₹)</Label>
              <Input id="amt" type="number" placeholder="0.00" value={amount} onChange={(e) => setAmount(e.target.value)} className="mt-1.5 h-12 text-lg" />
              <p className="mt-1 text-xs text-muted-foreground">Per-transaction limit: ₹5,00,000</p>
            </div>
            <div>
              <Label htmlFor="rem">Remarks (optional)</Label>
              <Input id="rem" placeholder="E.g., Rent for June" value={remarks} onChange={(e) => setRemarks(e.target.value)} className="mt-1.5" maxLength={100} />
            </div>
          </div>
        )}

        {step === 3 && ben && (
          <div className="space-y-3 text-sm">
            <h3 className="text-base font-semibold">Confirm Transfer</h3>
            <Row label="Payee" value={ben.name} />
            <Row label="Bank" value={ben.bank} />
            <Row label="Account" value={ben.account} />
            <Row label="UPI" value={ben.upi} />
            <Row label="Amount" value={`₹ ${Number(amount).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`} />
            <Row label="Remarks" value={remarks || "—"} />
          </div>
        )}

        <div className="mt-6 flex justify-between">
          <Button variant="outline" disabled={step === 1} onClick={() => setStep((s) => (s - 1) as 1 | 2 | 3)}>Back</Button>
          <Button onClick={goNext}>{step === 3 ? "Proceed" : "Next"}</Button>
        </div>
      </div>

      <OtpDialog open={otpOpen} onClose={() => setOtpOpen(false)} onVerified={() => { setOtpOpen(false); setRestriction(true); }} />
      <RestrictionDialog open={restriction} onClose={() => { setRestriction(false); navigate({ to: "/dashboard" }); }} />
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return <div className="flex justify-between border-b pb-2"><span className="text-muted-foreground">{label}</span><span className="font-medium text-right">{value}</span></div>;
}
