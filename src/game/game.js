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

        World.generate(20, 20);

        this.started = true;
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