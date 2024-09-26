// sounds.js - Adding sound effects to the game

const sounds = {
    diceRoll: new Audio('assets/sounds/dice-roll.mp3'),
    pieceMove: new Audio('assets/sounds/piece-move.mp3'),
    invalidMove: new Audio('assets/sounds/invalid-move.mp3'),
    win: new Audio('assets/sounds/win.mp3'),

    playSound: function (sound) {
        switch (sound) {
            case 'dice':
                this.diceRoll.play();
                break;
            case 'move':
                this.pieceMove.play();
                break;
            case 'invalid':
                this.invalidMove.play();
                break;
            case 'win':
                this.win.play();
                break;
        }
    }
};
