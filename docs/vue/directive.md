Vue 提供了组合式函数(Composables)和自定义指令用于解决组件逻辑复用的问题。自定义指令的逻辑实现与 组合式函数的实现大体上一致,自定义指令提供一系列生命钩子函数用于简化元素的操作,但组合式函数的灵活性更好。

## Vue 自定义指令

Vue 除了提供`v-for`、`v-if`、`v-bind`、`v-html`、`v-once`、`v-model`、 `v-show`等一系列内置指令外,Vue 还支持注册自定义指令(Directive)。Vue 的自定义指令由一个包含类似组件生命周期钩子的对象来定义,使用指令前必须要注册指令。注册指令分为局部注册和全局注册,定义指令后可以在组件内部的 directives 属性上进行布局注册,或者使用 Vue 实例的`directive()`进行全局注册,局部注册只能用于注册组件内,但全局注册的指令可以应用于任意子组件。Vue 3 中的指令生命周期函数和 Vue 2 中的指令生命周期函数虽然在名称和调用方式上有一些改动,但它们的作用和实现是类似的。
::: details 局部注册指令

```ts
const focus = {
  mounted: (el) => el.focus(),
};
export default {
  // 局部注册指令,指令只能在当前组件使用
  directives: {
    // 在模板中启用 v-focus
    focus,
  },
};
```

:::
::: details 全局注册指令

```ts
const app = createApp({});
// 全局注册指令,使 v-focus 在所有组件中都可用
app.directive("focus", {
  // 省略指令钩子函数
});
```

:::

### Vue2 指令的生命周期函数

- bind:指令第一次绑定到元素时调用,只调用一次。在 bind 生命周期函数中可以进行一次性的初始化设置。
- inserted:被绑定元素插入父节点时调用 (仅保证父节点存在,但不一定已被插入文档中)。
- update:所在组件的 VNode 更新时调用,但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。
- componentUpdated:指令所在组件的 VNode 及其子 VNode 全部更新后调用。
- unbind:只调用一次,指令与元素解绑时调用。

### Vue3 指令的生命周期函数

- `created(el, binding, vnode, prevVnode)`:在绑定元素的 attribute 前或事件监听器应用前调用。
- `beforeMount(el, binding, vnode, prevVnode)`:在元素被插入到 DOM 前调用。等同 Vue2 的 bind 钩子。
- `mounted(el, binding, vnode, prevVnode)`:在绑定元素的父组件及他自己的所有子节点都挂载完成后调用。等同 Vue2 的 inserted 钩子。
- `beforeUpdate(el, binding, vnode, prevVnode)`:绑定元素的父组件更新前调用。等同 Vue2 的 update 钩子。
- `updated(el, binding, vnode, prevVnode)`:在绑定元素的父组件及它自己的所有子节点都更新后调用。等同 Vue2 的 componentUpdated 钩子
- `beforeUnmount(el, binding, vnode, prevVnode)`:绑定元素的父组件卸载前调用。等同 Vue2 的 unbind 钩子。
- `unmounted(el, binding, vnode, prevVnode)`:绑定元素的父组件卸载后调用。

指令的钩子会传递以下几种参数:

- el:指令绑定到的元素。这可以用于直接操作 DOM。
- binding:一个对象,包含以下属性:
  - value:传递给指令的值。例如在 `v-my-directive="1 + 1"` 中,值是 2。
  - oldValue:之前的值，仅在 beforeUpdate 和 updated 中可用。无论值是否更改，它都可用。
  - arg:传递给指令的参数 (如果有的话)。例如在 v-my-directive:foo 中，参数是 "foo"。
  - modifiers:一个包含修饰符的对象(如果存在)。例如在 v-my-directive.foo.bar 中,修饰符对象是 `{ foo: true, bar: true }`。
  - instance:使用该指令的组件实例。
  - dir:指令的定义对象。
- vnode:代表绑定元素的底层 VNode。
- prevNode:之前的渲染中代表指令所绑定元素的 VNode。仅在 beforeUpdate 和 updated 钩子中可用。

## 自定义点击元素外部指令(v-clickOutside)

