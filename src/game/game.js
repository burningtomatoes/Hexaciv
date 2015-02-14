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

        World.generate(1000, 500);

        this.started = true;
    },

    update: function () {
        if (!this.started) {
            return;
        }

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