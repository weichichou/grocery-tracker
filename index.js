"use strict";
var dd = String(new Date().getDate()).padStart(2, "0");
var mm = String(new Date().getMonth() + 1).padStart(2, "0");
var yyyy = new Date().getFullYear();
var today = yyyy + "-" + mm + "-" + dd;
function dateInput() {
    //(document.getElementById("expire-date") as HTMLInputElement).value = today;
    document.getElementById("expire-date").min = today;
}
dateInput();
