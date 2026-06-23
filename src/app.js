const quickActions = [
  "Start med pass",
  "Chart note",
  "Review orders",
  "AI shift summary"
];

const medications = [
  { resident: "Maria Santos", room: "112B", med: "Lisinopril 10 mg", state: "Overdue", detail: "Due 8:00 AM, BP check required", action: "Document now", check: "BP 128/76 before administration" },
  { resident: "Evelyn Brooks", room: "108A", med: "Metformin 500 mg", state: "Due now", detail: "Give with breakfast", action: "Administer", check: "Meal intake confirmed" },
  { resident: "Thomas Reed", room: "121A", med: "Acetaminophen 325 mg", state: "PRN", detail: "Pain score required before administration", action: "Assess pain", check: "Pain score 6/10 before PRN" },
  { resident: "Irene Patel", room: "117C", med: "Warfarin 2 mg", state: "Hold", detail: "Pending INR confirmation", action: "Review lab", check: "INR result reviewed before action" },
  { resident: "Andre Miller", room: "124D", med: "Furosemide 20 mg", state: "Refused", detail: "Resident declined at bedside, follow-up required", action: "Record refusal", check: "Refusal reason and provider follow-up documented" }
];

const residents = [
  { name: "Maria Santos", room: "112B", unit: "North Hall", risk: "High fall risk", action: "Complete neuro checks", owner: "LPN Grace", vitals: "BP due", orders: "2 unsigned", carePlan: "Fall risk" },
  { name: "Thomas Reed", room: "121A", unit: "Memory Care", risk: "New wound photo", action: "Upload measurement", owner: "RN Jamal", vitals: "Pain reassess", orders: "1 pending", carePlan: "Wound care" },
  { name: "Irene Patel", room: "117C", unit: "North Hall", risk: "Vitals out of range", action: "Notify provider", owner: "RN Lee", vitals: "Pulse alert", orders: "Lab review", carePlan: "Anticoag" },
  { name: "Evelyn Brooks", room: "108A", unit: "Rehab", risk: "Discharge planning", action: "Finalize med reconciliation", owner: "Case Mgmt", vitals: "Stable", orders: "Ready", carePlan: "Discharge" }
];

const tasks = [
  { lane: "Now", items: ["Overdue BP-linked med", "Provider call for vitals", "Unsigned pharmacy order"] },
  { lane: "This shift", items: ["Fall-risk care plan review", "Wound measurement photo", "Discharge med reconciliation"] },
  { lane: "Monitor", items: ["PRN pain reassessment", "Infection watch follow-up", "Family update request"] }
];

const orders = [
  { resident: "Maria Santos", type: "Medication", summary: "Clarify hold parameters for Lisinopril", status: "Pharmacy impact", owner: "RN Lee" },
  { resident: "Irene Patel", type: "Lab", summary: "INR result needs provider acknowledgement", status: "Provider review", owner: "RN Lee" },
  { resident: "Evelyn Brooks", type: "Discharge", summary: "Reconcile active meds before discharge packet", status: "Case management", owner: "Case Mgmt" },
  { resident: "Thomas Reed", type: "Treatment", summary: "Wound care dressing frequency update", status: "Nursing review", owner: "RN Jamal" }
];

const auditEvents = [
  { time: "09:14", actor: "LPN Grace", action: "Opened eMAR pass", detail: "North Hall AM Pass" },
  { time: "09:10", actor: "RN Lee", action: "Reviewed INR lab", detail: "Irene Patel, Warfarin order" },
  { time: "09:03", actor: "System", action: "Flagged overdue medication", detail: "Maria Santos, Lisinopril 10 mg" }
];

const byId = (id) => document.getElementById(id);
let selectedMedIndex = 0;
let selectedDocStatus = "Administered";

byId("quickActions").innerHTML = quickActions
  .map((action, index) => `<button class="${index === 0 ? "primary-action" : "secondary-action"}">${action}</button>`)
  .join("");

byId("medList").innerHTML = medications
  .map((item, index) => `
    <article class="med-card">
      <div>
        <strong>${item.resident}</strong>
        <span>${item.room} - ${item.med}</span>
      </div>
      <div class="status-pill ${item.state.toLowerCase().replaceAll(" ", "-")}">${item.state}</div>
      <p>${item.detail}</p>
      <button data-med-index="${index}">${item.action}</button>
    </article>
  `)
  .join("");

byId("residentList").innerHTML = residents
  .map((resident, index) => `
    <article class="resident-card">
      <div>
        <strong>${resident.name}</strong>
        <span>${resident.room} - ${resident.unit}</span>
      </div>
      <p>${resident.risk}</p>
      <div class="resident-action">
        <span>${resident.action}</span>
        <small>${resident.owner}</small>
      </div>
      <button data-resident-index="${index}">Open profile</button>
    </article>
  `)
  .join("");

