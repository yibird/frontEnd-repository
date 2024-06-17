## 1.CSS 盒子模型是什么?什么是怪异盒子模型?

浏览器会把所有 DOM 元素都看成一个盒子,盒子由 margin(盒子外边距)、padding(盒子内边距)、border(盒子边框)、content(盒子内容)4 部分组成。

盒子模型可分为标准盒子模型和怪异盒子模型,标准盒子模型可以通过 `box-sizing:content-box` 设置,怪异盒子模型通过 `box-sizing:border-box` 设置。标准盒子模型会把 padding 撑开,而怪异模式则相当于将盒子的大小固定好,再将内容装入盒子,盒子的大小并不会被 padding 所撑开。

- 标准盒子模型下:`盒子总宽度/高度 = 内容 width/内容 height + padding + border + margin`。
- 怪异盒子模型下:`盒子总宽度/高度 = 内容 width/内容 height + margin`。 标准盒子模型下盒子的宽高会包含 padding 和 border,而怪异盒子模型下盒子的宽高不会包含 padding 和 border。

## 2.什么是 BFC?触发 BFC 的条件有哪些?

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

## 3.display:none、visibility:hidden、opacity:0 之间的区别?

首先 `display:none`、`visibility:hidden`、`opcacity:0` 三者都可以隐藏元素,它们的区别如下:

- 当元素设置为 display:none 时,它及其它所有的子元素都会隐藏,隐藏后的元素无法进行点击,display:none 会改变布局,但不会占据布局空间。
- 当元素设置为 visibility:hidden 时,visibility:hidden 不会改变页面布局,隐藏的元素仍会占据布局空间,但是不会触发隐藏元素所绑定的事件。
- 当元素设置为 opacity:0 时,opacity:0 不会改变页面布局,隐藏的元素仍会占据布局空间,可以正常触发隐藏元素所绑定的事件。

## 4.CSS 样式优先级顺序?

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

## 5.CSS 如何清除浮动?

- 在需要清除浮动的后元素后添加一个元素,并向这个元素添加`clear:both;`样式。
- 向需要清除浮动元素的父元素添加`overflow:hidden`元素。`overflow:hidden`会触发 BFC,从而可以清除子元素浮动。
- 使用伪类元素清除浮动(推荐)。在想需要清除浮动元素的伪元素添加`clear:both`样式。

## 6.CSS 实现响应式的有哪几种方法?

- **使用媒体查询(@media)**。使用@media 媒体查询可以针对不同的媒体类型定义不同的样式,特别是响应式页面,可以针对不同屏幕的大小,编写多套样式,从而达到自适应的效果。当使用多套媒体查询会导致样式颇为繁琐。
- **使用百分比单位**。比如当浏览器的宽度或者高度发生变化时,通过百分比单位,通过百分比单位可以使得浏览器中的组件的宽和高随着浏览器的变化而变化,从而实现响应式的效果。height,width 属性的百分比依托于父标签的宽高,但是 padding、border、margin 等属性的情况又不一样。
  - 子元素的 padding 如果设置百分比,不论是垂直方向或者是水平方向,都相对于直接父亲元素的 width,而与父元素的 height 无关。
  - 子元素的 margin 如果设置成百分比,不论是垂直方向还是水平方向,都相对于直接父元素的 width。
  - border-radius 则不一样,如果设置 border-radius 为百分比,则是相对于自身的宽度。
    使用百分比的缺点是计算困难,例如要定义一个元素的宽度和高度,按照设计稿,必须换算成百分比单位。
- **使用 vw/vh 单位**。css3 中引入了一个新的单位 vw/vh,与视图窗口有关,vw 表示相对于视图窗口的宽度,vh 表示相对于视图窗口高度。任意层级元素,在使用 vw 单位的情况下,1vw 都等于视图宽度的百分之一。与百分比布局很相似,但更好用。
- **使用 rem 布局**。rem 单位是相对于字体大小的 html 元素,也称为根元素。默认情况下,html 元素的 font-size 为 16px。所以此时 1rem = 16px。下面代码实现了无论设备可视窗口如何变化,始终设置 rem 为 width 的 1/10,即实现了百分比布局。

