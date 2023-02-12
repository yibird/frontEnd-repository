JavaScript 类型可分为基本类型和引用类型两种:

- 基本类型:String、Number、Boolean、Null、Undefined、Symbol(ES6 新增)、Bigint(ES10 新增)。
- 引用类型:Object。Object 类型包含 Object、Array、Date、Function、RegExp、Math 等子类型。
  ::: tip
  严谨来说截止目前为止,JavaScript 一共有 8 种数据类型,7 种基本类型,1 种引用类型。在 ES5 版本有 5 种基本类型,在 ES6 版本有 6 种基本类型,在 ES10 版本有 7 种基本类型。
  :::

## 1.基本类型与引用类型的区别

- **内存存储区域不同**:在 JS 中内存分为栈内存和堆内存,其中基本数据类型存储在内存区域的栈(stack)内存中,它由系统自动分配内存空间,并且由系统自动释放。当被引用或拷贝时,会创建一个完全相等的变量;基本类型的特点是占据空间小且大小固定,属于被频繁使用的数据,所以放入栈中存储。由于基本类型指向的是一块内存地址,所以引用变量与原始变量相互独立。引用数据类型存储在内存区域的堆(heap)内存中,由系统动态的分配内存空间,不一定会被释放掉,通常会使用 GC(垃圾回收)机制自动回收未被使用的引用。引用类型的特点是占据空间大且大小不固定,系统为了引用类型的操作效率,会将引用类型的指针存储到栈中,该指针指向堆中该实体的起始地址,当解释器寻找引用值时,首先会检索其在栈中的地址,取得地址后从堆中获得实体。引用类型指向的是一块内存引用,当变量指向引用类型进行操作时,会影响原始引用变量。

- **基本类型是不可变数据,引用类型是可变数据**。数据的可变性是 FP(函数式编程)特征之一,不可变数据是指哪些被创建后就不能修改的数据,在 JS 中所有基本类型本质上是不可变的,对于引用类型来说都是可变的。

```js
// 基础类型指向的是一块内存地址,相互独立,赋值后的变量并不会影响源变量
var a = 1;
var b = a;
b = 2;
console.log(a, b); // 1 2

// 引用指向的是一块内存引用,赋值后的变量会影响源变量
var c = { name: "zchengfeng" };
var d = c;
d = { name: "dog" };
console.log(c, d); // {name:'zchengfeng'} {name: 'dog'}


// 改变基本类型,无效,且毫无意义,基本类型是不可变的
2 = 2.5;

// 改变引用类型,引用类型是可变的
const obj = {name:"xxx"}
obj.name="zchengfeng"
```

### 扩展:栈内存相较于堆内存的优点:

- 申请速度快:栈是程序运行前就已经分配好的空间,所以运行时分配内存空间几乎不需要时间。而堆是运行时动态申请的,相当于将分配内存的耗时由编译阶段转嫁到了机器运行阶段,将分配过程从编译器搬到了运行的代码中。于是动态分配的速度不仅与分配算法有关,还与机器运行速度有关。(栈是编译时分配空间,而堆是动态分配,即运行时分配空间,所以栈的申请速度快)。
- 存储寻址速度快:栈的物理地址空间是连续的,而堆未必,查找堆的链表也会耗费较多时间,所以存储寻址速度慢。
- CPU 硬件操作速度快:CPU 有专门的寄存器(esp、ebp)来操作栈,堆是使用间接寻址的,所以栈操作速度更快。

现代化的内存分配器通过类似 slab allocator 这样的设计已经尽可能令相关数据尽可能放在一起,从 CPU 数据缓存角度,绝大多数程序并不需要在栈上分配内存,且栈缓冲区溢出的后果比堆缓冲区溢出要严重许多(栈溢出是指当所需栈内存大小超过分配栈内存大小导致程序异常,内存溢出可分为栈溢出和堆溢出),而在堆上分配缓冲区则可以避免前者。

### 扩展:JS 栈溢出产生原因及解决方法

使用 JS 通过递归调用在 Chrome 浏览器环境下测试的栈空间为 1MB 左右(不同浏览器或版本执行结果有所差异)。

```js
function computeMaxCallStackSize() {
  try {
    return 1 + computeMaxCallStackSize();
  } catch (e) {
    // Call stack overflow
    return 1;
  }
}
console.log(computeMaxCallStackSize()); // 11390
```

