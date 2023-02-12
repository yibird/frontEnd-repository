## 1.什么是 MVVM架构?

Model–View–ViewModel(MVVM)是一个软件架构设计模式,其中 Model 表示数据模型,View 表示 UI 视图,ViewModel 表示 Model 与 View 之间的桥梁。当 Model 数据发生变化时 ViewModel 会通知对应的 View 重新渲染,当 View 发生变化时 ViewModel 也会通知 Model 发生变化。MVVM 将视图层与数据层进行分离,通过 ViewModel 层控制 View 的渲染与 Model 数据的变化,极大的提高了前端开发效率。虽然 Vue 没有完全遵循 MVVM 模型,但是 Vue 的设计也受到了它的启发。

## 2.Vue 生命周期

Vue2 采用 Options API 开发组件,组件生命周期定义在导入的组件对象中;Vue3 支持 Composition 和 Options API 开发组件,
在 Composition API 风格下除了 setup()钩子外,其余钩子函数都需要从 vue 包中导入。

### 2.1 Vue2 生命周期

- beforeCreate():在实例创建完成之前,此阶段实例的 data 和 methods 是读取不到。
- created():在实例创建之后,此阶段已完成数据的观测、属性和方法的运算、watch/event 事件回调,mount 挂载阶段还未开始,$el 属性目前不可见,数据并未在 Dom 元素中渲染,created 钩子函数完成后,开始进行模板(template)编译,将模板编译成渲染函数,有了- render 函数后才会执行 beforeMount()钩子函数。
- beforeMount():在挂载到实例之前被调用,相关的 render()函数首次执行。
  mounted():挂载到实例之后调用,el 选项的 Dom 节点被新创建的 vm.$el 替换,并挂载到实例之后被调用,此时数据开始在 Dom 节点上渲染,注意:后续的钩子函数都是需要外部的触发才能执行。
- beforeUpdate():实例数据发生变化之前调用。
- updated():实例数据发生变化后调用。
- beforeDestroy():实例销毁之前被调用。
- destroyed():实例销毁之后被调用。

### 2.2 Vue3 生命周期

- setup():等同 Vue2 中 beforeCreate 和 created()钩子函数。setup 接收 props 和 context 作为参数,由于在执行 setup 时尚未创建组件实例,因此在 setup 选项中没有 this(或者说 setup 的 this 指向 undefined)。这意味着,除了 props 之外,无法在 setup 函数中访问组件中声明的任何属性——本地状态、计算属性或方法。
- onBeforeMount():等同 Vue2 中 beforeMounut()钩子函数。
- onMounted:等同 Vue2 的 mounted 钩子函数。
- onBeforeUpdate():等同 Vue2 中 beforeUpdate()钩子函数。
- onUpdated():等同 Vue2 中 updated()钩子函数。
- onBeforeUnmount():等同 Vue2 中 beforeDestroy()钩子函数。
- onUnmounted():等同 Vue 中 destoryed()钩子函数。
- onRenderTracked():该钩子函数用于追踪状态,它会追踪页面上所有响应式变量和方法的状态,当有变量更新时,它就会进行跟踪,然后生成一个 event 事件,以供开发者调试。
- onRenderTriggered():该钩子函数状态触发,它不会跟踪每一个值,而是给你变化值的信息,并且新值和旧值都会明确的展示出来。onRenderTriggered 只精确跟踪发生变化的值,进行针对性调试。

## 3.Vue 组件通讯方式

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
- 第三方状态管理库。例如 Vue。
- 浏览器存储机制实现跨组件层级通讯。例如 Cookie、LocalStorage、SessionStroage、IndexDB。

### 3.2 Vue3 组件通讯方式

- 父传子通过 props。
- 子传父通过 emit()。在 emits 选项上定义需要触发的事件,通过 setup 中 context 的 emit()函数触发事件。
- 父组件通过 ref 获取子组件实例,父组件获取子组件通过 defineExpose()暴露的方法和属性。
- 通过 attrs 父传子。attrs 包含父作用域里除 class 和 style 除外的非 props 属性集合, attrs 可以通过 useAttrs()和 setup context.attr 获取。
- v-model。v-model 可以支持多个数据双向绑定。
- provide/inject 实现跨组件层级通讯。provide 用于提供向后代组件使用的数据,后代组件通过 inject 注入指定数据即可使用。
- 第三方 EventBus 实现跨组件层级通讯。在 Vue3 中移除了 Event Bus 特性,但可以使用 mitt.js 等第三方库实现组件通讯,其实现原理还是 EventBus。
- 第三方状态管理库实现跨组件层级通讯。例如 Pinia、Vue4。
- 浏览器存储机制实现跨组件层级通讯。例如 Cookie、LocalStorage、SessionStroage、IndexDB。

组件作用是抽离公共逻辑单元,这意味着组件是可以公用的,如果 data 是一个对象的话,那么所有组件实例都能访问到 data 对象,因为对象是对内存地址的引用,这样会造成组件数据的相互影响。如果 data 是一个函数,每个组件实例可以维护一份被返回对象的独立的拷贝。

## 4.为什么 Vue2 组件的 data 是一个函数

组件作用是抽离公共逻辑单元,这意味着组件是可以公用的,如果 data 是一个对象的话,那么所有组件实例都能访问到 data 对象,因为对象是对内存地址的引用,这样会造成组件数据的相互影响。如果 data 是一个函数,每个组件实例可以维护一份被返回对象的独立的拷贝。

## 5.在 Vue 中为什么 Props 是单向流?

Vue 之所以将组件组件的 Props 设计为单向流,是因为可以防止子组件对父组件的 Props 修改而造成混乱,子组件修改 Props 就会导致父组件状态的修改无法被预测,父组件无法捕获到 Props 如何被修改。

所有的 prop 都使得其父子 prop 之间形成了一个单向下行绑定:父级 prop 的更新会向下流动到子组件中,但是反过来则不行。这样会防止从子组件意外变更父级组件的状态,从而导致应用的数据流向难以理解。但可以通过`$emit()`和`.sync` 修饰符进行双向数据流通讯。

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

在 Vue2.x 中用一节点使用 v-for 和 v-if,v-for 指令的优先级高于 v-if 指令。官方并不推荐 v-for 与 v-if 同时使用。如果 v-for 和 v-if 指令同时出现时,每次渲染都会先去循环再去判断,造成了额外的性能开销。

<!-- ::: details Click me to view the code
```js
console.log('Hello, VitePress!')
```
::: -->
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
::: details v-if条件为true
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
::: details v-if条件为false
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