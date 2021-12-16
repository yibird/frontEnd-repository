### 1.基本类型与引用类型区别

了解拷贝之前首先了解赋值的概念,赋值是将某一个值或对象赋给某一个对象的过程,它有两种情况:
(1).对于基本类型而言是赋值,赋值前和赋值后的两个变量是互不影响。
(2).对于引用类型(Object、Array、Function)而言是赋一个内存地址,赋值前的后赋值后的两个变量指向同一个内存地址,当其中一个变量时改变时会使另一个变量也会随之改变。

```js
// 基本类型赋值
let a = 1;
let b = a;
a = 5;
console.log(a, b); // 5,1

// 引用类型赋址,obj发生变化copyObj也会发生变化,哪怕修改的是基本类型
let obj = {
  name: "zxp",
};
let copyObj = obj;
obj.name = "ha";
console.log(obj.name, copyObj.name); // "ha" "ha"
```

### 2.浅拷贝的概念及使用场景

**浅拷贝是指创建一个新对象,新对象具有原始对象的一份精确拷贝。如果属性是基本类型,拷贝的就是基本类型的值,如果属性是引用类型，拷贝的就是内存地址,所以如果其中一个对象改变了这个地址,就会影响到另一个对象。**

#### 2.1 Object.assign()

Object.assign(target,...source) 方法用于将所有可枚举属性的值从一个或多个源对象(source)复制到目标对象(target)。它将返回目标对象。Object.assign 不仅可以实现浅拷贝,也可以实现数据的合并。

```js
let obj = {
  name: "zxp",
  info: {
    sex: "男",
    age: 10,
  },
};

let copyObj = Object.assign({}, obj);
obj.name = "hhh";
obj.info.sex = "女";
console.log(obj); // {name:"hhh",info:{sex:'女',age:10}}

console.log(copyObj); // {name:"hhh",info:{sex:'女',age:10}}
```

#### 2.2 ES6 扩展运算符

ES6 提供的扩展运算符也可以实现对象的浅拷贝,其实现方式跟 Object.assign()是类似的。

```js
let obj = {
  name: "zxp",
  info: {
    sex: "男",
    age: 10,
  },
};

let copyObj = { ...obj };
obj.name = "hhh";
obj.info.sex = "女";
console.log(obj); // {name:"hhh",info:{sex:'女',age:10}}
```

#### 2.3 Array.prototype.slice()和 Array.prototype.concat()浅拷贝数组

slice() 方法返回一个新的数组对象，这一对象是一个由 begin 和 end（不包括 end）决定的原数组的浅拷贝。原始数组不会被改变。
concat()方法用于合并两个或多个数组。此方法不更改现有数组,而是返回一个新数组。

```js
let arr = [1, 2, [3, 4]];
let copyArr = arr.slice(1);
arr[2][0] = 0;
console.log(arr, copyArr); // [1,2,[0,4]] [2,[0,4]]
```

### 3.深拷贝的概念及使用场景

**深拷贝会拷贝所有的属性，并拷贝属性指向的动态分配的内存。当对象和它所引用的对象一起拷贝时即发生深拷贝。深拷贝相比于浅拷贝速度较慢并且花销较大。拷贝前后两个对象互不影响。**

#### 3.1 JSON.parse()与 JSON.stringify()的介绍

JSON.parse()和 JSON.stringify()是 js 提供用于处理 JSON 数据的 API。

JSON.parse(text,[reviver])用于解析 JSON 字符串,构造由字符串描述的 JS 值或对象。提供可选的 reviver 函数用以在返回之前对所得到的对象执行变换(操作)。JSON.parse 返回 Object 类型,若传入的字符串不符合 JSON 规范,则会抛出 SyntaxError 异常。

