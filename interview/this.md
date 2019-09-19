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
        setTimeout(function(){
            this.fn1()
        },200)
    }
}
obj.fn2() //this.fn1 is not a function
```

分析：**obj.fn2()中是：延时200ms执行this.fn1，这时候因为最后调用的是setTimeout，setTimeout是window的对象，在window下没有定义fn1。**

1. 利用箭头函数改变this的指向。

   ```js
   var name = 'up'
   var obj = {
       name:'weiruixi',
       fn1:function(){
           console.log(this.name)
   	},
       fn2:function(){
           setTimeout(()=>{
               this.fn1()
           },200)
       }
   }
   obj.fn2() //weiruixi
   ```

   分析：**根据上面所述：箭头函数没有this，它所谓的this是上层第一个普通函数指向的this，那么对应的是fn2指向的this。调用fn2的是obj，那么this指向obj。**

2. 函数内部使用 **_this = this。**

   ```js
   var name = 'up'
   var obj = {
       name:'weiruixi',
       fn1:function(){
           console.log(this.name)
   	},
       fn2:function(){
       	var _this = this;
           setTimeout(function(){
               _this.fn1()
           },200)
       }
   }
   obj.fn2() //weiruixi
   ```

   分析：**在 fn2 中，首先设置 `var _this = this;`，这里的 `this` 是调用 `fn2` 的对象 a，为了防止在 `fn2` 中的 setTimeout 被 window 调用而导致的在 setTimeout 中的 this 为 window。我们将 `this(指向变量 a)` 赋值给一个变量 `_this`，这样，在 `fn2` 中我们使用 `_this` 就是指向对象 a 了**。

3. 使用apply，call，bind。

   - [ ] apply

     ```js
     var obj = {
         name:'weiruixi',
         fn1:function(){
             console.log(this.name)
     	},
         fn2:function(){
             setTimeout(function(){
                 this.fn1()
             }.apply(obj),200)
         }
     }
     obj.fn2() // weiruixi
     ```

   - [ ] call

     ```js
     var obj = {
         name:'weiruixi',
         fn1:function(){
             console.log(this.name)
     	},
         fn2:function(){
             setTimeout(function(){
                 this.fn1()
             }.call(obj),200)
         }
     }
     obj.fn2() // weiruixi
     ```

   - [ ] bind

     ```js
     var obj = {
         name:'weiruixi',
         fn1:function(){
             console.log(this.name)
     	},
         fn2:function(){
             setTimeout(function(){
                 this.fn1()
             }.bind(obj)(),200)
         }
     }
     obj.fn2() // weiruixi
     ```

4. apply，call，bind区别。

   **apply**：**apply() 方法调用一个函数, 其具有一个指定的this值，以及作为一个数组（或类似数组的对象）提供的参数。**

   语法：fun.apply(thisArg, [argsArray])

   - thisArg：可选的。在 *func* 函数运行时使用的 `this` 值。请注意，`this`可能不是该方法看到的实际值：如果这个函数处于[非严格模式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Strict_mode)下，则指定为 `null` 或 `undefined` 时会自动替换为指向全局对象，原始值会被包装。

     ```
     if(thisArg == undefined|null) this = window，if(thisArg == number|boolean|string) this == new Number()|new Boolean()| new String()
     ```

   - argsArray：可选的。一个数组或者类数组对象，其中的数组元素将作为单独的参数传给 `func` 函数。如果该参数的值为 [`null`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/null) 或  [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)，则表示不需要传入任何参数。

     ```js
     var obj = {
         name:'weiruixi',
         fn:function(a,b){
             console.log(a+b)
         }
     }
     var b = obj.fn
     b.apply(obj,[1,2]) // 3
     ```

   **call**：**call**与apply几乎一致，区别就在于接收的参数不一样，**call接收的是参数列表**（参见下面例子），**apply接收数组**。​	

   ```js
   var obj = {
       name:'weiruixi',
       fn:function(a,b){
           console.log(a+b)
       }
   }
   var b = obj.fn
   b.call(obj,1,2) // 3
   ```

   **bind**：可以看出与call类似的语法，但是需要调用，因为**bind 是创建一个新的函数，我们必须要手动去调用**。

   ```js
   var obj = {
       name:'weiruixi',
       fn:function(a,b){
           console.log(a+b)
       }
   }
   var b = obj.fn
   b.bind(obj,1,2)() // 3
   ```




bind的注意点：**不管我们给函数 `bind` 几次，`fn` 中的 `this` 永远由第一次 `bind` 决定**，但是call与apply几乎不存在链式的写法，因为会直接执行然后再改变this的指向。

```js
let a = {}
let fn = function () { console.log(this) }
fn.bind().bind(a)() // => window
```



**this的注意点**：

1. 对于**new**的方式来说，this绑定在被实例的对象上，**不会被改变指向**。
2. `new` 的方式优先级最高，接下来是 `bind` 这些函数，然后是 `obj.foo()` 这种调用方式，最后是 `foo` 这种调用方式，同时，箭头函数的 `this` 一旦被绑定，就不会再被任何方式所改变。