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
    var itemName = document.getElementById("item-name")
        .value;
    var expireDate = document.getElementById("expire-date").value;
    var oneDay = 24 * 60 * 60 * 1000;
    var remainingDays = Math.ceil((Number(new Date(expireDate)) - Date.now()) / oneDay);
    groceryList.push({
        item: itemName,
        date: expireDate,
        remaining: remainingDays === 0
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
    var _loop_1 = function (item) {
        var row = document.createElement("tr");
        var uniqueId = item.item + "_" + item.date;
        row.setAttribute("id", uniqueId);
        !item.remaining.includes("days") && row.setAttribute("class", "red-text");
        for (var _i = 0, _a = Object.entries(item); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            var cell = document.createElement("td");
            var cellText = void 0;
            if (key === "date") {
                var m = value.split("-")[1];
                var d = value.split("-")[2];
                cellText = document.createTextNode(m + "/" + d);
            }
            else {
                cellText = document.createTextNode(value);
            }
            cell.appendChild(cellText);
            row.appendChild(cell);
        }
        var deleteBtn = document.createElement("button");
        deleteBtn.addEventListener("click", function () { return deleteItem(uniqueId); });
        var deleteBtnText = document.createTextNode("X");
        deleteBtn.appendChild(deleteBtnText);
        row.appendChild(deleteBtn);
        tblBody.appendChild(row);
    };
    for (var _a = 0, groceryList_1 = groceryList; _a < groceryList_1.length; _a++) {
        var item = groceryList_1[_a];
        _loop_1(item);
    }
}
function deleteItem(id) {
    console.log("id", id);
    var newList = groceryList.filter(function (i) { return i.item !== id.split("_")[0] || i.date !== id.split("_")[1]; });
    groceryList = newList;
    localStorage.setItem("grocery", JSON.stringify(groceryList));
    updateTable();
}
getListFromLocalStorage();
dateInput();
updateTable();
