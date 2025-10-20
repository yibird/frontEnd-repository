### 定义组件

#### definedComponent

defineComponent 用于定义一个组件,允许接收一个组件 Option 的对象,或者是一个 setup 函数，函数名称将作为组件名称来使用。

```js
// vue2.x的写法:defineComponent接收options对象
import { defineComponent } from "vue";
export default defineComponent({
  props:{
    name:{
      type:String,
      default:'默认的名字'
    },
    list:{
      type:Array,
      default:()=>[]
    }
  },
  data() {
    return { count: 1 };
  },
  methods: {
    increment() {
      this.count++;
    },
  },
  compute(){
    getCount(){
        return this.count;
    }
  }
});
```

```js
<template>
  <div>
    <button @click="decrement">-</button>
    <span>{{count}}</span>
    <button @click="increment">+</button>
  </div>
  <div>type:{{type}}</div>
</template>

// vue3 写法
import {defineComponent,toRefs,ref} from 'vue';
const component = defineComponent({
  props: {
    name: {
      type: String,
      default: "z乘风",
    },
    list: {
      type: Array,
      default: () => [1,2,3],
    },
  },
  /*
   * emits支持数组和对象的方式定义触发事件,推荐使用对象方式,
   * 对象方式下可以对触发事件的参数进行类型限制
   */
  emits:['add']
  /*
   *  setup钩子函数等同于Vue2.x的created和beforeCreated钩子函数,
   *  setup接收组件的props和context两个参数,props是一个响应式对象,
   *  若想以普通对象方式访问props则可以使用toRefs()将响应式对象转换为普通对象。
   *  context是一个对象,它包含了当前组件的attrs、slots、emit3个属性。
   */
  setup(props, context) {
    // props是一个响应式对象,toRefs()可以将响应式对象转换为普通对象
    const {name,list} = toRefs(props);
    console.log(name,list); // 'z乘风' [1,2,3]

    /*
     * context是一个普通对象,包含了组件的attrs、slots、emit
     * attrs和slots都是响应式对象,emit是一个方法,expose是组件对外部暴露的接口
     */
    const { attrs,slots,emit,expose} = context;
    console.log(attrs,slots); // Proxy {__vInternal: 1} Proxy {__vInternal: 1}
    console.log(emit) // (event, ...args) => instance.emit(event, ...args)


    // 触发事件
    emit('add')

    /*
     * 使用ref定义响应式变量,ref会根据初始值进行类型推断,也可以显式指定泛型。
     *
     * 相比较reactive ref有一个明显的缺点,获取或设置ref时都需要获取或设置ref的value,
     * 但unref()可以直接返回ref内部value,unref是val = isRef(val) ? val.value : val的语法糖。
     * reactive适合定义集合数据,例如对象、数组等等,ref更适用于单个值
     */
    const count = ref<number>(0)

    // 定义方法
    const decrement = ()=>{
      // 获取或设置ref时都需要获取或设置ref的value
      count.value = count.value - 1
    }

    const increment = ()=>{
      // 获取或设置ref时都需要获取或设置ref的value
      count.value = count.value - 1
    }
    // 需要把定义的响应式变量和方法返回,此时模板才能访问到
    return {
       count,
       decrement,
       increment
    }
  },
});
/*
 * defineComponent()返回一个对象,该对象包含如下信息:
 *
 * components:{} // defineComponent中定义的components,只有定义才有
 * install: (app) => {…} // 组件的安装方法
 * props: {} // 组件的props,只有在defineComponent中定义props才有
 * render: ƒ _sfc_render(_ctx, _cache, $props, $setup, $data, $options) // 组件渲染方法
 * setup: setup(props, context) { } // setup函数,定义才有
 * __file: "/Users/vue3-demo/src/components/Component.vue" // 组件文件位置
 * __hmrId: "cc3ff87c" // 热更新id
 * __scopeId: "data-v-cc3ff87c" // scopedId,当组件中使用了<style scoped />才会出现此属性,
 *  此属性用于隔离组件的样式,使用后会为当前组件下元素添加data-v-cc3ff87c属性,用于区分<style scoped />中样式的作用范围
 *
 */
console.log(component);
```

