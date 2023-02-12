### 什么是 MVVC 架构?

MVVM 是 Model-View-ViewModel 的简写。它本质上就是 MVC 的改进版。MVVM 就是将其中的 View 的状态和行为抽象化,让视图 UI 和业务逻辑分开。ViewModel 充当 Model 和 View 之间的桥梁,当 Model 发生改变时 ViewModel 会通知对应的 View 进行重新渲染,当 View 发生变化时 ViewModel 也会通知 Model 发生变化。

### Vue 组件的 data 选项为什么是一个函数

组件作用是抽离公共逻辑单元,这意味着组件是可以公用的,如果 data 是一个对象的话,那么所有组件实例都能访问到 data 对象,因为对象是对内存地址的引用,这样会造成组件数据的相互影响。如果 data 是一个函数,每个组件实例可以维护一份被返回对象的独立的拷贝。

### 在 Vue 中为什么 Props 是单向流?如何使 Props 变为双向流?

所有的 prop 都使得其父子 prop 之间形成了一个单向下行绑定:父级 prop 的更新会向下流动到子组件中,但是反过来则不行。这样会防止从子组件意外变更父级组件的状态,从而导致你的应用的数据流向难以理解。但可以通过`$emit()`和`.sync`修饰符进行双向数据流通讯。

### 为什么在组件的 created 进行请求数据?

- 能更快获取到服务端数据,减少页面 loading 时间。
- ssr 不支持 beforeMount、mounted 钩子函数,所以放在 created 中有助于一致性。

### Vue 中 data 的属性可以和 methods 中的方法名相同吗?

不可以。因为 Vue 会把 methods 和 data 的东西全部代理到 Vue 生成的对象中,如果同名会发生覆盖,建议不要同名。

### v-if 指令与 v-show 指令的区别?

- v-show 本质就是通过设置 css 中的 display 设置为 none,控制元素隐藏,不管初始条件是什么元素总会渲染。v-if 是动态的向 DOM 树内添加或者删除 DOM 元素,当初识条件为 false 元素则不会被渲染。
- v-if 切换时有一个局部编译和卸载的过程,切换过程中合适地销毁和重建内部的事件监听和子组件,所以 v-if 相比 v-show 具有更高的切换开销,而 v-show 有更高的初始渲染开销。
- v-if 也是惰性的。如果在初始渲染时条件为假,则什么也不做——直到条件第一次变为真时,才会开始渲染条件块。

### Vue 中使用 v-for 指令为什么还要绑定 key?

如果不使用 key,Vue 会使用一种最大限度减少动态元素并且尽可能的尝试就地修改/复用相同类型元素的算法。key 是为 Vue 中 vnode 的唯一标记,通过这个 key,diff 操作可以更准确、更快速。

- 「更准确」:因为带 key 就不是就地复用了,在 sameNode 函数 a.key === b.key 对比中可以避免就地复用的情况。所以会更加准确。

- 「更快速」:利用 key 的唯一性生成 map 对象来获取对应节点,比遍历方式更快。

相关代码如下

```js
// 判断两个vnode的标签和key是否相同 如果相同 就可以认为是同一节点就地复用
function isSameVnode(oldVnode, newVnode) {
  return oldVnode.tag === newVnode.tag && oldVnode.key === newVnode.key;
}

// 根据key来创建老的儿子的index映射表  类似 {'a':0,'b':1} 代表key为'a'的节点在第一个位置 key为'b'的节点在第二个位置
function makeIndexByKey(children) {
  let map = {};
  children.forEach((item, index) => {
    map[item.key] = index;
  });
  return map;
}
// 生成的映射表
let map = makeIndexByKey(oldCh);
```

### v-for 指令与 v-if 指令优先级?为什么 v-for 优先级高于 v-if?

v-for 指令的优先级高于 v-if 指令,官方并不推荐 v-for 与 v-if 同时使用。如果 v-for 和 v-if 指令同时出现时,每次渲染都会先去循环再去判断,造成了额外的性能开销。

