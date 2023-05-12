## 1.什么是 Vite?它为什么这么快?

Vite 是下一代前端开发与构建工具,其特点是基于 ESBuild 构建效率非常快。

- 基于 ESM 无 Bundle 开发。Webpack 传统打包工具首先会根据打包入口(entry)路由到需要打包的模块,模块打包构建后生成 Bundle(打包的产物),然后再通过服务器重新加载,这中间包含一系列打包工作,当模块越大时打包时间越长。Vite 以原生 ESM 方式提供源码,利用浏览器解析 import 发出 Http 请求,服务端拦截返回给定资源,完全摒弃了打包操作,服务器即启即用。
- 基于 esbuild 构建和预构建依赖。Vite 在构建前会将模块区分为 依赖 和 源码 两类,例如 Vue、React、AntdUI、Loadsh 这些通过包管理工具安装的库被称为依赖,而在项目中编写的代码叫做源码。依赖是大多数情况下不会发生变化的纯 JS,依赖也通常会存在多种模块化格式(例如 ESM 或者 CommonJS)。Vite 在执行前会进行预构建依赖,预构建依赖好处如下:
  - 兼容性 CommonJS 和 UMD 模块。开发阶段中,Vite 的开发服务器将所有代码视为原生 ES 模块。因此,Vite 必须先将作为 CommonJS 或 UMD 发布的依赖项转换为 ESM。
  - 提升性能。Vite 将有许多内部模块的 ESM 依赖关系转换为单个模块,以提高后续页面加载性能。一些包将它们的 ES 模块构建作为许多单独的文件相互导入。例如 lodash-es 有超过 600 个内置模块,当执行 `import { debounce } from 'lodash-es'` 时，浏览器同时发出 600 多个 HTTP 请求,大量请求会在浏览器端造成请求阻塞,影响页面加载速度。
- 基于缓存提升构建速度。Vite 中缓存系统分为文件系统缓存和浏览器缓存。对于文件缓存系统来说,Vite 会将预构建的依赖依赖缓存到 `node_modules/.vite`,只有满足以下条件时才会重新运行预构建:

  - package.json 中的 dependencies 列表发生变化。
  - 包管理器的 lockfile 发生变化,例如 package-lock.json、yarn.lock、pnpm-lock.yaml。
  - 可能在 vite.config.js 相关字段中配置过的。

对于浏览器缓存来说,解析后的依赖请求会以 HTTP Header `max-age=31536000,immutable`设置强缓存,以提高在开发时的页面重载性能,一旦被缓存，这些请求将永远不会再到达开发服务器。

## 2.Webpack 与 Vite 打包流程对比
