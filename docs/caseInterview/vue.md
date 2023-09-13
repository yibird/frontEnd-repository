## 1.什么是 MVVM、MVC 架构?

- MVVM 即 Model–View–ViewModel 是一个软件架构设计模式,其中 Model 表示数据模型,View 表示 UI 视图,ViewModel 表示 Model 与 View 之间的桥梁。当 Model 数据发生变化时 ViewModel 会通知对应的 View 重新渲染,当 View 发生变化时 ViewModel 也会通知 Model 发生变化。MVVM 将视图层与数据层进行分离,通过 ViewModel 层控制 View 的渲染与 Model 数据的变化,极大的提高了前端开发效率。虽然 Vue 没有完全遵循 MVVM 模型,但是 Vue 的设计也受到了它的启发。

- MVC 即 Model-View-Controller 是一种软件架构模式,它将应用程序分为三个主要部分:模型(Model)、视图(View)和控制器(Controller):
  - 模型(Model):代表应用程序的数据和业务逻辑。它是应用程序中负责处理数据和数据操作的组件，包括数据存储、访问和更新等。
  - 视图(View):代表应用程序的用户界面。它是应用程序中用户直接交互的部分,包括显示和呈现数据、响应用户输入等。
  - 控制器(Controller):连接模型和视图。它是应用程序中的中间件,用于处理用户输入和数据操作,并根据需要更新视图。控制器接收来自视图的用户输入,并将请求转发给模型来更新数据。一旦模型被更新,控制器将更新视图以反映新的数据状态。

MVC 架构的优点是分离了应用程序的不同方面,从而使得应用程序更容易维护、扩展和重用。例如,如果需要更改应用程序的用户界面,可以只修改视图部分,而不需要改变模型和控制器。同样,如果需要更新数据操作,可以只修改模型部分,而不需要修改视图和控制器。React 是一个典型的 MVC 架构库。

## 2.Vue 生命周期

Vue2 采用 Options API 开发组件,组件生命周期定义在导入的组件对象中;Vue3 支持 Composition 和 Options API 开发组件,在 Composition API 风格下除了 setup()钩子外,其余钩子函数都需要从 vue 包中导入。Vue 声明周期大体可以分为挂载(包含 beforeCreate、created、beforeMount、mounted)、更新(包括 beforeUpdate、updated)、销毁(包括 beforeDestroy、destroyed)三个阶段。

### 2.1 Vue2 生命周期

- beforeCreate():在实例创建完成之前,此阶段实例的 data 和 methods 读取不到。
- created():在实例创建之后,此阶段已完成数据的观测、属性和方法的运算、watch/event 事件回调,mount 挂载阶段还未开始,$el 属性目前不可见,数据并未在 Dom 元素中渲染,created 钩子函数完成后,开始进行模板(template)编译,将模板编译成渲染函数,有了 render 函数后才会执行 beforeMount()钩子函数。
- beforeMount():在挂载到实例之前被调用,相关的 render()函数首次执行。
- mounted():挂载到实例之后调用,el 选项的 Dom 节点被新创建的 vm.$el 替换,并挂载到实例之后被调用,此时数据开始在 Dom 节点上渲染,注意:后续的钩子函数都是需要外部的触发才能执行。
- beforeUpdate():实例数据发生变化之前调用。
- updated():实例数据发生变化后调用。
- beforeDestroy():实例销毁之前被调用。
- destroyed():实例销毁之后被调用。

### 2.2 Vue3 生命周期

- setup():等同 Vue2 中 beforeCreate 和 created()钩子函数。setup 接收 props 和 context 作为参数,由于在执行 setup 时尚未创建组件实例,因此在 setup 选项中没有 this(或者说 setup 的 this 指向 undefined)。这意味着,除了 props 之外,无法在 setup 函数中访问组件中声明的任何属性——本地状态、计算属性或方法。
- onBeforeMount():等同 Vue2 中 beforeMount()钩子函数。
- onMounted:等同 Vue2 的 mounted 钩子函数。
- onBeforeUpdate():等同 Vue2 中 beforeUpdate()钩子函数。
- onUpdated():等同 Vue2 中 updated()钩子函数。
- onBeforeUnmount():等同 Vue2 中 beforeDestroy()钩子函数。
- onUnmounted():等同 Vue 中 destroyed()钩子函数。
- onRenderTracked():该钩子函数用于追踪状态,它会追踪页面上所有响应式变量和方法的状态,当有变量更新时,它就会进行跟踪,然后生成一个 event 事件,以供开发者调试。
- onRenderTriggered():该钩子函数状态触发,它不会跟踪每一个值,而是给你变化值的信息,并且新值和旧值都会明确的展示出来。onRenderTriggered 只精确跟踪发生变化的值,进行针对性调试。

- 创建组件时父子组件钩子执行顺序:父 beforeCreate、父 created、父 beforeMount、子 beforeCreate、子 created、子 beforeMount、子 Mounted、父 Mounted。
- 更新状态时父子组件钩子执行顺序:父 beforeUpdate、子 beforeUpdate、父 updated、子 updated。
- 销毁组件时父子组件钩子执行顺序:父 beforeDestroy、子 beforeDestroy、子 destroy、父 destroy。

## 3.Vue 组件通讯方式有哪些?

### 3.1 Vue2 组件通讯方式

