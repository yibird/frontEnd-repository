## 1.JS 中基本类型有哪些?

- 基本类型包括 `String`、`Number`、`Boolean`、`Null`、`Undefined`、`Symbol(ES6 新增类型)`、`Bigint(ES7 新增类型)`。在 ES5 中基础类型有五种,在 ES6 中基础类型有 6 种,在 ES7 及以上版本基础类型有七种。
- 引用类型包括:`Object`。Object 的子类型包括`Array`、`Date`、`Function`、`RegExp`、`Math`等等。

### 扩展:基本类型与引用类型的区别?

- **存储区域不同**。基本类型存储在栈(stack)中,它由系统自动分配内存空间,并且由系统自动释放。而引用类型存储在堆(heap)中是由系统动态的分配内存空间,不一定会被释放掉。基本类型指向的是一块内存地址,相互之间互不影响;而引用类型指向的是一块内存引用,当变量指向引用类型进行操作时,会影响原始引用类型。
- **数据可变性不同**。基本类型是不可变数据,引用类型是可变数据。数据的可变性是 FP(函数式编程)特征之一,不可变数据是指哪些被创建后就不能修改的数据,在 JS 中所有基本类型本质上是不可变的,对于引用类型来说都是可变的。

## 2.JS 如何判断对象的类型?

- 通过 `typeof` 操作符。`typeof` 操作可以返回表达式的类型,但是在判断 null、Array、Object 类型时都为 object,无法准确判断 null、Array、Object 类型。不同的对象在底层都表示为二进制,在 JavaScript 中二进制前三位都为 0 的话会被判断为 object 类型,null 的二进制表示是全 0,自然前三位也是 0,所以使用 typeof 判断 null 会返回`object`。
- 通过 `instanceof` 操作符判断对象是否属于某个实例。instanceof 操作符在判断 Array 和 Function 类型是否属于 Object 的实例时,结果都为 true 所以 instanceof 操作符无法精确判断 Array 和 Function 类型。由于 instanceof 实现基于原型链机制,而 JS 中原型可以进行任意修改,所以 instanceof 并不能准确判断对象类型。instanceof 操作符的原理是通过原型链机制不停向上匹配目标类型,如果对象的**proto**中途匹配上了目标类型的 prototype 则中断原型链查找(返回 true),否则一直向上查找,直到对象的**proto**为 null 时才终止查找(返回 false)。
- 通过构造器判断类型。无法判断`null`和`undefined`,因为`null`和`undefined`没有构造器。
- 通过 `Object.prototype.toString()`。`Object.prototype.toString()`可以返回一个对象的字符串,通过此方式能够精确判断对象类型。
- 通过 Array.isArray 判断对象是否是数组。Array.isArray()优先级高于 instanceof 操作符,因为 Array.isArray() 可以检测出 `iframes`对象。

### 扩展:如何判断 Promise 和纯对象?

Promise 是一个 JavaScript 对象,用于处理异步操作和回调函数。它代表了一个尚未完成的操作,并且可以在操作完成后返回成功或失败的状态。这个状态可以通过 then()和 catch()方法来处理。而纯对象是指没有继承自其他对象或者原型链上仅有 Object.prototype 属性的对象。

- 判断 Promise:
  - 检查对象是否具有`Promise.prototype`上定义的 then()函数。
  - 使用 ES6 内置的 Promise.resolve()函数。

```ts
// 获取对象的原始类型
const rawType = (val: unknown) => {
  return Object.prototype.toString.call(val).slice(8, -1);
};
// 判断val是否是Function类型
function isFunc(val: unknown): val is Function {
  return typeof val === "function";
}
// 方式1:通过检查目标对象上是否具有Promise.prototype.then()
function isPromise<T = any>(val: unknown): val is Promise<T> {
  return (
    rawType(val) === "Promise" &&
    val !== null &&
    typeof val === "object" &&
    isFunc((val as any).then) &&
    isFunc((val as any).catch)
  );
}

// 方式2:Promise.resolve()函数判断目标对象是否是Promise
function isPromise<T = any>(val: unknown): val is Promise<T> {
  return (
    rawType(val) === "Promise" &&
    val !== null &&
    typeof val === "object" &&
    Promise.resolve(val) === val
  );
}
```

### 扩展:如何判断一个对象是否是纯对象

