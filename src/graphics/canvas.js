var Canvas = {
    $element: null,
    canvas: null,
    context: null,

    loop: null,

    upscaleRatio: 2,

    init: function () {
        this.$element = $('#game');
        this.canvas = this.$element[0];
        this.context = this.canvas.getContext('2d');

        this.canvas.mozImageSmoothingEnabled = false;
        this.canvas.webkitImageSmoothingEnabled = false;
        this.canvas.msImageSmoothingEnabled = false;
        this.canvas.imageSmoothingEnabled = false;

        this.resize();
        $(window).resize(this.resize.bind(this));

        console.info('[Canvas] Starting render loop...');

        this.loop = this.renderLoop.bind(this);
        this.loop();
    },

    resize: function () {
        var $document = $(document);

        var w = $document.width();
        var h = $document.height();

        this.canvas.width = w / this.upscaleRatio;
        this.canvas.height = h / this.upscaleRatio;

        this.$element.css('width', w + 'px');
        this.$element.css('height', h + 'px');

        console.info('[Canvas] Resize complete (' + w + 'px by ' + h + 'px)');
    },

    renderLoop: function () {
        window.requestAnimationFrame(this.loop);

        this.clear();

        Game.update();
        Game.draw(this.context);
    },

    clear: function () {
        this.context.fillStyle = '#637FBF';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
};