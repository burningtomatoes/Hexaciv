var ImageLoader = Loader.extend({
    preload: function () {
        this.innerLoad('hex_grass.png');
        this.innerLoad('hex_sand.png');
        this.innerLoad('hex_water.png');
    },

    innerLoad: function (filename) {
        var image = new Image();
        image.src = 'assets/images/' + filename;
        return image;
    }
});