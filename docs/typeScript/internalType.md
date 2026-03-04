## `Record<Key,Value>`

`Record<Key,Type>`用于构造一个对象类型,它支持两个泛型,Key 用于约束对象属性名的类型,Value 用于约束对象属性值的类型,它用于替代对象结构类型,对象结构类型使用下标方式访问属性时只能访问声明时的属性,无法访问动态添加的属性。

```ts
const obj = { name: 'z乘风' } // obj的类型为{name: string;}
console.log(obj.name) // "z乘风" 因为在obj在声明时定义了name属性
// 添加obj动态添加age属性
Object.assign(obj, { age: 18 })
console.log(obj.age) // error,类型“{ name: string; }”上不存在属性“age”

// 解决方式1:通过索引类型,指定对象结构的属性类型为string类型,值类型为any类型
const obj1: { [K: string]: any } = { name: 'z乘风' }
Object.assign(obj1, { age: 18 })
console.log(obj1.name) // "z乘风"
console.log(obj1.age) // 18

// 解决方式2:通过Record类型,指定对象结构的属性类型为string类型,值类型为any类型
const obj2: Record<string, any> = { name: 'z乘风' }
Object.assign(obj2, { age: 18 })
console.log(obj2.name) // "z乘风"
console.log(obj2.age) // 18
```

Record 类型的实现如下:

```ts
/**
 * 由于对象结构的属性类型只能为string、number、symbol三者其一,所以Key要
 * 继承自 string|number|symbol,而keyof any会返回any类型所有key类型的联合类型,
 * 即 keyof any 的结果为 string|number|symbol,故可以将
 * Key extends string|number|symbol 简写为 Key extends keyof any
 */
type Record<Key extends keyof any, Value> = {
  // P in 表示属性类型必须是 string|number|symbol交叉类型中其中之一
  [P in K]: Value
}
```

## `Partial<Type>`

`Partial<Type>`可以返回将一个类型中所有属性变为可选。

```ts
// name和age属性都是必须的
interface User {
  name: string
  age: number
}
type PartialUser = Partial<User> // PartialUser的类型为:{name?:string|undefined;age?:number|undefined;}
```

Partial 实现如下:

```ts
type Partial<T> = {
  /**
   * keyof T表示获取T类型中所有属性类型的联合类型,P in keyof T表示P必须属于
   * T类型中所有属性类型的联合类型其中之一,T[P]根据P通过索引类型获取值类型。
   */
  [P in keyof T]?: T[P]
}
```

## `Required<Type>`

`Required<Type>`可以返回将一个类型中所有属性变为可选,功能与`Partial`相反。

```ts
type User = {
  name: string
  age?: number
  address?: string
}
// NewUser的类型为: { name: string;age: number;address: string;}
type NewUser = Required<User>
```

`Required` 实现如下:

```ts
type Required<T> = {
  [P in keyof T]: T[p]
}
```

## `Pick<T,K>`

`Pick<T,K>`:从一个类型中根据指定属性名组成一个新的类型,简单来说根据 K 在 T 中 pick(挑选)一些类型。

```ts
type User = {
  name: string
  age: number
  address: string
}
// NewUser的类型为: {name: string;age: number;}
type NewUser = Pick<User, 'name' | 'age'>

const user: NewUser = {
  name: 'xx',
  age: 10,
}
```

`Pick<T,K>`实现如下:

```ts
// K继承于T类型所有属性key组合的联合类型
type Pick<T, K extends keyof T> = {
  [P in K]: T[P]
}
```

## `Exclude<T,U>`

`Exclude<T,U>`:通过从 T 类型所有可分配给的联合成员中排除 U 类型联合成员来构造一个类型,简单来说就是返回 T 和 U 类型的差集。

```ts
// T1的类型为: 'c'
type T1 = Exclude<'a' | 'b' | 'c', 'a' | 'b'>
// T2的类型为: string | number
type T2 = Exclude<string | number | (() => void), Function>
```

`Exclude<T,U>`实现如下:

```ts
type Exclude<T, U> = T extends U ? never : T
```

## `Extract<T,U>`

`Extract<T,U>`:通过从 T 类型所有可分配给的联合成员中提取 U 类型联合成员来构造一个类型,简单来说就是返回 T 和 U 类型的并集。`Extract<T,U>`与`Exclude<T,U>`作用是相反的。

