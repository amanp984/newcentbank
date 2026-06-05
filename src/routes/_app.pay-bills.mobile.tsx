import { createFileRoute } from "@tanstack/react-router";
import { BillPayForm } from "@/components/BillPayForm";

export const Route = createFileRoute("/_app/pay-bills/mobile")({
  head: () => ({ meta: [{ title: "Mobile Bill — Central Bank" }] }),
  component: () => <BillPayForm title="Mobile Bill" providers={["Jio", "Airtel", "VI", "BSNL"]} accountLabel="Mobile Number" accountPlaceholder="Enter 10-digit mobile number" />,
});
