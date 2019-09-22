### meta常用于定义页面的说明，关键字，最后修改日期，和其它的元数据。这些元数据将服务于浏览器（如何布局或重载页面），搜索引擎和其它网络服务。

meta只有两个属性，分别是**name**、**http-equiv**，对应的属性值用**content**来描述

```html
	<!--告知浏览器此页面属于什么字符编码格式-->	
	<meta charset="utf-8">
    <!--描述网页，比如网页的关键词，叙述等-->
    <meta name="keywords" content="优客逸家，优客，资产管理系统，优客智能，SAAS">
    <!--告诉搜索引擎，你网站的主要内容-->
    <meta name="description" content="优客逸家资产管理系统">
    <!--网页视图大小 屏幕宽度 缩放比例 自适应宽度shrink-to-fit(移动端)-->
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="theme-color" content="#000000">
    <!--定义搜索引擎爬虫的索引方式-->
    <meta name="robots" content="all">
    <!--标注网页作者-->
    <meta name="author" content="weiruixi-花生；xianzhengquan-祭酒；xiaokang-之修">
    <!--网页制作软件-->
    <meta name="generator" content="webstorm，vs-code">
    <!--版权-->
    <meta name="copyright" content="©2019 uokohome.com">
    <!--双核浏览器渲染方式 默认webkit内核-->
    <meta name="renderer" content="webkit">
    <!--浏览器采取何种版本渲染当前页面 指定IE和Chrome使用最新版本渲染当前页面-->
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
```

