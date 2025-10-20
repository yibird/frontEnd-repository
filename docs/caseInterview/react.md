## 1.React17.0 生命周期函数?

- **constructor**:组件的构造函数,在初始化调用,只会调用一次。一般在此函数完成一些初始化工作,例如初始化 state、绑定事件 this 等等操作。
- **static getDerivedStateFromProps**:组件 render 之前调用,在初次挂载和后续更新都会调用。它是一个静态方法,它可以返回一个对象来更新 state,如果返回 null 则不更新任何内容。
- **render**:组件渲染元素时执行,一旦组件所依赖的数据发生变化就会执行此函数。
- **componentDidMount**:组件挂载到页面时执行,在 render 函数之后执行,只会执行一次,在此函数可以完成网络请求等操作。
- **shouldComponentUpdate**:组件更新数据前执行,它返回一个布尔值,用于控制组件是否重新渲染。
- **getSnapshotBeforeUpdate**:此钩子函数在 render 函数之后 componentDidUpdate 之前执行,它的返回值可以将作为 componentDidUpdate 钩子函数的第三个参数。
- **componentDidUpdate**:组件更新数据时执行,此钩子函数在 getSnapshotBeforeUpdate 后调用,第三个的参数的值来源于 getSnapshotBeforeUpdate 钩子函数返回的值。
- **componentWillUnmount**:组件在销毁卸载时执行,可以在此函数可以清除定时器,释放资源等操作。
- **static getDerivderStateFromError**:此生命周期会在渲染阶段后代组件抛出错误后被调用,它将抛出的错误作为参数,并返回一个值以更新 state。
- **componentDidCatch**:此生命周期在后代组件抛出错误后被调用。

组件的生命周期分为挂载、更新、卸载、错误处理 4 个过程,对应的生命周期:

- 挂载相关钩子函数:constructor、static getDerivedStateFromProps、render、componentDidMount。
- 更新相关钩子函数:static getDerivedStateFromProps、shouldComponentUpdate、render、getSnapshotBeforeUpdate、componentDidUpdate。
- 卸载相关钩子函数:componentWillUnmount。
- 错误处理相关钩子函数:static getDerivderStateFromError、componentDidCatch。

## 2.组件通信方式有哪些?

- 通过 Props 父传子或通过 Props 提供回调函数方式子改父。
- 通过 Ref 获取组件实例。
- 通过 Context 实现多层级组件通讯。
- 基于发布订阅模式实现多层级组件通讯。
- 使用第三方状态管理库进行多层级组件通讯。例如 jotai、zustand、redux。
- 浏览器存储机制。例如 cookie、localStorage、SessionStorage、IndexedDB。

## 3.什么是受控组件和非受控组件?

受控组件和非受控组件是 React 中用来控制表单元素的两种方式:

- 受控组件:表单元素的值由 React 组件的 state 或 props 控制,每当表单元素的值发生变化时,React 会自动更新 state 或 props,从而更新 UI。受控组件要求显式控制表单元素的值,可以通过定义 onChange 事件来实现对表单元素值的控制。
- 非受控组件:表单元素的值由 DOM 自身维护,React 只是在需要时读取表单元素的值。非受控组件在初始化时不需要指定初始值,而且 React 不会修改它们的值,通常使用 ref 来访问表单元素的值。

## 4.class 组件与函数式的区别?

- 类组件因为需要创建组件的实例,且不能销毁,性能开销大;函数式组件不会被实例化,整体渲染性能得到提升。
- 类组件可以访问 this 和生命周期函数;函数式组件无法访问 this 且没有生命周期函数,但函数式组件可以通过 hooks 访问生命周期函数。
- 类组件属于状态组件,组件内部可以维护组件的 state;而函数式组件属于无状态组件,数据来源于 props。

## 5.什么是 JSX?

JSX(JavaScript XML)是一种 JavaScript 的语法扩展,它允许在 JavaScript 代码中嵌入类似 XML 或 HTML 的语法。由于 JSX 具有较强的可读性和表达力,因此 React 选择 JSX 作为描述 React 元素的结构。在 React 中所有 JSX 代码最终会被 Babel 编译为 React.createElement(),而 React.createElement()以 JavaScript 对象形式对虚拟 DOM 节点的描述。JSX 渲染成虚拟 DOM 流程如下:

- 使用 React.createElement 或 JSX 编写 React 组件,React 借助 Babel 所有将 JSX 代码转换成 React.createElement()。
- createElement()对 key 和 ref 等特殊的 props 进行处理,并获取 defaultProps 对默认 props 进行赋值,并且对传入的子节点进行处理,最终构造成一个 ReactElement 对象(所谓的虚拟 DOM)。
- ReactDOM.render 将生成好的虚拟 DOM 渲染到指定容器上,其中采用了批处理、事务等机制并且对特定浏览器进行了性能优化,最终将虚拟 DOM 转换为真实 DOM。

## 6.React Render Props 是什么?

React Render Props 是 React 组件的一种模式,旨在让组件之间共享行为逻辑。这种模式通过将一个或多个函数作为 React 组件的 props 传递,从而让组件能够共享一部分渲染逻辑。这些函数通常会返回 JSX 元素,可以进行自定义渲染,使得组件能够更加灵活地适应不同的需求。使用 Render Props 模式可以使得组件复用性更高,同时也可以提高代码的可读性和可维护性。

```tsx
import React, { useState } from 'react'
interface Props {
  render: (count: number, increment: () => void) => React.ReactNode
}
const RenderPropsExample: React.FC<Props> = ({ render }) => {
  const [count, setCount] = useState(0)
  const increment = () => setCount(count + 1)
  return <div>{render(count, increment)}</div>
}
const Parent = () => {
  return (
    <div>
      <RenderPropsExample
        render={(count, increment) => {
          return (
            <div>
              <p>Count: {count}</p>
              <button onClick={increment}>Click Me</button>
            </div>
          )
        }}
      />
    </div>
  )
}
```

RenderPropsExample 组件通过 props 接收一个名为 render 的函数,render 可以在组件外部定义组件的渲染逻辑,灵活性更好,而且其他组件可以重用该渲染逻辑。render 函数包括 count 和 increment 两个参数,并返回一个 ReactNode 节点作为渲染内容。Parent 渲染 RenderPropsExample 组件时需要传入 render Props,在该渲染函数中可以自定义任意逻辑。

## 7.React 合成事件是什么?

React 合成事件是 React 框架中的一个事件系统,它是在原生 DOM 事件的基础上封装而来的。它提供了一种跨浏览器的、与原生 DOM 事件一致的、高性能的事件处理方式,虽然合成事件实现了跨浏览器兼容和性能提升,但也增加了 React 包体积,在 Preact(一个精简版的 React 库,提供与 React 相同的特性)中,为了体积考虑并未添加合成事件的支持。在 React 中,合成事件通过事件委托机制在顶层的 document 对象上统一绑定监听函数,然后通过事件冒泡的方式传递到组件中进行处理。相比原生 DOM 事件,合成事件具有以下特点:

- **跨浏览器兼容**。React 会自动处理不同浏览器之间的差异,保证事件在不同浏览器下的行为一致。
- **性能优化**。React 会对事件进行池化,避免频繁创建和销毁事件对象,从而提高性能。
- **事件委托**。所有的事件都被绑定到顶层的 document 对象上,而不是每个组件都绑定一次,从而减少了内存占用。
- **API 一致**。合成事件提供具有与原生 DOM 事件相同的属性和方法。

在 React 事件处理中,事件并非原生 DOM 事件对象,而是 React 合成事件对象,通过合成事件对象的 nativeEvent 属性可以获取原生事件对象。

## 8.React 错误边界组件

React 错误边界组件是一种容错机制,用于在 React 组件树中捕获并处理 JavaScript 错误,从而避免这些错误导致整个应用程序崩溃。通常情况下,React 组件中的错误会向上冒泡直至顶层组件,导致整个应用程序崩溃。错误边界组件可以在组件树中的特定点捕获错误,防止错误冒泡到更高的组件并导致整个应用程序崩溃。当 React 组件内部出现错误时,错误边界组件会渲染备用 UI,以便用户可以继续使用应用程序而不会影响其他组件。

实现一个 React 错误边界组件,需要创建一个新的类组件,并在其中添加 componentDidCatch 方法。 componentDidCatch 方法会在组件内部出现错误时被调用,并允许对这些错误进行处理。

::: details ErrorBoundary 组件实现

