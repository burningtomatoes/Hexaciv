var Game = {
    images: null,
    audio: null,
    stages: null,

    start: function () {
        this.images = new ImageLoader();
        this.audio = new AudioLoader();
        this.stages = new StageLoader();

        World.generate(1000, 500);
    },

    update: function () {
        World.update();
    },

    draw: function (ctx) {
        World.draw(ctx);
    }
};