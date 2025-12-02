## 1.创建数组的四种方式

### 1.1 字面量创建数组

```js
const arr = ['Java', 'JavaScript', 'Golang']
```

### 1.2 通过 Array 实例化数组

```js
const arr = Array('Java', 'JavaScript', 'Golang')
```

### 1.3 创建数组并赋值

```js
const arr = new Array()
arr[0] = 'Java'
arr[1] = 'JavaScript'
arr[2] = 'Golang'
```

### 1.4 通过 Array.of()创建数组

```js
const arr = Array.of('Java', 'JavaScript', 'Golang')
```

### 1.5 通过 Array.from()指定 length 属性生成数字序列

```js
/**
 * Array.from()可以指定length属性生成数字序列,生成后的数组元素都使用undefined初始化
 */
const arr = Array.from({ length: 3 })
console.log(arr) // [undefined,undefined,undefined]

// 通过Array.from()生成0到10(不含10)之间的数组
Array.from({ length: 10 }, (_, index) => index)
```

## 2.数组 Api

```js
/**
 * [
        at: ƒ at()
        concat: ƒ concat()
        constructor: ƒ Array()
        copyWithin: ƒ copyWithin()
        entries: ƒ entries()
        every: ƒ every()
        fill: ƒ fill()
        filter: ƒ filter()
        find: ƒ find()
        findIndex: ƒ findIndex()
        flat: ƒ flat()
        flatMap: ƒ flatMap()
        forEach: ƒ forEach()
        includes: ƒ includes()
        indexOf: ƒ indexOf()
        join: ƒ join()
        keys: ƒ keys()
        lastIndexOf: ƒ lastIndexOf()
        length: 0
        map: ƒ map()
        pop: ƒ pop()
        push: ƒ push()
        reduce: ƒ reduce()
        reduceRight: ƒ reduceRight()
        reverse: ƒ reverse()
        shift: ƒ shift()
        slice: ƒ slice()
        some: ƒ some()
        sort: ƒ sort()
        splice: ƒ splice()
        toLocaleString: ƒ toLocaleString()
        toString: ƒ toString()
        unshift: ƒ unshift()
        values: ƒ values()
        Symbol(Symbol.iterator): ƒ values()
        Symbol(Symbol.unscopables): {copyWithin: true, entries: true, fill: true, find: true, findIndex: true, …}
        [[Prototype]]: Object
    ]
 
 */
console.log(Array.prototype)
```

### 2.1 Array.prototype.at()

at(index):该方法接受一个整数值并返回该索引处的项目,允许正整数和负整数,负整数从数组中的最后一项开始计数,index 默认值为 0。

```js
const arr = ['Java', 'JavaScript', 'Golang', 'TypeScript', 'Shell']
console.log(arr.at()) // Java
console.log(arr.at(0)) // Java
console.log(arr.at(2)) // Golang
console.log(arr.at(-2)) // TypeScript
```

### 2.2 Array.prototype.concat()

concat(arr...):连接一个或多个数组,返回连接后的数组,不会改变原数组。

```js
const arr1 = [1, 2, 3]
const arr2 = [4, 5, 6]
const arr3 = [7, 8, 9]
console.log(arr1.concat(arr2, arr3), arr1) // [1,2,3,4,5,6,7,8,9] [1,2,3]

console.log(['Java', 'JavaScript'].concat(['Golang'], ['TypeScript'])) // ['Java','JavaScript','Golang','TypeScript']
```

### 2.3 Array.prototype.copyWithin()

copyWithin(target,start,end):将数组的一部分浅复制到同一数组中的另一个位置,并在不修改其长度的情况下返回它,此方法会改变原数组。

- target:将序列复制到的从零开始的索引。如果为负数,target 将从最后开始计数。如果 target 等于或大于 arr.length,则不会复制任何内容。如果 target 位于之后 start,复制的序列将被修剪以适应 arr.length。
- start(可选):从零开始复制元素的索引。如果为负数,start 将从最后开始计数。如果 start 省略,copyWithin 将从下标 0 复制。
- end(可选):从零开始的索引,从中结束复制元素。copyWithin 复制最大长度为数组.length,如果为负数,end 将从最后开始计数。如果 end 省略,copyWithin 将复制到最后一个索引(默认为 arr.length)。

