JavaScript 是一门动态语言,动态语言是特点是非常灵活,但缺点是可维护性差,且代码出错几率也会提升。Javascript 引擎是单线程的,一旦遇到异常,Javascript 就会停止执行,阻塞后续代码并抛出一个异常信息,而异常处理能有效减少异常出现的几率,并在发生异常时可以将错误信息提供给开发者。

```js
/* js中奇葩的结果 */

console.log(1 / 0) // Infinity,在Java报错
console.log(1 / 's') // NaN,在Java报错
```

## 1.JavaScript 错误类型

Error 接口是所有内置错误对象的顶层接口,所有错误都继承自 Error,Error 接口的签名如下:

```js
interface Error {
  // 错误名称
  name: string;
  // 错误信息
  message: string;
  // 错误堆栈信息
  stack?: string;
}
```

内置错误类型:

- **SyntaxError(语法错误)**:SyntaxError 对象代表尝试解析语法上不合法的代码时发生的错误。
- **TypeError(类型错误)**:TypeError 对象表示值的类型非预期类型时发生的错误。
- **ReferenceError(引用错误)**:ReferenceError 对象表示当一个不存在的变量被引用时发生的错误。
- **RangeError**:RangeError 对象表示当一个值不在其所允许的范围或者集合中发生的错误。
- **EvalError**:EvalError 对象代表了一个关于 eval 函数的错误,此异常不再会被 JavaScript 抛出,但是 EvalError 对象仍然保持兼容性。
- **InternalError(内部错误)**:InternalError 对象表示出现在 JavaScript 引擎内部的错误。 例如:"InternalError: too much recursion"(内部错误:递归过深),该 API 属于实验性,暂不推荐在生产中使用。
- **URIError**:对象 URIError 表示以一种错误的方式使用全局 URI 处理函数而产生的错误。

扩展类型:

- **ResourceError**:资源加载错误。例如 JS、Image、CSS 等资源加载错误。
- **HttpError**:Http 请求错误。例如请求 404、请求 500、请求超时等错误。
- **异步错误**:异步操作时产生的错误,例如 setTimeout 中产生的错误。
- **Promise 错误**:Promise 中产生的错误。
- **Vue 组件错误**:Vue 组件产生的错误。
- **React 组件错误**:React 组件产生的错误。
- **跨域错误**:例如接口跨域、script 脚本跨域等等。
- **console.error**:使用 console.error 打印的错误。

#### 1.1 SyntaxError

```js
// SyntaxError构造签名
new SyntaxError([message[, fileName[, lineNumber]]])
```

- message:可选,可阅读的错误描述信息。
- fileName:可选,包含引发异常的代码的文件名。
- lineNumber 可选,包含引发异常的代码的行号。

```js
let a=1b=2; // SyntaxError: Invalid or unexpected token

// 捕获SyntaxError错误
function mockError() {
  try {
    eval("hoo bar");
  } catch (e) {
    console.log(e instanceof SyntaxError); // true
    console.log(e.message); // "Unexpected identifier"
    console.log(e.name); // "SyntaxError"
    console.log(e.fileName); // undefined
    console.log(e.lineNumber); // undefined
    console.log(e.columnNumber); // undefined
    console.log(e.stack); // "SyntaxError: Unexpected identifier at mockError (index.html:105:7) at index.html:116:3"
  }
}
mockError();

// 创建SyntaxError错误
function createError() {
  try {
    // 通过throw语句抛出异常
    throw new SyntaxError("Hello", "someFile.js", 10);
  } catch (e) {
    console.log(e instanceof SyntaxError); // true
    console.log(e.message); // "Hello"
    console.log(e.name); // "SyntaxError"
    console.log(e.fileName); // "someFile.js"
    console.log(e.lineNumber); // 10
    console.log(e.columnNumber); // 0
    console.log(e.stack); // "@Scratchpad/2:11:9\n"
  }
}
createError();
```

#### 1.2 TypeError

```js
// TypeError构造签名
new TypeError([message[, fileName[, lineNumber]]])
```

- message:可选,可阅读的错误描述信息。
- fileName:可选,包含引发异常的代码的文件名。
- lineNumber 可选,包含引发异常的代码的行号。

