var Hex = Class.extend({
    id: '??',
    x: 0,
    y: 0,

    landType: null,

    points: [],

    owner: null,

    entities: [],

    isActive: false,

    pCoordX: 0,
    pCoordY: 0,

    init: function (id, x, y) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.landType = x % 3 ? LandType.SAND : LandType.GRASS;
        this.owner = null;

        if (x == 0 || y == 0 || y == World.hexSize.HEIGHT / 2 || x == World.hexSize.WIDTH) {
            this.landType = LandType.WATER;
        }

        this.preparePoints();

        this.entities = [];

        this.isActive = false;

        this.pCoordX = 0;
        this.pCoordY = 0;
    },

    getSurroundingHexes: function (range) {
        var hexes = [];

        for (var i = 0; i < World.hexCount; i++) {
            var hex = World.hexes[i];

            if (Utils.hexDistance(this, hex) <= range) {
                hexes.push(hex);
            }
        }

        return hexes;
    },

    add: function (e) {
        e.hex = this;

        if (this.owner == null && e.owner != null) {
            this.setOwner(e.owner);
        } else if (this.owner != null && e.owner == null) {
            e.owner = this.owner;
        }

        this.entities.push(e);
        e.onDeploy();
    },

    setOwner: function (owner) {
        this.owner = owner;
        this.determineBorderColor();
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

    update: function () {
        for (var i = 0; i < this.entities.length; i++) {
            var e = this.entities[i];
            e.update();
        }
    },

    borderColor: null,

    determineBorderColor: function () {
        if (this.owner != null) {
            this.borderColor = Utils.hexToRgb(this.owner.color);
        } else {
            this.borderColor = null;
        }
    },

    draw: function (ctx) {
        // Draw hexagon land type
        ctx.drawImage(Game.images.load('hex_' + this.landType + '.png'), 0, 0, World.hexSize.WIDTH, World.hexSize.HEIGHT, this.x, this.y, World.hexSize.WIDTH, World.hexSize.HEIGHT);

        // Draw hexagon path
        if (this.borderColor != null) {
            ctx.strokeStyle = 'rgba(' + this.borderColor.r + ', ' + this.borderColor.g + ', ' + this.borderColor.b + ', 1)';
            ctx.lineWidth = 2;
        } else {
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.75)';
            ctx.lineWidth = 1;
        }

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

        if (this.isActive) {
            if (this.landType == LandType.WATER) {
                ctx.fillStyle = 'rgba(255, 0, 0, 0.4)';
            } else {
                ctx.fillStyle = 'rgba(100, 50, 255, 0.4)';
            }

            ctx.fill();
        } else if (this.borderColor != null) {
            ctx.fillStyle = 'rgba(' + this.borderColor.r + ', ' + this.borderColor.g + ', ' + this.borderColor.b + ', 0.25)';
            ctx.fill();
        }

        for (var i = 0; i < this.entities.length; i++) {
            var e = this.entities[i];
            e.draw(ctx);
        }
    },

    rect: function () {
        var r = { };
        r.left = this.x;
        r.top = this.y;
        r.width = World.hexSize.WIDTH;
        r.height = World.hexSize.HEIGHT;
        r.right = r.left + r.width;
        r.bottom = r.top + r.height;
        return r;
    }
});