```js
const arr = ['a', 'b', 'c', 'd', 'e']
// 复制arr从下标2到下标4的元素到数组的下标0
console.log(arr.copyWithin(0, 2, 4), arr) // ['c', 'd', 'c', 'd', 'e'] ['c', 'd', 'c', 'd', 'e']

console.log(['a', 'b', 'c', 'd', 'e'].copyWithin(2, 2, 4)) // ['a', 'c', 'd', 'd', 'e']
```

### 2.4 Array.prototype.entries()

entries():返回一个新的 Array Iterator 对象,该对象包含数组中每个索引的键/值对。

```js
const arr = ['Java', 'JavaScript', 'Golang']
const iterator = arr.entries()
console.log(iterator.next().value) // [0,'Java']
console.log(iterator.next().value) // [1,'JavaScript']

/*
 * 通过 for of 遍历Iterator(可迭代)对象,for of是ES6提供的新特性,
 * 用于替代for in 和 forEach(),for of 允许遍历Array、String、Maps、
 * Sets等迭代数据结构。
 */
for (const [key, item] of arr.entries()) {
  /*
   * 0 'Java'
   * 1 'JavaScript'
   * 2 2 'Golang'
   */
  console.log(key, item)
}
```

### 2.5 Array.prototype.every()

every(callback(element,index,arr),thisArg):测试数组内所有元素是否都能通过 callback 函数的测试,若全部通过则返回 true,否则返回 false。

- callback:用来测试每个元素的函数,它接收 element(当前元素)、index(当前元素的下标)、array(调用 every 的当前数组)。
- thisArg:执行 callback 时使用的 this 值。

```js
const arr1 = [12, 5, 8, 130, 44]
const arr2 = [12, 54, 19, 23, 322]
const arr3 = [1, -1, 2, 123, 75]
console.log(arr1.every(item => item > 10)) // false
console.log(arr2.every(item => item > 10)) // true
console.log(arr3.every(item => Boolean(item))) // false
```

### 2.6 Array.prototype.fill()

fill(value,start,end):用一个固定值填充一个数组从起始索引到终止索引的全部元素(不含终止索引)。value 为填充数组元素的值,start(可选,默认为 0)填充的起始索引,end(可选,默认为 arr.length)填充的终止索引,此方法会改变原数组。

```js
console.log([1, 2, 3].fill(4)) // [4,4,4]
// 下标1到arr.length使用4填充
console.log([1, 2, 3].fill(1, 4)) // [1,4,4]
console.log([1, 2, 3].fill(4, -3, -2)) // [4,2,3]
console.log([1, 2, 3].fill(4, NaN, NaN)) // [1,2,3]
```

### 2.7 Array.prototype.filter()

filter(callback(element,index,array),thisArg):创建一个新数组,其数组包含通过 callback 函数实现的测试的所有元素。

- callback:用来测试每个元素的函数,返回 true 表示该元素通过测试,保留该元素,返回 false 时则不保留,它接收 element(当前元素)、index(当前元素的下标)、array(调用 every 的当前数组)。
- thisArg:执行 callback 时使用的 this 值。

```js
const arr1 = [12, 4, 90, 11, 123]
console.log(arr.filter(item => item > 10)) // [12,90,11,123]

const fruits = ['apple', 'banana', 'grapes', 'mango', 'orange']
const filterItems = query => {
  // toLowerCase()用于将字符串转为英文小写
  return fruits.filter(item => item.toLowerCase().indexOf(query.toLowerCase()) > -1)
}
console.log(filterItems('ap')) // ['apple','grapes'];
console.log(filterItems('an')) // ['banana','mango','orange']

// 过滤数组中隐式类型转换为false的元素
constle.log([0, 1, false, 2, '', 3].filter(Boolean)) // [1,2,3]
```

### 2.8 Array.prototype.find()

find(callback(element,index,array),thisArg):返回数组中满足 callback 函数条件的第一个元素的值,否则返回 undefined。

- callback:在数组每一项执行的函数,它接收 element(当前元素)、index(当前元素的下标)、array(调用 every 的当前数组)。
- thisArg:执行 callback 时使用的 this 值。

