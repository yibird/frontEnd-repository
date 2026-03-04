## 1.什么是高阶组件?

高阶函数是指接收一个函数做为参数或返回一个新的函数的函数,而高阶组件(HOC)是指**高阶组件是参数为组件,返回值为新组件的函数。**高阶组件(HOC)是 React 中用于复用组件逻辑的一种高级技巧。HOC 自身不是 React API 的一部分,它是一种基于 React 的组合特性而形成的设计模式。HOC 支持两种写法:

- **继承 React.Component 类**。

```tsx
import React, { ComponentType } from 'react'

// 高阶组件Props
type HOCProps = { desc: string }

function HOC<T extends HOCProps>(WrappedComponent: ComponentType<T>) {
  return class extends React.Component<Omit<T, keyof HOCProps>> {
    constructor(props: T) {
      super(props)
    }
    render() {
      return <WrappedComponent {...(this.props as T)} desc="wrapper component" />
    }
  }
}

// 自定义一个组件
type MyComponentProps = { name: string }
function MyComponent(props: MyComponentProps & HOCProps) {
  return <div>{props.name}</div>
}
// 通过HOC返回一个新的组件
const EnhancedMyComponent = HOC(MyComponent)
// 渲染HOC返回的组件
function App() {
  return <EnhancedMyComponent name="John" />
}
```

- **函数式高阶组件**。

```tsx
import React, { ComponentType } from 'react'

// 高阶组件Props
type HOCProps = { desc: string }
/**
 * 定义高阶组件。使用<T extends HOCProps>约束HOC组件的Props继承自HOCProps。
 * @param WrappedComponent:被高阶组件包装的组件,其类型为ComponentType,
 * ComponentType接收一个泛型用于作为组件的Props类型。
 */
function HOC<T extends HOCProps>(WrappedComponent: ComponentType<T>) {
  // 返回一个新的组件
  return function (props: Omit<T, keyof HOCProps>) {
    return <WrappedComponent {...(props as T)} desc="wrapper component" />
  }
}

// 自定义一个组件
type MyComponentProps = { name: string }
function MyComponent(props: MyComponentProps & HOCProps) {
  return <div>{props.name}</div>
}
// 通过HOC返回一个新的组件
const EnhancedMyComponent = HOC(MyComponent)
// 渲染HOC返回的组件
function App() {
  return <EnhancedMyComponent name="John" />
}
```

## 2.HOC 的应用场景

### 2.1 代码重用

将通用的功能逻辑封装在 HOC 中,可以在多个组件之间共享这些功能,从而减少重复代码的编写。在提交表单场景中,由于 Input 组件和 Select 都需要做非空验证,可以使用 HOC 来封装通用的验证逻辑。

```jsx
import React, { Component } from 'react'

// 定义一个高阶组件用于表单验证
const withFormValidation = (WrappedComponent) => {
  return class extends Component {
    constructor(props) {
      super(props)
      this.state = {
        value: '',
        isValid: true,
      }
    }

    handleChange = (event) => {
      const value = event.target.value
      // 假设只有非空值才是有效的
      const isValid = value.trim() !== ''
      this.setState({ value, isValid })
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          value={this.state.value}
          isValid={this.state.isValid}
          onChange={this.handleChange}
        />
      )
    }
  }
}

// 创建一个普通的输入组件
const Input = ({ value, isValid, onChange }) => (
  <input
    type="text"
    value={value}
    onChange={onChange}
    style={{ borderColor: isValid ? 'green' : 'red' }}
  />
)

const Select = ({ value, isValid, onChange }) => (
  <Select value={value} onChange={onChange} style={{ borderColor: isValid ? 'green' : 'red' }} />
)

// 使用 HOC 包装Input和Select组件
const InputWithValidation = withFormValidation(Input)
const SelectWithValidation = withFormValidation(Select)

// 在应用中使用包装后的组件
function App() {
  return (
    <div>
      <InputWithValidation />
      <ButtonWithValidation value="Submit" />
    </div>
  )
}
export default App
```

### 2.2 属性代理

- 属性代理是最常见的实现方式,它本质上是使用组合的方式,通过将组件包装在容器组件中实现功能。
- 属性代理方式实现的高阶组件和原组件的生命周期关系完全是 React 父子组件的生命周期关系,所以该方式实现的高阶组件会影响原组件某些生命周期等方法。

