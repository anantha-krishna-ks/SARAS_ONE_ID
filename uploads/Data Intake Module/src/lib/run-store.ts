import { useSyncExternalStore } from "react";
import { seedRuns, type ImportRun } from "./import-data";

let runs: ImportRun[] = seedRuns;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

export function addRun(run: ImportRun) {
  runs = [run, ...runs];
  emit();
}

export function updateRun(id: string, patch: Partial<ImportRun>) {
  runs = runs.map((r) => (r.id === id ? { ...r, ...patch } : r));
  emit();
}

export function nextRunId() {
  return `RUN-${2042 + runs.length}`;
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function snapshot() {
  return runs;
}

export function useRuns() {
  return useSyncExternalStore(subscribe, snapshot, snapshot);
}

export function useRun(id: string) {
  return useRuns().find((r) => r.id === id);
}
