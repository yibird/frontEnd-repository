### 网络请求

### Ajax 和 Fetch 介绍

前端向后端发起 Http 请求分为 Ajax 和 Fetch 两种方式。Ajax 是一种用于创建快速动态网页的技术,具有局部刷新的特性极大的提升了用户的体验性,避免资源浪费。其缺点是当请求操作嵌套过多时就会产生回调地狱,所以通常在开发中利用 Promise 对 Ajax 工具进行再次封装便于使用。Axios 是前端领域最为流行的 Http 请求工具库,它是一个简洁高效的请求库,具有支持 NODE 端和浏览器端、Promise、拦截器与数据处理的等特性,Axios 在浏览器端底层基于 XML HttpRequest 对象处理请求,在 Node 端基于 NodeJS 的 Http 模块处理请求;Axios 不仅简单易用,而且还兼容好,最低兼容 IE7。

Fetch API 提供了一个 JavaScript 接口,用于访问和操作 HTTP 管道的一些具体部分,例如请求和响应。它还提供了一个全局 fetch() 方法(fetch 函数挂载在 window 对象下,所以 NODEJS 无法直接使用 fetch),该方法提供了一种简单,合理的方式来跨网络异步获取资源。Fetch 还利用了 Promise 特性,fetch()返回一个 Promise,通过 Promise 链式调用完美避开了回调地狱。

#### Fetch 和 Ajax 的区别

- fetch()返回的 promise 将不会拒绝 http 的错误状态,即使响应状态码是 404 或者 500。
- 在默认情况下 fetch 不会接受或者发送 cookies。不能接受跨域 cookies,也不能发起跨域回话。

### Ajax 实现原理

XMLHttpRequest 对象是实现 Ajax 的核心,该对象是一种支持异步请求的技术。简单来说,使用 XMLHttpRequest 对象可以通过 JS 向服务器发起请求并处理响应,但不会阻塞用户其他操作。使用 XMLHttpRequest 步骤如下:

- 创建一个 XMLHttpRequest 对象(记得做兼容性处理)。
- 创建一个新的 http 请求,指定该请求的请求方法、请求 URL、是否异步,再通过 XMLHttpRequest 的 send()向服务器发起请求。
- 设置响应 HTTP 请求状态变化的函数。
- 处理响应结果。对于同步请求可以直接根据 XMLHttpRequest 对象的 responseText 属性获取结果,对于异步请求则需要在 XMLHttpRequest 对象的 onreadystatechange 事件中保证请求成功响应后通过 responseText 获取结果。

**XMLHttpRequest Api:**

| 名称                                       | 描述                                                                                                                                                                                                  |
| ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| onreadystatechange                         | 当 readyState 属性发生变化时,调用的处理事件。                                                                                                                                                         |
| readyState                                 | 返回一个无符号短整型数字,代表请求的状态码。                                                                                                                                                           |
| response                                   | 返回一个 ArrayBuffer、Blob、Document，或 DOMString,具体是哪种类型取决于 XMLHttpRequest.responseType 的值,其中包含整个响应实体。                                                                       |
| responseText                               | 返回一个 DOMString,该 DOMString 包含对请求的响应,如果请求未成功或尚未发送,则返回 null。DOMString 是一个 UTF-16 字符串。由于 JavaScript 已经使用了这样的字符串,所以 DOMString 直接映射到 一个 String。 |
| responseType                               | 一个用于定义响应类型的枚举,可选值可参考 <https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/responseType>                                                                                |
| responseURL                                | 返回经过序列化的响应 URL,如果该 URL 为空,则返回空字符                                                                                                                                                 |
| responseXML                                | 返回一个 Document,其中包含该请求的响应,如果请求未成功、尚未发送或时不能被解析为 XML 或 HTML,则返回 null。                                                                                             |
| status                                     | 返回一个无符号短整型数字,代表请求的响应状态。                                                                                                                                                         |
| statusText                                 | 返回一个 DOMString,其中包含 HTTP 服务器返回的响应状态。与 XMLHTTPRequest.status 不同的是,它包含完整的响应状态文本(例如:"200 OK")。                                                                    |
| timeout                                    | 一个无符号长整型（unsigned long）数字,表示该请求的最大请求时间(毫秒),若超出该时间,请求会自动终止。                                                                                                    |
| upload                                     | 返回一个 XMLHttpRequestUpload 对象,代表上传进度。                                                                                                                                                     |
| withCredentials                            | 一个布尔值,用来指定跨域 Access-Control 请求是否应当带有授权信息,如 cookie 或授权 header 头。                                                                                                          |
| abort()                                    | 如果请求已被发出.则立刻中止请求。                                                                                                                                                                     |
| getAllResponseHeaders()                    | 以字符串的形式返回所有用 CRLF(回车和换行符) 分隔的响应头,如果没有收到响应,则返回 null。                                                                                                               |
| getResponseHeader(name)                    | 返回包含指定响应头的字符串,如果响应尚未收到或响应中不存在该报头,则返回 null。                                                                                                                         |
| open(method,url,[async],[user],[password]) | 方法初始化一个请求。该方法要从 JavaScript 代码使用;从原生代码初始化一个请求,使用 openRequest()替代。                                                                                                  |
| send([body])                               | 发送请求。如果请求是异步的(默认),那么该方法将在请求发送后立即返回。                                                                                                                                   |
| setRequestHeader(header,value)             | 设置 HTTP 请求头的值。必须在 open() 之后、send() 之前调用 setRequestHeader() 方法。                                                                                                                   |

