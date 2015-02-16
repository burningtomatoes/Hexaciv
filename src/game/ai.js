var Ai = Class.extend({
    leader: null,

    init: function (leader) {
        this.leader = leader;
    },

    isPlaying: function () {
        return World.turnLeader === this.leader;
    },

    thoughtDelayer: 0,

    update: function () {
        if (!this.isPlaying()) {
            return;
        }

        if (this.thoughtDelayer == 0) {
            this.thoughtDelayer = chance.integer({
                min: 30,
                max: 100
            })
        }

        if (this.thoughtDelayer > 0) {
            this.thoughtDelayer--;
        }

        if (this.thoughtDelayer == 0) {
            this.think();
        }
    },

    think: function () {
        World.endTurn();
    }
});