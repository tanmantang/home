var isWriter = false;
function Hitokoto() {
    // fetch("https://v1.hitokoto.cn?encode=json")
    fetch("https://api.tanmantang.com/api/love")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            $('#text').text(data.text);
            if(isWriter == false ){
                $("#text").show().typewriter();
            }else{
                window.setTimeout(Hitokoto, 10000);
            }
            // var author = !!data.from ? data.from : "无名氏";
            // $('#author').text("—— " + (data.from_who || '') + "「" + author + "」");
            $('#author').text("TO 「 梅 」");
            window.setTimeout(Hitokoto, 10000);
        })
        .catch(function (err) {
            console.error(`获取一言报错，错误信息: ${err.message}. 当前时间: ${new Date().toISOString()}`);
            // Hitokoto();
        });
}
Hitokoto();
// var isID = 0;
// if (!isID) { window.setTimeout(Hitokoto, 50);}
console.info("别抄了，还有BUG，Emmmmm，改不完，根本改不完");
$.fn.typewriter = function () {
    this.each(function () {
        var $ele = $(this),str = $ele.html(),progress = 0;
        $ele.html('');
        var timer = setInterval(function () {
            var current = str.substr(progress, 1);
            isWriter = true;
            if (current == '<') {
                progress = str.indexOf('>', progress) + 1;
            } else {
                progress++;
            }
            $ele.html(str.substring(0, progress) + (progress & 1 ? '|' : ''));
            if (progress >= str.length) {
                clearInterval(timer);
                isWriter = false;
            }
        }, 180);
    });
    return this;
};

