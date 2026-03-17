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
    return <p className="text-center py-12 text-foreground/40 text-sm">No entries yet.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-sm">
        <thead className="bg-foreground/5 border-b border-border">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="text-left px-4 py-3 font-medium text-foreground/70">
                {col.label}
              </th>
            ))}
            <th className="text-right px-4 py-3 font-medium text-foreground/70">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr
              key={item.id}
              className={i % 2 === 0 ? "bg-background" : "bg-foreground/[0.02]"}
            >
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3 text-foreground/80">
                  {col.render ? col.render(item) : String((item as Record<string, unknown>)[col.key] ?? "")}
                </td>
              ))}
              <td className="px-4 py-3 text-right">
                <div className="flex gap-2 justify-end">
                  <Button size="sm" variant="outline" onClick={() => onEdit(item)}>
                    <FaEdit className="mr-1" /> Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-500 hover:bg-red-500/10 border-red-500/30"
                    onClick={() => onDelete(item)}
                  >
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