```tsx
import React, { PropsWithChildren, ErrorInfo } from 'react'

interface Props {
  fallback?: React.ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

export default class ErrorBoundary extends React.Component<PropsWithChildren<Props>, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  // 当组件内部出现错误时调用此钩子函数
  componentDidCatch(error: Error, info: ErrorInfo) {
    // You can also log the error to an error reporting service
    console.log(error, info)
  }

  render() {
    const { fallback, children } = this.props
    const { hasError } = this.state
    if (hasError) {
      return fallback || <h1>Something went wrong.</h1>
    }
    return children
  }
}
```

:::

::: details 使用 ErrorBoundary 组件

```tsx
import React from 'react'
import ErrorBoundary from './ErrorBoundary'

function MyComponent(props) {
  // This will throw an error
  return <h1>{props.text}</h1>
}

function App() {
  return (
    <div>
      <ErrorBoundary>
        <MyComponent text="Hello, world!" />
      </ErrorBoundary>
    </div>
  )
}
export default App
```

:::
上述例子中,MyComponent 组件会抛出一个错误,但是由于它被包装在 ErrorBoundary 组件中,错误不会冒泡到更高的组件并导致整个应用程序崩溃。相反,ErrorBoundary 组件会渲染一个备用 UI,以便用户可以继续使用应用程序。

## 10.React key 的作用?

在 React 中,循环渲染列表时为每个子元素添加一个唯一的 key 属性是非常重要的,因为它有助于 React 识别和管理列表中各个元素的更新。其原因如下:

- 帮助 React 识别元素:key 属性提供了一个唯一标识符,帮助 React 在新旧虚拟 DOM 树之间正确地匹配元素。在 React 中,当组件的 props 或 state 发生变化时,render 方法就会返回一棵 React 组件树,React 会比较数据变更前后所返回的组件树之间的差异(比较新旧虚拟节点树),以决定是否更新 UI。当列表中的元素发生变化时,React 使用 key 来确定哪些元素需要被添加、删除或更新,如果没有 key,React 可能会误认为两个不同的元素是相同的,从而导致不正确的渲染结果,例如元素重排(即新元素会被错误地插入、删除或移动,而不是正确地更新)、元素顺序(无法确保元素在重新渲染时保持稳定的顺序,导致渲染顺序错乱)。
- 提升性能:使用正确的 key 可以提高 React 的渲染性能。React 可以使用 key 来更有效地更新列表,而不是重新渲染整个列表。在比较新旧虚拟 DOM 树时,React 会使用 key 来确定新旧列表中的每个元素之间的对应关系,以确定哪些节点被删除、插入、修改了,然后更新对应节点,而不会更新整个列表节点。如果 key 相同但内容发生了变化,React 会重用该节点,仅更新该节点的内容,以避免不必销毁和重新创建节点。

- 保持节点顺序的稳定性:key 在某些情况下可以帮助保持元素的顺序稳定。如果新旧虚拟 DOM 树中的元素具有相同的 key,React 将认为它们是同一个元素,从而尝试保持这些元素在渲染结果中的相对顺序不变。这意味着在相同 key 的元素之间可以发生内容更新,但它们的位置不会随意交换。如果没有 key,React 不会确保元素在重新渲染时保持稳定的顺序,这可能会导致列表中的元素在不同的渲染周期中出现不同的顺序。

React 使用 key 的建议:

- 确保 key 是唯一的稳定标识符。使用 key 属性时需要确保每个 key 值都应该是唯一的,以确保 React 能够正确地识别和跟踪每个元素。
- 避免使用数组的索引作为 key。尽量避免使用数组索引作为 key,因为数组下标通常不是稳定的标识符。在某些情况下,数组的重新排序可能会导致 key 的更改,从而引发不必要的重新渲染。

## 11.什么是 React Refs?

在 React 中,ref(引用)是一个用于访问 React 元素或组件实例的对象,Refs 提供了一种在 React 中直接访问底层 DOM 元素或 React 组件实例的方式。Refs 主要应用场景如下:

- 获取 DOM 元素。
- 在类组件中访问组件实例。

在 React 支持 React.createRef()、回调 Refs(ref 作为一个回调函数,该回调函数接收 DOM 节点的引用作为参数)、useRef()三种方式创建 Ref,由于 useRef()是 React 内置的 Hooks,因此只能在函数式组件或自定义 Hooks 中使用。

## 12.React 逻辑复用方式有哪些？

