// settings.js - Game Settings and Preferences

const gameSettings = {
    theme: "classic",
    soundEnabled: true,
    playerNames: { yellow: "Player 1", white: "Player 2" },

    toggleSound: function () {
        this.soundEnabled = !this.soundEnabled;
        alert(`Sound ${this.soundEnabled ? 'enabled' : 'disabled'}`);
    },

    setPlayerNames: function (yellowName, whiteName) {
        this.playerNames.yellow = yellowName;
        this.playerNames.white = whiteName;
        alert(`Player names updated: ${yellowName} (Yellow), ${whiteName} (White)`);
    }
};
