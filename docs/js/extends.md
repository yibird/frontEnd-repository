### 1.原型链继承

继承的本质就是复制,即重写原型对象,代之以一个新类型的实例。原型链继承是基于 JS 原型机制实现的继承方式,在原型机制中构造函数、原型和实例之间的关系为:每个构造函数都有一个原型对象,原型对象都包含一个指向构造函数的指针,而实例都包含一个原型对象的指针,即`原型对象.constructor === 构造函数`,`实例对象.prototype === 其原型对象`。

```js
// 创建父函数
function Super() {
  this.name = "super";
}
// 在父函数的原型上创建方法
Super.prototype.getName = function () {
  return this.name;
};
// 创建子函数
function Sub() {
  this.subName = "sub";
}
/*
 * 关键:创建Super的实例,并将该实例赋值给Sub.prototype,于是Sub的实例就拥有了Super实例和原型上的方法与属性
 */
Sub.prototype = new Super();

// 在子函数原型上创建方法
Sub.prototype.getSubName = function () {
  return this.subName;
};
// 实例化子函数
var instance = new Sub();
// 此方法继承自Super原型上的getName()
console.log(instance.getName()); // super
console.log(instance.getSubName()); // sub
```

原型链方案存在的缺点:多个实例对引用类型的操作会被篡改。

```js
function Super() {
  this.languages = ["Java", "JavaScript", "Go"];
}
function Sub() {}
Sub.prototype = new Super();

// 创建实例1
var sub01 = new Sub();
sub01.languages.push("Rust");
console.log(sub01.languages); // ["Java", "JavaScript", "Go", "Rust"]

// 创建实例2
var sub02 = new Sub();
// 由于实例1修改了父函数的引用数据,导致影响了实例2
console.log(sub02.languages); // ["Java", "JavaScript", "Go", "Rust"]
```

### 2.构造函数继承

使用父类的构造函数来增强子类实例,等同于复制父类的实例给子类(不使用原型)。

```js
function Super() {
  this.languages = ["Java", "JavaScript", "Go"];
}
function Sub() {
  /*
   * 核心代码:调用父类构造函数,Super函数中的this指向Sub构造函数的实例,于是Sub的每个实例都会
   * 将Super中的属性复制一份,但无法复制Super原型上的属性和方法
   */
  Super.call(this);
}
var sub01 = new Sub();
sub01.languages.push("Rust");
console.log(sub01.languages); // ["Java", "JavaScript", "Go", "Rust"]

var sub02 = new Sub();
console.log(sub02.languages); // ['Java', 'JavaScript', 'Go']
```

构造函数核心在于`SuperType.call(this)`,创建子类构造函数时调用父类构造函数绑定 this,父类函数的 this 指向子类函数的实例,即 Sub 的每个实例都会单独将 Super 中的属性复制一份,因此多个实例对引用类型的操作不会被篡改,子类从父类所继承的属性均挂载在单独的实例上。构造函数继承的缺点:

- 只能继承父类的实例属性和方法,不能继承父类原型上的属性和方法。
- 无法实现复用,每个子类都有父类实例函数的副本,影响性能。

### 3.组合继承

组合继承是原型链继承与构造函数继承的组合,用原型链实现对原型属性和方法的继承,用借用构造函数技术来实现实例属性的继承。