#### 2.2.1 增强 Props

高阶组件最常用的功能是承接上层的 props,在混入 HOC 内部的 state,来增强组件。

```tsx
import React, { ComponentType, useState } from 'react'

type WrappedCompProps = { name: string } & { age: number }

function HOC(WrappedComponent: ComponentType<WrappedCompProps>) {
  // HOC组件内部定义状态
  const [state, setState] = useState({ age: 18 })
  return (props: Omit<WrappedCompProps, 'age'>) => {
    return <WrappedComponent {...props} {...state} />
  }
}

function MyComponent(props: WrappedCompProps) {
  return (
    <div>
      name:{props.name},age:{props.age}
    </div>
  )
}
const EnhancedMyComponent = HOC(MyComponent)
function App() {
  return <EnhancedMyComponent name="John" />
}
```

#### 2.2.2 抽象 state

需要注意的是,通过属性代理方式实现的高阶组件无法直接操作原组件的 state,但是可以通过 props 和回调函数对 state 进行抽象,常见的例子是实现非受控组件到受控组件的转变。

```tsx
// 高阶组件
function HOC(WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props)
      this.state = { name: '' }
      this.onChange = this.onChange.bind(this)
    }

    onChange = (event) => {
      this.setState({
        name: event.target.value,
      })
    }

    render() {
      // 对WrappedComponent组件提供了修改state的回调函数用于修改HOC组件内部的状态
      const newProps = {
        name: {
          value: this.state.name,
          onChange: this.onChange,
        },
      }
      return <WrappedComponent {...this.props} {...newProps} />
    }
  }
}

// 使用
@HOC
class Example extends Component {
  render() {
    return <input name="name" {...this.props.name} />
  }
}
```

#### 2.2.3 通过 Props 实现条件渲染

通过属性代理方式实现的高阶组件无法直接实现对原组件进行渲染劫持(即对原组件内部 render 的控制并不是很强),但可以通过外部传入的 Props 来控制是否渲染及传入数据。

```tsx
function HOC(WrappedComponent: any) {
  return (props: any) => (
    <div>{props.isShow ? <WrappedComponent {...props} /> : <div>暂无数据</div>}</div>
  )
}
```

#### 2.2.4 通过 Props 实现节流渲染

HOC 除了可以进行条件渲染,渲染劫持功能外,还可以进行节流渲染,也就是可以优化性能。HOC 可以配合 hooks 的 useMemo 等 API 配合使用,可以实现对业务组件的渲染控制,减少渲染次数,从而达到优化性能的效果。如下案例,当且仅当 num 改变的时候,渲染组件,但是不影响接收的 Props。

```tsx
function HOC(Component) {
  return function renderWrapComponent(props) {
    const { num } = props
    const RenderElement = useMemo(() => <Component {...props} />, [num])
    return RenderElement
  }
}
```

#### 2.2.5 获取 refs 引用

通过属性代理方式实现的高阶组件无法直接获取原组件的 refs 引用,但是可以通过在原组件的 ref 回调函数中调用父组件传入的 ref 回调函数来获取原组件的 refs 引用。

```tsx
function HOC (WrappedComponent: any) {
    let inputElement: any = null;
    return (props: any) => (
      <div>
        <WrappedComponent
          {/* 通过回调函数接收WrappedComponent组件的ref */}
          inputRef={(el: any) => { inputElement = el; }}
          {...props}
        />
      </div>
    );
}
```

#### 2.2.6 获取原组件的 static 方法

当待处理组件为 class 组件时,通过属性代理实现的高阶组件(无论是返回一个函数组件还是返回一个 class 组件)可以获取到原组件的 static 方法。

```tsx
function withBackgroundColor(WrappedComponent) {
  function wrappedComponentStaic() {
    // 调用WrappedComponent的静态方法
    WrappedComponent.hello()
  }
  return class extends React.Component {
    render() {
      return (
        <div style={{ backgroundColor: '#ccc' }}>
          <WrappedComponent {...this.props} {...newProps} />
          <button onClick={wrappedComponentStaic}>button</button>
        </div>
      )
    }
  }
}
```

#### 2.2.7 用其他元素包裹传入的组件

可以通过元素包裹传入的组件,从而实现布局或者是样式的目的。