<br/>
函数调用会在内存形成一个"调用记录",又称"调用帧"(call frame),保存调用位置和内部变量等信息。函数在内部调用该函数本身被称为递归,而递归是极为消耗内存的,因为需要同时保存成千上百个调用帧,很容易发生"栈溢出"错误(stack overflow)。对于递归调用可以通过 ES6 提供的尾递归来节省所耗用的栈空间。

- **尾调用优化**:尾调用即在函数内部最后一步操作调用函数(一般是 return 语句)。在各大编程语言中通过栈(stack)结构来维护将要执行的代码片段,执行代码被称为栈帧,每一次执行代码都会将该栈帧添加至执行栈中,这个过程被称为入栈,执行完毕后就会从执行栈中移除,这个过程被称为出栈,执行栈遵循先进后出原则。如果在函数 A 的内部调用函数 B,那么在 A 的调用帧上方,还会形成一个 B 的调用帧,等到 B 运行结束,将结果返回到 A,B 的调用帧才会消失,如果函数 B 内部还调用函数 C,那就还有一个 C 的调用帧,以此类推。所有的调用帧,就形成一个"调用栈"(call stack)。尾调用由于是函数的最后一步操作,所以无需保留外层函数的调用帧,因为调用位置、内部变量等信息都不会再用到了,只要直接用内层函数的调用帧,取代外层函数的调用帧就可以了。

```js
function f() {
  let m = 1;
  let n = 2;
  return g(m + n);
}
f();

// 等同于
function f() {
  return g(3);
}
f();

// 等同于
g(3);
```

尾调用优化是指当在外层函数尾部调用函数时,只保留内部函数的调用栈。如果所有函数都是尾调用,那么完全可以做到每次执行时,调用帧只有一项,这将大大节省内存。注意:**只有不再用到外层函数的内部变量,内层函数的调用帧才会取代外层函数的调用帧,否则就无法进行"尾调用优化"。目前只有 Safari 浏览器支持尾调用优化,Chrome 和 Firefox 都不支持**。

```js
function addOne(a) {
  var one = 1;
  function inner(b) {
    return b + one;
  }
  /**
   * 尾调用inner函数不会进行尾调用优化,因为内层函数inner内部
   * 使用了外层函数addOne的one变量
   */
  return inner(a);
}
```

- **尾递归**:**尾递归即函数尾调用自身,但对于尾递归来说,由于只存在一个调用帧,所以永远不会发生"栈溢出"错误**。在 ES6 明确规定,所有 ECMAScript 的实现,都必须部署"尾调用优化"。ES6 中只要使用尾递归,就不会发生栈溢出(或者层层递归造成的超时),相对节省内存。

```js
// 递归调用,计算n个乘阶,复杂度为O(n)
function factorial(n) {
  if (n === 1) return 1;
  return n * factorial(n - 1);
}
factorial(5); // 120

/**
 * 尾递归调用,由于只保留一个调用记录,复杂度为O(1)。尾递归的调用往往需要改写递归,
 * 尾递归就是把所有用到的内部变量改写成函数的参数,尾递归调用的factorial函数会将返回值作为
 * 该函数的入参,当满足终止递归条件时则返回该入参。
 */
function factorial(n, total) {
  if (n === 1) return total;
  return factorial(n - 1, n * total);
}
factorial(5, 1); // 120
```

## 2.类型判断

在 JavaScript 中 `typeof` 操作符和`instanceof`是判断对象类型最为常规的手段,但 typeof 和 instance 在特定场景下并不能准确判断类型,若要准确判断对象类型推荐使用`Object.prototype.toString()`。

### 2.1 typeof

`typeof` 操作符用于检测变量的类型并返回变量的类型值。它有 2 种使用方式:`typeof(表达式)`和`typeof 变量名`,第一种是对表达式做运算,第二种是对变量做运算。typeof 操作符在判断 Null 和 Array 类型时都为 object,所以 typeof 常用于 Function 类型的判断。

```js
console.log(typeof 123); //number
console.log(typeof 123); //number
console.log(typeof "zxp"); //string
console.log(typeof true); //boolean
console.log(typeof undefined); //undefined
console.log(typeof null); //object
console.log(typeof []); //object
console.log(typeof {}); //object
console.log(typeof function () {}); //function
console.log(typeof class Person {}); //function
```

**为什么 typeof 判断 null 类型是 object?**

