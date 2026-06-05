import { createFileRoute } from "@tanstack/react-router";
import { BillPayForm } from "@/components/BillPayForm";

export const Route = createFileRoute("/_app/pay-bills/credit-card")({
  head: () => ({ meta: [{ title: "Credit Card Bill — Central Bank" }] }),
  component: () => <BillPayForm title="Credit Card Bill" providers={["SBI", "HDFC", "ICICI", "Axis", "Kotak", "PNB"]} accountLabel="Card Number" accountPlaceholder="Enter 16-digit card number" />,
});
