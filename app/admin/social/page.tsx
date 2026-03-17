"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdminTable from "@/components/admin/AdminTable";
import { FaPlus, FaSpinner } from "react-icons/fa";

interface SocialLink {
  id: string;
  name: string;
  url: string;
  icon: string;
  order: number;
}

const empty: Omit<SocialLink, "id"> = { name: "", url: "", icon: "", order: 0 };

export default function SocialAdminPage() {
  const [items, setItems] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<SocialLink | null>(null);
  const [form, setForm] = useState<Omit<SocialLink, "id">>(empty);
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    fetch("/api/admin/social")
      .then((r) => r.json())
      .then((d) => { setItems(d); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openNew = () => { setEditing({ id: "" } as SocialLink); setForm(empty); };
  const openEdit = (item: SocialLink) => { setEditing(item); setForm({ ...item }); };

  const handleSave = async () => {
    setSaving(true);
    const isNew = !editing?.id;
    const url = isNew ? "/api/admin/social" : `/api/admin/social/${editing?.id}`;
    try {
      const res = await fetch(url, {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) { load(); setEditing(null); }
    } finally { setSaving(false); }
  };

  const handleDelete = async (item: SocialLink) => {
    if (!confirm(`Delete "${item.name}"?`)) return;
    await fetch(`/api/admin/social/${item.id}`, { method: "DELETE" });
    load();
  };

  const columns = [
    { key: "name", label: "Name" },
    { key: "icon", label: "Icon" },
    { key: "url", label: "URL" },
  ];

  const F = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div className="space-y-1"><label className="text-xs font-medium text-foreground/70">{label}</label>{children}</div>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Social Links</h1>
          <p className="text-foreground/60 mt-1">{items.length} links</p>
        </div>
        <Button onClick={openNew}><FaPlus className="mr-2" /> Add Link</Button>
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
          <Card className="w-full max-w-md glass-strong">
            <CardHeader><CardTitle>{editing.id ? "Edit Social Link" : "New Social Link"}</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <F label="Name *"><Input value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} placeholder="GitHub" /></F>
              <F label="URL *"><Input value={form.url} onChange={(e) => setForm((p) => ({ ...p, url: e.target.value }))} placeholder="https://github.com/..." /></F>
              <F label="Icon (react-icons name)">
                <Input value={form.icon} onChange={(e) => setForm((p) => ({ ...p, icon: e.target.value }))} placeholder="FaGithub" />
                <p className="text-xs text-foreground/40 mt-1">Use names like FaGithub, FaLinkedin, FaTwitter, FaEnvelope</p>
              </F>
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
