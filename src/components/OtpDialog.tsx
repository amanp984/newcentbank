import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

export function OtpDialog({
  open,
  onClose,
  onVerified,
  title = "OTP Verification",
}: {
  open: boolean;
  onClose: () => void;
  onVerified: () => void;
  title?: string;
}) {
  const [otp, setOtp] = useState("");
  const [seconds, setSeconds] = useState(54);

  useEffect(() => {
    if (!open) return;
    setOtp("");
    setSeconds(54);
    const id = setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Enter the 6-digit OTP sent to your registered mobile number ending in **12.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center gap-4 py-2">
          <InputOTP maxLength={6} value={otp} onChange={setOtp}>
            <InputOTPGroup>
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <InputOTPSlot key={i} index={i} />
              ))}
            </InputOTPGroup>
          </InputOTP>
          <p className="text-sm text-muted-foreground">
            {seconds > 0 ? (
              <>Resend OTP in <span className="font-semibold text-primary">{String(seconds).padStart(2, "0")}s</span></>
            ) : (
              <button className="text-primary underline" onClick={() => setSeconds(54)}>Resend OTP</button>
            )}
          </p>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button disabled={otp.length !== 6} onClick={onVerified}>Submit OTP</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
