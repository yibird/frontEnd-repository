## 反转字符串

- 倒序循环。倒叙循环字符串,每次循环都进行字符串拼接,最后返回拼接后的字符串。这种方式时间复杂度 O(n),实现比较简单。

```js
function reverseString(str) {
  let result = ''
  for (let i = str.length - 1; i >= 0; i--) {
    result += str[i]
  }
  return result
}
```

- 利用数组 reverse()翻转元素后转为字符串。这种方式时间复杂度是 O(n),split()会遍历字符串中的每个字符转换为字符数组,reverse()遍历一半的数组元素进行翻转操作,join()遍历所有数组元素连接成一个字符串,因此字符串内容较大长这种方式性能很低。

```js
function reverseString(str) {
  return str.split('').reverse().join('')
}
```

- 循环+双指针。这种解法时间复杂度最坏是 O(n),最优是 O(N/2)。

```js
function reverseString(str) {
  // 字符串转数组
  const strArr = str.split('')
  // 定义左右两个指针,左指针的初始值为0,右指针的初始值为strArr.length - 1
  let left = 0,
    right = strArr.length - 1
  /**
   * 循环迭代,每次迭代左指针都会向右移动一次(左指针+1),右指针向左移动一次(即右指针-1),
   * 当左指针 == 右指针 时说明元素已经被迭代完毕,因此 left < right作为循环的终止条件
   */
  while (left < right) {
    // 定义临时变量接收左指针的值,交换左右指针指向的字符
    const temp = strArr[left]
    strArr[left] = strArr[right]
    strArr[right] = temp
    left++
    right--
  }
  return strArr.join('')
}
```

## 检查回文字符串

回文字符串是一种特殊类型的字符串,其特点是正着读和倒着读都是一样的。换句话说,如果你将一个回文字符串从左到右或从右到左读,得到的字符序列是相同的,例如"racecar"、"level"、"deified"。

- 反转字符串比较。将字符串反转,然后与原始字符串比较,如果相等,则字符串是回文的。

```js
function isPalindrome(str) {
  // 忽略大小写、非字母数字字符
  str = str.toLowerCase().replace(/[^a-z0-9]/g, '')
  const reverseStr = str.split('').reverse().join('')
  return reverseStr === str
}

console.log(isPalindrome('level')) // true
console.log(isPalindrome('case')) // false
```

- 双指针法。使用两个指针,一个从字符串的开头向右移动,另一个从字符串的末尾向左移动,逐个比较字符是否相等。如果所有字符都匹配,则字符串是回文的。

```js
function isPalindrome(str) {
  const strArray = str.split('')
  let left = 0,
    right = strArray.length - 1

  while (left < right) {
    if (strArray[left] !== strArray[right]) return false
    left++
    right--
  }
  return true
}

console.log(isPalindrome('level')) // true
console.log(isPalindrome('case')) // false
```

## 查找字符串中出现次数最多的字符串

- 使用一个 Key-Value 结构(对象或者 Map)来记录每个字符串的出现次数,然后找到出现次数最多的字符串。

```js
function findMostFrequent(str) {
  // 将字符串转为数组
  const words = str.split('')
  // 字符串计数对象,用于记录每个单词的出现次数
  const wordCount = {}

  for (const word of words) {
    // 忽略大小写和非字母数字字符
    const cleanedWord = word.toLowerCase().replace(/[^a-z0-9]/g, '')
    if (cleanedWord !== '') {
      if (wordCount[cleanedWord] !== undefined) {
        wordCount[cleanedWord] += 1
      } else {
        wordCount[cleanedWord] = 0
      }
    }
  }

  // 出现最多的字符串
  let mostFrequentWord = ''
  // 最大出现次数
  let maxCount = 0

  // 遍历字符串计数对象
  for (let word in wordCount) {
    // 如果字符串的出现次数 大于 最大出现次数,则覆盖最大出现次数,并将出现次数的最大的字符赋值给mostFrequentWord
    if (wordCount[word] > maxCount) {
      maxCount = wordCount[word]
      mostFrequentWord = word
    }
  }
  return mostFrequentWord
}

console.log(findMostFrequent('aabbbbccc')) // b
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
  const words = str.split('')
  // 字符串计数对象,用于记录每个单词的出现次数
  const wordCount = {}

  for (const word of words) {
    // 忽略大小写和非字母数字字符
    const cleanedWord = word.toLowerCase().replace(/[^a-z0-9]/g, '')
    if (cleanedWord !== '') {
      if (wordCount[cleanedWord] !== undefined) {
        wordCount[cleanedWord] += 1
      } else {
        wordCount[cleanedWord] = 0
      }
    }
  }

  // 创建桶数组
  const bucket = new Array(words.length + 1).fill(null)
  /**
   * 将单词放入对应出现次数的桶中,桶以字符出现的次数为索引插入字符,字符出现的次数可能相同,因此使用数组保存字符。
   * 由于桶以字符出现的次数为索引,因此出现次数最小的字符索引越靠前,出现次数最多的字符索引越靠后,
   * 以 "aabbbbccc" 字符串为例,循环结束后桶的结果为:
   * [null,['a'],['c'],['b'],null,null,null,null,null,null]
   */
  for (const word in wordCount) {
    const count = wordCount[word]
    if (bucket[count] === null) {
      bucket[count] = [word]
    } else {
      bucket[count].push(word)
    }
  }

  // 找到最后一个非空桶
  for (let i = bucket.length - 1; i >= 0; i--) {
    if (bucket[i] !== null) {
      return bucket[i][0] // 返回该桶中的第一个单词
    }
  }
  return null
}

console.log(findMostFrequent('aabbbbccc')) // b
```

