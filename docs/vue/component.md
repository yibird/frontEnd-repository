本章节将会学习如何定义组件,并学会使用如何在组件中使用生命周期函数、props、emits、定义响应式数据、插槽、定义方法和计算属性及侦听数据。

### 定义组件

#### defineComponent 定义组件

defineComponent 用于定义一个组件,允许接收一个组件 Option 的对象,或者是一个 setup 函数，函数名称将作为组件名称来使用。

```js
// vue2.x的写法:defineComponent接收options对象
import { defineComponent } from "vue";
export default defineComponent({
  props:{
    name:{
      type:String,
      default:'默认的名字'
    },
    list:{
      type:Array,
      default:()=>[]
    }
  },
  data() {
    return { count: 1 };
  },
  methods: {
    increment() {
      this.count++;
    },
  },
  compute(){
    getCount(){
        return this.count;
    }
  }
});
```

```js
<template>
  <div>
    <button @click="decrement">-</button>
    <span>{{count}}</span>
    <button @click="increment">+</button>
  </div>
  <div>type:{{type}}</div>
</template>

// vue3 写法
import {defineComponent,toRefs,ref} from 'vue';
const component = defineComponent({
  props: {
    name: {
      type: String,
      default: "z乘风",
    },
    list: {
      type: Array,
      default: () => [1,2,3],
    },
  },
  /*
   * emits支持数组和对象的方式定义触发事件,推荐使用对象方式,
   * 对象方式下可以对触发事件的参数进行类型限制
   */
  emits:['add']
  /*
   *  setup钩子函数等同于Vue2.x的created和beforeCreated钩子函数,
   *  setup接收组件的props和context两个参数,props是一个响应式对象,
   *  若想以普通对象方式访问props则可以使用toRefs()将响应式对象转换为普通对象。
   *  context是一个对象,它包含了当前组件的attrs、slots、emit3个属性。
   */
  setup(props, context) {
    // props是一个响应式对象,toRefs()可以将响应式对象转换为普通对象
    const {name,list} = toRefs(props);
    console.log(name,list); // 'z乘风' [1,2,3]

    /*
     * context是一个普通对象,包含了组件的attrs、slots、emit
     * attrs和slots都是响应式对象,emit是一个方法,expose是组件对外部暴露的接口
     */
    const { attrs,slots,emit,expose} = context;
    console.log(attrs,slots); // Proxy {__vInternal: 1} Proxy {__vInternal: 1}
    console.log(emit) // (event, ...args) => instance.emit(event, ...args)


    // 触发事件
    emit('add')

    /*
     * 使用ref定义响应式变量,ref会根据初始值进行类型推断,也可以显式指定泛型。
     *
     * 相比较reactive ref有一个明显的缺点,获取或设置ref时都需要获取或设置ref的value,
     * 但unref()可以直接返回ref内部value,unref是val = isRef(val) ? val.value : val的语法糖。
     * reactive适合定义集合数据,例如对象、数组等等,ref更适用于单个值
     */
    const count = ref<number>(0)

    // 定义方法
    const decrement = ()=>{
      // 获取或设置ref时都需要获取或设置ref的value
      count.value = count.value - 1
    }

    const increment = ()=>{
      // 获取或设置ref时都需要获取或设置ref的value
      count.value = count.value - 1
    }
    // 需要把定义的响应式变量和方法返回,此时模板才能访问到
    return {
       count,
       decrement,
       increment
    }
  },
});
/*
 * defineComponent()返回一个对象,该对象包含如下信息:
 *
 * components:{} // defineComponent中定义的components,只有定义才有
 * install: (app) => {…} // 组件的安装方法
 * props: {} // 组件的props,只有在defineComponent中定义props才有
 * render: ƒ _sfc_render(_ctx, _cache, $props, $setup, $data, $options) // 组件渲染方法
 * setup: setup(props, context) { } // setup函数,定义才有
 * __file: "/Users/vue3-demo/src/components/Component.vue" // 组件文件位置
 * __hmrId: "cc3ff87c" // 热更新id
 * __scopeId: "data-v-cc3ff87c" // scopedId,当组件中使用了<style scoped />才会出现此属性,
 *  此属性用于隔离组件的样式,使用后会为当前组件下元素添加data-v-cc3ff87c属性,用于区分<style scoped />中样式的作用范围
 *
 */
console.log(component);
```

**总结:**

- defineComponent 用于定义一个组件,接收一个配置对象用于定义组件信息,配置对象可以接收 props、emits、name、setup 等信息。
- setup 是 Vue3.x 新提供的生命周期函数,用于替代 Vue2.x 的 beforeCreated 和 created 钩子函数。它接收 props 和 context 两个参数,props 为组件的 props 且是一个具有响应式的对象,若想以正常 JS 方式操作 props 则可以通过 toRefs()响应式对象转换为普通的 JS 对象。context 是一个普通对象,包含了组件的 attrs、slots、emit、expose,attrs、slots、emit 等用于组件实例的$attrs、$slots、$emit,attrs、slots 都是响应式对象,emit 是一个方法,可以通过 emit 触发对应的事件,expose 是组件对外暴露的接口。
- ref 可以定义响应式对象但一般用于单个值。setup 函数需要返回模板中所用到的属性或方法,props 中的属性可除外。

