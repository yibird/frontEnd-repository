import{_ as n,o as l,c as p,z as s,t as o,O as a}from"./chunks/framework.0b8e562d.js";const E=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"react/base/index.md","filePath":"react/base/index.md","lastUpdated":1684845191000}'),t={name:"react/base/index.md"},e=a("",21),c=s("li",null,"导入 React 和 React.Component 模块,创建的组件继承 React.Component",-1),r=s("li",null,"constructor 和 render 都是 React 组件重要的钩子函数。constructor 是组件的构造方法,接收一个父组件传递过来 props 的参数,在使用 this 之前你必须调用 super()完成父类的初始化,一般在 constructor 钩子函数中完成一些初始化工作,例如初始化组件的 state,调用接口请求。render 钩子函数用于组件元素的渲染,渲染的元素最外层必须只有一个元素,组件的 state 发生改变时就会触发 render 重新渲染。",-1),D=s("li",null,"constructor 钩子函数中的 this.state 用于定义组件的 state,对于有 state 的组件我们一般称为有状态组件。在 render 元素中可以通过{this.state.属性名}访问到 state 的数据。",-1),y=s("li",null,"对于数组类型使用 map()遍历,不要使用 forEach,因为 forEach 的返回值是 undefined。遍历元素通常要为元素绑定一个 key,React 内部使用 diff 算法判断元素是否有变化,绑定 key 相当于做一个标识。",-1),F=a("",4);function i(C,A,u,d,m,f){return l(),p("div",null,[e,s("ul",null,[c,r,D,y,s("li",null,"React 绑定 class 要使用 className 而不是 class。绑定 style 属性要使用"+o()+"包裹起来。",1)]),F])}const R=n(t,[["render",i]]);export{E as __pageData,R as default};