redux-toolkit 是一个 Redux 工具库,旨在于以标准的方式去编写 Redux 逻辑,redux-toolkit 工具库包含了状态管理功能和 RTK Query,其中 RTK Query 作为@reduxjs/toolkit 软件包中的可选插件,它专为解决数据获取和缓存的用例而构建,提供了一个紧凑但功能强大的工具集来为您的应用程序定义 API 接口层。它旨在简化在 Web 应用程序中加载数据的常见情况,消除自己手写数据获取和缓存逻辑的需要。redux-toolkit 解决了使用 Redux 过程中带来三个问题:

- 配置 Redux Store 繁琐。在 Redux Store 中创建 Reducer、Action 是比较复杂的,结合 TypeScript 更是繁杂。redux-toolkit 由 TypeScript 开发,对 TypeScript 支持非常友好。
- Redux 仅支持派发同步 Action。Redux 本身是不支持处理异步 Action 的,需要借助外部依赖如 redux-thunk、redux-saga 提供额外的解决方案,除此之外可能还需要 reselect、immer 等依赖对 Redux 应用进行性能优化。redux-toolkit 内部集成了 redux、reselect、redux-thunk、immer 依赖,开发 Redux 应用变得更加便捷。
- 编写 Redux 应用需要太多模板代码。例如 action、reduce、异步 action 等等。在 redux-toolkit 提供了切片的概念(类似于模块),在切片中可通过 options(选项)形式定义 action、reduce、异步 action。

## redux-toolkit

### redux-toolkit 核心概念

- slice(切片):redux-toolkit 类似于模块的概念,createSlice()可以根据 options 创建一个 slice,options 包括 name、initialState、reducer、extraReducers。
  - name:切片名称,是切片的唯一标识,action 的 type 将以切片名称作为前缀拼接。例如切片名为 "user",action 为 "changeName",dispatch()派发时最终的 action Type 是 "user/changeName"。
  - initialState:切片的初始化状态。
  - reducers:reducer 的集合,用于配置一个或多个 reducer,reducer 由 key-value 结构组成,key 为 action 的 type,value 为匹配 action type 时处理的函数。
  - extraReducers:扩展的 reducer 集合,用于处理异步逻辑,例如发送接口请求获取数据。
- action(操作):Redux 的执行操作,由 type(操作类型)和 payload(载荷,可通过载荷获取参数)组成的对象。在 redux-toolkit 中可通过 createAction()创建 action,createAction()接收 type 和 prepareAction 两个参数,其中 type 是 Action 的 type,prepareAction 是用于构造 action 创建者函数(可选),该函数必须返回一个包含 payload 属性的对象。createAction()一般搭配 createReducer()使用。

```ts
import { createAction } from "@reduxjs/toolkit";

// 泛型约束payload是一个number类型
const increment = createAction<number | undefined>("counter/increment");
console.log(increment); // "counter/increment"
console.log(increment()); // "counter/increment"
console.log(increment(3)); // { type: 'counter/increment', payload: 3 }
console.log(increment.toString())  "counter/increment"



// 构建action函数必须返回一个包含payload的对象
const getName = createAction("getName", (name: number) => {
  return {
    // payload是必须的
    payload: {
      name,
      date: "2020-02-02",
    },
  };
});
console.log(getName("哈哈"));
/*
 * {
     type:"getName",
     payload:{
        name:"哈哈",
        date:"2020-02-02"
     }
   }
 */
```

- reducer(减速器):reducer 是当 dispatch() action Type 匹配的处理函数,在 redux-toolkit 中 reducer 通过 reducers 选项配置,每个 reducer 由 key-value 结构组成,key 是 reducer 对应的 action Type,value 是其匹配的处理函数,处理函数接收 state 和 action 两个参数,与 Redux 不同的是在 redux-toolkit 可以直接修改 state,redux-toolkit 内部集成 Immer 使 state 从不可变变为可变。可以通过 createReducer()创建 Reducers 集合,createReducer()支持构造器和 map 两种写法,一般推荐构造器写法,构造器的写法对 TypeScript 支持非常友好。

- thunk:用于异步 Action 的函数。在 redux-toolkit 通过 createAsyncThunk()创建,它接收 type(action Type)、payloadCreator、options(配置选项)三个参数。

  - type:action Type。
  - payloadCreator:回调函数,包含 arg 和 thunkAPI 两个参数,arg 用于获取 thunk 函数的入参,thunkAPI 包含传递给 Redux thunk 函数的所有参数的对象。payloadCreator 一般返回一个包含一些异步逻辑结果的 Promise,也可以同步返回一个值,如果出现错误,它应该返回一个 reject 状态包含 Error 实例的 Promise 或一个普通值,或者返回一个 fulfilled 状态带有函数 thunkAPI.rejectWithValue 函数结果的 Promise。

- dispatch:用于派发 action 函数,当匹配 action Type 时就会调用对应的 reducer 函数,从而修改 state。可以通过 react-redux 的 useDipatch()创建 dispatch 函数,为了易用性通常会为 useDipatch()添加泛型约束,例如:`const useAppDispatch = () => useDispatch<AppDispatch>()`。

### 快速开始

使用 redux-toolkit 步骤如下:

