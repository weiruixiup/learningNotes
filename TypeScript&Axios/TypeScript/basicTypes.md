```ts
// 布尔
let isShow: boolean = false

// 数字
let num: number = 14

// 字符串，可模板字符串
let name: string = 'up'
let fullName: string = `weiruixi - ${name}`

// 数组1:类型后跟上[] 推荐写法
let arr1: string[] = ['1', '2']
let arr2: number[] = [1, 2]
let arr3: any[] = [1, '2']
// 数组2:Array<类型>
let arr4: Array<number> = [1, 2]
let arr5: Array<string> = ['1', '2']
let arr6: Array<any> = [1, '2']

// 元组(tuple):表示一个已知元素数量与类型的数组
let x: [string, number] = ['1', 2]

// 枚举(enum):也是ts中新的数据类型，定义enum和class差不多，首字母大写
// 默认枚举中key的值是0开始，可以自定义。
enum Type {
    Red,
    Blue,
    black
}

let t: Type = Type.Blue
// 可以反查出key
let colorName: string = Type[1] // Blue

// Any:可使用任何类型变量，注意一点：可以看成object类型，
let notSure: any = 3
notSure.test() //OK 即使它没有这个方法

// object:看成Object.create()
// 参数规定是对象
declare function create(o: object): void;
create({label: 'value'}) // ok
create(3) // 报错

// void:与any相反的概念，一般来说没有返回值的函数就是void
function testFn(): void {
    console.log('没有返回值')
}

// null与undefined
let u: undefined = undefined
let n: null = null

// assertions 断言 定义了表弟是any类型，但是我确定他是string。as后面就是我确定的类型。
let brother: any = 'xiaokang'
let myBro: number = (brother as string).length

```

