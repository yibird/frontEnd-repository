### 手写 instanceof

作用:instanceof 用于判断变量是否属于某个对象的实例。

解析:JavaScript 是一门基于原型的编程语言,在 JavaScript 中每一个对象都有一个原型对象(**`__proto__`**),即隐式原型,对象以其原型为模板,从原型继承方法和属性,这些属性和方法定义在对象的构造器函数的 prototype 属性上,而非对象实例本身。简单来说 js 中每个对象都拥有原型对象 **`_proto_`**, **`_proto_`** 指向当前对象的原型对象(父对象)。由于对象的隐式原型指向父对象的原型对象,并从中继承方法和属性,所以当访问一个对象上的属性或函数时,优先会从该对象查找,如果存在则立即返回,如果不存在就会向对象的父原型对象进行查找,如果存在就返回,不存在则一直向上查找,直到查找到 Object 的原型(Object 的父原型为 null)还没查找到就直接返回 undefined 并终止查找,而这一系列的向上查找父原型的过程就被称为原型链。instanceof 的原理正是基于原型链机制实现的。

```js
// 手写instanceof。L是判断的变量,R是对比的对象实例
function instanceof_of(L, R) {
  // 获取原型,它指向父对象实例的prototype
  L = L.__proto__;
  // 使用循环不停向上查找
  while (true) {
    /*
     * 如果L === null 说明查找最顶层,即查找到Object的__proto__,
     * 此时说明L不是R的实例,终止查找
     */
    if (L === null) {
      return false;
    }
    /*
     * 如果L === R.prototype,对象的原型指向父对象的显示原型,
     * 说明L属于R的实例,则终止查找
     */
    if (L === R.prototype) {
      return true;
    }
    // 没有匹配到就一直向上查找,直到匹配到为止
    L = L.__proto__;
  }
}
// 测试
console.log(instanceof_of({}, Object)); // true
console.log(instanceof_of([], Object)); // true
console.log(instanceof_of([], Array)); // true
console.log(instanceof_of(1, String)); // false
```

### 手写 isType()

在 JavaScript 常用`typeof`、`instanceof`、`构造器`等方式判断表达式的类型。但这三种方法具有如下缺点,这三种方式在一些特定场景下无法准确的判断表达式的类型,若要准确的判断表达式的类型推荐使用`Object.prototype.toString.call()`,`Object.prototype.toString`可以准确的获取任意对象的类型,`call()`是 Function 上的一个函数,用于强制改变函数中的 this 指向,使用`call()`可以强制改变调用函数 this 指向为`call()`的第一个参数。

- typeof 操作符在判断 Null、Array、Object 类型时都为 object。
- instanceof 操作符在判断 Array 和 Function 类型时都为 true。
- constructor 方式在判断 null 或 undefined 将会报错,因为 null 和 undefined 是无效类型。

```js
// typeof 例子
console.log(typeof 123); // number
console.log(typeof 123); // number
console.log(typeof "zxp"); // string
console.log(typeof true); // boolean
console.log(typeof undefined); // undefined
console.log(typeof function () {}); // function
console.log(typeof class Person {}); // function
// typeof 判断Null、Array、Object类型时都为object
console.log(typeof null); // object
console.log(typeof []); // object
console.log(typeof {}); // object

// instanceof 例子
console.log([] instanceof Array); // true
console.log([] instanceof Object); // true
console.log({} instanceof Object); // true
// instanceof 判断Array和Function类型时都为true
console.log(function () {} instanceof Function); // true
console.log(function () {} instanceof Object); // true

// constructor 例子
var a = 123,
  s = "zxp",
  b = false,
  obj = {},
  arr = [],
  fn = function () {},
  nul = null,
  udef = undefined;
console.log(a.constructor === Number); // true
console.log(s.constructor === String); // true
console.log(b.constructor === Boolean); // true
console.log(obj.constructor === Object); // true
console.log(arr.constructor === Array); // true
console.log(fn.constructor === Function); // true
console.log(nul.constructor === Object); // TypeError: Cannot read properties of null (reading 'constructor')
console.log(udef.constructor === Object); // TypeError: Cannot read properties of null (reading 'constructor')

// Object.prototype.toString.call() 例子
console.log(Object.prototype.toString.call("")); //[object String]
console.log(Object.prototype.toString.call(null)); //[object Null]
console.log(Object.prototype.toString.call([])); //[object Array]
console.log(Object.prototype.toString.call({})); //[object Object]
```