不同的对象在底层都表示为二进制,在 JavaScript 中二进制前三位都为 0 的话会被判断为 object 类型,null 的二进制表示是全 0,自然前三位也是 0,所以使用 typeof 判断 null 会返回`"object"`。
其实这个是一个历史遗留的 bug,在 javascript 的最初版本中，使用的 32 位系统，为了性能考虑使用低位存储了变量的类型信息(undefined 与 null 较为特殊)：

- 000:对象。
- 1:整数。
- 010:浮点数。
- 100:字符串。
- 110:布尔。
- undefined:用 - （−2^30）表示。
- null:对应机器码的 NULL 指针,一般是全零,所以使用 typeof 判断 null 类型的结果是 object。

### 2.2 instanceof

instanceof 操作符用于判断变量是否属于某个对象的实例。注意:instanceof 操作符在判断 Array 和 Function 类型时都为 true。

```js
console.log([] instanceof Array); //true
console.log([] instanceof Object); //true
console.log({} instanceof Object); //true
console.log(function () {} instanceof Function); //true
console.log(function () {} instanceof Object); //true
```

**instanceof 原理剖析:**

在 javaScript 中每个对象都有一个**proto**属性,这是对象的隐式原型,它指向父对象的 prototype(原型,又称为显式原型)。使用 instanceof 判断变量是否属于某个对象的实例时,首先会判断变量的**proto**是否具有某个对象的实例,如果有则说明该变量是属于此对象的实例,那么会立马返回,如果没有则会通过父对象的**proto**则会一直向上查找,如果查找期间查找到了就说明该变量属于此对象的实例并返回,如果查找到最顶层的 Object(Object 的原型为 null)还未查找到,则说明该变量不属于此对象实例,这个过程产生的原型查找链就被成为原型链,而 instanceof 正是通过原型链查找的方式判断变量是否属于某个对象的实例。

```js
// 手写instanceof
function instanceof_of(L, R) {
  //拿到L的__proto__,它指向父对象实例的prototype
  L = L.__proto__;
  //不停向上查找原型
  while (true) {
    /**
     * 如果查找到了最顶层(查找到Object,Object的__proto__为null)还没有匹配到,
     * 就立马终止,说明L instanceof R 的结果为false
     */
    if (L === null) {
      return false;
    }
    //如果L.__proto__===R.prototype 则说明匹配到了,返回true
    if (L === R.prototype) {
      return true;
    }
    //没有匹配到就一直向上查找,直到匹配到为止
    L = L.__proto__;
  }
}
//使用instanceof_of方法
console.log(instanceof_of({}, Object)); // true
console.log(instanceof_of([], Object)); // true
console.log(instanceof_of([], Array)); // true
```

### 2.4 类型判断的几种方式

- 通过 Object.prototype.toString 获取类型(推荐)
  Object.prototype.toString()可以返回一个对象的字符串,通过此方式能够精确判断对象类型。

```js
//从下面可以看出返回[object xxx]中的xxx就是变量的类型
console.log(Object.prototype.toString.call("")); // [object String]
console.log(Object.prototype.toString.call(null)); // [object Null]
console.log(Object.prototype.toString.call([])); // [object Array]
console.log(Object.prototype.toString.call({})); // [object Object]

/*封装成函数:判断obj是否是type类型*/
function isType(obj, type) {
  const typeinof = Object.prototype.toString.call(obj);
  return typeinof.substring(8, typeinof.length - 1) === type;
}

//测试
console.log(isType({}, "Object")); // true
console.log(isType([], "Object")); // false
console.log(isType(null, "Object")); // false

/*封装成一个函数(使用高阶函数特性):判断obj是否是type类型*/
const isType = (obj) => (type) =>
  Object.prototype.toString.call(obj) === `[object ${type}]`;

//测试
console.log(isType("123")("String")); // true
console.log(isType("123")("Number")); // false
console.log(isType({})("Object")); // true
console.log(isType({})("Object"));
```

- 通过构造器判断类型:

```js
var a = 123;
console.log(a.constructor === Number); // true
var s = "zxp";
console.log(s.constructor === String); // true
var b = false;
console.log(b.constructor === Boolean); // true
var obj = {};
console.log(obj.constructor === Object); // true
var arr = [];
console.log(arr.constructor === Array); // true
var fn = function () {};
console.log(fn.constructor === Function); // true

var nul = null;
console.log(fn.constructor === Function); // TypeError: Cannot read properties of null (reading 'constructor')

var udef = undefined;
console.log(udef.constructor === Object); // TypeError: Cannot read properties of null (reading 'constructor')
```

- 通过 typeof 获取表达式类型:

```js
console.log(typeof 123); //number
console.log(typeof 123); //number
console.log(typeof "zxp"); //string
console.log(typeof true); //boolean
console.log(typeof undefined); //undefined
console.log(typeof null); //object
console.log(typeof []); //object
console.log(typeof {}); //object
console.log(typeof function () {}); //function
console.log(typeof class Person {}); //function
```

- 通过 instanceof 判断表达式是否属于某个类型的实例:

```js
console.log([] instanceof Array); //true
console.log([] instanceof Object); //true
console.log({} instanceof Object); //true
console.log(function () {} instanceof Function); //true
console.log(function () {} instanceof Object); //true
```

### 2.4 总结

- typeof 操作符在判断 Null 和 Array 类型时为 object。
- instanceof 操作符在判断 Array 和 Function 类型时都为 true。
- constructor 方式在判断 null 或 undefined 将会报错,因为 null 和 undefined 是无效类型。
- 判断类型最佳方式是使用 Object.prototype.toString 方式。
- instanceof 操作符的原理是通过原型链机制不停向上匹配目标类型,如果对象的**proto**中途匹配上了目标类型的 prototype 则中断原型链查找(返回 true),否则一直向上查找,直到对象的**proto**为 null 时才终止查找(返回 false)。

## 3.类型转换

### 3.1 隐式转换类型

在 JavaScript 中,当变量在运算时,如果两边数据类型不统一,CPU 就无法进行计算,此时编译器会自动将运算符两边数据的类型进行转换,转成一样相同数据类型再进行计算。隐式类型转换遵循如下规则:

- 使用字符串连接符(+:只要+号两侧任意一侧为 string 类型)连接数据时,会把其他数据类型调用 String()转成字符串再进行拼接。使用算术运算符时,会把其他数据类型调用 Number()转为数字再进行加法运算。

```js
// 由于使用字符串连接符(+),会把1调用String()转为字符串。下面代码等同:String(1) + "true"
console.log(1 + "true"); // 1true

// 等同于:1 + Number(true) = 1+1=2
console.log(1 + true); // 2

// 等同于:1+Number(undefined)=1+NaN=NaN
console.log(1 + undefined); // NaN

// 等同于:1+Number(null)= 1 + 0 = 1
console.log(1 + null); // 1
```

- 使用关系运算符时(例如:+、-、\*、/、%、++、--、<、>、==、<=、>=、===、!=、!==),会把其他数据类型通过 Number()转换为 number 类型在进行比较。如果关系运算符两侧均为 string 类型时并不是按照 Number()转为数字,而是根据字符串对应的 unicode 编码来转成数字后进行比较。

```js
// 等同于:Number("2") > 10
console.log("2" > 10); // false

/*
 * 由于关系运算符两侧都是string类型,则会根据字符串对应的unicode编码转为数字后进行比较,
 * "2".charCodeAt()的值为50,"10".charCodeAt()的值为49。
 */
console.log("2" > "10"); // true

// 当有多个字符串将从左到右依次比较。
// 先比较"a"和“b”,a.charCodeAt()为97,"b".charCodeAt()的值为98,"b" > "a" 可直接得出结果
console.log("abc" > "b"); // false
console.log("abc" > "aad"); // true

// 特殊情况1(无视规则):如果数据类型是undefind或null,可直接得出固定结果
console.log(undefined == undefined); // true
console.log(undefined == null); // true
console.log(null == null);
// 特殊情况2(无视规则):NaN与任何类型比较都是NaN
console.log(NaN == NaN); // false
```

- 复杂数据类型进行隐式转换时会先转为 String,然后再转成 Number 进行运算。对于数组或对象首先会调用 valueOf()获取其原始值,然后调用 toString()转为字符串,最后通过 Number()强转为数字进行运算;对于布尔会调用 Number()将布尔类型强转为数字类型进行运算。

