Hooks 可以简单理解为包含一系列组件逻辑的工具函数,React 内置 Hooks 命名以 use 为前缀(但实际以 xxx + Hook 的方式命名可能会更加语义化)。Hooks 并不是 React 特有的概念,更像是一种编程范式的延申。Hooks 意为"钩子",表示系统运行到某一时期时,会调用被注册到该时机的回调函数。React 在 16.8 版本提供了 Hooks 特性,其目的如下:

- 更好的状态复用。在 Class 组件模式下状态复用是一件非常困难的事情,例如组件有一个 name 状态和修改 name 的函数,其他组件要复用此逻辑,在 Hooks 出现之前的做法是通过 Mixin 实现状态的复用,但 Mixin 复用状态逻辑缺点太多了,例如命名冲突、可维护性差。
- 更好的代码组织和简洁性。分散在各种声明周期里的代码块,通过 Hooks 的方式将相关的内容聚合到一起,从而提供代码可阅读性。在 React 编写 Class 组件是比较繁复和冗长的,不仅要继承自 React.Component 在 constructor 中通过 super()调用父类构造函数,而且还得注意 Class 组件中事件绑定的 this 问题,如果不绑定 this 则 this 最终指向 undefined。
- 向后兼容。React Hooks 是向后版本是兼容的,并不会影响 React16.8 之前的版本。注意:React Hooks 只能在函数式组件或其他 Hooks 中使用。

React 内置的 Hooks 列表如下:

- useState():用于声明组件状态。
- useRef():用于声明 ref(引用,reference 的简写),可以代替 class 组件的 createRef()。
- useEffect():用于声明组件的副作用。副作用是 FP(函数式编程)的特征之一。
- useLayoutEffect():
- useMemo():用于根据依赖项记忆(缓存)计算结果,只要依赖项不发生变化,则 useMemo()并不会重新计算。
- useCallback():根据依赖记忆(缓存)函数,只要依赖项不发生变化,则 useCallback()并不会重新生成函数。
- useContext():用于从函数式组件中读取和订阅 React Context(上下文)。
- useReducer():用于向函数式组件添加 reducer(减速器)。
- useImperativeHandle():允许自定义作为引用公开的句柄。

虽然 React Hooks 提供诸多优点,但是存在着如下问题:

- 不要在循环、条件嵌套函数中使用 Hook,确保在 React 函数最顶层调用它。如果在循环、条件嵌套函数中使用 Hooks,可能会导致 Hook 在每一次渲染都无法按照同样的顺序被调用,从而导致非预期的结果。而其他框架的 Hooks 并无这一限制。
- React Hooks 只能在函数式组件或其他 Hooks 中使用。不要在普通 JS 函数中调用 Hook,但可以在 React 的函数组件中调用 Hook,可以在自定义 Hook 中调用其他 Hook。

React 为了编写 Hook 规范的问题,发布了一个名为 eslint-plugin-react-hooks ESLint 插件来强制执行这两条规则。

```shell
npm install eslint-plugin-react-hooks --save-dev
```

ESLint 配置:

```js
// ESLint 配置
{
  "plugins": [
    // ...
    "react-hooks"
  ],
  "rules": {
    // ...
    "react-hooks/rules-of-hooks": "error", // 检查 Hook 的规则
    "react-hooks/exhaustive-deps": "warn" // 检查 effect 的依赖
  }
}
```

## 1.useState()

useState(initialState)用于声明函数式中的状态,其中 initialState 表示状态的初始值,initialState 既可以是一个初始值又可以是一个返回初始值的惰性初始化函数,惰性初始化函数仅在组件首次渲染被执行,通常用于初始化数据量较大的状态,惰性初始化函数能提升组件渲染效率。
useState(initialState)返回一个数组,该数组由状态值(state)和设置状态值函数(setState)两项组成,其中设置状态值函数既可以接收一个更新值又可以接收一个返回更新值的回调函数,在该回调函数可以获取上一次的状态值。手动调用设置状态值函数可以触发组件重新渲染。只有更新 state 与 state 值不相等时才会触发组件重新渲染,React 底层使用 Object.is()来比较更新前的 state 和更新的 state,只有两者不相等时组件才会被重新渲染。

useState()函数签名如下:

```ts
type SetStateAction<S> = S | ((prevState: S) => S)
type Dispatch<A> = (value: A) => void

/**
 * S泛型表示状态的类型,如果不指定泛型,则会根据初始值进行类型推断。
 * 状态既可以是一个初始值,又可以是一个返回初始值的懒加载函数。
 *
 */
function useState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>]

function useState<S = undefined>(): [S | undefined, Dispatch<SetStateAction<S | undefined>>]
```

```tsx
import React, { useState } from 'react'

interface Item {
  id: number
  name: string
  address: string
}

function Example() {
  console.log('Example render...')

  /**
   * useState()初始值写法。useState()返回一个数组,数组由状态值和设置状态值函数组成
   */
  const [count, setCount] = useState(0)

  /**
   * useState()惰性初始化函数写法,仅在组件首次渲染被调用,惰性初始化函数通
   * 常用于初始化数据量较大的状态
   */
  const [list, setList] = useState<Item[]>(() => {
    return [
      { id: 1, name: 'name_1', address: 'address_1' },
      { id: 2, name: 'name_2', address: 'address_2' },
      { id: 3, name: 'name_3', address: 'address_3' },
    ]
  })

  /**
   * 向list添加item
   */
  const handleAddItem = () => {
    /**
     * 由于React中属于Immutable(不可变)数据流,更新数据时需要传递一个新的值,
     * 而Vue属于mutable(可变)数据流,其内部基于依赖追踪,更新数据时可以直接
     * 操作值从而触发组件重新渲染。
     */
    const id = list.length + 1
    const item = { id, name: `name_${id}`, address: `address_${id}` }
    // 设置状态值函数
    setList([...list, item])
  }

  /**
   * 删除item
   */
  const handleRemoveItem = () => {
    // 设置状态值函数回调函数写法,prevState表示上一次的状态值
    setList((prevState) => prevState.filter((_, index) => index !== list.length - 1))
  }

  return (
    <div>
      <div>
        <span>{count}</span>
        <button onClick={() => setCount(0)}>reset</button>
        <button onClick={() => setCount(count + 1)}>add</button>
        <button onClick={() => setCount(count - 1)}>minus</button>
      </div>
      <div>
        <button onClick={handleAddItem}>addItem</button>
        <button onClick={handleRemoveItem}>minusItem</button>
      </div>
      <ul>
        {list.map((item) => {
          return (
            <li key={item.id}>
              name:{item.name},address:{item.address}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
export default Example
```

