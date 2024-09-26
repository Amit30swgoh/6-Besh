// localStorage.js - Save and load game state using browser's localStorage

const storage = {
    // Save the current game state to localStorage
    saveGameState: function () {
        const gameState = {
            pieces: this.getPiecesState(),
            currentPlayer: currentPlayer,
            diceRolls: diceRolls
        };
        localStorage.setItem('backgammonGameState', JSON.stringify(gameState));
        this.showAlert('Game state saved!');
    },

    // Load the saved game state from localStorage
    loadGameState: function () {
        const savedState = localStorage.getItem('backgammonGameState');
        if (savedState) {
            const { pieces, currentPlayer: savedPlayer, diceRolls: savedDiceRolls } = JSON.parse(savedState);
            this.restorePieces(pieces);
            currentPlayer = savedPlayer;
            diceRolls = savedDiceRolls;
            this.showAlert('Game state loaded!');
        } else {
            this.showAlert('No saved game state found.');
        }
    },

    // Get the current state of the pieces on the board
    getPiecesState: function () {
        return Array.from(document.querySelectorAll('.piece')).map(piece => {
            const position = Array.from(board.children).indexOf(piece.parentElement);
            return {
                color: piece.classList.contains('white-piece') ? 'white' : 'yellow',
                position
            };
        });
    },

    // Restore pieces to their saved positions
    restorePieces: function (pieces) {
        pieces.forEach(pieceData => {
            const piece = document.createElement('div');
            piece.classList.add('piece', `${pieceData.color}-piece`);
            board.children[pieceData.position].appendChild(piece);
        });
    },

    // Utility function to display alerts
    showAlert: function (message) {
        alert(message);
    }
};
