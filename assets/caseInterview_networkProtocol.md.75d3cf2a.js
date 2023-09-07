import{_ as t,o as a,c as e,Q as l}from"./chunks/framework.a9ea851b.js";const S=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"caseInterview/networkProtocol.md","filePath":"caseInterview/networkProtocol.md","lastUpdated":1694072565000}'),r={name:"caseInterview/networkProtocol.md"},i=l('<h2 id="tcp-与-udp-的区别" tabindex="-1">TCP 与 UDP 的区别? <a class="header-anchor" href="#tcp-与-udp-的区别" aria-label="Permalink to &quot;TCP 与 UDP 的区别?&quot;">​</a></h2><p>TCP(Transmission Control Protocol,传输控制协议)和 UDP(User Datagram Protocol,用户数据报协议)都属于传输层协议,其中 TCP 是一种面向连接、基于字节流通信的全双工协议,能保证端到端数据传输的可靠性;UDP 是一种不可靠且无连接基于数据报通信的协议,两者区别如下:</p><table><thead><tr><th>TCP</th><th>UDP</th></tr></thead><tbody><tr><td>面向连接</td><td>无连接</td></tr><tr><td>可靠性高</td><td>不保证可靠性,但是效率高</td></tr><tr><td>一次传输大量报文</td><td>一次传输少量报文</td></tr><tr><td>协议复杂</td><td>协议简单</td></tr></tbody></table><h2 id="tcp-三次握手" tabindex="-1">TCP 三次握手? <a class="header-anchor" href="#tcp-三次握手" aria-label="Permalink to &quot;TCP 三次握手?&quot;">​</a></h2><p>由于 TCP 提供可靠的通信机制,在传输数据之前,必须先初始化一条客户端到服务端的 TCP 连接,在连接正式建立后,双方经 TCP 连接通道进行数据传输。理论上建立传输连接只需要一个请求和一个响应。<strong>但是,实际网络通信可能导致请求或响应丢失,可采用超时重传解决此问题,即请求或响应的丢失会造成定时器超时溢出,客户端将被迫再次发起连接请求,通过重传连接请求来建立连接,但是这样可能会导致重复连接</strong>。为了避免这些问题,在建立 TCP 连接时采用三次握手(Three-way Handshake)方法避免建立重复连接。该方法要求对所有报文段进行编号,每次建立连接都产生一个新的初始序列号。</p><ul><li>第一次握手:客户端向服务器发送一个 SYN 报文,请求建立连接。SYN 报文中含有序列号(Seq)字段,该字段指定了客户端下一次传输数据的序列号(每次握手都会产生一个新的序列号,用于防止旧的报文段被重复使用并被重新传送)。同时,客户端进入 SYN_SEND(同步发送)状态,等待服务器的确认。SYN 是一个标志位(flag),SYN=1 表示这个数据段是一个同步(SYN)报文。</li><li>第二次握手:服务器收到客户端的 SYN 报文后,发回一个 SYN+ACK 报文确认收到,并向客户端发送自己的 SYN 报文。SYN+ACK 报文中含有确认字段(Ack)和序列号字段(Seq),确认字段的值为客户端 SYN 报文的序列号+1,序列号字段则是服务器下一次传输数据的序列号。服务器进入 SYN_RECV(同步接收)状态。SYN 是一个标志位(flag),SYN=1 表示这个数据段是一个同步(SYN)报文。ACK 也是一个标志位(flag),ACK=1 表示这个 TCP 数据段是一个确认(ACK)数据段。</li><li>第三次握手:客户端收到服务器的 SYN+ACK 报文后,将确认号字段(Ack)设为服务器 SYN 报文的序列号+1,序列号字段为客户端第一次握手产生的序列号+1,并向服务器发送确认报文(ACK)。客户端进入 ESTABLISHED(建立连接)状态,表示连接已建立。</li></ul><p>TCP 的三次握手是必须的,因为它能够确保双方的通信能够顺利进行并且可以防止一些网络问题的出现。通过三次握手,双方能够建立一个可靠的连接,使得数据能够在双方之间可靠地传输。如果只进行一次握手,服务器无法确定客户端是否收到了其发出的 SYN 数据包,也无法确定客户端的接收能力是否正常。如果只进行两次握手,那么可能会发生一些问题,例如客户端发送了一个连接请求,但是此时网络延迟较长,客户端并没有收到服务器的回复,而此时客户端直接开始发送数据,这时服务器会收到一个没有进行三次握手的连接请求,这可能会导致数据传输的错误。因此,TCP 建立连接必须进行三次握手,以确保通信的可靠性。</p><h2 id="tcp-四次挥手过程" tabindex="-1">TCP 四次挥手过程? <a class="header-anchor" href="#tcp-四次挥手过程" aria-label="Permalink to &quot;TCP 四次挥手过程?&quot;">​</a></h2><h2 id="什么是-dns" tabindex="-1">什么是 DNS? <a class="header-anchor" href="#什么是-dns" aria-label="Permalink to &quot;什么是 DNS?&quot;">​</a></h2><h2 id="什么是-http-协议" tabindex="-1">什么是 HTTP 协议? <a class="header-anchor" href="#什么是-http-协议" aria-label="Permalink to &quot;什么是 HTTP 协议?&quot;">​</a></h2><h2 id="http-与-https-的区别" tabindex="-1">HTTP 与 HTTPS 的区别? <a class="header-anchor" href="#http-与-https-的区别" aria-label="Permalink to &quot;HTTP 与 HTTPS 的区别?&quot;">​</a></h2><h2 id="说说-http-缓存" tabindex="-1">说说 HTTP 缓存? <a class="header-anchor" href="#说说-http-缓存" aria-label="Permalink to &quot;说说 HTTP 缓存?&quot;">​</a></h2><h2 id="http-2-有哪些特性" tabindex="-1">HTTP/2 有哪些特性? <a class="header-anchor" href="#http-2-有哪些特性" aria-label="Permalink to &quot;HTTP/2 有哪些特性?&quot;">​</a></h2><h2 id="http-get-与-post-请求的区别" tabindex="-1">HTTP GET 与 POST 请求的区别? <a class="header-anchor" href="#http-get-与-post-请求的区别" aria-label="Permalink to &quot;HTTP GET 与 POST 请求的区别?&quot;">​</a></h2><p>GET 和 POST 是 HTTP 最主要的两个请求,其区别如下:</p><ul><li>传输参数位置:GET 请求将传输参数附加在 URL 的末尾,通常以问号（?）开始,参数之间使用“&amp;”符号分隔。而 POST 请求将数据包含在请求的请求体中。</li><li>应用场景:GET 请求用于从服务器获取数据,通常用于读取资源,如查看网页、下载文件、获取搜索结果等,因此 GET 请求是幂等的。POST 主要用于向服务器提交数据,执行对服务器状态的修改或进行其他需要数据传输的操作,因此是非幂等性的。</li><li>安全性:由于 GET 请求的参数以明文形式显示在 URL 中,因此不适合传输敏感信息,安全性比较差。而 POST 请求传输的数据包含在请求体中,并不会明文显示在 URL 中,因此安全性更高。此外,可以使用 HTTPS 来加密 POST 请求的数据,提高安全性。</li><li>缓存:GET 请求可以被浏览器缓存,以提高性能和减少重复请求。POST 请求默认情况下不会被浏览器缓存,因为它们通常会产生副作用,如修改服务器上的数据。</li></ul><h2 id="http-常用状态码有哪些" tabindex="-1">HTTP 常用状态码有哪些? <a class="header-anchor" href="#http-常用状态码有哪些" aria-label="Permalink to &quot;HTTP 常用状态码有哪些?&quot;">​</a></h2><ul><li>100(Continue)。100 状态码表示请求继续,客户端应继续其请求。</li><li>101(Switching Protocols)。101 状态码表示切换协议。服务器根据客户端的请求切换协议,只能切换到更高级的协议,例如切换到 HTTP 的新版本协议。</li><li>200(OK)。200 状态码表示请求成功。一般用于 GET 与 POST 请求。</li><li>204(No Content)。204 状态码表示无内容。服务器成功处理,但未返回内容。在未更新网页的情况下,可确保浏览器继续显示当前文档。</li><li>301(Moved Permanently)。301 状态码表示永久移动。请求的资源已被永久的移动到新 URI,返回信息会包括新的 URI,浏览器会自动定向到新 URI,今后任何新的请求都应使用新的 URI 代替。</li><li>302(Found)。302 状态码表示临时移动。与 301 类似,但资源只是临时被移动,客户端应继续使用原有 URI。</li><li>304(Not Modified)。304 状态码表示未修改,所请求的资源未修改,服务器返回此状态码时,不会返回任何资源。客户端通常会缓存访问过的资源,通过提供一个头信息指出客户端希望只返回在指定日期之后修改的资源。</li><li>307(Temporary Redirect)。307 状态码表示临时重定向,与 302 类似,使用 GET 请求重定向。</li><li>400(Bad Request)。400 状态码表示客户端请求的语法错误,服务器无法理解。</li><li>401(Unauthorized)。401 状态码表示请求要求用户的身份认证。</li><li>403(Forbidden)。403 状态码表示服务器理解请求客户端的请求,但是拒绝执行此请求。</li><li>500(Internal Server Error)。500 状态码表示服务器内部错误,无法完成请求。</li><li>502(Bad Gateway)。502 状态码表示错误网关。作为网关或者代理工作的服务器尝试执行请求时,从远程服务器接收到了一个无效的响应。</li><li>504(Gateway Time-out)。504 表示网关超时,充当网关或代理的服务器,未及时从远端服务器获取请求。</li></ul><h2 id="详细说说-http-缓存" tabindex="-1">详细说说 HTTP 缓存 <a class="header-anchor" href="#详细说说-http-缓存" aria-label="Permalink to &quot;详细说说 HTTP 缓存&quot;">​</a></h2>',19),o=[i];function h(T,d,n,P,s,c){return a(),e("div",null,o)}const u=t(r,[["render",h]]);export{S as __pageData,u as default};