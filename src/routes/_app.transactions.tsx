import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowDownLeft, ArrowUpRight, Download, FileDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageHeader } from "@/components/PageHeader";
import { CUSTOMER, TRANSACTIONS, withRunningBalance, formatINR } from "@/lib/bank-data";
import { downloadStatementPDF, downloadStatementCSV } from "@/lib/statement";

export const Route = createFileRoute("/_app/transactions")({
  head: () => ({ meta: [{ title: "Transactions — Central Bank" }] }),
  component: TxnsPage,
});

function TxnsPage() {
  const [q, setQ] = useState("");
  const [type, setType] = useState("all");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const rows = useMemo(() => {
    const enriched = withRunningBalance(TRANSACTIONS);
    return enriched.filter((t) => {
      if (type !== "all" && t.type !== type) return false;
      if (q && !`${t.description} ${t.reference}`.toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    });
  }, [q, type, from, to]);

  return (
    <div>
      <PageHeader
        title="Transaction History"
        subtitle={`Current Account · ${CUSTOMER.accountNumber}`}
        action={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => downloadStatementCSV(rows)}><FileDown className="mr-1.5 h-4 w-4" /> CSV</Button>
            <Button onClick={() => downloadStatementPDF(rows)}><Download className="mr-1.5 h-4 w-4" /> PDF</Button>
          </div>
        }
      />

      <div className="bank-card p-4">
        <div className="mb-4 grid gap-3 md:grid-cols-4">
          <div className="relative md:col-span-2">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search description or reference" value={q} onChange={(e) => setQ(e.target.value)} className="pl-9" />
          </div>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger><SelectValue placeholder="Filter" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All transactions</SelectItem>
              <SelectItem value="credit">Credits only</SelectItem>
              <SelectItem value="debit">Debits only</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex gap-2">
            <Input type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
            <Input type="date" value={to} onChange={(e) => setTo(e.target.value)} />
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr className="text-left text-xs font-semibold uppercase text-muted-foreground">
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3">Reference</th>
                <th className="px-4 py-3 text-right">Debit</th>
                <th className="px-4 py-3 text-right">Credit</th>
                <th className="px-4 py-3 text-right">Balance</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-10 text-center text-muted-foreground">No transactions match your filters.</td></tr>
              )}
              {rows.map((t) => (
                <tr key={t.id} className="border-t hover:bg-accent/40">
                  <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">{t.date}</td>
                  <td className="px-4 py-3 font-medium">
                    <span className="inline-flex items-center gap-2">
                      {t.type === "credit" ? <ArrowDownLeft className="h-4 w-4 text-success" /> : <ArrowUpRight className="h-4 w-4 text-debit" />}
                      {t.description}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{t.reference}</td>
                  <td className="px-4 py-3 text-right font-semibold text-debit">
                    {t.type === "debit" ? `₹${t.amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}` : "—"}
                  </td>
                  <td className="px-4 py-3 text-right font-semibold text-success">
                    {t.type === "credit" ? `₹${t.amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}` : "—"}
                  </td>
                  <td className="px-4 py-3 text-right font-medium">₹{t.balance.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
