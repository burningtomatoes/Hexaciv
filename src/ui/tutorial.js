var Tutorial = {
    showing: false,
    $element: $('#tutorial'),

    show: function (title, text) {
        if (this.showing) {
            return;
        }

        this.showing = true;

        this.$element.find('h4').text(title);
        this.$element.find('p').text(text);
        this.$element.slideDown();
    },

    hide: function () {
        if (!this.showing) {
            return;
        }

        this.showing = false;

        this.$element.slideUp();
    }
};