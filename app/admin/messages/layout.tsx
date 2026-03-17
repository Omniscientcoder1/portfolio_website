import { getAdminFromCookies } from "@/lib/auth";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminSectionLayout({ children }: { children: ReactNode }) {
  const admin = await getAdminFromCookies();
  if (!admin) redirect("/admin");
  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  );
}
