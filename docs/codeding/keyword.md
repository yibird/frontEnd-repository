## 1.手写 instanceof

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

虽然 instanceof 操作符可以用来检查一个对象是否是某个构造函数或其原型链的实例,但它也有一些缺点,包括以下几点：

- 只能用于检查对象是否是某个构造函数或其原型链的实例。如果要检查一个对象是否是其他类型的实例(如字符串或数字),则需要使用其他方法。
- 不能检查一个对象是否实现了某个接口。JavaScript 本身不支持接口的概念,但可以通过代码约定来实现类似于接口的功能。instanceof 操作符不能检查一个对象是否符合某个接口的约定。
- 在多重继承的情况下,instanceof 操作符可能会出现意外的行为。当一个对象的原型链上存在多个构造函数时,instanceof 操作符只会检查第一个构造函数，而忽略其他构造函数。这可能会导致意外的行为。
- instanceof 操作符无法直接检查一个对象是否是字面量创建的。在 JavaScript 中,当创建一个字面量对象时,实际上是通过其构造函数 Object() 隐式创建的。

```js
const obj = { foo: "bar" };
console.log(obj instanceof Object); // true
```

使用 instanceof 来检查 obj 是否是 Object 类型的实例,它将返回 true,因此,instanceof 操作符只能检查一个对象是否是通过其构造函数创建的实例,而不能直接检查一个对象是否是字面量创建的。

## 2.手写 new

new 的作用是实例化对象,使用 new 时其工作流程如下:

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

## 3.手写 let 和 const

`let`和`const`是 ES6 提供了用于声明变量的关键字,相比较`var`它们都具有独立的块作用域,在 let、const 声明的变量前访问变量就会出现暂时性死区错误,而 var 支持函数提升和变量提升。

let 实现原理:通过立即执行函数创建一个独立的块作用域,将 let 声明放入立即执行函数中,就不会造成变量污染。

const 实现原理:const 用于声明一个只读的常量,一旦声明,常量的值就不能改变。可以通过 Object.defineProperty()对定义变量进行劫持,并设置该变量不可枚举(无法通过 for in 或 Object.keys()返回属性)、不可配置(无法被删除修改),当设置值会触发 set(),如果新设置的值与定义的值不同则抛出错误。最后通过立即执行函数创建一个独立作用域。

```ts
// 模拟let
(function () {
  var name = "xxx";
  console.log(name); // "xxx"
})();
console.log(name); // undefined
```

```ts
// 模拟const
function _const(key, value) {
  // 将变量名挂载到一个对象上
  this.data = value;
  // 劫持变量名set
  Object.defineProperty(this.data, key, {
    // 是否能通过for in 循环返回属性
    enumerable: false,
    // 当configurable为false表示属性不能被改变,且不能被删除
    configurable: false,
    // 获取属性值函数
    get() {
      return value;
    },
    // 设置属性值函数
    set(newVal) {
      if (value !== newVal) {
        throw new TypeError("Assignment to constant variable.");
      }
      return value;
    },
  });
}

(function () {
  const obj = {};
  var name = _const.call(obj, "name", "zchengfeng");
  console.log(name); // "zchengfeng"
})();
console.log(name); // undefined
```

## 4.手写 extends

继承是面向对象的三大特征之一,在 ES6 前并未提供继承关键字,需要通过原型机制自行实现继承。而在 ES6 后提供了`extends`关键字用于继承父类,其底层基于寄生组合式继承方式实现。

```js
function _inherits(supers, sub) {
  /*
   * (1).创建一个对象,创建父类原型副本。
   * (2).增强对象,弥补因重写原型而失去的默认的constructor 属性。
   * (3).链接对象,将新创建的对象链接到子类的原型。
   */
  sub.prototype = Object.create(supers && supers.prototype, {
    constructor: {
      value: sub,
      enumerable: false,
      writable: true,
      configurable: true,
    },
  });
  // 链接,将父类链接到子类的原型上(即__proto__)
  if (supers) {
    Object.setPrototypeOf
      ? Object.setPrototypeOf(sub, supers)
      : (sub.__proto__ = supers);
  }
}

function Super(name) {
  this.name = name;
  this.languages = ["Java", "JavaScript", "Go"];
}
Super.prototype.getName = function () {
  return this.name;
};
function Sub(name) {
  Super.call(this, name);
}

// 将父类原型指向子类
_inherits(Super, Sub);

// 新增子类原型属性
Sub.prototype.getName = function () {
  return this.age;
};

var instance1 = new Sub("haha", 20);
var instance2 = new Sub("hehe", 22);

instance1.languages.push("Rust");
console.log(instance1.languages); // ['Java', 'JavaScript', 'Go', 'Rust']

instance2.languages.push("TypeScript");
console.log(instance2.languages); // ['Java', 'JavaScript', 'Go', 'TypeScript']
```
