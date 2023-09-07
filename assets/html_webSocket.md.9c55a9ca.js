import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.a9ea851b.js";const b=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"html/webSocket.md","filePath":"html/webSocket.md","lastUpdated":1694072565000}'),o={name:"html/webSocket.md"},p=l(`<p>WebSocket 是 HTML5 提供的一种在单个 TCP 连接上进行全双工通信的协议。WebSocket 通信协议于 2011 年被 IETF 定为标准 RFC 6455,并由 RFC7936 补充规范。WebSocket API 也被 W3C 定为标准。WebSocket 使得客户端和服务器之间的数据交换变得更加简单,允许服务端主动向客户端推送数据。在 WebSocket API 中,浏览器和服务器只需要完成一次握手,两者之间就直接可以创建持久性的连接,并进行双向数据传输。在 WebScoket 出现之前服务器向客户端主动推送数据一般通过轮询(即每隔一段时候,就发出一个询问),这种方案不仅消耗资源,也无法做到真正的实时性。WebSocket 的特点如下:</p><ul><li>建立在 TCP 协议之上,服务器端的实现比较容易。</li><li>与 HTTP 协议有着良好的兼容性。默认端口也是 80 和 443,并且握手阶段采用 HTTP 协议,因此握手时不容易屏蔽,能通过各种 HTTP 代理服务器。</li><li>数据格式比较轻量,性能开销小,通信高效。在连接创建后,服务器和客户端之间交换数据时,用于协议控制的数据包头部相对较小。在不包含扩展的情况下,对于服务器到客户端的内容,此头部大小只有 2 至 10 字节(和数据包长度有关);对于客户端到服务器的内容,此头部还需要加上额外的 4 字节的掩码。相对于 HTTP 请求每次都要携带完整的头部,此项开销显著减少了。</li><li>可以发送文本，也可以发送二进制数据。</li><li>没有同源限制(可以实现 WebSocket 解决跨域问题),客户端可以与任意服务器通信。</li><li>协议标识符是 ws(如果加密则为 wss),服务器网址就是 URL,例如:<code>ws://example.com:80/some/path</code>。</li><li>更好的二进制支持。Websocket 定义了二进制帧，相对 HTTP，可以更轻松地处理二进制内容。</li><li>可以支持扩展。Websocket 定义了扩展,用户可以扩展协议、实现部分自定义的子协议。如部分浏览器支持压缩等。</li><li>更好的压缩效果。相对于 HTTP 压缩,Websocket 在适当的扩展支持下,可以沿用之前内容的上下文,在传递类似的数据时,可以显著地提高压缩率。</li></ul><h3 id="websocket-api" tabindex="-1">WebSocket API <a class="header-anchor" href="#websocket-api" aria-label="Permalink to &quot;WebSocket API&quot;">​</a></h3><p>WebSocket(url [,protocols])构造函数返回一个新的 WebSocket 对象。url 表示 WebSocket 服务器将响应的 URL,protocols 参数是可选的,可以是字符串也可以是数组(默认值是一个空数组),表示这些字符串用于指示子协议,以便单个服务器可以实现多个 WebSocket 子协议(例如,您可能希望一个服务器能够根据指定的 处理不同类型的交互 protocol)。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// webSocket连接URL以ws为前缀表示是webSocket协议</span></span>
<span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> awebsocket </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">WebSocket</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;ws://example.com:80/some/path&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;"> * binaryType:用于获取WebSocket 连接接收的二进制数据的类型,类型可分Blob(默认值)</span></span>
<span class="line"><span style="color:#6A737D;"> * 和Arraybuffer两种</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> binaryType </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> awebsocket.binaryType; </span><span style="color:#6A737D;">// &#39;blob&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// url:用于返回的WebSocket绝对URL,由构造函数提供</span></span>
<span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> url </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> aWebSocket.url; </span><span style="color:#6A737D;">// &#39;ws://example.com/some/path&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;"> * readyState:用于返回当前webSocket的连接状态,返回值是一个数字:</span></span>
<span class="line"><span style="color:#6A737D;"> * 0(CONNECTING):表示webSocket已创建,但连接尚未打开。</span></span>
<span class="line"><span style="color:#6A737D;"> * 1(OPEN):表示连接已打开并准备好进行通信。</span></span>
<span class="line"><span style="color:#6A737D;"> * 2(CLOSING):表示连接正在关闭过程中。</span></span>
<span class="line"><span style="color:#6A737D;"> * 3(CLOSED):表示连接已关闭或无法打开。</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> readyState </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> aWebSocket.readyState; </span><span style="color:#6A737D;">// 3</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;"> * WebSocket.onopen用于监听WebSocket打开连接事件,当WebSocket连接readyState更改为1时调用,</span></span>
<span class="line"><span style="color:#6A737D;"> * 这表明连接已准备好发送和接收数据。onopne函数接收一个Event参数(与Dom Event是一样的),</span></span>
<span class="line"><span style="color:#6A737D;"> * 返回一个EventListener(也是一个函数)</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#E1E4E8;">aWebSocket.</span><span style="color:#B392F0;">onopen</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">event</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(event);</span></span>
<span class="line"><span style="color:#E1E4E8;">  console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;WebSocket is open now.&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;"> * WebSocket.onmessage用于监听接收到服务器发送消息的事件,该函数接收一个MessageEvent对象作为参数,</span></span>
<span class="line"><span style="color:#6A737D;"> * WebSocket:send():允许客户端向服务器发送数据</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#E1E4E8;">aWebSocket.</span><span style="color:#B392F0;">onmessage</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">messageEvent</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> { </span><span style="color:#79B8FF;">data</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">origin</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">source</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">ports</span><span style="color:#E1E4E8;"> } </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> messageEvent;</span></span>
<span class="line"><span style="color:#E1E4E8;">  console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;接收数据:&quot;</span><span style="color:#E1E4E8;">, data);</span></span>
<span class="line"><span style="color:#E1E4E8;">  console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;表示消息发射器的来源:&quot;</span><span style="color:#E1E4E8;">, origin);</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// MessageEventSource(其可以是一个WindowProxy,MessagePort或ServiceWorker对象)表示消息发射器。</span></span>
<span class="line"><span style="color:#E1E4E8;">  console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;消息发射器:&quot;</span><span style="color:#E1E4E8;">, source);</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 一组MessagePort对象,表示与发送消息的通道相关联的端口</span></span>
<span class="line"><span style="color:#E1E4E8;">  console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;消息发射器:&quot;</span><span style="color:#E1E4E8;">, ports);</span></span>
<span class="line"><span style="color:#E1E4E8;">  console.</span><span style="color:#B392F0;">debug</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;WebSocket message received:&quot;</span><span style="color:#E1E4E8;">, messageEvent);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  aWebSocket.</span><span style="color:#B392F0;">send</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;客户端向服务器发送数据&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> data);</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;"> * WebSocket.onclose用于监听WebSocket关闭连接事件,当WebSocket 连接readyState更改为CLOSED时调用,</span></span>
<span class="line"><span style="color:#6A737D;"> * 接收一个CloseEvent对象作为参数,返回一个EventListener(也是一个函数)</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#E1E4E8;">aWebSocket.</span><span style="color:#B392F0;">onclose</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">event</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> { </span><span style="color:#79B8FF;">code</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">reason</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">wasClean</span><span style="color:#E1E4E8;"> } </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> event;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 返回一个数组,表示服务器发送的关闭代码</span></span>
<span class="line"><span style="color:#E1E4E8;">  console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(code);</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 返回服务器关闭连接原因</span></span>
<span class="line"><span style="color:#E1E4E8;">  console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(reason);</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 返回一个布尔值,表示连接是否完全关闭。</span></span>
<span class="line"><span style="color:#E1E4E8;">  console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(wasClean);</span></span>
<span class="line"><span style="color:#E1E4E8;">  console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;WebSocket is closed now.&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;"> * WebSocket.onerror:当WebSocket发生错误时触发的事件</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#E1E4E8;">aWebSocket.</span><span style="color:#B392F0;">onerror</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">event</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  console.</span><span style="color:#B392F0;">error</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;WebSocket error observed:&quot;</span><span style="color:#E1E4E8;">, event);</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// webSocket连接URL以ws为前缀表示是webSocket协议</span></span>
<span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> awebsocket </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">WebSocket</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;ws://example.com:80/some/path&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;"> * binaryType:用于获取WebSocket 连接接收的二进制数据的类型,类型可分Blob(默认值)</span></span>
<span class="line"><span style="color:#6A737D;"> * 和Arraybuffer两种</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> binaryType </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> awebsocket.binaryType; </span><span style="color:#6A737D;">// &#39;blob&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// url:用于返回的WebSocket绝对URL,由构造函数提供</span></span>
<span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> url </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> aWebSocket.url; </span><span style="color:#6A737D;">// &#39;ws://example.com/some/path&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;"> * readyState:用于返回当前webSocket的连接状态,返回值是一个数字:</span></span>
<span class="line"><span style="color:#6A737D;"> * 0(CONNECTING):表示webSocket已创建,但连接尚未打开。</span></span>
<span class="line"><span style="color:#6A737D;"> * 1(OPEN):表示连接已打开并准备好进行通信。</span></span>
<span class="line"><span style="color:#6A737D;"> * 2(CLOSING):表示连接正在关闭过程中。</span></span>
<span class="line"><span style="color:#6A737D;"> * 3(CLOSED):表示连接已关闭或无法打开。</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> readyState </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> aWebSocket.readyState; </span><span style="color:#6A737D;">// 3</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;"> * WebSocket.onopen用于监听WebSocket打开连接事件,当WebSocket连接readyState更改为1时调用,</span></span>
<span class="line"><span style="color:#6A737D;"> * 这表明连接已准备好发送和接收数据。onopne函数接收一个Event参数(与Dom Event是一样的),</span></span>
<span class="line"><span style="color:#6A737D;"> * 返回一个EventListener(也是一个函数)</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#24292E;">aWebSocket.</span><span style="color:#6F42C1;">onopen</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">event</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(event);</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;WebSocket is open now.&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;"> * WebSocket.onmessage用于监听接收到服务器发送消息的事件,该函数接收一个MessageEvent对象作为参数,</span></span>
<span class="line"><span style="color:#6A737D;"> * WebSocket:send():允许客户端向服务器发送数据</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#24292E;">aWebSocket.</span><span style="color:#6F42C1;">onmessage</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">messageEvent</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> { </span><span style="color:#005CC5;">data</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">origin</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">source</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">ports</span><span style="color:#24292E;"> } </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> messageEvent;</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;接收数据:&quot;</span><span style="color:#24292E;">, data);</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;表示消息发射器的来源:&quot;</span><span style="color:#24292E;">, origin);</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// MessageEventSource(其可以是一个WindowProxy,MessagePort或ServiceWorker对象)表示消息发射器。</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;消息发射器:&quot;</span><span style="color:#24292E;">, source);</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 一组MessagePort对象,表示与发送消息的通道相关联的端口</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;消息发射器:&quot;</span><span style="color:#24292E;">, ports);</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">debug</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;WebSocket message received:&quot;</span><span style="color:#24292E;">, messageEvent);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  aWebSocket.</span><span style="color:#6F42C1;">send</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;客户端向服务器发送数据&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> data);</span></span>
<span class="line"><span style="color:#24292E;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;"> * WebSocket.onclose用于监听WebSocket关闭连接事件,当WebSocket 连接readyState更改为CLOSED时调用,</span></span>
<span class="line"><span style="color:#6A737D;"> * 接收一个CloseEvent对象作为参数,返回一个EventListener(也是一个函数)</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#24292E;">aWebSocket.</span><span style="color:#6F42C1;">onclose</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">event</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> { </span><span style="color:#005CC5;">code</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">reason</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">wasClean</span><span style="color:#24292E;"> } </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> event;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 返回一个数组,表示服务器发送的关闭代码</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(code);</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 返回服务器关闭连接原因</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(reason);</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 返回一个布尔值,表示连接是否完全关闭。</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(wasClean);</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;WebSocket is closed now.&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;"> * WebSocket.onerror:当WebSocket发生错误时触发的事件</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#24292E;">aWebSocket.</span><span style="color:#6F42C1;">onerror</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">event</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">error</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;WebSocket error observed:&quot;</span><span style="color:#24292E;">, event);</span></span>
<span class="line"><span style="color:#24292E;">};</span></span></code></pre></div>`,5),e=[p];function c(t,r,y,E,i,F){return n(),a("div",null,e)}const D=s(o,[["render",c]]);export{b as __pageData,D as default};
