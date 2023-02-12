JS 中事件机制是基于观察者模式实现,当元素被触发时就会执行对应的行为。

## 1.DOM 元素绑定事件的三种方法

### 1.1 内联绑定事件

```html
<!-- 点击button元素时会触发btnClick() -->
<button onclick="btnClick">按钮</button>

<script>
  function btnClick() {
    console.log("click...");
  }
</script>
```

### 1.2 基于元素事件属性绑定事件

```html
<button id="btn" onclick="btnClick">按钮</button>

<script>
  // 获取button元素
  const button = document.getElementById("btn");
  // 绑定点击事件
  button.onclick = () => {
    console.log("click...");
  };
</script>
```

### 1.3 addEvenetListener()绑定事件

addEventListener()方法将指定的监听器注册到 EventTarget 上,当该对象触发指定的事件时,指定的回调函数就会被执行。事件目标可以是一个文档上的元素 Element,Document 和 Window 或者任何其他支持事件的对象 (比如 XMLHttpRequest)。addEventListener()的工作原理是将实现 EventListener 的函数或对象添加到调用它的 EventTarget 上的指定事件类型的事件侦听器列表中。
addEventListener()接收如下参数:

- type:监听的事件类型。
- listener:当所监听的事件类型触发时,会接收到一个事件通知(实现了 Event 接口的对象)对象,listener 必须是一个实现了 EventListener 接口的对象,或者是一个函数(一般是都是函数)。
- options:一个指定有关 listener 属性的可选参数对象。可用的选项如下：
  - capture:Boolean,表示 listener 会在该类型的事件捕获阶段传播到该 EventTarget 时触发。
  - once:Boolean,表示 listener 在添加之后最多只调用一次。如果是 true,listener 会在其被调用之后自动移除。
  - passive:Boolean,设置为 true 时,表示 listener 永远不会调用 preventDefault()。如果 listener 仍然调用了这个函数,客户端将会忽略它并抛出一个控制台警告。
  - signal:AbortSignal,该 AbortSignal 的 abort() 方法被调用时,监听器会被移除。
- useCapture:一个布尔值,默认为 false。在 DOM 树中,注册了 listener 的元素,是否要先于它下面的 EventTarget,调用该 listener。简单来说 useCapture 用于指定事件是否在捕获或冒泡阶段执行,捕获阶段是先触发目标元素的父元素的 listener,再由外向内层逐层触发 listener；而事件冒泡是先触发目标元素的 listener,然后由内向外的触发父元素的 listener。

```js
// addEventListener语法
target.addEventListener(type, listener, options);
target.addEventListener(type, listener, useCapture);
```

```html
<button id="btn" onclick="btnClick">按钮</button>

<script>
  // 获取button元素
  const button = document.getElementById("btn");
  // 绑定点击事件
  button.addEventListener("click", (e) => {
    console.log("click", e);
  });
</script>
```

## 2.事件(Event)类型

### 2.1 **资源相关事件**

| **事件名称** | **触发时机**                                                      | **说明**                                                                                                                                                                        |
| ------------ | ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| error        | 当资源加载失败或无法使用时触发。                                  | 例如 JS 脚本执行错误、image 不存在或 image 无效时都会触发 error 事件。                                                                                                          |
| abort        | 正在加载资源已经被中止时。                                        | 当资源未完全加载时,将触发 abort 事件,但不会因错误而触发 abort 事件。                                                                                                            |
| onload       | 资源及其相关资源已完成加载。                                      | 加载整个页面(包括所有依赖资源,如样式表和图像)时,将触发 load 事件。load 事件与 DOMContentLoaded 的区别在于,DOMContentLoaded 是在加载页面 DOM 后立即触发,而无需等待资源完成加载。 |
| beforeunload | 当 window、document 及其资源即将卸载时,将触发 beforeunload 事件。 | 当窗口、document 及其资源即将卸载时，将触发 beforeunload 事件。此时，document 仍然可见,并且事件仍可取消。                                                                       |
| unload       | 卸载文档或子资源时将触发 unload 事件。                            | 注意:unload 事件也遵循 DOM 树:父 iframe 卸载将发生在子 iframe 之前。                                                                                                            |

### 2.2 网络事件

| **事件名称** | **触发时机**           | **说明**                                                                                         |
| ------------ | ---------------------- | ------------------------------------------------------------------------------------------------ |
| online       | 浏览器已获得网络访问。 | 当浏览器已获得对网络的访问权限并且"Navigator.onLine"的值为 true,将触发 Window 的 online 事件。   |
| offline      | 浏览器已失去网络访问。 | 当浏览器已获得对网络的访问权限并且"Navigator.onLine"的值为 false,将触发 Window 的 offline 事件。 |