```js
// 封装成一个普通函数:判断obj是否是type类型
function isType(obj, type) {
  const typeinof = Object.prototype.toString.call(obj);
  return typeinof.substring(8, typeinof.length - 1) === type;
}
// 测试
console.log(isType({}, "Object")); //true
console.log(isType([], "Object")); //false
console.log(isType(null, "Object")); //false

// 封装成高阶函数:判断obj是否是type类型
const isType = (obj) => (type) =>
  Object.prototype.toString.call(obj) === `[object ${type}]`;
// 测试
console.log(isType("123")("String")); //true
console.log(isType("123")("Number")); //false
console.log(isType({})("Object")); // true
```

### 手写 call()、apply()、bind()

call()、apply()、bind()三个函数皆为 Function 原型上的函数,都可以强制改变函数的 this 指向,即使用它们会强制改变调用函数的 this 指向为它们的第一个入参,注意:在非严格模式下指定 null 或 undefined 为 call()、apply()、bind()的第一个参数时会自动替换的函数 this 指向全局对象(浏览器环境下是 window,NodeJS 环境下是 global)。call()、apply()、bind()三者区别如下:

- call ()第二个参数为一个可选参数。
- apply ()第二个参数为一个数组。
- bind ()第二个参数即可以是可选参数又可以是数组,且返回一个新的函数。

#### call()实现

```js
// call实现
Function.prototype.myCall = function (context) {
  // (1).初始化context。如果context不为空时就指向自己本身,否则指向全局对象
  context = context || window;

  /*
   * (2).挂载函数。将this挂载到context的func上,this表示调用myCall的函数,
   * 即将调用函数挂载到context.func上,在调用context.func()时由于遵循隐式this绑定原则,
   * 此时调用函数的this指向context
   */
  context.func = this;

  // (3).获取调用函数参数剩余参数。获取除context以外的其他参数,myCall第二个参数是一个可变参数
  const args = Array.from(arguments).slice(1);

  // (4).获取函数执行结果
  const result = args.length ? context.func(...args) : context.func();

  // (5).删除属性,避免造成全局污染
  delete context.func;

  //(6).返回函数结果
  return result;
};

// 测试
const obj = {
  name: "大黄",
  age: 4,
  func: function (hobby) {
    console.log(`${this.name}今年${this.age}岁,它喜欢${hobby}`);
  },
};
// this隐式绑定,func()的this指向obj
obj.func("睡觉"); // 大黄今年4岁,它喜欢睡觉

const newObj = {
  name: "小白",
  age: 3,
  hobby: "吃饭",
};
// 使用myCall()将obj.func()中的this强制指向newObj
obj.func.myCall(newObj, newObj.hobby); // 小白今年3岁,它喜欢吃饭
```

### apply()实现

```js
// apply实现
Function.prototype.myApply = function (context, args) {
  // (1).初始化context。如果context不为空时就指向自己本身,否则指向全局对象
  context = context || window;

  /*
   * (2).挂载函数。将this挂载到context的func上,this表示调用myCall的函数,
   * 即将调用函数挂载到context.func上,在调用context.func()时由于遵循隐式this绑定原则,
   * 此时调用函数的this指向context
   */
  context.func = this;

  // (3).获取函数执行结果
  const result = args.length ? context.func(...args) : context.func();

  // (4).删除属性,避免造成全局污染
  delete context.func;

  // (5).返回函数结果
  return result;
};

// 测试
const obj = {
  name: "大黄",
  age: 4,
  func: function (hobby) {
    console.log(`${this.name}今年${this.age}岁,它喜欢${hobby}`);
  },
};
// this隐式绑定,func()的this指向obj
obj.func("睡觉"); // 大黄今年4岁,它喜欢睡觉

const newObj = {
  name: "小白",
  age: 3,
  hobby: "吃饭",
};
// 使用myApply()将obj.func()中的this强制指向newObj
obj.func.myApply(newObj, [newObj.hobby]); // 小白今年3岁,它喜欢吃饭
```

#### bind()实现

