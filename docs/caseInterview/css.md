### CSS 盒子模型是什么?什么是怪异盒子模型?

浏览器会把所有 DOM 元素都看成一个盒子,盒子由 margin(盒子外边距)、padding(盒子内边距)、border(盒子边框)、content(盒子内容)4 部分组成。

盒子模型可分为标准盒子模型和怪异盒子模型,标准盒子模型可以通过 `box-sizing:content-box` 设置,怪异盒子模型通过 `box-sizing:border-box` 设置。标准盒子模型会把 padding 撑开,而怪异模式则相当于将盒子的大小固定好,再将内容装入盒子,盒子的大小并不会被 padding 所撑开。

- 标准盒子模型下:盒子总宽度/高度 = 内容 width/内容 height + padding + border + margin。
- 怪异盒子模型下:盒子总宽度/高度 = 内容 width/内容 height + margin。 标准盒子模型下盒子的宽高会包含 padding 和 border,而怪异盒子模型下盒子的宽高不会包含 padding 和 border。

### 什么是 BFC?触发 BFC 的条件?

BFC 是 Block formatting context 的简称,中文译为块级格式化上下文。BFC 是 Web 页面 CSS 视觉渲染的一部分,用于决定块盒子的布局及浮动相互影响范围的一个区域。BFC 触发条件如下:

- 根元素（`<html>`）。
- float 值非 `none`。
- overflow 值非 `visible`。
- display 值为 `inline-block`、`table-cell`、`table-caption`、`flex`、`inline-flex`。
- position 值为 `absolute`、`fixed`。

BFC 特点:

- 属于同一个 BFC 的两个相邻容器的上下 margin 会重叠(重点)。例如有元素 1 和元素 2 两个元素,元素 1 设置的外边距为`margin:10px 0;`,元素 2 设置的外边距为`margin:30px 0;`,按常理来说元素 1 距离元素 2 为元素 1 和元素 2 的外边距之和(10px+30px=40px),但在实际中元素 1 和元素 2 距离 30px,这是因为垂直外边距会折叠,它们的两个外边距之和是以较大的 margin 的为准。解决 margin 重叠也非常简单,由于 BFC 就是页面上的一个独立容器,容器内部元素不会影响容器外部元素,所以需要将两个元素处于不同的 BFC 即可。
- 计算 BFC 高度时浮动元素也参于计算(重点)。当元素设置浮动时则会脱离文档流,导致父元素高度塌陷,如果父元素没有创建 BFC,在计算高度时,浮动元素不会参与计算,此时就会出现高度塌陷。启用 BFC 计算 BFC 高度时,包含 BFC 内所有元素,即使是浮动元素也会参与计算。
- BFC 的区域不会与浮动容器发生重叠(重点)。在两栏布局中如果父元素没有创建 BFC,子元素的浮动会导致元素重叠,无法实现自适应两栏效果,因为浮动会导致元素脱离文档流,元素创建 BFC 后 BFC 区域与浮动容器不会发生重叠。
- BFC 内的容器在垂直方向依次排列。类似正常情况下块元素在垂直方向上依次排列。
- 元素的 margin-left 与其包含块的 border-left 相接触。
- BFC 是独立容器,容器内部元素不会影响容器外部元素。

### display:none、visibility:hidden、opacity:0 之间的区别?

首先 display:none、visibility:hidden、opcacity:0 三者都可以隐藏元素,它们的区别如下:

- 当元素设置为 display:none 时,它及其它所有的子元素都会隐藏,隐藏后的元素无法进行点击,display:none 会改变布局,但不会占据布局空间。
- 当元素设置为 visibility:hidden 时,visibility:hidden 不会改变页面布局,隐藏的元素仍会占据布局空间,但是不会触发隐藏元素所绑定的事件。
- 当元素设置为 opacity:0 时,opacity:0 不会改变页面布局,隐藏的元素仍会占据布局空间,可以正常触发隐藏元素所绑定的事件。

### CSS 样式优先级顺序?

在 CSS 中不同选择器设置的样式优先级右优先级加权值控制,注意:CSS 加权值不是一个数字,而是一个进制数,在 IE6 为 256,后来扩大到了 65536,而现代浏览器则采用更大的数量。CSS 样式优先级规则:

- 权重不同的样式规则作用于同一元素时,权重高的规则生效；
- 权重相同的样式规则作用于同一元素时,后声明的规则生效；
- 选择器在 DOM 中的位置关系不会对规则产生影响。

CSS 样式权重值:

- !important:使用!important 修饰的样式优先级为无条件绝对优先。
- 内联样式:优先级加权值为 1000。
- ID 选择器:优先级加权值为 100。
- 类选择器:优先级加权值为 10。
- 属性选择器:优先级加权值为 10。
- 伪元素或伪对象选择器:优先级加权值为 1。
- 标签选择器:优先级加权值为 1。
- 其他选择器:优先级加权值为 0,如通配选择器(\*)、伪元素选择器(:)、子元素器(>)、相邻元素器(+)等。

