"use client";

import { Button } from "@/components/ui/button";
import { FaEdit, FaTrash } from "react-icons/fa";

interface Column<T> {
  key: string;
  label: string;
  render?: (item: T) => React.ReactNode;
}

interface AdminTableProps<T extends { id: string | number }> {
  data: T[];
  columns: Column<T>[];
  onEdit: (item: T) => void;
  onDelete: (item: T) => void;
}

export default function AdminTable<T extends { id: string | number }>({
  data, columns, onEdit, onDelete,
}: AdminTableProps<T>) {
  if (data.length === 0) {
    return (
      <p className="text-center py-12 font-mono text-sm text-muted-foreground">
        <span className="text-accent-tertiary">$</span> SELECT * … <span className="text-warning">0 rows</span>
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm font-mono">
        <thead className="border-b border-border bg-muted/40">
          <tr>
            {columns.map((col) => (
              <th key={col.key} scope="col" className="text-left px-4 py-3 font-label font-normal text-xs uppercase tracking-[0.2em] text-accent-tertiary">
                {col.label}
              </th>
            ))}
            <th scope="col" className="text-right px-4 py-3 font-label font-normal text-xs uppercase tracking-[0.2em] text-accent-tertiary">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/60">
          {data.map((item) => (
            <tr key={item.id} className="transition-colors duration-100 hover:bg-accent/5">
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3 text-foreground/85">
                  {col.render ? col.render(item) : String((item as Record<string, unknown>)[col.key] ?? "")}
                </td>
              ))}
              <td className="px-4 py-3 text-right">
                <div className="flex gap-2 justify-end">
                  <Button size="sm" variant="outline" onClick={() => onEdit(item)}>
                    <FaEdit /> Edit
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => onDelete(item)} aria-label="Delete">
                    <FaTrash />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