```ts
// T1的类型为: "a" | "b"
type T1 = Extract<'a' | 'b' | 'c', 'a' | 'b'>
// T2的类型为: () => void
type T2 = Extract<string | number | (() => void), Function>
```

`Extract<T,U>`实现如下:

```ts
type Extract<T, U> = T extends U ? T : never
```

## `Omit<T,K>`

`Omit<T,K>`:用于构造一个从 T 类型中根据删除 K 类型(K 类型可以是字符串或联合类型)后的新类型。

```ts
interface User {
  name: string
  description: string
  age: number
  address: string
}
// T1的类型为: { name: string;age: number;}
type T1 = Omit<User, 'description' | 'address'>
```

`Omit<T,K>`实现如下:

```ts
/*
 * 首先泛型K必须是T类型的属性其中之一,所以 K 继承自 keyof T,
 * 由于Omit<T,K>是从T类型中根据K类型删除key,所以通过Exclude可以排除T和K的差集,
 * Exclude<keyof User, "description" | "address">结果为 {name:string;age:number;}
 * 排除后的类型就是所需类型,此时通过Pick根据T提取排除后的类型,即Pick<T, Exclude<keyof T, K>>。
 */
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
```

## `NonNullable<T,K>`

`NonNullable<T>`:过滤 T 类型中为 null、undefined。如果 T 类型为 null、undefined 就返回 never,否则返回 T 类型本身。

```ts
// T1的类型为: never
type T1 = NonNullable<null>
// T2的类型为: never
type T2 = NonNullable<undefined>
// T3的类型为: "a"
type T3 = NonNullable<'a' | undefined>
// T4的类型为: "a"
type T4 = NonNullable<'a'>
```

`NonNullable<T>`的实现如下:

```ts
type NonNullable<T> = T extends null | undefined ? never : T
```

## `Parameters<T>`

`Parameters<T>`:获取函数参数的类型并将结果存入一个元组中返回。

```ts
// T1的类型为: []
type T1 = Parameters<() => void>
// T2的类型为: [a: string]
type T2 = Parameters<(a: string) => void>
// T3的类型为: [a: string, b: number]
type T3 = Parameters<(a: string, b: number) => void>

declare function f1(arg: { a: number; b: string }): void
// T4的类型为: type T4 = [arg: { a: number; b: string;}]
type T4 = Parameters<typeof f1>
// T5的类型为: never
type T5 = Parameters<never>
// type T6 = Parameters<Function>; // error
```

`Parameters<T>`的实现如下:

```ts
/**
 * 由于Parameters的作用是获取函数参数的类型,所以T类型必须继承自一个任意参数数量,
 * 任意参数类型,任意返回值的函数体,即 T extends (...args:any)=>any,
 * 然后使用 infer 关键字推断args的类型并保存到P类型上,如果T不是一个任意函数体
 * 则返回never,否则返回P类型。
 */
type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never
```

## `ConstructorParameters<T>`

`ConstructorParameters<T>`:获取类构造函数中参数的类型,并将结果存入一个元组中返回。

```ts
// T1的类型为: [message?: string | undefined, options?: ErrorOptions | undefined]
type T1 = ConstructorParameters<ErrorConstructor>
// T2的类型为: string[]
type T2 = ConstructorParameters<FunctionConstructor>
// T3的类型为: [pattern: string | RegExp, flags?: string | undefined]
type T3 = ConstructorParameters<RegExpConstructor>
// T4的类型为: unknown[]
type T4 = ConstructorParameters<any>
```

`ConstructorParameters<T>`的实现如下:

```ts
/**
 * 由于ConstructorParameters获取构造函数参数的类型,所以泛型T必须继承自任意参数数量,
 * 任意参数类型,任意返回值的构造函数主体,即 T extends abstract new (...args: any) => any,
 * 如果满足条件则使用 infer推断构造函数类型比将结果保存至P类型,然后返回P类型,否则返回never。
 */
type ConstructorParameters<T extends abstract new (...args: any) => any> = T extends abstract new (
  ...args: infer P
) => any
  ? P
  : never
```

## `ReturnType<T>`

`ReturnType<T>`:获取函数类型返回值的类型。

