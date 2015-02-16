$(document).ready(function () {
    Game.init();

    Bootlogo.show(function () {
        if (Settings.DebugQuickPlay) {
            Game.start(LeaderIds.NORTH_KOREA);
        } else {
            MainMenu.show();
        }
    });
});