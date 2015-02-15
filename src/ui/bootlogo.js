var Bootlogo = {
    show: function(cb) {
        if (Settings.DebugSkipBootLogo) {
            cb();
            return;
        }

        AudioOut.playSfx('burningtomato.wav');

        $('#burningtomato').stop().delay(500).fadeIn(500, function() {
            window.setTimeout(function() {
                $('#burningtomato').stop().fadeOut(500, cb);
            }, 1500)
        });
    }
};