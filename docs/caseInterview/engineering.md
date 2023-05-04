## 1.什么是前端工程化

前端工程化是指通过工具和流程的优化,使前端开发更加高效和可维护。它可以涉及到各种不同的方面,包括代码管理、脚手架工具、包管理工具、构建工具、自动化测试、代码质量检查、性能优化等等。前端工程化通常包括以下几个方面:

- 代码管理。使用版本控制工具如 Git 或 SVN 等,协作开发和管理代码库,实现代码的版本控制、代码合并、代码回退等功能。
- 脚手架工具。前端脚手架是一个用于快速搭建前端项目的工具,它可以提供项目的基础结构、文件组织方式、开发规范等。脚手架通常集成了多个工具和框架,如 Webpack、Babel、ESLint 等,使用 Vue-cli、React Create App、Angular CLI 等脚手架可以降低搭建项目的门槛,提供标准化的项目结构和规范,有利于提升项目可维护性和稳定性。除此之外,脚手架可以快速进行项目初始化、构建、打包、测试、部署等操作。
- 包管理工具。使用 pnpm、yarn、npm 实现依赖安装、版本管理、依赖更新等操作。
- 构建工具。使用构建工具如 Vite、Webpack、Rollup 等,将多个代码文件打包成一个或多个可执行的文件,同时进行资源优化、压缩等操作,以提高页面加载速度和性能。
- 自动化测试。使用自动化测试工具如 Vitest、Jest、Mocha 等,实现自动化测试,以确保代码的质量和可靠性。
- 代码规范。使用代码质量检查工具如 ESLint、Prettier 等，检查代码规范、代码风格等问题,以确保代码的可读性和可维护性。使用 commitLint 检查 Git Commit 提交规范、使用 changeset 管理版本及更新日志。
- 性能优化。使用性能优化工具如 Lighthouse、PageSpeed Insights 等,对页面进行性能分析和优化,以提高页面的响应速度和用户体验。

通过前端工程化的实践,可以提高前端开发的效率和质量,同时也可以减少人为错误和重复工作,从而使团队更加高效和协作。

## npm install 安装依赖的过程?

当使用 npm install 安装依赖时,npm 会执行以下几个步骤:

- 解析依赖。npm 首先会解析项目的 package.json 文,查找需要安装的依赖和版本号,以及它们的依赖关系,即 dependencies 和 devDependencies。npm 会根据依赖的类型(dependencies 还是 devDependencies)来决定是否将依赖安装到生产环境还是开发环境中。
- 下载依赖。npm 会从 npm 的官方 registry 中下载所有需要安装的依赖包,以及这些依赖包的所有依赖项。
- 安装依赖。npm 会将下载的所有依赖包安装到项目的 node_modules 目录中。如果依赖包已经存在于 node_modules 中,npm 会检查它们的版本是否满足要求。如果版本不符合要求,npm 会尝试更新依赖包的版本。
- 执行钩子。npm 会执行 preinstall、postinstall、preuninstall、postuninstall 钩子,以及 prepublish 和 prepare 钩子。
- 生成 package-lock.json。npm 会生成一个 package-lock.json 文件,用于锁定依赖包的版本号，以保证在不同的机器上安装依赖时使用相同的版本。
- 执行依赖命令。最后,npm 会执行依赖包的 bin 命令,以确保依赖包已经正确地安装并可用。

## pnpm 对比 npm、yarn 有哪些优点?

- 节省磁盘空间并提升安装速度。
- 更严格高效。node_modules 中的文件是从一个单一的可内容寻址的存储中链接过来的,代码无法访问任意包。
- 内置支持 monorepo。pnpm 通过 workspace 天然内置支持 monorepo。

### 节省磁盘空间并提升安装速度

当使用 npm 或 yarn 时,如果有 100 个项目,并且所有项目都有一个相同的依赖包,那么,在硬盘上就需要保存 100 份该相同依赖包的副本。如果是使用 pnpm,依赖包将被存放在一个统一的位置,因此:

- 如果对同一依赖包需要使用不同的版本,则仅有版本之间不同的文件会被存储起来。例如,如果某个依赖包包含 100 个文件，其发布了一个新 版本，并且新版本中只有一个文件有修改，则 pnpm update 只需要添加一个 新文件到存储中，而不会因为一个文件的修改而保存依赖包的 所有文件。
- 所有文件都保存在硬盘上的统一的位置。当安装软件包时,其包含的所有文件都会硬链接自此位置,而不会占用额外的硬盘空间。这可以在项目之间方便地共享相同版本的依赖包。

### 创建非扁平的 node_modules 目录

在 npm1 和 2 中,包是通过嵌套结构进行管理的,通过这种方式管理包,有多种缺点:

