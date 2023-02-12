### 1.JS 中基本类型有哪些?

- 基本类型包括 String、Number、Boolean、Null、Undefined、Symbol(ES6 新增类型)、Bigint(ES7 新增类型)。
- 引用类型包括:Object。Array、Date、Function、RegExp、Math 都是 Object 的子类型。

#### 扩展:基本类型与引用类型的区别?

- 存储区域不同。基本类型存储在栈(stack)中,它由系统自动分配内存空间,并且由系统自动释放。而引用类型存储在堆(heap)中是由系统动态的分配内存空间,不一定会被释放掉。基本类型指向的是一块内存地址,相互之间互不影响;而引用类型指向的是一块内存引用,当变量指向引用类型进行操作时,会影响原始引用类型。
- 数据可变性不同。基本类型是不可变数据,引用类型是可变数据。数据的可变性是 FP(函数式编程)特征之一,不可变数据是指哪些被创建后就不能修改的数据,在 JS 中所有基本类型本质上是不可变的,对于引用类型来说都是可变的。

### 2.JS 如何判断对象的类型?

- 通过 typeof 操作符。typeof 操作可以返回表达式的类型,但在在判断 null、Array、Object 类型时都为 object,无法准确判断 null、Array、Object 类型。不同的对象在底层都表示为二进制,在 JavaScript 中二进制前三位都为 0 的话会被判断为 object 类型,null 的二进制表示是全 0,自然前三位也是 0,所以使用 typeof 判断 null 会返回`object`。
- 通过 instanceof 操作符判断对象是否属于某个实例。instanceof 操作符在判断 Array 和 Function 类型是否属于 Object 的实例时,结果都为 true 所以 instanceof 操作符无法精确判断 Array 和 Function 类型。由于 instanceof 实现基于原型链机制,而 JS 中原型可以进行任意修改,所以 instanceof 并不能准确判断对象类型。instanceof 操作符的原理是通过原型链机制不停向上匹配目标类型,如果对象的**proto**中途匹配上了目标类型的 prototype 则中断原型链查找(返回 true),否则一直向上查找,直到对象的**proto**为 null 时才终止查找(返回 false)。
- 通过构造器判断类型。无法判断`null`和`undefined`,因为`null`和`undefined`没有构造器。
- 通过 Object.prototype.toString()。Object.prototype.toString()可以返回一个对象的字符串,通过此方式能够精确判断对象类型。
- 通过 Array.isArray 判断对象是否是数组。Array.isArray()优先级高于 instanceof 操作符,因为 Array.isArray() 可以检测出 `iframes`对象。

#### 扩展:如何判断 Promise 和纯对象?

#### 扩展:Number.isNaN()与 isNaN()的区别

Number.isNaN()方法和 isNaN()的区别在于,Number.isNaN()不会将传入的非数值类型进行强制转换为数值类型,而是首先判断传入的参数是否为数值类型,只要是非数值类型就直接返回 false。而 isNaN()会对非数值类型进行强制转换为数值类型,然后再进行判断。

```ts
console.log(isNaN(NaN)); // true
console.log(isNaN(true)); // true
console.log(isNaN("aa")); // true
console.log(isNaN("")); // false
console.log(isNaN(null)); // false
console.log(isNaN(undefined)); // false

console.log(Number.isNaN(NaN)); // true
console.log(Number.isNaN(true)); // false
console.log(Number.isNaN("aa")); // false
console.log(Number.isNaN("")); // false
console.log(Number.isNaN(null)); // false
console.log(Number.isNaN(undefined)); // false
```

### 3.JS 0.1+0.2 为什么不等于 0.3?

- 进制转换存储导致精度丢失。JS 在计算数字运算时,先会转为二进制然后再计算,0.1 和 0.2 转为二进制是一个无限循环的数字,但是 JS 采用 IEEE 745 双精度来表示整数和浮点数值,双精度使用 64 位来储存一个浮点数,其中数字或小数(Mantissa)存储在 0 到 51 位,占 52 位,指数(Exponent)存储在 52 到 62 位,占 11 比特,符号(Sign)存储在 63 位,占 1 比特,为 0 表示正数,1 表示负数,所以 JS 最大可以存储 53 位的有效数字,长度大于 53 位的内容会被全部截取掉,从而导致精度丢失。
- 对阶运算导致精度丢失。由于指数位数不同,运算是需要对阶运算,阶小的尾数要根据阶来右移(0 舍入 1),尾数位移时可能会发生数丢失的情况,从而影响精度。

#### 扩展:如何解决 JS 浮点数精度问题?

- 通过 big.js、decimal.js、bignumber.js 等工具库解决浮点数精度问题。
- 将计算的浮点数转为整数(大数)计算。
- 使用 Number.EPSILON 减少误差范围。Number.EPSILON 是一个极小的常量,它表示 1 与大于 1 的最小浮点数之间的差。对于 64 位浮点数来说,大于 1 的最小浮点数相当于二进制的 1.00..001,小数点后面有连续 51 个零。Number.EPSILON 实际上是 JavaScript 能够表示的最小精度,误差如果小于这个值,就可以认为已经没有意义了,即不存在误差了。
- 转为字符串计算。

