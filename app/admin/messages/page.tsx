"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaEnvelope, FaEnvelopeOpen, FaTrash, FaSpinner } from "react-icons/fa";
import { cn } from "@/lib/utils";

interface Message {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selected, setSelected] = useState<Message | null>(null);
  const [loading, setLoading] = useState(true);

  const loadMessages = () => {
    setLoading(true);
    fetch("/api/admin/messages")
      .then((r) => r.json())
      .then((data) => { setMessages(data); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { loadMessages(); }, []);

  const markRead = async (id: number, read: boolean) => {
    await fetch(`/api/admin/messages/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ read }),
    });
    setMessages((prev) => prev.map((m) => m.id === id ? { ...m, read } : m));
    if (selected?.id === id) setSelected((prev) => prev ? { ...prev, read } : null);
  };

  const deleteMessage = async (id: number) => {
    if (!confirm("Delete this message?")) return;
    await fetch(`/api/admin/messages/${id}`, { method: "DELETE" });
    setMessages((prev) => prev.filter((m) => m.id !== id));
    if (selected?.id === id) setSelected(null);
  };

  const openMessage = (msg: Message) => {
    setSelected(msg);
    if (!msg.read) markRead(msg.id, true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl text-foreground">Messages</h1>
          <p className="font-label text-xs uppercase tracking-[0.2em] text-muted-foreground mt-2">
            {messages.filter((m) => !m.read).length} unread · {messages.length} total
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20 text-accent">
          <FaSpinner className="animate-spin text-2xl" />
        </div>
      ) : messages.length === 0 ? (
        <Card variant="terminal" terminalTitle="inbox" className="text-center py-16 pt-20">
          <p className="font-mono text-muted-foreground"><span className="text-accent-tertiary">$</span> inbox empty — no messages yet.</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Message list */}
          <div className="space-y-2">
            {messages.map((msg) => (
              <div
                key={msg.id}
                onClick={() => openMessage(msg)}
                className={cn(
                  "relative p-4 border bg-card cursor-pointer transition-all duration-150",
                  selected?.id === msg.id
                    ? "border-accent bg-accent/5 shadow-[inset_0_0_16px_rgba(0,255,136,0.08)]"
                    : "border-border hover:border-accent/50",
                  !msg.read && "border-l-2 border-l-accent-secondary"
                )}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 text-accent">
                    {msg.read ? <FaEnvelopeOpen /> : <FaEnvelope className="text-accent-secondary" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className={cn("text-sm font-medium truncate", !msg.read && "font-bold text-foreground")}>
                        {msg.name}
                      </span>
                      <span className="font-mono text-xs text-muted-foreground shrink-0">
                        {new Date(msg.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-xs text-accent-tertiary truncate">{msg.subject}</p>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">{msg.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Message detail */}
          {selected ? (
            <Card variant="terminal" terminalTitle="message.eml" className="sticky top-24 self-start">
              <CardContent>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-lg text-foreground">{selected.subject}</h2>
                    <p className="text-sm text-muted-foreground">
                      From: <strong>{selected.name}</strong> ({selected.email})
                    </p>
                    <p className="font-mono text-xs text-muted-foreground mt-0.5">
                      {new Date(selected.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => markRead(selected.id, !selected.read)}
                    >
                      {selected.read ? "Mark Unread" : "Mark Read"}
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => deleteMessage(selected.id)}
                    >
                      <FaTrash />
                    </Button>
                  </div>
                </div>
                <div className="bg-background border border-border p-4 font-mono text-sm text-foreground/90 whitespace-pre-wrap">
                  {selected.message}
                </div>
                <a
                  href={`mailto:${selected.email}?subject=Re: ${encodeURIComponent(selected.subject)}`}
                  className="mt-4 inline-flex items-center min-h-11 font-label text-sm uppercase tracking-[0.2em] text-accent hover:text-glow"
                >
                  Reply via email →
                </a>
              </CardContent>
            </Card>
          ) : (
            <Card variant="terminal" terminalTitle="message.eml" className="flex items-center justify-center py-16 pt-20">
              <p className="font-mono text-muted-foreground text-sm cyber-cursor">Select a message to read</p>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
