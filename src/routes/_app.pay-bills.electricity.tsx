import { createFileRoute } from "@tanstack/react-router";
import { BillPayForm } from "@/components/BillPayForm";

export const Route = createFileRoute("/_app/pay-bills/electricity")({
  head: () => ({ meta: [{ title: "Electricity Bill — Central Bank" }] }),
  component: () => <BillPayForm title="Electricity Bill" providers={["Adani Electricity", "Tata Power", "Reliance Energy"]} accountLabel="Consumer Number" accountPlaceholder="Enter consumer number" />,
});
