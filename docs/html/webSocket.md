WebSocket 是 HTML5 提供的一种在单个 TCP 连接上进行全双工通信的协议。WebSocket 通信协议于 2011 年被 IETF 定为标准 RFC 6455,并由 RFC7936 补充规范。WebSocket API 也被 W3C 定为标准。WebSocket 使得客户端和服务器之间的数据交换变得更加简单,允许服务端主动向客户端推送数据。在 WebSocket API 中,浏览器和服务器只需要完成一次握手,两者之间就直接可以创建持久性的连接,并进行双向数据传输。在 WebScoket 出现之前服务器向客户端主动推送数据一般通过轮询(即每隔一段时候,就发出一个询问),这种方案不仅消耗资源,也无法做到真正的实时性。WebSocket 的特点如下:

- 建立在 TCP 协议之上,服务器端的实现比较容易。
- 与 HTTP 协议有着良好的兼容性。默认端口也是 80 和 443,并且握手阶段采用 HTTP 协议,因此握手时不容易屏蔽,能通过各种 HTTP 代理服务器。
- 数据格式比较轻量,性能开销小,通信高效。在连接创建后,服务器和客户端之间交换数据时,用于协议控制的数据包头部相对较小。在不包含扩展的情况下,对于服务器到客户端的内容,此头部大小只有 2 至 10 字节(和数据包长度有关);对于客户端到服务器的内容,此头部还需要加上额外的 4 字节的掩码。相对于 HTTP 请求每次都要携带完整的头部,此项开销显著减少了。
- 可以发送文本，也可以发送二进制数据。
- 没有同源限制(可以实现 WebSocket 解决跨域问题),客户端可以与任意服务器通信。
- 协议标识符是 ws(如果加密则为 wss),服务器网址就是 URL,例如:`ws://example.com:80/some/path`。
- 更好的二进制支持。Websocket 定义了二进制帧，相对 HTTP，可以更轻松地处理二进制内容。
- 可以支持扩展。Websocket 定义了扩展,用户可以扩展协议、实现部分自定义的子协议。如部分浏览器支持压缩等。
- 更好的压缩效果。相对于 HTTP 压缩,Websocket 在适当的扩展支持下,可以沿用之前内容的上下文,在传递类似的数据时,可以显著地提高压缩率。

### WebSocket API

WebSocket(url [,protocols])构造函数返回一个新的 WebSocket 对象。url 表示 WebSocket 服务器将响应的 URL,protocols 参数是可选的,可以是字符串也可以是数组(默认值是一个空数组),表示这些字符串用于指示子协议,以便单个服务器可以实现多个 WebSocket 子协议(例如,您可能希望一个服务器能够根据指定的 处理不同类型的交互 protocol)。

```js
// webSocket连接URL以ws为前缀表示是webSocket协议
var awebsocket = new WebSocket("ws://example.com:80/some/path");
/*
 * binaryType:用于获取WebSocket 连接接收的二进制数据的类型,类型可分Blob(默认值)
 * 和Arraybuffer两种
 */
var binaryType = awebsocket.binaryType; // 'blob'

// url:用于返回的WebSocket绝对URL,由构造函数提供
var url = aWebSocket.url; // 'ws://example.com/some/path'

/*
 * readyState:用于返回当前webSocket的连接状态,返回值是一个数字:
 * 0(CONNECTING):表示webSocket已创建,但连接尚未打开。
 * 1(OPEN):表示连接已打开并准备好进行通信。
 * 2(CLOSING):表示连接正在关闭过程中。
 * 3(CLOSED):表示连接已关闭或无法打开。
 */
var readyState = aWebSocket.readyState; // 3

/*
 * WebSocket.onopen用于监听WebSocket打开连接事件,当WebSocket连接readyState更改为1时调用,
 * 这表明连接已准备好发送和接收数据。onopne函数接收一个Event参数(与Dom Event是一样的),
 * 返回一个EventListener(也是一个函数)
 */
aWebSocket.onopen = function (event) {
  console.log(event);
  console.log("WebSocket is open now.");
};

/*
 * WebSocket.onmessage用于监听接收到服务器发送消息的事件,该函数接收一个MessageEvent对象作为参数,
 * WebSocket:send():允许客户端向服务器发送数据
 */
aWebSocket.onmessage = function (messageEvent) {
  const { data, origin, source, ports } = messageEvent;
  console.log("接收数据:", data);
  console.log("表示消息发射器的来源:", origin);
  // MessageEventSource(其可以是一个WindowProxy,MessagePort或ServiceWorker对象)表示消息发射器。
  console.log("消息发射器:", source);
  // 一组MessagePort对象,表示与发送消息的通道相关联的端口
  console.log("消息发射器:", ports);
  console.debug("WebSocket message received:", messageEvent);

  aWebSocket.send("客户端向服务器发送数据" + data);
};

/*
 * WebSocket.onclose用于监听WebSocket关闭连接事件,当WebSocket 连接readyState更改为CLOSED时调用,
 * 接收一个CloseEvent对象作为参数,返回一个EventListener(也是一个函数)
 */
aWebSocket.onclose = function (event) {
  const { code, reason, wasClean } = event;
  // 返回一个数组,表示服务器发送的关闭代码
  console.log(code);
  // 返回服务器关闭连接原因
  console.log(reason);
  // 返回一个布尔值,表示连接是否完全关闭。
  console.log(wasClean);
  console.log("WebSocket is closed now.");
};

/*
 * WebSocket.onerror:当WebSocket发生错误时触发的事件
 */
aWebSocket.onerror = function (event) {
  console.error("WebSocket error observed:", event);
};
```
