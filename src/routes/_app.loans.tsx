import { createFileRoute } from "@tanstack/react-router";
import { makeComingSoon } from "./_app.accounts";

export const Route = createFileRoute("/_app/loans")({
  head: () => ({ meta: [{ title: "Loans — Central Bank" }] }),
  component: makeComingSoon("Loans", "Track your loan accounts, EMIs, and statements"),
});
