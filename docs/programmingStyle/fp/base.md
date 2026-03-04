应用程序的流程走向被称为控制流,在命令式编程范式中通常使用 for、if、return、breack、continue 等语句来控制应用的走向,但在函数式编程范式中抽象作用在数据上的控制流和操作,函数式编程推荐将任务拆分为多个函数,通过将这些函数组合或链接来解决问题。

### 1.方法链和函数链

### 2.数据操作抽象

#### 2.1 map 转换数据

map(也称为 collect)是一个高阶函数能够将一个迭代数据有序地应用于一个数组中的每个元素,并返回一个长度相等的新数组。map 通常用于数据的转换或数据的映射,例如在好友列表中提取每个好友的名字。

```javascript
const friends = [
  {
    id: 1,
    name: 'zhangsan',
    age: 18,
    address: 'shenzheng',
  },
  {
    id: 2,
    name: 'lisi',
    age: 62,
    address: 'beijing',
  },
  {
    id: 3,
    name: 'wuwang',
    age: 32,
    address: 'shanghai',
  },
  {
    id: 4,
    name: 'laoliu',
    age: 21,
    address: 'shanghai',
  },
]

// 命令式解法
const result = []
for (let i = 0, len = friends.length; i < len; i++) {
  if (friends[i]) {
    result.push(friends[i].name)
  }
}
console.log(result) // ['zhangsan', 'lisi', 'wuwang', 'laoliu']

// 函数解法,map()简化了代码
friends.map((item) => (item ? item.name : '')) // ['zhangsan', 'lisi', 'wuwang', 'laoliu']
```

```javascript
/*
 * map实现,该实现未对arr和fn做类型检查,map应挂载到Array.prototype。
 * - arr:被映射的数组。
 * - fn:迭代方法。fn支持item(遍历元素)、index(遍历元素下标)、array(操作数组)三个入参。
 */
function map(arr, fn) {
  let index = 0,
    len = arr.length,
    result = new Array(len)
  while (index < len) {
    result[index] = fn(arr[index], index, arr)
    index++
  }
  return result
}

// ['zhangsan', 'lisi', 'wuwang', 'laoliu']
console.log(map(friends, (item) => (item ? item.name : '')))
```

map 只有从左遍历到右的操作,对于从右到左的遍历,需要反转数组在遍历,由于 JS 中的 Array.reverse()操作数组后会改变原数组,从而破坏函数的纯度,推荐自定义 reverse()或使用 lodash 中的 reverse()。

```javascript
/*
 * 实现reverse反转数组。
 * - arr:需要迭代的数组。
 */
function reverse(arr) {
  let index = 0
  const len = arr.length,
    result = new Array(len)
  for (let i = len - 1; i >= 0; i--) {
    result[index++] = arr[i]
  }
  return result
}

// ['laoliu', 'wuwang', 'lisi', 'zhangsan']
console.log(reverse(friends).map((item) => (item ? item.name : '')))
```

#### 2.2 filter 过滤数据

filter(也称为 select)是一个能够遍历数组中的元素并返回一个新子集数组的高阶函数,filter 接收一个谓词函数做为参数,filter 返回的数组由谓词函数计算得出的 true 值结果来确定。例如过滤年龄大于 30 的好友列表。

