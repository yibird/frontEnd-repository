## 微前端的定义

微前端是一种将前端应用程序分解成更小、更易于管理的部分的架构风格，它借鉴了微服务的概念到前端开发中。微前端相较于传统开发模式具有如下优点:

- **独立开发与部署**:每个微前端都是独立的应用程序,各个微前端可以由不同的团队独立开发、测试和部署,因此非常适合跨团队协作。
- **技术栈无关**:主框架不限制接入应用的技术栈，微应用具备完全自主权。每个微前端可以使用不同的技术栈,例如React、Vue、Angular等,这使得团队可以根据项目需求选择最合适的技术栈。
- **增量升级**:在面对各种复杂场景时,通常很难对一个已经存在的系统做全量的技术栈升级或重构，而微前端是一种非常好的实施渐进式重构的手段和策略。
- **独立运行时**:每个微应用之间状态隔离，运行时状态不共享。

微前端虽然有很多优点,但在实际落地过程中需要解决许多技术和管理上的挑战,例如CSS样式隔离、JS隔离、应用通讯、性能优化等等。

### CSS样式隔离

在微前端场景下,不同技术栈的子应用会被集成到同一个运行时中,因此可能会存在样式冲突的问题,微前端解决样式冲突的方案如下:

- **Shadow DOM**:Shadow DOM 是 Web Components 标准的一部分，它允许将封装的"影子"DOM树附加到常规DOM树中的元素上。这个影子树与主文档DOM分开渲染,具有样式和标记的封装特性。使用Shadow DOM可以将微应用的样式封装在一个独立的作用域中,从而避免样式冲突。但是Shadow DOM 存在一些限制,例如兼容性差、全局样式无法应用(全局CSS变量无法穿透 Shadow DOM)等问题。
- **CSS Module或BEM命名**:社区通常的实践是通过约定 css 前缀的方式来避免样式冲突,即各个子应用使用特定的前缀来命名 class，或者直接基于 css module 方案写样式,但是这种方案对旧系统做大量改造工作。
- **Dynamic Stylesheet**:Dynamic Stylesheet的思想是在应用切出/卸载后,同时卸载掉其样式表即可,原理是浏览器会对所有的样式表的插入、移除做整个 CSSOM 的重构，从而达到 插入、卸载 样式的目的。这样即能保证,在一个时间点里,只有一个应用的样式表是生效的。在频繁切换应用时会动态插入/移除样式表,可能存在性能问题。

### JS隔离

由于每个微应用都是独立的,各个子应用之间的全局变量可能存在冲突,常见的解决办法是运行时的 JS 沙箱,例如qiankun支持SnapshotSandbox、LegacySandbox、ProxySandbox。JS 沙箱常见几种实现方式:

- **拦截window的属性**:当子应用激活时记录当前全局环境（window）状态快照,当子应用「卸载」时,恢复快照(撤销修改)。这种方式虽然兼容性好,但性能(需要遍历整个 window)和隔离性都不如Proxy沙箱。例如qiankun的LegacySandbox:

```js
class LegacySandbox {
  private addedPropsMap = new Map<string, any>()
  private modifiedPropsOriginalValueMap = new Map<string, any>()
  private currentUpdatedPropsValueMap = new Map<string, any>()
  private name: string
  private sandboxRunning = false

  constructor(name: string) {
    this.name = name
  }

  // 激活沙箱
  active() {
    if (this.sandboxRunning) return
    this.sandboxRunning = true
    this.snapshot()
    this.recover()
  }

  // 失活沙箱
  inactive() {
    this.sandboxRunning = false
    this.recordChanges()
  }

  // 记录修改和新增的全局变量
  private recordChanges() {
    Object.keys(window).forEach(prop => {
      if (!window.hasOwnProperty(prop)) return
      const value = (window as any)[prop]

      // 新增属性
      if (!this.windowSnapshot.hasOwnProperty(prop)) {
        this.addedPropsMap.set(prop, value)
      }
      // 修改属性
      else if (value !== this.windowSnapshot[prop]) {
        this.modifiedPropsOriginalValueMap.set(prop, this.windowSnapshot[prop])
      }
    })
  }

  // 保存快照
  private windowSnapshot: Record<string, any> = {}

  private snapshot() {
    this.windowSnapshot = {}
    Object.keys(window).forEach(prop => {
      this.windowSnapshot[prop] = (window as any)[prop]
    })
  }

  // 恢复 window 的快照
  private recover() {
    // 删除新增的属性
    this.addedPropsMap.forEach((_, prop) => {
      delete (window as any)[prop]
    })
    // 恢复被修改的属性
    this.modifiedPropsOriginalValueMap.forEach((value, prop) => {
      (window as any)[prop] = value
    })
  }
}
```

