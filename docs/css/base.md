### 1.CSS 盒子模型

浏览器会把所有 DOM 元素都看成一个盒子,盒子由 margin(盒子外边距)、padding(盒子内边距)、border(盒子边框)、content(盒子内容)4 部分组成。

盒子模型可分为标准盒子模型和怪异盒子模型,`box-sizing:content-box`可以将元素设置为标准盒子模型, `box-sizing:border-box`可以将元素设置为怪异盒子模型。标准盒子模型会把 padding 撑开,而怪异模式则相当于将盒子的大小固定好,再将内容装入盒子,盒子的大小并不会被 padding 所撑开。

- 标准盒子模型下:盒子总宽度/高度 = 内容 width/内容 height + padding + border + margin。
- 怪异盒子模型下:盒子总宽度/高度 = 内容 width/内容 height + margin。 标准盒子模型下盒子的宽高会包含 padding 和 border,而怪异盒子模型下盒子的宽高不包含 padding 和 border。

### 2.CSS BFC

### 3.BEM 命名规范

### 4.CSS 选择器

#### 通配符选择器

```css
/* *号通配符表示适用所有元素 */
* {
  margin: 20px;
  padding: 0;
}
```

#### 元素(标签)选择器

```css
p {
  margin: 20px;
}
```

#### 类选择器

```css
.box {
  margin: 20px;
}
```

#### ID 选择器

```css
#id {
  margin: 20px;
}
```

#### 属性选择器

##### [attribute]

[attribute]: 作用于所有包含attribute属性的元素。

```html
<!-- html结构 -->
<ul>
  <li name>元素1</li>
  <li name="z">元素2</li>
  <li name="abc">元素3</li>
  <li name="abc ef">元素4</li>
  <li name="ef">元素5</li>
  <li>元素6(不生效)</li>
</ul>

<style>
  /* [name]表示作用于有name属性的元素。上面html结构中第6个li不生效,因为没有name属性 */
  [name] {
    color: red;
  }
</style>
```

##### [attribute=value]

[attribute=value]: 作用于attribute=value的所有元素。

```html
<ul>
  <li name>元素1(不生效)</li>
  <li name="abc">元素2(生效)</li>
  <li name="dd">元素3(不生效)</li>
  <li name="abc e">元素4(不生效)</li>
  <li>元素5(不生效)</li>
</ul>
<style>
  /* [name=abc]表示只作用于拥有name属性,且属性值为abc的所有元素 */
  [name="abc"] {
    color: red;
  }
</style>
```

##### [attribute~=value]

[attribute~=value]: 作用于拥有attribute属性,且attribute属性值包含value的所有元素。

```html
<ul>
  <li name>元素1(生效)</li>
  <li names="abc">元素2(生效)</li>
  <li name-foo="abc e">元素3(生效)</li>
  <li foo="ab">元素4(不生效)</li>
  <li nas="abc ">元素5(不生效)</li>
  <li>元素6(不生效)</li>
</ul>
<style>
  /* [name~=abc]表示作用于拥有name属性,且name属性值包含abc的所有元素 */
  [name~="abc"] {
    color: red;
  }
</style>
```

##### [attribute^=value]

[attribute^=value]:作用于拥有 attribute 属性,且对应属性值是以 value 开头的所有元素。类似正则的 ^,以什么开始。

```html
<ul>
  <li name>元素1(不生效)</li>
  <li name="abc">元素2(生效)</li>
  <li name="abc e">元素3(生效)</li>
  <li name="ab">元素4(不生效)</li>
  <li name="abc ">元素5(生效)</li>
  <li name="bcd">元素6(不生效)</li>
  <li>元素7(不生效)</li>
</ul>
<style>
  /* [name^=abc]表示作用于拥有name属性,且对应属性值包含以abc开头的所有元素 */
  [name^="abc"] {
    background-color: red;
  }
</style>
```

##### [attribute$=value]

[attribute$=value]: 表示作用于拥有attribute属性,且对应属性值是以value结尾的所有元素。

```html
<ul>
  <li name>元素1(不生效)</li>
  <li name="abc">元素2(生效)</li>
  <li name="abc e">元素3(不生效)</li>
  <li name="weabc">元素4(生效)</li>
  <li name="abc ">元素5(不生效)</li>
  <li>元素6(不生效)</li>
</ul>
<style>
  /* [name$=abc]表示作用于拥有name属性,且对应属性值包含以abc结尾的所有元素 */
  [name$="abc"] {
    background-color: red;
  }
</style>
```

##### [attribute*=value]

[attribute*=value]: 表示作用于attribute属性中包含value子串的所有元素。

```html
<ul>
  <li name>元素1(不生效)</li>
  <li name="abc">元素2(生效)</li>
  <li name="hahaabc">元素3(生效)</li>
  <li name="foo">元素4(不生效)</li>
  <li name="zxpabc123">元素5(生效)</li>
  <li name="ab">元素6(不生效)</li>
  <li>元素7(不生效)</li>
</ul>

<style>
  /* [name*=abc]表示作用于拥有name属性,且对应属性值包含abc子串的所有元素 */
  [name*="abc"] {
    background-color: red;
  }
</style>
```

