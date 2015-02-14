var Scoreboard = {
    $elem: null,

    init: function () {
        this.$elem = $('#score');
        this.$elem.hide();

        window.setInterval(this.updateUi.bind(this), 5000);
    },

    updateUi: function () {
        this.$elem.html('');

        for (var i = 0; i < World.leaders.length; i++) {
            var leader = World.leaders[i];

            var $leader = $('<div />')
                .addClass('leader')
                .append('<img class="flag" src="assets/images/flag_' + leader.id + '.png" />')
                .append(leader.title + ' ' + leader.name)
                .appendTo(this.$elem);
        }


        this.$elem.show();
    }
};