// localStorage.js - Save and load game state using browser's localStorage

const storage = {
    saveGameState: function () {
        const gameState = {
            pieces: Array.from(document.querySelectorAll('.piece')).map(piece => {
                const position = Array.from(board.children).indexOf(piece.parentElement);
                return { color: piece.classList.contains('white-piece') ? 'white' : 'yellow', position };
            }),
            currentPlayer: currentPlayer,
            diceRolls: diceRolls
        };
        localStorage.setItem('backgammonGameState', JSON.stringify(gameState));
        alert('Game state saved!');
    },

    loadGameState: function () {
        const savedState = localStorage.getItem('backgammonGameState');
        if (savedState) {
            const { pieces, currentPlayer: savedPlayer, diceRolls: savedDiceRolls } = JSON.parse(savedState);
            this.restorePieces(pieces);
            currentPlayer = savedPlayer;
            diceRolls = savedDiceRolls;
            alert('Game state loaded!');
        } else {
            alert('No saved game state found.');
        }
    },

    restorePieces: function (pieces) {
        pieces.forEach(pieceData => {
            const piece = document.createElement('div');
            piece.classList.add('piece');
            piece.classList.add(`${pieceData.color}-piece`);
            board.children[pieceData.position].appendChild(piece);
        });
    }
};
