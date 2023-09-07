import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.a9ea851b.js";const F=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"vue/features.md","filePath":"vue/features.md","lastUpdated":1694072565000}'),p={name:"vue/features.md"},o=l(`<h3 id="前言" tabindex="-1">前言 <a class="header-anchor" href="#前言" aria-label="Permalink to &quot;前言&quot;">​</a></h3><p>Vue 团队于 2020 年 9 月 18 日晚 11 点半发布了 Vue3.0 版本,截止当前时间(2021 年 10 月 21 日)Vue 最新版本是 v3.2.20,Vue3 采用 TypeScript 开发,对比 Vue2.x 无论是从开发体验、代码组织(Vue3.x 将不同功能拆分为不同模块)、运行性能等方面来看都是巨大的提升,其中 Vue3.x 不仅提供了许多新特性,也废弃了 Vue2.x 因历史遗留的问题。</p><h4 id="vue3-新特性介绍" tabindex="-1">Vue3 新特性介绍 <a class="header-anchor" href="#vue3-新特性介绍" aria-label="Permalink to &quot;Vue3 新特性介绍&quot;">​</a></h4><ul><li><strong>Composition Api(合成 Api)</strong>:Vue2.x 通过 Options Api(选项 Api) 构建一个组件(Vue2 组件中选项有 data、methods、filters、components 等等),在 Vue3.x 中则将一些可重用行为抽离为一个可复用函数,其目的是提高程序的灵活性和可维护性,减少开发者的逻辑关注点。Vue3 不仅支持 Composition Api 同时也兼容 Options Api。</li><li><strong>setup 钩子函数</strong>:在 Vue3.x 中 提供了 setup 钩子用于替代 beforeCreate 和 created 钩子函数(setup 执行时机优于 beforeCreated),其余钩子函数都需要显式的导入。</li><li><strong>Teleport(传送)</strong>:TelePort 可以将 DOM 元素或组件插入到某个元素下。teleport 是 Vue3 提供的组件,使用起来非常简单,通过 to 属性指定要插入的元素。使用 Teleport 非常容易解决弹出层定位问题。</li><li><strong>Fragment(片段)</strong>:Fragment 支持多根节点的组件。</li></ul><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">&lt;!-- vue3.x可以这样写,但vue2.x不行 --&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;1&lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt;2&lt;/</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">&lt;!-- vue3.x可以这样写,但vue2.x不行 --&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;1&lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">p</span><span style="color:#24292E;">&gt;2&lt;/</span><span style="color:#22863A;">p</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><ul><li><p><strong><code>&lt;script setup&gt;</code>语法糖</strong>: <code>&lt;script setup&gt;</code>是一种编译时语法糖,与 Vue3.2 正式发布,它用于在单文件组件 (SFC) 中更加容易使用 Composition API,相比较<code>&lt;script&gt;</code>它具有如下优点:</p><ul><li>在 setup 语法糖中定义的变量或方法可以直接用于模板(无需返回)。这是因为<code>&lt;script setup&gt;</code>被编译成一个内联在模板范围内的渲染函数,向模板暴露作用域。</li><li>能够使用 TypeScript 声明 props 和 emit。Vue 提供了 defineProps 和 defineEmits 两个编译宏用于定义 props 和 emit。</li><li>更好的运行时性能(模板编译成同作用域的 render 函数,没有中间代理)。</li><li>更好的 IDE 类型推断性能(语言服务器从代码中提取类型的工作更少)。</li></ul></li><li><p><strong>createRenderer API</strong>: (由@vue/runtime-core 提供的用于创建自定义渲染器)</p></li><li><p><strong>SFC 状态驱动 CSS 变量:</strong> SFC<code>&lt;style&gt;</code>标签支持使用 v-bind CSS 函数将 CSS 值链接到动态组件状态,一旦组件的状态发生变化时将会响应式的更新。</p></li><li><p><strong>Suspense(实验特性):</strong></p></li></ul><h4 id="vue3-变化介绍" tabindex="-1">Vue3 变化介绍 <a class="header-anchor" href="#vue3-变化介绍" aria-label="Permalink to &quot;Vue3 变化介绍&quot;">​</a></h4><ul><li>v-model 指令替换为 v-bind.sync,且一个组件可以使用 v-model。</li><li>过滤器被删除。$children Api被移除,官方推荐使用$ref 访问子组件实例代替。</li><li>$on、$off、$once 实例方法已被移除,官方推荐第三方事件触发器库,例如 mitt 或 tiny-emitter。</li><li>$listeners 对象在 Vue 3 中已被移除,现在事件监听器是 $attrs 的一部分。</li><li>在 Vue3 中,将所有 this.$scopedSlots 替换为 this.$slots,并且会将 slots 作为函数调用,例如 this.$slots.mySlot 替换为this.$slots.mySlot()。</li></ul><h4 id="上手指南" tabindex="-1">上手指南 <a class="header-anchor" href="#上手指南" aria-label="Permalink to &quot;上手指南&quot;">​</a></h4><p>想要快速上手 Vue3.x 那么必须对标 Vue2.x 已有功能,并学习 Vue3.x 提供的新特性,由于 Vue3 采用 TypeScript 进行开发,所以 Vue3 与 TypeScript 结合成为了开发主流项目的标配。按照功能可分为如下维度:</p><ul><li>定义组件。在 Vue3.x 提供了 Composition Api 和<code>&lt;script setup&gt;</code>语法糖两个方式定义组件,我们得了解如何在组件中定义响应式数据、声明 Props、声明组件的钩子函数、定义组件的方法和计算属性及数据的侦听。</li><li>组件生命周期。在 Vue3.x 使用 setup()钩子代替了 Vue2.x created 和 beforeCreated 钩子函数,且在 Vue3.x 中除了 setup 钩子无需显式导入,其余钩子都需要显式导入。</li><li>定义组件响应式状态。在 Vue2.x 中响应式状态定义在组件的 data 属性上,但在 Vue3.x 提供了 ref 和 reactive 两个 Api 用于定义组件响应式状态。</li><li>组件通讯。组件通讯可分父子组件通讯和跨组件通讯两种,父子组件通讯可以分为 props、emit、slot、ref 四个维度,跨组件通讯可以分为 inject/provide、v-bind、attrs、ref 四个维度,很遗憾的是 Vue3.x 删除了事件系统,但官方推荐使用第三方库 emitt 进行替代。</li><li>新的内置组件。teleport 和 Suspense(实验性)是 Vue3.x 提供的内置组件。</li><li>新的指令。</li><li>新特性:<code>&lt;script setup/&gt;</code>语法糖。</li><li>新特性:<code>&lt;style/&gt;</code>支持。</li></ul><h4 id="快速上手-vue3-x" tabindex="-1">快速上手 Vue3.x <a class="header-anchor" href="#快速上手-vue3-x" aria-label="Permalink to &quot;快速上手 Vue3.x&quot;">​</a></h4><p>这里会使用 Vite 来作为构建工具创建 Vue3 项目,或许你很好奇为什么不使用官方推荐的 vue/cli 创建项目,这里我给出两个理由:</p><ul><li><p>第一个 Vite 具有更快的构建速度和更加的开发体验,但@vue/cli 最新版本 4.5.15 内部采用的是 webpack5.54.0,虽然 webpack5 相比较 webpack4 提供了更多优化策略,但对比 Vite 构建速度 Webpack 仍会慢上几倍甚至数十倍(项目越大越明显)。不过 Webpack 的稳定性和生态 Vite 是无法比拟的,业界保守的做法是开发环境使用 Vite,生成打包使用 Webpack 或者 Rollup。</p></li><li><p>第二个 Vite 是更具高层(抽象)的构建工具。你可以用 Vite 创建 Vue、React 项目,但@vue/clic 只能创建 Vue。</p></li></ul><p>使用 Vite 创建项目:</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># yarn创建</span></span>
<span class="line"><span style="color:#B392F0;">yarn</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">create</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">@vitejs/app</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">vue3-template-example</span><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">--template</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">vue-ts</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># pnpm创建</span></span>
<span class="line"><span style="color:#B392F0;">pnpm</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">create</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">@vitejs/app</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">vue3-template-example</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--template</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">vue-ts</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># yarn创建</span></span>
<span class="line"><span style="color:#6F42C1;">yarn</span><span style="color:#24292E;"> </span><span style="color:#032F62;">create</span><span style="color:#24292E;"> </span><span style="color:#032F62;">@vitejs/app</span><span style="color:#24292E;"> </span><span style="color:#032F62;">vue3-template-example</span><span style="color:#24292E;">  </span><span style="color:#005CC5;">--template</span><span style="color:#24292E;"> </span><span style="color:#032F62;">vue-ts</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># pnpm创建</span></span>
<span class="line"><span style="color:#6F42C1;">pnpm</span><span style="color:#24292E;"> </span><span style="color:#032F62;">create</span><span style="color:#24292E;"> </span><span style="color:#032F62;">@vitejs/app</span><span style="color:#24292E;"> </span><span style="color:#032F62;">vue3-template-example</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--template</span><span style="color:#24292E;"> </span><span style="color:#032F62;">vue-ts</span></span></code></pre></div><p>Vue3 支持模板(SFC)和 JSX 两种方式项目,其中模板更易于被分析优化,对比 JSX 性能会能好,JSX 很难被分析优化,性能略低于模板,但 JSX 提供了更加灵活的编码方式,例如在递归组件、渲染多个分支条件场景等等,所以大部分 UI 库大量采用了 JSX 的写法。在 Vue3 中天然支持 JSX 写法,写起来与 React 基本上无差别,但可惜的是无法在 JSX 使用指令等其他特性。注意:想要在 Vue3 中启用 JSX 需要如下配置,否则会报&quot;React 未定义&quot;错误。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// vite.config.ts</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { defineConfig } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;vite&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> vue </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;@vitejs/plugin-vue&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">defineConfig</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  plugins: [</span><span style="color:#B392F0;">vue</span><span style="color:#E1E4E8;">()],</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 新增配置支持JSX</span></span>
<span class="line"><span style="color:#E1E4E8;">  esbuild: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    jsxFactory: </span><span style="color:#9ECBFF;">&quot;h&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    jsxFragment: </span><span style="color:#9ECBFF;">&quot;Fragment&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    jsxInject: </span><span style="color:#9ECBFF;">&quot;import { h } from &#39;vue&#39;;&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// vite.config.ts</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { defineConfig } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;vite&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> vue </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;@vitejs/plugin-vue&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">defineConfig</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  plugins: [</span><span style="color:#6F42C1;">vue</span><span style="color:#24292E;">()],</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 新增配置支持JSX</span></span>
<span class="line"><span style="color:#24292E;">  esbuild: {</span></span>
<span class="line"><span style="color:#24292E;">    jsxFactory: </span><span style="color:#032F62;">&quot;h&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    jsxFragment: </span><span style="color:#032F62;">&quot;Fragment&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    jsxInject: </span><span style="color:#032F62;">&quot;import { h } from &#39;vue&#39;;&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">});</span></span></code></pre></div><div class="language-jsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// HelloWorld.tsx</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { defineComponent, ref } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;vue&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">clickHandler</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;hello&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">HelloWorld</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">defineComponent</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">setup</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">name</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ref</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;z乘风&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> { name };</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">render</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">span</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">onClick</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{clickHandler}&gt;HelloWorld&lt;/</span><span style="color:#85E89D;">span</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">input</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">v-model</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.name} /&gt; &lt;!-- v-model指令无效 --&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">span</span><span style="color:#E1E4E8;">&gt;{</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.name}&lt;/</span><span style="color:#85E89D;">span</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    );</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> HelloWorld;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// HelloWorld.tsx</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { defineComponent, ref } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;vue&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">clickHandler</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;hello&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">};</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">HelloWorld</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">defineComponent</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">setup</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">name</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ref</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;z乘风&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> { name };</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">render</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">      &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">span</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">onClick</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{clickHandler}&gt;HelloWorld&lt;/</span><span style="color:#22863A;">span</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">input</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">v-model</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.name} /&gt; &lt;!-- v-model指令无效 --&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">span</span><span style="color:#24292E;">&gt;{</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.name}&lt;/</span><span style="color:#22863A;">span</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    );</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">});</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> HelloWorld;</span></span></code></pre></div><p>添加 JSX 支持:</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># 添加jsx依赖支持。@vue/babel-plugin-jsx支持以JSX的方式来编写Vue代码,</span></span>
<span class="line"><span style="color:#6A737D;"># 它是jsx-next仓库中的一个子仓库,如果你使用Vite那么推荐你直接安装@vitejs/plugin-vue-jsx,</span></span>
<span class="line"><span style="color:#6A737D;"># 它通过HMR提供Vue3 JSX和TSX支持,@vitejs/plugin-vue-jsx是基于@vue/babel-plugin-jsx的封装</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># yarn 或 pnpm 任选一种安装</span></span>
<span class="line"><span style="color:#B392F0;">yarn</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">add</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">@vitejs/plugin-vue-jsx</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-D</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">pnpm</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">add</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">@vitejs/plugin-vue-jsx</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-D</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 添加jsx依赖支持。@vue/babel-plugin-jsx支持以JSX的方式来编写Vue代码,</span></span>
<span class="line"><span style="color:#6A737D;"># 它是jsx-next仓库中的一个子仓库,如果你使用Vite那么推荐你直接安装@vitejs/plugin-vue-jsx,</span></span>
<span class="line"><span style="color:#6A737D;"># 它通过HMR提供Vue3 JSX和TSX支持,@vitejs/plugin-vue-jsx是基于@vue/babel-plugin-jsx的封装</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># yarn 或 pnpm 任选一种安装</span></span>
<span class="line"><span style="color:#6F42C1;">yarn</span><span style="color:#24292E;"> </span><span style="color:#032F62;">add</span><span style="color:#24292E;"> </span><span style="color:#032F62;">@vitejs/plugin-vue-jsx</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-D</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">pnpm</span><span style="color:#24292E;"> </span><span style="color:#032F62;">add</span><span style="color:#24292E;"> </span><span style="color:#032F62;">@vitejs/plugin-vue-jsx</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-D</span></span></code></pre></div><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// 在vite.config.js 引入@vitejs/plugin-vue-jsx插件</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { defineConfig } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;vite&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> vue </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;@vitejs/plugin-vue&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> vueJsx </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;@vitejs/plugin-vue-jsx&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">defineConfig</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  plugins: [</span><span style="color:#B392F0;">vue</span><span style="color:#E1E4E8;">(), </span><span style="color:#B392F0;">vueJsx</span><span style="color:#E1E4E8;">()],</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// 在vite.config.js 引入@vitejs/plugin-vue-jsx插件</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { defineConfig } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;vite&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> vue </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;@vitejs/plugin-vue&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> vueJsx </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;@vitejs/plugin-vue-jsx&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">defineConfig</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  plugins: [</span><span style="color:#6F42C1;">vue</span><span style="color:#24292E;">(), </span><span style="color:#6F42C1;">vueJsx</span><span style="color:#24292E;">()],</span></span>
<span class="line"><span style="color:#24292E;">});</span></span></code></pre></div>`,22),e=[o];function t(c,r,E,y,i,u){return n(),a("div",null,e)}const v=s(p,[["render",t]]);export{F as __pageData,v as default};