即使应用经过大量测试,仍有可能在运行中发生一些错误,所以前端错误监控能帮助我们进行快速排错,更加快速的定位产生错误的原因。目前主流的错误监控有 Sentry、Fundebug、FrontJS 等多种解决方案,虽然这些方案非常成熟,但费用成本相对而言比较高,对比之下自研错误监控是一个不错的办法。错误监控通常涉及错误采集、上报、存储与展示、预警通知等几个阶段。

## 1.错误采集

错误信息大致包含如下信息:

- 错误类型。例如逻辑错误、数据错误、⽹络错误、语法错误。
- 错误产生时间。一个时间戳用于记录错误发生时间。
- 错误影响范围。包括报错事件数、IP、设备信息。
- 错误原因。例如错误堆栈、⾏列、SourceMap 及收集系统等等。

### 1.1 常见错误

运行时产生的错误种类繁多,为了错误采集和区别不同错误,大致可分为 JS 运行时错误、资源加载错误、异步错误、框架错误。常见的错误如下:

- SyntaxError:解析时发生的语法错误。
- TypeError:值不是所期待类型发生的错误。
- ReferenceError:引用未声明的变量发生的错误。
- RangeError:当一个值不在其所允许的范围或者集合中。
- ResourceError:资源加载错误。
- HttpError:Http 请求错误,例如 XMLHttpRequest 和 fetch()错误。
- 跨域错误。
- 异步错误:异步操作时产生的错误,例如 setTimeout 中产生的错误。
- Promise 错误:Promise 中产生的错误。
- Vue 组件错误:Vue 组件产生的错误。
- React 组件错误:React 组件产生的错误。

### 1.2 错误采集

在 JS 中,不同错误采集的方式各有不同,常见的采集方案如下:

- try/catch 异常处理机制。try/catch 是 JS 最为常用的错误捕获方法,能捕获常规运行时错误,语法错误和异步错误都无法捕获。
- window.onerror。当 JS 运行时错误发生时,window 会触发一个 ErrorEvent 接口的 error 事件。window.onerror 可以捕获常规运行时错误和异步错误,无法捕获语法错误和资源加载错误。
- window.addEventListener 监听 error 事件。当一项资源(如图片或脚本)加载失败时,加载资源的元素会触发一个 Event 接口的 error 事件,这些 error 事件不会向上冒泡到 window,但能被捕获,而 window.onerror 不能监测捕获。使用 window.addEventListener 监听 error 事件资源错误可以被捕获到,例如图片、script、css 加载错误,但对于 new Image()错误和 fetch 错误均无法捕获。
  - 对于 new Image()可以重写其 onerror 捕获错误。
  - 对于 XMLHttpRequest 可以监听其 error 事件。
  - 对 fetch 错误可以使用 catch()进行异常捕获。
- window.addEventListener 监听 unhandledrejection 事件捕获 Promise 错误。当 Promise 发生错误时如果没有使用 catch()方法指定错误处理的回调函数,Promise 对象抛出的错误不会传递到外层代码,所以 try/catch 无法捕获到 Promise 中生产的错误,同样的也无法使用 try/catch 捕获 async 包裹的错误。由于 import()函数返回的也是一个 promise,所以本质上仍无法使用 try/catch 捕获错误。Promise 中产生的错误通过 catch()进行捕获,但这样侵入性太强,而使用 window.addEventListener 监听 unhandledrejection 事件捕获 Promise 产生的错误是最为合理的,当 Promise 被 reject 且没有 reject 处理器的时候,会触发 unhandledrejection 事件(这可能发生在 window 下,但也可能发生在 Worker 中)。
- Vue.config.errorHandler 捕获 Vue 组件错误。由于 Vue 会捕获所有 Vue 单文件组件或者 Vue.extend 继承的代码,所以在 Vue 里面出现的错误,并不会直接被 window.onerror 捕获,而是会抛给 Vue.config.errorHandler。
- 声明错误边界组件捕获 React 组件错误。当错误边界组件的中的子组件产生错误时均会冒泡到错误边界组件,并触发 componentDidCatch 钩子函数,通过 componentDidCatch 钩子函数就能捕获组件产生的错误。

## 2.错误上报

### 2.1 前端上报错误方案

#### 2.1 基于 XMLHttpRequest、fetch 上报

#### 2.2 基于 img 标签的 src 上报

#### 2.3 基于 Beacon 异步上报

navigator.sendBeacon() 是浏览器提供的 API,用于在页面卸载时异步发送数据。它通常用于在页面关闭或者用户离开时发送一些统计、日志等数据,以确保数据能够被成功上报,即使页面已经不再运行 JavaScript 代码。Beacon(信标)的特点如下:

- 异步:它不会阻塞页面的卸载过程,确保数据在页面关闭时能够被发送。
- 可靠性:由于是异步操作,它会尽力确保数据被成功上报，即使页面已经不再执行 JavaScript 代码。
- 适用于小量数据:通常用于发送一些小量的统计、日志等数据,不适合大量数据的上报。
- 不支持自定义请求头,且发送的请求方法都是 POST。

#### 2.4 基于 WebSocket 上报

#### 2.5 基于 WebWork 上报

### 2.2 上报策略

为了支持不同错误等级的上报,上报策略可分为以下几种:

- 即时上报:即时上报是指收集到日志后,立即触发上报函数,适用于错误等级较高的场景。
- 批量上报:将收集到的日志存储在本地,当收集到一定数量之后再打包一次性上报,或者按照一定的频率(时间间隔)上传。这相当于把多次合并为一次上报,以降低对服务器的压力。当大批量上报数据时,可能因为数据体积大而影响主业务的执行,此时可以将数据压缩后再进行上报。
- 区块上报:将一次异常的场景打包为一个区块后进行上报。它和批量上报不同,批量上报保证了日志的完整性、全面性,但会有冗余信息。而区块上报则是针对异常本身的,确保单个异常相关的日志被全部上报。
- 主动上报:当产生错误,应提供一个上报渠道,以供用户主动上报。

## 3.数据存储与展示

错误数据上报后需要进行持久化,以便展示、统计分析。常见的做法是将错误信息存储到关系型数据库(如 MySQL),但是关系型数据无法满足数据量大、数据结构不规律、写入并发高、查询需求大等场景。数据采集主流的做法是使用 ELK(ElasticSearch、Logstash、Kibana 的简称)方案,其中:

- ElasticSearch:负责大规模数据的存储。
- Logstash:负责数据的清洗、转换。
- Kibana:提供数据可视化和查询统计。

## 4.异常预警通知