#### defineAsyncComponent 定义异步组件

defineAsyncComponent()用于创建一个只有在需要时才会加载的异步组件。defineAsyncComponent 可以接受一个返回 Promise 的工厂函数,Promise 的 resolve 回调应该在服务端返回组件定义后被调用,也可以调用 reject(reason) 来表示加载失败。defineAsyncComponent()也可以接受一个配置对象定义组件信息。

```js
/** defineAsyncComponent接收一个 Promise */
import { defineAsyncComponent } from 'vue'
const AsyncComp = defineAsyncComponent(() => import('./components/AsyncComponent.vue'))
app.component('async-component', AsyncComp)
```

```js
/** defineAsyncComponent()接收一个配置对象 */
import { defineAsyncComponent } from 'vue'

const AsyncComp = defineAsyncComponent({
  // 工厂函数
  loader: () => import('./Foo.vue'),
  // 加载异步组件时要使用的组件
  loadingComponent: LoadingComponent,
  // 加载失败时要使用的组件
  errorComponent: ErrorComponent,
  // 在显示 loadingComponent 之前的延迟 | 默认值：200（单位 ms）
  delay: 200,
  // 如果提供了 timeout ，并且加载组件的时间超过了设定值，将显示错误组件
  // 默认值：Infinity（即永不超时，单位 ms）
  timeout: 3000,
  // 定义组件是否可挂起 | 默认值：true
  suspensible: false,
  /**
   *
   * @param {*} error 错误信息对象
   * @param {*} retry 一个函数，用于指示当 promise 加载器 reject 时，加载器是否应该重试
   * @param {*} fail  一个函数，指示加载程序结束退出
   * @param {*} attempts 允许的最大重试次数
   */
  onError(error, retry, fail, attempts) {
    if (error.message.match(/fetch/) && attempts <= 3) {
      // 请求发生错误时重试，最多可尝试 3 次
      retry()
    } else {
      // 注意，retry/fail 就像 promise 的 resolve/reject 一样：
      // 必须调用其中一个才能继续错误处理。
      fail()
    }
  },
})
```

### 组件生命周期

### 定义响应式数据和方法

### 使用 props 和 emits 触发事件

目前 TypeScript 已是前端届的主流,所以在声明 props 或 emits 应该为其添加类型约束。

#### 定义 props

```ts
import { dineComponent,PropType,toRefs} from 'vue';

interface Book {
   name:string;
   price?:number;
}

export default dineComponent({
    props:{
        // 使用Vue内置的类型,无法进行更细致的类型检查
        name:String,
        // 借助ts类型断言和PropType进行类型推论可以获得更加丰富的类型提示
        book:{
            // PropType是Vue3提供用于类型推论的Api。
            type:Object as PropType<Book>,
            // 默认值函数可提供一个this参数
            default(this: void)=>{
              return { name:"我爱你一万年",price:18.9 }
            },
            // 验证器接收this和props值两个参数
            validator(this: void, book: Book){
               return !!book.price;
            },
            // 是否必填
            required: true
        },
        callback:{
            // PropType类型推论 callback是一个函数且必须类型为布尔的isComplete参数,可以无返回值
            type:Function as PropType<(isComplete:boolean)=>void>
        },
        metadata:{
            type:null
        }
    },
    // 接收组件的props和上下文对象
    setup(props,context){
        // 组件的props是一个响应式对象,不能像普通对象操作props,但可以通过toRefs()将props转为普通对象
        const newProps = toRefs(props);
    }
})
```

#### 定义 emits

```ts
import {defineComponent} from 'vue'

interface Book {
   name:string;
   price?:number;
}

export default defineComponent({
    /*
     * emits可以是数组也可以是对象,如果是数组则无法为emit的事件参数做类型约束,
     * 所以一般不推荐使用数组写法,而是推荐对象写法
     */
    // emits:["addBook","delBook"], // 数组写法
    emits:{
        // 约束payload参数类型为Book
        addBook(payload:Book){
           // 运行时验证
           return payload.name.length > 0
        },
        // 约束参数为string类型,返回值为Boolean类型
        delBook:(payload: string) => Boolean
    },
    /*
     * context是一个普通对象,包含了组件的attrs、slot、emit、expose,
     * 其中emit是一个方法用于触发事件,其余参数皆为对象。
     */
    setup(props,context){
        const { attrs,slots、emit、expose }= context;
        emit("addBook", { price: 20.0 }); // error,类型错误
        emit("addBook", { name: "哈哈哈" } as Book); // ok

        emit("delBook",(name:string)=>Boolean)
    }
})
```

### 使用插槽和定义指令

### 定义计算属性和侦听数据
