var Unit = Entity.extend({
    isUnit: true,
    imgUnit: null,
    imgFlag: null,
    width: 32,
    height: 32,

    init: function (owner) {
        this._super();

        this.owner = owner;

        this.imgUnit = Game.images.load('unit.png');
        this.imgFlag = Game.images.load('flag_' + this.owner.id + '.png');
    },

    draw: function (ctx) {
        {
            var x = this.hex.x;
            var y = this.hex.y;

            x += (World.hexSize.WIDTH / 2) - (this.width / 2);
            y += (World.hexSize.HEIGHT / 2) - (this.height / 2);

            ctx.drawImage(this.imgUnit, 0, 0, this.height, this.width, x, y, this.height, this.width);


            y += this.height - 10;
            x += 11;

            ctx.drawImage(this.imgFlag, 0, 0, this.imgFlag.width, this.imgFlag.height, x, y, 20 / 2, 13 / 2);
        }
    }
});