```js
const a = 1
console.log(a.sort()) // TypeError: a.sort is not a function

try {
  null.f()
} catch (e) {
  console.log(e instanceof TypeError) // true
  console.log(e.message) // "null has no properties"
  console.log(e.name) // "TypeError"
  console.log(e.fileName) // "Scratchpad/1"
  console.log(e.lineNumber) // 2
  console.log(e.columnNumber) // 2
  console.log(e.stack) // "@Scratchpad/2:2:3\n"
}

try {
  throw new TypeError('Hello', 'someFile.js', 10)
} catch (e) {
  console.log(e instanceof TypeError) // true
  console.log(e.message) // "Hello"
  console.log(e.name) // "TypeError"
  console.log(e.fileName) // "someFile.js"
  console.log(e.lineNumber) // 10
  console.log(e.columnNumber) // 0
  console.log(e.stack) // "@Scratchpad/2:2:9\n"
}
```

#### 1.3 ReferenceError

```js
// ReferenceError构造签名
new ReferenceError([message[, fileName[, lineNumber]]])
```

- message:可选,可阅读的错误描述信息。
- fileName:可选,包含引发异常的代码的文件名。
- lineNumber 可选,包含引发异常的代码的行号。

```js
// 捕获ReferenceError异常
try {
  var a = b
} catch (e) {
  console.log(e instanceof ReferenceError) // true
  console.log(e.message) // "b is not defined"
  console.log(e.name) // "ReferenceError"
  console.log(e.fileName) // "Scratchpad/1"
  console.log(e.lineNumber) // 2
  console.log(e.columnNumber) // 6
  console.log(e.stack) // "@Scratchpad/2:2:7\n"
}
```

#### 1.4 RangeError

```js
// RangeError构造签名
new RangeError([message[, fileName[, lineNumber]]])
```

- message:可选,可阅读的错误描述信息。
- fileName:可选,包含引发异常的代码的文件名。
- lineNumber 可选,包含引发异常的代码的行号。

```js
// 递归不设置出口会触发RangeError错误
function foo() {
  foo()
}
foo() // RangeError: Maximum call stack size exceeded(超出了最大调用堆栈大小)
```

#### 1.5 EvalError

```js
// EvalError构造签名
new EvalError([message[, fileName[, lineNumber]]])
```

- message:可选,可阅读的错误描述信息。
- fileName:可选,包含引发异常的代码的文件名。
- lineNumber 可选,包含引发异常的代码的行号。

```js
try {
  throw new EvalError('Hello', 'someFile.js', 10)
} catch (e) {
  console.log(e instanceof EvalError) // true
  console.log(e.message) // "Hello"
  console.log(e.name) // "EvalError"
  console.log(e.fileName) // "someFile.js"
  console.log(e.lineNumber) // 10
  console.log(e.columnNumber) // 0
  console.log(e.stack) // "@Scratchpad/2:2:9\n"
}
```

#### 1.6 URIError

```js
// URIError构造签名
new URIError([message[, fileName[, lineNumber]]])
```

- message:可选,可阅读的错误描述信息。
- fileName:可选,包含引发异常的代码的文件名。
- lineNumber 可选,包含引发异常的代码的行号。

```js
try {
  decodeURIComponent('%')
} catch (e) {
  console.log(e instanceof URIError) // true
  console.log(e.message) // "malformed URI sequence"
  console.log(e.name) // "URIError"
  console.log(e.fileName) // "Scratchpad/1"
  console.log(e.lineNumber) // 2
  console.log(e.columnNumber) // 2
  console.log(e.stack) // "@Scratchpad/2:2:3\n"
}
```

## 2.捕获错误方案

### 2.1 try/catch/finally 捕获常规错误

try/catch/finally 是 JS 最为常用的错误捕获方法,try 表示尝试执行代码块,若发生异常 try 会被终止执行,catch 用于捕获异常,throw 语句用于抛出一个异常,当 try 代码块发生异常时就会执行 catch 代码块。try 和 catch 代码块最终只会执行其中之一,而 finally 无论代码执行是否出现异常都会被执行。该方案虽然能捕获常规运行时错误,语法错误和异步错误都无法捕获,且不够简洁,多个 try/catch/finally 嵌套会严重影响代码的可读性和可维护性。