v-clickOutside 通常用于点击目标元素外部,执行特定逻辑,例如点击 model 外部隐藏弹出层。实现思路:首先为 document 元素绑定 click 事件,触发 click 事件时判断点击的元素(evt.target)是否是指令的挂载元素,或者通过 contains()判断点击的元素(evt.target)是否是指令的挂载元素的子元素,如果不是则说明点击的元素是指令挂载元素的外部,最后触发回调函数。
::: details v-clickOutside 实现

```ts
import type { App, Directive, DirectiveBinding } from "vue";
import { throttle } from "lodash-es";

function getHandlers(el: HTMLElement, binding: DirectiveBinding) {
  // 使用节流函数优化
  const handler = throttle((evt: MouseEvent) => {
    if (typeof binding.value !== "function") return;
    const outside = !(
      el === evt.target || el.contains(evt.target as HTMLElement)
    );
    binding.value(outside);
  }, 10);
  return { handler };
}

export const clickOutside: Directive = {
  beforeMount(el: HTMLElement, binding: DirectiveBinding) {
    const { handler } = getHandlers(el, binding);
    (el as any).clickOutsideEvent = handler;
    document.addEventListener("click", handler);
  },
  unmounted(el: HTMLElement) {
    document.removeEventListener("click", (el as any).clickOutsideEvent);
  },
};

export function setupClickOutsideDirective(app: App) {
  app.directive("clickOutside", clickOutside);
}
```

:::

::: details 使用 v-clickOutside 指令

```vue
<template>
  <div class="container">
    <div class="block" v-clickOutside="handle">{{ text }}</div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
const text = ref("click me...");
const handle = (outside: boolean) => {
  text.value = outside ? "点击了外面" : "点击容器里面";
};
</script>

<style scoped>
.container {
  display: grid;
  place-items: center;
}
.block {
  width: 200px;
  height: 200px;
  border: 1px solid red;
  display: grid;
  place-items: center;
}
</style>
```

:::

## 自定义加载指令(v-loading)

v-loading 用于代替 Loading 组件,支持容器 Loading 和全屏 Loading。

::: details LoadingProps 类型

```ts
export interface LoadingProps {
  /**
   * @desc loading 文字提示
   * @default
   */
  tip?: string;
  /**
   * @desc loading 大小
   * @default "default"
   */
  size?: "small" | "default" | "large";
  /**
   * @desc 是否全屏显示loading
   * @default false
   */
  fullscreen?: boolean;
  /**
   * @desc loading状态
   * @default false
   */
  loading?: boolean;
  /**
   * @desc loading背景色
   * @default
   */
  background?: string;
  /**
   * @desc 主题
   * @default
   */
  theme?: "dark" | "light";
}
```

:::

::: details Loading 组件

```vue
<template>
  <section
    :class="[fullscreen ? 'full-loading' : 'container-loading', 'loading']"
    :style="[background ? `background-color: ${background}` : '']"
    v-show="loading"
  >
    <a-spin
      v-bind="$attrs"
      :tip="tip"
      :size="size"
      :spinning="loading"
      style="margin: auto"
    />
  </section>
</template>
<script setup lang="ts">
import type { LoadingProps } from "./types";
const {
  tip = "",
  size = "default",
  fullscreen = false,
  loading = false,
  background,
  theme,
} = defineProps<LoadingProps>();
</script>
<style scoped>
.loading {
  display: flex;
  z-index: 200;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgb(240 242 245 / 40%);
}
.container-loading {
  position: absolute;
}
.full-loading {
  position: fixed;
}
</style>
```

:::

::: details createLoading

```ts
import { VNode, defineComponent, createVNode, render, reactive, h } from "vue";
import Loading from "./Loading.vue";
import type { LoadingProps } from "./types";

/**
 * 创建Loading
 * @param props Loading组件的Props
 * @param target Loading挂载的目标元素
 * @param wait 是否等待
 */
export function createLoading(
  props: LoadingProps,
  target?: HTMLElement,
  wait = false
) {
  let vm: Nullable<VNode> = null;
  const data = reactive({
    tip: "",
    loading: true,
    ...props,
  });
  const LoadingWrap = defineComponent({
    render() {
      return h(Loading, { ...data });
    },
  });
  vm = createVNode(LoadingWrap);

  // 通过render()渲染虚拟节点到目标元素
  if (wait) {
    // 处理异步情况
    setTimeout(() => {
      render(vm, document.createElement("div"));
    }, 0);
  } else {
    render(vm, document.createElement("div"));
  }

  // 打开方法,将虚拟节点的真实DOM插入到目标元素
  function open(target: HTMLElement = document.body) {
    if (!vm || !vm.el) {
      return;
    }
    target.appendChild(vm.el as HTMLElement);
  }

  // 关闭方法,获取vm对应的真实DOM节点父节点,并移除对应的真实DOM节点
  function close() {
    if (vm?.el && vm.el.parentNode) {
      vm.el.parentNode.removeChild(vm.el);
    }
  }

  if (target) {
    open(target);
  }
  return {
    vm,
    close,
    open,
    setTip: (tip: string) => {
      data.tip = tip;
    },
    setLoading: (loading: boolean) => {
      data.loading = loading;
    },
    get loading() {
      return data.loading;
    },
    get $el() {
      return vm?.el as HTMLElement;
    },
  };
}
```

