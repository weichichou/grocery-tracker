let dd = String(new Date().getDate()).padStart(2, "0");
let mm = String(new Date().getMonth() + 1).padStart(2, "0");
let yyyy = new Date().getFullYear();

const today = yyyy + "-" + mm + "-" + dd;

function dateInput() {
  //(document.getElementById("expire-date") as HTMLInputElement).value = today;
  (document.getElementById("expire-date") as HTMLInputElement).min = today;
}

dateInput();
