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
        if (World.deployMode) {
            // Need to deploy a city
            var randId = chance.integer({
                min: 0,
                max: World.hexCount
            });
            var hex = World.getHex(randId);

            if (hex != null && hex.landType != LandType.WATER && hex.owner == null && hex.entities.length == 0) {
                hex.add(new City(this.leader));
                World.endTurn();
                return;
            }
        } else {
            // Have nothing left to do
            World.endTurn();
        }
    }
});