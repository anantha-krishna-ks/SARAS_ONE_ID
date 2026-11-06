/**
 * Mock domain model for the User Import Console.
 * All data is simulated in-memory so the whole flow is reviewable
 * before wiring real source systems.
 */

export type ConnectorKind = "excel" | "entra" | "google";
export type ConnectorStatus = "active" | "draft" | "error";
export type Severity = "error" | "warning";
export type RecordStatus = "success" | "failed" | "warning";
export type RunStatus = "completed" | "partial" | "failed" | "running";

export interface Connector {
  id: string;
  name: string;
  kind: ConnectorKind;
  feature: string;
  status: ConnectorStatus;
  description: string;
  owner: string;
  lastRunAt: string | null;
  schedule: string;
  avgRecords: number;
  successRate: number;
  config: { label: string; value: string }[];
  fieldMap: { source: string; target: string; required: boolean }[];
}

export interface ValidationRule {
  id: string;
  name: string;
  kind: "schema" | "business";
  target: string;
  expression: string;
  severity: Severity;
  enabled: boolean;
  appliesTo: ConnectorKind[];
}

export interface ImportRecord {
  rowNumber: number;
  externalId: string;
  displayName: string;
  email: string;
  department: string;
  managerEmail: string;
  status: RecordStatus;
  issues: { ruleId: string; ruleName: string; severity: Severity; message: string }[];
}

export interface ImportRun {
  id: string;
  connectorId: string;
  startedAt: string;
  durationMs: number;
  triggeredBy: string;
  status: RunStatus;
  total: number;
  succeeded: number;
  failed: number;
  warnings: number;
  records: ImportRecord[];
}

export const KIND_LABEL: Record<ConnectorKind, string> = {
  excel: "Excel workbook",
  entra: "Microsoft Entra ID",
  google: "Google Workspace",
};

export const connectors: Connector[] = [
  {
    id: "excel-hr-roster",
    name: "HR Roster Workbook",
    kind: "excel",
    feature: "Users",
    status: "active",
    description:
      "Monthly headcount workbook published by HR Operations. Sheet `Roster` is read from row 2 onward.",
    owner: "hr-ops@acme.com",
    lastRunAt: "2026-08-25T09:12:00Z",
    schedule: "On demand",
    avgRecords: 148,
    successRate: 0.92,
    config: [
      { label: "Source file", value: "roster-aug-2026.xlsx" },
      { label: "Worksheet", value: "Roster" },
      { label: "Header row", value: "1" },
      { label: "Delimiter for multi-value", value: ";" },
    ],
    fieldMap: [
      { source: "Employee ID", target: "externalId", required: true },
      { source: "Full Name", target: "displayName", required: true },
      { source: "Work Email", target: "email", required: true },
      { source: "Dept", target: "department", required: false },
      { source: "Reports To", target: "managerEmail", required: false },
    ],
  },
  {
    id: "entra-directory",
    name: "Entra Directory Sync",
    kind: "entra",
    feature: "Users",
    status: "active",
    description:
      "Reads enabled member accounts from the corporate Entra tenant, excluding guests and service principals.",
    owner: "identity@acme.com",
    lastRunAt: "2026-08-24T17:40:00Z",
    schedule: "On demand",
    avgRecords: 612,
    successRate: 0.97,
    config: [
      { label: "Tenant", value: "acme.onmicrosoft.com" },
      { label: "Filter", value: "accountEnabled eq true and userType eq 'Member'" },
      { label: "Page size", value: "200" },
      { label: "Scopes", value: "User.Read.All, Directory.Read.All" },
    ],
    fieldMap: [
      { source: "employeeId", target: "externalId", required: true },
      { source: "displayName", target: "displayName", required: true },
      { source: "userPrincipalName", target: "email", required: true },
      { source: "department", target: "department", required: false },
      { source: "manager.mail", target: "managerEmail", required: false },
    ],
  },
  {
    id: "google-workspace",
    name: "Google Workspace Users",
    kind: "google",
    feature: "Users",
    status: "active",
    description:
      "Pulls active users from the primary Google Workspace domain including org unit placement.",
    owner: "identity@acme.com",
    lastRunAt: "2026-08-22T08:05:00Z",
    schedule: "On demand",
    avgRecords: 204,
    successRate: 0.88,
    config: [
      { label: "Customer", value: "my_customer" },
      { label: "Domain", value: "acme.com" },
      { label: "Org unit", value: "/Employees" },
      { label: "Scopes", value: "admin.directory.user.readonly" },
    ],
    fieldMap: [
      { source: "externalIds[0].value", target: "externalId", required: true },
      { source: "name.fullName", target: "displayName", required: true },
      { source: "primaryEmail", target: "email", required: true },
      { source: "organizations[0].department", target: "department", required: false },
      { source: "relations[manager]", target: "managerEmail", required: false },
    ],
  },
  {
    id: "excel-contractors",
    name: "Contractor Intake Sheet",
    kind: "excel",
    feature: "Users",
    status: "draft",
    description: "Vendor-supplied contractor list. Field mapping is still being confirmed.",
    owner: "procurement@acme.com",
    lastRunAt: null,
    schedule: "On demand",
    avgRecords: 36,
    successRate: 0,
    config: [
      { label: "Source file", value: "contractors-q3.xlsx" },
      { label: "Worksheet", value: "Sheet1" },
      { label: "Header row", value: "3" },
    ],
    fieldMap: [
      { source: "Vendor Ref", target: "externalId", required: true },
      { source: "Name", target: "displayName", required: true },
      { source: "Email", target: "email", required: true },
    ],
  },
  {
    id: "entra-b2b-guests",
    name: "Entra Guest Accounts",
    kind: "entra",
    feature: "Users",
    status: "error",
    description:
      "Guest/B2B collaboration accounts. Last run failed: the directory read scope was revoked.",
    owner: "identity@acme.com",
    lastRunAt: "2026-08-19T11:02:00Z",
    schedule: "On demand",
    avgRecords: 74,
    successRate: 0.61,
    config: [
      { label: "Tenant", value: "acme.onmicrosoft.com" },
      { label: "Filter", value: "userType eq 'Guest'" },
      { label: "Page size", value: "100" },
    ],
    fieldMap: [
      { source: "id", target: "externalId", required: true },
      { source: "displayName", target: "displayName", required: true },
      { source: "mail", target: "email", required: true },
    ],
  },
];