```tsx
function withBackgroundColor(WrappedComponent) {
  return class extends React.Component {
    render() {
      return (
        <div style={{ backgroundColor: '#ccc' }}>
          <WrappedComponent {...this.props} {...newProps} />
        </div>
      )
    }
  }
}
```

### 2.2 反向继承

反向继承指的是使用一个函数接受一个组件作为参数传入,并返回一个继承了该传入组件的类组件,且在返回组件的 render() 方法中返回 super.render() 方法,最简单的实现如下:

```tsx
const HOC = (WrappedComponent) => {
  return class extends WrappedComponent {
    render() {
      // 调用父类的render(),即调用WrappedComponent的render()
      return super.render()
    }
  }
}
```

- 相较于属性代理方式,使用反向继承方式实现的高阶组件的特点是允许高阶组件通过 this 访问原组件,所以可以直接读取和操作原组件的 state/ref/生命周期方法。
- 反向继承方式实现的高阶组件可以通过 super.render() 方法获取到传入组件实例的 render 结果,所以可对传入组件进行渲染劫持(最大特点)，如：
  - 有条件地展示元素树(element tree)。
  - 操作由 render() 输出的 React 元素树。
  - 在任何由 render() 输出的 React 元素中操作 props。
  - 用其他元素包裹传入组件的渲染结果。

#### 3.2.1 劫持原组件生命周期方法

- 因为反向继承方式实现的高阶组件返回的新组件是继承于传入组件,所以当新组件定义了同样的方法时,将会会覆盖父类(传入组件)的实例方法,如下面代码所示：

```tsx
function HOC(WrappedComponent) {
  // 继承了传入组件
  return class HOC extends WrappedComponent {
    // 注意:这里将重写WrappedComponent的 componentDidMount 生命钩子方法
    componentDidMount() {
      // ...
    }

    render() {
      // 使用 super 调用传入组件的 render 方法
      return super.render()
    }
  }
}
```

- 虽然生命周期重写会被覆盖,但可以通过其他方式来劫持生命周期。

```tsx
function HOC(WrappedComponent) {
  // 从WrappedComponent原型上获取 componentDidMount 生命周期函数
  const didMount = WrappedComponent.prototype.componentDidMount

  // 继承了传入组件
  return class HOC extends WrappedComponent {
    componentDidMount() {
      /**
       * 如果WrappedComponent存在componentDidMount,则劫持 WrappedComponent
       * 组件的生命周期
       */
      if (didMount) {
        didMount.apply(this)
      }
      // ...
    }

    render() {
      // 使用 super 调用传入组件的 render 方法
      return super.render()
    }
  }
}
```

#### 3.2.2 读取/操作原组件的 state

反向继承方式实现的高阶组件中可以读取、编辑和删除传入组件实例中的 state:

```jsx
function HOC(WrappedComponent) {
  const didMount = WrappedComponent.prototype.componentDidMount
  // 继承了传入组件
  return class HOC extends WrappedComponent {
    async componentDidMount() {
      if (didMount) {
        await didMount.apply(this)
      }
      // 将 WrappedComponent组件中state的 number 值修改成 2
      this.setState({ number: 2 })
    }

    render() {
      // 使用 super 调用传入组件的 render 方法
      return super.render()
    }
  }
}
```

#### 3.2.3 渲染劫持

- 条件渲染:条件渲染指的是可以根据部分参数去决定是否渲染组件(与属性代理方式类似)。

```tsx
const HOC = (WrappedComponent) =>
  class extends WrappedComponent {
    render() {
      if (this.props.isRender) {
        return super.render()
      } else {
        return <div>暂无数据</div>
      }
    }
  }
```

- 修改 React 元素树:可以通过 `React.cloneElement` 方法修改由 render 方法输出的 React 组件树:

```tsx
// 例子来源于《深入React技术栈》
function HigherOrderComponent(WrappedComponent) {
  return class extends WrappedComponent {
    render() {
      // 获取 WrappedComponent组件的组件树
      const tree = super.render()
      const newProps = {}
      if (tree && tree.type === 'input') {
        newProps.value = 'something here'
      }
      const props = {
        ...tree.props,
        ...newProps,
      }
      // 克隆元素,返回新的组件树
      const newTree = React.cloneElement(tree, props, tree.props.children)
      return newTree
    }
  }
}
```

