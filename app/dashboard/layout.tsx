import AppNav from "@/components/shared/dashboard/app-nav";
import { AppSidebar } from "@/components/shared/dashboard/app-sidebar";
import { Footer } from "@/components/shared/footer/footer";
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
        <Footer />
      </SidebarInset>
    </SidebarProvider>
  );
}
