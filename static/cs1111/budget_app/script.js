// ==========================
// DEBUGGING UTILITY
// ==========================
function debugLog(message, data = null) {
  console.log(`[DEBUG] ${message}`, data ?? "");
}

// ==========================
// CLASS DEFINITIONS
// ==========================
class BudgetItem {
  constructor(name, amount) {
    this.name = name;
    this.amount = parseFloat(amount);
    if (isNaN(this.amount)) throw new Error(`Invalid amount for ${name}`);
  }
  getAmount() { return this.amount; }
}

class Income extends BudgetItem {
  getAmount() { return Math.abs(this.amount); }
}

class Expense extends BudgetItem {
  constructor(name, amount, multiplier = 1.0) {
    super(name, amount);
    this.multiplier = parseFloat(multiplier) || 1.0;
  }
  getAmount() {
    return -Math.abs(this.amount) * this.multiplier;
  }
}

class Budget {
  constructor() {
    this.items = [];
  }
  addItem(item) {
    debugLog("Adding item", item);
    this.items.push(item);
  }
  deleteItem(index) {
    debugLog(`Deleting item at index ${index}`);
    this.items.splice(index, 1);
  }
  total() {
    debugLog("Calculating total from items:", this.items);
    let total = 0;
    try {
      for (const i of this.items) {
        const value = i.getAmount();
        if (isNaN(value)) throw new Error(`NaN in getAmount() for ${i.name}`);
        total += value;
        debugLog(`Item: ${i.name}, getAmount() = ${value}, running total = ${total}`);
      }
    } catch (err) {
      console.error("[EXCEPTION] Total calculation failed:", err);
    } finally {
      debugLog("Total calculation completed");
    }
    return total;
  }
}

// ==========================
// APPLICATION LOGIC
// ==========================
const budget = new Budget();
const tbody = document.querySelector("#entriesTable tbody");
const totalDisplay = document.querySelector("#total");

function renderTable() {
  debugLog("Rendering table");
  tbody.innerHTML = "";

  budget.items.forEach((item, idx) => {
    const isIncome = item instanceof Income;
    const type = isIncome
      ? "Income"
      : (item.multiplier > 1 ? "Variable Expense" : "Fixed Expense");
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${type}</td>
      <td>${item.name}</td>
      <td class="${isIncome ? "has-text-success" : "has-text-danger"}">
        ${item.getAmount().toFixed(2)}
      </td>
      <td>
        <button class="button is-small is-warning" onclick="editItem(${idx})"><i class="fas fa-pen"></i></button>
        <button class="button is-small is-danger" onclick="deleteItem(${idx})"><i class="fas fa-trash"></i></button>
      </td>`;
    tbody.appendChild(row);
  });

  const total = budget.total();
  totalDisplay.textContent = `Remaining: $${total.toFixed(2)}`;
  totalDisplay.className = total >= 0
    ? "has-text-success has-text-right has-text-weight-bold mt-3"
    : "has-text-danger has-text-right has-text-weight-bold mt-3";
}

function deleteItem(index) {
  try {
    budget.deleteItem(index);
    renderTable();
  } catch (err) {
    console.error("[ERROR] deleteItem() failed:", err);
  }
}

function editItem(index) {
  const item = budget.items[index];
  debugLog("Editing item", item);

  document.getElementById("entryType").value =
    item instanceof Income ? "income" : "expense";
  document.getElementById("entryName").value = item.name;
  document.getElementById("entryAmount").value = Math.abs(item.amount);
  document.getElementById("entryMultiplier").value = item.multiplier || 1;

  deleteItem(index);
  document.getElementById("multiplierColumn").style.display =
    item instanceof Expense ? "block" : "none";
}

function addItem() {
  debugLog("addItem() called");
  const type = document.getElementById("entryType").value;
  const name = document.getElementById("entryName").value.trim();
  const amount = parseFloat(document.getElementById("entryAmount").value);
  const multiplier = parseFloat(document.getElementById("entryMultiplier").value) || 1;

  if (!name || isNaN(amount)) {
    alert("Please fill out all fields with valid numbers.");
    debugLog("Invalid input detected");
    return;
  }

  try {
    let item;
    if (type === "income") item = new Income(name, amount);
    else item = new Expense(name, amount, multiplier);

    budget.addItem(item);
    renderTable();
  } catch (err) {
    console.error("[EXCEPTION] addItem() failed:", err);
  }

  // Reset form
  document.getElementById("entryName").value = "";
  document.getElementById("entryAmount").value = "";
  document.getElementById("entryMultiplier").value = 1;
  document.getElementById("multiplierColumn").style.display = "none";
}

document.getElementById("addButton").addEventListener("click", e => {
  e.preventDefault();
  addItem();
});

document.getElementById("entryType").addEventListener("change", e => {
  const show = e.target.value === "expense";
  document.getElementById("multiplierColumn").style.display = show ? "block" : "none";
  debugLog(`Type changed to ${e.target.value}`);
});

renderTable();