### 2.3 属性代理和反向继承的对比

- 属性代理是从"组合"的角度出发,这样有利于从外部去操作 WrappedComponent,可以操作的对象是 props,或者在 WrappedComponent 外面加一些拦截器、控制器等。
- 反向继承则是从"继承"的角度出发,是从内部去操作 WrappedComponent,也就是可以操作组件内部的 state 、生命周期、render 函数等等。
  | 功能列表 | 属性代理 | 反向继承 |
  | --- | --- | --- |
  | 原组件能否被包裹 | yes | yes |
  | 原组件是否被继承 | no | yes |
  | 能否读取/操作原组件的 props | yes | yes |
  | 能否读取/操作原组件的 state | no | yes |
  | 能否通过 ref 访问到原组件的 dom 元素 | no | yes |
  | 是否影响原组件某些生命周期等方法 | yes | yes |
  | 是否取到原组件 static 方法 | yes | yes |
  | 能否劫持原组件生命周期方法 | no | yes |
  | 能否渲染劫持 | no | yes |

通过反向继承方法实现的高阶组件相较于属性代理实现的高阶组件功能更强大、个性化程度更高,因此能适应更多的场景。

## 3.使用 HOC 的注意事项

### 3.1 不要修改原始组件,而是使用组合方式

不要试图在 HOC 中修改组件原型（或以其他方式改变它)。这样会会产生一些不良后果,第一是输入组件(InputComponent)无法像 HOC 增加前那样使用;其二是如果有其他地方调用 logProps 函数,则会修改输入组件的 componentDidUpdate 增强它,但它前面的输入组件就会失效,这个 HOC 也无法应用于没有生命周期的函数组件。

```jsx
function logProps(InputComponent) {
  InputComponent.prototype.componentDidUpdate = function (prevProps) {
    console.log('Current props: ', this.props)
    console.log('Previous props: ', prevProps)
  }
  // 返回原始的 input 组件，暗示它已经被修改。
  return InputComponent
}

// 每次调用 logProps 时，增强组件都会有 log 输出。
const EnhancedComponent = logProps(InputComponent)
```

HOC 不应该修改传入组件,而应该使用组合的方式,通过将组件包装在容器组件中实现功能:

```javascript
function logProps(WrappedComponent) {
  return class extends React.Component {
    componentDidUpdate(prevProps) {
      console.log('Current props: ', this.props)
      console.log('Previous props: ', prevProps)
    }
    render() {
      // 将 input 组件包装在容器中，而不对其进行修改。Good!
      return <WrappedComponent {...this.props} />
    }
  }
}
```

该 HOC 与上文中修改传入组件的 HOC 功能相同，同时避免了出现冲突的情况。它同样适用于 class 组件和函数组件。而且因为它是一个纯函数,它可以与其他 HOC 组合,甚至可以与其自身组合。
HOC 与**容器组件模式**之间有相似之处,容器组件担任分离将高层和低层关注的责任,由容器管理订阅和状态,并将 prop 传递给处理渲染 UI。HOC 使用容器作为其实现的一部分,可以将 HOC 视为参数化容器组件。

### 3.2 将不相关的 props 传递给被包裹的组件

HOC 为组件添加特性,自身不应该大幅改变约定。HOC 返回的组件与原组件应保持类似的接口。HOC 应透传与自身不相关的 prop 给包装组件,这种约定保证了 HOC 的灵活性以及可复用性。例如:

```jsx
render() {
  // 排除与当前HOC不想关的props,只有passThroughProps是要透传下去的
  const { extraProp, ...passThroughProps } = this.props;

  // 将 props 注入到被包装的组件中。
  // 通常为 state 的值或者实例方法。
  const injectedProp = someStateOrInstanceMethod;

  // 将 props 传递给被包装组件
  return (
    <WrappedComponent
      injectedProp={injectedProp}
      {...passThroughProps}
      />
  );
}
```

### 3.3 最大化可组合性

有时候 HOC 的参数个数并不是相同的,有可能 HOC 的参数只有一个(即要包装的组件),也可能接收多个参数(比如说第二个是一个配置对象,用于配置要包装的组件),最常见的 HOC 如下:

```jsx
//react-redux的connect就是一个HOC函数,connect是一个高阶组件的高阶函数
const ConnectedComment = connect(commentSelector, commentActions)(CommentList)

//上面的代码可拆分为如下,connect是一个函数,它的返回值为另外一个函数。
const enhance = connect(commentSelector, commentActions)
//返回值为 HOC，它会返回已经连接 Redux store 的组件,所以说connect是一个高阶组件的高阶函数
const ConnectedComment = enhance(CommentList)
```

### 3.4 为包装组件指定显示名称以便轻松调试

HOC 创建的容器组件会与任何其他组件一样,会显示在  [React Developer Tools](https://github.com/facebook/react-devtools)  中。为了方便调试,请选择一个显示名称,以表明它是 HOC 的产物。

最常见的方式是用 HOC 包住被包装组件的显示名称。比如高阶组件名为  `withSubscription`，并且被包装组件的显示名称为  `CommentList`，显示名称应该为  `WithSubscription(CommentList)`

```jsx
function withSubscription(WrappedComponent) {
  class WithSubscription extends React.Component {
    /* ... */
  }
  WithSubscription.displayName = `WithSubscription(${getDisplayName(WrappedComponent)})`
  return WithSubscription
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}
```

### 3.5 不要在 render 方法中使用 HOC

React 的 diff 算法(称为协调)使用组件标识来确定它是应该更新现有子树还是将其丢弃并挂载新子树。 如果从  `render`  返回的组件与前一个渲染中的组件相同（`===`）,则 React 通过将子树与新子树进行区分来递归更新子树。 如果它们不相等,则完全卸载前一个子树。例如下面的代码:

```jsx
render() {
  // 每次调用 render 函数都会创建一个新的 EnhancedComponent
  // EnhancedComponent1 !== EnhancedComponent2
  const EnhancedComponent = enhance(MyComponent);
  // 这将导致子树每次渲染都会进行卸载，和重新挂载的操作！
  return <EnhancedComponent />;
}
```

- 每次调用 render 都会执行 enhance(MyComponent)生成一个新的 EnhancedComponent 然后返回,这个过程是非常损耗性能的。
- 重新挂载的组件会导致该组件及其所有子组件的状态丢失。如果需要动态调用 HOC,建议在其他生命周期函数或构造函数中调用。

### 3.6 一定要复制被包装组件的静态到包装组件上

有时在 React 组件上定义静态方法很有用,但是,当你将 HOC 应用于组件时,原始组件将使用容器组件进行包装。这意味着新组件没有原始组件的任何静态方法。例如下面的例子:

```jsx
// 定义静态函数
WrappedComponent.staticMethod = function () {
  /*...*/
}
// 现在使用 HOC
const EnhancedComponent = enhance(WrappedComponent)

// 增强组件没有 staticMethod
typeof EnhancedComponent.staticMethod === 'undefined' // true
```

为了解决这个问题，你可以在返回之前把这些方法拷贝到容器组件上:

```jsx
function enhance(WrappedComponent) {
  class Enhance extends React.Component {
    /*...*/
  }
  // 必须准确知道应该拷贝哪些方法 :(
  Enhance.staticMethod = WrappedComponent.staticMethod
  return Enhance
}
```

但要这样做，你需要知道哪些方法应该被拷贝。你可以使用  [hoist-non-react-statics](https://github.com/mridgway/hoist-non-react-statics)  自动拷贝所有非 React 静态方法:

```jsx
import hoistNonReactStatic from 'hoist-non-react-statics'
function enhance(WrappedComponent) {
  class Enhance extends React.Component {
    /*...*/
  }
  hoistNonReactStatic(Enhance, WrappedComponent)
  return Enhance
}
```

除了导出组件,另一个可行的方案是再额外导出这个静态方法:

```jsx
// 使用这种方式代替...
MyComponent.someFunction = someFunction
export default MyComponent

// ...单独导出该方法...
export { someFunction }

// ...并在要使用的组件中，import 它们
import MyComponent, { someFunction } from './MyComponent.js'
```

### 3.7 Ref 不会被传递

虽然高阶组件的约定是将所有 props 传递给被包装组件,但这对于 refs 并不适用。那是因为  `ref`  实际上并不是一个 prop - 就像  `key`  一样,它是由 React 专门处理的。如果将 ref 添加到 HOC 的返回组件中,则 ref 引用指向容器组件,而不是被包装组件。这个问题的解决方案是通过使用  `React.forwardRef` API。
