### React是什么?
React是由facebook开源的用于构建用户界面的JavaScript库。
官网:https://react.docschina.org/
github:https://github.com/facebook/react/

**学习React原因:**

+ 主流框架,简单易学,有文档。
+ 生态广泛,社区强大。
+ 简化开发,组件化开发,高性能,利于构建大项目。

**React生态**
+ Next.js:是一个流行的、轻量级的框架，用于配合 React 打造静态化和服务端渲染应用。它包括开箱即用的样式和路由方案，并且假定你使用 Node.js 作为服务器环境。
+ Gatsby:是用 React 创建静态网站的最佳方式。它让你能使用 React 组件，但输出预渲染的 HTML 和 CSS 以保证最快的加载速度。
+ Parcel:是一个快速的、零配置的网页应用打包器，并且可以搭配 React 一起工作。
+ Razzle:是一个无需配置的服务端渲染框架，但它提供了比 Next.js 更多的灵活性。
+ ReactRouter:路由管理
+ Redux:状态管理。

**初始化React项目**
```shell
# 全局安装脚手架
npm isntall -g create-react-app
# 安装好了看版本
create-react-app --version
# 创建项目
create-react-app 项目名
# 进入项目
cd 项目名
# 启动
yarn start
```

**React项目目录结构介绍**
+ node_modules:用于存放node模块依赖,如果你需要将项目拷贝至其他地方或上传到仓库,你可以删除node_modules这个目录,因为这个目录的文件太多了,而且就算你没有拷贝此目录,你可以进入项目的根目录执行 npm install (如果你是使用yarn作为包管理器的话,使用yarn命令即可安装package.json的模块依赖项)安装package.json的模块依赖项,因为项目的依赖项都保存在package.json中。
+ public:项目公开访问目录。
+ src:源码目录。代码就写在这个目录下。
    - App.js。                       App组件逻辑js
    - App.test.js。               App组件单元测试,create-react-app创建项目为项目添加Jest依赖,Jest是Facebook推出的一款单元测试框架,是单元测试框架中的一哥。
    - index.js。                      -- 入口JS,ReactDOM.render()挂载到真实DOM节点就在这个JS中
    - reportWebVitals.js。    用于衡量你的应用程序的性能
    - setupTests.js。           启动时的单元测试
+ .gitgnore:create-react-app在创建项目时使用git对项目进行管理,.gitgnore作用是告诉git哪些文件可以忽略不用上传到仓库,例如node_modules就不用上传到git仓库。
+ package.json:用于描述项目的配置信息,例如项目作者、项目版本、项目依赖、执行脚本等等。
+ README.md:项目的说明文件,由于采用的是git管理,README.md文件就是git仓库的说明文件。
+ yarn.lock:yarn.lock文件的产生是因为使用了Yarn作为包管理器。它的作用是为了跨机器安装得到一致的结果，Yarn 需要比你配置在 package.json 中的依赖列表更多的信息。 Yarn 需要准确存储每个安装的依赖是哪个版本。为了做到这样，Yarn 使用一个你项目根目录里的 yarn.lock 文件。这可以媲美其他像 Bundler 或 Cargo 这样的包管理器的 lockfiles。它类似于 npm 的 npm-shrinkwrap.json，然而他并不是有损的并且它能创建可重现的结果。

创建项目后,src/index.js的内容如下:
```js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```
上面的代码主要步骤如下:
+ 导入了React和React-DOM模块,React只包含了Web和Mobile通用的核心部分,负责Dom操作的分到react-dom中,负责Mobile的包含在react-native中。
+ ReactDOM.render()用于将组件挂载到真实的DOM节点。React.StrictMode表示开启严格模式,跟在函数中顶部加了"use strict"一样。

### 使用JSX开发React应用
jsx是一种javaScript的高级语法扩展,其本质还是js,react推荐我们使用jsx语法,其优点如下:
+ 关注点分离。在vue中推荐我们将js、css、组件单独抽离,这种做法使文件职责和结构更加清晰,也更容易上手。但在React中并没有采用将标记与逻辑进行分离到不同文件这种人为地分离方式，而是通过将二者共同存放在称之为“组件”的松散耦合单元之中，来实现关注点分离。
+ JSX 防止注入攻击。React DOM 在渲染所有输入内容之前，默认会进行转义。它可以确保在你的应用中，永远不会注入那些并非自己明确编写的内容。所有的内容在渲染之前都被转换成了字符串。这样可以有效地防止 XSS（cross-site-scripting, 跨站脚本）攻击。

### 编写第一个React组件
在React中万物皆组件,组件就是将模块关注点抽离成一个个小单元,这些小单元不会直接通信,而是通过props等其他方式与组件通讯,从而实现逻辑的复用。

React定义组件有两种方式,第一种是使用class 语法,使用class语法创建的组件被称为类组件,第二种是使用函数创建组件,使用函数创建的组件被称为函数式组件。

```js
import React, { Component } from 'react'
import logo from './logo.svg'
export default class List extends Component {
    constructor(props) {
        super();
        this.state = {
            name: "z乘风",
            age: 20,
            list: ["苹果", "小米", "三星", "华为"],
            myClassName: "red",
            logo
        }
    }
    render() {
        return (
            <div>
                <div>我是名字是:{this.state.name}</div>
                <div>我的年龄是:{this.state.age}</div>
                <div className={this.state.myClassName}>我喜欢的手机品牌有:
                    {
                        this.state.list.map((item, index) => {
                            return (<span key={index}>{item},</span>)
                        })
                    }
                </div>
                <div>
                    <img src={this.state.logo} style={{ width: '50px', height: '50px' }} />
                </div>
            </div>
        )
    }
}
```
上面代码主要有以下几步操作:
+ 导入React和React.Component 模块,创建的组件继承React.Component
+ constructor和render都是React组件重要的钩子函数。constructor是组件的构造方法,接收一个父组件传递过来props的参数,在使用this之前你必须调用super()完成父类的初始化,一般在constructor钩子函数中完成一些初始化工作,例如初始化组件的state,调用接口请求。render钩子函数用于组件元素的渲染,渲染的元素最外层必须只有一个元素,组件的state发生改变时就会触发render重新渲染。
+ constructor钩子函数中的this.state用于定义组件的state,对于有state的组件我们一般称为有状态组件。在render元素中可以通过{this.state.属性名}访问到state的数据。
+ 对于数组类型使用map()遍历,不要使用forEach,因为forEach的返回值是undefined。遍历元素通常要为元素绑定一个key,React内部使用diff算法判断元素是否有变化,绑定key相当于做一个标识。
+ React绑定class要使用className而不是class。绑定style属性要使用{{}}包裹起来。

index.js引入List.jsx:
```js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import List from './List' //不用写.js,React会自动识别
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <List />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```
效果图:

![RUNOOB 图标]()