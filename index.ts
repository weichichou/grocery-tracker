let groceryList: { item: string; date: string }[];

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

  groceryList.push({
    item: itemName,
    date: expireDate,
  });

  sortByDate();

  console.log("groceryList", groceryList);

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

function getFullList(): { item: string; date: string; remaining: string }[] {
  return groceryList.map((i) => ({
    ...i,
    remaining: calculateRemainingDays(i.date),
  }));
}

function calculateRemainingDays(date: string): string {
  let msg;
  const oneDay = 24 * 60 * 60 * 1000;
  const remainingDays = Math.ceil(
    (Number(new Date(date)) - Date.now()) / oneDay
  );
  msg =
    remainingDays === 0
      ? "expire today"
      : remainingDays < 0
      ? "expired"
      : remainingDays === 1
      ? "expire tmr"
      : remainingDays.toString() + " days";
  return msg;
}

function updateTable() {
  const fullList = getFullList();

  const tblBody = document.getElementsByTagName("tbody")[0];

  while (tblBody.firstChild) {
    tblBody.removeChild(tblBody.firstChild);
  }

  const headerArr = Object.keys(fullList[0]);
  const headerRow = document.createElement("tr");
  for (const h of headerArr) {
    const headerCell = document.createElement("th");
    const headerCellText = document.createTextNode(h);
    headerCell.appendChild(headerCellText);
    headerRow.appendChild(headerCell);
  }

  headerRow.appendChild(document.createElement("th"));
  tblBody.appendChild(headerRow);

  for (const item of fullList) {
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

// Web Speech API
//var speechRecognition: SpeechRecognition = webkitSpeechRecognition

var colors = [ 'aqua' , 'azure' , 'beige', 'bisque', 'black', 'blue', 'brown', 'chocolate', 'coral', 'crimson', 'cyan', 'fuchsia', 'ghostwhite', 'gold', 'goldenrod', 'gray', 'green', 'indigo', 'ivory', 'khaki', 'lavender', 'lime', 'linen', 'magenta', 'maroon', 'moccasin', 'navy', 'olive', 'orange', 'orchid', 'peru', 'pink', 'plum', 'purple', 'red', 'salmon', 'sienna', 'silver', 'snow', 'tan', 'teal', 'thistle', 'tomato', 'turquoise', 'violet', 'white', 'yellow'];
var grammar = '#JSGF V1.0; grammar colors; public <color> = ' + colors.join(' | ') + ' ;'

var recognition = new (window as any)['webkitSpeechRecognition']();
var speechRecognitionList = new (window as any)['webkitSpeechGrammarList']();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;


const micIcon = document.getElementById("microphone") as HTMLElement
micIcon.onclick = function() {
  recognition.start();
  console.log('Ready to receive a color command.');
}

recognition.onresult = function(event: any) {
  //var color = event.results[0][0].transcript;
  //diagnostic.textContent = 'Result received: ' + color + '.';
  //bg.style.backgroundColor = color;
  console.log(event.results);
}

recognition.onspeechend = function() {
  recognition.stop();
}

getListFromLocalStorage();
dateInput();
enableBtn();
updateTable();
