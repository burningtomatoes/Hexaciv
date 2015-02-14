var Mouse = {
    posX: 0,
    posY: 0,

    wasSet: false,

    imgDefault: null,

    w: 16,
    h: 16,

    init: function () {
        this.wasSet = false;

        $('body').mousemove(function (e) {
            this.posX = e.pageX;
            this.posY = e.pageY;
            this.wasSet = true;
        }.bind(this));

        this.imgDefault = Game.images.load('cursor_default.png');
    },

    draw: function (ctx) {
        if (!this.wasSet) {
            return;
        }

        ctx.drawImage(this.imgDefault, 0, 0, this.w, this.h, Math.round(this.posX / Canvas.upscaleRatio), Math.round(this.posY / Canvas.upscaleRatio), this.w, this.h);
    }
};