```js
// 例子1不传入reviver函数
const json = '{"result":true, "count":42}';
const obj = JSON.parse(json);
console.log(obj); // Object { result: true, count: 42 }

// 例子2传入reviver函数
const json = '{"result":true, "count":42,"age":1000}';
/*
 * JSON.parse()的第二个参数是一个函数,该函数接收key和value两个参数,key表示转换json文本的
 * key(当key为空字符串时* 表示没有真正的属性),key表示转换json文本的value,可以通过该函数对转换结果做一些处理
 */
const obj = JSON.parse(json, (key, value) => {
  if (value > 100) {
    return 100;
  }
  return value;
});
console.log(obj); // Object { result: true, count: 100 }

//JSON.parse()例子
JSON.parse("{}"); // {}
JSON.parse("true"); // true
JSON.parse('"foo"'); // "foo"
JSON.parse('[1, 5, "false"]'); // [1, 5, "false"]
JSON.parse("null"); // null

// both will throw a SyntaxError,JSON.parse不允许以逗号作为结尾
JSON.parse("[1, 2, 3, 4, ]");
JSON.parse('{"foo" : 1, }');
```

JSON.stringify(value[, replacer [, space]])方法将一个 JavaScript 对象或值转换为 JSON 字符串，如果指定了一个 replacer 函数，则可以选择性地替换值，或者指定的 replacer 是数组，则可选择性地仅包含数组指定的属性。value 表示将要序列化成 一个 JSON 字符串的值。replacer(可选)如果该参数是一个函数,则在序列化过程中,被序列化的值的每个属性都会经过该函数的转换和处理；如果该参数是一个数组，则只有包含在这个数组中的属性名才会被序列化到最终的 JSON 字符串中；如果该参数为 null 或者未提供，则对象所有的属性都会被序列化。space(可选)用于指定缩进用的空白字符串，用于美化输出（pretty-print）；如果参数是个数字，它代表有多少的空格；上限为 10。该值若小于 1，则意味着没有空格；如果该参数为字符串（当字符串长度超过 10 个字母，取其前 10 个字母），该字符串将被作为空格；如果该参数没有提供（或者为 null），将没有空格。JSON.stringify()返回序列化后的 JSON 字符串,当在循环引用时会抛出异常 TypeError ("cyclic object value")(循环对象值);当尝试去转换 BigInt 类型的值会抛出 TypeError ("BigInt value can't be serialized in JSON")（BigInt 值不能 JSON 序列化)。
使用 JSON.stringify()需要注意:

- 转换值如果有 toJSON() 方法，该方法定义什么值将被序列化。
- 非数组对象的属性不能保证以特定的顺序出现在序列化后的字符串中。
- 布尔值、数字、字符串的包装对象在序列化过程中会自动转换成对应的原始值。
- undefined、任意的函数以及 symbol 值，在序列化过程中会被忽略（出现在非数组对象的属性值中时）或者被转换成 null（出现在数组中时）。函数、undefined 被单独转换时，会返回 undefined，如 JSON.stringify(function(){}) or JSON.stringify(undefined).
- 对包含循环引用的对象（对象之间相互引用，形成无限循环）执行此方法，会抛出错误。
- 所有以 symbol 为属性键的属性都会被完全忽略掉，即便 replacer 参数中强制指定包含了它们。
- Date 日期调用了 toJSON() 将其转换为了 string 字符串（同 Date.toISOString()），因此会被当做字符串处理。
- NaN 和 Infinity 格式的数值及 null 都会被当做 null。
- 其他类型的对象，包括 Map/Set/WeakMap/WeakSet，仅会序列化可枚举的属性。