#### 1.创建 XMLHttpRequest 对象

```js
/*
   1.创建XMLHttpRequest对象。创建时注意兼容性处理,window.XMLHttpReuqest 兼容 IE7+、 
   Firefox、Chrome、Opera、Safari window.ActiveXObject 兼容 IE6和IE5 
 */
const xhr = window.XMLHttpRequest
  ? new XMLHttpRequest()
  : window.ActiveXObject
  ? new ActiveXObject("Microsoft.XMLHTTP")
  : null;
```

#### 2.创建 Http 请求并发送请求

创建 Http 请求。XMLHttpRequest 通过 open(method,url,async)创建一个请求,method 表示请求方法,
url 表示请求路径,async 表示是否异步(为 true 表示异步请求,为 false 表示同步请求),send()用于发送 Http 请求。
注意:由于 GET 请求的请求参数是包含在 url 中,url 大小是有限制的(一般是 2kb),而 POST 请求的请求参数被包含在请求体中(即通过 send 函数传递参数),所以 POST 请求发送数据量比 GET 请求发送数据量大。

```js
// 2.1 创建GET请求,请求参数包含在请求URL中。
xhr.open("get", "http//localhost:8080/test-get?name='zxp'&ag=18", true);
xhr.send(); // 发送GET请求

// 2.2 创建POST请求,请求参数包含在请求体,POST请求需要设置请求头
xhr.open("post", "http://localhost:8080/test-post", true);
xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); // 设置请求头
xhr.send("name='zxp'&age=18"); // 发送POST请求,POST请求请求参数写在send()中
```

#### 3.设置响应 Http 状态变化函数

XMLHttpRequest 把请求发送到服务器我们并不知道这个 xhr 处于一种什么情况(是发送了请求,还是未发送请求),但可以通过 xhr 的 readyState 属性获取当前 XMLHttpRequest 对象的状态,readyState 有 5 个状态值,分别为 0~4,每个值代表了不同的含义:

- 0 表示未初始,尚未调用 open()。
- 1 表示已经调用 open(),但没有调用 send()。
- 2 表示已经调用 send(),但尚未收到服务器响应。
- 3 表示已经接收服务器部分的响应数据。
- 4 表示已经全部接收服务器响应数据,并可以在客户端使用了。

知道了 xhr 的状态但我们还需要知道这个请求是成功了还是失败了,可以通过 xhr 的 status 属性获取当前 HTTP 请求的状态码,下面仅列举了常用的 HTTP 状态码:

- 200 表示从客户端发来的请求在服务器端被正常处理了
- 204 表示请求处理成功，但没有资源返回
- 301 表示永久性重定向。该状态码表示请求的资源已被分配了新的 URI，以后应使用资源现在所指的 URI。
- 302 表示临时性重定向。
- 404 表示服务器上无法找到请求的资源。除此之外，也可以在服务器端拒绝请求且不想说明理由时使用。
- 500 表示服务器端在执行请求时发生了错误。也有可能是 Web 应用存在的 bug 或某些临时的故障。

  上面 2 步了解了之后,可以使用 onreadystatechange 监听 xhr 的 readyState 的变化,从而执行对应的逻辑。整体代码为:

```js
// 使用onreadystatechange监听xhr的readystate变化
xhr.onreadystatechange = function () {
  // 判断请求是否发送和响应成功
  if (xhr.readyState === 4 && xhr.status === 200) {
    // 具体的逻辑处理 ...
    // xhr.responseText 获得字符串形式的响应数据。
    // xhr.responseXML 获得XML 形式的响应数据。
  }
};
```

