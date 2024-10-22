const cells = document.querySelectorAll('.js-cell')
const titleHeader = document.querySelector('.js-titleHeader'); 
const xPlayerDisplay = document.querySelector('.js-xPlayer');
const oPlayerDisplay = document.querySelector('.js-oPlayer');

const restartBtn = document.querySelector('.js-restartBtn');
 
let player = "X";
let isPauseGame = false;
let isGameStart = false;

const inputCells = [
    '', '', '',
    '', '', '',
    '', '', '',
];

const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], //Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], //Columns
    [0, 4, 8], [2, 4, 6] //Diagonals
];

// Add click event
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => tapCell(cell, index))
});

tapCell = (cell, index) => {
    if (cell.textContent === '' && !isPauseGame) {
        isGameStart = true;
        updateCell(cell, index);

        
        if (!checkWinner()) {
            changePlayer();
            randomPick();
        }
    }
}

updateCell = (cell, index) => {
    cell.textContent = player;
    inputCells[index] = player;
    cell.style.color = (player === 'X') ? '#1892EA' : '#A737FF';
}

changePlayer = () => {
    player = (player === 'X') ? 'O' : 'X';
}

randomPick = () => {
    isPauseGame = true;

    setTimeout(() => {

        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * inputCells.length);
        } while (inputCells[randomIndex] !== '')
        updateCell(cells[randomIndex], randomIndex, player);

        if (!checkWinner()) {
            changePlayer();
            isPauseGame = false;
            return;
        }
         player = (player == 'X') ? 'O' : 'X'
    }, 1000);
   
}


checkWinner = () => {
    for (const [a, b, c] of winConditions) {
        if (inputCells[a] === player &&
            inputCells[b] === player &&
            inputCells[c] === player) {
            declareWinner([a, b, c]);
                return true;
            }
    }

    // Check Draw
    if (inputCells.every(cell => cell !== '')) {
        declareDraw();
        return true;
    }
}

declareWinner = (winningIndices) => {
    titleHeader.textContent = `${player} WIN!`
    isPauseGame = true;

    winningIndices.forEach((index) => {
        cells[index].style.background = `#2A2343`
    });

    restartBtn.style.visibility = 'visible'
}

declareDraw = () => {
    titleHeader.textContent = 'DRAW!'
    isPauseGame = true;
    restartBtn.style.visibility = 'visible'
}
 
choosePlayer = (selectedPlayer) => {
    if (!isGameStart) {
        player = selectedPlayer
        if (player === 'X') {
            xPlayerDisplay.classList.add('player-active');
            oPlayerDisplay.classList.remove('player-active');
        } else {
            oPlayerDisplay.classList.add('player-active');
            xPlayerDisplay.classList.remove('player-active');
        }
    }
}

restartBtn.addEventListener('click', () => {
    restartBtn.style.visibility = 'hidden';
    inputCells.fill('');
    cells.forEach((cell) => {
        cell.textContent = '';
        cell.style.background = ''
    });
    isPauseGame = false;
    isGameStart = false;
    titleHeader.textContent = 'Choose'
})