- 父传子通过 props。
- 子传父通过$emit。通过$emit、sync 修饰符可实现数据双向流。
- 父传子通过$refs。$refs 用于获取使用 ref 属性注册过的所有 DOM 元素和组件实例。
- 父传子通过$children(可以获取子组件实例)。
- 子传父通过$parent(可以获取父组件实例)。
- 通过$root获取组件根实例通信,$root 包含了所有应用过的 vue 组件实例集合。
- 通过$attrs获取父组件传递的属性且未在当前组件的props中定义的属性,可以使用v-bind="$attrs"向更深层级的组件传递(简称属性透传)。
- 通过$listeners获取父组件传递的v-on事件监听器,可以使用v-on="$listeners" 向更深层级的组件传递(简称事件透传)。
- 通过 provide 在祖父组件定义属性,在子孙组件使用 inject 注入所需的属性。
- EventBus 实现跨组件层级通讯。
- 第三方状态管理库。例如 Vuex。
- 浏览器存储机制实现跨组件层级通讯。例如 Cookie、LocalStorage、SessionStroage、IndexDB。

### 3.2 Vue3 组件通讯方式

- 父传子通过 props。
- 子传父通过 emit()。在 emits 选项上定义需要触发的事件,通过 setup 中 context 的 emit()函数触发事件。
- 父组件通过 ref 获取子组件实例,父组件获取子组件通过 defineExpose()暴露的方法和属性。
- 通过 attrs 父传子。attrs 包含父作用域里除 class 和 style 除外的非 props 属性集合, attrs 可以通过 useAttrs()和 setup context.attr 获取。
- v-model。v-model 可以支持多个数据双向绑定。
- provide/inject 实现跨组件层级通讯。provide 用于提供向后代组件使用的数据,后代组件通过 inject 注入指定数据即可使用。
- 第三方 EventBus 实现跨组件层级通讯。在 Vue3 中移除了 Event Bus 特性,但可以使用 mitt.js 等第三方库实现组件通讯,其实现原理还是 EventBus(底层基于发布订阅模式)。
- 第三方状态管理库实现跨组件层级通讯。例如 Pinia、Vue4。
- 浏览器存储机制实现跨组件层级通讯。例如 Cookie、LocalStorage、SessionStroage、IndexDB。

## 4.为什么 Vue2 组件的 data 是一个函数

组件作用是抽离公共逻辑单元,这意味着组件是可以公用的,如果 data 是一个对象的话,那么所有组件实例都能访问到 data 对象,因为对象是对内存地址的引用,这样会造成组件数据的相互影响。如果 data 是一个函数,每个组件实例可以维护一份被返回对象的独立的拷贝。

## 5.在 Vue 中为什么 Props 是单向流?

Vue 之所以将组件组件的 Props 设计为单向流,是因为可以防止子组件对父组件的 Props 修改而造成混乱,子组件修改 Props 就会导致父组件状态的修改无法被预测,父组件无法捕获到 Props 如何被修改。

所有的 prop 都使得其父子 prop 之间形成了一个单向下行绑定:父级 prop 的更新会向下流动到子组件中,但是反过来则不行。这样会防止从子组件意外变更父级组件的状态,从而导致应用的数据流向难以理解。但可以通过`$emit()`和`.sync` 修饰符进行双向数据流通讯。
::: details 示例

```vue
<!-- 父组件 -->
<template>
  <Child :visible.sync="visible" />
</template>
<script>
export default {
  data() {
    return {
      visible: false,
    };
  },
};
</script>

<!-- 子组件 -->
<template>
  <button @click="changeVisible">change visible</button>
</template>
<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    changeVisible() {
      // 通过触发 "update:visible" 事件修改父组件的visible为true
      this.$emit("update:visible", true);
    },
  },
};
</script>
```

:::

## 6.为什么在组件的 created 钩子函数进行数据请求?

- 能更快获取到服务端数据,减少页面 loading 时间。
- ssr 不支持 beforeMount、mounted 钩子函数,所以放在 created 中有助于一致性。

## 7.v-if 指令与 v-show 指令的区别?

- v-show 本质就是通过设置 css 中的 display 设置为 none,控制元素隐藏,不管初始条件是什么元素总会渲染。v-if 是动态的向 DOM 树内添加或者删除 DOM 元素,当初识条件为 false 元素则不会被渲染。
- v-if 切换时有一个局部编译和卸载的过程,切换过程中合适地销毁和重建内部的事件监听和子组件,所以 v-if 相比 v-show 具有更高的切换开销,而 v-show 有更高的初始渲染开销。
- v-if 是惰性的。如果在初始渲染时条件为假,则什么也不做——直到条件第一次变为真时,才会开始渲染条件块。

## 8.Vue 中使用 v-for 指令为什么还要绑定 key?

如果不使用 key,Vue 会使用一种最大限度减少动态元素并且尽可能的尝试就地修改/复用相同类型元素的算法。key 是为 Vue 中 vnode 的唯一标记,通过这个 key,diff 操作可以更准确、更快速。

-「更准确」:因为带 key 就不是就地复用了,在 sameNode 函数 a.key === b.key 对比中可以避免就地复用的情况。所以会更加准确。

-「更快速」:利用 key 的唯一性生成 map 对象来获取对应节点,比遍历方式更快。

```js
// 判断两个vnode的标签和key是否相同 如果相同 就可以认为是同一节点就地复用
function isSameVnode(oldVnode, newVnode) {
  return oldVnode.tag === newVnode.tag && oldVnode.key === newVnode.key;
}

// 根据key来创建老的儿子的index映射表  类似 {'a':0,'b':1} 代表key为'a'的节点在第一个位置 key为'b'的节点在第二个位置
function makeIndexByKey(children) {
  let map = {};
  children.forEach((item, index) => {
    map[item.key] = index;
  });
  return map;
}
// 生成的映射表
let map = makeIndexByKey(oldCh);
```

