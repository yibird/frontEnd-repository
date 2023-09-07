TypeScript 是微软开源的 JavaScript 的超集,它兼容 JS,提供类型系统、泛型、装饰器等新特性,使用 TypeScript 具有如下优点:

- 支持类型检查。因为 JS 是弱类型语言,使用 TypeScript 提供类型约束功能,可以提高代码健壮性和可维护性,但代码开发成本和复杂度也会随之上升。
- 增强了编辑器和 IDE 的功能,包括代码补全、接口提示、跳转到定义、重构等。

**安装 TypeScript**

```shell
npm install typescript -g
# or
yarn global add typescript

# 查看版本,tsc是TypeScript Compile的简写,通过该命令可以将.ts文件编译为.js文件
tsc -v

# 将.ts文件编译为.js文件,编译完成会生成一个index.js
tsc index.ts

# 安装ts-node。执行ts文件首先通过tsc命令将其编译为js文件,然后再执行编译后的js文件,
# 这样步骤比较繁琐,而ts-node可以执行ts文件
yarn global add ts-node

# ts-node 执行ts文件
ts-node ts文件名称
```

## 1 类型系统

类型系统是 TS 的核心功能,TS 在编译阶段会对代码进行类型检查,善用类型系统能大大提高程序的健壮性和可维护性。TS 不仅支持了 JS 所提供的基础类型,也提供了扩展类型,并且还可以通过 Interface(接口)和 Type(类型别名)自定义类型,使用高级类型(联合类型、交叉类型、extends)可以将多个类型进行组合。
::: tip

- ES 基本类型:`String`、`Number`、`Symbol`、`Null`、`Undefined`、`Boolean`、`Bigint`。
- ES 引用类型:`Object`。`Object` 又包含 `Array`、`Function` 等子类型。
- TypeScript 补充类型:`void`、`any`、`never`、`Tuple`(元组即允许多种数据类型的集合,其实 JS 中的数组也可以算作元组)、`Enum`(枚举)、`unknown`。`any` 类型表示任意类型,`any` 是 TS 类型系统中的顶层类型。`unknown` 是 `any`的子类型,表示未知的类型。
  :::

### 1.1 基本类型

```ts
/********* number start *********/
// number类型,number类型可省略,ts将根据值进行类型推断
let num: number = 2;
/********* number end *********/

/********* string start *********/
// string类型
let str = "hello";
/********* string end *********/

/********* symbol start *********/
// Symbol类型
const sm: Symbol = Symbol(1);
/********* symbol end *********/

/********* array start *********/
// 通过number[]声明一组number类型的数组
const arr1: number[] = [1, 2, 3];
// 通过泛型声明一组string类型的数组
const arr: Array<string> = ["Java", "JavaScript", "TypeScript"];
/********* array end *********/

/********* tuple start *********/
// 元组(Tuple)是指一个集合中允许类型不同的集合
let tuple: [string, number]; // 元素1必须是string类型,元素2必须是number类型
tuple = ["hello", 1];
/********* tuple end *********/

/********* enum start *********/
// 枚举(Enum)
enum Color {
  Red,
  White,
  Black,
}
console.log(Color.Red); // 0 通过枚举属性获取值,若属性未初始化值,则会返回属性的下标(从0开始)
console.log(Color[1]); // White 通过下标获取对应数据

// 枚举最常用的场景就是列举一些状态,例如HTTP状态码、订单状态、性别状态等等
enum HttpStatus {
  OK = 200,
  ERROR = 500,
}
console.log(HttpStatus.OK); // 200
console.log(HttpStatus.ERROR); // 500

/********* enum end *********/

/********* void start *********/
// void类型只能赋null和undefined
let unusable: void = null;
/********* void end *********/

/********* object start *********/
// object
const obj = { name: "zxp", age: 20 };
console.log(obj.name); // "zxp"
console.log(obj["name"]); // "zxp"

/**
 * 有时候object的属性是动态变化的,例如通过assign()为obj添加address属性,
 * 此时若通过.号或下标方式访问属性会产生警告,提示obj上并不存在address属性,
 * 此时可以将obj断言为Record<string,any>,string表示对象key类型为string,
 * any表示对象value类型必须为any,所以在TS中一般通过Record来代替对象类型,
 *
 * 断言可以简单的理解为类型强转,但本质上是类型的选择
 */
Object.assign(obj, { addres: "鸡城" });
// obj.address; 编译警告 obj不存在address属性
console.log((obj as Record<string, any>).address);

/********* object end *********/

/********* any start *********/
// any表示任意类型,可以存储任意类型的值
const any1: any = "hehe";
/********* any end *********/
```

