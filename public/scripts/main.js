const mainEl = document.getElementById("main");
const startButtonEl = document.getElementById("start");

const users = [
  { name: "Mike", userName: "MMacD", uuid: "asdfasdfa32242" },
  { name: "Bill", userName: "Filip", uuid: "sadf43sdasfdgas" },
  { name: "Jane", userName: "Floyd", uuid: "asfd345qsadgfasd" },
];

const joined = [];

function hideHero() {
  const heroEl = document.querySelector(".hero");
  heroEl.classList.add("hidden");
}

function handleClick(e) {
  document.getElementById("vote").classList.remove("hidden");
  document.getElementById("main").classList.add("hidden");
  if (e.target.id === "start") {
    renderVoteTable();
    hideHero();
  }
}

function captureJoinClick(e) {
  const doesExist = joined.filter((user) => user.uuid === e.target.dataset.id)
    .length;

  const getCurrentUser = users.filter(
    (user) => user.uuid === e.target.dataset.id
  );

  if (e.target.dataset.id && !doesExist) {
    joined.push(getCurrentUser.pop());
  }
}

mainEl.addEventListener("click", function (e) {
  captureJoinClick(e);
});

function renderUserList() {
  let userList = "";

  users.forEach((user) => {
    userList += `
        <tr>
            <th>${user.name}</th>
            <td>${user.userName}</td>
            <td><button class="button" data-id=${user.uuid}>Join</button></td>
        </tr>
        `;
  });

  return userList;
}

function refreshButtonHandler() {
  const t = document.querySelectorAll("#voterlist input");
  for (let input of Array.from(t)) {
    input.value = null;
  }
}

function renderVoteTable() {
  document.getElementById("main").remove();
  const voterList = document.getElementById("voterlist");

  let trContents = "";
  joined.forEach((user) => {
    trContents += `
        <tr>
            <th>${user.name}</th>
            <td>${user.userName}</td>
            <td>
            <input type="text" placeholder="Vote" data-vote=${user.uuid}></input>
            </td>
        </tr>`;
  });

  voterList.innerHTML = trContents;

  const refreshButton = document.createElement("button");
  refreshButton.innerText = "Total";
  refreshButton.id = "total";
  refreshButton.classList.add("button", "is-primary");
  refreshButton.addEventListener("click", displayAverage);
  const tableEl = document.querySelector("table");

  tableEl.appendChild(refreshButton);
}

function insertAverage(val, count) {
  let resultString = "";
  let averageEl = document.getElementById("average");
  resultString = `
  <div>
    <h2 class="is-1 large">Average</h2>
    <h2 class="is-1 large center">${Math.round(parseInt(val / count))}</h2>
  </div>
  `;
  averageEl.innerHTML = resultString;
}

function displayAverage() {
  let totalVal = 0;
  const t = document.querySelectorAll("#voterlist input");
  for (let input of Array.from(t)) {
    totalVal += parseInt(input.value);
  }
  insertAverage(totalVal, Array.from(t).length);
  refreshButtonHandler();
}

startButtonEl.addEventListener("click", (e) => {
  handleClick(e);
});

document.addEventListener("DOMContentLoaded", (e) => {
  const userList = document.getElementById("userlist");
  userList.innerHTML = renderUserList();
});
