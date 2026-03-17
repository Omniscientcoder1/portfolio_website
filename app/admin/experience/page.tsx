"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdminTable from "@/components/admin/AdminTable";
import { FaPlus, FaSpinner } from "react-icons/fa";

interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string;
  startDate: string;
  endDate: string;
  responsibilities: string[];
  achievements: string[];
  logo: string;
  order: number;
}

const empty: Omit<Experience, "id"> = {
  company: "", role: "", duration: "", startDate: "", endDate: "",
  responsibilities: [], achievements: [], logo: "", order: 0,
};

export default function ExperienceAdminPage() {
  const [items, setItems] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Experience | null>(null);
  const [form, setForm] = useState<Omit<Experience, "id">>(empty);
  const [saving, setSaving] = useState(false);
  const [respInput, setRespInput] = useState("");
  const [achievInput, setAchievInput] = useState("");

  const load = () => {
    setLoading(true);
    fetch("/api/admin/experience")
      .then((r) => r.json())
      .then((d) => { setItems(d); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openNew = () => {
    setEditing({ id: "" } as Experience);
    setForm(empty);
    setRespInput(""); setAchievInput("");
  };

  const openEdit = (item: Experience) => {
    setEditing(item);
    setForm({ ...item });
    setRespInput(item.responsibilities.join("\n"));
    setAchievInput(item.achievements.join("\n"));
  };

  const handleSave = async () => {
    setSaving(true);
    const payload = {
      ...form,
      responsibilities: respInput.split("\n").map((s) => s.trim()).filter(Boolean),
      achievements: achievInput.split("\n").map((s) => s.trim()).filter(Boolean),
    };
    const isNew = !editing?.id;
    const url = isNew ? "/api/admin/experience" : `/api/admin/experience/${editing?.id}`;
    try {
      const res = await fetch(url, {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) { load(); setEditing(null); }
    } finally { setSaving(false); }
  };

  const handleDelete = async (item: Experience) => {
    if (!confirm(`Delete "${item.role} at ${item.company}"?`)) return;
    await fetch(`/api/admin/experience/${item.id}`, { method: "DELETE" });
    load();
  };

  const columns = [
    { key: "company", label: "Company" },
    { key: "role", label: "Role" },
    { key: "duration", label: "Duration" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Experience</h1>
          <p className="text-foreground/60 mt-1">{items.length} entries</p>
        </div>
        <Button onClick={openNew}><FaPlus className="mr-2" /> Add Experience</Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20 text-foreground/40"><FaSpinner className="animate-spin text-2xl" /></div>
      ) : (
        <Card className="glass">
          <CardContent className="p-0 pt-4">
            <AdminTable data={items} columns={columns} onEdit={openEdit} onDelete={handleDelete} />
          </CardContent>
        </Card>
      )}

      {editing && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={(e) => e.target === e.currentTarget && setEditing(null)}>
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto glass-strong">
            <CardHeader><CardTitle>{editing.id ? "Edit Experience" : "New Experience"}</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-foreground/70">Company *</label>
                  <Input value={form.company} onChange={(e) => setForm((p) => ({ ...p, company: e.target.value }))} />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-foreground/70">Role *</label>
                  <Input value={form.role} onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))} />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-foreground/70">Duration (display text)</label>
                <Input value={form.duration} onChange={(e) => setForm((p) => ({ ...p, duration: e.target.value }))} placeholder="Jan 2024 – Present" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-foreground/70">Start Date</label>
                  <Input value={form.startDate} onChange={(e) => setForm((p) => ({ ...p, startDate: e.target.value }))} placeholder="2024-01" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-foreground/70">End Date</label>
                  <Input value={form.endDate} onChange={(e) => setForm((p) => ({ ...p, endDate: e.target.value }))} placeholder="Present" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-foreground/70">Responsibilities (one per line)</label>
                <Textarea rows={5} value={respInput} onChange={(e) => setRespInput(e.target.value)} placeholder="Did X...\nDid Y..." />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-foreground/70">Achievements (one per line)</label>
                <Textarea rows={4} value={achievInput} onChange={(e) => setAchievInput(e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-foreground/70">Logo path</label>
                  <Input value={form.logo ?? ""} onChange={(e) => setForm((p) => ({ ...p, logo: e.target.value }))} placeholder="/images/companies/logo.png" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-foreground/70">Order</label>
                  <Input type="number" value={form.order} onChange={(e) => setForm((p) => ({ ...p, order: parseInt(e.target.value) || 0 }))} />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <Button onClick={handleSave} disabled={saving} className="flex-1">
                  {saving ? <FaSpinner className="animate-spin mr-2" /> : null}
                  {saving ? "Saving…" : "Save"}
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
