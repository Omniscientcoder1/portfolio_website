import type { ReactNode } from "react";
import { getAdminFromCookies } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";

export const metadata = { title: "Admin Panel" };

export default async function AdminLayout({ children }: { children: ReactNode }) {
  // Login page renders outside the panel layout
  return <>{children}</>;
}
