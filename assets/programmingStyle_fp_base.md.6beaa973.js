import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.a9ea851b.js";const d=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"programmingStyle/fp/base.md","filePath":"programmingStyle/fp/base.md","lastUpdated":1694073156000}'),p={name:"programmingStyle/fp/base.md"},o=l(`<p>应用程序的流程走向被称为控制流,在命令式编程范式中通常使用 for、if、return、breack、continue 等语句来控制应用的走向,但在函数式编程范式中抽象作用在数据上的控制流和操作,函数式编程推荐将任务拆分为多个函数,通过将这些函数组合或链接来解决问题。</p><h3 id="_1-方法链和函数链" tabindex="-1">1.方法链和函数链 <a class="header-anchor" href="#_1-方法链和函数链" aria-label="Permalink to &quot;1.方法链和函数链&quot;">​</a></h3><h3 id="_2-数据操作抽象" tabindex="-1">2.数据操作抽象 <a class="header-anchor" href="#_2-数据操作抽象" aria-label="Permalink to &quot;2.数据操作抽象&quot;">​</a></h3><h4 id="_2-1-map-转换数据" tabindex="-1">2.1 map 转换数据 <a class="header-anchor" href="#_2-1-map-转换数据" aria-label="Permalink to &quot;2.1 map 转换数据&quot;">​</a></h4><p>map(也称为 collect)是一个高阶函数能够将一个迭代数据有序地应用于一个数组中的每个元素,并返回一个长度相等的新数组。map 通常用于数据的转换或数据的映射,例如在好友列表中提取每个好友的名字。</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">friends</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [</span></span>
<span class="line"><span style="color:#E1E4E8;">  {</span></span>
<span class="line"><span style="color:#E1E4E8;">    id: </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    name: </span><span style="color:#9ECBFF;">&quot;zhangsan&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    age: </span><span style="color:#79B8FF;">18</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    address: </span><span style="color:#9ECBFF;">&quot;shenzheng&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  {</span></span>
<span class="line"><span style="color:#E1E4E8;">    id: </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    name: </span><span style="color:#9ECBFF;">&quot;lisi&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    age: </span><span style="color:#79B8FF;">62</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    address: </span><span style="color:#9ECBFF;">&quot;beijing&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  {</span></span>
<span class="line"><span style="color:#E1E4E8;">    id: </span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    name: </span><span style="color:#9ECBFF;">&quot;wuwang&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    age: </span><span style="color:#79B8FF;">32</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    address: </span><span style="color:#9ECBFF;">&quot;shanghai&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  {</span></span>
<span class="line"><span style="color:#E1E4E8;">    id: </span><span style="color:#79B8FF;">4</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    name: </span><span style="color:#9ECBFF;">&quot;laoliu&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    age: </span><span style="color:#79B8FF;">21</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    address: </span><span style="color:#9ECBFF;">&quot;shanghai&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">];</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 命令式解法</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">result</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [];</span></span>
<span class="line"><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> i </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">, len </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> friends.</span><span style="color:#79B8FF;">length</span><span style="color:#E1E4E8;">; i </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> len; i</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (friends[i]) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    result.</span><span style="color:#B392F0;">push</span><span style="color:#E1E4E8;">(friends[i].name);</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(result); </span><span style="color:#6A737D;">// [&#39;zhangsan&#39;, &#39;lisi&#39;, &#39;wuwang&#39;, &#39;laoliu&#39;]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 函数解法,map()简化了代码</span></span>
<span class="line"><span style="color:#E1E4E8;">friends.</span><span style="color:#B392F0;">map</span><span style="color:#E1E4E8;">((</span><span style="color:#FFAB70;">item</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> (item </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> item.name </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;">)); </span><span style="color:#6A737D;">// [&#39;zhangsan&#39;, &#39;lisi&#39;, &#39;wuwang&#39;, &#39;laoliu&#39;]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">friends</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [</span></span>
<span class="line"><span style="color:#24292E;">  {</span></span>
<span class="line"><span style="color:#24292E;">    id: </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    name: </span><span style="color:#032F62;">&quot;zhangsan&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    age: </span><span style="color:#005CC5;">18</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    address: </span><span style="color:#032F62;">&quot;shenzheng&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  {</span></span>
<span class="line"><span style="color:#24292E;">    id: </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    name: </span><span style="color:#032F62;">&quot;lisi&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    age: </span><span style="color:#005CC5;">62</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    address: </span><span style="color:#032F62;">&quot;beijing&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  {</span></span>
<span class="line"><span style="color:#24292E;">    id: </span><span style="color:#005CC5;">3</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    name: </span><span style="color:#032F62;">&quot;wuwang&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    age: </span><span style="color:#005CC5;">32</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    address: </span><span style="color:#032F62;">&quot;shanghai&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  {</span></span>
<span class="line"><span style="color:#24292E;">    id: </span><span style="color:#005CC5;">4</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    name: </span><span style="color:#032F62;">&quot;laoliu&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    age: </span><span style="color:#005CC5;">21</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    address: </span><span style="color:#032F62;">&quot;shanghai&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">];</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 命令式解法</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">result</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [];</span></span>
<span class="line"><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> i </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">, len </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> friends.</span><span style="color:#005CC5;">length</span><span style="color:#24292E;">; i </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> len; i</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (friends[i]) {</span></span>
<span class="line"><span style="color:#24292E;">    result.</span><span style="color:#6F42C1;">push</span><span style="color:#24292E;">(friends[i].name);</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(result); </span><span style="color:#6A737D;">// [&#39;zhangsan&#39;, &#39;lisi&#39;, &#39;wuwang&#39;, &#39;laoliu&#39;]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 函数解法,map()简化了代码</span></span>
<span class="line"><span style="color:#24292E;">friends.</span><span style="color:#6F42C1;">map</span><span style="color:#24292E;">((</span><span style="color:#E36209;">item</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> (item </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> item.name </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;">)); </span><span style="color:#6A737D;">// [&#39;zhangsan&#39;, &#39;lisi&#39;, &#39;wuwang&#39;, &#39;laoliu&#39;]</span></span></code></pre></div><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;"> * map实现,该实现未对arr和fn做类型检查,map应挂载到Array.prototype。</span></span>
<span class="line"><span style="color:#6A737D;"> * - arr:被映射的数组。</span></span>
<span class="line"><span style="color:#6A737D;"> * - fn:迭代方法。fn支持item(遍历元素)、index(遍历元素下标)、array(操作数组)三个入参。</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">map</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">arr</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">fn</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> index </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    len </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> arr.</span><span style="color:#79B8FF;">length</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    result </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Array</span><span style="color:#E1E4E8;">(len);</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">while</span><span style="color:#E1E4E8;"> (index </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> len) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    result[index] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">fn</span><span style="color:#E1E4E8;">(arr[index], index, arr);</span></span>
<span class="line"><span style="color:#E1E4E8;">    index</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> result;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// [&#39;zhangsan&#39;, &#39;lisi&#39;, &#39;wuwang&#39;, &#39;laoliu&#39;]</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">map</span><span style="color:#E1E4E8;">(friends, (</span><span style="color:#FFAB70;">item</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> (item </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> item.name </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;">)));</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;"> * map实现,该实现未对arr和fn做类型检查,map应挂载到Array.prototype。</span></span>
<span class="line"><span style="color:#6A737D;"> * - arr:被映射的数组。</span></span>
<span class="line"><span style="color:#6A737D;"> * - fn:迭代方法。fn支持item(遍历元素)、index(遍历元素下标)、array(操作数组)三个入参。</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">map</span><span style="color:#24292E;">(</span><span style="color:#E36209;">arr</span><span style="color:#24292E;">, </span><span style="color:#E36209;">fn</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> index </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    len </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> arr.</span><span style="color:#005CC5;">length</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    result </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Array</span><span style="color:#24292E;">(len);</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">while</span><span style="color:#24292E;"> (index </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> len) {</span></span>
<span class="line"><span style="color:#24292E;">    result[index] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">fn</span><span style="color:#24292E;">(arr[index], index, arr);</span></span>
<span class="line"><span style="color:#24292E;">    index</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> result;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// [&#39;zhangsan&#39;, &#39;lisi&#39;, &#39;wuwang&#39;, &#39;laoliu&#39;]</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">map</span><span style="color:#24292E;">(friends, (</span><span style="color:#E36209;">item</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> (item </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> item.name </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;">)));</span></span></code></pre></div><p>map 只有从左遍历到右的操作,对于从右到左的遍历,需要反转数组在遍历,由于 JS 中的 Array.reverse()操作数组后会改变原数组,从而破坏函数的纯度,推荐自定义 reverse()或使用 lodash 中的 reverse()。</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;"> * 实现reverse反转数组。</span></span>
<span class="line"><span style="color:#6A737D;"> * - arr:需要迭代的数组。</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">reverse</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">arr</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> index </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">len</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> arr.</span><span style="color:#79B8FF;">length</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">result</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Array</span><span style="color:#E1E4E8;">(len);</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> i </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> len </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">; i </span><span style="color:#F97583;">&gt;=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">; i</span><span style="color:#F97583;">--</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    result[index</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> arr[i];</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> result;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// [&#39;laoliu&#39;, &#39;wuwang&#39;, &#39;lisi&#39;, &#39;zhangsan&#39;]</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">reverse</span><span style="color:#E1E4E8;">(friends).</span><span style="color:#B392F0;">map</span><span style="color:#E1E4E8;">((</span><span style="color:#FFAB70;">item</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> (item </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> item.name </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;">)));</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;"> * 实现reverse反转数组。</span></span>
<span class="line"><span style="color:#6A737D;"> * - arr:需要迭代的数组。</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">reverse</span><span style="color:#24292E;">(</span><span style="color:#E36209;">arr</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> index </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">len</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> arr.</span><span style="color:#005CC5;">length</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">result</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Array</span><span style="color:#24292E;">(len);</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> i </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> len </span><span style="color:#D73A49;">-</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">; i </span><span style="color:#D73A49;">&gt;=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">; i</span><span style="color:#D73A49;">--</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    result[index</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> arr[i];</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> result;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// [&#39;laoliu&#39;, &#39;wuwang&#39;, &#39;lisi&#39;, &#39;zhangsan&#39;]</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">reverse</span><span style="color:#24292E;">(friends).</span><span style="color:#6F42C1;">map</span><span style="color:#24292E;">((</span><span style="color:#E36209;">item</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> (item </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> item.name </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;">)));</span></span></code></pre></div><h4 id="_2-2-filter-过滤数据" tabindex="-1">2.2 filter 过滤数据 <a class="header-anchor" href="#_2-2-filter-过滤数据" aria-label="Permalink to &quot;2.2 filter 过滤数据&quot;">​</a></h4><p>filter(也称为 select)是一个能够遍历数组中的元素并返回一个新子集数组的高阶函数,filter 接收一个谓词函数做为参数,filter 返回的数组由谓词函数计算得出的 true 值结果来确定。例如过滤年龄大于 30 的好友列表。</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">friends</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [</span></span>
<span class="line"><span style="color:#E1E4E8;">  {</span></span>
<span class="line"><span style="color:#E1E4E8;">    id: </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    name: </span><span style="color:#9ECBFF;">&quot;zhangsan&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    age: </span><span style="color:#79B8FF;">18</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    address: </span><span style="color:#9ECBFF;">&quot;shenzheng&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  {</span></span>
<span class="line"><span style="color:#E1E4E8;">    id: </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    name: </span><span style="color:#9ECBFF;">&quot;lisi&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    age: </span><span style="color:#79B8FF;">62</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    address: </span><span style="color:#9ECBFF;">&quot;beijing&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  {</span></span>
<span class="line"><span style="color:#E1E4E8;">    id: </span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    name: </span><span style="color:#9ECBFF;">&quot;wuwang&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    age: </span><span style="color:#79B8FF;">32</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    address: </span><span style="color:#9ECBFF;">&quot;shanghai&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  {</span></span>
<span class="line"><span style="color:#E1E4E8;">    id: </span><span style="color:#79B8FF;">4</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    name: </span><span style="color:#9ECBFF;">&quot;laoliu&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    age: </span><span style="color:#79B8FF;">21</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    address: </span><span style="color:#9ECBFF;">&quot;shanghai&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">];</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/* 过滤小于30岁的人员</span></span>
<span class="line"><span style="color:#6A737D;"> [</span></span>
<span class="line"><span style="color:#6A737D;">	{id: 2, name: &#39;lisi&#39;, age: 62, address: &#39;beijing&#39;},</span></span>
<span class="line"><span style="color:#6A737D;">	{id: 3, name: &#39;wuwang&#39;, age: 32, address: &#39;shanghai&#39;}</span></span>
<span class="line"><span style="color:#6A737D;"> ]</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(friends.</span><span style="color:#B392F0;">filter</span><span style="color:#E1E4E8;">((</span><span style="color:#FFAB70;">item</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> item.age </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">30</span><span style="color:#E1E4E8;">));</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;"> * filter实现,filter用户数据的过滤操作。</span></span>
<span class="line"><span style="color:#6A737D;"> * - arr:被迭代的数组。</span></span>
<span class="line"><span style="color:#6A737D;"> * - predicate:被迭代执行的谓词函数。predicate支持item(遍历元素)、index(遍历元素下标)、</span></span>
<span class="line"><span style="color:#6A737D;"> * array(操作数组)三个入参。</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">filter</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">arr</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">predicate</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">len</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> arr.</span><span style="color:#79B8FF;">length</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">result</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [];</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> index </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">while</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">index </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> len) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">value</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> arr[index];</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 当谓词函数执行结果为true时result才会追加元素</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#B392F0;">predicate</span><span style="color:#E1E4E8;">(value, index, arr)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      result.</span><span style="color:#B392F0;">push</span><span style="color:#E1E4E8;">(value);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> result;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;"> [</span></span>
<span class="line"><span style="color:#6A737D;">	{id: 2, name: &#39;lisi&#39;, age: 62, address: &#39;beijing&#39;},</span></span>
<span class="line"><span style="color:#6A737D;">	{id: 3, name: &#39;wuwang&#39;, age: 32, address: &#39;shanghai&#39;}</span></span>
<span class="line"><span style="color:#6A737D;"> ]</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">filter</span><span style="color:#E1E4E8;">(friends, (</span><span style="color:#FFAB70;">item</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> item.age </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">30</span><span style="color:#E1E4E8;">));</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">friends</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [</span></span>
<span class="line"><span style="color:#24292E;">  {</span></span>
<span class="line"><span style="color:#24292E;">    id: </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    name: </span><span style="color:#032F62;">&quot;zhangsan&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    age: </span><span style="color:#005CC5;">18</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    address: </span><span style="color:#032F62;">&quot;shenzheng&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  {</span></span>
<span class="line"><span style="color:#24292E;">    id: </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    name: </span><span style="color:#032F62;">&quot;lisi&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    age: </span><span style="color:#005CC5;">62</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    address: </span><span style="color:#032F62;">&quot;beijing&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  {</span></span>
<span class="line"><span style="color:#24292E;">    id: </span><span style="color:#005CC5;">3</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    name: </span><span style="color:#032F62;">&quot;wuwang&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    age: </span><span style="color:#005CC5;">32</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    address: </span><span style="color:#032F62;">&quot;shanghai&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  {</span></span>
<span class="line"><span style="color:#24292E;">    id: </span><span style="color:#005CC5;">4</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    name: </span><span style="color:#032F62;">&quot;laoliu&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    age: </span><span style="color:#005CC5;">21</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    address: </span><span style="color:#032F62;">&quot;shanghai&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">];</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/* 过滤小于30岁的人员</span></span>
<span class="line"><span style="color:#6A737D;"> [</span></span>
<span class="line"><span style="color:#6A737D;">	{id: 2, name: &#39;lisi&#39;, age: 62, address: &#39;beijing&#39;},</span></span>
<span class="line"><span style="color:#6A737D;">	{id: 3, name: &#39;wuwang&#39;, age: 32, address: &#39;shanghai&#39;}</span></span>
<span class="line"><span style="color:#6A737D;"> ]</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(friends.</span><span style="color:#6F42C1;">filter</span><span style="color:#24292E;">((</span><span style="color:#E36209;">item</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> item.age </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">30</span><span style="color:#24292E;">));</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;"> * filter实现,filter用户数据的过滤操作。</span></span>
<span class="line"><span style="color:#6A737D;"> * - arr:被迭代的数组。</span></span>
<span class="line"><span style="color:#6A737D;"> * - predicate:被迭代执行的谓词函数。predicate支持item(遍历元素)、index(遍历元素下标)、</span></span>
<span class="line"><span style="color:#6A737D;"> * array(操作数组)三个入参。</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">filter</span><span style="color:#24292E;">(</span><span style="color:#E36209;">arr</span><span style="color:#24292E;">, </span><span style="color:#E36209;">predicate</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">len</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> arr.</span><span style="color:#005CC5;">length</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">result</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [];</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> index </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">while</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">index </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> len) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">value</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> arr[index];</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 当谓词函数执行结果为true时result才会追加元素</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#6F42C1;">predicate</span><span style="color:#24292E;">(value, index, arr)) {</span></span>
<span class="line"><span style="color:#24292E;">      result.</span><span style="color:#6F42C1;">push</span><span style="color:#24292E;">(value);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> result;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;"> [</span></span>
<span class="line"><span style="color:#6A737D;">	{id: 2, name: &#39;lisi&#39;, age: 62, address: &#39;beijing&#39;},</span></span>
<span class="line"><span style="color:#6A737D;">	{id: 3, name: &#39;wuwang&#39;, age: 32, address: &#39;shanghai&#39;}</span></span>
<span class="line"><span style="color:#6A737D;"> ]</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">filter</span><span style="color:#24292E;">(friends, (</span><span style="color:#E36209;">item</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> item.age </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">30</span><span style="color:#24292E;">));</span></span></code></pre></div><h4 id="_2-3-reduce-收集结果" tabindex="-1">2.3 reduce 收集结果 <a class="header-anchor" href="#_2-3-reduce-收集结果" aria-label="Permalink to &quot;2.3 reduce 收集结果&quot;">​</a></h4><p>高阶函数 reduce 用于将一个数组的元素精简为单一的值,该值是由每个元素与累积值通过一个函数计算得出。例如统计好友列表中所有人的年龄总和。</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">friends</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [</span></span>
<span class="line"><span style="color:#E1E4E8;">  {</span></span>
<span class="line"><span style="color:#E1E4E8;">    id: </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    name: </span><span style="color:#9ECBFF;">&quot;zhangsan&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    age: </span><span style="color:#79B8FF;">18</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    address: </span><span style="color:#9ECBFF;">&quot;shenzheng&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  {</span></span>
<span class="line"><span style="color:#E1E4E8;">    id: </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    name: </span><span style="color:#9ECBFF;">&quot;lisi&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    age: </span><span style="color:#79B8FF;">62</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    address: </span><span style="color:#9ECBFF;">&quot;beijing&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  {</span></span>
<span class="line"><span style="color:#E1E4E8;">    id: </span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    name: </span><span style="color:#9ECBFF;">&quot;wuwang&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    age: </span><span style="color:#79B8FF;">32</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    address: </span><span style="color:#9ECBFF;">&quot;shanghai&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  {</span></span>
<span class="line"><span style="color:#E1E4E8;">    id: </span><span style="color:#79B8FF;">4</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    name: </span><span style="color:#9ECBFF;">&quot;laoliu&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    age: </span><span style="color:#79B8FF;">21</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    address: </span><span style="color:#9ECBFF;">&quot;shanghai&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">];</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 统计好友列表中所有人的年龄总和</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(friends.</span><span style="color:#B392F0;">reduce</span><span style="color:#E1E4E8;">((</span><span style="color:#FFAB70;">acc</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">item</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> acc </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> item.age, </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">)); </span><span style="color:#6A737D;">// 133</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;"> * reduce用于收集数据。</span></span>
<span class="line"><span style="color:#6A737D;"> * - arr:被迭代的数组。</span></span>
<span class="line"><span style="color:#6A737D;"> * - fn:被迭代执行的函数。该函数接收累积值、当前迭代元素、当前迭代元素下标、数组本身四个参数。</span></span>
<span class="line"><span style="color:#6A737D;"> * - accumulator:累加器。累积初始值,之后会用于存在每次迭代函数的计算结果,并不断被传入子</span></span>
<span class="line"><span style="color:#6A737D;"> * 函数中。</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">reduce</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">arr</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">fn</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">accumulator</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> index </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">len</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> arr </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> arr.</span><span style="color:#79B8FF;">length</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 如果未传入累加器初始值时,则使用数组中的第一个元素作为默认值</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">typeof</span><span style="color:#E1E4E8;"> accumulator </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;undefined&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> len </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    accumulator </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> arr[</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">index];</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">while</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">index </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> len) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    accumulator </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">fn</span><span style="color:#E1E4E8;">(accumulator, arr[index], index, arr);</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> accumulator;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">reduce</span><span style="color:#E1E4E8;">(friends, (</span><span style="color:#FFAB70;">acc</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">item</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> acc </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> item.age, </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">)); </span><span style="color:#6A737D;">// 133</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">friends</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [</span></span>
<span class="line"><span style="color:#24292E;">  {</span></span>
<span class="line"><span style="color:#24292E;">    id: </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    name: </span><span style="color:#032F62;">&quot;zhangsan&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    age: </span><span style="color:#005CC5;">18</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    address: </span><span style="color:#032F62;">&quot;shenzheng&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  {</span></span>
<span class="line"><span style="color:#24292E;">    id: </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    name: </span><span style="color:#032F62;">&quot;lisi&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    age: </span><span style="color:#005CC5;">62</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    address: </span><span style="color:#032F62;">&quot;beijing&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  {</span></span>
<span class="line"><span style="color:#24292E;">    id: </span><span style="color:#005CC5;">3</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    name: </span><span style="color:#032F62;">&quot;wuwang&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    age: </span><span style="color:#005CC5;">32</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    address: </span><span style="color:#032F62;">&quot;shanghai&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  {</span></span>
<span class="line"><span style="color:#24292E;">    id: </span><span style="color:#005CC5;">4</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    name: </span><span style="color:#032F62;">&quot;laoliu&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    age: </span><span style="color:#005CC5;">21</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    address: </span><span style="color:#032F62;">&quot;shanghai&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">];</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 统计好友列表中所有人的年龄总和</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(friends.</span><span style="color:#6F42C1;">reduce</span><span style="color:#24292E;">((</span><span style="color:#E36209;">acc</span><span style="color:#24292E;">, </span><span style="color:#E36209;">item</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> acc </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> item.age, </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">)); </span><span style="color:#6A737D;">// 133</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;"> * reduce用于收集数据。</span></span>
<span class="line"><span style="color:#6A737D;"> * - arr:被迭代的数组。</span></span>
<span class="line"><span style="color:#6A737D;"> * - fn:被迭代执行的函数。该函数接收累积值、当前迭代元素、当前迭代元素下标、数组本身四个参数。</span></span>
<span class="line"><span style="color:#6A737D;"> * - accumulator:累加器。累积初始值,之后会用于存在每次迭代函数的计算结果,并不断被传入子</span></span>
<span class="line"><span style="color:#6A737D;"> * 函数中。</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">reduce</span><span style="color:#24292E;">(</span><span style="color:#E36209;">arr</span><span style="color:#24292E;">, </span><span style="color:#E36209;">fn</span><span style="color:#24292E;">, </span><span style="color:#E36209;">accumulator</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> index </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">len</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> arr </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> arr.</span><span style="color:#005CC5;">length</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 如果未传入累加器初始值时,则使用数组中的第一个元素作为默认值</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">typeof</span><span style="color:#24292E;"> accumulator </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;undefined&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> len </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    accumulator </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> arr[</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">index];</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">while</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">index </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> len) {</span></span>
<span class="line"><span style="color:#24292E;">    accumulator </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">fn</span><span style="color:#24292E;">(accumulator, arr[index], index, arr);</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> accumulator;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">reduce</span><span style="color:#24292E;">(friends, (</span><span style="color:#E36209;">acc</span><span style="color:#24292E;">, </span><span style="color:#E36209;">item</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> acc </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> item.age, </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">)); </span><span style="color:#6A737D;">// 133</span></span></code></pre></div><p>reduce 只能从左遍历到右的数据收集操作,而 reduceRight 函数提供了从右到左的数据收集操作。</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">reduceRight</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">arr</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">fn</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">accumulator</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> len </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> arr </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> arr.</span><span style="color:#79B8FF;">length</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">typeof</span><span style="color:#E1E4E8;"> accumulator </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;undefined&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> len) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    accumulator </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> arr[</span><span style="color:#F97583;">--</span><span style="color:#E1E4E8;">len];</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">while</span><span style="color:#E1E4E8;"> (len</span><span style="color:#F97583;">--</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    accumulator </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">fn</span><span style="color:#E1E4E8;">(accumulator, arr[len], len, arr);</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> accumulator;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#6A737D;">// 反向拼接好友列表中所有人的名称</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// &#39;zhouchengfeng-laoliu-wuwang-lisi-zhangsan&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">reduceRight</span><span style="color:#E1E4E8;">(friends, (</span><span style="color:#FFAB70;">acc</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">item</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">\`\${</span><span style="color:#E1E4E8;">acc</span><span style="color:#9ECBFF;">}-\${</span><span style="color:#E1E4E8;">item</span><span style="color:#9ECBFF;">.</span><span style="color:#E1E4E8;">name</span><span style="color:#9ECBFF;">}\`</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;zhouchengfeng&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">reduceRight</span><span style="color:#24292E;">(</span><span style="color:#E36209;">arr</span><span style="color:#24292E;">, </span><span style="color:#E36209;">fn</span><span style="color:#24292E;">, </span><span style="color:#E36209;">accumulator</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> len </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> arr </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> arr.</span><span style="color:#005CC5;">length</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">typeof</span><span style="color:#24292E;"> accumulator </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;undefined&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> len) {</span></span>
<span class="line"><span style="color:#24292E;">    accumulator </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> arr[</span><span style="color:#D73A49;">--</span><span style="color:#24292E;">len];</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">while</span><span style="color:#24292E;"> (len</span><span style="color:#D73A49;">--</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    accumulator </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">fn</span><span style="color:#24292E;">(accumulator, arr[len], len, arr);</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> accumulator;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#6A737D;">// 反向拼接好友列表中所有人的名称</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// &#39;zhouchengfeng-laoliu-wuwang-lisi-zhangsan&#39;</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">reduceRight</span><span style="color:#24292E;">(friends, (</span><span style="color:#E36209;">acc</span><span style="color:#24292E;">, </span><span style="color:#E36209;">item</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">\`\${</span><span style="color:#24292E;">acc</span><span style="color:#032F62;">}-\${</span><span style="color:#24292E;">item</span><span style="color:#032F62;">.</span><span style="color:#24292E;">name</span><span style="color:#032F62;">}\`</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;zhouchengfeng&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">);</span></span></code></pre></div><h4 id="_2-4-find-查找数据" tabindex="-1">2.4 find 查找数据 <a class="header-anchor" href="#_2-4-find-查找数据" aria-label="Permalink to &quot;2.4 find 查找数据&quot;">​</a></h4><p>find 是一个能够遍历数组中的元素,find 接收一个谓词函数,find 会根据谓词函数的结果值查找数组的元素,如果遍历所有元素仍未查找到元素则返回 undefined。例如查找年龄为 18 的好友。</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">friends</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [</span></span>
<span class="line"><span style="color:#E1E4E8;">  {</span></span>
<span class="line"><span style="color:#E1E4E8;">    id: </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    name: </span><span style="color:#9ECBFF;">&quot;zhangsan&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    age: </span><span style="color:#79B8FF;">18</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    address: </span><span style="color:#9ECBFF;">&quot;shenzheng&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  {</span></span>
<span class="line"><span style="color:#E1E4E8;">    id: </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    name: </span><span style="color:#9ECBFF;">&quot;lisi&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    age: </span><span style="color:#79B8FF;">62</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    address: </span><span style="color:#9ECBFF;">&quot;beijing&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  {</span></span>
<span class="line"><span style="color:#E1E4E8;">    id: </span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    name: </span><span style="color:#9ECBFF;">&quot;wuwang&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    age: </span><span style="color:#79B8FF;">32</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    address: </span><span style="color:#9ECBFF;">&quot;shanghai&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  {</span></span>
<span class="line"><span style="color:#E1E4E8;">    id: </span><span style="color:#79B8FF;">4</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    name: </span><span style="color:#9ECBFF;">&quot;laoliu&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    age: </span><span style="color:#79B8FF;">21</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    address: </span><span style="color:#9ECBFF;">&quot;shanghai&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">];</span></span>
<span class="line"><span style="color:#6A737D;">// {id: 1, name: &#39;zhangsan&#39;, age: 18, address: &#39;shenzheng&#39;}</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(friends.</span><span style="color:#B392F0;">find</span><span style="color:#E1E4E8;">((</span><span style="color:#FFAB70;">item</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> item.age </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">18</span><span style="color:#E1E4E8;">));</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;"> * filter用于查找数据</span></span>
<span class="line"><span style="color:#6A737D;"> * - arr:被迭代的数组。</span></span>
<span class="line"><span style="color:#6A737D;"> * - predicate:谓词函数,find将根据谓词的结果值查找元素,谓词函数接收当前迭代元素、当前元素</span></span>
<span class="line"><span style="color:#6A737D;"> * 索引和数组三个参数。</span></span>
<span class="line"><span style="color:#6A737D;"> * - fromIndex:开始搜索的索引位置,默认为0。</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">find</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">arr</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">predicate</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">fromIndex</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> index </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (fromIndex </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">len</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> arr </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> arr.</span><span style="color:#79B8FF;">length</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> fromIndex;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">while</span><span style="color:#E1E4E8;"> (index</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> len) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#B392F0;">predicate</span><span style="color:#E1E4E8;">(arr[index], index, arr)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> arr[index];</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// {id: 1, name: &#39;zhangsan&#39;, age: 18, address: &#39;shenzheng&#39;}</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">find</span><span style="color:#E1E4E8;">(friends, (</span><span style="color:#FFAB70;">item</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> item.age </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">18</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">));</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">find</span><span style="color:#E1E4E8;">(friends, (</span><span style="color:#FFAB70;">item</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> item.age </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">18</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">)); </span><span style="color:#6A737D;">// undefined</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">friends</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [</span></span>
<span class="line"><span style="color:#24292E;">  {</span></span>
<span class="line"><span style="color:#24292E;">    id: </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    name: </span><span style="color:#032F62;">&quot;zhangsan&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    age: </span><span style="color:#005CC5;">18</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    address: </span><span style="color:#032F62;">&quot;shenzheng&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  {</span></span>
<span class="line"><span style="color:#24292E;">    id: </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    name: </span><span style="color:#032F62;">&quot;lisi&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    age: </span><span style="color:#005CC5;">62</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    address: </span><span style="color:#032F62;">&quot;beijing&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  {</span></span>
<span class="line"><span style="color:#24292E;">    id: </span><span style="color:#005CC5;">3</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    name: </span><span style="color:#032F62;">&quot;wuwang&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    age: </span><span style="color:#005CC5;">32</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    address: </span><span style="color:#032F62;">&quot;shanghai&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  {</span></span>
<span class="line"><span style="color:#24292E;">    id: </span><span style="color:#005CC5;">4</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    name: </span><span style="color:#032F62;">&quot;laoliu&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    age: </span><span style="color:#005CC5;">21</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    address: </span><span style="color:#032F62;">&quot;shanghai&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">];</span></span>
<span class="line"><span style="color:#6A737D;">// {id: 1, name: &#39;zhangsan&#39;, age: 18, address: &#39;shenzheng&#39;}</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(friends.</span><span style="color:#6F42C1;">find</span><span style="color:#24292E;">((</span><span style="color:#E36209;">item</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> item.age </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">18</span><span style="color:#24292E;">));</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;"> * filter用于查找数据</span></span>
<span class="line"><span style="color:#6A737D;"> * - arr:被迭代的数组。</span></span>
<span class="line"><span style="color:#6A737D;"> * - predicate:谓词函数,find将根据谓词的结果值查找元素,谓词函数接收当前迭代元素、当前元素</span></span>
<span class="line"><span style="color:#6A737D;"> * 索引和数组三个参数。</span></span>
<span class="line"><span style="color:#6A737D;"> * - fromIndex:开始搜索的索引位置,默认为0。</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">find</span><span style="color:#24292E;">(</span><span style="color:#E36209;">arr</span><span style="color:#24292E;">, </span><span style="color:#E36209;">predicate</span><span style="color:#24292E;">, </span><span style="color:#E36209;">fromIndex</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> index </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (fromIndex </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">-</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">len</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> arr </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> arr.</span><span style="color:#005CC5;">length</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-</span><span style="color:#24292E;"> fromIndex;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">while</span><span style="color:#24292E;"> (index</span><span style="color:#D73A49;">++</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> len) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#6F42C1;">predicate</span><span style="color:#24292E;">(arr[index], index, arr)) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> arr[index];</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// {id: 1, name: &#39;zhangsan&#39;, age: 18, address: &#39;shenzheng&#39;}</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">find</span><span style="color:#24292E;">(friends, (</span><span style="color:#E36209;">item</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> item.age </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">18</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">));</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">find</span><span style="color:#24292E;">(friends, (</span><span style="color:#E36209;">item</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> item.age </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">18</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">)); </span><span style="color:#6A737D;">// undefined</span></span></code></pre></div><h3 id="_3-chain-函数链和惰性求值" tabindex="-1">3.chain 函数链和惰性求值 <a class="header-anchor" href="#_3-chain-函数链和惰性求值" aria-label="Permalink to &quot;3.chain 函数链和惰性求值&quot;">​</a></h3><p>命令式编程的缺点是现定于高效地解决某个特点的问题,相比较函数式编程抽象层次更低,代码可重用性更差,出现错误的复杂性和可能性概率更大。函数式编程采用链式调用使代码更加简洁易读,而级联排列的函数调用可以使代码可读性更好,例如 webpack-chain 支持以函数链形式编写 webpack 配置。<strong>chain 函数可以添加一个输入对象的状态,从而能够从这些输入转换为所需输出的操作链接在一起,简单来说 chain 函数接收一个输入状态,且可以链接操作该状态的函数</strong>。chain 函数优点如下:</p><ul><li><strong>链接输入状态的操作函数</strong>。可以避免创建任何变量,且可以有效地消除所有循环。</li><li><strong>支持惰性计算以减少函数的执行次数</strong>。惰性计算优化并不会减少函数执行所需耗时,但可以消除不必要的函数调用。例如使用 lodash 中的 chain()函数创建惰性函数,在调用 value()前并不会真正的执行任何操作,对比普通的链式调用减少了执行次数。</li></ul><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> _ </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;lodash-es&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">friends</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [</span></span>
<span class="line"><span style="color:#E1E4E8;">  {</span></span>
<span class="line"><span style="color:#E1E4E8;">    id: </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    name: </span><span style="color:#9ECBFF;">&quot;zhangsan&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    age: </span><span style="color:#79B8FF;">18</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    address: </span><span style="color:#9ECBFF;">&quot;shenzheng&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  {</span></span>
<span class="line"><span style="color:#E1E4E8;">    id: </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    name: </span><span style="color:#9ECBFF;">&quot;lisi&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    age: </span><span style="color:#79B8FF;">62</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    address: </span><span style="color:#9ECBFF;">&quot;beijing&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  {</span></span>
<span class="line"><span style="color:#E1E4E8;">    id: </span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    name: </span><span style="color:#9ECBFF;">&quot;wuwang&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    age: </span><span style="color:#79B8FF;">32</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    address: </span><span style="color:#9ECBFF;">&quot;shanghai&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  {</span></span>
<span class="line"><span style="color:#E1E4E8;">    id: </span><span style="color:#79B8FF;">4</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    name: </span><span style="color:#9ECBFF;">&quot;laoliu&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    age: </span><span style="color:#79B8FF;">21</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    address: </span><span style="color:#9ECBFF;">&quot;shanghai&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">];</span></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">isValid</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">item</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> item </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> item.name.</span><span style="color:#B392F0;">trim</span><span style="color:#E1E4E8;">().</span><span style="color:#79B8FF;">length</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// chain()用于创建一个lodash包装实例,包装value以启用显式链模式,解除函数链必须使用_.value()。</span></span>
<span class="line"><span style="color:#6A737D;">// 创建惰性计算函数链处理指定数组</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">result</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> _.</span><span style="color:#B392F0;">chain</span><span style="color:#E1E4E8;">(friends)</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 根据谓词函数过滤数据</span></span>
<span class="line"><span style="color:#E1E4E8;">  .</span><span style="color:#B392F0;">filter</span><span style="color:#E1E4E8;">(isValid)</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 根据age属性对数据进行排序</span></span>
<span class="line"><span style="color:#E1E4E8;">  .</span><span style="color:#B392F0;">sortBy</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;age&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 数据映射处理</span></span>
<span class="line"><span style="color:#E1E4E8;">  .</span><span style="color:#B392F0;">map</span><span style="color:#E1E4E8;">((</span><span style="color:#FFAB70;">item</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">\`S001-\${</span><span style="color:#E1E4E8;">item</span><span style="color:#9ECBFF;">.</span><span style="color:#E1E4E8;">name</span><span style="color:#9ECBFF;">}\`</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 获取数据</span></span>
<span class="line"><span style="color:#E1E4E8;">  .</span><span style="color:#B392F0;">values</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 反转数据</span></span>
<span class="line"><span style="color:#E1E4E8;">  .</span><span style="color:#B392F0;">reverse</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 获取数据中第一条数据</span></span>
<span class="line"><span style="color:#E1E4E8;">  .</span><span style="color:#B392F0;">first</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 解除绑定,获取函数链中函数的最终结果值。</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 只有调用value()解除函数链绑定时,函数链中的函数才会被执行。</span></span>
<span class="line"><span style="color:#E1E4E8;">  .</span><span style="color:#B392F0;">value</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(result); </span><span style="color:#6A737D;">// &#39;S001-lisi&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> _ </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;lodash-es&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">friends</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [</span></span>
<span class="line"><span style="color:#24292E;">  {</span></span>
<span class="line"><span style="color:#24292E;">    id: </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    name: </span><span style="color:#032F62;">&quot;zhangsan&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    age: </span><span style="color:#005CC5;">18</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    address: </span><span style="color:#032F62;">&quot;shenzheng&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  {</span></span>
<span class="line"><span style="color:#24292E;">    id: </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    name: </span><span style="color:#032F62;">&quot;lisi&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    age: </span><span style="color:#005CC5;">62</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    address: </span><span style="color:#032F62;">&quot;beijing&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  {</span></span>
<span class="line"><span style="color:#24292E;">    id: </span><span style="color:#005CC5;">3</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    name: </span><span style="color:#032F62;">&quot;wuwang&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    age: </span><span style="color:#005CC5;">32</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    address: </span><span style="color:#032F62;">&quot;shanghai&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  {</span></span>
<span class="line"><span style="color:#24292E;">    id: </span><span style="color:#005CC5;">4</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    name: </span><span style="color:#032F62;">&quot;laoliu&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    age: </span><span style="color:#005CC5;">21</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    address: </span><span style="color:#032F62;">&quot;shanghai&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">];</span></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">isValid</span><span style="color:#24292E;">(</span><span style="color:#E36209;">item</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> item </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> item.name.</span><span style="color:#6F42C1;">trim</span><span style="color:#24292E;">().</span><span style="color:#005CC5;">length</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// chain()用于创建一个lodash包装实例,包装value以启用显式链模式,解除函数链必须使用_.value()。</span></span>
<span class="line"><span style="color:#6A737D;">// 创建惰性计算函数链处理指定数组</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">result</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> _.</span><span style="color:#6F42C1;">chain</span><span style="color:#24292E;">(friends)</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 根据谓词函数过滤数据</span></span>
<span class="line"><span style="color:#24292E;">  .</span><span style="color:#6F42C1;">filter</span><span style="color:#24292E;">(isValid)</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 根据age属性对数据进行排序</span></span>
<span class="line"><span style="color:#24292E;">  .</span><span style="color:#6F42C1;">sortBy</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;age&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 数据映射处理</span></span>
<span class="line"><span style="color:#24292E;">  .</span><span style="color:#6F42C1;">map</span><span style="color:#24292E;">((</span><span style="color:#E36209;">item</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">\`S001-\${</span><span style="color:#24292E;">item</span><span style="color:#032F62;">.</span><span style="color:#24292E;">name</span><span style="color:#032F62;">}\`</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 获取数据</span></span>
<span class="line"><span style="color:#24292E;">  .</span><span style="color:#6F42C1;">values</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 反转数据</span></span>
<span class="line"><span style="color:#24292E;">  .</span><span style="color:#6F42C1;">reverse</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 获取数据中第一条数据</span></span>
<span class="line"><span style="color:#24292E;">  .</span><span style="color:#6F42C1;">first</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 解除绑定,获取函数链中函数的最终结果值。</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 只有调用value()解除函数链绑定时,函数链中的函数才会被执行。</span></span>
<span class="line"><span style="color:#24292E;">  .</span><span style="color:#6F42C1;">value</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(result); </span><span style="color:#6A737D;">// &#39;S001-lisi&#39;</span></span></code></pre></div><p>chain 简单实现(参考 lodash):</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">/** -------------- util function start  */</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 判断val是否是对象,返回一个布尔值</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">isObject</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">val</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    val </span><span style="color:#F97583;">!==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> [</span><span style="color:#9ECBFF;">&quot;object&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;function&quot;</span><span style="color:#E1E4E8;">].</span><span style="color:#B392F0;">includes</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">typeof</span><span style="color:#E1E4E8;"> val);</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 判断value是否是函数,返回一个布尔值</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">isFunction</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">val</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">typeof</span><span style="color:#E1E4E8;"> val </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;function&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 获取对象中的所有属性(除了constructor属性),返回一个包含对象属性的数组</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">baseKeys</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">object</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">result</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [];</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> key </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Object</span><span style="color:#E1E4E8;">(object)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (Reflect.hasOwnProperty.</span><span style="color:#B392F0;">call</span><span style="color:#E1E4E8;">(object, key) </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> key </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;constructor&quot;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        result.</span><span style="color:#B392F0;">push</span><span style="color:#E1E4E8;">(key);</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> result;</span></span>
<span class="line"><span style="color:#E1E4E8;">  };</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 根据属性数组过滤指定对象对应为函数的属性</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">baseFunctions</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">source</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">props</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> props.</span><span style="color:#B392F0;">filter</span><span style="color:#E1E4E8;">((</span><span style="color:#FFAB70;">prop</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">isFunction</span><span style="color:#E1E4E8;">(source[prop]));</span></span>
<span class="line"><span style="color:#E1E4E8;">  };</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">copyArray</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">arr</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> arr.</span><span style="color:#B392F0;">concat</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">arrayPush</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">arr</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">elements</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> arr.</span><span style="color:#B392F0;">concat</span><span style="color:#E1E4E8;">(elements);</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">/** -------------- util function end  */</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 提供两个函数以便在函数链中使用,该函数需要挂载到lodash上</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">keys</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">target</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> Reflect.</span><span style="color:#B392F0;">ownKeys</span><span style="color:#E1E4E8;">(target);</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">slice</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">arr</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">start</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">end</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> arr.</span><span style="color:#B392F0;">slice</span><span style="color:#E1E4E8;">(start, end </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> arr.</span><span style="color:#79B8FF;">length</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 包装器将继承该函数的原型链</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">baseLodash</span><span style="color:#E1E4E8;">() {}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 包装函数,用于包装数据</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">LodashWrapper</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">value</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">chainAll</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 原始值</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.__wrapped__ </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> value;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 用于存储函数链上的函数,以便在调用value()执行函数链上的所有方法</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.__actions__ </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [];</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.__chain__ </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">!!</span><span style="color:#E1E4E8;">chainAll;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 函数链上函数的下标</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.__index__ </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.__values__ </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">undefined</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 包装value,如果value是包装对象则直接返回,否则通过包装函数包装value</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">lodash</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">value</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#B392F0;">isObject</span><span style="color:#E1E4E8;">(value) </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">Array.</span><span style="color:#B392F0;">isArray</span><span style="color:#E1E4E8;">(value)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (value </span><span style="color:#F97583;">instanceof</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">LodashWrapper</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> value;</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (Reflect.hasOwnProperty.</span><span style="color:#B392F0;">call</span><span style="color:#E1E4E8;">(value, </span><span style="color:#9ECBFF;">&quot;__wrapped__&quot;</span><span style="color:#E1E4E8;">)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">throw</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Error</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;no wrapperClone&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">LodashWrapper</span><span style="color:#E1E4E8;">(value);</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">chain</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">value</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> result </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">lodash</span><span style="color:#E1E4E8;">(value);</span></span>
<span class="line"><span style="color:#E1E4E8;">    result.__chain__ </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> result;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">lodash</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">prototype</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">baseLodash</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">prototype</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">lodash</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">prototype</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">constructor</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> lodash;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">LodashWrapper</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">prototype</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">__proto__</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">baseLodash</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">prototype</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// value()用于解除函数链,只有调用value()时函数链上的函数才会被执行</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">lodash</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">prototype</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">value</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">     * 获取lodash函数的__actions__,__actions__存储着函数链上的所有函数,</span></span>
<span class="line"><span style="color:#6A737D;">     * 通过reduce遍历执行函数链上的函数,函数执行通过apply()执行,函数this指向</span></span>
<span class="line"><span style="color:#6A737D;">     * action.thisArg,每遍历执行都会将上一次函数执行的输出(result)会与</span></span>
<span class="line"><span style="color:#6A737D;">     * 当前函数的参数数组(action.args)进行合并作为函数的入参。</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.__actions__.</span><span style="color:#B392F0;">reduce</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">result</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">action</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> action.func.</span><span style="color:#B392F0;">apply</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">        action.thisArg,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">arrayPush</span><span style="color:#E1E4E8;">([result], action.args)</span></span>
<span class="line"><span style="color:#E1E4E8;">      );</span></span>
<span class="line"><span style="color:#E1E4E8;">    }, </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.__wrapped__);</span></span>
<span class="line"><span style="color:#E1E4E8;">  };</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 混入函数</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">mixin</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">object</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">source</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">options</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 获取source对象上的所有属性</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> props </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">baseKeys</span><span style="color:#E1E4E8;">(source),</span></span>
<span class="line"><span style="color:#E1E4E8;">      methodNames </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">baseFunctions</span><span style="color:#E1E4E8;">(source, props);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">      options </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&amp;&amp;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">isObject</span><span style="color:#E1E4E8;">(source) </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> (methodNames.</span><span style="color:#79B8FF;">length</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">props.</span><span style="color:#79B8FF;">length</span><span style="color:#E1E4E8;">))</span></span>
<span class="line"><span style="color:#E1E4E8;">    ) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      options </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> source;</span></span>
<span class="line"><span style="color:#E1E4E8;">      source </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> object;</span></span>
<span class="line"><span style="color:#E1E4E8;">      object </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">      methodNames </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">baseFunctions</span><span style="color:#E1E4E8;">(source, </span><span style="color:#B392F0;">baseKeys</span><span style="color:#E1E4E8;">(source));</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> chain </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">isObject</span><span style="color:#E1E4E8;">(options) </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;chain&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> options) </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">!!</span><span style="color:#E1E4E8;">options.chain,</span></span>
<span class="line"><span style="color:#E1E4E8;">      isFunc </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">isFunction</span><span style="color:#E1E4E8;">(object);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 遍历函数名称列表</span></span>
<span class="line"><span style="color:#E1E4E8;">    methodNames.</span><span style="color:#B392F0;">forEach</span><span style="color:#E1E4E8;">((</span><span style="color:#FFAB70;">methodName</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 获取执行函数</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> func </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> source[methodName];</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 将执行函数挂载到object对象上</span></span>
<span class="line"><span style="color:#E1E4E8;">      object[methodName] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> func;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 如果object是一个函数,则将创建一个新函数用于调用执行函数,并挂载到object的原型上</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (isFunc) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">object</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">prototype</span><span style="color:#E1E4E8;">[methodName] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> chainAll </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.__chain__;</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (chain </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> chainAll) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> result </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">object</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.__wrapped__),</span></span>
<span class="line"><span style="color:#E1E4E8;">              actions </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (result.__actions__ </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">copyArray</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.__actions__));</span></span>
<span class="line"><span style="color:#E1E4E8;">            actions.</span><span style="color:#B392F0;">push</span><span style="color:#E1E4E8;">({ func: func, args: </span><span style="color:#79B8FF;">arguments</span><span style="color:#E1E4E8;">, thisArg: object });</span></span>
<span class="line"><span style="color:#E1E4E8;">            result.__chain__ </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> chainAll;</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> result;</span></span>
<span class="line"><span style="color:#E1E4E8;">          }</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#6A737D;">// 执行函数,this指向object,执行value()会得到函数链最终输出,作为参数传入函数</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> func.</span><span style="color:#B392F0;">apply</span><span style="color:#E1E4E8;">(object, </span><span style="color:#B392F0;">arrayPush</span><span style="color:#E1E4E8;">([</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">value</span><span style="color:#E1E4E8;">()], </span><span style="color:#79B8FF;">arguments</span><span style="color:#E1E4E8;">));</span></span>
<span class="line"><span style="color:#E1E4E8;">        };</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    });</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> object;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 在lodash函数上挂载keys、slice、chain函数</span></span>
<span class="line"><span style="color:#E1E4E8;">  Object.</span><span style="color:#B392F0;">assign</span><span style="color:#E1E4E8;">(lodash, { keys, slice, chain });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 混入,向lodash挂载keys, slice, chain等方法</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">mixin</span><span style="color:#E1E4E8;">(lodash, lodash);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#B392F0;">isObject</span><span style="color:#E1E4E8;">(global)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    global._ </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> lodash;</span></span>
<span class="line"><span style="color:#E1E4E8;">  } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">._ </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> lodash;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}).</span><span style="color:#B392F0;">call</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 测试</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">obj</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> { foo: </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">, bar: </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">, zoo: </span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;"> };</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(_.</span><span style="color:#B392F0;">chain</span><span style="color:#E1E4E8;">(obj).</span><span style="color:#B392F0;">keys</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">value</span><span style="color:#E1E4E8;">()); </span><span style="color:#6A737D;">// [ &#39;foo&#39;, &#39;bar&#39;, &#39;zoo&#39; ]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">(</span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">/** -------------- util function start  */</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 判断val是否是对象,返回一个布尔值</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">isObject</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">val</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span></span>
<span class="line"><span style="color:#24292E;">    val </span><span style="color:#D73A49;">!==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> [</span><span style="color:#032F62;">&quot;object&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;function&quot;</span><span style="color:#24292E;">].</span><span style="color:#6F42C1;">includes</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">typeof</span><span style="color:#24292E;"> val);</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 判断value是否是函数,返回一个布尔值</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">isFunction</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">val</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">typeof</span><span style="color:#24292E;"> val </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;function&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 获取对象中的所有属性(除了constructor属性),返回一个包含对象属性的数组</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">baseKeys</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">object</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">result</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [];</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> key </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Object</span><span style="color:#24292E;">(object)) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (Reflect.hasOwnProperty.</span><span style="color:#6F42C1;">call</span><span style="color:#24292E;">(object, key) </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> key </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;constructor&quot;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        result.</span><span style="color:#6F42C1;">push</span><span style="color:#24292E;">(key);</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> result;</span></span>
<span class="line"><span style="color:#24292E;">  };</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 根据属性数组过滤指定对象对应为函数的属性</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">baseFunctions</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">source</span><span style="color:#24292E;">, </span><span style="color:#E36209;">props</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> props.</span><span style="color:#6F42C1;">filter</span><span style="color:#24292E;">((</span><span style="color:#E36209;">prop</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">isFunction</span><span style="color:#24292E;">(source[prop]));</span></span>
<span class="line"><span style="color:#24292E;">  };</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">copyArray</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">arr</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> arr.</span><span style="color:#6F42C1;">concat</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">arrayPush</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">arr</span><span style="color:#24292E;">, </span><span style="color:#E36209;">elements</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> arr.</span><span style="color:#6F42C1;">concat</span><span style="color:#24292E;">(elements);</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">/** -------------- util function end  */</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 提供两个函数以便在函数链中使用,该函数需要挂载到lodash上</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">keys</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">target</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> Reflect.</span><span style="color:#6F42C1;">ownKeys</span><span style="color:#24292E;">(target);</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">slice</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">arr</span><span style="color:#24292E;">, </span><span style="color:#E36209;">start</span><span style="color:#24292E;">, </span><span style="color:#E36209;">end</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> arr.</span><span style="color:#6F42C1;">slice</span><span style="color:#24292E;">(start, end </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> arr.</span><span style="color:#005CC5;">length</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 包装器将继承该函数的原型链</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">baseLodash</span><span style="color:#24292E;">() {}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 包装函数,用于包装数据</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">LodashWrapper</span><span style="color:#24292E;">(</span><span style="color:#E36209;">value</span><span style="color:#24292E;">, </span><span style="color:#E36209;">chainAll</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 原始值</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.__wrapped__ </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> value;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 用于存储函数链上的函数,以便在调用value()执行函数链上的所有方法</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.__actions__ </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [];</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.__chain__ </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">!!</span><span style="color:#24292E;">chainAll;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 函数链上函数的下标</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.__index__ </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.__values__ </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">undefined</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 包装value,如果value是包装对象则直接返回,否则通过包装函数包装value</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">lodash</span><span style="color:#24292E;">(</span><span style="color:#E36209;">value</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#6F42C1;">isObject</span><span style="color:#24292E;">(value) </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">!</span><span style="color:#24292E;">Array.</span><span style="color:#6F42C1;">isArray</span><span style="color:#24292E;">(value)) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (value </span><span style="color:#D73A49;">instanceof</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">LodashWrapper</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> value;</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (Reflect.hasOwnProperty.</span><span style="color:#6F42C1;">call</span><span style="color:#24292E;">(value, </span><span style="color:#032F62;">&quot;__wrapped__&quot;</span><span style="color:#24292E;">)) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">throw</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Error</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;no wrapperClone&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">LodashWrapper</span><span style="color:#24292E;">(value);</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">chain</span><span style="color:#24292E;">(</span><span style="color:#E36209;">value</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> result </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">lodash</span><span style="color:#24292E;">(value);</span></span>
<span class="line"><span style="color:#24292E;">    result.__chain__ </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> result;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">lodash</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">prototype</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">baseLodash</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">prototype</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">lodash</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">prototype</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">constructor</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> lodash;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">LodashWrapper</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">prototype</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">__proto__</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">baseLodash</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">prototype</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// value()用于解除函数链,只有调用value()时函数链上的函数才会被执行</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">lodash</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">prototype</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">value</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">     * 获取lodash函数的__actions__,__actions__存储着函数链上的所有函数,</span></span>
<span class="line"><span style="color:#6A737D;">     * 通过reduce遍历执行函数链上的函数,函数执行通过apply()执行,函数this指向</span></span>
<span class="line"><span style="color:#6A737D;">     * action.thisArg,每遍历执行都会将上一次函数执行的输出(result)会与</span></span>
<span class="line"><span style="color:#6A737D;">     * 当前函数的参数数组(action.args)进行合并作为函数的入参。</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.__actions__.</span><span style="color:#6F42C1;">reduce</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">result</span><span style="color:#24292E;">, </span><span style="color:#E36209;">action</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> action.func.</span><span style="color:#6F42C1;">apply</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">        action.thisArg,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">arrayPush</span><span style="color:#24292E;">([result], action.args)</span></span>
<span class="line"><span style="color:#24292E;">      );</span></span>
<span class="line"><span style="color:#24292E;">    }, </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.__wrapped__);</span></span>
<span class="line"><span style="color:#24292E;">  };</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 混入函数</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">mixin</span><span style="color:#24292E;">(</span><span style="color:#E36209;">object</span><span style="color:#24292E;">, </span><span style="color:#E36209;">source</span><span style="color:#24292E;">, </span><span style="color:#E36209;">options</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 获取source对象上的所有属性</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> props </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">baseKeys</span><span style="color:#24292E;">(source),</span></span>
<span class="line"><span style="color:#24292E;">      methodNames </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">baseFunctions</span><span style="color:#24292E;">(source, props);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">      options </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&amp;&amp;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">!</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">isObject</span><span style="color:#24292E;">(source) </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> (methodNames.</span><span style="color:#005CC5;">length</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">!</span><span style="color:#24292E;">props.</span><span style="color:#005CC5;">length</span><span style="color:#24292E;">))</span></span>
<span class="line"><span style="color:#24292E;">    ) {</span></span>
<span class="line"><span style="color:#24292E;">      options </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> source;</span></span>
<span class="line"><span style="color:#24292E;">      source </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> object;</span></span>
<span class="line"><span style="color:#24292E;">      object </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">      methodNames </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">baseFunctions</span><span style="color:#24292E;">(source, </span><span style="color:#6F42C1;">baseKeys</span><span style="color:#24292E;">(source));</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> chain </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">!</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">isObject</span><span style="color:#24292E;">(options) </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;chain&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> options) </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">!!</span><span style="color:#24292E;">options.chain,</span></span>
<span class="line"><span style="color:#24292E;">      isFunc </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">isFunction</span><span style="color:#24292E;">(object);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 遍历函数名称列表</span></span>
<span class="line"><span style="color:#24292E;">    methodNames.</span><span style="color:#6F42C1;">forEach</span><span style="color:#24292E;">((</span><span style="color:#E36209;">methodName</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 获取执行函数</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> func </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> source[methodName];</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 将执行函数挂载到object对象上</span></span>
<span class="line"><span style="color:#24292E;">      object[methodName] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> func;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 如果object是一个函数,则将创建一个新函数用于调用执行函数,并挂载到object的原型上</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (isFunc) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">object</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">prototype</span><span style="color:#24292E;">[methodName] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> chainAll </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.__chain__;</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (chain </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> chainAll) {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> result </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">object</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.__wrapped__),</span></span>
<span class="line"><span style="color:#24292E;">              actions </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (result.__actions__ </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">copyArray</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.__actions__));</span></span>
<span class="line"><span style="color:#24292E;">            actions.</span><span style="color:#6F42C1;">push</span><span style="color:#24292E;">({ func: func, args: </span><span style="color:#005CC5;">arguments</span><span style="color:#24292E;">, thisArg: object });</span></span>
<span class="line"><span style="color:#24292E;">            result.__chain__ </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> chainAll;</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> result;</span></span>
<span class="line"><span style="color:#24292E;">          }</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6A737D;">// 执行函数,this指向object,执行value()会得到函数链最终输出,作为参数传入函数</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> func.</span><span style="color:#6F42C1;">apply</span><span style="color:#24292E;">(object, </span><span style="color:#6F42C1;">arrayPush</span><span style="color:#24292E;">([</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">value</span><span style="color:#24292E;">()], </span><span style="color:#005CC5;">arguments</span><span style="color:#24292E;">));</span></span>
<span class="line"><span style="color:#24292E;">        };</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    });</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> object;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 在lodash函数上挂载keys、slice、chain函数</span></span>
<span class="line"><span style="color:#24292E;">  Object.</span><span style="color:#6F42C1;">assign</span><span style="color:#24292E;">(lodash, { keys, slice, chain });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 混入,向lodash挂载keys, slice, chain等方法</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">mixin</span><span style="color:#24292E;">(lodash, lodash);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#6F42C1;">isObject</span><span style="color:#24292E;">(global)) {</span></span>
<span class="line"><span style="color:#24292E;">    global._ </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> lodash;</span></span>
<span class="line"><span style="color:#24292E;">  } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">._ </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> lodash;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}).</span><span style="color:#6F42C1;">call</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 测试</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">obj</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> { foo: </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">, bar: </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">, zoo: </span><span style="color:#005CC5;">3</span><span style="color:#24292E;"> };</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(_.</span><span style="color:#6F42C1;">chain</span><span style="color:#24292E;">(obj).</span><span style="color:#6F42C1;">keys</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">value</span><span style="color:#24292E;">()); </span><span style="color:#6A737D;">// [ &#39;foo&#39;, &#39;bar&#39;, &#39;zoo&#39; ]</span></span></code></pre></div><h3 id="_4-递归" tabindex="-1">4.递归 <a class="header-anchor" href="#_4-递归" aria-label="Permalink to &quot;4.递归&quot;">​</a></h3><h4 id="_4-1-尾递归" tabindex="-1">4.1 尾递归 <a class="header-anchor" href="#_4-1-尾递归" aria-label="Permalink to &quot;4.1 尾递归&quot;">​</a></h4>`,28),e=[o];function c(t,r,E,y,i,F){return n(),a("div",null,e)}const A=s(p,[["render",c]]);export{d as __pageData,A as default};