- Mixin(混入):Mixin 是一种通过将某些功能混合到多个组件中来实现逻辑复用的方法。在 React 中,Mixin 通常通过将可重用的方法添加到组件的原型链上来实现,由于 Mixin 容易导致命名冲突和依赖关系不清晰、难以维护等缺点,在 React16 后官方不推荐使用 Mixin。
- React HOC(高阶组件):HOC 是一个接受一个组件并返回一个新组件的函数。它用于包装或增强组件的功能,以实现逻辑复用。HOC 可以用于将一些通用的逻辑(例如数据加载、身份验证)应用到多个组件中。
- Render Props(渲染 Props):Render Props 是一种通过将一个函数作为子组件的子元素传递给组件来实现逻辑复用的方法。父组件可以通过调用该函数来共享一些逻辑或数据。
- Hooks:Hooks 是 React 16.8 及更高版本引入的一种逻辑复用方式,简单来说,Hooks 是一个包含函数式组件复用逻辑相关的工具函数。

## 13.React HOC 是什么?有什么作用?

高阶函数是接收一个函数做为参数或者是返回一个函数的函数,高阶组件与高阶函数类似,简单来说高阶组件是一种用于复用组件逻辑的技术,它接收一个组件作为参数,并返回一个新的组件。

## React 的执行流程?

### React15 架构

在 React15 架构中主要分为 Reconciler、Renderer 两层:

- Reconciler(协调器):负责找出变化的组件。在 React 中 this.setState、this.forceUpdate、ReactDOM.render 等 API 触发更新。当更新发生时,Reconciler 将执行如下流程:
  - 调用函数组件、或 class 组件的 render 方法,将返回的 JSX 使用 babel 转化为虚拟 DOM。
  - 将虚拟 DOM 和上次更新时的虚拟 DOM 对比。
  - 通过对比找出本次更新中变化的虚拟 DOM。
  - 通知 Renderer 将变化的虚拟 DOM 渲染到页面上。
- Renderer(渲染器):负责将变化的组件渲染到页面上。

### React16 新架构

## ReactDOM.render()执行流程?

## 什么是 Fiber 架构,它解决了什么问题?

在 React 的旧版本中,当组件状态发生变化时,React 会将整个组件树进行递归遍历,生成新的虚拟 DOM 树,并与旧的虚拟 DOM 树进行比较,找出需要更新的部分,然后将这些部分更新到 UI 中。这种遍历方式虽然简单,但是在组件树变得非常大、复杂的情况下,会产生如下问题:

- 渲染阻塞:如果某个组件的更新需要花费大量的计算时间,整个更新过程会阻塞 UI 渲染,导致页面卡顿或响应缓慢。
- 优先级控制困难:递归调度难以在运行时中断或暂停,导致难以实现对任务优先级的灵活控制。比如,高优先级的用户交互事件（如点击、输入）可能被低优先级的渲染任务阻塞。
- 无法中断和恢复:由于递归调度的特性,一旦开始了更新过程,很难在中途中断或恢复,这对于实现异步渲染和增量更新是一个挑战。

为了解决组件树递归渲染且不可中断等问题,React 团队在 React 16 引入了 Fiber 架构,旨在于解决:

- 可中断性和增量渲染: Fiber 架构将递归调度改为循环调度,将任务分割成多个较小的单元（Fiber 节点）,并且支持任务的中断、暂停和恢复。这使得 React 能够更好地响应用户交互和优化渲染过程,实现增量渲染。
- 优先级调度: Fiber 架构引入了任务优先级的概念,可以根据任务的优先级调度执行顺序,从而优化用户体验。高优先级的任务可以中断低优先级的任务,确保用户交互的响应速度和流畅性。
- 时间切片(Time Slicing): Fiber 架构中引入了时间切片的概念,将工作分割成小的时间片段,在每个时间片段中执行一部分任务,然后根据剩余时间决定是否继续执行下一个时间片段。这样可以确保长时间运行的任务不会阻塞整个渲染过程,提高了页面的响应速度和流畅性。
- 并发模式支持: Fiber 架构为未来的并发模式（如 Concurrent Mode）打下了基础,允许多个更新任务以并发方式执行,从而进一步提升性能和用户体验。

