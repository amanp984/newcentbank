import { createFileRoute } from "@tanstack/react-router";
import { makeComingSoon } from "./_app.accounts";

export const Route = createFileRoute("/_app/pfm")({
  head: () => ({ meta: [{ title: "PFM — Central Bank" }] }),
  component: makeComingSoon("Personal Finance Manager", "Track spending, set budgets, and reach financial goals"),
});