## 9. v-for 和 v-if 优先级?

在 Vue2.x 中同一节点使用 v-for 和 v-if,v-for 指令的优先级高于 v-if 指令。官方并不推荐 v-for 与 v-if 同时使用。如果 v-for 和 v-if 指令同时出现时,每次渲染都会先去循环再去判断,造成了额外的性能开销。

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

在 Vue3.x 中同一节点使用 v-for 和 v-if 指令,v-if 的优先级高于 v-for。借助 Vue SFC Playground 可以查看 SFC 文件编译结果,其底层也是通过`@vue/compiler-sfc`将 SFC 编译为渲染函数。
::: details v-if 条件为 true

```js
<template>
  <div v-if="true" v-for="n in 3"></div>
</template>;

// 编译结果如下:
const __sfc__ = {};
import {
  // 渲染列表函数
  renderList as _renderList,
  // 一个Fragment(碎片)元素,Vue 3提供的特性,Fragment用于支持多根节点的组件
  Fragment as _Fragment,
  // 打开一个块元素
  openBlock as _openBlock,
  // 用于创建一个块元素
  createElementBlock as _createElementBlock,
  // 用于创建一个元素虚拟节点
  createElementVNode as _createElementVNode,
  // 用于创建一个注释虚拟节点
  createCommentVNode as _createCommentVNode,
} from "vue";
function render(_ctx, _cache) {
  return true
    ? (_openBlock(),
      _createElementBlock(
        _Fragment,
        { key: 0 },
        _renderList(3, (n) => {
          return _createElementVNode("div");
        }),
        64 /* STABLE_FRAGMENT */
      ))
    : _createCommentVNode("v-if", true);
}
__sfc__.render = render;
__sfc__.__file = "App.vue";
export default __sfc__;
```

:::
::: details v-if 条件为 false

```js
<template>
  <div v-if="false" v-for="n in 3"></div>
</template>;

// 编译结果如下:
const __sfc__ = {};
import {
  // 渲染列表函数
  renderList as _renderList,
  // 一个Fragment(碎片)元素,Vue 3提供的特性,Fragment用于支持多根节点的组件
  Fragment as _Fragment,
  // 打开一个块元素
  openBlock as _openBlock,
  // 用于创建一个块元素
  createElementBlock as _createElementBlock,
  // 用于创建一个元素虚拟节点
  createElementVNode as _createElementVNode,
  // 用于创建一个注释虚拟节点
  createCommentVNode as _createCommentVNode,
} from "vue";
function render(_ctx, _cache) {
  return false
    ? (_openBlock(),
      _createElementBlock(
        _Fragment,
        { key: 0 },
        _renderList(3, (n) => {
          return _createElementVNode("div");
        }),
        64 /* STABLE_FRAGMENT */
      ))
    : _createCommentVNode("v-if", true);
}
__sfc__.render = render;
__sfc__.__file = "App.vue";
export default __sfc__;
```

:::
从上述编译结果来看,首先会判断 v-if 值的结果是否为 true,为 true 则通过`createElementBlock`创建一个块元素,该块元素通过`renderList`循环创建元素,每次循环都会使用`createElementVNode`创建一个 div 元素;当 v-if 的值的结果为 false,则会创建一个 v-if 的注释节点。

## 10.计算属性和 watch 的区别?

computed:

- 有缓存机制。当计算属性的依赖项未发生变化时,计算属性不会被重新执行。
- 不能接受参数。
- 可以组合组件其他的 computed 和 data 属性使用。
- 不能与 data 中的属性重复。
- 使用场景:当有一些数据需要随着另外一些数据发生改变时,建议使用 computed。

watch:

- 可以接受两个参数(deep 和 immeditate),deep 表示是否深度监听,watch 默认无法监听深层对象的变化;immeditate 表示是否立即执行 watch。
- 监听时可触发一个回调函数。
- 监听的属性必须是存在的。
- 允许异步操作。
- 使用场景:当响应式数据发生变化需要执行一些业务逻辑或异步操作时,建议使用 watch。

## 11.Vue 中 data 的属性可以和 methods 中的方法名相同吗?

Vue 中 data 属性可以与 methods 中的方法名可以相同,但是并不推荐这么做,这是因为在 Vue 实例中,data 中的属性和 methods 中的方法都会被代理到 Vue 实例中,如果名字相同,可能会导致命名冲突(访问时不知道访问的是 data 属性还是 methods)。另外,Vue 在实例化过程中会检查 methods 中的方法名是否和 Vue 内置的方法重名,如果重名会产生一个警告,因此尽量不要和 Vue 内置的方法名相同。

## 12.在 Vue 中定义定时器如何清理?

- 在 beforeDestroy 生命周期函数清除。

```js
new Vue({
  data() {
    return {
      timer: null,
    };
  },
  mounted() {
    this.timer = setInterval(() => {
      console.log("clear...");
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
});
```

这种做法需要在 vue 实例上定义一个变量接收定时器函数,而且定时器定义的代码跟清除代码独立分离

- 通过$once 侦听器清除定时器(推荐)。

```js
new Vue({
  mounted() {
    const timer = setInterval(() => {
      console.log("clear");
    }, 1000);
    this.$once("hook:beforeDestroy", () => {
      clearInterval(timer);
    });
  },
});
```

