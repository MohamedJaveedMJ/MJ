// script.js
const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('game-board');
const messageElement = document.getElementById('message');
const restartButton = document.getElementById('restartButton');
const overlay = document.getElementById('overlay');
const resultMessage = document.getElementById('resultMessage');
const newGameButton = document.getElementById('newGameButton');

let currentPlayer = 'X';
let gameActive = true;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleClick(e) {
  const cell = e.target;
  if (!gameActive || cell.classList.contains('taken')) return;

  cell.textContent = currentPlayer;
  cell.classList.add('taken');
  cell.dataset.player = currentPlayer;

  if (checkWin(currentPlayer)) {
    endGame(`${currentPlayer} wins!`);
  } else if (isDraw()) {
    endGame('It\'s a draw!');
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateMessage();
  }
}

function checkWin(player) {
  return winningCombinations.some(combination =>
    combination.every(index =>
      cells[index].dataset.player === player
    )
  );
}

function isDraw() {
  return [...cells].every(cell => cell.classList.contains('taken'));
}

function endGame(result) {
  gameActive = false;
  resultMessage.textContent = result;
  overlay.classList.remove('hidden');
}

function updateMessage() {
  messageElement.textContent = `${currentPlayer}'s turn`;
}

function restartGame() {
  currentPlayer = 'X';
  gameActive = true;
  messageElement.textContent = `${currentPlayer}'s turn`;
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('taken');
    delete cell.dataset.player;
  });
  overlay.classList.add('hidden');
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartButton.addEventListener('click', restartGame);
newGameButton.addEventListener('click', restartGame);

updateMessage();