```js
function Super(name) {
  this.name = name;
  this.languages = ["Java", "JavaScript", "Go"];
}
// 在Super原型上创建函数
Super.prototype.getName = function () {
  return this.name;
};

function Sub(name, age) {
  // 第二次调用Super(),构造函数继承:继承Super实例上的属性和函数
  Super.call(this, name);
  this.age = age;
}
// 第一次调用Super(),原型链继承:子类原型指向父类实例,子类就可以继承父类原型和实例上的函数与属性
Sub.prototype = new Super();
/*
 * 重写子类构造函数。由于Sub.prototype = new Super() 子类原型链接到父类实例,此时子类的钩子函数指向
 * 父类的构造函数,即Sub.prototype.constructor === Super,当使用new操作符对子类(Sub)进行初始化时,
 * 是不会执行Sub()的,Sub()中的构造函数继承也无法被执行,所以需要将子类原型上的构造函数链接到子类构造函数,
 * 即Sub.prototype.constructor = Sub
 */
Sub.prototype.constructor = Sub;

Sub.prototype.getAge = function () {
  return this.age;
};
var instance01 = new Sub("haha", 20);
instance01.languages.push("Rust");
console.log(instance01.languages); // ["Java", "JavaScript", "Go", "Rust"]
console.log(instance01.getName()); // "haha"
console.log(instance01.getAge()); // 20

var instance02 = new Sub("hehe", 22);
console.log(instance02.languages); // ["Java", "JavaScript", "Go"]
console.log(instance02.getName()); // "hehe"
console.log(instance02.getAge()); // 22
```

组合式继承缺点:

- 第一次调用 SuperType():给 Sub.prototype 写入两个属性 name 和 languages。
- 第二次调用 SuperType():给 instance1 写入两个属性 name 和 languages。
  实例对象 instance1 上的两个属性就屏蔽了其原型对象 Sub.prototype 的两个同名属性。所以，组合模式的缺点就是在使用子类创建实例对象时,其原型中会存在两份相同的属性/方法。

### 4.原型式继承

原型式继承实现是利用一个空对象作为中介,将某个对象直接赋值给空对象构造函数的原型。

```js
/*
 * object()对传入其中的对象执行了一次浅复制,将构造函数F的原型直接指向传入的对象。
 * 可用ES5 Object.create() 代替 object()
 */
function object(obj) {
  function F() {}
  F.prototype = obj;
  return new F();
}
var person = {
  name: "Nicholas",
  friends: ["Shelby", "Court", "Van"],
};
var p1 = object(person);
p1.name = "Greg";
p1.friends.push("Rob");

var p2 = object(person);
p2.name = "Linda";
p2.friends.push("Barbie");

console.log(person.friends); // ['Shelby', 'Court', 'Van', 'Rob', 'Barbie']
```

原型式缺点:

- 原型链继承多个实例的引用类型属性指向相同,存在篡改的可能。
- 无法传递参数。

### 5.寄生式继承

寄生式继承实现核心在于原型式继承的基础上,增强对象,返回构造函数。

```js
function object(obj) {
  function F() {}
  F.prototype = obj;
  return new F();
}
// createAnother函数的主要作用是为构造函数新增属性和方法,以增强函数
function createAnother(original) {
  // 通过object()创建一个新的对象
  var clone = object(original);
  // 在新创建的对象编写属性增强该对象
  clone.sayHi = function () {
    console.log("hello");
  };
  return clone;
}

var person = {
  name: "Nicholas",
  friends: ["Shelby", "Court", "Van"],
};
var p = createAnother(person);
p.sayHi(); // "hello"
```

寄生式继承与原型式继承具有相同的缺点:

- 原型链继承多个实例的引用类型属性指向相同,存在篡改的可能。
- 无法传递参数

### 6.寄生组合式继承(ES5 推荐继承方案)

寄生组合式继承实现原理是结合借用构造函数传递参数和寄生模式实现继承。