```js
// vue-template-compiler是一个可以将Vue模板编译为渲染函数的工具库
const compiler = require("vue-template-compiler");
const template = `<div v-if="false" v-for="n in 3"></div>`;
/**
 * compile用于编译模板字符串并返回已编译的 JavaScript 代码,返回对象格式如下:
 * {
    ast:？ASTElement,  // 将模板元素解析为 AST,一个树形结构用于描述模板信息
    render:string,  // 主渲染函数代码,返回的函数代码使用with包裹,
    因此不能在严格模式代码中使用(违反CSP,即Content Security Policy,中文译为内容安全策略)
    staticRenderFns:Array<string>, // 为静态子树渲染代码，如果有
    errors:Array<string>  // 模板语法错误，如果任何
   } 
 */
const ast = compiler.compile(template);
console.log(ast.render);
// 结果:with(this){return _l((3),function(n){return (false)?_c('div'):_e()})}

/**
 * vnode的相关方法:
 * _o()是markOnce()的简写,标记v-once。
 * _c()是createElement()的简写,用于创建Vnode节点。
 * _n()是toNumber()的简写,转换成Number类型。
 * _s()是toString()的简写,转换成String类型。
 * _l()是renderList()的简写,用于渲染v-for。
 * _t()是renderSlot()的简写,用于渲染普通插槽和作用域插槽。
 * _q()是looseEqual()的简写,用于两个对象之间宽松的比较。
 * _i()是looseIndexOf()的简写,宽松indexof。
 * _m()是renderStatic()的简写,通过staticRenderFns渲染静态节点。
 * _f()是resolveFilter()的简写,用于获取过滤器。
 * _k()是checkKeyCodes()的简写,检查键盘事件keycode。
 * _b()是bindObjectProps()的简写,用于处理v-bind='{}'到vnodedata上
 * _v()是createTextVNode()的简写,用于创建文本vnode节点。
 * _e()是createEmptyVNode()的简写,用于创建一个空的vnode节点。
 * _u()是resolveScopedSlots()的简写,用于获取作用域插槽。
 * _g()是bindObjectListeners()的简写,处理v-on='{}'到vnodedata上。
 * _d()是bindDynamicKeys()的简写,用于处理动态属性名。
 * _p()是prependModifier()的简写,处理修饰符。
 */

/**
 * l()用于渲染列表,第一个参数表示渲染的次数,第二个参数是每次渲染执行的函数,
 * 当v-for与v-if同时使用时,首先会执行v-for进行循环,如果v-if表达式为true时
 * 就通过_c()创建对应节点,否则通过_e()创建一个空的vnode节点,
 * v-for与v-if同时使用会在每次循环都进行判断,造成了额外的性能开销。
 */
```

### Vue2 组件生命周期

- beforeCreate():在实例创建完成之前,此阶段实例的 data 和 methods 是读取不到。
- created():在实例创建之后,此阶段已完成数据的观测、属性和方法的运算、watch/event 事件回调,mount 挂载阶段还未开始,$el 属性目前不可见,数据并未在 Dom 元素中渲染,created 钩子函数完成后,开始进行模板(template)编译,将模板编译成渲染函数,有了 render 函数后才会执行 beforeMount()钩子函数。
- beforeMount():在挂载到实例之前被调用,相关的 render()函数首次执行。
- mounted():挂载到实例之后调用,el 选项的 Dom 节点被新创建的 vm.$el 替换,并挂载到实例之后被调用,此时数据开始在 Dom 节点上渲染,注意:后续的钩子函数都是需要外部的触发才能执行。
- beforeUpdate():实例数据发生变化之前调用。
- updated():实例数据发生变化后调用。
- beforeDestroy:实例销毁之前被调用。
- destroyed:实例销毁之后被调用。

### watch 和 computed 的区别

computed:

- 有缓存机制
- 不能接受参数。
- 可以以来其他 computed 或其他组件的 data。
- 不能与 data 中的属性重复。

使用场景:当有一些数据需要随着另外一些数据发生改变时,建议使用 computed

watch:

- 可以接受两个参数(deep 和 immeditate)。
- 监听时可触发一个回调函数
- 监听的属性必须是存在的。
- 允许异步操作。

使用场景:当响应式数据发生变化需要执行一些业务逻辑或异步操作时,建议使用 watch

### Vue 组件通讯方式有哪些?

