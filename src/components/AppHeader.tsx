import { Bell, Power, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CUSTOMER } from "@/lib/bank-data";
import { useAuth } from "@/lib/auth";

export function AppHeader() {
  const { logout } = useAuth();
  const initials = CUSTOMER.name.split(" ").map((p) => p[0]).slice(0, 2).join("");
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b bg-card/80 px-6 backdrop-blur">
      <div className="relative w-full max-w-xl">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search accounts, transactions, services..." className="pl-9 h-10 rounded-full bg-background" />
      </div>
      <div className="ml-auto flex items-center gap-2">
        <button className="relative grid h-10 w-10 place-items-center rounded-full hover:bg-accent" aria-label="Notifications">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-destructive" />
        </button>

        <Popover>
          <PopoverTrigger asChild>
            <button className="flex items-center gap-2 rounded-full pl-1 pr-3 py-1 hover:bg-accent">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">{initials}</span>
              <span className="hidden text-left leading-tight md:block">
                <span className="block text-sm font-semibold">{CUSTOMER.name}</span>
                <span className="block text-[11px] text-muted-foreground">Personal</span>
              </span>
            </button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-80">
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-3 pb-3 border-b">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground text-base font-semibold">{initials}</span>
                <div>
                  <p className="font-semibold">{CUSTOMER.name}</p>
                  <p className="text-xs text-muted-foreground">Customer since 2018</p>
                </div>
              </div>
              <Row label="Customer ID" value={CUSTOMER.customerId} />
              <Row label="CIF" value={CUSTOMER.cif} />
              <Row label="Account" value={CUSTOMER.accountNumber} />
              <Row label="IFSC" value={CUSTOMER.ifsc} />
              <Row label="Mobile" value={CUSTOMER.mobile} />
              <Row label="Email" value={CUSTOMER.email} />
            </div>
          </PopoverContent>
        </Popover>

        <button
          onClick={() => { logout(); window.location.href = "/"; }}
          className="grid h-10 w-10 place-items-center rounded-full hover:bg-destructive/10"
          aria-label="Logout"
        >
          <Power className="h-5 w-5 text-destructive" />
        </button>
      </div>
    </header>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-right">{value}</span>
    </div>
  );
}
