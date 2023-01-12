
let myLeads = [];

let oldLeads = [];

const inputEl = document.getElementById("input-el");

const inputBtn = document.getElementById("input-btn");

const ulEl = document.getElementById("ul-el");

const delBtn = document.getElementById("del-btn");

const tabBtn = document.getElementById("tab-btn")


const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}

// const tabs = [
//     { url: "https://google.com" }
// ]

tabBtn.addEventListener("click", function (tabs) {
    //API
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {

        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);

    });

})

delBtn.addEventListener("dblclick", function () {
    localStorage.clear();
    myLeads = [];
    render(myLeads);

})

function render(leads) {
    let listItems = "";
    for (let i = 0; i < leads.length; i++) {
        // const li = document.createElement("li");
        // li.textContent = myLeads[i]
        // ulEL.append(li)
        listItems += `<li><a target='_blank' href='${leads[i]}'>${leads[i]}</a></li>`
    }
    ulEl.innerHTML = listItems;
}

inputBtn.addEventListener("click", function () {
    myLeads.push(inputEl.value);
    inputEl.value = "";

    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads);
})