```javascript
const friends = [
  {
    id: 1,
    name: 'zhangsan',
    age: 18,
    address: 'shenzheng',
  },
  {
    id: 2,
    name: 'lisi',
    age: 62,
    address: 'beijing',
  },
  {
    id: 3,
    name: 'wuwang',
    age: 32,
    address: 'shanghai',
  },
  {
    id: 4,
    name: 'laoliu',
    age: 21,
    address: 'shanghai',
  },
]

/* 过滤小于30岁的人员
 [
	{id: 2, name: 'lisi', age: 62, address: 'beijing'},
	{id: 3, name: 'wuwang', age: 32, address: 'shanghai'}
 ]
 */
console.log(friends.filter((item) => item.age > 30))

/*
 * filter实现,filter用户数据的过滤操作。
 * - arr:被迭代的数组。
 * - predicate:被迭代执行的谓词函数。predicate支持item(遍历元素)、index(遍历元素下标)、
 * array(操作数组)三个入参。
 */
function filter(arr, predicate) {
  const len = arr.length,
    result = []
  let index = -1
  while (++index < len) {
    const value = arr[index]
    // 当谓词函数执行结果为true时result才会追加元素
    if (predicate(value, index, arr)) {
      result.push(value)
    }
  }
  return result
}

/*
 [
	{id: 2, name: 'lisi', age: 62, address: 'beijing'},
	{id: 3, name: 'wuwang', age: 32, address: 'shanghai'}
 ]
 */
console.log(filter(friends, (item) => item.age > 30))
```

#### 2.3 reduce 收集结果

高阶函数 reduce 用于将一个数组的元素精简为单一的值,该值是由每个元素与累积值通过一个函数计算得出。例如统计好友列表中所有人的年龄总和。

```javascript
const friends = [
  {
    id: 1,
    name: 'zhangsan',
    age: 18,
    address: 'shenzheng',
  },
  {
    id: 2,
    name: 'lisi',
    age: 62,
    address: 'beijing',
  },
  {
    id: 3,
    name: 'wuwang',
    age: 32,
    address: 'shanghai',
  },
  {
    id: 4,
    name: 'laoliu',
    age: 21,
    address: 'shanghai',
  },
]

// 统计好友列表中所有人的年龄总和
console.log(friends.reduce((acc, item) => acc + item.age, 0)) // 133

/*
 * reduce用于收集数据。
 * - arr:被迭代的数组。
 * - fn:被迭代执行的函数。该函数接收累积值、当前迭代元素、当前迭代元素下标、数组本身四个参数。
 * - accumulator:累加器。累积初始值,之后会用于存在每次迭代函数的计算结果,并不断被传入子
 * 函数中。
 */
function reduce(arr, fn, accumulator) {
  let index = -1
  const len = arr == null ? 0 : arr.length
  // 如果未传入累加器初始值时,则使用数组中的第一个元素作为默认值
  if (typeof accumulator === 'undefined' && len > 0) {
    accumulator = arr[++index]
  }
  while (++index < len) {
    accumulator = fn(accumulator, arr[index], index, arr)
  }
  return accumulator
}

console.log(reduce(friends, (acc, item) => acc + item.age, 0)) // 133
```

reduce 只能从左遍历到右的数据收集操作,而 reduceRight 函数提供了从右到左的数据收集操作。

```javascript
function reduceRight(arr, fn, accumulator) {
  let len = arr == null ? 0 : arr.length
  if (typeof accumulator === 'undefined' && len) {
    accumulator = arr[--len]
  }
  while (len--) {
    accumulator = fn(accumulator, arr[len], len, arr)
  }
  return accumulator
}
// 反向拼接好友列表中所有人的名称

// 'zhouchengfeng-laoliu-wuwang-lisi-zhangsan'
console.log(reduceRight(friends, (acc, item) => `${acc}-${item.name}`, 'zhouchengfeng'))
```

#### 2.4 find 查找数据

find 是一个能够遍历数组中的元素,find 接收一个谓词函数,find 会根据谓词函数的结果值查找数组的元素,如果遍历所有元素仍未查找到元素则返回 undefined。例如查找年龄为 18 的好友。

