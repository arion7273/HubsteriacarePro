import { createServer } from "node:http";
import { tenantContext, facilityReports, rolePermissions } from "../../src/platform-data.js";

const port = Number(process.env.PORT || 3000);
const host = process.env.HOST || "127.0.0.1";

const json = (response, status, payload) => {
  response.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store"
  });
  response.end(JSON.stringify(payload, null, 2));
};

const routes = {
  "GET /health": () => ({ ok: true, service: "hubsteriacarepro-api" }),
  "GET /api/context": () => ({ tenantContext, rolePermissions }),
  "GET /api/facilities/facility-north-hall/dashboard": () => ({ tenantContext, facilityReports }),
  "GET /api/audit-events": () => ({
    tenantId: tenantContext.tenantId,
    facilityId: tenantContext.facilityId,
    events: [
      { action: "Opened eMAR pass", actor: "LPN Grace", resident: "North Hall", at: "09:14" },
      { action: "Reviewed INR lab", actor: "RN Lee", resident: "Irene Patel", at: "09:10" }
    ]
  })
};

createServer((request, response) => {
  const url = new URL(request.url || "/", `http://${host}:${port}`);
  const key = `${request.method} ${url.pathname}`;

  if (request.method === "POST" && ["/api/med-admin-events", "/api/order-reviews"].includes(url.pathname)) {
    json(response, 202, {
      accepted: true,
      tenantId: tenantContext.tenantId,
      facilityId: tenantContext.facilityId,
      auditRequired: true
    });
    return;
  }

  const route = routes[key];
  if (!route) {
    json(response, 404, { error: "Not found" });
    return;
  }

  json(response, 200, route());
}).listen(port, host, () => {
  console.log(`HubsteriaCarePro API listening at http://${host}:${port}`);
});
