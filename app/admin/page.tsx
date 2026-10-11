"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IconBox } from "@/components/ui/IconBox";
import { GlitchText } from "@/components/ui/GlitchText";
import { FaLock, FaUser } from "react-icons/fa";

export default function AdminLoginPage() {
  const router = useRouter();
  const [creds, setCreds] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(creds),
      });
      if (res.ok) {
        router.push("/admin/dashboard");
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Login failed.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div aria-hidden className="absolute inset-0 cyber-grid [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)]" />
      <div className="relative w-full max-w-md cyber-glow-wrap">
        <Card variant="terminal" terminalTitle="ssh root@portfolio" className="w-full">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4">
              <IconBox size="lg">
                <FaLock />
              </IconBox>
            </div>
            <CardTitle className="text-2xl">
              <GlitchText text="Admin Panel" />
            </CardTitle>
            <p className="font-label text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Authenticate to manage your portfolio
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="admin-username" className="sr-only">Username</label>
                <Input
                  id="admin-username"
                  promptSymbol={<FaUser className="size-3" />}
                  placeholder="Username"
                  value={creds.username}
                  onChange={(e) => setCreds((p) => ({ ...p, username: e.target.value }))}
                  autoComplete="username"
                  required
                />
              </div>
              <div>
                <label htmlFor="admin-password" className="sr-only">Password</label>
                <Input
                  id="admin-password"
                  type="password"
                  promptSymbol={<FaLock className="size-3" />}
                  placeholder="Password"
                  value={creds.password}
                  onChange={(e) => setCreds((p) => ({ ...p, password: e.target.value }))}
                  autoComplete="current-password"
                  required
                />
              </div>
              {error && (
                <p role="alert" className="font-mono text-sm text-destructive bg-destructive/10 border-l-2 border-destructive px-3 py-2">
                  <span aria-hidden>[ACCESS DENIED] </span>{error}
                </p>
              )}
              <Button type="submit" variant="glitch" className="w-full" disabled={loading}>
                {loading ? "Authenticating…" : "Sign In"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
