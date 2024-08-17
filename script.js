fetch(
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
)
  .then((response) => response.json())
  .then((data) => {
    renderTable(data);
  })
  .catch((error) => console.error("Error fetching data:", error));

async function fetchData() {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
    );
    const data = await response.json();
    renderTable(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

fetchData();

function renderTable(data) {
  const tableBody = document
    .getElementById("cryptoTable")
    .getElementsByTagName("tbody")[0];
  tableBody.innerHTML = "";

  data.forEach((item) => {
    const row = tableBody.insertRow();
    row.insertCell(0).textContent = item.name;
    row.insertCell(1).textContent = item.id;
    const imgCell = row.insertCell(2);
    const img = document.createElement("img");
    img.src = item.image;
    img.alt = item.name;
    img.style.width = "30px";
    img.style.height = "30px";
    imgCell.appendChild(img);
    row.insertCell(3).textContent = item.symbol;
    row.insertCell(4).textContent = `$${item.current_price}`;
    row.insertCell(5).textContent = item.total_volume;
  });
}

document.getElementById("searchInput").addEventListener("input", function () {
  const filter = this.value.toLowerCase();
  const table = document.getElementById("cryptoTable");
  const rows = table.getElementsByTagName("tr");

  for (let i = 1; i < rows.length; i++) {
    const cells = rows[i].getElementsByTagName("td");
    const name = cells[0].textContent.toLowerCase();
    rows[i].style.display = name.includes(filter) ? "" : "none";
  }
});

function sortTable(criteria) {
  const table = document.getElementById("cryptoTable");
  const rows = Array.from(table.getElementsByTagName("tr")).slice(1);
  let compareFunction;

  if (criteria === "market_cap") {
    compareFunction = (a, b) => {
      const aValue = parseFloat(a.cells[4].textContent.replace("$", ""));
      const bValue = parseFloat(b.cells[4].textContent.replace("$", ""));
      return aValue - bValue;
    };
  } else if (criteria === "percentage_change") {
    compareFunction = (a, b) => {
      // Assuming percentage change is in cell[6], add data accordingly
      const aValue = parseFloat(a.cells[6].textContent.replace("%", ""));
      const bValue = parseFloat(b.cells[6].textContent.replace("%", ""));
      return aValue - bValue;
    };
  }

  rows.sort(compareFunction);
  const tableBody = table.getElementsByTagName("tbody")[0];
  tableBody.innerHTML = "";
  rows.forEach((row) => tableBody.appendChild(row));
}
