函数(Function)是执行特定任务的代码块,某些代码调用它就会被执行。在 JavaScript 中函数是一等公民,每一个函数都是一个 Function 对象,它们可以像任何其他对象一样具有属性和方法,与其他对象不同的是函数可以被执行。函数由 function 关键字定义(可选),函数由函数名(可选)、参数列表、函数主体、返回值(可选)4 部分组成,定义函数时应遵循单一职责,即一个函数只做一件事。

### 定义函数的几种方式

```js
// 方式1:通过function定义函数
function func1() {
  // 函数体
}
func1();

// 方式2:通过字面量定义函数,由于function(){}没有函数名,所以又被称为匿名函数
const func2 = function (a, b) {
  return a + b;
};
console.log(func2(1, 1)); // 2

/*
 * 方式3:通过实例化Function构造函数定义函数,Function()除最后一个参数,其余参数均为函数参数名称,
 * Function()最后一个为函数主体,注意:这种方式不安全,容易遭受攻击
 */
const func3 = new Function("a", "b", "return a*b");
console.log(func3(2, 3)); // 6

// 方式4:箭头函数
const func4 = () => {
  console.log("箭头函数");
};

// 在函数上定义属性或函数
function func5() {}
func5.name = "z乘风";
func5.hello = function () {};
console.log(func5); // f func5(){}
console.log(func5.name); // z乘风
console.log(func5.hello); // f (){}
```

虽然函数是一个特殊的对象,但函数具有 length 属性,函数的 length 取决于函数形参的个数,函数形参的数量不包括剩余参数个数,仅包括"第一个具有默认值之前的参数个数"。

```js
var fn01 = function () {};
// 函数无形参
console.log(fn01.length); // 0

var fn02 = function (...args) {};
// 由于args是一个剩余参数,形参数量不包含剩余参数
console.log(fn02.length); // 0

var fn03 = function (a = 1, b, c) {};
// 由于函数第一个形参是默认参数,第一个参数之前的参数个数是0个
console.log(fn03.length); // 0

var fn04 = function (a, b, c = 1, d) {};
// 由于函数形参c是一个默认参数,形参个数只会包括c之前的参数个数,即a和b两个
console.log(fn04.length); // 2

// Function构造器的函数长度为1
console.log(Function.length); // 1
```

### 作用域

在了解函数的 this 之前首先要熟悉 JavaScript 中的作用域,作用域决定了代码区块中变量和其他资源的可见性。在 JavaScript 中作用域可分为**全局作用域(Global scope)**和**函数作用域(Function scope)**,全局作用域是指在无嵌套的函数执行环境,函数作用域又被称为局部作用域(每个函数都有独立的作用域),是指在所处在嵌套的函数中的执行环境。

```js
function func01() {
  console.log("Global scope");
}
// func01()调用时未被函数所嵌套,所以func01()处于全局作用域
func01();

function func02(initial) {
  var counter = initial;
  function increment(val) {
    counter += val;
  }
  function get() {
    return counter;
  }
  return {
    increment,
    get,
  };
}
const counterFunc = func02(1);
counterFunc.get(); // 1
/*
 * 由于increment()被嵌套在func02()中,increment()持有func02()的作用域,这意味着
 * increment()可以使用func02()中定义的成员属性或成员方法。
 */
counterFunc.increment(2);
counterFunc.get(); // 3
```

#### 作用域链

**当访问一个变量时,JS 解释器会首先在当前作用域查找标示符,如果没有查找到,就会去上层作用域(父作用域)查找,直到找到该变量的标示符或者不在父作用域中(若查找到全局作用域还未查找到则说明变量未定义,抛出 ReferenceError 错误),这一系列向上查找作用域的过程被叫做作用域链**。作用域链与原型链的机制是类似的,都是向上层查找,但是在原型链情况下如果去查找一个普通对象的属性,在当前对象和其原型中都找不到时,则会返回 undefined;在作用域链的情况下查找的属性在作用域链中不存在的话就会抛出 ReferenceError。

### 函数的 this