```js
const arr = [
  { name: '张三', age: 19 },
  { name: '李四', age: 4 },
  { name: '王五', age: 60 },
  { name: '李老六', age: 35 },
]
console.log(arr.find(item => item.age > 18)) // {name: '张三', age: 19}

console.log(arr.find(item => item.age > 66)) // undefined
```

### 2.9 Array.prototype.findIndex()

find(callback(element,index,array),thisArg):返回数组中满足 callback 函数条件的第一个元素的下标,否则返回 -1。

- callback:在数组每一项执行的函数,它接收 element(当前元素)、index(当前元素的下标)、array(调用 every 的当前数组)。
- thisArg:执行 callback 时使用的 this 值。

```js
const arr = [
  { name: '张三', age: 19 },
  { name: '李四', age: 4 },
  { name: '王五', age: 60 },
  { name: '李老六', age: 35 },
]
console.log(arr.findIndex(item => item.age > 18)) // 0

console.log(arr.findIndex(item => item.age > 66)) // -1
```

### 2.10 Array.prototype.flat

flat(depth):方法会按照一个可指定的深度递归遍历数组,并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。
简单来说将一个多维数组根据指定深度(depth)将数组拍平,depth 为拍平的深度,默认值为 1,当 depth 为 Infinity 时,
表示可展开任意深度的嵌套数组,无论数组嵌套多深,最后都会被拍平为一维数组。注意:flat()会移除数组中的空元素。

```js
const arr1 = [1, , 2, [3, 4]]
// flat() 会移除数组中的空项
console.log(arr1.flat()) // [1,2,3,4]

const arr2 = [1, 2, [3, 4, [5, 6]]]
console.log(arr2.flat()) // [1,2,3,4,[5,6]]

const arr3 = [1, 2, [3, 4, [5, 6]]]
console.log(arr2.flat(2)) // [1,2,3,4,5,6]

const arr4 = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]]
// 使用 Infinity 展开任意深度的嵌套数组,将多维数组拍平为一维数组
console.log(arr4.flat(Infinity)) // [1,2,3,4,5,6,7,8,9,10]
```

除了 flat()可以实现数组的扁平化之外,也可以通过其他方式来替代 flat():

```js
// 方式1:通过reduce + concat + isArray + 递归实现flat()
const arr1 = [1, 2, 3, [1, 2, 3, 4, [2, 3, 4]]]
Array.prototype.flatDeep = function (depth = 1) {
  /*
   * 如果depth不大于0那么会通过slice()直接返回源数组的一份浅拷贝,如果大于0将使用reduce()对数组做规约,
   * 通过concat()将元素连接,如果元素是数组时那么会递归调用flatDeep(),由于使用reduce()进行规约,
   * 所以depth需要* * -1,如果元素不是数组那么直接连接。
   */
  return depth > 0
    ? this.reduce((acc, val) => acc.concat(Array.isArray(val) ? val.flatDeep(depth - 1) : val), [])
    : this.slice()
}
console.log(arr1.flatDeep()) // [1, 2, 3, 1, 2, 3, 4, [2,3,4]]
console.log(arr1.flatDeep(Infinity)) // [1, 2, 3, 1, 2, 3, 4, 2, 3, 4]
```

## 3.数组添加元素的 6 种方式

### 3.1 push()尾部添加元素

```js
const arr = [1]
arr.push(2, 3)
console.log(arr) // [1,2,3]
```

### 3.2 unshift()头部添加元素

```js
const arr = [3]
arr.unshift(1, 2)
console.log(arr) // [1,2,3]
```

### 3.3 concat()连接数组

```js
const arr = [1]
const newArr = arr.concat([2, 3])
console.log(newArr) // [1,2,3]
```

### 3.4 splice()指定位置添加/删除元素

```js
const arr = [1]
arr.splice(arr.length, 0, 2, 3)
console.log(arr) // [1,2,3]
```

### 3.5 splice()指定位置添加/删除元素

```js
const arr = [1]
const newArr = [...arr, 2, 3]
console.log(newArr) // [1,2,3]
```

### 3.6 Array.length

```js
const arr = [1]
arr[arr.length] = 2
arr[arr.length] = 3
console.log(arr) // [1,2,3]
```

