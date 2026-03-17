"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdminTable from "@/components/admin/AdminTable";
import { FaPlus, FaSpinner } from "react-icons/fa";

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  techStack: string[];
  githubLink: string;
  liveLink: string;
  imageUrl: string;
  featured: boolean;
  slug: string;
  status: string;
  order: number;
}

const empty: Omit<Project, "id"> = {
  title: "", description: "", longDescription: "", techStack: [],
  githubLink: "", liveLink: "", imageUrl: "", featured: false,
  slug: "", status: "completed", order: 0,
};

export default function ProjectsAdminPage() {
  const [items, setItems] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState<Omit<Project, "id">>(empty);
  const [saving, setSaving] = useState(false);
  const [techInput, setTechInput] = useState("");

  const load = () => {
    setLoading(true);
    fetch("/api/admin/projects")
      .then((r) => r.json())
      .then((d) => { setItems(d); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openNew = () => {
    setEditing({ id: "" } as Project);
    setForm(empty);
    setTechInput("");
  };

  const openEdit = (item: Project) => {
    setEditing(item);
    setForm({ ...item });
    setTechInput(item.techStack.join(", "));
  };

  const closeForm = () => { setEditing(null); };

  const handleSave = async () => {
    setSaving(true);
    const payload = { ...form, techStack: techInput.split(",").map((s) => s.trim()).filter(Boolean) };
    const isNew = !editing?.id;
    const url = isNew ? "/api/admin/projects" : `/api/admin/projects/${editing?.id}`;
    const method = isNew ? "POST" : "PUT";
    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) { load(); closeForm(); }
    } finally { setSaving(false); }
  };

  const handleDelete = async (item: Project) => {
    if (!confirm(`Delete "${item.title}"?`)) return;
    await fetch(`/api/admin/projects/${item.id}`, { method: "DELETE" });
    load();
  };

  const columns = [
    { key: "title", label: "Title" },
    { key: "status", label: "Status" },
    { key: "featured", label: "Featured", render: (p: Project) => p.featured ? "✅" : "—" },
    { key: "slug", label: "Slug" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-foreground/60 mt-1">{items.length} total</p>
        </div>
        <Button onClick={openNew}><FaPlus className="mr-2" /> Add Project</Button>
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
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={(e) => e.target === e.currentTarget && closeForm()}>
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto glass-strong">
            <CardHeader>
              <CardTitle>{editing.id ? "Edit Project" : "New Project"}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-foreground/70">Title *</label>
                  <Input value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} placeholder="Project title" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-foreground/70">Slug *</label>
                  <Input value={form.slug} onChange={(e) => setForm((p) => ({ ...p, slug: e.target.value }))} placeholder="my-project-slug" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-foreground/70">Short Description *</label>
                <Textarea value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} rows={2} />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-foreground/70">Long Description</label>
                <Textarea value={form.longDescription} onChange={(e) => setForm((p) => ({ ...p, longDescription: e.target.value }))} rows={4} />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-foreground/70">Tech Stack (comma-separated)</label>
                <Input value={techInput} onChange={(e) => setTechInput(e.target.value)} placeholder="React, Next.js, TypeScript" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-foreground/70">GitHub Link</label>
                  <Input value={form.githubLink ?? ""} onChange={(e) => setForm((p) => ({ ...p, githubLink: e.target.value }))} placeholder="https://github.com/..." />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-foreground/70">Live Link</label>
                  <Input value={form.liveLink ?? ""} onChange={(e) => setForm((p) => ({ ...p, liveLink: e.target.value }))} placeholder="https://..." />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-foreground/70">Image URL</label>
                  <Input value={form.imageUrl} onChange={(e) => setForm((p) => ({ ...p, imageUrl: e.target.value }))} placeholder="/images/projects/..." />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-foreground/70">Status</label>
                  <select
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                    value={form.status}
                    onChange={(e) => setForm((p) => ({ ...p, status: e.target.value }))}
                  >
                    <option value="live">Live</option>
                    <option value="in-development">In Development</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-foreground/70">Order</label>
                  <Input type="number" value={form.order} onChange={(e) => setForm((p) => ({ ...p, order: parseInt(e.target.value) || 0 }))} />
                </div>
                <div className="flex items-center gap-2 pt-5">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={form.featured}
                    onChange={(e) => setForm((p) => ({ ...p, featured: e.target.checked }))}
                    className="w-4 h-4"
                  />
                  <label htmlFor="featured" className="text-sm">Featured on homepage</label>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <Button onClick={handleSave} disabled={saving} className="flex-1">
                  {saving ? <FaSpinner className="animate-spin mr-2" /> : null}
                  {saving ? "Saving…" : "Save Project"}
                </Button>
                <Button variant="outline" onClick={closeForm}>Cancel</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
