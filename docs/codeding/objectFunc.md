## 1.Object.create()

Object.create(proto,propertiesObject?)用于创建一个新对象,允许接收一个对象为参数,使用参数来提供新创建的对象的`__proto__`(会返回一个新对象,带着指定的原型对象和属性)。proto 为新创建对象的原型对象,propertiesObject 用来给新创建的对象添加可枚举属性,与 Object.defineProperies 方法第二个参数用法一样。

**Object.create(null)与{}的区别在于:Object.crete(null)会返回一个纯净的对象,不会继承 Object 原型上的函数或属性,从而避免属性或函数的覆盖。即使用 Object.create(null)创建后对象的`__proto__`为 undefined,所以无法使用 Object 上的 toString、valueof 等函数,相比较{}会继承 Object 原型上的函数或属性,Object.create(null)创建对象的方式更为纯净。**

实现 Object.create()的关键步骤在于:创建一个新函数,将参数链接到函数的原型上,然后将函数实例化。此时函数的实例也拥有了对象参数的属性或方法。

```js
// 实现Object.create(),暂不考虑第二个参数
function create(proto) {
  const isObject = typeof proto === 'object' || typeof proto === 'function'
  // (1).参数检查。create() 仅支持传入对象或函数类型的参数
  if (typeof proto === undefined || !isObject) {
    throw new TypeError(`Object prototype may only be an Object or null: ${proto}`)
  }
  // (2).创建一个函数
  function F() {}
  /*
   * (3).将参数连接到新创建的函数原型上,函数的原型继承了proto上的属性和函数。
   */
  F.prototype = proto

  /*
   * 注意:MDN上create() polyfill 并未对传入的参数为null做处理,这是因为es5版本的限制,
   * 所以手写的create(null)与Object.create(null)是有差异的,
   * 手写的create(null)创建出来的对象不是一个纯净的对象
   */
  // (4).返回函数实例化的对象
  return new F()
}

// 测试
function Base() {
  this.name = 'z乘风'
}
Base.age = 18
Base.prototype.say = function () {
  return 'hello'
}

const obj = create(Base)
console.log(obj.__proto__ === Base) // true
```

## 2.Object.freeze()

Object.freeze()用于冻结一个对象,接收一个对象作为参数,返回被冻结后的对象,冻结后的对象不能被修改,不能添加新属性,不能删除已有属性,不能修改该对象已有属性的可枚举性、可配置性、可写性,以及不能修改已有属性的值,被冻结对象的原型也不能被修改。freeze()实现原理是:**使用 Object.seal()密封对象,使得被密封对象不可删除属性、添加新属性,使用 Object.defineProperty()将对象属性配置为不可写,对于对象嵌套使用递归实现深层次的冻结。**在 Vue 或 Vuex 中如果对于 data 或 vuex 里使用 freeze 冻结了的对象,vue 不会做 getter 和 setter 的转换。如果有一个巨大数组且确信不会发生变化,使用 Object.freeze()可以让性能大幅提升。

```js
// freeze简单实现
function freeze(obj) {
  // 判断是否是对象
  if (obj instanceof Object) {
    // 使用seal()密封一个对象不可添加属性、不能删除属性
    obj = Object.seal(obj)
    // 遍历对象,key为遍历对象的key
    for (let key in obj) {
      // hasOwnProperty()返回一个布尔值,判断对象自身属性中是否具有指定的属性
      if (obj.hasOwnProperty(key)) {
        // 利用defineProperty对对象的属性进行配置
        Object.defineProperty(obj, key, {
          writable: false, // 设置属性不可写
        })
        // 如果对象嵌套对象,那么使用递归实现更深层次的冻结
        if (obj[key] instanceof Object) {
          freeze(obj[key])
        }
      }
    }
    return obj
  } else {
    throw new TypeError('obj not an object')
  }
}

// Object.freeze()例子
const obj = { name: 'z乘风', age: 18, city: '鸡城' }
const newObj = Object.freeze(obj)
newObj.name = 'zxp'
console.log(newObj) // {name: "z乘风", age: 18, city: "鸡城"} 无法修改属性值
delete newObj.city // false 无法删除属性
newObj['like'] = '美女'
console.log(newObj) // {name: "z乘风", age: 18, city: "鸡城"} 无法添加属性值

// 手写freeze()例子
const obj = { name: 'z乘风', age: 18, city: '鸡城' }
const newObj = freeze(obj)
newObj.name = 'zxp'
console.log(newObj) // {name: "z乘风", age: 18, city: "鸡城"}
delete newObj.city // false
newObj['like'] = '美女'
console.log(newObj) // {name: "z乘风", age: 18, city: "鸡城"}
```