:::

::: details v-loading 实现

```ts
import { App, Directive, DirectiveBinding } from "vue";
import { createLoading } from "/@/components/Loading";

export const loading: Directive = {
  mounted(el, binding: DirectiveBinding) {
    // 从挂载元素的自定义属性上获取createLoading()所需参数
    const tip = el.getAttribute("loading-tip"),
      background = el.getAttribute("loading-background"),
      size = el.getAttribute("loading-size");
    const fullscreen = !!binding.modifiers.fullscreen;
    const instance = createLoading(
      {
        tip,
        background,
        size: size || "default",
        loading: !!binding.value,
        fullscreen,
      },
      fullscreen ? document.body : el
    );
    // 容器loading设置挂载元素为相对布局,这可能会影响挂载元素
    if (!fullscreen) {
      el.style.position = "relative";
    }
    el.instance = instance;
  },
  updated(el, binding) {
    const instance = el.instance;
    if (!instance) return;
    instance.setTip(el.getAttribute("loading-tip"));
    // 如果指定绑定的值更新前和更新后不一致,则重新设置loading状态
    if (binding.oldValue !== binding.value) {
      instance.setLoading?.(binding.value && !instance.loading);
    }
  },
  unmounted(el) {
    el?.instance?.close();
  },
};

export function setupLoadingDirective(app: App) {
  app.directive("loading", loading);
}
```

:::

::: details v-loading 使用

```vue
<template>
  <div v-loading.fullscreen="state.fullscreenLoading">
    <div>
      <a-button @click="handleContainerLoading(true)">容器loading</a-button>
      <a-button @click="handleContainerLoading(false)"
        >取消容器loading</a-button
      >
      <a-button @click="handleFullscreenLoading">全屏loading</a-button>
    </div>
    {{ state.containerLoading }}
    <div v-loading="state.containerLoading" class="container">container</div>
  </div>
</template>
<script setup lang="ts">
import { reactive } from "vue";
const state = reactive({
  containerLoading: false,
  fullscreenLoading: false,
});
const handleContainerLoading = (containerLoading: boolean) => {
  Object.assign(state, { containerLoading });
};
const handleFullscreenLoading = () => {
  state.fullscreenLoading = true;
  setTimeout(() => (state.fullscreenLoading = false), 2000);
};
</script>
<style scoped>
.container {
  width: 200px;
  height: 200px;
  display: grid;
  place-items: center;
  border: 1px solid red;
}
</style>
```

:::

## 自定义文字省略指令(v-ellipsis)

## 自定义拷贝指令(v-copy)

v-copy 指令用于实现一键复制文本内容,用于鼠标右键粘贴。实现思路如下:

- 动态创建 textarea 元素,并设置 readOnly 属性为 true(表示文本域是只读的),并且将 textarea 元素移出可视区域。
- 将要复制的值赋给 textarea 标签的 value 属性,并插入到 body。
- 选中值 textarea 后执行 Copy 指令进行复制值,Copy 成功或失败都会执行对应的回调函数。
- 复制值后将 body 中插入的 textarea 元素 移除。
- 在第一次调用时绑定事件,在解绑时移除事件。

::: details v-copy 实现

