var EpicFail = {
    showing: false,
    bound: false,

    $ov: null,
    $ui: null,

    bind: function () {
        if (this.bound) {
            return;
        }

        this.bound = true;

        this.$ov = $('#overlay');
        this.$ui = $('#epicfail');
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