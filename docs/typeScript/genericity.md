## 泛型

泛型(genericity)即参数化类型,泛型是将原类型的具体类型参数化(类型形参),在实际调用时传入具体的类型(类型实参)。泛型其主要目的是加强类型安全及减少类转换的次数。TS 也支持泛型特性(也叫类型参数),泛型可以对类型参数做一些列运算后返回新的类型。例如一个函数接收一个参数并返回传入的参数:

```ts
// 类型恒定了,只支持number类型,若要支持其他类型还得定义对应的函数
function identity(arg: number): number {
  return arg;
}

/*
 * 改进:使用any类型,由于any表示任意类型,函数可能会丢失类型,例如传入的是string类型,
 * 但返回类型可能number、boolean等类型
 */
function identity(arg: any): any {
  return arg;
}

// 改进:使用泛型,泛型与any类型相比泛型更加精确,入参和返回值都是Type
function identity<Type>(arg: Type): Type {
  return arg;
}
let result = identity<string>("hello");
```

虽然`any`和泛型具有类似的效果,但泛型具有更强的类型约束力,可以最大限度的描述具体类型。假设若需要访问泛型参数的 length 时,由于泛型并没有 length 属性,当访问 length 属性会编译错误:

```ts
// 假如要在函数中访问参数的length,但Type类型不存在length属性
function identity<Type>(arg: Type): Type {
  console.log("len:", arg.length); // error:Type类型上不存在length属性
  return arg;
}

// 改进1:将泛型参数设置为泛型数组,即可访问length属性
function identity<Type>(arg: Type[]): Type {
  console.log("len:", arg.length); // OK
  return arg;
}

// 改进2:让泛型参数继承自具有length属性的接口
interface Lengthwise {
  length: number;
}
// Type 通过extends关键字继承了Lengthwise接口的属性
function identity<Type extends Lengthwise>(arg: Type): Type {
  console.log("len:", arg.length); // OK
  return arg;
}
```

### 泛型字面量、泛型接口、泛型类

```ts
// 泛型字面量:声明方式,泛型需要前面
let myIdentity: <Type>(arg: Type) => Type = identity;
function identity<Type>(arg: Type): Type {
  return arg;
}

// 泛型字面量:对象形式
let myIdentity: { <Type>(arg: Type): Type } = identity;
function identity<Type>(arg: Type): Type {
  return arg;
}

// 泛型接口
interface GenericIdentityFn<Type>{
    (arg:Type):Type;
}
function identity<Type>(arg: Type): Type {
  return arg;
}
let myIdentity: GenericIdentityFn<number> = identity;


// 泛型类
class GenericNumber<NumberType> {
  value: NumberType;
  add(x:NumberType,y:Number) => NumberType
}
// 初始化类并传入泛型类型
let myGenericNumber = new GenericNumber<number>();
myGenericNumber.value = 0;
myGenericNumber.add = (x,y) => x+y;
myGenericNumber.add(1,2); // 3

let stringNumeric = new GenericNumber<string>();
stringNumeric.value = "z乘风";
stringNumeric.add = (str1,str2) => str1+str2;
stringNumeric('你','好'); // '你好'
```

### keyof 操作符

keyof 操作符可以将一个类型映射为它所有成员名称的联合类型,keyof 操作符采用对象类型并生成该对象的 key(键名)的字符串或数字联合类型。简单来说 keyof 可以提取对象的所有 key 然后生成字符串或数字的联合类型。

```ts
/* 例子1 */
type Point = { x: number; y: number };
// P的类型为:'x' | 'y',
type P = keyof Point;
let p1: P = "x";
let p2: P = "y";

/* 例子2 */
interface Person {
  name: string;
  age: number;
  address: string;
}
// Man的类型为:'name' | 'age' | 'address'
type Man = keyof Person;

/* 如果类型具有string或number索引签名,keyof则将返回这些类型*/
type Arrayish = { [n: number]: unknown };
// A的类型为:number
type A = keyof Arrayish;
let a: A = 123;

type Mapish = { [k: string]: boolean };
// M的类型为:string
type M = keyof Mapish;
let m: M = "hello";
```

### typeof 类型运算符

JavaScript 提供`typeof`操作符用于获取表达式的类型,TypeScript 也提供了`typeof`操作符用于在类型上下文中引用变量或属性的类型(无法用在表达式上)。

```ts
// js中的typeof
console.log(typeof "hello"); // 'string'

// ts中的typeof
let s = "hello";
// str的类型为string
let str: typeof s = "哈哈";

/**
 * typeof操作符一般与其他类型运算符搭配使用,typeof搭配ReturnType类型可以获取函数的返回值类型,
 * ReturnType是ts内置的类型,用于获取函数的返回值类型。
 */
type Predicate = (x: unknown) => boolean;
// K的类型为:boolean
type K = ReturnType<Predicate>;

function f() {
  return { x: 1, y: 2 };
}
/**
 * F的类型为:{x: number;y: number;},注意:切勿ReturnType<f>,ReturnType接收一个泛型类型,
 * 值和类型是有区别的。
 */
type F = ReturnType<typeof f>;

// typeof 只能用于标识符(即变量名)或属性上,但JS的typeof可作用表达式
function hello(arg: string) {
  return arg;
}
// let shouldContinue: typeof hello("Are you sure you want to continue?"); // error
```

### 索引访问类型

索引访问类型允许通过 key 来访问类型。

```ts
type Person = { age: number; name: string; alive: boolean };
// Age的类型为:number
type Age = Person["age"]; // 获取age属性对应类型
// T1的类型为:number | string
type T1 = Person["age" | "name"]; // 使用联合获取多个属性对应类型
// T2的类型为: number | string | boolean
type T2 = Person[keyof Person]; // 结合keyof
type AliveOrName = "alive" | "name";
// T3的类型为:boolean | string
type T3 = Person[AliveOrName];

const key = "age";
type Age = Person[key];
```

