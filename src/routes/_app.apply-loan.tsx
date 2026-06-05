import { createFileRoute } from "@tanstack/react-router";
import { makeUnavailablePage } from "./_app.open-fd";

export const Route = createFileRoute("/_app/apply-loan")({
  head: () => ({ meta: [{ title: "Apply Loan — Central Bank" }] }),
  component: makeUnavailablePage("Apply Loan", "No active loan offers available. Please contact your branch."),
});
