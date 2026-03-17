"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdminTable from "@/components/admin/AdminTable";
import { FaPlus, FaSpinner } from "react-icons/fa";

interface Education {
  id: string;
  degree: string;
  institution: string;
  duration: string;
  startDate: string;
  endDate: string;
  description: string;
  gpa: string;
  order: number;
}

const empty: Omit<Education, "id"> = {
  degree: "", institution: "", duration: "", startDate: "", endDate: "", description: "", gpa: "", order: 0,
};

export default function EducationAdminPage() {
  const [items, setItems] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Education | null>(null);
  const [form, setForm] = useState<Omit<Education, "id">>(empty);
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    fetch("/api/admin/education")
      .then((r) => r.json())
      .then((d) => { setItems(d); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openNew = () => { setEditing({ id: "" } as Education); setForm(empty); };
  const openEdit = (item: Education) => { setEditing(item); setForm({ ...item }); };

  const handleSave = async () => {
    setSaving(true);
    const isNew = !editing?.id;
    const url = isNew ? "/api/admin/education" : `/api/admin/education/${editing?.id}`;
    try {
      const res = await fetch(url, {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) { load(); setEditing(null); }
    } finally { setSaving(false); }
  };

  const handleDelete = async (item: Education) => {
    if (!confirm(`Delete "${item.degree}"?`)) return;
    await fetch(`/api/admin/education/${item.id}`, { method: "DELETE" });
    load();
  };

  const columns = [
    { key: "degree", label: "Degree" },
    { key: "institution", label: "Institution" },
    { key: "duration", label: "Duration" },
    { key: "gpa", label: "GPA" },
  ];

  const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div className="space-y-1"><label className="text-xs font-medium text-foreground/70">{label}</label>{children}</div>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Education</h1>
          <p className="text-foreground/60 mt-1">{items.length} entries</p>
        </div>
        <Button onClick={openNew}><FaPlus className="mr-2" /> Add Education</Button>
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
            <CardHeader><CardTitle>{editing.id ? "Edit Education" : "New Education"}</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <Field label="Degree *"><Input value={form.degree} onChange={(e) => setForm((p) => ({ ...p, degree: e.target.value }))} /></Field>
              <Field label="Institution *"><Input value={form.institution} onChange={(e) => setForm((p) => ({ ...p, institution: e.target.value }))} /></Field>
              <Field label="Duration"><Input value={form.duration} onChange={(e) => setForm((p) => ({ ...p, duration: e.target.value }))} placeholder="Jan 2020 – Jun 2024" /></Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Start Date"><Input value={form.startDate} onChange={(e) => setForm((p) => ({ ...p, startDate: e.target.value }))} placeholder="2020-01" /></Field>
                <Field label="End Date"><Input value={form.endDate} onChange={(e) => setForm((p) => ({ ...p, endDate: e.target.value }))} placeholder="2024-06" /></Field>
              </div>
              <Field label="Description"><Textarea rows={3} value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} /></Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="GPA"><Input value={form.gpa ?? ""} onChange={(e) => setForm((p) => ({ ...p, gpa: e.target.value }))} placeholder="3.5/4.0" /></Field>
                <Field label="Order"><Input type="number" value={form.order} onChange={(e) => setForm((p) => ({ ...p, order: parseInt(e.target.value) || 0 }))} /></Field>
              </div>
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