```js
// bind实现
Function.prototype.myBind = function (context) {
  // (1).初始化context。对context进行深拷贝,防止bind执行后返回函数未执行期间,context被修改
  context = JSON.parse(JSON.stringify(context)) || window;

  // (2).挂载函数。将调用函数挂载到context上。
  context.func = this;

  // (3).获取调用函数除context外的参数。
  const args = Array.from(arguments).slice(1);

  // (4).返回一个新的函数
  return () => {
    // (4-1).拼接参数。将外部调用参数和返回新函数的参数进行合并
    const fnArgs = args.concat(Array.from(arguments));

    // (4-2).执行函数获取结果
    const result = fnArgs.length ? context.func(fnArgs) : context.func();

    // (4-3).删除挂载函数防止全局污染
    delete context.func;

    // (4-4).返回结果
    return result;
  };
};

// 测试
const obj = {
  name: "大黄",
  age: 4,
  func: function (hobby) {
    console.log(`${this.name}今年${this.age}岁,它喜欢${hobby}`);
  },
};
// this隐式绑定,func()的this指向obj
obj.func("睡觉"); // 大黄今年4岁,它喜欢睡觉

const newObj = {
  name: "小白",
  age: 3,
  hobby: "吃饭",
};
// 使用myBind()将obj.func()中的this强制指向newObj,myBind返回一个函数
const bindFunc = obj.func.myBind(newObj, [newObj.hobby]);
bindFunc(); // 小白今年3岁,它喜欢吃饭
```

### 手写 new

new 的作用是实例化对象,使用 new 时做了如下事情:

- 创建空对象。创建一个空对象来接收实例化对象信息。
- 连接原型。将空对象的隐式原型(`__proto__`)连接到实例化对象的 prototype。
- 绑定 this。执行实例化函数并绑定 this 至空对象。
- 返回一个新对象。如果实例化函数执行的结果是一个对象则返回,否则返回空对象。

```js
function _new() {
  // 获取_new()第一个参数,即实例化对象
  const constructor = [].shift.call(arguments);
  /*
   * (1).创建一个空对象。Object.create(null)与{}的区别在于:Object.crete(null)
   * 会返回一个纯净的对象,不会继承内置Object的toString、valueof等函数
   */
  const obj = Object.create(null);
  // (2).连接原型。将空对象的隐式原型连接到实例化对象的 prototype
  obj.__proto__ = constructor.prototype;
  // (3).绑定this。执行实例化函数并绑定 this 至空对象
  const result = constructor.apply(obj, arguments);
  // (4).返回新对象
  return typeof result === "object" ? result : obj;
}

// 测试
function Person(name, age) {
  this.name = name;
  this.age = age;
  console.log("我叫" + this.name + ",今年" + this.age + "岁");
}
const person = _new(Person, "z乘风", 20); // 我叫z乘风,今年20岁
console.log(person.name); // 'z乘风'
console.log(person.age); // 20
```

### 手写深拷贝函数

### 手写 create()、freeze()、assign()

#### Object.create()

Object.create(proto,propertiesObject?)用于创建一个新对象,允许接收一个对象为参数,使用参数来提供新创建的对象的`__proto__`(会返回一个新对象,带着指定的原型对象和属性)。proto 为新创建对象的原型对象,propertiesObject 用来给新创建的对象添加可枚举属性,与 Object.defineProperies 方法第二个参数用法一样。

**Object.create(null)与{}的区别在于:Object.crete(null)会返回一个纯净的对象,不会继承 Object 原型上的函数或属性,从而避免属性或函数的覆盖。即使用 Object.create(null)创建后对象的`__proto__`为 undefined,所以无法使用 Object 上的 toString、valueof 等函数,相比较{}会继承 Object 原型上的函数或属性,Object.create(null)创建对象的方式更为纯净。**

实现 Object.create()的关键步骤在于:**创建一个新函数,将参数链接到函数的原型上,然后将函数实例化。**此时函数的实例也拥有了对象参数的属性或方法。

```js
// 实现Object.create(),暂不考虑第二个参数
function create(proto) {
  const isObject = typeof proto === "object" || typeof proto === "function";
  // (1).参数检查。create() 仅支持传入对象或函数类型的参数
  if (typeof proto === undefined || !isObject) {
    throw new TypeError(
      `Object prototype may only be an Object or null: ${proto}`
    );
  }
  // (2).创建一个函数
  function F() {}
  /*
   * (3).将参数连接到新创建的函数原型上,函数的原型继承了proto上的属性和函数。
   */
  F.prototype = proto;

  /*
   * 注意:MDN上create() polyfill 并未对传入的参数为null做处理,这是因为es5版本的限制,
   * 所以手写的create(null)与Object.create(null)是有差异的,
   * 手写的create(null)创建出来的对象不是一个纯净的对象
   */
  // (4).返回函数实例化的对象
  return new F();
}

// 测试
function Base() {
  this.name = "z乘风";
}
Base.age = 18;
Base.prototype.say = function () {
  return "hello";
};

const obj = create(Base);
console.log(obj.__proto__ === Base); // true
```

