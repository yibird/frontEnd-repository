## TypeScript 和 React 结合

## 定义组件

React 内部提供如下类型来定义组件:

- **Component<P = {}, S = any>**:Component 是 React 提供用于创建 class 组件的父类,它接收两个泛型用于约束 Props 和 State 的类型。
- **ComponentClass<P = {}, S = any>**:ComponentClass 是一个接口,用于定义 Class 类型的组件,它接收两个泛型,泛型 1 为类组件的 Props 类型,泛型 2 为类组件的 State 类型。
- **FunctionComponent<P = {}>**:FunctionComponent 用于函数式类型的组件,它接收一个泛型,用于定义函数式组件 Props 的类型。
- **FC<P = {}>**:FC 是 FunctionComponent 的别名,FC 的内部实现为`type FC<P = {}> = FunctionComponent<P>`。

<CodeGroup>
<CodeGroupItem title="定义Class Component" active>

```tsx
import React, { Component, ReactNode } from "react";
interface Props {
  title: string;
  data?: Array<Record<string, any>>;
  footer?: ReactNode;
}
interface State {
  name: string;
  list: Array<Record<string, any>>;
}
export default class App extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      name: "zchengfeng",
      list: [{ name: "xxx", age: 20 }],
    };
  }
  render() {
    return <div></div>;
  }
}
```

</CodeGroupItem>
<CodeGroupItem title="定义Function Component">

```tsx
import React, { FC, ReactNode, useState } from "react";

interface Props {
  title: string;
  data: Array<Record<string, any>>;
  footer?: ReactNode;
}
interface State {
  name: string;
  list: Array<Record<string, any>>;
}
// 函数式组件可省略FC<Props>
const App: FC<Props> = (props: Props) => {
  const [state, setState] = useState<State>({
    name: "zchengfeng",
    list: [],
  });
  return <div></div>;
};
export default App;
```

</CodeGroupItem>
</CodeGroup>

## 定义 Props

```ts
interface AppProps {
  /**
   * JSX.Element的返回值是React.createElement,通常表示一个节点,
   * 例如HTML5的原生标签,<div>、<span>等等
   */
  element1: JSX.Element; // 坏的,不考虑数组情况
  element2: JSX.Element | JSX.Element[]; // 好的,但不接受字符串

  // React.ReactChildren表示组件children的类型
  children1: React.ReactChildren; // 坏的,不考虑children数组
  children2: React.ReactChild[]; // 好的,接收children数组

  /**
   * React.ReactNode表示组件所有可能的返回值的集合,一般使用React.ReactNode表示组件
   */
  component01: React.ReactNode; // 最好的,接收一切
  component02: (name: string) => React.ReactNode; // 函数式组件
  /**
   * React.ElementType可以作为HTML5原生标签的类型,
   * 又可以作为组件(class和函数式组件)的类型
   */
  component03: React.ElementType;

  // React.CSSProperties类型包含CSS所以样式属性
  styles: React.CSSProperties;

  /**
   * 由于React中的事件是合成事件,onClick属于Mouse Events事件,所以使用React.MouseEvent
   * 可以表示onClick事件对象的类型,React.MouseEvent允许接收两个泛型参数,
   * 泛型1表示e.target的类型,泛型2表示事件对象类型。
   */
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  /**
   * onChange属于表单类型,事件对象类型为FormEventHandler,FormEventHandler也接收两个泛型,
   * 泛型1为触发元素的类型,这里通过input元素进行触发,所以类型为HTMLInputElement。
   * 泛型2为表示事件对象类型。
   */
  onChange?: (e: React.FormEventHandler<HTMLInputElement>) => void; // form表单事件

  /**
   * ComponentPropsWithoutRef 模拟元素的props但不转发ref。
   * ComponentPropsWithRef 模拟元素的props并显示转发ref。
   */
  ref1: React.ComponentPropsWithoutRef<"button">;
  ref2: React.ComponentPropsWithRef<"div">;
}
```
