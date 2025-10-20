// prettier.config.js
export default {
  /**
   * 是否在语句末尾添加分号
   * true：加分号（默认）
   * false：不加分号
   */
  semi: false,

  /**
   * 是否使用单引号而不是双引号
   * true：使用单引号
   * false：使用双引号
   */
  singleQuote: true,

  /**
   * 每行最大字符数（超过会自动换行）
   * 默认值：80
   */
  printWidth: 100,

  /**
   * 缩进空格数
   * 默认值：2
   */
  tabWidth: 2,

  /**
   * 使用制表符(tab)而不是空格缩进
   * true：使用 tab
   * false：使用空格（默认）
   */
  useTabs: false,

  /**
   * 尾随逗号规则（即对象或数组最后一个元素后是否加逗号）
   * 可选值：
   * - "none"：不加尾逗号
   * - "es5"：在 ES5 合法的地方加逗号（对象、数组等）
   * - "all"：尽可能加逗号（函数参数也会加）
   */
  trailingComma: 'es5',

  /**
   * Vue 文件中 <script> 和 <style> 标签内容是否缩进
   * 默认：false
   */
  vueIndentScriptAndStyle: true,

  /**
   * 在对象字面量中的括号前后是否添加空格
   * true：{ foo: bar }
   * false：{foo: bar}
   */
  bracketSpacing: true,

  /**
   * 箭头函数单个参数时是否省略括号
   * 可选值：
   * - "avoid"：能省略就省略，如 x => x
   * - "always"：总是加括号，如 (x) => x
   */
  arrowParens: 'avoid',

  /**
   * 控制换行符样式
   * 可选值：
   * - "lf"：仅换行符（Linux/Mac）
   * - "crlf"：回车 + 换行（Windows）
   * - "cr"：仅回车
   * - "auto"：根据系统自动选择
   */
  endOfLine: 'auto',
}
