## 1.手写 call()、apply()、bind()

call()、apply()、bind()三个函数皆为 Function 原型上的函数,都可以强制改变函数的 this 指向,即使用它们会强制改变调用函数的 this 指向为它们的第一个入参,注意:在非严格模式下指定 null 或 undefined 为 call()、apply()、bind()的第一个参数时会自动替换的函数 this 指向全局对象(浏览器环境下是 window,NodeJS 环境下是 global)。call()、apply()、bind()三者区别如下:

### 1.1 手写 call()

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

### 1.2 手写 apply()

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

### 1.3 手写 bind()

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

## 2.手写 isType()

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

## 3.手写深拷贝函数

- 浅拷贝是指创建一个新对象,新对象具有原始对象的一份精确拷贝。如果属性是基本类型,拷贝的就是基本类型的值,如果属性是引用类型，拷贝的就是内存地址,所以如果其中一个对象改变了这个地址,就会影响到另一个对象。浅拷贝的实现方式有`Object.assign()`、`...`扩展运算符。
- 深拷贝会拷贝所有的属性,并拷贝属性指向的动态分配的内存。当对象和它所引用的对象一起拷贝时即发生深拷贝。深拷贝相比于浅拷贝速度较慢并且花销较大,但是拷贝前后两个对象互不影响。深拷贝的实现方式有 `JSON.parse(JSON.stringify())`,该方案具有如下缺点:
  - 无法拷贝 function、undefined、symbol。
  - NaN 和 Infinity 格式的数值及 null 都会被当做 null。
  - 对于其他类型的对象,包括 Map/Set/WeakMap/WeakSet,仅会序列化可枚举的属性。
  - 无法正确处理 Date 和 RegExg。
  - 无法解决循环引用。

#### 乞丐版深拷贝

```js
function deepCopy(obj) {
  // 定义一个空对象接收拷贝后的值
  let result;
  // 判断obj是否是引用类型,typeof判断Object、Array结果都是"object"
  if (typeof obj === "object") {
    // 根据obj的构造函数判断obj是否是一个数组,是数组则赋一个空数组,否则赋值一个空对象
    result = obj.constructor === Array ? [] : {};
    // 遍历obj,for in通常用于遍历对象
    for (let k in obj) {
      // 判断obj[k]是否是引用类型,如果是则递归拷贝(因为obj可能会出现对象嵌套对象的情况),否则返回obj[k]
      result[k] = typeof obj[k] === "object" ? deepCopy(obj[k]) : obj[k];
    }
  } else {
    // 如果obj是基本类型就直接返回
    result = obj;
  }
  return result;
}

var user = { name: "zxp", age: 18 };
var obj = { count: 5, user };
var newObj = deepCopy(obj);
console.log(newObj); // {"count":5,"user":{"name":"zxp","age":18}}

// 缺点:无法解决循环引用问题,递归导致超出最大调用堆栈大小
var obj1 = { count: 5, user };
obj1.obj1 = obj1;
console.log(deepCopy(obj1)); // Uncaught RangeError: Maximum call stack size exceeded(未捕获范围错误:超出了最大调用堆栈大小)
```

#### 进阶版深拷贝