### 1.2 类型断言(Type Assert)

**TypeScript 中的类型断言有点类似于其他语言中的强制类型转换,不进行特殊的数据检查和解构,它只在编码阶段生效。虽然 TS 的类型断言类似于类型转换,但实际上是类型的选择**。TypeScript 提供了`as`和**尖括号**两种断言语法,TypeScript 支持函数断言、const 断言、import 断言三种断言方式。

```ts
let str: any = "haha";
// 类型断言 as 语法,将any类型断言为string;
let strLen = (str as string).length;

let arr: any = [1, 2, 3];
// 类型断言 尖括号语法,将any类型断言为number类型的数组
let arrLen = (<Array<number>>arr).length; // 也可以写成 let arrLen = (<number[]>arr).length
```

#### 1.2.1 函数断言

JavaScript 中的断言通常用于防止传入不正确的类型传入到函数中,但在 TS 中对于无类型的参数可能检查永远无法正确编码,针对类型宽松的参数,通常会迫使用户使用类型断言。TypeScript 的最终目标是以最少破坏性的方式引入现有的 JavaScript 结构,TypeScript 在 3.7 版本 引入了一个称为“断言签名”的新概念,它为这些断言函数建模。

```ts
// 函数断言:asserts condition表示断言condition为非空,如果condition为非空时将抛出AssertionError
function assert(condition: any, msg?: string): asserts condition {
  if (!condition) {
    throw new AssertionError(msg);
  }
}
/*
 * 函数断言:断言参数的类型,asserts val is string表示断言val是string类型,
 * 如果val的类型不是string类型,则抛出AssertionError
 */
function assertIsString(val: any): asserts val is string {
  if (typeof val !== "string") {
    throw new AssertionError("Not a string!");
  }
}
/*
 * 函数断言:断言参数的类型, asserts val is NonNullable<T>表示断言val为NonNullable<T>类型,
 * 当val为空(为null或undefined)则抛出AssertionError
 */
function assertIsDefined<T>(val: T): asserts val is NonNullable<T> {
  if (val === undefined || val === null) {
    throw new AssertionError(
      `Expected 'val' to be defined, but received ${val}`
    );
  }
}
```

#### 1.2.2 const 断言

TypeScript 3.4 为文字值引入了一种称为 const 断言的新构造,当使用 const 断言构造新的文字表达式时:

- const 断言表达式中任何类型都不能扩展。
- const 断言数组类型时会使数组变为只读。
- const 断言对象类型时会使对象变为只读。

```ts
// const断言as语法,断言后类型: Type '"hello"'
let str = "hello" as const;
str = "123";

// const断言尖括号语法,断言后类型: Type 'readonly [10, 20]'
let arr = <const>[10, 20];

// 断言后类型: Type '{ readonly text: "hello" }'
let obj = { text: "hello" } as const;

// 断言后类型: Type '{ readonly text: "hello" }'
let textObj = <const>{ text: "hello" };
```

#### 1.2.3 导入断言

TypeScript 4.5 支持导入断言的 ECMAScript 提案,这是运行时用来确保导入具有预期格式的语法。TypeScript 不会检查这些断言的内容。

```ts
// 导入断言:断言导入后obj对象的为 {type: "fluffy bunny"}
import obj from "./something.json" assert { type: "fluffy bunny" };

// 导入断言:动态import()调用还可以通过第二个参数使用导入断言。
const obj = await import("./something.json", {
  assert: { type: "json" },
});
```

### 1.3 any 与 unknown