### 条件类型

TS 的条件类型的表现形式与三目运算符是一致的,最常见的就是继承(extends)关系的判断:

```ts
/**
 * 条件类型之继承关系,当extends左侧的类型可赋值(可分配)为右侧的类型时,
 * 说明左侧类型继承自右侧类型,条件为true。
 * 由于Dog继承自Animal,所以T1的类型为number
 */
type T1 = Dog extends Animal ? number : string;
// T2的类型为string
type T2 = RegExp extends Animal ? number : string;
```

下面是一个函数重载的例子,该函数最大限度的接收 string 和 number 的联合类型,当参数类型为 number 时返回 IdLabel,当参数类型为 string 时返回 NameLabel。

```ts
interface IdLabel {
  id: number;
}
interface NameLabel {
  name: string;
}
function createLabel(id: number): IdLabel;
function createLabel(name: string): NameLabel;
function createLabel(nameOrId: string | number): IdLabel | NameLabel;
function createLabel(nameOrId: string | number): IdLabel | NameLabel {
  throw "unimplemented";
}

/*
 * 定义IdOrName类型作为createLabel函数的返回值类型,当泛型T类型可分配为number类型时,
 * 返回IdLabel类型,否则返回NameLabel类型。
 */
type IdOrName<T extends number | string> = T extends number
  ? IdLabel
  : NameLabel;
function createLabel<T extends number | string>(idOrName: T): IdOrName<T> {
  throw "unimplemented";
}
```

条件类型中的检查与类型保护一样,可以缩小类型范围提供更具体的类型,条件类型则可以进一步限制泛型范围。例如访问通过下标的方式访问泛型 T 的 message 属性,由于 T 类型并没有 message 这个属性,所以编译会报错,解决办法是 T 类型继承一个具有 message 属性的类型。

```ts
// error:类型“"message"”无法用于索引类型“T”
type MessageOf<T> = T["message"];

// 通过泛型继承具有message的类型解决无法访问message
type MessageOf<T extends { message: unknown }> = T["message"]; // ok
interface Email {
  message: string;
}
// 由于Email类型具有message属性,将Email作为MessageOf的泛型类型可以正常访问messgae
type EmailMessageOf = MessageOf<Email>;
```

### infer 操作符

### 映射类型

映射类型建立在索引签名之上,用于声明尚未提前声明的属性类型。

```ts
type OnlyBoolsAndHorses = {
  [key: string]: boolean | string;
};
const conforms: OnlyBoolsAndHorses = {
  isNull: true,
  rodney: false,
};
```

映射类型是一种泛型类型,它使用 Property Keys 的联合迭代 key 来创建类型。

```ts
type OptionsFlags<Type> = {
  /**
   * OptionsFlags属性必须属于Type泛型所以key集合其中之一,
   * keyof Type将返回Type类型中所有key组合的联合类型
   */
  [Property in keyof Type]: boolean;
};
type FeatureFlags = {
  darkMode: () => void;
  newUserProfile: () => void;
};
// FeatureOptions的类型为:{darkMode: boolean;newUserProfile: boolean;}
type FeatureOptions = OptionsFlags<FeatureFlags>;

/**
 * 映射类型修饰符,在映射类型中可以添加readonly 或 ? 控制属性的只读性和可选性,
 * 可以使用+或-控制修饰符添加与删除,+表示添加修饰符,-表示删除修饰符,
 * 如果不添加前缀,则默认为+,
 */
type CreateMutable<Type> = {
  -readonly // -readonly 表示移除readonly修饰符
  [Property in keyof Type]: Type[Property];
};

type LockedAccount = {
  readonly name: string;
  readonly age: number;
};
// UnlockedAccount的类型为:{name: string;age: number;}
type UnlockedAccount = CreateMutable<LockedAccount>;

// 映射类型修饰符
type Concrete<Type> = {
  // ?表示属性是可选的,-?表示移除可选,所有属性都是必填的
  [Property in keyof Type]-?: Type[Property];
};
type MaybeUser = {
  id: string;
  name?: string;
  age?: number;
};
// User类型为:{id: string;name: string;age: number;}
type User = Concrete<MaybeUser>;
```

在 TypeScript4.1 及以上版本,提供了 as 语句,as 语句允许在映射类型重新映射类型的 key,简单来说 as 可以改变映射类型中 key 的名称。

```ts
/**
 * 在TypeScript4.1及以上版本,提供了as语句,as语句允许在映射类型重新映射类型的key
 */
type NewKeyType = "newType";
type MappedTypeWithNewProperties<Type> = {
  // as语句将属性名全都重新映射为'newType'
  [Property in keyof Type as NewKeyType]: Type[Property];
};
type NewTypeOption = {
  name: string;
  age: number;
};
// NewType的类型为:{newType: string | number;}
type NewType = MappedTypeWithNewProperties<NewTypeOption>;
```

as 语句与模板文件类型的结合:

```ts
/* as语句与模板文字类型结合 */
type Getters<Type> = {
  // Capitalize是TS内置的类型,用于将字符串文字类型的第一个字符转换为大写
  [Property in keyof Type as `get${Capitalize<
    string & Property
  >}`]: () => Type[Property];
};
type Person = {
  name: string;
  age: number;
  address: string;
};
/**
  type LazyPerson = {
    getName: () => string;
    getAge: () => number;
    getAddress: () => string;
  }
 */
type LazyPerson = Getters<Person>;
```

### 模板文字类型
