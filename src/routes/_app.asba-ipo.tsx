import { createFileRoute } from "@tanstack/react-router";
import { makeComingSoon } from "./_app.accounts";

export const Route = createFileRoute("/_app/asba-ipo")({
  head: () => ({ meta: [{ title: "ASBA / IPO — Central Bank" }] }),
  component: makeComingSoon("ASBA / IPO", "Apply for IPOs using your bank account"),
});