```js
/*
 * 由于[1,2]是一个数组,对于复杂类型会通过valueOf()先获得原始值,再通过toString()将其原始值
 * 转为字符串 [1,2].valueOf().toString()的结果为"1,2","1,2" == '1,2'结果返回为ture
 */
console.log([1, 2] == "1,2"); // true

// {}.valueOf().toString的结果为"[object Object]","[object Object]" == "[object Object]"返回true
console.log({} == "[object Object]"); // true

/*
 * 如下例子当a是什么时满足 a == 1 && a == 2 && a == 3?
 */
var a = ???;
if(a == 1 && a == 2 && a == 3){
  console.log(1);
}
/*
 * 解析:由于复杂类型进行运算时会先调用valueOf()获取原始值,再通过toString()转为字符串,最后通过Number()将字符串
 * 强转为数字进行运算。所以当a是对象时,可以重写valueOf(),由于每次触发复杂类型隐式转换规则都会调用一次
 * valueOf(),所以在a对象声明一个计数器,每调用valueOf()其都自增1。
 */
var a = {
  // 计数器
  i:0,
  // 重写valueOf
  valueOf(){
    // 每调用一次valueOf计数器都会自增1并返回结果值
    return ++a.i;
  }
}
// 每次运算都会调用a的valueOf()
if(a == 1 && a == 2 && a == 3){
  console.log(1); // 1
}
```

- 关系运算符隐式转换之逻辑非运算符隐式转换特殊情况。关系运算符会将其他类型转为数字类型然后在进行运算,但逻辑非运算
  符会将其他类型通过 Boolean()强转为布尔类型,0、-0、NaN、undefined、null、''(空字符串)、false、document.all()
  这八种情况转换为布尔值都会得到 false,除此八种情况外所有数据转换为布尔值都会得到 true。

```js
// [].valueOf().toString()得到空字符串,Number('') == 0 成立
console.log([] == 0); // true

/*
 * 由于JS中逻辑运算符的优先级高于关系运算符,所以![]的结果为true(空数组强转为布尔类型为true,空数组取反结果为false),0会被强转为布尔值,结果为false, 所以 false == false成立
 */
console.log(![] == 0); // false

/*
 * 复制类型比较会通过valueOf()获取原始值,再通过toString()转为字符串,最后通过Number()强转为数字进行比较,
 * !{}的结果是false,由于false不是复制类型,可直接得到Number(false)
 * {}根据规则得到Number({}.valueOf().toString()) => Number('[object Object]')
 * Number(false) == Number('[object Object]') 不成立故返回false
 */
console.log({} == !{});
// 由于对象是引用类型,引用类型存储在堆中,栈中存储着指向堆对应数据的地址,它们的地址不一样,故为false
console.log({} == {}); // false

/*
 * []根据规则得到Number([].valueOf().toString()) => Number(''),![]根据规则得到Number(false)。
 * Number('')和Number(false)强转为数字的结果都为0,故 Number('') == Number(false) 成立
 */
console.log([] == ![]); // true
// 由于数组是引用类型,引用类型存储在堆中,栈中存储着指向堆对应数据的地址,它们的地址不一样,故为false
console.log([] == []); // false

console.log({}.valueOf().toString()); // '[object Object]'
console.log([].valueOf().toString()); // ''
```

### 3.2 `==` 与 `===`的区别?

`==`表示弱等于,在比较值时会进行隐式转换,`===`表示强等于,在比较值时不会进行隐式转换。
弱等于比较规则:

- 如果两个比较值的类型相同,那么会使用 `===` 进行比较。
- 如果两个比较值的类型不同,则根据以下情况进行类型转换后再比较:
  - 如果一个比较值为 null,另一个比较值为 undefined,那么则相等。
  - 如果一个比较值类型是字符串,另一个比较值类型是数字,那么会将字符串转为数字后再进行比较。
  - 如果一个比较值类型是数字,另一个比较值类型是布尔值,那么会将布尔值转为数字后再进行比较。

强等于比较规则:

- 如果类型不同,那么一定不相等。
- 如果比较值都是数字类型,并且是同一个值,那么相等;如果比较值为 NaN,那么不相等(NaN 比较任何值都不相等)。
- 如果两个都是字符串,每个位置的字符都一样,那么相等,否则不相等。
- 如果两个值都是 true,或是 false,那么相等。
- 如果两个值都引用同一个对象或是函数,那么相等,否则不相等。
- 如果两个值都是 null,或是 undefined,那么相等。

```js
console.log(11 == "11"); // true
// === 不会进行隐式转换
console.log(11 === "11"); // false
```

### 3.3 显示类型转换

#### 3.3.1 类型构造函数强转

