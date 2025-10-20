在大型前端项目中工程化是比不可少的基石,所谓前端工程化,即用工程化的手段和工具,让项目开发更高效、可维护、可协作、可持续交付。前端工程化通常由代码质量工具(ESLint、Prettier、StyleLint)、测试(单元测试、集成测试、端到端测试)、构建工具(Webpack、Rollup、Parcel)、包管理工具(Yarn、npm、pnpm)、版本控制工具(Git)、CI/CD等多方面组成。

## Monorepo与Multirepo的定义

在软件开发中,代码仓库的管理方式对项目的效率和协作有着重要影响。常见的代码仓库管理方式主要有Monorepo(单体仓库)和Multirepo(多仓库)两种

- Monorepo是指将多个项目存储在同一个代码仓库中。这种方式允许不同项目共享代码和依赖，并在同一个版本控制系统中进行管理。Monorepo的优缺点如下:
  - 代码共享：在同一个仓库中，项目之间的代码共享更加便捷，减少了重复代码，提高了代码复用率。
  - 一致性管理：可以统一管理依赖、构建和发布流程，确保不同项目的开发环境和工具链的一致性。
  - 简化依赖管理：跨项目的依赖管理变得更加简单，减少了依赖冲突和版本不兼容的问题。
  - 提升协作效率：团队成员可以在同一个仓库中协作，代码审查、问题跟踪和变更管理更加方便。
  - 虽然Monorepo有着诸多优点,但当仓库规模较大时可能导致版本控制系统性能下降,构建时间可能变长,需要优化构建流程

- Multirepo是指将每个项目存储在独立的代码仓库中，每个仓库独立管理代码和依赖:
  - 独立性：每个项目独立管理，不受其他项目变更的影响。
  - 灵活性：各项目可以选择最适合自己的工具和依赖版本。
  - 权限控制：更容易对每个项目进行精细化的权限管理。

相比较和Multirepo,Monorepo更适用于大型项目、需要统一管理多个子项目或模块、多个项目之间频繁共享代码和资源、对依赖、构建和发布流程一致性要求较高的项目，以及需要高效协作的团队,例如Vue3等大型项目就采用Monorepo管理仓库。而Multirepo适用于各项目相互独立、变更较少影响其他项目、需要为每个项目选择不同的工具和依赖版本、需要对每个项目进行精细化权限管理的情况，以及项目规模较小、不需要频繁共享代码和资源的项目。常见Monorepo工具如下:

- Lerna:Lerna 是一个非常轻量、运行速度快、学习成本低的Monorepo管理工具。它的主要功能包括初始化项目、链接所有包、运行所有包的构建脚本、根据Conventional Commit规范自动升级包的版本、生成changelog并发布到NPM上。Lerna@5版本还集成了Nx，提升了运行任务的速度。
- Pnpm + Changesets:Pnpm 不仅是一个包管理工具,而且支持workspace功能,可以在Monorepo中管理多个项目的依赖。而Changesets 是一个用于生成和管理变更集的工具，结合Pnpm可以实现灵活的发布工作流。
- Nx:Nx 是一款功能强大的Monorepo工具，提供了任务调度、依赖分析和可视化支持。它可以生成依赖图，展示项目之间的关系，并根据依赖关系自动调整执行顺序。
- Rush:Rush 是Microsoft为企业级项目设计的Monorepo工具，专注于复杂依赖和构建管理。它提供了严格的依赖顺序执行任务、结果缓存和高效的CI/CD集成。
- Bun: Bun 是一个快速的 JavaScript 一站式工具包,内置快速 JavaScript 运行时、打包器、测试运行器和包管理器,Bun除了作为包管理器外,也支持workspace功能,可以在Monorepo中管理多个项目的依赖。

由于Pnpm不仅提供包管理功能,而且支持workspace功能,已经成为管理Monorepo首选工具之一。

### 使用Pnpm workspace 搭建monorepo项目

### pnpm在monorepo安装依赖

## 代码质量工具

代码质量工具包括代码格式化、JSLint、CSSLint等多方面,可以帮助开发人员保持一致的代码风格,避免代码质量问题。常见的代码质量工具如下:

- 代码格式化工具:
  - Prettier:Prettier 是一个代码格式化工具,可以自动格式化代码,保持一致的代码风格。它支持多种语言,包括JavaScript、TypeScript、CSS、SCSS、Less、JSON、Markdown等。虽然Prettier对语言支持比较完善,但其基于JS实现,在大型项目中存在性能瓶颈。
  - Biome:Biome是一个基于Rust语言实现的工具链,支持代码格式化、JSLint等功能。Biome 是一个适用于 JavaScript、TypeScript、JSX、JSON、CSS 和 GraphQL 的快速格式化工具，与 Prettier 有高达 97% 的兼容覆盖率，能有效节约持续化集成和开发者的时间。Biome基于Rust语言实现,速度比Prettier快很多,对特殊模板(例如Astro、Svelte 和 Vue模板文件)仅提供部分支持,而且不支持Markdown。适用于开发工具库或JSX场景的项目。
  - OXC fmt:
- JSLint工具:
  - ESLint:ESLint 是一个用于检查和修复 JavaScript 代码质量问题的工具。它可以帮助开发人员发现潜在的错误、代码风格问题和最佳实践违规。ESLint 支持自定义规则和插件,可以根据项目需求进行配置。由于基于JS实现,在处理大型项目时可能存在性能问题。
  - Biome:Biome是一个基于Rust语言实现的工具链,支持代码格式化、JSLint等功能。
  - OxcLint:OxcLint是一个基于Rust语言实现的高性能JSLint工具,比 ESLint 快数十倍,而兼容大部分ESLint规则,适用于对性能要求较高的场景。

### 代码格式化工具

#### Prettier

首先在编辑器中安装Prettier插件,然后在根项目下安装Prettier相关依赖:

```shell
pnpm i -D prettier
```

prettier支持多种方式配置prettier,prettier默认配置文件如下:

- `.prettierrc`:以`JSON / YAML`配置文件格式。
- `prettier.json`或`prettier.jsonb`:以JSON格式配置prettier。
- `prettier.config.js`:以Js模块格式配置prettier,可以在模块中导出配置对象。
- `.prettierrc.js`:与`prettier.config.js`一致,只是配置文件名不同。
- `prettier.config.cjs`:以JS CommonJS模块格式配置prettier,可以在模块中导出配置对象。
- `package.json`:在 `package.json` 文件的 `"prettier"` 字段中直接配置prettier选项。

根项目新建`.prettierrc`文件、,配置如下:

```json
  printWidth: 100,        // 每行最大长度
  tabWidth: 2,            // 缩进空格数
  useTabs: false,         // 使用空格代替 tab
  semi: false,            // 语句末尾不加分号
  singleQuote: true,      // 使用单引号
  trailingComma: 'es5',   // 尾随逗号
  bracketSpacing: true,   // 对象字面量加空格 { foo: bar }
  arrowParens: 'avoid',   // 单参数箭头函数不加括号
  vueIndentScriptAndStyle: true, // 缩进 Vue 文件的 script 和 style 标签内容
  endOfLine: 'auto',      // 根据系统自动换行符
```

#### Biome

### JSLint工具

#### ESLint

### CSSLint工具

### Git提交规范

### 公共库打包

### 子包依赖

### 单元测试

### 发布