**JavaScript 函数中的 this 不是取决于函数声明的环境,而是取决与于函数被调用的环境**。函数 this 的绑定遵循如下规则:

- 默认绑定。
- 隐式绑定。
- 显示绑定。
- new 绑定。
- 箭头函数绑定。

#### 默认绑定

this 默认绑定可以分为以下情况:

- 独立函数调用。可以把默认绑定看作是无法应用其他规则时的默认规则，this 指向全局对象。
- 严格模式下,不能将全局对象用于默认绑定,this 会绑定到 undefined。只有函数运行在非严格模式下,默认绑定才能绑定到全局对象。在严格模式下调用函数则不影响默认绑定。

```js
var x = 10;
function fn() {
  "use strict"; // 严格模式下 this指向undefined
  console.log(this.x);
}
fn(); // Uncaught TypeError: Cannot read properties of undefined (reading 'x')

function fn() {
  console.log(this.x);
}
var x = 10;
(function () {
  "use strict"; // 严格模式下调用函数不会影响默认绑定
  fn(); // 10
})();
```

#### 隐式绑定

当函数引用有上下文对象时,隐式绑定规则会把函数中的 this 绑定到这个上下文对象。对象属性引用链中只有上一层或者说最后一层在调用中起作用。

```js
function fn() {
  console.log(this.x);
}
const obj = {
  x: 10,
  fn: fn, // obj的fn属性引用了fn函数,fn函数中的this指向obj
};
obj.fn(); // 10
```

**隐式绑定丢失的两种情况**

- 情况 1:被隐式绑定的函数特定情况下会丢失绑定对,应用默认绑定,把 this 绑定到全局对象或者 undefined 上。
- 情况 2:参数传递就是一种隐式赋值,传入函数时也会被隐式赋值。回调函数丢失 this 绑定是非常常见的。

```js
// 情况1
function fn() {
  console.log(this.x);
}
const obj = {
  x: 10,
  fn: fn,
};
// 由于runFn不带任何修饰的函数调用,this绑定是应用默认绑定规则,this指向全局对象
var runFn = obj.fn; // 函数别名
var x = 20;
runFn(); // 20

// 情况2,setTimeout(fn,delay)也属于这种情况
function fn() {
  console.log(this.x);
}
// 函数的参数传递就相当于隐式赋值,此时callback的this会丢失,
function doFn(callback) {
  callback();
}
var obj = {
  x: 10,
  fn: fn,
};
var x = 20;
doFn(obj.fn); // 20
```

#### 显示绑定

函数 this 的显示绑定离不开 apply()、call()、bind()这三个函数,apply()、call()、bind()这三个函数是 Function.prototype 上的方法,且都可以改变函数 this 指向,三者区别如下:

- apply():第一个参数是一个绑定对象(函数的 this 就指向这个对象),第二个参数是一个数组用于传递给绑定函数的入参。
- call():第一个参数是一个绑定对象(函数的 this 就指向这个对象),第二个参数是一个可选参数用于传递给绑定函数的入参。
- bind():第一个函数是一个绑定对象(函数的 this 就指向这个对象),第二个参数既可以是一个数组有可以是可选参数用于传递给绑定函数的入参,bind()会返回一个新的函数,只有调用该函数才会改变函数 this 指向。

```js
// apply
function fn(age, city) {
  console.log(this.name, age, city);
}
var obj = {
  name: "z乘风",
};
// apply()强制改变函数this,fn函数中的this指向obj
fn.apply(obj, [18, "深圳"]); // "z乘风" 18 "深圳"

// call()强制改变函数this,fn函数中的this指向obj
fn.call(obj, 18, "广州"); // "z乘风" 18 "广州"

// bind()强制改变函数this并返回一个新的函数,fn函数中的this指向obj
var newFn = fn.bind(obj, 18, "香港");
newFn(); // "z乘风" 18 "香港"
```

#### new 绑定

在 JS 中 new 操作符用于实例化对象,new 操作符通过构造函数创建一个实例对象,所有函数都可以使用 new 操作符进行调用,使用 new 操作符调用的函数中的 this 将指向创建的实例对象。