```js
// String()默认值
console.log(String()); // ''
// Number强转String
console.log(String(1)); // '1'
// Boolean强转String
console.log(String(true)); // 'true'
// Null强转String
console.log(String(null)); // 'null'
// Undefined强转String
console.log(String(undefined)); // 'undefined'
// Symbol强转String
console.log(String(Symbol(1))); // 'Symbol(1)'
// Bitint强转String
console.log(String(Bigint(1))); // '1'
// Object强转String
console.log(String({ name: "z乘风" })); // '[object Object]'
// Array强转String
console.log(String([1, 2, 3])); // '1,2,3'

// Number()默认值
console.log(Number()); // 0
// String强转Number
console.log(Number("1")); // 1
console.log(Number("a")); // NaN   强转失败显示NaN
// Boolean强转Number
console.log(Number(true)); // 1
console.log(Number(false)); // 0
// Object强转Number
console.log(Number({ name: "111" })); // NaN

// Boolean()默认值
console.log(Boolean()); // false
// String强转Boolean
console.log(Boolean("")); // false
console.log(Boolean("z")); // true
// Number强转Boolean
console.log(Boolean(0)); // false
console.log(Boolean(1)); // true
// Null强转Boolean
console.log(Boolean(null)); // false
// Undefined强转Boolean
console.log(Boolean(undefined)); // false
```

#### 3.3.2 string 转 number

- 字符串转整数:parseInt(string,radix)解析一个字符串并返回指定基数的十进制整数,radix 是 2-36 之间的整数,表示被解析字符串的基数,转换失败返回 NaN。警告:parseInt 将 BigInt 转换为 Number,并在这个过程中失去了精度。这是因为拖尾的非数字值,包括 "n",会被丢弃。
- 字符串转浮点数:parseFloat()函数解析一个参数(必要时先转换为字符串)并返回一个浮点数,转换失败返回 NaN。

```js
// 把'2'看做十进制数(默认),然后返回该值转换为十进制数的结果
console.log(parseInt("2")); // 2

// 把'2'看做2进制,'2'的二进制转十进制失败,所以结果为NaN
console.log(parseInt("2", 2)); // NaN
// 把'123'看做5进制,'123'五进制转换十进制的值为38,即1*5^2 + 2*5^1 + 3*5^0 = 38
console.log(parseInt("123", 5)); // 38

// 把'FXX123'看做16进制,'FXX123'16进制转换10进制的为15
console.log(parseInt("FXX123", 16)); // 15

// 不是数值转换失败
console.log(parseInt("Hello", 8)); // NaN

/*
 * 面试题:请问下面示例中输出什么结果?
 * 结果:[1,NaN,NaN]
 * 解析:map接收一个函数做为参数,该函数可接收item(当前遍历元素)、index(当前遍历元素下标)、Array(原数组)三个参数,
 * 由于parseInt()只有两个参数,所以item和index会被做为parseInt()的入参,即:parseInt(1,0)、parseInt(2,1)、
 * parseInt(3,2)。
 * parseInt(1,0)表示1会被看做0进制转换为十进制,由于0进制无意义所以直接转为十进制。
 * parseInt(2,1)表示2会被看做一进制转换为十进制,一进制只能用0来表示,无法表示2,所以转换失败返回NaN。
 * parseInt(3,2)表示3会被看做二进制转换为十进制,二进制只能用0和1来表示,无法表示3,所以转换失败返回NaN。
 */
console.log([1, 2, 3].map(parseInt)); // [1,NaN,NaN]

console.log(parseFloat("123.11")); // 123.11
console.log(parseFloat("")); // NaN
```

## 4.JavaScript 中浮点数精度问题

```ts
// 预期结果是0.4
console.log(0.1 + 0.3); // 0.30000000000000004
// 预期结果是0.8
console.log(0.1 + 0.7); // 0.7999999999999999
// 预期结果是0.9
console.log(0.3 + 0.6); // 0.8999999999999999
// 预期结果是1.3
console.log(0.6 + 0.7); // 1.2999999999999998
// 预期结果是2.6
console.log(1.2 + 1.4); // 2.5999999999999996
// ...
```

从上述例子可以看出 JS 中浮点数的运算会丢失精度,这是因为 ECMAScript 中的 Number 类型使用 IEEE754 标准来表示整数和浮点数值,IEEE 即二进制浮点数算术标准(IEEE 754)是 20 世纪 80 年代以来最广泛使用的浮点数运算标准,被很多 CPU 与浮点运算器所采用。这个标准定义了表示浮点数的格式(包括负零-0)与反常值(denormal number)),一些特殊数值(无穷(Inf)与非数值(NaN)),以及这些数值的“浮点数运算符”;它也指明了四种数值舍入规则和五种例外状况(包括例外发生的时机与处理方式)。

