### React17.0 生命周期函数?

- constructor:组件的构造函数,在初始化调用,只会调用一次。一般在此函数完成一些初始化工作,例如初始化 state、绑定事件 this 等等操作。
- static getDerivedStateFromProps:组件 render 之前调用,在初次挂载和后续更新都会调用。它是一个静态方法,它可以返回一个对象来更新 state,如果返回 null 则不更新任何内容。
- render:组件渲染元素时执行,一旦组件所依赖的数据发生变化就会执行此函数。
- componentDidMount:组件挂载到页面时执行,在 render 函数之后执行,只会执行一次,在此函数可以完成网络请求等操作。
- shouldComponentUpdate:组件更新数据前执行,它返回一个布尔值,用于控制组件是否重新渲染。
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

### 组件通讯方式有哪些?

- 通过 Props 父传子。
- 通过 Propst 提供回调函数方式子改父。
- 通过 Ref 获取组件实例。
- 通过 Context 实现多层级组件通讯。
- 基于发布订阅模式实现多层级组件通讯。
- 使用第三方状态管理库进行多层级组件通讯。
- 浏览器存储机制。例如 cookie、localStorage、SessionStorage、IndexDB。

### class 组件与函数式的区别?

- 类组件因为需要创建组件的实例,且不能销毁,性能开销大;函数式组件不会被实例化,整体渲染性能得到提升。
- 类组件可以访问 this 和生命周期函数;函数式组件无法访问 this 且没有生命周期函数,但函数式组件可以通过 hooks 访问生命周期函数。
- 类组件属于状态组件,组件内部可以维护组件的 state;而函数式组件属于无状态组件,数据来源于 props。

### React 合成事件是什么?

### React HOC 是什么?有什么作用?

### useState 是异步的还是同步的?

### useEffect 与 useLayoutEffect 的区别?
