import { cn } from "@/lib/utils";
import type { ConnectorStatus, RecordStatus, RunStatus, Severity } from "@/lib/import-data";

const tones = {
  success: "bg-success/12 text-success border-success/30",
  failed: "bg-destructive/10 text-destructive border-destructive/30",
  warning: "bg-warning/15 text-warning-foreground border-warning/40",
  neutral: "bg-muted text-muted-foreground border-border",
  info: "bg-primary/10 text-primary border-primary/30",
} as const;

type Tone = keyof typeof tones;

const map: Record<string, { tone: Tone; label: string }> = {
  success: { tone: "success", label: "Success" },
  completed: { tone: "success", label: "Completed" },
  active: { tone: "success", label: "Active" },
  partial: { tone: "warning", label: "Partial" },
  warning: { tone: "warning", label: "Warning" },
  failed: { tone: "failed", label: "Failed" },
  error: { tone: "failed", label: "Error" },
  draft: { tone: "neutral", label: "Draft" },
  running: { tone: "info", label: "Running" },
};

export function StatusPill({
  status,
  className,
}: {
  status: ConnectorStatus | RunStatus | RecordStatus | Severity | string;
  className?: string;
}) {
  const entry = map[status] ?? { tone: "neutral" as Tone, label: status };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-sm border px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider",
        tones[entry.tone],
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {entry.label}
    </span>
  );
}

export function KindTag({ label }: { label: string }) {
  return (
    <span className="rounded-sm border border-border bg-surface px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
      {label}
    </span>
  );
}
