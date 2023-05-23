## 1.React17.0 生命周期函数?

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

## 2.组件通讯方式有哪些?

- 通过 Props 父传子。
- 通过 Props 提供回调函数方式子改父。
- 通过 Ref 获取组件实例。
- 通过 Context 实现多层级组件通讯。
- 基于发布订阅模式实现多层级组件通讯。
- 使用第三方状态管理库进行多层级组件通讯。例如 jotai、zustand、redux。
- 浏览器存储机制。例如 cookie、localStorage、SessionStorage、IndexDB。

## 什么是受控组件和非受控组件?

受控组件和非受控组件是 React 中用来控制表单元素的两种方式:

- 受控组件:表单元素的值由 React 组件的 state 或 props 控制,每当表单元素的值发生变化时,React 会自动更新 state 或 props,从而更新 UI。受控组件要求显式控制表单元素的值,可以通过定义 onChange 事件来实现对表单元素值的控制。
- 非受控组件:表单元素的值由 DOM 自身维护,React 只是在需要时读取表单元素的值。非受控组件在初始化时不需要指定初始值,而且 React 不会修改它们的值,通常使用 ref 来访问表单元素的值。

## 3.class 组件与函数式的区别?

- 类组件因为需要创建组件的实例,且不能销毁,性能开销大;函数式组件不会被实例化,整体渲染性能得到提升。
- 类组件可以访问 this 和生命周期函数;函数式组件无法访问 this 且没有生命周期函数,但函数式组件可以通过 hooks 访问生命周期函数。
- 类组件属于状态组件,组件内部可以维护组件的 state;而函数式组件属于无状态组件,数据来源于 props。

## React Render Props 是什么?

React Render Props 是 React 组件的一种模式,旨在让组件之间共享行为逻辑。这种模式通过将一个或多个函数作为 React 组件的 props 传递,从而让组件能够共享一部分渲染逻辑。这些函数通常会返回 JSX 元素,可以进行自定义渲染,使得组件能够更加灵活地适应不同的需求。使用 Render Props 模式可以使得组件复用性更高,同时也可以提高代码的可读性和可维护性。

```tsx
import React, { useState } from "react";
interface Props {
  render: (count: number, increment: () => void) => React.ReactNode;
}
const RenderPropsExample: React.FC<Props> = ({ render }) => {
  const [count, setCount] = useState(0);
  const increment = () => setCount(count + 1);
  return <div>{render(count, increment)}</div>;
};
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
          );
        }}
      />
    </div>
  );
};
```

RenderPropsExample 组件通过 props 接收一个名为 render 的函数,render 可以在组件外部定义组件的渲染逻辑,灵活性更好,而且其他组件可以重用该渲染逻辑。render 函数包括 count 和 increment 两个参数,并返回一个 ReactNode 节点作为渲染内容。Parent 渲染 RenderPropsExample 组件时需要传入 render Props,在该渲染函数中可以自定义任意逻辑。

## 4.React 合成事件是什么?

React 合成事件是 React 框架中的一个事件系统,它是在原生 DOM 事件的基础上封装而来的。它提供了一种跨浏览器的、与原生 DOM 事件一致的、高性能的事件处理方式,虽然合成事件实现了跨浏览器兼容和性能提升,但也增加了 React 包体积,在 Preact(一个精简版的 React 库,提供与 React 相同的特性)中,为了体积考虑并未添加合成事件支持。在 React 中,合成事件通过事件委托机制在顶层的 document 对象上统一绑定监听函数,然后通过事件冒泡的方式传递到组件中进行处理。相比原生 DOM 事件,合成事件具有以下特点：

- **跨浏览器兼容**。React 会自动处理不同浏览器之间的差异,保证事件在不同浏览器下的行为一致。
- **性能优化**。React 会对事件进行池化,避免频繁创建和销毁事件对象,从而提高性能。
- **事件委托**。所有的事件都被绑定到顶层的 document 对象上,而不是每个组件都绑定一次,从而减少了内存占用。
- **API 一致**。合成事件提供具有与原生 DOM 事件相同的属性和方法。

## React HOC 是什么?有什么作用?

高阶函数是接收一个函数做为参数或者是返回一个函数的函数,高阶组件与高阶函数类似,简单来说高阶组件是一种用于复用组件逻辑的技术,它接收一个组件作为参数,并返回一个新的组件。

## React 错误边界组件

React 错误边界组件是一种容错机制,用于在 React 组件树中捕获并处理 JavaScript 错误,从而避免这些错误导致整个应用程序崩溃。通常情况下,React 组件中的错误会向上冒泡直至顶层组件,导致整个应用程序崩溃。错误边界组件可以在组件树中的特定点捕获错误,防止错误冒泡到更高的组件并导致整个应用程序崩溃。当 React 组件内部出现错误时,错误边界组件会渲染备用 UI,以便用户可以继续使用应用程序而不会影响其他组件。

实现一个 React 错误边界组件,需要创建一个新的类组件,并在其中添加 componentDidCatch 方法。 componentDidCatch 方法会在组件内部出现错误时被调用,并允许对这些错误进行处理。

