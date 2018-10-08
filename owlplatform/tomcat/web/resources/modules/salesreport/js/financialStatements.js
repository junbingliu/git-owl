$(document).ready(function () {
    $("#innerLeft").css("height", function (event) {
        var height = 0;
        var $kids = $(this).children();
        $.each($kids, function (i, val) {
            if (i == 0) {
                $("#feeId").css("height", $(val).height());
            }
            if (i == $kids.length - 1) {
                var offset = $(val).offset();
                var kidHeight = $(val).height() / 2.5;
                if (document.all) {
                    kidHeight = 20;
                }
                height += offset.top + kidHeight;
            }
        });
        return height;
    });
});