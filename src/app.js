const quickActions = [
  "Start med pass",
  "Chart note",
  "Review orders",
  "AI shift summary"
];

const medications = [
  { resident: "Maria Santos", room: "112B", med: "Lisinopril 10 mg", state: "Overdue", detail: "Due 8:00 AM, BP check required" },
  { resident: "Evelyn Brooks", room: "108A", med: "Metformin 500 mg", state: "Due now", detail: "Give with breakfast" },
  { resident: "Thomas Reed", room: "121A", med: "Acetaminophen 325 mg", state: "PRN", detail: "Pain score required before administration" },
  { resident: "Irene Patel", room: "117C", med: "Warfarin 2 mg", state: "Hold", detail: "Pending INR confirmation" }
];

const residents = [
  { name: "Maria Santos", unit: "North Hall", risk: "High fall risk", action: "Complete neuro checks", owner: "LPN Grace" },
  { name: "Thomas Reed", unit: "Memory Care", risk: "New wound photo", action: "Upload measurement", owner: "RN Jamal" },
  { name: "Irene Patel", unit: "North Hall", risk: "Vitals out of range", action: "Notify provider", owner: "RN Lee" },
  { name: "Evelyn Brooks", unit: "Rehab", risk: "Discharge planning", action: "Finalize med reconciliation", owner: "Case Mgmt" }
];

const byId = (id) => document.getElementById(id);

byId("quickActions").innerHTML = quickActions
  .map((action, index) => `<button class="${index === 0 ? "primary-action" : "secondary-action"}">${action}</button>`)
  .join("");

byId("medList").innerHTML = medications
  .map((item) => `
    <article class="med-card">
      <div>
        <strong>${item.resident}</strong>
        <span>${item.room} · ${item.med}</span>
      </div>
      <div class="status-pill ${item.state.toLowerCase().replaceAll(" ", "-")}">${item.state}</div>
      <p>${item.detail}</p>
      <button>Document</button>
    </article>
  `)
  .join("");

byId("residentList").innerHTML = residents
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
