## 1.创建数组的四种方式

### 1.1 字面量创建数组

```js
const arr = ["Java", "JavaScript", "Golang"];
```

### 1.2 通过 Array 实例化数组

```js
const arr = Array("Java", "JavaScript", "Golang");
```

### 1.3 创建数组并赋值

```js
const arr = new Array();
arr[0] = "Java";
arr[1] = "JavaScript";
arr[2] = "Golang";
```

### 1.4 通过 Array.of()创建数组

```js
const arr = Array.of("Java", "JavaScript", "Golang");
```

### 1.5 通过 Array.from()指定 length 属性生成数字序列

```js
/**
 * Array.from()可以指定length属性生成数字序列,生成后的数组元素都使用undefined初始化
 */
const arr = Array.from({ length: 3 });
console.log(arr); // [undefined,undefined,undefined]

// 通过Array.from()生成0到10(不含10)之间的数组
Array.from({ length: 10 }, (_, index) => index);
```

## 2.数组 Api

```js
/**
 * [
        at: ƒ at()
        concat: ƒ concat()
        constructor: ƒ Array()
        copyWithin: ƒ copyWithin()
        entries: ƒ entries()
        every: ƒ every()
        fill: ƒ fill()
        filter: ƒ filter()
        find: ƒ find()
        findIndex: ƒ findIndex()
        flat: ƒ flat()
        flatMap: ƒ flatMap()
        forEach: ƒ forEach()
        includes: ƒ includes()
        indexOf: ƒ indexOf()
        join: ƒ join()
        keys: ƒ keys()
        lastIndexOf: ƒ lastIndexOf()
        length: 0
        map: ƒ map()
        pop: ƒ pop()
        push: ƒ push()
        reduce: ƒ reduce()
        reduceRight: ƒ reduceRight()
        reverse: ƒ reverse()
        shift: ƒ shift()
        slice: ƒ slice()
        some: ƒ some()
        sort: ƒ sort()
        splice: ƒ splice()
        toLocaleString: ƒ toLocaleString()
        toString: ƒ toString()
        unshift: ƒ unshift()
        values: ƒ values()
        Symbol(Symbol.iterator): ƒ values()
        Symbol(Symbol.unscopables): {copyWithin: true, entries: true, fill: true, find: true, findIndex: true, …}
        [[Prototype]]: Object
    ]
 
 */
console.log(Array.prototype);
```

### 2.1 Array.prototype.at()

at(index):该方法接受一个整数值并返回该索引处的项目,允许正整数和负整数,负整数从数组中的最后一项开始计数,index 默认值为 0。

```js
const arr = ["Java", "JavaScript", "Golang", "TypeScript", "Shell"];
console.log(arr.at()); // Java
console.log(arr.at(0)); // Java
console.log(arr.at(2)); // Golang
console.log(arr.at(-2)); // TypeScript
```

### 2.2 Array.prototype.concat()

concat(arr...):连接一个或多个数组,返回连接后的数组,不会改变原数组。

```js
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const arr3 = [7, 8, 9];
console.log(arr1.concat(arr2, arr3), arr1); // [1,2,3,4,5,6,7,8,9] [1,2,3]

console.log(["Java", "JavaScript"].concat(["Golang"], ["TypeScript"])); // ['Java','JavaScript','Golang','TypeScript']
```

### 2.3 Array.prototype.copyWithin()

copyWithin(target,start,end):将数组的一部分浅复制到同一数组中的另一个位置,并在不修改其长度的情况下返回它,此方法会改变原数组。

- target:将序列复制到的从零开始的索引。如果为负数,target 将从最后开始计数。如果 target 等于或大于 arr.length,则不会复制任何内容。如果 target 位于之后 start,复制的序列将被修剪以适应 arr.length。
- start(可选):从零开始复制元素的索引。如果为负数,start 将从最后开始计数。如果 start 省略,copyWithin 将从下标 0 复制。
- end(可选):从零开始的索引,从中结束复制元素。copyWithin 复制最大长度为数组.length,如果为负数,end 将从最后开始计数。如果 end 省略,copyWithin 将复制到最后一个索引(默认为 arr.length)。

```js
const arr = ["a", "b", "c", "d", "e"];
// 复制arr从下标2到下标4的元素到数组的下标0
console.log(arr.copyWithin(0, 2, 4), arr); // ['c', 'd', 'c', 'd', 'e'] ['c', 'd', 'c', 'd', 'e']

console.log(["a", "b", "c", "d", "e"].copyWithin(2, 2, 4)); // ['a', 'c', 'd', 'd', 'e']
```

### 2.4 Array.prototype.entries()

