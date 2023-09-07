import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.a9ea851b.js";const p="/frontEnd-repository/assets/watermark-01.d7084957.png",o="/frontEnd-repository/assets/watermark-02.dea03ae0.png",C=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"solution/watermark.md","filePath":"solution/watermark.md","lastUpdated":1694072565000}'),e={name:"solution/watermark.md"},t=l(`<p>水印功能是内容保护的一种手段之一,水印可分为文字水印、视频水印等等。对于文件相关水印为了其安全性通常由后端实现,对于视图水印可以由客户端实现,客户端实现水印的常见方案如下:</p><ul><li>基于 CSS 的 background-image 实现图片水印。实现简单,不如 canvas、svg 灵活,</li><li>基于 canvas 绘制水印(支持文字和图片水印)。实现灵活,兼容性好,大部分环境都支持 canvas,因此 canvas 是绘制水印的主流方式。</li><li>基于 svg 绘制水印。实现简单,比较灵活,单兼容性不好,小程序和 uniapp 等环境都不支持 svg。</li></ul><h2 id="_1-基于-css-background-image-属性绘制图片水印" tabindex="-1">1.基于 CSS background-image 属性绘制图片水印 <a class="header-anchor" href="#_1-基于-css-background-image-属性绘制图片水印" aria-label="Permalink to &quot;1.基于 CSS background-image 属性绘制图片水印&quot;">​</a></h2><p>在 CSS 中,可以使用 background-image 属性来实现图片水印。首先,将水印图片放入 HTML 文档中,然后使用 background-image 属性将水印图片设置为背景图片,最后调整水印图片的位置和大小。基于 CSS background-image 绘制水印虽然简单,但实现水印效果不好(无法设置背景图的旋转方向和间距),而且 CSS 的实现方式不如 JS 灵活。</p><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">body</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> class=&quot;watermark&quot;</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">div</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">body</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">html</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">style</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">*</span><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">margin</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">padding</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">html</span><span style="color:#E1E4E8;">,</span><span style="color:#85E89D;">body</span><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">width</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">100</span><span style="color:#F97583;">%</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">height</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">100</span><span style="color:#F97583;">%</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">background-color</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">aliceblue</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">position</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">relative</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">overflow</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">hidden</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">.watermark</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">position</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">absolute</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">left</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">top</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">width</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">100</span><span style="color:#F97583;">%</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">height</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">100</span><span style="color:#F97583;">%</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">background-image</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">url</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;https://img11.360buyimg.com/imagetools/jfs/t1/57345/6/20069/8019/62b995cdEd96fef03/51d3302dfeccd1d2.png&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">/* 背景图的位置(x和y轴) */</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">background-position</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">center</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">center</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">/* 不平铺背景图 */</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">background-repeat</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">no-repeat</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">/* 背景图片大小 */</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">background-size</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">120</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">/* 逆时针旋转45度 */</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">transform</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">rotate</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">-45</span><span style="color:#F97583;">deg</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">/* 设置鼠标事件无响应,避免层级过低的元素无法被点击 */</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">pointer-events</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">none</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">style</span><span style="color:#F97583;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">body</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> class=&quot;watermark&quot;</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">div</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">body</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">html</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">style</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">*</span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">margin</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">padding</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">html</span><span style="color:#24292E;">,</span><span style="color:#22863A;">body</span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">width</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">100</span><span style="color:#D73A49;">%</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">height</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">100</span><span style="color:#D73A49;">%</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">background-color</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">aliceblue</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">position</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">relative</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">overflow</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">hidden</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">.watermark</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">position</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">absolute</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">left</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">top</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">width</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">100</span><span style="color:#D73A49;">%</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">height</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">100</span><span style="color:#D73A49;">%</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">background-image</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">url</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;https://img11.360buyimg.com/imagetools/jfs/t1/57345/6/20069/8019/62b995cdEd96fef03/51d3302dfeccd1d2.png&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">/* 背景图的位置(x和y轴) */</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">background-position</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">center</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">center</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">/* 不平铺背景图 */</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">background-repeat</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">no-repeat</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">/* 背景图片大小 */</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">background-size</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">120</span><span style="color:#D73A49;">px</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">/* 逆时针旋转45度 */</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">transform</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">rotate</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">-45</span><span style="color:#D73A49;">deg</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">/* 设置鼠标事件无响应,避免层级过低的元素无法被点击 */</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">pointer-events</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">none</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">style</span><span style="color:#D73A49;">&gt;</span></span></code></pre></div><h2 id="_2-基于-canvas-绘制水印" tabindex="-1">2.基于 Canvas 绘制水印 <a class="header-anchor" href="#_2-基于-canvas-绘制水印" aria-label="Permalink to &quot;2.基于 Canvas 绘制水印&quot;">​</a></h2><p>canvas 绘制水印原理是创建一个 Canvas 元素,利用 canvas 绘制图片或文字内容,绘制完成后通过 toDataURL()将内容转为 base64 编码,最后利用 CSS background-image 引入 base64 编码并展示。由于水印的层级过高,可能导致层级低的元素无法响应鼠标事件,为了避免影响层级过低的元素鼠标事件,需要水印元素样式设置为 pointer-events: none。canvas 绘制水印流程如下:</p><ul><li>创建一个 canvas 元素并设置 canvas 宽和高。根据 canvas 元素创建上下文对象,通过 window.devicePixelRatio(当前显示设备的物理像素分辨率与 CSS 像素分辨率之比)获取 canvas 的宽度和高度,获取 canvas 宽高后设置 canvas 的宽高。由于 canvas 缩小放大会导致绘制内容模糊,使用 window.devicePixelRatio 确定应添加多少额外的像素密度以使图像更清晰。</li><li>根据 image 或 content 输入判断绘制图片水印还是文字水印。如果同时设置 image 和 content,图片水印优先级高于文字水印。</li><li>绘制水印。首先利用 canvas 绘制水印内容,通过 canvas 的 drawImage()将 canvas 的内容绘制成图片,然后通过 toDataURL()将图片转为 base64 编码,最后利用 CSS <code>background-image</code>引入 base64 编码并展示水印,通过<code>background-repeat:repeat</code>属性支持水印重复显示。 <ul><li>绘制图片水印。创建一个 Image 对象,监听 Image 对象的 onload 事件(加载成功事件),当图片加载成功时,通过 canvas 的 translate()和 rotate()设置图片平移位置和旋转角度,然后通过 canvas 的 drawImage()绘制图片,绘制图片后调用 restore()将 canvas 恢复到最近一次的保存状态,最终通过 toDataURL()将图片转为 base64 编码,利用 CSS background-image 引入 base64 编码并展示,<code>background-repeat:repeat</code>属性支持水印重复显示。</li><li>绘制文字水印。绘制文字水印与绘制图片大致相同,通过 canvas 的 translate()和 rotate()设置图片平移位置和旋转角度,通过 fillStyle、font、textAlign 等属性设置填充样式、字体、字体对齐方式,然后通过 fillText()绘制文字内容,绘制后通过 toDataURL()将图片转为 base64 编码,利用 CSS background-image 引入 base64 编码并展示。</li></ul></li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">&lt;!</span><span style="color:#79B8FF;">DOCTYPE</span><span style="color:#E1E4E8;"> html</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">html</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">lang</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;en&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">head</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">meta</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">charset</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;UTF-8&quot;</span><span style="color:#E1E4E8;"> /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">meta</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">http-equiv</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;X-UA-Compatible&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">content</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;IE=edge&quot;</span><span style="color:#E1E4E8;"> /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">meta</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">name</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;viewport&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">content</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;width=device-width, initial-scale=1.0&quot;</span><span style="color:#E1E4E8;"> /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">title</span><span style="color:#E1E4E8;">&gt;Document&lt;/</span><span style="color:#85E89D;">title</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;/</span><span style="color:#85E89D;">head</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">body</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;box&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;</span><span style="color:#85E89D;">span</span><span style="color:#E1E4E8;">&gt;这是一段文字&lt;/</span><span style="color:#85E89D;">span</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;watermark&quot;</span><span style="color:#E1E4E8;">&gt;&lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;/</span><span style="color:#85E89D;">body</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">html</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  function watermark(options) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">if</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">typeof</span><span style="color:#E1E4E8;"> options </span><span style="color:#F97583;">!==</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;object&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&amp;&amp;</span></span>
<span class="line"><span style="color:#E1E4E8;">      options </span><span style="color:#F97583;">!==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&amp;&amp;</span></span>
<span class="line"><span style="color:#E1E4E8;">      options </span><span style="color:#F97583;">!==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">undefined</span></span>
<span class="line"><span style="color:#E1E4E8;">    ) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      throw new </span><span style="color:#B392F0;">Error</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;options参数错误&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 默认配置项</span></span>
<span class="line"><span style="color:#E1E4E8;">    const defaultOptions </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 水印宽度</span></span>
<span class="line"><span style="color:#E1E4E8;">      width: </span><span style="color:#79B8FF;">120</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 水印高度</span></span>
<span class="line"><span style="color:#E1E4E8;">      height: </span><span style="color:#79B8FF;">60</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 水印旋转角度</span></span>
<span class="line"><span style="color:#E1E4E8;">      rotate: </span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">30</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 水印图片源</span></span>
<span class="line"><span style="color:#E1E4E8;">      image: </span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 水印图片宽度</span></span>
<span class="line"><span style="color:#E1E4E8;">      imageWidth: </span><span style="color:#79B8FF;">120</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 水印图片高度</span></span>
<span class="line"><span style="color:#E1E4E8;">      imageHeight: </span><span style="color:#79B8FF;">64</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 水印图片层级</span></span>
<span class="line"><span style="color:#E1E4E8;">      zIndex: </span><span style="color:#79B8FF;">2000</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 水平间距</span></span>
<span class="line"><span style="color:#E1E4E8;">      gapX: </span><span style="color:#79B8FF;">24</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 垂直间距</span></span>
<span class="line"><span style="color:#E1E4E8;">      gapY: </span><span style="color:#79B8FF;">48</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 文字水印内容</span></span>
<span class="line"><span style="color:#E1E4E8;">      content: </span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 文字大小</span></span>
<span class="line"><span style="color:#E1E4E8;">      fontSize: </span><span style="color:#79B8FF;">14</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 文字颜色</span></span>
<span class="line"><span style="color:#E1E4E8;">      fontColor: </span><span style="color:#9ECBFF;">&quot;rgba(0,0,0,.15)&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 文字样式</span></span>
<span class="line"><span style="color:#E1E4E8;">      fontStyle: </span><span style="color:#9ECBFF;">&quot;normal&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 文字字体</span></span>
<span class="line"><span style="color:#E1E4E8;">      fontFamily: </span><span style="color:#9ECBFF;">&quot;PingFang SC&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 文字粗细</span></span>
<span class="line"><span style="color:#E1E4E8;">      fontWeight: </span><span style="color:#9ECBFF;">&quot;normal&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 是否全屏水印</span></span>
<span class="line"><span style="color:#E1E4E8;">      fullPage: </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    };</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">drawImage</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">ctx</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">options</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> { </span><span style="color:#79B8FF;">imageWidth</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">imageHeight</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">ratio</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">markWidth</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">markHeight</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">rotate</span><span style="color:#E1E4E8;"> } </span><span style="color:#F97583;">=</span></span>
<span class="line"><span style="color:#E1E4E8;">        options;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 创建一个图片对象</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">img</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Image</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">       * 请求图片时是否开启CORS功能。anonymous表示在请求头上携带Origin属性,</span></span>
<span class="line"><span style="color:#6A737D;">       * 但请求不会携带cookie和其他的认证信息。</span></span>
<span class="line"><span style="color:#6A737D;">       */</span></span>
<span class="line"><span style="color:#E1E4E8;">      img.crossOrigin </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;anonymous&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">       * 该属性表示获取资源时的引用方式。&quot;no-referrer&quot;表示HTTP头部信息将不会发送referrer</span></span>
<span class="line"><span style="color:#6A737D;">       */</span></span>
<span class="line"><span style="color:#E1E4E8;">      img.referrerPolicy </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;no-referrer&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 设置图片源</span></span>
<span class="line"><span style="color:#E1E4E8;">      img.src </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> image;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">       * 监听图片加载完成事件,图片加载完成则通过</span></span>
<span class="line"><span style="color:#6A737D;">       * canvas绘制图片水印</span></span>
<span class="line"><span style="color:#6A737D;">       */</span></span>
<span class="line"><span style="color:#E1E4E8;">      img.</span><span style="color:#B392F0;">onload</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;">         * translate(x,y):将canvas按x点的水平方向、y点垂直方向进行平移变换</span></span>
<span class="line"><span style="color:#6A737D;">         */</span></span>
<span class="line"><span style="color:#E1E4E8;">        ctx.</span><span style="color:#B392F0;">translate</span><span style="color:#E1E4E8;">(markWidth </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">, markHeight </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">         * rotate(angle):用于旋转canvas,angle表示旋转的幅度,正数表示顺时针旋转,</span></span>
<span class="line"><span style="color:#6A737D;">         * 负数表示逆时针旋转,旋转公式为:degree * Math.PI / 180。旋转中心点默认是</span></span>
<span class="line"><span style="color:#6A737D;">         * canvas 的起始点,可以通过translate()方法平移改变旋转中心点。</span></span>
<span class="line"><span style="color:#6A737D;">         * translate(markWidth / 2, markHeight / 2)表示以canvas的中心点作为</span></span>
<span class="line"><span style="color:#6A737D;">         * 旋转中心。</span></span>
<span class="line"><span style="color:#6A737D;">         */</span></span>
<span class="line"><span style="color:#E1E4E8;">        ctx.</span><span style="color:#B392F0;">rotate</span><span style="color:#E1E4E8;">((Math.</span><span style="color:#79B8FF;">PI</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">180</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Number</span><span style="color:#E1E4E8;">(rotate));</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">         * drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)</span></span>
<span class="line"><span style="color:#6A737D;">         * 用于绘制图像,包含如下参数:</span></span>
<span class="line"><span style="color:#6A737D;">         * - image:绘制到canvaS上下文的元素。元素可以是图片、svg、video、canvas。</span></span>
<span class="line"><span style="color:#6A737D;">         * - sx:需要绘制到目标上下文中的,image的矩形(裁剪)选择框的左上角 X 轴坐标。</span></span>
<span class="line"><span style="color:#6A737D;">         * - sy:需要绘制到目标上下文中的,image的矩形(裁剪)选择框的左上角 Y 轴坐标。</span></span>
<span class="line"><span style="color:#6A737D;">         * - sWidth:需要绘制到目标上下文中的,image 的矩形（裁剪）选择框的宽度。</span></span>
<span class="line"><span style="color:#6A737D;">         * - sHeight:需要绘制到目标上下文中的,image 的矩形（裁剪）选择框的高度。</span></span>
<span class="line"><span style="color:#6A737D;">         * - dx:image 的左上角在目标画布上 X 轴坐标。</span></span>
<span class="line"><span style="color:#6A737D;">         * - dy:image 的左上角在目标画布上 Y 轴坐标。</span></span>
<span class="line"><span style="color:#6A737D;">         * - dWidth:image 在目标画布上绘制的宽度。</span></span>
<span class="line"><span style="color:#6A737D;">         * - dHeight:image 在目标画布上绘制的高度。</span></span>
<span class="line"><span style="color:#6A737D;">         */</span></span>
<span class="line"><span style="color:#E1E4E8;">        ctx.</span><span style="color:#B392F0;">drawImage</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">          img,</span></span>
<span class="line"><span style="color:#E1E4E8;">          (</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">imageWidth </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> ratio) </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          (</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">imageHeight </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> ratio) </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          imageWidth </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> ratio,</span></span>
<span class="line"><span style="color:#E1E4E8;">          imageHeight </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> ratio</span></span>
<span class="line"><span style="color:#E1E4E8;">        );</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 将canvas恢复到最近一次的保存状态</span></span>
<span class="line"><span style="color:#E1E4E8;">        ctx.</span><span style="color:#B392F0;">restore</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">base64Url</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> canvas.</span><span style="color:#B392F0;">toDataURL</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">setStyle</span><span style="color:#E1E4E8;">(base64Url, options);</span></span>
<span class="line"><span style="color:#E1E4E8;">      };</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">drawText</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">ctx</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">options</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">fontSize</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">fontColor</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">fontStyle</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">fontWeight</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">fontFamily</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">markWidth</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">markHeight</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">rotate</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      } </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> options;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">markSize</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Number</span><span style="color:#E1E4E8;">(fontSize) </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> ratio;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 设置文本基线,middle表示文本基线在文本块的中间</span></span>
<span class="line"><span style="color:#E1E4E8;">      ctx.textBaseline </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;middle&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 文字对齐方式,center表示居中对齐</span></span>
<span class="line"><span style="color:#E1E4E8;">      ctx.textAlign </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;center&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 填充样式</span></span>
<span class="line"><span style="color:#E1E4E8;">      ctx.fillStyle </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> fontColor;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 设置字体</span></span>
<span class="line"><span style="color:#E1E4E8;">      ctx.font </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">\`\${</span><span style="color:#E1E4E8;">fontStyle</span><span style="color:#9ECBFF;">} normal \${</span><span style="color:#E1E4E8;">fontWeight</span><span style="color:#9ECBFF;">} \${</span><span style="color:#E1E4E8;">markSize</span><span style="color:#9ECBFF;">}px/\${</span><span style="color:#E1E4E8;">markHeight</span><span style="color:#9ECBFF;">}px \${</span><span style="color:#E1E4E8;">fontFamily</span><span style="color:#9ECBFF;">}\`</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 文字绕中间旋转</span></span>
<span class="line"><span style="color:#E1E4E8;">      ctx.</span><span style="color:#B392F0;">translate</span><span style="color:#E1E4E8;">(markWidth </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">, markHeight </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">      ctx.</span><span style="color:#B392F0;">rotate</span><span style="color:#E1E4E8;">((Math.</span><span style="color:#79B8FF;">PI</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">180</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Number</span><span style="color:#E1E4E8;">(rotate));</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">       * fillText(text, x, y, [maxWidth]):填充文字。</span></span>
<span class="line"><span style="color:#6A737D;">       * - text:渲染的文本内容。</span></span>
<span class="line"><span style="color:#6A737D;">       * - x:渲染文本的x轴坐标。</span></span>
<span class="line"><span style="color:#6A737D;">       * - y:渲染文本的y轴坐标。</span></span>
<span class="line"><span style="color:#6A737D;">       * - maxWidth:绘制的最大宽度,可选。如果指定了值,并且经过计算字符串的</span></span>
<span class="line"><span style="color:#6A737D;">       * 值比最大宽度还要宽,字体为了适应会水平缩放或者使用小号的字体。</span></span>
<span class="line"><span style="color:#6A737D;">       */</span></span>
<span class="line"><span style="color:#E1E4E8;">      ctx.</span><span style="color:#B392F0;">fillText</span><span style="color:#E1E4E8;">(content, </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 将canvas恢复到最近一次的保存状态</span></span>
<span class="line"><span style="color:#E1E4E8;">      ctx.</span><span style="color:#B392F0;">restore</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">       * toDataURL(type, encoderOptions)用于返回一个包含图片展示的 data URI。</span></span>
<span class="line"><span style="color:#6A737D;">       * data URI即利用base64编码把图片数据翻译成标准ASCII字符,简单来说toDataURL()</span></span>
<span class="line"><span style="color:#6A737D;">       * 将canvas绘制的图片转为base64编码。toDataURL参数如下:</span></span>
<span class="line"><span style="color:#6A737D;">       * - type:转换的图片格式。默认为image/png。</span></span>
<span class="line"><span style="color:#6A737D;">       * - encoderOptions:转换后图片质量。如果图片格式为 image/jpeg 或 image/webp</span></span>
<span class="line"><span style="color:#6A737D;">       * 的情况下,可以从 0 到 1 的区间内选择图片的质量。如果超出取值范围,将会使用</span></span>
<span class="line"><span style="color:#6A737D;">       * 默认值 0.92,其他参数会被忽略。</span></span>
<span class="line"><span style="color:#6A737D;">       */</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">base64Url</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> canvas.</span><span style="color:#B392F0;">toDataURL</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">setStyle</span><span style="color:#E1E4E8;">(base64Url, options);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">     * 根据canvas绘制图片的base64编码和配置对象设置样式。</span></span>
<span class="line"><span style="color:#6A737D;">     * 通过CSS background-image 引入绘制图片base64编码实现水印,</span></span>
<span class="line"><span style="color:#6A737D;">     * 由于background-repeat属性的默认为repeat,水印会沿着水平轴和垂直轴</span></span>
<span class="line"><span style="color:#6A737D;">     * 重复;通过background-size属性设置 gapX(水平间距) + width(水印宽度)</span></span>
<span class="line"><span style="color:#6A737D;">     * 实现水印之间的间距。</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">{*}</span><span style="color:#6A737D;"> </span><span style="color:#E1E4E8;">base64Url</span><span style="color:#6A737D;"> canvas绘制图片的base64编码</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">{*}</span><span style="color:#6A737D;"> </span><span style="color:#E1E4E8;">options</span><span style="color:#6A737D;"> 配置对象</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">setStyle</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">base64Url</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">options</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">el</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> document.</span><span style="color:#B392F0;">getElementsByClassName</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;watermark&quot;</span><span style="color:#E1E4E8;">)[</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">];</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">el) </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> { </span><span style="color:#79B8FF;">zIndex</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">gapX</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">width</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">fullPage</span><span style="color:#E1E4E8;"> } </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> options;</span></span>
<span class="line"><span style="color:#E1E4E8;">      el.style.zIndex </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> zIndex;</span></span>
<span class="line"><span style="color:#E1E4E8;">      el.style.backgroundSize </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">\`\${</span><span style="color:#E1E4E8;">gapX</span><span style="color:#9ECBFF;"> </span><span style="color:#F97583;">+</span><span style="color:#9ECBFF;"> </span><span style="color:#E1E4E8;">width</span><span style="color:#9ECBFF;">}px\`</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">      el.style.backgroundImage </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">\`url(\${</span><span style="color:#E1E4E8;">base64Url</span><span style="color:#9ECBFF;">})\`</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">       * 判断是否全屏显示水印,如果全屏显示水印则添加watermark-full-page类样式,</span></span>
<span class="line"><span style="color:#6A737D;">       * 注意非全屏显示水印需要将父元素为相对布局,即 position: relative。</span></span>
<span class="line"><span style="color:#6A737D;">       */</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (fullPage) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        el.classList.</span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;watermark-full-page&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 创建一个canvas元素</span></span>
<span class="line"><span style="color:#E1E4E8;">    const canvas </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> document.</span><span style="color:#B392F0;">createElement</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;canvas&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">     * 根据canvas获取上下文对象,HTML Canvas API仅支持2d,</span></span>
<span class="line"><span style="color:#6A737D;">     * 若要渲染3d效果请使用Webgl(Three.js是目前最为流行的webgl库)</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    const ctx </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> canvas.</span><span style="color:#B392F0;">getContext</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;2d&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">ctx) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      throw new </span><span style="color:#B392F0;">Error</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;当前环境不支持canvas&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    options </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> Object.</span><span style="color:#B392F0;">assign</span><span style="color:#E1E4E8;">(defaultOptions, options);</span></span>
<span class="line"><span style="color:#E1E4E8;">    const { width, height, gapX, gapY, image, content } </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> options;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;">     * 返回当前显示设备的物理像素分辨率与CSS像素分辨率之比,由于canvas</span></span>
<span class="line"><span style="color:#6A737D;">     * 缩小放大会导致绘制内容模糊,使用window.devicePixelRatio确定应添加</span></span>
<span class="line"><span style="color:#6A737D;">     * 多少额外的像素密度以使图像更清晰。</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    const ratio </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> window.devicePixelRatio </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 获取canvas的宽高,即: (水平或垂直间距 + 宽或高) * 像素比</span></span>
<span class="line"><span style="color:#E1E4E8;">    const canvasWidth </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">\`\${</span><span style="color:#9ECBFF;">(</span><span style="color:#E1E4E8;">gapX</span><span style="color:#9ECBFF;"> </span><span style="color:#F97583;">+</span><span style="color:#9ECBFF;"> </span><span style="color:#E1E4E8;">width</span><span style="color:#9ECBFF;">) </span><span style="color:#F97583;">*</span><span style="color:#9ECBFF;"> </span><span style="color:#E1E4E8;">ratio</span><span style="color:#9ECBFF;">}px\`</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      canvasHeight </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">\`\${</span><span style="color:#9ECBFF;">(</span><span style="color:#E1E4E8;">gapY</span><span style="color:#9ECBFF;"> </span><span style="color:#F97583;">+</span><span style="color:#9ECBFF;"> </span><span style="color:#E1E4E8;">height</span><span style="color:#9ECBFF;">) </span><span style="color:#F97583;">*</span><span style="color:#9ECBFF;"> </span><span style="color:#E1E4E8;">ratio</span><span style="color:#9ECBFF;">}px\`</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 设置canvas宽高</span></span>
<span class="line"><span style="color:#E1E4E8;">    canvas.</span><span style="color:#B392F0;">setAttribute</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;width&quot;</span><span style="color:#E1E4E8;">, canvasWidth);</span></span>
<span class="line"><span style="color:#E1E4E8;">    canvas.</span><span style="color:#B392F0;">setAttribute</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;height&quot;</span><span style="color:#E1E4E8;">, canvasHeight);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    const opts </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">...</span><span style="color:#E1E4E8;">options,</span></span>
<span class="line"><span style="color:#E1E4E8;">      ratio,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 获取蒙层宽</span></span>
<span class="line"><span style="color:#E1E4E8;">      markWidth: width </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> ratio,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 获取蒙层高</span></span>
<span class="line"><span style="color:#E1E4E8;">      markHeight: height </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> ratio,</span></span>
<span class="line"><span style="color:#E1E4E8;">    };</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 如果image存在则优先绘制图片水印</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">if</span><span style="color:#E1E4E8;"> (image) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">drawImage</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">ctx</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">opts</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    } else </span><span style="color:#B392F0;">if</span><span style="color:#E1E4E8;"> (content) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 如果文字内容存在则绘制文字水印</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">drawText</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">ctx</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">opts</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  /** ========================================================== */</span></span>
<span class="line"><span style="color:#E1E4E8;">  const image =</span></span>
<span class="line"><span style="color:#E1E4E8;">    &quot;https://img11.360buyimg.com/imagetools/jfs/t1/57345/6/20069/8019/62b995cdEd96fef03/51d3302dfeccd1d2.png&quot;;</span></span>
<span class="line"><span style="color:#E1E4E8;">  // 图片水印</span></span>
<span class="line"><span style="color:#E1E4E8;">  watermark({ image });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  //   // 文字水印</span></span>
<span class="line"><span style="color:#E1E4E8;">  //   watermark({</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">//     content: &quot;你是一头猪&quot;,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">//     fullPage: true,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">//   });</span></span>
<span class="line"><span style="color:#F97583;">&lt;/</span><span style="color:#E1E4E8;">script</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">style</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  html,</span></span>
<span class="line"><span style="color:#E1E4E8;">  body {</span></span>
<span class="line"><span style="color:#E1E4E8;">    position: relative;</span></span>
<span class="line"><span style="color:#E1E4E8;">    height: </span><span style="color:#79B8FF;">100</span><span style="color:#F97583;">%</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    width: </span><span style="color:#79B8FF;">100</span><span style="color:#F97583;">%</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    overflow: hidden;</span></span>
<span class="line"><span style="color:#E1E4E8;">    display: grid;</span></span>
<span class="line"><span style="color:#E1E4E8;">    place</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">items: center;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  .box {</span></span>
<span class="line"><span style="color:#E1E4E8;">    width: 400px;</span></span>
<span class="line"><span style="color:#E1E4E8;">    height: 400px;</span></span>
<span class="line"><span style="color:#E1E4E8;">    border: 1px solid #d2d2d2;</span></span>
<span class="line"><span style="color:#E1E4E8;">    border</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">radius: 4px;</span></span>
<span class="line"><span style="color:#E1E4E8;">    position: relative;</span></span>
<span class="line"><span style="color:#E1E4E8;">    display: grid;</span></span>
<span class="line"><span style="color:#E1E4E8;">    place</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">items: center;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  .watermark {</span></span>
<span class="line"><span style="color:#E1E4E8;">    position: absolute;</span></span>
<span class="line"><span style="color:#E1E4E8;">    top: </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    left: </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    bottom: </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    right: </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;">     * 设置元素永远不会成为鼠标事件target。注意:由于水印层级较高,</span></span>
<span class="line"><span style="color:#6A737D;">     * 避免层级过低的元素无法被点击。</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    pointer</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">events: none;</span></span>
<span class="line"><span style="color:#E1E4E8;">    background</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">repeat: repeat;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  .watermark-full-page {</span></span>
<span class="line"><span style="color:#E1E4E8;">    position: fixed;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">style</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">&lt;!</span><span style="color:#005CC5;">DOCTYPE</span><span style="color:#24292E;"> html</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">html</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">lang</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;en&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">head</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">meta</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">charset</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;UTF-8&quot;</span><span style="color:#24292E;"> /&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">meta</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">http-equiv</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;X-UA-Compatible&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">content</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;IE=edge&quot;</span><span style="color:#24292E;"> /&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">meta</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">name</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;viewport&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">content</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;width=device-width, initial-scale=1.0&quot;</span><span style="color:#24292E;"> /&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">title</span><span style="color:#24292E;">&gt;Document&lt;/</span><span style="color:#22863A;">title</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;/</span><span style="color:#22863A;">head</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">body</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;box&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;</span><span style="color:#22863A;">span</span><span style="color:#24292E;">&gt;这是一段文字&lt;/</span><span style="color:#22863A;">span</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;watermark&quot;</span><span style="color:#24292E;">&gt;&lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;/</span><span style="color:#22863A;">body</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">html</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  function watermark(options) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">if</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">typeof</span><span style="color:#24292E;"> options </span><span style="color:#D73A49;">!==</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;object&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&amp;&amp;</span></span>
<span class="line"><span style="color:#24292E;">      options </span><span style="color:#D73A49;">!==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&amp;&amp;</span></span>
<span class="line"><span style="color:#24292E;">      options </span><span style="color:#D73A49;">!==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">undefined</span></span>
<span class="line"><span style="color:#24292E;">    ) {</span></span>
<span class="line"><span style="color:#24292E;">      throw new </span><span style="color:#6F42C1;">Error</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;options参数错误&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 默认配置项</span></span>
<span class="line"><span style="color:#24292E;">    const defaultOptions </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 水印宽度</span></span>
<span class="line"><span style="color:#24292E;">      width: </span><span style="color:#005CC5;">120</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 水印高度</span></span>
<span class="line"><span style="color:#24292E;">      height: </span><span style="color:#005CC5;">60</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 水印旋转角度</span></span>
<span class="line"><span style="color:#24292E;">      rotate: </span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">30</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 水印图片源</span></span>
<span class="line"><span style="color:#24292E;">      image: </span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 水印图片宽度</span></span>
<span class="line"><span style="color:#24292E;">      imageWidth: </span><span style="color:#005CC5;">120</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 水印图片高度</span></span>
<span class="line"><span style="color:#24292E;">      imageHeight: </span><span style="color:#005CC5;">64</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 水印图片层级</span></span>
<span class="line"><span style="color:#24292E;">      zIndex: </span><span style="color:#005CC5;">2000</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 水平间距</span></span>
<span class="line"><span style="color:#24292E;">      gapX: </span><span style="color:#005CC5;">24</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 垂直间距</span></span>
<span class="line"><span style="color:#24292E;">      gapY: </span><span style="color:#005CC5;">48</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 文字水印内容</span></span>
<span class="line"><span style="color:#24292E;">      content: </span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 文字大小</span></span>
<span class="line"><span style="color:#24292E;">      fontSize: </span><span style="color:#005CC5;">14</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 文字颜色</span></span>
<span class="line"><span style="color:#24292E;">      fontColor: </span><span style="color:#032F62;">&quot;rgba(0,0,0,.15)&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 文字样式</span></span>
<span class="line"><span style="color:#24292E;">      fontStyle: </span><span style="color:#032F62;">&quot;normal&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 文字字体</span></span>
<span class="line"><span style="color:#24292E;">      fontFamily: </span><span style="color:#032F62;">&quot;PingFang SC&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 文字粗细</span></span>
<span class="line"><span style="color:#24292E;">      fontWeight: </span><span style="color:#032F62;">&quot;normal&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 是否全屏水印</span></span>
<span class="line"><span style="color:#24292E;">      fullPage: </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    };</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">drawImage</span><span style="color:#24292E;">(</span><span style="color:#E36209;">ctx</span><span style="color:#24292E;">, </span><span style="color:#E36209;">options</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> { </span><span style="color:#005CC5;">imageWidth</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">imageHeight</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">ratio</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">markWidth</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">markHeight</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">rotate</span><span style="color:#24292E;"> } </span><span style="color:#D73A49;">=</span></span>
<span class="line"><span style="color:#24292E;">        options;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 创建一个图片对象</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">img</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Image</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">       * 请求图片时是否开启CORS功能。anonymous表示在请求头上携带Origin属性,</span></span>
<span class="line"><span style="color:#6A737D;">       * 但请求不会携带cookie和其他的认证信息。</span></span>
<span class="line"><span style="color:#6A737D;">       */</span></span>
<span class="line"><span style="color:#24292E;">      img.crossOrigin </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;anonymous&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">       * 该属性表示获取资源时的引用方式。&quot;no-referrer&quot;表示HTTP头部信息将不会发送referrer</span></span>
<span class="line"><span style="color:#6A737D;">       */</span></span>
<span class="line"><span style="color:#24292E;">      img.referrerPolicy </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;no-referrer&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 设置图片源</span></span>
<span class="line"><span style="color:#24292E;">      img.src </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> image;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">       * 监听图片加载完成事件,图片加载完成则通过</span></span>
<span class="line"><span style="color:#6A737D;">       * canvas绘制图片水印</span></span>
<span class="line"><span style="color:#6A737D;">       */</span></span>
<span class="line"><span style="color:#24292E;">      img.</span><span style="color:#6F42C1;">onload</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;">         * translate(x,y):将canvas按x点的水平方向、y点垂直方向进行平移变换</span></span>
<span class="line"><span style="color:#6A737D;">         */</span></span>
<span class="line"><span style="color:#24292E;">        ctx.</span><span style="color:#6F42C1;">translate</span><span style="color:#24292E;">(markWidth </span><span style="color:#D73A49;">/</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">, markHeight </span><span style="color:#D73A49;">/</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">         * rotate(angle):用于旋转canvas,angle表示旋转的幅度,正数表示顺时针旋转,</span></span>
<span class="line"><span style="color:#6A737D;">         * 负数表示逆时针旋转,旋转公式为:degree * Math.PI / 180。旋转中心点默认是</span></span>
<span class="line"><span style="color:#6A737D;">         * canvas 的起始点,可以通过translate()方法平移改变旋转中心点。</span></span>
<span class="line"><span style="color:#6A737D;">         * translate(markWidth / 2, markHeight / 2)表示以canvas的中心点作为</span></span>
<span class="line"><span style="color:#6A737D;">         * 旋转中心。</span></span>
<span class="line"><span style="color:#6A737D;">         */</span></span>
<span class="line"><span style="color:#24292E;">        ctx.</span><span style="color:#6F42C1;">rotate</span><span style="color:#24292E;">((Math.</span><span style="color:#005CC5;">PI</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">/</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">180</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">*</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Number</span><span style="color:#24292E;">(rotate));</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">         * drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)</span></span>
<span class="line"><span style="color:#6A737D;">         * 用于绘制图像,包含如下参数:</span></span>
<span class="line"><span style="color:#6A737D;">         * - image:绘制到canvaS上下文的元素。元素可以是图片、svg、video、canvas。</span></span>
<span class="line"><span style="color:#6A737D;">         * - sx:需要绘制到目标上下文中的,image的矩形(裁剪)选择框的左上角 X 轴坐标。</span></span>
<span class="line"><span style="color:#6A737D;">         * - sy:需要绘制到目标上下文中的,image的矩形(裁剪)选择框的左上角 Y 轴坐标。</span></span>
<span class="line"><span style="color:#6A737D;">         * - sWidth:需要绘制到目标上下文中的,image 的矩形（裁剪）选择框的宽度。</span></span>
<span class="line"><span style="color:#6A737D;">         * - sHeight:需要绘制到目标上下文中的,image 的矩形（裁剪）选择框的高度。</span></span>
<span class="line"><span style="color:#6A737D;">         * - dx:image 的左上角在目标画布上 X 轴坐标。</span></span>
<span class="line"><span style="color:#6A737D;">         * - dy:image 的左上角在目标画布上 Y 轴坐标。</span></span>
<span class="line"><span style="color:#6A737D;">         * - dWidth:image 在目标画布上绘制的宽度。</span></span>
<span class="line"><span style="color:#6A737D;">         * - dHeight:image 在目标画布上绘制的高度。</span></span>
<span class="line"><span style="color:#6A737D;">         */</span></span>
<span class="line"><span style="color:#24292E;">        ctx.</span><span style="color:#6F42C1;">drawImage</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">          img,</span></span>
<span class="line"><span style="color:#24292E;">          (</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">imageWidth </span><span style="color:#D73A49;">*</span><span style="color:#24292E;"> ratio) </span><span style="color:#D73A49;">/</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">          (</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">imageHeight </span><span style="color:#D73A49;">*</span><span style="color:#24292E;"> ratio) </span><span style="color:#D73A49;">/</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">          imageWidth </span><span style="color:#D73A49;">*</span><span style="color:#24292E;"> ratio,</span></span>
<span class="line"><span style="color:#24292E;">          imageHeight </span><span style="color:#D73A49;">*</span><span style="color:#24292E;"> ratio</span></span>
<span class="line"><span style="color:#24292E;">        );</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 将canvas恢复到最近一次的保存状态</span></span>
<span class="line"><span style="color:#24292E;">        ctx.</span><span style="color:#6F42C1;">restore</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">base64Url</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> canvas.</span><span style="color:#6F42C1;">toDataURL</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">setStyle</span><span style="color:#24292E;">(base64Url, options);</span></span>
<span class="line"><span style="color:#24292E;">      };</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">drawText</span><span style="color:#24292E;">(</span><span style="color:#E36209;">ctx</span><span style="color:#24292E;">, </span><span style="color:#E36209;">options</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">fontSize</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">fontColor</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">fontStyle</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">fontWeight</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">fontFamily</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">markWidth</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">markHeight</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">rotate</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      } </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> options;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">markSize</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Number</span><span style="color:#24292E;">(fontSize) </span><span style="color:#D73A49;">*</span><span style="color:#24292E;"> ratio;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 设置文本基线,middle表示文本基线在文本块的中间</span></span>
<span class="line"><span style="color:#24292E;">      ctx.textBaseline </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;middle&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 文字对齐方式,center表示居中对齐</span></span>
<span class="line"><span style="color:#24292E;">      ctx.textAlign </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;center&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 填充样式</span></span>
<span class="line"><span style="color:#24292E;">      ctx.fillStyle </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> fontColor;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 设置字体</span></span>
<span class="line"><span style="color:#24292E;">      ctx.font </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">\`\${</span><span style="color:#24292E;">fontStyle</span><span style="color:#032F62;">} normal \${</span><span style="color:#24292E;">fontWeight</span><span style="color:#032F62;">} \${</span><span style="color:#24292E;">markSize</span><span style="color:#032F62;">}px/\${</span><span style="color:#24292E;">markHeight</span><span style="color:#032F62;">}px \${</span><span style="color:#24292E;">fontFamily</span><span style="color:#032F62;">}\`</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 文字绕中间旋转</span></span>
<span class="line"><span style="color:#24292E;">      ctx.</span><span style="color:#6F42C1;">translate</span><span style="color:#24292E;">(markWidth </span><span style="color:#D73A49;">/</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">, markHeight </span><span style="color:#D73A49;">/</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">      ctx.</span><span style="color:#6F42C1;">rotate</span><span style="color:#24292E;">((Math.</span><span style="color:#005CC5;">PI</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">/</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">180</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">*</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Number</span><span style="color:#24292E;">(rotate));</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">       * fillText(text, x, y, [maxWidth]):填充文字。</span></span>
<span class="line"><span style="color:#6A737D;">       * - text:渲染的文本内容。</span></span>
<span class="line"><span style="color:#6A737D;">       * - x:渲染文本的x轴坐标。</span></span>
<span class="line"><span style="color:#6A737D;">       * - y:渲染文本的y轴坐标。</span></span>
<span class="line"><span style="color:#6A737D;">       * - maxWidth:绘制的最大宽度,可选。如果指定了值,并且经过计算字符串的</span></span>
<span class="line"><span style="color:#6A737D;">       * 值比最大宽度还要宽,字体为了适应会水平缩放或者使用小号的字体。</span></span>
<span class="line"><span style="color:#6A737D;">       */</span></span>
<span class="line"><span style="color:#24292E;">      ctx.</span><span style="color:#6F42C1;">fillText</span><span style="color:#24292E;">(content, </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 将canvas恢复到最近一次的保存状态</span></span>
<span class="line"><span style="color:#24292E;">      ctx.</span><span style="color:#6F42C1;">restore</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">       * toDataURL(type, encoderOptions)用于返回一个包含图片展示的 data URI。</span></span>
<span class="line"><span style="color:#6A737D;">       * data URI即利用base64编码把图片数据翻译成标准ASCII字符,简单来说toDataURL()</span></span>
<span class="line"><span style="color:#6A737D;">       * 将canvas绘制的图片转为base64编码。toDataURL参数如下:</span></span>
<span class="line"><span style="color:#6A737D;">       * - type:转换的图片格式。默认为image/png。</span></span>
<span class="line"><span style="color:#6A737D;">       * - encoderOptions:转换后图片质量。如果图片格式为 image/jpeg 或 image/webp</span></span>
<span class="line"><span style="color:#6A737D;">       * 的情况下,可以从 0 到 1 的区间内选择图片的质量。如果超出取值范围,将会使用</span></span>
<span class="line"><span style="color:#6A737D;">       * 默认值 0.92,其他参数会被忽略。</span></span>
<span class="line"><span style="color:#6A737D;">       */</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">base64Url</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> canvas.</span><span style="color:#6F42C1;">toDataURL</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">setStyle</span><span style="color:#24292E;">(base64Url, options);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">     * 根据canvas绘制图片的base64编码和配置对象设置样式。</span></span>
<span class="line"><span style="color:#6A737D;">     * 通过CSS background-image 引入绘制图片base64编码实现水印,</span></span>
<span class="line"><span style="color:#6A737D;">     * 由于background-repeat属性的默认为repeat,水印会沿着水平轴和垂直轴</span></span>
<span class="line"><span style="color:#6A737D;">     * 重复;通过background-size属性设置 gapX(水平间距) + width(水印宽度)</span></span>
<span class="line"><span style="color:#6A737D;">     * 实现水印之间的间距。</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">{*}</span><span style="color:#6A737D;"> </span><span style="color:#24292E;">base64Url</span><span style="color:#6A737D;"> canvas绘制图片的base64编码</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">{*}</span><span style="color:#6A737D;"> </span><span style="color:#24292E;">options</span><span style="color:#6A737D;"> 配置对象</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">setStyle</span><span style="color:#24292E;">(</span><span style="color:#E36209;">base64Url</span><span style="color:#24292E;">, </span><span style="color:#E36209;">options</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">el</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> document.</span><span style="color:#6F42C1;">getElementsByClassName</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;watermark&quot;</span><span style="color:#24292E;">)[</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">];</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">!</span><span style="color:#24292E;">el) </span><span style="color:#D73A49;">return</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> { </span><span style="color:#005CC5;">zIndex</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">gapX</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">width</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">fullPage</span><span style="color:#24292E;"> } </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> options;</span></span>
<span class="line"><span style="color:#24292E;">      el.style.zIndex </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> zIndex;</span></span>
<span class="line"><span style="color:#24292E;">      el.style.backgroundSize </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">\`\${</span><span style="color:#24292E;">gapX</span><span style="color:#032F62;"> </span><span style="color:#D73A49;">+</span><span style="color:#032F62;"> </span><span style="color:#24292E;">width</span><span style="color:#032F62;">}px\`</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">      el.style.backgroundImage </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">\`url(\${</span><span style="color:#24292E;">base64Url</span><span style="color:#032F62;">})\`</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">       * 判断是否全屏显示水印,如果全屏显示水印则添加watermark-full-page类样式,</span></span>
<span class="line"><span style="color:#6A737D;">       * 注意非全屏显示水印需要将父元素为相对布局,即 position: relative。</span></span>
<span class="line"><span style="color:#6A737D;">       */</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (fullPage) {</span></span>
<span class="line"><span style="color:#24292E;">        el.classList.</span><span style="color:#6F42C1;">add</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;watermark-full-page&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 创建一个canvas元素</span></span>
<span class="line"><span style="color:#24292E;">    const canvas </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> document.</span><span style="color:#6F42C1;">createElement</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;canvas&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">     * 根据canvas获取上下文对象,HTML Canvas API仅支持2d,</span></span>
<span class="line"><span style="color:#6A737D;">     * 若要渲染3d效果请使用Webgl(Three.js是目前最为流行的webgl库)</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    const ctx </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> canvas.</span><span style="color:#6F42C1;">getContext</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;2d&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">!</span><span style="color:#24292E;">ctx) {</span></span>
<span class="line"><span style="color:#24292E;">      throw new </span><span style="color:#6F42C1;">Error</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;当前环境不支持canvas&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    options </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> Object.</span><span style="color:#6F42C1;">assign</span><span style="color:#24292E;">(defaultOptions, options);</span></span>
<span class="line"><span style="color:#24292E;">    const { width, height, gapX, gapY, image, content } </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> options;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;">     * 返回当前显示设备的物理像素分辨率与CSS像素分辨率之比,由于canvas</span></span>
<span class="line"><span style="color:#6A737D;">     * 缩小放大会导致绘制内容模糊,使用window.devicePixelRatio确定应添加</span></span>
<span class="line"><span style="color:#6A737D;">     * 多少额外的像素密度以使图像更清晰。</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    const ratio </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> window.devicePixelRatio </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 获取canvas的宽高,即: (水平或垂直间距 + 宽或高) * 像素比</span></span>
<span class="line"><span style="color:#24292E;">    const canvasWidth </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">\`\${</span><span style="color:#032F62;">(</span><span style="color:#24292E;">gapX</span><span style="color:#032F62;"> </span><span style="color:#D73A49;">+</span><span style="color:#032F62;"> </span><span style="color:#24292E;">width</span><span style="color:#032F62;">) </span><span style="color:#D73A49;">*</span><span style="color:#032F62;"> </span><span style="color:#24292E;">ratio</span><span style="color:#032F62;">}px\`</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      canvasHeight </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">\`\${</span><span style="color:#032F62;">(</span><span style="color:#24292E;">gapY</span><span style="color:#032F62;"> </span><span style="color:#D73A49;">+</span><span style="color:#032F62;"> </span><span style="color:#24292E;">height</span><span style="color:#032F62;">) </span><span style="color:#D73A49;">*</span><span style="color:#032F62;"> </span><span style="color:#24292E;">ratio</span><span style="color:#032F62;">}px\`</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 设置canvas宽高</span></span>
<span class="line"><span style="color:#24292E;">    canvas.</span><span style="color:#6F42C1;">setAttribute</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;width&quot;</span><span style="color:#24292E;">, canvasWidth);</span></span>
<span class="line"><span style="color:#24292E;">    canvas.</span><span style="color:#6F42C1;">setAttribute</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;height&quot;</span><span style="color:#24292E;">, canvasHeight);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    const opts </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">...</span><span style="color:#24292E;">options,</span></span>
<span class="line"><span style="color:#24292E;">      ratio,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 获取蒙层宽</span></span>
<span class="line"><span style="color:#24292E;">      markWidth: width </span><span style="color:#D73A49;">*</span><span style="color:#24292E;"> ratio,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 获取蒙层高</span></span>
<span class="line"><span style="color:#24292E;">      markHeight: height </span><span style="color:#D73A49;">*</span><span style="color:#24292E;"> ratio,</span></span>
<span class="line"><span style="color:#24292E;">    };</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 如果image存在则优先绘制图片水印</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">if</span><span style="color:#24292E;"> (image) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">drawImage</span><span style="color:#24292E;">(</span><span style="color:#E36209;">ctx</span><span style="color:#24292E;">, </span><span style="color:#E36209;">opts</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    } else </span><span style="color:#6F42C1;">if</span><span style="color:#24292E;"> (content) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 如果文字内容存在则绘制文字水印</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">drawText</span><span style="color:#24292E;">(</span><span style="color:#E36209;">ctx</span><span style="color:#24292E;">, </span><span style="color:#E36209;">opts</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  /** ========================================================== */</span></span>
<span class="line"><span style="color:#24292E;">  const image =</span></span>
<span class="line"><span style="color:#24292E;">    &quot;https://img11.360buyimg.com/imagetools/jfs/t1/57345/6/20069/8019/62b995cdEd96fef03/51d3302dfeccd1d2.png&quot;;</span></span>
<span class="line"><span style="color:#24292E;">  // 图片水印</span></span>
<span class="line"><span style="color:#24292E;">  watermark({ image });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  //   // 文字水印</span></span>
<span class="line"><span style="color:#24292E;">  //   watermark({</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">//     content: &quot;你是一头猪&quot;,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">//     fullPage: true,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">//   });</span></span>
<span class="line"><span style="color:#D73A49;">&lt;/</span><span style="color:#24292E;">script</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">style</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  html,</span></span>
<span class="line"><span style="color:#24292E;">  body {</span></span>
<span class="line"><span style="color:#24292E;">    position: relative;</span></span>
<span class="line"><span style="color:#24292E;">    height: </span><span style="color:#005CC5;">100</span><span style="color:#D73A49;">%</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    width: </span><span style="color:#005CC5;">100</span><span style="color:#D73A49;">%</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    overflow: hidden;</span></span>
<span class="line"><span style="color:#24292E;">    display: grid;</span></span>
<span class="line"><span style="color:#24292E;">    place</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">items: center;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  .box {</span></span>
<span class="line"><span style="color:#24292E;">    width: 400px;</span></span>
<span class="line"><span style="color:#24292E;">    height: 400px;</span></span>
<span class="line"><span style="color:#24292E;">    border: 1px solid #d2d2d2;</span></span>
<span class="line"><span style="color:#24292E;">    border</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">radius: 4px;</span></span>
<span class="line"><span style="color:#24292E;">    position: relative;</span></span>
<span class="line"><span style="color:#24292E;">    display: grid;</span></span>
<span class="line"><span style="color:#24292E;">    place</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">items: center;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  .watermark {</span></span>
<span class="line"><span style="color:#24292E;">    position: absolute;</span></span>
<span class="line"><span style="color:#24292E;">    top: </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    left: </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    bottom: </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    right: </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;">     * 设置元素永远不会成为鼠标事件target。注意:由于水印层级较高,</span></span>
<span class="line"><span style="color:#6A737D;">     * 避免层级过低的元素无法被点击。</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    pointer</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">events: none;</span></span>
<span class="line"><span style="color:#24292E;">    background</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">repeat: repeat;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  .watermark-full-page {</span></span>
<span class="line"><span style="color:#24292E;">    position: fixed;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">style</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><p><img src="`+p+'" alt="图片水印"><img src="'+o+`" alt="文字水印"></p><h2 id="_3-基于-svg-绘制水印" tabindex="-1">3.基于 SVG 绘制水印 <a class="header-anchor" href="#_3-基于-svg-绘制水印" aria-label="Permalink to &quot;3.基于 SVG 绘制水印&quot;">​</a></h2><h2 id="_4-通过-mutationobserver-观察元素防止水印被篡改" tabindex="-1">4.通过 MutationObserver 观察元素防止水印被篡改 <a class="header-anchor" href="#_4-通过-mutationobserver-观察元素防止水印被篡改" aria-label="Permalink to &quot;4.通过 MutationObserver 观察元素防止水印被篡改&quot;">​</a></h2><h2 id="_5-封装-watermark-组件" tabindex="-1">5.封装 Watermark 组件 <a class="header-anchor" href="#_5-封装-watermark-组件" aria-label="Permalink to &quot;5.封装 Watermark 组件&quot;">​</a></h2><h3 id="_5-1-基于-react-封装-watermark-组件" tabindex="-1">5.1 基于 React 封装 Watermark 组件 <a class="header-anchor" href="#_5-1-基于-react-封装-watermark-组件" aria-label="Permalink to &quot;5.1 基于 React 封装 Watermark 组件&quot;">​</a></h3><div class="language-tsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">tsx</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> React, { CSSProperties, useMemo, useState, useEffect } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;react&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">interface</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">WatermarkProps</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 水印宽度,默认:120</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">width</span><span style="color:#F97583;">?:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">number</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 水印高度,默认:60</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">height</span><span style="color:#F97583;">?:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">number</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 绘制水印时旋转的角度,默认:-22</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">rotate</span><span style="color:#F97583;">?:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">number</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 图片源,优先使用图片渲染水印</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">image</span><span style="color:#F97583;">?:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">string</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 图片宽度,默认:120</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">imageWidth</span><span style="color:#F97583;">?:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">number</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 图片高度,默认:64</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">imageHeight</span><span style="color:#F97583;">?:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">number</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 水印元素的z-index,默认:2000</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">zIndex</span><span style="color:#F97583;">?:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">number</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 水印文字内容</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">content</span><span style="color:#F97583;">?:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">string</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 水印文字大小</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">fontSize</span><span style="color:#F97583;">?:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">number</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">string</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 水印文字颜色</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">fontColor</span><span style="color:#F97583;">?:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">string</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 水印文字系列,默认:&#39;PingFang SC&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">fontFamily</span><span style="color:#F97583;">?:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">string</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 水印文字样式,默认:&#39;normal&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">fontStyle</span><span style="color:#F97583;">?:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">string</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 水印文字粗细,默认:&#39;normal&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">fontWeight</span><span style="color:#F97583;">?:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">string</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 水印之间的水平间距,默认24</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">gapX</span><span style="color:#F97583;">?:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">number</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 水印之间的垂直间距,默认:48</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">gapY</span><span style="color:#F97583;">?:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">number</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 是否覆盖整个页面,默认false</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">fullPage</span><span style="color:#F97583;">?:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">boolean</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// class名称</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">className</span><span style="color:#F97583;">?:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">string</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 样式</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">style</span><span style="color:#F97583;">?:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">React</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">CSSProperties</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 子节点</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">children</span><span style="color:#F97583;">?:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">React</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">ReactNode</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Watermark</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">width</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">120</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">height</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">60</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">rotate</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">22</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">image</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">imageWidth</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">120</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">imageHeight</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">64</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">zIndex</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2000</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">content</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">fontSize</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">14</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">fontColor</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;rgba(0,0,0,.15)&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">fontStyle</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;normal&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">fontFamily</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;PingFang SC&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">fontWeight</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;normal&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">gapX</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">24</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">gapY</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">48</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">fullPage</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">style</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">className</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">WatermarkProps</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> [</span><span style="color:#79B8FF;">base64Url</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">setBase64Url</span><span style="color:#E1E4E8;">] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">useState</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">init</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">canvas</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> document.</span><span style="color:#B392F0;">createElement</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;canvas&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">ctx</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> canvas.</span><span style="color:#B392F0;">getContext</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;2d&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">ctx) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">throw</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Error</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;当前环境不支持canvas&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">ratio</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> window.devicePixelRatio </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">canvasWidth</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">\`\${</span><span style="color:#9ECBFF;">(</span><span style="color:#E1E4E8;">gapX</span><span style="color:#9ECBFF;"> </span><span style="color:#F97583;">+</span><span style="color:#9ECBFF;"> </span><span style="color:#E1E4E8;">width</span><span style="color:#9ECBFF;">) </span><span style="color:#F97583;">*</span><span style="color:#9ECBFF;"> </span><span style="color:#E1E4E8;">ratio</span><span style="color:#9ECBFF;">}px\`</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">canvasHeight</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">\`\${</span><span style="color:#9ECBFF;">(</span><span style="color:#E1E4E8;">gapY</span><span style="color:#9ECBFF;"> </span><span style="color:#F97583;">+</span><span style="color:#9ECBFF;"> </span><span style="color:#E1E4E8;">height</span><span style="color:#9ECBFF;">) </span><span style="color:#F97583;">*</span><span style="color:#9ECBFF;"> </span><span style="color:#E1E4E8;">ratio</span><span style="color:#9ECBFF;">}px\`</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">markWidth</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> width </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> ratio,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">markHeight</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> height </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> ratio;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    canvas.</span><span style="color:#B392F0;">setAttribute</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;width&quot;</span><span style="color:#E1E4E8;">, canvasWidth);</span></span>
<span class="line"><span style="color:#E1E4E8;">    canvas.</span><span style="color:#B392F0;">setAttribute</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;height&quot;</span><span style="color:#E1E4E8;">, canvasHeight);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (image) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      ctx.</span><span style="color:#B392F0;">translate</span><span style="color:#E1E4E8;">(markWidth </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">, markHeight </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">      ctx.</span><span style="color:#B392F0;">rotate</span><span style="color:#E1E4E8;">((Math.</span><span style="color:#79B8FF;">PI</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">180</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Number</span><span style="color:#E1E4E8;">(rotate));</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">img</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Image</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">      img.crossOrigin </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;anonymous&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">      img.referrerPolicy </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;no-referrer&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">      img.src </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> image;</span></span>
<span class="line"><span style="color:#E1E4E8;">      console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;image&quot;</span><span style="color:#E1E4E8;">, image);</span></span>
<span class="line"><span style="color:#E1E4E8;">      img.</span><span style="color:#B392F0;">onload</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        ctx.</span><span style="color:#B392F0;">drawImage</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">          img,</span></span>
<span class="line"><span style="color:#E1E4E8;">          (</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">imageWidth </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> ratio) </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          (</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">imageHeight </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> ratio) </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          imageWidth </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> ratio,</span></span>
<span class="line"><span style="color:#E1E4E8;">          imageHeight </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> ratio</span></span>
<span class="line"><span style="color:#E1E4E8;">        );</span></span>
<span class="line"><span style="color:#E1E4E8;">        ctx.</span><span style="color:#B392F0;">restore</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;canvas.toDataURL()&quot;</span><span style="color:#E1E4E8;">, canvas.</span><span style="color:#B392F0;">toDataURL</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">setBase64Url</span><span style="color:#E1E4E8;">(canvas.</span><span style="color:#B392F0;">toDataURL</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">      };</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (content) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      ctx.textBaseline </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;middle&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">      ctx.textAlign </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;center&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">      ctx.</span><span style="color:#B392F0;">translate</span><span style="color:#E1E4E8;">(markWidth </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">, markHeight </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">      ctx.</span><span style="color:#B392F0;">rotate</span><span style="color:#E1E4E8;">((Math.</span><span style="color:#79B8FF;">PI</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">180</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Number</span><span style="color:#E1E4E8;">(rotate));</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">markSize</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Number</span><span style="color:#E1E4E8;">(fontSize) </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> ratio;</span></span>
<span class="line"><span style="color:#E1E4E8;">      ctx.font </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">\`\${</span><span style="color:#E1E4E8;">fontStyle</span><span style="color:#9ECBFF;">} normal \${</span><span style="color:#E1E4E8;">fontWeight</span><span style="color:#9ECBFF;">} \${</span><span style="color:#E1E4E8;">markSize</span><span style="color:#9ECBFF;">}px/\${</span><span style="color:#E1E4E8;">markHeight</span><span style="color:#9ECBFF;">}px \${</span><span style="color:#E1E4E8;">fontFamily</span><span style="color:#9ECBFF;">}\`</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">      ctx.fillStyle </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> fontColor;</span></span>
<span class="line"><span style="color:#E1E4E8;">      ctx.</span><span style="color:#B392F0;">fillText</span><span style="color:#E1E4E8;">(content, </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">      ctx.</span><span style="color:#B392F0;">restore</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">setBase64Url</span><span style="color:#E1E4E8;">(canvas.</span><span style="color:#B392F0;">toDataURL</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  };</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">useEffect</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">init</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">  }, [</span></span>
<span class="line"><span style="color:#E1E4E8;">    gapX,</span></span>
<span class="line"><span style="color:#E1E4E8;">    gapY,</span></span>
<span class="line"><span style="color:#E1E4E8;">    width,</span></span>
<span class="line"><span style="color:#E1E4E8;">    height,</span></span>
<span class="line"><span style="color:#E1E4E8;">    rotate,</span></span>
<span class="line"><span style="color:#E1E4E8;">    image,</span></span>
<span class="line"><span style="color:#E1E4E8;">    imageWidth,</span></span>
<span class="line"><span style="color:#E1E4E8;">    imageHeight,</span></span>
<span class="line"><span style="color:#E1E4E8;">    content,</span></span>
<span class="line"><span style="color:#E1E4E8;">    fontStyle,</span></span>
<span class="line"><span style="color:#E1E4E8;">    fontWeight,</span></span>
<span class="line"><span style="color:#E1E4E8;">    fontColor,</span></span>
<span class="line"><span style="color:#E1E4E8;">    fontSize,</span></span>
<span class="line"><span style="color:#E1E4E8;">    fontFamily,</span></span>
<span class="line"><span style="color:#E1E4E8;">    fullPage,</span></span>
<span class="line"><span style="color:#E1E4E8;">  ]);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">getStyle</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">useMemo</span><span style="color:#E1E4E8;">(()</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">CSSProperties</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">styleProp</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">CSSProperties</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      position: fullPage </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;fixed&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;absolute&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      left: </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      right: </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      top: </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      bottom: </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      pointerEvents: </span><span style="color:#9ECBFF;">&quot;none&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      backgroundRepeat: </span><span style="color:#9ECBFF;">&quot;repeat&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      zIndex,</span></span>
<span class="line"><span style="color:#E1E4E8;">      backgroundSize: </span><span style="color:#9ECBFF;">\`\${</span><span style="color:#E1E4E8;">gapX</span><span style="color:#9ECBFF;"> </span><span style="color:#F97583;">+</span><span style="color:#9ECBFF;"> </span><span style="color:#E1E4E8;">width</span><span style="color:#9ECBFF;">}px\`</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      backgroundImage: </span><span style="color:#9ECBFF;">\`url(\${</span><span style="color:#E1E4E8;">base64Url</span><span style="color:#9ECBFF;">})\`</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">...</span><span style="color:#E1E4E8;">style,</span></span>
<span class="line"><span style="color:#E1E4E8;">    };</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> styleProp;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }, [gapX, width, base64Url, zIndex, fullPage]);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">style</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{getStyle} </span><span style="color:#B392F0;">className</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{className}&gt;&lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">Watermark.displayName </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;Watermark&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> Watermark;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> React, { CSSProperties, useMemo, useState, useEffect } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;react&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">interface</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">WatermarkProps</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 水印宽度,默认:120</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">width</span><span style="color:#D73A49;">?:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">number</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 水印高度,默认:60</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">height</span><span style="color:#D73A49;">?:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">number</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 绘制水印时旋转的角度,默认:-22</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">rotate</span><span style="color:#D73A49;">?:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">number</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 图片源,优先使用图片渲染水印</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">image</span><span style="color:#D73A49;">?:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 图片宽度,默认:120</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">imageWidth</span><span style="color:#D73A49;">?:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">number</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 图片高度,默认:64</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">imageHeight</span><span style="color:#D73A49;">?:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">number</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 水印元素的z-index,默认:2000</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">zIndex</span><span style="color:#D73A49;">?:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">number</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 水印文字内容</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">content</span><span style="color:#D73A49;">?:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 水印文字大小</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">fontSize</span><span style="color:#D73A49;">?:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">number</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 水印文字颜色</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">fontColor</span><span style="color:#D73A49;">?:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 水印文字系列,默认:&#39;PingFang SC&#39;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">fontFamily</span><span style="color:#D73A49;">?:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 水印文字样式,默认:&#39;normal&#39;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">fontStyle</span><span style="color:#D73A49;">?:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 水印文字粗细,默认:&#39;normal&#39;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">fontWeight</span><span style="color:#D73A49;">?:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 水印之间的水平间距,默认24</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">gapX</span><span style="color:#D73A49;">?:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">number</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 水印之间的垂直间距,默认:48</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">gapY</span><span style="color:#D73A49;">?:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">number</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 是否覆盖整个页面,默认false</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">fullPage</span><span style="color:#D73A49;">?:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">boolean</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// class名称</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">className</span><span style="color:#D73A49;">?:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 样式</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">style</span><span style="color:#D73A49;">?:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">React</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">CSSProperties</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 子节点</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">children</span><span style="color:#D73A49;">?:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">React</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">ReactNode</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Watermark</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">width</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">120</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">height</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">60</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">rotate</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">22</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">image</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">imageWidth</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">120</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">imageHeight</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">64</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">zIndex</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2000</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">content</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">fontSize</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">14</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">fontColor</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;rgba(0,0,0,.15)&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">fontStyle</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;normal&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">fontFamily</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;PingFang SC&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">fontWeight</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;normal&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">gapX</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">24</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">gapY</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">48</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">fullPage</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">style</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">className</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">}</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">WatermarkProps</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> [</span><span style="color:#005CC5;">base64Url</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">setBase64Url</span><span style="color:#24292E;">] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">useState</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">init</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">canvas</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> document.</span><span style="color:#6F42C1;">createElement</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;canvas&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">ctx</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> canvas.</span><span style="color:#6F42C1;">getContext</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;2d&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">!</span><span style="color:#24292E;">ctx) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">throw</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Error</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;当前环境不支持canvas&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">ratio</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> window.devicePixelRatio </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">canvasWidth</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">\`\${</span><span style="color:#032F62;">(</span><span style="color:#24292E;">gapX</span><span style="color:#032F62;"> </span><span style="color:#D73A49;">+</span><span style="color:#032F62;"> </span><span style="color:#24292E;">width</span><span style="color:#032F62;">) </span><span style="color:#D73A49;">*</span><span style="color:#032F62;"> </span><span style="color:#24292E;">ratio</span><span style="color:#032F62;">}px\`</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#005CC5;">canvasHeight</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">\`\${</span><span style="color:#032F62;">(</span><span style="color:#24292E;">gapY</span><span style="color:#032F62;"> </span><span style="color:#D73A49;">+</span><span style="color:#032F62;"> </span><span style="color:#24292E;">height</span><span style="color:#032F62;">) </span><span style="color:#D73A49;">*</span><span style="color:#032F62;"> </span><span style="color:#24292E;">ratio</span><span style="color:#032F62;">}px\`</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">markWidth</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> width </span><span style="color:#D73A49;">*</span><span style="color:#24292E;"> ratio,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#005CC5;">markHeight</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> height </span><span style="color:#D73A49;">*</span><span style="color:#24292E;"> ratio;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    canvas.</span><span style="color:#6F42C1;">setAttribute</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;width&quot;</span><span style="color:#24292E;">, canvasWidth);</span></span>
<span class="line"><span style="color:#24292E;">    canvas.</span><span style="color:#6F42C1;">setAttribute</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;height&quot;</span><span style="color:#24292E;">, canvasHeight);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (image) {</span></span>
<span class="line"><span style="color:#24292E;">      ctx.</span><span style="color:#6F42C1;">translate</span><span style="color:#24292E;">(markWidth </span><span style="color:#D73A49;">/</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">, markHeight </span><span style="color:#D73A49;">/</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">      ctx.</span><span style="color:#6F42C1;">rotate</span><span style="color:#24292E;">((Math.</span><span style="color:#005CC5;">PI</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">/</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">180</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">*</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Number</span><span style="color:#24292E;">(rotate));</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">img</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Image</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">      img.crossOrigin </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;anonymous&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">      img.referrerPolicy </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;no-referrer&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">      img.src </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> image;</span></span>
<span class="line"><span style="color:#24292E;">      console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;image&quot;</span><span style="color:#24292E;">, image);</span></span>
<span class="line"><span style="color:#24292E;">      img.</span><span style="color:#6F42C1;">onload</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        ctx.</span><span style="color:#6F42C1;">drawImage</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">          img,</span></span>
<span class="line"><span style="color:#24292E;">          (</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">imageWidth </span><span style="color:#D73A49;">*</span><span style="color:#24292E;"> ratio) </span><span style="color:#D73A49;">/</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">          (</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">imageHeight </span><span style="color:#D73A49;">*</span><span style="color:#24292E;"> ratio) </span><span style="color:#D73A49;">/</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">          imageWidth </span><span style="color:#D73A49;">*</span><span style="color:#24292E;"> ratio,</span></span>
<span class="line"><span style="color:#24292E;">          imageHeight </span><span style="color:#D73A49;">*</span><span style="color:#24292E;"> ratio</span></span>
<span class="line"><span style="color:#24292E;">        );</span></span>
<span class="line"><span style="color:#24292E;">        ctx.</span><span style="color:#6F42C1;">restore</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;canvas.toDataURL()&quot;</span><span style="color:#24292E;">, canvas.</span><span style="color:#6F42C1;">toDataURL</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">setBase64Url</span><span style="color:#24292E;">(canvas.</span><span style="color:#6F42C1;">toDataURL</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">      };</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">return</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (content) {</span></span>
<span class="line"><span style="color:#24292E;">      ctx.textBaseline </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;middle&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">      ctx.textAlign </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;center&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">      ctx.</span><span style="color:#6F42C1;">translate</span><span style="color:#24292E;">(markWidth </span><span style="color:#D73A49;">/</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">, markHeight </span><span style="color:#D73A49;">/</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">      ctx.</span><span style="color:#6F42C1;">rotate</span><span style="color:#24292E;">((Math.</span><span style="color:#005CC5;">PI</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">/</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">180</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">*</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Number</span><span style="color:#24292E;">(rotate));</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">markSize</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Number</span><span style="color:#24292E;">(fontSize) </span><span style="color:#D73A49;">*</span><span style="color:#24292E;"> ratio;</span></span>
<span class="line"><span style="color:#24292E;">      ctx.font </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">\`\${</span><span style="color:#24292E;">fontStyle</span><span style="color:#032F62;">} normal \${</span><span style="color:#24292E;">fontWeight</span><span style="color:#032F62;">} \${</span><span style="color:#24292E;">markSize</span><span style="color:#032F62;">}px/\${</span><span style="color:#24292E;">markHeight</span><span style="color:#032F62;">}px \${</span><span style="color:#24292E;">fontFamily</span><span style="color:#032F62;">}\`</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">      ctx.fillStyle </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> fontColor;</span></span>
<span class="line"><span style="color:#24292E;">      ctx.</span><span style="color:#6F42C1;">fillText</span><span style="color:#24292E;">(content, </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">      ctx.</span><span style="color:#6F42C1;">restore</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">setBase64Url</span><span style="color:#24292E;">(canvas.</span><span style="color:#6F42C1;">toDataURL</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  };</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">useEffect</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">init</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">  }, [</span></span>
<span class="line"><span style="color:#24292E;">    gapX,</span></span>
<span class="line"><span style="color:#24292E;">    gapY,</span></span>
<span class="line"><span style="color:#24292E;">    width,</span></span>
<span class="line"><span style="color:#24292E;">    height,</span></span>
<span class="line"><span style="color:#24292E;">    rotate,</span></span>
<span class="line"><span style="color:#24292E;">    image,</span></span>
<span class="line"><span style="color:#24292E;">    imageWidth,</span></span>
<span class="line"><span style="color:#24292E;">    imageHeight,</span></span>
<span class="line"><span style="color:#24292E;">    content,</span></span>
<span class="line"><span style="color:#24292E;">    fontStyle,</span></span>
<span class="line"><span style="color:#24292E;">    fontWeight,</span></span>
<span class="line"><span style="color:#24292E;">    fontColor,</span></span>
<span class="line"><span style="color:#24292E;">    fontSize,</span></span>
<span class="line"><span style="color:#24292E;">    fontFamily,</span></span>
<span class="line"><span style="color:#24292E;">    fullPage,</span></span>
<span class="line"><span style="color:#24292E;">  ]);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">getStyle</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">useMemo</span><span style="color:#24292E;">(()</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">CSSProperties</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">styleProp</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">CSSProperties</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      position: fullPage </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;fixed&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;absolute&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      left: </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      right: </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      top: </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      bottom: </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      pointerEvents: </span><span style="color:#032F62;">&quot;none&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      backgroundRepeat: </span><span style="color:#032F62;">&quot;repeat&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      zIndex,</span></span>
<span class="line"><span style="color:#24292E;">      backgroundSize: </span><span style="color:#032F62;">\`\${</span><span style="color:#24292E;">gapX</span><span style="color:#032F62;"> </span><span style="color:#D73A49;">+</span><span style="color:#032F62;"> </span><span style="color:#24292E;">width</span><span style="color:#032F62;">}px\`</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      backgroundImage: </span><span style="color:#032F62;">\`url(\${</span><span style="color:#24292E;">base64Url</span><span style="color:#032F62;">})\`</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">...</span><span style="color:#24292E;">style,</span></span>
<span class="line"><span style="color:#24292E;">    };</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> styleProp;</span></span>
<span class="line"><span style="color:#24292E;">  }, [gapX, width, base64Url, zIndex, fullPage]);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">style</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{getStyle} </span><span style="color:#6F42C1;">className</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{className}&gt;&lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">Watermark.displayName </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;Watermark&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> Watermark;</span></span></code></pre></div><h3 id="_5-2-基于-vue-封装-watermark-组件" tabindex="-1">5.2 基于 Vue 封装 Watermark 组件 <a class="header-anchor" href="#_5-2-基于-vue-封装-watermark-组件" aria-label="Permalink to &quot;5.2 基于 Vue 封装 Watermark 组件&quot;">​</a></h3>`,16),c=[t];function r(E,y,i,F,A,D){return n(),a("div",null,c)}const d=s(e,[["render",r]]);export{C as __pageData,d as default};
