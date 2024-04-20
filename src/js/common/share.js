nie.define('Share', () => {
    const fn = {
        init() {
            fn.MShare();
            fn.initAttention();
            fn.bindToTop();
        },
        MShare() {
            //初始化组件
            MShare.init({
                debug: false, //开启调试，则会在左下角显示上报的log
                hideMoments: false, //隐藏"微信"分享到朋友圈的按钮，默认是false，不隐藏，非微信无作用
                hideFriend: false, //隐藏"微信"分享到朋友的按钮，默认是false，不隐藏，非微信无作用
                wxapi: [], //"微信"自定义api接口列表(jsApiList)，默认已经有分享和菜单隐藏相关的，必须是数组，默认是空
                wxtag: [], //"微信"自定义tag开放标签列表(openTagList)，必须是数组，默认是空
                ready: function () { } //"微信"的wx.ready回调，默认为空，非微信无作用
            });

            var commonShare = {
                is_start: false, //当前是否接入了一键启动的H5
                title: $("#share_title").html(), //分享标题
                desc: $("#share_desc").html(), //分享正文
                // moments_title : '设置分享朋友圈标题', //该字段在有需要单独设置分享朋友圈情况下才设置，否则不需要
                url: location.href, //分享URL is_start为true时，需要将页面需要的参数也带上
                imgurl: $("#share_pic").data("src"), //分享图片
                guideText: $("#share_guide").html(), //微信中点分享按钮显示的分享引导语
                qrcodeIcon: $("#qr_icon").data("src"), //二维码图标
                callback: function (ret) {
                    //目前只有微信分享type才有值，其余均为0
                    //1为好友，2为朋友圈，3为QQ，4为Qzone
                    //ret.channel为客户端类型
                    // if(ret.type)alert("分享到了："+ret.type_en);
                }
            }

            MShare.setShare(commonShare)

            //分享按钮事件
            $("#btn_share").click(function (e) {
                //分享按钮绑定点事件，显示分享弹层
                MShare.showShare(commonShare)
            })
        },
        // 关注公众号
        initAttention() {
            $("#btn_attention,.btn_attention").on("click", (e) => {
                $("#md_attention").show();
                const st = setTimeout(() => {
                    $("#md_attention").addClass("show");
                }, 50);
            });
            $("#md_attention").on("click", (e) => {
                $("#md_attention").removeClass("show");
                const st = setTimeout(() => {
                    $("#md_attention").hide();
                }, 300);
            });
            !!$("#md_attention")[0] && $("#md_attention")[0].addEventListener("touchmove", (e) => {
                e.preventDefault();
            }, false);
        },
        // 返回顶部
        bindToTop() {
            $(".btn-toTop").on("click", () => {
                $(window).scrollTop(0);
            });
        },
    };

    fn.init();
});