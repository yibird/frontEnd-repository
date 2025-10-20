防抖(Debouncing)和节流(Throttling)是两种常用的技术,用于控制函数的执行频率,特别是在处理高频率事件(如滚动、输入、窗口调整大小等)时,以提高性能和用户体验。

## 1.防抖

防抖是指在事件触发后,等待一段时间,如果在这段时间内没有再次触发事件,则执行事件处理函数。如果在这段时间内再次触发事件,则重新计时。简单来说,防抖函数可以保证多次执行时只执行最后一次,通常适用于频繁点击按钮发起请求、频繁输入 input、文本编辑器实时保存、频繁触发 resize 事件等场景。

### 1.1 实现防抖函数

防抖函数可以基于 setTimeout 实现,其原理如下:声明一个定时器,每次执行函数前先判断定时器是否为空,如果不为空则说明目标函数以被执行,此时需要通过 clearTimeout 清理定时器;如果不为空则通过 setTimeout 创建一个定时器并赋值,该定时器将延迟 wait 后执行,因此如果在 wait 时间内多次执行目标函数,由于每次执行前都会判断定时器是否为空,所以只会执行最后一次。

```js
/*
 * 防抖函数,一个高阶函数,返回一个新的函数
 * @param fn 目标函数
 * @param wait 函数执行时间
 */
function debounce(fn, wait = 50) {
  // 声明一个定时器,闭包缓存timer
  let timer = null
  // 返回一个新的函数
  return (...args) => {
    // 如果timer存在就清理定时器
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, wait)
  }
}
// 测试:监听滚动事件
document.addEventListener(
  'scroll',
  debounce(() => {
    console.log(111)
  }, 1000),
)
```

### 1.2 防抖函数增强版

简单版的增强函数能应付大多数场景了,简单版无法在第一次触发回调时调用目标函数,增强版的防抖函数增加了函数第一次调用时执行目标函数(fn)。

```js
/*
 * fn为要执行的函数,wait为设置的函数执行时间,immediate表示是否立即执行函数
 */
/*
 * 防抖函数,一个高阶函数,返回一个新的函数
 * @param fn 目标函数
 * @param wait 函数执行时间
 * @param immediate 是否立即执行目标函数
 */

function debounce(fn, wait = 50, immediate = true) {
  //声明一个定时器,闭包缓存timer
  let timer = null

  //返回一个新的函数
  return (...args) => {
    //如果timer存在就清理定时器
    if (timer) {
      clearTimeout(timer)
    }
    if (immediate && !timer) {
      fn.apply(this, args)
    }
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, wait)
  }
}
document.addEventListener(
  'scroll',
  debounce(() => {
    console.log(111)
  }, 1000),
)
```

对比简单版增加了 immediate 参数,当 immediate 为 true 时且定时器为空时就执行目标函数,定时器为空说明第一次触发回调函数。

## 2.节流

节流是指在连续触发事件的情况下,保证在一定时间内只执行一次事件处理函数。简单来说,使用节流函数可以保证在多次执行时只在指定时间间隔内执行一次,通常适用于滚动加载(scroll 事件)、鼠标频繁点击或移动(mousedown 或 mousemove 事件)、上传进度等场景。

### 2.1 实现节流函数

实现节流的方式分为时间戳和定时器两种:

- 时间戳方式:首先声明一个变量保存上次执行的时间,然后判断当前时间戳-上次执行时间是否大于函数的执行间隔时间(wait),若大于则执行目标函数并更新函数上次执行时间(preTime)为本次目标函数执行时间(now)。

```js
/**
 * 节流函数,一个高阶函数,返回一个新的函数
 * @param fn 目标执行函数
 * @param wait 目标执行函数的执行的间隔时间
 */
function throttle(fn, wait = 50) {
  // 声明变量存储上次函数执行时间
  let preTime = 0
  return (...args) => {
    // 获取当前时间
    let now = +new Date()
    // 如果当前时间 - 上次函数执行时间 > 间隔时间 执行目标函数,并将目标函数的执行时间赋值给preTime
    if (now - preTime > wait) {
      preTime = now
      fn.apply(this, args)
    }
  }
}

// 测试
const throttleFn = throttle(() => {
  console.log('throttleFn')
}, 1000)
// 每隔10ms执行一次throttleFn,只有本次执行时间-上次执行时间大于1000ms才会执行fn函数
setInterval(throttleFn, 10)
```

- 定时器方式:首先设置一个定时器,当定时器不为空时说明函数执行时间处于指定执行事件间隔内,因此需要通过 clearInterval 清理定时器。如果不为空则通过 setInterval 创建一个定时器并赋值,该定时器将间隔 wait 时间执行目标函数,这意味着多次触发目标执行函数,如果执行时机在 wait 内只会执行第一次。

```js
/**
 * 节流函数,一个高阶函数,返回一个新的函数
 * @param fn 目标执行函数
 * @param wait 目标执行函数的执行的间隔时间
 */
function throttle(fn, wait = 50) {
  // 设置一个定时器
  let timer = null
  return (...args) => {
    // 如果定时器存在就清理定时器
    if (timer) {
      clearInterval(timer)
    }
    // 只有外部触发时间的间隔的大于wait才会执行目标函数
    timer = setInterval(() => {
      fn.apply(this, args)
    }, wait)
  }
}
const throttleFn = throttle(() => {
  console.log('throttleFn')
}, 1000)
// 每隔800ms执行一次throttleFn,只有本次执行时间-上次执行时间大于1000ms才会执行fn函数
setInterval(throttleFn, 800)
```

### 2.2 增强版版节流

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
   * 声明一个变量保存上次函数执行的时间,声明一个定时器
   */
  let preTime = 0,
    timer = null

  return (...args) => {
    // 获取当前时间
    const now = +new Date()
    // 如果本次执行时间-上次执行时间>fn函数执行的时间间隔说明fn可以执行了
    if (now - preTime > wait) {
      //更新上次执行时间
      preTime = now
      fn.apply(this, args)
    } else {
      /*
       * 本次执行时间 - 上次执行时间 < fn() 执行的时间间隔,
       * 则为本次触发操作设立一个新的定时器,定时器时间结束后执行fn()
       */
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        preTime = now
        fn.apply(this, args)
      }, wait)
    }
  }
}

// 测试
const throttleFn = throttle(() => {
  console.log('throttleFn')
}, 1000)
document.addEventListener('scroll', throttleFn)
```

假设 fn 的执行时间间隔为 1000ms(wait 为 1000ms),当 scroll 事件触发的间隔小于 1000ms 时,会执行防抖逻辑(else 部分),意思说无论在这 1000ms 触发了多少次 scroll 事件都会执行一次 fn 函数。当 scroll 事件触发的间隔大于 1000ms 时,会执行节流逻辑,从而安装 wait 间隔性的执行 fn 函数。