"纯对象" 通常指的是在编程中表示数据或状态的对象,这些对象是简单的数据容器,通常只包含属性（key-value 对）而没有任何方法或行为。在 JavaScript 中,纯对象通常是指使用对象字面量语法创建的对象,例如:

```js
const person = {
  name: "John",
  age: 30,
  city: "New York",
};
```

判断纯对象的方法如下:

- 使用 Object.getPrototypeOf()方法获取对象的原型,如果该原型不为 null 或者不等于 Object.prototype,则该对象不是纯对象。
- 判断对象是否有自己定义的属性,如果没有则认为该对象是纯对象。

```js
/**
 * 方式1:通过Object.getPrototypeOf()获取对象的原型,
 * 如果该结果等于Object.prototype说明是一个纯对象
 */
function isPlainObject(obj) {
  return Object.getPrototypeOf(obj) === Object.prototype;
}

// 方式2:判断对象是否有自己定义的属性,如果没有则认为该对象是纯对象
function isPlainObject(obj) {
  for (var key in obj) {
    // hasOwnProperty()用于判断对象自身属性中是否具有指定的属性
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
}
```

### 扩展:Number.isNaN()与 isNaN()的区别

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

## 3.JS 0.1+0.2 为什么不等于 0.3?

- 进制转换存储导致精度丢失。JS 在计算数字运算时,先会转为二进制然后再计算,0.1 和 0.2 转为二进制是一个无限循环的数字,但是 JS 采用 IEEE 745 双精度来表示整数和浮点数值,双精度使用 64 位来储存一个浮点数,其中数字或小数(Mantissa)存储在 0 到 51 位,占 52 位,指数(Exponent)存储在 52 到 62 位,占 11 比特,符号(Sign)存储在 63 位,占 1 比特,为 0 表示正数,1 表示负数,所以 JS 最大可以存储 53 位的有效数字,长度大于 53 位的内容会被全部截取掉,从而导致精度丢失。
- 对阶运算导致精度丢失。由于指数位数不同,运算是需要对阶运算,阶小的尾数要根据阶来右移(0 舍入 1),尾数位移时可能会发生数丢失的情况,从而影响精度。

### 扩展:如何解决 JS 浮点数精度问题?

- 通过 big.js、decimal.js、bignumber.js 等工具库解决浮点数精度问题。
- 将计算的浮点数转为整数(大数)计算。
- 使用 Number.EPSILON 减少误差范围。Number.EPSILON 是一个极小的常量,它表示 1 与大于 1 的最小浮点数之间的差。对于 64 位浮点数来说,大于 1 的最小浮点数相当于二进制的 1.00..001,小数点后面有连续 51 个零。Number.EPSILON 实际上是 JavaScript 能够表示的最小精度,误差如果小于这个值,就可以认为已经没有意义了,即不存在误差了。
- 转为字符串计算。

## 4.如何实现 a===1 && a===2 && a===3 为 true?

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

- 通过 Proxy 监听对象属性 getter 操作。在 JavaScript 提供了 Object.defineProperty()和 Proxy 两种对象拦截机制,Proxy 相较于 Object.defineProperty()具有更好的性能、支持 13 种操作拦截和错误提示。

```js
let handler = {
  /**
   * 通过Proxy(代理对象)监听属性读取操作,get()接收三个参数:
   * - target:操作的目标对象。
   * - key:读取的属性名。
   * - target:指向原始的读操作所在的那个对象,一般是Proxy对象。
   */
  get: function (target, key, receiver) {
    console.log("receiver:", receiver);
    if (key === "value") {
      return ++target.value;
    }
  },
};

let obj = new Proxy({ value: 0 }, handler);
console.log(obj.value === 1 && obj.value === 2 && obj.value === 3); // 输出 true
```

## 5.JS 中作用域提升

作用域提升(Hoisting)是指在 JavaScript 解释器中,在代码执行前将变量和函数声明提升到其所在作用域的顶部的过程。注意:只有声明才会被提升,而赋值操作并不会被提升。在 ES6 之前,JavaScript 并没有块级作用域,因此在块内部声明的变量和函数都会被提升到所在的函数或全局作用域中。作用域提升分为变量提升和函数提升,其中函数提升的优先级高于变量提升。

```js
// 变量提升,在变量声明之前使用变量会产生undefined值
console.log(a); // undefined
var a = "hello";

// 函数提升
foo(); // 1
function foo() {
  console.log(1);
}

// 函数提升的优先级高于变量提升,因为函数声明的优先级高于变量声明的优先级
foo(); // "hello"
var foo = "world";
function foo() {
  console.log("hello");
}
```