```js
JSON.stringify({}); // '{}'
JSON.stringify(true); // 'true'
JSON.stringify("foo"); // '"foo"'
JSON.stringify([1, "false", false]); // '[1,"false",false]'
JSON.stringify({ x: 5 }); // '{"x":5}'

JSON.stringify({ x: 5, y: 6 });
// "{"x":5,"y":6}"

JSON.stringify([new Number(1), new String("false"), new Boolean(false)]);
// '[1,"false",false]'

JSON.stringify({ x: undefined, y: Object, z: Symbol("") });
// '{}'

JSON.stringify([undefined, Object, Symbol("")]);
// '[null,null,null]'

JSON.stringify({ [Symbol("foo")]: "foo" });
// '{}'

JSON.stringify({ [Symbol.for("foo")]: "foo" }, [Symbol.for("foo")]);
// '{}'

JSON.stringify({ [Symbol.for("foo")]: "foo" }, function (k, v) {
  if (typeof k === "symbol") {
    return "a symbol";
  }
});

// undefined

// 不可枚举的属性默认会被忽略：
JSON.stringify(
  Object.create(null, {
    x: { value: "x", enumerable: false },
    y: { value: "y", enumerable: true },
  })
);

// "{"y":"y"}"

/**
 replacer 参数可以是一个函数或者一个数组。作为函数，它有两个参数，键（key）和值（value），它们都会被序列化。

在开始时, replacer 函数会被传入一个空字符串作为 key 值，代表着要被 stringify 的这个对象。随后每个对象或数组上的属性会被依次传入。 

函数应当返回JSON字符串中的value, 如下所示:
如果返回一个 Number, 转换成相应的字符串作为属性值被添加入 JSON 字符串。
如果返回一个 String, 该字符串作为属性值被添加入 JSON 字符串。
如果返回一个 Boolean, "true" 或者 "false" 作为属性值被添加入 JSON 字符串。
如果返回任何其他对象，该对象递归地序列化成 JSON 字符串，对每个属性调用 replacer 方法。除非该对象是一个函数，这种情况将不会被序列化成 JSON 字符串。
如果返回 undefined，该属性值不会在 JSON 字符串中输出。
注意: 不能用 replacer 方法，从数组中移除值（values），如若返回 undefined 或者一个函数，将会被 null 取代。
*/
const foo = {
  foundation: "Mozilla",
  model: "box",
  week: 45,
  transport: "car",
  month: 7,
};
const obj = JSON.stringify(foo, (key, value) => {
  return typeof value !== "string" ? value : undefined;
});
console.log(obj); // {"week":45,"month":7}
JSON.stringify(foo, ["week", "month"]); // '{"week":45,"month":7}',只保留"week"和"month"属性值。
```

#### 3.2 JSON.parse(JSON.stringify())实现深拷贝

JSON.parse(JSON.stringify())的缺点:

- 不能对值为 undefined、Symbol、function 进行拷贝,会忽略 undefined、Symbol,不能序列化函数。

```js
let obj = {
  name: "zxp",
  a: undefined,
  b: Symbol("h"),
  c: function () {},
};
let copyObj = JSON.parse(JSON.stringify(obj));
// 值为undefined或为ES6提供的Symbol类型和函数类型无法深拷贝
console.log(obj, copyObj); // {name: "zxp", a: undefined, b: Symbol(h)}  {name: "zxp"}
```

- 不能解决循环引用。

```js
let obj = {
  name: "zxp",
  b: {
    c: 2,
    d: 3,
  },
};
obj.name = obj.b;
obj.b.c = obj.name;
let copyObj = JSON.parse(JSON.stringify(obj));
console.log(copyObj); // TypeError: Converting circular structure to JSON (类型错误:将循环结构转换为JSON)
```

- 不能正确处理 new Date(),不能处理正则表达式。

```js
// JSON.parse(JSON.stringify(new Date())) 转换不正确
console.log(new Date()); // Wed Jan 06 2021 16:56:07 GMT+0800 (CST)
console.log(JSON.stringify(new Date())); // "2021-01-06T08:56:42.776Z"
console.log(JSON.parse(JSON.stringify(new Date()))); // 2021-01-06T08:56:56.030Z

// JSON.parse(JSON.stringify(new Date()))转换不正确的解决办法是将new Date()字符串处转为时间戳处理
let date = new Date().valueOf();
console.log(date); //1609923618547
console.log(JSON.stringify(date)); // "1609923653269"
console.log(JSON.parse(JSON.stringify(date))); // 1609923653269

// JSON.parse(JSON.stringify())不能处理正则表达式
let obj = {
  name: "muyiy",
  a: /'123'/,
};
console.log(obj); // {name: "muyiy", a: /'123'/}
console.log(JSON.parse(JSON.stringify(obj))); // {name: "muyiy", a: Object}
```

除了 JSON.parse(JSON.stringify())这种方式实现深拷贝外,还可以借助第三方框架,例如 jQuery.extend() 和 lodash.cloneDeep()。
||和原数据是否指向同一对象|第一层数据为基本数据类型|原数据中包含子对象|
|-|-|-|-|
|赋值 |是| 改变会使原数据一同改变| 改变会使原数据一同改变|
|浅拷贝| 否| 改变不会使原数据一同改变 |改变会使原数据一同改变|
|深拷贝| 否| 改变不会使原数据一同改变 |改变不会使原数据一同改变|

