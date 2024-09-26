// gameRules.js - Enforcing the rules of Backgammon

const gameRules = {
    // Function to validate if the move is allowed
    isMoveValid: function (piece, startPos, diceRoll) {
        const targetPos = currentPlayer === "yellow" ? startPos + diceRoll : startPos - diceRoll;

        // Check if the move is within bounds
        if (targetPos < 0 || targetPos >= board.children.length) return false;

        // Check if the target position is valid (implement capturing, blocking, etc.)
        const targetSpot = board.children[targetPos];
        return !this.isBlocked(targetSpot);
    },

    // Check if a target position is blocked by two or more opponent's pieces
    isBlocked: function (spot) {
        const opponentColor = currentPlayer === "yellow" ? "white" : "yellow";
        const piecesInSpot = spot.querySelectorAll(`.${opponentColor}-piece`);
        return piecesInSpot.length >= 2;
    },

    // Function to enforce capturing of a single opponent's piece
    capturePiece: function (targetSpot) {
        const opponentColor = currentPlayer === "yellow" ? "white" : "yellow";
        const opponentPiece = targetSpot.querySelector(`.${opponentColor}-piece`);
        if (opponentPiece) {
            // Move the captured piece to the bar
            document.getElementById(`${opponentColor}-bar`).appendChild(opponentPiece);
        }
    },

    // Function to bear off pieces once all of a player's pieces are in their home board
    canBearOff: function (piece) {
        const homeStart = currentPlayer === "yellow" ? 18 : 0;
        const homeEnd = currentPlayer === "yellow" ? 23 : 5;

        // Check if all pieces are in the home quadrant
        const pieces = document.querySelectorAll(`.${currentPlayer}-piece`);
        for (const p of pieces) {
            const pos = Array.from(board.children).indexOf(p.parentElement);
            if (pos < homeStart || pos > homeEnd) return false;
        }
        return true;
    }
};
