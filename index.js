"use strict";
var groceryList = [];
var dd = String(new Date().getDate()).padStart(2, "0");
var mm = String(new Date().getMonth() + 1).padStart(2, "0");
var yyyy = new Date().getFullYear();
var today = yyyy + "-" + mm + "-" + dd;
function dateInput() {
    document.getElementById("expire-date").min = today;
}
function addItem() {
    console.log(document.getElementById("expire-date").value);
    var itemName = document.getElementById("item-name")
        .value;
    var expireDate = document.getElementById("expire-date").value;
    groceryList.push({
        item: itemName,
        date: expireDate,
    });
    localStorage.setItem("grocery", JSON.stringify(groceryList));
}
dateInput();
