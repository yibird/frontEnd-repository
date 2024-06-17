Vue 是一款用于构建用户界面的 JavaScript 框架。它基于标准 HTML、CSS 和 JavaScript 构建，并提供了一套声明式的、组件化的编程模型,可以高效地开发用户界面。随着互联网的蓬勃发展,Vue、React、Angular 已成为开发 web 应用的标准事实,得益于它们庞大的生态系统和良好的开发体验,可以低成本构建高性能、交互优化的 web 应用,若要给它们排个名,个人觉得 Vue > Solidjs > React。三者提供的特性基本大同小异,其中 Vue 在性能和开发体验取得了良好的平衡,而 React 背靠脸书在理论方面取得了卓越贡献,但在实践方面却与 Vue 相隔一座大山,我清晰感受到使用 React 与 TypeScript 结合的丝滑感,也深知 React 生态系统割裂感的痛,包括但不限于以下方面:

- 致命的 Hooks。React 在 16.8 推出了 Hooks 新特性,用于解决组件内部逻辑复用,但缺点是无法在分支条件中使用,而且使用不当会导致闭包陷井。再者 React 的 Hooks 设计的太过于复杂,例如 useEffect()不仅用于模拟类组件的挂载和销毁钩子函数,还支持根据依赖项监听组件状态变化,这很明显违反了单一原则,以至于第三方 Hooks 库不得不提供组件生命周期 Hook。
- 不必要的渲染。在 React 中一旦组件状态发生变化就会触发组件重新渲染,这可能导致子组件不必要的渲染,例如父组件向子组件传入一系列 Prop,当父组件修改与子组件无关的 Prop 时,仍会导致子组件重新渲染。为此 React 提供了 useMemo、useCallback 等一系列性能优化 API,但 useMemo、useCallback 需要手动声明依赖项,好在 React 19 推出了 React Compile,使用 React Compile 后会根据 useMemo、useCallback 中依赖的状态自动收集,这意味着使用 useMemo、useCallback 无需手动声明依赖项。

Vue 和 React Vue 与 React 两者区别如下:

-
-

## Vue 目录介绍

```txt
vuejs/core
├── packages  // 该目录包含了 Vue 3 各个核心模块的源代码
│   ├── compiler-core // 核心编译器模块，包含平台无关的编译器逻辑。
│   ├── compiler-dom // 针对 DOM 的编译器模块，包含特定于浏览器平台的编译逻辑。
│   ├── compiler-sfc // 单文件组件（SFC）编译器，处理 .vue 文件的解析和编译。
│   ├── compiler-ssr // 针对服务端渲染（SSR）的编译器模块。
│   ├── reactive // 响应式系统的实现，包含响应式状态、计算属性和副作用等。
│   ├── runtime-core // 核心运行时模块，包含平台无关的运行时逻辑。
│   ├── runtime-dom // 针对 DOM 的运行时模块，包含特定于浏览器平台的运行时逻辑。
│   ├── runtime-test // 用于测试环境的运行时模块。
│   ├── server-renderer // 服务端渲染模块，处理服务端渲染逻辑。
│   ├── shared // 共享的工具函数和类型定义，供多个模块使用。
│   ├── template-explorer // 模板探索工具，用于调试和测试模板编译输出。
│   └── vue // Vue 3 的主入口，组合了以上各模块，导出完整的 Vue 功能。
├── scripts
├── test-dts
├── test
├── .editorconfig   // 编辑器配置文件，用于保持不同开发环境下代码风格的一致性。
├── .eslintrc.js // ESLint 配置文件，定义了代码检查的规则。
├── .gitignore // Git 忽略文件，指定哪些文件和目录不应包含在版本控制中。
├── .npmignore // NPM 忽略文件，指定哪些文件和目录不应包含在发布包中。
├── .prettierrc // Prettier 配置文件，用于代码格式化。
├── .travis.yml // Travis CI 配置文件，用于(CI/CD)持续集成。
├── LICENSE  // 项目的许可证信息。
├── package.json // 项目配置文件，包含依赖、脚本等信息。
├── README.md  // 项目的自述文件，包含项目简介、安装和使用说明。
└── tsconfig.json // TypeScript 配置文件，定义 TypeScript 编译选项。
```