#### Object.freeze()

Object.freeze()用于冻结一个对象,接收一个对象作为参数,返回被冻结后的对象,冻结后的对象不能被修改,不能添加新属性,不能删除已有属性,不能修改该对象已有属性的可枚举性、可配置性、可写性,以及不能修改已有属性的值,被冻结对象的原型也不能被修改。freeze()实现原理是:**使用 Object.seal()密封对象,使得被密封对象不可删除熟属性、添加新属性,使用 Object.defineProperty()将对象属性配置为不可写,对于对象嵌套使用递归实现深层次的冻结。**在 Vue 或 Vuex 中如果对于 data 或 vuex 里使用 freeze 冻结了的对象,vue 不会做 getter 和 setter 的转换。如果有一个巨大数组且确信不会发生变化,使用 Object.freeze()可以让性能大幅提升。

```js
// freeze简单实现
function freeze(obj) {
  // 判断是否是对象
  if (obj instanceof Object) {
    // 使用seal()密封一个对象不可添加属性、不能删除属性
    obj = Object.seal(obj);
    // 遍历对象,key为遍历对象的key
    for (let key in obj) {
      // hasOwnProperty()返回一个布尔值,判断对象自身属性中是否具有指定的属性
      if (obj.hasOwnProperty(key)) {
        // 利用defineProperty对对象的属性进行配置
        Object.defineProperty(obj, key, {
          writable: false, // 设置属性不可写
        });
        // 如果对象嵌套对象,那么使用递归实现更深层次的冻结
        if (obj[key] instanceof Object) {
          freeze(obj[key]);
        }
      }
    }
    return obj;
  } else {
    throw new TypeError("obj not an object");
  }
}

// Object.freeze()例子
const obj = { name: "z乘风", age: 18, city: "鸡城" };
const newObj = Object.freeze(obj);
newObj.name = "zxp";
console.log(newObj); // {name: "z乘风", age: 18, city: "鸡城"} 无法修改属性值
delete newObj.city; // false 无法删除属性
newObj["like"] = "美女";
console.log(newObj); // {name: "z乘风", age: 18, city: "鸡城"} 无法添加属性值

// 手写freeze()例子
const obj = { name: "z乘风", age: 18, city: "鸡城" };
const newObj = freeze(obj);
newObj.name = "zxp";
console.log(newObj); // {name: "z乘风", age: 18, city: "鸡城"}
delete newObj.city; // false
newObj["like"] = "美女";
console.log(newObj); // {name: "z乘风", age: 18, city: "鸡城"}
```

#### Object.assign()

### 手写继承

### 手写 Array forEach()、map()、reduce()

### 数组去重

数组去重几种方法:

- 数组转 Set。利用 Set 结构相同元素不能重复的特性去除数组中相同元素,然后将 Set 转为数组。
- 创建一个新数组利用 indexOf()或 indecludes()判断原数组的元素是否存在新数组中,若不存在则往新数组添加该元素。
- 利用 filter 高阶函数去重。
- 对象键名不允许重复的特性去重。
- 利用 Map 结构 Key 不可相同特性去重。
- 利用双重循环+splice()去重。

```js
const arr = [1, 2, 3, 1, 2];

/*
 * 方式1:利用Set相同元素不能重复的特性去除数组中相同元素,然后通过Array.from()将Set转为数组,
 * 也可以通过扩展运算符将Set转为数组,例如[...new Set(arr)]
 */
const distinct01 = (arr) => Array.from(new Set(arr));

/*
 * 方式2:创建一个新数组,利用indexOf()判断原数组元素是否存在新数组中,若不存在则添加。
 * includes()实现去重与indexOf()类似
 */
const distinct02 = (arr) => {
  if (!Array.isArray(arr)) {
    throw new Error("arr not an array");
  }
  const newArr = [];
  for (let i = 0, len = arr.length; i < len; i++) {
    newArr.indexOf(arr[i]) === -1 && newArr.push(arr[i]);
  }
  return newArr;
};

/*
 * 方式3:filter函数去重
 */
const distinct03 = (arr) => {
  return arr.filter((item, index, array) => array.indexOf(item) === index);
};

/*
 * 方式4:利用对象键名唯一去重
 */
const distinct04 = (arr) => {
  const obj = {};
  arr.forEach((item) => {
    if (!obj[item]) {
      obj[item] = item;
    }
  });
  return Object.values(obj);
};
/*
 * 方式5:利用Map key名不可重复去重
 */
const distinct05 = (arr) => {
  const map = new Map();
  arr.forEach((item) => {
    if (!map.has(item)) {
      map.set(item, item);
    }
  });
  return [...map.keys()];
};

/*
 * 方式6:splice()+双重循环去重
 */
const distinct06 = (arr) => {
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if (arr[i] === arr[j]) {
        arr.splice(j, 1);
        // 由于数组删除了一个元素,长度和遍历的范围都要减一
        len--;
        j--;
      }
    }
  }
  return arr;
};
```