### 2.3 焦点事件

| **事件名称** | **触发时机**             | **说明**                                                               |
| ------------ | ------------------------ | ---------------------------------------------------------------------- |
| focus        | 元素获得焦点(不会冒泡)。 | 此事件和 focusin focus Event(焦点事件)之间的主要区别在于不会冒泡。     |
| blur         | 元素失去焦点(不会冒泡)。 | 此事件和 focusout blur Event(失去焦点事件)之间的主要区别在于不会冒泡。 |

### 2.4 WebSocket 事件

| **事件名称** | **触发时机**                                     |
| ------------ | ------------------------------------------------ |
| open         | WebSocket 连接已建立触发的事件。                 |
| message      | 通过 WebSocket 接收服务器发送的消息时触发。      |
| error        | WebSocket 连接异常被关闭(比如有些数据无法发送)。 |
| close        | WebSocket 关闭连接时触发。                       |

### 2.5 会话历史事件

| **事件名称** | **触发时机**                                                                                 | **说明**                                                               |
| ------------ | -------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| pagehide     | 当浏览器在显示与会话历史记录不同的页面的过程中隐藏当前页面时,window 将会触发 pagehide 事件。 | 当用户单击浏览器的"后退"按钮时，当前页在显示上一页之前会收到一个事件。 |
| pageshow     | 当浏览器在显示与会话历史记录不同的页面的过程中显示当前页面时,window 将会触发 pagehide 事件。 |

- 最初加载页面。
- 从同一窗口或选项卡中的另一个页面导航到该页面。
- 在移动操作系统上恢复冻结的页面。
- 使用浏览器的前进或后退按钮返回到页面。

以上四种场景都会触发 pageshow 事件。
| popstate | 当用户导航会话历史记录时活动历史记录条目发生更改时，将触发 Window 界面的 popstate 事件。 | 它将当前历史记录条目更改为用户访问的最后一页的条目,或者,如果 history.pushState() 已用于将历史记录条目添加到历史记录堆栈,则改用该历史记录条目。popstate 可以监听 history.go、history.back()、history.forward()方法跳转。 |

### 2.6 视图事件

| **事件名称**     | **触发时机**                                           | **说明**                                                                                                                                                              |
| ---------------- | ------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| fullscreenchange | 该事件在浏览器切换到全屏模式或退出全屏模式后立即触发。 | 该事件会事件冒泡到 Document 元素,可以通过 `document.fullscreenElement`的值判断是否是全屏模式,如果值为 null,则元素将退出全屏模式,如果值为 Element 则元素进入全屏模式。 |
| fullsreenerror   | 当浏览器无法切换到全屏模式时,将触发该事件。            | 与 fullscreenchange 事件一样,将触发两个事件。第一个被发送到无法更改模式的元素,第二个被发送到拥有该元素的文档。                                                        |
| resize           | 调整文档视图(窗口)大小时,将触发 resize 事件。          | 由于此事件会频繁触发 listener,造成性能损耗,一般通过节流或 Resize Observer 控制触发频率。                                                                              |
| scroll           | 滚动文档视图后,将触发滚动事件。                        | 由于事件可以以高速率触发,因此事件处理程序不应执行计算成本高昂的操作,如 DOM 修改。相反,建议使用 requestAnimationFrame()、setTimeout()或 CustomEvent 来限制事件。       |

### 2.7 剪贴板事件

| **事件名称** | **触发时机**                               | **说明**                                                                             |
| ------------ | ------------------------------------------ | ------------------------------------------------------------------------------------ |
| cut          | 已经剪贴选中的文本内容并且复制到了剪贴板。 | 如果用户尝试对不可编辑的内容执行剪切操作,cut 事件仍会触发,但事件对象不包含任何数据。 |
| copy         | 已经把选中的文本内容复制到了剪贴板。       | 事件的默认操作是将所选内容（如果有）复制到剪贴板。                                   |

此事件的处理程序可以通过在事件的 ClipboardEvent.clipboardData 属性上调用 setData(format,data)并使用 event.preventDefault()取消事件的默认操作来修改剪贴板内容。
但是,处理程序无法读取剪贴板数据。可以构造和调度合成事件,但这不会影响系统剪贴板。 |
| paste | 从剪贴板复制的文本内容被粘贴。 | 此事件的处理程序可以通过在事件的属性上调用 getData()来访问剪贴板内容(clipboardData)。
若要重写默认行为(例如插入一些不同的数据或对剪贴板内容进行转换),事件处理程序必须使用 event.preventDefault（）取消默认操作,然后手动插入其所需的数据。 |

