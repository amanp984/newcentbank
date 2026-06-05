import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { CUSTOMER, type Transaction } from "./bank-data";

export function downloadStatementCSV(rows: Transaction[]) {
  const headers = ["Date", "Description", "Reference", "Debit", "Credit", "Balance"];
  const lines = [headers.join(",")];
  rows.forEach((t) => {
    const debit = t.type === "debit" ? t.amount.toFixed(2) : "";
    const credit = t.type === "credit" ? t.amount.toFixed(2) : "";
    lines.push([t.date, `"${t.description}"`, t.reference, debit, credit, (t.balance ?? 0).toFixed(2)].join(","));
  });
  const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8;" });
  triggerDownload(blob, `Statement_${Date.now()}.csv`);
}

export function downloadStatementPDF(rows: Transaction[]) {
  const doc = new jsPDF();
  // Header band
  doc.setFillColor(13, 71, 161);
  doc.rect(0, 0, 210, 28, "F");
  doc.setTextColor(255);
  doc.setFontSize(16);
  doc.text("Central Bank", 14, 13);
  doc.setFontSize(10);
  doc.text("Account Statement", 14, 20);
  doc.text(`Generated: ${new Date().toLocaleString("en-IN")}`, 196, 13, { align: "right" });

  // Customer block
  doc.setTextColor(20);
  doc.setFontSize(11);
  let y = 38;
  const line = (label: string, value: string) => {
    doc.setFont("helvetica", "bold"); doc.text(`${label}:`, 14, y);
    doc.setFont("helvetica", "normal"); doc.text(value, 55, y);
    y += 6;
  };
  line("Customer Name", CUSTOMER.name);
  line("Customer ID", CUSTOMER.customerId);
  line("Account Number", CUSTOMER.accountNumber);
  line("IFSC", CUSTOMER.ifsc);
  line("Branch", "Mumbai Andheri East");
  line("Statement Period", `${rows[rows.length - 1]?.date ?? "—"} to ${rows[0]?.date ?? "—"}`);

  autoTable(doc, {
    startY: y + 4,
    head: [["Date", "Description", "Reference", "Debit (₹)", "Credit (₹)", "Balance (₹)"]],
    body: rows.map((t) => [
      t.date,
      t.description,
      t.reference,
      t.type === "debit" ? t.amount.toFixed(2) : "",
      t.type === "credit" ? t.amount.toFixed(2) : "",
      t.balance.toFixed(2),
    ]),
    styles: { fontSize: 9 },
    headStyles: { fillColor: [21, 101, 192], textColor: 255 },
    alternateRowStyles: { fillColor: [243, 247, 253] },
  });

  const finalY = (doc as any).lastAutoTable.finalY || 100;
  doc.setFontSize(8);
  doc.setTextColor(100);
  doc.text("This is a computer-generated statement and does not require a signature.", 14, finalY + 12);
  doc.text("For any queries, please contact your branch or call 1800-XXX-XXXX.", 14, finalY + 17);

  doc.save(`Central_Bank_Statement_${Date.now()}.pdf`);
}

function triggerDownload(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = name; a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
