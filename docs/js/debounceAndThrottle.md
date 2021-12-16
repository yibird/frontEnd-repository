防抖和节流属于性能优化的方面的知识,它们的作用都是防止函数多次调用。防抖与节流的区别在于:假设用户一直触发一个函数,且每次触发时间的间隔小于设置的时间(本次触发时间-上次触发时间 < 设置的时间),在防抖情况下只会调用一次,在节流情况下则会每隔一定时间调用一次函数。防抖函数是目标函数每次触发时间的间隔小于设置的时间,那么只会调用一次函数。节流是目标函数每次触发时间的间隔小于设置的时间,那么会每隔一定时间执行一次函数。简单来说防抖是在某段时间内使函数只执行一次,节流是在某段时间内按时间间隔执行函数。

### 1.节流

节流函数非常适用于函数被频繁调用的场景,例如:window.onsize()事件、mousemove 事件、上传进度等场景。
实现节流的方式分为时间戳和定时器两种。

#### 1.1 通过时间戳实现节流函数

第一种是通过时间戳来判断是否已到执行时机。首先声明一个变量保存上次执行的时间,然后判断当前时间戳-上次执行时间是否大于函数的执行间隔时间(wait),若大于则调用目标函数并更新函数上次执行的时间,否则不做任何操作。

```js
/**
 * 节流函数可以比喻为水库,wait用于控制水库泄水的间隔,假设泄水的间隔为10s(每过10s
 * 泄一次水),本次泄水时间-上次泄水时间大于泄水时间间隔才能泄水,否则不做任何操作。
 *
 * fn为要执行的目标函数,
 * wait为函数执行的间隔时间
 */
function throttle(fn, wait = 50) {
  //声明变量存储上次函数执行的时机
  let preTime = 0;
  return (...args) => {
    //获取当前时间
    let now = +new Date();

    //如果当前时间-上次函数执行时间 > 间隔时间
    if (now - preTime > wait) {
      preTime = now;
      fn.apply(this, args);
    }
  };
}

const throttleFn = throttle(() => {
  console.log("throttleFn");
}, 1000);
//每隔10ms执行一次throttleFn,只有本次执行时间-上次执行时间大于1000ms才会执行fn函数
setInterval(throttleFn, 10);
```

#### 1.2 通过定时器实现节流函数

节流函数也可以通过定时器来实现。流程大致为:首先设置一个定时器,当定时器存在时就清空定时器,然后重新设置定时器,当外部函数执行的时间间隔小于 wait 时(则说明未到 fn 的执行时机),setInterval 中的 fn 函数被放弃执行。当外部函数执行的时间间隔大于 wait 时(则说明已到 fn 的执行时机),setInterval 中的 fn 函数会被执行。

```js
/**
 * 节流函数可以比喻为水库,wait用于控制水库泄水的间隔,假设泄水的间隔为10s(每过10s
 * 泄一次水),本次泄水时间-上次泄水时间大于泄水时间间隔才能泄水,否则不做任何操作。
 *
 * fn为要执行的目标函数,
 * wait为函数执行的间隔时间
 */
function throttle(fn, wait = 50) {
  //设置一个定时器
  let timer = null;
  return (...args) => {
    /**
     * 如果定时器存在就清理定时器
     */
    if (timer) {
      clearInterval(timer);
    }
    //只有外部触发时间的间隔的大于wait才会执行fn
    timer = setInterval(() => {
      fn.apply(this, args);
    }, wait);
  };
}
const throttleFn = throttle(() => {
  console.log("throttleFn");
}, 1000);
//每隔800ms执行一次throttleFn,只有本次执行时间-上次执行时间大于1000ms才会执行fn函数
setInterval(throttleFn, 800);
```

#### 1.3 加强版节流

节流函数虽然可以防止函数频繁触发,当本次执行时间-上次执行时间大于 fn 函数执行时间间隔时,会导致频繁的清理定时器并重新生成定时器,造成 fn 函数一直无法执行,导致用户操作迟迟得不到响应。我们可以将节流与防抖结合起来,变成一个加强版本节流函数,其关键字在于在 wait 时间内生成一个新的定时器,只要 wait 时间到了必须给用户一个相应。

