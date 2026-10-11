"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Send, Mail, ShieldCheck, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { IconBox } from "@/components/ui/IconBox";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

const labelClasses = "block font-label text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 font-mono text-xs text-destructive">
      <span aria-hidden>[!] </span>
      {message}
    </p>
  );
}

const EMAIL_REGEX = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;

type Fields = "name" | "email" | "subject" | "message";

function validateField(field: Fields, value: string): string {
  const v = value.trim();
  switch (field) {
    case "name":
      if (!v) return "Name is required.";
      if (v.length < 2) return "Name must be at least 2 characters.";
      if (v.length > 80) return "Name must be 80 characters or fewer.";
      if (!/^[\p{L}\s'\-.]+$/u.test(v)) return "Name contains invalid characters.";
      return "";
    case "email":
      if (!v) return "Email is required.";
      if (v.length > 254) return "Email is too long.";
      if (!EMAIL_REGEX.test(v)) return "Please enter a valid email address.";
      return "";
    case "subject":
      if (!v) return "Subject is required.";
      if (v.length < 3) return "Subject must be at least 3 characters.";
      if (v.length > 120) return "Subject must be 120 characters or fewer.";
      return "";
    case "message":
      if (!v) return "Message is required.";
      if (v.length < 20) return "Message must be at least 20 characters.";
      if (v.length > 3000) return "Message must be 3000 characters or fewer.";
      return "";
  }
}

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<Fields, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<Fields, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleChange = (field: Fields, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }));
    }
  };

  const handleBlur = (field: Fields) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: validateField(field, formData[field]) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fields: Fields[] = ["name", "email", "subject", "message"];
    const newErrors: Partial<Record<Fields, string>> = {};
    let hasError = false;
    for (const f of fields) {
      const err = validateField(f, formData[f]);
      if (err) { newErrors[f] = err; hasError = true; }
    }
    setTouched({ name: true, email: true, subject: true, message: true });
    setErrors(newErrors);
    if (hasError) return;

    setStatus("loading");
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setStatus("success");
        setMessage("Thank you for your message! I'll get back to you soon.");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTouched({});
        setErrors({});
      } else {
        const data = await response.json().catch(() => ({}));
        setStatus("error");
        setMessage(data?.error ?? "Failed to send message. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please check your connection and try again.");
    }
  };

  const invalid = (f: Fields) => Boolean(touched[f] && errors[f]);

  return (
    <div className="relative min-h-screen px-4 sm:px-6 py-16 md:py-24">
      <div aria-hidden className="absolute inset-x-0 top-0 h-96 cyber-grid [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="relative max-w-6xl mx-auto">
        <SectionHeading
          as="h1"
          label="~/contact"
          title="Get In Touch"
          description="Have a project in mind or want to collaborate? I'd love to hear from you!"
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Side panel */}
          <motion.aside
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            <Card variant="holographic" className="px-6 gap-5">
              <div className="flex items-center gap-4">
                <IconBox size="lg" tone="tertiary">
                  <ShieldCheck strokeWidth={1.5} />
                </IconBox>
                <div>
                  <p className="font-heading uppercase tracking-wide text-foreground">Secure channel</p>
                  <p className="font-label text-xs uppercase tracking-[0.2em] text-accent">Status: open</p>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Messages are delivered straight to my inbox. Fill out every field and I&apos;ll get back to you soon.
              </p>
            </Card>

            <div className="font-mono text-xs text-muted-foreground space-y-1.5 hidden lg:block" aria-hidden>
              <p><span className="text-accent">✓</span> handshake established</p>
              <p><span className="text-accent">✓</span> input validation armed</p>
              <p><span className="text-accent-secondary">…</span> <span className="cyber-cursor">awaiting transmission</span></p>
            </div>
          </motion.aside>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <Card variant="terminal" terminalTitle="compose_message.sh" className="px-6 md:px-8">
              <h2 className="text-xl text-foreground flex items-center gap-3">
                <Mail className="size-5 text-accent" strokeWidth={1.5} aria-hidden />
                Send Me a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className={labelClasses}>Name</label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      onBlur={() => handleBlur("name")}
                      maxLength={80}
                      autoComplete="name"
                      aria-invalid={invalid("name")}
                      aria-describedby={errors.name ? "name-error" : undefined}
                    />
                    <FieldError id="name-error" message={touched.name ? errors.name : undefined} />
                  </div>

                  <div>
                    <label htmlFor="email" className={labelClasses}>Email</label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      onBlur={() => handleBlur("email")}
                      maxLength={254}
                      autoComplete="email"
                      aria-invalid={invalid("email")}
                      aria-describedby={errors.email ? "email-error" : undefined}
                    />
                    <FieldError id="email-error" message={touched.email ? errors.email : undefined} />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className={labelClasses}>Subject</label>
                  <Input
                    id="subject"
                    type="text"
                    placeholder="What's this about?"
                    value={formData.subject}
                    onChange={(e) => handleChange("subject", e.target.value)}
                    onBlur={() => handleBlur("subject")}
                    maxLength={120}
                    aria-invalid={invalid("subject")}
                    aria-describedby={errors.subject ? "subject-error" : undefined}
                  />
                  <FieldError id="subject-error" message={touched.subject ? errors.subject : undefined} />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="message" className={cn(labelClasses, "mb-0")}>Message</label>
                    <span
                      className={cn(
                        "font-mono text-xs",
                        formData.message.length > 2800
                          ? "text-destructive"
                          : formData.message.length > 2000
                            ? "text-warning"
                            : "text-muted-foreground"
                      )}
                    >
                      {formData.message.length}/3000
                    </span>
                  </div>
                  <Textarea
                    id="message"
                    placeholder="Your message..."
                    value={formData.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    onBlur={() => handleBlur("message")}
                    maxLength={3000}
                    className="min-h-[160px]"
                    aria-invalid={invalid("message")}
                    aria-describedby={errors.message ? "message-error" : undefined}
                  />
                  <FieldError id="message-error" message={touched.message ? errors.message : undefined} />
                </div>

                {message && (
                  <div
                    role={status === "success" ? "status" : "alert"}
                    className={cn(
                      "font-mono text-sm px-4 py-3 border-l-2",
                      status === "success"
                        ? "border-accent bg-accent/10 text-accent"
                        : "border-destructive bg-destructive/10 text-destructive"
                    )}
                  >
                    <span aria-hidden>{status === "success" ? "[OK] " : "[ERR] "}</span>
                    {message}
                  </div>
                )}

                <Button type="submit" size="lg" variant="glitch" className="w-full" disabled={status === "loading"}>
                  {status === "loading" ? (
                    <>
                      <Loader2 className="animate-spin" strokeWidth={1.5} />
                      Transmitting...
                    </>
                  ) : (
                    <>
                      <Send strokeWidth={1.5} />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