## 6.说说 JS 原型和原型链

JavaScript 是一种基于原型的语言 (prototype-based language)。在 js 中每个对象都有原型对象,对象以其原型为模板,从原型继承方法和属性,这些属性和方法定义在对象的构造器函数的 `prototype` 属性上,而非对象实例本身。简单来说 js 中每个对象都拥有原型对象`__proto__`,`__proto__`指向当前对象的原型对象(父对象)。每个函数都拥有一个原型对象(即 函数的`prototype`属性,其他类型是上不存在 `prototype`属性),对象的属性和定义的方法在存储在对象构造器函数的 `prototype` 上,`prototype` 被称为对象的显示原型,而`__proto__`被称为对象的隐式原型,每个对象上都存在`__proto__`,即每个对象都有隐式原型。

原型链是一种查询机制,每个对象实例都拥有一个原型对象(即`__proto__`属性),它指向构造函数的原型对象(即`prototype`属性),并从中继承方法和属性,例如`[1,2,3].__proto__`指向`Array.prototype`。当访问对象的属性或方法时,优先会查找当前对象是否有目标属性或方法,如果存在则直接返回并终止查找,如果未查找到,就查找当前对象的父原型对象,如果查找到了就直接返回终止查找,否则就一直向上查找其父原型,如果查找到 Object (Object 的父原型为 null)还未查找到就直接返回 undefined 并终止查找,而这一系列的向上查找父原型的过程就被称为原型链。

## 7.call、apply、bind 函数的区别?

JavaScript 中的 this 是一个特殊的关键字,它表示当前函数执行的上下文,即当前函数被调用时的执行环境。与其他语言不同的是,JS this 并非取决于函数声明的上下文环境,而是取决于函数调用的上下文环境。在不同使用环境,this 的绑定规则也有所不同,绑定的策略包括默认绑定、隐式绑定、显式绑定、new 绑定、箭头函数绑定。

call、apply、bind 这三个函数都可以改变调用者对象的 this 指向,即使用显式绑定策略改变函数的 this 指向。它们的区别如下:

- call 函数的第二个参数是一个扩展参数。
- apply 函数的第二个参数是一个数组,也可以是一个 Argument 对象。
- bind 函数的第二个参数即可以是扩展参数又可以是数组,且 bind 函数会返回一个新的函数。

## 8.什么是闭包?

闭包函数（Closure）是一个函数,它可以访问在其外部定义的变量,即使在外部函数执行完毕后仍然可以访问这些变量,也可以将闭包函数理解为函数嵌套函数。在 JavaScript 中,每个函数都有一个词法作用域,也就是函数定义时的作用域,即每个 JavaScript 函数在执行时都会创建一个词法环境,它包括了函数内部定义的变量和对父级作用域的引用。当访问一个变量时,JavaScript 引擎会首先在当前函数的作用域中查找这个变量,如果找不到就会沿着作用域链向上查找,直到全局作用域,这一系列查找作用域的过程被称为作用域链。

当一个函数内部定义的函数(内部函数)引用了外部函数的作用域,作用域包含了函数内部定义的变量和父级作用域的引用。因此,即使外部函数执行完毕后,内部函数仍然可以访问和引用外部函数的变量。这种情况下,内部函数和它引用的外部函数的变量一起构成了一个闭包。

闭包函数常用于以下场景:

- 封装私有数据。闭包允许将变量私有化,只能通过闭包内的函数来访问和修改,而不会被外部直接访问。这种封装可以提高代码的安全性和可维护性。
- 实现模块化。在 ES6 以前提供模块化的标准,变量函数可能被定义在不同文件,容易产生命名污染。闭包可以用于创建模块,将相关功能和数据封装在一个独立的作用域内,避免全局命名空间的污染。
- 实现函数工厂。闭包可以用于生成函数,每个函数都有自己的状态和行为。
- 实现回调函数。在异步编程中,闭包常用于传递回调函数,以便在稍后的时间内访问外部作用域的数据。
- 实现记忆化功能。由于闭包函数保存可外部函数的作用域,因此可以通过闭包可以实现记忆化（Memoization）来缓存函数的结果,提高函数的性能。

虽然闭包是 JavaScript 中非常强大的特性,但滥用闭包可能导致如下问题:

