import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Boxes, PlayCircle, History, ShieldCheck, Database } from "lucide-react";

const nav = [
  { to: "/", label: "Connectors", icon: Boxes, exact: true },
  { to: "/import", label: "Run import", icon: PlayCircle, exact: false },
  { to: "/runs", label: "Run history", icon: History, exact: false },
  { to: "/rules", label: "Validation rules", icon: ShieldCheck, exact: false },
] as const;

export function AppShell({
  title,
  subtitle,
  actions,
  children,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background">
      <aside className="hidden w-60 shrink-0 flex-col bg-shell text-shell-foreground md:flex">
        <div className="flex items-center gap-2 border-b border-sidebar-border px-5 py-5">
          <Database className="size-5 text-primary" />
          <div>
            <div className="text-sm font-semibold leading-tight">Import Console</div>
            <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-shell-muted">
              Users feature
            </div>
          </div>
        </div>
        <nav className="flex flex-1 flex-col gap-1 p-3">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.exact }}
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-shell-muted transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              activeProps={{
                className:
                  "bg-sidebar-accent text-sidebar-accent-foreground font-medium shadow-[inset_2px_0_0_0_var(--color-primary)]",
              }}
            >
              <item.icon className="size-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-sidebar-border px-5 py-4 text-[11px] leading-relaxed text-shell-muted">
          Simulated environment. Connector fetches return mock payloads.
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex flex-wrap items-end justify-between gap-4 border-b border-border bg-surface px-6 py-5">
          <div>
            <h1 className="text-xl font-semibold text-foreground">{title}</h1>
            {subtitle ? (
              <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{subtitle}</p>
            ) : null}
          </div>
          {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
        </header>
        <main className="min-w-0 flex-1 px-6 py-6">{children}</main>
      </div>
    </div>
  );
}