```js
// try/catch无法捕获SyntaxError错误
try {
  let a=1b; // SyntaxError: Invalid or unexpected token
} catch (e) {
  console.log("error:", e);
}


const task = () => {
  return new Promise((resolve, reject) => {
    throw new Error("error"); // Uncaught (in promise) Error: error
  });
};
// try/catch无法捕获异步错误
try {
  task();
} catch (e) {
  console.log("error", e);
}
```

### 2.2 window.onerror 捕获常规错误和异步错误

当 JS 运行时错误发生时,window 会触发一个 ErrorEvent 接口的 error 事件。window.onerror 可以捕获常规运行时错误和异步错误,无法捕获语法错误、资源加载错误、Promise 错误。

```js
// onerror捕获TypeError错误
window.onerror = (message, source, lineno, colno, error) => {
  // 错误信息: Uncaught TypeError: a.sort is not a function
  console.log("错误信息:", message);
  // 发生错误的脚本URL: http://127.0.0.1:5500/index.html
  console.log("发生错误的脚本URL:", source);
  // 发生错误的行号(数字): 105
  console.log("发生错误的行号(数字):", lineno);
  // 发生错误的列号(数字): 5
  console.log("发生错误的列号(数字):", colno);
  // Error对象: TypeError: a.sort is not a function at index.html:106:5
  console.log("Error对象:", error);
};
let a = 1;
a.sort();

// onerror捕获异步错误
window.onerror = (message, source, lineno, colno, error) => {
  // 错误信息: Uncaught Error: error
  console.log("错误信息:", message);
  // 发生错误的脚本URL: http://127.0.0.1:5500/index.html
  console.log("发生错误的脚本URL:", source);
  // 发生错误的行号(数字): 108
  console.log("发生错误的行号(数字):", lineno);
  // 发生错误的列号(数字): 11
  console.log("发生错误的列号(数字):", colno);
  // Error对象: Error: error at index.html:108:11
  console.log("Error对象:", error);
};
setTimeout(() => {
  throw new Error("error");
});

// onerror无法捕获SyntaxError错误
window.onerror = (message, source, lineno, colno, error) => {
  console.log("message:", message);
};
let a=1b=2; // SyntaxError: Invalid or unexpected token

// onerror无法捕获资源加载错误,例如加载script脚本、image、css等资源
<img src="../xxx.png" />
<script src="../xxx.js"></script>
<link rel="stylesheet" type="text/css" href="../xxx.css"/>
window.onerror = (message, source, lineno, colno, error) => {
  console.log("message:", message);
};

// onerror无法捕获Promise错误,Promise抛出错误并不会触发onerror
window.onerror = (message, source, lineno, colno, error) => {
  console.log("message:", message);
};
const task = () => {
  return new Promise((resolve, reject) => {
    throw new Error("error"); // Uncaught (in promise) Error: error
  });
};
task();
```

### 2.3 window.addEventListener 监听 error 事件捕获常规运行时错误、异步错误、资源加载错误

当一项资源(如图片或脚本)加载失败时,加载资源的元素会触发一个 Event 接口的 error 事件,这些 error 事件不会向上冒泡到 window,但能被捕获,而 window.onerror 不能监测捕获。使用 window.addEventListener 监听 error 事件资源错误可以被捕获到,例如图片、script、css 加载错误,但对于 `new Image()`错误和 fetch 错误均无法捕获。window.addEventListener 监听 error 事件可以捕获常规运行时错误、异步错误、资源加载错误(对于 `new Image()`错误和 fetch 错误均无法捕获),无法捕获
语法错误、Promise 错误。

```js
// 故意加载不存在的图片
<img src="../../../xxx.png" />;
// addEventListener监听error事件可以捕获部分资源加载异常
window.addEventListener(
  "error",
  function (event) {
    console.log(event); // Event{....}
  },
  true
);

// addEventListener监听error事件无法捕获new Image()加载异常
const img = new Image();
img.src = "../../../xxx.png";
img.onerror = (e) => {
  console.log(e);
};

// addEventListener监听error事件无法捕获SyntaxError
window.addEventListener(
  "error",
  function (event) {
    console.log("e", event);
  },
  true
);
let a=1b=2; // SyntaxError: Invalid or unexpected token

// addEventListener监听error事件无法捕获Promise抛出的异常
window.addEventListener(
  "error",
  function (event) {
    console.log("e", event);
  },
  true
);
const task = () => {
  return new Promise((resolve, reject) => {
    throw new Error("error"); // Uncaught (in promise) Error: error
  });
};
task();
```