## 4.数组删除元素的 4 种方式

### 4.1 伪删除将元素设置为 null

```js
const arr = [1, 2, 3, 4, 5]
arr[2] = null
// 虽然第三个元素被赋值为null,但数组的长度仍不变
console.log(arr) // [1,2,null,4,5]
```

### 4.2 splice()删除指定下标元素

```js
const arr = [1, 2, 3, 4, 5]
// 从下标2开始删除1位元素,返回一个数组,该数组包含删除的元素
console.log(arr.splice(2, 1)) // [3]
console.log(arr) // [1,2,4,5]
```

### 4.3 shift()删除首个元素

```js
const arr = [1, 2, 3, 4, 5]
// shift()用于删除数组的首个元素并返回被删除的元素
console.log(arr.shift()) // 1
```

### 4.4 pop()删除数组最后一个元素

```js
const arr = [1, 2, 3, 4, 5]
// pop()用于删除数组最后一个元素并返回被删除的元素
console.log(arr.pop()) // 5
console.log(arr) // [1,2,3,4]
```

## 5.判断是否是数组的4种方式

### 5.1 通过JSON.stringify()将数组转换为字符串,判断是否是数组

JSON.stringify() 是 JavaScript 中一个非常重要的内置方法,用于将 JavaScript 值转换为 JSON 字符串,可以通过JSON.stringify()将数组转换为字符串,
如果转换后的第一个字符串是"["那么就说明是数组,否则就不是数组。注意:这种方式在循环引用问题下会报错,不推荐使用。

```js
const arr1 = [1, 3, 4, 5]
const isArr = JSON.stringify(arr1)[0] === '['
console.log(isArr) // true

// 注意:在出现循环引用场景下,JSON.stringify()会报错,不推荐使用
const arr2 = [1, 3, 5, {}, 4]
arr2[3].arr2 = arr2
console.log(JSON.stringify(arr2)) // 报错:Converting circular structure to JSON
```

### 5.2 通过instanceof判断是否是数组

instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上,如果实例对象的原型链上有构造函数的 prototype 属性,那么 instanceof 运算符就会返回 true,否则返回 false。注意:instanceof 运算符只能用于检测对象是否是数组,不能用于检测基本数据类型是否是数组。由于instanceof 运算符基于原型链判断,如果一旦改变目标对象的原型链,则可能导致判断错误。其次instanceof运算符也无法判断`iframe.contentwindow.Array`。

```js
const arr1 = []
const isArr1 = arr1 instanceof Array
console.log(isArr1) // true

// 注意:instanceof 运算符只能用于检测对象是否是数组,不能用于检测基本数据类型是否是数组。一旦改变目标对象的原型链,则可能导致判断错误
const arr2 = {}
// 改变arr2的原型为Array.prototype,会导致instanceof 运算符判断错误
Object.setPrototypeOf(arr2, Array.prototype)
const isArr2 = arr2 instanceof Array
console.log(isArr2) // true

/**
 * 注意:instanceof 无法 iframe.contentwindow.Array,由于window.Array 是一个全局对象,而 iframe.contentwindow.Array
 * 是一个 iframe 中的数组对象,它们的原型链不同,因此 instanceof 运算符无法判断 iframe.contentwindow.Array 是否是数组。
 */

const Array1 = window.Array
const iframe = document.querySelector('iframe')
const Array2 = iframe.contentwindow.Array
console.log(Array1 === Array2) // false
const arr = new Array2()
console.log(arr instanceof Array) // false
```

### 5.3 Object.prototype.toString.call()判断是否是数组

Object.prototype.toString 是 JavaScript 中所有对象都继承的方法，它返回一个表示对象类型的字符串。调用 Object.prototype.toString 方法时,会返回一个字符串,该字符串的格式为"[object 类型]",其中类型是对象的类型,例如"Array","Object","String"等,在ES5前Object.prototype.toString是精确判断类型的唯一方式。注意:在ES6标准中,提供了Symbol.toStringTag,它是一个内置的 Symbol 值,允许自定义 `Object.prototype.toString.call()` 方法返回的字符串中的类型标签,因此`Object.prototype.toString.call()`无法精确判断类型。

