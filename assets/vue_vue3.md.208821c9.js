import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.a9ea851b.js";const A=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"vue/vue3.md","filePath":"vue/vue3.md","lastUpdated":1694073156000}'),p={name:"vue/vue3.md"},o=l(`<h3 id="定义组件" tabindex="-1">定义组件 <a class="header-anchor" href="#定义组件" aria-label="Permalink to &quot;定义组件&quot;">​</a></h3><h4 id="definedcomponent" tabindex="-1">definedComponent <a class="header-anchor" href="#definedcomponent" aria-label="Permalink to &quot;definedComponent&quot;">​</a></h4><p>defineComponent 用于定义一个组件,允许接收一个组件 Option 的对象,或者是一个 setup 函数，函数名称将作为组件名称来使用。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// vue2.x的写法:defineComponent接收options对象</span></span>
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
<span class="line"><span style="color:#B31D28;font-style:italic;">console.log(component);</span></span></code></pre></div><p><strong>总结:</strong></p><ul><li>defineComponent 用于定义一个组件,接收一个配置对象用于定义组件信息,配置对象可以接收 props、emits、name、setup 等信息。</li><li>setup 是 Vue3.x 新提供的生命周期函数,用于替代 Vue2.x 的 beforeCreated 和 created 钩子函数。它接收 props 和 context 两个参数,props 为组件的 props 且是一个具有响应式的对象,若想以正常 JS 方式操作 props 则可以通过 toRefs()响应式对象转换为普通的 JS 对象。context 是一个普通对象,包含了组件的 attrs、slots、emit、expose,attrs、slots、emit 等用于组件实例的$attrs、$slots、$emit,attrs、slots 都是响应式对象,emit 是一个方法,可以通过 emit 触发对应的事件,expose 是组件对外暴露的接口。</li><li>ref 可以定义响应式对象但一般用于单个值。setup 函数需要返回模板中所用到的属性或方法,props 中的属性可除外。</li></ul><h4 id="defineasynccomponent" tabindex="-1">defineAsyncComponent <a class="header-anchor" href="#defineasynccomponent" aria-label="Permalink to &quot;defineAsyncComponent&quot;">​</a></h4><p>defineAsyncComponent()用于创建一个只有在需要时才会加载的异步组件。defineAsyncComponent 可以接受一个返回 Promise 的工厂函数,Promise 的 resolve 回调应该在服务端返回组件定义后被调用,也可以调用 reject(reason) 来表示加载失败。defineAsyncComponent()也可以接受一个配置对象定义组件信息。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/** defineAsyncComponent接收一个 Promise */</span></span>
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
<span class="line"><span style="color:#24292E;">});</span></span></code></pre></div><h4 id="h" tabindex="-1">h <a class="header-anchor" href="#h" aria-label="Permalink to &quot;h&quot;">​</a></h4><p>h()用于创建虚拟节点(VNode),VNode 其实就是一个普通的 JS 对象,它包含了在页面渲染的节点信息和其所有子节点的描述,h()相当于一个手动渲染(render)函数。h()接收 type，props 和 children 三个参数:</p><ul><li>type:type 表示渲染节点的类型,可选类型为<code>String | Object | Function</code>。type 可以是 HTML 标签名、组件、异步组件或函数式组件,使用 null 或者返回 null 的函数将会被渲染一个注释,type 参数是必填的。</li><li>props:表示节点的 props,它是一个对象,与我们将在模板中使用的 attribute、prop 和事件相对应,可选。</li><li>children:表示子代 VNode,可选类型有<code>String | Array | Object</code>,children 可以使用 h() 生成,或者使用字符串来获取&quot;文本 VNode&quot;,或带有插槽的对象。</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"></span></code></pre></div><h3 id="组件生命周期" tabindex="-1">组件生命周期 <a class="header-anchor" href="#组件生命周期" aria-label="Permalink to &quot;组件生命周期&quot;">​</a></h3><h3 id="定义响应式状态" tabindex="-1">定义响应式状态 <a class="header-anchor" href="#定义响应式状态" aria-label="Permalink to &quot;定义响应式状态&quot;">​</a></h3><h3 id="组件通讯" tabindex="-1">组件通讯 <a class="header-anchor" href="#组件通讯" aria-label="Permalink to &quot;组件通讯&quot;">​</a></h3><h3 id="内置组件" tabindex="-1">内置组件 <a class="header-anchor" href="#内置组件" aria-label="Permalink to &quot;内置组件&quot;">​</a></h3><h3 id="新的指令" tabindex="-1">新的指令 <a class="header-anchor" href="#新的指令" aria-label="Permalink to &quot;新的指令&quot;">​</a></h3><h3 id="script-setup-语法糖" tabindex="-1"><code>&lt;script setup/&gt;</code>语法糖 <a class="header-anchor" href="#script-setup-语法糖" aria-label="Permalink to &quot;\`&lt;script setup/&gt;\`语法糖&quot;">​</a></h3><p>Vue 在 3.2 版本正式发布了<code>&lt;script setup/&gt;</code>语法糖特性,提供了一种是相比较 defineComponent 定义组件更为简洁的方式,其特性如下:</p><ul><li>顶层的绑定会被暴露给模板。<code>&lt;script setup&gt;</code>定义的变量可以直接用于模板。使用时<code>&lt;script setup&gt;</code>,模板被编译成一个内联在 setup 函数范围内的渲染函数。这意味着内部声明的任何顶级绑定(变量和导入)<code>&lt;script setup&gt;</code>都可以直接在模板中使用。</li><li>引入组件或指令(需要以 v 为前缀)无需注册即可使用。</li><li>支持 defineProps 和 defineEmits 定义 Props 和 Emits, 通过 defineProps 和 defineEmits 声明具有完整类型推断支持的 props 和 emits(无需引入)。defineProps 的缺点是无法为 Props 提供默认值,但是 Vue 提供 withDefaults()编译器宏用于解决此问题。</li><li>通过 Composition Api 获取 Slots、Attrs。在<code>&lt;script setup&gt;</code>可通过 useSlots 和 useAttrs 获取 slots 和 attrs。在<code>&lt;script setup&gt;</code>中使用 slots 和 attrs 是非常少见的,Vue 也提供了 this.$slots和this.$attrs 用于获取 slots 和 attrs,极少数情况可以通过 useSlots 和 useAttrs 获取 slots 和 attrs。</li><li>顶层 await。在<code>&lt;script setup&gt;</code>顶级作用域中可以使用 await,setup()将生成 async 函数作为结果。</li><li>对外暴露接口。可以通过 defineExpose 编译器宏对外提供属性或方法。</li><li>与普通的<code>&lt;script&gt;</code>一起使用。</li></ul><p><strong>setup 的限制</strong>: 由于模块执行语义的差异,内部代码<code>&lt;script setup&gt;</code>依赖于 SFC 的上下文。当移动到外部.js 或.ts 文件中时，它可能会导致开发人员和工具的混淆。而且<code>&lt;script setup&gt;</code>不能与 src 属性一起使用。</p><p><strong>setup 的缺点</strong>:</p><ul><li>IDE 需要为这个新<code>&lt;script setup&gt;</code>模型提供专门的处理,以便提供模板表达式类型检查/道具验证等。Vue 官方推荐 Vue2 版本使用 Vetur 插件作为 Vue 辅助开发工具,推荐 Vue3 版本使用 Volar 作为 Vue 辅助开发工具,截至目前，Volar 已经在 VSCode 中提供了对该 RFC 的全面支持,包括所有与 TypeScript 相关的功能。它的内部也被实现为一个语言服务器，理论上可以在其他 IDE 中使用。</li><li>使用<code>&lt;script setup&gt;</code>获取导致 ESLint 规则失效。ESLint 规则如 no-unused-vars,我们需要一个替换规则 eslint-plugin-vue,将 <code>&lt;script setup&gt;</code>和<code>&lt;template&gt;</code>表达式都考虑在内。</li></ul><h3 id="style-新特性" tabindex="-1">Style 新特性 <a class="header-anchor" href="#style-新特性" aria-label="Permalink to &quot;Style 新特性&quot;">​</a></h3><h3 id="style-scoped" tabindex="-1"><code>&lt;style scoped&gt;</code> <a class="header-anchor" href="#style-scoped" aria-label="Permalink to &quot;\`&lt;style scoped&gt;\`&quot;">​</a></h3><p>当 <code>&lt;style&gt;</code>标签带有 scoped 属性时,它定义的属性仅会作用于当前组件,而不会影响其他组件的样式(会影响子组件的根节点),这是因为 Vue 通过 PostCSS 为组件生成了 scoped 唯一标识,该标识会被做为当前组件下所有元素的属性,<code>&lt;style scoped/&gt;</code>中所定义的样式会被转换为引用 scoped 唯一标识做为属性选择器的样式。</p><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">style</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">scoped</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#B392F0;">.example</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">color</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">red</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">style</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;example&quot;</span><span style="color:#E1E4E8;">&gt;hi&lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">&lt;!-- 转换后的内容如下: --&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">style</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#B392F0;">.example</span><span style="color:#E1E4E8;">[</span><span style="color:#B392F0;">data-v-f3f3eg9</span><span style="color:#E1E4E8;">] {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">color</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">red</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">style</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;example&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">data-v-f3f3eg9</span><span style="color:#E1E4E8;">&gt;hi&lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">style</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">scoped</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#6F42C1;">.example</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">color</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">red</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">style</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;example&quot;</span><span style="color:#24292E;">&gt;hi&lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">&lt;!-- 转换后的内容如下: --&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">style</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#6F42C1;">.example</span><span style="color:#24292E;">[</span><span style="color:#6F42C1;">data-v-f3f3eg9</span><span style="color:#24292E;">] {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">color</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">red</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">style</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;example&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">data-v-f3f3eg9</span><span style="color:#24292E;">&gt;hi&lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><h4 id="sfc-状态驱动-css-变量" tabindex="-1">SFC 状态驱动 CSS 变量 <a class="header-anchor" href="#sfc-状态驱动-css-变量" aria-label="Permalink to &quot;SFC 状态驱动 CSS 变量&quot;">​</a></h4><p>在 Vue3.2 版本中提供了 v-bind 函数用于将组件状态绑定到 CSS,一旦组件状态发生变化时绑定到的 CSS 也将进行响应式的更新,基于这一特性动态切换 CSS 属性变得轻而易举。</p><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">span</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;text&quot;</span><span style="color:#E1E4E8;">&gt;hello CSS&lt;/</span><span style="color:#85E89D;">span</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">button</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">@click</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;changeCssVariable&quot;</span><span style="color:#E1E4E8;">&gt;change color&lt;/</span><span style="color:#85E89D;">button</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { defineComponent, ref } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;vue&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">defineComponent</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">setup</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">color</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ref</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;#000&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">changeCssVariable</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      color.value </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;red&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    };</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      color,</span></span>
<span class="line"><span style="color:#E1E4E8;">      changeCssVariable,</span></span>
<span class="line"><span style="color:#E1E4E8;">    };</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">style</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">scoped</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#B392F0;">.text</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">color</span><span style="color:#E1E4E8;">: v-bind(</span><span style="color:#79B8FF;">color</span><span style="color:#E1E4E8;">.value);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">style</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">span</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;text&quot;</span><span style="color:#24292E;">&gt;hello CSS&lt;/</span><span style="color:#22863A;">span</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">button</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">@click</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;changeCssVariable&quot;</span><span style="color:#24292E;">&gt;change color&lt;/</span><span style="color:#22863A;">button</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { defineComponent, ref } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;vue&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">defineComponent</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">setup</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">color</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ref</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;#000&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">changeCssVariable</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      color.value </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;red&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    };</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      color,</span></span>
<span class="line"><span style="color:#24292E;">      changeCssVariable,</span></span>
<span class="line"><span style="color:#24292E;">    };</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">});</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">style</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">scoped</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#6F42C1;">.text</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">color</span><span style="color:#24292E;">: v-bind(</span><span style="color:#005CC5;">color</span><span style="color:#24292E;">.value);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">style</span><span style="color:#24292E;">&gt;</span></span></code></pre></div>`,33),e=[o];function t(c,r,E,y,i,d){return n(),a("div",null,e)}const F=s(p,[["render",t]]);export{A as __pageData,F as default};
