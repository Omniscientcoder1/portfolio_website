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
          <h1 className="text-3xl font-bold">Messages</h1>
          <p className="text-foreground/60 mt-1">
            {messages.filter((m) => !m.read).length} unread · {messages.length} total
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20 text-foreground/40">
          <FaSpinner className="animate-spin text-2xl" />
        </div>
      ) : messages.length === 0 ? (
        <Card className="glass text-center py-16">
          <p className="text-foreground/50">No messages yet.</p>
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
                  "p-4 rounded-xl border cursor-pointer transition-all",
                  selected?.id === msg.id
                    ? "border-primary bg-primary/5"
                    : "border-border bg-card hover:border-primary/50",
                  !msg.read && "border-l-4 border-l-blue-500"
                )}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 text-foreground/40">
                    {msg.read ? <FaEnvelopeOpen /> : <FaEnvelope className="text-blue-500" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className={cn("text-sm font-medium truncate", !msg.read && "font-semibold")}>
                        {msg.name}
                      </span>
                      <span className="text-xs text-foreground/40 shrink-0">
                        {new Date(msg.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-xs text-foreground/60 truncate">{msg.subject}</p>
                    <p className="text-xs text-foreground/40 truncate mt-0.5">{msg.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Message detail */}
          {selected ? (
            <Card className="glass sticky top-4 self-start">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-semibold">{selected.subject}</h2>
                    <p className="text-sm text-foreground/60">
                      From: <strong>{selected.name}</strong> ({selected.email})
                    </p>
                    <p className="text-xs text-foreground/40 mt-0.5">
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
                      variant="outline"
                      className="text-red-500 hover:bg-red-500/10 border-red-500/30"
                      onClick={() => deleteMessage(selected.id)}
                    >
                      <FaTrash />
                    </Button>
                  </div>
                </div>
                <div className="bg-foreground/5 rounded-lg p-4 text-sm whitespace-pre-wrap">
                  {selected.message}
                </div>
                <a
                  href={`mailto:${selected.email}?subject=Re: ${encodeURIComponent(selected.subject)}`}
                  className="mt-4 inline-block text-sm text-primary hover:underline"
                >
                  Reply via email →
                </a>
              </CardContent>
            </Card>
          ) : (
            <Card className="glass flex items-center justify-center py-16">
              <p className="text-foreground/40 text-sm">Select a message to read</p>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