```js
const arr1 = []
console.log(Object.prototype.toString.call(arr1)) // '[object Array]'

// 注意:Symbol.toStringTag 可以自定义对象的类型标签,因此 Object.prototype.toString.call() 无法精确判断类型
const arr2 = {
  [Symbol.toStringTag]: 'Array',
}
console.log(Object.prototype.toString.call(arr2)) // '[object Array]'
```

### 5.4 通过Array.isArray()判断是否是数组

Array.isArray() 是 JavaScript 中专门用于判断一个值是否为数组的静态方法,它是一个原生方法,底层由C++实现,可以精确判断是否是数组。

```js
const arr1 = []
console.log(Array.isArray(arr1)) // true
```

## 6.数组去重

### 6.1 使用 set 不允许重复元素的特性

```js
var arr = [1, 2, 3, 4, 1, 2]
console.log(Array.from(new Set(arr))) // [1,2,3,4]
```

### 6.2 创建一个新数组,使用 indexOf()includes()或判断新数组是否存在指定元素,如果不存在就添加元素

```js
var arr = [1, 2, 3, 4, 1, 2]
// indexOf()写法
var newArr = []
for (let i = 0; i < arr.length; i++) {
  if (newArr.indexOf(arr[i]) == -1) {
    newArr.push(arr[i])
  }
}
console.log(newArr) // [1, 2, 3, 4]

// includes()写法
var newArray = []
for (let i = 0; i < arr.length; i++) {
  if (!newArray.includes(arr[i])) {
    newArray.push(arr[i])
  }
}
console.log(newArray) // [1, 2, 3, 4]
```

### 6.3 通过对象键名不允许重复的特性去重

```js
var arr = [1, 2, 3, 4, 1, 2]
var obj = {}
var objArr = []
for (let i = 0; i < arr.length; i++) {
  //如果obj不存在该键的话就往新数组添加元素
  if (!obj[arr[i]]) {
    obj[arr[i]] = 1
    objArr.push(arr[i])
  }
}
console.log(objArr) //[1, 2, 3, 4]
```

### 6.4 利用 filter 去重

```js
var arr = [1, 2, 3, 4, 1, 2]
console.log(arr.filter((curValue, index, array) => array.indexOf(curValue) === index)) // [1, 2, 3, 4]
```

## 7.数组相关题目

### 7.1 已知如下数组，编写一个程序将数组扁平化去并除其中重复部分数据，最终得到一个升序且不重复的数组。

```js
var arr = [[1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10]
```

**解法一**:先使用 flat() 将数组拍平,然后数组转 Set 去重,然后通过 Array.from() 将对象转为数组,最后通过 sort()升序排序

```js
const arr = [[1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10]
console.log(Array.from(new Set(arr.flat(Infinity))).sort((a, b) => a - b))
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
```

**解法二**:通过递归拍平数组,然后转 Set 去重,最后 sort()升序

```js
const arr = [[1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10]
Array.prototype.flat = function () {
  return [].concat(...this.map(item => (Array.isArray(item) ? item.flat() : [item])))
}
Array.prototype.unique = function () {
  return [...new Set(this)]
}
const sort = (a, b) => a - b
console.log(arr.flat().unique().sort(sort))
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
```

## 8.数组技巧

compose(组合)函数和 pipe(管道)函数属于函数式编程(FP)中的概念,函数式编程中,组合函数是一种将多个函数组合在一起形成一个新函数的技术,管道是函数式编程的一种编程模式,它允许将函数链接在一起以构建数据流,两者都可以组织多个函数执行,其区别如下:

- 接收参数不同。管道函数接收一个初始值和一组函数,它会依次将初始值传入每个函数,最终输出管道的最后一个函数的结果。而组合函数接收一组数组,并将多个函数组合成一个新的函数,组合函数会将每个函数的输出作为上一个函数的输入,最终输出组合函数的结果。
- 函数调用顺序不同。管道函数是从左到右依次调用每个函数,而组合函数是从右到左依次调用每个函数。

### 8.1 通过 reduce()实现 pipe(管道)函数

```js
const pipe = function (value, ...fns) {
  return fns.reduce((result, fn) => {
    return fn(result)
  }, value)
}

// -------- 测试
function addOne(num) {
  return num + 1
}
function double(num) {
  return num * 2
}
const result = pipe(3, addOne, double)
console.log(result) // 8
```