- 容易导致内存泄漏。内存泄漏是指程序分配了内存空间但在不再需要时未能释放该内存空间,这意味着程序持续占用着系统的内存,导致系统内存资源耗尽,最终可能导致程序崩溃或变得异常缓慢。当闭包中包含对外部作用域变量的引用时,即使外部函数执行完毕,这些引用仍然存在于内存中,可能导致内存泄漏。如果闭包引用了大量的外部数据或 DOM 元素,这些数据和元素将无法被垃圾回收,最终会消耗大量内存。
- 可能存在性能问题。闭包中的变量并不会像局部变量一样被垃圾回收,因此在大规模使用闭包时,可能会导致内存占用增加,从而影响应用程序的性能。
- 维护和调试代码比较困难。过度使用闭包可能会使代码变得复杂和难以维护。闭包中的变量依赖于外部环境,使得代码的行为不透明,很难理解和调试。
- 意外的变量共享。如果多个闭包引用了同一个外部变量,它们之间可能会意外地共享该变量的状态。这可能导致不可预测的行为和错误。

## 9.闭包和立即执行函数(LLEF)的区别?

闭包函数和立即执行函数都是 JS 中的概念,但它们具有不同的作用和应用场景:

- 闭包:闭包是指在一个函数内部定义的函数,该内部函数可以访问包含它的外部函数中的变量和参数。闭包可以用来实现函数式编程中的一些技巧,比如创建私有变量、实现记忆化等。

- 立即执行函数:立即执行函数(IIFE)是指在定义之后立刻执行的函数,通常使用匿名函数来定义,并且使用了一对括号将函数表达式包裹。IIFE 的作用是可以创建一个独立的作用域,避免变量污染全局作用域,也可以实现模块化编程。

虽然闭包函数与立即执行函数是两种不同的概念,但两者应用场景有些重叠,都可以用来避免变量污染全局作用域,实现一些高级的编程技巧。

## 10.ES6 特性有哪些?

- 新增 let 和 const 命令定义变量,增加了块级作用域概念。
- 解构赋值。数组、对象、字符串。
- 对数值、字符串、正则、数组、函数、对象的 Api 扩展。
- 新增 Symbol 基础类型。
- 新增新的 Set 和 Map 结构 WeakSet 和 WeakMap。垃圾回收机制会自动回收 WeakSet 和 WeakMap 中的对象。
- 新增 Proxy、Reflect、Iterator 对象。
- 新增异步解决方案 Promise、Generator、async 函数(async await 是 ES7 推出的)。
- 新增 class 关键字定义类,使 JS 更加符合面向对象。
- 新增 ESM 模块化。模块通过 import 关键字导入,通过 export 关键字导出。

## 11.Set、Map 与 WeakSet、WeakMap 的区别?

WeakSet 与 WeakMap 用于代替无法被释放内存的 Set 和 Map,从而避免造成内存泄漏。WeakSet 与 WeakMap(WeakMap 的 key)存储的都是弱引用对象,一旦未被使用就会进行垃圾回收,释放内存。

Set 与 WeakSet 的区别:

- Set 不仅可以存储值类型又可以存储引用类型,而 WeakSet 只能存储引用类型。
- WeakSet 对象中储存的对象值都是被弱引用的,垃圾回收机制不考虑 WeakSet 对该对象的应用,如果没有其他的变量或属性引用 WeakSet 中的元素时,则这个该元素将会被垃圾回收掉(不考虑该对象还存在于 WeakSet 中),WeakSet 对象里有多少个成员元素,取决于垃圾回收机制有没有运行。WeakSet 是无法被遍历,也无法获取 WeakSet 中所有元素。

Map 与 WeakMap 的区别:

- Map 的 key 不仅可以存储值类型又可以存储引用类型,而 WeakMap 只能存储引用类型。
- WeakMap 只能以引用类型作为 key(排除 null),且是 key 是被弱引用的,key 对象未被使用时将会被垃圾回收掉。WeakMap 无法被遍历,只支持 get、set、has、delete 方法。

## Object 与 Map 的区别?

JavaScript 中的 Object 和 Map 都可以被用来存储键值对。但是,它们之间有几个区别:

- 存储 key 类型不同。Object 的键必须是字符串或符号,而 Map 的键可以是任何类型的值,包括函数、对象和原始类型。
- 存储键值对有序性不同。Map 中的键值对是有序的,而 Object 中的键值对是无序的。这意味着当迭代一个 Map 时,它的元素是按照插入顺序返回的。
- 应用场景不同。Map 比 Object 更适合存储大量的键值对,因为它被设计为高效地处理大量的数据。