Fiber 架构是 React 16 中引入的新的协调算法和架构设计,通过可中断的、增量的、优先级的任务调度方式,解决了 React 在处理复杂组件结构、大量数据和高频更新时可能遇到的性能问题和用户体验问题。它的核心思想是将任务分割成小的可中断单元,支持优先级调度和时间切片,使得 React 应用能够更好地响应用户操作,提高页面渲染的效率和流畅度。

在 React 16 中,FiberNode 是一个复杂的数据结构,用于描述组件和其相关状态:

```js
const NoEffect = /* 0b00000000000000000000 */ 0
const NoPriority = /* 0b00000000000000000000 */ 0
const NoLane = /* 0b00000000000000000000 */ 0

// FiberNode 的定义
class FiberNode {
  constructor(tag, pendingProps, key) {
    /**
     * 标记节点类型,如 HostComponent(原生 DOM 节点)、ClassComponent(类组件)、
     * FunctionComponent(函数式组件)、HostRoot(根节点)等
     */
    this.tag = tag
    /**
     * 表示当前 FiberNode 所代表的元素类型或组件类型。例如,对于原生 DOM 元素,
     * type 是字符串（如 "div"）；对于函数或类组件,type 是函数或类的引用。
     */
    this.type = type
    // 当前 props,记录当前渲染的属性
    this.pendingProps = pendingProps
    // 存储上一次渲染时的属性值,用于比较 props 是否发生变化
    this.memoizedProps = null
    // 当前状态,记录当前组件的 state
    this.stateNode = null
    // 用于列表渲染的唯一标识符
    this.key = key

    /**
     * child、sibling、return分别指向该 FiberNode 的第一个子节点、下一个兄弟节点和父节点。
     * 通过这些指针,React 可以在组件树中进行深度优先的遍历和更新
     */
    this.child = null
    this.sibling = null
    this.return = null

    // 标记该 FiberNode 需要执行的操作类型,如插入、更新、删除等
    this.effectTag = NoEffect
    // 指向上一次渲染的 FiberNode,支持双缓存机制,用于比对新旧 FiberNode 的差异。
    this.alternate = null
    // 存储更新队列
    this.updateQueue = null
    // 存储在 render 阶段产生的状态,用于保存上一次渲染的状态
    this.memoizedState = null

    // 用于调度渲染的优先级,决定更新的优先级
    this.priority = null
    // 用于调度的时间戳
    this.lane = NoLane

    // 指向当前正在工作的 Hook,在 Hooks 链表中使用
    this.currentHook = null
  }

  // 其它必要的属性...
  // 可以添加更多属性来满足实际需求,如 context、refs 等
}
```

## Fiber 与 React.createElement 的关系?

## 14.什么是 React Hooks?

React Hooks 是 React16.8 推出的新特性,是一种只能用于在函数组件或其他 Hooks 中复用逻辑的工具函数,它可以替代类组件中的生命周期和状态管理等功能。使用 React Hooks 需注意如下事项:

- Hooks 只能在函数式或 自定义 Hooks 中使用。
- Hooks 只能在 React 函数组件的顶层调用,不能在条件语句、循环语句或嵌套函数中使用。

React 内置了如下 Hooks:

- useState():用于在函数式组件中添加状态。
- useRef():用于在函数式组件中创建 Ref。
- useEffect():用于在函数式组件中处理副作用,例如数据获取、订阅事件、手动操作 DOM 等。useEffect()不仅可以处理副作用,也可以代替类组件的生命周期函数:
  - 不传递依赖项,那么 useEffect 回调函数在每一次渲染结束后都会执行(相当于执行 componentDidMount),回调函数返回的函数会在组件卸载时执行(相当于执行 componentWillUnMount)。
  - 传递依赖项,但依赖项为空,那么回调函数会在第一次渲染结束后执行(相当于执行 componentDidMount)。
  - 传递依赖项,依赖项不为空,那么回调函数在依赖项中的依赖元素更新渲染后执行(componentDidUpdate),依赖项中的依赖元素一般是 state 和 props。
