import{_ as s,o as n,c as a,Q as p}from"./chunks/framework.8c2da384.js";const D=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"vue/component.md","filePath":"vue/component.md","lastUpdated":1708966819000}'),l={name:"vue/component.md"},o=p(`<p>本章节将会学习如何定义组件,并学会使用如何在组件中使用生命周期函数、props、emits、定义响应式数据、插槽、定义方法和计算属性及侦听数据。</p><h3 id="定义组件" tabindex="-1">定义组件 <a class="header-anchor" href="#定义组件" aria-label="Permalink to &quot;定义组件&quot;">​</a></h3><h4 id="definecomponent-定义组件" tabindex="-1">defineComponent 定义组件 <a class="header-anchor" href="#definecomponent-定义组件" aria-label="Permalink to &quot;defineComponent 定义组件&quot;">​</a></h4><p>defineComponent 用于定义一个组件,允许接收一个组件 Option 的对象,或者是一个 setup 函数，函数名称将作为组件名称来使用。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// vue2.x的写法:defineComponent接收options对象</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { defineComponent } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;vue&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">defineComponent</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  props:{</span></span>
<span class="line"><span style="color:#E1E4E8;">    name:{</span></span>
<span class="line"><span style="color:#E1E4E8;">      type:String,</span></span>
<span class="line"><span style="color:#E1E4E8;">      default:</span><span style="color:#9ECBFF;">&#39;默认的名字&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    list:{</span></span>
<span class="line"><span style="color:#E1E4E8;">      type:Array,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">default</span><span style="color:#E1E4E8;">:()</span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;">[]</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">data</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> { count: </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> };</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  methods: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">increment</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.count</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">compute</span><span style="color:#E1E4E8;">(){</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">getCount</span><span style="color:#E1E4E8;">(){</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.count;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// vue2.x的写法:defineComponent接收options对象</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { defineComponent } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;vue&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">defineComponent</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  props:{</span></span>
<span class="line"><span style="color:#24292E;">    name:{</span></span>
<span class="line"><span style="color:#24292E;">      type:String,</span></span>
<span class="line"><span style="color:#24292E;">      default:</span><span style="color:#032F62;">&#39;默认的名字&#39;</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    list:{</span></span>
<span class="line"><span style="color:#24292E;">      type:Array,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">default</span><span style="color:#24292E;">:()</span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;">[]</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">data</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> { count: </span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> };</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  methods: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">increment</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.count</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">compute</span><span style="color:#24292E;">(){</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">getCount</span><span style="color:#24292E;">(){</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.count;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">});</span></span></code></pre></div><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">button</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">@click=&quot;decrement&quot;&gt;-&lt;/button&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">&lt;span&gt;{{count}}&lt;/span&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">&lt;button</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">@click=&quot;increment&quot;&gt;+&lt;/button&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FDAEB7;font-style:italic;">&lt;/div&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FDAEB7;font-style:italic;">&lt;div&gt;type:{{type}}&lt;/div&gt;</span></span>
<span class="line"><span style="color:#FDAEB7;font-style:italic;">&lt;/template&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// vue3 写法</span></span>
<span class="line"><span style="color:#B392F0;">import</span><span style="color:#E1E4E8;"> {defineComponent,toRefs,ref} </span><span style="color:#B392F0;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;vue&#39;</span><span style="color:#FDAEB7;font-style:italic;">;</span></span>
<span class="line"><span style="color:#B392F0;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">component</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">defineComponent({</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FDAEB7;font-style:italic;">props:</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    name: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      type: String,</span></span>
<span class="line"><span style="color:#E1E4E8;">      default: </span><span style="color:#9ECBFF;">&quot;z乘风&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    list: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      type: Array,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">default</span><span style="color:#E1E4E8;">: () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> [</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">,</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">,</span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span><span style="color:#FDAEB7;font-style:italic;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;">   * emits支持数组和对象的方式定义触发事件,推荐使用对象方式,</span></span>
<span class="line"><span style="color:#6A737D;">   * 对象方式下可以对触发事件的参数进行类型限制</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FDAEB7;font-style:italic;">emits:[&#39;add&#39;]</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;">   *  setup钩子函数等同于Vue2.x的created和beforeCreated钩子函数,</span></span>
<span class="line"><span style="color:#6A737D;">   *  setup接收组件的props和context两个参数,props是一个响应式对象,</span></span>
<span class="line"><span style="color:#6A737D;">   *  若想以普通对象方式访问props则可以使用toRefs()将响应式对象转换为普通对象。</span></span>
<span class="line"><span style="color:#6A737D;">   *  context是一个对象,它包含了当前组件的attrs、slots、emit3个属性。</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FDAEB7;font-style:italic;">setup(props,</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">context)</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// props是一个响应式对象,toRefs()可以将响应式对象转换为普通对象</span></span>
<span class="line"><span style="color:#E1E4E8;">    const {name,list} </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">toRefs</span><span style="color:#E1E4E8;">(props);</span></span>
<span class="line"><span style="color:#E1E4E8;">    console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(name,list); </span><span style="color:#6A737D;">// &#39;z乘风&#39; [1,2,3]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;">     * context是一个普通对象,包含了组件的attrs、slots、emit</span></span>
<span class="line"><span style="color:#6A737D;">     * attrs和slots都是响应式对象,emit是一个方法,expose是组件对外部暴露的接口</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    const { attrs,slots,emit,expose} </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> context;</span></span>
<span class="line"><span style="color:#E1E4E8;">    console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(attrs,slots); </span><span style="color:#6A737D;">// Proxy {__vInternal: 1} Proxy {__vInternal: 1}</span></span>
<span class="line"><span style="color:#E1E4E8;">    console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(emit) </span><span style="color:#6A737D;">// (event, ...args) =&gt; instance.emit(event, ...args)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 触发事件</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">emit</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;add&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;">     * 使用ref定义响应式变量,ref会根据初始值进行类型推断,也可以显式指定泛型。</span></span>
<span class="line"><span style="color:#6A737D;">     *</span></span>
<span class="line"><span style="color:#6A737D;">     * 相比较reactive ref有一个明显的缺点,获取或设置ref时都需要获取或设置ref的value,</span></span>
<span class="line"><span style="color:#6A737D;">     * 但unref()可以直接返回ref内部value,unref是val = isRef(val) ? val.value : val的语法糖。</span></span>
<span class="line"><span style="color:#6A737D;">     * reactive适合定义集合数据,例如对象、数组等等,ref更适用于单个值</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    const count </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ref</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#79B8FF;">number</span><span style="color:#E1E4E8;">&gt;(</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 定义方法</span></span>
<span class="line"><span style="color:#E1E4E8;">    const </span><span style="color:#B392F0;">decrement</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> ()</span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 获取或设置ref时都需要获取或设置ref的value</span></span>
<span class="line"><span style="color:#E1E4E8;">      count.value </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> count.value </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    const </span><span style="color:#B392F0;">increment</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> ()</span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 获取或设置ref时都需要获取或设置ref的value</span></span>
<span class="line"><span style="color:#E1E4E8;">      count.value </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> count.value </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 需要把定义的响应式变量和方法返回,此时模板才能访问到</span></span>
<span class="line"><span style="color:#E1E4E8;">    return {</span></span>
<span class="line"><span style="color:#E1E4E8;">       count,</span></span>
<span class="line"><span style="color:#E1E4E8;">       decrement,</span></span>
<span class="line"><span style="color:#E1E4E8;">       increment</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span><span style="color:#FDAEB7;font-style:italic;">,</span></span>
<span class="line"><span style="color:#FDAEB7;font-style:italic;">});</span></span>
<span class="line"><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;"> * defineComponent()返回一个对象,该对象包含如下信息:</span></span>
<span class="line"><span style="color:#6A737D;"> *</span></span>
<span class="line"><span style="color:#6A737D;"> * components:{} // defineComponent中定义的components,只有定义才有</span></span>
<span class="line"><span style="color:#6A737D;"> * install: (app) =&gt; {…} // 组件的安装方法</span></span>
<span class="line"><span style="color:#6A737D;"> * props: {} // 组件的props,只有在defineComponent中定义props才有</span></span>
<span class="line"><span style="color:#6A737D;"> * render: ƒ _sfc_render(_ctx, _cache, $props, $setup, $data, $options) // 组件渲染方法</span></span>
<span class="line"><span style="color:#6A737D;"> * setup: setup(props, context) { } // setup函数,定义才有</span></span>
<span class="line"><span style="color:#6A737D;"> * __file: &quot;/Users/vue3-demo/src/components/Component.vue&quot; // 组件文件位置</span></span>
<span class="line"><span style="color:#6A737D;"> * __hmrId: &quot;cc3ff87c&quot; // 热更新id</span></span>
<span class="line"><span style="color:#6A737D;"> * __scopeId: &quot;data-v-cc3ff87c&quot; // scopedId,当组件中使用了&lt;style scoped /&gt;才会出现此属性,</span></span>
<span class="line"><span style="color:#6A737D;"> *  此属性用于隔离组件的样式,使用后会为当前组件下元素添加data-v-cc3ff87c属性,用于区分&lt;style scoped /&gt;中样式的作用范围</span></span>
<span class="line"><span style="color:#6A737D;"> *</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#FDAEB7;font-style:italic;">console.log(component);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">button</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">@click=&quot;decrement&quot;&gt;-&lt;/button&gt;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">&lt;span&gt;{{count}}&lt;/span&gt;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">&lt;button</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">@click=&quot;increment&quot;&gt;+&lt;/button&gt;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#B31D28;font-style:italic;">&lt;/div&gt;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#B31D28;font-style:italic;">&lt;div&gt;type:{{type}}&lt;/div&gt;</span></span>
<span class="line"><span style="color:#B31D28;font-style:italic;">&lt;/template&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// vue3 写法</span></span>
<span class="line"><span style="color:#6F42C1;">import</span><span style="color:#24292E;"> {defineComponent,toRefs,ref} </span><span style="color:#6F42C1;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;vue&#39;</span><span style="color:#B31D28;font-style:italic;">;</span></span>
<span class="line"><span style="color:#6F42C1;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">component</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">=</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">defineComponent({</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#B31D28;font-style:italic;">props:</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    name: {</span></span>
<span class="line"><span style="color:#24292E;">      type: String,</span></span>
<span class="line"><span style="color:#24292E;">      default: </span><span style="color:#032F62;">&quot;z乘风&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    list: {</span></span>
<span class="line"><span style="color:#24292E;">      type: Array,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">default</span><span style="color:#24292E;">: () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> [</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">,</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">,</span><span style="color:#005CC5;">3</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">  }</span><span style="color:#B31D28;font-style:italic;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;">   * emits支持数组和对象的方式定义触发事件,推荐使用对象方式,</span></span>
<span class="line"><span style="color:#6A737D;">   * 对象方式下可以对触发事件的参数进行类型限制</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#B31D28;font-style:italic;">emits:[&#39;add&#39;]</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;">   *  setup钩子函数等同于Vue2.x的created和beforeCreated钩子函数,</span></span>
<span class="line"><span style="color:#6A737D;">   *  setup接收组件的props和context两个参数,props是一个响应式对象,</span></span>
<span class="line"><span style="color:#6A737D;">   *  若想以普通对象方式访问props则可以使用toRefs()将响应式对象转换为普通对象。</span></span>
<span class="line"><span style="color:#6A737D;">   *  context是一个对象,它包含了当前组件的attrs、slots、emit3个属性。</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#B31D28;font-style:italic;">setup(props,</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">context)</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// props是一个响应式对象,toRefs()可以将响应式对象转换为普通对象</span></span>
<span class="line"><span style="color:#24292E;">    const {name,list} </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">toRefs</span><span style="color:#24292E;">(props);</span></span>
<span class="line"><span style="color:#24292E;">    console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(name,list); </span><span style="color:#6A737D;">// &#39;z乘风&#39; [1,2,3]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;">     * context是一个普通对象,包含了组件的attrs、slots、emit</span></span>
<span class="line"><span style="color:#6A737D;">     * attrs和slots都是响应式对象,emit是一个方法,expose是组件对外部暴露的接口</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    const { attrs,slots,emit,expose} </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> context;</span></span>
<span class="line"><span style="color:#24292E;">    console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(attrs,slots); </span><span style="color:#6A737D;">// Proxy {__vInternal: 1} Proxy {__vInternal: 1}</span></span>
<span class="line"><span style="color:#24292E;">    console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(emit) </span><span style="color:#6A737D;">// (event, ...args) =&gt; instance.emit(event, ...args)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 触发事件</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">emit</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;add&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;">     * 使用ref定义响应式变量,ref会根据初始值进行类型推断,也可以显式指定泛型。</span></span>
<span class="line"><span style="color:#6A737D;">     *</span></span>
<span class="line"><span style="color:#6A737D;">     * 相比较reactive ref有一个明显的缺点,获取或设置ref时都需要获取或设置ref的value,</span></span>
<span class="line"><span style="color:#6A737D;">     * 但unref()可以直接返回ref内部value,unref是val = isRef(val) ? val.value : val的语法糖。</span></span>
<span class="line"><span style="color:#6A737D;">     * reactive适合定义集合数据,例如对象、数组等等,ref更适用于单个值</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    const count </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ref</span><span style="color:#24292E;">&lt;</span><span style="color:#005CC5;">number</span><span style="color:#24292E;">&gt;(</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 定义方法</span></span>
<span class="line"><span style="color:#24292E;">    const </span><span style="color:#6F42C1;">decrement</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> ()</span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 获取或设置ref时都需要获取或设置ref的value</span></span>
<span class="line"><span style="color:#24292E;">      count.value </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> count.value </span><span style="color:#D73A49;">-</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    const </span><span style="color:#6F42C1;">increment</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> ()</span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 获取或设置ref时都需要获取或设置ref的value</span></span>
<span class="line"><span style="color:#24292E;">      count.value </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> count.value </span><span style="color:#D73A49;">-</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 需要把定义的响应式变量和方法返回,此时模板才能访问到</span></span>
<span class="line"><span style="color:#24292E;">    return {</span></span>
<span class="line"><span style="color:#24292E;">       count,</span></span>
<span class="line"><span style="color:#24292E;">       decrement,</span></span>
<span class="line"><span style="color:#24292E;">       increment</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span><span style="color:#B31D28;font-style:italic;">,</span></span>
<span class="line"><span style="color:#B31D28;font-style:italic;">});</span></span>
<span class="line"><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;"> * defineComponent()返回一个对象,该对象包含如下信息:</span></span>
<span class="line"><span style="color:#6A737D;"> *</span></span>
<span class="line"><span style="color:#6A737D;"> * components:{} // defineComponent中定义的components,只有定义才有</span></span>
<span class="line"><span style="color:#6A737D;"> * install: (app) =&gt; {…} // 组件的安装方法</span></span>
<span class="line"><span style="color:#6A737D;"> * props: {} // 组件的props,只有在defineComponent中定义props才有</span></span>
<span class="line"><span style="color:#6A737D;"> * render: ƒ _sfc_render(_ctx, _cache, $props, $setup, $data, $options) // 组件渲染方法</span></span>
<span class="line"><span style="color:#6A737D;"> * setup: setup(props, context) { } // setup函数,定义才有</span></span>
<span class="line"><span style="color:#6A737D;"> * __file: &quot;/Users/vue3-demo/src/components/Component.vue&quot; // 组件文件位置</span></span>
<span class="line"><span style="color:#6A737D;"> * __hmrId: &quot;cc3ff87c&quot; // 热更新id</span></span>
<span class="line"><span style="color:#6A737D;"> * __scopeId: &quot;data-v-cc3ff87c&quot; // scopedId,当组件中使用了&lt;style scoped /&gt;才会出现此属性,</span></span>
<span class="line"><span style="color:#6A737D;"> *  此属性用于隔离组件的样式,使用后会为当前组件下元素添加data-v-cc3ff87c属性,用于区分&lt;style scoped /&gt;中样式的作用范围</span></span>
<span class="line"><span style="color:#6A737D;"> *</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#B31D28;font-style:italic;">console.log(component);</span></span></code></pre></div><p><strong>总结:</strong></p><ul><li>defineComponent 用于定义一个组件,接收一个配置对象用于定义组件信息,配置对象可以接收 props、emits、name、setup 等信息。</li><li>setup 是 Vue3.x 新提供的生命周期函数,用于替代 Vue2.x 的 beforeCreated 和 created 钩子函数。它接收 props 和 context 两个参数,props 为组件的 props 且是一个具有响应式的对象,若想以正常 JS 方式操作 props 则可以通过 toRefs()响应式对象转换为普通的 JS 对象。context 是一个普通对象,包含了组件的 attrs、slots、emit、expose,attrs、slots、emit 等用于组件实例的$attrs、$slots、$emit,attrs、slots 都是响应式对象,emit 是一个方法,可以通过 emit 触发对应的事件,expose 是组件对外暴露的接口。</li><li>ref 可以定义响应式对象但一般用于单个值。setup 函数需要返回模板中所用到的属性或方法,props 中的属性可除外。</li></ul><h4 id="defineasynccomponent-定义异步组件" tabindex="-1">defineAsyncComponent 定义异步组件 <a class="header-anchor" href="#defineasynccomponent-定义异步组件" aria-label="Permalink to &quot;defineAsyncComponent 定义异步组件&quot;">​</a></h4><p>defineAsyncComponent()用于创建一个只有在需要时才会加载的异步组件。defineAsyncComponent 可以接受一个返回 Promise 的工厂函数,Promise 的 resolve 回调应该在服务端返回组件定义后被调用,也可以调用 reject(reason) 来表示加载失败。defineAsyncComponent()也可以接受一个配置对象定义组件信息。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/** defineAsyncComponent接收一个 Promise */</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { defineAsyncComponent } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;vue&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">AsyncComp</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">defineAsyncComponent</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">import</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;./components/AsyncComponent.vue&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">app.</span><span style="color:#B392F0;">component</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;async-component&quot;</span><span style="color:#E1E4E8;">, AsyncComp);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/** defineAsyncComponent接收一个 Promise */</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { defineAsyncComponent } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;vue&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">AsyncComp</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">defineAsyncComponent</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">import</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;./components/AsyncComponent.vue&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">app.</span><span style="color:#6F42C1;">component</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;async-component&quot;</span><span style="color:#24292E;">, AsyncComp);</span></span></code></pre></div><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/** defineAsyncComponent()接收一个配置对象 */</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { defineAsyncComponent } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;vue&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">AsyncComp</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">defineAsyncComponent</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 工厂函数</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">loader</span><span style="color:#E1E4E8;">: () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">import</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;./Foo.vue&quot;</span><span style="color:#E1E4E8;">),</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 加载异步组件时要使用的组件</span></span>
<span class="line"><span style="color:#E1E4E8;">  loadingComponent: LoadingComponent,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 加载失败时要使用的组件</span></span>
<span class="line"><span style="color:#E1E4E8;">  errorComponent: ErrorComponent,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 在显示 loadingComponent 之前的延迟 | 默认值：200（单位 ms）</span></span>
<span class="line"><span style="color:#E1E4E8;">  delay: </span><span style="color:#79B8FF;">200</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 如果提供了 timeout ，并且加载组件的时间超过了设定值，将显示错误组件</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 默认值：Infinity（即永不超时，单位 ms）</span></span>
<span class="line"><span style="color:#E1E4E8;">  timeout: </span><span style="color:#79B8FF;">3000</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 定义组件是否可挂起 | 默认值：true</span></span>
<span class="line"><span style="color:#E1E4E8;">  suspensible: </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">   *</span></span>
<span class="line"><span style="color:#6A737D;">   * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">{*}</span><span style="color:#6A737D;"> </span><span style="color:#E1E4E8;">error</span><span style="color:#6A737D;"> 错误信息对象</span></span>
<span class="line"><span style="color:#6A737D;">   * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">{*}</span><span style="color:#6A737D;"> </span><span style="color:#E1E4E8;">retry</span><span style="color:#6A737D;"> 一个函数，用于指示当 promise 加载器 reject 时，加载器是否应该重试</span></span>
<span class="line"><span style="color:#6A737D;">   * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">{*}</span><span style="color:#6A737D;"> </span><span style="color:#E1E4E8;">fail</span><span style="color:#6A737D;">  一个函数，指示加载程序结束退出</span></span>
<span class="line"><span style="color:#6A737D;">   * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">{*}</span><span style="color:#6A737D;"> </span><span style="color:#E1E4E8;">attempts</span><span style="color:#6A737D;"> 允许的最大重试次数</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">onError</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">error</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">retry</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">fail</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">attempts</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (error.message.</span><span style="color:#B392F0;">match</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">/</span><span style="color:#DBEDFF;">fetch</span><span style="color:#9ECBFF;">/</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> attempts </span><span style="color:#F97583;">&lt;=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 请求发生错误时重试，最多可尝试 3 次</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">retry</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 注意，retry/fail 就像 promise 的 resolve/reject 一样：</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 必须调用其中一个才能继续错误处理。</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">fail</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/** defineAsyncComponent()接收一个配置对象 */</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { defineAsyncComponent } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;vue&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">AsyncComp</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">defineAsyncComponent</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 工厂函数</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">loader</span><span style="color:#24292E;">: () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">import</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;./Foo.vue&quot;</span><span style="color:#24292E;">),</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 加载异步组件时要使用的组件</span></span>
<span class="line"><span style="color:#24292E;">  loadingComponent: LoadingComponent,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 加载失败时要使用的组件</span></span>
<span class="line"><span style="color:#24292E;">  errorComponent: ErrorComponent,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 在显示 loadingComponent 之前的延迟 | 默认值：200（单位 ms）</span></span>
<span class="line"><span style="color:#24292E;">  delay: </span><span style="color:#005CC5;">200</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 如果提供了 timeout ，并且加载组件的时间超过了设定值，将显示错误组件</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 默认值：Infinity（即永不超时，单位 ms）</span></span>
<span class="line"><span style="color:#24292E;">  timeout: </span><span style="color:#005CC5;">3000</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 定义组件是否可挂起 | 默认值：true</span></span>
<span class="line"><span style="color:#24292E;">  suspensible: </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">   *</span></span>
<span class="line"><span style="color:#6A737D;">   * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">{*}</span><span style="color:#6A737D;"> </span><span style="color:#24292E;">error</span><span style="color:#6A737D;"> 错误信息对象</span></span>
<span class="line"><span style="color:#6A737D;">   * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">{*}</span><span style="color:#6A737D;"> </span><span style="color:#24292E;">retry</span><span style="color:#6A737D;"> 一个函数，用于指示当 promise 加载器 reject 时，加载器是否应该重试</span></span>
<span class="line"><span style="color:#6A737D;">   * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">{*}</span><span style="color:#6A737D;"> </span><span style="color:#24292E;">fail</span><span style="color:#6A737D;">  一个函数，指示加载程序结束退出</span></span>
<span class="line"><span style="color:#6A737D;">   * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">{*}</span><span style="color:#6A737D;"> </span><span style="color:#24292E;">attempts</span><span style="color:#6A737D;"> 允许的最大重试次数</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">onError</span><span style="color:#24292E;">(</span><span style="color:#E36209;">error</span><span style="color:#24292E;">, </span><span style="color:#E36209;">retry</span><span style="color:#24292E;">, </span><span style="color:#E36209;">fail</span><span style="color:#24292E;">, </span><span style="color:#E36209;">attempts</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (error.message.</span><span style="color:#6F42C1;">match</span><span style="color:#24292E;">(</span><span style="color:#032F62;">/fetch/</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> attempts </span><span style="color:#D73A49;">&lt;=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">3</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 请求发生错误时重试，最多可尝试 3 次</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">retry</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 注意，retry/fail 就像 promise 的 resolve/reject 一样：</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 必须调用其中一个才能继续错误处理。</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">fail</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">});</span></span></code></pre></div><h3 id="组件生命周期" tabindex="-1">组件生命周期 <a class="header-anchor" href="#组件生命周期" aria-label="Permalink to &quot;组件生命周期&quot;">​</a></h3><h3 id="定义响应式数据和方法" tabindex="-1">定义响应式数据和方法 <a class="header-anchor" href="#定义响应式数据和方法" aria-label="Permalink to &quot;定义响应式数据和方法&quot;">​</a></h3><h3 id="使用-props-和-emits-触发事件" tabindex="-1">使用 props 和 emits 触发事件 <a class="header-anchor" href="#使用-props-和-emits-触发事件" aria-label="Permalink to &quot;使用 props 和 emits 触发事件&quot;">​</a></h3><p>目前 TypeScript 已是前端届的主流,所以在声明 props 或 emits 应该为其添加类型约束。</p><h4 id="定义-props" tabindex="-1">定义 props <a class="header-anchor" href="#定义-props" aria-label="Permalink to &quot;定义 props&quot;">​</a></h4><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { dineComponent,PropType,toRefs} </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;vue&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">interface</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Book</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#FFAB70;">name</span><span style="color:#F97583;">:</span><span style="color:#79B8FF;">string</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#FFAB70;">price</span><span style="color:#F97583;">?:</span><span style="color:#79B8FF;">number</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">dineComponent</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">    props:{</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 使用Vue内置的类型,无法进行更细致的类型检查</span></span>
<span class="line"><span style="color:#E1E4E8;">        name:String,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 借助ts类型断言和PropType进行类型推论可以获得更加丰富的类型提示</span></span>
<span class="line"><span style="color:#E1E4E8;">        book:{</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// PropType是Vue3提供用于类型推论的Api。</span></span>
<span class="line"><span style="color:#E1E4E8;">            type:Object </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">PropType</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#B392F0;">Book</span><span style="color:#E1E4E8;">&gt;,</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 默认值函数可提供一个this参数</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">default</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">this</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">void</span><span style="color:#E1E4E8;">)</span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#B392F0;">return</span><span style="color:#E1E4E8;"> { </span><span style="color:#FFAB70;">name</span><span style="color:#F97583;">:</span><span style="color:#9ECBFF;">&quot;我爱你一万年&quot;</span><span style="color:#E1E4E8;">,</span><span style="color:#FFAB70;">price</span><span style="color:#F97583;">:</span><span style="color:#79B8FF;">18.9</span><span style="color:#E1E4E8;"> }</span></span>
<span class="line"><span style="color:#E1E4E8;">            },</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 验证器接收this和props值两个参数</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">validator</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">this</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">void</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">book</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Book</span><span style="color:#E1E4E8;">){</span></span>
<span class="line"><span style="color:#E1E4E8;">               </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">!!</span><span style="color:#E1E4E8;">book.price;</span></span>
<span class="line"><span style="color:#E1E4E8;">            },</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 是否必填</span></span>
<span class="line"><span style="color:#E1E4E8;">            required: </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">        },</span></span>
<span class="line"><span style="color:#E1E4E8;">        callback:{</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// PropType类型推论 callback是一个函数且必须类型为布尔的isComplete参数,可以无返回值</span></span>
<span class="line"><span style="color:#E1E4E8;">            type:Function </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">PropType</span><span style="color:#E1E4E8;">&lt;(</span><span style="color:#FFAB70;">isComplete</span><span style="color:#F97583;">:</span><span style="color:#79B8FF;">boolean</span><span style="color:#E1E4E8;">)</span><span style="color:#F97583;">=&gt;</span><span style="color:#79B8FF;">void</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        },</span></span>
<span class="line"><span style="color:#E1E4E8;">        metadata:{</span></span>
<span class="line"><span style="color:#E1E4E8;">            type:</span><span style="color:#79B8FF;">null</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 接收组件的props和上下文对象</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">setup</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">props</span><span style="color:#E1E4E8;">,</span><span style="color:#FFAB70;">context</span><span style="color:#E1E4E8;">){</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 组件的props是一个响应式对象,不能像普通对象操作props,但可以通过toRefs()将props转为普通对象</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">newProps</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">toRefs</span><span style="color:#E1E4E8;">(props);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { dineComponent,PropType,toRefs} </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;vue&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">interface</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Book</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#E36209;">name</span><span style="color:#D73A49;">:</span><span style="color:#005CC5;">string</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#E36209;">price</span><span style="color:#D73A49;">?:</span><span style="color:#005CC5;">number</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">dineComponent</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">    props:{</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 使用Vue内置的类型,无法进行更细致的类型检查</span></span>
<span class="line"><span style="color:#24292E;">        name:String,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 借助ts类型断言和PropType进行类型推论可以获得更加丰富的类型提示</span></span>
<span class="line"><span style="color:#24292E;">        book:{</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// PropType是Vue3提供用于类型推论的Api。</span></span>
<span class="line"><span style="color:#24292E;">            type:Object </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">PropType</span><span style="color:#24292E;">&lt;</span><span style="color:#6F42C1;">Book</span><span style="color:#24292E;">&gt;,</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 默认值函数可提供一个this参数</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">default</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">this</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">void</span><span style="color:#24292E;">)</span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#6F42C1;">return</span><span style="color:#24292E;"> { </span><span style="color:#E36209;">name</span><span style="color:#D73A49;">:</span><span style="color:#032F62;">&quot;我爱你一万年&quot;</span><span style="color:#24292E;">,</span><span style="color:#E36209;">price</span><span style="color:#D73A49;">:</span><span style="color:#005CC5;">18.9</span><span style="color:#24292E;"> }</span></span>
<span class="line"><span style="color:#24292E;">            },</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 验证器接收this和props值两个参数</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">validator</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">this</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">void</span><span style="color:#24292E;">, </span><span style="color:#E36209;">book</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Book</span><span style="color:#24292E;">){</span></span>
<span class="line"><span style="color:#24292E;">               </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">!!</span><span style="color:#24292E;">book.price;</span></span>
<span class="line"><span style="color:#24292E;">            },</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 是否必填</span></span>
<span class="line"><span style="color:#24292E;">            required: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">        },</span></span>
<span class="line"><span style="color:#24292E;">        callback:{</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// PropType类型推论 callback是一个函数且必须类型为布尔的isComplete参数,可以无返回值</span></span>
<span class="line"><span style="color:#24292E;">            type:Function </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">PropType</span><span style="color:#24292E;">&lt;(</span><span style="color:#E36209;">isComplete</span><span style="color:#D73A49;">:</span><span style="color:#005CC5;">boolean</span><span style="color:#24292E;">)</span><span style="color:#D73A49;">=&gt;</span><span style="color:#005CC5;">void</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        },</span></span>
<span class="line"><span style="color:#24292E;">        metadata:{</span></span>
<span class="line"><span style="color:#24292E;">            type:</span><span style="color:#005CC5;">null</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 接收组件的props和上下文对象</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">setup</span><span style="color:#24292E;">(</span><span style="color:#E36209;">props</span><span style="color:#24292E;">,</span><span style="color:#E36209;">context</span><span style="color:#24292E;">){</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 组件的props是一个响应式对象,不能像普通对象操作props,但可以通过toRefs()将props转为普通对象</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">newProps</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">toRefs</span><span style="color:#24292E;">(props);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><h4 id="定义-emits" tabindex="-1">定义 emits <a class="header-anchor" href="#定义-emits" aria-label="Permalink to &quot;定义 emits&quot;">​</a></h4><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> {defineComponent} </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;vue&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">interface</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Book</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#FFAB70;">name</span><span style="color:#F97583;">:</span><span style="color:#79B8FF;">string</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#FFAB70;">price</span><span style="color:#F97583;">?:</span><span style="color:#79B8FF;">number</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">defineComponent</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;">     * emits可以是数组也可以是对象,如果是数组则无法为emit的事件参数做类型约束,</span></span>
<span class="line"><span style="color:#6A737D;">     * 所以一般不推荐使用数组写法,而是推荐对象写法</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// emits:[&quot;addBook&quot;,&quot;delBook&quot;], // 数组写法</span></span>
<span class="line"><span style="color:#E1E4E8;">    emits:{</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 约束payload参数类型为Book</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">addBook</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">payload</span><span style="color:#F97583;">:</span><span style="color:#B392F0;">Book</span><span style="color:#E1E4E8;">){</span></span>
<span class="line"><span style="color:#E1E4E8;">           </span><span style="color:#6A737D;">// 运行时验证</span></span>
<span class="line"><span style="color:#E1E4E8;">           </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> payload.name.</span><span style="color:#79B8FF;">length</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span></span>
<span class="line"><span style="color:#E1E4E8;">        },</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 约束参数为string类型,返回值为Boolean类型</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">delBook</span><span style="color:#E1E4E8;">:(</span><span style="color:#FFAB70;">payload</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">string</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> Boolean</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;">     * context是一个普通对象,包含了组件的attrs、slot、emit、expose,</span></span>
<span class="line"><span style="color:#6A737D;">     * 其中emit是一个方法用于触发事件,其余参数皆为对象。</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">setup</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">props</span><span style="color:#E1E4E8;">,</span><span style="color:#FFAB70;">context</span><span style="color:#E1E4E8;">){</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> { </span><span style="color:#79B8FF;">attrs</span><span style="color:#E1E4E8;">,</span><span style="color:#79B8FF;">slots</span><span style="color:#E1E4E8;">、</span><span style="color:#79B8FF;">emit</span><span style="color:#E1E4E8;">、</span><span style="color:#79B8FF;">expose</span><span style="color:#E1E4E8;"> }</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> context;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">emit</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;addBook&quot;</span><span style="color:#E1E4E8;">, { price: </span><span style="color:#79B8FF;">20.0</span><span style="color:#E1E4E8;"> }); </span><span style="color:#6A737D;">// error,类型错误</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">emit</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;addBook&quot;</span><span style="color:#E1E4E8;">, { name: </span><span style="color:#9ECBFF;">&quot;哈哈哈&quot;</span><span style="color:#E1E4E8;"> } </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Book</span><span style="color:#E1E4E8;">); </span><span style="color:#6A737D;">// ok</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">emit</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;delBook&quot;</span><span style="color:#E1E4E8;">,(</span><span style="color:#FFAB70;">name</span><span style="color:#F97583;">:</span><span style="color:#79B8FF;">string</span><span style="color:#E1E4E8;">)</span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;">Boolean)</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> {defineComponent} </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;vue&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">interface</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Book</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#E36209;">name</span><span style="color:#D73A49;">:</span><span style="color:#005CC5;">string</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#E36209;">price</span><span style="color:#D73A49;">?:</span><span style="color:#005CC5;">number</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">defineComponent</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;">     * emits可以是数组也可以是对象,如果是数组则无法为emit的事件参数做类型约束,</span></span>
<span class="line"><span style="color:#6A737D;">     * 所以一般不推荐使用数组写法,而是推荐对象写法</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// emits:[&quot;addBook&quot;,&quot;delBook&quot;], // 数组写法</span></span>
<span class="line"><span style="color:#24292E;">    emits:{</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 约束payload参数类型为Book</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">addBook</span><span style="color:#24292E;">(</span><span style="color:#E36209;">payload</span><span style="color:#D73A49;">:</span><span style="color:#6F42C1;">Book</span><span style="color:#24292E;">){</span></span>
<span class="line"><span style="color:#24292E;">           </span><span style="color:#6A737D;">// 运行时验证</span></span>
<span class="line"><span style="color:#24292E;">           </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> payload.name.</span><span style="color:#005CC5;">length</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span></span>
<span class="line"><span style="color:#24292E;">        },</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 约束参数为string类型,返回值为Boolean类型</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">delBook</span><span style="color:#24292E;">:(</span><span style="color:#E36209;">payload</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> Boolean</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;">     * context是一个普通对象,包含了组件的attrs、slot、emit、expose,</span></span>
<span class="line"><span style="color:#6A737D;">     * 其中emit是一个方法用于触发事件,其余参数皆为对象。</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">setup</span><span style="color:#24292E;">(</span><span style="color:#E36209;">props</span><span style="color:#24292E;">,</span><span style="color:#E36209;">context</span><span style="color:#24292E;">){</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> { </span><span style="color:#005CC5;">attrs</span><span style="color:#24292E;">,</span><span style="color:#005CC5;">slots</span><span style="color:#24292E;">、</span><span style="color:#005CC5;">emit</span><span style="color:#24292E;">、</span><span style="color:#005CC5;">expose</span><span style="color:#24292E;"> }</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> context;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">emit</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;addBook&quot;</span><span style="color:#24292E;">, { price: </span><span style="color:#005CC5;">20.0</span><span style="color:#24292E;"> }); </span><span style="color:#6A737D;">// error,类型错误</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">emit</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;addBook&quot;</span><span style="color:#24292E;">, { name: </span><span style="color:#032F62;">&quot;哈哈哈&quot;</span><span style="color:#24292E;"> } </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Book</span><span style="color:#24292E;">); </span><span style="color:#6A737D;">// ok</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">emit</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;delBook&quot;</span><span style="color:#24292E;">,(</span><span style="color:#E36209;">name</span><span style="color:#D73A49;">:</span><span style="color:#005CC5;">string</span><span style="color:#24292E;">)</span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;">Boolean)</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><h3 id="使用插槽和定义指令" tabindex="-1">使用插槽和定义指令 <a class="header-anchor" href="#使用插槽和定义指令" aria-label="Permalink to &quot;使用插槽和定义指令&quot;">​</a></h3><h3 id="定义计算属性和侦听数据" tabindex="-1">定义计算属性和侦听数据 <a class="header-anchor" href="#定义计算属性和侦听数据" aria-label="Permalink to &quot;定义计算属性和侦听数据&quot;">​</a></h3>`,22),e=[o];function t(c,r,y,E,i,F){return n(),a("div",null,e)}const m=s(l,[["render",t]]);export{D as __pageData,m as default};
