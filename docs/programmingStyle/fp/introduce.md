## 1.函数式编程介绍

现代化前端技术日新月异,蓬勃发展,React 在 16.8 推出了 Hook 概念,Vue 也在 3.x 推出了 composition API,其背后原理基于函数式编程(Functional Programming,简称 FP)。在越复杂、越庞大的项目中函数式编程更能发挥作用,因为 JavaScript 可以借助函数式编程编写干净简洁的、模块化的、可测试的代码。不同技术书籍对函数式编程的定义也不同:
《JavaScript》函数式编程指南描述:**函数式编程是一种强调以函数使用为主的软件开发风格,它不是一种框架或工具,它是一种编程范式。函数式编程的目标是使用函数来抽象作用在数据之上的控制流和操作,从而在系统中消除副作用并减少对状态的改变。**
《JavaScript 函数式编程》描述:**函数式编程通过函数来将值转换成抽象单元,用于构建软件系统**。
简单来说**函数式编程是一种以函数为主体的编程范式,推荐使用函数来抽象对数据的操作,从而消除副作用和减少对数据的改变**。例如要遍历一个数组,命令式编程的操作是通过 for 或 while 循环对数组遍历,在函数式编程中对数组的遍历可以抽象成一个 forEach 函数,数组可以通过该函数对数组的每个元素进行遍历,除此之外,forEach 还可以抽象成 map、set 结构的遍历操作,相比较命令式编程,函数式编程更加简洁。

```javascript
const arr = [1, 2, 3, 4, 5]

// 命令式编程遍历数组
for (let i = 0, len = arr.length; i < len; i++) {
  // 元素+1会产生副作用导致arr状态变化,因为数组是引用类型
  arr[i] += 1
  // 打印:2、3、4、5、6
  console.log(arr[i])
}
// [2, 3, 4, 5, 6]
console.log(arr)

// 函数式编程遍历数组
arr.forEach((item) => {
  // 元素+1不会产生副作用导致arr状态变化,因为forEach是一个纯函数,item是一个新对象,并非指向arr中的元素
  item += 1
  // 打印:2、3、4、5、6
  console.log(item)
})
// [1,2,3,4,5]
console.log(arr)
```

### 1.1 函数式编程工具库

函数式编程是开发中常用的一种编程范式,在实际开发中通常借助第三方函数式编程工具库来简化函数式编程操作。