### 1.1 Class State 与 useState()的区别

- 函数式 State 粒度更细,class 的 State 粒度较粗。在函数式组件可以通过 useState 定义多个 State,而在 Class 组件中所有状态都被挂载到 State,一旦局部状态更新会影响到其他状态。
- Function State 保存的是快照(闭包),Class State 保存的是最新值(引用)。
- 引用类型的情况下,Class State 不需要传入新的引用,而 Function State 必须保证是个新的引用。

```tsx
import React, { Component } from 'react'
// 1s内点击button count值10
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0,
    }
    this.increment = this.increment.bind(this)
  }
  increment() {
    setTimeout(() => {
      this.setState({ count: this.state.count + 1 })
    }, 1000)
  }
  render() {
    return <h2 onClick={this.increment}>{this.state.count}</h2>
  }
}
```

```tsx
import React, { useState } from 'react'
// 1s内点击button10次 count值为1
function App() {
  const [count, setCount] = useState(0)
  const increment = () => {
    setTimeout(() => {
      setCount(count + 1)
    }, 1000)
  }
  return <h2 onClick={increment}>{count}</h2>
}
```

上述示例中,在 class 组件中 1s 内连续点击 button 10 次,count 的值为 10,在函数式组件中 1s 内点击 button 10 次,count 值为 1。这是因为 class 组件的 state 属于引用,this.state.count 可以引用到 count,所以在 setTimeout()都能通过引用拿到上一次最新的 state,即每次点击都可以获取最新的引用值。在函数式组件实例中,每次点击 button 会调用 setCount()触发组件重新渲染,setTimeout()中的 count 都是通过闭包读取的(count 来源于 App 函数),而这个 count 实际上是初始值(为 0),并非是上次执行完成后的最新值,因此点击 10 次仅最后一次计算 count+1,所以最终结果是 1。函数式可以通过 useRef()定义引用,即使组件重新渲染 useRef()也能保证引用是最新值,而且修改引用并不会触发组件重新渲染。

### 1.2 useState 和 setState 是同步还是异步?

- 在组件生命周期函数和合成事件中,setState()/useState()更新是异步的。对于多个可以进行合并的 setState()/useState(),React 通过 batchUpdate(批量更新)机制对多个 setState()/useState()进行合并更新,仅会触发一次组件渲染。setState()/useState()设计成异步的,其目的为了提升组件渲染效率,对多个 setState()进行合并批量更新,可以减少组件渲染次数,从而提升性能。在 React18 推出了新的 auto batching(自动批量更新机制),在 auto batching 下,无论是透过 SyntheticEvent、原生 event 还是 setTimeout 等,任何调用 setState 的方式都会被看做 batching 机制。也就是说在 React18 版本任何 setState()/useState()都是异步的。
- 在 setTimeout、setInterval、Promise.then()异步 API 中,setState()/useState()更新是同步的。每调用一次 setState()就会触发组件重新渲染。

### 1.3 如何获取 setState 异步更新后的值?

- 将异步 setState 设置为同步的(仅限于 React18 前)。

```tsx
// 异步setState设置为同步有以下三种方式

// 方式1:调用setState时传入一个函数。
this.setState((preState,props)=>({
  count:preState.count+1
})

// 方式2:使用setTimeout等异步API来包裹setState。
setTimeout(this.setState(count+1))

// 方式3:在原生事件中修改State
const changeCount= () => {
  this.setState(count+1);
}
document.body.addEventListener("click",changeCount,false)
```

- 通过 setState()的回调函数获取。setState()接收两个参数,第二个参数是一个回调函数,该回调函数在 state 更新后被执行。
- 通过 componentDidUpdate 生命钩子函数。状态发生变化时就会触发 componentDidUpdate 生命钩子函数。

### 1.4 如何获取 useState()异步更新后的值

useState()与 setState()有所区别,Class 组件存储的是状态的引用,而函数式组件存储的是状态的快照。当函数引用 useState()定义状态时,该函数其实是一个闭包函数(闭包函数:满足有权访问其他函数作用域的函数特征,简单来说就是函数嵌套函数),该函数持有了函数式组件的作用域,函数式的状态是一个快照副本。

- 通过 useEffect()侦听 state。

```tsx
import React, { useState, useEffect } from 'react'

function Example() {
  console.log('Example render...')
  const [count, setCount] = useState(0)
  /**
   * 通过useEffect监听依赖项变化,当依赖项发生变化时,就会触发组件重新渲染
   */
  useEffect(() => {
    console.log('count change...')
  }, [count])

  return (
    <div>
      <div>
        <span>{count}</span>
        <button onClick={() => setCount(count + 1)}>add</button>
        <button onClick={() => setCount(count - 1)}>minus</button>
      </div>
    </div>
  )
}
export default Example
```

- 通过 useRef()引用 state。

```tsx
import React, { useState, useRef } from 'react'

function Example() {
  console.log('Example render...')
  const [count, setCount] = useState(0)
  // 通过useRef()声明状态的引用,通过引用总能获取最新的值,更新引用时并不会触发组件重新渲染
  const countRef = useRef(count)
  return (
    <div>
      <div>
        <span>{count}</span>
        <button onClick={() => setCount(countRef.current++)}>add</button>
        <button onClick={() => setCount(countRef.current--)}>minus</button>
      </div>
    </div>
  )
}
export default Example
```

## 2.useRef()

useRef 用于在函数式组件创建一个 ref(ref 即引用,是 reference 的简称)。useRef 返回一个可变对象(RefObject/MutableRefObject),该对象拥有一个 current 属性,并且不管函数组件执行多少次,而 useRef 返回的对象永远都不会发生变化(永远都是原来那一个),而且修改 ref 值并不会触发组件重新渲染。useRef()函数签名如下:

