var MainMenu = {
    showing: false,
    $element: null,

    show: function () {
        if (this.showing) {
            return;
        }

        this.showing = true;
        this.$element = $('#mainmenu');
        this.$element.fadeIn('slow');
    }
};