## 13.Vue 如何强制刷新组件?

- 通过 v-if 指令。在需要控制的组件跟标签使用 v-if 指令,v-if 指令对应的是一个布尔值,如果条件为 false 就表明这个元素不会被渲染。
- 通过 this.$forceUpdate()。this.$forceUpdate() 作用是强制 Vue 实例重新渲染,注意:它仅针对当前实例本身和它插槽内的子组件,并不包含所有组件。

## 14.$nextTick()的作用和实现原理?

Vue.js 中的 $nextTick() 方法用于在 DOM 更新之后执行一个回调函数。在 Vue 中,当数据发生变化时,Vue 会异步执行 DOM 更新。这意味着,如果想要在数据更新后操作 DOM 元素,需要等到 Vue 完成更新后才能进行操作,$nextTick() 方法可以在下次 DOM 更新循环结束后执行回调函数,确保操作的正确性。

```js
new Vue({
  el: "#app",
  data: { message: "Hello Vue.js!" },
  methods: {
    updateMessage() {
      this.message = "Hello World!";
      this.$nextTick(function () {
        // 在下次 DOM 更新循环结束后执行
        this.$refs.message.innerHTML = "Updated!";
      });
    },
  },
});
```

在上面的例子中,当 updateMessage() 方法被调用时,它会先更新数据,然后在 $nextTick() 方法中执行回调函数，以确保 DOM 元素已经被更新。

在 Vue.js 2 (以 2.7 为例)中,$nextTick() 方法的源码实现在 `src/core/util/next-tick.ts` 文件中。具体来说,$nextTick() 方法是通过 Vue 的 util 模块中的 nextTick() 函数来实现的。在 next-tick.ts 文件中,首先会根据浏览器环境来选择使用哪种异步任务处理方式(比如 Promise、MutationObserver 或者 setImmediate、setTimeout),然后将传入的回调函数加入到异步任务队列中。$nextTick() 的源码如下:

::: details $nextTick()源码

```ts
import { noop } from "shared/util";
import { handleError } from "./error";
import { isIE, isIOS, isNative } from "./env";

// 是否使用微任务
export let isUsingMicroTask = false;
// 任务队列,用于存放$nextTick()回调函数
const callbacks: Array<Function> = [];
// 执行状态,true表示执行中
let pending = false;

/**
 * 刷新任务队列,执行该函数后,首先会将执行状态设置为false,然后对任务队列进行了一份浅拷贝,
 * 并重置了任务队列,最后遍历浅拷贝的任务队列执行每一个$nextTick()回调函数。
 */
function flushCallbacks() {
  // 设置执行状态
  pending = false;
  // 对任务队列进行浅拷贝
  const copies = callbacks.slice(0);
  // 重置任务队列
  callbacks.length = 0;
  // 遍历浅拷贝的任务队列执行每一个$nextTick()回调函数
  for (let i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

let timerFunc;
// 如果当前环境支持Promise,则使用Promise.then()执行刷新任务队列
if (typeof Promise !== "undefined" && isNative(Promise)) {
  const p = Promise.resolve();
  timerFunc = () => {
    p.then(flushCallbacks);
    /**
     * 在有问题的UIWebViews中,Promise.then并没有完全崩溃,但它可能会陷入一种奇怪的状态,
     * 回调被推入微任务队列,但队列不会被刷新,直到浏览器需要做一些其他工作,例如处理计时器。
     * 因此,我们可以通过添加一个空计时器来“强制”刷新微任务队列。
     */
    if (isIOS) setTimeout(noop);
  };
  isUsingMicroTask = true;
}
// 如果当前环境支持MutationObserver,则使用MutationObserver()执行刷新任务队列
else if (
  !isIE &&
  typeof MutationObserver !== "undefined" &&
  (isNative(MutationObserver) ||
    // PhantomJS and iOS 7.x
    MutationObserver.toString() === "[object MutationObserverConstructor]")
) {
  let counter = 1;
  const observer = new MutationObserver(flushCallbacks);
  const textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true,
  });
  timerFunc = () => {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
  isUsingMicroTask = true;
}
// 如果当前环境支持setImmediate,则使用setImmediate()执行刷新任务队列
else if (typeof setImmediate !== "undefined" && isNative(setImmediate)) {
  timerFunc = () => {
    setImmediate(flushCallbacks);
  };
} else {
  /**
   * 如果当前环境不支持Promise、MutationObserver、setImmediate,
   * 则使用setTimeout执行刷新任务队列函数。
   */
  timerFunc = () => {
    setTimeout(flushCallbacks, 0);
  };
}

export function nextTick(cb?: (...args: any[]) => any, ctx?: object) {
  let _resolve;
  // 任务队列添加回调函数
  callbacks.push(() => {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e: any) {
        handleError(e, ctx, "nextTick");
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  if (!cb && typeof Promise !== "undefined") {
    return new Promise((resolve) => {
      _resolve = resolve;
    });
  }
}
```

:::
在 nextTick.ts 源码中,callbacks 是一个数组,用来保存所有加入异步任务队列中的回调函数。当调用 $nextTick()方法时,会将传入的回调函数加入到 callbacks 数组中,然后通过浏览器提供的异步任务处理方式(macroTimerFunc() 或 microTimerFunc())来异步执行 callbacks 数组中的所有回调函数。

