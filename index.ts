let groceryList: { item: string; date: string; remaining: string }[];

function getListFromLocalStorage() {
  const list = localStorage.getItem("grocery");
  groceryList = list === null ? [] : JSON.parse(list);
}

let itemName;
let expireDate;

function enableBtn() {
  itemName = (document.getElementById("item-name") as HTMLInputElement).value;
  expireDate = (document.getElementById("expire-date") as HTMLInputElement)
    .value;

  (document.getElementById("add-btn") as HTMLButtonElement).disabled =
    itemName.length === 0 || expireDate.length === 0;
}

let dd = String(new Date().getDate()).padStart(2, "0");
let mm = String(new Date().getMonth() + 1).padStart(2, "0");
let yyyy = new Date().getFullYear();

const today = yyyy + "-" + mm + "-" + dd;

function dateInput() {
  (document.getElementById("expire-date") as HTMLInputElement).min = today;
}

function addItem() {
  itemName = (document.getElementById("item-name") as HTMLInputElement).value;
  expireDate = (document.getElementById("expire-date") as HTMLInputElement)
    .value;

  const oneDay = 24 * 60 * 60 * 1000;
  const remainingDays = Math.ceil(
    (Number(new Date(expireDate)) - Date.now()) / oneDay
  );

  groceryList.push({
    item: itemName,
    date: expireDate,
    remaining:
      remainingDays === 0
        ? "expire today"
        : remainingDays < 0
        ? "expired"
        : remainingDays === 1
        ? "expire tmr"
        : remainingDays.toString() + " days",
  });

  sortByDate();

  localStorage.setItem("grocery", JSON.stringify(groceryList));

  updateTable();

  const textbox = document.getElementById("item-name") as HTMLInputElement;
  textbox.value = textbox.defaultValue;

  enableBtn();
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
  headerRow.appendChild(document.createElement("th"));
  tblBody.appendChild(headerRow);

  for (const item of groceryList) {
    const row = document.createElement("tr");
    const uniqueId = item.item + "_" + item.date;
    row.setAttribute("id", uniqueId);

    !item.remaining.includes("days") && row.setAttribute("class", "red-text");

    for (const [key, value] of Object.entries(item)) {
      const cell = document.createElement("td");

      let cellText;
      if (key === "date") {
        const m = value.split("-")[1];
        const d = value.split("-")[2];
        cellText = document.createTextNode(m + "/" + d);
      } else {
        cellText = document.createTextNode(value);
      }
      cell.appendChild(cellText);
      row.appendChild(cell);
    }

    const newTd = document.createElement("td");
    const deleteBtn = document.createElement("button");
    deleteBtn.addEventListener("click", () => deleteItem(uniqueId));
    const deleteBtnText = document.createTextNode("X");
    deleteBtn.appendChild(deleteBtnText);
    newTd.appendChild(deleteBtn);
    row.appendChild(newTd);
    tblBody.appendChild(row);
  }
}

function deleteItem(id: string) {
  const newList = groceryList.filter(
    (i) => i.item !== id.split("_")[0] || i.date !== id.split("_")[1]
  );
  groceryList = newList;
  localStorage.setItem("grocery", JSON.stringify(groceryList));
  updateTable();
}

getListFromLocalStorage();
dateInput();
enableBtn();
updateTable();