### 2.8 键盘事件

| **事件名称** | **触发时机**                                        | **说明**                                                                                                                                        |
| ------------ | --------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| keydown      | 按下某个键时将触发按键事件。                        | 与按键事件不同,该事件将针对所有键触发,而不管它们是否生成字符值。通过事件对象的 keycode 可获取按键的编码。                                       |
| keypress     | 除 Shift、Fn、CapsLock 外的任意键被按住(连续触发)。 | 生成字符值的键的示例包括字母、数字和标点符号键。不生成字符值的键的示例包括修饰键，如 `、` 或 ` Alt``Shift``Ctrl``Meta `。MDN 不推荐使用该事件。 |
| keyup        | 释放某个键时将触发该事件。                          |                                                                                                                                                 |

### 2.9 鼠标事件

| **事件名称** | **触发时机**                                        | **说明**                                                                                                                                        |
| ------------ | --------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| keydown      | 按下某个键时将触发按键事件。                        | 与按键事件不同,该事件将针对所有键触发,而不管它们是否生成字符值。通过事件对象的 keycode 可获取按键的编码。                                       |
| keypress     | 除 Shift、Fn、CapsLock 外的任意键被按住(连续触发)。 | 生成字符值的键的示例包括字母、数字和标点符号键。不生成字符值的键的示例包括修饰键，如 `、` 或 ` Alt``Shift``Ctrl``Meta `。MDN 不推荐使用该事件。 |
| keyup        | 释放某个键时将触发该事件。                          |                                                                                                                                                 |

### 2.10 拖放事件

## 3.防止默认行为、事件冒泡捕获、事件委托

### 3.1 防止默认行为

通过 Event 对象 的 `preventDefault()`可以阻止浏览器默认行为,例如阻止表单提交。

```html
<form>
  <div>
    <label for="fname">First name: </label>
    <input id="fname" type="text" />
  </div>
  <div>
    <label for="lname">Last name: </label>
    <input id="lname" type="text" />
  </div>
  <div>
    <input id="submit" type="submit" />
  </div>
</form>
<p></p>

<script>
  const form = document.querySelector("form");
  const fname = document.getElementById("fname");
  const lname = document.getElementById("lname");
  const para = document.querySelector("p");
  form.addEventListener("submit", (e) => {
    /*
     * 默认情况下点击按钮就会触发form表单提交,无法添加额外的校验。
     * 当fname和lname的值为空时,则会阻止浏览器默认行为,阻止form表单提交
     */
    if (fname.value === "" || lname.value === "") {
      // 阻止浏览器默认行为
      e.preventDefault();
      para.textContent = "You need to fill in both names!";
    }
  });
</script>
```

### 3.2 事件冒泡与捕获

事件冒泡和捕获是描述浏览器如何处理针对嵌套元素的事件的阶段的术语,事件可分为目标、冒泡、捕获三个阶段:

- 冒泡阶段是指由目标元素从内到外逐层触发事件,即先触发目标事件,后逐层触发目标元素父元素事件(最高可以冒泡到 window),在 JS 中事件默认为冒泡阶段。如果想阻止事件向上冒泡可以通过 Event 对象的`stopPropagation()`阻止事件冒泡,`stopPropagation()`既可以阻止事件冒泡又可以阻止事件捕获,也可以阻止处于目标阶段。
- 捕获阶段是由外到内逐层触发事件,先触发目标元素最外层父元素,然后逐层触发子元素事件直至目标元素。可以通过`stopPropagation()`或 DOM3 级新增事件`stopImmediatePropagation()`来阻止事件冒泡。

```html
<!-- 事件冒泡例子 -->
<div class="parent">
  <div class="child">child</div>
</div>
<div class="father">
  <div class="son">son</div>
</div>
<script>
  // 事件冒泡
  function eventBubbling() {
    const parent = document.querySelector(".parent");
    const child = document.querySelector(".child");
    parent.onclick = () => {
      console.log("parent click...");
    };
    child.onclick = () => {
      console.log("child click...");
    };
  }

  // 阻止事件冒泡
  function stopEventBubbling() {
    const father = document.querySelector(".father");
    const son = document.querySelector(".son");
    father.onclick = () => {
      console.log("father click...");
    };
    son.onclick = (e) => {
      // 阻止事件向上冒泡
      e.stopPropagation();
      console.log("son click...");
    };
  }
  eventBubbling(); // 点击child元素,先打印 "child click..."  后打印 "parent click..."
  stopEventBubbling(); // 点击son元素,只打印 "son click..."
</script>
```