IEEE 754 规定了四种表示浮点数值的方式:单精确度(32 位)、双精确度(64 位)、延伸单精确度(43 比特以上,很少使用)与延伸双精确度(79 比特以上,通常以 80 位实现)。只有 32 位模式有强制要求,其他都是选择性的。像 ECMAScript 采用的就是双精确度,也就是说,会用 64 位(比特)来储存一个浮点数,其中数字或小数(Mantissa)存储在 0 到 51 位,占 52 比特;指数(Exponent)存储在 52 到 62 位,占 11 比特,符号(Sign)存储在 63 位,占 1 比特,为 0 表示正数,1 表示负数。

```js
// 实际上0.1转为二进制是一个无限循环的数,获取0.1 转为二进制的尾数(仅截取前64位),
0.00011001100110011001100110011001100110011001100110011001100110... * 2的0次方
// 以科学计数法四舍五入表示0.1前52位
1.10011001100110011001100110011001100110011001100110... * 2的4次方
// 已知尾数部分,根据尾数计算指数
2的11-1次方=1024
1023 + (-4)=1019
1019转为二进制的结果为:1111111011
// 0.1最终表示如下,由于1111111011不满11位,所以会补0
0 1.10011001100110011001100110011001100110011001100110 01111111011

// 0.2最终表示如下
0 1.10011001100110011001100110011001100110011001100110

// 0.1 + 0.2结果如下
0 1.0011001100110011001100110011001100110011001100110100 01111111101

// 0.1 + 0.2结果用浮点数表示如下
0 01111111101 0011001100110011001100110011001100110011001100110100
```

### 4.1 JS 浮点数精度产生原因

- **进制转换存储导致精度丢失**。JS 在计算数字运算时,先会转为二进制然后再计算,0.1 和 0.2 转为二进制是一个无限循环的数字,但是 JS 采用 IEEE 745 双精度来表示整数和浮点数值,双精度使用 64 位来储存一个浮点数,其中数字或小数(Mantissa)存储在 0 到 51 位,占 52 位,指数(Exponent)存储在 52 到 62 位,占 11 比特,符号(Sign)存储在 63 位,占 1 比特,为 0 表示正数,1 表示负数,所以 JS 最大可以存储 53 位的有效数字,长度大于 53 位的内容会被全部截取掉,从而导致精度丢失。
- **对阶运算导致精度丢失**。由于指数位数不同,运算是需要对阶运算,阶小的尾数要根据阶来右移(0 舍入 1),尾数位移时可能会发生数据丢失的情况,从而影响精度。

### 4.2 JS 浮点数精度问题解决方法

可以借助 big.js、decimal.js、bignumber.js 等工具库解决浮点数精度问题。

- **将计算的数据转为整数(大数)计算。**

```js
function add(a, b) {
  const maxLen = Math.max(
    a.toString().split(".")[1].length,
    b.toString().split(".")[1].length
  );
  const base = 10 * maxLen;
  const bigA = BigInt(base * a);
  const bigB = BigInt(base * b);
  /*
   * 有问题,BigInt相除结果如果包含小数则会被截断取整,
   * 例如 3n / 10n的结果为0n
   */
  const bigRes = (bigA + bigB) / BigInt(base);
  return Number(bigRes);
}
```

- **使用`Number.EPSILON`减少误差范围**。 ES6 在 Number 对象上面,新增一个极小的常量 Number.EPSILON。根据规格,它表示 1 与大于 1 的最小浮点数之间的差。对于 64 位浮点数来说,大于 1 的最小浮点数相当于二进制的 1.00..001,小数点后面有连续 51 个零。这个值减去 1 之后,就等于 2 的-52 次方。Number.EPSILON 实际上是 JavaScript 能够表示的最小精度。误差如果小于这个值,就可以认为已经没有意义了,即不存在误差了。

```js
function isEqual(a, b) {
  return Math.abs(a - b) < Number.EPSILON;
}
isEqual(0.1 + 0.2, 0.3); // true
```

- **转为字符串计算**。

```js
const addStrings = function (num1, num2) {
  let i = num1.length - 1,
    j = num2.length - 1;
  const res = [];
  let carry = 0;
  while (i >= 0 || j >= 0) {
    const n1 = i >= 0 ? Number(num1[i]) : 0;
    const n2 = j >= 0 ? Number(num2[j]) : 0;
    const sum = n1 + n2 + carry;
    res.unshift(sum % 10);
    carry = Math.floor(sum / 10);
    i--;
    j--;
  }
  if (carry) {
    res.unshift(carry);
  }
  return res.join("");
};
function isEqual(a, b, sum) {
  const [insStr1, deciStr1] = a.toString().split(".");
  const [insStr2, deciStr2] = b.toString().split(".");
  const inteSum = addStrings(insStr1, insStr2);
  const deciSum = addStrings(deciStr1, deciStr2);
  return inteSum + "." + deciSum === String(sum);
}
console.log(isEqual(0.1, 0.2, 0.3)); // true
```

