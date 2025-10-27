const SHEET_URL = "https://script.google.com/macros/s/PASTE_YOUR_WEBAPP_URL_HERE/exec";

async function addData() {
  const data = {
    id: Date.now(),
    name: document.getElementById("name").value,
    age: document.getElementById("age").value,
    gender: document.getElementById("gender").value,
    doctor: document.getElementById("doctor").value,
    time: document.getElementById("time").value,
    status: document.getElementById("status").value
  };

  await fetch(SHEET_URL, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  });

  loadData();
}

async function loadData() {
  const res = await fetch(SHEET_URL);
  const rows = await res.json();
  let html = "<tr><th>ID</th><th>Name</th><th>Age</th><th>Gender</th><th>Doctor</th><th>Time</th><th>Status</th></tr>";
  rows.slice(1).forEach(r => {
    html += `<tr>${r.map(c => `<td>${c}</td>`).join("")}</tr>`;
  });
  document.getElementById("dataTable").innerHTML = html;
}

loadData();
