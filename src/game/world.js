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

    widthPx: 0,
    heightPx: 0,

    leaders: [],

    player: null,

    round: 0,
    turn: 0,
    turnLeader: null,

    clear: function () {
        this.hexes = [];
        this.hexCount = 0;
        this.widthPx = 0;
        this.heightPx = 0;
        this.leaders = [];
        this.player = null;
        this.round = 0;
        this.turn = 0;
        this.turnLeader = null;
    },

    generate: function (width, height, playerLeaderId) {
        this.clear();

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
                var hex = new Hex(this.hexCount++, x, y);
                this.hexes.push(hex);

                col += 2;
                x += this.hexSize.WIDTH + this.hexSize.SIDE;
            }

            row++;
            y += this.hexSize.HEIGHT / 2;
        }

        this.player = Leaders.getLeader(playerLeaderId);
        this.player.isPlayer = true;

        this.leaders = [];
        this.leaders.push(this.player);
        this.leaders = this.leaders.concat(Leaders.selectRandomLeaders(4, playerLeaderId));
        this.leaders = Utils.shuffleArray(this.leaders);

        Camera.centerToMap();
    },

    beginRound: function () {
        this.round++;
        Scoreboard.updateUi();

        Notices.addNotice('Round ' + this.round + ' begins.');

        this.turn = -1;
        this.beginTurn();
    },

    beginTurn: function () {
        this.turn++;

        if (this.turn >= this.leaders.length) {
            // All leaders did their part, begin a new round instead (which in turn will start a new turn).
            this.beginRound();
            return;
        }

        this.turnLeader = this.leaders[this.turn];
        this.turnLeader.revealed = true;

        if (this.turnLeader === this.player) {
            Notices.addNotice('Your turn begins.');
        } else {
            Notices.addNotice('Turn begins for ' + this.turnLeader.name + '.');

            if (this.turnLeader.isPlayer && this.round == 1) {
                Notices.addNotice('Choose a location for your first city.');
            }
        }

        Scoreboard.updateUi();
    },

    endTurn: function () {
        this.beginTurn();
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