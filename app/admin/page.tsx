"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md glass-strong">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
            <FaLock className="text-primary text-2xl" />
          </div>
          <CardTitle className="text-2xl">Admin Panel</CardTitle>
          <p className="text-sm text-foreground/60">Sign in to manage your portfolio</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40 text-sm" />
              <Input
                placeholder="Username"
                className="pl-9"
                value={creds.username}
                onChange={(e) => setCreds((p) => ({ ...p, username: e.target.value }))}
                autoComplete="username"
                required
              />
            </div>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40 text-sm" />
              <Input
                type="password"
                placeholder="Password"
                className="pl-9"
                value={creds.password}
                onChange={(e) => setCreds((p) => ({ ...p, password: e.target.value }))}
                autoComplete="current-password"
                required
              />
            </div>
            {error && (
              <p className="text-sm text-red-500 bg-red-500/10 rounded px-3 py-2">{error}</p>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in…" : "Sign In"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