```ts
import type { App, Directive, DirectiveBinding } from "vue";

export const copy: Directive = {
  beforeMount(el: HTMLElement, binding: DirectiveBinding) {
    /**
     * 指令的value是一个数组,数组的第一项为拷贝值,第二项为拷贝成功处理函数,
     * 第三项为拷贝失败处理函数
     */
    if (!Array.isArray(binding.value)) {
      throw new Error(
        "Parameter type error, directive parameter should be an array"
      );
    }
    const [value, successCallback, failCallback] = binding.value;
    if (!value) {
      console.log("无复制内容");
      return;
    }

    const handler = () => {
      // 动态创建 textarea 标签
      const textarea = document.createElement("textarea");
      // 将该textarea的readonly设为true,防止IOS下自动唤起键盘,同时将textarea移出可视区域
      textarea.readOnly = true;
      textarea.style.position = "absolute";
      textarea.style.left = "-9999px";
      // 将拷贝的内容赋值给textarea填充
      textarea.value = value;
      // 将 textarea 插入到 body 中
      document.body.appendChild(textarea);
      // 选中值并复制
      textarea.select();
      if (document.execCommand("Copy")) {
        typeof successCallback === "function" && successCallback();
      } else {
        typeof failCallback === "function" && failCallback();
      }
      // 移除文本域
      document.body.removeChild(textarea);
    };
    (el as any).clickEvent = handler;
    el.addEventListener("click", handler);
  },
  unmounted(el: HTMLElement) {
    el.removeEventListener("click", (el as any).clickEvent);
  },
};

export function setupCopyDirective(app: App) {
  app.directive("copy", copy);
}
```

:::

::: details 使用 v-copy 指令

```vue
<template>
  <a-button v-copy="[text, handleCopySuccess, handleCopyFail]">
    copy text
  </a-button>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { message } from "ant-design-vue";
const text = ref("你是一头猪");
function handleCopySuccess() {
  message.success("Copy Success");
}
function handleCopyFail() {
  message.error("Copy Fail");
}
</script>
```

:::

## 自定义图片懒加载指令(v-lazyLoad)

v-lazyLoad 指令支持图片懒加载,只加载可见区域的图片。图片懒加载实现原理:首先将图片的 src 设置在图片的自定义属性上,通过监听 scroll 事件或使用 IntersectionObserver 判断图片处于可视区域,如果图片处于可视区域,则获取图片自定义属性上的图片源并设置图片的 src 属性,否则显示默认图片。
::: details v-lazyLoad 实现

```ts
import { throttle } from "lodash-es";
import { App, Directive } from "vue";

// 图片默认src
let defaultSrc = "";

class LazyLoadImage {
  static init(el: HTMLElement, src: string, defaultSrc: string) {
    el.setAttribute("data-src", src);
    defaultSrc && el.setAttribute("src", defaultSrc);
  }
  static observeImage(el: HTMLImageElement) {
    const observer = new IntersectionObserver((entries) => {
      // 从自定义data-src属性上获取src
      const src = el.dataset.src;
      // 判断元素是否在可视区域
      if (entries[0].isIntersecting && src && !el.src) {
        el.src = src;
        el.removeAttribute("data-src");
        observer.unobserve(el);
      }
    });
    observer.observe(el);
  }
  static listenerScroll(el: HTMLImageElement) {
    const handler = throttle(() => {
      const isInViewport = LazyLoadImage.isInViewport(
        el,
        this.getClientHeight()
      );
      // 判断元素是否可见
      if (isInViewport) {
        // 从自定义data-src属性上获取src
        const src = el.dataset.src;
        if (src && !el.src) {
          el.src = src;
          el.removeAttribute("data-src");
        }
      }
    }, 10);
    el.addEventListener("scroll", handler);
  }
  // 获取容器可视区域高度
  static getClientHeight() {
    const clientH = document.documentElement.clientHeight;
    const bodyClientH = document.body.clientHeight;
    if (clientH && bodyClientH) {
      return bodyClientH < clientH ? bodyClientH : clientH;
    }
    return bodyClientH > clientH ? bodyClientH : clientH;
  }
  // 判断元素是否可见,通过el.getBoundingClientRect().top < height 表示可见
  static isInViewport(el: HTMLElement, height: number) {
    if (typeof el.getBoundingClientRect !== "function") return true;
    const rect = el.getBoundingClientRect();
    return rect.top < height;
  }
}

export const lazyLoad: Directive = {
  beforeMount(el, binding) {
    LazyLoadImage.init(el, binding.value, defaultSrc);
  },
  mounted(el, binding) {
    "IntersectionObserver" in window
      ? LazyLoadImage.observeImage(el)
      : LazyLoadImage.listenerScroll(el);
  },
};

export function setupLazyLoadDirective(app: App) {
  // 获取Vue实例上的全局属性
  defaultSrc = app.config.globalProperties.defaultSrc;
  app.directive("lazyLoad", lazyLoad);
}
```

