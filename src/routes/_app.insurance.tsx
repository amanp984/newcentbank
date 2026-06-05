import { createFileRoute } from "@tanstack/react-router";
import { makeComingSoon } from "./_app.accounts";

export const Route = createFileRoute("/_app/insurance")({
  head: () => ({ meta: [{ title: "Insurance — Central Bank" }] }),
  component: makeComingSoon("Insurance", "Health, life, and general insurance plans"),
});