```js
// 构造函数首字母大写
function Fn(x) {
  this.x = x;
}
// f和Fn()函数进行this绑定,即Fn()中的this指向f
var f = new Fn(10);
console.log(f.x); // 10
```

当使用 new 操作符会自动执行如下步骤:

- **创建一个新对象**。
- **链接原型。将函数的原型链接到新创建的对象的隐式原型上,即对象.`__proto__` === 函数.prototype**。
- **绑定 this。将调用函数的 this 指向新创建的对象**。
- **返回结果。如果调用函数没有返回其他对象,则会返回创建的新对象**。

```js
// 手写new操作符
function _new() {
  // 1.创建一个新的对象。Object.create(null)能创建一个不包含Object原型上的属性的纯净对象
  const obj = Object.create(null);

  // 获取调用函数,调用函数是第一个参数
  const Fn = [].shift().call(arguments);

  // 2.链接原型。将函数的原型链接到新创建的对象的隐式原型上
  obj.__proto__ = Fn.prototype;

  // 3.绑定 this。将调用函数的 this 指向新创建的对象。
  const result = Fn.apply(obj,arguments)

  // 4.返回结果。如果调用函数返回一个对象,则立即返回,否则返回创建的新对象。
  return result instanceof Object ? result : obj;
```

#### 箭头函数绑定

ES6 新增一种特殊函数类型:箭头函数,箭头函数无法使用上述四条规则,而是根据外层(函数或者全局)作用域(词法作用域)来决定 this。

```js
var fn = function () {
  return (x) => {
    console.log(x);
  };
};
```

#### 箭头函数与普通函数的区别

箭头是 ES6 版本提供的新特性,旨在于提供简洁的函数编写方式,与普通函数的区别如下:

- **写法不同,箭头函数是=>定义函数,而普通函数是使用 function 定义函数。**
- **箭头函数不能作为构造函数使用,所以箭头函数无法使用 new 关键字。**
- **箭头函数没有 arguments 形参列表,但 rest 参数(剩余参数)可以获取函数参数列表。**
- **箭头函数 this 的绑定取决于上层作用域。**
- **箭头函数无法通过 apply、call、bind 方法强制改变 this 指向。**
- **箭头函数没有原型属性。**
- **箭头函数不能当作 Generator 函数,不能使用 yield 关键字。**

### 立即执行函数

**立即执行函数是 Immediately Invoked Function Expression 的中文名称,简称 IIFE,又叫自执行函数,其目的是减少全局变量使用,因为立即执行函数会创建一个独立的作用域,外部作用域无法访问该作用域的变量,避免了变量污染。注意:立即执行函数的 this 总是指向全局对象(在浏览器非严格模式下是 Window)**。立即执行函数写法有非常多种,例如:

```js
// 写法1:推荐写法,最后的()部分用于传递参数
(function () {})();
// 写法2
(function () {})();

// 以下写法JS执行引擎都是允许的
!(function () {})();
+(function () {})();
-(function () {})();
~(function () {})();
new (function () {
  /* code */
})();
new (function () {
  /* code */
})();

// 立即执行函数的this总是指向全局对象
(function () {
  console.log(this); // Window{...}
})();
```

为了深入理解立即执行函数请看如下示例,for 循环会遍历三次执行 setTimeout()并打印 i 的值,由于 setTimeout()是一个异步函数,所以先会执行 for 循环中的打印 i 语句,此时你会很好奇为什么 setTimeout()中打印的 i 都为 3,这是因为 i 由 var 关键字声明,表示
i 是全局的,当循环遍历至最后一次时 i 为 2,i+1=3,所以执行 setTiemout()就会打印 3 次 3。如果想正常打印 0、1、2 可以使用 let 关键字声明 i,由于 let 具有块级作用域的特性,let i=0 在 for 循环这个块级作用域,而非在全局环境中,所以能正常输出,其实也可以通过立即执行函数为 i 创建独立的作用域正常输出。

