本章介绍了常见的 Web 攻击及解决方法,例如 XSS、CSRF,同时也介绍了跨域产生的原因及解决方案。

## 1.跨域

跨域是指当一个请求 url 的协议、域名、端口三者之间任意一个与当前页面 url 不同时即为跨域。跨域的产生是因为浏览器的同源策略限制,同源策略（Sameoriginpolicy）是一种约定,它是浏览器最核心也最基本的安全功能,如果缺少了同源策略,则浏览器的正常功能可能都会受到影响。可以说 Web 是构建在同源策略基础之上的,浏览器只是针对同源策略的一种实现。同源策略会阻止一个域的 javascript 脚本和另外一个域的内容进行交互。所谓同源(即指在同一个域)就是两个页面具有相同的协议(protocol),主机(host)和端口号(port)。
|当前页面 url|被请求页面 url|是否跨域|原因|
|-|-|-|-|
|http://www.baidu.com|http://www.baidu.com/index.html|否|同源(协议、域名、端口号相同)|
|http://www.baidu.com|https://www.baidu.com/index.html|是|协议不同,一个是HTTP,一个是HTTPS|
|http://www.baidu.com|http://www.test.com|是|主域名不同,一个baidu,一个是test|
|http://www.baidu.com|http://mmm.baidu.com|是|子域名不同,一个www,一个mmm|
|http://www.baidu.com:8080|http://www.baidu.com:8888|是|端口不同|

非同源限制:

- 无法读取非同源网页的 Cookie、LocalStorage 和 IndexedDB。
- 无法接触非同源网页的 DOM。
- 无法向非同源地址发送 AJAX 请求。

### 1.1 document.domain 解决跨域

设置 document.domain 解决无法读取非同源网页的 Cookie 问题。因为浏览器是通过 document.domain 属性来检查两个页面是否同源,因此只要通过设置相同的 document.domain,两个页面就可以共享 Cookie(此方案仅限主域相同,子域不同的跨域应用场景)。

```js
// 两个页面都设置
document.domain = "test.com";
```

### 1.2 window.postMessage()解决跨域

postMessage 是 html5 引入的 API,postMessage()方法允许来自不同源的脚本采用异步方式进行有效的通信,可以实现跨文本文档,多窗口,跨域消息传递,用于多窗口间数据通信,这也使它成为跨域通信的一种有效的解决方案。postMessage 的使用场景如下:

- 跨域通信。JSONP 只支持 GET 请求,不支持 POST 请求,而 postMessage()即支持 GET 请求跨域,又支持 POST 请求跨域。
- WebWorker 与主线程的通讯。postMessage()支持 WebWorker 与主线程相互传递数据,通过监听`onmessage`事件可以接收 postMessage()发送的数据。
- 多窗口数据通信。postMessage()可以在多个 iframe 相互传递数据。

```js
// 父窗口打开一个子窗口,父窗口的URL是http://test01.com
var openWindow = window.open("http://test02.com", "title");

// 调用postMessage()父窗口向子窗口发送数据,参数1是发送的消息,参数2是接收消息窗口的URL
openWindow.postMessage("hell", "http://test02.com");

// 子窗口监听message事件接收父窗口发送的信息
window.addEventListener("message", (e) => {
  console.log("发送消息的窗口:", e.source);
  console.log("发送消息的URL:", e.origin);
  console.log("发送消息:", e.data);
});
```

### 1.3 JSONP 解决跨域

JSONP 是服务器与客户端跨源通信的常用方法。最大特点就是简单适用,兼容性好(兼容低版本 IE),缺点是只支持 get 请求,不支持 post 请求。

核心思想:网页通过添加一个`<script>`元素,向服务器请求 JSON 数据,服务器收到请求后,将数据放在一个指定名字的回调函数的参数位置传回来。

```html
<!-- 原生JS实现JSONP -->
<!-- 向test.com服务器发送请求,该请求URL的查询参数中包含一个callback参数,用于指定回调函数的名称 -->
<script src="http://test.com/jsonp?callback=hello"></script>
<script type="text/javascript">
  function hello(res) {
    console.log(res);
  }
</script>
```