```js
const typeEnum = {
  /** 可继续遍历的数据类型 */
  mapType: "[object Map]",
  setType: "[object Set]",
  arrayType: "[object Array]",
  objectType: "[object Object]",
  argsType: "[object Arguments]",

  /** 不可继续遍历的数据类型 */
  boolType: "[object Boolean]",
  dateType: "[object Date]",
  errorType: "[object Error]",
  numberType: "[object Number]",
  stringType: "[object String]",
  regexpType: "[object RegExp]",
  symbolType: "[object Symbol]",
  funcType: "[object Function]",
};
// 获取类型
const getType = (target) => Object.prototype.toString.call(target);
// 获取target类型。高阶函数使函数更加简洁
const isType = (target) => (type) =>
  Object.prototype.toString.call(target) === `[object ${type}]`;
// 判断target是否是引用类型
const isObject = (target) => {
  const type = typeof target;
  return type !== null && (type !== "function" || type !== "object");
};
// 初始化对象
const init = (target) => new target.constructor();

function forEach(array, iterator) {
  let index = -1;
  const len = array.length;
  while (++index < len) {
    iterator(array[index], index);
  }
  return array;
}

// 克隆Symbol类型
function cloneSymbol(target) {
  return Object(Symbol.prototype.valueOf.call(target));
}
// 克隆正则
function cloneReg(target) {
  const reFlags = /\w*$/;
  const result = new target.constructor(target.source, reFlags.exec(target));
  result.lastIndex = target.lastIndex;
  return result;
}
// 克隆函数
function cloneFunc(target) {
  // 方法主体正则
  const bodyReg = /(?<={)(.|\n)+(?=})/m;
  // 方法参数正则
  const paramReg = /(?<=\().+(?=\)\s+{)/;
  // 函数转字符串
  const funcString = target.toString();
  const param = paramReg.exec(funcString);
  const body = bodyReg.exec(funcString);
  if (body) {
    // 判断函数中的参数是否为空
    if (param) {
      // 获取函数的参数
      const paramArr = param[0].split(",");
      return new Function(...paramArr, body[0]);
    } else {
      return new Function(body[0]);
    }
  } else {
    return null;
  }
  // 返回执行字符串函数的结果
  return eval(funcString);
}

// 克隆不可遍历对象
function cloneOtherType(target, type) {
  /**
   * constructor属性返回对创建此对象的数组函数的引用,例如[Function: Symbol]、
   * [Function: Object]
   */
  const Ctor = target.constructor;
  switch (type) {
    case typeEnum.boolType:
    case typeEnum.numberType:
    case typeEnum.stringType:
    case typeEnum.errorType:
    case typeEnum.dateType:
      // 通过new返回一个新对象
      return new Ctor(target);
    case type.symbolType:
      return cloneSymbol(target);
    case typeEnum.regexpType:
      return cloneReg(target);
    case typeEnum.funcType:
      return cloneFunc(target);
    default:
      return null;
  }
}

function clone(target, map = new WeakMap()) {
  // 判断target是否是原始类型
  if (!isObject(target)) return target;

  const type = getType(target);
  let cloneTarget;
  /**
   * 判断target的类型是否是可继续遍历类型,
   * 如果是不可继续遍历类型就执行cloneOtherType()
   */

  if (Object.values(typeEnum).slice(0, 5).includes(type)) {
    // 初始化cloneTarget
    cloneTarget = init(target);
  } else {
    return cloneOtherType(target, type);
  }
  // 防止循环引用
  if (map.get(target)) return target;
  map.set(target, map);

  // 克隆 set
  if (type === typeEnum.setType) {
    /**
     * 当target是Set类型,cloneTarget的初始化值是Set {},
     * 循环遍历target将set中的元素递归添加到cloneTarget中
     */
    target.forEach((value) => {
      cloneTarget.add(clone(value));
    });
    return cloneTarget;
  }
  // 克隆 map
  if (type === typeEnum.mapType) {
    /**
     * 当target是Map类型,cloneTarget的初始化值是Map {},
     * 循环遍历target将map中的元素递归添加到cloneTarget中
     */
    target.forEach((value, key) => {
      cloneTarget.set(key, clone(value));
    });
    return cloneTarget;
  }
  // 克隆数组和对象
  const keys = Object.keys(target);
  forEach(keys || target, (value, key) => {
    // 如果属性是普通类型就直接赋值给新对象,否则就递归拷贝
    cloneTarget[value] = clone(target[value], map);
  });
  return cloneTarget;
}

/**  测试  **/
const obj = {
  name: "zxp",
  sex: "man",
  sb: Object(Symbol("asd")),
  set: new Set().add({ like: "女人" }).add({ love: "woman" }),
  map: new Map().set("name", "zmap"),
  arr: [1, 2, 3],
  ctx: { name: "zzz", sex: "woman" },
  reg: /^w/,
  date: new Date(),
  func1: function () {
    return 1;
  },
};
const cloneObj = clone(obj);
console.log(cloneObj === obj); // false
cloneObj.name = "zzzzz";
console.log(obj.name, cloneObj.name); // zxp zzzzz
console.log(cloneObj);
/**
  {
    name: 'zzzzz',
    sex: [String: 'man'],
    sb: null,
    set: Set { { like: [String: '女人'] }, { love: [String: 'woman'] } },
    map: Map { 'name' => [String: 'zmap'] },
    arr: [ [Number: 1], [Number: 2], [Number: 3] ],
    ctx: { name: [String: 'zzz'], sex: [String: 'woman'] },
    reg: /^w/,
    date: 2021-02-20T03:06:14.657Z,
    func1: [Function: anonymous]
  }
 */
```