- useMemo():用于在渲染过程中缓存计算结果,useMemo 常用于性能优化,避免在每次渲染时都重新计算相同的值。
- useCallack():用于创建记忆化版本(缓存功能)的回调函数,它有助于防止在每次渲染时都创建新的回调函数,从而优化性能。
- useReducer:用于管理复杂的组件状态,它提供了一种替代 useState 的方式,用于处理需要多个状态值或者状态之间有复杂关系的场景。
- useContext:用于在函数组件中访问上下文(Context)。Context 是一种在组件树中共享值的方法,可以避免通过逐层传递 props 的方式将值传递给深层嵌套的组件。Context 使用流程如下:
  - 通过 React.createContext()创建一个 Context 对象。
  - 使用 Context 对象的 Provide 组件包裹需要共享状态的组件,并通过 value 属性提供共享状态。
  - 在 Context 对象的 Provide 组件 的子组件中使用 useContext()根据 Context 对象获取共享状态。

## 为什么在无法在条件分支或判断分支中使用 Hooks?

函数组件首次渲染时,React 会创建一个 Hook 链表来跟踪每个 Hook 的状态,这个链表用于记录当前组件使用的每一个 Hook 调用及其状态。当在一个函数组件中调用 useState、useEffect 等 Hook 时,React 会按照调用顺序将它们添加到当前组件的 Hook 链表中。每个 Hook 调用在链表中都有一个固定的索引,这个索引在组件的整个生命周期内保持不变。。在后续的更新中,React 会重用这个 Hook 链表,而不是重新创建。条件语句可能导致某些 Hooks 在某些渲染中被跳过,违反了初次渲染与后续更新之间的 Hook 调用一致性。

## 15.useState()/setState()是异步的还是同步的?

在 React17.x 中 useState()/setState()分为如下两种情况:

- 在组件生命周期函数和合成事件中,setState()/useState()更新是异步的。对于多个可以进行合并的 setState()/useState(),React 通过 batchUpdate(批量更新)机制对多个 setState()/useState()进行合并更新,仅会触发一次组件渲染。setState()/useState()设计成异步的,其目的为了提升组件渲染效率,对多个 setState()进行合并批量更新,可以减少组件渲染次数,从而提升性能。在 React18 推出了新的 auto batching(自动批量更新机制),在 auto batching 下,无论是透过 SyntheticEvent、原生 event 还是 setTimeout 等,任何调用 setState 的方式都会被看做 batching 机制。也就是说在 React18 版本任何 setState()/useState()都是异步的。
- 在 setTimeout、setInterval、Promise.then()异步 API 中,setState()/useState()更新是同步的。每调用一次 setState()就会触发组件重新渲染。

在 React18.x 中为了提升渲染性能,将 useState()/setState()设计为异步更新,当有多个 setState()时会被批处理合并成一次更新。

## 16.useState()与 setState()的区别?

useState()与 setState()有所区别,Class 组件存储的是状态的引用,而函数式组件存储的是状态的快照。当函数引用 useState()定义状态时,该函数其实是一个闭包函数(满足有权访问其他函数作用域的函数特征,简单来说就是函数嵌套函数),该函数持有了函数式组件的作用域,函数式的状态是一个快照副本。

## 17.如何获取 useState()异步更新后的值?

- 通过 useEffect()侦听 state。

```jsx
const ClassApp = () => {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('z乘风')
  const asyncHandle = () => {
    setCount(count + 1)
    setName('zchengfeng')
  }
  useEffect(() => {
    /**
     * 第一次打印:{count: 0, name: 'z乘风'}
     * 第二次打印:{count: 1, name: 'zchengfeng'}
     */
    console.log({ count, name })
  }, [count, name])

  return (
    <div>
      <button onClick={asyncHandle}>button01</button>
    </div>
  )
}
```

- 通过 useRef()引用 state。

```jsx
const ClassApp = () => {
  const [state, setState] = useState({
    count: 0,
    name: 'z乘风',
  })
  const stateRef = useRef(state)

  const asyncHandle = () => {
    stateRef.current = {
      count: 1,
      name: 'zchengfeng',
    }
    setState(stateRef.current)
    console.log(stateRef.current) // {count: 1, name: 'zchengfeng'}
  }

  return (
    <div>
      <button onClick={asyncHandle}>button01</button>
    </div>
  )
}
```

## 18.useEffect 与 useLayoutEffect 的区别?

useEffect()是 React 提供用于处理组件副作用的 Hooks,例如网络请求、改变 DOM、添加订阅、设置定时器、记录日志等场景,而 useLayoutEffect()是 React 提供用于处理布局相关副作用的 Hooks,其接收参数用法与 useEffect()类似,useLayoutEffect()与 useEffect()区别在于:

