## 1.CSS 盒子模型

浏览器会把所有 DOM 元素都看成一个盒子,盒子由 margin(盒子外边距)、padding(盒子内边距)、border(盒子边框)、content(盒子内容)4 部分组成。

盒子模型可分为标准盒子模型和怪异盒子模型,`box-sizing:content-box`可以将元素设置为标准盒子模型, `box-sizing:border-box`可以将元素设置为怪异盒子模型。标准盒子模型会把 padding 撑开,而怪异模式则相当于将盒子的大小固定好,再将内容装入盒子,盒子的大小并不会被 padding 所撑开。

- 标准盒子模型下:`盒子总宽度/高度 = 内容 width/内容 height + padding + border + margin`。
- 怪异盒子模型下:`盒子总宽度/高度 = 内容 width/内容 height + margin`。 标准盒子模型下盒子的宽高会包含 padding 和 border,而怪异盒子模型下盒子的宽高不包含 padding 和 border。

## 2.CSS BFC

## 3.BEM 命名规范