::: details ErrorBoundary 组件实现

```tsx
import React, { PropsWithChildren, ErrorInfo } from "react";

interface Props {
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export default class ErrorBoundary extends React.Component<
  PropsWithChildren<Props>,
  State
> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  // 当组件内部出现错误时调用此钩子函数
  componentDidCatch(error: Error, info: ErrorInfo) {
    // You can also log the error to an error reporting service
    console.log(error, info);
  }

  render() {
    const { fallback, children } = this.props;
    const { hasError } = this.state;
    if (hasError) {
      return fallback || <h1>Something went wrong.</h1>;
    }
    return children;
  }
}
```

:::

::: details 使用 ErrorBoundary 组件

```tsx
import React from "react";
import ErrorBoundary from "./ErrorBoundary";

function MyComponent(props) {
  // This will throw an error
  return <h1>{props.text}</h1>;
}

function App() {
  return (
    <div>
      <ErrorBoundary>
        <MyComponent text="Hello, world!" />
      </ErrorBoundary>
    </div>
  );
}
export default App;
```

:::
上述例子中,MyComponent 组件会抛出一个错误,但是由于它被包装在 ErrorBoundary 组件中,错误不会冒泡到更高的组件并导致整个应用程序崩溃。相反,ErrorBoundary 组件会渲染一个备用 UI,以便用户可以继续使用应用程序。

## 什么是 React Hooks?

React Hooks 是一种用于在函数组件中使用状态和其他 React 特性的技术,它可以替代类组件中的生命周期和状态管理等功能。

## useState()/setState()是异步的还是同步的?

在 React18.x 中为了提升渲染性能,将 useState()/setState()设计为异步更新,当有多个 setState()时会被批处理合并成一次更新。在 React17.x 中 useState()/setState()分为如下两种情况:

- 在组件生命周期函数和合成事件中,setState()/useState()更新是异步的。对于多个可以进行合并的 setState()/useState(),React 通过 batchUpdate(批量更新)机制对多个 setState()/useState()进行合并更新,仅会触发一次组件渲染。setState()/useState()设计成异步的,其目的为了提升组件渲染效率,对多个 setState()进行合并批量更新,可以减少组件渲染次数,从而提升性能。在 React18 推出了新的 auto batching(自动批量更新机制),在 auto batching 下,无论是透过 SyntheticEvent、原生 event 还是 setTimeout 等,任何调用 setState 的方式都会被看做 batching 机制。也就是说在 React18 版本任何 setState()/useState()都是异步的。
- 在 setTimeout、setInterval、Promise.then()异步 API 中,setState()/useState()更新是同步的。每调用一次 setState()就会触发组件重新渲染。

## useState()与 setState()的区别?

useState()与 setState()有所区别,Class 组件存储的是状态的引用,而函数式组件存储的是状态的快照。当函数引用 useState()定义状态时,该函数其实是一个闭包函数(满足有权访问其他函数作用域的函数特征,简单来说就是函数嵌套函数),该函数持有了函数式组件的作用域,函数式的状态是一个快照副本。

## 如何获取 useState()异步更新后的值?

- 通过 useEffect()侦听 state。

```jsx
const ClassApp = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("z乘风");
  const asyncHandle = () => {
    setCount(count + 1);
    setName("zchengfeng");
  };
  useEffect(() => {
    /**
     * 第一次打印:{count: 0, name: 'z乘风'}
     * 第二次打印:{count: 1, name: 'zchengfeng'}
     */
    console.log({ count, name });
  }, [count, name]);

  return (
    <div>
      <button onClick={asyncHandle}>button01</button>
    </div>
  );
};
```

- 通过 useRef()引用 state。

```jsx
const ClassApp = () => {
  const [state, setState] = useState({
    count: 0,
    name: "z乘风",
  });
  const stateRef = useRef(state);

  const asyncHandle = () => {
    stateRef.current = {
      count: 1,
      name: "zchengfeng",
    };
    setState(stateRef.current);
    console.log(stateRef.current); // {count: 1, name: 'zchengfeng'}
  };

  return (
    <div>
      <button onClick={asyncHandle}>button01</button>
    </div>
  );
};
```

## useEffect 与 useLayoutEffect 的区别?

useEffect()是 React 提供用于处理组件副作用的 Hooks,例如网络请求、改变 DOM、添加订阅、设置定时器、记录日志等场景,而 useLayoutEffect()是 React 提供用于处理布局相关副作用的 Hooks,其接收参数用法与 useEffect()类似,useLayoutEffect()与 useEffect()区别在于:

- useEffect()不会 block(阻塞)浏览器渲染,而 useLayoutEffect()会阻塞浏览器渲染,注意:useLayoutEffect()会损坏性能,应尽量避免使用 useLayoutEffect()。
- useEffect()会在浏览器渲染结束后执行,useLayoutEffect()则是在 DOM 更新完成后,浏览器绘制之前执行。

## 什么是 Fiber 架构,它解决了什么问题?

## React 与 Vue 的 diff 算法有何不同？