## 3.Object.assign()

Object.assign(target,...sources) 方法用于将所有可枚举属性的值从一个或多个源对象分配到目标对象,它将返回目标对象。
如果目标对象中的属性具有相同的键,则属性将被源对象中的属性覆盖,后面的源对象的属性将类似地覆盖前面的源对象的属性。所以 Object.assign()一般用于对象浅合并,它只会合并第一层的属性。

Object.assign()原理是通过遍历需要合并对象数组,挨个遍历合并对象,将合并对象的 key 和对应 value 赋值给 target 对象。

```js
// 不支持 symbol 属性,由于 ES5 中本来就不存在 symbols
Object.myAssign = function (target, sources) {
  // 为null抛出异常
  if (target === null) throw new TypeError('Cannot convert undefined or null to object')
  /**
   * 通过Object构造函数将target包装成一个新对象,Object()包装对象特点:
   * (1).如果包装值是null或undefined会返回一个空对象,否则它将返回一个包装值相对应的类型的对象。
   * (2).如果包装值是一个已经存在的对象,则会返回这个已经存在的值(相同地址)。
   *
   * Object()包装target的优点是无论target为任何类型Object()都会将其包装成一个
   * 新对象,避免target类型的验证。
   */
  var to = Object(target)

  for (let i = 1, len = arguments.length; i < len; i++) {
    const nextSource = arguments[i]
    // 如果未定义或为空,则跳过合并
    if (nextSource != null) {
      /**
       * 遍历nextSource,这里通过for in 判断nextSource的类型,只有Object和String类型才会执行for in。
       * 通过Object.prototype.hasOwnProperty.call(obj,prop)用于检查obj对象中是否具有prop属性,
       * 避免判断nextSource为String类型。如果其结果为true,说明nextSource是Object类型且
       * 包含nextKey属性,此时将key和对应值赋给to,to与nextSource相同的属性就会被后者覆盖
       */
      for (let nextKey in nextSource) {
        // 判断nextSource是否存在nextKey,若存在则赋值
        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
          to[nextKey] = nextSource[nextKey]
        }
      }
    }
  }
  return to
}
const a = { name: '哈哈', user: { age: 10, obj: { name: '小白' } } }
const b = { name: '呵呵', user: { obj: { name: '小黑' } } }
const mergeObj = Object.myAssign(a, b)
console.log(mergeObj) // { name: '呵呵', user: { obj: { name: '小黑' } } }
```

## 4.deepAssign()

deepmerge()用于深度合并对象。原理是遍历合并对象判断 target 的属性对应值是否是对象,若是对象则递归合并,否则直接赋值。

```js
Object.deepmerge = function (target, source) {
  for (let key in source) {
    target[key] =
      target[key] && typeof target[key].toString() === '[object Object]'
        ? Object.deepmerge(target[key], source[key])
        : (target[key] = source[key])
  }
  return target
}
const a = { name: '哈哈', user: { age: 10, obj: { name: '小白' } } }
const b = { name: '呵呵', user: { obj: { name: '小黑' } } }
const mergeObj = Object.deepmerge(a, b)
console.log(mergeObj)
```

## 5.判断纯对象

在 JavaScript 中,"纯对象"通常指的是普通的、没有特殊类型或原型链的对象。纯对象没有通过构造函数创建(不是数组、函数、正则表达式等特殊类型),也没有被赋予自定义的原型链属性。它是最基本的对象类型,通常由对象字面量或 Object.create(null)创建。

```js
function isPlainObject(obj) {
  // 不是对象或是 null,则不是纯对象
  if (typeof obj !== 'object' || obj === null) {
    return false
  }

  // 通过迭代获取对象的原型链,并将最终的原型
  let proto = obj
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto)
  }

  /*
   * 将最终的原型(Object.prototype)与对象的原型比较,如果它们相等,
   * 那么对象的原型链上没有其他自定义原型,因此它是一个纯对象
   */
  return Object.getPrototypeOf(obj) === proto
}
```
