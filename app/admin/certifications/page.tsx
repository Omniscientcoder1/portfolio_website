"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdminTable from "@/components/admin/AdminTable";
import { FaPlus, FaSpinner } from "react-icons/fa";

interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialLink: string;
  credentialId: string;
  badgeUrl: string;
  order: number;
}

const empty: Omit<Certification, "id"> = {
  name: "", issuer: "", date: "", credentialLink: "", credentialId: "", badgeUrl: "", order: 0,
};

export default function CertificationsAdminPage() {
  const [items, setItems] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Certification | null>(null);
  const [form, setForm] = useState<Omit<Certification, "id">>(empty);
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    fetch("/api/admin/certifications")
      .then((r) => r.json())
      .then((d) => { setItems(d); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openNew = () => { setEditing({ id: "" } as Certification); setForm(empty); };
  const openEdit = (item: Certification) => { setEditing(item); setForm({ ...item }); };

  const handleSave = async () => {
    setSaving(true);
    const isNew = !editing?.id;
    const url = isNew ? "/api/admin/certifications" : `/api/admin/certifications/${editing?.id}`;
    try {
      const res = await fetch(url, {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) { load(); setEditing(null); }
    } finally { setSaving(false); }
  };

  const handleDelete = async (item: Certification) => {
    if (!confirm(`Delete "${item.name}"?`)) return;
    await fetch(`/api/admin/certifications/${item.id}`, { method: "DELETE" });
    load();
  };

  const columns = [
    { key: "name", label: "Name" },
    { key: "issuer", label: "Issuer" },
    { key: "date", label: "Date" },
  ];

  const F = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div className="space-y-1"><label className="text-xs font-medium text-foreground/70">{label}</label>{children}</div>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Certifications</h1>
          <p className="text-foreground/60 mt-1">{items.length} entries</p>
        </div>
        <Button onClick={openNew}><FaPlus className="mr-2" /> Add Certification</Button>
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
            <CardHeader><CardTitle>{editing.id ? "Edit Certification" : "New Certification"}</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <F label="Name *"><Input value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} /></F>
              <div className="grid grid-cols-2 gap-4">
                <F label="Issuer *"><Input value={form.issuer} onChange={(e) => setForm((p) => ({ ...p, issuer: e.target.value }))} placeholder="Coursera, Udemy..." /></F>
                <F label="Date"><Input value={form.date} onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))} placeholder="2024-01" /></F>
              </div>
              <F label="Credential Link"><Input value={form.credentialLink ?? ""} onChange={(e) => setForm((p) => ({ ...p, credentialLink: e.target.value }))} placeholder="https://..." /></F>
              <F label="Credential ID"><Input value={form.credentialId ?? ""} onChange={(e) => setForm((p) => ({ ...p, credentialId: e.target.value }))} /></F>
              <F label="Badge Image URL"><Input value={form.badgeUrl ?? ""} onChange={(e) => setForm((p) => ({ ...p, badgeUrl: e.target.value }))} placeholder="/images/certifications/..." /></F>
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