```ts
/**
 * useRef()接收一个泛型作为引用的类型,若不指定泛型类型,则根据初始值进行类型推断。
 * useRef()会根据初始值返回一个可变对象(RefObject/MutableRefObject),如果useRef()初始值
 * 为null时则返回MutableRefObject,否则返回RefObject,MutableRefObject和RefObject区别在于
 * MutableRefObject的current是允许修改的,而RefObject对象的current是只读的,当修改
 * RefObject的current属性时TypeScript将发出警告
 */
function useRef<T>(initialValue: T): MutableRefObject<T>
function useRef<T>(initialValue: T | null): RefObject<T>
function useRef<T = undefined>(): MutableRefObject<T | undefined>
```

RefObject/MutableRefObject 类型声明如下:

```ts
interface RefObject<T> {
  readonly current: T | null
}
interface MutableRefObject<T> {
  current: T
}
```

RefObject 和 MutableRefObject 内部都定义了一个{current:T},其区别在于 RefObject 中的 current 属性是只读的,修改 RefObject 的 current 属性时 TypeScript 将发出警告,而 MutableRefObject 的 current 属性是可修改的。useRef 利用 TypeScript 函数重载定义了两个声明,当传入的泛型参数 T 不包含 null 时返回 RefObject,当包含 null 时将返回 MutableRefObject。

```tsx
// 例子:
const ref = useRef<string | null>(null)
ref.current = '' // OK,ref的类型为MutableRefObject,current属性是可变的

const ref = useRef<string>(null)
ref.current = '' // ERROR,ref的类型为RefObject,current属性是只读的
```

### 2.1 使用 useRef()引用状态

通过 useRef()解决 useState()在 setTimeout()中 1s 点击 10 次无法获取最新值问题。

```tsx
import React, { useState, useRef } from 'react'
// 1s内点击button10次 count值为10
function Example() {
  const [count, setCount] = useState(0)
  const countRef = useRef(count)

  const increment = () => {
    setTimeout(() => {
      setCount(countRef.current++)
    }, 1000)
  }
  const decrement = () => {
    setTimeout(() => {
      setCount(countRef.current--)
    }, 1000)
  }
  return (
    <div>
      <div>
        <span>{count}</span>
        <button onClick={increment}>add</button>
        <button onClick={decrement}>minus</button>
      </div>
    </div>
  )
}
export default Example
```

### 2.2 使用 useRef()引用 DOM 元素

```tsx
import React, { useState, useRef } from 'react'

/**
 * DOM类型的继承关系如下(从父类型到子类型):EventTarget > Node > Element > HTMLElement。
 * 其中HTMLElement表示一个html元素,而HTMLElement又分为诸多子类型:
 * - HTMLBodyElement:表示body元素。
 * - HTMLButtonElement:表示button元素。
 * - HTMLCanvasElement:表示canvas元素。
 * - HTMLDivElement:表示div元素。
 * - HTMLFormElement:表示form元素。
 * - HTMLInputElement:表示input元素。
 * - HTMLTableElement:表示table元素。
 * - HTMLSpanElement:表示span元素。
 * - HTMLTextAreaElement:表示文本域元素。
 * - HTMLUListElement:表示ul元素。
 * - HTMLLIElement:表示li元素。
 * // ...省略其他类型
 */
function Example() {
  const [text, setText] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    console.log('通过event对象获取输入值:', e.target.value)
    // 通过ref引用获取DOM元素
    const inputEl = inputRef.current
    if (!inputEl) return
    console.log('通过ref引用DOM元素获取输入值:', inputEl.value)
    setText(inputEl.value)
  }
  return (
    <div>
      <div>
        <div>text:{text}</div>
        <input ref={inputRef} onChange={onChange} type="text" />
      </div>
    </div>
  )
}

export default Example
```

### 2.3 使用 useRef()引用组件

useRef()引用子组件并调用子组件暴露的方法或属性,需要借助 forwardRef()转发 ref 并通过 useImperativeHandle()对外暴露方法属性。其步骤如下:

- 父组件使用 useRef()创建 ref 作为子组件的引用。
- 子组件通过 forwardRef()将外部传递的 ref 转发至组件内部。
- 子组件通过 useImperativeHandle()根据转发的 ref,对外暴露方法和属性。

```tsx
import React, { useRef, forwardRef, useImperativeHandle, RefAttributes } from 'react'

interface ChildProps {}

interface ChildRef {
  sayHi: () => void
}

/**
 * forwardRef(function render(){})用于接收外部传递的ref并转发至组件内部。
 * 通常forwardRef()和useImperativeHandle()搭配使用,forwardRef()转发外部
 * 传递的ref,而useImperativeHandle()根据转发的ref,对外暴露方法或属性。
 * forwardRef<T, P = {}>(render: ForwardRefRenderFunction<T, P>)
 * 支持T和P两个泛型参数,T表示渲染组件的Props类型,P表示转发Ref的类型。forwardRef()
 * 接收一个渲染函数用于渲染组件内容,渲染函数接收组件props和转发的ref两个参数。
 */
const Child = forwardRef<ChildProps, RefAttributes<ChildRef>>(function Child(props, ref) {
  /**
   * useImperialeHandle()根据ref向父组件的暴露方法或属性,useImperativeHandle<T, R extends T>
   * (ref: Ref<T>|undefined, init: () => R, deps?: DependencyList)参数如下:
   * - ref:forwardRef转发的ref。即从forwardRef()接收渲染函数的第二个参数。
   * - init:一个不带参数并返回要公开的引用句柄的函数。对外暴露方法和属性的函数。
   * - deps:依赖项数组。React通过Object.is()比较依赖项数组中每个依赖,
   * 如果依赖项数组中的依赖发生变化或依赖项为空,组件重新渲染会导致useImperialeHandle()
   * 重新被执行,并且新创建的句柄将分配给ref。
   */
  useImperativeHandle(ref, () => {
    return {
      sayHi() {
        console.log('sayHi...')
      },
    }
  }, [])
  return <div>child</div>
})

function Parent() {
  const childRef = useRef<ChildRef>(null)
  const sayHi = () => {
    // 使用子组件暴露的sayHi()函数
    childRef.current?.sayHi() // sayHi...
  }
  return (
    <div>
      <Child ref={childRef} />
      <button onClick={sayHi}>sayHi</button>
    </div>
  )
}
export default Parent
```

