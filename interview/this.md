## this的指向

#### ES5中，指向永远是调用它的对象。		

1. 如果是普通函数调用，那么this就是window，切记**不能在严格模式下**。这个时候调用它的其实就是window对象。

   ```js
   var name = 'up'
   function a(){
       console.log(this.name)
   }
   a() //up
   
   function b(){
       "use strict"
       console.log(this.name)
   }
   b() //Cannot read property 'name' of undefined
   
   function c(){
       "use strict"
       var name = 'weiruxi'
       console.log(this.name)
   }
   c() //Cannot read property 'name' of undefined
   ```

2. 如果是普通对象调用，则就是该对象。注意**obj中的a是一个普通函数**。

   ```js
   var name = 'up'
   let obj = {
       name:'weiruixi',
       a:function(){
           console.log(this.name)
       }
   }
   obj.a() //weiruixi 
   window.obj.a() //weiruixi        最终调用的还是obj
   ```

3. 切记ES5语法下：**this指向最后调用它的对象**。

   ```js
   var name = 'up'
   let obj = {
       name:'weiruixi',
       a:function(){
           console.log(this.name)
       }
   }
   var fn = obj.a
   fn() //up 虽然把obj的a方法赋值给fn，但是并未调用执行，最后它执行是被window调用。
   ```

4. 箭头函数中的this：**箭头函数并没有this**。

   **箭头函数的this是它上级第一个`<u>普通</u>`函数所指向的this，如果没有普通函数，那么this指向window。**

   ```js
   var name = 'up'
   let obj = {
       name:'weiruixi',
       a:()=>{
           console.log(this.name)
       }
   }
   obj.a() //up 
   ```

5. 对于**new**的方式来说，this绑定在实例化上，不会被改变指向。

   ```js
   function Person(name,age){
   	this.name = name
       this.age = age
   }
   Person.prototype.getName = function(){
       console.log(this.name)
   }
   const p = new Person('weiruixi',24)
   p.getName() // weiruixi
   ```



#### 改变this的指向

eg:

```js
var name = 'up'
var obj = {
    name:'weiruixi',
    fn1:function(){
        console.log(this.name)
	},
    fn2:function(){
        setTimeOut(function(){
            this.fn1()
        },200)
    }
}
obj.fn2() //this.fn1 is not a function
```

分析：**obj.fn2()中是：延时200ms执行this.fn1，这时候因为最后调用的是setTimeOut，setTimeOut是window的对象，在window下没有定义fn1。**

1. 利用箭头函数改变this的指向

   ```js
   var name = 'up'
   var obj = {
       name:'weiruixi',
       fn1:function(){
           console.log(this.name)
   	},
       fn2:function(){
           setTimeOut(()=>{
               this.fn1()
           },200)
       }
   }
   obj.fn2() //weiruixi
   ```

   分析：**根据上面所述：箭头函数没有this，它所谓的this是上层第一个普通函数指向的this，那么对应的是fn2指向的this。调用fn2的是obj，那么this指向obj。**

2. 函数内部使用 **_this = this**

   var name = 'up'

   ```js
   var obj = {
       name:'weiruixi',
       fn1:function(){
           console.log(this.name)
   	},
       fn2:function(){
       	var _this = this;
           setTimeOut(function(){
               _this.fn1()
           },200)
       }
   }
   obj.fn2() //weiruixi
   ```

   分析：**在 fn2 中，首先设置 `var _this = this;`，这里的 `this` 是调用 `fn2` 的对象 a，为了防止在 `fn2` 中的 setTimeout 被 window 调用而导致的在 setTimeout 中的 this 为 window。我们将 `this(指向变量 a)` 赋值给一个变量 `_this`，这样，在 `fn2` 中我们使用 `_this` 就是指向对象 a 了**。

3. 使用apply，call，bind。