import{_ as a,o as s,c as e,U as l}from"./chunks/framework.2356d685.js";const y=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"buildTools/vite/optimization.md","filePath":"buildTools/vite/optimization.md","lastUpdated":1689669108000}'),n={name:"buildTools/vite/optimization.md"},t=l(`<h2 id="_1-减少-vite-冷启动时间策略" tabindex="-1">1.减少 Vite 冷启动时间策略 <a class="header-anchor" href="#_1-减少-vite-冷启动时间策略" aria-label="Permalink to &quot;1.减少 Vite 冷启动时间策略&quot;">​</a></h2><p>Vite 是一种现代化的构建工具,它采用了一种名为&quot;快速冷启动(Fast Refresh)&quot;的机制,使得在开发环境中进行代码编辑后,浏览器中的页面能够更快地响应变化。当第一次启动 Vite 时,它会进行一次“冷启动”(Cold Start)。在这个过程中,Vite 需要读取所有的配置文件,从而确定需要构建的项目的结构,并且 Vite 会编译所有的代码并生成构建文件。当 Vite 已经启动并且已经进行过一次冷启动后,后续的启动过程将被认为是“热启动”(Hot Start)。在热启动过程中,Vite 会使用之前生成的缓存文件,以便更快地启动应用程序。减少冷启动的策略如下:</p><ul><li>使用本地缓存。Vite 会缓存已经构建过的代码,因此,在下一次启动应用程序时,Vite 可以使用已经缓存的文件而不需要重新构建所有代码。如果你频繁地启动和关闭应用程序,使用本地缓存可以显著缩短启动时间。</li><li>使用预编译。Vite 提供了预编译选项,可以在构建项目时预先编译某些模块,从而在应用程序启动时节省时间。预编译需要额外的时间来构建项目,但它可以显著缩短冷启动时间。</li><li>避免使用过多的插件。Vite 的插件可以添加额外的功能,但是过多的插件可能会增加构建时间。因此,在使用插件时应该仔细考虑是否真正需要该插件,以及它是否值得增加冷启动时间。</li><li>优化代码结构。Vite 可以通过自动优化代码结构来提高构建性能,但是如果代码本身存在结构问题,则无法发挥这种优化的作用。因此,优化代码结构可以帮助减少冷启动时间。</li><li>启用缓存。在生产环境下,启用缓存可以显著减少应用程序的加载时间,因为浏览器可以缓存已经下载过的资源。因此,启用缓存可以帮助减少应用程序的冷启动时间。</li></ul><h2 id="_2-查看模块依赖分析" tabindex="-1">2.查看模块依赖分析 <a class="header-anchor" href="#_2-查看模块依赖分析" aria-label="Permalink to &quot;2.查看模块依赖分析&quot;">​</a></h2><p>分析依赖模块的大小占比,可以有针对性对某些模块进行体积优化。rollup-plugin-visualizer 是一个模块依赖分析插件,通过该插件可以对模块依赖进行构建分析。</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;"># 安装</span></span>
<span class="line"><span style="color:#FFCB6B;">pnpm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">i</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">rollup-plugin-visualizer</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-D</span></span></code></pre></div><h2 id="_3-分包策略" tabindex="-1">3.分包策略 <a class="header-anchor" href="#_3-分包策略" aria-label="Permalink to &quot;3.分包策略&quot;">​</a></h2><h2 id="_4-treeshaking-摇树机制" tabindex="-1">4.Treeshaking(摇树机制) <a class="header-anchor" href="#_4-treeshaking-摇树机制" aria-label="Permalink to &quot;4.Treeshaking(摇树机制)&quot;">​</a></h2><p>treeshaking 也被称为 “摇树优化”。简单来说,在保证代码运行结果不变的前提下,去除无用的代码,从而减少打包后产物的体积大小。在 Vue3 中,许多 ApI 的引入都支持 treeshaking 优化,未使用的 API 均会被忽略打包至产物中。 Vue3 会默认使用 Rollup 进行 treeshaking,不需要额外进行配置。但是使用 treeshaking 机制时,必须要保证使用 ESModule 模块化方式组织代码,因为 ESModule 使用静态分析,可以检测无使用的死代码。</p><h2 id="_5-开启-gzip-压缩" tabindex="-1">5.开启 gzip 压缩 <a class="header-anchor" href="#_5-开启-gzip-压缩" aria-label="Permalink to &quot;5.开启 gzip 压缩&quot;">​</a></h2><p>gzip 是一种使用非常普遍的压缩格式。使用 gzip 压缩可以大幅减小代码体积,提升网络性能(对于文本内容压缩效率更好)。</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;"># 安装 vite gzip插件</span></span>
<span class="line"><span style="color:#FFCB6B;">pnpm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">i</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">vite-plugin-compression</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-D</span></span></code></pre></div><h2 id="_6-开启-cdn-加速" tabindex="-1">6.开启 CDN 加速 <a class="header-anchor" href="#_6-开启-cdn-加速" aria-label="Permalink to &quot;6.开启 CDN 加速&quot;">​</a></h2><p>内容分发网络(Content Delivery Network,简称 CDN)就是让用户从最近的服务器请求资源,提升网络请求的响应速度。</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;"># 安装Vite CDN加速插件</span></span>
<span class="line"><span style="color:#FFCB6B;">npm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">i</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">vite-plugin-cdn-import</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-D</span></span></code></pre></div><h2 id="_7-图片压缩" tabindex="-1">7.图片压缩 <a class="header-anchor" href="#_7-图片压缩" aria-label="Permalink to &quot;7.图片压缩&quot;">​</a></h2><p>当项目存在大量图片或大图片时,除了使用体积更小的图片格式外(例如 webp),此时还可以使用图片压缩。</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;"># 安装图片压缩插件</span></span>
<span class="line"><span style="color:#FFCB6B;">pnpm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">i</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">vite-plugin-imagemin</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-D</span></span></code></pre></div>`,18),o=[t];function i(p,r,c,h,d,C){return s(),e("div",null,o)}const _=a(n,[["render",i]]);export{y as __pageData,_ as default};