### 4.如何实现 a===1 && a===2 && a===3 为 true?

- 重写对象 valueOf 方法。valueOf()用于返回对象的原始值,当对象进行弱等于(==)比较时,根据隐式转换类型规则,首先将左右两两边的值转化成相同的原始类型,然后再去比较它们是否相等。每当对象使用弱等于会调用 valueOf()将对比值都转为原始类型,然后再进行比较。该方案在在强等于(===)情况下失效,由于强等于不会进行类型转换,所以并不会调用 valueOf()。

```js
const a = { value: 0 };
// 重写valueOf,每次访问a就会调用a的valueOf(),从而使a的value每次加1
a.valueOf = function () {
  return this.value + 1;
};
/**
 * 弱等于情况下会将比较两值转换为同一类型原始类型进行比较,
 * 转换为原始类型时会调用valueOf()。
 */
console.log(a == 1 && a == 2 && a == 3); // true

/**
 * 强类型比较不会进行类型转换,从而不会调用valueOf()。
 */
console.log(a === 1); // false
console.log(a === 1 && a === 2 && a === 3); // false
```

- 通过 defineProperty 监听对象属性 getter 操作。defineProperty 允许侦听对象某个属性的 getter 和 setter,每当访问对象就会执行 get 函数返回其属性的值。

```js
// 定义全局变量,即window.value
var value = 0;
// 监听window对象的a属性getter操作,每次访问window.a都会执行get函数
Object.defineProperty(window, "a", {
  get: function () {
    return (this.value += 1);
  },
});
console.log(a === 1 && a === 2 && a === 3); // true
console.log(a == 1 && a == 2 && a == 3); // false
```

### 5.JS 中作用域提升

### 6.说说 JS 原型和原型链

### 7.call、apply、bind 函数的区别?

call、apply、bind 这三个函数都可以改变调用者对象的 this 指向。它们的区别如下:

- call 函数的第二个参数是一个扩展参数。
- apply 函数的第二个参数是一个数组,也可以是一个 Argument 对象。
- bind 函数的第二个参数即可以是扩展参数又可以是数组,且 bind 函数会返回一个新的函数。

### 8.什么是闭包?

### 9.闭包和立即执行函数(LLEF)的区别?

### 10.ES6 特性有哪些?

- 新增 let 和 const 命令定义变量,增加了块级作用域概念。
- 解构赋值。数组、对象、字符串。
- 对数值、字符串、正则、数组、函数、对象的 Api 扩展。
- 新增 Symbol 基础类型。
- 新增新的 Set 和 Map 结构 WeakSet 和 WeakMap。垃圾回收机制会自动回收 WeakSet 和 WeakMap 中的对象。
- 新增 Proxy、Reflect、Iterator 对象。
- 新增异步解决方案 Promise、Generator、async 函数(async await 是 ES7 推出的)。
- 新增 class 关键字定义类,使 JS 更加符合面向对象。
- 新增 ESM 模块化。模块通过 import 关键字导入,通过 export 关键字导出。

#### Set、Map 与 WeakSet、WeakMap 的区别?

WeakSet 与 WeakMap 用于代替无法被释放内存的 Set 和 Map,从而避免造成内存泄漏。WeakSet 与 WeakMap(WeakMap 的 key)存储的都是弱引用对象,一旦未被使用就会进行垃圾回收,释放内存。

Set 与 WeakSet 的区别:

- Set 不仅可以存储值类型又可以存储引用类型,而 WeakSet 只能存储引用类型。
- WeakSet 对象中储存的对象值都是被弱引用的,垃圾回收机制不考虑 WeakSet 对该对象的应用,如果没有其他的变量或属性引用 WeakSet 中的元素时,则这个该元素将会被垃圾回收掉(不考虑该对象还存在于 WeakSet 中),WeakSet 对象里有多少个成员元素,取决于垃圾回收机制有没有运行。WeakSet 是无法被遍历,也无法获取 WeakSet 中所有元素。

Map 与 WeakMap 的区别:

- Map 的 key 不仅可以存储值类型又可以存储引用类型,而 WeakMap 只能存储引用类型。
- WeakMap 只能以引用类型作为 key(排除 null),且是 key 是被弱引用的,key 对象未被使用时将会被垃圾回收掉。WeakMap 无法被遍历,只支持 get、set、has、delete 方法。

#### 箭头函数与普通函数的区别?

- 箭头函数不能作为构造函数。函数对象是一个支持`[[Call]]`和`[[Construct]]`内部方法的对象,当使用 `new` 操作符对某个对象进行实例化时,必须确保该对象具有`[[Construct]]`这个内部方法。而箭头函数没有不支持`[[Construct]]`内部方法,所以无法使用 new 进行实例化。
- 箭头函数没有 arguments 形参列表,但 rest 参数(剩余参数)可以获取函数参数列表。
- 箭头函数没有原型对象。
- 箭头的 this 绑定取决于上层作用域。所以箭头函数无法使用`call`、`apply`、`bind`函数改变 this 指向。
- 箭头函数不能当作 Generator 函数,不能使用 yield 关键字。

