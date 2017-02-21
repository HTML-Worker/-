# 调试 IE8 兼容性解决方案

注意：使用工具虚拟机+各个不同的 ie 版本系统

### 1、将编译好的网站发布到本机iis上
#### 1、iis的配置说明：
    http://jingyan.baidu.com/article/5553fa8215f7ef65a2393413.html
    遇到问题：在计算机上没有找到服务w3svc
    解决办法：https://zhidao.baidu.com/question/180178187.html

    注意事项：
    --1、见web2.0下的‘iis发布网站注意事项.png’
    --2、注意端口号
    --3、注意设置默认文档

### 检测浏览器类型

问题描述：

jQuery 1.9使用$.support替代$.browser的使用方法；

jQuery 从 1.9 版开始，移除了 $.browser 和 $.browser.version ， 取而代之的是 $.support 。 在更新的 2.0 版本中，将不再支持 IE 6/7/8。 以后，如果用户需要支持 IE 6/7/8，只能使用 jQuery 1.9。 如果要全面支持 IE，并混合使用 jQuery 1.9 和 2.0， 官方的解决方案是：


    <!--[if lt IE 9]>
        <script src='jquery-1.9.0.js'></script>
    <![endif]-->
    <!--[if gte IE 9]>
        <script src='jquery-2.0.0.js'></script>
    <![endif]-->

解决方案：

    var explorer =navigator.userAgent;
    //判断浏览器类型
    //firefox
    if (explorer.indexOf("Firefox") >= 0) {
        alert("Firefox");
    }
    //Chrome
    else if(explorer.indexOf("Chrome") >= 0){
        alert("Chrome");
    }
    //Opera
    else if(explorer.indexOf("Opera") >= 0){
        alert("Opera");
    }
    //Safari
    else if(explorer.indexOf("Safari") >= 0){
        alert("Safari");
    }
    //Netscape
    else if(explorer.indexOf("Netscape")>= 0) {
        alert("Netscape");
    }
    //IE
    else {
        alert("IE");
    }


### ie8 不支持的css属性以及解决办法

#### 不支持 background-size 图片无法最大化到窗口大小

解决办法：


    //css中添加
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(
        src='../img.png',
        sizingMethod='scale');

弊端：这个方法只能background-size:100%，图片会被拉伸，同时按钮可能会失效建议按钮台添加position属性；
