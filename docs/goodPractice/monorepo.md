在大型前端项目中工程化是比不可少的基石,所谓前端工程化,即用工程化的手段和工具,让项目开发更高效、可维护、可协作、可持续交付。前端工程化通常由代码质量工具(JSLint、代码格式化工具、CSSLint)、测试(单元测试、集成测试、端到端测试)、构建工具(Webpack、Rollup、Parcel)、包管理工具(Yarn、npm、pnpm)、版本控制工具(Git)、CI/CD等多方面组成。

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

新建根项目,然后新建packages目录作为pnpm workspace,并且在packages目录下新建子项目A、子项目B等,项目目录结构如下:

```
root-project/
├── packages/
│   ├── sub-project-a/
│   ├── sub-project-b/
├── package.json
├── pnpm-lock.yaml
```

新建`pnpm-workspace.yaml`文件,内容如下:

```yaml
packages:
  - 'packages/*'
```

packages用于指定pnpm workspace中包含的子项目目录,这里指定为`packages/*`,表示`packages`目录下的所有子目录都是pnpm workspace的一部分。

### pnpm在monorepo安装依赖

在monorepo项目中,安装依赖与multirepo项目不同,分为根项目安装依赖和子项目安装依赖。

- 根项目安装依赖:根项目安装依赖需要加上`-w`选项,表示在根项目安装依赖,例如`pnpm i -w eslint -D`。
- 子项目安装依赖:在子项目目录执行`pnpm install`安装依赖,或者在根项目使用`--filter`选项指定要安装依赖的子项目,例如`pnpm install eslint --filter sub-project-a`表示在子项目A的目录中安装依赖,并更新根项目的`pnpm-lock.yaml`文件。

pnpm选项说明:

- `-w`:该选项用于在根项目安装依赖,而不是在子项目安装依赖。
- `--filter`:该选项用于过滤软件包的特定子集。`pnpm install eslint --filter sub-project-a`表示在子项目A的目录中安装依赖,并更新根项目的`pnpm-lock.yaml`文件。

## 代码质量工具

代码质量工具包括代码格式化、JSLint、CSSLint等多方面,可以帮助开发人员保持一致的代码风格,避免代码质量问题。常见的代码质量工具如下:

### 编辑器配置

EditorConfig 是一个 统一编辑器和 IDE 行为的配置文件规范，主要用于团队协作，保证不同开发者在不同编辑器/操作系统下的代码风格一致。在项目根目录创建 `.editorconfig`:

```ini
# 标记这是根配置，子目录不会再向上查找
root = true

# [*]表示对所有文件配置
[*]
# 字符编码
charset = utf-8
# 缩进方式,可选值 space 或 tab
indent_style = space
# 缩进空格数
indent_size = 2
# Tab 的宽度(显示效果),仅当indent_style为tab时生效
tab_width = 4
# 行尾符,可选值有 lf、cr、crlf
end_of_line = lf
# 保存时去掉行尾空格
trim_trailing_whitespace = true
# 文件末尾是否自动加空行
insert_final_newline = true

# 对Markdown文件配置
[*.md]
trim_trailing_whitespace = false
```

### 代码格式化工具

常见的代码格式化工具如下:

- Prettier:Prettier 是一个代码格式化工具,可以自动格式化代码,保持一致的代码风格。它支持多种语言,包括JavaScript、TypeScript、CSS、SCSS、Less、JSON、Markdown等。虽然Prettier对语言支持比较完善,但其基于JS实现,在大型项目中存在性能瓶颈。
- Biome:Biome是一个基于Rust语言实现的工具链,支持代码格式化、JSLint等功能。Biome 是一个适用于 JavaScript、TypeScript、JSX、JSON、CSS 和 GraphQL 的快速格式化工具，与 Prettier 有高达 97% 的兼容覆盖率，能有效节约持续化集成和开发者的时间。Biome基于Rust语言实现,速度比Prettier快很多,对特殊模板(例如Astro、Svelte 和 Vue模板文件)仅提供部分支持,而且不支持Markdown。适用于开发工具库或JSX场景的项目。
- OXC fmt:OXC fmt 是一个基于 Rust 实现的高性能代码格式化工具。

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

根项目新建`prettier.config.js`文件、,配置如下:

```js
// prettier.config.js
export default {
  /**
   * 是否在语句末尾添加分号
   * true：加分号（默认）
   * false：不加分号
   */
  semi: false,

  /**
   * 是否使用单引号而不是双引号
   * true：使用单引号
   * false：使用双引号
   */
  singleQuote: true,

  /**
   * 每行最大字符数（超过会自动换行）
   * 默认值：80
   */
  printWidth: 100,

  /**
   * 缩进空格数
   * 默认值：2
   */
  tabWidth: 2,

  /**
   * 使用制表符(tab)而不是空格缩进
   * true：使用 tab
   * false：使用空格（默认）
   */
  useTabs: false,

  /**
   * 尾随逗号规则（即对象或数组最后一个元素后是否加逗号）
   * 可选值：
   * - "none"：不加尾逗号
   * - "es5"：在 ES5 合法的地方加逗号（对象、数组等）
   * - "all"：尽可能加逗号（函数参数也会加）
   */
  trailingComma: 'es5',

  /**
   * Vue 文件中 <script> 和 <style> 标签内容是否缩进
   * 默认：false
   */
  vueIndentScriptAndStyle: true,

  /**
   * 在对象字面量中的括号前后是否添加空格
   * true：{ foo: bar }
   * false：{foo: bar}
   */
  bracketSpacing: true,

  /**
   * 箭头函数单个参数时是否省略括号
   * 可选值：
   * - "avoid"：能省略就省略，如 x => x
   * - "always"：总是加括号，如 (x) => x
   */
  arrowParens: 'avoid',

  /**
   * 控制换行符样式
   * 可选值：
   * - "lf"：仅换行符（Linux/Mac）
   * - "crlf"：回车 + 换行（Windows）
   * - "cr"：仅回车
   * - "auto"：根据系统自动选择
   */
  endOfLine: 'lf',
}
```

在package.json的scripts中添加如下脚本:

```json
{
  "scripts": {
    "lint:format": "prettier --write \"src/**/*.{js,jsx,ts,tsx,vue,md}\""
  }
}
```

终端执行`pnpm run lint:format`会对`src`目录下所有`js,jsx,ts,tsx,vue,md`文件进行格式化。

### JSLint工具

常见JSLint工具如下:

- ESLint:ESLint 是一个用于检查和修复 JavaScript 代码质量问题的工具。它可以帮助开发人员发现潜在的错误、代码风格问题和最佳实践违规。ESLint 支持自定义规则和插件,可以根据项目需求进行配置。由于基于JS实现,在处理大型项目时可能存在性能问题。
- Biome:Biome是一个基于Rust语言实现的工具链,支持代码格式化、JSLint等功能。
- OxcLint:OxcLint是一个基于Rust语言实现的高性能JSLint工具,比 ESLint 快数十倍,而兼容大部分ESLint规则,适用于对性能要求较高的场景。

#### ESLint

::: code-group

```shell [eslint+ts环境]
# 安装eslint相关依赖
pnpm i -D eslint @eslint/js globals eslint-config-prettier eslint-plugin-prettier typescript typescript-eslint eslint-plugin-import eslint-plugin-promise

# 依赖说明:
# eslint: 核心eslint库,用于检查和修复JavaScript代码质量问题。
# @eslint/js: ESLint 官方 JavaScript 推荐规则。
# globals: 用于定义全局变量,避免在ESLint中报告未定义的变量错误。
# eslint-config-prettier: 用于禁用与Prettier冲突的ESLint规则,未使用prettier可忽略该依赖。
# eslint-plugin-prettier: 用于将Prettier格式化为ESLint规则,确保代码风格一致。未使用prettier可忽略该依赖。
# typescript: TypeScript 类型检查器,用于检查 TypeScript 代码。
# typescript-eslint: TypeScript 相关的 ESLint 插件,提供 TypeScript 特定的规则。
# eslint-plugin-import: 用于检查和修复导入/导出语句的问题,确保模块的正确导入和导出(可选)。
# eslint-plugin-promise：用于检查和修复 Promise 相关的问题,确保正确使用 Promise 模式(可选)。
# eslint-plugin-vue: 用于检查和修复 Vue 组件代码质量问题,确保符合 Vue 最佳实践(可选)。
```

```shell [vue+eslint环境]
pnpm i -D eslint @eslint/js globals eslint-config-prettier eslint-plugin-prettier typescript typescript-eslint eslint-plugin-import eslint-plugin-promise eslint-plugin-vue

# 依赖说明:
# eslint: 核心eslint库,用于检查和修复JavaScript代码质量问题。
# @eslint/js: ESLint 官方 JavaScript 推荐规则。
# globals: 用于定义全局变量,避免在ESLint中报告未定义的变量错误。
# eslint-config-prettier: 用于禁用与Prettier冲突的ESLint规则,未使用prettier可忽略该依赖。
# eslint-plugin-prettier: 用于将Prettier格式化为ESLint规则,确保代码风格一致。未使用prettier可忽略该依赖。
# typescript: TypeScript 类型检查器,用于检查 TypeScript 代码。
# typescript-eslint: TypeScript 相关的 ESLint 插件,提供 TypeScript 特定的规则。
# eslint-plugin-import: 用于检查和修复导入/导出语句的问题,确保模块的正确导入和导出(可选)。
# eslint-plugin-promise：用于检查和修复 Promise 相关的问题,确保正确使用 Promise 模式(可选)。
# eslint-plugin-vue: 用于检查和修复 Vue 组件代码质量问题,确保符合 Vue 最佳实践(可选)。
```