any 表示任意类型,当类型不明确时可以使用 any 类型,但在系统开发中为了省事恨不得所有地方都使用 any 类型(俗称 any 类型系统),如果全部使用 any 类型表示,那么 TS 的类型系统将毫无用处,这也就脱离了以类型约束提供代码可维护性健壮性的主旨。

`unknown` 类型是 `any` 类型的安全版本,`any` 和 `unknown` 属于 TS 类型系统中的顶层类型。但 `unknown` 类型相较于 `any` 类型约束有很多, 例如类型断言、相等比较、类型防护、断言函数。

- 类型断言有点类似于其他语言中的类型强制装换,但更像是类型的选择,断言成一个联合类型中不存在的类型是不允许的。
- 相等比较:
- 类型防护:是指当使用泛化类型(例如 any 或 unknown 等等)通过做类型判断时明确泛化类型,例如通过 typeof 或 instanceof 判断 any 类型的值为 string 类型处理某些逻辑。
- 断言函数:断言函数是类型断言中的一种,断言函数可以针对于参数进行类型断言。

```ts
// 类型断言
function f1(value: unknown) {
  // @ts-ignore: Object is of type 'unknown'.
  value.toFixed(2);
  // 类型断言,将unknown类型断言为number类型
  (value as number).toFixed(2); // OK
}

// 相等比较
function func(value: unknown) {
  // @ts-ignore: Object is of type 'unknown'.
  value * 5;

  if (value === 123) {
    // equality
    // %inferred-type: 123
    value;
    value * 5; // OK
  }
}

// 类型防护
function func(value: unknown) {
  // @ts-ignore: Object is of type 'unknown'.
  value.length;

  if (typeof value === "string") {
    // type guard
    // %inferred-type: string
    value;

    value.length; // OK
  }
}

// 函数断言
function func(value: unknown) {
  // @ts-ignore: Object is of type 'unknown'.
  value.test("abc");

  assertionFunction(value);

  // %inferred-type: RegExp
  value;

  value.test("abc"); // OK
}
// 函数断言,通过is关键字断言arg参数是RegExp的实例,如果不是则抛出TypeError
function assertionFunction(arg: unknown): asserts arg is RegExp {
  if (!(arg instanceof RegExp)) {
    throw new TypeError("Not a RegExp: " + arg);
  }
}
```

### 1.4 函数声明

良好的函数声明应该具有函数返回类型声明(无返回可省略,或类型设置为 void)、函数参数类型声明、函数参数默认值,为了扩展性还可以在函数中使用泛型,以约束函数返回值、函数参数类型。

```ts
/**
 *  声明1(不推荐):Function是TS内置的函数类型,它仅约束值是一个函数,它不会约束函数的返回值类型、
 *  函数参数类型,只有在非常宽松的情况下才会使用Function。否则应该尽量明确函数的参数类型、返回值类型。
 */
const f1: Function = () => {}; // ok
// 有参数、有参数类型、无参数默认值、无剩余参数、无返回值、无返回值类型
const f2: Function = (name: string) => {};
// 有参数、有参数类型、有参数默认值、无剩余参数、无返回值、无返回值类型
const f3: Function = (name: string = "大黄") => {};
// 有参数、有参数类型、无参数默认值、有剩余参数(rest为剩余参数,类型为any类型的数组)、无返回值类型
const f4: Function = (name: string, ...rest: any[]) => {};
// 有参数(y参数可选)、有参数类型、无参数默认值、无剩余参数、有返回值、无返回值类型。!号表示非空运算符,只有非空时才会读取该值
const f5: Function = (x: number, y?: number) => x * y!;
// 有参数、有参数类型、无参数默认值、无剩余参数、有返回值、有返回值类型
const f6: Function = (x: number, y: number) => x * y;

/**
 * 声明方式2(推荐):自定义函数类型,可以明确定义参数个数、参数类型、返回值类型。
 */
// 允许函数无参数、无返回值。
function f1(): void {}
// 约束函数传入一个参数,且参数类型为string,无返回值。
function f2(name: string) {}
// 约束函数参数可选,调用函数时传入类型必须为string,无返回值
function f3(name?: string) {}
// 约束函数必须传入一个参数,且参数类型为string,并返回一个string类型的返回值
function f4(name: string): string {
  return `hello${name}`;
}
```