#### 4.处理响应结果

```js
/*
   同步请求:发送同步请求可以直接通过XMLHttpRequest对象的responseText属性直接获取响应结果
*/
xhr.open("get", "http//localhost:8080/test-get?name='zxp'&ag=18", false);
xhr.send(); // 发送请求你
document.body.innerText = xhr.responseText; // xhr.responseText获取响应结果

/*
   异步请求:发送异步请求则需要在onreadystatechange事件请求成功响应后通过XMLHttpRequest对象
   的responseText属性直接获取响应结果
*/
// 使用onreadystatechange监听xhr的readystate变化
xhr.onreadystatechange = function () {
  // 判断请求是否发送和响应成功
  if (xhr.readyState === 4 && xhr.status === 200) {
    // 具体的逻辑处理 ...
    // xhr.responseText 获得字符串形式的响应数据。
    // xhr.responseXML 获得XML 形式的响应数据。
    console.log(xhr.responseText); // xhr.responseText获取响应结果
  }
};
```

#### 5.使用 Promise 封装 XMLHttpRequest

### Fetch

Fetch 不是 ajax 的进一步封装,而是原生 js,用于代替 XmlHttpRequest 对象。fetch 函数挂载在 window 对象,且返回一个 Promise,当网络错误时会返回一个 reject 状态的 Promise,否则返回一个 resolve 状态的 Promise。fetch()签名如下:

```ts
console.log(window.fetch); // ƒ fetch() { [native code] }

// 签名1:第一个参数为请求URL,参数2是一个配置对象
Promise <Response> fetch(url:string,init?:RequestInit);
// 签名2:第一个参数是Request对象,参数2是一个配置对象,Request与RequestInit具有类似的属性
Promise<Response> fetch(req:Request,init?:RequestInit)
```

#### fetch 发送 GET 请求

```ts
// 创建请求头对象
const initHeader: Headers = new Headers({
  "Content-Type": "application/json",
});

const initOptions: RequestInit = {
  // 请求方法。可选值有GET、POST、PUT、DELETE等等
  method: "GET",
  // 请求的头信息。可以是一个Header对象,也可以是
  headers: initHeader,
  /*
    请求主体,可以是一个Blob、BufferSource (en-US)、FormData、URLSearchParams或USVString 对象,
    注意:GET 或 HEAD 方法的请求不能包含 body 信息
  */
  body: null,
  /*
    请求模式。可选值有cors、no-cors、same-origin、navigate。
    cors(默认):表示允许跨域请求。
    no-cors:表示不允许跨域保证请求对应的method只有HEAD、GET、POST 方法,并且请求的 
        headers 只能有简单请求头。
    same-origin:表示允许同源访问,若访问另一个源则会发生错误。
    navigate:表示这是一个浏览器的页面切换请求,navigate请求仅在浏览器切换页面时创建,
        该请求应该返回HTML
  */
  mode: "cors",
  /*
    请求的资格证书。如omit、same-origin 或者 include。为了在当前域名内自动发送cookie,必须提供这个选项。
    omit:从不向服务器发送cookies
    same-origin(默认):只有当URL与响应脚本同源才发送 cookies、HTTP Basic authentication 等验证信息
    include:不论是不是跨域的请求,总是发送请求资源域在本地的 cookies、HTTP Basic authentication 等验证信息
  */
  credentials: "omit",
  /*
    请求缓存模式。可选值有default、no-store、reload 、no-cache 、force-cache、only-if-cached。
    default:浏览器从HTTP缓存中寻找匹配的请求。如果缓存匹配上并且有效,它将直接从缓存中返回资源。
        如果缓存匹配上但已经过期,浏览器将会使用传统(conditional request)的请求方式去访问远程服务器。
        如果服务器端显示资源没有改动，它将从缓存中返回资源。否则，如果服务器显示资源变动,那么重新从服务
        器下载资源更新缓存。如果缓存没有匹配，浏览器将会以普通方式请求,并且更新已经下载的资源缓存。

    no-store:浏览器直接从远程服务器获取资源,不查看缓存,并且不会使用下载的资源更新缓存

    reload:浏览器直接从远程服务器获取资源,不查看缓存,然后使用下载的资源更新缓存。
    
    no-cache:浏览器在其HTTP缓存中寻找匹配的请求。如果有匹配,无论是新的还是陈旧的,浏览器都会向远程服务器
        发出条件请求。如果服务器指示资源没有更改,则将从缓存中返回该资源。否则,将从服务器下载资源并更新缓存。
        如果没有匹配,浏览器将发出正常请求,并使用下载的资源更新缓存。
    
    force-cache:浏览器在其HTTP缓存中寻找匹配的请求。如果有匹配项,不管是新匹配项还是旧匹配项,都将从缓存中返回。
        如果没有匹配,浏览器将发出正常请求,并使用下载的资源更新缓存。

    only-if-cached:浏览器在其HTTP缓存中寻找匹配的请求。如果有匹配项(新的或旧的),则从缓存中返回。
        如果没有匹配,浏览器将返回一个错误。
  */
  cache: "default",
  /*
    表示包含?如何处理重定向模式,可选值有follow、error、manual
  */
  redirect: "follow",
};
const url = "https://jsonplaceholder.typicode.com/todos/1";
fetch(url, initOptions)
  .then((res) => {
    /**
     * res是一个Response对象,具有如下方法:
     * ok:返回一个布尔值,表示响应成功(HTTP 状态码的范围在 200-299)。
     * status:返回响应Http状态码。
     * statusText:返回响应状态文本。
     * type:返回响应类型,例如:basic、cors
     * error():返回一个新的状态为网络错误的 Response 对象
     * arrayBuffer():返回一个将结果解析为ArrayBuffer类型的Promise对象。
     * blob():返回一个将结果解析为Blob类型的Promise对象。
     * json():返回一个将结果解析为JSON类型的Promise对象。
     * text():返回一个将结果解析为文本类型的Promise对象。
     * formData:返回一个将结果解析为FormData类型的Promise对象。
     */
    if (!res.ok) {
      throw new Error("request error!");
    }
    return res.json();
  })
  .then((data) => {
    console.log(data); // {completed: false,id: 1,title: "delectus aut autem",userId: 1}
  })
  .catch((err) => {
    console.log("err:" + err);
  });
```