```js
// 动态为根元素设置字体大小
function init() {
  // 获取屏幕宽度
  var width = document.documentElement.clientWidth;
  // 设置根元素字体大小。此时为宽的10等分
  document.documentElement.style.fontSize = width / 10 + 'px';
}

// 首次加载应用,设置一次
init();
// 监听手机旋转的事件的时机,重新设置
window.addEventListener('orientationchange', init);
// 监听手机窗口变化,重新设置
window.addEventListener('resize', init);
```

为什么推荐 rem 布局而不是 vw/vh 单位?

- vw/vh 单位依赖于视口单位,而视口单位缺点是没有最大或最小的限制,可能会导致窗口太小、字体不清晰等问题。
- vw/vh 是 CSS3 新推出的特性,兼容性较差,ios8、Android4.4 以上才兼容,目前 vw/vh 已经兼容大部分设备。
- 虽然 rem 相对于根元素字体大小,但这会导致于根元素的字体大小强耦合。当 rem 单位进行转换时,可能会出现小数点,导致部分安卓机很容易出现的样式错乱的问题。

- **使用 flex 或者 grid 布局**。

## 7.CSS`:`与`::`的区别?

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

## 8.CSS 的行内元素和块级元素有哪些?

行内元素与块级元素的区别:

- 行内元素不会占据整行,在一条直线上水平排列;块级元素会占据整行,在一条直线上垂直排列。`display:line-block`可将块级元素设置为行内元素,`display:block`可将行内元素设置为块级元素。
- 行内元素与块级元素盒模型不同。行内元素设置 width、height(可以设置 line-height)、marggin、padding 属性无效,而块级元素可以正常设置。
- 块级元素可以包含块级和行内元素,而行内元素不能包裹块级元素。

块级元素包括:`div`、`p`、`h1到h6`、`ul和li`、`ol与dl`、`form`、`address`、`table`、`hr`、`menu`、`fieldset`。

行内元素包括`span`、`img`、`br`、`label`、`i`、`input`、`select`、`textarea`、`strong`、`em`、`cite`。

## 9.CSS 重绘和重排(回流)

- 重绘(Repaint):当元素的一部分属性发生改变,如外观、背景、颜色等不会引起布局变化,只需要浏览器根据元素的新属性重新绘制,使元素呈现新的外观叫做重绘。引起重绘的 CSS 属性有:`color`、`border-style`、`visibility`、`background`、`text-decoration`、`background-image`、`background-position`、`background-repeat`、`transfrom`、`will-change`等。

- 重排:重排也叫回流(reflow),是指当 render 树中的一部分或者全部因为大小边距等问题发生改变而需要 DOM 树重新计算的过程。重排必定引起重绘,而重绘不一定引起重排。引起重排的场景有:
  - 页面初始化。
  - CRUD 元素,元素的删除与添加,元素内容的改变。
  - 元素尺寸的变化。例如元素的 padding、margin、border-width、width、height、font-size 等几何属性。
  - 浏览器窗口大小改变。
  - 添加或删除样式。例如添加或删除元素的 style 和 class 属性。
  - 激活伪类。例如:hover。

减少重绘(Repaint)和重排(Reflow)的措施:

- 不要一条一条地修改 DOM 的样式,可以先定义好 css 的 class,然后修改 DOM 的 className。
- 禁止在循环内频繁触发重绘或重排,而是将多个操作进行合并,然后再触发重绘或重排,这样只会造成一次重绘或重排。
- 开启 GPU 的硬件加速。浏览器接收到页面文档后,会将文档中的标记语言解析为 DOM 树。DOM 树和 CSS 结合后形成浏览器构建页面的渲染树。渲染树中包含了大量的渲染元素,每一个渲染元素会被分到一个图层中,每个图层又会被加载到 GPU 形成渲染纹理,而图层在 GPU 中是不会触发 重绘的(Repaint)的。CSS 的`transfrom`、`opacity`、`filter`、`will-change`都支持 GPU 硬件加速(开启 GPU 加速会消耗更多的内存,使用 GPU 渲染会影响字体的抗锯齿效果)。例如使用 transfrom 替代元素的边距进行位移形变,使用 opacity 代替 visibility,使用 will-change 提高页面滚动、动画等渲染性能。

