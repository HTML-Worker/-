# CSS开发中遇到的问题

###  盒模型塌陷
问题描述：

原型大概是“一个div嵌套了两个 div,给main设定了background="pink" ,header1设定background=“red” 。header2 设定background=“blue” ,同时给heder1 设定margin-top:10px; 预想的是内层 heder1div 的上边距 maindiv 上边有10px的距离 但事实上 出现一个问题 ，内层div 并没有出现他所预想的那种效果，实际效果是 maindiv 仍然紧贴内层div 整个maindiv 上边框距离浏览器上边 增加了10px 的外边距”

解决方案：

1、在父级加入overflow：hidden；

2、在父级用padding-top

3、在父级加position：absolute；

---
