"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  FaEnvelope, FaUser, FaPaperPlane, FaMapMarkerAlt,
  FaClock, FaCheck, FaCopy, FaGithub, FaLinkedin, FaTwitter,
} from "react-icons/fa";

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

const CONTACT_EMAIL = "tahmid8017@gmail.com";

const SOCIAL_LINKS = [
  { icon: FaGithub, label: "GitHub", href: "https://github.com/tahmidurrahman" },
  { icon: FaLinkedin, label: "LinkedIn", href: "https://linkedin.com/in/tahmidurrahman" },
  { icon: FaTwitter, label: "Twitter", href: "https://twitter.com/tahmidurrahman" },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<Fields, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<Fields, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

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

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: do nothing silently
    }
  };

  return (
    <div className="min-h-screen px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Get In Touch</h1>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            Have a project in mind or want to collaborate? I&apos;d love to hear from you!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
          {/* Left — Contact info sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="md:col-span-2 space-y-4"
          >
            {/* Copy email */}
            <button
              onClick={copyEmail}
              className="group flex items-center gap-4 w-full p-4 rounded-2xl glass-strong border border-blue-400/20 hover:border-blue-400/50 transition-all text-left"
              data-cursor-hover
            >
              <div className="p-2.5 rounded-xl bg-blue-500/15 text-blue-400 shrink-0">
                <FaEnvelope className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-foreground/50 mb-0.5">Email</p>
                <p className="text-sm font-medium truncate">{CONTACT_EMAIL}</p>
              </div>
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.div
                    key="check"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="text-green-400 shrink-0"
                  >
                    <FaCheck className="w-4 h-4" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="copy"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="text-foreground/30 group-hover:text-blue-400 transition-colors shrink-0"
                  >
                    <FaCopy className="w-4 h-4" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            {/* Location */}
            <div className="flex items-center gap-4 p-4 rounded-2xl glass-strong border border-blue-400/20">
              <div className="p-2.5 rounded-xl bg-blue-500/15 text-blue-400 shrink-0">
                <FaMapMarkerAlt className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-foreground/50 mb-0.5">Location</p>
                <p className="text-sm font-medium">Dhaka, Bangladesh</p>
              </div>
            </div>

            {/* Response time */}
            <div className="flex items-center gap-4 p-4 rounded-2xl glass-strong border border-blue-400/20">
              <div className="p-2.5 rounded-xl bg-blue-500/15 text-blue-400 shrink-0">
                <FaClock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-foreground/50 mb-0.5">Response Time</p>
                <p className="text-sm font-medium">Within 24–48 hours</p>
              </div>
            </div>

            {/* Social links */}
            <div className="p-4 rounded-2xl glass-strong border border-blue-400/20">
              <p className="text-xs text-foreground/50 mb-3">Find me on</p>
              <div className="flex flex-col gap-2">
                {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-foreground/60 hover:text-blue-400 transition-colors text-sm"
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-3"
          >
            <Card className="glass-strong">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <FaEnvelope className="text-primary" />
                  Send Me a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Name
                    </label>
                    <div className="relative">
                      <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/40" />
                      <Input
                        id="name"
                        type="text"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        onBlur={() => handleBlur("name")}
                        maxLength={80}
                        className={`pl-10 glass ${errors.name && touched.name ? "border-red-500/60" : ""}`}
                        aria-describedby={errors.name ? "name-error" : undefined}
                      />
                    </div>
                    {touched.name && errors.name && (
                      <p id="name-error" className="mt-1.5 text-xs text-red-400">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/40" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        onBlur={() => handleBlur("email")}
                        maxLength={254}
                        className={`pl-10 glass ${errors.email && touched.email ? "border-red-500/60" : ""}`}
                        aria-describedby={errors.email ? "email-error" : undefined}
                      />
                    </div>
                    {touched.email && errors.email && (
                      <p id="email-error" className="mt-1.5 text-xs text-red-400">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      type="text"
                      placeholder="What's this about?"
                      value={formData.subject}
                      onChange={(e) => handleChange("subject", e.target.value)}
                      onBlur={() => handleBlur("subject")}
                      maxLength={120}
                      className={`glass ${errors.subject && touched.subject ? "border-red-500/60" : ""}`}
                      aria-describedby={errors.subject ? "subject-error" : undefined}
                    />
                    {touched.subject && errors.subject && (
                      <p id="subject-error" className="mt-1.5 text-xs text-red-400">{errors.subject}</p>
                    )}
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label htmlFor="message" className="block text-sm font-medium">
                        Message
                      </label>
                      <span className={`text-xs ${
                        formData.message.length > 2800 ? "text-red-400" :
                        formData.message.length > 2000 ? "text-yellow-400" :
                        "text-foreground/40"
                      }`}>
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
                      className={`glass min-h-[150px] ${errors.message && touched.message ? "border-red-500/60" : ""}`}
                      aria-describedby={errors.message ? "message-error" : undefined}
                    />
                    {touched.message && errors.message && (
                      <p id="message-error" className="mt-1.5 text-xs text-red-400">{errors.message}</p>
                    )}
                  </div>

                  {message && (
                    <div
                      className={`p-4 rounded-lg ${
                        status === "success"
                          ? "bg-green-500/10 text-green-600 dark:text-green-400"
                          : "bg-red-500/10 text-red-600 dark:text-red-400"
                      }`}
                    >
                      {message}
                    </div>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-shadow"
                    disabled={status === "loading"}
                  >
                    {status === "loading" ? (
                      "Sending..."
                    ) : (
                      <>
                        <FaPaperPlane className="mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
