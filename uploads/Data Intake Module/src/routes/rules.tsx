import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { AppShell } from "@/components/AppShell";
import { StatusPill, KindTag } from "@/components/StatusPill";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { KIND_LABEL, validationRules, type ValidationRule } from "@/lib/import-data";

export const Route = createFileRoute("/rules")({
  head: () => ({
    meta: [
      { title: "Validation rules — User Import Console" },
      {
        name: "description",
        content:
          "Manage the schema checks and business rules applied to every imported user record, with severity and connector scope.",
      },
      { property: "og:title", content: "Validation rules — User Import Console" },
      {
        property: "og:description",
        content: "Schema and business-rule administration for the Users import feature.",
      },
    ],
  }),
  component: RulesPage,
});

function RulesPage() {
  const [rules, setRules] = useState<ValidationRule[]>(validationRules);
  const [kind, setKind] = useState<"all" | "schema" | "business">("all");
  const shown = rules.filter((r) => kind === "all" || r.kind === kind);

  function toggle(id: string) {
    setRules((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r;
        toast.success(`${r.id} ${r.enabled ? "disabled" : "enabled"} for future runs.`);
        return { ...r, enabled: !r.enabled };
      }),
    );
  }

  return (
    <AppShell
      title="Validation rules"
      subtitle="Schema checks verify the shape of each record; business rules enforce policy. Error-severity failures reject a record, warnings import it and flag it."
    >
      <div className="mb-3 flex flex-wrap gap-2">
        {(["all", "schema", "business"] as const).map((k) => (
          <Button
            key={k}
            size="sm"
            variant={kind === k ? "default" : "outline"}
            onClick={() => setKind(k)}
          >
            {k === "all" ? "All rules" : k === "schema" ? "Schema" : "Business rules"}
          </Button>
        ))}
      </div>

      <div className="panel divide-y divide-border">
        {shown.map((r) => (
          <div key={r.id} className="grid gap-3 p-4 lg:grid-cols-[1fr_auto]">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs text-muted-foreground">{r.id}</span>
                <span className="font-medium">{r.name}</span>
                <KindTag label={r.kind === "schema" ? "Schema" : "Business rule"} />
                <StatusPill status={r.severity} />
              </div>
              <code className="mt-2 block font-mono text-xs text-muted-foreground">
                {r.target} · {r.expression}
              </code>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {r.appliesTo.map((k) => (
                  <KindTag key={k} label={KIND_LABEL[k]} />
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3 lg:justify-end">
              <span className="label-caps">{r.enabled ? "Enabled" : "Disabled"}</span>
              <Switch checked={r.enabled} onCheckedChange={() => toggle(r.id)} />
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
