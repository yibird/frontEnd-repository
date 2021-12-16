### React 是什么?

React 是 FB 开源的前端 JavaScript 库,以 JSX 的形式构建用户界面,尤其是单页应用程序,React 具有如下特点:

- 考虑到 RealDOM 操作成本高昂,它使用 虚拟 DOM(VirtualDOM) 而不是 真实 DOM(RealDOM)。
- 支持服务端渲染。
- 遵循单向数据流或数据绑定。
- 使用可重用/可组合的 UI 组件来开发视图。

### React 函数式组件与 Class 组件的区别?

class 组件是指通过 ES6 class 并继承 React.Component 创建的类,class 组件又称为有状态组件(内部含有私有的 State),在 class 组件中可以访问 this、state、ref、组件的生命周期。

函数式组件是通过函数形式定义的组件,又被称为无状态组件(内部没有私有的 State),由于函数式组件不会被实例化,所以整体渲染性能得到提升,函数式组件不能访问 this 对象和组件生命周期函数(但可以通过 Hook 模拟生命周期函数),所以 this.state、this.ref 都无法访问。

### React 组件生命周期(基于 React17)

- constructor:组件的构造函数,在初始化调用,只会调用一次。一般在此函数完成一些初始化工作,例如初始化 state、绑定事件 this 等等操作。
- static getDerivedStateFromProps:组件 render 之前调用,在初次挂载和后续更新都会调用。它是一个静态方法,它可以返回一个对象来更新 state,如果返回 null 则不更新任何内容。
- render:组件渲染元素时执行,一旦组件所依赖的数据发生变化就会执行此函数。
- componentDidMount:组件挂载到页面时执行,在 render 函数之后执行,只会执行一次,在此函数可以完成网络请求等操作。
- shouldComponentUpdate:组件更新数据前执行,它返回一个布尔值,该函数是 React 的优化项,用于控制组件是否重新渲染。
- getSnapshotBeforeUpdate:此钩子函数在 render 函数之后 componentDidUpdate 之前执行,它的返回值可以将作为 componentDidUpdate 钩子函数的第三个参数。
- componentDidUpdate:组件更新数据时执行,此钩子函数在 getSnapshotBeforeUpdate 后调用,第三个的参数的值来源于 getSnapshotBeforeUpdate 钩子函数返回的值。
- componentWillUnmount:组件在销毁卸载时执行,可以在此函数可以清除定时器,释放资源等操作。
- static getDerivderStateFromError:此生命周期会在渲染阶段后代组件抛出错误后被调用,它将抛出的错误作为参数,并返回一个值以更新 state。
- componentDidCatch:此生命周期在后代组件抛出错误后被调用。

组件的生命周期分为挂载、更新、卸载、错误处理 4 个过程,对应的生命周期:

- 挂载相关钩子函数:constructor、static getDerivedStateFromProps、render、componentDidMount。
- 更新相关钩子函数:static getDerivedStateFromProps、shouldComponentUpdate、render、getSnapshotBeforeUpdate、componentDidUpdate。
- 卸载相关钩子函数:componentWillUnmount。
- 错误处理相关钩子函数:static getDerivderStateFromError、componentDidCatch。

### 在 React class 组件中添加事件后为什么要绑定 this?

React 的事件处理大致可分为 bind()绑定和箭头函数两种,之所以在类组件中使用 bind()绑定当前组件 this 是因为函数 this 指向问题,在 JavaScript 中函数的 this 取决于函数的调用环境,而不是函数的声明环境,如果事件处理函数不绑定到当前组件 this,那么 this 最终指向的是 undefined,而不是组件本身。

### React 组件通讯

- 通过 props 父传子。
- 通过 props+回调函数子传父。
- 通过 ref 获取元素实例。
- 通过 Context 实现跨层级组件通讯。
- 第三方状态管理库。例如 Redux、Mobx、Recoil、Unstated 等等。
- 使用发布订阅模式实现跨组件通讯。
- Web Storage 实现跨组件通讯。

### 什么是高阶组件?

高阶组件(HOC)是一个函数,它接收一个组件作为参数或返回一个新的组件(跟高阶函数是类似的)。基本上,HOC 是一种源自 React 组合性质的模式。HOC 又被称为纯组件,因为它可以接受任何动态提供的子组件,但不会修改或复制其输入组件的任何行为。HOC 的应用场景:

- 代码重用、逻辑和引导程序抽象。
- 渲染劫持。
- 状态抽象和操作。
- props 操纵。

### 为什么 Fragment 比 Div 容器更好?

- Fragment 不会创建额外的 DOM 节点,Fragment 会更快一些并且使用更少的内存,这只对非常大和深的树有真正的好处。
- 一些 CSS 机制如 Flexbox 和 CSS Grid 具有特殊的父子关系,并且在中间添加 div 很难保持所需的布局。
- DOM Inspector(检查工具) 不那么杂乱。

### React 中合成事件是什么?有什么优点?

### this.setState()是同步的还是异步的?

setState 更新可分为如下两种情况:

- 在组件生命周期函数或 React 合成事件中,setState()是异步更新的。
- 在 setTimeout 或原生 DOM 事件中,setState 是同步更新的。

setState()之所以被设计为异步的原因:如果每次调用 setState()进行更新,那么意味着 render 函数会被频繁的调用界面渲染,这样会导致效率很低效。最好的办法就是获取到多个 setState()更新,之后进行批量更新,减少组件频繁 render。所以 setState()被设计为异步是出于对性能的考量,异步下的 setState()能减少组件 render 次数,提高渲染性能。

获取 setState()异步更新 state 后的结果值:

- 通过 setState()的回调函数获取。setState 接收两个参数,第二个参数是一个回调函数,该回调函数在 state 更新后被执行。
- 通过 componentDidUpdate 生命钩子函数,该钩子函数执行时机是在 State 更新后。

### 使用 Hooks 的注意事项

### this.setState()与 useState()的区别?

- useState 生成的 State 相比较类组件的 State 粒度更细。
- useState 生成的 State 保存是快照(底层由闭包实现,当组件重新渲染时快照也会被重置),而类组件的 State 保存是最新值(因为类组件会被实例化且不能被销毁,所以 State 是一个引用)。useState 可以结合 useRef 获取 State 最新值。
- 在引用类型下,Class State 无需传入新的引用,而 useState 必须保证是一个新的引用。

### useRef()与 createRef()的区别?

useRef()是 React16.8 提供用于操作 ref 的 Hook,useRef 具有如下特点:

- useRef 是一个只能用于函数式组件的方法。
- useRef 是除字符串 ref、函数 ref、createRef 以外的第四种获取 Ref 的方法。
- useRef 在函数渲染周期内永远不会变,因此可以引用某些数据。
- 修改 Ref.current 不会引发组件重新渲染。

useRef()与 createRef()区别如下:

- useRef 和 createRef 都能获取 Ref。
- useRef 只能用于函数式组件,而 createRef 既能用于函数式组件,又可以用在类组件。
- useRef 在每次渲染后都保持不变,而 createRef 在每次渲染后都会发生变化。

### useEffect()与 useLayoutEffect()的区别?

- useEffect 不会 block 浏览器渲染,而 useLayoutEffect 会阻塞浏览器渲染。
- useEffect 会在浏览器渲染结束后执行,useLayoutEffect 则是在 DOM 更新完成后,浏览器绘制之前执行,

### useEffect(fn,[])与 componentDidMount()的区别?

### React Fiber 是什么?它解决了什么问题?

### React 的优化
