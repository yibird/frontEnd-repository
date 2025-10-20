### 前言

Vue 团队于 2020 年 9 月 18 日晚 11 点半发布了 Vue3.0 版本,截止当前时间(2021 年 10 月 21 日)Vue 最新版本是 v3.2.20,Vue3 采用 TypeScript 开发,对比 Vue2.x 无论是从开发体验、代码组织(Vue3.x 将不同功能拆分为不同模块)、运行性能等方面来看都是巨大的提升,其中 Vue3.x 不仅提供了许多新特性,也废弃了 Vue2.x 因历史遗留的问题。

#### Vue3 新特性介绍

- **Composition Api(合成 Api)**:Vue2.x 通过 Options Api(选项 Api) 构建一个组件(Vue2 组件中选项有 data、methods、filters、components 等等),在 Vue3.x 中则将一些可重用行为抽离为一个可复用函数,其目的是提高程序的灵活性和可维护性,减少开发者的逻辑关注点。Vue3 不仅支持 Composition Api 同时也兼容 Options Api。
- **setup 钩子函数**:在 Vue3.x 中 提供了 setup 钩子用于替代 beforeCreate 和 created 钩子函数(setup 执行时机优于 beforeCreated),其余钩子函数都需要显式的导入。
- **Teleport(传送)**:TelePort 可以将 DOM 元素或组件插入到某个元素下。teleport 是 Vue3 提供的组件,使用起来非常简单,通过 to 属性指定要插入的元素。使用 Teleport 非常容易解决弹出层定位问题。
- **Fragment(片段)**:Fragment 支持多根节点的组件。

```vue
<!-- vue3.x可以这样写,但vue2.x不行 -->
<template>
  <div>1<div>
  <p>2</p>
</template>
```

- **`<script setup>`语法糖**:
  `<script setup>`是一种编译时语法糖,与 Vue3.2 正式发布,它用于在单文件组件 (SFC) 中更加容易使用 Composition API,相比较`<script>`它具有如下优点:
  - 在 setup 语法糖中定义的变量或方法可以直接用于模板(无需返回)。这是因为`<script setup>`被编译成一个内联在模板范围内的渲染函数,向模板暴露作用域。
  - 能够使用 TypeScript 声明 props 和 emit。Vue 提供了 defineProps 和 defineEmits 两个编译宏用于定义 props 和 emit。
  - 更好的运行时性能(模板编译成同作用域的 render 函数,没有中间代理)。
  - 更好的 IDE 类型推断性能(语言服务器从代码中提取类型的工作更少)。

- **createRenderer API**:
  (由@vue/runtime-core 提供的用于创建自定义渲染器)

- **SFC 状态驱动 CSS 变量:**
  SFC`<style>`标签支持使用 v-bind CSS 函数将 CSS 值链接到动态组件状态,一旦组件的状态发生变化时将会响应式的更新。

- **Suspense(实验特性):**

#### Vue3 变化介绍

- v-model 指令替换为 v-bind.sync,且一个组件可以使用 v-model。
- 过滤器被删除。$children Api被移除,官方推荐使用$ref 访问子组件实例代替。
- $on、$off、$once 实例方法已被移除,官方推荐第三方事件触发器库,例如 mitt 或 tiny-emitter。
- $listeners 对象在 Vue 3 中已被移除,现在事件监听器是 $attrs 的一部分。
- 在 Vue3 中,将所有 this.$scopedSlots 替换为 this.$slots,并且会将 slots 作为函数调用,例如 this.$slots.mySlot 替换为this.$slots.mySlot()。

#### 上手指南

想要快速上手 Vue3.x 那么必须对标 Vue2.x 已有功能,并学习 Vue3.x 提供的新特性,由于 Vue3 采用 TypeScript 进行开发,所以 Vue3 与 TypeScript 结合成为了开发主流项目的标配。按照功能可分为如下维度:

- 定义组件。在 Vue3.x 提供了 Composition Api 和`<script setup>`语法糖两个方式定义组件,我们得了解如何在组件中定义响应式数据、声明 Props、声明组件的钩子函数、定义组件的方法和计算属性及数据的侦听。
- 组件生命周期。在 Vue3.x 使用 setup()钩子代替了 Vue2.x created 和 beforeCreated 钩子函数,且在 Vue3.x 中除了 setup 钩子无需显式导入,其余钩子都需要显式导入。
- 定义组件响应式状态。在 Vue2.x 中响应式状态定义在组件的 data 属性上,但在 Vue3.x 提供了 ref 和 reactive 两个 Api 用于定义组件响应式状态。
- 组件通讯。组件通讯可分父子组件通讯和跨组件通讯两种,父子组件通讯可以分为 props、emit、slot、ref 四个维度,跨组件通讯可以分为 inject/provide、v-bind、attrs、ref 四个维度,很遗憾的是 Vue3.x 删除了事件系统,但官方推荐使用第三方库 emitt 进行替代。
- 新的内置组件。teleport 和 Suspense(实验性)是 Vue3.x 提供的内置组件。
- 新的指令。
- 新特性:`<script setup/>`语法糖。
- 新特性:`<style/>`支持。

#### 快速上手 Vue3.x

这里会使用 Vite 来作为构建工具创建 Vue3 项目,或许你很好奇为什么不使用官方推荐的 vue/cli 创建项目,这里我给出两个理由:

- 第一个 Vite 具有更快的构建速度和更加的开发体验,但@vue/cli 最新版本 4.5.15 内部采用的是 webpack5.54.0,虽然 webpack5 相比较 webpack4 提供了更多优化策略,但对比 Vite 构建速度 Webpack 仍会慢上几倍甚至数十倍(项目越大越明显)。不过 Webpack 的稳定性和生态 Vite 是无法比拟的,业界保守的做法是开发环境使用 Vite,生成打包使用 Webpack 或者 Rollup。

- 第二个 Vite 是更具高层(抽象)的构建工具。你可以用 Vite 创建 Vue、React 项目,但@vue/clic 只能创建 Vue。

使用 Vite 创建项目:

```shell
# yarn创建
yarn create @vitejs/app vue3-template-example  --template vue-ts

# pnpm创建
pnpm create @vitejs/app vue3-template-example -- --template vue-ts
```

Vue3 支持模板(SFC)和 JSX 两种方式项目,其中模板更易于被分析优化,对比 JSX 性能会能好,JSX 很难被分析优化,性能略低于模板,但 JSX 提供了更加灵活的编码方式,例如在递归组件、渲染多个分支条件场景等等,所以大部分 UI 库大量采用了 JSX 的写法。在 Vue3 中天然支持 JSX 写法,写起来与 React 基本上无差别,但可惜的是无法在 JSX 使用指令等其他特性。注意:想要在 Vue3 中启用 JSX 需要如下配置,否则会报"React 未定义"错误。

```js
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
export default defineConfig({
  plugins: [vue()],
  // 新增配置支持JSX
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
    jsxInject: "import { h } from 'vue';",
  },
})
```

```jsx
// HelloWorld.tsx
import { defineComponent, ref } from "vue";
const clickHandler = () => {
  console.log("hello");
};
const HelloWorld = defineComponent({
  setup() {
    const name = ref("z乘风");
    return { name };
  },
  render() {
    return (
      <div>
        <span onClick={clickHandler}>HelloWorld</span>
        <input v-model={this.name} /> <!-- v-model指令无效 -->
        <span>{this.name}</span>
      </div>
    );
  },
});
export default HelloWorld;
```

添加 JSX 支持:

```shell
# 添加jsx依赖支持。@vue/babel-plugin-jsx支持以JSX的方式来编写Vue代码,
# 它是jsx-next仓库中的一个子仓库,如果你使用Vite那么推荐你直接安装@vitejs/plugin-vue-jsx,
# 它通过HMR提供Vue3 JSX和TSX支持,@vitejs/plugin-vue-jsx是基于@vue/babel-plugin-jsx的封装

# yarn 或 pnpm 任选一种安装
yarn add @vitejs/plugin-vue-jsx -D

pnpm add @vitejs/plugin-vue-jsx -D

```

```ts
// 在vite.config.js 引入@vitejs/plugin-vue-jsx插件
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
  plugins: [vue(), vueJsx()],
})
```