## 2.Interface(接口)和 Type(类型别名)

TS 提供了接口(Interface)和类型别名(Type)声明自定义类型,但类型别名更适合描述类型关系(可以声明基本类型别名、联合类型、元组等类型),接口适合描述数据结构(对象等结构)。

### 2.1 Interface

```ts
interface Animal {
  // 使用readonly修饰只读属性,该属性不可修改,否则将报错
  readonly no: string;
  // 属性是必须的
  name: string;
  // 可选属性,?号表示属性是可选的,-?表示移除?号,+?表示添加+?
  age?: number;
  /**
   * 属性为交叉类型,|号可以连接多个类型,允许属性是多个类型中的其中之一,
   * 即status属性值既可以是number类型,又可以是string类型。
   */
  status: number | string;
  like?: null | undefined | string;
  /**
   * 属性为联合类型,&号可以将多个类型合并成一个类型,即info属性值必须包含address和aprice两个属性
   */
  info?: { address: string } & { price: number };

  /**
   * 索引属性(也叫任意属性)。索引属性可以解决一下两个问题
   * (1).在ts中由于object类型是无法通过下标的方式访问属性,而索引属性支持通过下标的方式访问
   * 属性,注意:使用多个索引签名时,多个索引签名的返回类型应该相互兼容。
   * (2).接口类型需要扩展,当接口除了已定义的属性还想扩展其他属性,接口会提示错误,
   * 而索引属性支持扩展其他属性。
   */
  [propName: string]: any;
}

const animal: Animal = {
  no: "No1",
  name: "小黑",
  status: "良好",
  info: { address: "中国", price: 1000.0 },
  // 由于Animal接口支持索引属性,所以支持扩展属性
  sex: "男",
};
// animal.no = 'No2'; // 无法分配到 "no" ，因为它是只读属性

// 访问animal.info.address时由于info是可选的(有可能为空),若想正常访问info下的属性,可以通过可选链(?.)或非空(!)

// ?. 是ts3.7提供的新特性——可选链。?.表示当info不为空(不是null和undefined)时,才会访问address属性
console.log(animal.info?.address);

/*
 * !表示非空操作符,当info不为空时才访问address,animal.info!.address等同于如下代码:
   if(animal.info){
     animal.info.address
   }
 */
console.log(animal.info!.address);
```

### 2.2 Type(类型别名)

```ts
type Str = string;
let str: Str = "hehe";

/*
 * 声明Person类型别名,其类型是一个联合类型(使用|号将多个类型连接起来),其对应值是一个对象,
 * 既可以包含string类型name属性,又可以包含一个number类型的age属性
 */
type Person = { name: string } | { age: number };
let p1: Person = { name: "z乘风" };
let p2: Person = { age: 18 };

/*
 * 声明Man类型别名,其类型是一个交叉类型(使用&号将多个类型连接起来),其对应值是一个对象,
 * 该对象必须包含string类型的name属性和number类型的age属性
 */
type Man = { name: string } & { age: number };
let man: Man = { name: "z乘风", age: 18 };
```

### 2.3 Interface 与 Type 的区别

Interface(接口)和 Type(类型别名)都可以自定义类型,且都可被扩展,接口和类型别名可以相互扩展,接口既可以扩展类型别名,类型别名也可以扩展接口。接口通过继承(extends)方式扩展,类型别名通过交叉类型(&)扩展。Interface 与 Type 的区别如下:

- **不同的声明范围**。在类型别名声明中右边可以是任意类型,包括基本类型、元祖、类型表达式(&或|等),而在接口声明中,右边必须为变量结构。
- **不同的扩展方式**。接口通过继承(extends)扩展,类型别名通过交叉类型(&)扩展,接口可以被派生类实现(implements),而类型别名无法被实现。
- **不同的重复定义表现形式**。接口可以定义多次,多次声明会进行合并,而类型声明只能定义一次,否则将会报错误。

