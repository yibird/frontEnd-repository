### Webpack 介绍

**webpack 是一个用于现代 JS 应用程序的 静态模块打包工具**。当 webpack 处理应用程序时,它会在内部从一个或多个入口点构建一个 依赖图(dependency graph,模块之间的引用形成了一个图数据结构),然后将项目中所需的每一个模块组合成一个或多个 bundles,它们均为静态资源,用于展示你的内容。

#### 什么是 Webpack?

简单来说 webpack 是一个开源的 JS 模块打包工具,其最核心的功能是解决模块之间的依赖,把各个模块按照特定的规则和顺序组织在一起,最终合并为一个或多个 js 文件,而这个过程就叫做模块打包。而模块打包工具(module bundler)的任务就是解决模块之间的依赖,使其打包后的结果能运行在浏览器上。它的工作方式主要有两种:

- 将存在依赖关系的模块按照特定的规则合并为单个 JS 文件,一次全部加载到页面中。
- 在页面初始时加载一个入口模块,其他模块异步地进行加载。

#### Webpack 的优点

前端社区里出现非常多优秀的模块打包器,例如 Webpack、Parcel、Rollup、Vite,对比同一类型打包器 Webpack 具有如下优点:

- Webpack 默认支持多种模块标准,包括 AMD、CommonJS 以及最新的 ES6 module,而其他工具只能支持一两种。使用 Webpack 对于工程中采用多种模块标准非常有用,Webpack 可以处理不同类型模块之间的依赖关系。
- Webpack 具有完备的代码分割(Code splitting)解决方案。简单来说,Webpack 可以分割打包后的资源,首屏只加载必要的部分,暂时用不到的功能放到后面加载。这对于资源体积较大的应用来说尤为重要,可以有效地减少资源体积,提升首页渲染速度。
- Webpack 可以处理各种类型的资源。Webpack 内置只能处理 JS 和 JSON 文件,如果需要处理非 JS、JSON 资源(例如 css、image)则需要配置相对应的 Loader 即可完成资源的处理。例如 css-loader 用于处理 CSS 文件,image-loader 用于处理 Image 文件。
- Webpack 拥有强大的社区支持。开发者为 Webpack 编写了很多插件和 Loader,如果要完成某一项功能,可以去寻找对应的插件或 Loader,从而避免重复造轮子。

### 模块化的发展历史

了解 JS 模块化的发展历史是非常有必要的,它能帮助我们理解打包器的诞生原因。由于早期JavaScript并未提供模块化机制来管理代码,经常会出现变量名冲突导致变量被覆盖,而且项目中大多数会有多个`<script>`标签来加载JS脚本,你要确保`<script>`标签以正确的顺序排列,必须保证被依赖的变量先加载。如果排列错了,那么在运行过程中,应用将会抛出错误,并且停止继续运行,而模块化机制主要是解决抽离公共代码(代码复用)、隔离作用域、避免变量冲突等问题而诞生。由于模块之间可以相互依赖,模块之间的依赖关系就形成一张依赖图,打包器的核心功能就是解决模块之间的依赖,按照特定规则和顺序将模块代码组织在一起,最后合并为一个或多个bundle(产物)。JS 的模块发展历史可以分为 IIFE、AMD、CMD、CommonJS、UMD、ES Module几个阶段。

#### IIFE(立即执行函数)

IIFE 是 JS 最早的模块化方案,**IIFE执行会创建一个独立的作用域,该作用域中定义的变量外界无法访问,从而避免变量冲突**。

#### AMD

#### CMD

#### CommonJS

在 JavaScript 之父 Brendan Eich 最初设计这门语言时,原本并没有包含模块的概念。基于越来越多的工程需求,为了使用模块化进行开发,JavaScript 社区中涌现出了多种模块标准,其中也包括 CommonJS。一直到 2015 年 6 月,由 TC39 标准委员会正式发布了 ES6(ECMAScript 6.0),从此 JavaScript 语言才具备了模块这一特性。

最早的模块概念是由 CommonJS 是由 JavaScript 社区于 2009 年提出的包含模块、文件、IO、控制台在内的一系列标准。在 Node.js 的实现中采用了 CommonJS 标准的一部分,并在其基础上进行了一些调整。我们所说的 CommonJS 模块和 Node.js 中的实现并不完全一样,现在一般谈到 CommonJS 其实是 Node.js 中的版本,而非它的原始定义,Node 应用由模块组成,采用 CommonJS 模块规范。每个文件就是一个模块,有自己的作用域。在一个文件里面定义的变量、函数、类，都是私有的,对其他文件不可见。
虽然 CommonJS 提供了一系列模块化标准,但是 CommonJS 不支持浏览器、没有 live binding(实时绑定)、存在模块之间循环引用问题、同步执行的模块解析加载器速度很慢的缺点。虽然 CommonJS 是 Node.js 项目的绝佳解决方案,但浏览器不支持模块,因而产生了 Browserify、RequireJS、SystemJS 等打包工具,支持在浏览器中运行的 CommonJS 模块。

CommonJS 中规定每一个文件都是一个模块,每个模块拥有独立的作用域,模块内部所有的变量及函数只有自身才能访问,对外是不可见的。CommonJS 通过`module.exports`或`exports`(exports 指向了 module.exports)用于指定模块需要对外暴露哪些内容,
CommonJS 通过 require()用于导入指定模块。

#### ESM

ES Module 是 ES6 提供的模块化方案,ES6 Module 也是将每个 JS 文件作为一个模块,每个模块拥有独立的作用域。ES Module 通过 `export` 关键字导出模块,通过 `import` 关键字导入模块。ES6 Module 会自动采用严格模式(在 ES5 中是一个可选项)。在 JS 中需要通过`"use strict"`来开启严格模式,但在 ES6 Module 中不管开头是否有"use strict",都会采用严格模式。

#### CommonJS 与 ESM 的区别

### Webpack 的核心概念

#### entry(入口)

#### output(输出)

#### loader(装载器)

#### plugin(插件)