export const validationRules: ValidationRule[] = [
  {
    id: "R-01",
    name: "External ID present",
    kind: "schema",
    target: "externalId",
    expression: "required && matches(/^[A-Z0-9-]{4,}$/)",
    severity: "error",
    enabled: true,
    appliesTo: ["excel", "entra", "google"],
  },
  {
    id: "R-02",
    name: "Email is a valid address",
    kind: "schema",
    target: "email",
    expression: "required && isEmail()",
    severity: "error",
    enabled: true,
    appliesTo: ["excel", "entra", "google"],
  },
  {
    id: "R-03",
    name: "Display name length",
    kind: "schema",
    target: "displayName",
    expression: "length between 2 and 120",
    severity: "error",
    enabled: true,
    appliesTo: ["excel", "entra", "google"],
  },
  {
    id: "R-04",
    name: "Email domain allow-list",
    kind: "business",
    target: "email",
    expression: "domain in ['acme.com', 'acme.co.uk']",
    severity: "error",
    enabled: true,
    appliesTo: ["excel", "entra", "google"],
  },
  {
    id: "R-05",
    name: "Department must exist",
    kind: "business",
    target: "department",
    expression: "lookup(departments, department) != null",
    severity: "error",
    enabled: true,
    appliesTo: ["excel", "entra"],
  },
  {
    id: "R-06",
    name: "Manager must resolve to a user",
    kind: "business",
    target: "managerEmail",
    expression: "lookup(users, managerEmail) != null",
    severity: "warning",
    enabled: true,
    appliesTo: ["excel", "entra", "google"],
  },
  {
    id: "R-07",
    name: "No duplicate external IDs in batch",
    kind: "business",
    target: "externalId",
    expression: "unique within batch",
    severity: "error",
    enabled: true,
    appliesTo: ["excel", "entra", "google"],
  },
  {
    id: "R-08",
    name: "Manager cannot be self",
    kind: "business",
    target: "managerEmail",
    expression: "managerEmail != email",
    severity: "warning",
    enabled: false,
    appliesTo: ["entra", "google"],
  },
];

/* ---------------------------------------------------------------- *
 * Deterministic mock record generator + validation simulation
 * ---------------------------------------------------------------- */

const FIRST = [
  "Anita", "Devon", "Priya", "Marcus", "Lena", "Tomas", "Ruth", "Samir",
  "Yuki", "Hana", "Ivan", "Claire", "Owen", "Nadia", "Felix", "Rosa",
];
const LAST = [
  "Kapoor", "Reyes", "Mensah", "Lindqvist", "Okafor", "Duarte", "Novak",
  "Haddad", "Tanaka", "Brennan", "Petrov", "Moreau", "Walsh", "Silva",
];
const DEPTS = ["Engineering", "Finance", "People Ops", "Sales", "Legal", "Logistics"];

function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1103515245 + 12345) % 2147483648;
    return s / 2147483648;
  };
}

