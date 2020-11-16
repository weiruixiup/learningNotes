```ts
// tsc - v 查看当前ts版本

// 将ts文件编译成js文件：tsc hello.ts || tsc hello.ts --target es2015 (编译成es2015)

// c是compile

// undefined` 是所以类型的子类型

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

// 类数组 arguments 只有数组的属性 没有数组的方法
function test() {
    console.log(arguments)
}

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
 
// 联合类型：创建一个可以是多种类型的变量（用|连接两种类型）或者
let numberOrString: number | string = 39
numberOrString = '39'

// 交叉类型：&

// 接口 Interface
// 1，对对象的形状进行描述
// 2，对类进行抽象
// 3，Duck Typing

// 定义一个interface，首字母大写，并在前面加I，方便阅读
// 属性后面加?，代表是可选属性，可有可无
// 定义一个只读的属性 用readonly
// 属性写法类似对象，但是是 ； 隔开 （或者都不写）
interface IPerson {
    readonly id: string;
    age: number;
    name: string;
    sex?: string;
}

let weiruixi: IPerson = {
    id: '123',
    name: 'bruce',
    age: 24
};


// class
// 1,public private protected readonly static
// 默认所有的属性前面都加上了 public
// private定义的属性只可以在类的本身中使用
// static静态属性 在实例属性上使用 this.前缀来访问属性一样，这里我们使用 `${实例}`.来访问静态属性。
class Person {
    readonly onlyStr: string = 'weiruixi';
    private privateStr: string;
    protected name: string;
    static staticObj: { x: 0, y: 0 };

    constructor(name: string) {
        this.name = name;
    }

    staticFn() {
        console.log(Person.staticObj.x); // static静态属性 可以替换this.
    }
}

let person = new Person('up');
console.log(person.onlyStr = 'weiruixiUp'); // 错误 readonly属性

class Employee extends Person {
    private department: string;

    constructor(name: string, department: string) {
        super(name);
        this.department = department;
    }

    public getElevatorPitch() {
        return `Hello, my name is ${this.name} and I work in ${this.department}.`;
    }
}

let howard = new Employee('Howard', 'Sales');
console.log(howard.getElevatorPitch());
console.log(howard.name); // 错误 reason：protected成员在派生类中仍然可以访问；上面方法打印是有name属性的，是因为在Employee中继承了父类Person的name，但是直接使用，就跳出了Employee。


// 首先按照普通函数的写法写即可，然后后面加上每个参数的类型，并且加上返回值的类型，也会自动推断出返回类型
// 也支持?:可选参数的写法，但是可选参数必须放在最后面
// 可选参数也支持ES6写法 z=0

// 函数申明
function add(x: number, y: number, z?: number): number {
    if (typeof z === 'number') {
        return x + y + z;
    } else {
        return x + y;
    }
}

add(1, 2);

// 函数表达式
const addFn = (x: number, y: number, z?: number): number => {
    if (typeof z === 'number') {
        return x + y + z;
    } else {
        return x + y;
    }
};
addFn(4, 3);

// class 与 interface的复合使用
// implements
interface Radio {
    switchRadio(trigger: boolean): void
}

interface Battery {
    checkBatteryStatus(): void
}

class Car implements Radio {
    switchRadio(trigger: boolean): void {
    }
}

class CellPhone implements Radio, Battery {
    switchRadio(trigger: boolean): void {
    }

    checkBatteryStatus(): void {
    }
}

// 改造写法 CellPhones等价CellPhone
interface RadioWithBattery extends Radio {
    checkBatteryStatus(): void
}

class CellPhones implements RadioWithBattery {
    switchRadio(trigger: boolean): void {
    }

    checkBatteryStatus(): void {
    }
}


// 泛型：定义函数或接口或类的时候，使用时再制定类型

function echo<T>(arg: T): T {
    return arg;
}

const result1 = echo(3);
const result2 = echo('3');

function swap<T, U>(tuple: [T, U]): [U, T] {
    return [tuple[1], tuple[0]];
}

const result3 = ['string', 1];


// 约束泛型 只可以传人指定类型的泛型 函数中使用
function echoWithArr<T>(arg: T[]): T[] {
    console.log(arg.length);
    return arg;
}

const arrs = echoWithArr([1, 2, 3]);

// 约束泛型 extends 关键字
interface IWithLength {
    length: number
}

function echoWithLength<T extends IWithLength>(arg: T): T {
    console.log(arg.length);
    return arg;
}

const str = echoWithLength('str');
const obj = echoWithLength({length: 10});
const arr = echoWithLength([123]);


// 泛型在类和接口中使用
class Queue<T> {
    private data = [];

    push(item: T) {
        return this.data.push(item);
    }

    pop(): T {
        return this.data.shift();
    }
}

const queue = new Queue();

interface KeyPair<T, U> {
    key: T
    value: U
}

let kp1: KeyPair<number, string> = {key: 1, value: 'string'};
let kp2: KeyPair<string, number> = {key: 'str', value: 2};


// 申明文件declaration 一般会是.d.ts文件结尾


```

