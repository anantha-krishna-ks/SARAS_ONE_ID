import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

import { AppShell } from "@/components/AppShell";
import { StatusPill } from "@/components/StatusPill";
import { Button } from "@/components/ui/button";
import { connectorById, formatDateTime } from "@/lib/import-data";
import { useRuns } from "@/lib/run-store";

export const Route = createFileRoute("/runs/")({
  head: () => ({
    meta: [
      { title: "Run history — User Import Console" },
      {
        name: "description",
        content:
          "Every connector invocation with record counts, success and failure totals, and links to per-record validation results.",
      },
      { property: "og:title", content: "Run history — User Import Console" },
      {
        property: "og:description",
        content: "Audit trail of on-demand user imports across all connectors.",
      },
    ],
  }),
  component: RunHistory,
});

function RunHistory() {
  const runs = useRuns();
  const [status, setStatus] = useState<"all" | "completed" | "partial" | "failed">("all");
  const shown = runs.filter((r) => status === "all" || r.status === status);

  return (
    <AppShell
      title="Run history"
      subtitle="Each row is one connector invocation. Open a run to see every fetched record with its validation outcome."
      actions={
        <Button asChild>
          <Link to="/import" search={{ connector: undefined }}>New import</Link>
        </Button>
      }
    >
      <div className="mb-3 flex flex-wrap gap-2">
        {(["all", "completed", "partial", "failed"] as const).map((s) => (
          <Button
            key={s}
            size="sm"
            variant={status === s ? "default" : "outline"}
            onClick={() => setStatus(s)}
          >
            {s === "all" ? "All runs" : s}
          </Button>
        ))}
      </div>

      <div className="panel overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-surface">
            <tr className="text-left">
              {[
                "Run",
                "Connector",
                "Started",
                "Duration",
                "Triggered by",
                "Records",
                "Imported",
                "Failed",
                "Status",
              ].map((h) => (
                <th key={h} className="label-caps whitespace-nowrap px-3 py-2">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {shown.map((r) => (
              <tr key={r.id} className="hover:bg-surface">
                <td className="px-3 py-2">
                  <Link
                    to="/runs/$runId"
                    params={{ runId: r.id }}
                    className="font-mono text-xs text-primary underline-offset-2 hover:underline"
                  >
                    {r.id}
                  </Link>
                </td>
                <td className="whitespace-nowrap px-3 py-2">
                  {connectorById(r.connectorId)?.name ?? r.connectorId}
                </td>
                <td className="whitespace-nowrap px-3 py-2 text-muted-foreground">
                  {formatDateTime(r.startedAt)}
                </td>
                <td className="px-3 py-2 font-mono text-xs">{(r.durationMs / 1000).toFixed(1)}s</td>
                <td className="whitespace-nowrap px-3 py-2 font-mono text-xs">{r.triggeredBy}</td>
                <td className="px-3 py-2 font-mono text-xs">{r.total}</td>
                <td className="px-3 py-2 font-mono text-xs text-success">{r.succeeded}</td>
                <td className="px-3 py-2 font-mono text-xs text-destructive">{r.failed}</td>
                <td className="px-3 py-2">
                  <StatusPill status={r.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}
