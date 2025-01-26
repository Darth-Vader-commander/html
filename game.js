const playerBoard = document.getElementById("player-grid");
const computerBoard = document.getElementById("computer-grid");
const startButton = document.getElementById("start-game");

const boardSize = 10;
let playerShips = [];
let computerShips = [];

const createBoard = (boardId, isPlayer) => {
    const grid = document.getElementById(boardId);
    grid.innerHTML = '';
    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            const cell = document.createElement("div");
            cell.classList.add("grid-cell");
            cell.dataset.row = row;
            cell.dataset.col = col;
            if (isPlayer) {
                cell.addEventListener("click", handlePlayerAttack);
            }
            grid.appendChild(cell);
        }
    }
};

const handlePlayerAttack = (e) => {
    const row = e.target.dataset.row;
    const col = e.target.dataset.col;

    if (computerShips.some(ship => ship.row === parseInt(row) && ship.col === parseInt(col))) {
        e.target.classList.add("hit");
        alert("You hit the computer's ship!");
    } else {
        e.target.classList.add("miss");
        alert("You missed.");
    }

    // After player's attack, computer will retaliate
    handleComputerAttack();
};

const handleComputerAttack = () => {
    const randomRow = Math.floor(Math.random() * boardSize);
    const randomCol = Math.floor(Math.random() * boardSize);
    const cell = playerBoard.querySelector(`[data-row='${randomRow}'][data-col='${randomCol}']`);

    if (playerShips.some(ship => ship.row === randomRow && ship.col === randomCol)) {
        cell.classList.add("hit");
        alert("Computer hit your ship!");
    } else {
        cell.classList.add("miss");
        alert("Computer missed.");
    }
};

const placeShips = () => {
    // Simulate player and computer placing ships randomly on the grid
    for (let i = 0; i < 5; i++) {
        let playerShip;
        do {
            playerShip = { row: Math.floor(Math.random() * boardSize), col: Math.floor(Math.random() * boardSize) };
        } while (playerShips.some(ship => ship.row === playerShip.row && ship.col === playerShip.col));
        playerShips.push(playerShip);

        const playerCell = playerBoard.querySelector(`[data-row='${playerShip.row}'][data-col='${playerShip.col}']`);
        playerCell.classList.add("ship");

        let computerShip;
        do {
            computerShip = { row: Math.floor(Math.random() * boardSize), col: Math.floor(Math.random() * boardSize) };
        } while (computerShips.some(ship => ship.row === computerShip.row && ship.col === computerShip.col));
        computerShips.push(computerShip);

        const computerCell = computerBoard.querySelector(`[data-row='${computerShip.row}'][data-col='${computerShip.col}']`);
        computerCell.classList.add("ship");
    }
};

startButton.addEventListener("click", () => {
    createBoard("player-grid", true);
    createBoard("computer-grid", false);
    placeShips();
});
