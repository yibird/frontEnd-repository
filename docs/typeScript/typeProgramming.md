## 数组相关类型工具

### 获取数组第一个元素类型

::: details 基于 const 断言+索引类型

```ts
// const断言后arr的类型为 readonly ["haha", 123]
const arr = ['haha', 123] as const
// type ArrFirst = "haha"
type ArrFirst = (typeof arr)[0]
```

:::

::: details 基于 const 断言+infer 关键字

```ts
/*
 * 思路:根据ES6的数组解构方法获取数组首个元素,
 * 通过infer关键字推断首个元素类型。
 */

// const断言后arr的类型为 readonly ["haha", 123]
const arr = ['haha', 123] as const
/**
 * T为传入的数组类型,如果T可赋值为readonly [infer F, ...infer O],则通过ES6数组解构
 * 首个元素和剩余元素,再通过infer关键字推断首个元素类型为F,最终返回F,否则返回any。
 */
type First<T> = T extends readonly [infer F, ...infer O] ? F : any
// type ArrFirst = "haha"
type ArrFirst = First<typeof arr>
```

:::
