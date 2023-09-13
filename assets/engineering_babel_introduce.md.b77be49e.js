import{_ as s}from"./chunks/ast.fef9122b.js";import{_ as n,o as a,c as l,Q as p}from"./chunks/framework.a9ea851b.js";const o="/frontEnd-repository/assets/babel.00f10077.png",q=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"engineering/babel/introduce.md","filePath":"engineering/babel/introduce.md","lastUpdated":1694587313000}'),e={name:"engineering/babel/introduce.md"},t=p('<h2 id="_1-什么是-babel" tabindex="-1">1.什么是 Babel? <a class="header-anchor" href="#_1-什么是-babel" aria-label="Permalink to &quot;1.什么是 Babel?&quot;">​</a></h2><p>Babel(巴别塔)最开始叫 6to5,顾名思义是将 ES6 转为 ES5,随着 ES 标准的推进,出现了 ES7、ES8 等标准,后改名为 Babel。简单来说,Babel 是一个 JavaScript 编译器,Babel 主要用于:</p><ul><li><strong>转换语法</strong>。转换语法是 Babel 最常用的功能,Babel 可以将 esnext、typescript、flow 的语法转为基于目标环境支持的语法的实现。并且还可以吧目标环境不支持的 api 进行 polyfill。Babel7 提供了<code>@babel/preset-env</code>依赖,可以指定目标 env 来按需转换,转换过程更加精准,转换后的产物更小。<div class="tip custom-block"><p class="custom-block-title">TIP</p><p>Polyfill(垫片)是指在旧版浏览器中实现新版浏览器的 API,并且保证与新版浏览器的 API 功能一致。在 Web 开发中,经常会遇到一些 JS API 或者 CSS 特性在新版浏览器中已经被支持,但是在一些旧版浏览器中不被支持。使用 Polyfill 技术可以在旧版浏览器中实现这些新特性的功能,从而可以提供更好的用户体验。Polyfill 的实现方式通常是通过加载一个 JS 脚本,利用 JS 来实现那些在旧版浏览器中缺失的 API 或特性。例如,为了在旧版浏览器中实现 HTML5 的新标签,可以使用 HTML5 Shiv Polyfill。</p></div></li><li><strong>代码转换</strong>。Babel 是一个转义器,暴露了丰富的 API,这些 API 提供了代码到 AST 的解析、转换以及目标代码生成的能力。借助 Babel 可以实现特定用途的转换,例如函数插桩(函数中自动插入一些代码,例如埋点代码、函数劫持等)、自动国际化等。流行的跨端框架 Taro,就是基于 Babel 的 API 实现代码的转译。</li><li><strong>代码静态分析</strong>。使用 Babel 对源码进行 Parse(解析)后,会生成 AST(抽象语法树),AST 描述着源码的代码结构和语法信息,除了转换 AST 再输出成目标代码外,同样也可以用于代码分析,进行代码静态检查。 <ul><li>linter 工具。linter 工具的原理就是分析 AST 结构,根据 AST 对代码规范进行检查。</li><li>API 文档自动生成工具。通过 Babel 提取源码文件中的 JSDoc(JavaScript 注释),然后生成文档(例如生成 MarkDown 文档)。</li><li>type checker(类型检查)。type checker 会根据从 AST 中提取的或者推导的类型信息,对 AST 进行类型是否一致的检查,从而减少运行时因类型导致的错误。</li><li>压缩混淆工具。压缩混淆工具的原理也是基于代码结构分析,进行删除死代码、变量名混淆、常量折叠等各种编译优化,生成体积更小、性能更好的代码。</li><li>JS 解释器。除了对 AST 进行各种信息的提取和检查外,Babel 还可以直接解释执行 AST。</li></ul></li></ul><h2 id="_2-编译知识的介绍" tabindex="-1">2.编译知识的介绍 <a class="header-anchor" href="#_2-编译知识的介绍" aria-label="Permalink to &quot;2.编译知识的介绍&quot;">​</a></h2><h3 id="_2-1-什么是编译器和解释器" tabindex="-1">2.1 什么是编译器和解释器? <a class="header-anchor" href="#_2-1-什么是编译器和解释器" aria-label="Permalink to &quot;2.1 什么是编译器和解释器?&quot;">​</a></h3><ul><li><p>编译器(Compiler):编译器是一种将源代码转化为目标代码的应用程序。源代码是一种人类可读的代码,用来表达程序员的意图,而目标代码是计算机可读的二进制代码,用来在计算机上执行程序。编译器的主要工作是将源代码中的高级语言(如 C、C++、Java 等)转换成目标代码,使其可以在计算机上执行。 解释器是一种将源代码逐行翻译并逐行执行的软件。解释器逐行读取源代码，并将其翻译成计算机可执行的指令，然后执行这些指令。与编译器不同，解释器不会生成目标代码，而是直接将源代码翻译并执行。解释器通常用于脚本语言（如 JavaScript、Python 等）的解释执行，可以实现实时的编程任务。</p></li><li><p>解释器:解释器是一种将源代码逐行翻译并逐行执行的应用程序。解释器逐行读取源代码,并将其翻译成计算机可执行的指令，然后执行这些指令。与编译器不同,解释器不会生成目标代码,而是直接将源代码翻译并执行。解释器通常用于脚本语言(如 JavaScript、Python 等)的解释执行,可以实现实时的编程任务。</p></li></ul><p>编译器和解释器都是将高级语言转换成计算机能够执行的机器语言的应用程序。它们的主要区别在于编译器会将整个程序一次性编译成目标代码,而解释器则是逐行解释执行源代码。编译器编译出的程序通常执行速度更快,但是需要预先编译、链接、生成目标代码文件等操作,而解释器通常更容易使用,可以直接运行源代码,但是执行速度较慢。</p><h3 id="_2-2-什么是-ast" tabindex="-1">2.2 什么是 AST? <a class="header-anchor" href="#_2-2-什么是-ast" aria-label="Permalink to &quot;2.2 什么是 AST?&quot;">​</a></h3><p>AST(Abstract Syntax Tree),抽象语法树,是一种数据结构,它用于表示编程语言的抽象语法结构。在编程语言中,源代码是由一系列字符组成的,计算机并不能直接理解它们,需要将其转换成抽象语法树,以便计算机能够理解和处理它们。</p><p>抽象语法树可以看作是源代码的抽象语法结构的一种中间表示形式。在抽象语法树中,每个节点表示一个语法元素,例如函数、变量、表达式、语句等等。节点之间的关系则表示语法结构的嵌套关系,例如函数包含参数和函数体,函数体又包含多个语句,语句包含多个表达式等等。抽象语法树在编译器、静态分析、代码优化、代码生成等领域中都有广泛的应用,例如 Babel(前端编译器)、Webpack(打包器)、ESLint(JS Lint 工具)、Perttier(代码格式化工具)等。</p><h2 id="_3-编译的编译流程" tabindex="-1">3.编译的编译流程 <a class="header-anchor" href="#_3-编译的编译流程" aria-label="Permalink to &quot;3.编译的编译流程&quot;">​</a></h2><p>一个完整的编译器整体执行过程可以分为三个步骤:</p><ul><li><strong>Parsing(解析)</strong>。这个过程要经词法分析、语法分析、构建 AST（抽象语法树）一系列操作。</li><li><strong>Transformation(转化)</strong>。这个过程就是将上一步解析后的内容,按照编译器指定的规则进行处理,形成一个新的表现形式。</li><li><strong>Code Generation(代码生成)</strong>。将上一步处理好的内容转化为新的代码。</li></ul><p><img src="'+s+`" alt="ast"> 以 lisp 的函数调用编译成类似 C 的函数为例:</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#79B8FF;">LISP</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">代码</span><span style="color:#E1E4E8;">: (add </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;"> (subtract </span><span style="color:#79B8FF;">4</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">))</span></span>
<span class="line"><span style="color:#79B8FF;">C</span><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">代码</span><span style="color:#E1E4E8;">:  </span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">, </span><span style="color:#B392F0;">subtract</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">4</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">))</span></span>
<span class="line"><span style="color:#B392F0;">释义</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> （ </span><span style="color:#79B8FF;">4</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#005CC5;">LISP</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">代码</span><span style="color:#24292E;">: (add </span><span style="color:#005CC5;">2</span><span style="color:#24292E;"> (subtract </span><span style="color:#005CC5;">4</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">))</span></span>
<span class="line"><span style="color:#005CC5;">C</span><span style="color:#24292E;">    </span><span style="color:#6F42C1;">代码</span><span style="color:#24292E;">:  </span><span style="color:#6F42C1;">add</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">, </span><span style="color:#6F42C1;">subtract</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">4</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">))</span></span>
<span class="line"><span style="color:#6F42C1;">释义</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">2</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> （ </span><span style="color:#005CC5;">4</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">)</span></span></code></pre></div><h4 id="_3-1-parsing-过程" tabindex="-1">3.1 Parsing 过程 <a class="header-anchor" href="#_3-1-parsing-过程" aria-label="Permalink to &quot;3.1 Parsing 过程&quot;">​</a></h4><p>解析过程主要分为词法分析和语法分析两个步骤:</p><ul><li><strong>词法分析</strong>:词法分析是使用 tokenizer(分词器)或者 lexer(词法分析器),将源码拆分成 tokens,tokens 是一个放置对象的数组,其中的每一个对象都可以看做是一个单元(数字，标签，标点，操作符...)的描述信息。例如对&quot;你是猪&quot;进行词法分析就可以得到主谓宾词语,对<code>(add 2 (subtract 4 2))</code>进行词法分析后得到:</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[</span></span>
<span class="line"><span style="color:#E1E4E8;">  { type: </span><span style="color:#9ECBFF;">&quot;paren&quot;</span><span style="color:#E1E4E8;">, value: </span><span style="color:#9ECBFF;">&quot;(&quot;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">  { type: </span><span style="color:#9ECBFF;">&quot;name&quot;</span><span style="color:#E1E4E8;">, value: </span><span style="color:#9ECBFF;">&quot;add&quot;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">  { type: </span><span style="color:#9ECBFF;">&quot;number&quot;</span><span style="color:#E1E4E8;">, value: </span><span style="color:#9ECBFF;">&quot;2&quot;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">  { type: </span><span style="color:#9ECBFF;">&quot;paren&quot;</span><span style="color:#E1E4E8;">, value: </span><span style="color:#9ECBFF;">&quot;(&quot;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">  { type: </span><span style="color:#9ECBFF;">&quot;name&quot;</span><span style="color:#E1E4E8;">, value: </span><span style="color:#9ECBFF;">&quot;subtract&quot;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">  { type: </span><span style="color:#9ECBFF;">&quot;number&quot;</span><span style="color:#E1E4E8;">, value: </span><span style="color:#9ECBFF;">&quot;4&quot;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">  { type: </span><span style="color:#9ECBFF;">&quot;number&quot;</span><span style="color:#E1E4E8;">, value: </span><span style="color:#9ECBFF;">&quot;2&quot;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">  { type: </span><span style="color:#9ECBFF;">&quot;paren&quot;</span><span style="color:#E1E4E8;">, value: </span><span style="color:#9ECBFF;">&quot;)&quot;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">  { type: </span><span style="color:#9ECBFF;">&quot;paren&quot;</span><span style="color:#E1E4E8;">, value: </span><span style="color:#9ECBFF;">&quot;)&quot;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">];</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[</span></span>
<span class="line"><span style="color:#24292E;">  { type: </span><span style="color:#032F62;">&quot;paren&quot;</span><span style="color:#24292E;">, value: </span><span style="color:#032F62;">&quot;(&quot;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">  { type: </span><span style="color:#032F62;">&quot;name&quot;</span><span style="color:#24292E;">, value: </span><span style="color:#032F62;">&quot;add&quot;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">  { type: </span><span style="color:#032F62;">&quot;number&quot;</span><span style="color:#24292E;">, value: </span><span style="color:#032F62;">&quot;2&quot;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">  { type: </span><span style="color:#032F62;">&quot;paren&quot;</span><span style="color:#24292E;">, value: </span><span style="color:#032F62;">&quot;(&quot;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">  { type: </span><span style="color:#032F62;">&quot;name&quot;</span><span style="color:#24292E;">, value: </span><span style="color:#032F62;">&quot;subtract&quot;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">  { type: </span><span style="color:#032F62;">&quot;number&quot;</span><span style="color:#24292E;">, value: </span><span style="color:#032F62;">&quot;4&quot;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">  { type: </span><span style="color:#032F62;">&quot;number&quot;</span><span style="color:#24292E;">, value: </span><span style="color:#032F62;">&quot;2&quot;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">  { type: </span><span style="color:#032F62;">&quot;paren&quot;</span><span style="color:#24292E;">, value: </span><span style="color:#032F62;">&quot;)&quot;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">  { type: </span><span style="color:#032F62;">&quot;paren&quot;</span><span style="color:#24292E;">, value: </span><span style="color:#032F62;">&quot;)&quot;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">];</span></span></code></pre></div><ul><li><strong>语法解析</strong>:将词法分析的结果转化为抽象语法树(AST),并检查其语法是否正确。语法分析会将 tokens 重新整理成语法相互关联的表达形式,这种表达形式一般被称为中间层或者 AST(抽象语法树)。对<code>(add 2 (subtract 4 2))</code>进行语法解析后得到的 AST:</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">type</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;Program&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">body</span><span style="color:#E1E4E8;">: [{</span></span>
<span class="line"><span style="color:#E1E4E8;">    type: </span><span style="color:#9ECBFF;">&#39;CallExpression&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    name: </span><span style="color:#9ECBFF;">&#39;add&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    params:</span></span>
<span class="line"><span style="color:#E1E4E8;">      [{</span></span>
<span class="line"><span style="color:#E1E4E8;">        type: </span><span style="color:#9ECBFF;">&#39;NumberLiteral&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        value: </span><span style="color:#9ECBFF;">&#39;2&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">      {</span></span>
<span class="line"><span style="color:#E1E4E8;">        type: </span><span style="color:#9ECBFF;">&#39;CallExpression&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        name: </span><span style="color:#9ECBFF;">&#39;subtract&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        params: [{</span></span>
<span class="line"><span style="color:#E1E4E8;">          type: </span><span style="color:#9ECBFF;">&#39;NumberLiteral&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          value: </span><span style="color:#9ECBFF;">&#39;4&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        }, {</span></span>
<span class="line"><span style="color:#E1E4E8;">          type: </span><span style="color:#9ECBFF;">&#39;NumberLiteral&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          value: </span><span style="color:#9ECBFF;">&#39;2&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        }]</span></span>
<span class="line"><span style="color:#E1E4E8;">      }]</span></span>
<span class="line"><span style="color:#E1E4E8;">  }]</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">type</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;Program&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">body</span><span style="color:#24292E;">: [{</span></span>
<span class="line"><span style="color:#24292E;">    type: </span><span style="color:#032F62;">&#39;CallExpression&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    name: </span><span style="color:#032F62;">&#39;add&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    params:</span></span>
<span class="line"><span style="color:#24292E;">      [{</span></span>
<span class="line"><span style="color:#24292E;">        type: </span><span style="color:#032F62;">&#39;NumberLiteral&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        value: </span><span style="color:#032F62;">&#39;2&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">      {</span></span>
<span class="line"><span style="color:#24292E;">        type: </span><span style="color:#032F62;">&#39;CallExpression&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        name: </span><span style="color:#032F62;">&#39;subtract&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        params: [{</span></span>
<span class="line"><span style="color:#24292E;">          type: </span><span style="color:#032F62;">&#39;NumberLiteral&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">          value: </span><span style="color:#032F62;">&#39;4&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        }, {</span></span>
<span class="line"><span style="color:#24292E;">          type: </span><span style="color:#032F62;">&#39;NumberLiteral&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">          value: </span><span style="color:#032F62;">&#39;2&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        }]</span></span>
<span class="line"><span style="color:#24292E;">      }]</span></span>
<span class="line"><span style="color:#24292E;">  }]</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="_4-实现一个编译器-compiler" tabindex="-1">4.实现一个编译器(Compiler) <a class="header-anchor" href="#_4-实现一个编译器-compiler" aria-label="Permalink to &quot;4.实现一个编译器(Compiler)&quot;">​</a></h2><p>根据 Compiler 的执行流程,Compiler 的实现分为以下四个步骤:</p><ul><li>生成 Tokens。</li><li>将生成好的 tokens 转化为 AST。</li><li>遍历和访问生成好的 AST。</li><li>将生成好的 AST 转化为新的 AST。</li><li>根据转化的 AST 生成目标代码。</li></ul><h3 id="_4-1-生成-tokens" tabindex="-1">4.1 生成 Tokens <a class="header-anchor" href="#_4-1-生成-tokens" aria-label="Permalink to &quot;4.1 生成 Tokens&quot;">​</a></h3><p>第一步是将输入代码解析为 tokens。这个过程需要 tokenizer(分词器)函数,整体思路就是通过遍历字符串的方式,对每个字符按照一定的规则进行<code>switch case</code>,最终生成 tokens 数组。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * 通过分词器对输入代码进行分词,返回分词解析后的tokens数组</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E1E4E8;">input</span><span style="color:#6A737D;"> 输入代码</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@returns</span><span style="color:#6A737D;"> tokens 分词解析后的tokens数组</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">tokenizer</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">input</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 记录当前访问的位置</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> current </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 最终生成的tokens</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> tokens </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [];</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 遍历输入代码</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">while</span><span style="color:#E1E4E8;"> (current </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> input.</span><span style="color:#79B8FF;">length</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> char </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> input[current];</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 如果字符是开括号,则把一个新的token放到tokens数组里,类型是\`paren\`</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (char </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;(&quot;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      tokens.</span><span style="color:#B392F0;">push</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">        type: </span><span style="color:#9ECBFF;">&quot;paren&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        value: </span><span style="color:#9ECBFF;">&quot;(&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      });</span></span>
<span class="line"><span style="color:#E1E4E8;">      current</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">continue</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 闭括号做同样的操作</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (char </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;)&quot;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      tokens.</span><span style="color:#B392F0;">push</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">        type: </span><span style="color:#9ECBFF;">&quot;paren&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        value: </span><span style="color:#9ECBFF;">&quot;)&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      });</span></span>
<span class="line"><span style="color:#E1E4E8;">      current</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">continue</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 空格检查,分词时需要关心空格在分隔字符上是否存在,但是在token中他是无意义的</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">WHITESPACE</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#DBEDFF;"> </span><span style="color:#9ECBFF;">/</span><span style="color:#79B8FF;">\\s</span><span style="color:#9ECBFF;">/</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#79B8FF;">WHITESPACE</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">test</span><span style="color:#E1E4E8;">(char)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      current</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">continue</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">     * 检查数字,遇到解析 add 22 33时避免内容被解析为2、2、3、3,所以遇到数字后需要</span></span>
<span class="line"><span style="color:#6A737D;">     * 继续向后匹配直到匹配失败,这样就可以截取到连续的数字了</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">NUMBERS</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#DBEDFF;"> </span><span style="color:#9ECBFF;">/</span><span style="color:#79B8FF;">[0-9]</span><span style="color:#9ECBFF;">/</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#79B8FF;">NUMBERS</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">test</span><span style="color:#E1E4E8;">(char)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> value </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">while</span><span style="color:#E1E4E8;"> (</span><span style="color:#79B8FF;">NUMBERS</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">test</span><span style="color:#E1E4E8;">(char)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        value </span><span style="color:#F97583;">+=</span><span style="color:#E1E4E8;"> char;</span></span>
<span class="line"><span style="color:#E1E4E8;">        char </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> input[</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">current];</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">      tokens.</span><span style="color:#B392F0;">push</span><span style="color:#E1E4E8;">({ type: </span><span style="color:#9ECBFF;">&quot;number&quot;</span><span style="color:#E1E4E8;">, value });</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">continue</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 接下来检测字符串,这里只检测双引号,和上述同理也是截取连续完整的字符串</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (char </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;&quot;&#39;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> value </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">      char </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> input[</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">current];</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">       * 循环遍历char,如果没有遇到闭合的双引号,value会拼接双引号的中间部分,也就是不带双引号的</span></span>
<span class="line"><span style="color:#6A737D;">       * 字符串内容,每次遍历char的内容向右移动(++current),直到遇到char === &#39;&quot;&quot; 才会终止遍历</span></span>
<span class="line"><span style="color:#6A737D;">       */</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">while</span><span style="color:#E1E4E8;"> (char </span><span style="color:#F97583;">!==</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;&quot;&#39;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        value </span><span style="color:#F97583;">+=</span><span style="color:#E1E4E8;"> char;</span></span>
<span class="line"><span style="color:#E1E4E8;">        char </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> input[</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">current];</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">      char </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> input[</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">current];</span></span>
<span class="line"><span style="color:#E1E4E8;">      tokens.</span><span style="color:#B392F0;">push</span><span style="color:#E1E4E8;">({ type: </span><span style="color:#9ECBFF;">&quot;string&quot;</span><span style="color:#E1E4E8;">, value });</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">continue</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 最后一个检测的是name,如add这样,也是一串连续的字符,但是他是没有&quot;&quot;的</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">LETTERS</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#DBEDFF;"> </span><span style="color:#9ECBFF;">/</span><span style="color:#79B8FF;">[a-z]</span><span style="color:#9ECBFF;">/</span><span style="color:#F97583;">i</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#79B8FF;">LETTERS</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">test</span><span style="color:#E1E4E8;">(char)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> value </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">while</span><span style="color:#E1E4E8;"> (</span><span style="color:#79B8FF;">LETTERS</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">test</span><span style="color:#E1E4E8;">(char)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        value </span><span style="color:#F97583;">+=</span><span style="color:#E1E4E8;"> char;</span></span>
<span class="line"><span style="color:#E1E4E8;">        char </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> input[</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">current];</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">      tokens.</span><span style="color:#B392F0;">push</span><span style="color:#E1E4E8;">({ type: </span><span style="color:#9ECBFF;">&quot;name&quot;</span><span style="color:#E1E4E8;">, value });</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">continue</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 容错处理,如果什么都没有匹配到,说明这个token不在我们的解析范围内</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">throw</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">TypeError</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;I dont know what this character is: &quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> char);</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> tokens;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * 解析器,用于将入输入的token转为ast</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E1E4E8;">tokens</span><span style="color:#6A737D;"> 分词器分词后生成的tokens数组</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@return</span><span style="color:#6A737D;"> ast 返回生成的ast</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">parser</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">tokens</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> current </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">; </span><span style="color:#6A737D;">// 访问tokens的下标</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// walk函数用于辅助遍历整个tokens,遍历出每一个token,根据其类型生成对应的节点</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">walk</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> token </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> tokens[current];</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 如果token是number类型</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (token.type </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;number&quot;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      current</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        type: </span><span style="color:#9ECBFF;">&quot;NumberLiteral&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        value: token.value,</span></span>
<span class="line"><span style="color:#E1E4E8;">      };</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 如果token是string类型</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (token.type </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;string&quot;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      current</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        type: </span><span style="color:#9ECBFF;">&quot;StringLiteral&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        value: token.value,</span></span>
<span class="line"><span style="color:#E1E4E8;">      };</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 处理调用语句</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (token.type </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;paren&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> token.value </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;(&quot;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      token </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> tokens[</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">current];</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> node </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        type: </span><span style="color:#9ECBFF;">&quot;CallExpression&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        value: token.value,</span></span>
<span class="line"><span style="color:#E1E4E8;">        params: [],</span></span>
<span class="line"><span style="color:#E1E4E8;">      };</span></span>
<span class="line"><span style="color:#E1E4E8;">      token </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> tokens[</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">current];</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 通过递归调用不断的读取参数</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">while</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">        token.type </span><span style="color:#F97583;">!==</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;paren&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">||</span></span>
<span class="line"><span style="color:#E1E4E8;">        (token.type </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;paren&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> token.value </span><span style="color:#F97583;">!==</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;)&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">      ) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        node.params.</span><span style="color:#B392F0;">push</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">walk</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 因为参数的if判断里会让 current++ 实际上就是持续向后遍历了tokens,然后将参数推入params</span></span>
<span class="line"><span style="color:#E1E4E8;">        token </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> tokens[current];</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 当while中断后就说明参数读取完了,现在下一个应该是&quot;)&quot;，所以++越过</span></span>
<span class="line"><span style="color:#E1E4E8;">      current</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 最终将CallExpression节点返回</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> node;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 创建AST,树的最根层就是Program</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> ast </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    type: </span><span style="color:#9ECBFF;">&quot;Program&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    body: [],</span></span>
<span class="line"><span style="color:#E1E4E8;">  };</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 通过调用walk遍历tokens将tokens内的对象,转化为AST的节点,完成AST的构建</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">while</span><span style="color:#E1E4E8;"> (current </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> tokens.</span><span style="color:#79B8FF;">length</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    ast.body.</span><span style="color:#B392F0;">push</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">walk</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 最后返回ast</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> ast;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * 通过分词器对输入代码进行分词,返回分词解析后的tokens数组</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#24292E;">input</span><span style="color:#6A737D;"> 输入代码</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@returns</span><span style="color:#6A737D;"> tokens 分词解析后的tokens数组</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">tokenizer</span><span style="color:#24292E;">(</span><span style="color:#E36209;">input</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 记录当前访问的位置</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> current </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 最终生成的tokens</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> tokens </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [];</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 遍历输入代码</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">while</span><span style="color:#24292E;"> (current </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> input.</span><span style="color:#005CC5;">length</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> char </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> input[current];</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 如果字符是开括号,则把一个新的token放到tokens数组里,类型是\`paren\`</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (char </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;(&quot;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">      tokens.</span><span style="color:#6F42C1;">push</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">        type: </span><span style="color:#032F62;">&quot;paren&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        value: </span><span style="color:#032F62;">&quot;(&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      });</span></span>
<span class="line"><span style="color:#24292E;">      current</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">continue</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 闭括号做同样的操作</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (char </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;)&quot;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">      tokens.</span><span style="color:#6F42C1;">push</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">        type: </span><span style="color:#032F62;">&quot;paren&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        value: </span><span style="color:#032F62;">&quot;)&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      });</span></span>
<span class="line"><span style="color:#24292E;">      current</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">continue</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 空格检查,分词时需要关心空格在分隔字符上是否存在,但是在token中他是无意义的</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">WHITESPACE</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#032F62;"> /</span><span style="color:#005CC5;">\\s</span><span style="color:#032F62;">/</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#005CC5;">WHITESPACE</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">test</span><span style="color:#24292E;">(char)) {</span></span>
<span class="line"><span style="color:#24292E;">      current</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">continue</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">     * 检查数字,遇到解析 add 22 33时避免内容被解析为2、2、3、3,所以遇到数字后需要</span></span>
<span class="line"><span style="color:#6A737D;">     * 继续向后匹配直到匹配失败,这样就可以截取到连续的数字了</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">NUMBERS</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#032F62;"> /</span><span style="color:#005CC5;">[0-9]</span><span style="color:#032F62;">/</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#005CC5;">NUMBERS</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">test</span><span style="color:#24292E;">(char)) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> value </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">while</span><span style="color:#24292E;"> (</span><span style="color:#005CC5;">NUMBERS</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">test</span><span style="color:#24292E;">(char)) {</span></span>
<span class="line"><span style="color:#24292E;">        value </span><span style="color:#D73A49;">+=</span><span style="color:#24292E;"> char;</span></span>
<span class="line"><span style="color:#24292E;">        char </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> input[</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">current];</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">      tokens.</span><span style="color:#6F42C1;">push</span><span style="color:#24292E;">({ type: </span><span style="color:#032F62;">&quot;number&quot;</span><span style="color:#24292E;">, value });</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">continue</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 接下来检测字符串,这里只检测双引号,和上述同理也是截取连续完整的字符串</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (char </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;&quot;&#39;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> value </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">      char </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> input[</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">current];</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">       * 循环遍历char,如果没有遇到闭合的双引号,value会拼接双引号的中间部分,也就是不带双引号的</span></span>
<span class="line"><span style="color:#6A737D;">       * 字符串内容,每次遍历char的内容向右移动(++current),直到遇到char === &#39;&quot;&quot; 才会终止遍历</span></span>
<span class="line"><span style="color:#6A737D;">       */</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">while</span><span style="color:#24292E;"> (char </span><span style="color:#D73A49;">!==</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;&quot;&#39;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        value </span><span style="color:#D73A49;">+=</span><span style="color:#24292E;"> char;</span></span>
<span class="line"><span style="color:#24292E;">        char </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> input[</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">current];</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">      char </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> input[</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">current];</span></span>
<span class="line"><span style="color:#24292E;">      tokens.</span><span style="color:#6F42C1;">push</span><span style="color:#24292E;">({ type: </span><span style="color:#032F62;">&quot;string&quot;</span><span style="color:#24292E;">, value });</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">continue</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 最后一个检测的是name,如add这样,也是一串连续的字符,但是他是没有&quot;&quot;的</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">LETTERS</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#032F62;"> /</span><span style="color:#005CC5;">[a-z]</span><span style="color:#032F62;">/</span><span style="color:#D73A49;">i</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#005CC5;">LETTERS</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">test</span><span style="color:#24292E;">(char)) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> value </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">while</span><span style="color:#24292E;"> (</span><span style="color:#005CC5;">LETTERS</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">test</span><span style="color:#24292E;">(char)) {</span></span>
<span class="line"><span style="color:#24292E;">        value </span><span style="color:#D73A49;">+=</span><span style="color:#24292E;"> char;</span></span>
<span class="line"><span style="color:#24292E;">        char </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> input[</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">current];</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">      tokens.</span><span style="color:#6F42C1;">push</span><span style="color:#24292E;">({ type: </span><span style="color:#032F62;">&quot;name&quot;</span><span style="color:#24292E;">, value });</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">continue</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 容错处理,如果什么都没有匹配到,说明这个token不在我们的解析范围内</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">throw</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">TypeError</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;I dont know what this character is: &quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> char);</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> tokens;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * 解析器,用于将入输入的token转为ast</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#24292E;">tokens</span><span style="color:#6A737D;"> 分词器分词后生成的tokens数组</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@return</span><span style="color:#6A737D;"> ast 返回生成的ast</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">parser</span><span style="color:#24292E;">(</span><span style="color:#E36209;">tokens</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> current </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">; </span><span style="color:#6A737D;">// 访问tokens的下标</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// walk函数用于辅助遍历整个tokens,遍历出每一个token,根据其类型生成对应的节点</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">walk</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> token </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> tokens[current];</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 如果token是number类型</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (token.type </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;number&quot;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">      current</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        type: </span><span style="color:#032F62;">&quot;NumberLiteral&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        value: token.value,</span></span>
<span class="line"><span style="color:#24292E;">      };</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 如果token是string类型</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (token.type </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;string&quot;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">      current</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        type: </span><span style="color:#032F62;">&quot;StringLiteral&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        value: token.value,</span></span>
<span class="line"><span style="color:#24292E;">      };</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 处理调用语句</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (token.type </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;paren&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> token.value </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;(&quot;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">      token </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> tokens[</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">current];</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> node </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        type: </span><span style="color:#032F62;">&quot;CallExpression&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        value: token.value,</span></span>
<span class="line"><span style="color:#24292E;">        params: [],</span></span>
<span class="line"><span style="color:#24292E;">      };</span></span>
<span class="line"><span style="color:#24292E;">      token </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> tokens[</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">current];</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 通过递归调用不断的读取参数</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">while</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">        token.type </span><span style="color:#D73A49;">!==</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;paren&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">||</span></span>
<span class="line"><span style="color:#24292E;">        (token.type </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;paren&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> token.value </span><span style="color:#D73A49;">!==</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;)&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">      ) {</span></span>
<span class="line"><span style="color:#24292E;">        node.params.</span><span style="color:#6F42C1;">push</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">walk</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 因为参数的if判断里会让 current++ 实际上就是持续向后遍历了tokens,然后将参数推入params</span></span>
<span class="line"><span style="color:#24292E;">        token </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> tokens[current];</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 当while中断后就说明参数读取完了,现在下一个应该是&quot;)&quot;，所以++越过</span></span>
<span class="line"><span style="color:#24292E;">      current</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 最终将CallExpression节点返回</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> node;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 创建AST,树的最根层就是Program</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> ast </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    type: </span><span style="color:#032F62;">&quot;Program&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    body: [],</span></span>
<span class="line"><span style="color:#24292E;">  };</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 通过调用walk遍历tokens将tokens内的对象,转化为AST的节点,完成AST的构建</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">while</span><span style="color:#24292E;"> (current </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> tokens.</span><span style="color:#005CC5;">length</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    ast.body.</span><span style="color:#6F42C1;">push</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">walk</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 最后返回ast</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> ast;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><details class="details custom-block"><summary>测试 tokenizer</summary><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// tokenizer(&quot;(add 2 (subtract 4 2))&quot;) 结果如下:</span></span>
<span class="line"><span style="color:#E1E4E8;">[</span></span>
<span class="line"><span style="color:#E1E4E8;">  { type: </span><span style="color:#9ECBFF;">&quot;paren&quot;</span><span style="color:#E1E4E8;">, value: </span><span style="color:#9ECBFF;">&quot;(&quot;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">  { type: </span><span style="color:#9ECBFF;">&quot;name&quot;</span><span style="color:#E1E4E8;">, value: </span><span style="color:#9ECBFF;">&quot;add&quot;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">  { type: </span><span style="color:#9ECBFF;">&quot;number&quot;</span><span style="color:#E1E4E8;">, value: </span><span style="color:#9ECBFF;">&quot;2&quot;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">  { type: </span><span style="color:#9ECBFF;">&quot;paren&quot;</span><span style="color:#E1E4E8;">, value: </span><span style="color:#9ECBFF;">&quot;(&quot;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">  { type: </span><span style="color:#9ECBFF;">&quot;name&quot;</span><span style="color:#E1E4E8;">, value: </span><span style="color:#9ECBFF;">&quot;subtract&quot;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">  { type: </span><span style="color:#9ECBFF;">&quot;number&quot;</span><span style="color:#E1E4E8;">, value: </span><span style="color:#9ECBFF;">&quot;4&quot;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">  { type: </span><span style="color:#9ECBFF;">&quot;number&quot;</span><span style="color:#E1E4E8;">, value: </span><span style="color:#9ECBFF;">&quot;2&quot;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">  { type: </span><span style="color:#9ECBFF;">&quot;paren&quot;</span><span style="color:#E1E4E8;">, value: </span><span style="color:#9ECBFF;">&quot;)&quot;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">  { type: </span><span style="color:#9ECBFF;">&quot;paren&quot;</span><span style="color:#E1E4E8;">, value: </span><span style="color:#9ECBFF;">&quot;)&quot;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">];</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// tokenizer(&quot;(add 2 (subtract 4 2))&quot;) 结果如下:</span></span>
<span class="line"><span style="color:#24292E;">[</span></span>
<span class="line"><span style="color:#24292E;">  { type: </span><span style="color:#032F62;">&quot;paren&quot;</span><span style="color:#24292E;">, value: </span><span style="color:#032F62;">&quot;(&quot;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">  { type: </span><span style="color:#032F62;">&quot;name&quot;</span><span style="color:#24292E;">, value: </span><span style="color:#032F62;">&quot;add&quot;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">  { type: </span><span style="color:#032F62;">&quot;number&quot;</span><span style="color:#24292E;">, value: </span><span style="color:#032F62;">&quot;2&quot;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">  { type: </span><span style="color:#032F62;">&quot;paren&quot;</span><span style="color:#24292E;">, value: </span><span style="color:#032F62;">&quot;(&quot;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">  { type: </span><span style="color:#032F62;">&quot;name&quot;</span><span style="color:#24292E;">, value: </span><span style="color:#032F62;">&quot;subtract&quot;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">  { type: </span><span style="color:#032F62;">&quot;number&quot;</span><span style="color:#24292E;">, value: </span><span style="color:#032F62;">&quot;4&quot;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">  { type: </span><span style="color:#032F62;">&quot;number&quot;</span><span style="color:#24292E;">, value: </span><span style="color:#032F62;">&quot;2&quot;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">  { type: </span><span style="color:#032F62;">&quot;paren&quot;</span><span style="color:#24292E;">, value: </span><span style="color:#032F62;">&quot;)&quot;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">  { type: </span><span style="color:#032F62;">&quot;paren&quot;</span><span style="color:#24292E;">, value: </span><span style="color:#032F62;">&quot;)&quot;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">];</span></span></code></pre></div></details><h3 id="_4-2-生成-ast" tabindex="-1">4.2 生成 AST <a class="header-anchor" href="#_4-2-生成-ast" aria-label="Permalink to &quot;4.2 生成 AST&quot;">​</a></h3><p>第二步是定义一个 parse(解析器)接收生成好的 tokens 并将其转化为 AST。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * 解析器,用于将入输入的token转为ast</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E1E4E8;">tokens</span><span style="color:#6A737D;"> 分词器分词后生成的tokens数组</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@return</span><span style="color:#6A737D;"> ast 返回生成的ast</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">parser</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">tokens</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> current </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">; </span><span style="color:#6A737D;">// 访问tokens的下标</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// walk函数用于辅助遍历整个tokens,遍历出每一个token,根据其类型生成对应的节点</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">walk</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> token </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> tokens[current];</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 如果token是number类型</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (token.type </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;number&quot;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      current</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        type: </span><span style="color:#9ECBFF;">&quot;NumberLiteral&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        value: token.value,</span></span>
<span class="line"><span style="color:#E1E4E8;">      };</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 如果token是string类型</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (token.type </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;string&quot;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      current</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        type: </span><span style="color:#9ECBFF;">&quot;StringLiteral&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        value: token.value,</span></span>
<span class="line"><span style="color:#E1E4E8;">      };</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 处理调用语句</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (token.type </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;paren&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> token.value </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;(&quot;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      token </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> tokens[</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">current];</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> node </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        type: </span><span style="color:#9ECBFF;">&quot;CallExpression&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        value: token.value,</span></span>
<span class="line"><span style="color:#E1E4E8;">        params: [],</span></span>
<span class="line"><span style="color:#E1E4E8;">      };</span></span>
<span class="line"><span style="color:#E1E4E8;">      token </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> tokens[</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">current];</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 通过递归调用不断的读取参数</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">while</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">        token.type </span><span style="color:#F97583;">!==</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;paren&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">||</span></span>
<span class="line"><span style="color:#E1E4E8;">        (token.type </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;paren&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> token.value </span><span style="color:#F97583;">!==</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;)&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">      ) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        node.params.</span><span style="color:#B392F0;">push</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">walk</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 因为参数的if判断里会让 current++ 实际上就是持续向后遍历了tokens,然后将参数推入params</span></span>
<span class="line"><span style="color:#E1E4E8;">        token </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> tokens[current];</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 当while中断后就说明参数读取完了,现在下一个应该是&quot;)&quot;，所以++越过</span></span>
<span class="line"><span style="color:#E1E4E8;">      current</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 最终将CallExpression节点返回</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> node;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 创建AST,树的最根层就是Program</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> ast </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    type: </span><span style="color:#9ECBFF;">&quot;Program&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    body: [],</span></span>
<span class="line"><span style="color:#E1E4E8;">  };</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 通过调用walk遍历tokens将tokens内的对象,转化为AST的节点,完成AST的构建</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">while</span><span style="color:#E1E4E8;"> (current </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> tokens.</span><span style="color:#79B8FF;">length</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    ast.body.</span><span style="color:#B392F0;">push</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">walk</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 最后返回ast</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> ast;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * 解析器,用于将入输入的token转为ast</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#24292E;">tokens</span><span style="color:#6A737D;"> 分词器分词后生成的tokens数组</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@return</span><span style="color:#6A737D;"> ast 返回生成的ast</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">parser</span><span style="color:#24292E;">(</span><span style="color:#E36209;">tokens</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> current </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">; </span><span style="color:#6A737D;">// 访问tokens的下标</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// walk函数用于辅助遍历整个tokens,遍历出每一个token,根据其类型生成对应的节点</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">walk</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> token </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> tokens[current];</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 如果token是number类型</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (token.type </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;number&quot;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">      current</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        type: </span><span style="color:#032F62;">&quot;NumberLiteral&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        value: token.value,</span></span>
<span class="line"><span style="color:#24292E;">      };</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 如果token是string类型</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (token.type </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;string&quot;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">      current</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        type: </span><span style="color:#032F62;">&quot;StringLiteral&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        value: token.value,</span></span>
<span class="line"><span style="color:#24292E;">      };</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 处理调用语句</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (token.type </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;paren&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> token.value </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;(&quot;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">      token </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> tokens[</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">current];</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> node </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        type: </span><span style="color:#032F62;">&quot;CallExpression&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        value: token.value,</span></span>
<span class="line"><span style="color:#24292E;">        params: [],</span></span>
<span class="line"><span style="color:#24292E;">      };</span></span>
<span class="line"><span style="color:#24292E;">      token </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> tokens[</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">current];</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 通过递归调用不断的读取参数</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">while</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">        token.type </span><span style="color:#D73A49;">!==</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;paren&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">||</span></span>
<span class="line"><span style="color:#24292E;">        (token.type </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;paren&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> token.value </span><span style="color:#D73A49;">!==</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;)&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">      ) {</span></span>
<span class="line"><span style="color:#24292E;">        node.params.</span><span style="color:#6F42C1;">push</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">walk</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 因为参数的if判断里会让 current++ 实际上就是持续向后遍历了tokens,然后将参数推入params</span></span>
<span class="line"><span style="color:#24292E;">        token </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> tokens[current];</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 当while中断后就说明参数读取完了,现在下一个应该是&quot;)&quot;，所以++越过</span></span>
<span class="line"><span style="color:#24292E;">      current</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 最终将CallExpression节点返回</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> node;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 创建AST,树的最根层就是Program</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> ast </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    type: </span><span style="color:#032F62;">&quot;Program&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    body: [],</span></span>
<span class="line"><span style="color:#24292E;">  };</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 通过调用walk遍历tokens将tokens内的对象,转化为AST的节点,完成AST的构建</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">while</span><span style="color:#24292E;"> (current </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> tokens.</span><span style="color:#005CC5;">length</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    ast.body.</span><span style="color:#6F42C1;">push</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">walk</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 最后返回ast</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> ast;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><details class="details custom-block"><summary>测试 parser</summary><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// parser(tokenizer(&quot;(add 2 (subtract 4 2))&quot;)) 结果如下:</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">type</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;Program&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">body</span><span style="color:#E1E4E8;">: [ { type: </span><span style="color:#9ECBFF;">&#39;CallExpression&#39;</span><span style="color:#E1E4E8;">, value: </span><span style="color:#9ECBFF;">&#39;add&#39;</span><span style="color:#E1E4E8;">, params: [Array] } ]</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// parser(tokenizer(&quot;(add 2 (subtract 4 2))&quot;)) 结果如下:</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">type</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;Program&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">body</span><span style="color:#24292E;">: [ { type: </span><span style="color:#032F62;">&#39;CallExpression&#39;</span><span style="color:#24292E;">, value: </span><span style="color:#032F62;">&#39;add&#39;</span><span style="color:#24292E;">, params: [Array] } ]</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div></details><h3 id="_4-3-遍历和访问生成好的-ast" tabindex="-1">4.3 遍历和访问生成好的 AST <a class="header-anchor" href="#_4-3-遍历和访问生成好的-ast" aria-label="Permalink to &quot;4.3 遍历和访问生成好的 AST&quot;">​</a></h3><p>traverser(也称为 AST traverser)指的是一种遍历程序抽象语法树（AST）节点的工具或程序,traverser 可以遍历 AST 树的节点,并对这些节点进行处理。一些常见的 traverser 操作包括查找、替换、修改、生成代码等。生成 AST 后为了访问和操作节点,需要通过 traverser 的访问器访问不同的节点,当遇到不同的节点的时候,调用访问器的不同函数,格式大致如下:</p><details class="details custom-block"><summary>访问器格式</summary><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">//  traverse(ast,visitor)迭代器(抽象语法树,访问器)</span></span>
<span class="line"><span style="color:#B392F0;">traverse</span><span style="color:#E1E4E8;">(ast, {</span></span>
<span class="line"><span style="color:#E1E4E8;">  Program: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">enter</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">node</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">parent</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">exit</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">node</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">parent</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  CallExpression: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">enter</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">node</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">parent</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">exit</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">node</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">parent</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  NumberLiteral: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">enter</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">node</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">parent</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">exit</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">node</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">parent</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">//  traverse(ast,visitor)迭代器(抽象语法树,访问器)</span></span>
<span class="line"><span style="color:#6F42C1;">traverse</span><span style="color:#24292E;">(ast, {</span></span>
<span class="line"><span style="color:#24292E;">  Program: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">enter</span><span style="color:#24292E;">(</span><span style="color:#E36209;">node</span><span style="color:#24292E;">, </span><span style="color:#E36209;">parent</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">exit</span><span style="color:#24292E;">(</span><span style="color:#E36209;">node</span><span style="color:#24292E;">, </span><span style="color:#E36209;">parent</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  CallExpression: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">enter</span><span style="color:#24292E;">(</span><span style="color:#E36209;">node</span><span style="color:#24292E;">, </span><span style="color:#E36209;">parent</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">exit</span><span style="color:#24292E;">(</span><span style="color:#E36209;">node</span><span style="color:#24292E;">, </span><span style="color:#E36209;">parent</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  NumberLiteral: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">enter</span><span style="color:#24292E;">(</span><span style="color:#E36209;">node</span><span style="color:#24292E;">, </span><span style="color:#E36209;">parent</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">exit</span><span style="color:#24292E;">(</span><span style="color:#E36209;">node</span><span style="color:#24292E;">, </span><span style="color:#E36209;">parent</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">});</span></span></code></pre></div></details><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * traverser提供了访问AST节点的功能</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">{*}</span><span style="color:#6A737D;"> </span><span style="color:#E1E4E8;">ast</span><span style="color:#6A737D;"> 经过parser()生成后的抽象语法树</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">{*}</span><span style="color:#6A737D;"> </span><span style="color:#E1E4E8;">visitor</span><span style="color:#6A737D;"> 访问器,用于访问AST中的节点</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">traverser</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">ast</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">visitor</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 遍历数组,在遍历数组的同时会调用traverseNode来遍历节点</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">traverseArray</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">array</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">parent</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    array.</span><span style="color:#B392F0;">forEach</span><span style="color:#E1E4E8;">((</span><span style="color:#FFAB70;">child</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">traverseNode</span><span style="color:#E1E4E8;">(child, parent);</span></span>
<span class="line"><span style="color:#E1E4E8;">    });</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">traverseNode</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">node</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">parent</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 判断访问器中是否有合适处理该节点的函数</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> methods </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> visitor[node.type];</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 如果有就执行enter函数,因为此时已经进入这个节点了</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (methods </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> methods.enter) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      methods.</span><span style="color:#B392F0;">enter</span><span style="color:#E1E4E8;">(node, parent);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 接下来根据node节点类型来处理</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">switch</span><span style="color:#E1E4E8;"> (node.type) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">case</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;Program&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 如果当前节点是ast的根部，就相当于树根，body中的每一项都是一个分支</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">traverseArray</span><span style="color:#E1E4E8;">(node.body, node);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">break</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">case</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;CallExpression&quot;</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 这个和Program一样处理,但是这里是为了遍历params,上面是为了遍历分支</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">traverseArray</span><span style="color:#E1E4E8;">(node.params, node);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">break</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 字符串和数字没有子节点需要访问直接跳过</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">case</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;NumberLiteral&quot;</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">case</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;StringLiteral&quot;</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">break</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 最后容错处理</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">throw</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">TypeError</span><span style="color:#E1E4E8;">(node.type);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 当执行到这里时，说明该节点（分支）已经遍历到尽头了，执行exit</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (methods </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> methods.exit) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      methods.</span><span style="color:#B392F0;">exit</span><span style="color:#E1E4E8;">(node, parent);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 从ast开始进行节点遍历,因为ast没有父节点所以传入null</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">traverseNode</span><span style="color:#E1E4E8;">(ast, </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * traverser提供了访问AST节点的功能</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">{*}</span><span style="color:#6A737D;"> </span><span style="color:#24292E;">ast</span><span style="color:#6A737D;"> 经过parser()生成后的抽象语法树</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">{*}</span><span style="color:#6A737D;"> </span><span style="color:#24292E;">visitor</span><span style="color:#6A737D;"> 访问器,用于访问AST中的节点</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">traverser</span><span style="color:#24292E;">(</span><span style="color:#E36209;">ast</span><span style="color:#24292E;">, </span><span style="color:#E36209;">visitor</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 遍历数组,在遍历数组的同时会调用traverseNode来遍历节点</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">traverseArray</span><span style="color:#24292E;">(</span><span style="color:#E36209;">array</span><span style="color:#24292E;">, </span><span style="color:#E36209;">parent</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    array.</span><span style="color:#6F42C1;">forEach</span><span style="color:#24292E;">((</span><span style="color:#E36209;">child</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">traverseNode</span><span style="color:#24292E;">(child, parent);</span></span>
<span class="line"><span style="color:#24292E;">    });</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">traverseNode</span><span style="color:#24292E;">(</span><span style="color:#E36209;">node</span><span style="color:#24292E;">, </span><span style="color:#E36209;">parent</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 判断访问器中是否有合适处理该节点的函数</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> methods </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> visitor[node.type];</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 如果有就执行enter函数,因为此时已经进入这个节点了</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (methods </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> methods.enter) {</span></span>
<span class="line"><span style="color:#24292E;">      methods.</span><span style="color:#6F42C1;">enter</span><span style="color:#24292E;">(node, parent);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 接下来根据node节点类型来处理</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">switch</span><span style="color:#24292E;"> (node.type) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">case</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;Program&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 如果当前节点是ast的根部，就相当于树根，body中的每一项都是一个分支</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">traverseArray</span><span style="color:#24292E;">(node.body, node);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">break</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">case</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;CallExpression&quot;</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 这个和Program一样处理,但是这里是为了遍历params,上面是为了遍历分支</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">traverseArray</span><span style="color:#24292E;">(node.params, node);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">break</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 字符串和数字没有子节点需要访问直接跳过</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">case</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;NumberLiteral&quot;</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">case</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;StringLiteral&quot;</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">break</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 最后容错处理</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">default</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">throw</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">TypeError</span><span style="color:#24292E;">(node.type);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 当执行到这里时，说明该节点（分支）已经遍历到尽头了，执行exit</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (methods </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> methods.exit) {</span></span>
<span class="line"><span style="color:#24292E;">      methods.</span><span style="color:#6F42C1;">exit</span><span style="color:#24292E;">(node, parent);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 从ast开始进行节点遍历,因为ast没有父节点所以传入null</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">traverseNode</span><span style="color:#24292E;">(ast, </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="_4-4-transformer-转换" tabindex="-1">4.4 Transformer 转换 <a class="header-anchor" href="#_4-4-transformer-转换" aria-label="Permalink to &quot;4.4 Transformer 转换&quot;">​</a></h3><p>现在已经生成好 AST 了,需要通过转换器生成的 AST 转化为新的 AST,新生成的 AST 相比较源 AST 具有更多节点信息,例如声明表达式(ExpressionStatement)、调用表达式(CallExpression)、标识符(Identifier)等信息。</p><details class="details custom-block"><summary>AST 转换前后的结构对比</summary><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// AST转换前的结构</span></span>
<span class="line"><span style="color:#E1E4E8;">[</span></span>
<span class="line"><span style="color:#E1E4E8;">  { type: </span><span style="color:#9ECBFF;">&quot;paren&quot;</span><span style="color:#E1E4E8;">, value: </span><span style="color:#9ECBFF;">&quot;(&quot;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">  { type: </span><span style="color:#9ECBFF;">&quot;name&quot;</span><span style="color:#E1E4E8;">, value: </span><span style="color:#9ECBFF;">&quot;add&quot;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">  { type: </span><span style="color:#9ECBFF;">&quot;number&quot;</span><span style="color:#E1E4E8;">, value: </span><span style="color:#9ECBFF;">&quot;2&quot;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">  { type: </span><span style="color:#9ECBFF;">&quot;paren&quot;</span><span style="color:#E1E4E8;">, value: </span><span style="color:#9ECBFF;">&quot;(&quot;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">  { type: </span><span style="color:#9ECBFF;">&quot;name&quot;</span><span style="color:#E1E4E8;">, value: </span><span style="color:#9ECBFF;">&quot;subtract&quot;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">  { type: </span><span style="color:#9ECBFF;">&quot;number&quot;</span><span style="color:#E1E4E8;">, value: </span><span style="color:#9ECBFF;">&quot;4&quot;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">  { type: </span><span style="color:#9ECBFF;">&quot;number&quot;</span><span style="color:#E1E4E8;">, value: </span><span style="color:#9ECBFF;">&quot;2&quot;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">  { type: </span><span style="color:#9ECBFF;">&quot;paren&quot;</span><span style="color:#E1E4E8;">, value: </span><span style="color:#9ECBFF;">&quot;)&quot;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">  { type: </span><span style="color:#9ECBFF;">&quot;paren&quot;</span><span style="color:#E1E4E8;">, value: </span><span style="color:#9ECBFF;">&quot;)&quot;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">];</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// AST转换后的结构</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">type</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Program&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">body</span><span style="color:#E1E4E8;">: [</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">      type: </span><span style="color:#9ECBFF;">&quot;ExpressionStatement&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      expression: [</span></span>
<span class="line"><span style="color:#E1E4E8;">        {</span></span>
<span class="line"><span style="color:#E1E4E8;">          type: </span><span style="color:#9ECBFF;">&quot;ExpressionStatement&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          expression: {</span></span>
<span class="line"><span style="color:#E1E4E8;">            type: </span><span style="color:#9ECBFF;">&quot;CallExpression&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">            callee: { type: </span><span style="color:#9ECBFF;">&quot;Identifier&quot;</span><span style="color:#E1E4E8;">, name: </span><span style="color:#9ECBFF;">&quot;add&quot;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">            arguments: [</span></span>
<span class="line"><span style="color:#E1E4E8;">              { type: </span><span style="color:#9ECBFF;">&quot;NumberLiteral&quot;</span><span style="color:#E1E4E8;">, value: </span><span style="color:#9ECBFF;">&quot;2&quot;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">              {</span></span>
<span class="line"><span style="color:#E1E4E8;">                type: </span><span style="color:#9ECBFF;">&quot;CallExpression&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">                callee: { type: </span><span style="color:#9ECBFF;">&quot;Identifier&quot;</span><span style="color:#E1E4E8;">, name: </span><span style="color:#9ECBFF;">&quot;subtract&quot;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">                arguments: [</span></span>
<span class="line"><span style="color:#E1E4E8;">                  { type: </span><span style="color:#9ECBFF;">&quot;NumberLiteral&quot;</span><span style="color:#E1E4E8;">, value: </span><span style="color:#9ECBFF;">&quot;4&quot;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">                  { type: </span><span style="color:#9ECBFF;">&quot;NumberLiteral&quot;</span><span style="color:#E1E4E8;">, value: </span><span style="color:#9ECBFF;">&quot;2&quot;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">                ],</span></span>
<span class="line"><span style="color:#E1E4E8;">              },</span></span>
<span class="line"><span style="color:#E1E4E8;">            ],</span></span>
<span class="line"><span style="color:#E1E4E8;">          },</span></span>
<span class="line"><span style="color:#E1E4E8;">        },</span></span>
<span class="line"><span style="color:#E1E4E8;">      ],</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">  ],</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// AST转换前的结构</span></span>
<span class="line"><span style="color:#24292E;">[</span></span>
<span class="line"><span style="color:#24292E;">  { type: </span><span style="color:#032F62;">&quot;paren&quot;</span><span style="color:#24292E;">, value: </span><span style="color:#032F62;">&quot;(&quot;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">  { type: </span><span style="color:#032F62;">&quot;name&quot;</span><span style="color:#24292E;">, value: </span><span style="color:#032F62;">&quot;add&quot;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">  { type: </span><span style="color:#032F62;">&quot;number&quot;</span><span style="color:#24292E;">, value: </span><span style="color:#032F62;">&quot;2&quot;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">  { type: </span><span style="color:#032F62;">&quot;paren&quot;</span><span style="color:#24292E;">, value: </span><span style="color:#032F62;">&quot;(&quot;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">  { type: </span><span style="color:#032F62;">&quot;name&quot;</span><span style="color:#24292E;">, value: </span><span style="color:#032F62;">&quot;subtract&quot;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">  { type: </span><span style="color:#032F62;">&quot;number&quot;</span><span style="color:#24292E;">, value: </span><span style="color:#032F62;">&quot;4&quot;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">  { type: </span><span style="color:#032F62;">&quot;number&quot;</span><span style="color:#24292E;">, value: </span><span style="color:#032F62;">&quot;2&quot;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">  { type: </span><span style="color:#032F62;">&quot;paren&quot;</span><span style="color:#24292E;">, value: </span><span style="color:#032F62;">&quot;)&quot;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">  { type: </span><span style="color:#032F62;">&quot;paren&quot;</span><span style="color:#24292E;">, value: </span><span style="color:#032F62;">&quot;)&quot;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">];</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// AST转换后的结构</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">type</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Program&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">body</span><span style="color:#24292E;">: [</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">      type: </span><span style="color:#032F62;">&quot;ExpressionStatement&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      expression: [</span></span>
<span class="line"><span style="color:#24292E;">        {</span></span>
<span class="line"><span style="color:#24292E;">          type: </span><span style="color:#032F62;">&quot;ExpressionStatement&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">          expression: {</span></span>
<span class="line"><span style="color:#24292E;">            type: </span><span style="color:#032F62;">&quot;CallExpression&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">            callee: { type: </span><span style="color:#032F62;">&quot;Identifier&quot;</span><span style="color:#24292E;">, name: </span><span style="color:#032F62;">&quot;add&quot;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">            arguments: [</span></span>
<span class="line"><span style="color:#24292E;">              { type: </span><span style="color:#032F62;">&quot;NumberLiteral&quot;</span><span style="color:#24292E;">, value: </span><span style="color:#032F62;">&quot;2&quot;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">              {</span></span>
<span class="line"><span style="color:#24292E;">                type: </span><span style="color:#032F62;">&quot;CallExpression&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">                callee: { type: </span><span style="color:#032F62;">&quot;Identifier&quot;</span><span style="color:#24292E;">, name: </span><span style="color:#032F62;">&quot;subtract&quot;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">                arguments: [</span></span>
<span class="line"><span style="color:#24292E;">                  { type: </span><span style="color:#032F62;">&quot;NumberLiteral&quot;</span><span style="color:#24292E;">, value: </span><span style="color:#032F62;">&quot;4&quot;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">                  { type: </span><span style="color:#032F62;">&quot;NumberLiteral&quot;</span><span style="color:#24292E;">, value: </span><span style="color:#032F62;">&quot;2&quot;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">                ],</span></span>
<span class="line"><span style="color:#24292E;">              },</span></span>
<span class="line"><span style="color:#24292E;">            ],</span></span>
<span class="line"><span style="color:#24292E;">          },</span></span>
<span class="line"><span style="color:#24292E;">        },</span></span>
<span class="line"><span style="color:#24292E;">      ],</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">  ],</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div></details><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * transformer(转换器)用于将输入的AST转换为新的AST</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">{*}</span><span style="color:#6A737D;"> </span><span style="color:#E1E4E8;">ast</span><span style="color:#6A737D;"> 输入的ast</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@return</span><span style="color:#6A737D;"> newAst 经过转换后的ast</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">transformer</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">ast</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 将要被返回的新的AST</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> newAst </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    type: </span><span style="color:#9ECBFF;">&quot;Program&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    body: [],</span></span>
<span class="line"><span style="color:#E1E4E8;">  };</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">/** 这里相当于将在旧的AST上创建一个_content,这个属性就是新AST的body,</span></span>
<span class="line"><span style="color:#6A737D;">   * 因为是引用,所以后面可以直接操作就的AST</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#E1E4E8;">  ast._context </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> newAst.body;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 使用之前创建的访问器来访问这个AST的所有节点</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">traverser</span><span style="color:#E1E4E8;">(ast, {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 针对于数字片段的处理</span></span>
<span class="line"><span style="color:#E1E4E8;">    NumberLiteral: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">enter</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">node</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">parent</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 创建一个新的节点,其实就是创建新AST的节点,这个新节点存在于父节点的body中</span></span>
<span class="line"><span style="color:#E1E4E8;">        parent._context.</span><span style="color:#B392F0;">push</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">          type: </span><span style="color:#9ECBFF;">&quot;NumberLiteral&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          value: node.value,</span></span>
<span class="line"><span style="color:#E1E4E8;">        });</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 针对于字符串片段的处理</span></span>
<span class="line"><span style="color:#E1E4E8;">    StringLiteral: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">enter</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">node</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">parent</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        parent._context.</span><span style="color:#B392F0;">push</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">          type: </span><span style="color:#9ECBFF;">&quot;StringLiteral&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          value: node.value,</span></span>
<span class="line"><span style="color:#E1E4E8;">        });</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 针对调用语句的处理</span></span>
<span class="line"><span style="color:#E1E4E8;">    CallExpression: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">enter</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">node</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">parent</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 在新的AST中如果是调用语句,type是\`CallExpression\`,同时还有一个\`Identifier\`来标识操作</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> expression </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">          type: </span><span style="color:#9ECBFF;">&quot;CallExpression&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          callee: {</span></span>
<span class="line"><span style="color:#E1E4E8;">            type: </span><span style="color:#9ECBFF;">&quot;Identifier&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">            name: node.value,</span></span>
<span class="line"><span style="color:#E1E4E8;">          },</span></span>
<span class="line"><span style="color:#E1E4E8;">          arguments: [],</span></span>
<span class="line"><span style="color:#E1E4E8;">        };</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">         * 在原来的节点上再创建一个新的属性,用于存放参数,这样当子节点修改_context时，</span></span>
<span class="line"><span style="color:#6A737D;">         * 会同步到expression.arguments中,这里用的是同一个内存地址</span></span>
<span class="line"><span style="color:#6A737D;">         */</span></span>
<span class="line"><span style="color:#E1E4E8;">        node._context </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> expression.arguments;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">         * 这里需要判断父节点是否是调用语句,如果不是,那么就使用</span></span>
<span class="line"><span style="color:#6A737D;">         * \`ExpressionStatement\`将\`CallExpression\`包裹,</span></span>
<span class="line"><span style="color:#6A737D;">         * 因为js中顶层的\`CallExpression\`是有效语句</span></span>
<span class="line"><span style="color:#6A737D;">         */</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (parent.type </span><span style="color:#F97583;">!==</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;CallExpression&quot;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">          expression </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">            type: </span><span style="color:#9ECBFF;">&quot;ExpressionStatement&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">            expression: expression,</span></span>
<span class="line"><span style="color:#E1E4E8;">          };</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        parent._context.</span><span style="color:#B392F0;">push</span><span style="color:#E1E4E8;">(expression);</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">  });</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> newAst;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * transformer(转换器)用于将输入的AST转换为新的AST</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">{*}</span><span style="color:#6A737D;"> </span><span style="color:#24292E;">ast</span><span style="color:#6A737D;"> 输入的ast</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@return</span><span style="color:#6A737D;"> newAst 经过转换后的ast</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">transformer</span><span style="color:#24292E;">(</span><span style="color:#E36209;">ast</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 将要被返回的新的AST</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> newAst </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    type: </span><span style="color:#032F62;">&quot;Program&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    body: [],</span></span>
<span class="line"><span style="color:#24292E;">  };</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">/** 这里相当于将在旧的AST上创建一个_content,这个属性就是新AST的body,</span></span>
<span class="line"><span style="color:#6A737D;">   * 因为是引用,所以后面可以直接操作就的AST</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#24292E;">  ast._context </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> newAst.body;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 使用之前创建的访问器来访问这个AST的所有节点</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">traverser</span><span style="color:#24292E;">(ast, {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 针对于数字片段的处理</span></span>
<span class="line"><span style="color:#24292E;">    NumberLiteral: {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">enter</span><span style="color:#24292E;">(</span><span style="color:#E36209;">node</span><span style="color:#24292E;">, </span><span style="color:#E36209;">parent</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 创建一个新的节点,其实就是创建新AST的节点,这个新节点存在于父节点的body中</span></span>
<span class="line"><span style="color:#24292E;">        parent._context.</span><span style="color:#6F42C1;">push</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">          type: </span><span style="color:#032F62;">&quot;NumberLiteral&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">          value: node.value,</span></span>
<span class="line"><span style="color:#24292E;">        });</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 针对于字符串片段的处理</span></span>
<span class="line"><span style="color:#24292E;">    StringLiteral: {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">enter</span><span style="color:#24292E;">(</span><span style="color:#E36209;">node</span><span style="color:#24292E;">, </span><span style="color:#E36209;">parent</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        parent._context.</span><span style="color:#6F42C1;">push</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">          type: </span><span style="color:#032F62;">&quot;StringLiteral&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">          value: node.value,</span></span>
<span class="line"><span style="color:#24292E;">        });</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 针对调用语句的处理</span></span>
<span class="line"><span style="color:#24292E;">    CallExpression: {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">enter</span><span style="color:#24292E;">(</span><span style="color:#E36209;">node</span><span style="color:#24292E;">, </span><span style="color:#E36209;">parent</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 在新的AST中如果是调用语句,type是\`CallExpression\`,同时还有一个\`Identifier\`来标识操作</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> expression </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">          type: </span><span style="color:#032F62;">&quot;CallExpression&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">          callee: {</span></span>
<span class="line"><span style="color:#24292E;">            type: </span><span style="color:#032F62;">&quot;Identifier&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">            name: node.value,</span></span>
<span class="line"><span style="color:#24292E;">          },</span></span>
<span class="line"><span style="color:#24292E;">          arguments: [],</span></span>
<span class="line"><span style="color:#24292E;">        };</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">         * 在原来的节点上再创建一个新的属性,用于存放参数,这样当子节点修改_context时，</span></span>
<span class="line"><span style="color:#6A737D;">         * 会同步到expression.arguments中,这里用的是同一个内存地址</span></span>
<span class="line"><span style="color:#6A737D;">         */</span></span>
<span class="line"><span style="color:#24292E;">        node._context </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> expression.arguments;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">         * 这里需要判断父节点是否是调用语句,如果不是,那么就使用</span></span>
<span class="line"><span style="color:#6A737D;">         * \`ExpressionStatement\`将\`CallExpression\`包裹,</span></span>
<span class="line"><span style="color:#6A737D;">         * 因为js中顶层的\`CallExpression\`是有效语句</span></span>
<span class="line"><span style="color:#6A737D;">         */</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (parent.type </span><span style="color:#D73A49;">!==</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;CallExpression&quot;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">          expression </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">            type: </span><span style="color:#032F62;">&quot;ExpressionStatement&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">            expression: expression,</span></span>
<span class="line"><span style="color:#24292E;">          };</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        parent._context.</span><span style="color:#6F42C1;">push</span><span style="color:#24292E;">(expression);</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">  });</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> newAst;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="_4-5-新代码生成" tabindex="-1">4.5 新代码生成 <a class="header-anchor" href="#_4-5-新代码生成" aria-label="Permalink to &quot;4.5 新代码生成&quot;">​</a></h3><p>最后一步:新代码生成,根据转换后的 AST,遍历其每一个节点,根据指定规则生成最终新的代码。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">codeGenerator</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">node</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 根据AST节点的种类拆解</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">switch</span><span style="color:#E1E4E8;"> (node.type) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">     * 如果是Program,表示节点是AST的最根部了,节点的body中的每一项</span></span>
<span class="line"><span style="color:#6A737D;">     * 就是一个分支,需要将每一个分支都放入代码生成器中</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">case</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;Program&quot;</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> node.body.</span><span style="color:#B392F0;">map</span><span style="color:#E1E4E8;">(codeGenerator).</span><span style="color:#B392F0;">join</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#79B8FF;">\\n</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">     * 如果是声明语句注意看新的AST结构,那么在声明语句中expression,就是声明的标示,</span></span>
<span class="line"><span style="color:#6A737D;">     * 以他为参数再次调用codeGenerator</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">case</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;ExpressionStatement&quot;</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">codeGenerator</span><span style="color:#E1E4E8;">(node.expression) </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;;&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 如果是调用语句,则打印出调用者的名字加括号,中间放置参数如生成这样&quot;add(2,2)&quot;,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">case</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;CallExpression&quot;</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">codeGenerator</span><span style="color:#E1E4E8;">(node.callee) </span><span style="color:#F97583;">+</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">&quot;(&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span></span>
<span class="line"><span style="color:#E1E4E8;">        node.arguments.</span><span style="color:#B392F0;">map</span><span style="color:#E1E4E8;">(codeGenerator).</span><span style="color:#B392F0;">join</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;, &quot;</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">+</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">&quot;)&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      );</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 如果是识别就直接返回值,如:(add 2 2),在新AST中 add 就是identifier节点</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">case</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;Identifier&quot;</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> node.name;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 如果是数字则直接返回该值</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">case</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;NumberLiteral&quot;</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> node.value;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 如果是文本则用双引号包裹文本</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">case</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;StringLiteral&quot;</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;&quot;&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> node.value </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;&quot;&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 容错处理</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">throw</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">TypeError</span><span style="color:#E1E4E8;">(node.type);</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">codeGenerator</span><span style="color:#24292E;">(</span><span style="color:#E36209;">node</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 根据AST节点的种类拆解</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">switch</span><span style="color:#24292E;"> (node.type) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">     * 如果是Program,表示节点是AST的最根部了,节点的body中的每一项</span></span>
<span class="line"><span style="color:#6A737D;">     * 就是一个分支,需要将每一个分支都放入代码生成器中</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">case</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;Program&quot;</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> node.body.</span><span style="color:#6F42C1;">map</span><span style="color:#24292E;">(codeGenerator).</span><span style="color:#6F42C1;">join</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;</span><span style="color:#005CC5;">\\n</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">     * 如果是声明语句注意看新的AST结构,那么在声明语句中expression,就是声明的标示,</span></span>
<span class="line"><span style="color:#6A737D;">     * 以他为参数再次调用codeGenerator</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">case</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;ExpressionStatement&quot;</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">codeGenerator</span><span style="color:#24292E;">(node.expression) </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;;&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 如果是调用语句,则打印出调用者的名字加括号,中间放置参数如生成这样&quot;add(2,2)&quot;,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">case</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;CallExpression&quot;</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">codeGenerator</span><span style="color:#24292E;">(node.callee) </span><span style="color:#D73A49;">+</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">&quot;(&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span></span>
<span class="line"><span style="color:#24292E;">        node.arguments.</span><span style="color:#6F42C1;">map</span><span style="color:#24292E;">(codeGenerator).</span><span style="color:#6F42C1;">join</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;, &quot;</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">+</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">&quot;)&quot;</span></span>
<span class="line"><span style="color:#24292E;">      );</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 如果是识别就直接返回值,如:(add 2 2),在新AST中 add 就是identifier节点</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">case</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;Identifier&quot;</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> node.name;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 如果是数字则直接返回该值</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">case</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;NumberLiteral&quot;</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> node.value;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 如果是文本则用双引号包裹文本</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">case</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;StringLiteral&quot;</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;&quot;&#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> node.value </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;&quot;&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 容错处理</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">default</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">throw</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">TypeError</span><span style="color:#24292E;">(node.type);</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="_4-6-compiler-的整体流程" tabindex="-1">4.6 compiler 的整体流程 <a class="header-anchor" href="#_4-6-compiler-的整体流程" aria-label="Permalink to &quot;4.6 compiler 的整体流程&quot;">​</a></h3><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * 编译器,根据输入代码(input)编译成新的代码</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E1E4E8;">input</span><span style="color:#6A737D;"> 输入代码</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">compiler</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">input</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> tokens </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">tokenizer</span><span style="color:#E1E4E8;">(input); </span><span style="color:#6A737D;">//生成tokens</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> ast </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">parser</span><span style="color:#E1E4E8;">(tokens); </span><span style="color:#6A737D;">//生成ast</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> newAst </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">transformer</span><span style="color:#E1E4E8;">(ast); </span><span style="color:#6A737D;">//拿到新的ast</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> output </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">codeGenerator</span><span style="color:#E1E4E8;">(newAst); </span><span style="color:#6A737D;">//生成新代码</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> output;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">compiler</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;(add 2 (subtract 4 2))&quot;</span><span style="color:#E1E4E8;">)); </span><span style="color:#6A737D;">// add(2, subtract(4, 2));</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * 编译器,根据输入代码(input)编译成新的代码</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#24292E;">input</span><span style="color:#6A737D;"> 输入代码</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">compiler</span><span style="color:#24292E;">(</span><span style="color:#E36209;">input</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> tokens </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">tokenizer</span><span style="color:#24292E;">(input); </span><span style="color:#6A737D;">//生成tokens</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> ast </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">parser</span><span style="color:#24292E;">(tokens); </span><span style="color:#6A737D;">//生成ast</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> newAst </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">transformer</span><span style="color:#24292E;">(ast); </span><span style="color:#6A737D;">//拿到新的ast</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> output </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">codeGenerator</span><span style="color:#24292E;">(newAst); </span><span style="color:#6A737D;">//生成新代码</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> output;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">compiler</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;(add 2 (subtract 4 2))&quot;</span><span style="color:#24292E;">)); </span><span style="color:#6A737D;">// add(2, subtract(4, 2));</span></span></code></pre></div><h2 id="_5-babel-的编译流程" tabindex="-1">5.Babel 的编译流程 <a class="header-anchor" href="#_5-babel-的编译流程" aria-label="Permalink to &quot;5.Babel 的编译流程&quot;">​</a></h2><h3 id="_5-1-babel-整体编译流程" tabindex="-1">5.1 Babel 整体编译流程 <a class="header-anchor" href="#_5-1-babel-整体编译流程" aria-label="Permalink to &quot;5.1 Babel 整体编译流程&quot;">​</a></h3><p>Babel 是 source to source 的转换,其本质是一个编译器,整体编译步骤分为三步:</p><ul><li>parse(解析):通过 parser 把输入源码转成抽象语法树(AST)。</li><li>transform(转换):遍历 AST,调用各种 transform 插件对 AST 进行增删改操作。</li><li>generate(代码生成):把转换后的 AST 输出成目标代码,并生成 sourcemap。</li></ul><p><img src="`+o+`" alt="babel"></p><h3 id="_5-2-babel-的-ast" tabindex="-1">5.2 Babel 的 AST <a class="header-anchor" href="#_5-2-babel-的-ast" aria-label="Permalink to &quot;5.2 Babel 的 AST&quot;">​</a></h3><p>Babel 编译的第一步是把源码 parse 成抽象语法树,transform 阶段会对 AST 进行转换生成一棵新的 AST。AST 是对源码的抽象,字面量、标识符、表达式、语句、模块语法、class 语法都有各种的 AST。通过<code>axtexplorer.net</code>这个网站可以以可视化的方式查看源码解析后的 AST。</p><h4 id="_5-2-1-literal" tabindex="-1">5.2.1 Literal <a class="header-anchor" href="#_5-2-1-literal" aria-label="Permalink to &quot;5.2.1 Literal&quot;">​</a></h4><p>Literal 是字面量的意思,例如<code>let name = &#39;feng&#39;</code>中,feng 就是一个字符串字面量,AST 使用 StringLiteral 表示,除了 StringLiteral,AST 还提供了 NumberLiteral(数字字面量)、BooleanLiteral(布尔字面量)、RegexLiteral(正则表达式字面量)等。字面量与 AST Literal 节点对应关系如下:</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#9ECBFF;">&#39;feng&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> StringLiteral</span></span>
<span class="line"><span style="color:#9ECBFF;">\`template\`</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> TemplateLiteral</span></span>
<span class="line"><span style="color:#79B8FF;">123</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> NumberLiteral</span></span>
<span class="line"><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> BooleanLiteral</span></span>
<span class="line"><span style="color:#9ECBFF;">/</span><span style="color:#F97583;">^</span><span style="color:#79B8FF;">[a-z]</span><span style="color:#F97583;">+</span><span style="color:#9ECBFF;">/</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> 、RegexLiteral</span></span>
<span class="line"><span style="color:#79B8FF;">1.21234</span><span style="color:#F97583;">n</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> BigintLiteral</span></span>
<span class="line"><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> NullLiteral</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#032F62;">&#39;feng&#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> StringLiteral</span></span>
<span class="line"><span style="color:#032F62;">\`template\`</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> TemplateLiteral</span></span>
<span class="line"><span style="color:#005CC5;">123</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> NumberLiteral</span></span>
<span class="line"><span style="color:#005CC5;">true</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> BooleanLiteral</span></span>
<span class="line"><span style="color:#032F62;">/</span><span style="color:#D73A49;">^</span><span style="color:#005CC5;">[a-z]</span><span style="color:#D73A49;">+</span><span style="color:#032F62;">/</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> 、RegexLiteral</span></span>
<span class="line"><span style="color:#005CC5;">1.21234</span><span style="color:#D73A49;">n</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> BigintLiteral</span></span>
<span class="line"><span style="color:#005CC5;">null</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> NullLiteral</span></span></code></pre></div><h4 id="_5-2-2-identifier" tabindex="-1">5.2.2 Identifier <a class="header-anchor" href="#_5-2-2-identifier" aria-label="Permalink to &quot;5.2.2 Identifier&quot;">​</a></h4><p>Identifier 是标识符的意思,变量名、属性名、参数名等各种声明和引用的名字都算作 Identifier。例如:</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">name</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;feng&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">hello</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">name</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(name);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">obj</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> { name: </span><span style="color:#9ECBFF;">&quot;feng&quot;</span><span style="color:#E1E4E8;"> };</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * 其中 name、hello、hello函数的入参name、console、console的log、log输出的name、</span></span>
<span class="line"><span style="color:#6A737D;"> * obj、obj中的name都是Identifier</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">name</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;feng&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">hello</span><span style="color:#24292E;">(</span><span style="color:#E36209;">name</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(name);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">obj</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> { name: </span><span style="color:#032F62;">&quot;feng&quot;</span><span style="color:#24292E;"> };</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * 其中 name、hello、hello函数的入参name、console、console的log、log输出的name、</span></span>
<span class="line"><span style="color:#6A737D;"> * obj、obj中的name都是Identifier</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span></code></pre></div><h4 id="_5-2-3-statement" tabindex="-1">5.2.3 Statement <a class="header-anchor" href="#_5-2-3-statement" aria-label="Permalink to &quot;5.2.3 Statement&quot;">​</a></h4><p>Statement 的意思是语句,它是可以独立执行的单位,例如 break、continue、debugger、return、if 语句、while、for、声明语句、表达式语句等。代码中每一条可以独立执行的都是语句,语句末尾一般会添加一个分号分隔,或者用换行符分隔。语句与 AST Statement 节点对应关系如下:</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">break</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> BreakStatement</span></span>
<span class="line"><span style="color:#F97583;">continue</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> ContinueStatement</span></span>
<span class="line"><span style="color:#F97583;">debugger</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> DebuggerStatement</span></span>
<span class="line"><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> ReturnStatement</span></span>
<span class="line"><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> IfStatement</span></span>
<span class="line"><span style="color:#F97583;">throw</span><span style="color:#E1E4E8;"> Error </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> ThrowStatement</span></span>
<span class="line"><span style="color:#E1E4E8;">{} </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> BlockStatement</span></span>
<span class="line"><span style="color:#F97583;">try</span><span style="color:#E1E4E8;"> {} </span><span style="color:#F97583;">catch</span><span style="color:#E1E4E8;">(e){} </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> TryStatement</span></span>
<span class="line"><span style="color:#F97583;">for</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> key </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> obj){} </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> ForInStatement</span></span>
<span class="line"><span style="color:#F97583;">for</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> i</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">;i</span><span style="color:#F97583;">&lt;</span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;">;i</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">){} </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> ForStatement</span></span>
<span class="line"><span style="color:#F97583;">while</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">){} </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> WhileStatement</span></span>
<span class="line"><span style="color:#F97583;">do</span><span style="color:#E1E4E8;">{} </span><span style="color:#F97583;">while</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">){} </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> DoWhileStatement</span></span>
<span class="line"><span style="color:#F97583;">switch</span><span style="color:#E1E4E8;">(v){</span><span style="color:#F97583;">case</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">:</span><span style="color:#F97583;">break</span><span style="color:#E1E4E8;">;</span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;">:</span><span style="color:#F97583;">break</span><span style="color:#E1E4E8;">;} </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> SwitchStatement</span></span>
<span class="line"><span style="color:#B392F0;">label</span><span style="color:#E1E4E8;">:console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(); </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> LabelStatement</span></span>
<span class="line"><span style="color:#F97583;">with</span><span style="color:#E1E4E8;">(obj){} </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> WithStatement</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">break</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> BreakStatement</span></span>
<span class="line"><span style="color:#D73A49;">continue</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> ContinueStatement</span></span>
<span class="line"><span style="color:#D73A49;">debugger</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> DebuggerStatement</span></span>
<span class="line"><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> ReturnStatement</span></span>
<span class="line"><span style="color:#D73A49;">if</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> IfStatement</span></span>
<span class="line"><span style="color:#D73A49;">throw</span><span style="color:#24292E;"> Error </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> ThrowStatement</span></span>
<span class="line"><span style="color:#24292E;">{} </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> BlockStatement</span></span>
<span class="line"><span style="color:#D73A49;">try</span><span style="color:#24292E;"> {} </span><span style="color:#D73A49;">catch</span><span style="color:#24292E;">(e){} </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> TryStatement</span></span>
<span class="line"><span style="color:#D73A49;">for</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> key </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> obj){} </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> ForInStatement</span></span>
<span class="line"><span style="color:#D73A49;">for</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> i</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">;i</span><span style="color:#D73A49;">&lt;</span><span style="color:#005CC5;">10</span><span style="color:#24292E;">;i</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">){} </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> ForStatement</span></span>
<span class="line"><span style="color:#D73A49;">while</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">true</span><span style="color:#24292E;">){} </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> WhileStatement</span></span>
<span class="line"><span style="color:#D73A49;">do</span><span style="color:#24292E;">{} </span><span style="color:#D73A49;">while</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">true</span><span style="color:#24292E;">){} </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> DoWhileStatement</span></span>
<span class="line"><span style="color:#D73A49;">switch</span><span style="color:#24292E;">(v){</span><span style="color:#D73A49;">case</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">:</span><span style="color:#D73A49;">break</span><span style="color:#24292E;">;</span><span style="color:#D73A49;">default</span><span style="color:#24292E;">:</span><span style="color:#D73A49;">break</span><span style="color:#24292E;">;} </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> SwitchStatement</span></span>
<span class="line"><span style="color:#6F42C1;">label</span><span style="color:#24292E;">:console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(); </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> LabelStatement</span></span>
<span class="line"><span style="color:#D73A49;">with</span><span style="color:#24292E;">(obj){} </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> WithStatement</span></span></code></pre></div><h4 id="_5-2-4-declaration" tabindex="-1">5.2.4 Declaration <a class="header-anchor" href="#_5-2-4-declaration" aria-label="Permalink to &quot;5.2.4 Declaration&quot;">​</a></h4><p>Declaration 表示声明语句,声明语句是一种特殊的语句,它执行的逻辑是在作用域内声明一个变量、函数、class、import、export 等。声明语句与 AST Declaration 节点对应关系如下:</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">a</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">; </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> VariableDeclaration</span></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">fn</span><span style="color:#E1E4E8;">(){} </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> FunctionDeclaration</span></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">A</span><span style="color:#E1E4E8;"> {} </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> ClassDeclaration</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> d </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./d&#39;</span><span style="color:#E1E4E8;"> -&gt; ImportDeclaration</span></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> (){} </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> ExportDefaultDeclaration</span></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> {name:&#39;feng&#39;} -&gt; ExportDeclaration</span></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">*</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./e&#39;</span><span style="color:#E1E4E8;"> -&gt; ExportAllDeclaration</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">a</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">; </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> VariableDeclaration</span></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">fn</span><span style="color:#24292E;">(){} </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> FunctionDeclaration</span></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">A</span><span style="color:#24292E;"> {} </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> ClassDeclaration</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> d </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./d&#39;</span><span style="color:#24292E;"> -&gt; ImportDeclaration</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> (){} </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> ExportDefaultDeclaration</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> {name:&#39;feng&#39;} -&gt; ExportDeclaration</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">*</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./e&#39;</span><span style="color:#24292E;"> -&gt; ExportAllDeclaration</span></span></code></pre></div><h4 id="_5-2-5-expression" tabindex="-1">5.2.5 Expression <a class="header-anchor" href="#_5-2-5-expression" aria-label="Permalink to &quot;5.2.5 Expression&quot;">​</a></h4><p>Expression 的意思是表达式,其特点是执行完成后有返回值,这是跟 Statement 的区别。表达式与 AST Expression 节点对应关系如下:</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">,</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">,</span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">] </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ArrayExpression</span><span style="color:#E1E4E8;">(数组表达式)</span></span>
<span class="line"><span style="color:#E1E4E8;">a </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">AssignmentExpression</span><span style="color:#E1E4E8;">(赋值表达式)</span></span>
<span class="line"><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">BinaryExpression</span><span style="color:#E1E4E8;">(二元表达式)</span></span>
<span class="line"><span style="color:#F97583;">-</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">UnaryExpression</span><span style="color:#E1E4E8;">(一元表达式)</span></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;">(){} </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">FunctionExpression</span><span style="color:#E1E4E8;">(函数表达式)</span></span>
<span class="line"><span style="color:#E1E4E8;">()</span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;">{} </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ArrowFunctionExpression</span><span style="color:#E1E4E8;">(箭头函数表达式)</span></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;">{} </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ClassExpression</span><span style="color:#E1E4E8;">(class表达式)</span></span>
<span class="line"><span style="color:#E1E4E8;">a </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Identifier</span><span style="color:#E1E4E8;">(标识符)</span></span>
<span class="line"><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ThisExpression</span><span style="color:#E1E4E8;">(this表达式)</span></span>
<span class="line"><span style="color:#79B8FF;">super</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Super</span><span style="color:#E1E4E8;">(super表达式)</span></span>
<span class="line"><span style="color:#B392F0;">a</span><span style="color:#E1E4E8;">::b </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">BindingExpression</span><span style="color:#E1E4E8;">(绑定表达式)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">,</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">,</span><span style="color:#005CC5;">3</span><span style="color:#24292E;">] </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ArrayExpression</span><span style="color:#24292E;">(数组表达式)</span></span>
<span class="line"><span style="color:#24292E;">a </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">AssignmentExpression</span><span style="color:#24292E;">(赋值表达式)</span></span>
<span class="line"><span style="color:#005CC5;">1</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">BinaryExpression</span><span style="color:#24292E;">(二元表达式)</span></span>
<span class="line"><span style="color:#D73A49;">-</span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">UnaryExpression</span><span style="color:#24292E;">(一元表达式)</span></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;">(){} </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">FunctionExpression</span><span style="color:#24292E;">(函数表达式)</span></span>
<span class="line"><span style="color:#24292E;">()</span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;">{} </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ArrowFunctionExpression</span><span style="color:#24292E;">(箭头函数表达式)</span></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;">{} </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ClassExpression</span><span style="color:#24292E;">(class表达式)</span></span>
<span class="line"><span style="color:#24292E;">a </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Identifier</span><span style="color:#24292E;">(标识符)</span></span>
<span class="line"><span style="color:#005CC5;">this</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ThisExpression</span><span style="color:#24292E;">(this表达式)</span></span>
<span class="line"><span style="color:#005CC5;">super</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Super</span><span style="color:#24292E;">(super表达式)</span></span>
<span class="line"><span style="color:#6F42C1;">a</span><span style="color:#24292E;">::b </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">BindingExpression</span><span style="color:#24292E;">(绑定表达式)</span></span></code></pre></div><h4 id="_5-2-6-class" tabindex="-1">5.2.6 Class <a class="header-anchor" href="#_5-2-6-class" aria-label="Permalink to &quot;5.2.6 Class&quot;">​</a></h4><p>class 的语法也有专门的 AST 节点来表示。整个 class 的内容是 ClassBody,属性是 ClassProperty,方法是 ClassMethod(通过 kind 属性来区分是 constructor 还是 method)。例如:</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Cat</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Animal</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">name</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;cat&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">constructor</span><span style="color:#E1E4E8;">() {}</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">eat</span><span style="color:#E1E4E8;">() {}</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 对应AST如下:</span></span>
<span class="line"><span style="color:#E1E4E8;">                  ClassDeclaration</span></span>
<span class="line"><span style="color:#E1E4E8;">                         </span><span style="color:#F97583;">|</span></span>
<span class="line"><span style="color:#E1E4E8;">                         </span><span style="color:#F97583;">|</span></span>
<span class="line"><span style="color:#E1E4E8;">                      ClassBody</span></span>
<span class="line"><span style="color:#E1E4E8;">                      </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;">   \\</span></span>
<span class="line"><span style="color:#E1E4E8;">                     </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">   </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;">    \\</span></span>
<span class="line"><span style="color:#E1E4E8;">                    </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;">     \\</span></span>
<span class="line"><span style="color:#E1E4E8;">                   </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">     </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;">      \\</span></span>
<span class="line"><span style="color:#E1E4E8;">   ClassProperty </span><span style="color:#B392F0;">ClassMethod</span><span style="color:#E1E4E8;">(kind</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&#39;constructor&#39;</span><span style="color:#E1E4E8;">) </span><span style="color:#B392F0;">ClassMethod</span><span style="color:#E1E4E8;">(kind</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&#39;method&#39;</span><span style="color:#E1E4E8;">)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Cat</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Animal</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">name</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;cat&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">constructor</span><span style="color:#24292E;">() {}</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">eat</span><span style="color:#24292E;">() {}</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 对应AST如下:</span></span>
<span class="line"><span style="color:#24292E;">                  ClassDeclaration</span></span>
<span class="line"><span style="color:#24292E;">                         </span><span style="color:#D73A49;">|</span></span>
<span class="line"><span style="color:#24292E;">                         </span><span style="color:#D73A49;">|</span></span>
<span class="line"><span style="color:#24292E;">                      ClassBody</span></span>
<span class="line"><span style="color:#24292E;">                      </span><span style="color:#D73A49;">/</span><span style="color:#24292E;">  </span><span style="color:#D73A49;">|</span><span style="color:#24292E;">   \\</span></span>
<span class="line"><span style="color:#24292E;">                     </span><span style="color:#D73A49;">/</span><span style="color:#24292E;">   </span><span style="color:#D73A49;">|</span><span style="color:#24292E;">    \\</span></span>
<span class="line"><span style="color:#24292E;">                    </span><span style="color:#D73A49;">/</span><span style="color:#24292E;">    </span><span style="color:#D73A49;">|</span><span style="color:#24292E;">     \\</span></span>
<span class="line"><span style="color:#24292E;">                   </span><span style="color:#D73A49;">/</span><span style="color:#24292E;">     </span><span style="color:#D73A49;">|</span><span style="color:#24292E;">      \\</span></span>
<span class="line"><span style="color:#24292E;">   ClassProperty </span><span style="color:#6F42C1;">ClassMethod</span><span style="color:#24292E;">(kind</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&#39;constructor&#39;</span><span style="color:#24292E;">) </span><span style="color:#6F42C1;">ClassMethod</span><span style="color:#24292E;">(kind</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&#39;method&#39;</span><span style="color:#24292E;">)</span></span></code></pre></div><h4 id="_5-2-7-module" tabindex="-1">5.2.7 Module <a class="header-anchor" href="#_5-2-7-module" aria-label="Permalink to &quot;5.2.7 Module&quot;">​</a></h4><p>ESModule 是语法级的模块规范,因此也有专门的 AST。ESModule 规范中使用 import 导入模块,export 导出模块,import 和 export 都有三种语法,Module 与 AST Expression 节点对应关系如下:</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> {a,b} </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./a&#39;</span><span style="color:#E1E4E8;"> -&gt; ImportDeclaration -&gt; ImportSpecifier(导入说明)</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> a </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./a&#39;</span><span style="color:#E1E4E8;"> -&gt; ImportDeclaration -&gt; ImportDefaultSpecifier(默认导入说明)</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">*</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> b </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./b&#39;</span><span style="color:#E1E4E8;"> -&gt; ImportDeclaration -&gt; ImportNamespaceSpecifier(命名导入说明)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> a; </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> ExportDefaultDeclaration </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ExportDefaultSpecifier</span><span style="color:#E1E4E8;">(默认导出说明)</span></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> {d,c} -&gt; ExportDefaultDeclaration -&gt; ExportNameSpecifier(命名导出说明)</span></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">*</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;c&#39;</span><span style="color:#E1E4E8;"> -&gt; ExportDefaultDeclaration -&gt; ExportAllSpecifiers(导出所有说明)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> {a,b} </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./a&#39;</span><span style="color:#24292E;"> -&gt; ImportDeclaration -&gt; ImportSpecifier(导入说明)</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> a </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./a&#39;</span><span style="color:#24292E;"> -&gt; ImportDeclaration -&gt; ImportDefaultSpecifier(默认导入说明)</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">*</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> b </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./b&#39;</span><span style="color:#24292E;"> -&gt; ImportDeclaration -&gt; ImportNamespaceSpecifier(命名导入说明)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> a; </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> ExportDefaultDeclaration </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ExportDefaultSpecifier</span><span style="color:#24292E;">(默认导出说明)</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> {d,c} -&gt; ExportDefaultDeclaration -&gt; ExportNameSpecifier(命名导出说明)</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">*</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;c&#39;</span><span style="color:#24292E;"> -&gt; ExportDefaultDeclaration -&gt; ExportAllSpecifiers(导出所有说明)</span></span></code></pre></div><h4 id="_5-2-8-file-comment" tabindex="-1">5.2.8 File &amp; Comment <a class="header-anchor" href="#_5-2-8-file-comment" aria-label="Permalink to &quot;5.2.8 File &amp; Comment&quot;">​</a></h4><p>Babel 的 AST 最外层节点是 File,它包含了 program、comments、tokens 等属性,分别存放 Program 程序题、注释、token 等信息,是最外层节点。</p><p>Comment 表示注释,注释分为块注释和行内注释,分别对应 CommentBlock 和 CommentLine 节点。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**块注释*/</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> CommentBlock</span></span>
<span class="line"><span style="color:#6A737D;">// 行内注释 -&gt; CommentLine</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**块注释*/</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> CommentBlock</span></span>
<span class="line"><span style="color:#6A737D;">// 行内注释 -&gt; CommentLine</span></span></code></pre></div>`,77),c=[t];function r(E,y,i,u,F,A){return a(),l("div",null,c)}const C=n(e,[["render",r]]);export{q as __pageData,C as default};
