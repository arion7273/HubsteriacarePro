export const tenantContext = {
  tenantId: "tenant-hcp-demo",
  tenantName: "Hubsteria Care Network",
  facilityId: "facility-north-hall",
  facilityName: "North Hall",
  shift: "AM Pass",
  user: {
    id: "user-rn-lee",
    name: "RN Lee",
    role: "Charge Nurse"
  }
};

export const rolePermissions = [
  { area: "eMAR", permission: "Document meds", level: "Full access" },
  { area: "Orders", permission: "Approve or clarify", level: "Nurse review" },
  { area: "Audit", permission: "View clinical trail", level: "Read access" },
  { area: "AI Assist", permission: "Draft only", level: "No autonomous actions" }
];

export const facilityReports = [
  { label: "Med pass completion", value: "91%", detail: "7 overdue, 4 held, 1 refused" },
  { label: "Order turnaround", value: "38m", detail: "Median provider/pharmacy review" },
  { label: "Open risk items", value: "9", detail: "Falls, wounds, vitals, infection watch" },
  { label: "Audit coverage", value: "100%", detail: "All clinical actions traceable" }
];

export const apiContracts = [
  "GET /health",
  "GET /api/context",
  "GET /api/facilities/:facilityId/dashboard",
  "POST /api/med-admin-events",
  "POST /api/order-reviews",
  "GET /api/audit-events"
];
