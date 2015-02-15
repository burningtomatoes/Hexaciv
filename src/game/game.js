var Game = {
    images: null,
    audio: null,
    stages: null,

    initialized: false,
    started: false,

    $element: null,

    init: function () {
        if (this.initialized) {
            return;
        }

        Canvas.init();

        this.$element = $('#game');

        this.images = new ImageLoader();
        this.audio = new AudioLoader();
        this.stages = new StageLoader();

        Mouse.init();
        Keyboard.init();

        Scoreboard.init();

        this.initialized = true;
    },

    start: function (cb) {
        if (cb == null) cb = function () { };

        if (!this.initialized) {
            return;
        }

        if (this.started) {
            // Already started, stop first
            this.stop(this.start.bind(this, cb));
            return;
        }

        this.started = true;

        Leaders.reset();
        World.generate(21, 20);

        var startComplete = function () {
            this.$element.show();

            Scoreboard.updateUi();

            cb();
        }.bind(this);

        if (!this.$element.is(':visible')) {
            this.$element.stop().fadeIn('fast', startComplete);
        } else {
            startComplete();
        }
    },

    stop: function (cb) {
        if (cb == null) cb = function () { };

        if (!this.started) {
            return;
        }

        this.started = false;
        Scoreboard.updateUi();

        var endComplete = function () {
            this.$element.hide();

            World.clear();
            Scoreboard.updateUi();

            cb();
        }.bind(this);

        if (this.$element.is(':visible')) {
            this.$element.stop().fadeOut('fast', endComplete);
        } else {
            endComplete();
        }
    },

    update: function () {
        if (!this.started) {
            return;
        }

        Keyboard.update();
        World.update();
    },

    draw: function (ctx) {
        if (!this.initialized) {
            return;
        }

        World.draw(ctx);

        if (!this.started) {
            return;
        }

        Mouse.draw(ctx);
    }
};