## for...in 和 for...of 的区别?

for...in 和 for...of 都是循环语句,但有以下区别:

- `for...in` 循环用于遍历对象的属性,而 for...of 循环用于遍历可迭代对象的值。
- `for...in` 循环遍历的是一个对象的键名,而 for...of 循环遍历的是一个可迭代对象的键值。
- `for...in` 循环可以遍历对象的原型链中的属性,而 for...of 循环只能遍历自身属性。
- `for...in` 循环遍历的顺序是不确定的,而 for...of 循环遍历的顺序是按照可迭代对象的顺序进行的。
- `for...in` 循环可以用于遍历普通对象、数组和字符串等,而 for...of 循环只能用于遍历实现了迭代器接口的对象,如数组、字符串、Map、Set、Generator 等。

## setTimeout、setInterval、requestAnimationFrame 各有什么特点？

- setTimeout:它是一个在指定的时间后执行特定逻辑的一次性定时器。
- setInterval:它类似于 setTimeout,但是它会在指定的时间间隔内重复执行相同的代码。
- requestAnimationFrame:它是一种优化了的定时器,在当前屏幕刷新频率下执行动画(确保在下一次浏览器渲染之前更新动画),可以节省系统资源,提高动画的渲染效率。它的主要特点是更加平滑自然地在屏幕上播放动画,通过浏览器的优化能够尽量保证动画流畅度,在动画中使用 requestAnimationFrame 可以避免出现卡顿、闪烁等现象。

## 箭头函数与普通函数的区别?

- 箭头函数不能作为构造函数。函数对象是一个支持`[[Call]]`和`[[Construct]]`内部方法的对象,当使用 `new` 操作符对某个对象进行实例化时,必须确保该对象具有`[[Construct]]`这个内部方法。而箭头函数没有不支持`[[Construct]]`内部方法,所以无法使用 new 进行实例化。
- 箭头函数没有 arguments 形参列表,但 rest 参数(剩余参数)可以获取函数参数列表。
- 箭头函数没有原型对象。
- 箭头的 this 绑定取决于上层作用域。所以箭头函数无法使用`call`、`apply`、`bind`函数改变 this 指向。
- 箭头函数不能当作 Generator 函数,不能使用 yield 关键字。

## 11.let 与 const 的区别

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

## prefetch、preload 的区别?

Prefetch(预获取)和 Preload(预加载)是两种优化网页加载性能的技术,它们的区别在于应用场景和工作方式:

- 应用场景:
  - Prefetch:Prefetch 用于在浏览器空闲时提前获取未来导航所需的资源,即优化下一个页面的性能。它适用于那些可能在用户浏览当前页面时不会立即需要,但在后续导航时可能需要的资源,如其他页面的样式表、脚本、图像等。
  - Preload:Preload 用于在当前页面加载时提前获取关键资源,即优化当前页面的性能。它适用于当前页面中需要的关键资源,如当前页面的样式表、字体文件、脚本等。
- 工作方式:
  - Prefetch:Prefetch 告诉浏览器在空闲时间预先获取资源,并将其缓存起来,以便在后续的导航中更快地加载和呈现这些资源。当浏览器空闲时,它会异步地获取这些资源,这样在后续导航时就能更快地获取到这些预取资源。例如:`<link rel="prefetch" href="path/to/resource">`。
  - Preload:Preload 告诉浏览器当前页面需要优先加载的关键资源,并将其设置为高优先级。浏览器会立即开始获取和处理这些资源,以便在当前页面加载完成时,这些关键资源已经准备就绪,可以立即使用。例如:`<link rel="preload" href="path/to/resource">`。

## 12.script 脚本 defer 和 async 的区别?

- script 标签打开 defer 和 async 属性都会使脚本异步加载。渲染引擎遇到 defer 或 async 时,就会开始下载外部脚本,但不会等待脚本下载和执行,而是执行后面的命令,所以 defer 和 async 并不会造成浏览器阻塞,从而提升加载速度。
- defer 与 async 的执行时机不同。简单来说 defer 是页面渲染完毕再执行,async 是脚本下载完毕就执行。defer 要等到整个页面在内存中渲染结束后(此时 DOM 结构完全生成,以及其他脚本执行完毕),才会执行。而 async 一旦下载完毕,渲染引擎就会中断渲染,执行这个脚本后再继续渲染。当有多个 defer 脚本时,会按照它们在页面的出现顺序进行顺序加载,而多个 async 脚本无法保证加载顺序。