- [Ramda](https://ramda.cn/):通用函数式编程实用函数。
- [Underscore](https://www.underscorejs.cn/):一个 JavaScript 实用库,提供了一整套函数式编程的实用功能
- [Lodash](https://www.lodashjs.com/):Lodash 是一个一致性、模块化、高性能的 JavaScript 实用函数式工具库,用于代替 Underscore。lodash 支持多个模块化方式,通常在开发中使用 lodash-es(以 ESModule 方式导出 Lodash),基于 ESM 模块静态分析机制可以实现 Tree Shaking(摇树),去除未使用的代码,从而实现按需加载。
- [immer](https://immerjs.github.io/immer/zh-CN/):一个用于提供不可变数据结构的轻量级工具库,用于代替 Immutable。immer 常用于 React 性能优化。
- [Immutable](https://immutable-js.com/):提供不可变数据结构。
- [functional](https://github.com/functionaljs/functional-js):一个函数式 JavaScript 工具库。
- [RxJS](https://rxjs.dev/guide/overview):RxJS 是一个使用可观察序列编写异步和基于事件的程序的库。

## 2.函数式编程的特点

函数式编程具有如下特点:

- **函数式编程是声明式编程。**
- **函数式编程中的函数应是纯函数。**
- **函数式编程中的函数应是引用透明的。**
- **函数式编程中函数操作的数据应是不可变的。**

### 2.1 函数式是声明式编程

声明式和命令式是开发中常用的两种编程范式,函数式编程属于声明式编程范式,声明式会描述一系列操作,但不会暴露它们如何实现或是数据流如何穿过它们,而命令式编程则是很具体告诉计算机如何执行某个任务。声明式编程就程序的描述与求值分离开来,它关注于如何用各种表达式来描述程序逻辑,而不一定要指明其控制流或状态的变化。例如下面的例子:

```javascript
// 需要计算arr数组中每个元素的平方
const arr = [1, 2, 3, 4, 5]

/*
 * 命令式编程写法:命令式编程通过for、if、switch等语句来控制程序的流程走向,
 * 程序的流程走向是自上而下的,且通过修改系统的各个状态来计算最终结果。
 * 由于直接修改arr[i]的值,最终会影响全局变量arr产生副作用,因为不知道其他
 * 代码是否依赖于arr,如果其他地方依赖于arr,一旦修改arr的值,就会产生非预期的结果,
 * 推荐做法是不应该直接操作arr,而且对arr进行一份拷贝。
 */
for (let i = 0, len = arr.length; i < len; i++) {
  arr[i] = Math.pow(arr[i], 2)
}
// [1, 4, 9, 16, 25]
console.log(arr)

/*
 * 函数式编程写法:函数式编程通过map、filter、reducer等操作符来控制流程的走向,
 * 这些操作符是对数据的抽象,内部实现细节都交由操作符来实现,例如map用于做数据的映射
 * ,filter用于做数据的过滤。map()最终会返回一个新的数组结果集,并不会修改原数组(arr),
 * 即使其他代码依赖于arr,也不会影响到其他代码,所以map是无副作用的一个纯函数。
 */
const result = arr.map((item) => Math.pow(item, 2))
// [1, 4, 9, 16, 25]
console.log(result)
```

### 2.2 纯函数

函数式编程基于一个前提,即使用纯函数构建具有可变性的程序,纯函数具有如下特点:

- 纯函数仅取决于提供的输入,而不依赖于任何在函数求值期间或调用间隔时可能变化的隐藏状态和外部状态。
- 纯函数不会造成超出其作用域的变化,例如修改全局对象或引用传递的参数。

使用函数对数据的操作产生的影响被称为副作用,副作用会影响函数的"纯度",产生副作用的常用场景如下:

- 改变一个全局变量、属性或数据结构。
- 改变一个函数参数的原始值。
- 处理用户输入。
- 抛出一个异常,除非该异常被当前函数所捕获。
- 屏幕打印或记录日志。
- 查询 HTML 文档、浏览器的 cookie 或访问数据库。

### 2.3 引用透明

在函数式编程中,引用透明(Referential Transparency)是指一个表达式在任何时候都可以被它的结果所替代,而不影响程序的行为。具有引用透明性的表达式可以保证其结果仅仅取决于其参数的值(表达式的值取决于入参),而与其他环境因素无关,这样就可以更容易地理解和推导代码的行为,也有助于编写可靠、可维护和可测试的代码。例如:

```javascript
// 不具备引用透明性的函数,add()函数内部使用了全局变量x,一旦全局变量x发生变化,add()函数的结果也会受影响
let x = 2
function add(y) {
  return x + y
}

// 具备引用透明性的函数,add()函数的结果取决于函数的入参参数x和y
function add(x, y) {
  return x + y
}
```

### 2.4 不可变数据(Immutable data)

- 可变数据(mutable data):可变数据是指可以在其创建后被修改的数据类型。例如，列表和字典是可变数据类型，因为可以添加、删除或修改其中的元素。
- 不可变数据(Immutable data):不可变数据是指一旦被创建后就不能更改的数据。例如,整数、浮点数、布尔值和元组都是不可变数据类型。对于不可变数据类型,如果要更改其值,则必须创建一个新的对象。

与其他语言类似,JS 中所有基本类型(String、Number 等)从本质上都是不可变的,对于引用类型(对象、数组等)都是可变的,即使将引用类型作为输入传递给另一个函数,仍可以通过改变原有内容的方式产生副作用。在编程中,使用可变数据类型可能会导致意外的结果,因为对同一对象的多个引用可能会同时修改其值。而使用不可变数据类型则可以避免这种情况,因为无法修改其值。例如 Vue 和 Mobx 中数据属于可变数据,修改数据时可以直接操作数据,而 React 的数据属于不可变数据,修改数据时需要返回一个新的数据。例如:

```javascript
// 不可变数据错误的例子,执行sortDesc()函数会对入参数组arr进行倒序排序,由于入参属于引用类型,该函数执行后会影响函数的入参arr
const arr = [1, 23, 4, 5, 0, 11, 8, 2]
const sortDesc = function (arr) {
  return arr.sort(function (a, b) {
    return b - a
  })
}
console.log(sortDesc(arr)) // [23, 11, 8, 5, 4, 2, 1, 0]
console.log(arr) // [23, 11, 8, 5, 4, 2, 1, 0]

// 不可变数据正确的例子,执行sortDesc()函数会对入参数组arr进行倒序排序,由于函数内部对入参arr进行了浅拷贝,因此该函数执行后并不会影响函数的入参arr
const sortDesc = function (arr) {
  // 使用扩展运算符对arr进行浅拷贝,也可以使用Array.slice()浅拷贝数组
  return [...arr].sort(function (a, b) {
    return b - a
  })
}
console.log(sortDesc(arr)) // [23, 11, 8, 5, 4, 2, 1, 0]
console.log(arr) // [1, 23, 4, 5, 0, 11, 8, 2]
```

## 3.函数式的优点

函数式的优点如下:

- 将任务分解为多个简单的函数。
- 使用流式的调用链来处理数据。
- 通过响应式范式降低事件驱动代码的复杂性。

## 4.函数基础

### 4.1 函数

#### 4.1.1 函数是一等公民

在 JavaScript 函数是一等公民,JS 函数是一个特殊的对象,该对象也包含 length 属性,length 属性值为函数形参列表从 0 至非默认参数位置的长度。

```javascript
// ----------------- 声明函数
// 声明函数
function fn1() {}
// 声明匿名函数
const fn2 = function () {}
// 声明箭头函数,ES6新特性
const fn3 = () => {}
// 通过new Function()实例化函数,new Function()最后一个入参将作为函数体,其余入参都是函数参数
const add = new Function('a', 'b', 'return a + b;')
// 3
add(1, 2)

// ----------------- 函数参数

// str是函数的形参
const fn4 = (str) => {
  console.log(str)
}
// 'hello'是函数的实参
fn4('hello')

// 参数的形参列表
function fn5() {
  // arguments用于获取函数的形参列表,返回一个类数组
  console.log(arguments)
}
// Arguments(3) [1, 2, 3, callee: ƒ, Symbol(Symbol.iterator): ƒ]
fn5(1, 2, 3)

// 参数的形参列表,ES6新特性剩余参数
const fn6 = (...args) => {
  console.log(args)
}
// [1, 2, 3]
fn6(1, 2, 3)
```

#### 4.2.1 高阶函数

**高阶函数是指接收函数作为参数或以函数作为返回值的函数**,例如 Array 的 map、filter、reduce 都是高阶函数,它们都接收一个函数作为参数。高阶函数是函数式编程中最为常用的技巧,高阶函数还演化出其他概念,例如 React 中的高阶组件,即接收一个组件作为参数或返回一个组件作为返回值的组件。高阶组件可以对接收组件进行切面拦截,例如劫持组件 props,扩展包装组件,总之高阶组件可以提升组件复用性和扩展性。

```javascript
/**
 * applyOpration是一个高阶函数,opt作为函数传入applyOpration,opt函数接收a和b两个变量,
 * opt函数可以对a和b进行任何操作。因为函数的一等性和高阶性,JS的函数具有值的行为,简单来说,
 * 函数是一个基于输入的且尚未求值的不可变值。
 */
function applyOpration(a, b, opt) {
  return opt(a, b)
}
const plus = (a, b) => a + b
const minus = (a, b) => a - b
const multiply = (a, b) => a * b
const divide = (a, b) => a / b

applyOpration(1, 2, plus) // 3
applyOpration(3, 2, minus) // 1
applyOpration(1, 2, multiply) // 2
applyOpration(6, 3, divide) // 2
```

通过组合一些小的高阶函数可以创建有意义的表达式,能简化很多繁琐的程序。例如打印住在深圳的人员名单:

```javascript
const p1 = {
  name: 'James',
  age: 24,
  address: {
    city: 'shenzheng',
  },
}
const p2 = {
  name: 'Allen',
  age: 30,
  address: {
    city: 'beijing',
  },
}
const p3 = {
  name: 'Jack',
  age: 18,
  address: {
    city: 'guangzhou',
  },
}

// 打印住在深圳的人员名单,命令式写法
function printPeopleInshenzheng(people) {
  for (let i = 0, len = people.length; i < len; i++) {
    if (people[i].address.city === 'shenzheng') {
      console.log(people[i])
    }
  }
}
printPeopleInshenzheng([p1, p2, p3])

// 打印住在深圳的人员名单,函数式写法。
// action()的职责仅对person进行打印
function action(person) {
  if (person.address.city === 'shenzheng') {
    console.log(person)
  }
}
function printPeople(people, action) {
  for (let i = 0, len = people.length; i < len; i++) {
    action(people[i])
  }
}
printPeople([p1, p2, p3], action)
```

JS 语言中显著的命名模式之一是使用 multiper(乘以)、comparator(比较)以及 action(行为),由于函数是一等公民,可以给变量赋值,基于高阶函数的特性,上述例子还可以重构。

```javascript
function printPeople(people, selector, pinter) {
  people.forEach((item) => {
    if (selector(item)) {
      pinter(item)
    }
  })
}
const isShenzheng = (person) => person.address.city === 'shenzheng'
printPeople([p1, p2, p3], isShenzheng, console.log)

/*
 *
 */
```

### 4.2 闭包函数

#### 4.2.1 函数作用域

#### 4.2.2 闭包函数的应用
