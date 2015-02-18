var Leader = Class.extend({
    id: null,
    title: null,
    name: null,
    revealed: false,
    nation: null,
    ai: null,
    isPlayer: false,
    color: 'red',

    init: function (id, title, name, nation, color) {
        this.id = id;
        this.title = title;
        this.name = name;
        this.revealed = false;
        this.nation = nation;
        this.ai = new Ai(this);
        this.isPlayer = false;
        this.color = color;
    },

    getCity: function () {
        for (var i = 0; i < World.hexes.length; i++) {
            var hex = World.hexes[i];

            for (var j = 0; j < hex.entities.length; j++) {
                var entity = hex.entities[j];

                if (entity.isCity && entity.owner === this) {
                    return entity;
                }
            }
        }

        return null;
    },

    update: function () {
        if (!this.isPlayer) {
            this.ai.update();
        }
    },

    getBorderCount: function () {
        var cnt = 0;

        for (var i = 0; i < World.hexes.length; i++) {
            var hex = World.hexes[i];

            if (hex.owner === this) {
                cnt++;
            }
        }

        return cnt;
    },

    isPlaying: function () {
        return World.turnLeader === this;
    }
});

var PlayerType = {
    PLAYER: 0,
    PC: 1
};

var LeaderIds = {
    NETHERLANDS: 'nl',
    UNITED_STATES_AMERICA: 'us',
    RUSSIA: 'ru',
    NORTH_KOREA: 'nk',
    ENGLAND: 'en',
    CHINA: 'cn',
    GERMANY: 'de'
};

var Leaders = {
    leaders: [],

    reset: function () {
        this.leaders = [
            new Leader(LeaderIds.NETHERLANDS,              'King',                 'Willie',        'The Netherlands',          '#FF8000'),
            new Leader(LeaderIds.UNITED_STATES_AMERICA,    'President',            'Obama',         'The United States',        '#0039A6'),
            new Leader(LeaderIds.ENGLAND,                  'Queen',                'Elizabeth II',  'The United Kingdom',       '#DF0101'),
            new Leader(LeaderIds.NORTH_KOREA,              'Supreme Leader',       'Kim Jong-un',   'North Korea',              '#014FA2'),
            new Leader(LeaderIds.CHINA,                    'President',            'Xi Jinping',    'China',                    '#FEDB00'),
            new Leader(LeaderIds.RUSSIA,                   'President',            'Putin',         'Russia',                   '#FFFFFF'),
            new Leader(LeaderIds.GERMANY,                  'Chancellor',           'Merkel',        'Germany',                  '#aaaaaa')
        ];
    },

    getLeaders: function () {
        return this.leaders;
    },

    getLeader: function (id) {
        for (var i = 0; i < this.leaders.length; i++) {
            var leader = this.leaders[i];
            if (leader.id === id) {
                return leader;
            }
        }
        return null;
    },

    selectRandomLeaders: function (amount, excludeId) {
        var leaders = this.leaders.slice();
        var amountToSplice = leaders.length - amount;

        if (excludeId != null) {
            for (var i = 0; i < leaders.length; i++) {
                var leader = leaders[i];

                if (leader.id === excludeId) {
                    leaders.splice(i, 1);
                    break;
                }
            }

            amountToSplice--;
        }

        for (var i = 0; i < amountToSplice; i++) {
            var idx = chance.integer({
                min: 0,
                max: leaders.length - 1
            });

            leaders.splice(idx, 1);
        }

        return Utils.shuffleArray(leaders);
    }
};