```js
for (var i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log(i);
  }, 0);
  console.log("i:", i);
}
/*
 * 执行结果如下:
 * i:0
 * i:1
 * i:2
 * 3
 * 3
 * 3
 */

// 使用let关键字正常输出
for (let i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log(i);
  }, 0);
  console.log("i:", i);
}
/*
 * 执行结果如下:
 * i:0
 * i:1
 * i:2
 * 0
 * 1
 * 2
 */

// 使用立即执行函数创建独立作用域正常输出
for (var i = 0; i < 3; i++) {
  // 接收传入的i
  (function (i) {
    setTimeout(function () {
      console.log(i);
    }, 0);
  })(i); // 将i传入立即执行函数,立即执行函数会创建一个独立作用域,在立即执行函数中i并不是全局的
  console.log("i:", i);
}
/*
 * 执行结果如下:
 * i:0
 * i:1
 * i:2
 * 0
 * 1
 * 2
 */
```

### 闭包函数

闭包是函数式编程语言的特性,不同的书籍对闭包的定义也有所不同,红宝书对闭包的定义是:**闭包是指有权访问另外一个函数作用域中的变量的函数**,MDN 对闭包的定义为:**闭包是指那些能够访问自由变量的函数**。闭包的定义:

- 闭包是指有权访问其他函数的作用域的变量的函数。
- 闭包即函数嵌套函数。

**闭包的 3 个特征:**

- 1.闭包可以访问当前函数以外的变量。

```js
function print() {
  var name = "z乘风";
  // getInfo()使用了prinlt()中name变量,所以getInfo()是一个闭包函数
  function getInfo(str) {
    console.log(name + str);
  }
  return getInfo("很帅");
}
print(); // "z乘风很帅"
```

- 2.即使外部函数已经返回,闭包仍能访问外部函数定义的变量。这说明创建它的上下文即使已经销毁,但在该上下文下定义的闭包仍然存在。

```js
function print() {
  var name = "z乘风";
  function getInfo(str) {
    console.log(name + str);
  }
  return getInfo;
}
// 即使print()执行后上下文记忆销毁,但print()中的getInfo()闭包函数仍存在
var fn = print();
fn("真帅"); // "z乘风真帅"
fn("很拉"); // "z乘风很拉"
```

- 3.闭包可以更新外部变量的值。

```js
function print() {
  var count = 0;
  function setCount(newCount) {
    count = newCount;
    console.log(count);
  }
  return setCount;
}
var setCount = print();
setCount(1); // 1
setCount(2); // 2
```

#### 从作用域深入理解闭包

```js
var scope = "global scope";
function checkscope() {
  var scope = "local scope";
  function f() {
    return scope;
  }
  return f;
}
var foo = checkscope(); // foo指向函数f
foo(); // local scope
```

上面示例的执行步骤如下:

- 步骤 1:进入全局代码,创建全局执行上下文,全局执行上下文压入执行上下文栈。
- 步骤 2:全局执行上下文初始化。
- 步骤 3:执行 checkscope 函数,创建 checkscope 函数执行上下文,checkscope 执行上下文被压入执行上下文栈。
- 步骤 4:checkscope 执行上下文初始化,创建变量对象、作用域链、this 等。
- 步骤 5:checkscope 函数执行完毕,checkscope 执行上下文从执行上下文栈中弹出。
- 步骤 6:执行 f 函数,创建 f 函数执行上下文,f 执行上下文被压入执行上下文栈。
- 步骤 7:f 执行上下文初始化,创建变量对象、作用域链、this 等。
- 步骤 8:f 函数执行完毕,f 函数上下文从执行上下文栈中弹出。

  从上面执行步骤可以看出,函数 f 执行的时候,checkscope 函数上下文已经被销毁了,为什么 f 函数还能访问 checkscope 函数中的 scope 变量? 这是因为函数 f 执行上下文维护了一个作用域链,会指向指向 checkscope 作用域,作用域链是一个数组,结构如下:

  ```js
  fContext = {
    Scope: [AO, checkscopeContext.AO, globalContext.VO],
  };
  ```

  f 函数不仅保存了 f 函数上下文的 AO(活动对象),也保存了 checkscope 函数上下文和全局上下文的 AO,即使 checkscopeContext 被销毁了,但是 JavaScript 依然会让 checkscopeContext.AO(活动对象)活在内存中,f 函数依然可以通过 f 函数的作用域链找到它。**简单来说闭包函数保存了上层函数的执行上下文活动对象,即使上层函数执行后上下文被销毁,上层函数的活动对象仍存活在内存中,通过闭包函数的作用域链就可以访问上层函数的变量,而这就是闭包实现的关键**。

  **一般情况下,函数执行会形成一个新的私有作用域,一旦函数私有作用域的代码执行完毕后,当前作用域都会主动进行释放和销毁。但当遇到函数返回了一个引用数据类型的值,并且在函数的外面被其他变量接收,在这种情况下一般形成的私有作用域都不会被销毁。由于闭包函数持有上层函数作用域,上层函数虽然执行完毕但其作用域仍存在内存中,滥用闭包会导致内存泄露(内存泄漏英文简称 Memory Leak,是指程序中已动态分配的堆内存由于某种原因程序未释放或无法释放,造成系统内存的浪费,导致程序运行速度减慢甚至系统崩溃等严重后果),从而影响应用执行效率。通常闭包使用完毕后,需要立即释放资源,将引用变量执行 null 即可**。