### 8.2 通过 reduceRight() 或 reduce()实现 compose(组合)函数

```js
// 实现方式1:基于reduceRight实现compose函数,reduceRight()由右到左遍历数组
const compose = function (...fns) {
  return args => {
    return fns.reduceRight((result, fn) => {
      return fn(result)
    }, args)
  }
}

// 实现方式2:基于reduce()实现compose函数,从里到外求值,即从右到左求值
const compose = function (...fns) {
  return fns.reduce((result, fn) => {
    return (...args) => result(fn(...args))
  })
}

// -------- 测试
function addOne(num) {
  return num + 1
}
function double(num) {
  return num * 2
}
const composeFn = compose(double, addOne)
console.log(composeFn(3)) // 8
```

## 9.数组与树形结构转换

在实际开发中由于存储数据时采用线性结构,但展示数据时以树形结构显示,例如菜单列表,数据库以行的形式存储着菜单项,但是展示数据时需要根据菜单项的层级关系转为树形结构显示,因此需要实现数组和树形结构的互转。数组结构如下:

```js
const nodes = [
  { id: 1, parentId: null },
  { id: 2, parentId: 1 },
  { id: 3, parentId: 1 },
  { id: 4, parentId: 2 },
  { id: 5, parentId: 3 },
  { id: 6, parentId: 3 },
  { id: 7, parentId: 4 },
  { id: 8, parentId: 4 },
]
```

### 9.1 数组转树形结构

#### 9.1.1 使用递归数组转树

```js
function arrayToTree(nodes, parentId = null) {
  return nodes
    .filter(node => node.parentId === parentId)
    .map(node => ({ ...node, children: arrayToTree(nodes, node.id) }))
}
```

递归是处理树形结构最常用的方法之一,可以通过递归遍历数组并构建树形结构。递归方法需要定义一个递归函数,该函数接受一个数组和一个父节点 ID 作为参数,并返回一个树形结构。递归函数的实现过程中,需要遍历数组,找到所有父节点 ID 等于当前父节点 ID 的节点,并将其添加到当前节点的子节点列表中。然后,递归调用函数,将其子节点添加到当前节点中。最后,返回树形结构。

递归方式实现数组转树比较简单,其时间复杂度是 O(n^2),n 表示节点的数量,空间复杂度为 O(n^2)。递归方式仅使用小规模数据,处理大规模数据时可能会导致栈溢出。

#### 9.1.2 使用迭代数组转树

迭代方法也可以用于将数组转换为树形结构,但是实现起来比递归方法更复杂。遍历数组找到所有父节点 ID 等于当前节点 ID 的节点,并将其添加到当前节点的子节点列表中。

```js
function arrayToTree(nodes) {
  const map = new Map()
  const tree = []
  for (const node of nodes) {
    // 初始化map,其key为节点id,value为节点,根据节点id可以快速查找节点
    map.set(node.id, node)
    // 处理外层节点,如果节点的parentId为null,则直接将该节点push到tree中
    if (node.parentId === null) {
      tree.push(node)
    } else {
      // 根据节点的parentId查找节点对应的父节点
      const parent = map.get(node.parentId)
      // 初始化children属性
      !parent.children && (parent.children = [])
      // 将当前节点push到父节点的children中
      parent.children.push(node)
    }
  }
  return tree
}
```

迭代实现数组转树时间复杂度为 O(n),其中 n 是节点的数量,空间复杂度为 O(n)。此种方式使用于适合大规模数据,相较于递归实现比较复杂。

#### 9.1.3 使用 reduce 数组转树

```js
function arrayToTree(nodes) {
  const map = {}
  const tree = nodes.reduce((acc, node) => {
    // 初始化map,以node的id为key
    map[node.id] = { ...node, children: [] }
    // 处理最外层节点
    if (node.parentId === null) {
      acc.push(map[node.id])
    } else {
      // 处理内层节点
      map[node.parentId].children.push(map[node.id])
    }
    return acc
  }, [])
  return tree
}
```