##### [attribute|=value]

[attribute|=value]: 表示作用于拥有attribute属性,且对应属性值以value开头的所有元素。

```html
<ul>
  <li name>元素1(不生效)</li>
  <li name="abc">元素2(生效)</li>
  <li name="hahaabc">元素3(不生效)</li>
  <li name="foo">元素4(不生效)</li>
  <li name="zxpabc123">元素5(不生效)</li>
  <li name="ab">元素6(不生效)</li>
  <li>元素7(不生效)</li>
</ul>
<style>
  /* [name|=abc]表示作用于拥有name属性,且对应属性值以abb开头的所有元素 */
  [name|="abc"] {
    color: red;
  }
</style>
```

#### 文档结构选择器

##### 后代选择器

格式:`element element`。作用于 element 元素内部下的所有 element 元素。

```css
/* 作用于.box元素下所有p元素 */
.box p {
  background-color: red;
}
```

##### 子选择器

格式:`element>element`。作用于父元素为 element 元素的所有 element 子元素。

```html
<ul>
  <li>1</li>
  <li>2</li>
  <li>3</li>
  <p>4</p>
</ul>

<style>
  /* ul下li元素字体颜色都会变成red,但ul下的p元素字体颜色不会改变 */
  ul > li {
    color: red;
  }
</style>
```

##### 相邻兄弟选择器

格式:`element1+element2`。作用于 element1 元素后面的相邻(同层级)的第一个 element 元素。

```html
<ul>
  <p>0</p>
  <li>1</li>
  <li>2</li>
  <li>3</li>
  <p>4(只有我有效,其他p元素无效)</p>
  <p>5</p>
</ul>
<style>
  /* li元素后面的相邻的下一个p元素字体颜色会变为red,ul下的第一个 
   * p元素color不会被改变,因为它在li元素前面 
   */
  li + p {
    /* 作用于<p>4</p>元素color为red */
    color: red;
  }
</style>
```

##### 一般兄弟选择器

格式:`element1~element2`。作用于在 element1 元素后面的相邻的所有 element2 元素。

```html
<ul>
  <p>0(无效)</p>
  <li>1</li>
  <p>1</p>
  <p>2</p>
</ul>
<style>
  /* 除了<p>0<p>,其他li相邻的p元素的color被设置为red */
  li ~ p {
    color: red;
  }
</style>
```

#### 伪类选择器

##### 文档根元素伪类

```css
:root {
  color: red;
}
```

##### 子选择器

`:nth-child(n)`,n 为数字,用来表示第几个子元素。

```html
<ul>
  <li>1(red)</li>
  <li>2</li>
  <li>3</li>
</ul>
<style>
  /* ul的第一个li元素字体颜色设置为red */
  ul:nth-child(1) {
    color: red;
  }
</style>
```

##### 同类型选择器

`:nth-of-type(n)`:作用于同类型元素,n 表示作用于第几个同类型元素。

```html
<ul>
  <li>1(red)</li>
  <li>2</li>
  <li>3</li>
</ul>
<style>
  /* ul的第一个li元素字体颜色设置为red,nth-of-type(2n+1)表示奇数,nth-of-type(2n)表示偶数 */
  li:nth-of-type(1) {
    color: red;
  }
</style>
```

##### 父元素下的第一个子元素

`element:first-child`:作用于 element 元素下的第一个子元素,等同于 nth-child(1)。

```html
<ul>
  <li>1(red)</li>
  <li>2</li>
  <li>3</li>
</ul>
<style>
  /* ul的第一个li元素字体颜色设置为red */
  li:first-child(1) {
    color: red;
  }
</style>
```

##### 父元素下的最后一个元素

`element:last-child`:作用于 element 元素下的最后一个子元素。

```html
<ul>
  <li>1</li>
  <li>2</li>
  <li>3(red)</li>
</ul>
<style>
  /* ul的第一个li元素字体颜色设置为red */
  li:last-child(1) {
    color: red;
  }
</style>
```

##### 同类型的第一个子元素

`element:first-of-type`:作用于同类型的第一个子元素。

##### 同类型的最后一个子元素

`element:last-of-type`:作用于同类型的最后一个子元素。

##### 父元素的唯一子元素

`element:only-child`:作用于父元素的唯一子元素,当 element 中只有一个元素时才会生效。

```html
<div>
  <h1>h1</h1>
  <p>p1</p>
  <p>p2</p>
  <p>p3</p>
</div>
<div>
  <h1>h2</h1>
  <h2>h2</h2>
</div>
<!--因为此div只有一个元素,所以此div里面的h3的字体会被设置为red-->
<div>
  <h3>h2</h3>
</div>
<style>
  div :only-child {
    color: red;
  }
</style>
```

##### 没有子元素

`element:empty`:作用于没有子元素(连内容都没有的那种)。

```html
<!-- html结构 -->
<h1>这是标题</h1>
<p>第一个段落。</p>
<!--只有此元素生效 -->
<p></p>
<p>第三个段落。</p>
<p>第四个段落。</p>
<p>第五个段落。</p>
<style>
  p:empty {
    color: red;
  }
</style>
```

