var Mouse = {
    posX: 0,
    posY: 0,

    scaledX: 0,
    scaledY: 0,

    wasSet: false,

    imgDefault: null,

    w: 16,
    h: 16,

    lastMouseDown: 0,
    mouseDown: 0,

    init: function () {
        this.wasSet = false;

        $('body').mousemove(function (e) {
            this.posX = e.pageX;
            this.posY = e.pageY;
            this.scaledX = Math.round(this.posX / Canvas.upscaleRatio);
            this.scaledY = Math.round(this.posY / Canvas.upscaleRatio);
            this.wasSet = true;
        }.bind(this));

        document.body.onmousedown = function() {
            this.mouseDown++;
        }.bind(this);

        document.body.onmouseup = function() {
            this.mouseDown--;
        }.bind(this);

        this.imgDefault = Game.images.load('cursor_default.png');
    },

    update: function () {
        this.lastMouseDown = this.mouseDown;
    },

    didClick: function () {
        return !this.wasMouseDown() && this.isMouseDown();
    },

    isMouseDown: function () {
        return this.mouseDown > 0;
    },

    wasMouseDown: function () {
        return this.lastMouseDown > 0;
    },

    draw: function (ctx) {
        if (!this.wasSet) {
            return;
        }

        ctx.drawImage(this.imgDefault, 0, 0, this.w, this.h, this.scaledX, this.scaledY, this.w, this.h);
    }
};