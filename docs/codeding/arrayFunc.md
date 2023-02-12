## 1.创建数组的几种方式

### 1.1 基于字面量和 Array 构造函数创建数组

```js
// 字面量方式创建数组
const arr1 = [1, 2, 3, 4, 5];

// new Array()创建数组
const arr2 = new Array(1, 2, 3, 4, 5); // [1,2,3,4,5]
// 创建包含5个空元素的数组
const arr3 = new Array(5); // [空属性 × 5]
// 通过Array构造函数创建包含5个空元素的数组
const arr4 = Array(5); // [空属性 × 5]
```

### 1.2 基于 Array.of()创建数组

```js
Array.of(1, 2, 3, 4, 5); // [1,2,3,4,5]
```

### 1.3 基于 Array.from()创建数组

```js
// 创建包含5个空元素的数组
Array.from({ length: 5 }); // [空属性 × 5]

// 创建包含1到12元素的数组
Array.from({ length: 12 }, (v, i) => i + 1); // [1,2,3,4,5,6,7,8,9,10,11,12]
```

## 2.手写 Array 原型函数

### 2.1 手写 Array.prototype.forEach()

```js
Array.prototype.myForEach = function (callback, thisArg) {
  if (!Array.isArray(this)) throw new Error("只有数组才有forEach()");
  if (callback && typeof callback !== "function") {
    throw new Error("callback必须是个函数");
  }
  const len = this.length;
  if (len === 0) return;
  for (let i = 0; i < len; i++) {
    arguments.length > 1
      ? callback.call(thisArg, this[i], i, this)
      : callback(this[i], i, this);
  }
};
```

### 2.2 手写 Array.prototype.map()

```js
// map
Array.prototype.myMap = function (callback, thisArg) {
  if (!Array.isArray(this)) throw new Error("只有数组才有map()");
  if (callback && typeof callback !== "function") {
    throw new Error("callback必须是个函数");
  }
  const len = this.length,
    arr = [];
  if (len === 0) return arr;

  for (let i = 0; i < len; i++) {
    const result =
      arguments.length > 1
        ? callback.call(thisArg, this[i], i, this)
        : callback(this[i], i, this);
    arr.push(result);
  }
  return arr;
};
```

### 2.3 手写 Array.prototype.reduce()

```js
Array.prototype.myReduce = function (callback, initialValue) {
  if (!Array.isArray(this)) throw new Error("Reduce does not exist in array");
  if (callback && typeof callback !== "function") {
    throw new Error(`${callback} is not a function`);
  }
  const len = this.length;
  if (len === 0 && initialValue === "undefined") {
    throw new Error("Reduce of empty array with no initial value");
  }
  initialValue = initialValue || this[0];
  for (let i = 1; i < len; i++) {
    initialValue = callback(initialValue, this[i], i - 1, this);
  }

  return initialValue;
};

// 测试
const result = [1, 2, 3].myReduce((prev, next, currentIndex, array) => {
  console.log(prev, next, currentIndex, array);
  return prev + next;
});
console.log(result); // 6
```

#### 2.4 手写 Array.prototype.filter()

```js
Array.prototype.myFilter = function (callback, thisArg) {
  if (!Array.isArray(this)) throw new Error("只有数组才有filter()");
  const len = this.length,
    arr = [];
  if (len === 0) return arr;
  if (typeof callback !== "function") throw new Error("callback必须是个函数");
  for (let i = 0; i < len; i++) {
    const result =
      arguments.length > 1
        ? callback.call(thisArg, this[i], i, this)
        : callback(this[i], i, this);
    Boolean(result) && arr(this[i]);
  }
};
```

#### 2.5 手写 Array.prototype.find()

```js
Array.prototype.myFind = function (callback, thisArg) {
  if (!Array.isArray(this)) throw new Error("只有数组才有find()");
  if (typeof callback !== "function") throw new Error("callback必须是个函数");
  const len = this.length;
  for (let i = 0; i < len; i++) {
    const result =
      arguments.length > 1
        ? callback.call(thisArg, this[i], i, this)
        : callback(this[i], i, this);
    if (result) {
      return result;
    }
  }
  return;
};
```

#### 2.6 手写 Array.prototype.flatMap()

## 3.数组去重

### 3.1 利用 Set 元素唯一去重

原理:将数组转为 Set,利用 Set 结构相同元素不能重复的特性去除数组中相同元素,然后将 Set 转为数组。

```js
/*
 * 方式1:利用Set相同元素不能重复的特性去除数组中相同元素,然后通过Array.from()将Set转为数组,
 * 也可以通过扩展运算符将Set转为数组,例如[...new Set(arr)]
 */
const distinct = (arr) => Array.from(new Set(arr));

// 测试
const arr = [1, 2, 3, 1, 2];
console.log(distinct(arr)); // [1,2,3]
```