## 字符串数字格式化

要求将"100000000"格式化为"100,000,000"。

### 倒序遍历

```js
function stringNumberFormat(str, formatChar) {
  if (typeof str !== 'string') {
    throw new TypeError('str is not a string')
  }
  const len = str.length
  if (len === 0) return str
  let formatResult = '',
    result = ''
  // 倒序遍历字符串,每遍历3次都在字符串后面拼接格式化字符
  for (let i = len - 1; i >= 0; i--) {
    if ((len - i) % 3 === 0 && i !== 0) {
      formatResult += str[i] + formatChar
    } else {
      formatResult += str[i]
    }
  }
  // 由于formatResult的结果值是倒序的,需要倒序遍历拼接字符串为正序
  for (let i = formatResult.length - 1; i >= 0; i--) {
    result += formatResult[i]
  }
  return result
}

console.log(stringNumberFormat('100000000', ',')) // "100,000,000"
```

### 正则表达式替换

正则表达式替换是三种实现中最简洁的一种,使用`/\B(?=(\d{3})+(?!\d))/g`表达式对字符串匹配并进行替换:

- \B:一个零宽度断言(zero-width assertion),表示匹配不在单词边界（word boundary）的位置。在这个上下文中,\B 用于确保分隔符不会出现在单词的开头或结尾。
- (?=...):表示正向预查(positive lookahead),用于在匹配位置后面查找一个模式。在表达式中表示查找\d{3},即查找连续出现三次的数字。
- (\d{3}):这是一个捕获组,用于匹配连续的三个数字。\d 表示匹配任何数字字符,{3} 表示匹配连续出现三次。
- +:表示匹配一个或多个前面的元素,即 \d{3}。
- (?!\d):这是负向预查(negative lookahead),用于确保在匹配的三个数字后面不会出现数字字符。也就是说,它要求匹配的数字组后面不能再跟数字。

```js
function stringNumberFormat(str, formatChar) {
  if (typeof str !== 'string') {
    throw new TypeError('str is not a string')
  }
  return str.replace(/\B(?=(\d{3})+(?!\d))/g, formatChar)
}
```

### Number 的 toLocaleString()

Number.toLocaleString() 是 JavaScript 内置的方法,用于将数字格式化为带有千位分隔符、小数点和货币符号的字符串,具体格式会根据当前浏览器的地区和语言设置而变化。相比较前两种方式,使用 toLocaleString()无法自定义分隔符。

```js
function stringNumberFormat(str) {
  const number = parseFloat(str)
  if (Number.isNaN(number)) {
    throw new Error('str cannot be converted to a number')
  }
  return number.toLocaleString()
}
console.log(stringNumberFormat('100000000')) // "100,000,000"
console.log(stringNumberFormat('ss100000000')) // Error: str cannot be converted to a number
```

## 比较两个版本号

提供一个用于比较两个数字字符串的版本号,如果两个版本号相等则返回 0,如果版本号 1 大于版本号 2 则返回 1,否则返回-1。实现思路如下:

- 首先以,号分割两个版本号为数组。
- 比较两个版本号的长度,以最长版本号的长度作为遍历次数。
- 不满长度的版本号需要补 0 对齐,然后挨个比较两个版本号中元素的每一项。

```js
function compareVersions(v1, v2) {
  // 分割两个版本号
  const arr1 = v1.split(','),
    arr2 = v2.split(',')
  // 获取两个版本号中长度最长的版本号作为遍历次数
  const count = Math.max(arr1.length, arr2.length)

  // 循环
  for (let i = 0; i < count; i++) {
    /**
     * 补零对齐。假设v1为 1.1.1 v2为 1.0,遍历到第三次时由于v2的长度不够,
     * 因此访问arr2[i]时结果为undefined,所以使用 arr2[i] || "0" 进行
     * 补零,补零之后的结果为 1.0.0
     */
    const v1Part = parseInt(arr1[i] || '0', 10)
    const v2Part = parseInt(arr2[i] || '0', 10)

    if (v1Part > v2Part) {
      return 1
    } else if (v1Part < v2Part) {
      return -1
    }
    return 0
  }
}
```