:::

::: details v-lazyLoad 使用

```vue
<template>
  <div>
    <img v-lazyLoad="src" class="image" />
  </div>
</template>
<script setup lang="ts">
const src =
  "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png";
</script>
<style scoped>
.image {
  width: 300px;
  height: 200px;
  margin-top: 1000px;
  border: 1px solid red;
}
</style>
```

:::

## 自定义长按指令(v-longPress)

v-longPress 指令可以实现长按触发相应的事件。实现思路如下:

- 创建一个计时器,2s 后执行函数。
- 当用户按下按钮时触发 mousedown 事件,启动计时器;用户松开按钮时调用 mouseout 事件。
- 如果 mouseup 事件 2s 内被触发,则清除计时器,当作一个普通的点击事件。
- 如果计时器没有在 2s 内清除,则判定为一次长按,可以执行对应的回调函数。
- 移动端环境下需要考虑 touchstart 和 touchend 事件。

::: details v-longPress 实现

```ts
import { App, Directive, DirectiveBinding } from "vue";

export const longPress: Directive = {
  beforeMount(el: HTMLElement, binding: DirectiveBinding) {
    if (typeof binding.value !== "function") {
      throw new Error("The directive value is not a function");
    }
    const handler = (e: MouseEvent) => binding.value(e);
    let pressTimer: NodeJS.Timeout | null = null;
    const start = (e: Event) => {
      // 如果触发的事件是点击事件,并且是鼠标按键是否是左键则直接返回
      if (e.type === "click" && (e as MouseEvent).button !== 0) return;
      if (pressTimer === null) {
        pressTimer = setTimeout(() => handler(e as MouseEvent), 2000);
      }
    };
    const cancel = () => {
      if (pressTimer !== null) {
        clearTimeout(pressTimer);
        pressTimer = null;
      }
    };
    (el as any).clickEvent = cancel;
    // 添加事件监听器
    el.addEventListener("mousedown", start);
    el.addEventListener("touchstart", start);
    // 取消计时器
    el.addEventListener("click", cancel);
    el.addEventListener("mouseout", cancel);
    el.addEventListener("touchend", cancel);
    el.addEventListener("touchcancel", cancel);
  },
  unmounted(el: HTMLElement) {
    el.removeEventListener("click", (el as any).clickEvent);
  },
};

export function setupLongPressDirective(app: App) {
  app.directive("longPress", longPress);
}
```

:::

::: details v-longPress 使用

```vue
<template>
  <div>
    <a-button v-longPress="handler">button</a-button>
  </div>
</template>
<script setup lang="ts">
const handler = (e: MouseEvent) => {
  console.log("longPress event: ", e);
};
</script>
```

:::

## 自定义防抖指令(v-debounce)

v-debounce 提供防抖功能,常用于快速点击、resize 事件优化。
::: details v-debounce 实现

```ts
import type { App, Directive, DirectiveBinding } from "vue";

let timer: NodeJS.Timeout | null = null;

function getHandlers(binding: DirectiveBinding) {
  const delay = Number.isInteger(parseInt(binding.arg!))
    ? parseInt(binding.arg!)
    : 10;
  const handler = () => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      if (typeof binding.value === "function") {
        binding.value();
      }
    }, delay);
  };
  return { handler };
}

export const debounce: Directive = {
  beforeMount(el: HTMLElement, binding: DirectiveBinding) {
    if (binding.arg && !Number.isInteger(parseInt(binding.arg))) {
      console.error(
        "v-debounce parameter error,The parameter should be a number"
      );
    }
    const { handler } = getHandlers(binding);
    (el as any).clickEvent = handler;
    el.addEventListener("click", handler);
  },
  unmounted(el: HTMLElement) {
    el.removeEventListener("click", (el as any).clickEvent);
  },
};

export function setupDebounceDirective(app: App) {
  app.directive("debounce", debounce);
}
```

