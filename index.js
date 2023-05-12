/**
 * 通过分词器对输入代码进行分词,返回分词解析后的tokens数组
 * @param input 输入代码
 * @returns tokens 分词解析后的tokens数组
 */
function tokenizer(input) {
  // 记录当前访问的位置
  let current = 0;
  // 最终生成的tokens
  let tokens = [];

  // 遍历输入代码
  while (current < input.length) {
    let char = input[current];
    // 如果字符是开括号,则把一个新的token放到tokens数组里,类型是`paren`
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
      /**
       * 循环遍历char,如果没有遇到闭合的双引号,value会拼接双引号的中间部分,也就是不带双引号的
       * 字符串内容,每次遍历char的内容向右移动(++current),直到遇到char === '"" 才会终止遍历
       */
      while (char !== '"') {
        value += char;
        char = input[++current];
      }
      char = input[++current];
      tokens.push({ type: "string", value });
      continue;
    }
    // 最后一个检测的是name,如add这样,也是一串连续的字符,但是他是没有""的
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
    // 容错处理,如果什么都没有匹配到,说明这个token不在我们的解析范围内
    throw new TypeError("I dont know what this character is: " + char);
  }
  return tokens;
}

/**
 * 解析器,用于将入输入的token转为ast
 * @param tokens 分词器分词后生成的tokens数组
 * @return ast 返回生成的ast
 */
function parser(tokens) {
  let current = 0; // 访问tokens的下标
  // walk函数用于辅助遍历整个tokens,遍历出每一个token,根据其类型生成对应的节点
  function walk() {
    let token = tokens[current];
    // 如果token是number类型
    if (token.type === "number") {
      current++;
      return {
        type: "NumberLiteral",
        value: token.value,
      };
    }
    // 如果token是string类型
    if (token.type === "string") {
      current++;
      return {
        type: "StringLiteral",
        value: token.value,
      };
    }

    // 处理调用语句
    if (token.type === "paren" && token.value === "(") {
      token = tokens[++current];
      let node = {
        type: "CallExpression",
        value: token.value,
        params: [],
      };
      token = tokens[++current];
      // 通过递归调用不断的读取参数
      while (
        token.type !== "paren" ||
        (token.type === "paren" && token.value !== ")")
      ) {
        node.params.push(walk());
        // 因为参数的if判断里会让 current++ 实际上就是持续向后遍历了tokens,然后将参数推入params
        token = tokens[current];
      }
      // 当while中断后就说明参数读取完了,现在下一个应该是")"，所以++越过
      current++;
      // 最终将CallExpression节点返回
      return node;
    }
  }
  // 创建AST,树的最根层就是Program
  let ast = {
    type: "Program",
    body: [],
  };
  // 通过调用walk遍历tokens将tokens内的对象,转化为AST的节点,完成AST的构建
  while (current < tokens.length) {
    ast.body.push(walk());
  }
  // 最后返回ast
  return ast;
}

/**
 * traverser提供了访问AST节点的功能
 * @param {*} ast 经过parser()生成后的抽象语法树
 * @param {*} visitor 访问器,用于访问AST中的节点
 */
function traverser(ast, visitor) {
  // 遍历数组,在遍历数组的同时会调用traverseNode来遍历节点
  function traverseArray(array, parent) {
    array.forEach((child) => {
      traverseNode(child, parent);
    });
  }
  function traverseNode(node, parent) {
    // 判断访问器中是否有合适处理该节点的函数
    let methods = visitor[node.type];
    // 如果有就执行enter函数,因为此时已经进入这个节点了
    if (methods && methods.enter) {
      methods.enter(node, parent);
    }
    // 接下来根据node节点类型来处理
    switch (node.type) {
      case "Program": {
        // 如果当前节点是ast的根部，就相当于树根，body中的每一项都是一个分支
        traverseArray(node.body, node);
        break;
      }
      case "CallExpression":
        // 这个和Program一样处理,但是这里是为了遍历params,上面是为了遍历分支
        traverseArray(node.params, node);
        break;
      // 字符串和数字没有子节点需要访问直接跳过
      case "NumberLiteral":
      case "StringLiteral":
        break;
      // 最后容错处理
      default:
        throw new TypeError(node.type);
    }
    // 当执行到这里时，说明该节点（分支）已经遍历到尽头了，执行exit
    if (methods && methods.exit) {
      methods.exit(node, parent);
    }
  }
  // 从ast开始进行节点遍历,因为ast没有父节点所以传入null
  traverseNode(ast, null);
}