reduce 与迭代方式类似,但实现更为简洁,其时间复杂度为 O(n),n 表示节点的数量,空间复杂度为 O(n),适用于中小规模数据。

#### 9.1.4 使用哈希表数组转树

```js
function arrayToTree(nodes) {
  // 初始化map,map的key为node.id,value为node的所有属性和chidrent属性组成的对象
  const map = new Map(nodes.map(node => [node.id, { ...node, children: [] }]))
  const tree = []
  // 遍历map的value集合
  for (const node of map.values()) {
    // 处理外层节点
    if (node.parentId === null) {
      tree.push(node)
    } else {
      // 处理内层节点
      map.get(node.parentId).children.push(node)
    }
  }
  return tree
}
```

使用 Map 方法可以将数组转换为 Map,然后通过遍历 Map 来构建树形结构。具体实现过程中,需要先将数组转换为 Map,其中键为节点 ID,值为节点对象。然后,遍历 Map 找到所有父节点 ID 等于当前节点 ID 的节点,并将其添加到当前节点的子节点列表中。最后,返回根节点。

map 实现数组转树的时间复杂度为 O(n),其中 n 是节点的数量,空间复杂度为 O(n)。map 方式适合大规模数据,而且由于使用了 Map,相比于迭代方式,能够更方便地进行节点的查找和删除。

#### 9.1.5 使用深度优先搜索(DFS)数组转树

```js
function arrayToTreeDFS(nodes) {
  // 初始化map,map的key为node.id,value为node的所有属性和chidrent属性组成的对象
  const map = new Map(nodes.map(node => [node.id, { ...node, children: [] }]))
  const tree = []
  // 遍历map的value集合
  for (const node of map.values()) {
    // 处理外层节点
    if (node.parentId === null) {
      dfs(node)
      tree.push(node)
    }
  }
  // 深度优先搜索,调用该函数后,会根据parentId获取对应节点,并做为node的子节点
  function dfs(node) {
    // 遍历所有节点
    for (const child of nodes) {
      // 如果当前节点的父id === 传入节点的id
      if (child.parentId === node.id) {
        // 根据child.id 从map获取节点
        const childNode = map.get(child.id)
        dfs(childNode)
        // 将childNode作为node的子节点
        node.children.push(childNode)
      }
    }
  }
  return tree
}
```

基于 DFS 实现的数组转树时间复杂度为 O(n),其中 n 是节点的数量,空间复杂度为 O(n)。这种方式适用于大规模数据的处理,而且可以更方便地进行深度优先搜索。

### 9.2 树结构转数组

树结构转数组:

- 前序遍历方式:使用前序遍历(根-左-右)的方式遍历树,将节点的值按照遍历顺序存储到数组中。这种方式可以方便地将树转换为数组,但在还原树结构时需要额外的信息(如节点的子节点数量或特定的占位符)来确定节点的层次关系。

- 层次遍历方式:使用层次遍历(逐层从左到右)的方式遍历树,将节点的值按照层次顺序存储到数组中。这种方式可以直观地将树结构转换为数组,而且在还原树结构时不需要额外的信息,只需按照层次顺序逐个构建节点。

#### 9.1 前序遍历

```js
const root = [
  {
    id: 1,
    parentId: null,
    children: [
      {
        id: 2,
        parentId: 1,
        children: [
          {
            id: 4,
            parentId: 2,
            children: [
              {
                id: 5,
                parentId: 4,
                children: [],
              },
              {
                id: 6,
                parentId: 4,
                children: [
                  {
                    id: 8,
                    parentId: 6,
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 3,
        parentId: 1,
        children: [
          {
            id: 7,
            parentId: 3,
            children: [],
          },
        ],
      },
    ],
  },
]

function treeToArrayPreorder(root) {
  const result = []
  function traverse(node) {
    if (node) {
      result.push(node)
      for (const child of node.children) {
        traverse(child)
      }
    }
  }
  root.forEach(node => {
    traverse(node)
  })
  return result
}
```

#### 9.2 层次遍历

```js
function treeToArrayLevelOrder(root) {
  const queue = [...root]
  const result = []
  while (queue.length > 0) {
    const node = queue.shift()
    result.push(node)
    for (const child of node.children) {
      queue.push(child)
    }
  }

  return result
}
```