::: tip
对于浏览器带有`type="module"`的 script 脚本,都会进行异步加载,不会造成浏览器阻塞,即等到整个页面渲染完毕后再执行脚本,等同于启用了 script 标签的 defer 属性。
:::

## 13.ES6 模块与 CommonJS 模块的区别?

- CommonJS 模块输出的是一个值的拷贝,ESModule 输出的是一个值的引用。在 CommonJS 中一旦输出一个值,模块内部的变化就影响不到这个值。

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

## 什么是防抖和节流?

## 什么是柯里化?

柯里化（Currying）是一个计算机科学中的概念,它是一种将接受多个参数的函数转化为一系列接受单个参数的函数的技术,简单来说将多元参数转换为多个接收一元参数的机制。柯里化的名字来源于数学家和逻辑学家 Haskell Curry,他是这个概念的先驱之一。

柯里化的主要思想是将一个多参数函数分解成一系列只接受单个参数的函数,每个函数都返回一个新函数,等待接收下一个参数,直到所有参数都被收集完毕,然后执行原始函数。这种技术有助于更容易地复用函数和创建更具可组合性的代码。柯里化常用于以下场景:

- 参数复用。柯里化使得部分应用成为可能,这意味着可以先传递一部分参数,然后在后续调用中传递其他参数。这对于在多个函数调用中共享相同的参数非常有用,以减少冗余代码。

- 函数组合。柯里化有助于函数的组合,允许将一个函数的输出传递给另一个函数,从而创建复杂的功能链。这对于函数式编程中的管道和组合操作非常有用。
- 延迟计算。柯里化允许您延迟函数的执行。可以部分应用函数,然后在需要时再传递剩余的参数,以便在最后一刻执行计算。

```js
// 使用柯里化来延迟计算平方
function currySquare() {
  return function (x) {
    return function () {
      return x * x;
    };
  };
}
// 创建柯里化的平方计算函数
const delayedSquare = currySquare();
// 调用延迟计算函数，传递参数
const squareOf2 = delayedSquare(2);
// 在需要时执行计算
const result = squareOf2(); // 此时才计算 2 * 2 的结果
console.log(result); // 输出：4
```

- 配置。柯里化可以用于配置函数,允许您在应用程序的不同部分使用相同的配置参数,而无需在每次调用时都传递它们。
- 验证和校验参数。柯里化可以用于创建通用的验证和校验函数,其中每个验证规则可以被封装成一个柯里化函数,以便在不同的上下文中进行重复使用。

```js
// 柯里化的验证规则
function createValidator(rule) {
  return function (value) {
    return rule(value);
  };
}

// 基本的验证规则
function isRequired(value) {
  return value !== undefined && value !== null && value !== "";
}

function isEmail(value) {
  // 此处简化验证逻辑，实际应用中应该使用更复杂的邮箱验证规则
  return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(value);
}

function isNumeric(value) {
  return !isNaN(value) && isFinite(value);
}

// 创建柯里化的验证函数
const validateRequired = createValidator(isRequired);
const validateEmail = createValidator(isEmail);
const validateNumeric = createValidator(isNumeric);

// 使用验证函数
const userInput = "";

console.log(validateRequired(userInput)); // false
console.log(validateEmail("example.com")); // false
console.log(validateNumeric("123abc")); // false
```

## FileReader 的作用?

FileReader 是 JavaScript 中用于读取文件内容到内存中的内置对象。它提供了异步读取文件的能力,使得在 Web 应用程序中可以从用户的计算机本地文件系统中读取文件内容,然后进行处理,例如上传文件或预览图像。FileReader 对象的主要方法和事件包括:

- readAsText(file, encoding):以文本形式读取文件内容。file 参数是一个 File 或 Blob 对象,encoding 参数是一个可选的编码方式,通常是 "UTF-8"。
- readAsDataURL(file):以 Data URL 形式读取文件内容,通常用于预览图像。file 参数是一个 File 或 Blob 对象。
- readAsArrayBuffer(file):以二进制数组形式读取文件内容。file 参数是一个 File 或 Blob 对象。
- readAsBinaryString(file):以二进制字符串形式读取文件内容,不推荐使用。
- abort():取消读取操作。
- onload 事件:文件读取完成时触发。
- onerror 事件:读取文件发生错误时触发。
- onprogress 事件:文件读取过程中定期触发,用于显示进度。

