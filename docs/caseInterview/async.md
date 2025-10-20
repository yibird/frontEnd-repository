## setTimeout、Promise、async/await 的区别?

setTimeout、Promise 和 async/await 都是 JavaScript 中用于处理异步操作的机制,但它们之间有着一些区别:

- setTimeout:setTimeout 是 JavaScript 中的一个函数,它可以将一个回调函数推迟一段时间后再执行。setTimeout 可以实现一些简单的异步操作,但是它只能实现一次性的、单一的异步操作,不能处理多个异步操作的完成状态,也不能取消一个已经设置的定时器。
- Promise:Promise 是一种用于处理异步操作的对象,可以用来表示一个异步操作的完成状态,即可以表示一个异步操作成功或失败,并且可以通过 then() 和 catch() 方法来处理异步操作的结果和异常。Promise 适用于处理需要多次异步操作并且需要处理异步操作的完成状态的情况。Promise 还支持链式调用,可以实现多个异步操作的顺序执行。
- async/await:async/await 是 ES2017 中新增的语法,它是一种基于 Promise 的异步编程方式。async/await 可以让异步代码看起来像同步代码一样,使得异步代码更加易读易写。使用 async/await 可以使代码逻辑更加清晰,便于维护。相比于 Promise，async/await 代码更加简洁易懂。

简单来说,setTimeout 适用于简单的单一异步操作,而 Promise 和 async/await 适用于多次异步操作,并且需要处理异步操作的完成状态。Promise 是一种用于处理异步操作的对象,async/await 是基于 Promise 的异步编程方式,可以使异步代码看起来像同步代码一样。

## 考察 Promise 的状态切换

```js
// 请问以下代码的输出结果
Promise.reject()
  .then(() => {
    console.log('success1')
  })
  .catch(() => {
    console.log('error1')
  })
  .then(() => {
    console.log('success2')
  })
  .catch(() => {
    console.log('error2')
  })
/*
 * 结果:先打印error1,然后打印success2。
 */
console.log(Promise.reject()) // Promise {<rejected>: undefined}
console.log(
  Promise.reject()
    .then(() => {
      console.log('success1')
    })
    .catch(() => {
      console.log('error1')
    }),
) // Promise {<fulfilled>: undefined}
```

Promise 可以简单理解为一个异步容器,用于提供各种异步操作处理。Promise 分为`pending`(进行中)、`fulfilled`(已成功)、`rejected`(已失败)三种状态,只有异步操作的结果才能决定 Promise 的状态,其他操作都无法改变 Promise 状态。then()和 catch()都是 Promise.prototype 上的方法,then()用于为 Promise 实例添加状态改变时的回调函数,并返回一个状态为`fulfilled`状态的新 Promise 实例。catch()是`then(null,rejection)`或`then(undefined,rejection)`的别名。当 Promise 为`fulfilled`状态时才会执行 then(),当 Promise 状态为`rejected`时才会执行 catch()。Promise.reject()返回一个 rejected 状态的 Promise 实例,上面代码第一个 catch()会被执行,但是执行 catch()会返回一个状态为 fulfilled 的新 Promise 实例,所以会执行第二个 then()。
