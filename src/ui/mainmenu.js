var MainMenu = {
    showing: false,
    bound: false,
    $element: null,

    bind: function () {
        if (this.bound) {
            return;
        }

        this.bound = true;

        $('#mm-new').click(function() {
            if (!this.showing) {
                return;
            }

            CharSelect.show();
        }.bind(this));

        $('#mm-howtoplay').click(function() {
            if (!this.showing) {
                return;
            }
        }.bind(this));
    },

    show: function () {
        if (this.showing) {
            return;
        }

        this.bind();

        this.showing = true;
        this.$element = $('#mainmenu');
        this.$element.fadeIn('slow');
    },

    hide: function () {
        this.showing = false;
        this.$element.hide();
    }
};