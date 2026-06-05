import { createFileRoute } from "@tanstack/react-router";
import { makeComingSoon } from "./_app.accounts";

export const Route = createFileRoute("/_app/govt-schemes")({
  head: () => ({ meta: [{ title: "Government Schemes — Central Bank" }] }),
  component: makeComingSoon("Government Schemes", "PMJDY, Sukanya Samriddhi, Atal Pension Yojana and more"),
});
