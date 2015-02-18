var LandType = {
    GRASS: 'grass',
    SAND: 'sand',
    WATER: 'water'
};

var World = {
    hexes: [],
    hexesByCoord: {},
    hexCount: 0,

    hexSize: {
        HEIGHT: 50,
        WIDTH: 65,
        SIDE: 35
    },

    width: 0,
    height: 0,

    widthPx: 0,
    heightPx: 0,

    leaders: [],

    player: null,

    round: 0,
    turn: 0,
    turnLeader: null,
    deployMode: false,

    clear: function () {
        this.hexes = [];
        this.hexesByCoord = { };
        this.hexCount = 0;
        this.width = 0;
        this.height = 0;
        this.widthPx = 0;
        this.heightPx = 0;
        this.leaders = [];
        this.player = null;
        this.round = 0;
        this.turn = 0;
        this.turnLeader = null;
        this.deployMode = false;
    },

    getHex: function (id) {
        for (var i = 0; i < this.hexCount; i++) {
            var hex = this.hexes[i];
            if (hex.id == id) {
                return hex;
            }
        }
        return null;
    },

    generate: function (width, height, playerLeaderId) {
        this.clear();

        this.width = width;
        this.height = height;

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
                hex.pCoordX = col;
                this.hexes.push(hex);

                if (!this.hexesByCoord[hex.pCoordX]) {
                    this.hexesByCoord[hex.pCoordX] = [];
                }

                this.hexesByCoord[hex.pCoordX].push(hex);

                col += 2;
                x += this.hexSize.WIDTH + this.hexSize.SIDE;
            }

            row++;
            y += this.hexSize.HEIGHT / 2;
        }

        for (var pCoordX in this.hexesByCoord) {
            var hexesByCoord = this.hexesByCoord[pCoordX];
            var pCoordY = Math.floor(pCoordX / 2) + (pCoordX % 2);

            for (var i in hexesByCoord) {
                var h = hexesByCoord[i];
                h.pCoordY = pCoordY++;
            }
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

        for (var i = 0; i < this.hexes.length; i++) {
            var hex = this.hexes[i];

            for (var j = 0; j < hex.entities.length; j++) {
                var entity = hex.entities[j];

                if (entity.isCity) {
                    entity.citizens += entity.owner.getBorderCount();
                    entity.checkUnits();
                }
            }
        }

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

        this.deployMode = false;

        if (this.round == 1) {
            this.deployMode = true;
        }

        Tutorial.hide();

        if (this.turnLeader === this.player) {
            Notices.addNotice('Your turn begins.');

            if (this.round == 1) {
                Tutorial.show('Settle your capital', 'Select a strategic hex to settle your first city.');
            } else if (this.round == 2) {
                Tutorial.show('Expand your borders', 'Send your unit out to capture hexes.');
            } else if (this.round == 3) {
                Tutorial.show('Grow your city', 'Each hex you own accelerates your city\'s growth.');
            } else if (this.round == 4) {
                Tutorial.show('Build units', 'The more citizens you have, the faster you gain new units.');
            } else if (this.round == 5) {
                Tutorial.show('Dominate', 'Defend your cities, and use your units to attack others. Last man standing wins.');
            } else if (this.round == 100) {
                Tutorial.show('Wow', 'You are amazing. You have made it to turn 100!');
            }
        } else {
            Notices.addNotice('Turn begins for ' + this.turnLeader.name + '.');
        }

        Scoreboard.updateUi();

        if (this.turnLeader.isPlayer && !this.deployMode) {
            $('#endturn').show();
        } else {
            $('#endturn').hide();
        }
    },

    endTurn: function () {
        this.beginTurn();
    },

    update: function () {
        Camera.update();

        for (var i = 0; i < this.leaders.length; i++) {
            var leader = this.leaders[i];
            leader.update();
        }

        var foundActive = false;

        var mouseX = Mouse.scaledX - Camera.translateX(0);
        var mouseY = Mouse.scaledY - Camera.translateY(0);

        for (var i = 0; i < this.hexCount; i++) {
            var hex = this.hexes[i];
            hex.update();

            var rect = hex.rect();

            if (this.turnLeader != null && this.turnLeader.isPlayer && Utils.isInRect(mouseX, mouseY, rect) && !foundActive) {
                hex.isActive = true;
                foundActive = true;

                if (Mouse.didClick()) {
                    this.onClick(hex);
                }
            } else {
                hex.isActive = false;
            }
        }
    },

    onClick: function (hex) {
        if (this.deployMode) {
            if (hex.owner != null) {
                Notices.addNotice('You can only deploy cities in neutral hexes.');
            } else if (hex.entities.length != 0) {
                Notices.addNotice('You can only deploy cities in empty hexes.');
            } else if (hex.landType == LandType.WATER) {
                Notices.addNotice('You cannot build cities on water.');
            } else {
                hex.add(new City(this.turnLeader));
                this.endTurn();
            }

            return;
        }
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