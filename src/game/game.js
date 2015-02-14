var Game = {
    images: null,
    audio: null,
    stages: null,

    started: false,

    start: function () {
        if (this.started) {
            return;
        }

        this.images = new ImageLoader();
        this.audio = new AudioLoader();
        this.stages = new StageLoader();

        Mouse.init();
        Keyboard.init();

        Scoreboard.init();

        this.started = true;

        this.newGame();
    },

    newGame: function () {
        Leaders.reset();
        World.generate(21, 20);
    },

    update: function () {
        if (!this.started) {
            return;
        }

        Keyboard.update();
        World.update();
    },

    draw: function (ctx) {
        if (!this.started) {
            return;
        }

        World.draw(ctx);
        Mouse.draw(ctx);
    }
};