function hitokoto()
{
    $.ajax({
        url: "https://v1.hitokoto.cn",
        dataType: "json",
        async: false,
        success: function (data) {
            $("p").append(data + "<br />");
            if (data.from_who == null) {
                data.from_who = "佚名";
            }
            $('#text').text(data.hitokoto);
            $('#author').text("— " + data.from + "【" + data.from_who + "】");
            $("#text").show().typewriter(50);
            console.log(data.uuid);
        }
    })
}

// 实现打字机效果
(function ($) {
    $.fn.typewriter = function () {
        this.each(function () {
            var $ele = $(this),
                str = $ele.html(),
                progress = 0;
            $ele.html('');
            var timer = setInterval(function () {
                var current = str.substr(progress, 1);
                if (current == '<') {
                    progress = str.indexOf('>', progress) + 1;
                } else {
                    progress++;
                }
                $ele.html(str.substring(0, progress) + (progress & 1 ? '_' : ''));
                if (progress >= str.length) {
                    clearInterval(timer);
                }
            }, 150);
        });
        return this;
    };
})(jQuery);
hitokoto();
setInterval("hitokoto()",10000);