- 依赖无法被共用,例如 bar 和 bar1 两个模块引用了相同版本的 foo,嵌套结构会安装两次 foo,造成磁盘空间的浪费,以及安装依赖时的低效。
- 依赖层级太深,导致文件路径过长,在不同的操作系统下有存在问题,在 windows 中复制目录会报错,路径长度超过限制。

npm3 为了解决 npm1 和 2 的缺陷,通过对依赖进行扁平化处理,用于解决依赖无法被共用和依赖层级太深的问题,所有的依赖都被平铺在 node_modules 中的一级目录。这样在安装新的依赖时,根据 node 加载模块的路径查找算法,递归向上查找 node_modules 中的 package,这种查找核心简单来说是:

- 优先在同级目录查找 node_modules 文件夹。
- 如果同级目录下没有 node_modules 或者没有找到相关版本的依赖,会继续在上一级目录中查找,解决了包重复安装的问题,本地开发项目大小得到了改善。

随着 node_modules 扁平化的提出,可能会导致**幽灵依赖**和**依赖分身**。因为扁平化处理,把所有依赖都提升到 node_modules 的一级目录,导致在工作区未声明的包,可以直接被项目引用,这种现象被称为幽灵依赖(Ghost Dependency),幽灵依赖可能会导致以下问题:

- 项目体积增大。幽灵依赖会占用项目的空间,导致项目体积增大,增加传输和加载的时间。
- 安全漏洞。幽灵依赖可能存在安全漏洞,因为它们没有得到更新或者升级。
- 构建速度下降。由于幽灵依赖需要被下载和处理,可能会导致构建速度变慢。

以安装 express 为例:

- 项目可以直接引用 debug,但是却不能规定 debug 版本,导致项目每次执行 install 发布上线存在隐患。
- 对于本地开发在 devDependence 声明的,依赖的依赖也被提升到 node_modules 的一级目录,在项目中未声明就引入,导致线上出现问题。

```js
web-project
    | -- node_modules
        | -- express
        | -- debug@2.6.9
        | --express-session@1.16.1(dev)
```

因为扁平化处理会提升包所在目录层级,但是存在同一个包的不同版本,npm 会选择一个版本提升到 node_modules 一级目录,其他版本嵌套安装,这样做会导致在项目中引用 C 和 D 的时候,是使用两个 B 的实例,从而造成依赖分身。依赖分身在一些边界情况就会导致项目的崩溃(typescript 和 webpack 都有可能因此出错,所以只能内部做兼容)。

```js
web-project
    | -- node_modules
        | -- A@1.0
        | -- B@1.0
        | -- C@1.0
             | -- node_modules
                | -- B@2.0
        | -- D@1.0
             | -- node_modules
                | -- B@2.0
```

在 pnpm 中通过自动硬链接(hard link)和软链接(sybolic link)来实现 npm 模块的管理,从而避免幽灵依赖和依赖分身的问题。pnpm 安装管理时并不会像 npm 将所有依赖都扁平化管理,而是通过软链的形式链接到.pnpm 内部,再去详细管理依赖的版本,从而一并解决幽灵依赖和依赖分身。在.pnpm 内部也是平铺的,但是是允许不同版本的依赖平铺在一个层级,同时对于 express 诸多依赖,也是直接软链到平铺的模块中。

```js
web-project
    | -- node_modules
        | -- express -> .pnpm/express@3.20.3/node_modules/express
        | -- .pnpm
             | -- express@3.20.3
                | -- node_modules
                    | -- basic-auth -> ../../basic-auth@1.0.0/node_modules/basic-auth
                    | -- commander -> ../../commander@2.6.0/node_modules/commander
```

## 常见的模块化方案有哪些？

### CommonJS 与 ESModule 的区别？

CommonJS 和 ESModule 是 JavaScript 中两种不同的模块系统。其区别如下：

- **语法不同**。CommonJS 使用`require()`和`module.exports`来导入和导出模块,而 ESModule 使用`import`和`export`语句。
- **加载方式不同**。CommonJS 是同步加载模块,即当使用`require()`加载一个模块时,会立即执行该模块的代码,并返回该模块的`exports`对象。而 ESModule 是异步加载模块,即在使用 import 语句加载一个模块时,不会立即执行该模块的代码,而是在需要使用该模块时再执行。
- **静态解析不同**。由于 ESModule 采用静态解析,因此在编译时就可以确定导入的模块,而 CommonJS 则是动态解析,需要在运行时才能确定导入的模块。由于 ESModule 采用静态分析,因此可以在编译阶段确定哪些代码未被使用,从而实现 tree shaking(摇树)优化,去除未使用的代码。
- **变量绑定不同**。ESModule 中导入的变量是只读的,不能被修改,而 CommonJS 导入的变量是可以被修改的。
- **应用场景不同**。CommonJS 主要应用于服务器端的 Node.js 环境中,而 ESModule 主要应用于浏览器端的 Web 应用程序中。

