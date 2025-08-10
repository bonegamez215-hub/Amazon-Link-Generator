document.addEventListener("DOMContentLoaded", () => {
  const themeSelect = document.getElementById("themeSelect");
  const savedTheme = localStorage.getItem("theme") || "default";
  document.body.classList.add(savedTheme);
  themeSelect.value = savedTheme;
  themeSelect.addEventListener("change", () => {
    document.body.classList.remove("default", "dark", "matrix");
    document.body.classList.add(themeSelect.value);
    localStorage.setItem("theme", themeSelect.value);
  });
  document.getElementById("generateBtn").addEventListener("click", generateLinks);
  document.getElementById("clearBtn").addEventListener("click", clearResults);
  document.getElementById("exportXLSXBtn").addEventListener("click", exportToXLSX);
  document.getElementById("exportCSVBtn").addEventListener("click", exportToCSV);
});

function generateLinks() {
  console.log("Generating links...");
  const input = document.getElementById("inputArea").value.trim();
  if (!input) {
    alert("Please enter data.");
    return;
  }
  const lines = input.split("\n").map(line => line.trim()).filter(Boolean);
  const resultsTable = document.querySelector("#resultsTable tbody");
  resultsTable.innerHTML = "";
  const today = new Date().toISOString().split("T")[0];
  lines.forEach(line => {
    const invoiceNum = line; // Replace with actual parsing logic if needed
    const disputeLink = `https://example.com/dispute/${invoiceNum}`;
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>AG-${Math.floor(Math.random()*10000)}</td>
      <td>${invoiceNum}</td>
      <td><a href="${disputeLink}" target="_blank">${disputeLink}</a></td>
      <td>${today}</td>
      <td>USA</td>
      <td>US</td>
      <td><button class="btn-secondary" onclick="copyToClipboard('${disputeLink}')">Copy</button></td>
    `;
    resultsTable.appendChild(row);
  });
  document.getElementById("statusBar").textContent = "Last Generated: " + new Date().toLocaleString();
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    console.log("Copied:", text);
    alert("Link copied to clipboard!");
  });
}

function clearResults() {
  document.getElementById("inputArea").value = "";
  document.querySelector("#resultsTable tbody").innerHTML = "";
  document.getElementById("statusBar").textContent = "No data generated yet.";
}

function exportToCSV() {
  console.log("Exporting CSV...");
  const table = document.getElementById("resultsTable");
  let csv = [];
  for (let row of table.rows) {
    let cols = Array.from(row.cells).map(cell => `"${cell.innerText}"`);
    csv.push(cols.join(","));
  }
  const csvContent = "data:text/csv;charset=utf-8," + csv.join("\n");
  const link = document.createElement("a");
  link.href = encodeURI(csvContent);
  link.download = `results_${new Date().toISOString().split("T")[0]}.csv`;
  link.click();
}

function exportToXLSX() {
  console.log("Exporting XLSX...");
  const table = document.getElementById("resultsTable");
  const wb = XLSX.utils.table_to_book(table, { sheet: "Results" });
  XLSX.writeFile(wb, `results_${new Date().toISOString().split("T")[0]}.xlsx`);
}
