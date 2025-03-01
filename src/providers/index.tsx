"use client";

import { SidebarProvider } from "@/components/Layouts/sidebar/sidebar-context";
import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
          <ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark">
            <SidebarProvider defaultOpen={true}>
            {children}
            </SidebarProvider>
          </ThemeProvider>
  );
}
