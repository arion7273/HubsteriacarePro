import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const root = fileURLToPath(new URL("..", import.meta.url));
const html = readFileSync(join(root, "src", "index.html"), "utf8");
const css = readFileSync(join(root, "src", "styles.css"), "utf8");
const js = readFileSync(join(root, "src", "app.js"), "utf8");
const memory = readFileSync(join(root, "AGENTS.md"), "utf8");

const checks = [
  ["project memory names mobile first", /mobile first/i.test(memory)],
  ["project memory names PointClickCare", /PointClickCare/i.test(memory)],
  ["app includes EHR language", /EHR/i.test(html)],
  ["app includes eMAR language", /eMAR/i.test(html)],
  ["mobile card layout exists", /\.card-grid|\.resident-card|\.med-card/.test(css)],
  ["mobile table alternative exists", /desktop-only/.test(css) && /mobile-only/.test(css)],
  ["responsive breakpoints exist", /@media\s*\(min-width:\s*768px\)/.test(css) && /@media\s*\(min-width:\s*1100px\)/.test(css)],
  ["overflow protection exists", /overflow-wrap:\s*anywhere/.test(css)],
  ["quick actions exist", /quickActions/.test(js)],
  ["regression clinical states exist", /overdue|due now|PRN|refused/i.test(`${html}\n${js}`)],
  ["phase 2 navigation exists", /module-nav/.test(html) && /#med-pass/.test(html)],
  ["resident command exists", /resident-command/.test(html) && /resident-summary/.test(css)],
  ["task board exists", /taskLanes/.test(js) && /task-lanes/.test(css)],
  ["AI stays optional", /No AI action blocks med pass or charting/.test(html)],
  ["medication documentation workflow exists", /documentation-workflow/.test(html) && /updateDocumentation/.test(js)],
  ["one screen documentation actions exist", /data-doc-status/.test(html) && /Complete documentation/.test(html)],
  ["resident profile opens from cards", /data-resident-index/.test(js) && /Open profile/.test(js)],
  ["order review workflow exists", /order-review/.test(html) && /orderList/.test(js)],
  ["audit trail workflow exists", /audit-trail/.test(html) && /addAuditEvent/.test(js)],
  ["mobile nav can scroll", /overflow-x:\s*auto/.test(css) && /module-nav/.test(css)]
];

const failures = checks.filter(([, passed]) => !passed);

if (failures.length > 0) {
  console.error("Responsive/product checks failed:");
  for (const [name] of failures) {
    console.error(`- ${name}`);
  }
  process.exit(1);
}

console.log(`All ${checks.length} responsive/product checks passed.`);