```ts
// T1的类型为: void
type T1 = ReturnType<() => void>
// T2的类型为: string
type T2 = ReturnType<() => string>
// T3的类型为: unknown
type T3 = ReturnType<<T>() => T>
// T4的类型为: number[]
type T4 = ReturnType<<T extends U, U extends number[]>() => T>

declare function f1(): { a: number; b: string }
// T5的类型为: { a: number; b: string }
type T5 = ReturnType<typeof f1>
// T6的类型为: any
type T6 = ReturnType<any>
// T7的类型为: never
type T7 = ReturnType<never>
// type T8 = ReturnType<Function>; // error
```

`ReturnType<T>`实现如下:

```ts
type RturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : never
```

## `InstanceType<T>`

`InstanceType<T>`:用于获取构造函数类型的实例类型。

```ts
// T1的类型为: C
type T1 = InstanceType<typeof C>
// T2的类型为: any
type T2 = InstanceType<any>
// T3的类型为: never
type T3 = InstanceType<never>
// type T4 = InstanceType<string>; // error
// type T5 = InstanceType<Function>; // error
```

`InstanceType<T>`的实现如下:

```ts
type InstanceType<T extends abstract new (...args: any) => any> = T extends abstract new (
  ...args: any
) => infer R
  ? R
  : never
```

## `ThisParameterType<T>`

`ThisParameterType<T>`:提取函数类型的 this 参数的类型,如果函数类型没有参数,则 this 为 `unknown`。

```ts
function toHex(this: Number) {
  return this.toString(16)
}
// n的类型为: Number
function numberToString(n: ThisParameterType<typeof toHex>) {
  return toHex.apply(n)
}
```

`ThisParameterType<T>`实现如下:

```ts
type ThisParameterType<T> = T extends (this: infer U, ...args: any[]) => any ? U : unknown
```

## `OmitThisParameter<T>`

`OmitThisParameter<T>`:从 T 类型中删除 this 参数。如果 T 类型没有显式声明 this 的参数,则结果是简单的 T,否则,将从 T 中创建一个没有 this 参数的新函数类型。泛型被删除,只有最后一个重载签名被传播到新的函数类型中。

```ts
function toHex(this: Number) {
  return this.toString(16)
}
// fiveToHex的类型为: () => string;
const fiveToHex: OmitThisParameter<typeof toHex> = toHex.bind(5)
```

`OmitThisParameter<T>`实现如下:

```ts
/**
 * ThisParameterType<T>用于提取函数类型的 this 参数的类型,如果函数类型没有参数,则 this 为 `unknown`,
 * 如果T类型不存在this参数则ThisParameterType<T>的结果为unknown,故unknown extends ThisParameterType<T>
 * 成立,直接返回T类型。否则判断T是否是一个函数,如果是一个函数通过infer推断参数类型并保存至A类型,推断函数返回值
 * 类型并保存至R,然后返回一个函数参数类型为A,返回值类型为R的函数体,否则返回T类型。
 */
type OmitThisParameter<T> =
  unknown extends ThisParameterType<T>
    ? T
    : T extends (...args: infer A) => infer R
      ? (...args: A) => R
      : T
```

## `ThisType<T>`

`ThisType<T>`:用于获取指定上下文对象类型。

```ts
interface Person {
  name: string
  age: number
}
const obj: ThisType<Person> = {
  mimi() {
    this.name // string
  },
}

// 没有ThisType情况下
const dog = {
  wang() {
    console.log(this.age) // error，在dog中只有wang一个函数，不存在age
  },
}
// 使用ThisType
const dog: { wang: any } & ThisType<{ age: number }> = {
  wang() {
    console.log(this.wang) // error，因为没有在ThisType中定义
    console.log(this.age) // ok
  },
}
dog.wang // ok 正常调用
dog.age // error，在外面的话，就跟ThisType没有关系了,这里就是没有定义age了
```

`ThisType<T>`实现如下:

```ts
interface ThisType<T> {}
```

## `Uppercase<T>`

`Uppercase<T>`:返回 T 字符串类型的大写类型。

```ts
// T1的类型为 "C"
type T1 = Uppercase<'c'>
// T2的类型为 "1"
type T2 = Uppercase<'1'>
// T3的类型为 any
type T3 = Uppercase<any>
```

`Uppercase<T>`实现如下:

```ts
/**
 * 官方通过 intrinsic 关键字实现Uppercase类型。为了帮助进行字符串操作,TypeScript 包含一组可用于字符串操作的类型。
 * 这些.d.ts类型内置于编译器以提高性能,所以在TypeScript 包含的文件中找不到。
 */
type Uppercase<T extends string> = intrinsic
```
