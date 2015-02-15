var AudioOut = {
    playSfx: function (fileName, volume) {
        if (volume == null) {
            volume = 1.0;
        }

        var file = Game.audio.load(fileName);
        file.volume = volume;
        file.play();
    }
};