export function generateRecords(connector: Connector, count: number, seed = 42): ImportRecord[] {
  const rand = seeded(seed + connector.id.length * 977);
  const active = validationRules.filter((r) => r.enabled && r.appliesTo.includes(connector.kind));
  const seenIds = new Set<string>();
  const records: ImportRecord[] = [];

  const pick = (arr: readonly string[]) => arr[Math.floor(rand() * arr.length)] ?? arr[0]!;

  for (let i = 0; i < count; i++) {
    const first = pick(FIRST);
    const last = pick(LAST);
    const roll = rand();
    let externalId = `EMP-${(1000 + i * 7).toString()}`;
    let email = `${first.toLowerCase()}.${last.toLowerCase()}@acme.com`;
    let department: string = pick(DEPTS);
    let managerEmail = `lead.${pick(DEPTS).split(" ")[0]!.toLowerCase()}@acme.com`;
    let displayName = `${first} ${last}`;

    // Inject realistic defects.
    if (roll > 0.93) email = `${first.toLowerCase()}.${last.toLowerCase()}@contractor.io`;
    else if (roll > 0.88) email = `${first.toLowerCase()}[at]acme.com`;
    else if (roll > 0.84) externalId = "";
    else if (roll > 0.8) department = "Growth Hacking";
    else if (roll > 0.74) managerEmail = "unknown.manager@acme.com";
    else if (roll > 0.71) displayName = first.slice(0, 1);
    else if (roll > 0.69 && records.length) externalId = records[0]!.externalId;


    const issues: ImportRecord["issues"][number][] = [];
    const push = (ruleId: string, message: string) => {
      const rule = active.find((r) => r.id === ruleId);
      if (rule) issues.push({ ruleId, ruleName: rule.name, severity: rule.severity, message });
    };

    if (!externalId) push("R-01", "Required field `externalId` is empty in the source row.");
    else if (seenIds.has(externalId))
      push("R-07", `Duplicate external ID \`${externalId}\` already present in this batch.`);
    if (!/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(email))
      push("R-02", `\`${email}\` is not a valid email address.`);
    else if (!/@(acme\.com|acme\.co\.uk)$/i.test(email))
      push("R-04", `Domain \`${email.split("@")[1]}\` is not on the allow-list.`);
    if (displayName.trim().length < 2)
      push("R-03", "Display name must be between 2 and 120 characters.");
    if (!DEPTS.includes(department))
      push("R-05", `Department \`${department}\` was not found in the reference list.`);
    if (managerEmail.startsWith("unknown."))
      push("R-06", `Manager \`${managerEmail}\` could not be resolved to an existing user.`);

    if (externalId) seenIds.add(externalId);

    const hasError = issues.some((x) => x.severity === "error");
    const status: RecordStatus = hasError ? "failed" : issues.length ? "warning" : "success";

    records.push({
      rowNumber: i + 2,
      externalId: externalId || "—",
      displayName,
      email,
      department,
      managerEmail,
      status,
      issues,
    });
  }
  return records;
}

export function summarize(records: ImportRecord[]) {
  const failed = records.filter((r) => r.status === "failed").length;
  const warnings = records.filter((r) => r.status === "warning").length;
  return {
    total: records.length,
    failed,
    warnings,
    succeeded: records.length - failed,
  };
}

function buildRun(
  id: string,
  connectorId: string,
  startedAt: string,
  count: number,
  seed: number,
  triggeredBy: string,
  status?: RunStatus,
): ImportRun {
  const connector = connectors.find((c) => c.id === connectorId)!;
  const records = generateRecords(connector, count, seed);
  const s = summarize(records);
  return {
    id,
    connectorId,
    startedAt,
    durationMs: 4200 + count * 31,
    triggeredBy,
    status: status ?? (s.failed > 0 ? "partial" : "completed"),
    records,
    ...s,
  };
}

export const seedRuns: ImportRun[] = [
  buildRun("RUN-2041", "entra-directory", "2026-08-24T17:40:00Z", 64, 11, "priya.kapoor@acme.com"),
  buildRun("RUN-2038", "excel-hr-roster", "2026-08-25T09:12:00Z", 48, 5, "hr-ops@acme.com"),
  buildRun("RUN-2035", "google-workspace", "2026-08-22T08:05:00Z", 40, 23, "identity@acme.com"),
  buildRun("RUN-2030", "excel-hr-roster", "2026-07-28T09:03:00Z", 32, 77, "hr-ops@acme.com"),
  {
    ...buildRun("RUN-2019", "entra-b2b-guests", "2026-08-19T11:02:00Z", 12, 91, "identity@acme.com"),
    status: "failed",
  },
];

export function connectorById(id: string) {
  return connectors.find((c) => c.id === id);
}

export function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