- 步骤 1:安装 redux-toolkit 和 redux-react 依赖。
- 步骤 2:通过 configureStore()并传入 reducer 创建 Store。导出根状态类型(RootState)和根 Dipatch 类型(AppDispatch)。
- 步骤 3:创建 Store 相关 hooks 简化使用方式。
- 步骤 4:通过 createSlice() 创建 slice。createSlice()可以提供了 name(切片名称,切片的标识)、initialState(切片的初始状态)、reducers(reducer 操作)、extraReducers(扩展的 reducer 操作,用于处理异步 Action)等配置。创建 createSlice()后需要将切片的 reducer 和 action 导出以供其他模块使用。
- 步骤 5:使用 redux-react 提供的 Provider 组件包裹需要状态管理的区域,并绑定 store。
- 步骤 6:使用 useAppDispatch()创建 dispatch 函数,通过 dispatch()派发相应 action 函数。

#### 安装依赖

```shell
# react-redux是redux连接react工具库
yarn add @reduxjs/toolkit react-redux

# 安装node TypeScript类型声明
yarn add  @types/node --dev
```

#### 通过 configureStore()创建 Store

```ts
// src/store/index.ts
import { configureStore } from "@reduxjs/toolkit";
// 引入User切片的Reducer
import UserReducer from "./slices/user";
export const store = configureStore({
  reducer: {
    user: UserReducer,
  },
  // 一个可选的 Redux 中间件函数数组
  // middleware: [],
  // 传递给 Redux createStore()的可选初始状态值
  preloadedState: {},
  // Redux 存储增强器的可选数组,或用于自定义增强器数组的回调函数
  enhancers: [],
  // 是否自动启用Redux DevTools 浏览器扩展的支持(默认true)
  devTools: process.env.NODE_ENV !== "production",
});

// 导出根状态类型
export type RootState = ReturnType<typeof store.getState>;
// 根Dispatch
export type AppDispatch = typeof store.dispatch;
```

#### 创建 Store 相关 Hook 简化使用方式

```ts
// src/store/hook.ts

/**
 * 虽然RootState和AppDispatch类型可以导入每个组件,但创建类型化版本的useDispatch
 * 和useSelector钩子具有如下优点:
 * (1).使用useSelector时,无需(state: RootState)每次都导入。
 * (2).由于默认Dispatch类型不知道 thunk,为了正确分派 thunk函数,需要使用store中包含 thunk
 * 中间件类型的特定自定义类型,添加预先导入的useDispatch hook可防止忘记AppDispatch在需要的地方导入。
 */
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./index";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

#### 通过 createSlice()创建切片

```ts
// src/store/slices/user/index.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../index";

interface UserState {
  count: number;
  name: string;
  list: Array<any>;
}
const initialState: UserState = {
  count: 0,
  name: "",
  list: [],
};

/**
 * slice(切片)类似于Store下的模块概念,在切片可定义state、reducer、action。
 */
const userSlice = createSlice({
  /**
   * 切片名称,切片的标识,切片名称会作为action的前缀,例如dispatch(increment()),
   * action的type为user/increment。
   */
  name: "user",
  // 切片的初始状态
  initialState,
  /**
   * reduces(减速器)是一个对象,以action名称为key,以reducers处理函数为value。
   * 该处理函数接收state与action两个参数,state可以获取到当前slice中所有的状态,
   * action也是一个对象,包含type和payload两个属性,其中type表示派发action的类型,
   * payload是派发action时传递的载荷(或者叫参数)。action可通过PayloadAction泛型类型
   * 推断payload的类型。
   */
  reducers: {
    increment(state) {
      console.log(state);
      state.count += 1;
    },
    decrement(state) {
      state.count -= 1;
    },
    // 通过PayloadAction泛型类型约束action payload 类型
    incrementByAmount(state, action: PayloadAction<number>) {
      // action.type 由 slice名称 + "/" + action名称组成,例如:user/incrementByAmount
      console.log(action.type);
      state.count += action.payload;
    },
  },
  /**
   * 即扩展的reducer,一般用于处理异步逻辑,例如发送接口请求获取数据,
   * 根据响应数据更新Store的state。
   */
  extraReducers: {},
});

/**
 * 为每个reducer 生成 action函数,当需要修改状态时可通过dispatch()派发对应的action。
 * counterSlice.actions中的action来源于createSlice配置对象中reducer的key名称。
 */
export const { increment, decrement, incrementByAmount } = userSlice.actions;

// 导出reducer
export default userSlice.reducer;
```

#### 使用 Provider 组件包裹子组件并传入 store

```tsx
// src/main.tsx

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import App from "./App";
ReactDOM.render(
  <React.StrictMode>
    {/* 传入store */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
```

#### 使用 useAppDispatch()创建 dispatch(),通过 dispatch()派发响应 action 函数

```tsx
import React from "react";
import { useAppSelector, useAppDispatch } from "./store/hook";
import { RootState } from "./store";
import { increment, decrement, incrementByAmount } from "./store/slices/user";

function App() {
  // 通过useSelector()创建selector
  const { list, count } = useAppSelector(
    (rootState: RootState) => rootState.user
  );
  // 通过useDispatch()创建dispatch函数
  const dispatch = useAppDispatch();

  return (
    <div>
      {/* 通过dispatch()派发decrement action函数 */}
      <button onClick={() => dispatch(decrement())}>减1</button>
      <span>用户人数:{count}</span>
      <button onClick={() => dispatch(increment())}>加1</button>
      {/* 通过dispatch()派发incrementByAmount action函数并传入参数 */}
      <button onClick={() => dispatch(incrementByAmount(3))}>加3</button>
    </div>
  );
}

export default App;
```

### 派发异步 Action

redux-toolkit 提供 createThunk() 处理异步逻辑。
