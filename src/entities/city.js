var City = Entity.extend({
    img: null,
    imgFlag: null,
    name: null,
    citizens: 1,
    isCity: true,
    unitCountdown: 0,

    init: function (owner) {
        this._super();

        this.owner = owner;

        this.img = Game.images.load('hex_city.png');
        this.imgFlag = Game.images.load('flag_' + this.owner.id + '.png');
        this.name = chance.city();
        this.citizens = 1;
        this.unitCountdown = 0;
    },

    onDeploy: function () {
        Notices.addNotice(this.owner.name + ' has founded ' + this.name + '!');

        var borders = this.hex.getSurroundingHexes(1);

        for (var i = 0; i < borders.length; i++) {
            var hex = borders[i];
            hex.setOwner(this.owner);
        }
    },

    checkUnits: function () {
        this.unitCountdown -= this.citizens;

        if (this.unitCountdown <= 0) {
            Notices.addNotice(this.owner.name + ' has received a new unit.');
            this.hex.add(new Unit(this.owner));
            this.unitCountdown = 100;
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

            ctx.font = '8px pixelmix';

            var txt = this.citizens.toString();
            var textSize = ctx.measureText(txt);

            x += (World.hexSize.WIDTH / 2) - (textSize.width / 2);
            y += 20;

            x = Math.round(x);
            y = Math.round(y);

            ctx.fillStyle = '#000';
            ctx.fillText(txt, x + 1, y + 1);
            ctx.fillStyle = '#fff';
            ctx.fillText(txt, x, y);
        }
        {
            var x = this.hex.x;
            var y = this.hex.y;

            x += (World.hexSize.WIDTH / 2) - (20 / 2);
            y += 30;

            x = Math.round(x);
            y = Math.round(y);

            ctx.drawImage(this.imgFlag, 0, 0, this.imgFlag.width, this.imgFlag.height, x, y, 20, 13);
        }
    }
});