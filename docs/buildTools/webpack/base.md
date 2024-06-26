## 1.Webpack 介绍

**webpack 是一个用于现代 JS 应用程序的 静态模块打包工具**。当 webpack 处理应用程序时,它会在内部从一个或多个入口点构建一个 依赖图(dependency graph,模块之间的引用形成了一个图数据结构),然后将项目中所需的每一个模块组合成一个或多个 bundles,它们均为静态资源,用于展示内容。

:::tip
bundle 是指将多个模块打包成一个文件的过程和结果。在 Webpack 中,通过入口文件（entry）来指定应用程序的入口,并从入口文件开始,递归地解析所有在代码中被引入的依赖模块,最终将所有的模块打包成一个或多个 bundle。每个 bundle 包含了一部分应用程序的代码,并且通常可以在网页上直接加载和执行。在 Webpack 的配置中,可以通过配置选项来指定生成的 bundles 的数量和内容。通过使用 bundle,Webpack 可以将多个小文件整合成一个大文件,从而减小网络请求次数,加快页面加载速度。
:::

### 1.1 为什么需要打包?

打包是将应用程序中的各种源代码文件、资源文件和依赖模块等进行整合、转换和压缩,生成用于部署和运行的最终文件的过程。前端需要打包的原因如下:

- 模块化开发。随着前端应用程序的不断复杂,单个 JavaScript 文件的代码量越来越大,难以维护。通过模块化开发,可以将一个应用程序拆分成多个模块,每个模块相互独立,只需关注自己的功能实现,并且模块之间可以相互引用和依赖,从而提高代码的可维护性和可复用性。
- 资源优化。在前端应用程序中,通常需要加载大量的 JavaScript 文件、CSS 文件、图片等资源文件。通过打包,可以将多个文件合并成一个或多个文件，减少服务器的请求次数,提高页面加载速度。此外,打包还可以对资源进行压缩、合并等操作,减小文件的大小,进一步优化页面的性能。
- 兼容性处理。不同浏览器对 JavaScript 和 CSS 的支持程度不同,有些甚至不支持某些新特性和语法。通过打包,可以使用 Babel 和 PostCSS 等工具对代码进行处理和转换,将 ES6/ES7、CSS3 等新特性转换为 ES5 和 CSS2 等兼容的代码,从而提高应用程序的兼容性。
- 依赖管理。前端应用程序通常需要使用第三方库和框架,例如 jQuery、React、Vue 等。通过打包,可以将应用程序中使用的所有第三方库和框架打包在一起,方便管理和维护。

综上所述,前端打包主要是为了提高代码的可维护性、可复用性和性能,以及便于管理和维护。

### 1.2 什么是 Webpack?

简单来说 Webpack 是一个开源的 JS 模块打包工具,其最核心的功能是解决模块之间的依赖,把各个模块按照特定的规则和顺序组织在一起,最终合并为一个或多个 js 文件,而这个过程就叫做模块打包。而模块打包工具(module bundler)的任务就是解决模块之间的依赖,使其打包后的结果能运行在浏览器上。它的工作方式主要有两种:

- 将存在依赖关系的模块按照特定的规则合并为单个 JS 文件,一次全部加载到页面中。
- 在页面初始时加载一个入口模块,其他模块异步地进行加载。

### 1.3 Webpack 的优点

前端社区里出现非常多优秀的模块打包器,例如 Webpack、Parcel、Rollup、Vite,对比同一类型打包器 Webpack 具有如下优点:

- Webpack 默认支持多种模块标准,包括 AMD、CommonJS 以及最新的 ES6 module,而其他工具只能支持一两种。使用 Webpack 对于工程中采用多种模块标准非常有用,Webpack 可以处理不同类型模块之间的依赖关系。
- Webpack 具有完备的代码分割(Code splitting)解决方案。简单来说,Webpack 可以分割打包后的资源,首屏只加载必要的部分,暂时用不到的功能放到后面加载。这对于资源体积较大的应用来说尤为重要,可以有效地减少资源体积,提升首页渲染速度。
- Webpack 可以处理各种类型的资源。Webpack 内置只能处理 JS 和 JSON 文件,如果需要处理非 JS、JSON 资源(例如 css、image)则需要配置相对应的 Loader 即可完成资源的处理。例如 css-loader 用于处理 CSS 文件,image-loader 用于处理 Image 文件。
- Webpack 拥有强大的社区支持。开发者为 Webpack 编写了很多插件和 Loader,如果要完成某一项功能,可以去寻找对应的插件或 Loader,从而避免重复造轮子。

## 2.模块化的发展历史

了解 JS 模块化的发展历史是非常有必要的,它能帮助我们理解打包器的诞生原因。由于早期 JavaScript 并未提供模块化机制来管理代码,经常会出现变量名冲突导致变量被覆盖,而且项目中大多数会有多个`<script>`标签来加载 JS 脚本,你要确保`<script>`标签以正确的顺序排列,必须保证被依赖的变量先加载。如果排列错了,那么在运行过程中,应用将会抛出错误,并且停止继续运行,而模块化机制主要是解决抽离公共代码(代码复用)、隔离作用域、避免变量冲突等问题而诞生。由于模块之间可以相互依赖,模块之间的依赖关系就形成一张依赖图,打包器的核心功能就是解决模块之间的依赖,按照特定规则和顺序将模块代码组织在一起,最后合并为一个或多个 bundle(产物)。JS 的模块发展历史可以分为 IIFE、AMD、CMD、CommonJS、UMD、ES Module 几个阶段。