### 1.4 CORS 解决跨域

CORS 是跨域资源分享（Cross-Origin Resource Sharing）的缩写。它是 W3C 标准,属于跨源 AJAX 请求的根本解决方法。

- 普通跨域请求:只需服务器端设置 Access-Control-Allow-Origin。Access-Control-Allow-Origin 可以指定`*`也可以指定域名(多个域名用`,`隔开),当 Access-Control-Allow-Origin 设置为`*`时表示允许任意域名跨域,但不会向服务端发送 Cookie。同时,Cookie 依然遵循同源政策,只有用服务器域名设置的 Cookie 才会上传,其他域名的 Cookie 并不会上传,且（跨源）原网页代码中的 document.cookie 也无法读取服务器域名下的 Cookie。

```js
/**
 * 必填,用于指定允许CORS请求跨域源,*表示允许任意请求跨域,也可以指定域名(多个域名用`,`隔开)。
 */
Access-Control-Allow-Origin:*
/**
 * 一个布尔值,表示是否允许发送Cookie,CORS请求默认不发送Cookie和HTTP认证信息,
 * 若要发送请求需要设置为true,一般设置为false,可以在AJAX请求中设置Credentials属性配置。
 */
Access-Control-Allow-Credentials:false
/**
 * 表示CORS请求请求的方法,多个方法用逗号隔开
 */
Access-Control-Allow-Methods:GET,POST,PUT
/**
 * 可选,CORS请求时,XMLHttpRequest对象的getResponseHeader()方法只能
 * 拿到6个基本字段:Cache-Control、Content-Language、Content-Type、Expires、
 * Last-Modified、Pragma。如果想拿到其他字段,
 * 就必须在Access-Control-Expose-Headers里面指定。
 * 可以通过getResponseHeader('list')获取list字段的值。
 */
Access-Control-Expose-Headers:list
```

- 带 cookie 跨域请求:前后端都需要进行设置。

### 1.5 Websocket 解决跨域

Websocket 是 HTML5 的一个持久化的协议,它实现了浏览器与服务器的全双工通信,同时也是跨域的一种解决方案。WebSocket 和 HTTP 都是应用层协议,都基于 TCP 协议。但是 WebSocket 是一种双向通信协议,在建立连接之后,WebSocket 的 服务器与 客户端都能主动向对方发送或接收数据。同时，WebSocket 在建立连接时需要借助 HTTP 协议,连接建立好了之后 client 与 server 之间的双向通信就与 HTTP 无关了。

### 1.6 Nginx 反向代理解决跨域

Nginx 实现原理类似于 Node 中间件代理,需要你搭建一个中转 nginx 服务器,用于转发请求。使用 nginx 反向代理实现跨域，是最简单的跨域方式。只需要修改 nginx 的配置即可解决跨域问题,支持所有浏览器,支持 session,不需要修改任何代码,并且不会影响服务器性能,所以在生产环境中一般推荐 Nginx 反向代理作为解决跨域方案。

### 1.7 代理服务器解决跨域

## 2.XSS 攻击

XSS (Cross-Site Scripting),跨站脚本攻击,因为缩写和 CSS 重叠,所以只能叫 XSS。跨站脚本攻击是指通过存在安全漏洞的 Web 网站注册用户的浏览器内运行非法的 HTML 标签或 JavaScript 进行的一种攻击。XSS 攻击会窃取用户隐私信息(cookie)执行恶意脚本代码。

XSS 的原理是恶意攻击者往 Web 页面里插入恶意可执行网页脚本代码,当用户浏览该页之时,嵌入其中 Web 里面的脚本代码会被执行,从而可以达到攻击者盗取用户信息或其他侵犯用户安全隐私的目的。XSS 的攻击方式千变万化,可以大致细分为非持久型 XSS 和持久型 XSS 两种类型。

### 2.1 非持久性

