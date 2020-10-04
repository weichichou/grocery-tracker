"use strict";
var groceryList;
function getListFromLocalStorage() {
    var list = localStorage.getItem("grocery");
    groceryList = list === null ? [] : JSON.parse(list);
}
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
    var oneDay = 24 * 60 * 60 * 1000;
    var remainingDays = Math.round((Number(new Date(expireDate)) - Date.now()) / oneDay);
    groceryList.push({
        item: itemName,
        date: expireDate,
        remaining: remainingDays === 0
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
    groceryList.sort(function (a, b) { return Number(new Date(a.date)) - Number(new Date(b.date)); });
}
function updateTable() {
    var tblBody = document.getElementsByTagName("tbody")[0];
    while (tblBody.firstChild) {
        tblBody.removeChild(tblBody.firstChild);
    }
    var headerArr = Object.keys(groceryList[0]);
    var headerRow = document.createElement("tr");
    for (var _i = 0, headerArr_1 = headerArr; _i < headerArr_1.length; _i++) {
        var h = headerArr_1[_i];
        var headerCell = document.createElement("th");
        var headerCellText = document.createTextNode(h);
        headerCell.appendChild(headerCellText);
        headerRow.appendChild(headerCell);
    }
    tblBody.appendChild(headerRow);
    for (var _a = 0, groceryList_1 = groceryList; _a < groceryList_1.length; _a++) {
        var item = groceryList_1[_a];
        var row = document.createElement("tr");
        for (var _b = 0, _c = Object.entries(item); _b < _c.length; _b++) {
            var _d = _c[_b], key = _d[0], value = _d[1];
            var cell = document.createElement("td");
            var cellText = document.createTextNode(value);
            cell.appendChild(cellText);
            row.appendChild(cell);
        }
        tblBody.appendChild(row);
    }
}
getListFromLocalStorage();
dateInput();
updateTable();