### 2.1 IIFE(立即执行函数)

IIFE 是 JS 最早的模块化方案,**IIFE 执行会创建一个独立的作用域,该作用域中定义的变量外界无法访问,从而避免变量冲突**。

#### 2.2 AMD

AMD 是 Asynchronous Module Definition(异步模块定义)的缩写,它是 RequireJS 库推崇的模块定义规范。与其他模块规范的区别在于,AMD 规范强调的是异步加载模块,模块的加载不影响后面语句的执行,从而可以提高应用程序的性能。在使用 AMD 规范时,需要使用 define()函数来定义模块,并且需要通过 require()函数来加载模块。

#### 2.3 CMD

CMD 是 Common Module Definition(通用模块定义)的缩写,它是 SeaJS 库推崇的模块定义规范。与 AMD 不同的是,CMD 规范更加强调模块的延迟执行,只有当模块需要调用时才会加载执行。在使用 CMD 规范时,需要使用 define()函数来定义模块,但是定义的模块不会立即执行,而是在需要调用时再执行。

### 2.4 CommonJS

在 JavaScript 之父 Brendan Eich 最初设计这门语言时,原本并没有包含模块的概念。基于越来越多的工程需求,为了使用模块化进行开发,JavaScript 社区中涌现出了多种模块标准,其中也包括 CommonJS。一直到 2015 年 6 月,由 TC39 标准委员会正式发布了 ES6(ECMAScript 6.0),从此 JavaScript 语言才具备了模块这一特性。

最早的模块概念是由 CommonJS 是由 JavaScript 社区于 2009 年提出的包含模块、文件、IO、控制台在内的一系列标准。在 Node.js 的实现中采用了 CommonJS 标准的一部分,并在其基础上进行了一些调整。我们所说的 CommonJS 模块和 Node.js 中的实现并不完全一样,现在一般谈到 CommonJS 其实是 Node.js 中的版本,而非它的原始定义,Node 应用由模块组成,采用 CommonJS 模块规范。每个文件就是一个模块,有自己的作用域。在一个文件里面定义的变量、函数、类，都是私有的,对其他文件不可见。
虽然 CommonJS 提供了一系列模块化标准,但是 CommonJS 不支持浏览器、没有 live binding(实时绑定)、存在模块之间循环引用问题、同步执行的模块解析加载器速度很慢的缺点。虽然 CommonJS 是 Node.js 项目的绝佳解决方案,但浏览器不支持模块,因而产生了 Browserify、RequireJS、SystemJS 等打包工具,支持在浏览器中运行的 CommonJS 模块。

CommonJS 中规定每一个文件都是一个模块,每个模块拥有独立的作用域,模块内部所有的变量及函数只有自身才能访问,对外是不可见的。CommonJS 通过`module.exports`或`exports`(exports 指向了 module.exports)用于指定模块需要对外暴露哪些内容,
CommonJS 通过 require()用于导入指定模块。

### 2.5 ESM

ES Module 是 ES6 提供的模块化方案,ES6 Module 也是将每个 JS 文件作为一个模块,每个模块拥有独立的作用域。ES Module 通过 `export` 关键字导出模块,通过 `import` 关键字导入模块。ES6 Module 会自动采用严格模式(在 ES5 中是一个可选项)。在 JS 中需要通过`"use strict"`来开启严格模式,但在 ES6 Module 中不管开头是否有"use strict",都会采用严格模式。

### 2.6 CommonJS 与 ESM 的区别

CommonJS 和 ESModule 是 JavaScript 中两种不同的模块系统。其区别如下：

- **语法不同**。CommonJS 使用`require()`和`module.exports`来导入和导出模块,而 ESModule 使用`import`和`export`语句。
- **加载方式不同**。CommonJS 是同步加载模块,即当使用`require()`加载一个模块时,会立即执行该模块的代码,并返回该模块的`exports`对象。而 ESModule 是异步加载模块,即在使用 import 语句加载一个模块时,不会立即执行该模块的代码,而是在需要使用该模块时再执行。
- **静态解析不同**。由于 ESModule 采用静态解析,因此在编译时就可以确定导入的模块,而 CommonJS 则是动态解析,需要在运行时才能确定导入的模块。由于 ESModule 采用静态分析,因此可以在编译阶段确定哪些代码未被使用,从而实现 tree shaking(摇树)优化,去除未使用的代码。
- **变量绑定不同**。ESModule 中导入的变量是只读的,不能被修改,而 CommonJS 导入的变量是可以被修改的。
- **应用场景不同**。CommonJS 主要应用于服务器端的 Node.js 环境中,而 ESModule 主要应用于浏览器端的 Web 应用程序中。

需要注意的是，由于 CommonJS 和 ESModule 有不同的语法和特性,因此它们之间的模块无法直接互相引用,需要通过转换工具进行转换。例如,Babel 可以将 ESModule 转换成 CommonJS,而 Webpack 可以将 CommonJS 转换成 ESModule。

## 3 Webpack 的核心概念

### 3.1 entry(入口)

#### 3.2 output(输出)

#### 3.3 loader(装载器)

#### 3.4 plugin(插件)
