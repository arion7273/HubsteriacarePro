# HubsteriaCarePro

HubsteriaCarePro is an EHR and eMAR SaaS starter patterned around proven long-term care workflows, with a mobile-first experience, fewer clicks, modern clinical dashboards, and faster medication and resident workflows.

## Start Locally

Open `src/index.html` in a browser, or run the lightweight local server:

```bash
/Users/josephfelipe/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/serve.mjs
```

Then visit <http://localhost:4173>.

## Checks

```bash
/Users/josephfelipe/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/check-responsive-rules.mjs
```

The checks protect the project memory rules: mobile card layouts, responsive breakpoints, no mobile tables, and required EHR/eMAR workflow signals.

## Project Memory

The durable product rules are stored in `AGENTS.md` and `docs/product-standard.md`. Future work should follow those files before adding or changing features.
