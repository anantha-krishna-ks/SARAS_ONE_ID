import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Download, RefreshCw } from "lucide-react";
import { toast } from "sonner";

import { AppShell } from "@/components/AppShell";
import { StatusPill, KindTag } from "@/components/StatusPill";
import { Button } from "@/components/ui/button";
import { RecordTable } from "./import";
import { connectorById, formatDateTime, validationRules } from "@/lib/import-data";
import { useRun } from "@/lib/run-store";

export const Route = createFileRoute("/runs/$runId")({
  head: ({ params }) => ({
    meta: [
      { title: `Run ${params.runId} — validation results` },
      {
        name: "description",
        content: `Per-record import results for run ${params.runId}, including failure reasons from schema and business-rule validation.`,
      },
      { property: "og:title", content: `Run ${params.runId} — validation results` },
      {
        property: "og:description",
        content: `Record-level success and failure breakdown for import run ${params.runId}.`,
      },
    ],
  }),
  component: RunDetail,
});

function RunDetail() {
  const { runId } = Route.useParams();
  const run = useRun(runId);

  if (!run) {
    return (
      <AppShell title="Run not found" subtitle={`No import run with id ${runId}.`}>
        <Button asChild variant="outline">
          <Link to="/runs">Back to run history</Link>
        </Button>
      </AppShell>
    );
  }

  const connector = connectorById(run.connectorId);
  const breakdown = validationRules
    .map((rule) => ({
      rule,
      count: run.records.filter((r) => r.issues.some((i) => i.ruleId === rule.id)).length,
    }))
    .filter((b) => b.count > 0)
    .sort((a, b) => b.count - a.count);

  return (
    <AppShell
      title={`Run ${run.id}`}
      subtitle={`${connector?.name ?? run.connectorId} · started ${formatDateTime(run.startedAt)} by ${run.triggeredBy}`}
      actions={
        <>
          <Button variant="outline" asChild>
            <Link to="/runs">
              <ArrowLeft className="size-4" /> History
            </Link>
          </Button>
          <Button
            variant="outline"
            onClick={() => toast.success("Failure report exported (simulated).")}
          >
            <Download className="size-4" /> Export failures
          </Button>
          <Button asChild>
            <Link to="/import" search={{ connector: run.connectorId }}>
              <RefreshCw className="size-4" /> Re-import
            </Link>
          </Button>
        </>
      }
    >
      <div className="flex flex-wrap items-center gap-2">
        <StatusPill status={run.status} />
        <KindTag label={`Duration ${(run.durationMs / 1000).toFixed(1)}s`} />
        <KindTag label="Partial commit policy" />
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-4">
        {[
          { label: "Records fetched", value: run.total },
          { label: "Imported", value: run.succeeded },
          { label: "Imported with warnings", value: run.warnings },
          { label: "Rejected", value: run.failed },
        ].map((s) => (
          <div key={s.label} className="panel px-4 py-3">
            <div className="label-caps">{s.label}</div>
            <div className="mt-1 font-mono text-2xl">{s.value}</div>
          </div>
        ))}
      </div>

      {breakdown.length > 0 && (
        <div className="panel mt-4 p-4">
          <div className="label-caps">Failure reasons by rule</div>
          <div className="mt-3 space-y-2">
            {breakdown.map(({ rule, count }) => (
              <div key={rule.id} className="flex items-center gap-3">
                <span className="w-14 font-mono text-xs text-muted-foreground">{rule.id}</span>
                <span className="w-64 shrink-0 truncate text-sm">{rule.name}</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                  <div
                    className={
                      rule.severity === "error"
                        ? "h-full rounded-full bg-destructive"
                        : "h-full rounded-full bg-warning"
                    }
                    style={{ width: `${Math.round((count / run.total) * 100)}%` }}
                  />
                </div>
                <span className="w-10 text-right font-mono text-xs">{count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-5">
        <RecordTable records={run.records} />
      </div>
    </AppShell>
  );
}