非持久型 XSS 漏洞,一般是通过给别人发送带有恶意脚本代码参数的 URL,当 URL 地址被打开时,特有的恶意代码参数被 HTML 解析、执行。攻击者可以直接通过 URL (类似:`https://xxx.com/xxx?default=<script>alert(document.cookie)</script>`)注入可执行的脚本代码。不过一些浏览器如 Chrome 其内置了一些 XSS 过滤器,可以防止大部分反射型 XSS 攻击。
非持久型 XSS 漏洞攻击有以下几点特征:

- 即时性,不经过服务器存储,直接通过 HTTP 的 GET 和 POST 请求就能完成一次攻击,拿到用户隐私数据。
- 攻击者需要诱骗点击,必须要通过用户点击链接才能发起。
- 反馈率低,所以较难发现和响应修复。
- 盗取用户敏感保密信息。

防止非持久型 XSS 漏洞措施:

- Web 页面渲染的所有内容或者渲染的数据都必须来自于服务端。
- 尽量不要从 URL，document.referrer，document.forms 等这种 DOM API 中获取数据直接渲染。
- 尽量不要使用 `eval`, `new Function()`,`document.write()`，`document.writeln()`，`window.setInterval()`、 `window.setTimeout()`,`innerHTML`,`document.createElement()` 等可执行字符串的方法。
- 如果做不到以上几点，也必须对涉及 DOM 渲染的方法传入的字符串参数做 escape 转义。
- 前端渲染的时候对任何的字段都需要做 escape 转义编码。

### 2.2 持久性 XSS

持久型 XSS 漏洞,一般存在于 Form 表单提交等交互功能,如文章留言,提交文本信息等,黑客利用的 XSS 漏洞,将内容经正常功能提交进入数据库持久保存,当前端页面获得后端从数据库中读出的注入代码时,恰好将其渲染执行。主要注入页面方式和非持久型 XSS 漏洞类似,只不过持久型的不是来源于 URL、referer、forms 等,而是来源于后端从数据库中读出来的数据。持久型 XSS 攻击不需要诱骗点击,黑客只需要在提交表单的地方完成注入即可,但是这种 XSS 攻击的成本相对还是很高。攻击成功需要同时满足以下几个条件:

- POST 请求提交表单后端未做转义直接入库。
- 后端从数据库中取出数据未做转义直接输出给前端。
- 前端拿到后端数据未做转义直接渲染成 DOM。

持久型 XSS 有以下几个特点:

- 持久性,植入在数据库中。
- 盗取用户敏感私密信息。
- 危害面广。

### 2.3 防御 XSS 攻击方案

对于 XSS 攻击来说,通常有 CSP、转义字符、HttpOnly Cookie 三种方式可以用来防御。CSP 本质上就是建立白名单,开发者明确告诉浏览器哪些外部资源可以加载和执行。只需要配置规则,如何拦截是由浏览器自己实现的,可以通过这种方式来尽量减少 XSS 攻击,只要开发者配置了正确的规则,那么即使网站存在漏洞,攻击者也不会执行它的攻击代码,并且 CSP 的兼容性也不错。通常可以通过两种方式来开启 CSP:

- 设置 HTTP Header 中的 Content-Security-Policy。
- 设置 meta 标签的方式。

```js
// 以设置设置 HTTP Header为例

Content-Security-Policy:default-src 'self' // 只允许加载本站资源
Content-Security-Policy: img-src https: // 只允许加载 HTTPS 协议图片
Content-Security-Policy: child-src 'none' // 允许加载任何来源框架
```

用户的输入永远不可信任的,最普遍的做法就是转义输入输出的内容,对于引号、尖括号、斜杠进行转义。当使用 Vue 中的`v-html`指令和 React 的 dangerouslySetInnerHTML 属性时需要注意 XSS 攻击。

HttpOnly Cookie 是一种预防 XSS 攻击窃取用户 cookie 最有效的防御手段。Web 应用程序在设置 cookie 时,将其属性设为 HttpOnly,就可以避免该网页的 cookie 被客户端恶意 JavaScript 窃取,保护用户 cookie 信息。

