var CharSelect = {
    showing: false,
    bound: false,

    $ov: null,
    $ui: null,
    $chars: null,

    bind: function () {
        if (this.bound) {
            return;
        }

        this.bound = true;

        this.$ov = $('#overlay');
        this.$ui = $('#charselect');
        this.$chars = this.$ui.find('.leaders');
        this.$chars.html('');

        var leaders = Utils.shuffleArray(Leaders.leaders.slice());

        var mkLeader = function (leader) {
            var $leader = $('<div />')
                .addClass('leader')
                .addClass('option')
                .append('<img src="assets/images/flag_' + leader.id + '.png" class="flag" />')
                .append(leader.title + ' ' + leader.name + ' of ' + leader.nation)
                .click(function() {
                    MainMenu.hide();
                    this.hide();
                    Game.start(leader.id);
                }.bind(this))
                .appendTo(this.$chars)
        }.bind(this);

        for (var i = 0; i < leaders.length; i++) {
            var leader = leaders[i];
            mkLeader(leader);
        }
    },

    show: function () {
        if (this.showing) {
            return;
        }

        this.showing = true;

        this.bind();

        this.$ov.fadeIn('fast');
        this.$ui.slideDown();
    },

    hide: function () {
        this.$ov.fadeOut('fast');
        this.$ui.slideUp();
        this.showing = false;
    }
};