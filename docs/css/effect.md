### CSS 绘制三角形

- 基于边框绘制三角形。一个方形形状的由四个三角形组成,设置相应边框的背景色就可以绘制三角形。
- 基于 CSS 渐变绘制三角形。CSS 渐变分为线性渐变(Linear Gradients)和径向渐变(Radial Gradients)。
  - 线性渐变可以向下/向上/向左/向右/对角方向进行渐变,线性渐变沿着对角线渐变可以将一个方形元素切割成两个三角形,只需要设置其中一个三角形为透明色,另一个三角形非透明色就可以绘制三角形。
  - 径向渐变由它们的中心定义。定义一个原点沿着指定角度开始渐变,设置三角形渐变的角度和背景,其余区域都设置为透明色。
- transform:rotate+overflow:hidden 绘制三角形。一个方形形状由多个三角形组成,只需要旋转角度,将多余的空间隐藏就可以实现三角形,这种方法很吃父元素的宽度和高度,宽高比一般为为 1.4 左右。
- clip-path 裁剪三角形。clip-path 用于裁剪元素,定义三角形三个坐标就可以裁剪出三角形。
- 基于字符的十进制 Unicode 绘制三角形。

```html
<!-- 三角形形状的字符的十进制 Unicode 表示码  -->
◄ : &#9668; ► : &#9658; ▼ : &#9660; ▲ : &#9650; ⊿ : &#8895; △ : &#9651;
```

效果:<https://codesandbox.io/s/billowing-glitter-o4gnb5?file=/effect/triangle.html>

### CSS 实现九宫格

- 基于 float 布局实现九宫格。
- 基于 flex 布局实现九宫格。
- 基于 grid 布局实现九宫格。
- 基于 table 布局实现九宫格。

```html
<!-- 九宫格效果 -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Static Template</title>
  </head>
  <body>
    <ul class="mode_one">
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
      <li>6</li>
      <li>7</li>
      <li>8</li>
      <li>9</li>
    </ul>
    <div class="mode_two">
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
      <li>6</li>
      <li>7</li>
      <li>8</li>
      <li>9</li>
    </div>
    <div class="mode_three">
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
      <li>6</li>
      <li>7</li>
      <li>8</li>
      <li>9</li>
    </div>
    <table class="mode_four">
      <tr>
        <td>1</td>
        <td>2</td>
        <td>3</td>
      </tr>
      <tr>
        <td>4</td>
        <td>5</td>
        <td>6</td>
      </tr>
      <tr>
        <td>7</td>
        <td>8</td>
        <td>9</td>
      </tr>
    </table>
    </div>
  </body>
</html>

<style>
  * {
    margin: 0;
    padding: 0;
  }
  html,
  body {
    width: 100%;
    height: 100%;
    position: relative;
  }

  /* 实现方式1:基于float布局 */
  .mode_one {
    margin: 50px;
    height: 300px;
    width: 300px;
    /* 移除子元素所偏移的left和top外边距 */
    padding-left: 4px;
    padding-top: 4px;
  }
  .mode_one li {
    box-sizing: border-box;
    float: left;
    width: 100px;
    height: 100px;
    list-style: none;
    margin-left: -4px;
    margin-top: -4px;
    line-height: 100px;
    border: 4px solid #ccc;
    text-align: center;
  }
  .mode_one li:hover,
  .mode_two li:hover,
  .mode_three li:hover {
    border-color: #2d8cf0;
    position: relative;
  }

  /* 实现方式2:基于flex布局 */
  .mode_two {
    margin: 50px;
    width: 300px;
    display: flex;
    /* 超出内容自动换行 */
    flex-wrap: wrap;
    /* 移除子元素所偏移的left和top外边距 */
    padding-left: 4px;
    padding-top: 4px;
  }
  .mode_two li {
    /* 设置怪异盒子模型,大小被固定 */
    box-sizing: border-box;
    height: 100px;
    width: 100px;
    list-style: none;
    margin-left: -4px;
    margin-top: -4px;
    border: 4px solid #ccc;
    text-align: center;
    line-height: 100px;
  }

  /* 实现方式3:基于grid布局 */
  .mode_three {
    margin: 50px;
    width: 300px;
    display: grid;
    /* 设置列宽度 */
    grid-template-columns: 100px 100px 100px;
    grid-template-rows: 100px 100px 100px;
    /* 移除子元素所偏移的left和top外边距 */
    padding-left: -4px;
    padding-top: -4px;
    box-sizing: border-box;
  }
  .mode_three li {
    /* 设置怪异盒子模型,大小被固定 */
    box-sizing: border-box;
    list-style: none;
    margin-left: -4px;
    margin-top: -4px;
    border: 4px solid #ccc;
    text-align: center;
    line-height: 100px;
  }

  /* 实现方式4:基于table布局 */
  .mode_four {
    margin: 50px;
    width: 300px;
    height: 300px;
    text-align: center;
    border:4px solid #ccc;
    border-collapse: collapse;
    box-sizing: border-box;
  }
  .mode_four td{
    width:100px;
    vertical-align: middle;
    border:4px solid #ccc;
    box-sizing: border-box;
    line-height:100px;
  }
  .mode_four td:hover{
    border-color: #2d8cf0;
    /* 设置绝对布局覆盖其他td边框 */
    position:absolute;
    box-sizing: border-box;
    width:calc(100px + 2px);
    margin-top:-4px;
    margin-left: -4px;
  }
</style>

```
