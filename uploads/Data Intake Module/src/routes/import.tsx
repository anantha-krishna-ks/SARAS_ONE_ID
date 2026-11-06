import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Loader2, Play } from "lucide-react";
import { toast } from "sonner";

import { AppShell } from "@/components/AppShell";
import { StatusPill, KindTag } from "@/components/StatusPill";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import {
  connectors,
  connectorById,
  generateRecords,
  summarize,
  KIND_LABEL,
  type ImportRecord,
  type ImportRun,
} from "@/lib/import-data";
import { addRun, nextRunId } from "@/lib/run-store";

export const Route = createFileRoute("/import")({
  validateSearch: (search: Record<string, unknown>) => ({
    connector: typeof search["connector"] === "string" ? (search["connector"] as string) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Run an import — User Import Console" },
      {
        name: "description",
        content:
          "Invoke a connector on demand, fetch source records, review schema and business-rule validation, then commit the valid rows.",
      },
      { property: "og:title", content: "Run an import — User Import Console" },
      {
        property: "og:description",
        content:
          "Four-step import wizard: choose a connector, fetch records, review validation results, commit valid rows.",
      },
    ],
  }),
  component: ImportWizard,
});

const steps = ["Choose connector", "Fetch data", "Review validation", "Commit"] as const;

function ImportWizard() {
  const preselected = Route.useSearch().connector;
  const navigate = useNavigate();
  const [step, setStep] = useState(preselected ? 1 : 0);
  const [selected, setSelected] = useState<string | undefined>(preselected);
  const [fetching, setFetching] = useState(false);
  const [progress, setProgress] = useState(0);
  const [records, setRecords] = useState<ImportRecord[] | null>(null);
  const [committed, setCommitted] = useState<ImportRun | null>(null);

  const connector = selected ? connectorById(selected) : undefined;
  const summary = records ? summarize(records) : null;

  function runFetch() {
    if (!connector) return;
    setFetching(true);
    setProgress(8);
    const count = 40 + (connector.name.length % 5) * 6;
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(timer);
          return 100;
        }
        return p + 12;
      });
    }, 160);
    setTimeout(() => {
      clearInterval(timer);
      setProgress(100);
      setRecords(generateRecords(connector, count, connector.name.length * 3));
      setFetching(false);
      setStep(2);
    }, 1500);
  }

  function commit() {
    if (!connector || !records || !summary) return;
    const run: ImportRun = {
      id: nextRunId(),
      connectorId: connector.id,
      startedAt: new Date().toISOString(),
      durationMs: 1500 + records.length * 22,
      triggeredBy: "you@acme.com",
      status: summary.failed > 0 ? "partial" : "completed",
      records,
      ...summary,
    };
    addRun(run);
    setCommitted(run);
    setStep(3);
    toast.success(
      `${summary.succeeded} of ${summary.total} records imported. ${summary.failed} rejected.`,
    );
  }

  return (
    <AppShell
      title="Run import"
      subtitle="Connectors are invoked on demand. Records are validated against schema and business rules before anything is committed; valid rows commit and failures are returned for correction."
    >
      <ol className="panel flex flex-wrap divide-x divide-border">
        {steps.map((label, i) => (
          <li
            key={label}
            className={cn(
              "flex flex-1 items-center gap-2 px-4 py-3 text-sm",
              i === step ? "bg-surface font-medium text-foreground" : "text-muted-foreground",
            )}
          >
            <span
              className={cn(
                "flex size-5 items-center justify-center rounded-full border font-mono text-[11px]",
                i < step
                  ? "border-success bg-success text-success-foreground"
                  : i === step
                    ? "border-primary text-primary"
                    : "border-border",
              )}
            >
              {i < step ? <Check className="size-3" /> : i + 1}
            </span>
            {label}
          </li>
        ))}
      </ol>

      {/* Step 1 */}
      {step === 0 && (
        <div className="mt-6 grid gap-3 lg:grid-cols-2">
          {connectors.map((c) => (
            <button
              key={c.id}
              type="button"
              disabled={c.status !== "active"}
              onClick={() => {
                setSelected(c.id);
                setStep(1);
              }}
              className={cn(
                "panel p-4 text-left transition-colors hover:border-primary/60",
                c.status !== "active" && "opacity-55",
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-medium">{c.name}</span>
                <StatusPill status={c.status} />
              </div>
              <div className="mt-2 flex gap-1.5">
                <KindTag label={KIND_LABEL[c.kind]} />
                <KindTag label={`Feature: ${c.feature}`} />
              </div>
              {c.status !== "active" && (
                <p className="mt-2 text-xs text-muted-foreground">
                  Not runnable: connector is {c.status}.
                </p>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Step 2 */}
      {step === 1 && connector && (
        <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_320px]">
          <div className="panel p-5">
            <div className="label-caps">Ready to invoke</div>
            <h2 className="mt-1 text-lg font-semibold">{connector.name}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{connector.description}</p>
            <Progress value={progress} className="mt-5" />
            <div className="mt-2 font-mono text-xs text-muted-foreground">
              {fetching
                ? `Fetching from ${KIND_LABEL[connector.kind]}…`
                : "Idle — no request sent yet."}
            </div>
            <div className="mt-5 flex gap-2">
              <Button onClick={runFetch} disabled={fetching}>
                {fetching ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Play className="size-4" />
                )}
                Execute operation
              </Button>
              <Button variant="outline" onClick={() => setStep(0)} disabled={fetching}>
                Change connector
              </Button>
            </div>
          </div>
          <div className="panel p-4">
            <div className="label-caps">Field mapping in effect</div>
            <ul className="mt-2 space-y-1.5 font-mono text-xs">
              {connector.fieldMap.map((f) => (
                <li key={f.source} className="flex items-center justify-between gap-2">
                  <span className="truncate">{f.source}</span>
                  <span className="text-primary">→ {f.target}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Step 3 */}
      {step === 2 && records && summary && connector && (
        <div className="mt-6 space-y-4">
          <div className="grid gap-3 sm:grid-cols-4">
            {[
              { label: "Records fetched", value: summary.total },
              { label: "Will import", value: summary.succeeded },
              { label: "With warnings", value: summary.warnings },
              { label: "Rejected", value: summary.failed },
            ].map((s) => (
              <div key={s.label} className="panel px-4 py-3">
                <div className="label-caps">{s.label}</div>
                <div className="mt-1 font-mono text-2xl">{s.value}</div>
              </div>
            ))}
          </div>
          <RecordTable records={records} />
          <div className="flex flex-wrap gap-2">
            <Button onClick={commit}>Commit {summary.succeeded} valid records</Button>
            <Button variant="outline" onClick={() => setStep(1)}>
              Re-fetch
            </Button>
          </div>
        </div>
      )}

      {/* Step 4 */}
      {step === 3 && committed && (
        <div className="panel mt-6 p-6">
          <StatusPill status={committed.status} />
          <h2 className="mt-3 text-lg font-semibold">Import {committed.id} finished</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {committed.succeeded} of {committed.total} records were committed to the Users feature.{" "}
            {committed.failed} records were rejected and are available for correction and re-import.
          </p>
          <div className="mt-5 flex gap-2">
            <Button onClick={() => navigate({ to: "/runs/$runId", params: { runId: committed.id } })}>
              Open run detail
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setStep(0);
                setRecords(null);
                setCommitted(null);
                setProgress(0);
              }}
            >
              Start another import
            </Button>
          </div>
        </div>
      )}
    </AppShell>
  );
}

export function RecordTable({ records }: { records: ImportRecord[] }) {
  const [filter, setFilter] = useState<"all" | "failed" | "warning" | "success">("all");
  const shown = records.filter((r) => filter === "all" || r.status === filter);

  return (
    <div>
      <div className="mb-2 flex flex-wrap gap-2">
        {(["all", "failed", "warning", "success"] as const).map((f) => (
          <Button
            key={f}
            size="sm"
            variant={filter === f ? "default" : "outline"}
            onClick={() => setFilter(f)}
          >
            {f === "all" ? "All records" : f} (
            {f === "all" ? records.length : records.filter((r) => r.status === f).length})
          </Button>
        ))}
      </div>
      <div className="panel overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-surface">
            <tr className="text-left">
              {["Row", "External ID", "Name", "Email", "Department", "Status", "Reason"].map((h) => (
                <th key={h} className="label-caps whitespace-nowrap px-3 py-2">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {shown.map((r) => (
              <tr key={`${r.rowNumber}-${r.email}`} className="align-top">
                <td className="px-3 py-2 font-mono text-xs text-muted-foreground">{r.rowNumber}</td>
                <td className="px-3 py-2 font-mono text-xs">{r.externalId}</td>
                <td className="whitespace-nowrap px-3 py-2">{r.displayName}</td>
                <td className="px-3 py-2 font-mono text-xs">{r.email}</td>
                <td className="whitespace-nowrap px-3 py-2">{r.department}</td>
                <td className="px-3 py-2">
                  <StatusPill status={r.status} />
                </td>
                <td className="px-3 py-2 text-xs text-muted-foreground">
                  {r.issues.length === 0 ? (
                    "—"
                  ) : (
                    <ul className="space-y-1">
                      {r.issues.map((i) => (
                        <li key={i.ruleId}>
                          <span className="font-mono text-foreground">{i.ruleId}</span> {i.message}
                        </li>
                      ))}
                    </ul>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