## 4.手写防抖节流函数

## 5.手写解析 URL 参数函数

### 5.1 通过 URLSearchParams()解析 URL 参数

```js
/*
 * window.location.search可以获取查询参数(不包含?号),假设window.location.search为
 * user=z%E4%B9%98%E9%A3%8E&age=18。此种方式虽然简单但兼容较差。
 */
const urlSearchParams = new URLSearchParams(window.location.search);
// 将键值对列表转换为一个对象
const params = Object.fromEntries(urlSearchParams.entries()); // {user: 'z乘风', age: '18'}
```

### 5.2 通过 split()解析 URL 参数

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
      const key = item.split("=")[0],
        value = item.split("=")[1];
      res[key] = decodeURIComponent(value); // 解码
    });
  }
  return res;
}
const url = "https://www.baidu.com/?user=z%E4%B9%98%E9%A3%8E&age=18";
console.log(getParams(url)); // {user: 'z乘风', age: '18'}
```

## 6.手写发布订阅

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

## 7.手写 trim()

trim()的作用是去除字符串两端的空白字符,空白字符包括所有的空白字符(space, tab, no-break space 等)以及所有行终止符字符(如 LF,CR 等)。

### 7.1 通过正则表达式替换实现 trim()

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
```

### 7.2 字符提取法

```js
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

## 8.数字千位分割

### 8.1 通过 toLocaleString()实现千位分割

通过 toLocaleString()实现千位分割 toLocaleString()是 JS 内置函数,用于返回数字或字符串在特定语言环境下的表示字符串,可以通过 toLocaleString()实现数字千位分割,对于小数部分会进行四舍五入。

```js
var num01 = 123456789;
var num02 = 123456.4542;
console.log(num01.toLocaleString()); // 123,456,789
console.log(num02.toLocaleString()); // 123,456.454 (小数部分四舍五入了)
```

### 8.2 通过字符串转为数组实现数组千位分割

原理:首先将入参分割为整数部分(即 num[0])和小数部分(即 num[1]),再将整数部分倒序排列得到字符数组,再循环整个字符数组,
每三位添加一个分隔符(即 i%3===0,而且需要排除 i===0),得到结果数组后再转为正序,如果存在小数部分则拼接小数部分,否则直接返回结果数组的字符串。

```js
function numFormat(num, separator = ",") {
  // 分割小数点得到数组,num[0]表示整数部分,num[1]表示小数部分
  num = num.toString().split(".");
  // 获取整数内容并倒序排列
  const arr = num[0].split("").reverse();
  const res = [];
  for (let i = 0, len = arr.length; i < len; i++) {
    // i % 3 && i !==0 表示满足千位,则添加分割符
    if (i % 3 === 0 && i !== 0) {
      res.push(separator);
    }
    // 添加元素
    res.push(arr[i]);
  }
  // 翻转数组变为正序数组,由于arr是倒序数组遍历后res也是倒序
  res.reverse();

  // 如果存在小数部分则拼接小数部分,否则返回整数部分
  return num[1] ? res.join("").concat("." + num[1]) : res.join("");
}

const a = 123456789;
const b = 123456.4542;
console.log(numFormat(a)); // 123,456,789
console.log(numFormat(b)); // 123,456.4542
```

#### 8.3 通过 replace()+正则实现千位分割

```js
function numFormat(num, separator = ",") {
  // \d+表示匹配多个数字,仅会匹配到小数点之前的内容
  return num.toString().replace(/\d+/, (n) => {
    // \d表示匹配数字,(?=(\d{3})+$)/g表示全局捕获以三位数字结尾的内容,$1为捕获到的内容
    return n.replace(/\d(?=(\d{3})+$)/g, function ($1) {
      return $1 + separator;
    });
  });
}

const a = 123456789;
const b = 12345.45562123;
console.log(numFormat(a)); // 123,456,789
console.log(numFormat(b)); // 12,345.45562123
```

## 9.手写深度合并函数

deepmergeAll()支持数组对象深度合并,而不是覆盖。

```js
const toString = Object.prototype.toString;

/**
 * 判断val是否是可合并对象
 * @param {*} val 目标对象
 * @returns
 */
const isMergeableObject = (val) => {
  const nonNullObject = val && typeof val === "object";
  return (
    nonNullObject &&
    toString.call(val) !== "[object RegExp]" &&
    toString.call(val) !== "[object Date]"
  );
};
/**
 * 为目标对象设置空值
 * @param {*} val 目标对象
 * @returns
 */