### 数组扁平化

提供一个多维数组,编写一个函数将数组扁平化去并除其中重复部分数据,最终得到一个升序且不重复的数组。

```js
// 多维数组,要求将其扁平化并去重升序排序
const arr = [
  [1, 2, 2],
  [3, 4, 5, 5],
  [6, 7, 8, 9, [11, 12, [12, 13, [14]]]],
  10,
];

/*
 * 解法1:flat(Infinity)将任意多维数组拍平为一维数组,然后数组转Set去重,
 * 然后通过Array.from将对象转为数组,最后通过sort()升序排序
 */
const fn = (arr) => {
  if (!Array.isArray(arr)) return;
  return Array.from(new Set(arr.flat(Infinity))).sort((a, b) => a - b);
};
console.log(fn(arr)); // [1, 2, 3, 4, 5, 6,7, 8, 9, 10, 11, 12,13, 14]

/*
 * 解法2:通过递归拍平数组,然后转Set去重,最后sort()升序
 */
const fn = (arr) => {
  if (!Array.isArray(arr)) return;
  Array.prototype.flat = function () {
    return [].concat(
      ...this.map((item) => (Array.isArray(item) ? item.flat() : [item]))
    );
  };
  Array.prototype.unique = function () {
    return [...new Set(this)];
  };
  const sort = (a, b) => a - b;
  return arr.flat().unique().sort(sort);
};
console.log(fn(arr)); // [1, 2, 3, 4, 5, 6,7, 8, 9, 10, 11, 12,13, 14]
```

### 手写防抖节流函数

### 手写解析 URL 参数函数

#### 通过 URLSearchParams()获取 URL 参数

```js
/*
 * window.location.search可以获取查询参数(不包含?号),假设window.location.search为
 * user=z%E4%B9%98%E9%A3%8E&age=18。
 */
const urlSearchParams = new URLSearchParams(window.location.search);
// 将键值对列表转换为一个对象
const params = Object.fromEntries(urlSearchParams.entries()); // {user: 'z乘风', age: '18'}
```

#### 通过 split()获取 URL 参数

```js
function getParams(url) {
  const res = {};
  // 判断是否有查询参数
  if (url.includes("?")) {
    // 以?号分割得到数组最后二个元素
    const str = url.split("?")[1];
    // 分割&号得到参数数组
    const arr = str.split("&");
    arr.forEach((item) => {
      const key = item.split("=")[0];
      const value = item.split("=")[1];
      res[key] = decodeURIComponent(value); // 解码
    });
  }
  return res;
}
const url = "https://www.baidu.com/?user=z%E4%B9%98%E9%A3%8E&age=18";
console.log(getParams(url)); // {user: 'z乘风', age: '18'}
```

### 手写发布订阅

发布订阅模式是开发中最为常见最有精髓的设计模式,例如在 Vue2.x 中的 EventBus、$on、$emit、$off,其实现原理是在其内部维护一个事件列表,存储已订阅的事件,当订阅事件时会将事件添加到事件列表,并向对应事件添加回调函数。当发布事件后会获取事件列表中事件对应的回调函数列表,并遍历回调函数列表挨个执行回调函数。

