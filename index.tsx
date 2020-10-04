let groceryList: { item: string; date: string; remaining: string }[];

function getListFromLocalStorage() {
  const list = localStorage.getItem("grocery");
  groceryList = list === null ? [] : JSON.parse(list);
}

let dd = String(new Date().getDate()).padStart(2, "0");
let mm = String(new Date().getMonth() + 1).padStart(2, "0");
let yyyy = new Date().getFullYear();

const today = yyyy + "-" + mm + "-" + dd;

function dateInput() {
  (document.getElementById("expire-date") as HTMLInputElement).min = today;
}

function addItem() {
  console.log(
    (document.getElementById("expire-date") as HTMLInputElement).value
  );
  const itemName = (document.getElementById("item-name") as HTMLInputElement)
    .value;
  const expireDate = (document.getElementById(
    "expire-date"
  ) as HTMLInputElement).value;

  const oneDay = 24 * 60 * 60 * 1000;
  const remainingDays = Math.round(
    (Number(new Date(expireDate)) - Date.now()) / oneDay
  );

  groceryList.push({
    item: itemName,
    date: expireDate,
    remaining:
      remainingDays === 0
        ? "Expire today"
        : remainingDays < 0
        ? "Expired :("
        : remainingDays === 1
        ? "Expire tomorrow"
        : remainingDays.toString() + " days",
  });

  sortByDate();

  localStorage.setItem("grocery", JSON.stringify(groceryList));

  updateTable();
}

function sortByDate() {
  groceryList.sort(
    (a, b) => Number(new Date(a.date)) - Number(new Date(b.date))
  );
}

function updateTable() {
  const tblBody = document.getElementsByTagName("tbody")[0];

  while (tblBody.firstChild) {
    tblBody.removeChild(tblBody.firstChild);
  }

  const headerArr = Object.keys(groceryList[0]);
  const headerRow = document.createElement("tr");
  for (const h of headerArr) {
    const headerCell = document.createElement("th");
    const headerCellText = document.createTextNode(h);
    headerCell.appendChild(headerCellText);
    headerRow.appendChild(headerCell);
  }
  tblBody.appendChild(headerRow);
  for (const item of groceryList) {
    const row = document.createElement("tr");
    for (const [key, value] of Object.entries(item)) {
      const cell = document.createElement("td");
      const cellText = document.createTextNode(value);
      cell.appendChild(cellText);
      row.appendChild(cell);
    }
    const deleteBtn = document.createElement("button");
    const deleteBtnText = document.createTextNode("Delete");
    deleteBtn.appendChild(deleteBtnText);
    row.appendChild(deleteBtn);
    tblBody.appendChild(row);
  }
}

getListFromLocalStorage();
dateInput();
updateTable();
