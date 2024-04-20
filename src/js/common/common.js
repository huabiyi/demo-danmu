nie.define("Common", () => {
    const fn = {
        // 横竖屏提示及初始化设置
        reset: () => {
            const $win = $(window);
            const $html = $("html");
            const $tips = $("#forhorview");
            if ($win[0].orientation === 90 || $win[0].orientation === -90) {
                $html.css("font-size", `${document.documentElement.clientHeight / 750 * 625}%`);
                $tips.addClass("show");
            } else {
                $html.css("font-size", `${document.documentElement.clientWidth / 750 * 625}%`);
                $tips.removeClass("show");
            }
        },
        bindResize: () => {
            const $win = $(window);
            $win.on("onorientationchange" in window ? "orientationchange" : "resize", () => {
                setTimeout(fn.reset, 300);
            });
        },
        init: () => {
            fn.reset();
            fn.bindResize();
        },
    };

    $(() => {
        fn.init();
    });

});


//公用方法
let _params = (param) => {
    var pStr = window.location.hash.toString() || window.location.search.toString(),
        r = new RegExp("[\?&]*" + param + "=([^&]+)"),
        m = pStr.match(r);
    if (m) return m[1].replace('"', '');
    else return '';
};

// 测试环境实例化vconsole
if (__DEBUG && _params("env") != "") {
    var vconsoleJs = document.createElement('script');
    vconsoleJs.async = true;
    vconsoleJs.src = "//wechatfe.github.io/vconsole/lib/vconsole.min.js?v=3.3.0";//在线vconsole地址
    document.body.appendChild(vconsoleJs);

    vconsoleJs.addEventListener('load', () => {
        var vConsole = new VConsole();
    }, false);
}

//返回模块接口
export {
    _params
}