需要注意的是,Vue 在每次异步执行回调函数前会将 pending 标志设置为 true,以保证异步任务队列中的回调函数只会被执行一次。同时,如果当前浏览器环境支持 Promise,则 $nextTick() 方法也可以返回一个 Promise 对象,以便在异步任务执行完毕后进行相关操作。

**$nextTick() 的实现原理:将$nextTick()回调函数加入一个队列中,在下次 DOM 更新循环结束后依次执行队列中的所有回调函数。当数据变化时,Vue 会先将需要更新的 DOM 元素放到一个队列中,然后通过浏览器提供的 API 监听 DOM 的变化,当 DOM 变化结束时,触发 $nextTick() 方法中的回调函数**。

## 15.keepAlive 组件的实现原理

Keepalive 包裹组件时,会缓存不活动的组件实例。Keepalive 底层实现原理是通过缓存机制存储了 Keepalive 组件包裹的首个子组件实例,即使进行路由切换,由于有缓存机制所以并不会销毁子组件。Keepalive 组件源码大体逻辑如下:

- 调用 getFirstComponentChild()根据 Keepalive 组件的 slot 获取 KeepAlive 组件包裹的第一个子组件(假设简称 vnode),由于 slot 是一个 VNode 数组,getFirstComponentChild()通过循环遍历 slot 并判断遍历项是否具有 componentOptions 属性,以此来判断 VNode 节点是否是一个组件,当遍历项是一个注释节点且是一个异步组件工厂函数时也会被是认为一个组件。
- 当通过 getFirstComponentChild()获取到 Keepalive 包裹的首个子组件后,Keepalive 会根据 include、exclude 引入或排除一些不符合条件的组件。
- Keepalive 源码中维护了 cached、keys 两个重要的属性,cached 是一个对象用于缓存组件,keys 用于维护缓存 key。当 vnode 上如果有 key 属性则会被当做缓存 key,否则将会以组件 id+组件 tag 的形式作为缓存 key(简称 key)。由于组件初始化时未命中缓存,所以 cached 以 key 作为键,以 vnode 作为 value 将组件节点缓存起来,keys 也会 push 对应的 keys 以便清除缓存 key;当下次命中缓存时会从缓存中取出组件实例(componentInstance)赋值给 vnode 的组件实例(componentInstance),并清理相关缓存 key。

## 16.Vue 响应式数据实现原理?

### 16.1 Vue2 响应式数据实现原理?

Vue2 实现响应式数据分为两大块:普通对象类型的数据响应式和数组类型的数据响应式。

- 普通对象类型的数据响应式:对于普通对象类型的数据响应式,Vue2 中通过 Object.definedProperty()拦截对象的 get 与 set 操作,当数据发生变化时就会触发 set 操作从而触发组件重新渲染。由于 Object.definedProperty 兼容性问题,所以 Vue2 不支持 IE8。

- 数组类型的数据响应式:由于 Object.definedProperty 无法拦截到数组数据的变化,所以在 Vue2 中对于数组数据响应式通过重写数组上的 7 个原型方法实现的,这 7 个数组分别为 push、pop、shift、unshift、splice、sort、reverse,当调用数组的这 7 个方法时,实际上调用的是重写后的方法,通过数据劫持的机制就能实现对数组类型的侦听。所以通过数组下标修改值此时是无法获得响应式,但 Vue 提供了 set、get Api 解决这一问题。

简单来说在 Vue2 通过 Object.definedProperty()与重写原型方法的方式,会递归的把 data 对象中所有数据转化为 getter/setter,当数据发生变化时就会触发 setter,从而通知视图更新。

当执行 new Vue() 时,Vue 就进入了初始化阶段,一方面 Vue 会遍历 data 选项中的属性,并用 Object.defineProperty 将它们转为 getter/setter,实现数据变化监听功能;另一方面,Vue 的指令编译器 Compile 对元素节点的指令进行扫描和解析,初始化视图,并订阅 Watcher 来更新视图,此时 Wather 会将自己添加到消息订阅器中(Dep),初始化完毕。当数据发生变化时,Observer 中的 setter 方法被触发,setter 会立即调用 Dep.notify(),Dep 开始遍历所有的订阅者,并调用订阅者的 update() 方法,订阅者收到通知后对视图进行相应的更新。

## VueRouter 的实现原理?

VueRouter 的实现原理是不刷新浏览器实现路由的切换。VueRouter 内部支持 abstract、history、hash 三种模式,在 Hash 模式下,路径会带有 # 号,路径改变不会导致页面刷新;而 History 模式下,路径不带 # 号,路径改变会导致页面刷新。VueRouter 的实现包括路由匹配和监听路由变化两部分组成:

- 路由匹配:在 VueRouter 中,路由映射表用来将 path 映射为对应的组件。在创建 VueRouter 实例时,会传入一个 routes 配置项,其中定义了 path 和 component 的对应关系。VueRouter 会将这个路由映射表转换为一棵路由匹配树,并通过深度优先遍历的方式匹配 path,找到对应的 component。
- 监听路由变化:在 Hash 模式下,VueRouter 内部通过监听`hashchange`事件监听 URL 的 hash 值(＃符号后面的 URL 部分,包括＃符号)变化。在 History 模式下,VueRouter 内部通过 HTML5 的 History API 实现。当调用路由的 push() 或 replace() 方法时,实际上是调用的 history 对象的 pushState() 或 replaceState()函数;VueRouter 内部还监听了`popstate`事件,用于监听浏览器的前进后退。

