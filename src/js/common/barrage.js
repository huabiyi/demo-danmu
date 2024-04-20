/**
 *  配置初始化
 *  调用
    Barrage.init({
        ele: $('.barrage-top'),   // 父级class or id名
        layerHeight:  34,        // 单条弹幕的高度
        margin: 1,              // 弹幕与弹幕之间的间距
        arr: this.listBarrage,  // 初始化弹幕数组
        interval: 1000,         // 距离下一条出现的时长
    })

 *  方法说明
    1、play 开始播放弹幕
    2、update 更新弹幕数据
    3、pause 弹幕暂停（需要css支持）
    4、clear 清除弹幕
    5、restart 重新开始弹幕（可用于清除了弹幕之后需要重新开始的功能）
    6、insert 在当前位置插入新的弹幕
 */
let st = null;
const Barrage = {
    count: 0,
    playing: true,
    tops: [],
    curTop: [],
    curIdx: 0,
    init(opt) {  // 初始化
        this.opt = opt;
        this.boxH = this.opt.ele.height();
        this.opt.layerHeight = window.innerWidth / 750 * this.opt.layerHeight;
        console.log('>>>> this.opt', this.opt);

        this.getTopArr();
        this.play();
    },
    getTopArr() {  // 获取当前box可以放的坐标
        let num = Math.floor(this.boxH / this.opt.layerHeight);
        for (let i = 0; i<num; i++) {
            this.tops.push(i * (this.opt.layerHeight + this.opt.margin));
        }

        this.upsetTop();
    },
    upsetTop() { // 将坐标打乱
        let curTop = this.tops.slice(0,);
        curTop = curTop.sort(function () {
            return Math.random() > 0.5 ? -1 : 1;
        });

        if (curTop[0] == this.curTop[this.tops.length-1]) {
            this.upsetTop();
        } else {
            this.curTop = curTop;
        }
    },
    create(info) {  // 生成弹幕
        let $layer = $(`<div class="layer ani">${info.content}</layer>`);
        $layer.css('top', this.curTop[this.curIdx] + 'px');
        this.opt.ele.append($layer);

        $layer.on('animationend', function () {
            $(this).off('animationend');
            $(this).remove();
        }, true);

        // 重置top获取坐标点
        ++this.curIdx;
        if (this.curIdx >= this.tops.length) {
            // 坐标循环一次之后，重新打乱
            this.upsetTop();
            this.curIdx = 0;
        }
    },
    // 更新数组
    update(arr, type) {  // 更新弹幕
        if (type == 'replace') {
            this.opt.arr = arr;
            this.count = 0;
        } else {
            this.opt.arr = this.opt.arr.concat(arr);
        }
        if (arr.length == 0) {
            this.count = 0;
        }

        if (!this.opt.loop && !this.playing) {
            this.play();
        }
    },
    play() {  // 播放动画
        if (!this.playing) return false;
        this.playing = true;
        this.create(this.opt.arr[this.count]);
        clearTimeout(st);
        st = setTimeout(() => {
            this.count++;

            if (this.opt.loop) {   //  开启循环
                if (this.count > (this.opt.arr.length - 1)) {
                    this.count = 0;
                    this.opt.end(this.count);
                }
                this.play();
            } else {   // 不开启开启循环
                if (this.count > (this.opt.arr.length - 1)) {
                    this.playing = false;
                    this.count = 0;
                    this.opt.end(this.count);
                } else {
                    this.play();
                }
            }
        }, this.opt.interval);
    },
    insert(obj) {   // 在当前位置插入新的弹幕
        let arr1 = this.opt.arr.slice(0, (this.count + 1)),
            arr2 = this.opt.arr.slice(this.count + 1);

        let newObj = obj;
        if (typeof obj != 'array') {
            newObj = [obj];
        }
        this.opt.arr = arr1.concat(newObj, arr2);
    },
    restart(arr) {
        this.clear();
        this.update(arr, 'replace');
        this.playing = true;
        this.play();
    },
    pause() {  // 暂停动画
        this.playing = false;
        this.opt.ele.find('.layer').addClass('paused');
        clearTimeout(st);
    },
    clear() {  // 清除动画
        this.playing = false;
        this.count = 0;
        this.opt.arr = [];
        this.opt.ele.find('.layer').off('animationend');
        this.opt.ele.find('.layer').remove();
        clearTimeout(st);
    },
    listenerPageState: function () {   // 浏览器状态监听
        var hidden, visibilityChange;
        if (typeof document.hidden !== "undefined") {
            hidden = "hidden";
            visibilityChange = "visibilitychange";
        } else if (typeof document.msHidden !== "undefined") {
            hidden = "msHidden";
            visibilityChange = "msvisibilitychange";
        } else if (typeof document.webkitHidden !== "undefined") {
            hidden = "webkitHidden";
            visibilityChange = "webkitvisibilitychange";
        }

        function handleVisibilityChange() {
            if (document[hidden]) {
                console.log('隐藏');
                // Barrage.clear();
            } else {
                console.log('显示');
                // Barrage.restart(listBarrage);
            }
        }
        if (typeof document.addEventListener === "undefined" || typeof document[hidden] === "undefined") {
            console.log(444);
        } else {
            document.addEventListener(visibilityChange, handleVisibilityChange, false);
        }
    },
};

export default Barrage;