:::

::: details v-debounce 使用

```vue
<template>
  <div>
    <a-button v-debounce:1000="handler">button</a-button>
  </div>
</template>
<script setup lang="ts">
const handler = () => {
  console.log("click button...");
};
</script>
```

:::

## 自定义权限指令(v-permission)

v-permission 用于权限的判断控制元素的显示。在实际业务中通常需要根据用户角色进行一些权限判断,一般可以使用`v-if`来决定是否渲染节点,如判断条件比较繁琐且多个地方都需要判断,这种方式显得很冗余,通过自定义全局权限指令进行优化。
::: details v-permission 实现

```ts
import { App, Directive, DirectiveBinding } from "vue";
import { intersection } from "lodash-es";

// 权限列表
const permissions = ["add", "delete", "update", "query", "import", "export"];

function checkPermission(value: string | string[], permissions: string[]) {
  if (Array.isArray(value)) {
    // 获取两个数组的交集
    return intersection(permissions, value).length > 0;
  }
  return permissions.includes(value);
}

export const permission: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const permission = binding.value || "";
    console.log("permission:", permission);
    if (typeof permission !== "string" && !Array.isArray(permission)) {
      throw new Error(
        "parameter error,The parameter must be a string or an array of strings"
      );
    }
    const hasPermission = checkPermission(permission, permissions);
    if (!hasPermission) {
      el.parentNode && el.parentNode.removeChild(el);
    }
  },
};
export function setupPermissionDirective(app: App) {
  app.directive("permission", permission);
}
```

:::
::: details v-permission 使用

```vue
<template>
  <div>
    <div v-permission="'add'">content1</div>
    <!-- 由于没有check权限,因此content2不会显示 -->
    <div v-permission="'check'">content2</div>
    <div v-permission="['query', 'check']">content3</div>
  </div>
</template>
<script setup lang="ts"></script>
```

:::

## 自定义水印指令(v-waterMarker)

v-waterMarker 用于绘制水印。实现思路:

- 使用 canvas.toDataURL()生成 base64 格式的图片文件,设置其字体大小,颜色等。
- 将其设置为背景图片,从而实现页面或组件水印效果。

::: details WatermarkProps

```ts
export interface WatermarkProps {
  /**
   * @desc 水印宽度
   * @default 120
   */
  width?: number;
  /**
   * @desc 水印高度
   * @default 60
   */
  height?: number;
  /**
   * @desc 绘制水印时旋转的角度
   * @default -22
   */
  rotate?: number;
  /**
   * @desc 图片源,优先使用图片渲染水印
   * @default
   */
  image?: string;
  /**
   * @desc 图片宽度
   * @default 120
   */
  imageWidth?: number;
  /**
   * @desc 图片高度
   * @default 64
   */
  imageHeight?: number;
  /**
   * @desc 水印元素的z-index
   * @default 2000
   */
  zIndex?: number;
  /**
   * @desc 水印文字内容
   * @default
   */
  content?: string;
  /**
   * @desc 水印文字大小
   * @default 14
   */
  fontSize?: number | string;
  /**
   * @desc 水印文字颜色
   * @default 'rgba(0,0,0,.15)'
   */
  fontColor?: string;
  /**
   * @desc 水印文字系列
   * @default 'PingFang SC'
   */
  fontFamily?: string;
  /**
   * @desc 水印文字样式
   * @default 'normal'
   */
  fontStyle?: string;
  /**
   * @desc 水印文字粗细
   * @default 'normal'
   */
  fontWeight?: string;
  /**
   * @desc 水印之间的水平间距
   * @default 24
   */
  gapX?: number;
  /**
   * @desc 水印之间的垂直间距
   * @default 48
   */
  gapY?: number;
  /**
   * @desc 是否覆盖整个页面
   * @default false
   */
  fullPage?: boolean;
}
```

:::

::: details v-watermark 实现