!important 修饰的样式 > 内联样式 > ID 选择器 > 类选择器 = 属性选择器 = 伪类选择器 > 标签选择器 = 伪元素选择器。
如果权重相同,后声明的规则则优先生效。

### CSS 如何清除浮动?

- 在需要清除浮动的后元素后添加一个元素,并向这个元素添加`clear:both;`样式。
- 向需要清除浮动元素的父元素添加`overflow:hidden`元素。`overflow:hidden`会触发 BFC,从而可以清除子元素浮动。
- 使用伪类元素清除浮动(推荐)。想需要清除浮动元素的伪元素添加`clear:both`样式。

### CSS 实现响应式的有哪几种方法?

#### 媒体查询(@media)

使用@media 媒体查询可以针对不同的媒体类型定义不同的样式,特别是响应式页面,可以针对不同屏幕的大小,编写多套样式,从而达到自适应的效果。当使用多套媒体查询会导致样式颇为繁琐。

#### 百分比

比如当浏览器的宽度或者高度发生变化时,通过百分比单位,通过百分比单位可以使得浏览器中的组件的宽和高随着浏览器的变化而变化,从而实现响应式的效果。height,width 属性的百分比依托于父标签的宽高,但是 padding、border、margin 等属性的情况又不一样。

- 子元素的 padding 如果设置百分比,不论是垂直方向或者是水平方向,都相对于直接父亲元素的 width,而与父元素的 height 无关。
- 子元素的 margin 如果设置成百分比,不论是垂直方向还是水平方向,都相对于直接父元素的 width。
- border-radius 则不一样,如果设置 border-radius 为百分比,则是相对于自身的宽度。
  使用百分比的缺点是计算困难,例如要定义一个元素的宽度和高度,按照设计稿,必须换算成百分比单位。

#### vw/vh 单位

css3 中引入了一个新的单位 vw/vh,与视图窗口有关,vw 表示相对于视图窗口的宽度,vh 表示相对于视图窗口高度。任意层级元素,在使用 vw 单位的情况下,1vw 都等于视图宽度的百分之一。与百分比布局很相似,但更好用。

#### rem 布局(推荐)

rem 单位是相对于字体大小的 html 元素,也称为根元素。默认情况下,html 元素的 font-size 为 16px。所以此时 1rem = 16px。下面代码实现了无论设备可视窗口如何变化,始终设置 rem 为 width 的 1/10,即实现了百分比布局。

```js
// 动态为根元素设置字体大小
function init() {
  // 获取屏幕宽度
  var width = document.documentElement.clientWidth;
  // 设置根元素字体大小。此时为宽的10等分
  document.documentElement.style.fontSize = width / 10 + "px";
}

// 首次加载应用，设置一次
init();
// 监听手机旋转的事件的时机，重新设置
window.addEventListener("orientationchange", init);
// 监听手机窗口变化，重新设置
window.addEventListener("resize", init);
```

为什么推荐 rem 布局而不是 vw/vh 单位?

- vw/vh 单位依赖于视口单位,而视口单位缺点是没有最大或最小的限制,可能会导致窗口太小、字体不清晰等问题。
- vw/vh 是 CSS3 新推出的特性,兼容性较差,ios8、Android4.4 以上才兼容,目前 vw/vh 已经兼容大部分设备。
- 虽然 rem 相对于根元素字体大小,但这会导致于根元素的字体大小强耦合。当 rem 单位进行转换时,可能会出现小数点,导致部分安卓机很容易出现的样式错乱的问题。

#### flex 和 grid 布局

### CSS`:`与`::`的区别?

`:`表示伪类,而`::`表示伪元素,CSS 伪类用于向某些选择器添加特殊效果,伪类其实与普通的 CSS 类相类似,可以为已有的元素添加样式,但是它只有处于 DOM 无法描述的状态下才能为 DOM 树中的元素添加样式,所以将其称为伪类。伪元素用于创建一些不在 DOM 中的元素,并且为它添加样式。伪类与伪元素的区别在于伪类的操作对象是 DOM 树中已有的元素,而伪元素则创建了一个 DOM 树以外的元素。

常见伪类如下:

- `:active`:元素激活时触发的伪类。
- `:checked`:元素选中时触发的伪类。
- `:disabled`:元素禁用时触发的伪类。
- `:enabled`:元素启用时触发的伪类。
- `:focus`:元素获得焦点时触发的伪类。
- `:hover`:鼠标悬浮到元素上时触发的伪类。
- `:link`:未被访问链接的伪类。
- `:not(selector)`:排除某些选择器的伪类。

表示伪元素,常见伪元素如下:
`::after`:在某个元素之后的伪元素。
`::before`:在某个元素之前的伪元素。
`::first-letter`:元素内容首字母的伪元素。
`::first-line`:元素内容首行的伪元素。

### CSS 的行内元素和块级元素有哪些?

行内元素与块级元素的区别:

- 行内元素不会占据整行,在一条直线上水平排列;块级元素会占据整行,在一条直线上垂直排列。`display:line-block`可将块级元素设置为行内元素,`display:block`可将行内元素设置为块级元素。
- 行内元素与块级元素盒模型不同。行内元素设置 width、height(可以设置 line-height)、marggin、padding 属性无效,而块级元素可以正常设置。
- 块级元素可以包含块级和行内元素,而行内元素不能包裹块级元素。

块级元素包括:`div`、`p`、`h1到h6`、`ul和li`、`ol与dl`、`form`、`address`、`table`、`hr`、`menu`、`fieldset`。

行内元素包括`span`、`img`、`br`、`label`、`i`、`input`、`select`、`textarea`、`strong`、`em`、`cite`。

### CSS 重绘和重排(回流)

- 重绘(Repaint):当元素的一部分属性发生改变,如外观、背景、颜色等不会引起布局变化,只需要浏览器根据元素的新属性重新绘制,使元素呈现新的外观叫做重绘。引起重绘的 CSS 属性有:`color`、`border-style`、`visibility`、`background`、`text-decoration`、`background-image`、`background-position`、`background-repeat`、`transfrom`、`will-change`等。

- 重排:重排也叫回流(reflow),是指当 render 树中的一部分或者全部因为大小边距等问题发生改变而需要 DOM 树重新计算的过程。重排必定引起重绘,而重绘不一定引起重排。引起重排的场景有:
  - 页面初始化。
  - CRUD 元素,元素的删除与添加,元素内容的改变。
  - 元素尺寸的变化。例如元素的 padding、margin、border-width、width、height、font-size 等几何属性。
  - 浏览器窗口大小改变。
  - 添加或删除样式。例如添加或删除元素的 style 和 class 属性。
  - 激活伪类。例如:hover。

减少重绘(Repaint)和重排(Reflow)的措施:

- 不要一条一条地修改 DOM 的样式,可以先定义好 css 的 class，然后修改 DOM 的 className。
- 禁止在循环内频繁触发重绘或重排,而是将多个操作进行合并,然后再触发重绘或重排,这样只会造成一次重绘或重排。
- 开启 GPU 的硬件加速。浏览器接收到页面文档后,会将文档中的标记语言解析为 DOM 树。DOM 树和 CSS 结合后形成浏览器构建页面的渲染树。渲染树中包含了大量的渲染元素,每一个渲染元素会被分到一个图层中,每个图层又会被加载到 GPU 形成渲染纹理,而图层在 GPU 中是不会触发 重绘的(Repaint)的。CSS 的`transfrom`、`opacity`、`filter`、`will-change`都支持 GPU 硬件加速(开启 GPU 加速会消耗更多的内存,使用 GPU 渲染会影响字体的抗锯齿效果)。例如使用 transfrom 替代元素的边距进行位移形变,使用 opacity 代替 visibility,使用 will-change 提高页面滚动、动画等渲染性能。

### CSS 实现垂直居中

- 绝对定位+transform 实现非固定宽高垂直居中。优点是兼容性好,注意:使用 transform 进行位移时可能会导致背景或文字模糊,这是因为 transform 变换会在浏览器上单独创建一个绘画层并重新进行渲染,rotate 渲染的时候,由于图层渲染的时候也处理了周围的文字,如果高度为奇数的文字可能会存在半个像素的计算量,浏览器对这半个像素会进行优化渲染,所以边缘会出现模糊的情况。解决办法是将形变或位移量改为偶整数,或使用 zoom。

```css
/* 父元素相对定位 */
.parent {
  position: relative;
}
/* 子元素绝对定义,设置top、left边距,通过transform位移垂直居中 */
.child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

- flex 布局,justify-content 设置元素主轴居中,align-item 设置元素纵轴居中。优点是实现简单,大部分浏览器都支持 flex 布局。

```css
/* 父元素设置flex布局垂直居中 */
.parent {
  display: flex;
  justify-content: center;
  align-item: center;
}
```

- grid 布局,设置父元素为 grid 布局,justify-content 使单元格内部居中,align-items 使单元格垂直居中。优点实现简单,但兼容性不好。

```css
.parent {
  display: grid;
  justify-content: center;
  align-items: center;
}
/* grid垂直居中简写 */
.parent {
  display: grid;
  /* place-items是align-items和justify-content的简写 */
  place-items: center;
}
```

- table 布局。父元素设置 table 布局以 table 的方式渲染元素,子元素样式设置为 display:table-cell 以 table 单元格的方式渲染元素,设置子元素的样式 vertical-align:middle 使子元素垂直,设置父元素 text-align:center 使子元素居中。
  (注意:vertical-align 只用于设置行内元素的对齐方式,当元素的 display 属性为 inline、inline-block、inline-table、table-cell 时才会生效)。优点是兼容性好,但实现复杂。

```css
.parent {
  display: table;
  text-align: center;
  width: 200px;
  height: 200px;
}
.child {
  display: table-cell;
  /* 垂直对齐 */
  vertical-align: middle;
}
```
