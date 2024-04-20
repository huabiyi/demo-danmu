// 内嵌端，请将share.js文件跟相关引用删除
import '../common/share.js';
import "js/common/common.js";

nie.define("Index", () => {

    //默认自带两个变量
    let isDebug = __DEBUG ; //编译打包后，测试环境会变为true，正式环境为false
    let cdn = __CDNPATH ; //编译后，会变成对应的cdn-path值


})