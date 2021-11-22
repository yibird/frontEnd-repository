# 基础类型

JavaScript 类型可分为基本类型和引用类型两种:

- 基本类型:String、Number、Boolean、Null、Undefined、Symbol(ES6 新增)、Bigint(ES10 新增)。
- 引用类型:Object。Object 类型包含 Object、Array、Date、Function、RegExp、Math 等子类型。

严谨来说截止目前为止,JavaScript 一共有 8 种数据类型,7 种基本类型,1 种引用类型。在 ES5 版本有 5 种基本类型,在 ES6 版本有 6 种基本类型,在 ES10 版本有 7 种基本类型,如果脱离 ES 版本谈基础类型的种类,这将是一个非常愚蠢的选择。

## 基本类型与引用类型的区别?

- **基本类型**:存储在内存区域的栈(stack)中,它由系统自动分配内存空间,并且由系统自动释放。当被引用或拷贝时,会创建一个完全相等的变量;基本类型的特点是占据空间小且大小固定,属于被频繁使用的数据,所以放入栈中存储。由于基本类型指向的是一块内存地址,所以引用变量与原始变量相互独立。
- **引用类型**:存储在内存区域的堆(heap)中,由系统动态的分配内存空间,不一定会被释放掉。引用类型的特点是占据空间大且大小不固定,系统为了引用类型的操作效率,会将引用类型的指针存储到栈中,该指针指向堆中该实体的起始地址,当解释器寻找引用值时,首先会检索其在栈中的地址,取得地址后从堆中获得实体。引用类型指向的是一块内存引用,当变量指向引用类型进行操作时,会影响原始引用变量。

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
```

## 类型判断

在 JavaScript 中 `typeof` 操作符和`instanceof`是判断对象类型最为常规的手段,但 typeof 和 instance 在特定场景下并不能准确判断类型,若要准确判断对象类型推荐使用`Object.prototype.toString()`这种方式。

### typeof

typeof 操作符用于检测变量的类型并返回变量的类型值。它有 2 种使用方式:`typeof(表达式)`和`typeof 变量名`,第一种是对表达式做运算,第二种是对变量做运算。typeof 操作符在判断 Null 和 Array 类型时都为 object,所以 typeof 常用于 Function 类型的判断。

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

不同的对象在底层都表示为二进制,在 JavaScript 中二进制前三位都为 0 的话会被判断为 object 类型,null 的二进制表示是全 0,自然前三位也是 0,所以执行 typeof 时会返回”object”。
其实这个是一个历史遗留的 bug，在 javascript 的最初版本中，使用的 32 位系统，为了性能考虑使用低位存储了变量的类型信息(undefined 与 null 较为特殊)：

- 000:对象。
- 1:整数。
- 010:浮点数。
- 100:字符串。
- 110:布尔。
- undefined:用 - （−2^30）表示。
- null:对应机器码的 NULL 指针,一般是全零,所以使用 typeof 判断 null 类型的结果是 object。

### instanceof

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

### 类型判断的几种方式

- 通过 Object.prototype.toString 获取类型(推荐)

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

### 总结

- typeof 操作符在判断 Null 和 Array 类型时为 object。
- instanceof 操作符在判断 Array 和 Function 类型时都为 true。
- constructor 方式在判断 null 或 undefined 将会报错,因为 null 和 undefined 是无效类型。
- 判断类型最佳方式是使用 Object.prototype.toString 方式。
- instanceof 操作符的原理是通过原型链机制不停向上匹配目标类型,如果对象的**proto**中途匹配上了目标类型的 prototype 则中断原型链查找(返回 true),否则一直向上查找,直到对象的**proto**为 null 时才终止查找(返回 false)。

## 类型转换

### 隐式转换类型

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

#### `==` 与 `===`的区别?

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
console.log(11 == "11"); // false
```

### 显示类型转换

##### 类型构造函数强转

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

##### string 转 number

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

### JavaScript 中浮点数精度问题

### Symbol 与 BigInt
