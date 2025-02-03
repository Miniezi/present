const board = document.getElementById('board');
const resultDisplay = document.getElementById('result');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let boardState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function createBoard() {
    board.innerHTML = '';
    boardState.fill('');
    gameActive = true;
    currentPlayer = 'X';
    resultDisplay.textContent = '';

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.addEventListener('click', () => handleCellClick(i));
        board.appendChild(cell);
    }
}

function handleCellClick(index) {
    if (boardState[index] === '' && gameActive) {
        boardState[index] = currentPlayer;
        renderBoard();
        checkResult();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function renderBoard() {
    const cells = document.querySelectorAll('.cell');
    boardState.forEach((value, index) => {
        cells[index].textContent = value;
    });
}

function checkResult() {
    let roundWon = false;
    
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (boardState[a] === '' || boardState[b] === '' || boardState[c] === '') continue;
        if (boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            roundWon = true;
            break;
        }
    }
    
    if (roundWon) {
        resultDisplay.textContent = `Игрок ${currentPlayer} выиграл!`;
        gameActive = false;
        return;
    }

    if (!boardState.includes('')) {
        resultDisplay.textContent = 'Ничья!';
        gameActive = false;
    }
}

resetButton.addEventListener('click', createBoard);
createBoard();