```js
function inheritPrototype(supers, sub) {
  // 创建父函数原型的副本
  var prototype = Object.create(supers.prototype);
  // 增强对象,弥补因重写原型而失去的默认的constructor 属性
  prototype.constructor = supers;
  // 指定对象,将新创建的对象赋值给子类的原型
  sub.prototype = prototype;
}

function Super(name) {
  this.name = name;
  this.languages = ["Java", "JavaScript", "Go"];
}
Super.prototype.getName = function () {
  return this.name;
};
// 借用构造函数传递增强子类实例属性(支持传参和避免篡改)
function Sub(name, age) {
  Super.call(this, name);
  this.age = age;
}
// 将父类原型指向子类
inheritPrototype(Super, Sub);

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

寄生组合式继承的高效率体现在它只调用了一次父类构造函数(即只调用一个一次 Super 构造函数),并且因此避免了在 Sub.prototype 上创建不必要的、多余的属性。于此同时,原型链还能保持不变;因此,还能够正常使用 instanceof 和 isPrototypeOf()。寄生组合式继承是 ES6 最成熟的继承方式,也是现在库实现的方法。

### 7.混入方式继承多个对象

```js
function SuperClass() {
  this.name = "super";
}
SuperClass.prototype.getName = function () {
  return this.name;
};
function OtherSuperClass() {
  this.otherName = "otherName";
}
OtherSuperClass.prototype.getOtherName = function () {
  return this.otherName;
};

function MyClass() {
  SuperClass.call(this);
  OtherSuperClass.call(this);
}
// 继承SuperClass类
MyClass.prototype = Object.create(SuperClass.prototype);
/*
 * 核心代码:混合继承其他类,Object.assign()会把OtherSuperClass的原型合并到MyClass的原型上,
 * 等同于MyClass原型上拥有了OtherSuperClass原型上的方法与属性。
 */
Object.assign(MyClass.prototype, OtherSuperClass.prototype);
// 重新指定constructor
MyClass.prototype.constructor = MyClass;
MyClass.prototype.hello = function () {};

var my = new MyClass();
console.log(my.getName()); // "super"
console.log(my.getOtherName()); // "otherName"
```

Object.assign 会把 OtherSuperClass 原型上的函数拷贝到 MyClass 原型上,使 MyClass 的所有实例都可用 OtherSuperClass 的方法。

### 8.ES6 类继承 extends

extends 关键字由 ES6 提供,主要用于类声明或者类表达式中,以创建一个类,该类是另一个类的子类。其中 constructor 表示构造函数，一个类中只能有一个构造函数,有多个会报出 SyntaxError 错误,如果没有显式指定构造方法,则会添加默认的 constructor 方法。

```js
class Animal {
  // 构造函数
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  get getName() {
    return this.name;
  }
  describe() {
    console.log(`name:${this.name},age:${this.age}`);
  }
}
var animal = new Animal("动物", 100);
console.log(animal.getName); // "动物"

// Dog类继承Animal类
class Dog extends Animal {
  constructor(name, age) {
    // 如果子类中存在构造函数,则需要通过super()调用父类构造函数
    super(name, age);
  }
  dogDescribe() {
    console.log(`name:${this.name},age:${this.age}`);
  }
}
var dog = new Dog("大黄", 5);
console.log(dog.getName); // "大黄"
console.log(dog.describe());
```

extends 继承的核心代码如下,其实现和上述的寄生组合式继承方式一样:

```js
function _inherits(supers, sub) {
  /*
   * (1).创建一个对象,创建父类原型副本。
   * (2).增强对象,弥补因重写原型而失去的默认的constructor 属性
   * (3).指定对象,将新创建的对象赋值给子类的原型
   */
  sub.prototype = Object.create(supers && supers.prototype, {
    constructor: {
      value: sub,
      enumerable: false,
      writable: true,
      configurable: true,
    },
  });
  // 链接
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

### 9.总结

(1).函数声明和类声明的区别。函数声明会提升,类声明不会。首先需要声明你的类,然后访问它,否则像下面的代码会抛出一个 ReferenceError。

```js
let p = new Rectangle();
// ReferenceError
class Rectangle {}
```

(2).ES5 继承和 ES6 继承的区别:

- ES5 的继承实质上是先创建子类的实例对象,然后再将父类的方法添加到 this 上(Parent.call(this))。

- ES6 的继承有所不同,实质上是先创建父类的实例对象 this,然后再用子类的构造函数修改 this。因为子类没有自己的 this 对象,所以必须先调用父类的 super()方法,否则新建实例报错。
