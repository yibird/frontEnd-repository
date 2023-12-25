import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.e23b3577.js";const p="/frontEnd-repository/assets/img-lazy01.6e8ad4fe.png",o="/frontEnd-repository/assets/img-lazy02.e1169182.png",e="/frontEnd-repository/assets/img-lazy03.edc08a41.gif",C=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"solution/lazyLoading.md","filePath":"solution/lazyLoading.md","lastUpdated":1703485932000}'),t={name:"solution/lazyLoading.md"},c=l('<p>图片的优化是程序优化不可忽视的一部分,常用的图片优化手段如下:</p><ul><li>使用正确的图片编码。webp 格式的图片相比较 png、jpg 格式的图片体积小 40%,且兼容性好。</li><li>图片放在 CDN,CDN 加速能大大提升图片下载速度,减少图片白屏时间。</li><li>图片压缩,使用<code>&lt;picture&gt;</code>指定所需图片大小等等。</li><li>图片懒加载。图片懒加载是图片优化中最常见的手段之一,对于图片较多且大多数图片不在可视区域内,此时就可以使用图片懒加载。使用图片懒加载可以忽视一些未在可视区域的图片进行加载,避免一次性加载过多图片造成请求阻塞(浏览器一般对同一域名下的并发请求的连接数有限制),这样可以提高程序加载速度,提升用户体验。</li></ul><p>图片懒加载的实现原理:<strong>初始加载图片时将图片的 URL 设置在 img 元素自定义属性上(并不会发送请求),当图片处于可见区域时才设置 img 元素的 src,从而实现图片懒加载</strong>。图片懒加载的实现方案有监听 onscroll 滚动事件和 IntersectionObserver 两种,IntersectionObserver 性能相较于 onscroll 事件性能更好,但兼容性较差,所以 onscroll 方式被做为兜底方案。</p><h2 id="_1-监听-onscroll-事件实现图片懒加载" tabindex="-1">1.监听 onScroll 事件实现图片懒加载 <a class="header-anchor" href="#_1-监听-onscroll-事件实现图片懒加载" aria-label="Permalink to &quot;1.监听 onScroll 事件实现图片懒加载&quot;">​</a></h2><p>onScroll 事件实现图片懒加载流程:初始加载图片时可以将图片的路径挂载到 img 标签非 src 属性上(例如 dataset-src),当触发滚动事件时,判断 img 元素是否进入可视区域,如果进入可视区域就设置 img 的 src 属性加载图片,,此时 img 会根据 src 属性的路径进行图片加载。</p><p>判断元素是否进入可视区域需要依赖于<code>Element.getBoundingClientRect()</code>,<code>Element.getBoundingClientRect()</code> 方法返回元素的大小及其相对于视口的位置。包含当前元素的 left、top、right、bottom、x、 y、 width、height 这几个以像素为单位的只读属性。当<code>el.getBoundingClientRect().top &lt; 可视区域的高度</code>则说明 el 进入可视区域,可视区域的高度可以通过<code>documentElement.clientHeight</code> 和 <code>body.clientHeight</code>获取。</p><p><img src="'+p+'" alt="prototype"><img src="'+o+`" alt="prototype"></p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">&lt;!-- html结构 --&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">img</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">className</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">{</span><span style="color:#FDAEB7;font-style:italic;">&#39;lazy-img&#39;}</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">dataset-src</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;https://scpic.chinaz.net/Files/pic/pic9/202104/apic32339_s.jpg&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  /&gt; &lt;</span><span style="color:#85E89D;">img</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">className</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">{</span><span style="color:#FDAEB7;font-style:italic;">&#39;lazy-img&#39;}</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">dataset-src</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;https://scpic.chinaz.net/Files/pic/pic9/202104/apic32339_s.jpg&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  /&gt; &lt;</span><span style="color:#85E89D;">img</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">className</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">{</span><span style="color:#FDAEB7;font-style:italic;">&#39;lazy-img&#39;}</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">dataset-src</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;https://scpic.chinaz.net/Files/pic/pic9/202104/apic32339_s.jpg&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  /&gt; &lt;</span><span style="color:#85E89D;">img</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">className</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">{</span><span style="color:#FDAEB7;font-style:italic;">&#39;lazy-img&#39;}</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">dataset-src</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;https://scpic.chinaz.net/Files/pic/pic9/202104/apic32339_s.jpg&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  /&gt; &lt;</span><span style="color:#85E89D;">img</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">className</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">{</span><span style="color:#FDAEB7;font-style:italic;">&#39;lazy-img&#39;}</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">dataset-src</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;https://scpic.chinaz.net/Files/pic/pic9/202104/apic32339_s.jpg&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 获取可视区域的高度</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getClientHeight</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">clientH</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> document.documentElement.clientHeight;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">bodyClientH</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> document.body.clientHeight;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> clientH </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> bodyClientH</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> bodyClientH </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> clientH</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> bodyClientH</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> clientH</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> bodyClientH </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> clientH</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> bodyClientH</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> clientH;</span></span>
<span class="line"><span style="color:#E1E4E8;">  };</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 判断元素是否进入可视区域</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">isElementInViewport</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">el</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">HTMLElement</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">typeof</span><span style="color:#E1E4E8;"> el.getBoundingClientRect </span><span style="color:#F97583;">!==</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;function&quot;</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">rect</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> el.</span><span style="color:#B392F0;">getBoundingClientRect</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 如果react.top &lt; getClientHeight() 表示el元素处于可视区域中</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> rect.top </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getClientHeight</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">  };</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">loadImg</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">imgsEl</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> document.</span><span style="color:#B392F0;">querySelectorAll</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;.lazy-img&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">imgs</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Array</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">prototype</span><span style="color:#E1E4E8;">.slice.</span><span style="color:#B392F0;">call</span><span style="color:#E1E4E8;">(imgsEl);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> i </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">, len </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> imgs.</span><span style="color:#79B8FF;">length</span><span style="color:#E1E4E8;">; i </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> len; i</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 如果目标元素在可视区域且图片src为空</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#B392F0;">isElementInViewport</span><span style="color:#E1E4E8;">(imgs[i]) </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> imgs[i].src </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 将img的dataset-src属性值赋值给img.src,从而发起请求</span></span>
<span class="line"><span style="color:#E1E4E8;">        imgs[i].src </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> imgs[i].</span><span style="color:#B392F0;">getAttribute</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;dataset-src&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 删除当前设置了src的图片</span></span>
<span class="line"><span style="color:#E1E4E8;">        imgs.</span><span style="color:#B392F0;">slice</span><span style="color:#E1E4E8;">(i, </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  };</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 为了加载初始位置就在可视区的图片所以调用一次,可通过防抖函数进行优化</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">loadImg</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">  window.</span><span style="color:#B392F0;">onscroll</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">loadImg</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">  };</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">&lt;!-- html结构 --&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">img</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">className</span><span style="color:#24292E;">=</span><span style="color:#032F62;">{</span><span style="color:#B31D28;font-style:italic;">&#39;lazy-img&#39;}</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">dataset-src</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;https://scpic.chinaz.net/Files/pic/pic9/202104/apic32339_s.jpg&quot;</span></span>
<span class="line"><span style="color:#24292E;">  /&gt; &lt;</span><span style="color:#22863A;">img</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">className</span><span style="color:#24292E;">=</span><span style="color:#032F62;">{</span><span style="color:#B31D28;font-style:italic;">&#39;lazy-img&#39;}</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">dataset-src</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;https://scpic.chinaz.net/Files/pic/pic9/202104/apic32339_s.jpg&quot;</span></span>
<span class="line"><span style="color:#24292E;">  /&gt; &lt;</span><span style="color:#22863A;">img</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">className</span><span style="color:#24292E;">=</span><span style="color:#032F62;">{</span><span style="color:#B31D28;font-style:italic;">&#39;lazy-img&#39;}</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">dataset-src</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;https://scpic.chinaz.net/Files/pic/pic9/202104/apic32339_s.jpg&quot;</span></span>
<span class="line"><span style="color:#24292E;">  /&gt; &lt;</span><span style="color:#22863A;">img</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">className</span><span style="color:#24292E;">=</span><span style="color:#032F62;">{</span><span style="color:#B31D28;font-style:italic;">&#39;lazy-img&#39;}</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">dataset-src</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;https://scpic.chinaz.net/Files/pic/pic9/202104/apic32339_s.jpg&quot;</span></span>
<span class="line"><span style="color:#24292E;">  /&gt; &lt;</span><span style="color:#22863A;">img</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">className</span><span style="color:#24292E;">=</span><span style="color:#032F62;">{</span><span style="color:#B31D28;font-style:italic;">&#39;lazy-img&#39;}</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">dataset-src</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;https://scpic.chinaz.net/Files/pic/pic9/202104/apic32339_s.jpg&quot;</span></span>
<span class="line"><span style="color:#24292E;">  /&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 获取可视区域的高度</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getClientHeight</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">clientH</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> document.documentElement.clientHeight;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">bodyClientH</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> document.body.clientHeight;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> clientH </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> bodyClientH</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> bodyClientH </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> clientH</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> bodyClientH</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> clientH</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> bodyClientH </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> clientH</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> bodyClientH</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> clientH;</span></span>
<span class="line"><span style="color:#24292E;">  };</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 判断元素是否进入可视区域</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">isElementInViewport</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">el</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">HTMLElement</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">typeof</span><span style="color:#24292E;"> el.getBoundingClientRect </span><span style="color:#D73A49;">!==</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;function&quot;</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">rect</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> el.</span><span style="color:#6F42C1;">getBoundingClientRect</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 如果react.top &lt; getClientHeight() 表示el元素处于可视区域中</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> rect.top </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getClientHeight</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">  };</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">loadImg</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">imgsEl</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> document.</span><span style="color:#6F42C1;">querySelectorAll</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;.lazy-img&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">imgs</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Array</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">prototype</span><span style="color:#24292E;">.slice.</span><span style="color:#6F42C1;">call</span><span style="color:#24292E;">(imgsEl);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> i </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">, len </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> imgs.</span><span style="color:#005CC5;">length</span><span style="color:#24292E;">; i </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> len; i</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 如果目标元素在可视区域且图片src为空</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#6F42C1;">isElementInViewport</span><span style="color:#24292E;">(imgs[i]) </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> imgs[i].src </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 将img的dataset-src属性值赋值给img.src,从而发起请求</span></span>
<span class="line"><span style="color:#24292E;">        imgs[i].src </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> imgs[i].</span><span style="color:#6F42C1;">getAttribute</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;dataset-src&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 删除当前设置了src的图片</span></span>
<span class="line"><span style="color:#24292E;">        imgs.</span><span style="color:#6F42C1;">slice</span><span style="color:#24292E;">(i, </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  };</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 为了加载初始位置就在可视区的图片所以调用一次,可通过防抖函数进行优化</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">loadImg</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">  window.</span><span style="color:#6F42C1;">onscroll</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">loadImg</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">  };</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><p>onscroll 方式实现图片懒加载的优点在于兼容性好,但性能不佳,需要持续监听滚动事件;实现不太优雅,代码量大。</p><h2 id="_2-使用-intersectionobserver-实现图片懒加载" tabindex="-1">2.使用 IntersectionObserver 实现图片懒加载 <a class="header-anchor" href="#_2-使用-intersectionobserver-实现图片懒加载" aria-label="Permalink to &quot;2.使用 IntersectionObserver 实现图片懒加载&quot;">​</a></h2><p>在以前检测一个元素是否可见或者两个元素是否相交并不容易,不是不可靠或者就是性能不佳。好在 Intersection Observer API 出现解决了这一问题,它提供了一种异步检测目标元素与祖先元素或 viewport 相交情况变化的方法,祖先元素与视窗(viewport)被称为根(root)。相交检测场景如下:</p><ul><li>图片懒加载——当图片滚动到可见时才进行加载。</li><li>内容无限滚动——也就是用户滚动到接近内容底部时直接加载更多，而无需用户操作翻页，给用户一种网页可以无限滚动的错觉。</li><li>检测广告的曝光情况——为了计算广告收益，需要知道广告元素的曝光情况。</li><li>在用户看见某个区域时执行任务或播放动画。</li></ul><p>当一个 IntersectionObserver 对象被创建时,其被配置为监听根中一段给定比例的可见区域。一旦 IntersectionObserver 被创建,则无法更改其配置,所以一个给定的观察者对象只能用来监听可见区域的特定变化值;然而,可以在同一个观察者对象中配置监听多个目标元素 。 IntersectionObserver 通过的构造函数创建一个新的 IntersectionObserver 对象,IntersectionObserver 构造函数接收一个函数做为回调函数,该回调函数接收 IntersectionObserverEntry 数组和 IntersectionObserver 对象两个参数。其中 IntersectionObserverEntry 为观察目标的数组对象,IntersectionObserver 为新创建的 IntersectionObserver 对象。当其监听到目标元素的可见部分穿过了一个或多个阈(thresholds)时,会执行指定的回调函数,所以必须使用新创建的 IntersectionObserver 对象调用 observe()监听目标元素,且监听目标可见部分穿过了一个或多个阈(thresholds)时才会执行回调函数。</p><p>IntersectionObserverEntry 对象具有如下属性:</p><ul><li>boundingClientRect:返回包含目标元素的边界信息的 DOMRectReadOnly,边界的计算方式与 Element.getBoundingClientRect()相同。</li><li>intersectionRatio:返回 intersectionRect 与 boundingClientRect 的比例值。intersectionRect 大于 0 说明元素进入可视区域了。</li><li>isIntersecting:返回一个布尔值, 如果目标元素与交叉区域观察者对象(intersection observer) 的根相交,则返回 true .如果返回 true, 则 IntersectionObserverEntry 描述了变换到交叉时的状态; 如果返回 false,那么可以由此判断,变换是从交叉状态到非交叉状态。简单来说 isIntersecting 属性可以用来判断元素是否处于可见,可见返回 true。 当 isIntersecting 的返回值从 false 变为 true,说明元素从不可见状态变为可见状态。</li><li>rootBounds:返回一个 DOMRectReadOnly 用来描述交叉区域观察者(intersection observer)中的根,如果不设置根则默认使用顶级文档的视窗(body)。假设 rootBounds 的值为{bottom: 719,height: 719,left: 0,right: 599,top: 0,width: 599,x: 0,y: 0},则表示 body 的宽是 599px,height 是 719px。</li><li>target:与根出现相交区域改变的元素。</li><li>time:返回一个记录从 IntersectionObserver 的时间原点(time origin)到交叉被触发的时间的时间戳(DOMHighResTimeStamp)。</li></ul><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">id</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;container&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">style</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;width:200px;height:200px;background-color:red&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  IntersectionObserve监听元素</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">   * 使用IntersectionObserver构造函数实例化IntersectionObserver对象,构造函数接收一个</span></span>
<span class="line"><span style="color:#6A737D;">   * 回调函数做为参数,该回调函数接收IntersectionObserverEntry数组和IntersectionObserver</span></span>
<span class="line"><span style="color:#6A737D;">   * 对象两个参数。其中IntersectionObserverEntry为观察目标的数组对象,</span></span>
<span class="line"><span style="color:#6A737D;">   * IntersectionObserver为新创建的IntersectionObserver对象。</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">containerObserver</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">IntersectionObserver</span><span style="color:#E1E4E8;">((</span><span style="color:#FFAB70;">entries</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">observer</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    entries.</span><span style="color:#B392F0;">forEach</span><span style="color:#E1E4E8;">((</span><span style="color:#FFAB70;">entry</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">index</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;">       * entry.intersectionRatio用于判断监听的元素是否可见,大于0为可见,小于0为不可见</span></span>
<span class="line"><span style="color:#6A737D;">       */</span></span>
<span class="line"><span style="color:#E1E4E8;">      console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;监听元素是否可见:&quot;</span><span style="color:#E1E4E8;">, entry.intersectionRatio </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">); </span><span style="color:#6A737D;">// true,上面div是可见的</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">       * 可以使用entry.isIntersecting来判断监听的元素是否可见,可见返回true,否则返回false。</span></span>
<span class="line"><span style="color:#6A737D;">       * entry.isIntersecting的值从false变为true时表示从不可见状态转变为可见状态,</span></span>
<span class="line"><span style="color:#6A737D;">       * entry.isIntersecting的值从true变为false时表示从可见状态转变为不可见状态。</span></span>
<span class="line"><span style="color:#6A737D;">       */</span></span>
<span class="line"><span style="color:#E1E4E8;">      console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;监听元素是否可见:&quot;</span><span style="color:#E1E4E8;">, entry.isIntersecting);</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 获取与根区域相交的目标元素,如果监听的元素为可见那么entry.target就是监听的元素</span></span>
<span class="line"><span style="color:#E1E4E8;">      console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;获取与根区域相交的目标元素:&quot;</span><span style="color:#E1E4E8;">, entry.target);</span></span>
<span class="line"><span style="color:#E1E4E8;">    });</span></span>
<span class="line"><span style="color:#E1E4E8;">  });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">//------------- IntersectionObserver对象的方法</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">container</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> document.</span><span style="color:#B392F0;">getElementById</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;container&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">   * observe()用于监听元素,只有监听了元素且监听元素可见部分穿过了一个或多个阈(thresholds)</span></span>
<span class="line"><span style="color:#6A737D;">   * 时才会执行 IntersectionObserver构造函数中的回调函数</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#E1E4E8;">  containerObserver.</span><span style="color:#B392F0;">observe</span><span style="color:#E1E4E8;">(container);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">   * IntersectionObserver 的disconnect()方法终止对所有目标元素可见性变化的观察</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#E1E4E8;">  containerObserver.</span><span style="color:#B392F0;">disconnect</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">   * IntersectionObserver 的方法takeRecords()返回一个 IntersectionObserverEntry</span></span>
<span class="line"><span style="color:#6A737D;">   * 对象数组,每个对象的目标元素都包含每次相交的信息,可以显式通过调用此方法或隐式地</span></span>
<span class="line"><span style="color:#6A737D;">   * 通过观察者的回调自动调用.</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#E1E4E8;">  containerObserver.</span><span style="color:#B392F0;">takeRecords</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;">   * unobserve()方法命令IntersectionObserver停止对一个元素的观察。</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#E1E4E8;">  containerObserver.</span><span style="color:#B392F0;">unobserve</span><span style="color:#E1E4E8;">(container);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">//-------------IntersectionObserver对象的属性;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">   * IntersectionObserver.root,用于设置所监听对象的具体祖先元素(element)。</span></span>
<span class="line"><span style="color:#6A737D;">   * 如果未传入值或值为null,则默认使用顶级文档的视窗。root属性是只读的</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#E1E4E8;">  containerObserver.root </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> document.body;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">   * IntersectionObserver.rootMargin,计算交叉时添加到根(root)边界盒bounding box(en-US)的</span></span>
<span class="line"><span style="color:#6A737D;">   * 矩形偏移量，可以有效的缩小或扩大根的判定范围从而满足计算需要。此属性返回的值可能与调用构造</span></span>
<span class="line"><span style="color:#6A737D;">   * 函数时指定的值不同，因此可能需要更改该值，以匹配内部要求。所有的偏移量均可用像素(pixel)(px)</span></span>
<span class="line"><span style="color:#6A737D;">   * 或百分(percentage)(%)来表达,默认值为&quot;0px 0px 0px 0px&quot;。rootMargin是只读的。</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#E1E4E8;">  containerObserver.rootMargin </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;0px 0px 0px 0px&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">   * IntersectionObserver.thresholds一个包含阈值的列表, 按升序排列,列表中的每个阈值都是监听</span></span>
<span class="line"><span style="color:#6A737D;">   * 对象的交叉区域与边界区域的比率。当监听对象的任何阈值被越过时，都会生成一个通知(Notification)。</span></span>
<span class="line"><span style="color:#6A737D;">   * 如果构造器未传入值,则默认值为0。</span></span>
<span class="line"><span style="color:#6A737D;">   **/</span></span>
<span class="line"><span style="color:#E1E4E8;">  containerObserver.thresholds </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">id</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;container&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">style</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;width:200px;height:200px;background-color:red&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  IntersectionObserve监听元素</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">   * 使用IntersectionObserver构造函数实例化IntersectionObserver对象,构造函数接收一个</span></span>
<span class="line"><span style="color:#6A737D;">   * 回调函数做为参数,该回调函数接收IntersectionObserverEntry数组和IntersectionObserver</span></span>
<span class="line"><span style="color:#6A737D;">   * 对象两个参数。其中IntersectionObserverEntry为观察目标的数组对象,</span></span>
<span class="line"><span style="color:#6A737D;">   * IntersectionObserver为新创建的IntersectionObserver对象。</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">containerObserver</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">IntersectionObserver</span><span style="color:#24292E;">((</span><span style="color:#E36209;">entries</span><span style="color:#24292E;">, </span><span style="color:#E36209;">observer</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    entries.</span><span style="color:#6F42C1;">forEach</span><span style="color:#24292E;">((</span><span style="color:#E36209;">entry</span><span style="color:#24292E;">, </span><span style="color:#E36209;">index</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;">       * entry.intersectionRatio用于判断监听的元素是否可见,大于0为可见,小于0为不可见</span></span>
<span class="line"><span style="color:#6A737D;">       */</span></span>
<span class="line"><span style="color:#24292E;">      console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;监听元素是否可见:&quot;</span><span style="color:#24292E;">, entry.intersectionRatio </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">); </span><span style="color:#6A737D;">// true,上面div是可见的</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">       * 可以使用entry.isIntersecting来判断监听的元素是否可见,可见返回true,否则返回false。</span></span>
<span class="line"><span style="color:#6A737D;">       * entry.isIntersecting的值从false变为true时表示从不可见状态转变为可见状态,</span></span>
<span class="line"><span style="color:#6A737D;">       * entry.isIntersecting的值从true变为false时表示从可见状态转变为不可见状态。</span></span>
<span class="line"><span style="color:#6A737D;">       */</span></span>
<span class="line"><span style="color:#24292E;">      console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;监听元素是否可见:&quot;</span><span style="color:#24292E;">, entry.isIntersecting);</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 获取与根区域相交的目标元素,如果监听的元素为可见那么entry.target就是监听的元素</span></span>
<span class="line"><span style="color:#24292E;">      console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;获取与根区域相交的目标元素:&quot;</span><span style="color:#24292E;">, entry.target);</span></span>
<span class="line"><span style="color:#24292E;">    });</span></span>
<span class="line"><span style="color:#24292E;">  });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">//------------- IntersectionObserver对象的方法</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">container</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> document.</span><span style="color:#6F42C1;">getElementById</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;container&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">   * observe()用于监听元素,只有监听了元素且监听元素可见部分穿过了一个或多个阈(thresholds)</span></span>
<span class="line"><span style="color:#6A737D;">   * 时才会执行 IntersectionObserver构造函数中的回调函数</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#24292E;">  containerObserver.</span><span style="color:#6F42C1;">observe</span><span style="color:#24292E;">(container);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">   * IntersectionObserver 的disconnect()方法终止对所有目标元素可见性变化的观察</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#24292E;">  containerObserver.</span><span style="color:#6F42C1;">disconnect</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">   * IntersectionObserver 的方法takeRecords()返回一个 IntersectionObserverEntry</span></span>
<span class="line"><span style="color:#6A737D;">   * 对象数组,每个对象的目标元素都包含每次相交的信息,可以显式通过调用此方法或隐式地</span></span>
<span class="line"><span style="color:#6A737D;">   * 通过观察者的回调自动调用.</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#24292E;">  containerObserver.</span><span style="color:#6F42C1;">takeRecords</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;">   * unobserve()方法命令IntersectionObserver停止对一个元素的观察。</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#24292E;">  containerObserver.</span><span style="color:#6F42C1;">unobserve</span><span style="color:#24292E;">(container);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">//-------------IntersectionObserver对象的属性;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">   * IntersectionObserver.root,用于设置所监听对象的具体祖先元素(element)。</span></span>
<span class="line"><span style="color:#6A737D;">   * 如果未传入值或值为null,则默认使用顶级文档的视窗。root属性是只读的</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#24292E;">  containerObserver.root </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> document.body;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">   * IntersectionObserver.rootMargin,计算交叉时添加到根(root)边界盒bounding box(en-US)的</span></span>
<span class="line"><span style="color:#6A737D;">   * 矩形偏移量，可以有效的缩小或扩大根的判定范围从而满足计算需要。此属性返回的值可能与调用构造</span></span>
<span class="line"><span style="color:#6A737D;">   * 函数时指定的值不同，因此可能需要更改该值，以匹配内部要求。所有的偏移量均可用像素(pixel)(px)</span></span>
<span class="line"><span style="color:#6A737D;">   * 或百分(percentage)(%)来表达,默认值为&quot;0px 0px 0px 0px&quot;。rootMargin是只读的。</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#24292E;">  containerObserver.rootMargin </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;0px 0px 0px 0px&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">   * IntersectionObserver.thresholds一个包含阈值的列表, 按升序排列,列表中的每个阈值都是监听</span></span>
<span class="line"><span style="color:#6A737D;">   * 对象的交叉区域与边界区域的比率。当监听对象的任何阈值被越过时，都会生成一个通知(Notification)。</span></span>
<span class="line"><span style="color:#6A737D;">   * 如果构造器未传入值,则默认值为0。</span></span>
<span class="line"><span style="color:#6A737D;">   **/</span></span>
<span class="line"><span style="color:#24292E;">  containerObserver.thresholds </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><p>IntersectionObserver 实现懒加载:</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">style</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">.lazy-img</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">height</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">200</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">width</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">400</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">style</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">body</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;图片懒加载&lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">img</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;lazy-img&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">dataset-src</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;https://scpic.chinaz.net/Files/pic/pic9/202104/apic32339_s.jpg&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">img</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;lazy-img&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">dataset-src</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;https://scpic.chinaz.net/Files/pic/pic9/202104/apic32339_s.jpg&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">img</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;lazy-img&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">dataset-src</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;https://scpic.chinaz.net/Files/pic/pic9/202104/apic32339_s.jpg&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">img</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;lazy-img&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">dataset-src</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;https://scpic.chinaz.net/Files/pic/pic9/202104/apic32339_s.jpg&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">img</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;lazy-img&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">dataset-src</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;https://scpic.chinaz.net/Files/pic/pic9/202104/apic32339_s.jpg&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">img</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;lazy-img&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">dataset-src</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;https://scpic.chinaz.net/Files/pic/pic9/202104/apic32339_s.jpg&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">img</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;lazy-img&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">dataset-src</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;https://scpic.chinaz.net/Files/pic/pic9/202104/apic32339_s.jpg&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">img</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;lazy-img&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">dataset-src</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;https://scpic.chinaz.net/Files/pic/pic9/202104/apic32339_s.jpg&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">img</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;lazy-img&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">dataset-src</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;https://scpic.chinaz.net/Files/pic/pic9/202104/apic32339_s.jpg&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">img</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;lazy-img&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">dataset-src</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;https://scpic.chinaz.net/Files/pic/pic9/202104/apic32339_s.jpg&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">img</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;lazy-img&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">dataset-src</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;https://scpic.chinaz.net/Files/pic/pic9/202104/apic32339_s.jpg&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">img</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;lazy-img&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">dataset-src</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;https://scpic.chinaz.net/Files/pic/pic9/202104/apic32339_s.jpg&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">img</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;lazy-img&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">dataset-src</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;https://scpic.chinaz.net/Files/pic/pic9/202104/apic32339_s.jpg&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">img</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;lazy-img&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">dataset-src</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;https://scpic.chinaz.net/Files/pic/pic9/202104/apic32339_s.jpg&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">img</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;lazy-img&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">dataset-src</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;https://scpic.chinaz.net/Files/pic/pic9/202104/apic32339_s.jpg&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">img</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;lazy-img&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">dataset-src</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;https://scpic.chinaz.net/Files/pic/pic9/202104/apic32339_s.jpg&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">img</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;lazy-img&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">dataset-src</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;https://scpic.chinaz.net/Files/pic/pic9/202104/apic32339_s.jpg&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">img</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;lazy-img&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">dataset-src</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;https://scpic.chinaz.net/Files/pic/pic9/202104/apic32339_s.jpg&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">img</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;lazy-img&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">dataset-src</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;https://scpic.chinaz.net/Files/pic/pic9/202104/apic32339_s.jpg&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">img</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;lazy-img&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">dataset-src</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;https://scpic.chinaz.net/Files/pic/pic9/202104/apic32339_s.jpg&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">img</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;lazy-img&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">dataset-src</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;https://scpic.chinaz.net/Files/pic/pic9/202104/apic32339_s.jpg&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">img</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;lazy-img&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">dataset-src</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;https://scpic.chinaz.net/Files/pic/pic9/202104/apic32339_s.jpg&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">img</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;lazy-img&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">dataset-src</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;https://scpic.chinaz.net/Files/pic/pic9/202104/apic32339_s.jpg&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">img</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;lazy-img&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">dataset-src</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;https://scpic.chinaz.net/Files/pic/pic9/202104/apic32339_s.jpg&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">img</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;lazy-img&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">dataset-src</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;https://scpic.chinaz.net/Files/pic/pic9/202104/apic32339_s.jpg&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">img</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;lazy-img&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">dataset-src</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;https://scpic.chinaz.net/Files/pic/pic9/202104/apic32339_s.jpg&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">img</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;lazy-img&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">dataset-src</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;https://scpic.chinaz.net/Files/pic/pic9/202104/apic32339_s.jpg&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">img</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;lazy-img&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">dataset-src</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;https://scpic.chinaz.net/Files/pic/pic9/202104/apic32339_s.jpg&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">img</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;lazy-img&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">dataset-src</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;https://scpic.chinaz.net/Files/pic/pic9/202104/apic32339_s.jpg&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">img</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;lazy-img&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">dataset-src</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;https://scpic.chinaz.net/Files/pic/pic9/202104/apic32339_s.jpg&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">img</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;lazy-img&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">dataset-src</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;https://scpic.chinaz.net/Files/pic/pic9/202104/apic32339_s.jpg&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">img</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;lazy-img&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">dataset-src</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;https://scpic.chinaz.net/Files/pic/pic9/202104/apic32339_s.jpg&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">img</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;lazy-img&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">dataset-src</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;https://scpic.chinaz.net/Files/pic/pic9/202104/apic32339_s.jpg&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">img</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;lazy-img&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">dataset-src</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;https://scpic.chinaz.net/Files/pic/pic9/202104/apic32339_s.jpg&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">img</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;lazy-img&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">dataset-src</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;https://scpic.chinaz.net/Files/pic/pic9/202104/apic32339_s.jpg&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">img</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;lazy-img&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">dataset-src</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;https://scpic.chinaz.net/Files/pic/pic9/202104/apic32339_s.jpg&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">img</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;lazy-img&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">dataset-src</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;https://scpic.chinaz.net/Files/pic/pic9/202104/apic32339_s.jpg&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">img</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;lazy-img&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">dataset-src</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;https://scpic.chinaz.net/Files/pic/pic9/202104/apic32339_s.jpg&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">body</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">lazyImageHandler</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#9ECBFF;">&quot;IntersectionObserver&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> window) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">lazyImageObserve</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">IntersectionObserver</span><span style="color:#E1E4E8;">((</span><span style="color:#FFAB70;">entries</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">observer</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        entries.</span><span style="color:#B392F0;">forEach</span><span style="color:#E1E4E8;">((</span><span style="color:#FFAB70;">entry</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">index</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#6A737D;">// 如果元素可见</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (entry.intersectionRatio </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> lazyImage </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> entry.target;</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 如果目标图片已经设置过了src就忽略监听</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">lazyImage.src) {</span></span>
<span class="line"><span style="color:#E1E4E8;">              lazyImage.src </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> lazyImage.</span><span style="color:#B392F0;">getAttribute</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;dataset-src&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#6A737D;">// 设置src后取消监听图片元素</span></span>
<span class="line"><span style="color:#E1E4E8;">              lazyImageObserve.</span><span style="color:#B392F0;">unobserve</span><span style="color:#E1E4E8;">(lazyImage);</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">          }</span></span>
<span class="line"><span style="color:#E1E4E8;">        });</span></span>
<span class="line"><span style="color:#E1E4E8;">      });</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 获取所有图片</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">imgsElement</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> document.</span><span style="color:#B392F0;">querySelectorAll</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;.lazy-img&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">imgList</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Array</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">prototype</span><span style="color:#E1E4E8;">.slice.</span><span style="color:#B392F0;">call</span><span style="color:#E1E4E8;">(imgsElement);</span></span>
<span class="line"><span style="color:#E1E4E8;">      imgList.</span><span style="color:#B392F0;">forEach</span><span style="color:#E1E4E8;">((</span><span style="color:#FFAB70;">img</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        lazyImageObserve.</span><span style="color:#B392F0;">observe</span><span style="color:#E1E4E8;">(img);</span></span>
<span class="line"><span style="color:#E1E4E8;">      });</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  };</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">lazyImageHandler</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">style</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">.lazy-img</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">height</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">200</span><span style="color:#D73A49;">px</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">width</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">400</span><span style="color:#D73A49;">px</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">style</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">body</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;图片懒加载&lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">img</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;lazy-img&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">dataset-src</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;https://scpic.chinaz.net/Files/pic/pic9/202104/apic32339_s.jpg&quot;</span></span>
<span class="line"><span style="color:#24292E;">    /&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">img</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;lazy-img&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">dataset-src</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;https://scpic.chinaz.net/Files/pic/pic9/202104/apic32339_s.jpg&quot;</span></span>
<span class="line"><span style="color:#24292E;">    /&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">img</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;lazy-img&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">dataset-src</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;https://scpic.chinaz.net/Files/pic/pic9/202104/apic32339_s.jpg&quot;</span></span>
<span class="line"><span style="color:#24292E;">    /&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">img</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;lazy-img&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">dataset-src</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;https://scpic.chinaz.net/Files/pic/pic9/202104/apic32339_s.jpg&quot;</span></span>
<span class="line"><span style="color:#24292E;">    /&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">img</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;lazy-img&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">dataset-src</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;https://scpic.chinaz.net/Files/pic/pic9/202104/apic32339_s.jpg&quot;</span></span>
<span class="line"><span style="color:#24292E;">    /&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">img</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;lazy-img&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">dataset-src</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;https://scpic.chinaz.net/Files/pic/pic9/202104/apic32339_s.jpg&quot;</span></span>
<span class="line"><span style="color:#24292E;">    /&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">img</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;lazy-img&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">dataset-src</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;https://scpic.chinaz.net/Files/pic/pic9/202104/apic32339_s.jpg&quot;</span></span>
<span class="line"><span style="color:#24292E;">    /&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">img</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;lazy-img&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">dataset-src</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;https://scpic.chinaz.net/Files/pic/pic9/202104/apic32339_s.jpg&quot;</span></span>
<span class="line"><span style="color:#24292E;">    /&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">img</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;lazy-img&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">dataset-src</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;https://scpic.chinaz.net/Files/pic/pic9/202104/apic32339_s.jpg&quot;</span></span>
<span class="line"><span style="color:#24292E;">    /&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">img</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;lazy-img&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">dataset-src</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;https://scpic.chinaz.net/Files/pic/pic9/202104/apic32339_s.jpg&quot;</span></span>
<span class="line"><span style="color:#24292E;">    /&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">img</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;lazy-img&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">dataset-src</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;https://scpic.chinaz.net/Files/pic/pic9/202104/apic32339_s.jpg&quot;</span></span>
<span class="line"><span style="color:#24292E;">    /&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">img</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;lazy-img&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">dataset-src</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;https://scpic.chinaz.net/Files/pic/pic9/202104/apic32339_s.jpg&quot;</span></span>
<span class="line"><span style="color:#24292E;">    /&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">img</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;lazy-img&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">dataset-src</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;https://scpic.chinaz.net/Files/pic/pic9/202104/apic32339_s.jpg&quot;</span></span>
<span class="line"><span style="color:#24292E;">    /&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">img</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;lazy-img&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">dataset-src</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;https://scpic.chinaz.net/Files/pic/pic9/202104/apic32339_s.jpg&quot;</span></span>
<span class="line"><span style="color:#24292E;">    /&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">img</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;lazy-img&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">dataset-src</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;https://scpic.chinaz.net/Files/pic/pic9/202104/apic32339_s.jpg&quot;</span></span>
<span class="line"><span style="color:#24292E;">    /&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">img</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;lazy-img&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">dataset-src</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;https://scpic.chinaz.net/Files/pic/pic9/202104/apic32339_s.jpg&quot;</span></span>
<span class="line"><span style="color:#24292E;">    /&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">img</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;lazy-img&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">dataset-src</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;https://scpic.chinaz.net/Files/pic/pic9/202104/apic32339_s.jpg&quot;</span></span>
<span class="line"><span style="color:#24292E;">    /&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">img</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;lazy-img&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">dataset-src</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;https://scpic.chinaz.net/Files/pic/pic9/202104/apic32339_s.jpg&quot;</span></span>
<span class="line"><span style="color:#24292E;">    /&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">img</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;lazy-img&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">dataset-src</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;https://scpic.chinaz.net/Files/pic/pic9/202104/apic32339_s.jpg&quot;</span></span>
<span class="line"><span style="color:#24292E;">    /&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">img</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;lazy-img&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">dataset-src</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;https://scpic.chinaz.net/Files/pic/pic9/202104/apic32339_s.jpg&quot;</span></span>
<span class="line"><span style="color:#24292E;">    /&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">img</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;lazy-img&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">dataset-src</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;https://scpic.chinaz.net/Files/pic/pic9/202104/apic32339_s.jpg&quot;</span></span>
<span class="line"><span style="color:#24292E;">    /&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">img</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;lazy-img&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">dataset-src</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;https://scpic.chinaz.net/Files/pic/pic9/202104/apic32339_s.jpg&quot;</span></span>
<span class="line"><span style="color:#24292E;">    /&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">img</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;lazy-img&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">dataset-src</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;https://scpic.chinaz.net/Files/pic/pic9/202104/apic32339_s.jpg&quot;</span></span>
<span class="line"><span style="color:#24292E;">    /&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">img</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;lazy-img&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">dataset-src</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;https://scpic.chinaz.net/Files/pic/pic9/202104/apic32339_s.jpg&quot;</span></span>
<span class="line"><span style="color:#24292E;">    /&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">img</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;lazy-img&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">dataset-src</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;https://scpic.chinaz.net/Files/pic/pic9/202104/apic32339_s.jpg&quot;</span></span>
<span class="line"><span style="color:#24292E;">    /&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">img</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;lazy-img&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">dataset-src</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;https://scpic.chinaz.net/Files/pic/pic9/202104/apic32339_s.jpg&quot;</span></span>
<span class="line"><span style="color:#24292E;">    /&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">img</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;lazy-img&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">dataset-src</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;https://scpic.chinaz.net/Files/pic/pic9/202104/apic32339_s.jpg&quot;</span></span>
<span class="line"><span style="color:#24292E;">    /&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">img</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;lazy-img&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">dataset-src</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;https://scpic.chinaz.net/Files/pic/pic9/202104/apic32339_s.jpg&quot;</span></span>
<span class="line"><span style="color:#24292E;">    /&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">img</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;lazy-img&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">dataset-src</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;https://scpic.chinaz.net/Files/pic/pic9/202104/apic32339_s.jpg&quot;</span></span>
<span class="line"><span style="color:#24292E;">    /&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">img</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;lazy-img&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">dataset-src</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;https://scpic.chinaz.net/Files/pic/pic9/202104/apic32339_s.jpg&quot;</span></span>
<span class="line"><span style="color:#24292E;">    /&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">img</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;lazy-img&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">dataset-src</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;https://scpic.chinaz.net/Files/pic/pic9/202104/apic32339_s.jpg&quot;</span></span>
<span class="line"><span style="color:#24292E;">    /&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">img</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;lazy-img&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">dataset-src</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;https://scpic.chinaz.net/Files/pic/pic9/202104/apic32339_s.jpg&quot;</span></span>
<span class="line"><span style="color:#24292E;">    /&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">img</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;lazy-img&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">dataset-src</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;https://scpic.chinaz.net/Files/pic/pic9/202104/apic32339_s.jpg&quot;</span></span>
<span class="line"><span style="color:#24292E;">    /&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">img</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;lazy-img&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">dataset-src</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;https://scpic.chinaz.net/Files/pic/pic9/202104/apic32339_s.jpg&quot;</span></span>
<span class="line"><span style="color:#24292E;">    /&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">img</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;lazy-img&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">dataset-src</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;https://scpic.chinaz.net/Files/pic/pic9/202104/apic32339_s.jpg&quot;</span></span>
<span class="line"><span style="color:#24292E;">    /&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">img</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;lazy-img&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">dataset-src</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;https://scpic.chinaz.net/Files/pic/pic9/202104/apic32339_s.jpg&quot;</span></span>
<span class="line"><span style="color:#24292E;">    /&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">img</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;lazy-img&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">dataset-src</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;https://scpic.chinaz.net/Files/pic/pic9/202104/apic32339_s.jpg&quot;</span></span>
<span class="line"><span style="color:#24292E;">    /&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">img</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;lazy-img&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">dataset-src</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;https://scpic.chinaz.net/Files/pic/pic9/202104/apic32339_s.jpg&quot;</span></span>
<span class="line"><span style="color:#24292E;">    /&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">body</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">lazyImageHandler</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#032F62;">&quot;IntersectionObserver&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> window) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">lazyImageObserve</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">IntersectionObserver</span><span style="color:#24292E;">((</span><span style="color:#E36209;">entries</span><span style="color:#24292E;">, </span><span style="color:#E36209;">observer</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        entries.</span><span style="color:#6F42C1;">forEach</span><span style="color:#24292E;">((</span><span style="color:#E36209;">entry</span><span style="color:#24292E;">, </span><span style="color:#E36209;">index</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6A737D;">// 如果元素可见</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (entry.intersectionRatio </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> lazyImage </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> entry.target;</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 如果目标图片已经设置过了src就忽略监听</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">!</span><span style="color:#24292E;">lazyImage.src) {</span></span>
<span class="line"><span style="color:#24292E;">              lazyImage.src </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> lazyImage.</span><span style="color:#6F42C1;">getAttribute</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;dataset-src&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#6A737D;">// 设置src后取消监听图片元素</span></span>
<span class="line"><span style="color:#24292E;">              lazyImageObserve.</span><span style="color:#6F42C1;">unobserve</span><span style="color:#24292E;">(lazyImage);</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">          }</span></span>
<span class="line"><span style="color:#24292E;">        });</span></span>
<span class="line"><span style="color:#24292E;">      });</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 获取所有图片</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">imgsElement</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> document.</span><span style="color:#6F42C1;">querySelectorAll</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;.lazy-img&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">imgList</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Array</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">prototype</span><span style="color:#24292E;">.slice.</span><span style="color:#6F42C1;">call</span><span style="color:#24292E;">(imgsElement);</span></span>
<span class="line"><span style="color:#24292E;">      imgList.</span><span style="color:#6F42C1;">forEach</span><span style="color:#24292E;">((</span><span style="color:#E36209;">img</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        lazyImageObserve.</span><span style="color:#6F42C1;">observe</span><span style="color:#24292E;">(img);</span></span>
<span class="line"><span style="color:#24292E;">      });</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  };</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">lazyImageHandler</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><p>效果图: <img src="`+e+`" alt="prototype"></p><p>IntersectionObserver 实现图片懒加载具有性能佳、简单、代码量少的优点,缺点是兼容性差，IE 完全不支持，在 safari 也需要 12 以上才支持。所以可以将 onScroll 方案和 IntersectionObserver 方案结合起来,如果浏览器支持 IntersectionObserver 那么就使用 IntersectionObserver 方案,否则使用 onScroll 方案。</p><h2 id="_3-onscroll-与-intersectionobserver-结合实现图片懒加载" tabindex="-1">3.onScroll 与 IntersectionObserver 结合实现图片懒加载 <a class="header-anchor" href="#_3-onscroll-与-intersectionobserver-结合实现图片懒加载" aria-label="Permalink to &quot;3.onScroll 与 IntersectionObserver 结合实现图片懒加载&quot;">​</a></h2><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">LazyImage</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">constructor</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">selector</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 获取所有图片</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.imgList </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">getImageList</span><span style="color:#E1E4E8;">(selector);</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">init</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">getImageList</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">selector</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> (</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.imgList </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Array</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">prototype</span><span style="color:#E1E4E8;">.slice.</span><span style="color:#B392F0;">call</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">        document.</span><span style="color:#B392F0;">querySelectorAll</span><span style="color:#E1E4E8;">(selector)</span></span>
<span class="line"><span style="color:#E1E4E8;">      ));</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">init</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&quot;IntersectionObserver&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> window</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">observeImage</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">onScrollImage</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// IntersectionObserver方案加载图片</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">observeImage</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">lazyImageObserve</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">IntersectionObserver</span><span style="color:#E1E4E8;">((</span><span style="color:#FFAB70;">entries</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">observer</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        entries.</span><span style="color:#B392F0;">forEach</span><span style="color:#E1E4E8;">((</span><span style="color:#FFAB70;">entry</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">index</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (entry.intersectionRatio </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">lazyImageTarget</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> entry.target;</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">lazyImageTarget.src) {</span></span>
<span class="line"><span style="color:#E1E4E8;">              lazyImageTarget.src </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> lazyImageTarget.</span><span style="color:#B392F0;">getAttribute</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;dataset-src&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">              lazyImageObserve.</span><span style="color:#B392F0;">unobserve</span><span style="color:#E1E4E8;">(lazyImageTarget);</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">          }</span></span>
<span class="line"><span style="color:#E1E4E8;">        });</span></span>
<span class="line"><span style="color:#E1E4E8;">      });</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.imgList.</span><span style="color:#B392F0;">forEach</span><span style="color:#E1E4E8;">((</span><span style="color:#FFAB70;">img</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        lazyImageObserve.</span><span style="color:#B392F0;">observe</span><span style="color:#E1E4E8;">(img);</span></span>
<span class="line"><span style="color:#E1E4E8;">      });</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// onscroll方案懒加载图片</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">onScrollImage</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">handler</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.imgList.</span><span style="color:#B392F0;">forEach</span><span style="color:#E1E4E8;">((</span><span style="color:#FFAB70;">img</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">index</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#6A737D;">// 如果图片可见且图片未设置src属性</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">isElementInViewport</span><span style="color:#E1E4E8;">(img) </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">img.src) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            img.src </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> img.</span><span style="color:#B392F0;">getAttribute</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;dataset-src&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.imgList.</span><span style="color:#B392F0;">slice</span><span style="color:#E1E4E8;">(index, </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">          }</span></span>
<span class="line"><span style="color:#E1E4E8;">        });</span></span>
<span class="line"><span style="color:#E1E4E8;">      };</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// scroll事件有时候可能遇到触底加载的场景,所以当触底加载数据时要重新获取图片列表</span></span>
<span class="line"><span style="color:#E1E4E8;">      document.</span><span style="color:#B392F0;">addEventListener</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;scroll&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#B392F0;">throttle</span><span style="color:#E1E4E8;">(handler).</span><span style="color:#B392F0;">bind</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">));</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 获取可视区域高度</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">getClientHeight</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">clientH</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> document.documentElement.clientHeight;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">bodyClientH</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> document.body.clientHeight;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> clientH </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> bodyClientH</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> bodyClientH </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> clientH</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> bodyClientH</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> clientH</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> bodyClientH </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> clientH</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> bodyClientH</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> clientH;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 判断元素是否可见,通过el.getBoundingClientRect().top &lt; getClientHeight() 表示可见</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">isElementInViewport</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">el</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">typeof</span><span style="color:#E1E4E8;"> el.getBoundingClientRect </span><span style="color:#F97583;">!==</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;function&quot;</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">rect</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> el.</span><span style="color:#B392F0;">getBoundingClientRect</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> rect.top </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">getClientHeight</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">lazyImage</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">LazyImage</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;.lazy-img&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">LazyImage</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">constructor</span><span style="color:#24292E;">(</span><span style="color:#E36209;">selector</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 获取所有图片</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.imgList </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">getImageList</span><span style="color:#24292E;">(selector);</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">init</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">getImageList</span><span style="color:#24292E;">(</span><span style="color:#E36209;">selector</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> (</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.imgList </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Array</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">prototype</span><span style="color:#24292E;">.slice.</span><span style="color:#6F42C1;">call</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">        document.</span><span style="color:#6F42C1;">querySelectorAll</span><span style="color:#24292E;">(selector)</span></span>
<span class="line"><span style="color:#24292E;">      ));</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">init</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">&quot;IntersectionObserver&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> window</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">observeImage</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">onScrollImage</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// IntersectionObserver方案加载图片</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">observeImage</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">lazyImageObserve</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">IntersectionObserver</span><span style="color:#24292E;">((</span><span style="color:#E36209;">entries</span><span style="color:#24292E;">, </span><span style="color:#E36209;">observer</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        entries.</span><span style="color:#6F42C1;">forEach</span><span style="color:#24292E;">((</span><span style="color:#E36209;">entry</span><span style="color:#24292E;">, </span><span style="color:#E36209;">index</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (entry.intersectionRatio </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">lazyImageTarget</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> entry.target;</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">!</span><span style="color:#24292E;">lazyImageTarget.src) {</span></span>
<span class="line"><span style="color:#24292E;">              lazyImageTarget.src </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> lazyImageTarget.</span><span style="color:#6F42C1;">getAttribute</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;dataset-src&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">              lazyImageObserve.</span><span style="color:#6F42C1;">unobserve</span><span style="color:#24292E;">(lazyImageTarget);</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">          }</span></span>
<span class="line"><span style="color:#24292E;">        });</span></span>
<span class="line"><span style="color:#24292E;">      });</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.imgList.</span><span style="color:#6F42C1;">forEach</span><span style="color:#24292E;">((</span><span style="color:#E36209;">img</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        lazyImageObserve.</span><span style="color:#6F42C1;">observe</span><span style="color:#24292E;">(img);</span></span>
<span class="line"><span style="color:#24292E;">      });</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// onscroll方案懒加载图片</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">onScrollImage</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">handler</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.imgList.</span><span style="color:#6F42C1;">forEach</span><span style="color:#24292E;">((</span><span style="color:#E36209;">img</span><span style="color:#24292E;">, </span><span style="color:#E36209;">index</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6A737D;">// 如果图片可见且图片未设置src属性</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">isElementInViewport</span><span style="color:#24292E;">(img) </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">!</span><span style="color:#24292E;">img.src) {</span></span>
<span class="line"><span style="color:#24292E;">            img.src </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> img.</span><span style="color:#6F42C1;">getAttribute</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;dataset-src&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.imgList.</span><span style="color:#6F42C1;">slice</span><span style="color:#24292E;">(index, </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">          }</span></span>
<span class="line"><span style="color:#24292E;">        });</span></span>
<span class="line"><span style="color:#24292E;">      };</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// scroll事件有时候可能遇到触底加载的场景,所以当触底加载数据时要重新获取图片列表</span></span>
<span class="line"><span style="color:#24292E;">      document.</span><span style="color:#6F42C1;">addEventListener</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;scroll&quot;</span><span style="color:#24292E;">, </span><span style="color:#6F42C1;">throttle</span><span style="color:#24292E;">(handler).</span><span style="color:#6F42C1;">bind</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">));</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 获取可视区域高度</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">getClientHeight</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">clientH</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> document.documentElement.clientHeight;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">bodyClientH</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> document.body.clientHeight;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> clientH </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> bodyClientH</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> bodyClientH </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> clientH</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> bodyClientH</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> clientH</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> bodyClientH </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> clientH</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> bodyClientH</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> clientH;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 判断元素是否可见,通过el.getBoundingClientRect().top &lt; getClientHeight() 表示可见</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">isElementInViewport</span><span style="color:#24292E;">(</span><span style="color:#E36209;">el</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">typeof</span><span style="color:#24292E;"> el.getBoundingClientRect </span><span style="color:#D73A49;">!==</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;function&quot;</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">rect</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> el.</span><span style="color:#6F42C1;">getBoundingClientRect</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> rect.top </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">getClientHeight</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">lazyImage</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">LazyImage</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;.lazy-img&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span></code></pre></div>`,22),r=[c];function E(y,i,F,g,u,m){return n(),a("div",null,r)}const A=s(t,[["render",E]]);export{C as __pageData,A as default};