### 2.4 useRef()特点

- useRef()是除字符串 ref、函数 ref、createRef()以外的第四种获取 Ref 的方法。
- useRef()在函数渲染周期内永远不会变,因此可以引用某些数据。
- 修改 useRef()返回对象的 current 属性并不会引发组件重新渲染,所以 useRef()一般搭配 useState()使用。
- useRef()和 createRef()都能获取 Ref,但 createRef 既能用于函数式组件,又可以在类组件中使用,而 useRef()只能用于函数式组件。
- useRef()在每次渲染后都保持不变,而 createRef()在每次渲染后都会发生变化。

## 3.useEffect()

useEffect()用于处理组件中的副作用(Effect)。副作用是函数式编程(FP)的概念,使用函数对数据的操作产生的影响被称为副作用,,副作用会影响函数的"纯度",产生副作用的常用场景如下:

- 改变一个全局变量、属性或数据结构。
- 改变一个函数参数的原始值。
- 处理用户输入。
- 抛出一个异常,除非该异常被当前函数所捕获。
- 屏幕打印或记录日志。
- 查询 HTML 文档、浏览器的 cookie 或访问数据库。

useEffect 用于处理接收一个包含命令式、且可能有副作用代码的函数。例如改变 DOM、添加订阅、设置定时器、记录日志、请求数据等等都算作副作用,这些代码都推荐写在 useEffect 中。useEffect 在一定程度上可充当 componentDidMount、componentDidUpdate、componentWillUnMount 组件钩子函数。useEffect(effect: EffectCallback, deps?: DependencyList)接收回调函数和依赖数组两个参数,依赖数组中的依赖元素一般是 state 和 props,依赖数组又分以下三种情况:

- 不传递依赖数组,那么回调函数在每一次渲染结束后都会执行(相当于执行 componentDidMount 和 componentDidUpdate),回调函数返回的函数会在组件卸载时执行(相当于执行 componentWillUnMount)。
- 传递依赖数组,但依赖数组为空,那么回调函数会在第一次渲染结束后执行(相当于执行 componentDidMount)。
- 传递依赖数组,依赖数组不为空,那么回调函数在依赖数组中的依赖元素更新渲染后执行(componentDidUpdate)。

useEffect 的使用场景:

- 代替部分生命周期。如 componentDidMount、componentDidUpdate、componentWillUnmount。
- 更加 reactive,类似 mobx 的 reaction 和 vue 的 watch。
- 从命令式变成声明式,不需要再关注应该在哪一步做某些操作,只需要关注依赖数据。
- 通过 useEffect 和 useState 可以编写一系列自定义的 Hook。

## 4.useLayoutEffect()

useLayoutEffect()用于处理布局相关的副作用,其接收参数用法与 useEeffct()类似,与 useEffect()区别在于:

- useEffect()不会 block(阻塞)浏览器渲染,而 useLayoutEffect()会阻塞浏览器渲染,注意:useLayoutEffect()会损坏性能,应尽量避免使用 useLayoutEffect()。
- useEffect()会在浏览器渲染结束后执行,useLayoutEffect()则是在 DOM 更新完成后,浏览器绘制之前执行。

```tsx
const moveTo = (el: HTMLElement, delay: number, options: Record<string, any>) => {
  el.style.transform = `translate(${options.x}px)`
  el.style.transition = `left (${delay}px)`
}

const App = () => {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    moveTo(ref.current!, 2000, { x: 100 })
  })
  return (
    <div>
      <div style={{ marginTop: 100, width: 100, height: 100, background: 'red' }} ref={ref} />
    </div>
  )
}
```

