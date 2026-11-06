import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowUpRight, FileSpreadsheet, Building2, Chrome, Search } from "lucide-react";

import { AppShell } from "@/components/AppShell";
import { StatusPill, KindTag } from "@/components/StatusPill";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { connectors, KIND_LABEL, formatDateTime, type ConnectorKind } from "@/lib/import-data";
import { useRuns } from "@/lib/run-store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Connector Catalog — User Import Console" },
      {
        name: "description",
        content:
          "Master list of user-import connectors for Excel, Microsoft Entra ID and Google Workspace, with status, field mapping and run health.",
      },
      { property: "og:title", content: "Connector Catalog — User Import Console" },
      {
        property: "og:description",
        content:
          "Browse and run data-import connectors for the Users feature across Excel, Entra ID and Google Workspace.",
      },
    ],
  }),
  component: CatalogPage,
});

export const kindIcon: Record<ConnectorKind, typeof FileSpreadsheet> = {
  excel: FileSpreadsheet,
  entra: Building2,
  google: Chrome,
};

function CatalogPage() {
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState<"all" | ConnectorKind>("all");
  const runs = useRuns();

  const filtered = useMemo(
    () =>
      connectors.filter(
        (c) =>
          (kind === "all" || c.kind === kind) &&
          (c.name.toLowerCase().includes(query.toLowerCase()) ||
            c.feature.toLowerCase().includes(query.toLowerCase())),
      ),
    [query, kind],
  );

  const stats = [
    { label: "Connectors", value: connectors.length },
    { label: "Active", value: connectors.filter((c) => c.status === "active").length },
    { label: "Runs logged", value: runs.length },
    {
      label: "Records last 30d",
      value: runs.reduce((a, r) => a + r.total, 0),
    },
  ];

  return (
    <AppShell
      title="Connector catalog"
      subtitle="Every connector imports data for one feature from one source application. Pick a connector to inspect its configuration, or start an on-demand run."
      actions={
        <Button asChild>
          <Link to="/import" search={{ connector: undefined }}>Run import</Link>
        </Button>
      }
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="panel px-4 py-3">
            <div className="label-caps">{s.label}</div>
            <div className="mt-1 font-mono text-2xl text-foreground">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <div className="relative w-full max-w-xs">
          <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search connectors"
            className="pl-8"
          />
        </div>
        {(["all", "excel", "entra", "google"] as const).map((k) => (
          <Button
            key={k}
            size="sm"
            variant={kind === k ? "default" : "outline"}
            onClick={() => setKind(k)}
          >
            {k === "all" ? "All sources" : KIND_LABEL[k]}
          </Button>
        ))}
      </div>

      <div className="mt-4 grid gap-3 lg:grid-cols-2">
        {filtered.map((c) => {
          const Icon = kindIcon[c.kind];
          return (
            <Link
              key={c.id}
              to="/connectors/$connectorId"
              params={{ connectorId: c.id }}
              className="panel group flex flex-col gap-3 p-4 transition-colors hover:border-primary/50"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="rounded-md bg-accent p-2 text-accent-foreground">
                    <Icon className="size-4" />
                  </span>
                  <div>
                    <div className="flex items-center gap-2 font-medium text-foreground">
                      {c.name}
                      <ArrowUpRight className="size-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-1.5">
                      <KindTag label={KIND_LABEL[c.kind]} />
                      <KindTag label={`Feature: ${c.feature}`} />
                    </div>
                  </div>
                </div>
                <StatusPill status={c.status} />
              </div>
              <p className="text-sm text-muted-foreground">{c.description}</p>
              <div className="mt-auto grid grid-cols-3 gap-2 border-t border-border pt-3 text-xs">
                <div>
                  <div className="label-caps">Last run</div>
                  <div className="mt-0.5 font-mono">
                    {c.lastRunAt ? formatDateTime(c.lastRunAt) : "Never"}
                  </div>
                </div>
                <div>
                  <div className="label-caps">Avg records</div>
                  <div className="mt-0.5 font-mono">{c.avgRecords}</div>
                </div>
                <div>
                  <div className="label-caps">Success rate</div>
                  <div className="mt-0.5 font-mono">
                    {c.successRate ? `${Math.round(c.successRate * 100)}%` : "—"}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </AppShell>
  );
}
