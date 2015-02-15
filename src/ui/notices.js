var Notices = {
    addNotice: function (text) {
        var $notices = $('#notices');

        var $notice = $('<div />')
            .addClass('notice')
            .text(text)
            .appendTo($notices)
            .hide()
            .fadeIn('fast')
            .delay(text.length * 100)
            .fadeOut('fast', function () {
                $notice.remove();
            });
    }
};