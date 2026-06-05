import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PageHeader } from "@/components/PageHeader";
import { CARDS } from "@/lib/bank-data";
import { OtpDialog } from "@/components/OtpDialog";
import { RestrictionDialog } from "@/components/RestrictionDialog";
import { toast } from "sonner";
import { CreditCard, Lock, Unlock, Settings2 } from "lucide-react";

export const Route = createFileRoute("/_app/cards")({
  head: () => ({ meta: [{ title: "Cards — Central Bank" }] }),
  component: CardsPage,
});

function CardsPage() {
  const [cards, setCards] = useState(CARDS);
  const [blockOpen, setBlockOpen] = useState<string | null>(null);
  const [reason, setReason] = useState("Lost");
  const [otp, setOtp] = useState(false);
  const [limitRestr, setLimitRestr] = useState(false);

  return (
    <div>
      <PageHeader title="Cards" subtitle="Manage your debit and credit cards" />
      <div className="grid gap-6 lg:grid-cols-2">
        {cards.map((c) => (
          <div key={c.id} className="bank-card overflow-hidden">
            <div className="gradient-account p-6 text-white">
              <div className="flex items-center justify-between">
                <CreditCard className="h-8 w-8" />
                <Badge className={c.status === "Active" ? "bg-success text-success-foreground" : "bg-destructive text-destructive-foreground"}>{c.status}</Badge>
              </div>
              <p className="mt-8 font-mono text-xl tracking-widest">{c.masked}</p>
              <div className="mt-3 flex items-end justify-between text-sm">
                <div>
                  <p className="text-[10px] uppercase opacity-75">Card Holder</p>
                  <p className="font-medium">RAJESH KUMAR</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase opacity-75">Expires</p>
                  <p className="font-medium">{c.expiry}</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 p-4">
              {c.status === "Active" ? (
                <Button variant="outline" onClick={() => setBlockOpen(c.id)}><Lock className="mr-1 h-4 w-4" /> Block</Button>
              ) : (
                <Button variant="outline" onClick={() => setCards((cs) => cs.map((x) => x.id === c.id ? { ...x, status: "Active" } : x))}><Unlock className="mr-1 h-4 w-4" /> Unblock</Button>
              )}
              <Button variant="outline" onClick={() => setLimitRestr(true)}><Settings2 className="mr-1 h-4 w-4" /> Manage Limit</Button>
              <Button variant="outline">View PIN</Button>
            </div>
            <div className="border-t bg-muted/40 p-4 text-xs text-muted-foreground">
              Type: <span className="font-medium text-foreground">{c.type}</span>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={!!blockOpen} onOpenChange={(o) => !o && setBlockOpen(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Block Card</DialogTitle></DialogHeader>
          <Label className="text-sm">Reason for blocking</Label>
          <RadioGroup value={reason} onValueChange={setReason} className="grid grid-cols-2 gap-2">
            {["Lost", "Damaged", "Security Concern", "Temporary Block"].map((r) => (
              <label key={r} className="flex items-center gap-2 rounded-md border p-3 text-sm hover:bg-accent cursor-pointer">
                <RadioGroupItem value={r} /> {r}
              </label>
            ))}
          </RadioGroup>
          <DialogFooter>
            <Button variant="outline" onClick={() => setBlockOpen(null)}>Cancel</Button>
            <Button onClick={() => { setOtp(true); }}>Continue</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <OtpDialog
        open={otp}
        onClose={() => setOtp(false)}
        onVerified={() => {
          setOtp(false);
          const id = blockOpen!;
          setCards((cs) => cs.map((x) => x.id === id ? { ...x, status: reason === "Temporary Block" ? "Blocked" : "Blocked" } : x));
          setBlockOpen(null);
          toast.success(`Card has been blocked (${reason})`);
        }}
        title="Confirm Card Block — OTP"
      />
      <RestrictionDialog open={limitRestr} onClose={() => setLimitRestr(false)} />
    </div>
  );
}