- props 父传子。
- $emit()子传父。
- $refs获取组件实例,$children 获取子实例,$parent获取父实例,$root 获取根实例(包含所有组件实例集合)。
- $attrs获取未在组件props定义的所有prop,$listeners 获取父组件通过 v-on 传递的事件侦听器。
- provide 与 inject。通过 provide 在祖父组件定义属性,在子孙组件使用 inject 注入所需属性实现跨层级组件通讯。
- 事件总线(Event Bus)。本质上实现了发布订阅 API 挂载到 Vue 原型上实现组件通讯,其缺点是发布订阅需成对出现、难维护、复用性差,订阅事件时需手动销毁监听,否则事件会执行多次。
- Vuex。利用第三方状态管理工具解决组件通讯问题,由于 Vuex 存储的状态会在刷新页面后丢失,可以通过 Vuex-persistedstate 这个库进行持久化。
- Web Storage(包含 Session Storage 和 LocalStorage)。通过浏览器存储解决组件通讯。

### Vue 数据响应式原理

Vue 采用数据劫持+订阅发布模式实现双向绑定。通过  Object.defineProperty()方法来为组件中  data  的每个属性添加 get 和 set 方法,在数据变动时,触发 set 里相应的监听回调函数,将变动信息发布给订阅者。主要有以下步骤：

- 组件初始化时：
  - 创建一个 dep 对象作为观察者（依赖收集、订阅发布的载体）；
  - 通过 Object.defineProperty()方法对 data 中的属性及子属性对象的属性,添加 getter 和 setter 方法;调用 getter 时,便去 dep 里注册函数。调用 setter 时,便去通知执行刚刚注册的函数。
- 组件挂载时：
  - compile 解析模板指令,将其中的变量替换成数据。然后初始化渲染页面视图,并将每个指令对应的节点绑定上更新函数、监听函数。后续一旦数据发生变化,便会更新页面,页面发生变化时也会相应发布变动信息。
  - 组件同时会定义一个 watcher 类作为订阅者,watcher 可以视作 dep 和组件之间的桥梁。其在实例化时会向 dep 中添加自己，同时自身又有一个 update 方法,待收到 dep 的变动通知时,便会调用自己的 update 方法,触发 compile 中的相应函数完成更新。

当一个 Vue 实例创建时,vue 会遍历 data 选项的属性,用  Object.defineProperty  将它们转为 getter/setter 并且在内部追踪相关依赖,在属性被访问和修改时通知变化。每个组件实例都有相应的 watcher 程序实例,它会在组件渲染的过程中把属性记录为依赖,之后当依赖项的 setter 被调用时,会通知 watcher 重新计算,从而致使它关联的组件得以更新。

### Vue 模板编译原理

Vue 模板编译大致可分为模板解析、优化、代码生成三个步骤。baseCompile(template,options)是模板编译的入口,编译的流程如下:

- 模板解析:调用 `parse(tempate.trim(),options)`通过正则表达式提取模板中的标签元素、属性、变量等信息,并解析成抽象语法树 AST。parse()中调用 parseHTML()对模板字符串进行解析,每一步解析的结果都会合并到 AST 对象上,parseHTML()解析过程:
  - 解析到开始标签、结束标签、文本、注释分别进行不同的处理。
  - 解析过程中遇到文本信息就调用文本解析器`parseText()`进行文本解析。
  - 解析过程中遇到包含过滤器,就调用过滤器解析器`parseFilters()`进行解析。
- 优化:通过调用`optimize(ast,options)`遍历 AST 找出其中的静态节点和静态根节点,并添加标记。patch 过程中就会跳过静态节点对比,减少对比操作。
- 代码生成:通过调用`generate(ast,options)`根据 AST 生成渲染函数。渲染函数是一个`with(this){}`函数,`with`是用于欺骗词法作用域的关键字,它可以更快的引用一个对象上的属性。`with(this){}`中的 this 指向当前组件实例,因为`with`改变了词法作用域中属性的指向,所以在`with`函数可以直接使用当前组件实例上的属性。

```js
const template = `<div v-if="false" v-for="n in 3"></div>`;

// 模板转换AST的结果
{
  alias: "n"
  attrsList: []
  attrsMap: {v-if: 'false', v-for: 'n in 3'}
  children: []
  for: "3"
  forProcessed: true
  if: "false"
  ifConditions: [{…}]
  ifProcessed: true
  parent: undefined
  plain: true
  rawAttrsMap: {}
  static: false
  staticRoot: false
  tag: "div"
  type: 1
}

/*
 * 最终生成的渲染函数为:
 * with(this){return _l((3),function(n){return (false)?_c('div'):_e()})}
 */
```

### Keepalive 原理

### $nextTick()原理