```ts
import { App, Directive, DirectiveBinding } from "vue";
import { isObject } from "/@/utils/is";
import { WatermarkProps } from "/@/components/Watermark";

const defaultProps: WatermarkProps = {
  width: 120,
  height: 60,
  rotate: -22,
  imageWidth: 120,
  imageHeight: 64,
  zIndex: 2000,
  content: "",
  fontSize: 14,
  fontColor: "rgba(0,0,0,.15)",
  fontStyle: "normal",
  fontFamily: "PingFang SC",
  fontWeight: "normal",
  gapX: 24,
  gapY: 48,
  fullPage: false,
};

function init(el: HTMLElement, props: WatermarkProps) {
  const {
    width = 120,
    height = 60,
    rotate = -22,
    image,
    imageWidth = 120,
    imageHeight = 64,
    zIndex = 2000,
    content = "",
    fontSize = 14,
    fontColor = "rgba(0,0,0,.15)",
    fontStyle = "normal",
    fontFamily = "PingFang SC",
    fontWeight = "normal",
    gapX = 24,
    gapY = 48,
    fullPage = false,
  } = props;
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      reject("The current environment does not support canvas");
      return;
    }
    // 获取屏幕像素比、canvas宽高、水印宽高
    const ratio = window.devicePixelRatio || 1;
    const canvasWidth = `${(gapX + width) * ratio}px`,
      canvasHeight = `${(gapY + height) * ratio}px`;
    const markWidth = width * ratio,
      markHeight = height * ratio;

    canvas.setAttribute("width", canvasWidth);
    canvas.setAttribute("height", canvasHeight);

    // 处理图片水印
    if (image) {
      // 重新映射画布上的 (0,0) 位置
      ctx.translate(markWidth / 2, markHeight / 2);
      // 旋转指定角度
      ctx.rotate((Math.PI / 180) * Number(rotate));
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.referrerPolicy = "no-referrer";
      img.src = image;
      img.onload = () => {
        console.log("xxxx");
        // 绘制图片
        ctx.drawImage(
          img,
          (-imageWidth * ratio) / 2,
          (-imageHeight * ratio) / 2,
          imageWidth * ratio,
          imageHeight * ratio
        );
        // 恢复canvas
        ctx.restore();
        // 返回canvas转base64
        resolve(canvas.toDataURL());
      };
      return;
    }

    // 处理文字水印
    if (content) {
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      ctx.translate(markWidth / 2, markHeight / 2);
      ctx.rotate((Math.PI / 180) * Number(rotate));
      const markSize = Number(fontSize) * ratio;
      ctx.font = `${fontStyle} normal ${fontWeight} ${markSize}px/${markHeight}px ${fontFamily}`;
      ctx.fillStyle = fontColor;
      ctx.fillText(content, 0, 0);
      ctx.restore();
      resolve(canvas.toDataURL());
    }
  }).then((base64Url) => {
    el.style.position = fullPage ? "fixed" : "absolute";
    el.style.left = "0";
    el.style.right = "0";
    el.style.top = "0";
    el.style.bottom = "0";
    el.style.pointerEvents = "none";
    el.style.backgroundRepeat = "repeat";
    el.style.zIndex = zIndex + "";
    el.style.backgroundSize = `${gapX + width}px`;
    el.style.backgroundImage = `url(${base64Url})`;
  });
}

export const waterMarker: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    if (!isObject(binding.value || {})) {
      throw new Error("The directive parameter must be an object");
    }
    const props = Object.assign(defaultProps, binding.value);
    init(el, props);
  },
  updated(el: HTMLElement, binding: DirectiveBinding) {
    const props = Object.assign(defaultProps, binding.value);
    init(el, props);
  },
};

export function setupWaterMarkerDirective(app: App) {
  app.directive("waterMarker", waterMarker);
}
```

:::

::: details v-waterMarker 使用

```vue
<template>
  <div class="page">
    <a-button @click="handleClick('content')">切换文字水印</a-button>
    <a-button @click="handleClick('image')">切换图片水印</a-button>
    <div class="block" v-waterMarker="{ content, image }"></div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
const randomNumber = (max: number) => Math.floor(Math.random() * max) + 1;
const contents = [
  "你是一头猪",
  "你是一只狗",
  "你是一条蛇",
  "你是一个人",
  "你是一坨屎",
];
const content = ref(contents[0]);
const image = ref("");
const handleClick = (type: string) => {
  if (type === "content") {
    image.value = "";
    content.value = contents[randomNumber(4)];
    return;
  }
  image.value =
    "https://img11.360buyimg.com/imagetools/jfs/t1/57345/6/20069/8019/62b995cdEd96fef03/51d3302dfeccd1d2.png";
};
</script>
<style scoped>
.page {
  position: relative;
  width: 100%;
  height: 100%;
}
.block {
  width: 100%;
  height: 100%;
}
</style>
```