```js
function escape(str) {
  str = str.replace(/&/g, "&amp;");
  str = str.replace(/</g, "&lt;");
  str = str.replace(/>/g, "&gt;");
  str = str.replace(/"/g, "&quto;");
  str = str.replace(/'/g, "&#39;");
  str = str.replace(/`/g, "&#96;");
  str = str.replace(/\//g, "&#x2F;");
  return str;
}
```

但是对于显示富文本来说,显然不能通过上面的办法来转义所有字符,因为这样会把需要的格式也过滤掉。对于这种情况,通常采用白名单过滤的办法,当然也可以通过黑名单过滤,但是考虑到需要过滤的标签和标签属性实在太多,更加推荐使用白名单的方式。

### 2.4 CSRF

CSRF(Cross Site Request Forgery),即跨站请求伪造,是一种常见的 Web 攻击,它利用用户已登录的身份,在用户毫不知情的情况下,以用户的名义完成非法操作。CSRF 攻击的原理如下图:
![csrf](../assets/images/csrf.png)
完成 CSRF 攻击必须要有三个条件:

- 用户已经登录了站点 A，并在本地记录了 cookie。
- 在用户没有登出站点 A 的情况下(也就是 cookie 生效的情况下),访问了恶意攻击者提供的引诱危险站点 B (B 站点要求访问站点 A)。
- 站点 A 没有做任何 CSRF 防御。

防范 CSRF 攻击可以遵循以下几种规则:

- Get 请求不对数据进行修改。
- 不让第三方网站访问到用户 Cookie。
- 阻止第三方网站请求接口。
- 请求时附带验证信息，比如验证码或者 Token。

### 2.5 SameSite

可以对 Cookie 设置 SameSite 属性。该属性表示 Cookie 不随着跨域请求发送,可以很大程度减少 CSRF 的攻击,但是该属性目前并不是所有浏览器都兼容。

### 2.6 Referer Check

HTTP Referer 是 header 的一部分,当浏览器向 web 服务器发送请求时,一般会带上 Referer 信息告诉服务器是从哪个页面链接过来的,服务器就此可以获得一些信息用于处理。可以通过检查请求的来源来防御 CSRF 攻击。正常请求的 referer 具有一定规律,如在提交表单的 referer 必定是在该页面发起的请求。所以通过检查 http 包头 referer 的值是不是这个页面,来判断是不是 CSRF 攻击。

但在某些情况下如从 https 跳转到 http,浏览器处于安全考虑,不会发送 referer,服务器就无法进行 check 了。若与该网站同域的其他网站有 XSS 漏洞,那么攻击者可以在其他网站注入恶意脚本,受害者进入了此类同域的网址,也会遭受攻击。出于以上原因,无法完全依赖 Referer Check 作为防御 CSRF 的主要手段,但是可以通过 Referer Check 来监控 CSRF 攻击的发生。

### 2.7 Anti CSRF Token

目前比较完善的解决方案是加入 Anti-CSRF-Token。即发送请求时在 HTTP 请求中以参数的形式加入一个随机产生的 token,并在服务器建立一个拦截器来验证这个 token。服务器读取浏览器当前域 cookie 中这个 token 值,会进行校验该请求当中的 token 和 cookie 当中的 token 值是否都存在且相等,才认为这是合法的请求。否则认为这次请求是违法的,拒绝该次服务。

这种方法相比 Referer 检查要安全很多,token 可以在用户登陆后产生并放于 session 或 cookie 中,然后在每次请求时服务器把 token 从 session 或 cookie 中拿出,与本次请求中的 token 进行比对。由于 token 的存在,攻击者无法再构造出一个完整的 URL 实施 CSRF 攻击。但在处理多个页面共存问题时,当某个页面消耗掉 token 后,其他页面的表单保存的还是被消耗掉的那个 token,其他页面的表单提交时会出现 token 错误。

### 2.8 验证码

应用程序和用户进行交互过程中,特别是账户交易这种核心步骤,强制用户输入验证码,才能完成最终请求。在通常情况下,验证码够很好地遏制 CSRF 攻击。但增加验证码降低了用户的体验,网站不能给所有的操作都加上验证码。所以只能将验证码作为一种辅助手段,在关键业务点设置验证码。