entries():返回一个新的 Array Iterator 对象,该对象包含数组中每个索引的键/值对。

```js
const arr = ["Java", "JavaScript", "Golang"];
const iterator = arr.entries();
console.log(iterator.next().value); // [0,'Java']
console.log(iterator.next().value); // [1,'JavaScript']

/*
 * 通过 for of 遍历Iterator(可迭代)对象,for of是ES6提供的新特性,
 * 用于替代for in 和 forEach(),for of 允许遍历Array、String、Maps、
 * Sets等迭代数据结构。
 */
for (const [key, item] of arr.entries()) {
  /*
   * 0 'Java'
   * 1 'JavaScript'
   * 2 2 'Golang'
   */
  console.log(key, item);
}
```

### 2.5 Array.prototype.every()

every(callback(element,index,arr),thisArg):测试数组内所有元素是否都能通过 callback 函数的测试,若全部通过则返回 true,否则返回 false。

- callback:用来测试每个元素的函数,它接收 element(当前元素)、index(当前元素的下标)、array(调用 every 的当前数组)。
- thisArg:执行 callback 时使用的 this 值。

```js
const arr1 = [12, 5, 8, 130, 44];
const arr2 = [12, 54, 19, 23, 322];
const arr3 = [1, -1, 2, 123, 75];
console.log(arr1.every((item) => item > 10)); // false
console.log(arr2.every((item) => item > 10)); // true
console.log(arr3.every((item) => Boolean(item))); // false
```

### 2.6 Array.prototype.fill()

fill(value,start,end):用一个固定值填充一个数组从起始索引到终止索引的全部元素(不含终止索引)。value 为填充数组元素的值,start(可选,默认为 0)填充的起始索引,end(可选,默认为 arr.length)填充的终止索引,此方法会改变原数组。

```js
console.log([1, 2, 3].fill(4)); // [4,4,4]
// 下标1到arr.length使用4填充
console.log([1, 2, 3].fill(1, 4)); // [1,4,4]
console.log([1, 2, 3].fill(4, -3, -2)); // [4,2,3]
console.log([1, 2, 3].fill(4, NaN, NaN)); // [1,2,3]
```

### 2.7 Array.prototype.filter()

filter(callback(element,index,array),thisArg):创建一个新数组,其数组包含通过 callback 函数实现的测试的所有元素。

- callback:用来测试每个元素的函数,返回 true 表示该元素通过测试,保留该元素,返回 false 时则不保留,它接收 element(当前元素)、index(当前元素的下标)、array(调用 every 的当前数组)。
- thisArg:执行 callback 时使用的 this 值。

```js
const arr1 = [12, 4, 90, 11, 123];
console.log(arr.filter((item) => item > 10)); // [12,90,11,123]

const fruits = ["apple", "banana", "grapes", "mango", "orange"];
const filterItems = (query) => {
  // toLowerCase()用于将字符串转为英文小写
  return fruits.filter(
    (item) => item.toLowerCase().indexOf(query.toLowerCase()) > -1
  );
};
console.log(filterItems("ap")); // ['apple','grapes'];
console.log(filterItems("an")); // ['banana','mango','orange']

// 过滤数组中隐式类型转换为false的元素
constle.log([0, 1, false, 2, "", 3].filter(Boolean)); // [1,2,3]
```

### 2.8 Array.prototype.find()

find(callback(element,index,array),thisArg):返回数组中满足 callback 函数条件的第一个元素的值,否则返回 undefined。

- callback:在数组每一项执行的函数,它接收 element(当前元素)、index(当前元素的下标)、array(调用 every 的当前数组)。
- thisArg:执行 callback 时使用的 this 值。

```js
const arr = [
  { name: "张三", age: 19 },
  { name: "李四", age: 4 },
  { name: "王五", age: 60 },
  { name: "李老六", age: 35 },
];
console.log(arr.find((item) => item.age > 18)); // {name: '张三', age: 19}

console.log(arr.find((item) => item.age > 66)); // undefined
```

### 2.9 Array.prototype.findIndex()

find(callback(element,index,array),thisArg):返回数组中满足 callback 函数条件的第一个元素的下标,否则返回 -1。

- callback:在数组每一项执行的函数,它接收 element(当前元素)、index(当前元素的下标)、array(调用 every 的当前数组)。
- thisArg:执行 callback 时使用的 this 值。

```js
const arr = [
  { name: "张三", age: 19 },
  { name: "李四", age: 4 },
  { name: "王五", age: 60 },
  { name: "李老六", age: 35 },
];
console.log(arr.findIndex((item) => item.age > 18)); // 0

console.log(arr.findIndex((item) => item.age > 66)); // -1
```

