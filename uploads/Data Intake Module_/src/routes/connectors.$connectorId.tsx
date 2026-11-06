import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { AppShell } from "@/components/AppShell";
import { StatusPill, KindTag } from "@/components/StatusPill";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  connectorById,
  KIND_LABEL,
  formatDateTime,
  validationRules,
} from "@/lib/import-data";
import { useRuns } from "@/lib/run-store";

export const Route = createFileRoute("/connectors/$connectorId")({
  loader: ({ params }) => {
    const connector = connectorById(params.connectorId);
    if (!connector) throw notFound();
    return { name: connector.name };
  },
  head: ({ loaderData }) => {
    const name = loaderData?.name ?? "Connector";
    return {
      meta: [
        { title: `${name} — Connector detail` },
        {
          name: "description",
          content: `Configuration, field mapping and validation coverage for the ${name} user-import connector.`,
        },
        { property: "og:title", content: `${name} — Connector detail` },
        {
          property: "og:description",
          content: `Inspect source settings, field mapping and applied validation rules for ${name}.`,
        },
      ],
    };
  },
  component: ConnectorDetail,
});

function ConnectorDetail() {
  const { connectorId } = Route.useParams();
  const connector = connectorById(connectorId)!;
  const runs = useRuns().filter((r) => r.connectorId === connectorId);
  const rules = validationRules.filter((r) => r.appliesTo.includes(connector.kind));

  return (
    <AppShell
      title={connector.name}
      subtitle={connector.description}
      actions={
        <>
          <Button variant="outline" asChild>
            <Link to="/">
              <ArrowLeft className="size-4" /> Catalog
            </Link>
          </Button>
          <Button asChild>
            <Link to="/import" search={{ connector: connector.id }}>
              Run this connector
            </Link>
          </Button>
        </>
      }
    >
      <div className="flex flex-wrap items-center gap-2">
        <StatusPill status={connector.status} />
        <KindTag label={KIND_LABEL[connector.kind]} />
        <KindTag label={`Feature: ${connector.feature}`} />
        <KindTag label={`Owner: ${connector.owner}`} />
        <KindTag label={`Schedule: ${connector.schedule}`} />
      </div>

      <Tabs defaultValue="config" className="mt-6">
        <TabsList>
          <TabsTrigger value="config">Source configuration</TabsTrigger>
          <TabsTrigger value="mapping">Field mapping</TabsTrigger>
          <TabsTrigger value="rules">Validation coverage</TabsTrigger>
          <TabsTrigger value="history">Recent runs</TabsTrigger>
        </TabsList>

        <TabsContent value="config" className="mt-4">
          <div className="panel divide-y divide-border">
            {connector.config.map((c) => (
              <div key={c.label} className="grid gap-1 px-4 py-3 sm:grid-cols-[220px_1fr]">
                <div className="label-caps">{c.label}</div>
                <div className="font-mono text-sm break-all">{c.value}</div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="mapping" className="mt-4">
          <div className="panel overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-surface">
                <tr className="text-left">
                  <th className="label-caps px-4 py-2">Source field</th>
                  <th className="label-caps px-4 py-2">Target attribute</th>
                  <th className="label-caps px-4 py-2">Required</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {connector.fieldMap.map((f) => (
                  <tr key={f.source}>
                    <td className="px-4 py-2 font-mono text-xs">{f.source}</td>
                    <td className="px-4 py-2 font-mono text-xs text-primary">{f.target}</td>
                    <td className="px-4 py-2">{f.required ? "Yes" : "Optional"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="rules" className="mt-4">
          <div className="panel divide-y divide-border">
            {rules.map((r) => (
              <div key={r.id} className="flex flex-wrap items-center gap-3 px-4 py-3">
                <span className="font-mono text-xs text-muted-foreground">{r.id}</span>
                <span className="text-sm font-medium">{r.name}</span>
                <KindTag label={r.kind === "schema" ? "Schema" : "Business rule"} />
                <StatusPill status={r.severity} />
                {!r.enabled && <KindTag label="Disabled" />}
                <code className="ml-auto font-mono text-xs text-muted-foreground">
                  {r.expression}
                </code>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="mt-4">
          <div className="panel divide-y divide-border">
            {runs.length === 0 && (
              <div className="px-4 py-6 text-sm text-muted-foreground">
                This connector has not been run yet.
              </div>
            )}
            {runs.map((r) => (
              <Link
                key={r.id}
                to="/runs/$runId"
                params={{ runId: r.id }}
                className="flex flex-wrap items-center gap-4 px-4 py-3 hover:bg-surface"
              >
                <span className="font-mono text-sm">{r.id}</span>
                <span className="text-sm text-muted-foreground">
                  {formatDateTime(r.startedAt)}
                </span>
                <StatusPill status={r.status} />
                <span className="ml-auto font-mono text-xs">
                  {r.succeeded}/{r.total} imported · {r.failed} failed
                </span>
              </Link>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </AppShell>
  );
}
