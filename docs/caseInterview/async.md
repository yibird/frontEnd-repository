### setTimeout、Promise、async/await 的区别?

### 考察 Promise 的状态切换

```js
// 请问以下代码的输出结果
Promise.reject()
  .then(() => {
    console.log("success1");
  })
  .catch(() => {
    console.log("error1");
  })
  .then(() => {
    console.log("success2");
  })
  .catch(() => {
    console.log("error2");
  });
/*
 * 结果:先打印error1,然后打印success2。
 */
console.log(Promise.reject()); // Promise {<rejected>: undefined}
console.log(
  Promise.reject()
    .then(() => {
      console.log("success1");
    })
    .catch(() => {
      console.log("error1");
    })
); // Promise {<fulfilled>: undefined}
```

Promise 可以简单理解为一个异步容器,用于提供各种异步操作处理。Promise 分为`pending`(进行中)、`fulfilled`(已成功)、`rejected`(已失败)三种状态,只有异步操作的结果才能决定 Promise 的状态,其他操作都无法改变 Promise 状态。then()和 catch()都是 Promise.prototype 上的方法,then()用于为 Promise 实例添加状态改变时的回调函数,并返回一个状态为`fulfilled`状态的新 Promise 实例。catch()是`then(null,rejection)`或`then(undefined,rejection)`的别名。当 Promise 为`fulfilled`状态时才会执行 then(),当 Promise 状态为`rejected`时才会执行 catch()。Promise.reject()返回一个 rejected 状态的 Promise 实例,上面代码第一个 catch()会被执行,但是执行 catch()会返回一个状态为 fulfilled 的新 Promise 实例,所以会执行第二个 then()。
