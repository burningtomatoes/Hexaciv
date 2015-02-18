var Utils = {
    rectIntersects: function(r1, r2) {
        return !(r2.left > r1.right ||
        r2.right < r1.left ||
        r2.top > r1.bottom ||
        r2.bottom < r1.top);
    },

    isInRect: function (x, y, rect) {
        return rect.left < x && rect.right > x && rect.top < y && rect.bottom > y;
    },

    generateGuid: function () {
        var guid = (function() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return function() {
                return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                    s4() + '-' + s4() + s4() + s4();
            };
        })();
        return guid();
    },

    shuffleArray: function (o) {
        for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    },

    componentToHex: function (c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    },

    rgbToHex: function (r, g, b) {
        return "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
    },

    hexToRgb: function (hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    },

    hexDistance: function (h1, h2) {
        //a good explanation of this calc can be found here:
        //http://playtechs.blogspot.com/2007/04/hex-grids.html
        var deltaX = h1.pCoordX - h2.pCoordX;
        var deltaY = h1.pCoordY - h2.pCoordY;
        return ((Math.abs(deltaX) + Math.abs(deltaY) + Math.abs(deltaX - deltaY)) / 2);
    }
};