### 2.10 Array.prototype.flat

flat(depth):方法会按照一个可指定的深度递归遍历数组,并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。
简单来说将一个多维数组根据指定深度(depth)将数组拍平,depth 为拍平的深度,默认值为 1,当 depth 为 Infinity 时,
表示可展开任意深度的嵌套数组,无论数组嵌套多深,最后都会被拍平为一维数组。注意:flat()会移除数组中的空元素。

```js
const arr1 = [1, , 2, [3, 4]];
// flat() 会移除数组中的空项
console.log(arr1.flat()); // [1,2,3,4]

const arr2 = [1, 2, [3, 4, [5, 6]]];
console.log(arr2.flat()); // [1,2,3,4,[5,6]]

const arr3 = [1, 2, [3, 4, [5, 6]]];
console.log(arr2.flat(2)); // [1,2,3,4,5,6]

const arr4 = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]];
// 使用 Infinity 展开任意深度的嵌套数组,将多维数组拍平为一维数组
console.log(arr4.flat(Infinity)); // [1,2,3,4,5,6,7,8,9,10]
```

除了 flat()可以实现数组的扁平化之外,也可以通过其他方式来替代 flat():

```js
// 方式1:通过reduce + concat + isArray + 递归实现flat()
const arr1 = [1, 2, 3, [1, 2, 3, 4, [2, 3, 4]]];
Array.prototype.flatDeep = function (depth = 1) {
  /*
   * 如果depth不大于0那么会通过slice()直接返回源数组的一份浅拷贝,如果大于0将使用reduce()对数组做规约,
   * 通过concat()将元素连接,如果元素是数组时那么会递归调用flatDeep(),由于使用reduce()进行规约,
   * 所以depth需要* * -1,如果元素不是数组那么直接连接。
   */
  return depth > 0
    ? this.reduce(
        (acc, val) =>
          acc.concat(Array.isArray(val) ? val.flatDeep(depth - 1) : val),
        []
      )
    : this.slice();
};
console.log(arr1.flatDeep()); // [1, 2, 3, 1, 2, 3, 4, [2,3,4]]
console.log(arr1.flatDeep(Infinity)); // [1, 2, 3, 1, 2, 3, 4, 2, 3, 4]
```

## 3.数组添加元素的 6 种方式

### 3.1 push()尾部添加元素

```js
const arr = [1];
arr.push(2, 3);
console.log(arr); // [1,2,3]
```

### 3.2 unshift()头部添加元素

```js
const arr = [3];
arr.unshift(1, 2);
console.log(arr); // [1,2,3]
```

### 3.3 concat()连接数组

```js
const arr = [1];
const newArr = arr.concat([2, 3]);
console.log(newArr); // [1,2,3]
```

### 3.4 splice()指定位置添加/删除元素

```js
const arr = [1];
arr.splice(arr.length, 0, 2, 3);
console.log(arr); // [1,2,3]
```

### 3.5 splice()指定位置添加/删除元素

```js
const arr = [1];
const newArr = [...arr, 2, 3];
console.log(newArr); // [1,2,3]
```

### 3.6 Array.length

```js
const arr = [1];
arr[arr.length] = 2;
arr[arr.length] = 3;
console.log(arr); // [1,2,3]
```

## 4.数组删除元素的 4 种方式

### 4.1 伪删除将元素设置为 null

```js
const arr = [1, 2, 3, 4, 5];
arr[2] = null;
// 虽然第三个元素被赋值为null,但数组的长度仍不变
console.log(arr); // [1,2,null,4,5]
```

### 4.2 splice()删除指定下标元素

```js
const arr = [1, 2, 3, 4, 5];
// 从下标2开始删除1位元素,返回一个数组,该数组包含删除的元素
console.log(arr.splice(2, 1)); // [3]
console.log(arr); // [1,2,4,5]
```

### 4.3 shift()删除首个元素

```js
const arr = [1, 2, 3, 4, 5];
// shift()用于删除数组的首个元素并返回被删除的元素
console.log(arr.shift()); // 1
```

### 4.4 pop()删除数组最后一个元素

```js
const arr = [1, 2, 3, 4, 5];
// pop()用于删除数组最后一个元素并返回被删除的元素
console.log(arr.pop()); // 5
console.log(arr); // [1,2,3,4]
```

## 5.数组去重

### 5.1 使用 set 不允许重复元素的特性

```js
var arr = [1, 2, 3, 4, 1, 2];
console.log(Array.from(new Set(arr))); // [1,2,3,4]
```

