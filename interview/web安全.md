1. XSS（跨站脚本攻击）
   - 分类：分为持久型（写入数据库中）与非持久型。
   - 解决方案：
     - [ ] **转移字符**。XSS的攻击注入点：HTML节点内容，HTML属性，JavaScript代码，富文本。其中富文本的解决方案可以是白名单与黑名单。白名单：转义HTML,JS的字符；黑名单：列出允许的标签和属性，然后排除其他的。
     - [ ] **CSP**（Content Ssecurity Policy）：实质就是建立白名单，通常是两种方案：设置HTTP Header中的Content-Security-Policy；设置[meta](./meta.md)标签的方式<meta http-equiv="Content-Security-Policy">
2. CSRF（跨站请求伪造）
   - 与XSS的区别：它在另一个网站执行，但XSS在本网执行。
     - [ ] 用户在A网站登录
     - [ ] A网站通过了用户的身份验证
     - [ ] B网站向A网站对应的后端发起请求（带A网站的身份）
   - 解决方案：
     - [ ] get请求不对数据修改
     - [ ] 不让第三方网站访问用户cookie
     - [ ] 阻止第三方网站的请求接口
     - [ ] 请求时带验证信息，比如token
3. 

