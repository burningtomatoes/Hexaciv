$(document).ready(function () {
    Game.init();

    Bootlogo.show(function () {
        Game.start();
    });
});