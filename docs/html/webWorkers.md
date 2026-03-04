### Web Worker 介绍

由于 JS 执行环境是单线程的,且 JS 主线程与 GUI 线程相互互斥,当 JS 主线程任务执行时间过长时就会阻塞 GUI 线程渲染,从而导致页面出现卡顿。在 H5 提供了 Web Worker,用于将 JS 主线程的工作转嫁给独立的实体,而不会改变现有的单线程的模型,并且 Web Worker 独立于 JS 的主执行环境,且不会它不会影响主线程的正常执行和页面 UI 的渲染。Web Worker 线程通过 postMessage 与 JS 主线程通讯。Web Worker 线程与线程的区别如下:

- **Web Worker 线程是以实际线程实现**。例如,Blink 浏览器引擎实现的工作线程的 WorkerThread 就对应着底层的线程。
- **Web Worker 线程是并行执行的**。虽然页面和 Web Worker 线程都是单线程 JS 环境,但是每个环境中的指令则可以并行执行。
- **Web Worker 线程可以共享某些内存**。Web Worker 线程能够使用 SharedArrayBuffer 在多个环境中共享数据,而在传统多线程模型中,多线程具有读写共享内存空间的能力。而在传统多线程模型中线程通过锁实现并发控制,但在 JS 使用 Atomics 接口实现并发控制。
- **Web Worker 线程不一定在同一个进程里**。通常,一个进程内部可以包含多个线程。根据浏览器引擎实现,Web Worker 线程可能与页面属于同一个线程,也可能不属于,例如,Chrome 的 Blik 引擎对 SharedWorker 线程和 ServiceWorker 线程使用独立的进程。
- **创建 Web Worker 线程的开销很大**。Web Worker 线程具有独立的事件循环、全局对象、事件处理程序和其他 JS 环境必需的特性,所以创建这些结构开销比较大。通常 Web Worker 线程用于处理主线程中耗时长的 CPU 密集任务。

### Web Worker 线程类型

Web Worker 线程规范中定义了三种主要的 Web Worker 线程:专用工作者线(Dedicated Workers)、共享工作者线程(SharedWorkders)、服务工作者线程(ServiceWorkers)。除此之外 Web Worker 还包含 Chrome Workers 和 Audio Workers。

- **Dedicated Workers(专用工作者线程)**:Dedicated Workers 通常简称为工作者线程、Web Worker 或 Worker,可以让脚本单独创建一个 JS 线程,从而执行委托的任务。注意:专用工作者线程只能被创建它的页面使用。

- **SharedWorkders(共享工作者线程)**:SharedWorkders 与 Dedicated Workers 非常相似,其主要区别在于 SharedWorkders 可以被多个不同的上下文使用,包括不同的页面及任何与创建 SharedWorkders 线程的脚本同源的脚本,它们都可以向 SharedWorkders 线程发送消息或从中接收消息。

- **ServiceWorkers(服务工作者线程)**:ServiceWorkers 一般作为 web 应用程序、浏览器和网络之前的代理服务器。ServiceWorkers 旨在(除开其他方面)创建有效的离线体验,例如:拦截网络请求、根据网络是否可用采取合适的行动并更新驻留在服务器上的资源、推送通知、后台同步 API。

- Chrome Workers(谷歌工作者线程):是一种仅适用于 firefox 的 worker。

- Audio Workers(音频工作者线程):允许在 web worker 上下文中直接完成脚本化音频处理。

在 Web Workers 环境中,全局对象并不是 window 对象,而 WorkerGlobalScope 实例,通过 self 关键字暴露。self 对象暴露的大部分方法都是 window 上方法的子集,所以操作都是与 window 对象类似的。

#### Dedicated Workers(专用工作者线程)

使用专用工作者线程的注意事项如下:

- 专用工作者线程可以指定脚本的 URI 或者在 Worker 线程中通过`importScripts()`将一个或多个脚本同步导入到 Worker,`importScripts()`只能在 Web Worker 环境中使用。
- 专用工作者线程只能加载与父页面同源的脚本文件,加载其他源会导致工作者线程加载错误,可以通过 Worker 的`onerror`事件监听脚本加载错误和执行错误。
- 专用工作者线程的 self 是一个 DedicatedWorkerGlobalScope 对象,DedicatedWorkerGlobalScope 是自 WorkerGlobalScope 的子类。专用工作者线程和脚本文件可以通过 PostMessage 相互通信,主线程可以通过`onmessage`事件监听 Worker 线程发送的数据,Worker 线程也可以通过 self 的`onmessage`事件监听主线程线程的数据。主线程与 Worker 线程的数据传递是通过拷贝来完成,而非共享内存,所以传递给 worker 的对象需要经过序列化,接下来在另一端还需要反序列化。

