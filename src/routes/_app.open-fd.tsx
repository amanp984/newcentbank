import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Info } from "lucide-react";

export function makeUnavailablePage(title: string, message: string) {
  return function Page() {
    return (
      <div>
        <PageHeader title={title} />
        <div className="bank-card flex flex-col items-center justify-center gap-3 p-12 text-center">
          <div className="grid h-14 w-14 place-items-center rounded-full bg-primary/10 text-primary"><Info className="h-7 w-7" /></div>
          <p className="text-base font-semibold">{title}</p>
          <p className="max-w-md text-sm text-muted-foreground">{message}</p>
        </div>
      </div>
    );
  };
}

export const Route = createFileRoute("/_app/open-fd")({
  head: () => ({ meta: [{ title: "Open Fixed Deposit — Central Bank" }] }),
  component: makeUnavailablePage("Open Fixed Deposit", "Fixed Deposit services are currently unavailable through Net Banking. Please contact your branch."),
});