#### 闭包的应用

- **模仿块级作用域**。在下面例子中,由于 i 通过 var 关键字声明,即使在 for 循环作用域外仍能访问到 i,如果有同名变量可能会导致变量污染,正常预期是 i 仅能 for 循环中使用,for 循环外层的作用域无法访问,通过闭包和立即执行的特性可以为变量创建一个独立作用域,避免变量污染。

```js
function fn() {
  for (var i = 0; i < 3; i++) {}
  console.log(i); // 3 即使在for作用域外层仍能访问i
}
fn();

// 利用立即执行函数模拟块级作用域
function fn() {
  (function () {
    for (var i = 0; i < 3; i++) {}
    // 通过闭包+立即执行函数创建一个独立作用域,i具有了块级作用域,仅作用于与for作用域内,外部无法访问
    console.log(i); // undefined
  })();
}
```

- **缓存函数(记忆函数)**。由于闭包函数持有上层函数的执行上下文活动对象,即使上层函数执行后上下文被销毁,闭包函数仍能访问上层函数的变量,通过这一特性可以实现缓存函数。

```js
const cache = (function () {
  // 创建缓存对象
  const obj = {};
  return function () {
    // 将函数参数列表转为数组,也可以通过Array.from(arguments)转为数组
    const arr = Array.prototype.slice.call(arguments, 0);
    // 使用参数元素以逗号为缓存key
    const key = arr.join(",");
    // 判断是否命中缓存,若命中缓存则直接从缓存中返回结果,否则对计算结果进行缓存
    if (obj[key]) {
      console.log("命中缓存");
      return obj[key];
    }
    const result = arr.reduce((cur, item) => cur + item);
    // 缓存计算结果
    obj[key] = result;
    return result;
  };
})();

cache(1, 2, 3); // 6
cache(1, 2, 3); // "命中缓存" 6
```

- **私有变量**。javascript 中没有私有成员的概念,我们可以把函数当做一个范围,函数内的变量就是私有变量,在外部无法引用。

```js
function Person() {
  // 闭包特性使name变成一个私有变量,外部函数无法访问
  var name = "default";
  this.getName = function () {
    return name;
  };
  this.setName = function (name) {
    this.name = name;
  };
}
const p = new Person();
console.log(p.getName()); // default
console.log(p.setName("z乘风"));
console.log(p.getName()); // z乘风
```

#### 闭包函数与立即执行函数的区别

- 立即执行函数和闭包都能减少全局变量的使用。
- 立即执行函数只是函数的一种调用方式,只是声明完之后立即执行,这类函数一般都只是调用一次,调用完之后会立即销毁,不会占用内存。
- 闭包则主要是让外部函数可以访问内部函数的作用域,虽然减少了全局变量的使用,也保证了内部变量的安全,但因被引用的内部变量不能被销毁,增大了内存消耗,使用不当易造成内存泄露。

### 内置函数

#### setTimeout

#### setInterval
