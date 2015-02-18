var City = Entity.extend({
    img: null,
    imgFlag: null,
    name: null,

    init: function (owner) {
        this._super();

        this.owner = owner;

        this.img = Game.images.load('hex_city.png');
        this.imgFlag = Game.images.load('flag_' + this.owner.id + '.png');
        this.name = chance.city();
    },

    onDeploy: function () {
        Notices.addNotice(this.owner.name + ' has founded ' + this.name + '!');

        var borders = this.hex.getSurroundingHexes(1);

        for (var i = 0; i < borders.length; i++) {
            var hex = borders[i];
            hex.setOwner(this.owner);
            console.log('I own ' + hex.id);
        }
    },

    draw: function (ctx) {
        {
            ctx.drawImage(this.img, 0, 0, World.hexSize.WIDTH, World.hexSize.HEIGHT, this.hex.x, this.hex.y, World.hexSize.WIDTH, World.hexSize.HEIGHT)
        }
        {
            var x = this.hex.x;
            var y = this.hex.y;

            ctx.font = '8px pixelmix';

            var textSize = ctx.measureText(this.name);

            x += (World.hexSize.WIDTH / 2) - (textSize.width / 2);
            y -= 5;

            x = Math.round(x);
            y = Math.round(y);

            ctx.fillStyle = '#000';
            ctx.fillText(this.name, x + 1, y + 1);
            ctx.fillStyle = this.owner.color;
            ctx.fillText(this.name, x, y);
        }
        {
            var x = this.hex.x;
            var y = this.hex.y;

            x += (World.hexSize.WIDTH / 2) - (20 / 2);
            y += 25;

            x = Math.round(x);
            y = Math.round(y);

            ctx.drawImage(this.imgFlag, 0, 0, this.imgFlag.width, this.imgFlag.height, x, y, 20, 13);
        }
    }
});