## 5.Symbol 与 BigInt

### 5.1 Symbol

Symbol 是 ES6 引入了一种新的原始数据类型,表示独一无二的值。Symbol 具有如下特点:

- Symbol 存储的值是唯一的。即 Symbol('a')和 Symbol('a')是不相等的。
- 无法使用 new 操作符实例化 Symbol,new Symbol()是不合法的。
- Symbol 值无法参与运算,无法隐士转成字符串,会报 TypeError。
- 作为对象属性无法用.运算符,但是可以使用方括号[]。
- 作为对象属性,无法被循环遍历，如 for...in、for...of,也不会被 Object.keys()、Object.getOwnPropertyNames()、JSON.stringify()返回。
- Object.getOwnPropertySymbols()方法,可以获取对象的所有 Symbol 属性名。
- Reflect.ownKeys()可以返回所有类型的键名,包括常规键名和 Symbol 键名。

Symbol 的应用场景:

- **模拟私有属性**。由于 Symbol 作为对象属性时不参与遍历,就像对象不存在这个属性一样,同时又可以使用 Object.getOwnPropertySymbols()返回,就像私有属性一样。
- **消除魔法字符串**。魔术字符串是指在代码中多次出现,与代码形成强耦合的某一字符串或数值,不利于将来的修改和维护。

```jsx
// 假设需要做一个tab切换,"basic"和"super"都是与业务代码无关的魔法字符,可以使用Symbol代替
if (type === "basic") {
  return <Basic />;
}
if (type === "super") {
  return <Super />;
}

// 使用Symbol消除魔法字符串
const types = {
  basic: Symbol(),
  super: Symbol(),
};
if(type === types.basic){
  return return <Basic />;
}
if (type === types.super) {
  return <Super />;
}
```

- **防止属性名称冲突**。当向一个全局对象中添加属性时,不明确对象是否包含该属性,很容易发生属性覆盖。而使用 Symbol 作为对象属性可以避免这个问题,整因为它的独一无二的特性。

```js
var globalObj = { name: "haha" };
globalObj["name"] = "hehe"; // 覆盖name属性值

var symbolName = Symbol("name");
globalObj[symbolName] = "xixi"; // {name:'hehe',Symbol(name):'xixi'} 不会覆盖,Symbol是唯一的
```

### 5.2 BigInt

BigInt 是 ES10 提供的新类型,用于表示大于 Number.MAX_SAFE_INTEGER(JS 中 Number 类型最大安全整数,2^53 - 1)的整数。由于 Number 值和 BigInt 值之间的强制转换会导致精度损失,所以推荐在大于 2^53 的值时才使用 BigInt 值,并且禁止在 BigInt 值和 Number 值之间进行强制转换。

- BigInt 只能通过 BigInt()构造函数和整数后缀带 n 的方式创建。

```js
console.log(9007199254740991n); // 9007199254740991n
console.log(typeof 9007199254740991n) // bigint
console.log(BigInt("9007199254740991")); // 9007199254740991n
console.log(BigInt(0x1fffffffffffff)); // 9007199254740991n
console.log(0.5n); // SyntaxError: Invalid or unexpected token,Bigint只能是一个正负整数
```

- 两个 BigInt 进行相除时,对于具有小数的结果会被截断取整。

```js
cosole.log(4n / 2n); // 2n
console.log(5n / 2n); // 2n
console.log(7n / 2n); // 3n
console.log(21n / 4n); // 5n
console.log(23n / 4n); // 5n
```

- 任何 BigInt 值与`JSON.stringify()`一起使用都会引发`TypeError`异常,因为默认情况下 BigInt 值不会在 JSON 中序列化,但可以将 BigInt 值转为字符串再进行序列化。

```js
function replacer(key, value) {
  return key === "big" ? value.toString() : value;
}
const data = {
  number: 1,
  big: BigInt("18014398509481982"),
};
const str = JSON.stringify(data, replacer);
console.log(str); // '{"number":1,"big":"18014398509481982"}'
```
