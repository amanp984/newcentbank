import { createFileRoute } from "@tanstack/react-router";
import { makeComingSoon } from "./_app.accounts";

export const Route = createFileRoute("/_app/deposits")({
  head: () => ({ meta: [{ title: "Deposits — Central Bank" }] }),
  component: makeComingSoon("Deposits", "View and manage your fixed and recurring deposits"),
});
