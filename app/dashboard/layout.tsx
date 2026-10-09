import type { ReactNode } from "react";
import { DashboardStoreProvider } from "@/lib/store";
import { Sidebar } from "@/components/shell/Sidebar";
import { TopBar } from "@/components/shell/TopBar";
import { ToastContainer } from "@/components/dashboard/ui";
import { TraceDrawer } from "@/components/dashboard/TraceDrawer";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <DashboardStoreProvider>
      <div className="flex h-screen overflow-hidden bg-paper text-ink">
        {/* Accessible Skip Link */}
        <a
          href="#main-content"
          className="absolute left-4 top-4 z-50 -translate-y-16 rounded border border-hairline bg-paper-elevated px-4 py-2 font-mono text-[13px] text-ink transition-transform focus:translate-y-0"
        >
          Skip to Main Content
        </a>

        {/* Global Sidebar (Desktop persistent + Mobile off-canvas) */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <TopBar />

          <main
            id="main-content"
            className="flex-1 overflow-y-auto focus:outline-none"
            tabIndex={-1}
          >
            <div className="mx-auto w-full max-w-7xl px-4 py-6 md:px-8 lg:py-8">
              {children}
            </div>
          </main>
        </div>

        {/* Persistent Global Modals & Notifications */}
        <TraceDrawer />
        <ToastContainer />
      </div>
    </DashboardStoreProvider>
  );
}
