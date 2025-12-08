import AppNav from "@/components/dashboard/app-nav";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getAuthUser } from "@/types/dal";
import { redirect } from "next/navigation";
import React from "react";

export default async function DashboardLayout({
  children,
}: React.PropsWithChildren) {
  const authUser = await getAuthUser();

  if (!authUser) redirect("/login");

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppNav />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
