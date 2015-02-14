var Hex = Class.extend({
    id: '??',
    x: 0,
    y: 0,

    landType: null,

    points: [],

    init: function (id, x, y) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.landType = x % 3 ? LandType.SAND : LandType.GRASS;

        if (x == 0 || y == 0 || y == World.hexSize.HEIGHT / 2 || x == World.hexSize.WIDTH) {
            this.landType = LandType.WATER;
        }

        this.preparePoints();
    },

    preparePoints: function () {
        this.points = [];

        var x1 = (World.hexSize.WIDTH - World.hexSize.SIDE) / 2;
        var y1 = World.hexSize.HEIGHT / 2;

        this.points.push(new Point(x1 + this.x, this.y));
        this.points.push(new Point(x1 + World.hexSize.SIDE + this.x, this.y));
        this.points.push(new Point(World.hexSize.WIDTH + this.x, y1 + this.y));
        this.points.push(new Point(x1 + World.hexSize.SIDE + this.x, World.hexSize.HEIGHT + this.y));
        this.points.push(new Point(x1 + this.x, World.hexSize.HEIGHT + this.y));
        this.points.push(new Point(this.x, y1 + this.y));
    },

    draw: function (ctx) {
        // Draw hexagon land type
        ctx.drawImage(Game.images.load('hex_' + this.landType + '.png'), 0, 0, World.hexSize.WIDTH, World.hexSize.HEIGHT, this.x, this.y, World.hexSize.WIDTH, World.hexSize.HEIGHT);

        // Draw hexagon path
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.75)';
        ctx.lineWidth = 1;
        ctx.beginPath();

        for (var i = 0; i < 6; i++) {
            var p = this.points[i];

            if (i == 0) {
                ctx.moveTo(p.x, p.y);
            } else {
                ctx.lineTo(p.x, p.y);
            }
        }

        ctx.closePath();
        ctx.stroke();
    }
});