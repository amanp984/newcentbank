import { createFileRoute } from "@tanstack/react-router";
import { BillPayForm } from "@/components/BillPayForm";

export const Route = createFileRoute("/_app/mobile-recharge")({
  head: () => ({ meta: [{ title: "Mobile Recharge — Central Bank" }] }),
  component: () => <BillPayForm title="Mobile Recharge" providers={["Jio", "Airtel", "VI", "BSNL"]} accountLabel="Mobile Number" accountPlaceholder="Enter 10-digit mobile number" />,
});