##### 倒数 n 个子元素

`element:nth-last-child(n)`:作用于 element 元素倒数 n 个子元素。

```html
<ul>
  <li>1</li>
  <li>2</li>
  <li>3</li>
  <li>4(red)</li>
</ul>
<style>
  ul:nth-last-child(1): {
    color: red;
  }
</style>
```

##### 同类型倒数 n 个子元素

`element:nth-last-of-type`:作用于 element 元素下倒数第 n 个同类型的子元素。

```html
<div>
  <h1>h11</h1>
  <p>第一个段落。</p>
  <p>第二个段落。</p>
  <p>第三个段落。</p>
  <h1>h11</h1>
  <p>第四个段落(red)</p>
  <p>第五个段落。</p>
  <h1>h11</h1>
</div>
<style>
  div p:nth-last-of-type(2) {
    color: red;
  }
</style>
```

##### 同类型的倒数第一个子元素

`element:last-of-type`:作用于 element 元素下同类型的倒数第一个子元素。

```html
<ul>
  <li>1</li>
  <li>2</li>
  <li>3(red)</li>
</ul>
<style>
  li:last-of-type {
    color: red;
  }
</style>
```

##### 同类型的第一个子元素

`element:first-of-type`:作用于 element 元素下同类型的第一个元素。

```html
<!--html结构-->
<ul>
  <li>1(red)</li>
  <li>2</li>
  <li>3</li>
</ul>
<style>
  li:first-of-type {
    color: red;
  }
</style>
```

##### 父元素里唯一同类型子元素

`element:only-of-type`:作用于父元素里唯一同类型子元素。

```html
<div>
  <h1>h1</h1>
  <p>p1</p>
  <p>p2</p>
  <p>p3</p>
  <h1>h1</h1>
</div>
<div>
  <h1>h2(red)</h1>
</div>
<style>
  div h1:only-of-type {
    color: red;
  }
</style>
```

##### 没有被访问过的状态

`element:link`:作用于没有访问过 element 元素的状态。

##### 链接正在点击

`element:active`:作用于 element 元素链接正在点击。

##### 鼠标悬浮

`element:hover`:作用于当鼠标悬浮到 element 元素。

##### 所有链接已被访问

`element:visited`:作用于 element 元素所有链接已被访问。

##### 获取焦点

`element:focus`:作用于当获取到 element 元素的焦点时。

##### 作用于每个启用的 input 元素和作用于禁用的 input 元素

`element:enabled`:作用于每个启用的 input 元素。
`element:disabled`:作用于每个禁用的 input 元素。

##### 选择 input 元素

`element:checked`:作用于选择每个 input 元素。

##### 作用于非 selector 元素的每个元素

`:not(selector)`:作用于非 selector 元素的每个元素。

```html
<div>
  <p>123</p>
  <p>111</p>
  <h1>444(red)</h1>
  <div>555(red)</div>
</div>
<style>
  /* 作用于除去div元素下p元素以外的其他元素 */
  div:not(p) {
    color: red;
  }
</style>
```

#### 伪类元素选择器

##### 作用于元素的首行

`element::first-line`:作用于元素的首行。有些元素超过父元素的宽度时会换行处理,而::first-line 就是作用于第一行。

```html
<div>
  <p>12312313</p>
  <p>2222222</p>
</div>
<style>
  div {
    width: 50px;
  }
  p {
    /*强制换行*/
    word-wrap: break-word;
  }
  p::first-line {
    color: red;
  }
</style>
```

##### 作用于元素的第一个字符

`element:first-letter`:作用于元素的第一个字符。

```html
<!-- H会变红 -->
<p>Hello</p>
<style>
  p::first-letter {
    color: red;
  }
</style>
```

##### 作用于元素的内容之前插入内容

`element::before`:在每个 element 元素的内容之前插入内容。我们更多的可能是当作一个 div 来用。

##### 作用于元素的内容之后插入内容

`element::after`:在每个 element 元素的内容之后插入内容。我们可能更多的是用来清除浮动或验证表单提示等其它。

##### 作用于被用户所选取的部分

`::selection`:作用于被用户所选取的部分。

### CSS 选择器优先级

在 CSS 中不同选择器设置的样式优先级右优先级加权值控制,加权值越大则优先级越高,优先级相同则后出现的选择器样式会覆盖之前的样式:

- !important:使用!important 修饰的样式优先级为无条件绝对优先。
- 内联样式:优先级加权值为 1000。
- ID 选择器:优先级加权值为 100。
- 类选择器:优先级加权值为 10。
- 属性选择器:优先级加权值为 10。
- 伪元素或伪对象选择器:优先级加权值为 1。
- 标签选择器:优先级加权值为 1。
- 其他选择器:优先级加权值为 0，如通配选择器、伪元素选择器等。

CSS 样式优先级:
::: tip
!important 修饰的样式 > 内联样式 > ID 选择器 > 类选择器 = 属性选择器 = 伪类选择器 > 标签选择器 = 伪元素选择器
:::
