var Leader = Class.extend({
    id: null,
    title: null,
    name: null,
    revealed: false,

    init: function (id, title, name) {
        this.id = id;
        this.title = title;
        this.name = name;
        this.revealed = false;
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
            new Leader(LeaderIds.NETHERLANDS,              'King',                 'Willie'),
            new Leader(LeaderIds.UNITED_STATES_AMERICA,    'President',            'Obama'),
            new Leader(LeaderIds.ENGLAND,                  'Queen',                'Elizabeth II'),
            new Leader(LeaderIds.NORTH_KOREA,              'Supreme Leader',       'Jong-un'),
            new Leader(LeaderIds.CHINA,                    'President',            'Jinping'),
            new Leader(LeaderIds.RUSSIA,                   'President',            'Putin'),
            new Leader(LeaderIds.GERMANY,                  'Chancellor',           'Merkel')
        ];
    },

    getLeaders: function () {
        return this.leaders;
    },

    getLeader: function (id) {
        for (var i = 0; i < this.leaders.length; i++) {
            var leader = this.leaders[i];
        }
    },

    selectRandomLeaders: function (amount) {
        var leaders = this.leaders.slice();
        var amountToSplice = leaders.length - amount;

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