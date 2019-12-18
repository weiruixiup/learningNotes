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

2. ref：创建方式

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

   ```jsx
   // 首先明确一个概念：class组件是component组件，function组件是pureComponent。pureComponent是不存在实例的，没有this，class组件是存在的。
   // eg1:在class组件中使用function组件的ref
   
   // 父组件 class组件： ref必须要使用createRef()去创建，调用时也要存在this.testRef.current
   import React, {Component, createRef} from 'react';
   import Test from './hehe';
   
   class Index extends Component {
       componentWillMount() {
           this.testRef = createRef();
       }
   
   
       componentDidMount() {
           console.log(this.testRef);
       }
   
   
       render() {
           return (
               <>
                   <div> 这是主页</div>
                   <Test ref={this.testRef} />
               </>
           );
       }
   }
   
   export default Index;
   
   // 子组件 function组件：使用forwardRef对整个组件包裹，使其存在实例；function组件接受两个参数，分别是props与ref，需要给所需要暴露的东西加上ref={ref}
   
   import React, {forwardRef} from 'react';
   
   
   function Index(props, ref) {
   
       function testFn() {
           console.log(1);
       }
   
       return (
           <>
               <div onClick={testFn} ref={ref}>123</div>
           </>
       );
   }
   
   export default forwardRef(Index);
   
   ```

   ```jsx
   // eg2:在function组件中使用class组件的ref
   // 父组件：function组件，需要将整个组件用forwardRef起来，并且使用useRef来实例ref
   import React, {useEffect, useRef, forwardRef} from 'react';
   import Test from './hehe';
   
   
   function Index(props, ref) {
   
       const testRef = useRef(null);
   
       useEffect(_ => {
           console.log(testRef);
       }, []);
   
   
       return (
           <>
               <div ref={ref}>父组件是function组件</div>
               <Test ref={testRef} />
           </>
       );
   }
   
   export default forwardRef(Index);
   
   
   // 子组件：class组件
   
   import React, {Component} from 'react';
   
   class Test extends Component {
   
       state = {
           a: 1 
       };
   
   
       render() {
           return (
               <>
                   <div>子组件是class组件</div>
               </>
           );
       }
   }
   
   export default Test;
   
   
   ```

   ```jsx
   // eg3:在function组件中使用function组件的ref
   
   // 父组件：function组件,只需要使用useRef来实例ref
   import React, {useEffect, useRef} from 'react';
   import Test from './hehe';
   
   
   function Index(props, ref) {
   
       const testRef = useRef(null);
   
       useEffect(_ => {
           console.log(testRef);
       }, []);
   
   
       return (
           <>
               <div>父组件是function组件</div>
               <Test ref={testRef} />
           </>
       );
   }
   
   export default Index;
   
   // 子组件：function组件，需要用forwardRef()将整个组件包裹，并且使用useImperativeHandle()方法抛出需要导出的内容
   // useImperativeHandle方法接收三个参数，第一个是ref，第二个是一个函数，需要return出导出的内容，第三个是依赖
   
   import React, {forwardRef, useImperativeHandle} from 'react';
   
   function Test(props, ref) {
   
       useImperativeHandle(ref, _ => ({
           testTn
       }),[]);
   
       const testTn = () => {
           console.log(1);
       };
   
       return (
           <>
               <div onClick={testTn}>这是子组件</div>
           </>
       );
   }
   
   export default forwardRef(Test);
   
   ```

   