![useEffect](https://cdn.nlark.com/yuque/0/2023/gif/1196263/1678346705599-a41d4157-1b3c-4894-8271-b8f49c60b895.gif)

```tsx
const moveTo = (el: HTMLElement, delay: number, options: Record<string, any>) => {
  el.style.transform = `translate(${options.x}px)`
  el.style.transition = `left (${delay}px)`
}

const App = () => {
  const ref = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    moveTo(ref.current!, 2000, { x: 100 })
  })
  return (
    <div>
      <div style={{ marginTop: 100, width: 100, height: 100, background: 'red' }} ref={ref} />
    </div>
  )
}
```

![useLayoutEffect](https://cdn.nlark.com/yuque/0/2023/gif/1196263/1678346683058-ba9e26d6-40e1-4887-b0c6-3ddd9b08e802.gif)

## 5.useCallback()

useCallback()用于记忆(缓存)函数,是 React 性能优化方案之一。useCallback()函数签名如下:

```ts
function useCallback<T extends Function>(callback: T, deps: DependencyList): T
```

useCallback()接收 T 泛型作为回调函数(callback)的类型,useCallback 也会返回 T 类型的函数。useCallback()参数说明如下:

- callback:要缓存的函数。它可以接受任何参数并返回任何值,React 将在初始渲染期间返回(并不是调用)callback 回调函数,在后续渲染依赖项未发生变化时,将会使用缓存函数。
- deps:依赖项数组。依赖项可以是 props、state 或者组件中声明的变量或函数,React 通过 Object.is()比较依赖项是否发生变化,当依赖项发生变化时,callback()就会重新被创建。

useCallback()的使用场景比较单一,在 JS 环境中创建函数的开销几乎可以忽略不计,useCallback()常用于以函数作为 Props 传递给子组件的场景。

- 未使用 useCallback():组件重新渲染都会创建 handleSubmit()函数,handleSubmit()函数作为 Child 组件的 Props,即使 Child 使用 React.memo()包装仍会导致被重新渲染,这是因为 React.memo()会通过 Object.is()比较组件的上次 props 和本次 props 是否一致,如果一致组件则跳过渲染。由于父组件重新渲染总会创建一个新的 handleSubmit()函数,React.memo()每次比较的 props 都不相等,因此父组件重新渲染也会导致 Child 组件重复渲染。

```tsx
import React, { useState, useCallback } from 'react'

// 父组件重新渲染总会导致Child组件被渲染,即使使用React.memo()Child组件仍会被渲染
const Child = React.memo(function Child({ handleSubmit }: { handleSubmit: () => void }) {
  console.log('child render...')
  handleSubmit()
  return <div>child</div>
})

/**
 * 当count值发生变化时会触发组件及其子组件重新渲染,即使Child组件使用
 * React.memo()包装组件,但Child仍会被重新渲染。React.memo()通过
 * Object.is()比较本次props和上次props是否一致,如果一致则跳过渲染,
 * 否则会重新渲染。由于Child组件接收了handleSubmit作为props,组件每次渲染
 * 都会创建handleSubmit函数,因此每次渲染React.memo()对比的props都不一致,
 * 所以Child仍会重新被渲染。
 */
function Parent() {
  const [count, setCount] = useState(0)
  const handleSubmit = () => {
    console.log('submit')
  }
  return (
    <div>
      <span>{count}</span>
      <button onClick={() => setCount(count + 1)}>click</button>
      <Child handleSubmit={handleSubmit} />
    </div>
  )
}

export default Parent
```

- 使用 useCallback()记忆 handleSubmit()函数:useCallback 记忆 handleSubmit()函数,如果依赖项未发生变化,父组件重新渲染并不会创建新的 handleSubmit()函数,而是会使用被记忆的 handleSubmit()函数,因此在 React.memo()比较 Props 时,每次比较都是一致,所以会跳过组件的无效渲染。

```tsx
import React, { useState, useCallback } from 'react'

// 父组件重新渲染总会导致Child组件被渲染,即使使用React.memo()Child组件仍会被渲染
const Child = React.memo(function Child({ handleSubmit }: { handleSubmit: () => void }) {
  console.log('child render...')
  handleSubmit()
  return <div>child</div>
})

/**
 * 使用useCallback()记忆函数,如果依赖项未发生变化,即使Parent组件重新渲染也不会影响
 * Child组件。因为每次渲染向Child组件传递的handleSubmit()都是useCallback()记忆的
 * 函数(即每次传递的函数是同一个函数),React.memo()在对比props时由于发现上次props
 * 和本次props一致,因此会跳过渲染,从而避免了无效渲染。
 */
function Parent() {
  const [count, setCount] = useState(0)
  const handleSubmit = useCallback(() => {
    console.log('submit')
  }, [])
  return (
    <div>
      <span>{count}</span>
      <button onClick={() => setCount(count + 1)}>click</button>
      <Child handleSubmit={handleSubmit} />
    </div>
  )
}

export default Parent
```

## 6.useMemo()

useMemo()用于记忆(缓存)计算结果,是 React 性能优化方案之一。useMemo()函数签名如下:

```ts
useMemo<T>(factory: () => T, deps: DependencyList | undefined)
```

- factory():表示计算结果函数,用于返回计算结果。
- deps:依赖数组,当依赖数组中的依赖发生变化时会触发 useMemo()重新计算。

```tsx
import React, { useState } from 'react'

function Example() {
  const [location, setLocation] = useState({ w: 100, h: 100 })
  const [count, setCount] = useState(0)

  /**
   * 根据宽高计算面积,由于setState()组件状态会触发组件重新渲染,即使变化状态与location无关,
   * 仍会导致getArea()被重新计算,而getArea()计算只关乎location,所以其他状态的变化不应该触发
   * getArea()重新计算。
   * 未使用useMemo(),count状态变化会导致getArea()重新计算。
   */
  const getArea = () => {
    const { w, h } = location
    return w * h
  }

  return (
    <div>
      <span>area:{getArea()}</span>
      <button onClick={() => setCount(count + 1)}>add</button>
    </div>
  )
}

export default Example
```

getArea()函数根据宽高计算面积,由于 setState()组件状态会触发组件重新渲染,即使变化状态与 location 无关,仍会导致 getArea()被重新计算,而 getArea()计算只关乎 location,所以其他状态的变化不应该触发 getArea()重新计算。使用 useMemo()优化如下:

```tsx
import React, { useMemo, useState } from 'react'

function Example() {
  const [location, setLocation] = useState({ w: 100, h: 100 })
  const [count, setCount] = useState(0)

  /**
   * 使用useMemo()缓存面积计算结果,只有依赖项(location对象)发生变化时,getArea()才会
   * 被重新计算,其他状态变化并不会引起getArea()重新被计算。
   * 使用useMemo(),count状态变化并不会导致getArea()重新计算,只有location对象发生变化时,
   * getArea()才会被重新计算。
   */
  const getArea = useMemo(() => {
    const { w, h } = location
    return w * h
  }, [location])

  return (
    <div>
      <span>area:{getArea}</span>
      <button onClick={() => setCount(count + 1)}>add</button>
    </div>
  )
}

export default Example
```

## 7.useContext()

用于从函数式组件中读取和订阅 React Context(上下文),常用于跨组件层级数据传递。使用 useCallback 步骤如下:

- 通过 React.createContext()创建 Context 对象。
- 父组件基于 Context 对象的 Provider 组件,并通过 value 属性向子孙组件指定需要传递的数据。
- 子孙组件使用 useContext()根据指定上下文对象父组件获取传递的数据。

```tsx
import React, { useContext, useState } from 'react'

interface DataContextType {
  count: number
  setCount: (count: number) => void
}

// 步骤1:创建Context对象并指定上下文提供数据的默认值
const DataContext = React.createContext<DataContextType>({
  count: 0,
  setCount() {},
})

function Child() {
  // 步骤3:使用useContext()根据上下文对象获取父组件提供的数据
  const { count, setCount } = useContext<DataContextType>(DataContext)
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>add</button>
    </div>
  )
}

function Parent() {
  const [count, setCount] = useState(0)
  // 步骤2:通过上下文的Provider组件指定value属性向子孙组件提供数据
  return (
    <DataContext.Provider value={{ count, setCount }}>
      <span>count:{count}</span>
      <Child />
    </DataContext.Provider>
  )
}
export default Parent
```

## 8.useReducer()

useReducer()用于向组件添加一个 reducer(减速器)函数。随着功能增加组件复杂度也会随之上升,维护组件中状态处理变得越来越复杂,可以将组件状态处理的逻辑合并到 reducer 函数中。useReducer()函数提供了五个重载函数,其函数签名如下:

```ts
function useReducer<R extends ReducerWithoutAction<any>, I>(
  reducer: R,
  initializerArg: I,
  initializer: (arg: I) => ReducerStateWithoutAction<R>,
): [ReducerStateWithoutAction<R>, DispatchWithoutAction]
function useReducer<R extends ReducerWithoutAction<any>>(
  reducer: R,
  initializerArg: ReducerStateWithoutAction<R>,
  initializer?: undefined,
): [ReducerStateWithoutAction<R>, DispatchWithoutAction]
function useReducer<R extends Reducer<any, any>, I>(
  reducer: R,
  initializerArg: I & ReducerState<R>,
  initializer: (arg: I & ReducerState<R>) => ReducerState<R>,
): [ReducerState<R>, Dispatch<ReducerAction<R>>]
function useReducer<R extends Reducer<any, any>, I>(
  reducer: R,
  initializerArg: I,
  initializer: (arg: I) => ReducerState<R>,
): [ReducerState<R>, Dispatch<ReducerAction<R>>]
function useReducer<R extends Reducer<any, any>>(
  reducer: R,
  initialState: ReducerState<R>,
  initializer?: undefined,
): [ReducerState<R>, Dispatch<ReducerAction<R>>]
```

useReducer()接收 R 和 I 两个泛型,其中 R 表示 reducer()函数的类型,I 表示初始化状态的类型。useReducer()参数说明如下:

- reducer:reducer 函数,用于处理状态更新逻辑,注意 reducer 必须是一个纯函数。reducer()函数接收一个 state(处理状态)和 action 对象(执行动作)作为参数,并返回更新后的状态。其中 action 对象应包含 type(动作类型)和 payload(执行动作时所需的载荷,即所需数据)两个属性。
- initializerArg:初始状态的值。如何从中计算初始状态取决于下一个 initializer 参数。
- initializer(可选):初始状态的初始化函数。如果未指定,则初始状态设置为 initialArg。否则,初始状态设置为 initializer(initialArg)的调用结果。

useReducer()返回一个数组,该数组由 reducer()函数处理后的状态(state)和调度函数(dispatch)组成,调度函数可以根据 action 触发 reducer()函数对应修改 state,从而重新渲染组件。

### 8.1 使用 useReducer()

使用 useReducer()步骤如下:

- 定义 useReducer()相关类型,例如定义 Reducer、State、Action 类型。
- 定义 reducer()函数。reducer()函数接收 state 和 action 作为参数,action 是一个包含 type 和 payload 属性的对象,其中 type 表示要处理的 action 类型,payload 表示处理逻辑时需要的载荷(即参数)。
- 使用 useReducer()向组件添加 reducer。
- 使用 dispatch()根据 action 进行调度,从而触发 reducer()函数对应的修改 state 逻辑,并使组件重新渲染。

```tsx
import React, { useReducer, Reducer } from 'react'

/*********************** TS类型定义 ***************************** */
interface Item {
  name: string
  address: string
}
// 定义reducer状态类型
type StateType = Item[]
// 定义添加元素action类型
type AddItemAction = { type: 'add'; payload: Item }
// 定义删除元素action类型
type DelItemAction = { type: 'del'; payload: number }
// 定义修改元素action类型
type UpdateItemAction = {
  type: 'update'
  payload: { index: number; item: Item }
}
// 定义reducer函数action类型
type ActionType = AddItemAction | DelItemAction | UpdateItemAction
// 定义Example Reducer函数类型,该类型作为useReducer的泛型
type ExampleReducer = Reducer<StateType, ActionType>
/*********************** TS类型定义 ***************************** */

/**
 * 定义reducer函数,reducer函数接收state和action两个参数,state表示处理的状态,
 * action表示处理状态的行为。
 * @param state reducer函数的处理状态。
 * @param action reducer行为函数,action是一个包含type和payload属性的对象,
 * type表示触发行为的类型,payload表示需要的载荷(即所需数据)。
 * @returns 返回处理后的状态(state)
 */
function reducer(state: StateType, action: ActionType) {
  switch (action.type) {
    case 'add': {
      return [...state, action.payload]
    }
    case 'del': {
      return state.filter((_, index) => index !== action.payload)
    }
    case 'update': {
      const { index, item } = action.payload
      /**
       * 由于reducer()是一个纯函数,直接修改state是无效的,应返回一个新的state。
       * 浅拷贝一份数据生成一个新数组,使用数组解构或者state.slice(0)都可以浅拷贝一份数据
       */
      const newState = [...state]
      newState[index] = item
      return newState
    }
    default:
      return state
  }
}

const initialList = [{ name: 'name_1', address: 'address_1' }]
function Example() {
  console.log('render...')
  /**
   * useReducer()返回一个数组,该数组由处理状态(state)和调度函数(dispatch)组成,调度函数
   * 用于触发reducer函数,注意该调度函数会触发组件重新渲染,即使state未发生变化的情况仍会
   * 导致组件重新渲染,使用调度函数时需要指定action对象(即type和payload)。
   */
  const [list, dispatch] = useReducer<ExampleReducer>(reducer, initialList)

  const len = list.length
  const handleAdd = () => {
    // 触发reducer函数中的"add"分支逻辑
    dispatch({
      type: 'add',
      payload: { name: `name_${len + 1}`, address: `address_${len + 1}` },
    })
  }
  const handleDel = (index: number) => {
    // 触发reducer函数中的"del"分支逻辑
    dispatch({ type: 'del', payload: index })
  }
  const handleUpdate = (index: number) => {
    // 触发reducer函数中的"update"分支逻辑
    dispatch({
      type: 'update',
      payload: {
        index: index,
        item: { name: 'namexxxx', address: 'addressxxxx' },
      },
    })
  }

  return (
    <div>
      <button onClick={handleAdd}>addItem</button>
      <ul>
        {list.map((item, index) => {
          return (
            <li key={index}>
              <span>
                name:{item.name},address:{item.address}
              </span>
              <button onClick={() => handleDel(index)}>delItem</button>
              <button onClick={() => handleUpdate(index)}>uploadItem</button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Example
```

### 8.2 useReducer() + useContext()实现状态管理

```tsx
import React, { Dispatch, PropsWithChildren, Reducer, useContext, useReducer } from 'react'

// (1).声明状态类型
interface State {
  count: number
}

// (2).声明Reducer action类型,可以将类型更加细化,例如{type:"add";payload?: Partial<State>;}
type ActionType = {
  type: string
  payload?: Partial<State>
}

// (3).声明React Context类型
interface Context {
  // 状态
  state: State
  // reducer返回的调度函数
  dispatch: Dispatch<ActionType>
}

// (4).创建React Context,指定Context泛型类型并设置Context默认值
const Context = React.createContext<Context>({
  state: { count: 1 },
  dispatch: () => {},
})

// (3).声明Context提供者
const ContextProvider: React.FC<PropsWithChildren> = (props) => {
  // 声明reducer函数
  function reducer(state: State, action: ActionType) {
    const type = action.type
    switch (type) {
      case 'increment':
        return { ...state, count: state.count + 1 }
      case 'decrement':
        return { ...state, count: state.count - 1 }
      default:
        return state
    }
  }
  const [state, dispatch] = useReducer<Reducer<State, ActionType>>(reducer, {
    count: 1,
  })
  return <Context.Provider value={{ state, dispatch }}>{props.children}</Context.Provider>
}

// (4).创建消费者组件
function Consumer() {
  const { state, dispatch } = useContext<Context>(Context)
  return (
    <div>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <span>count:{state.count}</span>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <div>Example</div>
    </div>
  )
}

function Example() {
  return (
    <ContextProvider>
      <Consumer />
    </ContextProvider>
  )
}

export default Example
```

## 9.useImperativeHandle()

useImperativeHandle()用于根据 ref 暴露组件的属性和方法,通常搭配 forwardRef()一起使用。forwardRef()负责转发 ref,useImperativeHandle()根据转换 ref 对外暴露属性和方法。useImperativeHandle()函数签名如下:

```ts
function useImperativeHandle<T, R extends T>(
  ref: Ref<T> | undefined,
  init: () => R,
  deps?: DependencyList,
): void
```

useImperativeHandle()接收 T 和 R 两个泛型参数,T 表示 Ref 的泛型类型,R 表示初始化函数的返回值类型,其中 R 继承自 T 类型。useImperativeHandle()参数说明如下:

- ref:外部转发的 Ref 对象,是 forwardRef()回调函数的第二个入参。
- init:一个不带任何入参的初始化函数,用于对外暴露属性和方法。
- deps:依赖项数组(可选)。依赖项可以是组件的 props、state 或者函数中声明的变量或函数,React 通过 Object.is()比较依赖项是否发生变化,如果依赖项发生变化或者未指定依赖项时,init()将重新被执行,并且新创建的句柄(方法、属性)将分配给 ref。

```tsx
import React, { useRef, forwardRef, useImperativeHandle, RefAttributes } from 'react'

interface ChildProps {}

interface ChildRef {
  sayHi: () => void
}

/**
 * forwardRef(function render(){})用于接收外部传递的ref并转发至组件内部。
 * 通常forwardRef()和useImperativeHandle()搭配使用,forwardRef()转发外部
 * 传递的ref,而useImperativeHandle()根据转发的ref,对外暴露方法或属性。
 * forwardRef<T, P = {}>(render: ForwardRefRenderFunction<T, P>)
 * 支持T和P两个泛型参数,T表示渲染组件的Props类型,P表示转发Ref的类型。forwardRef()
 * 接收一个渲染函数用于渲染组件内容,渲染函数接收组件props和转发的ref两个参数。
 */
const Child = forwardRef<ChildProps, RefAttributes<ChildRef>>(function Child(props, ref) {
  /**
   * useImperialeHandle()根据ref向父组件的暴露方法或属性,useImperativeHandle<T, R extends T>
   * (ref: Ref<T>|undefined, init: () => R, deps?: DependencyList)参数如下:
   * - ref:forwardRef转发的ref。即从forwardRef()接收渲染函数的第二个参数。
   * - init:一个不带参数并返回要公开的引用句柄的函数。对外暴露方法和属性的函数。
   * - deps:依赖项数组。React通过Object.is()比较依赖项数组中每个依赖,
   * 如果依赖项数组中的依赖发生变化或依赖项为空,组件重新渲染会导致useImperialeHandle()
   * 重新被执行,并且新创建的句柄将分配给ref。
   */
  useImperativeHandle(ref, () => {
    return {
      sayHi() {
        console.log('sayHi...')
      },
    }
  }, [])
  return <div>child</div>
})

function Parent() {
  const childRef = useRef<ChildRef>(null)
  const sayHi = () => {
    // 使用子组件暴露的sayHi()函数
    childRef.current?.sayHi() // sayHi...
  }
  return (
    <div>
      <Child ref={childRef} />
      <button onClick={sayHi}>sayHi</button>
    </div>
  )
}
export default Parent
```

## 10.useDeferredValue()

useDeferredValue(value)用于在组件中或目标值(value)的延迟版本。在首次渲染期间,返回的延迟值(deferredValue)将与提供值(value)相同。在更新期间,React 将首先尝试使用旧值(value 更新前的值)重新渲染(此时返回值将与旧值相等),然后尝试在后台使用新值重新渲染(因此返回值将与更新后的值相同)。useDeferredValue()函数签名如下:

```ts
function useDeferredValue<T>(value: T): T
```

### 10.1 useDeferredValue() + Suspense

### 10.2 useDeferredValue()降低渲染优先级实现渲染优化

在根据 input 输入的查询内容(query)搜索数据列表场景下,渲染分为两个子任务,即更新查询内容和更新数据列表,在未使用 useDeferredValue()情况下,更新数据列表的优先级高于更新查询内容,此时 input 输入内容时会变得非常卡顿,这是因为更新数据列表处理时间过长会阻塞更新查询内容。使用 useDeferredValue()优化后并不能提升任务的渲染性能,但 useDeferredValue()可以降低任务的渲染优先级,在一些渲染耗时长、计算量大的任务页面流畅度有极大提升。

- 不使用 useDeferredValue()渲染列表:列表状态的更新会阻塞 input 输入状态更新,此时输入非常卡顿。

```tsx
import React, { useDeferredValue, useState } from 'react'

function SlowItem({ text }: { text: string }) {
  let startTime = performance.now()
  // 故意使组件渲染变慢
  while (performance.now() - startTime < 3) {}
  return <li>text:{text}</li>
}

const SlowList = React.memo(function SlowList({ query }: { query: string }) {
  const items = Array.from({ length: 300 })
    .map((_, index) => `text_${index}`)
    .filter((item) => item.includes(query))
  return (
    <ul>
      {items.map((item, index) => {
        return <SlowItem key={index} text={item} />
      })}
    </ul>
  )
})

function Example() {
  const [query, setQuery] = useState('')
  // const deferredQuery = useDeferredValue(query);
  return (
    <div>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <SlowList query={query} />
    </div>
  )
}

export default Example
```

- 使用 useDeferredValue()渲染列表后,input 输入更加流畅了:

```tsx
import React, { useDeferredValue, useState } from 'react'

function SlowItem({ text }: { text: string }) {
  let startTime = performance.now()
  // 故意使组件渲染变慢
  while (performance.now() - startTime < 3) {}
  return <li>text:{text}</li>
}

const SlowList = React.memo(function SlowList({ query }: { query: string }) {
  const items = Array.from({ length: 300 })
    .map((_, index) => `text_${index}`)
    .filter((item) => item.includes(query))
  return (
    <ul>
      {items.map((item, index) => {
        return <SlowItem key={index} text={item} />
      })}
    </ul>
  )
})

function Example() {
  const [query, setQuery] = useState('')
  /**
   * 定义延迟值,SlowList组件使用了deferredQuery,渲染优先级低于input输入,
   * 因此input输入显得更加流畅
   */
  const deferredQuery = useDeferredValue(query)
  return (
    <div>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <SlowList query={deferredQuery} />
    </div>
  )
}

export default Example
```

## 11.useTransition()

useTransition()是一个 任务优先级相关的 Hooks,用于降低更新操作的优先级,允许在不阻塞 UI 的情况下更新状态。useTransition()签名如下:

```ts
export function useTransition(): [boolean, TransitionStartFunction]
```

useTransition()不接收任何参数,返回一个两个元素的数组:

- isPending:一个布尔值,表示是否有待处理的 transition(过渡)。
- startTransition:一个函数,用于将状态更新标记为 transition(过渡),React 会以一个较低的优先级调度被它包装的更新操作。

下面示例中,当 input 进行输入时会从 5 万个数字进行过滤并展示结果,由于过滤的数据量比较大,输入 input 时会有明显的卡顿,这是因为输入 input 时会触发 onChange 事件并修改 query 的状态值,而 setState 的修改操作是同步更新的,会导致长时间占用主线程,无法及时响应 input 输入。可以把更新状态和 input 输入分为两个任务,由于更新状态是同步执行的,因此优先级高于 input 输入,大量计算会导致 input 响应延迟,因此降低更新状态的优先级能很大程度上避免 input 输入卡顿。

```tsx
import { useState, ChangeEvent } from 'react'

const numbers = [...new Array(50000).keys()]

function App() {
  const [query, setQuery] = useState('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  return (
    <div>
      <input type="number" onChange={handleChange} />
      <div>
        {numbers.map((i, index) =>
          query ? i.toString().startsWith(query) && <p key={index}>{i}</p> : <p key={index}>{i}</p>,
        )}
      </div>
    </div>
  )
}

export default App
```

使用 useTransition()返回 isPending 和 startTransition()函数两个元素,在 startTransition()函数中执行状态更新以降低任务优先级,通过 isPending 可以判断 React 中是否还有等待的任务,以此来决定是否更新 UI。通过 useTransition()优化后,降低了更新操作的优先级,确保了用户和输入框的交互操作保持流畅。

```tsx
import { useState, ChangeEvent, useTransition } from 'react'

const numbers = [...new Array(50000).keys()]
function App() {
  const [query, setQuery] = useState('')

  const [isPending, startTransition] = useTransition()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    startTransition(() => {
      setQuery(e.target.value)
    })
  }

  const list = numbers.map((i, index) =>
    query ? i.toString().startsWith(query) && <p key={index}>{i}</p> : <p key={index}>{i}</p>,
  )

  return (
    <div>
      <input type="number" onChange={handleChange} />
      <div>{isPending ? 'Loading...' : list}</div>
    </div>
  )
}
export default App
```

## 12.useId()

useId()用于在组件顶层生成唯一 id,通常用于元素的可访问属性,以保证属性值的唯一性,例如 id 属性。React 并不推荐使用 useId()生成的唯一 id 作为绑定 key 的值。

```tsx
import React, { useId } from 'react'

function Example() {
  const inputId = useId()
  console.log(inputId) // :r0:
  return (
    <div>
      <input id={inputId} />
    </div>
  )
}

export default Example
```

## 13.自定义 Hooks

Hooks 可以简单理解为包含组件相关逻辑的工具函数,虽然 React 有很多开源 Hooks 库(例如 Ahooks、ReactUse 等等),但是在实际开发中,需要根据业务逻辑自定义 Hooks。

### 13.1 useMounted、useUnMounted

useEffect()除了监听状态外,也可以模拟组件挂载和卸载钩子,但是 useEffect()写法比较复杂,可以通过 useEffect 自定义挂载 Hook 和卸载 Hook。

```ts
import { useEffect } from 'react'
type Fn = () => void

export function useMounted(fn: Fn) {
  useEffect(() => fn(), [])
}

export function useUnMounted(fn: Fn) {
  useEffect(() => {
    return () => fn()
  }, [])
}
```