### 3.2 利用 indexOf()或 includes()

原理:创建一个新数组利用 indexOf()或 indecludes()判断原数组的元素是否存在新数组中,若不存在则往新数组添加该元素。

```js
/*
 * 方式2:创建一个新数组,利用indexOf()判断原数组元素是否存在新数组中,若不存在则添加。
 * includes()实现去重与indexOf()类似
 */
const distinct = (arr) => {
  if (!Array.isArray(arr)) {
    throw new Error("arr not an array");
  }
  const newArr = [];
  for (let i = 0, len = arr.length; i < len; i++) {
    newArr.indexOf(arr[i]) === -1 && newArr.push(arr[i]);
  }
  return newArr;
};

// 测试
const arr = [1, 2, 3, 1, 2];
console.log(distinct(arr)); // [1,2,3]
```

### 3.3 通过 filter()去重

原理:利用 filter()过滤相同元素。

```js
const distinct = (arr) => {
  return arr.filter((item, index, array) => array.indexOf(item) === index);
};

// 测试
const arr = [1, 2, 3, 1, 2];
console.log(distinct(arr)); // [1,2,3]
```

### 3.4 利用对象键名唯一去重

```js
const distinct = (arr) => {
  const obj = {};
  arr.forEach((item) => {
    if (!obj[item]) {
      obj[item] = item;
    }
  });
  return Object.values(obj);
};

// 测试
const arr = [1, 2, 3, 1, 2];
console.log(distinct(arr)); // [1,2,3]
```

### 3.5 利用 Map 结构 Key 不重复特性去重

```js
/*
 * 方式5:利用Map key名不可重复去重
 */
const distinct = (arr) => {
  const map = new Map();
  arr.forEach((item) => {
    if (!map.has(item)) {
      map.set(item, item);
    }
  });
  return [...map.keys()];
};

// 测试
const arr = [1, 2, 3, 1, 2];
console.log(distinct(arr)); // [1,2,3]
```

### 3.6 splice()+双重循环去重

```js
const distinct = (arr) => {
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if (arr[i] === arr[j]) {
        arr.splice(j, 1);
        // 由于数组删除了一个元素,长度和遍历的范围都要减一
        len--;
        j--;
      }
    }
  }
  return arr;
};

// 测试
const arr = [1, 2, 3, 1, 2];
console.log(distinct(arr)); // [1,2,3]
```

## 4.数组扁平化

提供一个多维数组,编写一个函数将数组扁平化去并除其中重复部分数据,最终得到一个升序且不重复的数组。

```js
// 多维数组,要求将其扁平化并去重升序排序
const arr = [
  [1, 2, 2],
  [3, 4, 5, 5],
  [6, 7, 8, 9, [11, 12, [12, 13, [14]]]],
  10,
];
```

### 4.1 基于 flat 扁平化数组

flat(Infinity)将任意多维数组拍平为一维数组,然后数组转 Set 去重,然后通过 Array.from 将对象转为数组,最后通过 sort()升序排序。

```js
const fn = (arr) => {
  if (!Array.isArray(arr)) return;
  return Array.from(new Set(arr.flat(Infinity))).sort((a, b) => a - b);
};

// 测试
console.log(fn(arr)); // [1, 2, 3, 4, 5, 6,7, 8, 9, 10, 11, 12,13, 14]
```

### 4.2 基于递归扁平化数组

通过递归拍平数组,然后转 Set 去重,最后 sort()升序。

```js
const fn = (arr) => {
  if (!Array.isArray(arr)) return;
  Array.prototype.flat = function () {
    return [].concat(
      ...this.map((item) => (Array.isArray(item) ? item.flat() : [item]))
    );
  };
  Array.prototype.unique = function () {
    return [...new Set(this)];
  };
  const sort = (a, b) => a - b;
  return arr.flat().unique().sort(sort);
};

// 测试
console.log(fn(arr)); // [1, 2, 3, 4, 5, 6,7, 8, 9, 10, 11, 12,13, 14]
```

## 5.数组转树形结构

```ts
// 将arr根据pid与id的关系转树形结构
const arr = [
  { id: 1, label: "1", pid: -1 },
  { id: 2, label: "2", pid: -1 },
  { id: 3, label: "1-1", pid: 1 },
  { id: 4, label: "1-2", pid: 1 },
  { id: 5, label: "2-1", pid: 2 },
  { id: 6, label: "1-1-1", pid: 3 },
];
```

### 5.1 通过循环数组转树形结构