### 4.手写深拷贝

#### 4.1 乞丐版深拷贝

核心思路:首先判断拷贝的对象是否是"object"(typeof 操作符判断 Object 和数组类型都是"object"),如果 typeof obj 不是"object"就定义一个新对象,然后将拷贝的对象赋值给新定义的对象直接返回即可。如果拷贝的对象是数组或对象时,先判断 obj 是数组还是对象,如果是数组就给新定义的对象赋值一个空数组,否则就赋值一个空对象,然后遍历要拷贝的对象,当拷贝对象的属性还是对象时就递归调用拷贝方法,因为拷贝对象可能有对象嵌套对象的情况,递归拷贝结束后将值赋给新定义的对象,最后返回新定义的对象。

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

#### 4.2 进阶版(解决循环引用)

思路:通过一个 Map 容器存储目标拷贝对象(target),首先判断 map 容器中是否包含目标拷贝对象,如果包含了目标拷贝对象则说明该对象已经拷贝过一次了(递归拷贝对象循环引用情况下一个对象会出现无限次,map 容器就相当于做了一个计数器工作,对于拷贝只需拷贝一次),无需再做其他处理直接返回目标拷贝对象即可。如果 map 容器不存在目标拷贝对象那么就存储目标拷贝对象,然后遍历目标拷贝对象进行递归拷贝。

```js
function clone(target, map = new Map()) {
  if (typeof target !== "object") return target;
  // 定义新对象
  const cloneTarget = Array.isArray(target) ? [] : {};
  /**
   * 判断map容器中是否存在当前拷贝的对象,如果存在则说明出现了循环引用情况,此时直接返回拷贝对象,
   * 如果map容器不存在拷贝对象则存储拷贝对象
   */
  if (map.get(target)) return target;
  map.set(target, map);
  for (const key in target) {
    // 如果属性是普通类型就直接赋值给新对象,否则就递归拷贝
    cloneTarget[key] = clone(target[key], map);
  }
  return cloneTarget;
}
var obj = {
  name: "zxp",
};
obj.obj = obj;
console.log(clone(obj)); // { name: 'zxp', obj: { name: 'zxp', obj: [Circular] } }
```

上面的例子就不会出现循环引用问题了,obj 的类型为[Circular]类型,即循环引用的意思。但上述深拷贝有两个问题,第一当拷贝的对象非常庞大时,使用 Map 会对内存造成巨大的额外开销,且需要手动清除 Map 的属性才能释放内存。第二 for in 遍历对象的效率不高,经测试循环方式的效率从高到低排名为: while > for i > for in。所以采用 while 循环代替 for in。

#### 4.3 优化版

WeakMap 是 ES6 提供的类似 Map 集合的数据结构,也是用于生成键值对的集合。但 WeakMap 与 Map 有如下区别:

- WeakMap 只接受对象作为键名(除 null 外),不接受其他类型的值作为键名。Map 只接受字符串类型作为键名。
- WeakMap 的键名所指向的对象,不计入垃圾回收机制。它的键名所引用的对象都是弱引用,即垃圾回收机制不将该引用考虑在内。只要所引用的对象的其他引用都被清除,垃圾回收机制就会释放该对象所占用的内存。简单来说,一旦不需要 WeakMap,WeakMap 里面的键名对象和所对应的键值对会自动消失,不用手动删除引用。而 Map 需要手动清除才能释放所占用内存。

```js
function forEach(array, iterator) {
  let index = -1;
  const len = array.length;
  while (++index < len) {
    iterator(array[index], index);
  }
  return array;
}

function clone(target, map = new WeakMap()) {
  if (typeof target !== "object") return target;
  //定义新对象
  const cloneTarget = Array.isArray(target) ? [] : {};
  /**
   * 判断map容器中是否存在当前拷贝的对象,如果存在则说明出现了循环引用情况,此时直接返回拷贝对象,
   * 如果map容器不存在拷贝对象则存储拷贝对象
   */
  if (map.get(target)) return target;
  map.set(target, map);
  const keys = Object.keys(target);
  forEach(keys || target, (value, index) => {
    //如果属性是普通类型就直接赋值给新对象,否则就递归拷贝
    cloneTarget[value] = clone(target[value], map);
  });
  return cloneTarget;
}
var obj = {
  name: "zxp",
};
obj.obj = obj;
console.log(clone(obj)); //{ name: 'zxp', obj: { name: 'zxp', obj: [Circular] } }
```