VueRouter 的实现原理主要包括两个方面:路由匹配和路由变化。通过路由匹配,将路由地址映射为对应的组件,通过监听路由变化,触发页面跳转,并更新对应的视图。

### VueRouter 中 this.$router与this.$route 的区别?

- this.$router 表示 VueRouter 的实例,它可以控制导航路由。
- this.$route表示当前路由跳转对象,通过this.$route 可以获取 name、path、params、query、meta 等数据。

### history 和 hash 模式的区别?

VueRouter 目前提供了 abstract、history、hash 三种模式。history 模式与 hash 模式区别如下:

- 在 hash 模式下,仅 hash 符号之前的内容会被包含在请求中,例如:`http://www.aaa.com` ,因此对于后端来说,即使没有做到对路由的全覆盖,也不会返回 404 的错误。
- 在 history 模式下,前端的 URL 必须和实际向后端发起请求的 URL 一致,例如`http://www.aaa/book/a` ,如果后端缺少对/book/a 的路由处理,将会返回 404 错误。

### VueRouter 切换和 location.href 切换有什么区别?

- location.href 切换会刷新页面,而 VueRouter 并不会刷新页面。
- VueRouter 提供了路由守卫,匹配路由时会执行对应的路由守卫,相比较 location.href 切换能提供更多控制,例如路由切换时做鉴权、参数验证等业务逻辑处理。

## VueRouter 导航守卫有哪些?

根据作用范围导航钩子可分为全局导航守卫(作用于任意路由和组件)、路由独享守卫(仅作用于当前路由)、组件守卫(仅作用于当前组件)。

- 全局导航守卫:根据执行顺序全局导航守卫分为全局前置守卫、全局解析守卫、全局后置守卫。

```ts
/**
 * to: Route: 即将要进入的目标路由对象。
 * from: Route: 当前导航正要离开的路由。
 * next: Function: 放行路由,一定要调用该方法来 resolve 这个钩子。next()的执行效果依赖于参数,例如:
 * - next(false): 中断当前的导航。如果浏览器的 URL改变了(可能是用户手动或者浏览器后退按钮),
 * 那么 URL 地址会重置到 from 路由对应的地址。
 * - next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。当前的导航被中断,然后进行一个新的导航。
 * 允许向 next 传递任意位置对象,且允许设置诸如 replace: true、name: 'home' 之类的选项以及任何用在
 * router-link 的 to prop 或 router.push 中的选项。
 * - next(error):如果传入 next 的参数是一个 Error 实例,则导航会被终止且该错误会被传递给
 * router.onError() 注册过的回调。
 */
// 全局前置守卫,当一个导航触发时,全局前置守卫按照创建顺序调用
router.beforeEach((to, from, next) => {});

// 全局解析守卫,在导航被确认之前,同时在所有组件内守卫和异步路由组件被解析之后调用
router.beforeResolve((to, from, next) => {});

// 全局后置守卫,导航确认之后调用
router.afterEach((to, from) => {});
```

- 路由独享守卫:在进入路由时调用 beforeEnter 守卫。

```ts
const router = new VueRouter({
  routes: [
    {
      path: "/foo",
      component: Foo,
      beforeEnter: (to, from, next) => {
        // ...
      },
    },
  ],
});
```

- 组件守卫:

```js
const Foo = {
  template: `...`,
  /**
   * 在渲染该组件的对应路由被 confirm 前调用,该守卫内无法访问this,
   * 因为当守卫执行前,组件实例还没被创建
   */
  beforeRouteEnter(to, from, next) {},
  /**
   * 在当前路由改变,但是该组件被复用时调用。举例来说,对于一个带有动态参数的路径
   * /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候,由于会渲染同样的 Foo 组件,
   * 因此组件实例会被复用。而这个钩子就会在这个情况下被调用。可以访问组件实例 `this`
   */
  beforeRouteUpdate(to, from, next) {},
  /**
   * 导航离开该组件的对应路由时调用,可访问组件实例 `this`
   */
  beforeRouteLeave(to, from, next) {},
};
```

## VueRouter 路由传值方式有哪些?

- 路径参数(即动态路由):在路由定义时使用`:变量名`来表示动态参数,例如在路由定义中设置 `path: '/user/:userId'`,在组件中可以通过 `$route.params.userId` 来获取参数。
- 查询参数:在路由跳转时可以使用 `router.push({path: '/user', query: {userId: 123}})` 来传递参数,组件中可以通过 `$route.query.userId` 来获取参数。
- 状态参数(即路由元信息):可以在路由定义中设置 meta 属性,例如 `meta: {isLogin: true}`,在组件中可以通过 `$route.meta.isLogin` 来获取参数。
- props 参数:可以在路由定义中通过设置 `props: true` 或者自定义函数来启用 props 参数,例如 props: true 表示将所有的路由参数通过 props 传递给组件，自定义函数可以通过 `$route.params` 或 `$route.query` 来获取参数,例如 `props: (route) => ({userId: route.params.userId})`。在组件中可以通过 props 属性来获取参数。

## VueRouter 中 params 和 query 传参的区别?

- params 只能根据 name 来引入路由,query 既可以根据路由 name,又可以根据 path 引入路由。
- params 类似于 post 请求,参数不会在地址栏显示,而 query 类似于 get 请求,参数会在地址栏显示。

## Vue3 的新特性?

- **Composition API**。这是 Vue3 中最重要的特性之一,它可以更好地组织组件代码,使其更易于维护和重用。
- **setup 语法糖**。

