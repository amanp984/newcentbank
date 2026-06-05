import { createFileRoute } from "@tanstack/react-router";
import { BillPayForm } from "@/components/BillPayForm";

export const Route = createFileRoute("/_app/pay-bills/water")({
  head: () => ({ meta: [{ title: "Water Bill — Central Bank" }] }),
  component: () => <BillPayForm title="Water Bill" providers={["BMC Mumbai", "DJB Delhi", "BWSSB Bengaluru", "CMWSSB Chennai"]} accountLabel="Consumer Number" accountPlaceholder="Enter consumer number" />,
});
