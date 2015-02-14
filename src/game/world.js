var LandType = {
    GRASS: 'grass',
    SAND: 'sand',
    WATER: 'water'
};

var World = {
    hexes: [],
    hexCount: 0,

    hexSize: {
        HEIGHT: 50,
        WIDTH: 65,
        SIDE: 35
    },

    idGenLetters: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],

    widthPx: 0,
    heightPx: 0,

    generate: function (width, height) {
        this.hexes = [];
        this.hexCount = 0;

        var widthPx = width * this.hexSize.WIDTH;
        var heightPx = height * this.hexSize.HEIGHT;

        this.widthPx = widthPx;
        this.heightPx = heightPx;

        var row = 0;
        var y = 0.0;

        while (y + this.hexSize.HEIGHT <= heightPx) {
            var col = 0;
            var offset = 0.0;

            if (row % 2 == 1) {
                offset = ((this.hexSize.WIDTH - this.hexSize.SIDE) / 2) + this.hexSize.SIDE;
                col = 1;
            }

            var x = offset;

            while (x + this.hexSize.WIDTH <= widthPx) {
                var hex = new Hex(this.generateHexId(row, col), x, y);
                console.log('Created Hex ' + hex.id + ' at ' + hex.x + ',' + hex.y, hex);
                this.hexes.push(hex);

                this.hexCount++;

                col += 2;
                x += this.hexSize.WIDTH + this.hexSize.SIDE;
            }

            row++;
            y += this.hexSize.HEIGHT / 2;
        }

        Camera.centerToMap();
    },

    generateHexId: function (row, col) {
        var result = '';
        var idx = row;

        while (idx > 25) {
            result = this.idGenLetters[idx] + result;
            idx -= 26;
        }

        return this.idGenLetters[idx] + result + (col + 1);
    },

    update: function () {
        Camera.update();
    },

    draw: function (ctx) {
        this.drawHexes(ctx);
        this.drawFog(ctx);
    },

    drawHexes: function (ctx) {
        ctx.save();
        ctx.translate(Camera.translateX(0), Camera.translateY(0));

        for (var i = 0; i < this.hexCount; i++) {
            var hex = this.hexes[i];
            hex.draw(ctx);
        }

        ctx.restore();
    },

    drawFog: function (ctx) {
        var grd = ctx.createRadialGradient(Canvas.canvas.width / 2, Canvas.canvas.height / 2, Canvas.canvas.height / 4, Canvas.canvas.width / 2, Canvas.canvas.height / 2, Canvas.canvas.height / 2);
        grd.addColorStop(0, "rgba(0, 0, 0, 0)");
        grd.addColorStop(1, "rgba(150, 150, 200, 0.25)");
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, Canvas.canvas.width, Canvas.canvas.height);
    }
};