const emptyTarget = (val) => (Array.isArray(val) ? [] : {});

/**
 * 数组默认合并方法。
 * @param {*} target
 * @param {*} source
 * @param {*} optionsArgument 配置参数
 * @returns
 */
const defaultArrayMerge = (target, source, optionsArgument) => {
  let destination = target.slice();
  source.forEach(function (e, i) {
    if (typeof destination[i] === "undefined") {
      destination[i] = cloneIfNecessary(e, optionsArgument);
    } else if (isMergeableObject(e)) {
      destination[i] = deepmerge(target[i], e, optionsArgument);
    } else if (target.indexOf(e) === -1) {
      destination.push(cloneIfNecessary(e, optionsArgument));
    }
  });
  return destination;
};

function mergeObject(target, source, optionsArgument) {
  let destination = {};
  if (isMergeableObject(target)) {
    Object.keys(target).forEach(function (key) {
      destination[key] = cloneIfNecessary(target[key], optionsArgument);
    });
  }
  Object.keys(source).forEach(function (key) {
    destination[key] =
      !isMergeableObject(source[key]) || !target[key]
        ? cloneIfNecessary(source[key], optionsArgument)
        : deepmerge(target[key], source[key], optionsArgument);
  });
  return destination;
}
/**
 * source是否需要克隆
 * @param {*} value
 * @param {*} optionsArgument 配置参数
 * @returns
 */
const cloneIfNecessary = (value, optionsArgument) => {
  const clone = optionsArgument && optionsArgument.clone === true;
  return clone && isMergeableObject(value)
    ? deepmerge(emptyTarget(value), value, optionsArgument)
    : value;
};

/**
 * 深度合并target和source
 * @param {*} target 目标对象
 * @param {*} source 合并对象
 * @param {*} optionsArgument 配置参数
 * @returns
 */
const deepmerge = (target, source, optionsArgument) => {
  const array = Array.isArray(source),
    options = optionsArgument || { arrayMerge: defaultArrayMerge },
    arrayMerge = options.arrayMerge || defaultArrayMerge;
  /**
   * 如果source是数组则调用defaultArrayMerge()对数组进行合并,
   * 否则调用mergeObject()对对象进行合并
   */
  if (array) {
    return Array.isArray(target)
      ? arrayMerge(target, source, optionsArgument)
      : cloneIfNecessary(source, optionsArgument);
  } else {
    return mergeObject(target, source, optionsArgument);
  }
};

/**
 * 深度合并对象数组中的多个对象
 * @param {*} array 对象数组
 * @param {*} optionsArgument
 * @returns
 */
const deepmergeAll = (array, optionsArgument) => {
  // 数组长度为2才也允许合并
  if (!Array.isArray(array) || array.length < 2) {
    throw new Error(
      "first argument should be an array with at least two elements"
    );
  }
  // 循环调用deepmerge()深度合并
  return array.reduce(function (prev, next) {
    return deepmerge(prev, next, optionsArgument);
  });
};

// 测试
const result = deepmergeAll([
  { level1: { level2: { name: "David", parts: ["head", "shoulders"] } } },
  { level1: { level2: { face: "meh", parts: ["knees", "toes"] } } },
  { level1: { level2: { eyes: "more meh", parts: ["eyes"] } } },
]);
console.log(result);
/*
{
   "level1":{
      "level2":{
         "name":"David",
         "parts":[
            "head",
            "shoulders",
            "knees",
            "toes",
            "eyes"
         ],
         "face":"meh",
         "eyes":"more meh"
      }
   }
}
*/
```

## 10.手写模板编译功能

模板编译最常用的实现方式是通过正则表达式进行解析,当匹配指定规则时则使用数据对象替换。

```ts
/**
 * \s*表示以非贪婪模式匹配0个或多个空白字符,(\w+)表示匹配字母、
 * 数字、下划线并获取这一匹配
 */
const reg = /{{\s*?(\w+)\s*?}}/g;
const render = (template: string, data: Record<string, any>) => {
  return template.replace(reg, (match, key) => {
    return key && data.hasOwnProperty(key) ? data[key] : "";
  });
};
const template = `name:{{name}},age:{{age}}`;
const data = { name: "zchengfeng", age: 18 };
console.log(render(template, data)); // name:zchengfeng,age:18
```

## 11.手写 setTimeout()

## 12.手写 setInterval()
