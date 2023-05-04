function tokenizer(input) {
  // 记录当前访问的位置
  let current = 0;
  // 最终生成的tokens
  let tokens = [];

  // 遍历输入代码
  while (current < input.length) {
    // 如果字符是开括号，我们把一个新的token放到tokens数组里,类型是`paren`
    if (char === "(") {
      tokens.push({
        type: "paren",
        value: "(",
      });
      current++;
      continue;
    }

    // 闭括号做同样的操作
    if (char === ")") {
      tokens.push({
        type: "paren",
        value: ")",
      });
      current++;
      continue;
    }

    // 空格检查,分词时需要关心空格在分隔字符上是否存在,但是在token中他是无意义的
    let WHITESPACE = /\s/;
    if (WHITESPACE.test(char)) {
      current++;
      continue;
    }
    /**
     * 检查数字,遇到解析 add 22 33时避免内容被解析为2、2、3、3,所以遇到数字后需要
     * 继续向后匹配直到匹配失败,这样就可以截取到连续的数字了
     */
    let NUMBERS = /[0-9]/;
    if (NUMBERS.test(char)) {
      let value = "";
      while (NUMBERS.test(char)) {
        value += char;
        char = input[++current];
      }
      tokens.push({ type: "number", value });
      continue;
    }
    // 接下来检测字符串,这里只检测双引号,和上述同理也是截取连续完整的字符串

    if (char === '"') {
      let value = "";
      char = input[++current];
      while (char !== '"') {
        value += char;
        char = input[++current];
      }
      char = input[++current];
      tokens.push({ type: "string", value });
      continue;
    }
    // 最后一个检测的是name 如add这样,也是一串连续的字符,但是他是没有“”的
    let LETTERS = /[a-z]/i;
    if (LETTERS.test(char)) {
      let value = "";
      while (LETTERS.test(char)) {
        value += char;
        char = input[++current];
      }
      tokens.push({ type: "name", value });
      continue;
    }
    // 容错处理，如果我们什么都没有匹配到，说明这个token不在我们的解析范围内
    throw new TypeError("I dont know what this character is: " + char);
  }
  return tokens;
}