```ts
interface Animal {
  name: string;
}
interface Animal {
  age: number;
}
// 相同接口定义多个将会被合并
const dog: Animal = {
  name: "小黄",
  age: 18,
};

// 相同类型别名定义多个将会报错
type Botany = { name: string };
// type Botany = { age: number }; // 标识符“Botany”重复
```

## 3.泛型

泛型即泛型化参数,其主要目的是加强类型安全及减少类转换的次数。TS 也支持泛型特性(也叫类型参数),泛型可以对类型参数做一些列运算后返回新的类型。例如一个函数接收一个参数并返回传入的参数:

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

// 假如要在函数中访问参数的length,但Type类型不存在length属性
function identity<Type>(arg: Type): Type {
  console.log("len:", arg.length); // error:Type类型上不存在length属性
  return arg;
}

// 改进1:将参数类型设置为Type[]即可访问length属性
function identity<Type>(arg: Type[]): Type {
  console.log("len:", arg.length);
  return arg;
}

interface Lengthwise {
  length: number;
}
/*
 * 改进2:通过extends关键字继承具有length属性的类型,由于Lengthwise类型包含length属性,
 * Type继承自Lengthwise,所以Type必须有length属性
 */
function identity<Type extends Lengthwise>(arg: Type): Type {
  console.log("len:", arg.length);
  return arg;
}

// 泛型函数字面量声明
let myIdentity: <Type>(arg: Type) => Type = identity;
function identity<Type>(arg: Type): Type {
  return arg;
}

// 将泛型类型写为对象字面量类型
let myIdentity: { <Type>(arg: Type): Type } = identity;
function identity<Type>(arg: Type): Type {
  return arg;
}
```

### 3.1 keyof 类型运算符

`keyof`类型操作符可以将一个类型的所有属性转为一个新的联合类型。

```ts
type Obj = {
  name: string;
  age: number;
};
// ObjeKey的类型为: "name" | "age"
type ObjKey = keyof Obj;
const key1: ObjKey = "name";
const key2: ObjKey = "age";

// T的类型为:string | number | symbol
type T = keyof any;
```

### 3.2 typeof 类型运算符

由于 JS 中也提供了 typeof 操作符,所以 TS 中`typeof`操作符不仅能获取表达式的类型,也可以用于引用变量或属性的类型,typeof 操作符仅在标识符(即变量名)或其属性上使用是合法的。

```ts
// 当在非类型声明处使用typeof操作符时,会返回表达式的类型
console.log(typeof "hello"); // "string"

let s = "hello";
/**
 * 当在类型声明处时使用typeof操作符时,typeof操作符可以引用变量或属性的类型,
 * s变量经过类型推导是string类型,typeof s 使用在str的类型声明中,
 * 表示str变量引用s变量的类型,str的类型也是string
 */
let str: typeof s = "hello!";

function f() {
  return { x: 10, y: 3 };
}
// typeof引用函数的返回值作为类型,P的类型为 {x:number,y:number}
type P = ReturnType<typeof f>;

const user = { name: "zchengfeng", age: 0 };
// User的类型为:{name: string, age: number}
type User = typeof user;
```

### 3.3 索引访问类型

**索引类型是通过索引下标访问或查找另一种类型的特定属性**。

```ts
type Person = { name: "lulu"; age: 10; address: "风雪里" };
// 通过索引访问Person类型中name属性对应值的类型,Name的类型为string,访问不存在的属性将会报错
type Name = Person["name"];
// Age的类型为number
type Age = Person["age"];
// 索引类型搭配交叉类型,T1的类型为: number | string
type T1 = Person["age" | "name"];
// 索引类型搭配keyof操作符,T2的类型为: string | number | string
type T2 = Person[keyof Person];

const MyArray = [
  { name: "Alice", age: 15 },
  { name: "Bob", age: 23 },
  { name: "Eve", age: 38 },
  { name: "You", age: 11, address: "埃克斯" },
];
/**
 * 在数组使用索引类型时可以通过number获取数组元素的类型,然后结合
 * typeof捕获数组元素的类型。
 *
 * MyPerson的类型为: 
    {
      name:string;
      age:number;
      address?:undefined;
    } | {
      name: string;
      age: number;
      address: string;
    }
  由于MyArray中元素属性不同,当使用number获取数组类型时,首先获取数组元素中属性最多的类型,
  然后将其他元素不足的属性进行补齐,类型为undefined,最后将其组合成一个交叉类型。
 */
