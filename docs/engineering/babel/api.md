Babel 在不同的编译阶段,提供了对应的 API:

- parse 阶段:Babel 提供了`@babel/parser`用于将源码转成 AST。
- transform 阶段:Babel 提供了`@babel/traverse`用于遍历 AST,并调用 visitor 函数修改 AST。由于修改 AST 涉及到 AST 的判断、创建、修改等操作,Babel 提供了`@babel/types`。Babel 还提供了`@babel/template`来简化创建 AST 的逻辑。
- generate 阶段:Babel 提供了`@babel/generator`用于将 AST 输出为目标代码,同时生成 sourcemap。

Babel 提供了`@babel/code-frame`用于在代码出现错误时打印代码位置信息。Babel 提供了`@babel/core`用于整体编译,其内部正是基于上面的包完成整体的编译流程,并应用于 plugin 和 preset。