## 10.CSS 实现垂直居中方式有哪些?

- **绝对定位+transform 实现非固定宽高垂直居中**。优点是兼容性好,注意:使用 transform 进行位移时可能会导致背景或文字模糊,这是因为 transform 变换会在浏览器上单独创建一个绘画层并重新进行渲染,rotate 渲染的时候,由于图层渲染的时候也处理了周围的文字,如果高度为奇数的文字可能会存在半个像素的计算量,浏览器对这半个像素会进行优化渲染,所以边缘会出现模糊的情况。解决办法是将形变或位移量改为偶整数,或使用 zoom。

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

- **使用 flex 布局**,justify-content 设置元素主轴居中,align-item 设置元素纵轴居中。优点是实现简单,大部分浏览器都支持 flex 布局。

```css
/* 父元素设置flex布局垂直居中 */
.parent {
  display: flex;
  justify-content: center;
  align-item: center;
}
```

- **使用 grid 布局**。设置父元素为 grid 布局,justify-content 使单元格内部居中,align-items 使单元格垂直居中。优点实现简单,但兼容性不好。

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

- **使用 table 布局**。父元素设置 table 布局以 table 的方式渲染元素,子元素样式设置为 display:table-cell 以 table 单元格的方式渲染元素,设置子元素的样式 vertical-align:middle 使子元素垂直,设置父元素 text-align:center 使子元素居中。
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

## 11.flex:1 表示什么?

`flex:1`是`flex:1 1 0`的简写,而 flex 是一个复合属性,由 flex-grow、flex-shrink、flex-basis 三个属性组成:

- flex-grow:用于设置弹性项目的放大比例(弹性增长因子),指定弹性项目在弹性容器中分配剩余可用空间的比例。默认为 0,表示即如果存在剩余空间,也不放大。如果所有项目的 flex-grow 属性都为 1,则它们将等分剩余空间(如果有的话)。如果一个项目的 flex-grow 属性为 2,其他项目都为 1,则前者占据的剩余空间将比其他项多一倍。
- flex-shrink:用于设置弹性项目的缩小比例(弹性缩小因子),指定弹性项目在弹性容器中缺少空间时的收缩比例。默认为 1,即如果空间不足,该项目将缩小。如果所有项目的 flex-shrink 属性都为 1,当空间不足时,都将等比例缩小。如果一个项目的 flex-shrink 属性为 0,其他项目都为 1,则空间不足时,前者不缩小。
- flex-basis:用于设置弹性项目的基准大小,指定弹性项目在弹性容器中的初始大小。默认值为 auto,即项目的本来大小。

设置`flex:1`可以使弹性项目可以自动方法或缩小,以填充弹性容器的可用空间,并且它们的初始大小为 0。flex 属性还有 auto(1 1 auto)和 none(0 0 auto)两个快捷值。

## 12.CSS 隐藏元素的 10 种方式?

- 使用`display: none;`完全隐藏元素并从文档流中删除它。
- 使用`opacity:0;`设置透明度为 0,使其元素不可见。
- 使用`visibility:hidden;`隐藏元素但保留其占据的空间。
- 使用`height: 0; width: 0; overflow: hidden;`设置元素宽高为 0,溢出内容并隐藏。
- 使用`position: absolute; left: -9999px;`将元素的位置移动到文档流之外。
- 使用`clip: rect(0 0 0 0);`通过裁剪来隐藏元素。
- 使用`z-index: -1;`将元素置于 z 轴的底部,使其在其他元素之后(在其他元素层级之下)。
- 使用`pointer-events: none;`阻止元素的交互,使其无法单击或触摸。
- 使用`transform:scale(0)`将元素的缩放比例设置为 0,使其完全不可见。
- 使用`filter: blur(0);`将元素模糊度设置为 0,使其完全不可见。

### 13.CSS 如何绘制 0.5px 的边框线?

CSS 中的像素（px）是相对单位,其大小取决于显示器的分辨率和缩放比例。通常情况下,1 个像素对应于显示器上的 1 个物理像素。因此,如果要绘制 0.5px 的边框线,这在大多数情况下是不可能的。但是可以通过使用 CSS 的 transform 属性和缩放(scale)函数来实现近似于 0.5px 的边框线。