:::

在根项目新建`eslint.config.js`文件(ESLint 9+ 推荐使用 `eslint.config.js` 取代 `.eslintrc.js`),配置如下:

::: code-group

```js [eslint+ts环境]
import { defineConfig } from 'eslint/config'
import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginPrettier from 'eslint-plugin-prettier'
import eslintImport from 'eslint-plugin-import'
import eslintPromise from 'eslint-plugin-promise'
import globals from 'globals'

const ignores = ['**/dist/**', '**/node_modules/**', '.*', 'scripts/**', '**/*.d.ts']

export default defineConfig([
  // 通用配置
  {
    // 忽略lint的文件
    ignores,
    // 继承规则
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      eslintConfigPrettier.recommended,
      eslintImport.recommended,
      eslintPromise.recommended,
    ],
    // 插件配置
    plugins: {
      prettier: eslintPluginPrettier,
    },
    languageOptions: {
      // ecma版本
      ecmaVersion: 'latest',
      // 模块化类型
      sourceType: 'module',
      // 使用typescript-eslint解析器
      parase: tseslint.parser,
      globals: {
        // 浏览器全局变量,不加上使用全局变量(例如window)会警告
        ...globals.browser,
      },
    },
    // 自定义lint规则
    rules: {
      // 禁止使用var定义变量
      'no-var': 'error',
    },
  },
])
```

```js [vue+eslint环境]
import { defineConfig } from 'eslint/config'
import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginPrettier from 'eslint-plugin-prettier'
import eslintImport from 'eslint-plugin-import'
import eslintPromise from 'eslint-plugin-promise'
import eslintVue from 'eslint-plugin-vue'
import globals from 'globals'

const ignores = ['**/dist/**', '**/node_modules/**', '.*', 'scripts/**', '**/*.d.ts']

export default defineConfig([
  // 通用配置
  {
    // 忽略lint的文件
    ignores,
    // 继承规则
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      eslintConfigPrettier.recommended,
      eslintImport.recommended,
      eslintPromise.recommended,
    ],
    // 插件配置
    plugins: {
      prettier: eslintPluginPrettier,
    },
    languageOptions: {
      // ecma版本
      ecmaVersion: 'latest',
      // 模块化类型
      sourceType: 'module',
      // 使用typescript-eslint解析器
      parase: tseslint.parser,
      globals: {
        // 浏览器全局变量,不加上使用全局变量(例如window)会警告
        ...globals.browser,
      },
    },
    // 自定义lint规则
    rules: {
      // 禁止使用var定义变量
      'no-var': 'error',
    },
  },
  // 针对vue相关环境配置
  {
    ignores,
    // 仅针对src目录下的js,jsx,ts,tsx,vue文件lint
    files: ['src/**/*.{js,jsx,ts,tsx,vue}'],
    extends: [...eslintVue.configs['flat/recommended'], eslintConfigPrettier],
    languageOptions: {
      globals: {
        // 浏览器全局变量,不加上使用全局变量(例如window)会警告
        ...globals.browser,
      },
    },
    // 自定义lint规则
    rules: {},
  },
])
```

:::

#### OxcLint

### CSSLint工具

## 拼写检查

cspell是一个基于Node.js的拼写检查工具,可以检查文本文件中的拼写错误。在monorepo项目中,可以使用cspell检查所有子项目的代码文件。

```bash
# (1).安装cspell cspell-dictionary是一个用于检查单词和获取建议的拼写词典库
pnpm add -D cspell cspell-dictionary
# (2).新建cspell配置文件
touch cspell.json
```

cspell.json配置如下:

```json
{
  "import": ["@cspell/dict-lorem-ipsum/cspell-ext.json"],
  "caseSensitive": false,
  "dictionaries": ["custom-dictionary"],
  "dictionaryDefinitions": [
    {
      "name": "custom-dictionary",
      "path": "./.cspell/custom-dictionary.txt",
      "oddWords": true
    }
  ],
  "ignorePaths": [
    "**/node_modules/**",
    "**/bower_components/**",
    "**/dist/**",
    "**/public/**",
    "**/static/**",
    "eslint.config.js",
    "prettier.config.js"
  ]
}
```

## Git提交规范

## 公共库打包

## 子包依赖

Monorepo 项目中,子包之间相互依赖很常见,例如子项目A依赖于子项目B,子包之间的依赖关系可以通过 `workspaces` 字段在根项目的 `package.json` 中进行配置。子项目A的package.json中添加如下依赖:

```json
{
  "dependencies": {
    "sub-project-b": "workspace:*"
  }
}
```

## 单元测试

## 发布
