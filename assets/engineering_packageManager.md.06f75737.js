import{_ as s,o as n,c as a,Q as p}from"./chunks/framework.a9ea851b.js";const D=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"engineering/packageManager.md","filePath":"engineering/packageManager.md","lastUpdated":1694587313000}'),l={name:"engineering/packageManager.md"},o=p(`<p>常有前端包管理工具</p><table><thead><tr><th>名称</th><th>描述</th></tr></thead><tbody><tr><td>npm</td><td></td></tr></tbody></table><p>package.json 文件是 Node 项目的核心。 它记录了有关发布到 NPM 之前所需要的项目的重要元数据,它还定义了 npm 用于安装依赖项、运行脚本以及标识包的入口点的项目功能属性。package.json 中内容是一个标准的 JSON 字符串,package.json 的配置项如下:</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 包名称</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;name&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;xxxx&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 包版本号</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;version&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;1.0.0&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 包描述</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;description&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;这是一个非常库的package&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 包的搜索关键词,用于npm search检索包</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;keywords&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;vue vue3 ts typescript&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 项目主页的 url</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;homePage&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;https://github.com/yibird&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;">   * 用于描述项目发生错误时,项目的issue和错误反馈邮箱,bugs可以是一个字符串表示url,</span></span>
<span class="line"><span style="color:#6A737D;">   * 也可以是一个对象</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;bugs&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;url&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;https://github.com/owner/project/issues&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;email&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;2684837849@qq.com&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;">   * license用于定义当前包的许可证,可选值有:</span></span>
<span class="line"><span style="color:#6A737D;">   * ISC:</span></span>
<span class="line"><span style="color:#6A737D;">   * (MIT OR Apache-2.0):</span></span>
<span class="line"><span style="color:#6A737D;">   * MIT:</span></span>
<span class="line"><span style="color:#6A737D;">   *</span></span>
<span class="line"><span style="color:#6A737D;">   * UNLICENSED:表示无许可证,一般用于私有包,通常搭配&quot;private&quot;:true将当前包设置为私有</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;license&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;MIT&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 程序的主入口</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;main&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;./src/index.js&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;">   * author用于描述包作者的名字、邮箱、主页信息,author可以是一个字符串,</span></span>
<span class="line"><span style="color:#6A737D;">   * 例如: &quot;zchengfeng &lt;2684837849@qq.com&gt;&quot;</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;author&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 作者名字</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;name&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;zchengfeng&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 作者邮箱</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;email&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;2684837849@qq.com&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 作者主页</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;url&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;https://github.com/yibird&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;">   * repository用于描述包仓库信息,repository也可以是一个字符串,例如:</span></span>
<span class="line"><span style="color:#6A737D;">   * &quot;npm/npm&quot;、&quot;github:user/repo&quot;、&quot;gist:11081aaa281&quot;、&quot;bitbucket:user/repo&quot;、</span></span>
<span class="line"><span style="color:#6A737D;">   * &quot;gitlab:user/repo&quot;</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;repository&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 仓库类型</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;type&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;git&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 仓库地址</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;url&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;https://github.com/npm/cli.git&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 仓库目录</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;directory&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;packages/react-dom&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;">   *</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;dependencies&quot;</span><span style="color:#E1E4E8;">: {},</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;">   * devDependencies用于定义当前包在开发环境所使用的依赖,对于不想生产环境包含的依赖</span></span>
<span class="line"><span style="color:#6A737D;">   * 都可以放在devDependencies,当执行时npm link或npm install从包的根目录安装。</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;devDependencies&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// &quot;依赖名&quot;:&quot;依赖版本号&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;@vue/component-compiler-utils&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;^3.3.0&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;peerDependencies&quot;</span><span style="color:#E1E4E8;">: {},</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;bundledDependencies&quot;</span><span style="color:#E1E4E8;">: {},</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;optionalDependencies&quot;</span><span style="color:#E1E4E8;">: {},</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 用于指定node和npm的版本要求</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;engines&quot;</span><span style="color:#E1E4E8;">: {}</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 包名称</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;name&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;xxxx&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 包版本号</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;version&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;1.0.0&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 包描述</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;description&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;这是一个非常库的package&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 包的搜索关键词,用于npm search检索包</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;keywords&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;vue vue3 ts typescript&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 项目主页的 url</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;homePage&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;https://github.com/yibird&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;">   * 用于描述项目发生错误时,项目的issue和错误反馈邮箱,bugs可以是一个字符串表示url,</span></span>
<span class="line"><span style="color:#6A737D;">   * 也可以是一个对象</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;bugs&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;url&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;https://github.com/owner/project/issues&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;email&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;2684837849@qq.com&quot;</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;">   * license用于定义当前包的许可证,可选值有:</span></span>
<span class="line"><span style="color:#6A737D;">   * ISC:</span></span>
<span class="line"><span style="color:#6A737D;">   * (MIT OR Apache-2.0):</span></span>
<span class="line"><span style="color:#6A737D;">   * MIT:</span></span>
<span class="line"><span style="color:#6A737D;">   *</span></span>
<span class="line"><span style="color:#6A737D;">   * UNLICENSED:表示无许可证,一般用于私有包,通常搭配&quot;private&quot;:true将当前包设置为私有</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;license&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;MIT&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 程序的主入口</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;main&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;./src/index.js&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;">   * author用于描述包作者的名字、邮箱、主页信息,author可以是一个字符串,</span></span>
<span class="line"><span style="color:#6A737D;">   * 例如: &quot;zchengfeng &lt;2684837849@qq.com&gt;&quot;</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;author&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 作者名字</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;name&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;zchengfeng&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 作者邮箱</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;email&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;2684837849@qq.com&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 作者主页</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;url&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;https://github.com/yibird&quot;</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;">   * repository用于描述包仓库信息,repository也可以是一个字符串,例如:</span></span>
<span class="line"><span style="color:#6A737D;">   * &quot;npm/npm&quot;、&quot;github:user/repo&quot;、&quot;gist:11081aaa281&quot;、&quot;bitbucket:user/repo&quot;、</span></span>
<span class="line"><span style="color:#6A737D;">   * &quot;gitlab:user/repo&quot;</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;repository&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 仓库类型</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;type&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;git&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 仓库地址</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;url&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;https://github.com/npm/cli.git&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 仓库目录</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;directory&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;packages/react-dom&quot;</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;">   *</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;dependencies&quot;</span><span style="color:#24292E;">: {},</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;">   * devDependencies用于定义当前包在开发环境所使用的依赖,对于不想生产环境包含的依赖</span></span>
<span class="line"><span style="color:#6A737D;">   * 都可以放在devDependencies,当执行时npm link或npm install从包的根目录安装。</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;devDependencies&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// &quot;依赖名&quot;:&quot;依赖版本号&quot;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;@vue/component-compiler-utils&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;^3.3.0&quot;</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;peerDependencies&quot;</span><span style="color:#24292E;">: {},</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;bundledDependencies&quot;</span><span style="color:#24292E;">: {},</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;optionalDependencies&quot;</span><span style="color:#24292E;">: {},</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 用于指定node和npm的版本要求</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;engines&quot;</span><span style="color:#24292E;">: {}</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div>`,4),e=[o];function t(c,r,E,y,i,u){return n(),a("div",null,e)}const F=s(l,[["render",t]]);export{D as __pageData,F as default};