```css
.border-half {
  position: relative;
}
.border-half::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: black;
  transform-origin: top left;
  transform: scale(0.5);
  z-index: -1;
}
```

- 首先,将要绘制边框线的元素设置为 `position: relative`。
- 创建一个伪元素(pseudo-element)并将其定位在要绘制边框线的元素内部,同时设置其大小和背景色。
- 使用 `transform:scale()`函数将伪元素缩小一半,即将其宽度和高度均缩小为 50%。
- 将伪元素的位置稍微调整,使其覆盖在原始元素的边缘处,从而形成近似于 0.5px 的边框线。

## 14.CSS 如何支持小于 12px 的文字?

CSS 中可以使用 font-size 属性设置文字的大小,可以设置的值包括像素（px）、百分比（%）、em、rem 等单位。
然而,对于小于 12px 的字号,需要考虑到字体在小尺寸下的可读性,因此一些浏览器可能会默认限制最小字号为 12px,即使设置了更小的字体值。设置小于 12px 的文字方法:

- 使用相对单位。使用 em 或 rem 等相对单位来定义字体大小,相对单位是相对于父元素的字体大小来计算的,因此在不同尺寸的设备上显示更为稳定。
- 使用 Web 字体。有些字体在小尺寸下更为清晰易读,可以尝试使用这些字体来显示小字号的文本。
- 使用 transform 缩小。可以使用 CSS transform 属性中的 scale 来缩小文本大小,但需要注意会改变字体的锐利度和字体形状,不一定适用于所有场景。

## 15.CSS Sprites 是什么？它有哪些优缺点？

CSS Sprites 是一种优化网站性能的技术,它将多个小图标或背景图像合并为一个大图像,然后使用 CSS 的 `background-image`、`background-position` 和 `background-size` 属性将所需部分显示出来。

优点:

- 减少了 HTTP 请求的数量。每个 HTTP 请求都会增加页面加载时间,因此通过将多个图像合并为一个图像来减少 HTTP 请求可以显著提高页面加载速度。
- 减少了图像的下载时间。合并后的图像比单个图像的总下载时间更短。
- 减少了服务器负载。减少了 HTTP 请求的数量可以降低服务器的负载,从而提高网站的性能和可伸缩性。
- 改善了用户体验。网站加载速度更快,用户可以更快地浏览和交互,从而提高用户体验。

缺点:

- 维护困难。由于所有图像都合并到一个文件中,因此添加、删除或修改其中一个图像可能需要重新生成整个图像文件,这可能会导致一些额外的工作。
- 难以管理大量图像。如果需要使用大量图像,合并到一个图像中可能会导致图像文件变得非常大,从而影响网站的性能。
- 不适用于动态图像。由于 CSS Sprites 是使用 CSS 背景图像技术实现的,因此它不适用于动态图像,例如带有动画效果的图像。
- 兼容性问题。在一些旧版本的浏览器中,CSS Sprites 可能无法正常工作,这可能需要针对不同的浏览器提供不同的解决方案。

## 16.display:inline-block 什么时候会显示间隙？

- 在使用 `display: inline-block` 时,可能会出现间隙的情况有以下几种：

- HTML 中的空格和换行符会被当作一个空白字符,而 display: inline-block 元素之间有空格或换行符时,会产生间隙。解决方法是去掉元素之间的空格或者使用负 margin 值来消除间隙。
- 元素的父元素存在字体大小和行高导致的空隙,因为 `display: inline-block` 元素默认是基于父元素的基线对齐的。解决方法是设置父元素的 `font-size: 0` 和 `line-height: 0` 来消除间隙。

- 元素的宽度和高度不一致,或者存在边框和内边距时,也会导致间隙的出现。解决方法是设置元素的 `box-sizing: border-box` 来将边框和内边距算入元素的宽度和高度。

- 元素被放在一行的末尾或者下一行的开头,因为 HTML 中的换行符会被当作空白字符处理,所以会产生间隙。解决方法是使用 CSS 的 `white-space` 属性来控制空格和换行符的处理方式。

## 17.CSS 的单位有哪些？

CSS（Cascading Style Sheets）支持多种单位,以下是一些常用的 CSS 单位:

- 像素(px):最常用的单位之一,相对于屏幕分辨率而言,具有固定的像素值。
- 百分比(%):相对于父元素的大小,例如一个元素宽度设置为 50%,它将会是其父元素宽度的一半。
- em:相对于父元素的字体大小,例如一个元素字体大小设置为 2em,它将会是其父元素字体大小的两倍。
- rem:相对于根元素(即 HTML 元素)的字体大小,与 em 类似,但不受父元素影响。
- vh 和 vw:视窗高度和宽度的百分比,例如一个元素高度设置为 50vh,它将会是视窗高度的一半。
- pt:磅数,通常用于打印样式表。
- cm、mm、in、pc：厘米、毫米、英寸、派卡,通常用于打印样式表。

需要注意的是,不同单位之间不能直接进行计算。例如,不能将一个元素的宽度设置为 10px + 20%。

## 18.position、display、overflow、float 这些属性相互叠加后会怎么样？

## CSS 中的重绘(Repaint)和重排(Reflow)是什么?如何避免重绘和重排?

- 重绘(Repaint):重绘是指当元素样式的某些属性发生变化,但不影响其布局的情况下,浏览器重新绘制元素的过程。重绘会根据新的样式属性生成新的位图,然后将其绘制在屏幕上,但是不会改变元素的几何属性和位置。例如修改元素的背景色、文字颜色等操作会触发重绘。

- 重排(Reflow):重排是指当 DOM 结构中的部分或全部元素发生变化,影响了元素的几何属性(例如尺寸、位置、边距等),浏览器需要重新计算元素的几何属性,并重新布局（回流）整个文档中受影响的部分。因此,重排会导致浏览器重新计算元素的位置和大小,并且会影响其他相关元素及其子元素的布局。例如改变元素的宽度、高度、边距、定位等属性,或者添加、删除、隐藏元素等操作会触发重排。

由于重绘仅涉及样式的更新,不影响元素的布局,因此开销相对较小。而重排涉及到元素布局的重新计算和更新,开销较大,可能引起页面的闪烁和性能下降。避免重绘和重排的优化策略如下:

- 使用 transform 代替平移属性(margin 或 left、right、top、bottom),这些属性能够利用硬件加速,避免触发重排和重绘。
- 批量修改样式。避免在 JavaScript 中频繁修改单个元素的样式属性,而是尽量采用批量操作的方式。例如,使用 element.style.cssText 或者修改元素的 class 来一次性更新多个样式属性。
- 离线操作 DOM。对于需要频繁操作的 DOM 元素,可以先将其从文档中移除,进行离线操作,然后再将其插入回文档中。这样可以减少重排次数。

```js
// 创建文档片段
var fragment = document.createDocumentFragment();
// 离线修改 DOM
for (var i = 0; i < 10; i++) {
  var div = document.createElement('div');
  div.textContent = 'Item ' + i;
  fragment.appendChild(div);
}
// 一次性插入文档中
document.body.appendChild(fragment);
```

- 使用 requestAnimationFrame。对于需要执行动画或者频繁更新的操作,推荐使用 requestAnimationFrame 来优化性能。requestAnimationFrame 会在浏览器下一次重绘之前执行回调函数,从而将多个重排重绘操作合并为一次执行。

## CSS 中的 BEM 命名规范是什么?它有什么好处?

BEM(Block Element Modifier)是一种用于命名 CSS 类的命名约定,旨在帮助开发者更好地组织和管理样式表,特别是在大型项目或团队协作中非常有用。BEM 命名可以提供清晰可读的命名、避免样式冲突、提高可复用性。BEM 命名规范由以下部分组成:

- Block(块):块是一个独立的、可复用的组件或模块,代表一个完整的 UI 组件。命名格式为 .block,例如 .button、.menu。
- Element(元素):元素是块的一部分,没有独立存在的意义,必须在块的上下文中使用。元素以块名为前缀,通过双下划线 `__` 连接,例如 `.button__text`、.`menu__item`。
- Modifier(修饰符):修饰符用于表示块或元素的不同状态或变体。修饰符以块或元素名为前缀,通过单个下划线 `_`连接,例如 `.button--primary`、.`menu_item--active`。
