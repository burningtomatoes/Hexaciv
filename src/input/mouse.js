var Mouse = {
    posX: 0,
    posY: 0,

    scaledX: 0,
    scaledY: 0,

    wasSet: false,

    imgDefault: null,

    w: 16,
    h: 16,

    init: function () {
        this.wasSet = false;

        $('body').mousemove(function (e) {
            this.posX = e.pageX;
            this.posY = e.pageY;
            this.scaledX = Math.round(this.posX / Canvas.upscaleRatio);
            this.scaledY = Math.round(this.posY / Canvas.upscaleRatio);
            this.wasSet = true;
        }.bind(this));

        this.imgDefault = Game.images.load('cursor_default.png');
    },

    draw: function (ctx) {
        if (!this.wasSet) {
            return;
        }

        ctx.drawImage(this.imgDefault, 0, 0, this.w, this.h, this.scaledX, this.scaledY, this.w, this.h);
    }
};