#### fetch 发送 POST 请求

在发送 POST 请求时需要注意以下两点,第一需要将请求头的请求类型设置为`"Content-Type":"application/x-www-form-urlencoded"`,"application/x-www-form-urlencoded"表示以表单形式提交请求参数。第二 POST 请求的参数会通过请求主体发送至服务器,对于引用参数需要 JSON.stringif()进行序列化(原始对象转为二进制流的过程叫做序列化,反之叫做反序列化)。

```ts
// 创建请求头对象,也可以自定义请求头信息,例如Auth-Token
const initHeader = new Headers({
  "Content-Type": "application/x-www-form-urlencoded",
  "Auth-Token": "123asdjibasdgiuqweqwe",
});
// 创建请求对象
const request = new Request(url, {
  method: "POST",
  headers: initHeader,
  body: JSON.stringify(data), // 通过JSON.strinify()序列化请求参数
  mode: "cors",
  credentials: "omit",
  cache: "default",
} as any);

fetch(request, initOptions)
  .then((res) => {
    if (!res.ok) {
      throw new Error("request error!");
    }
    return res.json();
  })
  .then((data) => console.log(data))
  .catch((err) => console.log("err:" + err));

// 如果fetch的第一个参数是一个Request对象且传入了配置对象时,那么Request对象会与配置对象进行合并
fetch(request)
  .then((res) => {
    /**
     * res是一个Response对象,具有如下方法:
     * ok:返回一个布尔值,表示响应成功(HTTP 状态码的范围在 200-299)。
     * status:返回响应Http状态码。
     * statusText:返回响应状态文本。
     * type:返回响应类型,例如:basic、cors
     * error():返回一个新的状态为网络错误的 Response 对象
     * arrayBuffer():返回一个将结果解析为ArrayBuffer类型的Promise对象。
     * blob():返回一个将结果解析为Blob类型的Promise对象。
     * json():返回一个将结果解析为JSON类型的Promise对象。
     * text():返回一个将结果解析为文本类型的Promise对象。
     * formData:返回一个将结果解析为FormData类型的Promise对象。
     */
    if (!res.ok) {
      throw new Error("request error!");
    }
    return res.json();
  })
  .then((data) => console.log(data)) // {id: 101}
  .catch((err) => console.log("err:" + err));
```

#### fetch 设置超时时间

