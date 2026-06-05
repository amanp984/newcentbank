import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Phone, Mail, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/_app/support")({
  head: () => ({ meta: [{ title: "Support — Central Bank" }] }),
  component: SupportPage,
});

function SupportPage() {
  return (
    <div>
      <PageHeader title="Customer Support" subtitle="We're here 24×7 to help you" />
      <div className="grid gap-4 md:grid-cols-3">
        <Card icon={<Phone className="h-5 w-5" />} title="Call Us" body="1800-XXX-XXXX (Toll Free)" />
        <Card icon={<Mail className="h-5 w-5" />} title="Email Us" body="support@centralbank.example" />
        <Card icon={<MessageCircle className="h-5 w-5" />} title="Live Chat" body="Mon–Sat, 9 AM – 9 PM IST" />
      </div>
    </div>
  );
}

function Card({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="bank-card p-5">
      <span className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary">{icon}</span>
      <p className="mt-3 font-semibold">{title}</p>
      <p className="mt-1 text-sm text-muted-foreground">{body}</p>
    </div>
  );
}
