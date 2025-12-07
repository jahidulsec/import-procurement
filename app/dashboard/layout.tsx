import AppNav from "@/components/dashboard/app-nav";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

export default function DashboardLayout({ children }: React.PropsWithChildren) {
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