/**
 * transformer(转换器)用于将输入的AST转换为新的AST
 * @param {*} ast 输入的ast
 * @return newAst 经过转换后的ast
 */
function transformer(ast) {
  // 将要被返回的新的AST
  let newAst = {
    type: "Program",
    body: [],
  };
  /** 这里相当于将在旧的AST上创建一个_content,这个属性就是新AST的body,
   * 因为是引用,所以后面可以直接操作就的AST
   */
  ast._context = newAst.body;

  // 使用之前创建的访问器来访问这个AST的所有节点
  traverser(ast, {
    // 针对于数字片段的处理
    NumberLiteral: {
      enter(node, parent) {
        // 创建一个新的节点,其实就是创建新AST的节点,这个新节点存在于父节点的body中
        parent._context.push({
          type: "NumberLiteral",
          value: node.value,
        });
      },
    },
    // 针对于字符串片段的处理
    StringLiteral: {
      enter(node, parent) {
        parent._context.push({
          type: "StringLiteral",
          value: node.value,
        });
      },
    },
    // 针对调用语句的处理
    CallExpression: {
      enter(node, parent) {
        // 在新的AST中如果是调用语句,type是`CallExpression`,同时还有一个`Identifier`来标识操作
        let expression = {
          type: "CallExpression",
          callee: {
            type: "Identifier",
            name: node.value,
          },
          arguments: [],
        };
        /**
         * 在原来的节点上再创建一个新的属性,用于存放参数,这样当子节点修改_context时，
         * 会同步到expression.arguments中,这里用的是同一个内存地址
         */
        node._context = expression.arguments;
        /**
         * 这里需要判断父节点是否是调用语句,如果不是,那么就使用
         * `ExpressionStatement`将`CallExpression`包裹,
         * 因为js中顶层的`CallExpression`是有效语句
         */
        if (parent.type !== "CallExpression") {
          expression = {
            type: "ExpressionStatement",
            expression: expression,
          };
        }
        parent._context.push(expression);
      },
    },
  });
  return newAst;
}

function codeGenerator(node) {
  // 根据AST节点的种类拆解
  switch (node.type) {
    /**
     * 如果是Program,表示节点是AST的最根部了,节点的body中的每一项
     * 就是一个分支,需要将每一个分支都放入代码生成器中
     */
    case "Program":
      return node.body.map(codeGenerator).join("\n");
    /**
     * 如果是声明语句注意看新的AST结构,那么在声明语句中expression,就是声明的标示,
     * 以他为参数再次调用codeGenerator
     */
    case "ExpressionStatement":
      return codeGenerator(node.expression) + ";";

    // 如果是调用语句,则打印出调用者的名字加括号,中间放置参数如生成这样"add(2,2)",
    case "CallExpression":
      return (
        codeGenerator(node.callee) +
        "(" +
        node.arguments.map(codeGenerator).join(", ") +
        ")"
      );
    // 如果是识别就直接返回值,如:(add 2 2),在新AST中 add 就是identifier节点
    case "Identifier":
      return node.name;
    // 如果是数字则直接返回该值
    case "NumberLiteral":
      return node.value;
    // 如果是文本则用双引号包裹文本
    case "StringLiteral":
      return '"' + node.value + '"';
    // 容错处理
    default:
      throw new TypeError(node.type);
  }
}

function compiler(input) {
  let tokens = tokenizer(input); //生成tokens
  let ast = parser(tokens); //生成ast
  let newAst = transformer(ast); //拿到新的ast
  let output = codeGenerator(newAst); //生成新代码
  return output;
}
console.log(compiler("(add 2 (subtract 4 2))")); // add(2, subtract(4, 2));