byId("censusRows").innerHTML = residents
  .map((resident) => `
    <tr>
      <td>${resident.name}</td>
      <td>${resident.unit}</td>
      <td>${resident.risk}</td>
      <td>${resident.action}</td>
      <td>${resident.owner}</td>
    </tr>
  `)
  .join("");

byId("mobileCensus").innerHTML = residents
  .map((resident) => `
    <article class="resident-card">
      <div>
        <strong>${resident.name}</strong>
        <span>${resident.unit}</span>
      </div>
      <p>${resident.risk}</p>
      <div class="resident-action">
        <span>${resident.action}</span>
        <small>${resident.owner}</small>
      </div>
    </article>
  `)
  .join("");

byId("taskLanes").innerHTML = tasks
  .map((lane) => `
    <article class="task-lane">
      <h3>${lane.lane}</h3>
      <div>
        ${lane.items.map((item) => `<button>${item}</button>`).join("")}
      </div>
    </article>
  `)
  .join("");

function renderAuditTrail() {
  byId("auditList").innerHTML = auditEvents
    .map((event) => `
      <article class="audit-event">
        <time>${event.time}</time>
        <div>
          <strong>${event.action}</strong>
          <span>${event.actor} - ${event.detail}</span>
        </div>
      </article>
    `)
    .join("");
}

function addAuditEvent(action, detail, actor = "Current nurse") {
  const now = new Date();
  auditEvents.unshift({
    time: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    actor,
    action,
    detail
  });
  renderAuditTrail();
}

byId("orderList").innerHTML = orders
  .map((order, index) => `
    <article class="order-card">
      <div>
        <span>${order.type} - ${order.status}</span>
        <strong>${order.resident}</strong>
      </div>
      <p>${order.summary}</p>
      <div class="order-actions">
        <button data-order-action="Approve" data-order-index="${index}">Approve</button>
        <button data-order-action="Clarify" data-order-index="${index}">Clarify</button>
      </div>
      <small>${order.owner}</small>
    </article>
  `)
  .join("");

function updateResidentFocus(resident) {
  byId("resident-command-title").textContent = resident.name;
  byId("focusRoom").textContent = resident.room;
  byId("focusVitals").textContent = resident.vitals;
  byId("focusOrders").textContent = resident.orders;
  byId("focusCarePlan").textContent = resident.carePlan;
}

function updateDocumentation(index) {
  selectedMedIndex = index;
  const item = medications[index];
  byId("docResident").textContent = `${item.resident} - ${item.room}`;
  byId("docMedication").textContent = item.med;
  byId("docDetail").textContent = item.detail;
  byId("docCheck").value = item.check;
  byId("docNote").value = item.state === "Refused"
    ? "Resident declined medication. Reason reviewed and follow-up queued."
    : "Resident alert and tolerated medication pass.";
  byId("docStateChip").textContent = item.state;
  byId("docAudit").textContent = `Selected ${item.action.toLowerCase()} for ${item.resident}`;
}

function setDocStatus(status) {
  selectedDocStatus = status;
  document.querySelectorAll("[data-doc-status]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.docStatus === status));
  });
  byId("docStateChip").textContent = status;
  byId("docAudit").textContent = `${status} selected for ${medications[selectedMedIndex].resident}`;
}

document.querySelectorAll("[data-med-index]").forEach((button) => {
  button.addEventListener("click", () => {
    updateDocumentation(Number(button.dataset.medIndex));
    byId("documentation-workflow").scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

document.querySelectorAll("[data-resident-index]").forEach((button) => {
  button.addEventListener("click", () => {
    updateResidentFocus(residents[Number(button.dataset.residentIndex)]);
    byId("resident-command").scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

document.querySelectorAll("[data-doc-status]").forEach((button) => {
  button.addEventListener("click", () => setDocStatus(button.dataset.docStatus));
});

byId("saveDraft").addEventListener("click", () => {
  byId("docAudit").textContent = `Draft saved for ${medications[selectedMedIndex].resident}`;
  addAuditEvent("Saved med draft", `${medications[selectedMedIndex].resident}, ${medications[selectedMedIndex].med}`);
});

byId("completeDoc").addEventListener("click", () => {
  byId("docAudit").textContent = `${selectedDocStatus} documented with audit trail`;
  byId("docStateChip").textContent = "Complete";
  addAuditEvent(`${selectedDocStatus} documented`, `${medications[selectedMedIndex].resident}, ${medications[selectedMedIndex].med}`);
});

document.querySelectorAll("[data-order-action]").forEach((button) => {
  button.addEventListener("click", () => {
    const order = orders[Number(button.dataset.orderIndex)];
    const action = button.dataset.orderAction;
    addAuditEvent(`Order ${action.toLowerCase()}`, `${order.resident}, ${order.summary}`);
    button.closest(".order-card").querySelector("small").textContent = `${action} recorded`;
  });
});

updateResidentFocus(residents[0]);
updateDocumentation(0);
renderAuditTrail();
