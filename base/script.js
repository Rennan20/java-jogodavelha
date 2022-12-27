//UM JOGO TEM DADOS INICIAIS, OS EVENTOS, AS FUNÇÕES

//Initial Data

let board = {
  a1: "",
  a2: "",
  a3: "",
  b1: "",
  b2: "",
  b3: "",
  c1: "",
  c2: "",
  c3: "",
};

let player = "";
let warning = "";
let playing = false;

reset();

//Events

document.querySelector(".reset").addEventListener("click", reset);
document.querySelectorAll(".item").forEach((item) => {
  item.addEventListener("click", itemClick);
});

//Functions
function reset() {
  warning = "";

  let random = Math.floor(Math.random() * 2);
  player = random === 0 ? "X" : "O";

  for (let i in board) {
    board[i] = "";
  }

  playing = true;

  renderSquare();
  renderInfo();
}

function renderSquare() {
  for (let i in board) {
    let item = document.querySelector(`div[data-item=${i}]`);
    item.innerHTML = board[i];
  }

  checkGame();
}

function renderInfo() {
  document.querySelector(".vez").innerHTML = player;
  document.querySelector(".resultado").innerHTML = warning;
}

function itemClick(event) {
  let item = event.target.getAttribute("data-item");
  if (playing && board[item] === "") {
    board[item] = player;
    renderSquare();
    togglePlayer();
  }
}

function togglePlayer() {
  player = player === "X" ? "O" : "X";
  renderInfo();
}

function checkGame() {
  if (checkWinnerFor("X")) {
    warning = "|X| venceu";
    playing = false;
  } else if (checkWinnerFor("O")) {
    warning = "|O| venceu";
    playing = false;
  } else if (checkDraw()) {
    warning = "Deu empate!";
    playing = false;
  }
}

function checkWinnerFor(player) {
  let pos = [
    "a1,a2,a3",
    "b1,b2,b3",
    "c1,c2,c3",

    "a1,b1,c1",
    "a2,b2,c2",
    "a3,b3,c3",

    "a1,b2,c3",
    "a3,b2,c1",
  ];

  for (let w in pos) {
    let pArray = pos[w].split(","); //a1,a2,a3
    let hasWon = pArray.every((option) => board[option] === player);
    if (hasWon) {
      return true;
    }
  }

  return false;
}

function checkDraw() {
  for (let i in board) {
    if (board[i] === "") {
      return false;
    }
  }

  return true;
}
