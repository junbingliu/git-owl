$(document).ready(function () {
    if (isEnableOrderAudioNotify && isEnableOrderAudioNotify==="true" && merchantId.slice(0, 2) ==="m_") {
        doRemind();
    }
});

function doRemind() {
    $.ajax(
        {
            url: "/OurHome/modules/noprivilege/DoCheck.jsp",
            type: "post",
            data: {m: merchantId},
            dataType: "json",
            success: function (data) {
                if (data.state == "1") {
                    $("audio").remove();
                    $("body").append("<audio autoplay='true' preload='true'><source src='/resources/audios/w8.ogg' type='audio/ogg'></audio>");
                }
                setTimeout(doRemind, 5000);
            }
        }
    );
};