"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdminTable from "@/components/admin/AdminTable";
import { FaPlus, FaSpinner } from "react-icons/fa";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  imageUrl: string;
  order: number;
}

const empty: Omit<Testimonial, "id"> = { name: "", role: "", company: "", content: "", imageUrl: "", order: 0 };

export default function TestimonialsAdminPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [form, setForm] = useState<Omit<Testimonial, "id">>(empty);
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    fetch("/api/admin/testimonials")
      .then((r) => r.json())
      .then((d) => { setItems(d); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openNew = () => { setEditing({ id: "" } as Testimonial); setForm(empty); };
  const openEdit = (item: Testimonial) => { setEditing(item); setForm({ ...item }); };

  const handleSave = async () => {
    setSaving(true);
    const isNew = !editing?.id;
    const url = isNew ? "/api/admin/testimonials" : `/api/admin/testimonials/${editing?.id}`;
    try {
      const res = await fetch(url, {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) { load(); setEditing(null); }
    } finally { setSaving(false); }
  };

  const handleDelete = async (item: Testimonial) => {
    if (!confirm(`Delete testimonial from "${item.name}"?`)) return;
    await fetch(`/api/admin/testimonials/${item.id}`, { method: "DELETE" });
    load();
  };

  const columns = [
    { key: "name", label: "Name" },
    { key: "role", label: "Role" },
    { key: "company", label: "Company" },
    { key: "content", label: "Preview", render: (t: Testimonial) => t.content.slice(0, 60) + "…" },
  ];

  const F = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div className="space-y-1"><label className="text-xs font-medium text-foreground/70">{label}</label>{children}</div>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Testimonials</h1>
          <p className="text-foreground/60 mt-1">{items.length} entries</p>
        </div>
        <Button onClick={openNew}><FaPlus className="mr-2" /> Add Testimonial</Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20 text-foreground/40"><FaSpinner className="animate-spin text-2xl" /></div>
      ) : (
        <Card className="glass"><CardContent className="p-0 pt-4">
          <AdminTable data={items} columns={columns} onEdit={openEdit} onDelete={handleDelete} />
        </CardContent></Card>
      )}

      {editing && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={(e) => e.target === e.currentTarget && setEditing(null)}>
          <Card className="w-full max-w-lg max-h-[90vh] overflow-y-auto glass-strong">
            <CardHeader><CardTitle>{editing.id ? "Edit Testimonial" : "New Testimonial"}</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <F label="Name *"><Input value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} /></F>
              <div className="grid grid-cols-2 gap-4">
                <F label="Role *"><Input value={form.role} onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))} /></F>
                <F label="Company *"><Input value={form.company} onChange={(e) => setForm((p) => ({ ...p, company: e.target.value }))} /></F>
              </div>
              <F label="Content *"><Textarea rows={4} value={form.content} onChange={(e) => setForm((p) => ({ ...p, content: e.target.value }))} /></F>
              <F label="Photo URL"><Input value={form.imageUrl ?? ""} onChange={(e) => setForm((p) => ({ ...p, imageUrl: e.target.value }))} placeholder="/images/testimonials/..." /></F>
              <F label="Order"><Input type="number" value={form.order} onChange={(e) => setForm((p) => ({ ...p, order: parseInt(e.target.value) || 0 }))} /></F>
              <div className="flex gap-3 pt-2">
                <Button onClick={handleSave} disabled={saving} className="flex-1">
                  {saving ? <><FaSpinner className="animate-spin mr-2" />Saving…</> : "Save"}
                </Button>
                <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