### 11.let 与 const 的区别

- 都有块级作用域。let 和 const 是 ES6 提供用于声明变量的两个命令,两者都有块级作用域。推荐 let 取代 var,两者语义完全相同,且 let 无副作用。

```js
// 全局作用域下分别使用var、let、const声明变量
var a = 1;
let b = 2;
const c = 3;
console.log(window.a); // 1
console.log(window.b); // undefined
console.log(window.c); // undefined
/*
 * 解析:从全局作用域下分别使用var、let、const声明变量例子来看,var声明的变量可以
 * 被window访问,但let和const声明的变量无法被window访问,这是因为const和let会生成块级作用域,
 * 而ES5没有块级作用域的概念,只有函数作用域,可以近似理解为如下代码这样,所以外层window必然无法
 * 访问let和const声明的变量。
 */
let a = 10;
const b = 20;
// 等同于
(function () {
  var a = 10;
  var b = 20;
})();
```

- const 符合函数式编程。const 用于定义常量,尤其在全局环境下。const 比较符合函数式编程思想,运算不改变值,而是新建值,这样有利用将来的分布式计算。
- JS 编译器会对 const 进行优化。由于 JS 编译器会对 const 进行优化,使用 const 对比 let 有利于提高程序的执行效率。let 与 const 的本质区别是编译器内部处理不同。
- 在 JS 多线程环境下 let 是线程安全的。长远看来,JS 有可能会实现多线程,那么 let 表示的变量只应出现在单线程运行的代码中,不能是多线程共享的,这样有利于保证线程安全。

### 12.script 脚本 defer 和 async 的区别?

- script 标签打开 defer 和 async 属性都会使脚本异步加载。渲染引擎遇到 defer 或 async 时,就会开始下载外部脚本,但不会等待脚本下载和执行,而是执行后面的命令,所以 defer 和 async 并不会造成浏览器阻塞,从而提升加载速度。
- defer 与 async 的执行时机不同。简单来说 defer 是页面渲染完毕再执行,async 是脚本下载完毕就执行。defer 要等到整个页面在内存中渲染结束后(此时 DOM 结构完全生成,以及其他脚本执行完毕),才会执行。而 async 一旦下载完毕,渲染引擎就会中断渲染,执行这个脚本后再继续渲染。当有多个 defer 脚本时,会按照它们在页面的出现顺序进行顺序加载,而多个 async 脚本无法保证加载顺序。

::: tip
对于浏览器带有`type="module"`的 script 脚本,都会进行异步加载,不会造成浏览器阻塞,即等到整个页面渲染完毕后再执行脚本,等同于启用了 script 标签的 defer 属性。
:::

### 13.ES6 模块与 CommonJS 模块的区别?

- CommonJS 模块输出的是一个值的拷贝,ESM 输出的是一个值的引用。在 CommonJS 中一旦输出一个值,模块内部的变化就影响不到这个值。

```js
// lib.js
var counter = 3;
function incCounter() {
  counter++;
}
module.exports = {
  counter: counter,
  incCounter: incCounter,
};

// main.js
var lib = require("./lib");
console.log(lib.counter); // 3
lib.incCounter();
console.log(lib.counter); // 3

/*
 * 在main.js中调用incCounter()但counter的值仍是3,这说明lib模块内部对值的
 * 改变并不会影响到这个值,这是因为lib.counter是一个原始类型的值,会被缓存。
 * 除非写成一个函数,才能得到模块内部变化后的值。
 *
 * module.exports = {
 *  // 修改为一个get函数即可正常读取变动后的counter
 *  get counter(){ return counter},
 *  incCounter: incCounter,
 * };
 */
```

ESM 的运行机制与 CommonJS 模块不一样。JS 引擎对脚本静态解析时,遇到模块的加载命令`import`,就会生成一个只读引用,等到脚本真正执行时,再根据这个只读引用到被加载的模块去取值。ES6 的`import`有点类似于 Unix 系统的"符号连接",原始值变化,`import`加载的值也会随着变化。因此,ESM 是动态引用,并不会缓存值,模块里面的变量绑定其所在的模块。

```js
// lib.js
export let counter = 3;
export function incCounter() {
  counter++;
}

// mian.js
import { counter, incCounter } from "./lib";
console.log(counter); // 3
incCounter();
console.log(counter); // 4
// 从结果来看ESM是属于动态引用的,lib模块counter变化会影响main模块的counter
```

- CommonJS 模块是运行时加载,ESM 是编译时输出接口。CommonJS 加载的是一个对象(即 module.exports 属性),该对象只有在脚本运行完毕后才会加载。ESM 不是对象,它的对外接口只是一种静态定义,在代码静态解析阶段就会执行,所以 ESM 的静态分析的特点天然支持 Tree shaking(摇树,即描述移除 JS 上下文中未引用的代码,从而缩小代码体积)。
