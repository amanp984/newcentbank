import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageHeader } from "@/components/PageHeader";
import { OtpDialog } from "@/components/OtpDialog";
import { RestrictionDialog } from "@/components/RestrictionDialog";
import { toast } from "sonner";

export function BillPayForm({
  title,
  providers,
  accountLabel,
  accountPlaceholder,
}: {
  title: string;
  providers: string[];
  accountLabel: string;
  accountPlaceholder: string;
}) {
  const [provider, setProvider] = useState(providers[0]);
  const [account, setAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [otp, setOtp] = useState(false);
  const [restr, setRestr] = useState(false);
  const nav = useNavigate();

  const submit = () => {
    if (!provider) return toast.error("Select a provider");
    if (account.trim().length < 4) return toast.error("Enter a valid number");
    if (!amount || Number(amount) <= 0) return toast.error("Enter a valid amount");
    setOtp(true);
  };

  return (
    <div className="mx-auto max-w-xl">
      <PageHeader title={title} subtitle="Pay your bills securely" />
      <div className="bank-card p-6 space-y-4">
        <div>
          <Label>Provider</Label>
          <Select value={provider} onValueChange={setProvider}>
            <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
            <SelectContent>{providers.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="acc">{accountLabel}</Label>
          <Input id="acc" placeholder={accountPlaceholder} value={account} onChange={(e) => setAccount(e.target.value)} className="mt-1.5" maxLength={20} />
        </div>
        <div>
          <Label htmlFor="amt">Amount (₹)</Label>
          <Input id="amt" type="number" placeholder="0.00" value={amount} onChange={(e) => setAmount(e.target.value)} className="mt-1.5" />
        </div>
        <Button className="w-full h-11" onClick={submit}>Proceed</Button>
      </div>

      <OtpDialog open={otp} onClose={() => setOtp(false)} onVerified={() => { setOtp(false); setRestr(true); }} title={`${title} — OTP Verification`} />
      <RestrictionDialog open={restr} onClose={() => { setRestr(false); nav({ to: "/pay-bills" }); }} />
    </div>
  );
}