:::

## 自定义拖拽指令(v-draggable)

v-draggable 指令允许拖拽目标元素。实现思路:

- 设置拖拽元素的父元素为相对布局,拖拽元素为绝对布局。
- 当鼠标按下(onmousedown)时记录目标元素移动前的 left 和 top 值。
- 当鼠标移动(onmousemove)时计算每次移动的横向距离和纵向距离的变化值,并改变元素的 left 和 top 值
- 当鼠标松开(onmouseup)时完成一次拖拽,并清理相关事件。

::: details v-draggable 实现

```ts
import { App, Directive } from "vue";

export const draggable: Directive = {
  mounted(el: HTMLElement) {
    el.style.cursor = "move";
    // 不允许用户选择内容
    el.style.userSelect = "none";
    el.onmousedown = function (e) {
      // 记录移动前的坐标位置
      const disX = e.pageX - el.offsetLeft,
        disY = e.pageY - el.offsetTop;
      document.onmousemove = function (e) {
        // 获取移动后的坐标
        let x = e.pageX - disX,
          y = e.pageY - disY;
        // 获取最大的移动坐标
        const maxX =
            document.body.clientWidth -
            parseInt(window.getComputedStyle(el).width),
          maxY =
            document.body.clientHeight -
            parseInt(window.getComputedStyle(el).height);
        // 坐标最大最小边界判断
        if (x < 0) {
          x = 0;
        } else if (x > maxX) {
          x = maxX;
        }
        if (y < 0) {
          y = 0;
        } else if (y > maxY) {
          y = maxY;
        }
        el.style.left = x + "px";
        el.style.top = y + "px";
      };
      document.onmouseup = function () {
        document.onmousemove = document.onmouseup = null;
      };
    };
  },
  unmounted(el) {
    el.onmousedown = null;
  },
};
export function setupDraggableDirective(app: App) {
  app.directive("draggable", draggable);
}
```

:::
::: details v-draggable 使用

```vue
<template>
  <div class="page">
    <div v-draggable class="block">block</div>
  </div>
</template>
<script setup lang="ts"></script>
<style scoped>
.page {
  position: relative;
  width: 100%;
  height: 100%;
}
.container {
  position: absolute;
  left: 0;
  top: 0;
}
.block {
  position: absolute;
  width: 100px;
  height: 100px;
  display: grid;
  place-items: center;
  border: 1px solid red;
}
</style>
```

:::

## 自定义禁止输入 emoji 指令(v-emoji)

v-emoji 指令用于可以禁止输入 emoji 表情。

```ts
import { Directive } from "vue";

const regRule =
  /[^\u4E00-\u9FA5|\d|\a-zA-Z|\r\n\s,.?!，。？！…—&$=()-+/*{}[\]]|\s/g;

/**
 * 查找指定type的元素,如果传入DOM元素的类型和type相同则直接返回该元素,否则通过querySelector()
 * 查找传入DOM元素的所匹配的子元素。
 * @param parent 传入元素
 * @param type 元素的类型
 */
const findElement = (parent: HTMLElement, type: string): HTMLElement | null => {
  return parent.tagName.toLowerCase() === type
    ? parent
    : parent.querySelector(type);
};

/**
 * 触发在指定DOM元素上指定type事件
 * @param el 需要触发事件的DOM元素
 * @param type 触发的事件类型
 */
const trigger = (el: HTMLElement, type: string) => {
  const e = document.createEvent("HTMLEvents");
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
};

export const emoji: Directive = {
  beforeMount(el) {
    // 查找input元素
    const inputEl = findElement(el, "input") as HTMLInputElement;
    if (!inputEl) return;
    el.$inputEl = inputEl;
    (inputEl as any).handler = () => {
      // 获取input输入值
      const value = inputEl.value;
      inputEl.value = value.replaceAll(regRule, "");
      // 替换emoji表情后触发input事件
      trigger(inputEl, "input");
    };
    inputEl.addEventListener("keyup", (inputEl as any).handler);
  },
  unmounted(el) {
    el.$inputEl.removeEventListener("keyup", el.$inputEl.handler);
  },
};
```
