// index.js - Initialize the Game and Interactions

document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById('board');
    const rollBtn = document.getElementById('roll-btn');
    const dice1 = document.getElementById('dice1');
    const dice2 = document.getElementById('dice2');
    let turn = 'yellow';

    // Initialize Pieces
    const pieces = { yellow: [], white: [] };

    // Function to roll the dice
    function rollDice() {
        const diceRoll1 = Math.floor(Math.random() * 6) + 1;
        const diceRoll2 = Math.floor(Math.random() * 6) + 1;
        dice1.textContent = diceRoll1;
        dice2.textContent = diceRoll2;

        turn = turn === 'yellow' ? 'white' : 'yellow';
        alert(`It's ${turn === 'yellow' ? 'Yellow' : 'White'}'s turn! Roll: ${diceRoll1}, ${diceRoll2}`);
    }

    // Function to add pieces to the board
    function addPiece(color, position) {
        const piece = document.createElement('div');
        piece.classList.add('piece');
        if (color === 'white') piece.classList.add('white-piece');
        board.children[position].appendChild(piece);
        pieces[color].push(piece);
    }

    // Initialize Board with pieces
    function initializeBoard() {
        addPiece('yellow', 0);
        addPiece('yellow', 0);
        addPiece('white', 23);
        addPiece('white', 23);
    }

    rollBtn.addEventListener('click', rollDice);
    initializeBoard();
});