步骤 1:遍历数组,先判断 item 的 pid 是否是为 null 或者-1,如果满足条件则说明该元素是根节点,则直接添加到 tree。
步骤 2:如果 item 不是根节点,则根据 item 的 pid 获取到父节点(parent),父节点初始化 children 属性用于存储子节点,如果父节点的 children 不包含 item 则直接向父节点的 children 添加。

```ts
const arrayToTree = (arr) => {
  if (!Array.isArray(arr)) return [];
  const tree = [];

  arr.forEach((item) => {
    // 如果pid为空或-1则直接向tree添加数据
    if (!item.pid || item.pid === -1) {
      tree.push(item);
    } else {
      // 获取父节点,这里可以通过map或object做数据映射,可以避免在循环中调用find(),从而提升执行效率,空间换时间
      const parent = arr.find((row) => row.id === item.pid);
      // 初始化parent.childrent
      !parent.children && (parent.children = []);
      // 判断parent.children是否已包含当前遍历元素,不包含则向parent.children添加
      !parent.children.includes(item) && parent.children.push(item);
    }
  });
  return tree;
};

console.log(JSON.stringify(arrayToTree(arr)));
```

```ts
// 结果
[
  {
    id: 1,
    label: "1",
    pid: -1,
    children: [
      {
        id: 3,
        label: "1-1",
        pid: 1,
        children: [
          {
            id: 6,
            label: "1-1-1",
            pid: 3,
          },
        ],
      },
      {
        id: 4,
        label: "1-2",
        pid: 1,
      },
    ],
  },
  {
    id: 2,
    label: "2",
    pid: -1,
    children: [
      {
        id: 5,
        label: "2-1",
        pid: 2,
      },
    ],
  },
];
```

### 5.2 通过 reduce 转树形结构

```ts
const arrayToTree = (arr) => {
  if (!Array.isArray(arr)) return [];
  const tree = [];
  // 通过map或者object做数据映射,可以更快的获取数据
  const map = new Map();
  // 倒序遍历
  for (let i = arr.length - 1; i--; ) {
    map.set(arr[i].id, arr[i]);
  }
  arr.reduce((_, cur) => {
    if (!cur.pid || cur.pid === -1) {
      tree.push(cur);
    } else {
      const parent = map.get(cur.pid);
      !parent.children && (parent.children = []);
      !parent.children.includes(cur) && parent.children.push(cur);
    }
  }, []);
  return tree;
};
console.log(JSON.stringify(arrayToTree(arr)));
```

## 6.树形结构转数组

```ts
// 将树形转为数组
const tree = [
  {
    id: 1,
    label: "1",
    pid: -1,
    children: [
      {
        id: 3,
        label: "1-1",
        pid: 1,
        children: [
          {
            id: 6,
            label: "1-1-1",
            pid: 3,
          },
        ],
      },
      {
        id: 4,
        label: "1-2",
        pid: 1,
      },
    ],
  },
  {
    id: 2,
    label: "2",
    pid: -1,
    children: [
      {
        id: 5,
        label: "2-1",
        pid: 2,
      },
    ],
  },
];
```

### 6.1 通过递归遍历树形结构转数组

```ts
const treeToArray = (tree) => {
  if (!Array.isArray(tree) || !tree.length) return [];
  const arr = [];
  tree.forEach((item) => {
    arr.push(item, ...treeToArray(item.children));
  });
  return arr;
};
console.log(JSON.stringify(treeToArray(tree)));
```

```ts
// 结果
[
  {
    id: 1,
    label: "1",
    pid: -1,
    children: [
      {
        id: 3,
        label: "1-1",
        pid: 1,
        children: [
          {
            id: 6,
            label: "1-1-1",
            pid: 3,
          },
        ],
      },
      {
        id: 4,
        label: "1-2",
        pid: 1,
      },
    ],
  },
  {
    id: 3,
    label: "1-1",
    pid: 1,
    children: [
      {
        id: 6,
        label: "1-1-1",
        pid: 3,
      },
    ],
  },
  {
    id: 6,
    label: "1-1-1",
    pid: 3,
  },
  {
    id: 4,
    label: "1-2",
    pid: 1,
  },
  {
    id: 2,
    label: "2",
    pid: -1,
    children: [
      {
        id: 5,
        label: "2-1",
        pid: 2,
      },
    ],
  },
  {
    id: 5,
    label: "2-1",
    pid: 2,
  },
];
```

### 6.2 通过 reduce 树形结构转数组

```ts
const treeToArray = (tree) => {
  if (!Array.isArray(tree) || !tree.length) return [];
  const arr = [];
  tree.reduce((prev, cur) => {
    arr.push(cur, ...treeToArray(cur.children));
  }, []);
  return arr;
};
console.log(JSON.stringify(treeToArray(tree)));
```
