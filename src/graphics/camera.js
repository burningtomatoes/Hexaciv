var Camera = {
    x: 0,
    y: 0,

    applyX: 0,
    applyY: 0,

    isRumbling: false,
    rumbleOffset: 0,
    rumbleIntensity: 1,
    rumbleDuration: 0,

    cameraSpeed: 10,

    translateX: function(x) {
        return Math.round(x + this.applyX + this.rumbleOffset);
    },

    translateY: function(y) {
        return Math.round(y + this.applyY + this.rumbleOffset);
    },

    translate: function(x, y) {
        return {
            x: this.translateX(x),
            y: this.translateY(y)
        };
    },

    setPos: function(x, y) {
        this.x = x;
        this.y = y;
    },

    trackingEntity: null,

    centerToMap: function() {
        this.x = Canvas.canvas.width / 2 - World.widthPx / 2;
        this.y = Canvas.canvas.height / 2 - World.heightPx / 2;
        this.trackingEntity = null;
    },

    trackHard: false,

    followEntity: function(e, hard) {
        this.trackingEntity = e;
        this.trackHard = !!hard;
    },

    rumble: function(duration, intensity) {
        this.isRumbling = true;
        this.rumbleOffset = 0;
        this.rumbleDuration = duration;
        this.rumbleIntensity = intensity;
    },

    update: function() {
        // Rumble effect
        if (this.isRumbling) {
            this.rumbleDuration--;

            this.rumbleOffset = chance.integer({
                min: -this.rumbleIntensity,
                max: this.rumbleIntensity
            });

            if (this.rumbleDuration <= 0) {
                this.isRumbling = false;
                this.rumbleOffset = 0;
            }
        }

        // Entity tracking
        if (this.trackingEntity != null) {
            this.x = Canvas.canvas.width / 2 - this.trackingEntity.posX - this.trackingEntity.width / 2;
            this.y = Canvas.canvas.height / 2 - this.trackingEntity.posY - this.trackingEntity.height / 2;
        }

        if (this.trackHard) {
            this.applyX = this.x;
            this.applyY = this.y;
            this.trackHard = false;
        } else {
            this.applyX = MathHelper.lerp(this.applyX, this.x, 0.1);
            this.applyY = MathHelper.lerp(this.applyY, this.y, 0.1);
        }

        // Keyboard camera controls
        var pressedU = (Keyboard.isKeyDown(KeyCode.UP) || Keyboard.isKeyDown(KeyCode.W));
        var pressedL = (Keyboard.isKeyDown(KeyCode.LEFT) || Keyboard.isKeyDown(KeyCode.A));
        var pressedD = (Keyboard.isKeyDown(KeyCode.DOWN) || Keyboard.isKeyDown(KeyCode.S));
        var pressedR = (Keyboard.isKeyDown(KeyCode.RIGHT) || Keyboard.isKeyDown(KeyCode.D));

        if (pressedU) {
            this.y += this.cameraSpeed;
        }

        if (pressedD) {
            this.y -= this.cameraSpeed;
        }

        if (pressedL) {
            this.x += this.cameraSpeed;
        }

        if (pressedR) {
            this.x -= this.cameraSpeed;
        }

        // Restrict camera to world size
        var xMargin = 0;
        var yMargin = 0;

        var maxY = 0;
        if (this.y > maxY) {
            this.y = maxY;
        }

        var maxX = 0;
        if (this.x > maxX) {
            this.x = maxX;
        }

        var minX = -(World.widthPx - Canvas.canvas.width);
        if (this.x < minX) {
            this.x = minX;
        }

        var minY = -(World.heightPx - Canvas.canvas.height);
        if (this.y < minY) {
            this.y = minY;
        }
    }
};