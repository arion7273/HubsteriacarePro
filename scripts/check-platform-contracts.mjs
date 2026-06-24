import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { apiContracts, tenantContext, rolePermissions, facilityReports } from "../src/platform-data.js";

const root = fileURLToPath(new URL("..", import.meta.url));
const api = readFileSync(join(root, "apps", "api", "server.mjs"), "utf8");
const schema = readFileSync(join(root, "infra", "db", "schema.sql"), "utf8");
const html = readFileSync(join(root, "src", "index.html"), "utf8");

const checks = [
  ["tenant id exists", tenantContext.tenantId.startsWith("tenant-")],
  ["facility id exists", tenantContext.facilityId.startsWith("facility-")],
  ["role permissions exist", rolePermissions.length >= 4],
  ["facility reports exist", facilityReports.length >= 4],
  ["API contracts listed", apiContracts.includes("POST /api/med-admin-events")],
  ["API has context route", api.includes("GET /api/context")],
  ["API writes require audit", api.includes("auditRequired")],
  ["schema has tenants", /create table tenants/i.test(schema)],
  ["schema has facilities", /create table facilities/i.test(schema)],
  ["schema has med admin events", /create table med_admin_events/i.test(schema)],
  ["schema has order reviews", /create table order_reviews/i.test(schema)],
  ["schema has audit events", /create table audit_events/i.test(schema)],
  ["UI exposes SaaS foundation", /saas-foundation/.test(html)],
  ["UI exposes role permissions", /permissionList/.test(html)],
  ["UI exposes facility reports", /reportList/.test(html)]
];

const failures = checks.filter(([, passed]) => !passed);

if (failures.length > 0) {
  console.error("Platform contract checks failed:");
  for (const [name] of failures) {
    console.error(`- ${name}`);
  }
  process.exit(1);
}

console.log(`All ${checks.length} platform contract checks passed.`);