## Cookie、LocalStorage、SessionStorage 的区别?

- Cookie:Cookie 是一小段文本信息,通常由服务器发送到客户端,然后由浏览器存储在用户的计算机上。
- LocalStorage: LocalStorage 是 HTML5 引入的一种客户端存储机制,允许在浏览器中永久存储键值对数据。
- SessionStorage:SessionStorage 也是 HTML5 引入的一种客户端存储机制,与 LocalStorage 类似。

根据不同层面三者区别如下:

- 生命周期不同:
  - Cookie 支持创建时设置过期时间,也可以在浏览器关闭后删除,在到达过期时间之前,Cookie 将一直存在。
  - LocalStorage 存储的数据是永久性的,不会过期,除非清除浏览器缓存或手动调用 API 清除数据。
  - SessionStorage 存储的数据仅在当前会话期间有效,当用户关闭浏览器标签或窗口时,数据将被删除。
- 存储大小不同:
  - Cookie 的大小通常受到限制(通常为几 KB),因此不适合存储大量数据,而且 APP 环境不支持 Cookie,因此在实际开发中通常使用 JWT 代替 Cookie。
  - LocalStorage 和 SessionStorage 存储大小限制是 5MB 左右。
- 发起请求是否会被携带:
  - Cookie 的数据在每次 HTTP 请求中都会被发送到服务器,这可能会增加网络流量。如果 Cookie 包含敏感信息可能会被拦截或泄漏给攻击者,而且 Cookie 容易 XSS、CSRF 攻击。
  - 发起 HTTP 请求并不会携带 LocalStorage 和 SessionStorage 数据,因此不会存在额外的流量浪费,而且没有安全性问题。

## 什么是 Web Worker?它的应用场景有哪些?

Web Worker 是 HTML5 引入的一项技术,允许在 Web 应用程序中创建多线程 JavaScript 执行环境。通常,JavaScript 在浏览器中是单线程执行的,这意味着所有的任务都在同一个线程中运行,如果执行时间过长,可能会导致页面卡顿或不响应。Web Worker 的引入允许在后台线程中运行 JavaScript 代码,以提高 Web 应用程序的性能和响应速度。

Web Worker 的应用场景包括:

- 计算密集型任务: Web Worker 可用于执行计算密集型操作,如数据处理、图像处理、加密和解密等,以避免阻塞主线程,保持用户界面的响应性。
- 网络请求: 在 Web Worker 中执行网络请求,以避免主线程中的长时间阻塞。例如,可以在 Web Worker 中执行 AJAX 请求或使用 Fetch API。或者利用 Web Worker 加速文件分片上传。
- 大规模数据处理: 处理大型数据集或进行复杂的数据操作时,Web Worker 可以提供更好的性能,因为它们可以并行执行任务。
- 实时数据更新: 使用 Web Worker 可以实现实时数据更新和轮询,而不会影响用户界面的响应性。

## 浏览器的渲染原理?

浏览器的渲染原理是指浏览器如何将网页的 HTML、CSS 和 JavaScript 代码转化为用户可视的页面。以下是浏览器渲染的基本步骤:

- HTML 解析:浏览器首先会加载 HTML 文档。它会解析 HTML 代码,构建文档对象模型(DOM)。DOM 是网页的树状结构,表示了页面中的各个元素及其关系。
- CSS 解析:一旦浏览器有了 DOM,接下来它会加载和解析 CSS 文件,构建层叠样式表(CSSOM)。CSSOM 描述了文档中各个元素的样式信息。
- 创建渲染树(Render Tree):浏览器会将 DOM 和 CSSOM 结合起来,创建一个渲染树(Render Tree)。渲染树包含了要渲染的页面内容以及它们的样式信息,但不包括不可见的元素(例如,被 CSS 隐藏的元素)。
- 布局(Layout):浏览器根据渲染树计算每个元素在屏幕上的位置和大小。这个过程称为布局或回流(Reflow)。计算的结果被保存在一个称为布局树(Layout Tree)的数据结构中。
- 绘制(Paint):一旦布局完成,浏览器开始绘制页面。它会将页面的每个可见元素绘制成像素,填充颜色、边框等。
- 合成(Composite):最后,浏览器将不同层的像素组合成最终的页面图像。这个过程称为合成。合成可以使用硬件加速来提高性能。