## Vue3 对比 Vue2 有哪些优化点?

- **响应式系统优化**。Vue3 引入了 Proxy 对象作为响应式系统的实现方式,代替了 Vue2 中使用的 Object.defineProperty()。这种优化可以提高响应式系统的性能,减少了监听的数据量,并支持嵌套属性和动态添加属性,Proxy 相较于 Object.defineProperty()的监听数据优点如下:
  - **更好的性能**。Object.defineProperty() 监听对象属性时,只能遍历对象的属性,因此当对象的属性较多时,会导致性能问题。而 Proxy 可以监听整个对象,所以它的性能更好。
  - **支持数组变化检测**。由于 Object.defineProperty()无法监听数组类型的数据,在 Vue2 中对数组原型上的 7 个方法进行了重写拦截,从而实现了数组的监听,而 Proxy 可以直接监听数组的变化。
  - **支持动态添加属性**。使用 Object.defineProperty() 监听属性时,只能监听已存在的属性,无法监听动态添加的属性,在 Vue2 中为了监听动态添加的属性,提供了$set()和$delete()方法分别用于监听对象的设置属性和删除属性。相比较 Object.defineProperty() Proxy 可以监听动态添加的属性。
  - **支持嵌套属性监听**。使用 Object.defineProperty() 监听属性时,无法监听嵌套属性(例如对象嵌套对象或对象嵌套数组等)的变化,需要通过递归监听。而 Proxy 可以监听嵌套属性的变化。
  - **更好的错误提示**。使用 Proxy 监听属性时,如果出现错误会更容易发现和定位错误,而 Object.defineProperty() 的错误提示相对较弱。
- **编译器优化**。Vue3 引入了静态模板缓存机制,可以减少渲染时的编译开销,提高了页面渲染性能。同时也支持了更好的 Tree Shaking,只编译使用到的模板和组件,减小了打包后的体积。
- **更好的组件逻辑复用**。Vue3 引入了 Composition API,这个新的 API 使组件的逻辑复用更加方便,能够更好地组织代码,提高了代码的可维护性和可读性。而且 Vue3 提供 Composition API 支持 Tree Shaking,未使用的 API 均不会被打包。
- **更快的虚拟 DOM**。Vue3 的虚拟 DOM 渲染性能得到了提升,主要是通过更好的 Diff 算法和事件的缓存处理,减少了虚拟 DOM 的更新次数,提高了页面的渲染效率。
- **更好的 TypeScript 支持**。Vue3 对 TypeScript 的支持更加友好,提供了更好的类型推断和类型检查,方便了开发者在项目中使用 TypeScript。

## Vue3 的编译优化有哪些?

- **Block 和 PatchFlags(补丁标志)优化**。由于在运行时得不到足够的关键信息,无法区分动态内容和静态内容,因此传统 DIFF 算法无法避免新旧虚拟 DOM 树之间无用的比较操作。Vue3 为了避免新旧虚拟 DOM 之间无效比较操作,在虚拟节点新增了 dynamicChildren 属性来存储虚拟节点的动态信息(保存了动态节点信息),带有 dynamicChildren 属性的虚拟节点被称为 Block(块),并且使用 PatchFlags(补丁标志)来区分操作类型(PatchFlags 是一个数字,当虚拟节点存在 PatchFlags 时表示当前节点是一个动态节点)。渲染器在更新时以 Block 为维度,更新一个 Block 时,会忽略虚拟节点的 children 数组,而是直接找到该虚拟节点的 dynamicChildren 数组,并只更新该数组中的动态节点。这样可以在更新时跳过静态内容,仅更新动态内容,从而实现精确更新,提升 DIFF 更新效率。
- **静态提升**。静态提升即把纯静态的虚拟节点提升到渲染函数之外,从而减少更新时创建虚拟 DOM 带来的性能开销和内存占用。

```js
//--- 静态提升前的例子
function render(ctx) {
  return (
    openBlock(),
    createBlock("div", null, [
      /*
       * 当前虚拟节点是静态节点,更新时创建虚拟DOM会带来性能开销和内存占用,
       * 因此可以将该节点静态提升到渲染函数外
       */
      createVNode("p", null, "static text"),
      createVNode("p", null, ctx.title, 1 /* TEXT */),
    ])
  );
}

//--- 静态提升后的例子
// 将静态节点提升到渲染函数外,渲染函数重新执行时并不会重新创建静态虚拟节点,从而避免了额外开销
const hoist1 = createVNode("p", null, "static text");
function render(ctx) {
  return (
    openBlock(),
    createBlock("div", null, [
      // 引用静态节点
      hoist1,
      createVNode("p", null, ctx.title, 1 /* TEXT */),
    ])
  );
}
```

- **预字符串化**。预字符串化是基于静态提升的一种优化策略,如果模板中包含了大量连续纯静态节点,通过预字符串化可以将这些连续的静态节点序列化为字符串,并生成一个 Static 类型的虚拟节点。预字符串化的优点如下:
  - 大块的静态内容可以通过 innerHTML 进行设置,性能上具有一定的优势。
  - 减少创建虚拟节点产生的性能开销和内存占用。当存在大量连续纯静态节点,通过静态提升策略会创建大量静态节点,而预字符串化仅需创建少量静态节点。
