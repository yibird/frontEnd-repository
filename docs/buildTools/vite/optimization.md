## 1.减少 Vite 冷启动时间策略

Vite 是一种现代化的构建工具,它采用了一种名为"快速冷启动(Fast Refresh)"的机制,使得在开发环境中进行代码编辑后,浏览器中的页面能够更快地响应变化。当第一次启动 Vite 时,它会进行一次“冷启动”(Cold Start)。在这个过程中,Vite 需要读取所有的配置文件,从而确定需要构建的项目的结构,并且 Vite 会编译所有的代码并生成构建文件。当 Vite 已经启动并且已经进行过一次冷启动后,后续的启动过程将被认为是“热启动”(Hot Start)。在热启动过程中,Vite 会使用之前生成的缓存文件,以便更快地启动应用程序。减少冷启动的策略如下:

- 使用本地缓存。Vite 会缓存已经构建过的代码,因此,在下一次启动应用程序时,Vite 可以使用已经缓存的文件而不需要重新构建所有代码。如果你频繁地启动和关闭应用程序,使用本地缓存可以显著缩短启动时间。
- 使用预编译。Vite 提供了预编译选项,可以在构建项目时预先编译某些模块,从而在应用程序启动时节省时间。预编译需要额外的时间来构建项目,但它可以显著缩短冷启动时间。
- 避免使用过多的插件。Vite 的插件可以添加额外的功能,但是过多的插件可能会增加构建时间。因此,在使用插件时应该仔细考虑是否真正需要该插件,以及它是否值得增加冷启动时间。
- 优化代码结构。Vite 可以通过自动优化代码结构来提高构建性能,但是如果代码本身存在结构问题,则无法发挥这种优化的作用。因此,优化代码结构可以帮助减少冷启动时间。
- 启用缓存。在生产环境下,启用缓存可以显著减少应用程序的加载时间,因为浏览器可以缓存已经下载过的资源。因此,启用缓存可以帮助减少应用程序的冷启动时间。

## 2.查看模块依赖分析

分析依赖模块的大小占比,可以有针对性对某些模块进行体积优化。rollup-plugin-visualizer 是一个模块依赖分析插件,通过该插件可以对模块依赖进行构建分析。

```shell
# 安装
pnpm i rollup-plugin-visualizer -D
```

## 3.分包策略

分包(Code Splitting)是一种优化技术,它允许将代码拆分成多个小包,而不是将所有代码打包成一个单一的文件,分包具有如下优点:

- 提高加载速度:通过将应用程序分成多个较小的文件,浏览器可以并行加载这些文件,从而减少总的加载时间。
- 按需加载:只在需要时加载特定的代码片段,可以减少初始加载时间,。
- 优化缓存:不同的包可以独立于其他包进行缓存。如果一个包没有改变,浏览器可以从缓存中加载该包,而不是重新下载该文件。

大多数构建工具支持 import()自动分包,build 后会将其打包成一个独立的 chunk,通常适用于加载组件等场景。一个应用一般由第三方库(例如 lodash、vue、react 等等)和业务代码组成,业务代码会根据业务逻辑不断变化,每次打包结果可能不同,而第三方库通常变动很小,且相对稳定,因此,可以将第三库进行分包处理,通过分包处理后的稳定模块打包后结果总是相同。在 Vite 中开发环境使用 esbuild,生成环境打包使用 rollup,rollup 中提供了 manualChunks 属性用于配置分包,它支持对象和函数两种形式:

- 对象形式:对象形式的 manualChunks 通过 key-value 的方式指定模块和对应的代码包,其中 key 表示打包后 chunk(块)的名称,默认情况下打包后的文件名格式为:`chunk名称-文件内容的哈希值`,例如下面配置打包后的文件类似于 chunk-asd123123、chunk-asd1981qwe。

```ts
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        // 分包配置
        manualChunks() {
          chunk: ['lodash', 'vue'];
        },
      },
    },
  },
});
```

- 函数形式:除了对象方式外,manualChunks 也支持函数形式来定义手动分包规则。这种方式可以根据特定的条件动态地将模块分组到不同的代码包(chunks)中,以优化打包后的输出。例如对 node_modules 下的模块进行分包,打包后的 chunk 名称为 vendor(通常指的是第三方库或依赖)。

```ts
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        // 分包配置
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
  },
});
```

## 4.Treeshaking(摇树机制)

treeshaking 也被称为 "摇树优化"。简单来说,在保证代码运行结果不变的前提下,去除无用的代码,从而减少打包后产物的体积大小。在 Vue3 中,许多 ApI 的引入都支持 treeshaking 优化,未使用的 API 均会被忽略打包至产物中。
Vue3 会默认使用 Rollup 进行 treeshaking,不需要额外进行配置。但是使用 treeshaking 机制时,必须要保证使用 ESModule 模块化方式组织代码,因为 ESModule 使用静态分析,可以检测无使用的死代码。

## 5.开启 gzip 压缩

gzip 是一种使用非常普遍的压缩格式。使用 gzip 压缩可以大幅减小代码体积,提升网络性能(对于文本内容压缩效率更好)。

```shell
# 安装 vite gzip插件
pnpm i vite-plugin-compression -D
```

## 6.开启 CDN 加速

内容分发网络(Content Delivery Network,简称 CDN)就是让用户从最近的服务器请求资源,提升网络请求的响应速度。可以将一些第三依赖(lodash、vue、react 等等)以 CDN 的方式加载,从而提高网络请求的响应速度。

```shell
# 安装Vite CDN加速插件
npm i vite-plugin-cdn-import -D
```

## 7.图片压缩

当项目存在大量图片或大图片时,除了使用体积更小的图片格式外(例如 webp),此时还可以使用图片压缩。

```shell
# 安装图片压缩插件
pnpm i vite-plugin-imagemin -D
```