```javascript
const friends = [
  {
    id: 1,
    name: 'zhangsan',
    age: 18,
    address: 'shenzheng',
  },
  {
    id: 2,
    name: 'lisi',
    age: 62,
    address: 'beijing',
  },
  {
    id: 3,
    name: 'wuwang',
    age: 32,
    address: 'shanghai',
  },
  {
    id: 4,
    name: 'laoliu',
    age: 21,
    address: 'shanghai',
  },
]
// {id: 1, name: 'zhangsan', age: 18, address: 'shenzheng'}
console.log(friends.find((item) => item.age === 18))

/*
 * filter用于查找数据
 * - arr:被迭代的数组。
 * - predicate:谓词函数,find将根据谓词的结果值查找元素,谓词函数接收当前迭代元素、当前元素
 * 索引和数组三个参数。
 * - fromIndex:开始搜索的索引位置,默认为0。
 */
function find(arr, predicate, fromIndex) {
  let index = (fromIndex || 0) - 1
  const len = arr == null ? 0 : arr.length - fromIndex
  while (index++ < len) {
    if (predicate(arr[index], index, arr)) {
      return arr[index]
    }
  }
  return
}

// {id: 1, name: 'zhangsan', age: 18, address: 'shenzheng'}
console.log(find(friends, (item) => item.age === 18, 0))
console.log(find(friends, (item) => item.age === 18, 1)) // undefined
```

### 3.chain 函数链和惰性求值

命令式编程的缺点是现定于高效地解决某个特点的问题,相比较函数式编程抽象层次更低,代码可重用性更差,出现错误的复杂性和可能性概率更大。函数式编程采用链式调用使代码更加简洁易读,而级联排列的函数调用可以使代码可读性更好,例如 webpack-chain 支持以函数链形式编写 webpack 配置。**chain 函数可以添加一个输入对象的状态,从而能够从这些输入转换为所需输出的操作链接在一起,简单来说 chain 函数接收一个输入状态,且可以链接操作该状态的函数**。chain 函数优点如下:

- **链接输入状态的操作函数**。可以避免创建任何变量,且可以有效地消除所有循环。
- **支持惰性计算以减少函数的执行次数**。惰性计算优化并不会减少函数执行所需耗时,但可以消除不必要的函数调用。例如使用 lodash 中的 chain()函数创建惰性函数,在调用 value()前并不会真正的执行任何操作,对比普通的链式调用减少了执行次数。

```javascript
import _ from 'lodash-es'
const friends = [
  {
    id: 1,
    name: 'zhangsan',
    age: 18,
    address: 'shenzheng',
  },
  {
    id: 2,
    name: 'lisi',
    age: 62,
    address: 'beijing',
  },
  {
    id: 3,
    name: 'wuwang',
    age: 32,
    address: 'shanghai',
  },
  {
    id: 4,
    name: 'laoliu',
    age: 21,
    address: 'shanghai',
  },
]
function isValid(item) {
  return item ? item.name.trim().length > 0 : false
}

// chain()用于创建一个lodash包装实例,包装value以启用显式链模式,解除函数链必须使用_.value()。
// 创建惰性计算函数链处理指定数组
const result = _.chain(friends)
  // 根据谓词函数过滤数据
  .filter(isValid)
  // 根据age属性对数据进行排序
  .sortBy('age')
  // 数据映射处理
  .map((item) => `S001-${item.name}`)
  // 获取数据
  .values()
  // 反转数据
  .reverse()
  // 获取数据中第一条数据
  .first()
  // 解除绑定,获取函数链中函数的最终结果值。
  // 只有调用value()解除函数链绑定时,函数链中的函数才会被执行。
  .value()
console.log(result) // 'S001-lisi'
```

chain 简单实现(参考 lodash):