XMLHttpRequest 对象提供了超时时间可以拒绝请求时间大于超时时间的请求,但 fetch 并未提供超时时间等 API,不过可以通过 Promise.race()来实现超时时间拒绝请求功能。Promise.race()可以接收多个 Promise 等待最快对象完成,利用这一特性
可以判断请求是否超时,而 AbortController 用于手动终止一个或多个 DOM 请求。

```ts
// 创建一个AbortController对象,AbortController对象允许中止一个或多个Web请求
const controller = new AbortController();
// 返回一个AbortSignal对象实例,它可以用来 with/abort 一个Web(网络)请求,需要传递至fetch请求中
let signal = controller.signal;

const timeoutPromise = (timeout: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 请求超时
      resolve(new Response("timeout", { status: 504, statusText: "timeout " }));
      // 通过AbortController对象的abort()终止一个或多个请求
      controller.abort();
    }, timeout);
  });
};

// fetch请求
const url = "https://jsonplaceholder.typicode.com/todos/1";
const fetchPromise = () => {
  return fetch(url, { signal }) // 传入AbortSignal对象实例
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log("err:", err));
};

/**
 * 请求处理器通过Promise.race()判断请求是否超时,race()可以接收多个Promise,它有点类似于竞速机制,
 * 多个Promise一起比赛竞速,谁先执行完毕就返回那个Promise。如果超时Promise最先执行则说明请求超时了,
 * 此时需要AbortController对象的abort()终止请求。Promise.race()会返回一个最先执行的Promise对象
 */
Promise.race([timeoutPromise(10), fetchPromise()])
  .then((res) => {
    console.log(res); // Response {type: 'default', url: '', redirected: false, status: 504, ok: false, …}
  })
  .catch((err) => {
    console.log(err); // err: DOMException: The user aborted a request.
  });
```

除了 Promise.race()方式判断请求是否超时外,也可以通过包装 Promise 实现,其核心代码在于`promise.then(resolve, reject)`,通过请求 Promise 控制外部 Promise 的状态,当请求 Promise 执行成功且执行时机优于 setTimeout 回调时,则会调用外部 Promise 的 resolve 将外部 Promise 状态修改为 fulfilled(已成功)。

```ts
// 创建一个AbortController对象,AbortController对象允许中止一个或多个Web请求
const controller = new AbortController();
// 返回一个AbortSignal对象实例,它可以用来 with/abort 一个Web(网络)请求,需要传递至fetch请求中
let signal = controller.signal;

// fetch请求
const url = "https://jsonplaceholder.typicode.com/todos/1";
const fetchPromise = fetch(url, { signal });

/**
 * @param timeout 超时时间
 * @param promise 请求Promise
 * @returns 返回一个新的Promise
 */
const timeoutPromise = (timeout: number, promise: Promise<any>) => {
  return new Promise((resolve, reject) => {
    /**
     * 调用外部Promise的resolve和reject回调函数,如果请求promise调用成功则会改变
     * 外部Promise的状态(状态改为fulfilled),外部Promise终止执行。
     * 若setTimeout的函数执行时机早于promise.then(),则说明请求已超时,外部Promise状态更改
     * 为rejected
     */
    promise.then(resolve, reject);
    setTimeout(() => {
      controller.abort(); // 中止请求
      const err = new Response("timeout", {
        status: 504,
        statusText: "timeout ",
      });
      reject.bind(null, err);
    }, timeout);
  });
};

timeoutPromise(10, fetchPromise)
  .then((res: any) => {
    console.log(123);
    return res.json();
  })
  .then((data) => console.log(data))
  .catch((err) => console.log("err:", err));
```

### 扩展:终止重复请求

重复请求是指发送后由于业务处理或者网络阻塞等原因,导致发送相同 URL 和 METHOD 的请求,例如点击按钮发送请求,短时间点击按钮 10 次,假设点击 10 次后第一次的请求仍未响应完成,则前 9 次都属于重复请求,这些请求都是无效的,中止这些无效请求可以避免资源浪费,减少服务器压力和防止网络阻塞。

### 扩展:拦截请求

拦截请求作为一个扩展知识点,例如数据 MockJS 拦截请求,当在 MockJS 定义请求 URL 和请求方法及响应式时,若发送请求的 URL 与方法和 MockJS 定义的接口一致时,MockJS 会拦截请求并将定义的响应式返回,这是 MockJS 的处理流程,而 WebRequest 提供了拦截 Http 请求的机制,WebRequest 可以用于获取请求及其返回的 header 和 body、取消或重定向请求、修改请求及其返回的 header。
