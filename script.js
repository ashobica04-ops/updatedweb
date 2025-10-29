let tableBody = document.getElementById("tableBody");
let searchBox = document.getElementById("searchBox");
let noRecord = document.getElementById("noRecord");
let data = [];

async function loadData() {
  try {
    const response = await fetch("digitalob.json"); // Make sure this file is in the same folder
    data = await response.json();
    displayData(data);
  } catch (error) {
    console.error("Error loading data:", error);
  }
}

function displayData(filteredData) {
  tableBody.innerHTML = "";
  noRecord.textContent = "";

  if (filteredData.length === 0) {
    noRecord.textContent = "No matching record found.";
    return;
  }

  filteredData.forEach(item => {
    let row = `
      <tr>
        <td>${item.sno}</td>
        <td>${item.buyer}</td>
        <td>${item.style}</td>
        <td>${item.product}</td>
        <td>${item.machine}</td>
        <td><a href="${item.link}" target="_blank">View OB</a></td>
      </tr>
    `;
    tableBody.innerHTML += row;
  });
}

searchBox.addEventListener("input", () => {
  const searchText = searchBox.value.toLowerCase();
  const filtered = data.filter(item =>
    item.style.toLowerCase().includes(searchText) ||
    item.product.toLowerCase().includes(searchText)
  );
  displayData(filtered);
});

loadData();