- **缓存内联事件处理函数**。组件每次重新渲染时,都会为组件创建一个全新的 props 对象,props 对象中的处理事件也会被重新创建,从而造成额外的性能开销(处理事件变化会导致组件重新渲染)。Vue3 为了避免组件重新渲染时重新创建处理事件,对内联事件处理函数进行了缓存,组件重新渲染时优先读取缓存中的事件处理函数,从而减少重新渲染组件时重新创建处理事件的开销,避免造成不必要的组件更新。
- **v-once 指令优化**。v-once 指令可以缓存全部或部门虚拟节点,能够避免组件更新时重新创建虚拟 DOM 带来的性能开销,也可以避免无用的 DIFF 操作。
- **v-memo 指令优化**。v-memo 接收一个依赖数组,当模板更新前与更新后依赖数组的每一项都相同时(也就是模板更新前与更新后依赖数组未发生变化),那么会跳过当前节点的更新,从而避免无用 DIFF 操作。v-memo 通常搭配 v-for 使用(v-memo 和 v-for 必须用在同一节点上才会生效),在 v-for 渲染列表时,使用 v-memo 可以避免创建大量虚拟节点。

```html
<!-- 未使用v-memo时,selected状态发生变化时,会触发组件重新渲染导致创建大量vnode,
  而渲染列表中的节点大部分是无需变化的 -->
<div v-for="item in list" :key="item.id">
  <p>ID: {{ item.id }} - selected: {{ item.id === selected }}</p>
  <p>...more child nodes</p>
</div>

<!-- 使用v-memo时,selected状态发生变化时,由于使用了v-memo="[item.id === selected]"
  表示只有列表项被选中状态改变时才需要更新,其他状态未变化的列表项可以重用之前的vnode 
  并跳过差异比较 -->
<div v-for="item in list" :key="item.id" v-memo="[item.id === selected]">
  <p>ID: {{ item.id }} - selected: {{ item.id === selected }}</p>
  <p>...more child nodes</p>
</div>
```

## Vue3 中 watch 与 watchEffect 的区别?

在 Vue 3 中,watch 和 watchEffect 是两种不同的响应式数据监听方式,它们的区别如下:

- watch 适用于监听具体的数据变化,需要手动指定监听的数据和回调函数,而 watchEffect 则可以自动侦测数据变化并执行相应的副作用函数。
- watch 可以监听到数据的变化前后值的变化,可以进行更加精细的控制和处理,而 watchEffect 只能获取到变化后的值。
- watch 会在组件实例化时就执行一次回调函数,而 watchEffect 只有在组件渲染时才会执行,因此 watchEffect 可以更好地适应动态的响应式数据变化。
- watch 需要手动清除监听器,否则可能会导致内存泄漏,而 watchEffect 会在组件销毁时自动清除。

## Pinia 对比 Vuex 的优点?

Pinia 和 Vuex 都是 Vue.js 中非常流行的状态管理库。Pinia 对比 Vuex 优点如下:

- 更好的类型支持。Pinia 通过使用 TypeScript 实现,提供了比 Vuex 更好的类型支持。
- 更好的性能。Pinia 只在需要时才会触发状态更新,而不是像 Vuex 一样在每个状态变化时都会触发。这样可以避免不必要的更新,提高应用程序的性能。
- 更简单的 API。Pinia 的 API 更简单直观,不需要像 Vuex 那样编写大量的模板代码。它也更容易理解和维护,因为它更加模块化和解耦。Pinia 基于 Vue3 的 Composition API 组织代码,而 Vuex 更注重使用重命名空间和模块化组织代码。在 Vuex 引入了 state、mutation、action、getter 四个概念,其中触发 mutation 用于同步修改状态,触发 action 用于异步修改状态。而 Pinia 仅引入了 state、action、getter,触发 action 不仅可以同步修改状态,也可以异步修改状态。
- 更好的拓展性。Pinia 采用插件化的设计,使得开发者可以很方便地扩展和定制库的功能,比如添加插件以支持异步状态管理或数据持久化。

## 26.详细说说 Vue 中的 DIFF 算法

## 27.Vue 与 React 的区别?

- 从 UI 描述来看,Vue 使用模板(或者 JSX)描述 UI,而 React 使用 JSX 描述 UI。模板相比较 JSX 的优点在于提供模板语法糖(例如 v-for、v-if)、编译时可以根据编译信息进行优化,其缺点是不如 JSX 灵活。
- 从数据流方面来看,Vue 中数据属于可变数据(Mutable),React 中的数据属于不可变数据(Immutable)。Vue 内部提供了响应系统,通过拦截操作,修改一个数据的同时也会收集依赖,然后数据修改的时候去通知更新 DOM。简单来说修改 Vue 中的响应式数据,可以触发组件重新渲染。React 的范式更偏向函数式编程,在 React 中定义的状态是不可变的,修改状态时需要返回一个新的状态,直接修改状态并不会触发组件重新渲染。
- 从运行环境来看,Vue 偏编译时和运行时,而 React 属于重运行时。Vue 在运行时和预编译取了一个很好地权衡,保留了虚拟 dom,通过响应式控制虚拟 dom 的颗粒度,在预编译阶段里又做了足够多的性能优化。React 的 Runtime 相比较 Vue 更重一些,在 React 中数据发生变化后,并没有直接去操作 dom,而是生成一个新的虚拟 dom,并且通过 diff 算法得出最小的操作行为,该过程全部发生在运行时阶段。
- 从抽象层面来看,Vue 抽象层级较低,React 抽象层次较高。React 中定义了 Component、State、Hooks、Effect 等概念,抽象层次较高,上手难度较大。而 Vue 中仅了解 SFC、data、methods 等概念即可上手。
