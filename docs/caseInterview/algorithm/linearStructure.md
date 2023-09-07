## 队列实现栈

```js
function Stack() {
  this.queue = [];
}

// 入栈
Stack.prototype.push = function (item) {
  this.queue.push(item);
};

// 出栈
Stack.prototype.pop = function () {
  if (this.queue.length === 0) return null;
  const top = this.queue.unshift();
  this.queue.splice(this.queue.length - 1, 1);
  return top;
};

// 查看栈顶元素
Stack.prototype.peek = function () {
  if (this.queue.length === 0) return null;
  return this.queue[this.queue.length - 1];
};

// 判断栈是否为空
Stack.prototype.isEmpty = function () {
  return this.queue.length === 0;
};

// 栈是先进后出,后进先出
const stack = new Stack();
stack.push(1);
stack.push(2);
stack.push(3);

console.log(stack.pop()); // 3
console.log(stack.peek()); // 2
console.log(stack.isEmpty()); // false
```