**postMessage** 是 html5 引入的 API,postMessage()方法允许来自不同源的脚本采用异步方式进行有效的通信,可以实现跨文本文档,多窗口,跨域消息传递,用于多窗口间数据通信,这也使它成为跨域通信的一种有效的解决方案。postMessage 的使用场景如下:

- 跨域通信。JSONP 是解决跨域方式中的其中一种,JSONP 通过 srcipt 标签的 src 属性向后端发起请求,服务端定义一个回调函数并将响应结果作为回调函数的入参返回至客户端,客户端执行该回调函数通过函数入参就能获取服务端响应结果。JSONP 只支持 GET 请求,不支持 POST 请求,而 postMessage()即支持 GET 请求跨域,又支持 POST 请求跨域。
- WebWorker 与主线程的通讯。postMessage()支持 WebWorker 与主线程相互传递数据,通过监听`onmessage`事件可以接收 postMessage()发送的数据。
- 多窗口数据通信。postMessage()可以在多个 iframe 相互传递数据。

<CodeGroup>
<CodeGroupItem title="worker.js" active>

```js
/**
 * self是Web Worker环境中的全局对象,在专用工作者线程中self
 * 是一个DedicatedWorkerGlobalScope对象。
 *
 * DedicatedWorkerGlobalScope{
 *  cancelAnimationFrame:()=>{ //... },
 *  // 用于关闭工作者线程
 *  close(){ //... },
 *  // 工作者线程名称
 *  name:"",
 *  // 用于监听主线程通过Worker实例的PostMessage发送的数据
 *  onmessage(){ //... },
 *  // 当Worker收到无法反序列化的消息时触发
 *  onmessageerror(){ //... },
 *  // 用于向主线程发送消息,如果消息是对象则需要序列化
 *  postMessage(){ //... },
 * }
 */
console.log(self)

// 通过importScripts()加载多个脚本文件,importScripts()只能用于Web Worker环境中
importScripts('./script01.js', './script02.js') // "script01 task" "script02 task"

// 监听主线程使用Worker实例通过postMessage()发送数据,e是一个MessageEvent对象
self.onmessage = (e) => {
  console.log(JSON.parse(e.data)) // {message: 'worker i love you!'}
}

// 监听Worker线程收到无法反序列化的消息时触发
self.onmessageerror = (e) => {
  console.log(e)
}

const sendMessage = () => {
  const data = {
    type: 'worker',
    message: 'hello web worker',
  }
  // 发送引用类型需要进行序列化,另一端需要反序列化
  postMessage(JSON.stringify(data))
}
sendMessage()
```

</CodeGroupItem>

<CodeGroupItem title="index.html">

```html
<script>
  /**
   * Worker接收执行的脚本的URL和配置项(可选)两个参数,配置项包含如下配置:
   * type:用以指定 worker 类型的 DOMString 值,该值可以是 classic 或 module,
   * 如果未指定,将使用默认值 classic。
   *
   * credentials:用以指定 worker 凭证的 DOMString 值,该值可以是 omit、
   * same-origin、include。如果未指定,或者type是classic,将使用默认值omit(不要求凭证)。
   *
   * name:在 DedicatedWorkerGlobalScope 的情况下,用来表示 worker 的 scope
   * 的一个 DOMString 值,主要用于调试目的。
   */
  const worker = new Worker('./worker.js', { name: 'worker01' })
  // 监听脚本文件通过postMessage()发送的数据,e是一个MessageEvent对象
  worker.onmessage = (e) => {
    // {type: 'worker', message: 'hello web worker'}
    console.log(JSON.parse(e.data))
    // 主线程向Worker线程发送数据
    worker.postMessage(JSON.stringify({ message: 'worker i love you!' }))
  }
  // 监听运行脚本时产生的错误,e是一个ErrorEvent对象
  worker.onerror = (e) => {
    console.log(e)
  }

  setTimeout(() => {
    // 在主线程中终止Worker线程,也可以在Worker线程调用close()关闭Worker线程
    worker.terminate()
  }, 3000)
</script>
```

</CodeGroupItem>

<CodeGroupItem title="script01.js">

```js
console.log('script01 task')
```

</CodeGroupItem>

<CodeGroupItem title="script02.js">

```js
console.log('script02 task')
```

</CodeGroupItem>

</CodeGroup>
