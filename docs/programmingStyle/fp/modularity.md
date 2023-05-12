### 管道函数(pipeline)

**函数式编程的管道是一种编程模式，它允许将函数链接在一起以构建数据流。在管道中，数据从一个函数流向另一个函数，每个函数都执行一些操作并生成输出，然后将输出传递给下一个函数。这种方法使得代码更加简洁和可读，并且易于维护和修改**。通常，**管道由一系列函数组成，其中每个函数都接受一个参数并返回一个值。这些函数被链接在一起，形成一个数据流，每个函数都将前一个函数的输出作为其输入**。这种模式可以轻松地扩展为包含任意数量的函数，以便处理更复杂的数据流。
在函数式编程中，管道通常与柯里化和高阶函数一起使用。柯里化使函数能够接受部分参数，并返回一个接受剩余参数的新函数。高阶函数允许函数接受其他函数作为参数或返回一个函数作为其结果。这使得管道能够适应更多类型的数据和操作。总之，管道是一种强大的编程模式，可以使代码更加简洁、可读和易于维护。它在函数式编程中发挥着重要作用，并在许多编程语言中得到了广泛的支持和应用。

#### 管道函数的兼容条件

使用管道函数中函数的输入和输出需要满足以下两个兼容条件:

- 类型——函数的返回类型必须与接收函数(下一个函数)接收的入参类型相匹配。
- 元数(即函数接收的参数数量,也被称为函数的长度)——接收函数必须声明至少一个参数才能处理上一个函数的返回值。

#### 管道函数与方法链的比较

#### 管道函数的实现

```tsx
// 方式1:通过reduce实现管道函数
function pipe<T>(value: T, ...funcs: Array<(arg: T) => T>): T {
  return funcs.reduce((result, fn) => fn(result), value);
}

// 方式2:通过组合函数实现管道函数
function compose<T, R>(...funcs: Array<(arg: T) => R>): (arg: T) => R {
  return function (arg: T): R {
    return funcs.reduceRight((result, fn) => fn(result), arg);
  };
}
function pipe<T, R>(value: T, ...funcs: Array<(arg: T) => R>): R {
  return compose(...funcs)(value);
}

// --------------测试
function addOne(num: number): number {
  return num + 1;
}
function double(num: number): number {
  return num * 2;
}
const result = pipe(3, addOne, double); // 8
```

#### 管道函数的应用

### 组合函数(compose)

函数式编程中，组合函数是一种将多个函数组合在一起形成一个新函数的技术。组合函数可以通过函数组合子实现，这些组合子通常是柯里化的函数，它们接受一个或多个函数作为参数，并返回一个新函数。组合函数与管道函数类似,其区别如下:

- 接收参数不同。管道函数接收一个初始值和一组函数,它会依次将初始值传入每个函数,最终输出管道的最后一个函数的结果。而组合函数接收一组数组,并将多个函数组合成一个新的函数,组合函数会将每个函数的输出作为上一个函数的输入,最终输出组合函数的结果。
- 函数调用顺序不同。管道函数是从左到右依次调用每个函数,而组合函数是从右到左依次调用每个函数。

#### 组合函数的实现

组合函数核心是接收一组函数做为参数并返回一个新的函数,从右到左执行函数,前一个函数的执行结果将作为下一个函数的入参。组合函数实现如下:

```tsx
// 方式1:通过reducerRight()实现组合函数
function compose<T>(...funcs: Array<(arg: T) => T>): (arg: T) => T {
  return function (arg: T) {
    return funcs.reduceRight((result, fn) => fn(result), arg);
  };
}

// 方式2:通过reducer()实现组合函数,从里到外求值,即从右到左求值
function composes<T>(...funcs: Array<(arg: T) => T>): (arg: T) => T {
  return funcs.reduce((result, fn) => {
    return (...args) => result(fn(...args));
  });
}

// -------------------- 测试
function addOne(num) {
  return num + 1;
}
function double(num) {
  return num * 2;
}
const composedFunc = compose(addOne, double);
console.log(composedFunc(3)); // 7
// -------------------- 测试
```

#### 组合函数的应用

### 函数柯里化

### Point-free 编程

### 使用函数组合子来管理程序的控制流
