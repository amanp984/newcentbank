import { createFileRoute } from "@tanstack/react-router";
import { makeComingSoon } from "./_app.accounts";

export const Route = createFileRoute("/_app/investments")({
  head: () => ({ meta: [{ title: "Investments — Central Bank" }] }),
  component: makeComingSoon("Investments", "Explore mutual funds, equities, and demat services"),
});
