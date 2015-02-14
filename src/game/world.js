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

    generate: function (width, height) {
        this.hexes = [];
        this.hexCount = 0;

        var row = 0;
        var y = 0.0;

        while (y + this.hexSize.HEIGHT <= height) {
            var col = 0;
            var offset = 0.0;

            if (row % 2 == 1) {
                offset = ((this.hexSize.WIDTH - this.hexSize.SIDE) / 2) + this.hexSize.SIDE;
                col = 1;
            }

            var x = offset;

            while (x + this.hexSize.WIDTH <= width) {
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

    },

    draw: function (ctx) {
        for (var i = 0; i < this.hexCount; i++) {
            var hex = this.hexes[i];
            hex.draw(ctx);
        }
    }
};