var Leader = Class.extend({
    id: null,
    title: null,
    name: null,
    revealed: false,
    nation: null,
    ai: null,
    isPlayer: false,

    init: function (id, title, name, nation) {
        this.id = id;
        this.title = title;
        this.name = name;
        this.revealed = false;
        this.nation = nation;
        this.ai = new Ai(this);
        this.isPlayer = false;
    },

    update: function () {
        if (!this.isPlayer) {
            this.ai.update();
        }
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
            new Leader(LeaderIds.NETHERLANDS,              'King',                 'Willie',        'The Netherlands'),
            new Leader(LeaderIds.UNITED_STATES_AMERICA,    'President',            'Obama',         'The United States'),
            new Leader(LeaderIds.ENGLAND,                  'Queen',                'Elizabeth II',  'The United Kingdom'),
            new Leader(LeaderIds.NORTH_KOREA,              'Supreme Leader',       'Jong-un',       'North Korea'),
            new Leader(LeaderIds.CHINA,                    'President',            'Jinping',       'China'),
            new Leader(LeaderIds.RUSSIA,                   'President',            'Putin',         'Russia'),
            new Leader(LeaderIds.GERMANY,                  'Chancellor',           'Merkel',        'Germany')
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