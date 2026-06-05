import { createFileRoute } from "@tanstack/react-router";
import { BillPayForm } from "@/components/BillPayForm";

export const Route = createFileRoute("/_app/pay-bills/gas")({
  head: () => ({ meta: [{ title: "Gas Bill — Central Bank" }] }),
  component: () => <BillPayForm title="Gas Bill" providers={["HP Gas", "Bharat Gas", "Indane"]} accountLabel="Consumer Number" accountPlaceholder="Enter LPG consumer number" />,
});