type MyPerson = (typeof MyArray)[number];
// MyAge的类型为number
type MyAge = (typeof MyArray)[number]["age"];
// MyName的类型为string
type MyName = (typeof MyArray)[number]["name"];
// MyAddress的类型为string | undefined
type MyAddress = (typeof MyArray)[number]["address"];

// 注意:在索引类型不能使用变量引用,但可以使用类型别名
const nameKey = "name";
// type NameKey=MyPerson[nameKey]  // 报错,“nameKey”表示值，但在此处用作类型
type AgeKey = "age";
type NewAge = MyPerson[AgeKey]; // NewAge的类型为number
```

### 3.4 条件类型与 infer 关键字

TS 的中的条件类型类似于 JS 的中三目运算符,形式为`condition ? trueExpression : falseExpression`,当条件表达式为 true 时就会使用`trueExpression`作为类型,否则将使用`falseExpression`作为类型。条件类型中最常见的就是继承关系(也叫是否可赋值)的判断。

#### 3.4.1 条件类型

```ts
/*
 * 判断any类型是否继承自any类型,或者说any类型是否可赋值为any类型,如果可赋值则返回string类型,
 * 否则返回number类型,T1的类型为string。
 */
type T1 = any extends any ? string : number;
// 判断any类型是否可赋值给string类型,若可赋值则返回string,否则返回number
type T2 = any extends string ? string : number;

/**
 * 泛型、索引类型、条件类型的结合,传入一个泛型类型,如果该类型包含一个属性名叫message且类型为string的属性,
 * 则通过索引类型从泛型中获取message属性值的类型,否则返回一个never类型,never表示不是任何类型。
 */
type MessageOf<T> = T extends { message: string } ? T["message"] : never;
type Email = { message: string };
type EmailMessage = MessageOf<Email>; // EmailMessage的类型为string
type NeverMessage = Message<{ age: number }>; // NeverMessage的类型为never

/**
 * 判断泛型T是否可赋值给一个any类型的数组,若可赋值则通过索引类型和number获取该类型中元素的类型,
 * 否则返回泛型T。
 */
type Flatten<T> = T extends any[] ? T[number] : T;
type StrArr = Flatten<string[]>; // StrArr的类型为string
type NumArr = Flatten<number[]>; // NumArr的类型为number
type Num = Flatten<number>; // Num的类型为number,因为number不可赋值给any数组
```

#### 3.4.2 infer 关键字推断类型

`infer`关键字可以推断`extends`条件语句的类型并存储一个新的类型变量上,避免在 true 和 false 的分支中检索元素类型。

```ts
/**
 * infer Item表示会对Type类型进行推断,并将推断后的类型存储到Item这个新类型变量上,
 * 在true和false分支上可以直接使用Item
 */
type Flatten<Type> = Type extends Array<infer Item> ? Item : Type;

/**
 * infer Return表示会对函数的返回值类型进行推断,并将推断后的类型存储到Return这个新类型变量上
 */
type GetReturnType<Type> = Type extends (...args: never[]) => infer Return
  ? Return
  : never;
type Num = GetReturnType<() => number>; // Num的类型为number
type Str = GetReturnType<(x: string) => string>; // Str的类型为string
type Bools = GetReturnType<(a: boolean, b: boolean) => boolean[]>; // Bools类型为boolean[]
```

### 3.5 映射类型

TypeScript 中的映射类型是一种强大的类型工具,它支持创建新类型,通过在已有类型的每个属性上应用一些变换来生成新类型。这些映射变换可以包括将属性标记为可选、只读或从现有属性生成新属性等操作。

#### 3.5.1 可选属性映射

```ts
type Person = {
  name: string;
  age: number;
};
type MyPartial<T> = {
  [P in keyof T]?: T[P];
};
/**
 * PartialPersons的类型为  {name?: string | undefined;age?: number | undefined;}
 * 通过可选属性映射后,Person的name和age由必须变为可选
 */
