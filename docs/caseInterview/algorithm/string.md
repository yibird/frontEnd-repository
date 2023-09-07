## 反转字符串

- 倒序循环。倒叙循环字符串,每次循环都进行字符串拼接,最后返回拼接后的字符串。这种方式时间复杂度 O(n),实现比较简单。

```js
function reverseString(str) {
  let result = "";
  for (let i = str.length - 1; i >= 0; i--) {
    result += str[i];
  }
  return result;
}
```

- 利用数组 reverse()翻转元素后转为字符串。这种方式时间复杂度是 O(n),split()会遍历字符串中的每个字符转换为字符数组,reverse()遍历一半的数组元素进行翻转操作,join()遍历所有数组元素连接成一个字符串,因此字符串内容较大长这种方式性能很低。

```js
function reverseString(str) {
  return str.split("").reverse().join("");
}
```

- 循环+双指针。这种解法时间复杂度最坏是 O(n),最优是 O(N/2)。

```js
function reverseString(str) {
  // 字符串转数组
  const strArr = str.split("");
  // 定义左右两个指针,左指针的初始值为0,右指针的初始值为strArr.length - 1
  let left = 0,
    right = strArr.length - 1;
  /**
   * 循环迭代,每次迭代左指针都会向右移动一次(左指针+1),右指针向左移动一次(即右指针-1),
   * 当左指针 == 右指针 时说明元素已经被迭代完毕,因此 left < right作为循环的终止条件
   */
  while (left < right) {
    // 定义临时变量接收左指针的值,交换左右指针指向的字符
    const temp = strArr[left];
    strArr[left] = strArr[right];
    strArr[right] = temp;
    left++;
    right--;
  }
  return strArr.join("");
}
```

## 检查回文字符串

回文字符串是一种特殊类型的字符串,其特点是正着读和倒着读都是一样的。换句话说,如果你将一个回文字符串从左到右或从右到左读,得到的字符序列是相同的,例如"racecar"、"level"、"deified"。

- 反转字符串比较。将字符串反转,然后与原始字符串比较,如果相等,则字符串是回文的。

```js
function isPalindrome(str) {
  // 忽略大小写、非字母数字字符
  str = str.toLowerCase().replace(/[^a-z0-9]/g, "");
  const reverseStr = str.split("").reverse().join("");
  return reverseStr === str;
}

console.log(isPalindrome("level")); // true
console.log(isPalindrome("case")); // false
```

- 双指针法。使用两个指针,一个从字符串的开头向右移动,另一个从字符串的末尾向左移动,逐个比较字符是否相等。如果所有字符都匹配,则字符串是回文的。

```js
function isPalindrome(str) {
  const strArray = str.split("");
  let left = 0,
    right = strArray.length - 1;

  while (left < right) {
    if (strArray[left] !== strArray[right]) return false;
    left++;
    right--;
  }
  return true;
}

console.log(isPalindrome("level")); // true
console.log(isPalindrome("case")); // false
```

## 找出字符串中出现次数最多的字符串

- 使用一个 Key-Value 结构(对象或者 Map)来记录每个字符串的出现次数,然后找到出现次数最多的字符串。

```js
function findMostFrequent(str) {
  // 将字符串转为数组
  const words = str.split("");
  // 字符串计数对象,用于记录每个单词的出现次数
  const wordCount = {};

  for (const word of words) {
    // 忽略大小写和非字母数字字符
    const cleanedWord = word.toLowerCase().replace(/[^a-z0-9]/g, "");
    if (cleanedWord !== "") {
      if (wordCount[cleanedWord] !== undefined) {
        wordCount[cleanedWord] += 1;
      } else {
        wordCount[cleanedWord] = 0;
      }
    }
  }

  // 出现最多的字符串
  let mostFrequentWord = "";
  // 最大出现次数
  let maxCount = 0;

  // 遍历字符串计数对象
  for (let word in wordCount) {
    // 如果字符串的出现次数 大于 最大出现次数,则覆盖最大出现次数,并将出现次数的最大的字符赋值给mostFrequentWord
    if (wordCount[word] > maxCount) {
      maxCount = wordCount[word];
      mostFrequentWord = word;
    }
  }
  return mostFrequentWord;
}

console.log(findMostFrequent("aabbbbccc")); // b
```

- 基于桶排序找出字符串中出现次数最多的字符串:
  - 首先,将字符串拆分成单词或字符。
  - 创建一个空的对象,用于存储每个单词或字符的出现次数。
  - 对拆分后的单词或字符数组进行遍历,将每个单词或字符作为键,出现次数作为值存储在对象中。
  - 创建一个桶数组,每个桶对应一个出现次数,桶的索引表示出现次数。例如,第一个桶存储出现次数为 1 的单词或字符,第二个桶存储出现次数为 2 的单词或字符,以此类推。
  - 遍历对象中的键值对,将每个单词或字符放入对应出现次数的桶中。
  - 找到桶数组中非空的最后一个桶,其中包含出现次数最多的单词或字符。

```js
function findMostFrequent(str) {
  // 将字符串转为数组
  const words = str.split("");
  // 字符串计数对象,用于记录每个单词的出现次数
  const wordCount = {};

  for (const word of words) {
    // 忽略大小写和非字母数字字符
    const cleanedWord = word.toLowerCase().replace(/[^a-z0-9]/g, "");
    if (cleanedWord !== "") {
      if (wordCount[cleanedWord] !== undefined) {
        wordCount[cleanedWord] += 1;
      } else {
        wordCount[cleanedWord] = 0;
      }
    }
  }

  // 创建桶数组
  const bucket = new Array(words.length + 1).fill(null);
  /**
   * 将单词放入对应出现次数的桶中,桶以字符出现的次数为索引插入字符,字符出现的次数可能相同,因此使用数组保存字符。
   * 由于桶以字符出现的次数为索引,因此出现次数最小的字符索引越靠前,出现次数最多的字符索引越靠后,
   * 以 "aabbbbccc" 字符串为例,循环结束后桶的结果为:
   * [null,['a'],['c'],['b'],null,null,null,null,null,null]
   */
  for (const word in wordCount) {
    const count = wordCount[word];
    if (bucket[count] === null) {
      bucket[count] = [word];
    } else {
      bucket[count].push(word);
    }
  }

  // 找到最后一个非空桶
  for (let i = bucket.length - 1; i >= 0; i--) {
    if (bucket[i] !== null) {
      return bucket[i][0]; // 返回该桶中的第一个单词
    }
  }
  return null;
}

console.log(findMostFrequent("aabbbbccc")); // b
```