需要注意的是，由于 CommonJS 和 ESModule 有不同的语法和特性,因此它们之间的模块无法直接互相引用,需要通过转换工具进行转换。例如,Babel 可以将 ESModule 转换成 CommonJS,而 Webpack 可以将 CommonJS 转换成 ESModule。

## CommonJS 规范 require()的过程?

## 什么是 AST?

AST(Abstract Syntax Tree),抽象语法树,是一种数据结构,它用于表示编程语言的抽象语法结构。在编程语言中,源代码是由一系列字符组成的,计算机并不能直接理解它们,需要将其转换成抽象语法树,以便计算机能够理解和处理它们。

抽象语法树可以看作是源代码的抽象语法结构的一种中间表示形式。在抽象语法树中,每个节点表示一个语法元素,例如函数、变量、表达式、语句等等。节点之间的关系则表示语法结构的嵌套关系,例如函数包含参数和函数体,函数体又包含多个语句,语句包含多个表达式等等。抽象语法树在编译器、静态分析、代码优化、代码生成等领域中都有广泛的应用,例如 Babel(前端编译器)、Webpack(打包器)、ESLint(JS Lint 工具)、Perttier(代码格式化工具)等。

## 如何实现一个 Compiler?

一个完整的编译器整体执行过程可以分为三个步骤:

- **Parsing(解析)**。这个过程要经词法分析、语法分析、构建 AST（抽象语法树）一系列操作。
- **Transformation(转化)**。这个过程就是将上一步解析后的内容,按照编译器指定的规则进行处理,形成一个新的表现形式。
- **Code Generation(代码生成)**。将上一步处理好的内容转化为新的代码。

![prototype](../assets/images/ast.png)
以 lisp 的函数调用编译成类似 C 的函数为例:

```js
LISP 代码: (add 2 (subtract 4 2))
C    代码:  add(2, subtract(4, 2))
释义: 2 + （ 4 - 2)
```

### Compiler 流程介绍

#### Parsing 过程

解析过程主要分为词法分析和语法分析两个步骤:

- 词法分析:词法分析是使用 tokenizer(分词器)或者 lexer(词法分析器),将源码拆分成 tokens,tokens 是一个放置对象的数组,其中的每一个对象都可以看做是一个单元(数字，标签，标点，操作符...)的描述信息。例如对"你是猪"进行词法分析就可以得到主谓宾词语,对`(add 2 (subtract 4 2))`进行词法分析后得到:

```js
[
  { type: "paren", value: "(" },
  { type: "name", value: "add" },
  { type: "number", value: "2" },
  { type: "paren", value: "(" },
  { type: "name", value: "subtract" },
  { type: "number", value: "4" },
  { type: "number", value: "2" },
  { type: "paren", value: ")" },
  { type: "paren", value: ")" },
];
```

- 语法解析:将词法分析的结果转化为抽象语法树(AST),并检查其语法是否正确。语法分析会将 tokens 重新整理成语法相互关联的表达形式,这种表达形式一般被称为中间层或者 AST(抽象语法树)。对`(add 2 (subtract 4 2))`进行语法解析后得到的 AST:

```js
{
  type: 'Program',
  body: [{
    type: 'CallExpression',
    name: 'add',
    params:
      [{
        type: 'NumberLiteral',
        value: '2',
      },
      {
        type: 'CallExpression',
        name: 'subtract',
        params: [{
          type: 'NumberLiteral',
          value: '4',
        }, {
          type: 'NumberLiteral',
          value: '2',
        }]
      }]
  }]
}
```

### Compiler 实现

根据 Compiler 的执行流程,Compiler 的实现分为以下四个步骤:

- 生成 Tokens。
- 将生成好的 tokens 转化为 AST。
- 遍历和访问生成好的 AST。
- 将生成好的 AST 转化为新的 AST。
- 根据转化的 AST 生成目标代码。

#### 生成 Tokens

第一步是将输入代码解析为 tokens。这个过程需要 tokenzier(分词器)函数,整体思路就是通过遍历字符串的方式,对每个字符按照一定的规则进行`switch case`,最终生成 tokens 数组。

```js

```

## 什么是 Babel?

## webpack 的打包流程?

## webpack 打包的原理?

## webpack Loader 和 Plugin 的区别?

### 如何实现一个 Loader?

### 如何实现一个 Plugin?

## webpack 的打包优化策略有哪些?

## Vite 的打包流程?

## Vite 的打包原理?

## 如何实现一个 Vite Plugin?