$nextTick()中的回调是在下次 DOM 更新结束后执行的延迟回调。在 Vue 中是异步执行 DOM 更新的,一旦观察到数据变化,Vue 就会开启一个队列,然后把在同一事件循环当中观察到数据变化的 watcher 推送进这个队列,如果这个 watcher 被触发多次,只会被推送到队列一次,这种缓冲行为可以有效的去掉重复数据造成的不必要的计算和 dom 操作,这样可以提高渲染效率。nextTick 其实对 JS 事件循环的模拟。执行 nextTick()前首先会检查浏览器能力,如果支持 Promise 就以 Promise.then()创建微任务,如果支持 MutationObserver 就以 MutationObserver 创建微任务,如果支持 setImmediate 就以 setImmediate 创建宏任务,否则将使用 setTimeout 创建宏任务。调用 nextTick()时会将其回调函数添加到队列末尾,确保该函数在前面的 dom 操作完成后才调用。

### Vue 虚拟 DOM 与 Diff 算法过程

Vue 通过 Virtual DOM 来描述真实 DOM,虚拟 DOM 是对真实 DOM 的抽象,由于执行操作 DOM 性能低,但通过 JS 对象模拟真实 DOM 操作效率是非常高的,可以将 DOM 操作转化为对象操作,最终通过 Diff 算法对比更新前后的虚拟 DOM 差异更新 DOM。虚拟 DOM 具有如下特点:

- 保证性能下限。框架的虚拟 DOM 需要适配任何上层 API 可能产生的操作,它的一些 DOM 操作的实现必须是普适的,所以它的性能并不是最优的;但是比起粗暴的 DOM 操作性能要好很多,因此框架的虚拟 DOM 至少可以保证在你不需要手动优化的情况下,依然可以提供还不错的性能,即保证性能的下限。
- 无需手动操作 DOM。无需手动去操作 DOM,只需要写好 View-Model 的代码逻辑,框架会根据虚拟 DOM 和 数据双向绑定,根据可预期的方式更新视图,极大提高开发效率。
- 跨平台。虚拟 DOM 本质上是 JavaScript 对象,而 DOM 与平台强相关,相比之下虚拟 DOM 可以进行更方便地跨平台操作,例如服务器渲染、weex 开发等等。
- 虚拟 DOM 无法进行极致优化。虽然虚拟 DOM + 合理的优化,足以应对绝大部分应用的性能需求,但在一些性能要求极高的应用中虚拟 DOM 无法进行针对性的极致优化。首次渲染大量 DOM 时,由于多了一层虚拟 DOM 的计算,会比 innerHTML 插入慢。

### Vue 与 React 的区别

- 数据可变性:Vue 中的数据是可变的(Mutable),Vue 通过拦截操作,当设置响应式数据时会同时收集依赖,数据发生变化时就会触发视图更新。React 中的数据是不可变的(Immutable),React 初始化时会创建一颗虚拟 DOM 树,当修改数据时会重新生成一份新的虚拟 DOM 树,并通过 Diff 对比新旧 DOM 树的差异,然后更新视图。
- 视图描述:React 通过 JSX 来描述视图,而 Vue 一般通过模板(也支持 JSX)来描述视图,JSX 相比较模板更加灵活。由于模板语法是受限制的,所以在预编译阶段可以做更多的优化,例如 Vue3 可以在预编译阶段做静态标记,实现了按需更新:
  - 纯静态元素标记,静态元素会直接越过 diff 过程。
  - 静态属性标记,在 diff 过程会跳过静态属性的判断。
  - 事件函数传递时会加上缓存。
  - v-if 和 v-for 内部通过 block+数组方式维护动态元素。
- 运行环境:Vue 更偏向于编译时+运行时,而 React 更偏向于运行时。所谓运行时,在浏览器内存里进行的任务,React 的 Runtime 比较重一些,数据发生变化后,并没有直接去操作 dom,而是生成一个新的虚拟 dom,并且通过 diff 算法得出最小的操作行为,全部都是在运行时来做的。Vue 依然处于比较中庸的地位,在运行时和预编译取了一个很好地权衡,保留了虚拟 DOM,通过响应式控制虚拟 dom 的颗粒度,在预编译里又做了足够多的性能优化,做到了按需更新。
- 更新粒度:Vue 的更新粒度是组件级的,React 的更新粒度是应用级的。Vue 响应式数据更新仅会精确更新依赖收集的当前组件,并不会递归的去更新子组件。每个 Vue 组件都有自己的渲染 Watcher,它掌管了当前组件的视图更新,但是并不会掌管 ChildComponent 的更新,所以说 Vue 的响应式更新是一种自动化、增量的更新方式,无需开发者做更新优化。React 是自顶向下的进行递归更新,所有层次都会递归的重新 render(不优化的情况下),React 是一种手动化、全量的更新方式。
- 架构模式:Vue 采用 MVVM 模式作为响应式数据原理,当数据发生变化时视图也会发生变化。React 采用 MVC 模式控制,需要手动调用 API 修改数据控制触发视图变化。

