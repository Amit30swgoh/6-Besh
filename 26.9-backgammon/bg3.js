// bg3.js - Advanced gameplay mechanics and rule refinement

document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    const rollBtn = document.getElementById("roll-btn");
    let currentPlayer = "yellow";
    let diceRolls = [];
    let activePiece = null;
    const playerPieces = { yellow: [], white: [] };
    const maxBoardPositions = 24;

    // Dice Roll Functionality
    function rollDice() {
        const dice1 = Math.floor(Math.random() * 6) + 1;
        const dice2 = Math.floor(Math.random() * 6) + 1;
        diceRolls = [dice1, dice2];
        updateDiceDisplay(dice1, dice2);
        enablePieceSelection();
    }

    function updateDiceDisplay(dice1, dice2) {
        document.getElementById("dice1").textContent = dice1;
        document.getElementById("dice2").textContent = dice2;
        animateDiceRolls();
    }

    // Animate the dice rolls visually
    function animateDiceRolls() {
        const diceElements = [document.getElementById("dice1"), document.getElementById("dice2")];
        diceElements.forEach(dice => {
            dice.style.transform = "rotateX(360deg) rotateY(360deg)";
            setTimeout(() => {
                dice.style.transform = "rotateX(0deg) rotateY(0deg)";
            }, 500);
        });
    }

    // Piece Selection - allowing the player to select one of their pieces
    function enablePieceSelection() {
        const pieces = document.querySelectorAll(`.${currentPlayer}-piece`);
        pieces.forEach(piece => {
            piece.style.cursor = "pointer";
            piece.addEventListener("click", () => {
                if (!activePiece) {
                    activePiece = piece;
                    highlightPossibleMoves(piece);
                }
            });
        });
    }

    // Highlight possible moves based on dice roll
    function highlightPossibleMoves(piece) {
        const currentPosition = getCurrentPosition(piece);
        diceRolls.forEach(dice => {
            const newPosition = calculateNewPosition(currentPosition, dice);
            if (newPosition >= 0 && newPosition < maxBoardPositions) {
                const target = board.children[newPosition];
                highlightTargetPosition(target);
            }
        });
    }

    function getCurrentPosition(piece) {
        return Array.from(board.children).indexOf(piece.parentElement);
    }

    function calculateNewPosition(currentPosition, diceRoll) {
        return currentPlayer === "yellow"
            ? currentPosition + diceRoll
            : currentPosition - diceRoll;
    }

    function highlightTargetPosition(target) {
        target.style.border = "2px solid #00ff00";
        target.addEventListener("click", () => movePieceToTarget(target));
    }

    function movePieceToTarget(target) {
        if (activePiece && target) {
            target.appendChild(activePiece);
            activePiece.style.transition = "transform 0.5s ease";
            activePiece.style.transform = "scale(1.1)";

            setTimeout(() => {
                activePiece.style.transform = "scale(1)";
                resetHighlights();
                activePiece = null;
                diceRolls.shift(); // Use up the dice
                if (diceRolls.length === 0) endTurn();
            }, 300);
        }
    }

    // Reset highlights after a move
    function resetHighlights() {
        const triangles = document.querySelectorAll(".triangle");
        triangles.forEach(triangle => {
            triangle.style.border = "none";
        });
    }

    // End the player's turn and switch to the next player
    function endTurn() {
        currentPlayer = currentPlayer === "yellow" ? "white" : "yellow";
        alert(`${currentPlayer === "yellow" ? 'Yellow' : 'White'}'s Turn!`);
        showPlayerTooltip();
    }

    // Show a tooltip at the beginning of each turn
    function showPlayerTooltip() {
        const tooltip = document.createElement("div");
        tooltip.id = "player-tooltip";
        tooltip.style.position = "absolute";
        tooltip.style.bottom = "20px";
        tooltip.style.left = "50%";
        tooltip.style.transform = "translateX(-50%)";
        tooltip.style.padding = "10px";
        tooltip.style.backgroundColor = currentPlayer === "yellow" ? "#ffcc00" : "#ffffff";
        tooltip.style.color = currentPlayer === "yellow" ? "#333" : "#000";
        tooltip.style.borderRadius = "5px";
        tooltip.style.boxShadow = "0 0 10px rgba(0,0,0,0.5)";
        tooltip.style.fontSize = "1.2rem";
        tooltip.textContent = `${currentPlayer === "yellow" ? 'Yellow' : 'White'}'s Turn! Roll the dice to continue.`;

        document.body.appendChild(tooltip);

        setTimeout(() => {
            tooltip.remove();
        }, 3000);
    }

    // Rule Validation - Checking if moves are legal
    function isValidMove(piece, targetPosition) {
        const currentPosition = getCurrentPosition(piece);
        if (currentPlayer === "yellow" && currentPosition >= targetPosition) return false;
        if (currentPlayer === "white" && currentPosition <= targetPosition) return false;
        // Add more logic for valid moves here...
        return true;
    }

    // Detect when a player wins
    function checkWinCondition() {
        const yellowPieces = document.querySelectorAll(".yellow-piece");
        const whitePieces = document.querySelectorAll(".white-piece");

        if (yellowPieces.length === 0) {
            alert("Yellow wins!");
            resetGame();
        } else if (whitePieces.length === 0) {
            alert("White wins!");
            resetGame();
        }
    }

    // Reset the game board after a win
    function resetGame() {
        location.reload(); // Reload the page to reset the game
    }

    // Add event listener for dice roll button
    rollBtn.addEventListener("click", rollDice);

    // Initialize the tooltip for the first player
    showPlayerTooltip();
});