通过 addEventListener()可以为元素绑定事件并设置事件的触发阶段,addEventListener()的第三个参数是一个布尔值,用于指定事件的触发阶段,为 false 表示事件发生在冒泡阶段,为 true 表示事件发生在捕获阶段,默认为 false。

```html
<!-- 事件捕获例子 -->
<div class="parent">
  <div class="child">child</div>
</div>
<div class="father">
  <div class="son">son</div>
</div>

<script>
  // 事件捕获
  function eventCapture() {
    const parent = document.querySelector(".parent");
    const child = document.querySelector(".child");
    parent.addEventListener(
      "click",
      () => {
        console.log("parent click...");
      },
      true
    );
    child.addEventListener(
      "click",
      () => {
        console.log("child click...");
      },
      true
    );
  }

  // 阻止事件捕获
  function stopEventCapture() {
    const father = document.querySelector(".father");
    const son = document.querySelector(".son");
    father.addEventListener(
      "click",
      (e) => {
        // stopPropagation()和stopImmediatePropagation()都具有阻止事件捕获的效果
        e.stopImmediatePropagation();
        console.log("father click...");
      },
      true
    );
    son.addEventListener(
      "click",
      () => {
        console.log("son click...");
      },
      true
    );
  }
  eventCapture(); // 点击child元素,先打印 "parent click..." 后打印 "child click..."
  stopEventCapture(); // 点击son元素,只打印 "father click..."
</script>
```

### 3.3 事件委托

当元素过多频繁绑定事件时会大大增加内存资源消耗,而且对于动态新增的元素需要手动绑定事件,这是普通绑定事件的弊端。基于事件冒泡机制可以把子元素的事件委托或代理至父元素,子元素无需绑定事件,父元素仅需要绑定一次事件,当触发子元素事件时由于事件冒泡机制会触发至委托的父元素事件,而这就是事件委托,事件代理能大大减少内存操作且可以动态的绑定事件。

```html
<ul>
  <li>1</li>
  <li>2</li>
  <li>3</li>
</ul>
<script>
  const ul = document.querySelector("ul");
  ul.addEventListener("click", (e) => {
    // 获取目标元素
    const target = event.target || event.srcElement;
    // 如果目标元素的标签名为li,则说明点击的是子元素
    if (target.tagName.toLowerCase() === "li") {
      // 打印元素内容
      console.log(target.innerHTML);
    }
  });
</script>
```

事件委托的局限性:

- 无法委托 focus、blur 之类的事件。由于 focus、blur 之类的事件本身没有事件冒泡机制,所以无法进行事件委托。
- mousemove、mouseout 这样的事件,虽然有事件冒泡,但是只能不断通过位置去计算定位,对性能消耗高。

## 4.自定义事件

JS 事件系统是基于发布订阅模式的实现,通过自定义事件即可使用基于事件系统实现发布订阅功能。

- new CustomEvent(typeArg,options):用于创建一个新的 CustomEvent 对象(CustomEvent 继承自 Event),该构造函数接收 typeArg(事件名)和 options(事件配置对象,可选)。options 对象具有如下属性:
  - detail:可选且默认为 null, 任何类型, 包含与事件关联的事件相关值,可以在监听事件时通过事件对象的 detail 属性获取。
  - eventInit:包含了 bubbles(布尔值,表示事件是否冒泡,默认 false)、cancelable(布尔值,表示事件是否可取消,默认 false)、composed(布尔值,表示事件是否会跨越 Shadow DOM 边界传播到标准 DOM)。
- addEventListener():用于监听指定事件。
- dispatchEvent(event):根据 Event 对象触发事件。

```js
const ul = document.querySelector("ul");
const event = new Event("hello", {
  // 允许冒泡
  bubbles: true,
  // 允许取消
  cancelable: true,
});
ul.addEventListener("hello", (e) => {
  // 监听hello事件,e:Event {type: 'hello', target: ul, currentTarget: ul, …}
  console.log("监听hello事件,e:", e);
});
// 触发 custom 事件
ul.dispatchEvent(event);

// 创建custom事件
const customEvenet = new CustomEvent("custom", {
  detail: { name: "dog" },
  // 允许冒泡
  bubbles: true,
  // 允许取消
  cancelable: true,
});
// 监听 custom 事件
ul.addEventListener("custom", (e) => {
  // 监听custom事件,e:CustomEvent {detail: {…}, type: 'custom', target: ul, currentTarget: ul, …}
  console.log("监听custom事件,e:", e);
  console.log("监听custom事件,detail:", e.detail); // 监听custom事件,detail: { name: "dog" }
});
// 触发 custom 事件
ul.dispatchEvent(customEvenet);
```
