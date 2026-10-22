"use client";

import { useEffect, useState } from "react";
import { PanelLeft, X } from "lucide-react";

import Sidebar from "@/components/dashboard/Sidebar";
import TopBar from "@/components/dashboard/TopBar";
import { cn } from "@/lib/utils";

interface DashboardShellProps {
  children: React.ReactNode;
}

const DESKTOP_QUERY = "(min-width: 768px)";

export default function DashboardShell({ children }: DashboardShellProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    if (!isDrawerOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsDrawerOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isDrawerOpen]);

  const toggleSidebar = () => {
    if (window.matchMedia(DESKTOP_QUERY).matches) {
      setIsCollapsed((prev) => !prev);
    } else {
      setIsDrawerOpen((prev) => !prev);
    }
  };

  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <div className="flex h-screen bg-background text-foreground">
      <aside
        className={cn(
          "hidden shrink-0 overflow-hidden border-r border-border transition-[width] duration-200 md:block",
          isCollapsed ? "w-16" : "w-64",
        )}
      >
        <Sidebar collapsed={isCollapsed} />
      </aside>

      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={closeDrawer} aria-hidden />
          <aside
            role="dialog"
            aria-modal="true"
            aria-label="Sidebar"
            className="relative h-full w-72 max-w-[85vw] border-r border-border bg-background"
          >
            <button
              type="button"
              aria-label="Close sidebar"
              onClick={closeDrawer}
              className="absolute top-4 right-3 rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground"
            >
              <X className="size-4" />
            </button>
            <Sidebar onNavigate={closeDrawer} />
          </aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar
          sidebarToggle={
            <button
              type="button"
              aria-label="Toggle sidebar"
              onClick={toggleSidebar}
              className="rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-foreground"
            >
              <PanelLeft className="size-5" />
            </button>
          }
        />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