### 2.4 通过重写原生方法捕获跨域错误

由于 try/catch 无法对跨域错误进行捕获,需要通过重写原生方法捕获错误。

```js
const originAddEventListener = EventTarget.prototype.addEventListener
// 重写addEventListener方法
EventTarget.prototype.addEventListener = (type, listener, options) => {
  const wrappedListener = (...args) => {
    try {
      return listener.apply(this, args)
    } catch (err) {
      throw err // 抛出异常
    }
  }
  return originAddEventListener.call(this, type, wrappedListener, options)
}
```

x

### 2.5 window.addEventListener 监听 unhandledrejection 事件捕获 Promise 错误

当 Promise 发生错误时如果没有使用 catch()方法指定错误处理的回调函数,Promise 对象抛出的错误不会传递到外层代码,所以 try/catch 无法捕获到 Promise 中生产的错误,同样的也无法使用 try/catch 捕获 async 包裹的错误。由于 import()函数返回的也是一个 promise,所以本质上仍无法使用 try/catch 捕获错误。Promise 中产生的错误通过 catch()进行捕获,但这样侵入性太强,而使用 window.addEventListener 监听 unhandledrejection 事件捕获 Promise 产生的错误是最为合理的,当 Promise 被 reject 且没有 reject 处理器的时候,会触发 unhandledrejection 事件(这可能发生在 window 下,但也可能发生在 Worker 中)。window.addEventListener 监听 unhandledrejection 只能捕获 Promise 生产的异常,无法捕获其他异常。

```js
window.addEventListener('unhandledrejection', (event) => {
  // event是一个PromiseRejectionEvent对象
  console.log(event) // PromiseRejectionEvent {...}
})
const task = () => {
  return new Promise((resolve, reject) => {
    throw new Error('error') // Uncaught (in promise) Error: error
  })
}
task()
```

### 2.6 Vue.config.errorHandler 捕获 Vue 组件错误

由于 Vue 会捕获所有 Vue 单文件组件或者 Vue.extend 继承的代码,所以在 Vue 里面出现的错误,并不会直接被 window.onerror 捕获,而是会抛给 Vue.config.errorHandler。

```js
/**
 * 全局捕获Vue错误，直接扔出给onerror处理
 */
Vue.config.errorHandler = function (err) {
  console.log(err)
}
```

### 2.7 声明错误边界组件捕获 React 组件错误

通过 componentDidCatch 钩子函数捕获 React 组件产生的错误。当错误边界组件的中的子组件产生错误时均会冒泡到错误边界组件,并触发 componentDidCatch 钩子函数,通过 componentDidCatch 钩子函数就能捕获组件产生的错误(这可能是 React class 组件最后的倔强了吧)。

```tsx
import { Component } from 'react'
class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError(error) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // 你同样可以将错误日志上报给服务器
    logErrorToMyService(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      // 你可以自定义降级后的 UI 并渲染
      return <h1>Something went wrong.</h1>
    }
    return this.props.children
  }
}

// 使用错误边界组件
;<ErrorBoundary>
  <MyComponent />
</ErrorBoundary>
```

## 3.上报错误方案

### 3.1 通过接口请求异步上报

### 3.2 通过 1\*1 gif 图片上报

使用 1 乘 1 gif 图片上报错误的优点如下:

- 没有跨域问题。如果使用接口上报,对于非同源的请求则会产生跨域问题,而 img 可以从任何 URL 中加载,将 img 的 src 设置成其他域的 URL,可以实现简单的跨域,可以使用 onload 和 onerror 事件来确定是否加载异常。
- 发送 POST 请求之后无需获取或处理数据,服务端也无需响应数据。
- 安全性好。对于 JS、CSS、Img 等静态资源来说,每次向服务器发送 HTTP 请求,均不会携带 cookie,而接口请求会默认携带 Cookie,容易遭受 CSRF 攻击。
- 不会阻塞页面加载。JS 和 CSS 等资源均会影响页面加载,从而导致性能问题,而加载图片仅需要 new Image()的开销。
- GIF 格式占用体积小。相比较 BMP/PNG 可以节约 41%/35%体积,体积小也表示着网络带宽占用小,性能也会有所提供。
