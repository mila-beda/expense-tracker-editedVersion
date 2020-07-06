const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

document.querySelector(".header").addEventListener("mouseover", changeHeader);

function changeHeader() {
  const header = document.querySelector(".header");
  header.textContent =
    "Economy is the wealth of the poor and the wisdom of the rich";
  header.style.color = "#f00";
}

document.querySelector(".header").addEventListener("mouseout", returnHeader);

function returnHeader() {
  const header = document.querySelector(".header");
  header.textContent = "Expense Tracker";
  header.style.color = "#000";
}

const localStorageTransactions = JSON.parse(
  localStorage.getItem("transactions")
);

let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

function addTransaction(e) {
  e.preventDefault();

  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("Please add a text and amount");
  } else {
    const transaction = {
      id: generateID(),
      text: new Date().toLocaleDateString() + " " + text.value,
      amount: +amount.value,
    };

    transactions.push(transaction);

    addTransactionDOM(transaction);

    updateValues();

    updateLocalStorage();

    text.value = "";
    amount.value = "";
  }
}

// Generate random ID
function generateID() {
  return Math.floor(Math.random() * 100000000);
}

// Add transactions to DOM list
function addTransactionDOM(transaction) {
  // Get sign
  const sign = transaction.amount < 0 ? "-" : "+";

  const item = document.createElement("li");

  // Add class based on value
  item.classList.add(transaction.amount < 0 ? "minus" : "plus");

  item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(
    transaction.amount
  )}</span> <button class="delete-btn" onclick="removeTransaction(${
    transaction.id
  })">x</button>
  `;

  list.appendChild(item);
}

function updateValues() {
  const amounts = transactions.map((transaction) => transaction.amount);

  let total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense = (
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  document
    .querySelector(".farWayToDream")
    .addEventListener("click", farToDream);
  function farToDream() {
    if (total > 1000) {
      document.getElementById("readyToNorway").hidden = false;
      document.getElementById("continueWorking").hidden = true;
      var i = -1;
      const txt = "Pack your suitcase for the Norway vacation!";
      const speed = 70;
      const typingTxt = document.getElementById("typingTxt");
      typingTxt.textContent = typeWriter();
      function typeWriter() {
        if (i < txt.length) {
          document.getElementById("typingTxt").innerHTML += txt.charAt(i);
          i++;
          setTimeout(typeWriter, speed);
        }
      }
    } else {
      document.getElementById("continueWorking").hidden = false;
      document.getElementById("readyToNorway").hidden = true;
    }
  }

  let nowTotal = `$${total}`;

  balance.innerText =
    total < 0
      ? (balance.innerText = nowTotal + " You should earn more!")
      : total > 0
      ? (balance.innerText = nowTotal + " You're good at money earning!")
      : (balance.innerText = nowTotal);

  money_plus.innerText = `$${income}`;
  money_minus.innerText = `$${expense}`;
}

function removeTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);

  updateLocalStorage();

  init();
}

function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function init() {
  list.innerHTML = "";

  transactions.forEach(addTransactionDOM);
  updateValues();
}

init();

form.addEventListener("submit", addTransaction);

anime.timeline({loop: true})
  .add({
    targets: '.keepWorking .word',
    scale: [14,1],
    opacity: [0,1],
    easing: "easeOutCirc",
    duration: 600,
    delay: (el, i) => 800 * i
  }).add({
    targets: '.keepWorking',
    opacity: 0,
    duration: 600,
    easing: "easeOutExpo",
    delay: 1000
  });
