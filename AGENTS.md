# HubsteriaCarePro Global Product Memory

These rules apply to every feature, page, component, workflow, and regression fix in HubsteriaCarePro.

## Product North Star

HubsteriaCarePro is a modern EHR and eMAR SaaS for long-term care, skilled nursing, assisted living, and post-acute care teams. It should follow the proven industry workflows users expect from systems like PointClickCare, while improving the weak spots: speed, mobile usability, fewer clicks, cleaner navigation, better task visibility, and easier clinical follow-through.

Every decision should make the app more manageable, more mobile-centered, and more efficient for real care teams.

## Always Follow

- Design mobile first for iPad portrait, iPad landscape, desktop, and smaller mobile widths.
- On mobile, use cards and flexible rows instead of tables.
- Prevent overlapping text, cramped controls, tiny tap targets, and broken padding at every viewport.
- Keep workflows fast, low-lag, and low-click. Prefer direct actions, inline status, and smart defaults.
- Preserve working behavior with regression checks before and after meaningful changes.
- Build for future scale: multi-facility, multi-tenant, role-based access, auditability, and high data volume.
- Keep AI features efficient, explainable, permission-aware, and never blocking core clinical workflows.
- Recommend current healthcare SaaS industry standards when a feature choice is unclear.
- Connect to GitHub at the start of work whenever GitHub sync or repository state matters.

## EHR/eMAR Experience Standards

- Medication passes must emphasize due, overdue, PRN, held, refused, and documented states at a glance.
- Clinical dashboards should surface risk first: missed meds, unsigned orders, change of condition, falls, wounds, vitals out of range, and follow-up tasks.
- Use resident-centered workflows: one resident summary should connect charting, meds, orders, care plans, vitals, documents, and tasks.
- Reduce duplicate entry. Reuse context from resident, order, medication, shift, facility, and role whenever possible.
- Use clear audit trails for clinical actions.
- Avoid dense desktop-only layouts. Desktop can use tables where appropriate, but mobile must switch to cards.

## Quality Gate

Before finishing work, verify:

- Mobile portrait, iPad landscape, and desktop layouts remain usable.
- Text does not overlap or overflow.
- Tables are not required on mobile.
- Key pages stay quick to render.
- Existing checks pass, or any failures are clearly explained.
