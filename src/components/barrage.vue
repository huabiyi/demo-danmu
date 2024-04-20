<template>
    <div class="box-barrage">
        <div class="barrage-top"></div>
        <button class="btn-stop" @click="stopBarrage">暂停</button>
        <button class="btn-stop" @click="clearBarrage">清除</button>
        <button class="btn-stop" @click="restart">重新开始</button>

        <input type="text" style="width: 100px" id="txt">
        <button @click="send">发送</button>
    </div>
</template>

<script>
import info from '@/js/common/info';
import Barrage from '@/js/common/barrage';
console.log('Barrage', Barrage);

const arr = [{
        nickname: '1',
        content: '4444',
    }, {
        nickname: '2',
        content: '4444',
    }, {
        nickname: '3',
        content: '4444',
    }, {
        nickname: '4',
        content: '4444',
    }, {
        nickname: '5',
        content: '4444',
    }, {
        nickname: '6',
        content: '4444',
    }];
export default {
    name: 'BoxBarrage',
    props: {

    },
    data() {
        return {
            curTotal: 0, // 当次请求评论总数
            listBarrage: [],    // 弹幕内容
        };
    },
    computed: {

    },
    created() {

    },
    mounted() {
        setTimeout(() => {
            this.eventBarrage();
        }, 300);
    },
    methods: {
        eventBarrage() {
            // 初始化弹幕数组格式
            this.listBarrage = this.createDom(arr);
            const newData = [
                    {nickname: '昵称1', content: '一二三四五六七八九十一二三四五六七八九十'},
                    {nickname: '昵称2', content: '一二三四五六七八九十一二三四五六七八九十'},
                    {nickname: '昵称3', content: '一二三四五六七八九十一二三四五六七八九十'},
                    {nickname: '昵称4', content: '一二三四五六七八九十一二三四五六七八九十'},
                    {nickname: '昵称5', content: '一二三四五六七八九十一二三四五六七八九十'},
                    {nickname: '昵称6', content: '一二三四五六七八九十一二三四五六七八九十'},
                ]
            Barrage.init({
                ele: $('.barrage-top'),
                layerHeight:  34,        // 单条弹幕的高度
                margin: 1,              // 弹幕与弹幕之间的间距
                arr: this.listBarrage,  // 初始化弹幕数组
                interval: 3000,     // 距离下一条出现的时长
                loop: true,
                end: (index) => {
                    // console.log('index', index)
                    // 更新弹幕内容， 可以单独调用，不需要放到回调里
                    // Barrage.update(this.createDom(newData));
                }
            });

            setTimeout(() => {
                Barrage.update(this.createDom(newData));
            }, 3000);
        },
        stopBarrage() {
            Barrage.pause();
        },
        clearBarrage() {
            Barrage.clear();
        },
        restart() {
            Barrage.restart(this.listBarrage);
        },
        createDom(data) {
            let arr = [];
            $.each(data, (key, val) => {
                arr.push({
                    content: `<p><span>${val.nickname}：</span>${val.content}</p>`
                });
            });
            return arr;
        },
        send() {
            let val = document.querySelector('#txt').value;
            Barrage.insert({content: `<p><span>test：</span>${val}</p>`});
        }
    },
    components: {

    },
};
</script>

<style lang="less">
@import "~@/css/barrage.less";
</style>