### VueRouter 的原理?

VueRouter 的原理是更新视图但不重新请求页面,VueRouter 支持 history、hash、abstract 三种路由模式:

- hash 模式:url 中带有#号的便是 hash 模式,#号后面的是 hash 值,它的变化会触发 `hashchange` 这个事件。另外 hash 值的变化会并不会导致浏览器向服务器发出请求,浏览器不发出请求,也就不会刷新页面。

### VueRouter history 和 hash 模式的区别?

- 在 hash 模式下,仅 hash 符号之前的内容会被包含在请求中,例如:http://www.aaa.com ,因此对于后端来说,即使没有做到对路由的全覆盖,也不会返回 404 的错误。
- 在 histroy 模式下,前端的 URL 必须和实际向后端发起请求的 URL 一致,例如http://www.aaa/book/a ,如果后端缺少对/book/a 的路由处理,将会返回 404 错误。

### VueRouter 中 this.$router 与 this.$route 的区别

- this.$router 为 VueRouter 的实例,它可以控制导航路由,提供了 push()、go()等 API。
- this.$route 表示当前 router 跳转对象,里面可以获取当前路由的 name、path、fullPath、params、query 等信息。

### VueRouter 路由切换和 localtion.href 切换有什么区别?

- location.href 切换会刷新页面,而 VueRouter 路由则不会刷新页面。
- VueRouter 路由切换比 location.href 切换能提供更多控制,例如路由切换时做一些业务逻辑处理等等操作。

### Vuex 的核心概念

Vuex 是 Vue 官方的一款状态管理工具,

### Vuex 刷新页面数据会丢失如何解决?

### Vue3 响应式原理 Vue2 响应式原理的区别

因为 Vuex 里的数据是保存在运行内存中的,当页面刷新时,页面会重新加载 Vue 实例,Vuex 里面的数据就会被重新赋值。一般通过浏览器本地存储 Web Storage(包含 SessionStorage 和 LocalStorage,推荐使用 LocalStorage 存储数据,LocalStorage 的生命周期是永久的)来保存数据。也可以通过 Vuex-persistedstate 这个库对数据进行持久化。

### Vue 优化策略

- 对象层级不要过深,对象层级过深会影响性能。
- 不需要响应式的数据可以通过 Object.freeze()进行冻结,对于 data 或 Vuex 里使用 freeze 冻结了的对象,Vue 不会做 getter 和 setter 的转换。
- 合理使用 v-if 和 v-show。
- 合理使用 computed 属性,因为 computed 属性具有缓存效果。
- v-for 遍历元素时必须加上 key,key 一般是业务 id,且避免同时使用 v-for 和 v-if,同时使用 v-for 和 v-if 会造成每次遍历元素都会进行判断,从而造成额外的开销。
- 防止内存泄漏。推荐在 beforeDestroy 钩子函数销毁定时器或关闭资源。

```js
mounted(){
     const timer=setInterval(()=>{
        console.log(123);
    },1000);
    this.$once("hook:beforeDestroy",()=>{
        clearInterval(timer);
    });
 }
```

- 懒加载,图片和路由都可以使用懒加载方式进行加载。
- 合理使用 Keepalive 缓存组件。
- 对于大数据列表可以通过虚拟列表仅显示可视数据,避免渲染所有数据。
- 合理使用防抖节流。
- 启用服务端渲染(SSR)或预渲染。

### Vue3 与 Vue2 的区别?

### Vue3 watch 与 watchEffect 的区别？

- watch 是惰性的,第一次页面渲染时的时候并不会执行,只有监听的数据变化的时候才会执行。
- watch 的参数可以获取当前值和原始值。
- 可以侦听多个数据的变化,用一个侦听起承载。
- watchEffect 无惰性,页面的首次渲染就会立即执行。
- watchEffect 会自动检测内部代码,代码中有依赖便会执行。
- watchEffect 不能获取之前数据的值,只能获取当前值。
