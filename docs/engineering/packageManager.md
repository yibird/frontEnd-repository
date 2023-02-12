常有前端包管理工具

| 名称 | 描述 |
| ---- | ---- |
| npm  |      |

package.json 文件是 Node 项目的核心。 它记录了有关发布到 NPM 之前所需要的项目的重要元数据,它还定义了 npm 用于安装依赖项、运行脚本以及标识包的入口点的项目功能属性。package.json 中内容是一个标准的 JSON 字符串,package.json 的配置项如下:

```json
{
  // 包名称
  "name": "xxxx",
  // 包版本号
  "version": "1.0.0",
  // 包描述
  "description": "这是一个非常库的package",
  // 包的搜索关键词,用于npm search检索包
  "keywords": "vue vue3 ts typescript",
  // 项目主页的 url
  "homePage": "https://github.com/yibird",
  /*
   * 用于描述项目发生错误时,项目的issue和错误反馈邮箱,bugs可以是一个字符串表示url,
   * 也可以是一个对象
   */
  "bugs": {
    "url": "https://github.com/owner/project/issues",
    "email": "2684837849@qq.com"
  },
  /*
   * license用于定义当前包的许可证,可选值有:
   * ISC:
   * (MIT OR Apache-2.0):
   * MIT:
   *
   * UNLICENSED:表示无许可证,一般用于私有包,通常搭配"private":true将当前包设置为私有
   */
  "license": "MIT",
  // 程序的主入口
  "main": "./src/index.js",
  /*
   * author用于描述包作者的名字、邮箱、主页信息,author可以是一个字符串,
   * 例如: "zchengfeng <2684837849@qq.com>"
   */
  "author": {
    // 作者名字
    "name": "zchengfeng",
    // 作者邮箱
    "email": "2684837849@qq.com",
    // 作者主页
    "url": "https://github.com/yibird"
  },
  /*
   * repository用于描述包仓库信息,repository也可以是一个字符串,例如:
   * "npm/npm"、"github:user/repo"、"gist:11081aaa281"、"bitbucket:user/repo"、
   * "gitlab:user/repo"
   */
  "repository": {
    // 仓库类型
    "type": "git",
    // 仓库地址
    "url": "https://github.com/npm/cli.git",
    // 仓库目录
    "directory": "packages/react-dom"
  },
  /*
   *
   */
  "dependencies": {},
  /*
   * devDependencies用于定义当前包在开发环境所使用的依赖,对于不想生产环境包含的依赖
   * 都可以放在devDependencies,当执行时npm link或npm install从包的根目录安装。
   */
  "devDependencies": {
    // "依赖名":"依赖版本号"
    "@vue/component-compiler-utils": "^3.3.0"
  },
  "peerDependencies": {},
  "bundledDependencies": {},
  "optionalDependencies": {},
  // 用于指定node和npm的版本要求
  "engines": {}
}
```