**总结:**

- defineComponent 用于定义一个组件,接收一个配置对象用于定义组件信息,配置对象可以接收 props、emits、name、setup 等信息。
- setup 是 Vue3.x 新提供的生命周期函数,用于替代 Vue2.x 的 beforeCreated 和 created 钩子函数。它接收 props 和 context 两个参数,props 为组件的 props 且是一个具有响应式的对象,若想以正常 JS 方式操作 props 则可以通过 toRefs()响应式对象转换为普通的 JS 对象。context 是一个普通对象,包含了组件的 attrs、slots、emit、expose,attrs、slots、emit 等用于组件实例的$attrs、$slots、$emit,attrs、slots 都是响应式对象,emit 是一个方法,可以通过 emit 触发对应的事件,expose 是组件对外暴露的接口。
- ref 可以定义响应式对象但一般用于单个值。setup 函数需要返回模板中所用到的属性或方法,props 中的属性可除外。

#### defineAsyncComponent

defineAsyncComponent()用于创建一个只有在需要时才会加载的异步组件。defineAsyncComponent 可以接受一个返回 Promise 的工厂函数,Promise 的 resolve 回调应该在服务端返回组件定义后被调用,也可以调用 reject(reason) 来表示加载失败。defineAsyncComponent()也可以接受一个配置对象定义组件信息。

```js
/** defineAsyncComponent接收一个 Promise */
import { defineAsyncComponent } from 'vue'
const AsyncComp = defineAsyncComponent(() => import('./components/AsyncComponent.vue'))
app.component('async-component', AsyncComp)
```

```js
/** defineAsyncComponent()接收一个配置对象 */
import { defineAsyncComponent } from 'vue'

const AsyncComp = defineAsyncComponent({
  // 工厂函数
  loader: () => import('./Foo.vue'),
  // 加载异步组件时要使用的组件
  loadingComponent: LoadingComponent,
  // 加载失败时要使用的组件
  errorComponent: ErrorComponent,
  // 在显示 loadingComponent 之前的延迟 | 默认值：200（单位 ms）
  delay: 200,
  // 如果提供了 timeout ，并且加载组件的时间超过了设定值，将显示错误组件
  // 默认值：Infinity（即永不超时，单位 ms）
  timeout: 3000,
  // 定义组件是否可挂起 | 默认值：true
  suspensible: false,
  /**
   *
   * @param {*} error 错误信息对象
   * @param {*} retry 一个函数，用于指示当 promise 加载器 reject 时，加载器是否应该重试
   * @param {*} fail  一个函数，指示加载程序结束退出
   * @param {*} attempts 允许的最大重试次数
   */
  onError(error, retry, fail, attempts) {
    if (error.message.match(/fetch/) && attempts <= 3) {
      // 请求发生错误时重试，最多可尝试 3 次
      retry()
    } else {
      // 注意，retry/fail 就像 promise 的 resolve/reject 一样：
      // 必须调用其中一个才能继续错误处理。
      fail()
    }
  },
})
```

#### h

h()用于创建虚拟节点(VNode),VNode 其实就是一个普通的 JS 对象,它包含了在页面渲染的节点信息和其所有子节点的描述,h()相当于一个手动渲染(render)函数。h()接收 type，props 和 children 三个参数:

- type:type 表示渲染节点的类型,可选类型为`String | Object | Function`。type 可以是 HTML 标签名、组件、异步组件或函数式组件,使用 null 或者返回 null 的函数将会被渲染一个注释,type 参数是必填的。
- props:表示节点的 props,它是一个对象,与我们将在模板中使用的 attribute、prop 和事件相对应,可选。
- children:表示子代 VNode,可选类型有`String | Array | Object`,children 可以使用 h() 生成,或者使用字符串来获取"文本 VNode",或带有插槽的对象。

```js

```

### 组件生命周期

### 定义响应式状态

### 组件通讯

### 内置组件

### 新的指令

### `<script setup/>`语法糖

Vue 在 3.2 版本正式发布了`<script setup/>`语法糖特性,提供了一种是相比较 defineComponent 定义组件更为简洁的方式,其特性如下:

- 顶层的绑定会被暴露给模板。`<script setup>`定义的变量可以直接用于模板。使用时`<script setup>`,模板被编译成一个内联在 setup 函数范围内的渲染函数。这意味着内部声明的任何顶级绑定(变量和导入)`<script setup>`都可以直接在模板中使用。
- 引入组件或指令(需要以 v 为前缀)无需注册即可使用。
- 支持 defineProps 和 defineEmits 定义 Props 和 Emits, 通过 defineProps 和 defineEmits 声明具有完整类型推断支持的 props 和 emits(无需引入)。defineProps 的缺点是无法为 Props 提供默认值,但是 Vue 提供 withDefaults()编译器宏用于解决此问题。
- 通过 Composition Api 获取 Slots、Attrs。在`<script setup>`可通过 useSlots 和 useAttrs 获取 slots 和 attrs。在`<script setup>`中使用 slots 和 attrs 是非常少见的,Vue 也提供了 this.$slots和this.$attrs 用于获取 slots 和 attrs,极少数情况可以通过 useSlots 和 useAttrs 获取 slots 和 attrs。
- 顶层 await。在`<script setup>`顶级作用域中可以使用 await,setup()将生成 async 函数作为结果。
- 对外暴露接口。可以通过 defineExpose 编译器宏对外提供属性或方法。
- 与普通的`<script>`一起使用。

**setup 的限制**:
由于模块执行语义的差异,内部代码`<script setup>`依赖于 SFC 的上下文。当移动到外部.js 或.ts 文件中时，它可能会导致开发人员和工具的混淆。而且`<script setup>`不能与 src 属性一起使用。

**setup 的缺点**:

- IDE 需要为这个新`<script setup>`模型提供专门的处理,以便提供模板表达式类型检查/道具验证等。Vue 官方推荐 Vue2 版本使用 Vetur 插件作为 Vue 辅助开发工具,推荐 Vue3 版本使用 Volar 作为 Vue 辅助开发工具,截至目前，Volar 已经在 VSCode 中提供了对该 RFC 的全面支持,包括所有与 TypeScript 相关的功能。它的内部也被实现为一个语言服务器，理论上可以在其他 IDE 中使用。
- 使用`<script setup>`获取导致 ESLint 规则失效。ESLint 规则如 no-unused-vars,我们需要一个替换规则 eslint-plugin-vue,将 `<script setup>`和`<template>`表达式都考虑在内。

### Style 新特性

### `<style scoped>`

当 `<style>`标签带有 scoped 属性时,它定义的属性仅会作用于当前组件,而不会影响其他组件的样式(会影响子组件的根节点),这是因为 Vue 通过 PostCSS 为组件生成了 scoped 唯一标识,该标识会被做为当前组件下所有元素的属性,`<style scoped/>`中所定义的样式会被转换为引用 scoped 唯一标识做为属性选择器的样式。

```vue
<style scoped>
  .example {
    color: red;
  }
</style>
<template>
  <div class="example">hi</div>
</template>

<!-- 转换后的内容如下: -->

<style>
  .example[data-v-f3f3eg9] {
    color: red;
  }
</style>
<template>
  <div class="example" data-v-f3f3eg9>hi</div>
</template>
```

#### SFC 状态驱动 CSS 变量

在 Vue3.2 版本中提供了 v-bind 函数用于将组件状态绑定到 CSS,一旦组件状态发生变化时绑定到的 CSS 也将进行响应式的更新,基于这一特性动态切换 CSS 属性变得轻而易举。

```vue
<template>
  <div>
    <span class="text">hello CSS</span>
    <button @click="changeCssVariable">change color</button>
  </div>
</template>

<script>
  import { defineComponent, ref } from 'vue'
  export default defineComponent({
    setup() {
      const color = ref('#000')
      const changeCssVariable = () => {
        color.value = 'red'
      }
      return {
        color,
        changeCssVariable,
      }
    },
  })
</script>
<style scoped>
  .text {
    color: v-bind(color.value);
  }
</style>
```
