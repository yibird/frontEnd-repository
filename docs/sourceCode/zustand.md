Zustand内部使用了分层架构和中间件模式，将核心逻辑和扩展功能分开，实现了模块化和高可扩展性。主要由三个核心文件组成:

- vanilla.ts：核心store的实现
- react.ts：连接react环境
- Middleware: 中间件

```ts
type SetStateInternal<T> = {
  _(partial: T | Partial<T> | { _(state: T): T | Partial<T> }['_'], replace?: false): void
  _(state: T | { _(state: T): T }['_'], replace: true): void
}['_']

export interface StoreApi<T> {
  setState: SetStateInternal<T>
  getState: () => T
  getInitialState: () => T
  subscribe: (listener: (state: T, prevState: T) => void) => () => void
}

export type ExtractState<S> = S extends { getState: () => infer T } ? T : never

type Get<T, K, F> = K extends keyof T ? T[K] : F

export type Mutate<S, Ms> = number extends Ms['length' & keyof Ms]
  ? S
  : Ms extends []
    ? S
    : Ms extends [[infer Mi, infer Ma], ...infer Mrs]
      ? Mutate<StoreMutators<S, Ma>[Mi & StoreMutatorIdentifier], Mrs>
      : never

export type StateCreator<
  T,
  Mis extends [StoreMutatorIdentifier, unknown][] = [],
  Mos extends [StoreMutatorIdentifier, unknown][] = [],
  U = T,
> = ((
  setState: Get<Mutate<StoreApi<T>, Mis>, 'setState', never>,
  getState: Get<Mutate<StoreApi<T>, Mis>, 'getState', never>,
  store: Mutate<StoreApi<T>, Mis>
) => U) & { $$storeMutators?: Mos }

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-object-type
export interface StoreMutators<S, A> {}
export type StoreMutatorIdentifier = keyof StoreMutators<unknown, unknown>

type CreateStore = {
  <T, Mos extends [StoreMutatorIdentifier, unknown][] = []>(
    initializer: StateCreator<T, [], Mos>
  ): Mutate<StoreApi<T>, Mos>

  <T>(): <Mos extends [StoreMutatorIdentifier, unknown][] = []>(
    initializer: StateCreator<T, [], Mos>
  ) => Mutate<StoreApi<T>, Mos>
}

type CreateStoreImpl = <T, Mos extends [StoreMutatorIdentifier, unknown][] = []>(
  initializer: StateCreator<T, [], Mos>
) => Mutate<StoreApi<T>, Mos>

/**
 * zustand的核心store实现
 */
const createStoreImpl: CreateStoreImpl = createState => {
  // 1.根据createState函数推断其返回值类型
  type TState = ReturnType<typeof createState>
  // 2.定义监听器类型
  type Listener = (state: TState, prevState: TState) => void
  // 3.状态变量：存储当前状态
  let state: TState
  // 4.定义监听器容器存储监听者
  const listeners: Set<Listener> = new Set()

  // 5.设置状态方法
  const setState: StoreApi<TState>['setState'] = (partial, replace) => {
    // 5.1 计算新状态,如果partial是一个函数,则调用函数并传入当前状态并获取函数的返回值,否则直接赋值
    const nextState =
      typeof partial === 'function' ? (partial as (state: TState) => TState)(state) : partial
    // 5.2 浅比较优化只有状态真正变化时才更新
    if (!Object.is(nextState, state)) {
      // 5.3 存储旧状态,用于后续通知监听者
      const previousState = state
      // 5.4 更新状态,如果replace为true或nextState不是对象或null,则直接赋值,否则使用Object.assign合并状态
      state =
        (replace ?? (typeof nextState !== 'object' || nextState === null))
          ? (nextState as TState)
          : Object.assign({}, state, nextState)
      // 5.5 通知所有监听器
      listeners.forEach(listener => listener(state, previousState))
    }
  }

  // 6.getState用于返回当前状态
  const getState: StoreApi<TState>['getState'] = () => state

  // 7. getInitialState 函数：返回初始状态
  const getInitialState: StoreApi<TState>['getInitialState'] = () => initialState

  // 8. subscribe 函数：订阅状态变化
  const subscribe: StoreApi<TState>['subscribe'] = listener => {
    listeners.add(listener)
    // 利用闭包特性,返回取消订阅函数
    return () => listeners.delete(listener)
  }

  // 9.创建api对象
  const api = { setState, getState, getInitialState, subscribe }
  // 10. 关键步骤：初始化状态
  const initialState = (state = createState(setState, getState, api))
  // 11.返回api
  return api as any
}

export const createStore = (createState =>
  createState ? createStoreImpl(createState) : createStoreImpl) as CreateStore
```

在状态管理中，通过一个闭包 let state来实现内部的状态存储，使用 Set 来存储 listeners，解决了重复订阅的问题，同时Object.assign({}, state, nextState) 创建一个新的对象确保了state的浅层不可变。

需要非常注意的是,Zustand内部 const initialState = (state = createState(setState, getState, api)) 代码实现了控制反转的设计模式即用户决定状态结构,Store提供了基础设施。Zustand在业务代码中注入了三个关键的内部api:

- setState: 状态更新函数
- getState: 状态获取函数
- api: 完整的Store API
