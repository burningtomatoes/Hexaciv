var Ai = Class.extend({
    leader: null,

    init: function (leader) {
        this.leader = leader;
    },

    isPlaying: function () {
        return World.turnLeader === this.leader;
    },

    update: function () {

        if (!this.isPlaying()) {
            return;
        }
        console.log('thinks');
        World.endTurn();
    }
});