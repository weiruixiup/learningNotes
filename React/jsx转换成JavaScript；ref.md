```
UI = f (data)
```

1. JSX转化成JavaScript：上面是jsx，下面是转换后的JavaScript。

   理解：React.createElement方法接收三个参数，第一个是元素（div，span，p等等）；第二个参数是对象，对象的内容是：属性作为键名，属性值作为键值，没有属性就是null；第三个参数是children，假如children还是标签或者组件，那么还是会使用React.createElement方法继续这样转换。

   ```jsx
   <div id='div' key='1'>
   	<span>
     		123
     	</span>	
   </div>
   ```

   ```js
   "use strict";
   
   React.createElement("div", {
     id: "div",
     key: "1"
   }, React.createElement("span", null, "123"));
   ```

   如果是组件则是下面的情况，组件将作为变量传入方法（首字母大写是规范）

   ```jsx
   function Com(){
     return (
       <article>
     		123  
       </article>
     )
   }
   
   <Com ref='rest'/>	
   ```

   ```js
   "use strict";
   
   function Com() {
     return React.createElement("article", null, "123");
   }
   
   React.createElement(Com, {
     ref: "rest"
   });
   ```

2. ref：三种方式

   ```jsx
   import React, {Component} from 'react';
   
   class Index extends Component {
       constructor() {
           super();
           // 创建的(return)是一个对象 如下面的注释
           this.objRef = React.createRef();
           // {current:null}
       }
   
       render() {
           return (
               <>
                   {/*字符串创建方式 会逐渐被废弃 v16.8之前*/}
                   <p ref='testRef'>test1</p>
   
                   {/*方法创建方式，参数就是该标签或者组件的实例*/}
                   <p ref={ele => this.methodRef = ele}>test2</p>
   
                   {/*createRef方法 这是React提供的方法 dom或者组件创建完成之后，实例会被挂载到this.objRef上面*/}
                   <p ref={this.objRef}>test3</p>
               </>
           );
       }
   }
   
   export default Index;
   
   ```

   