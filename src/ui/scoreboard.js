var Scoreboard = {
    $stats: null,
    $scoreboard: null,

    init: function () {
        this.$stats = $('#stats');

        this.$scoreboard = $('#score');
        this.$scoreboard.hide();

        this.$stats.hide();

        window.setInterval(this.updateUi.bind(this), 5000);
    },

    updateUi: function () {
        if (!Game.started) {
            this.$scoreboard.hide();
            this.$stats.hide();
            return;
        }

        this.$scoreboard.html('');

        for (var i = 0; i < World.leaders.length; i++) {
            var leader = World.leaders[i];

            if (!leader.isPlayer && !leader.revealed) {
                continue;
            }

            var $leader = $('<div />')
                .addClass('leader')
                .addClass(leader.isPlayer ? 'player' : 'ai')
                .append('<img class="flag" src="assets/images/flag_' + leader.id + '.png" />')
                .append(leader.title + ' ' + leader.name)
                .appendTo(this.$scoreboard);

            if (leader.isPlayer) {
                this.$stats.find('.col.player').html($leader.html());
            }

            if (leader.isPlaying()) {
                $leader.addClass('playing');
            }
        }

        this.$stats.find('.col.round').text(World.round > 0 ? 'Round ' + World.round : '');

        this.$scoreboard.show();
        this.$stats.show();
    }
};