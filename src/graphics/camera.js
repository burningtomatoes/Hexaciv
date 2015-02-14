var Camera = {
    x: 0,
    y: 0,

    applyX: 0,
    applyY: 0,

    isRumbling: false,
    rumbleOffset: 0,
    rumbleIntensity: 1,
    rumbleDuration: 0,

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

        if (this.trackingEntity != null) {
            this.x = Canvas.canvas.width / 2 - this.trackingEntity.posX - this.trackingEntity.width / 2;
            this.y = Canvas.canvas.height / 2 - this.trackingEntity.posY - this.trackingEntity.height / 2;

            var xMargin = 96;
            var yMargin = 32;

            var minX = -xMargin;
            if (this.x < minX) {
                this.x = minX;
            }
            var minY = -yMargin;
            if (this.y < minY) {
                this.y = minY;
            }
            yMargin = 96;
            var maxY = (Canvas.canvas.height + yMargin) - Canvas.canvas.height;
            if (this.y > maxY) {
                this.y = maxY;
            }
            var maxX = (Canvas.canvas.width + xMargin) - Canvas.canvas.width;
            if (this.x > maxX) {
                this.x = maxX;
            }
        }

        if (this.trackHard) {
            this.applyX = this.x;
            this.applyY = this.y;
            this.trackHard = false;
        } else {
            this.applyX = MathHelper.lerp(this.applyX, this.x, 0.1);
            this.applyY = MathHelper.lerp(this.applyY, this.y, 0.1);
        }
    }
};