- useEffect()不会 block(阻塞)浏览器渲染,而 useLayoutEffect()会阻塞浏览器渲染,注意:useLayoutEffect()会损坏性能,应尽量避免使用 useLayoutEffect()。
- useEffect()会在浏览器渲染结束后执行,useLayoutEffect()则是在 DOM 更新完成后(DOMContentLoaded 事件),浏览器绘制之前执行。

## React.Context 实现原理?

## React Suspense 的实现原理?

## ReactDOM.createPortal()实现原理?

## 什么是并发模式?

并发模式(Concurrent Mode)是 React18 新特性之一,可以使 React 应用程序通过渲染组件树来提高响应速度,而不会阻塞主 UI 线程。相比较多线程中的并发,并发模式并不是真正意义上的并发。在 React 中不同任务被分为不同优先级,React 可以中断长时间运行的渲染来处理高优先级的任务。并发模式的并发是在主线程中执行多个任务,通过 React 调度每个任务都可以允许在"运行"和"暂停"两种状态之间切换,从而给用户造成了一种任务并发执行的假象。并发模式与 CPU 的执行原理类似,React 基于时间分片(Time Slicing)策略将渲染工作分成多个时间片(小的时间段),以确保用户界面在加载大量数据或复杂计算时仍然保持响应性。

## React Server Components?

## React diff 算法的时间复杂度是多少?

Diff 算法(差异算法)是一种用于比较两个数据集之间的不同之处的算法。在前端开发中,"Diff"通常指的是虚拟 DOM Diff 算法,它是用于优化 Web 前端框架中的渲染性能的一种技术。Diff 算法的目标是找出两个虚拟 DOM 树之间的差异,并将这些差异应用于实际的 DOM 树,以最小化 DOM 操作的次数,从而提高页面的性能:

- 生成两棵虚拟 DOM 树:一棵表示当前虚拟 DOM 树,另一棵表示因状态发生变化后的生成的新虚拟 DOM 树。
- 比较这两棵虚拟 DOM 树的差异,找出需要更新的部分。这个过程通常被称为"diffing"。
- 根据差异,执行最小的实际 DOM 操作,以反映所需的更改。

传统 Diff 算法的时间复杂度通常是 O(n^3),其中 n 表示虚拟 DOM 树中的节点数量。传统 Diff 算法的工作原理是逐层比较两棵 DOM 树的节点,从根节点开始,递归地遍历整个树。对于每一对节点,需要比较它们的类型、属性和子节点等信息,以确定是否存在差异。由于需要进行三层循环,其中一层循环用于遍历第一棵树的节点,另一层循环用于遍历第二棵树的节点,最后一层循环用于比较两个节点之间的差异,因此时间复杂度是 O(n^3)。当虚拟 DOM 节点数量过多时,执行效率将变得非常差。

由于传统 Diff 算法时间复杂度高,React 针对内部 Diff 算法进行一系列,将 Diff 算法的时间复杂度由 O(n^3)降低至 O(n)。对比传统 Diff 算法 React Diff 算法进行了如下优化:

- 差异比较策略。React 使用一种启发式算法,不会对每个节点都执行深度比较。它会首先比较节点的类型,如果类型相同,然后再比较节点的属性(Props)以及子节点。如果类型不同,React 将直接替换整个子树,而不会深入比较子树的内容,从而减少比较的次数。
- Diff 过程的优化。React 使用了一种称为“双端比较”的策略,即同时从新旧虚拟 DOM 树的两端开始比较。这有助于提前发现差异,减少比较的次数。同时,React 会使用一些数据结构,如哈希表,来加速节点的查找和比较。
- 使用唯一标识符 Key 属性。React 鼓励在列表中的每个子元素上使用唯一的 key 属性。这允许 React 更快速地定位到相同元素在新旧虚拟 DOM 中的位置,而无需遍历整个列表。通过 key 属性,React 可以将 Diff 过程的复杂度从 O(n^3) 降低到 O(n)。

## React 与 Vue 的 diff 算法有何不同?

## React 性能优化策略有哪些?

## React SSR 实现原理?

## React-Router 工作原理

## Hooks 实现原理?

## Zustand 实现原理?

Zustand 核心是利用发布订阅模式+React useSyncExternalStore Hooks,实现 React 全局状态管理。
