import{_ as s,c as n,o as a,a as o}from"./app.352f6789.js";const l="/assets/prototype.3590548c.png",u=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[{"level":2,"title":"1.什么是原型?","slug":"_1-什么是原型","link":"#_1-什么是原型","children":[]},{"level":2,"title":"2.prototype、proto、constructor 三者之间的关系","slug":"_2-prototype、proto、constructor-三者之间的关系","link":"#_2-prototype、proto、constructor-三者之间的关系","children":[]},{"level":2,"title":"3.什么是原型链?","slug":"_3-什么是原型链","link":"#_3-什么是原型链","children":[]},{"level":2,"title":"4.原型机制的应用之继承","slug":"_4-原型机制的应用之继承","link":"#_4-原型机制的应用之继承","children":[]}],"relativePath":"js/prototype.md","lastUpdated":1677480774000}'),p={name:"js/prototype.md"},t=o(`<h2 id="_1-什么是原型" tabindex="-1">1.什么是原型? <a class="header-anchor" href="#_1-什么是原型" aria-hidden="true">#</a></h2><p>JavaScript 是一种基于原型的语言 (prototype-based language)。在 js 中每个对象都有原型对象,对象以其原型为模板,从原型继承方法和属性,这些属性和方法定义在对象的构造器函数的 <code>prototype</code> 属性上,而非对象实例本身。简单来说 js 中每个对象都拥有原型对象<code>__proto__</code>,<code>__proto__</code>指向当前对象的原型对象(父对象)。每个函数都拥有一个原型对象(即 函数的<code>prototype</code>属性,其他类型是上不存在 <code>prototype</code>属性),对象的属性和定义的方法在存储在对象构造器函数的 <code>prototype</code> 上,<code>prototype</code> 被称为对象的显示原型,而<code>__proto__</code>被称为对象的隐式原型,每个对象上都存在<code>__proto__</code>,即每个对象都有隐式原型。</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> user </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">z乘风</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">};</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(</span><span style="color:#FFCB6B;">user</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">prototype)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// undefined 对象上不存在prototype属性,prototype是函数的原型对象</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(user</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">__proto__)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// user的指向Object,而Object的__proto__为null</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">/*</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> {</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">    constructor: ƒ Object(),</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">    hasOwnProperty: ƒ hasOwnProperty(),</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">    isPrototypeOf: ƒ isPrototypeOf(),</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">    propertyIsEnumerable: ƒ propertyIsEnumerable(),</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">    toLocaleString: ƒ toLocaleString(),</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">    toString: ƒ toString(),</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">    valueOf: ƒ valueOf(),</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">    __proto__:null</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">}</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">*/</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">fn</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">hello</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 函数不仅有显示原型(prototype),同时也具有隐式原型(__proto__),因为函数是一个特殊的对象</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(</span><span style="color:#FFCB6B;">fn</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">prototype)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// {constructor: ƒ fn(),[[Prototype]]: Object}</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(fn</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">__proto__)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// ƒ () { [native code] }</span></span>
<span class="line"></span></code></pre></div><h2 id="_2-prototype、proto、constructor-三者之间的关系" tabindex="-1">2.prototype、<strong>proto</strong>、constructor 三者之间的关系 <a class="header-anchor" href="#_2-prototype、proto、constructor-三者之间的关系" aria-hidden="true">#</a></h2><p><strong>prototype</strong>:只有函数才有<code>prototype</code>属性,<code>prototype</code> 是一个对象,它有 2 个属性,第一个属性是函数的构造函数,第二个是<code>proto</code>属性,它指向当前函数的父原型对象。允许函数所实例化的对象们都可以找到公用的属性和方法。</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#676E95;font-style:italic;">// 声明一个函数</span></span>
<span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Person</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{}</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 对Person函数进行实例化,得到一个Person函数实例</span></span>
<span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> p </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Person</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">/*</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> * 只有函数才有prototype属性,函数的prototype属性由constructor函数和__proto__属性构成,</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> * constructor属性指向实例化对象的构造函数,实例化对象的__proto__指向它父对象的原型(prototype),</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> * 即p.__proto === Person.prototype</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> */</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(</span><span style="color:#FFCB6B;">Person</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">prototype)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// {constructor: ƒ Person(),__proto__: Object}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">/*</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> * 因为p实例是由Person函数实例化而来,Person是p的父对象,</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> * 所以p.__proto__指向的是Person.prototype</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> */</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(p</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">__proto__ </span><span style="color:#89DDFF;">===</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Person</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">prototype)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">//true</span></span>
<span class="line"></span></code></pre></div><p><strong><code>__proto__</code></strong>:每个对象都有一个<code>__proto__</code>属性,<code>__proto__</code>属性保存着大量对象的信息,其中<code>__proto__</code>.constructor 指向对象的构造函数。</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> num </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">111</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(num</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">__proto__)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// Number {0, constructor: ƒ, toExponential: ƒ, toFixed: ƒ, toPrecision: ƒ, …}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> str </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">z乘风</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(str</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">__proto__)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// String {&quot;&quot;, constructor: ƒ, anchor: ƒ, big: ƒ, blink: ƒ, …}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">/* 函数的__proto__ */</span></span>
<span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Person</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{}</span></span>
<span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> p </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Person</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(p</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">__proto__)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// {constructor: ƒ Person(),**proto**: Object}</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(p</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">__proto__</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">constructor </span><span style="color:#89DDFF;">===</span><span style="color:#A6ACCD;"> p</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">constructor)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// true</span></span>
<span class="line"></span></code></pre></div><p><strong>constructor</strong>:constructor 属性也是对象才拥有的,它表示当前对象的构造函数。</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> num </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">111</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(num</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">constructor)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// ƒ Number() { [native code] }</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(num</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">constructor </span><span style="color:#89DDFF;">===</span><span style="color:#A6ACCD;"> Number)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// true</span></span>
<span class="line"></span></code></pre></div><p>三者关系图如下: <img src="`+l+`" alt="prototype"></p><h2 id="_3-什么是原型链" tabindex="-1">3.什么是原型链? <a class="header-anchor" href="#_3-什么是原型链" aria-hidden="true">#</a></h2><p><strong>每个对象都拥有一个原型对象(即<code>proto</code>),它指向父对象的原型对象,并从中继承方法和属性。当访问对象的属性或方法时,优先会查找当前对象是否有目标属性或方法,如果存在则直接返回并终止查找,如果未查找到,就查找当前对象的父原型对象,如果查找到了就直接返回终止查找,否则就一直向上查找其父原型,如果查找到 Object (Object 的父原型为 null)还未查找到就直接返回 undefined 并终止查找,而这一系列的向上查找父原型的过程就被称为原型链</strong>。</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Person</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{}</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 在Person原型上声明属性</span></span>
<span class="line"><span style="color:#FFCB6B;">Person</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">prototype</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">age </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">20</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 在Object原型上声明方法</span></span>
<span class="line"><span style="color:#FFCB6B;">Object</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">prototype</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">hello</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">你真帅</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span>
<span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> p </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Person</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">p</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">name </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">zxp</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 查当前对象,有就返回,没有就一直查询父原型,直到查找到Object的父原型为止</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(p</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">name)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">//zxp</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 当前对象和向上原型都没有address属性</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(p</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">address)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">//undefined</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 虽然p对象没有age属性,但p的向上原型有age属性</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(p</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">age)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">//20</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 原型链查找最多查找到Object的原型,Object的父原型为null</span></span>
<span class="line"><span style="color:#A6ACCD;">p</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">hello</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">//你真帅</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(</span><span style="color:#FFCB6B;">Object</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">prototype</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">__proto__)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">//null</span></span>
<span class="line"></span></code></pre></div><h2 id="_4-原型机制的应用之继承" tabindex="-1">4.原型机制的应用之继承 <a class="header-anchor" href="#_4-原型机制的应用之继承" aria-hidden="true">#</a></h2><p>原型链继承的本质是重写原型对象,代之以一个新类型的实例。原型链继承是基于 JS 原型机制实现的继承方式,在原型机制中构造函数、原型和实例之间的关系为:每个构造函数都有一个原型对象,原型对象都包含一个指向构造函数的指针,而实例都包含一个原型对象的指针,即<code>原型对象.constructor === 构造函数</code>,<code>实例对象.prototype === 其原型对象</code>。</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#676E95;font-style:italic;">// 创建父函数</span></span>
<span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Super</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">name</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">super</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 在父函数的原型上创建方法</span></span>
<span class="line"><span style="color:#FFCB6B;">Super</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">prototype</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">getName</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">name</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 创建子函数</span></span>
<span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Sub</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">subName</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">sub</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">/*</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> * 关键:创建Super的实例,并将该实例赋值给Sub.prototype,于是Sub的实例就拥有了Super实例和原型上的方法与属性</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> */</span></span>
<span class="line"><span style="color:#FFCB6B;">Sub</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">prototype </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Super</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 在子函数原型上创建方法</span></span>
<span class="line"><span style="color:#FFCB6B;">Sub</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">prototype</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">getSubName</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">subName</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 实例化子函数</span></span>
<span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> instance </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Sub</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 此方法继承自Super原型上的getName()</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(instance</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">getName</span><span style="color:#A6ACCD;">())</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// super</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(instance</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">getSubName</span><span style="color:#A6ACCD;">())</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// sub</span></span>
<span class="line"></span></code></pre></div><p>原型链方案存在的缺点:多个实例对引用类型的操作会被篡改。</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Super</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">languages</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> [</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Java</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">JavaScript</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Go</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">]</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Sub</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{}</span></span>
<span class="line"><span style="color:#FFCB6B;">Sub</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">prototype </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Super</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 创建实例1</span></span>
<span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> sub01 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Sub</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">sub01</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">languages</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">push</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Rust</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(sub01</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">languages)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// [&quot;Java&quot;, &quot;JavaScript&quot;, &quot;Go&quot;, &quot;Rust&quot;]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 创建实例2</span></span>
<span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> sub02 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Sub</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 由于实例1修改了父函数的引用数据,导致影响了实例2</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(sub02</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">languages)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// [&quot;Java&quot;, &quot;JavaScript&quot;, &quot;Go&quot;, &quot;Rust&quot;]</span></span>
<span class="line"></span></code></pre></div>`,19),e=[t];function c(r,y,D,F,A,C){return a(),n("div",null,e)}const _=s(p,[["render",c]]);export{u as __pageData,_ as default};
