函数(Function)是执行特定任务的代码块,某些代码调用它就会被执行。在 JavaScript 中函数是一等公民,每一个函数都是一个 Function 对象,它们可以像任何其他对象一样具有属性和方法,与其他对象不同的是函数可以被执行。函数由 function 关键字定义(可选),函数由函数名(可选)、参数列表、函数主体、返回值(可选)4 部分组成,定义函数时应遵循单一职责,即一个函数只做一件事。

### 定义函数的几种方式

```js
// 方式1:通过function定义函数
function func1() {
  // 函数体
}
func1();

// 方式2:通过字面量定义函数,由于function(){}没有函数名,所以又被称为匿名函数
const func2 = function (a, b) {
  return a + b;
};
console.log(func2(1, 1)); // 2

/*
 * 方式3:通过实例化Function构造函数定义函数,Function()除最后一个参数,其余参数均为函数参数名称,
 * Function()最后一个为函数主体,注意:这种方式不安全,容易遭受攻击
 */
const func3 = new Function("a", "b", "return a*b");
console.log(func3(2, 3)); // 6

// 方式4:箭头函数
const func4 = () => {
  console.log("箭头函数");
};

// 在函数上定义属性或函数
function func5() {}
func5.name = "z乘风";
func5.hello = function () {};
console.log(func5); // f func5(){}
console.log(func5.name); // z乘风
console.log(func5.hello); // f (){}
```

### 函数的 this

在了解函数的 this 之前首先要熟悉 JavaScript 中的作用域,作用域决定了代码区块中变量和其他资源的可见性。在 JavaScript 中作用域可分为全局作用域(Global scope)和函数作用域(Function scope),全局作用域是指在无嵌套的函数执行环境,函数作用域又被称为局部作用域(每个函数都有独立的作用域),是指在所处在嵌套的函数中的执行环境。

```js
function func01() {
  console.log("Global scope");
}
// func01()调用时未被函数所嵌套,所以func01()处于全局作用域
func01();

function func02(initial) {
  var counter = initial;
  function increment(val) {
    counter += val;
  }
  function get() {
    return counter;
  }
  return {
    increment,
    get,
  };
}
const counterFunc = func02(1);
counterFunc.get(); // 1
/*
 * 由于increment()被嵌套在func02()中,increment()持有func02()的作用域,这意味着
 * increment()可以使用func02()中定义的成员属性或成员方法。
 */
counterFunc.increment(2);
counterFunc.get(); // 3
```

**JavaScript 函数中的 this 不是取决于函数声明的环境,而是取决与于函数被调用的环境**。函数 this 的绑定遵循如下规则:

- 默认绑定。
- 隐式绑定。
- 显示绑定。
- new 绑定。
- 箭头函数绑定。

### 立即执行函数

### 闭包函数