type PartialPersons = MyPartial<Person>;
```

在上述示例中,定义了一个 `MyPartial<T>` 映射类型，它将一个类型 T 的所有属性变为可选属性。然后,使用它来创建了 PartialPerson 类型,该类型将 Person 类型的所有属性变为可选属性。

#### 3.5.2 只读属性映射

```ts
type Person = {
  name: string;
  age: number;
};
type MyReadonly<T> = {
  readonly [P in keyof T]: T[P];
};
/**
 * ReadonlyPerson的类型为: {readonly name: string;readonly age: number;}
 * 通过只读属性映射后,Person的name和age属性是只读的
 */
type ReadonlyPerson = MyReadonly<Person>;
```

在上述示例中,定义了一个 `MyReadonly<T>` 映射类型,它将一个类型 T 的所有属性变为只读属性。然后,使用它来创建了 ReadonlyPerson 类型,该类型将 Person 类型的所有属性变为只读属性。

#### 3.5.3 删除属性映射

```ts
type MyOmit<T, K extends keyof T> = {
  [P in Exclude<keyof T, K>]: T[P];
};
/**
 *  OmitAge的类型为:{name: string;},通过MyOmit类型删除属性映射后,age属性被删除,只剩下name属性
 */
type OmitAge = MyOmit<Person, "age">;
```

在上述示例中,定义了一个 `MyOmit<T, K>` 映射类型,它将一个类型 T 的某个属性 K 删除。然后,使用它来创建了 OmitAge 类型,该类型删除了 Person 类型的 age 属性。

#### 3.5.4 as 语句

在 TypeScript 的映射类型中,as 语句用于在映射的过程中为属性进行类型转换或显式标注类型。这允许在映射类型期间对属性的类型进行更灵活的操作。

```ts
type NewKeyType = string;
type MappedTypeWithNewProperties<Type> = {
  [Properties in keyof Type as NewKeyType]: Type[Properties];
};
// Demo的类型为 { [x: string]: string | number;}。as语句将属性的类型标注为 string类型
type Demo = MappedTypeWithNewProperties<Person>;

// ==================================================
type Getters<Type> = {
  [Property in keyof Type as `get${Capitalize<
    string & Property
  >}`]: () => Type[Property];
};
/**
 * LazyPerson的类型为:{getName: () => string;getAge: () => number;}
 */
type LazyPerson = Getters<Person>;
```

### 3.6 模板文字类型

TypeScript 的模板文字类型（Template Literal Types）是一种引入于 TypeScript 4.1 版本的高级类型特性。它允许在类型级别上执行字符串模板的操作,以创建更加灵活和复杂的类型。模板文字类型使用反引号来定义模板,并使用 `${}` 插值表达式来引入变量。

```ts
//==================================== 简单的模板文字类型
// Greeting的类型为 "Hello, world!"
type Greeting = "Hello, world!";

//==================================== 使用 ${} 插值表达式
type Person = "Alice" | "Bob";
// Greeting的类型为 "Hello, Alice!" | "Hello, Bob!"
type Greeting = `Hello, ${Person}!`;
```

## 4 TypeScript 中特殊的字符

- **`&`** : `&`是交叉类型的连接符,用于将多个类型叠加为一个新的类型。

```ts
type Name = { name: string };
type Age = { age: number };
// 交叉类型,类型进行合并组成一个新的类型,User的类型为:{name:string,age:number}
type User = Name & Age;
const user: User = {
  name: "xxx",
  age: 1,
};
```

- **`|`** : `|`是联合类型的连接符,连接后的类型可以是连接的子类型其中之一。

```ts
// 联合类型,Sex既可以是'man',又可以是'woman'
type Sex = "man" | "woman";
const sex1: Sex = "man";
const sex2: Sex = "woman";
```

- **`keyof`**:keyof 操作符用于获取对象类型的所有 key(属性名称)类型,并返回该对象类型的 key 的联合类型。

```ts
interface User {
  name: string;
  age: number;
}
// NewUser的类型为:"name" | "age"
type NewUser = keyof User;
const u1: NewUser = "name";
const u2: NewUser = "age";
```

- **`typeof`**:在 TypeScript 中,typeof 操作符不同于 JavaScript 中的 typeof。TypeScript 的 typeof 操作符用于获取变量或表达式的类型信息,而不是变量的值。

```ts
/* 在非类型声明处使用typeof则会返回表达式的类型 */
console.log(typeof "zchengfeng"); // "string"
console.log(typeof function()=>{}); // "function"

