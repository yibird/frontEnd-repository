### CSS 三栏布局

三栏布局即两边宽度(left 和 right)固定,中间自适应的布局,浏览器的宽度变化时,两边的宽度不会变,中间区域的宽度会自适应。实现三栏布局的方式有圣杯布局、双飞翼布局和 flex 布局。

#### 圣杯实现三栏布局

```html
<!-- 圣杯布局 -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
  </head>
  <body>
    <header class="header">header</header>
    <div class="main clear-fix">
      <div class="main-content">content</div>
      <div class="main-left">left</div>
      <div class="main-right">right</div>
    </div>
    <footer class="footer">footer</footer>
  </body>
</html>
<style>
  * {
    padding: 0;
    margin: 0;
  }
  html,
  body {
    height: 100%;
    width: 100%;
    position: relative;
    color: #fff;
  }
  .header,
  .main-left,
  .main-content,
  .main-right,
  .footer {
    padding: 10px;
    box-sizing: border-box;
  }

  .header {
    background-color: #f98981;
  }
  .main {
    height: 200px;
    padding: 0 100px;
  }
  .main-left {
    width: 100px;
    height: 100%;
    float: left;
    position: relative;
    /* 向左偏移,否则会遮挡content */
    left: -100px;
    /* 把left移动到和center同一行并且左边对齐 */
    margin-left: -100%;
    background-color: #faac7b;
  }

  .main-content {
    float: left;
    width: 100%;
    height: 100%;
    background-color: #4cd263;
  }

  .main-right {
    width: 100px;
    height: 100%;
    float: left;
    margin-left: -100px;
    position: relative;
    left: 100px;
    background-color: #fcf26b;
  }

  .footer {
    background-color: #57a9fb;
  }
</style>
```

#### 双飞翼实现三栏布局

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Static Template</title>
  </head>
  <body>
    <div class="layout">
      <header class="layout-header">header</header>
      <div class="layout-content">
        <div class="container">container</div>
      </div>
      <div class="layout-left">left</div>
      <div class="layout-right">right</div>
      <footer class="layout-footer">footer</footer>
    </div>
  </body>
</html>
<style>
  * {
    padding: 0;
    margin: 0;
  }
  html,
  body {
    height: 100%;
    width: 100%;
    position: relative;
  }
  .layout {
    width: 100%;
    color: #fff;
  }
  .layout-header,
  .layout-left,
  .layout-right,
  .layout-footer {
    padding: 10px;
    box-sizing: border-box;
  }

  .layout-header {
    background-color: #f98981;
    width: 100%;
  }

  .layout-left {
    float: left;
    width: 100px;
    height: 200px;
    background-color: #faac7b;
    margin-left: -100%;
  }
  .layout-right {
    float: left;
    margin-left: -100px;
    width: 100px;
    height: 200px;
    background-color: #fcf26b;
  }
  .layout-content {
    box-sizing: border-box;
    float: left;
    height: 200px;
    width: 100%;
    background-color: #4cd263;
    padding: 0 100px;
    overflow: hidden;
  }
  .container {
    width: 100%;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;
    border: 1px solid red;
  }

  .layout-footer {
    background-color: #57a9fb;
    /* 清除浮动 */
    clear: both;
  }
</style>
```

#### flex 实现三栏布局

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
  </head>
  <body>
    <header class="header">header</header>
    <div class="main">
      <div class="main-left">left</div>
      <div class="main-content">content</div>
      <div class="main-right">right</div>
    </div>
    <footer class="footer">footer</footer>
  </body>
</html>
<style>
  * {
    padding: 0;
    margin: 0;
  }
  html,
  body {
    height: 100%;
    width: 100%;
    position: relative;
    color: #fff;
  }

  .header,
  .main-left,
  .main-content,
  .main-right,
  .footer {
    padding: 10px;
    box-sizing: border-box;
  }
  .header {
    background-color: #f98981;
  }
  .main {
    height: 200px;
    display: flex;
  }
  .main-left {
    flex: 0 0 100px;
    order: -1;
    background-color: #faac7b;
  }
  .main-content {
    /* flex-grow用于定义项目的放大比例,为1时根据剩余空间进行放大 */
    flex-grow: 1;
    background-color: #4cd263;
  }
  .main-right {
    flex: 0 0 100px;
    background-color: #fcf26b;
  }

  .footer {
    background-color: #57a9fb;
  }
</style>
```
