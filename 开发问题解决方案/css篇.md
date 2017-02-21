# CSS开发中遇到的问题

###  盒模型塌陷
问题描述：

原型大概是“一个div嵌套了两个 div,给main设定了background="pink" ,header1设定background=“red” 。header2 设定background=“blue” ,同时给heder1 设定margin-top:10px; 预想的是内层 heder1div 的上边距 maindiv 上边有10px的距离 但事实上 出现一个问题 ，内层div 并没有出现他所预想的那种效果，实际效果是 maindiv 仍然紧贴内层div 整个maindiv 上边框距离浏览器上边 增加了10px 的外边距”

解决方案：

1、在父级加入overflow：hidden；

2、在父级用padding-top

3、在父级加position：absolute；

---

### Angular ng-show/ng-hide/ng-if 隐藏标签，刷新瞬间显示bug
问题描述：

使用Angular框架时，用ng-show/ng-hide/ng-if指令判断是否有视频链接，如果有则显示video标签，没有则隐藏，但是，当没有video被隐藏是，每次刷新瞬间都会显示然后再隐藏

解决方案：

先引入这段CSS，内容可以在angular文件当中的angular-csp.css找到

    <style>
        [ng\:cloak], [ng-cloak], [data-ng-cloak], [x-ng-cloak], .ng-cloak, .x-ng-cloak {
            display: none !important;
        }
    </style>

然后加上这个指令ng-cloak

    <div ng-cloak class="news-content" ng-if="news.video_url != ''">
      <video ng-src="{{ news.video_url }}" preload="auto" controls width="100%" webkit-playsinline></video>
    </div>

---

### 背景图片自适应和切图

问题描述：

给的背景图片尺寸不对或者比例不对

解决方案：

    //添加背景
    background: url("../imgs/background-img.png") no-repeat;

    //背景对浏览器窗口左下角对齐（可以确定切掉的是图片哪个方位）
    background-position: bottom left;

    //图片按比例拉伸适应窗口，并切掉多余部分
    background-size: cover;

---

### 使用新字体

解决方法：

    /*声明 WebFont*/
    @font-face {
        font-family: 'KaiGenGothicSC-Light', sans-serif;
        src: url('../font/KaiGenGothicSC-Light.ttf');
    }

之后用font-spider去压缩字体包，但是目前没成功
