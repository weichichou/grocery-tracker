let groceryList: { item: string; date: string }[] = [];

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

  groceryList.push({
    item: itemName,
    date: expireDate,
  });

  localStorage.setItem("grocery", JSON.stringify(groceryList));
}

dateInput();