```js
/**
 * 节流函数可以比喻为水库,wait用于控制水库泄水的间隔,假设泄水的间隔为10s(每过10s
 * 泄一次水),本次泄水时间-上次泄水时间大于泄水时间间隔才能泄水,否则不做任何操作。
 *
 * fn为要执行的目标函数,
 * wait为函数执行的间隔时间
 */
function throttle(fn, wait = 50) {
  /*
   * 声明一个变量保存上次函数执行的时间
   * 声明一个定时器
   */
  let preTime = 0,
    timer = null;

  return (...args) => {
    //获取当前时间
    const now = +new Date();

    //如果本次执行时间-上次执行时间>fn函数执行的时间间隔说明fn可以执行了
    if (now - preTime > wait) {
      //更新上次执行时间
      preTime = now;
      fn.apply(this, args);
    } else {
      /*
       *本次执行时间 - 上次执行时间<fn()执行的时间间隔,
       *则为本次触发操作设立一个新的定时器,定时器时间结束后执行fn()
       */
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        preTime = now;
        fn.apply(this, args);
      }, wait);
    }
  };
}

//测试
const throttleFn = throttle(() => {
  console.log("throttleFn");
}, 1000);
document.addEventListener("scroll", throttleFn);
```

举一个例子吧,假设 fn 的执行时间间隔为 1000ms(wait 为 1000ms),当 scroll 事件触发的间隔小于 1000ms 时,会执行防抖逻辑(else 部分),意思说无论你在这 1000ms 触发了多少次 scroll 事件都会执行一次 fn 函数。当 scroll 事件触发的间隔大于 1000ms 时,会执行节流逻辑,从而安装 wait 间隔性的执行 fn 函数。

### 2 防抖

防抖函数的实现原理是利用定时器,当函数第一次执行时设置一个定时器,除首次调用函数时定时器为空,其他情况下定时器都不为空,定时器不为空时先清理定时器,然后重新设置定时器。当存在没有被清理的定时器时,定时器计时结束后就会执行目标函数。防抖函数的使用场景有 window.srcoll()事件、window.size()事件、文本框输入时向后端发送 Ajax 请求。

#### 2.1 简单版实现防抖函数

```js
/*
 * fn为要执行的函数,wait为设置的函数执行时间
 */
function debounce(fn, wait = 50) {
  //声明一个定时器,闭包缓存timer
  let timer = null;

  //返回一个新的函数
  return (...args) => {
    //如果timer存在就清理定时器
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, wait);
  };
}
//测试 监听滚动事件
document.addEventListener(
  "scroll",
  debounce(() => {
    console.log(111);
  }, 1000)
);
```

执行步骤如下:
当第一次滑动滚动条执行 debounce(),debounce()中声明了一个定时器,然后返回了一个新的函数。每次滑动滚动条都会执行返回的函数。执行返回的新的函数首先判断定时器是否为空,如果不为空就清除定时器。由于函数第一次进入 timer 为 null 所以不会进入 if,然后通过 setTimeout 设置定时器,如果在 wait(1s 内秒)时间内没有触发滚动事件那么就会执行 fn 函数。如果在 wait 时间(1s 内秒)内触发了滚动事件就会进入 if 判断清空定时器,除一次调用 debounce()时定时器为空,其他情况定时器都不为空(因为先清空后赋值)。也就是说本次滚动事件触发时间 - 上次滚动事件触发时间如果小于设置的时间(wait)那么目标函数就不会执行。debounce()用到了闭包与高阶函数的知识。

#### 2.2 增强版防抖

简单版的增强函数能应付大多数场景了,简单版无法在第一次触发回调时调用目标函数,增强版的防抖函数增加了函数第一次调用时执行目标函数(也就是 fn)。

```js
/*
 * fn为要执行的函数,wait为设置的函数执行时间,immediate表示是否立即执行函数
 */
function debounce(fn, wait = 50, immediate = true) {
  //声明一个定时器,闭包缓存timer
  let timer = null;

  //返回一个新的函数
  return (...args) => {
    //如果timer存在就清理定时器
    if (timer) {
      clearTimeout(timer);
    }
    if (immediate && !timer) {
      fn.apply(this, args);
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, wait);
  };
}
document.addEventListener(
  "scroll",
  debounce(() => {
    console.log(111);
  }, 1000)
);
```

对比简单版增加了 immediate 参数,当 immediate 为 true 时且定时器为空时就执行目标函数,定时器为空说明第一次触发回调函数。