```js
class EventEmitter {
  constructor() {
    // 定义事件列表,存储事件
    this.events = {};
  }
  // 订阅事件
  on(event, callback, context) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    // 向对应的事件添加回调函数
    this.events[event].push(callback);
    return this;
  }
  // 发出事件
  emit(event, ...payload) {
    // 获取对应事件的回调函数列表
    const callbacks = this.events[event];
    // 循环执行回调函数列表的回调函数,并传入参数
    if (callbacks) {
      callbacks.forEach((cb) => cb.apply(this, payload));
    }
    return this;
  }

  // 删除订阅的事件
  off(event, callback) {
    // 如果什么都没传,重置事件列表
    if (typeof event === "undefined") {
      this.events = {};
    }
    if (typeof event === "string") {
      /*
       * 如果callback是函数则删除事件对应的回调函数,否则将重置该事件
       */
      this.events[event] =
        typeof callback === "function"
          ? this.events[event].filter((cb) => cb !== callback)
          : [];
    }
    return this;
  }
  // 只允许订阅一次事件
  once(event, callback, context) {
    // 声明一个代理回调
    const proxyCallback = (...payload) => {
      callback.apply(context, payload);
      // 回调函数执行完成之后就删除事件订阅
      this.off(event, proxyCallback);
    };
    /*
     * on将proxyCallback加入事件列表,当使用emit触发对应的事件时就会循环
     * 执行回调函数列表中的回调函数,即会执行proxyCallback,由于proxyCallback()中
     * callback()执行后,调用this.off()事件所将对应的回调函数删除,所以只保证once()的
     * callback只会执行一次。
     */
    this.on(event, proxyCallback, context);
  }
}

// 测试
const emitter = new EventEmitter();
const callback1 = (name, sex) => {
  console.log(name, sex, "callback1");
};
const callback2 = (name, sex) => {
  console.log(name, sex, "callback2");
};
const callback3 = (name, sex) => {
  console.log(name, sex, "callback3");
};

emitter
  .on("event01", callback1)
  .on("event01", callback2)
  // 仅会执行一次回调
  .once("event01", callback3);
/*
 * z乘风 男 callback1
 * z乘风 男 callback2
 * z乘风 男 callback3
 */
emitter.emit("event01", "z乘风", "男");

// 删除事件
emitter.off("event01", callback1);
emitter.emit("event01", "z乘风", "男"); // z乘风 男 callback2
```

### 手写模板编译功能

### 手写 Promise

### 手写 Promise 错误处理函数

```js
/*
 * asyncTo支持泛型,接收Promise对象和执行函数,无论Promise的状态如何最终执行函数都会被执行,
 * asyncTo返回一个数组,数组的第一个元素是传入的promise产生的错误信息,元素二是promise执行成功
 * 返回的数据
 */
function asyncTo<E = Error, T = any>(promise: Promise<any>, fn?: () => void) {
  return (
    new Promise() <
    [null, T] >
    ((resolve, reject) => {
      return promise
        .then((data: T) => resolve([null, data]))
        .catch((err: E) => reject([err, null]))
        .finally(() => fn && fn());
    })
  );
}
```

### 异步请求控制并发数

```js
const limitRequest = (urls = [], limit = 0) => {
  return new Promise((resolve, reject) => {
    const len = urls.length;
    let count = 0;
    const start = async () => {
      const url = urls.shift();
      if (url) {
        try {
          // 请求
          await axios.post(url);
          if (count === len - 1) {
            // 如果是最后一个任务
            resolve();
          } else {
            count++;
            // 当前任务执行成功启动下一个任务
            start();
          }
        } catch (err) {
          count++;
          // 当前任务执行成功启动下一个任务
          start();
        }
      }
    };
    while (limit > 0) {
      start();
      limit -= 1;
    }
  });
};
```

### 手写 trim()

trim()的作用是去除字符串两端的空白字符,空白字符包括所有的空白字符(space, tab, no-break space 等)以及所有行终止符字符(如 LF,CR 等)。

```js
// 方式1:通过正则表达式替换实现trim()
String.prototype.trim = function () {
  /*
   * ^\s* 表示 匹配以空白字符开头的字符串,|表示或者,\s*$表示匹配以空白字符结尾的字符串,/g执行匹配模式为全局匹配
   * /^\s*|\s*$/g 表示全局匹配匹配任意个以空白字符(包括空格、制表符、换页符等等)开头,
   * 或全局匹配匹配任意个以空白字符
   */
  const reg = /^\s*|\s*$/g;
  return this.replace(reg, "");
};
// 测试
console.log(" z乘风 ".trim()); // z乘风
console.log("z乘风 ".trim()); // z乘风
console.log(" z乘风".trim()); // z乘风
console.log(" z 乘风 ".trim()); // z 乘风

// 方式2:字符提取法
String.prototype.trim = function () {
  const reg = /^\s*(.*?)\s*$/g;
  this.replace(reg, "$1");
};
// 测试
console.log(" z乘风 ".trim()); // z乘风
console.log("z乘风 ".trim()); // z乘风
console.log(" z乘风".trim()); // z乘风
console.log(" z 乘风 ".trim()); // z 乘风
```
