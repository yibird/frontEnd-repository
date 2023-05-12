在开发中一般很少单独使用 Babel 的 api,更多是将功能进行封装成插件,插件可以上传至 npm 仓库进行复用。

## Plugin

Babel 配置文件中通过 plugins 选项配置插件,plugins 的值可以是字符串或者数组,例如:

```js

```

### Plugin 格式

Plugin 的格式分为返回对象的函数和返回对象两种。

#### 3.1.1 返回对象的函数

Babel Plugin 第一种形式是返回一个函数,该函数需要返回一个对象,对象应包含 visitor、pre、post、inherits、manipulateOptions 等属性。

#### 3.1.2 返回对象

Babel Plugin 第二种形式是直接返回一个对象,这种方式用于不需要处理参数的情况。

```js

```

### 自定义 Plugin 去除 console.log()

## preset
