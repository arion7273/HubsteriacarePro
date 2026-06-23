# HubsteriaCarePro Product Standard

## Positioning

HubsteriaCarePro should become a cleaner, faster, more mobile-friendly EHR and eMAR platform for long-term care teams. It should keep industry-standard strengths such as resident census, clinical charting, medication administration, orders, care plans, compliance tracking, audits, and facility dashboards, while improving usability, speed, mobile workflows, and task clarity.

## Industry-Standard Modules To Build Toward

- Facility and census dashboard
- Resident profile and clinical summary
- eMAR medication pass
- Orders and physician communication
- Vitals and alerts
- Care plans and interventions
- Progress notes and charting
- Wounds, falls, infection tracking, and risk programs
- Labs, documents, and attachments
- Scheduling and staff task lists
- Billing readiness and MDS-style assessment support
- Role-based access, audit logs, and compliance reports
- AI-assisted summaries, risk detection, and documentation support

## UX Principles

- Mobile first, especially iPad portrait and landscape.
- Fewer clicks than legacy EHR workflows.
- Use cards, clear states, large touch targets, and sticky clinical action areas on mobile.
- Use tables only when the viewport supports them. Provide card equivalents for mobile.
- Avoid visual clutter. Show what matters now, what is late, what is risky, and what needs action.
- Keep resident context visible when users move between meds, notes, vitals, and tasks.

## Performance Principles

- Prefer simple client logic and fast first render.
- Keep AI actions optional, asynchronous, and scoped.
- Do not block medication pass, charting, or urgent workflows on AI or slow network actions.
- Design data access for pagination, filtering, facility scoping, and role scoping.
- Add regression checks whenever a workflow becomes important.

## Responsive Acceptance Criteria

- Small mobile: card layout, no table dependency, no overlapping text.
- iPad portrait: two-column cards where useful, large tap targets.
- iPad landscape: denser split views without hiding clinical actions.
- Desktop: efficient dashboard and data review, with tables allowed only where they improve scanning.
