DOM 是 Document Object Model 的简称,中文译为文档对象模型,浏览器在渲染页面时会通过创建 CSS 样式和 DOM 树来展示 UI 界面。DOM 定义了访问和操作 HTML 文档的标准方法。

### 获取元素(element)的 6 种方式

| 方式                                           | 描述                                   |
| ---------------------------------------------- | -------------------------------------- |
| document.getElementById(idSelector)            | 根据 id 选择器获取一个元素(Element)    |
| document.getElementBysClassName(classSelector) | 根据 class 选择器获取一组元素(Element) |
| document.querySelector(selector)               | 根据选择器获取一个元素(Element)        |
| document.querySelectorAll(selector)            | 根据选项器获取一组元素(Element)        |
| document.getElementsByName(nameAttr)           | 根据 name 属性获取一组元素(Element)    |
| document.getElementsByTagName(tagName)         | 根据标签名获取一组元素(Element)        |
| document.documentElement()                     | 获取 html 标签元素(Element)            |
| document.body                                  | 获取 body 标签元素(Element)            |