#### 4.4 完善版

经过以上两个版本补充,深拷贝的方法仍有以下需要完善的地方

- 针对拷贝对象的类型做处理,目前只是以 typeof 操作符判断拷贝对象的类型,但 typeof 操作符只能判断 Object 和 Array 为"object"。通过 Object.prototype.toString.call(target)即可精确获取 target 的类型,我们通过高阶函数将获取类型的功能抽离为一个函数,再用一个对象枚举要处理的类型。处理的类型分为可继续遍历类型和不可继续遍历类型,例如 Array、Object、Set 就属于可继续遍历类型,对于可继续遍历类型还需要进行递归拷贝,所以需要对拷贝对象进行初始化工作,以上两个例子对于数组类型就赋值一个[],对于对象类型就赋值一个{},这种方式有一个缺点,因为是我们手动赋一个默认值,无法拿到拷贝对象的原型,通过拷贝对象的 constructor 即可获取拷贝对象的默认值,例如:const target={} 就是 const target=new Object()的语法糖。使用拷贝对象的构造方法初始化可以获取拷贝对象上的原型数据。
- 支持 Symobl 类型。
- 支持正则表达式。

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
//获取类型
const getType = (target) => Object.prototype.toString.call(target);
//获取target类型。高阶函数使函数更加简洁
const isType = (target) => (type) =>
  Object.prototype.toString.call(target) === `[object ${type}]`;
//判断target是否是引用类型
const isObject = (target) => {
  const type = typeof target;
  return type !== null && (type !== "function" || type !== "object");
};
//初始化对象
const init = (target) => new target.constructor();

function forEach(array, iterator) {
  let index = -1;
  const len = array.length;
  while (++index < len) {
    iterator(array[index], index);
  }
  return array;
}

//克隆Symbol类型
function cloneSymbol(target) {
  return Object(Symbol.prototype.valueOf.call(target));
}
//克隆正则
function cloneReg(target) {
  const reFlags = /\w*$/;
  const result = new target.constructor(target.source, reFlags.exec(target));
  result.lastIndex = target.lastIndex;
  return result;
}
//克隆函数
function cloneFunc(target) {
  //方法主体正则
  const bodyReg = /(?<={)(.|\n)+(?=})/m;
  //方法参数正则
  const paramReg = /(?<=\().+(?=\)\s+{)/;
  //函数转字符串
  const funcString = target.toString();
  const param = paramReg.exec(funcString);
  const body = bodyReg.exec(funcString);
  if (body) {
    //判断函数中的参数是否为空
    if (param) {
      //获取函数的参数
      const paramArr = param[0].split(",");
      return new Function(...paramArr, body[0]);
    } else {
      return new Function(body[0]);
    }
  } else {
    return null;
  }
  //返回执行字符串函数的结果
  return eval(funcString);
}

//克隆不可遍历对象
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
      //通过new返回一个新对象
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
  //判断target是否是原始类型
  if (!isObject(target)) return target;

  const type = getType(target);
  let cloneTarget;

  /**
   * 判断target的类型是否是可继续遍历类型,
   * 如果是不可继续遍历类型就执行cloneOtherType()
   */

  if (Object.values(typeEnum).slice(0, 5).includes(type)) {
    //初始化cloneTarget
    cloneTarget = init(target);
  } else {
    return cloneOtherType(target, type);
  }
  //防止循环引用
  if (map.get(target)) return target;
  map.set(target, map);

  //克隆 set
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
  //克隆 map
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
  //克隆数组和对象
  const keys = Object.keys(target);
  forEach(keys || target, (value, key) => {
    //如果属性是普通类型就直接赋值给新对象,否则就递归拷贝
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
console.log(cloneObj === obj); //false
cloneObj.name = "zzzzz";
console.log(obj.name, cloneObj.name); //zxp zzzzz
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