### 5.2 创建一个新数组,使用 indexOf()includes()或判断新数组是否存在指定元素,如果不存在就添加元素

```js
var arr = [1, 2, 3, 4, 1, 2];
// indexOf()写法
var newArr = [];
for (let i = 0; i < arr.length; i++) {
  if (newArr.indexOf(arr[i]) == -1) {
    newArr.push(arr[i]);
  }
}
console.log(newArr); // [1, 2, 3, 4]

// includes()写法
var newArray = [];
for (let i = 0; i < arr.length; i++) {
  if (!newArray.includes(arr[i])) {
    newArray.push(arr[i]);
  }
}
console.log(newArray); // [1, 2, 3, 4]
```

### 5.3 通过对象键名不允许重复的特性去重

```js
var arr = [1, 2, 3, 4, 1, 2];
var obj = {};
var objArr = [];
for (let i = 0; i < arr.length; i++) {
  //如果obj不存在该键的话就往新数组添加元素
  if (!obj[arr[i]]) {
    obj[arr[i]] = 1;
    objArr.push(arr[i]);
  }
}
console.log(objArr); //[1, 2, 3, 4]
```

### 5.4 利用 filter 去重

```js
var arr = [1, 2, 3, 4, 1, 2];
console.log(
  arr.filter((curValue, index, array) => array.indexOf(curValue) === index)
); // [1, 2, 3, 4]
```

## 6.数组相关题目

### 6.1 已知如下数组，编写一个程序将数组扁平化去并除其中重复部分数据，最终得到一个升序且不重复的数组。

```js
var arr = [[1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10];
```

**解法一**:先使用 flat() 将数组拍平,然后数组转 Set 去重,然后通过 Array.from() 将对象转为数组,最后通过 sort()升序排序

```js
const arr = [
  [1, 2, 2],
  [3, 4, 5, 5],
  [6, 7, 8, 9, [11, 12, [12, 13, [14]]]],
  10,
];
console.log(Array.from(new Set(arr.flat(Infinity))).sort((a, b) => a - b));
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
```

**解法二**:通过递归拍平数组,然后转 Set 去重,最后 sort()升序

```js
const arr = [
  [1, 2, 2],
  [3, 4, 5, 5],
  [6, 7, 8, 9, [11, 12, [12, 13, [14]]]],
  10,
];
Array.prototype.flat = function () {
  return [].concat(
    ...this.map((item) => (Array.isArray(item) ? item.flat() : [item]))
  );
};
Array.prototype.unique = function () {
  return [...new Set(this)];
};
const sort = (a, b) => a - b;
console.log(arr.flat().unique().sort(sort));
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
```

## 7.数组技巧

compose(组合)函数和 pipe(管道)函数属于函数式编程(FP)中的概念,函数式编程中,组合函数是一种将多个函数组合在一起形成一个新函数的技术,管道是函数式编程的一种编程模式,它允许将函数链接在一起以构建数据流,两者都可以组织多个函数执行,其区别如下:

- 接收参数不同。管道函数接收一个初始值和一组函数,它会依次将初始值传入每个函数,最终输出管道的最后一个函数的结果。而组合函数接收一组数组,并将多个函数组合成一个新的函数,组合函数会将每个函数的输出作为上一个函数的输入,最终输出组合函数的结果。
- 函数调用顺序不同。管道函数是从左到右依次调用每个函数,而组合函数是从右到左依次调用每个函数。

### 7.1 通过 reduce()实现 pipe(管道)函数

```js
const pipe = function (value, ...fns) {
  return fns.reduce((result, fn) => {
    return fn(result);
  }, value);
};

// -------- 测试
function addOne(num) {
  return num + 1;
}
function double(num) {
  return num * 2;
}
const result = pipe(3, addOne, double);
console.log(result); // 8
```

### 7.2 通过 reduceRight() 或 reduce()实现 compose(组合)函数

```js
// 实现方式1:基于reduceRight实现compose函数,reduceRight()由右到左遍历数组
const compose = function (...fns) {
  return (args) => {
    return fns.reduceRight((result, fn) => {
      return fn(result);
    }, args);
  };
};

// 实现方式2:基于reduce()实现compose函数,从里到外求值,即从右到左求值
const compose = function (...fns) {
  return fns.reduce((result, fn) => {
    return (...args) => result(fn(...args));
  });
};

// -------- 测试
function addOne(num) {
  return num + 1;
}
function double(num) {
  return num * 2;
}
const composeFn = compose(double, addOne);
console.log(composeFn(3)); // 8
```

## 8.数组与树形结构转换

### 8.1 根据层级关系数组转树

### 8.2 树转数组