```javascript
;(function () {
  /** -------------- util function start  */
  // 判断val是否是对象,返回一个布尔值
  const isObject = (val) => val !== null && ['object', 'function'].includes(typeof val)
  // 判断value是否是函数,返回一个布尔值
  const isFunction = (val) => typeof val === 'function'
  // 获取对象中的所有属性(除了constructor属性),返回一个包含对象属性的数组
  const baseKeys = (object) => {
    const result = []
    for (var key in Object(object)) {
      if (Reflect.hasOwnProperty.call(object, key) && key != 'constructor') {
        result.push(key)
      }
    }
    return result
  }
  // 根据属性数组过滤指定对象对应为函数的属性
  const baseFunctions = (source, props) => {
    return props.filter((prop) => isFunction(source[prop]))
  }
  const copyArray = (arr) => arr.concat()
  const arrayPush = (arr, elements) => arr.concat(elements)
  /** -------------- util function end  */

  // 提供两个函数以便在函数链中使用,该函数需要挂载到lodash上
  const keys = (target) => Reflect.ownKeys(target)
  const slice = (arr, start, end) => arr.slice(start, end || arr.length)

  // 包装器将继承该函数的原型链
  function baseLodash() {}

  // 包装函数,用于包装数据
  function LodashWrapper(value, chainAll) {
    // 原始值
    this.__wrapped__ = value
    // 用于存储函数链上的函数,以便在调用value()执行函数链上的所有方法
    this.__actions__ = []
    this.__chain__ = !!chainAll
    // 函数链上函数的下标
    this.__index__ = 0
    this.__values__ = undefined
  }

  // 包装value,如果value是包装对象则直接返回,否则通过包装函数包装value
  function lodash(value) {
    if (isObject(value) && !Array.isArray(value)) {
      if (value instanceof LodashWrapper) {
        return value
      }
      if (Reflect.hasOwnProperty.call(value, '__wrapped__')) {
        throw new Error('no wrapperClone')
      }
    }
    return new LodashWrapper(value)
  }

  function chain(value) {
    var result = lodash(value)
    result.__chain__ = true
    return result
  }

  lodash.prototype = baseLodash.prototype
  lodash.prototype.constructor = lodash
  LodashWrapper.prototype.__proto__ = baseLodash.prototype

  // value()用于解除函数链,只有调用value()时函数链上的函数才会被执行
  lodash.prototype.value = function () {
    /**
     * 获取lodash函数的__actions__,__actions__存储着函数链上的所有函数,
     * 通过reduce遍历执行函数链上的函数,函数执行通过apply()执行,函数this指向
     * action.thisArg,每遍历执行都会将上一次函数执行的输出(result)会与
     * 当前函数的参数数组(action.args)进行合并作为函数的入参。
     */
    return this.__actions__.reduce(function (result, action) {
      return action.func.apply(action.thisArg, arrayPush([result], action.args))
    }, this.__wrapped__)
  }

  // 混入函数
  function mixin(object, source, options) {
    // 获取source对象上的所有属性
    let props = baseKeys(source),
      methodNames = baseFunctions(source, props)
    if (options == null && !(isObject(source) && (methodNames.length || !props.length))) {
      options = source
      source = object
      object = this
      methodNames = baseFunctions(source, baseKeys(source))
    }
    let chain = !(isObject(options) && 'chain' in options) || !!options.chain,
      isFunc = isFunction(object)

    // 遍历函数名称列表
    methodNames.forEach((methodName) => {
      // 获取执行函数
      let func = source[methodName]
      // 将执行函数挂载到object对象上
      object[methodName] = func
      // 如果object是一个函数,则将创建一个新函数用于调用执行函数,并挂载到object的原型上
      if (isFunc) {
        object.prototype[methodName] = function () {
          let chainAll = this.__chain__
          if (chain || chainAll) {
            let result = object(this.__wrapped__),
              actions = (result.__actions__ = copyArray(this.__actions__))
            actions.push({ func: func, args: arguments, thisArg: object })
            result.__chain__ = chainAll
            return result
          }
          // 执行函数,this指向object,执行value()会得到函数链最终输出,作为参数传入函数
          return func.apply(object, arrayPush([this.value()], arguments))
        }
      }
    })
    return object
  }

  // 在lodash函数上挂载keys、slice、chain函数
  Object.assign(lodash, { keys, slice, chain })

  // 混入,向lodash挂载keys, slice, chain等方法
  mixin(lodash, lodash)

  if (isObject(global)) {
    global._ = lodash
  } else {
    this._ = lodash
  }
}).call(this)

// 测试
const obj = { foo: 1, bar: 2, zoo: 3 }
console.log(_.chain(obj).keys().value()) // [ 'foo', 'bar', 'zoo' ]
```

### 4.递归

#### 4.1 尾递归