- **`Proxy`和`with`**:通过Proxy代理一个"假的 window 对象"拦截所有对子应用全局变量的访问,每个子应用拥有一个独立的 fakeWindow,激活时恢复 active 状态保存的变量,卸载时记录修改过的全局属性，以便下次激活恢复。这种方式不仅隔离性好,支持多子应用并行,而且性能优越(只代理访问的属性),但是依赖 Proxy(IE11 不支持),兼容性较差。

```js
class ProxySandbox {
  constructor(name) {
    const fakeWindow = Object.create(null)
    const proxy = new Proxy(fakeWindow, {
      get(target, prop) {
        return prop in target ? target[prop] : window[prop]
      },
      set(target, prop, value) {
        target[prop] = value
        return true
      },
    })
    this.proxy = proxy
  }
}
```

### 应用通信

在微前端场景下,由于每个微应用都是独立的,因此需要解决微应用之间的通信问题,常见的解决办法有三种:

- props 通信:主应用可以通过props注入数据和方法,传递的props一般会被挂载window,子应用可以通过全局获取主应用传递的属性。
- EventBus(事件总线):EventBus是一种去中心化的通讯方式。
- window 通信:如果使用iframe实现微前端,由于子应用运行的iframe的src和主应用是同域的,所以相互可以直接通信。

```js
// 主应用调用子应用的全局数据
window.document.querySelector('iframe[name=子应用id]').contentWindow.xxx

// 子应用调用主应用的全局数据
window.parent.xxx
```

### 微前端的实现方式

#### iframe

iframe是 HTML 提供的一个标签,用来在一个网页中嵌入另一个独立网页,当浏览器解析到 `<iframe>` 标签时，会启动一个新的浏览上下文(browsing context),这个上下文有自己独立的window 对象、document 对象、DOM 树、JS 执行环境、CSS 样式空间。ifreme优缺点:

- 实现简单:几乎零接入成本,任何已有系统都能通过 iframe 集成。
- 隔离性好:DOM、CSS、JS 全部隔离，天然防止污染。
- 安全性高:每个 iframe 都是一个独立的环境,不会直接访问主应用的全局变量,也不会被主应用的代码直接访问。而且可以利用 iframe 的 sandbox 属性（例如 sandbox="allow-scripts allow-same-origin"）进一步控制子应用权限。
- 兼容性好:只要浏览器支持 iframe,就能使用 iframe 实现微前端。
- 路由状态丢失:刷新一下,iframe的url状态就丢失了。
- DOM割裂严重:弹窗只能在iframe内部展示,无法覆盖全局。
- 性能差:每次打开白屏时间太长,对于SPA 应用来说无法接受。

#### SPA

single-spa 是一个用于构建 微前端（Micro Frontends）架构 的 JavaScript 框架。其主要实现思路:

- 预先注册子应用(激活路由、子应用资源、生命周期函数)。
- 监听路由的变化，匹配到了激活的路由则加载子应用资源，顺序调用生命周期函数并最终渲染到容器。

qiankun微前端架构则进一步对single-spa方案进行完善，主要的完善点：

- 子应用资源由 js 列表修改进为一个url,大大减轻注册子应用的复杂度。
- 实现应用隔离,完成js隔离方案 (window工厂)和css隔离方案(类vue的scoped)。
- 增加资源预加载能力，预先子应用html、js、css资源缓存下来，加快子应用的打开速度。

虽然qiankun解决了路由管理(监听路由自动的加载、卸载当前路由对应的子应用,浏览器刷新、前进、后退，都可以作用到子应用)和资源隔离(完备的沙箱方案，js沙箱做了SnapshotSandbox、LegacySandbox、ProxySandbox三套渐进增强方案，css沙箱做了两套strictStyleIsolation、experimentalStyleIsolation两套适用不同场景的方案),虽仍存在着如下缺点:

- 无法激活多个子应用:由于single-spa基于路由匹配,无法同时激活多个子应用,也不支持子应用保活。
- 改造成本大:改造成本较大，从 webpack、代码、路由等等都要做一系列的适配。
- 隔离性一般:css 沙箱无法绝对的隔离,js 沙箱在某些场景下执行性能下降严重。

#### Web Components

Web Components 是浏览器原生支持的一套技术规范，它允许开发者创建 可复用、封装良好的自定义 HTML 元素。
它由以下三部分组成：

- Custom Elements（自定义元素):允许自定义 HTML 标签，比如 `<user-card></user-card>`，并指定其生命周期和行为。
- Shadow DOM（影子 DOM）:提供了样式和结构的封装机制，组件内部的样式不会影响外部页面，外部样式也不会“污染”组件,天然支持CSS隔离。
- HTML Templates（HTML 模板）:允许定义 `<template>`标签中的静态 DOM 结构，延迟渲染或动态复用。

Web Component优缺点:

- 浏览器原生支持,0依赖。
- CSS完全隔离:Shadow DOM 提供了样式和结构的封装机制,组件内部的样式不会影响外部页面,外部样式也不会“污染”组件,天然支持CSS隔离。
- 缺乏复杂路由、状态管理:Web Component 是一个独立的自定义元素,不具备路由管理和状态管理的能力,需要开发者自己实现。

#### Module Federation

Module Federation(模块联邦)是Webpack 5引入的一项革命性特性，允许多个JavaScript应用程序在运行时动态共享代码和资源，特别适用于微前端架构。模块联邦（Module Federation）是一种JavaScript应用分治的架构模式，允许不同的Web应用程序（或微前端应用）在运行时动态共享代码，无需在构建阶段进行物理共享。这意味着每个微应用可以独立开发、构建和部署，同时还能轻松地共享组件、库甚至是业务逻辑。

## Wujie

无界微前端是一款基于 Web Components + iframe 微前端框架，具备成本低、速度快、原生隔离、功能强等一系列优点。Wujie不仅解决了CSS和JS隔离的问题,还支持了多应用保活,接入成本低。Wujie实现原理如下:

- 应用加载机制和 js 沙箱机制:Wujie的核心思想是使用iframe作为JS沙箱,Wuhu会将子应用的js注入主应用同域的iframe中运行，iframe是一个原生的window沙箱，内部有完整的history和location接口，子应用实例instance运行在iframe中，路由也彻底和主应用解耦，可以直接在业务组件里面启动应用。由于Wujie采用ifreme,不仅具有天然支持JS隔离、无需注册路由、多应用保活(一个页面可以同时激活多个子应用)等优点外,而且切换应用切换没有清理成本(由于不污染主应用，子应用销毁也无需做任何清理工作)。
- 路由同步机制:在iframe内部进行history.pushState，浏览器会自动的在joint session history中添加iframe的session-history，浏览器的前进、后退在不做任何处理的情况就可以直接作用于子应用。劫持iframe的history.pushState和history.replaceState，就可以将子应用的url同步到主应用的query参数上，当刷新浏览器初始化iframe时，读回子应用的url并使用iframe的history.replaceState进行同步。得益于这种方式,即时浏览器刷新、前进、后退都可以作用到子应用,多应用同时激活时也能保持路由同步。
- iframe 连接机制和 css 沙箱机制:无界采用Webcomponent来实现页面的样式隔离,无界会创建一个wujie自定义元素,然后将子应用的完整结构渲染在内部。子应用的实例instance在iframe内运行，dom在主应用容器下的webcomponent内，通过代理 iframe的document到webcomponent，可以实现两者的互联。当子应用发生切换，iframe保留下来，子应用的容器可能销毁，但webcomponent依然可以选择保留，这样等应用切换回来将webcomponent再挂载回容器上，子应用可以获得类似vue的keep-alive的能力。得益于Webcomponent和iframe 连接机制,Wujie不仅支持CSS完全隔离,而且切换应用时支持应用保活,解决了天然适配弹窗问题(document.body的appendChild或者insertBefore会代理直接插入到webcomponent)。
- 通信机制:Wujie提供了props 注入机制、window.parent 通信机制、EventBus三种通信方式。