/* 在类型声明处使用typeof则会引用变量的类型 */
const data = {
  name: 'zchengfeng',
  age: 10,
};
// typeof data会引用data的类型,Data的类型为:{name:string,age:number}
type Data = typeof data;
const newData: Data = {
  name: 'xxx',
  age: 18,
};


function add(x: number, y: number) {
  return { x, y, sum: x + y };
}
// typeof add会引用add函数类型,Fn的类型为:(x: number, y: number) => {x:number,y:number;sum:number}
type Fn = typeof add;
const obj: Fn = (x1: number, y1: number) => {
  return {
    x: x1,
    y: y1,
    sum: x1 + y1,
  };
};
```

- **`infer`**:infer 是 TypeScript 中的一个关键字,通常用于从已知类型中提取和推断出其他类型。它通常与条件类型(conditional types)一起使用,用于在类型级别执行一些复杂的类型操作。

```ts
/**
 * ReturnTypes接收一个泛型,泛型应是一个函数,接收任意类型,任意参数个数,
 * 最后使用 infer 推断函数的返回值类型,如果传入的泛型不满足条件,
 * ReturnTypes的结果是never
 */
type ReturnTypes<T> = T extends (...args: any[]) => infer R ? R : never;
function getLength(str: string): number {
  return str.length;
}
type LengthType = ReturnTypes<() => unknown>; // LengthType 的类型是 number
```

- **`?`**:`?`号表示可选修饰符。常用于可选参数,出了`?`可选符之外,还有`+?`和`-?`,`+?`表示添加可选符,`-?`删除可选符。

```ts
// ?的例子,Partial是TS内置类型,用于约束类型的所有属性都是可选的
type Partial<T> = {
  // ?是+?的简写,+号可省略
  [P in keyof T]?: T[P];
};

// ?+的例子
type Partial<T> = {
  [P in keyof T]+?: T[P];
};

// -?的例子,Required是TS内置类型,用于约束类型的所有属性都是必须的
type Required<T> = {
  [P in keyof T]-?: T[P];
};
```

- **`readonly`**:`readonly`表示只读修饰符,一旦使用`readonly`修饰后,则不可修改。

```ts
interface User {
  // name为只读属性
  readonly name: string;
  age: number;
}
const user: User = {
  name: "zchengfeng",
  age: 18,
};
user.name = "xxx"; // error,无法分配到 "name",因为它是只读属性。
user.age = 100; // ok
```

- **`!`**:`!`表示非空断言操作符。`!`用于在不进行任何显式检查的情况下从类型中删除 null 和 undefined,`!`用在可能为 null 或 undefined 的表达式后面。

```ts
function liveDangerously(x?: number | null) {
  // 只有当x不为null和undefined时,才会调用toFixed()
  console.log(x!.toFixed());
}
```

- **`??`**:表示空合并操作符,空合并操作是 TypeScript 3.7 版本提供用于替代 `||`操作符的方案。

```ts
/*
 * ?? 空合并操作符是TS3.7版本提供的新特性,是代替 || 操作符的一种方案。对比 || 操作符 ?? 避免了
 * 0、""、NaN、false的特殊情况。
 */
let x = foo ?? bar(); // 当foo不为空(undefined和null)时,才会执行bar()
// 等同于:let x = foo !== undefined && foo !== null ? foo : bar();
```

- **`?.`**:可选链(Optional Chaining)是 TypeScript 在 3.7 引入的一项语言特性,用于简化访问对象属性或调用对象方法的过程,特别是在对象可能为 null 或 undefined 时。可选链操作符 `?.` 支持安全地访问嵌套对象的属性或方法,而不必手动检查每个嵌套层次是否存在。
