## 1.通过 speed-measure-webpack-plugin 插件进行量化分析

首先通过 `speed-measure-webpack-plugin` 插件量化分析各个 plugin 和 loader 打包时所花费的时间,通过量化指标可以看出优化前与优化后的对比。

## 2.通过 exclude 或 include 排除或指定转译的目录

可以用过 exclude 或 include 配置来确保缩小转译的范围。通过 exclude 排除无需打包的目录(例如 `exclude:/\node_modules/`排除 node_modules 目录),exclude 的优先级高于 include(优先匹配 exclude)。include 用于包含指定目录下的模块进行打包,一般会将 include 配置为 src,建议使用 include,避免使用 exclude,指定 include 大分部情况比指定 exclude 构建效果要好。

## 3.使用 cache-loader 缓存编译结果

使用 `cache-loader`。对于一些性能开销比较大的 loader 之前添加 cache-loader,将结果缓存到磁盘中,能大幅度提升性能,默认缓存保存在 `node_modules/.cache/cache-loader` 目录下。

## 4.使用 happypack 插件进行多线程打包

使用 happypack 插件进行多线程打包。happypack 是一个通过多线程来提升 webpack 打包速度的工具

## 5.使用 thread-loader 进行多线程打包

使用 `thread-loader` 进行多线程打包。除了使用 happypack 提升打包速度,也可以使用 `thread-loader`,把 thread-loader 放置在其他 loader 之前,那么放置在这个 loader 之后的 loader 就会在一个单独的 worker 池中运行。

## 6.使用插件压缩 JS 和 CSS

使用 `terser-webpack-plugin` 和 `mini-css-extract-plugin` 分别对 JS 和 CSS 资源压缩。资源压缩包括 JS 与 CSS 文件压缩,`terser-webpack-plugin` 是一个用于压缩 JS 资源的插件。压缩 CSS 前首先使用 `mini-css-extract-plugin` 插件将 CSS 提取出来,然后使用 `optimize-css-assets-webpack-plugin` 进行压缩。

## 7.使用 noParse 标识模块不进行转化与解析。

如果一些第三方模块没有 AMD/CommonJS 规范版本,这对打包影响还是挺大的,可以使用 noParse 来标识这个模块,这个 webpack 会引入这些模块,但是不进行转化和解析,从而提升 webpack 的构建性能,例如 jquery、lodash。noParse 属性的值可是一个正则表达式或一个 function。

## 8.使用 IgnorePlugin 插件忽略第三方依赖。

`IgnorePlugin` 是 webpack 的内置插件,作用是忽略第三方依赖指定目录。例如: moment (2.24.0 版本) 会将所有本地化内容和核心功能一起打包,此时可以使用 `IgnorePlugin` 在打包时忽略本地化内容。

## 9.使用 externals 从 bundle 排除依赖项。

externals(外部扩展)配置选项提供了从输出的 bundle 中排除依赖的方法。防止将某些 import 的包(package)打包到 bundle 中,而是在运行时(runtime)再去从外部获取这些扩展依赖(external dependencies)。

## 10.拆分 bundle。

如果所有的 js 文件都打包成一个 JS 文件,这会导致最终生成的 js 文件体积很大,这个时候就要考虑拆分 bundle 了。`DllPlugin` 和 `DLLReferencePlugin` 可以实现拆分 bundles,并且可以大幅度提升构建速度,`DllPlugin` 和 `DLLReferencePlugin` 都是 webpack 的内置模块。

## 11.抽离公共代码。

optimization.SplitChunks(简称 SplitChunks)是 webpack4 为了改进 CommonsChunk-Plugin 而重新设计和实现的代码分片特性。webpack4 之前自带 CommonsChunk-Plugin 插件用于处理代码分片,webpack4 后使用 SplitChunks,SplitChunks 相比 CommonsChunk-Plugin 功能更加强大,操作更加简单。

## 12.使用 webpack-bundle-analyzer 插件监控 bundle 体积

可以使用`webpack-bundle-analyzer`插件监控 bundle 体积,然后根据分析结果进一步优化。

## 13.尽量使用 ESModule。

ES6 Module 依赖关系的构建是在代码编译时而非运行时,基于这一特性 webpack 提供了 tree shaking(摇树)功能,它可以在打包过程中检测工程中未使用过的模块,这部分代码将不会被执行,因此被称为"死代码"。webpack 会对这部分代码进行标记,并在资源压缩时将它们从最终的 bundle 中去掉。

## 14.使用 swc-loader 或 esbuild-loader 提升打炮速度。

JS 是一门动态采用单线程模型的脚本语言,性能成为了 JS 的瓶颈,为了追求更极致的性能前端工程化建设基本朝 rust 和 go 语言方向偏移,rust 和 go 能大幅度提升程序执行效率。swc 就是基于 rust 开发的一款对标 babel 的模块打包器,esbuild 是基于 go 语言实现的一款打包器,它们打包构建的速度非常快。
