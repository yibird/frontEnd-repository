# 基础类型
JavaScript类型可分为基本类型和引用类型两种:
+  基本类型:String、Number、Boolean、Null、Undefined、Symbol(ES6)、Bigint(ES7)。
+ 引用类型:Array、Object、Function。

严谨来说在ES5版本仅有5种基本类型,在ES6版本有6种基本类型,在ES7版本有7种基本类型,如果脱离ES版本谈基础类型的种类,这将是一个非常愚蠢的选择。
## 基本类型与引用类型的区别?
+ 基本类型存储在栈(stack)中,它由系统自动分配内存空间,并且由系统自动释放。而引用类型存储在堆(heap)中是由系统动态的分配内存空间,不一定会被释放掉。
+ 基本类型指向的是一块内存地址,相互之间互不影响;而引用类型指向的是一块内存引用,当变量指向引用类型进行操作时,会影响原始引用类型。

``` js
// 基础类型指向的是一块内存地址,相互独立,赋值后的变量并不会影响源变量
var a = 1;
var b = a ;
b = 2;
console.log(a,b); // 1 2

// 引用指向的是一块内存引用,赋值后的变量会影响源变量
var c = {name:'zchengfeng'}
var d = c;
d = {name:'dog'}
console.log(c,d); // {name:'zchengfeng'} {name: 'dog'}
```

## 类型判断
在JavaScript中 ``typeof`` 操作符和``instanceof``是判断对象类型最为常规的手段,但typeof和instance在特定场景下并不能准确判断类型,若要准确判断对象类型推荐使用``Object.prototype.toString()``这种方式。

### typeof
typeof操作符用于检测变量的类型并返回变量的类型值。它有2种使用方式:`typeof(表达式)`和`typeof 变量名`,第一种是对表达式做运算,第二种是对变量做运算。typeof操作符在判断Null和Array类型时都为object,所以typeof常用于Function类型的判断。

```js
console.log(typeof 123);//number
console.log(typeof(123));//number
console.log(typeof 'zxp');//string
console.log(typeof true);//boolean
console.log(typeof undefined);//undefined
console.log(typeof null);//object
console.log(typeof []);//object
console.log(typeof {});//object
console.log(typeof function(){});//function
console.log(typeof class Person{});//function
```
**为什么typeof判断null类型是object?**

不同的对象在底层都表示为二进制,在 JavaScript中二进制前三位都为 0 的话会被判断为 object 类型,null 的二进制表示是全0,自然前三位也是0,所以执行 typeof 时会返回”object”。
其实这个是一个历史遗留的bug，在 javascript 的最初版本中，使用的 32 位系统，为了性能考虑使用低位存储了变量的类型信息(undefined与null较为特殊)：
+ 000:对象。
+ 1:整数。
+ 010:浮点数。
+ 100:字符串。
+ 110:布尔。
+ undefined:用 - （−2^30）表示。
+ null:对应机器码的 NULL 指针,一般是全零,所以使用typeof判断null类型的结果是object。

### instanceof
instanceof操作符用于判断变量是否属于某个对象的实例。注意:instanceof操作符在判断Array和Function类型时都为true。
```js
console.log([] instanceof Array);//true
console.log([] instanceof Object);//true
console.log({} instanceof Object);//true
console.log(function(){} instanceof Function);//true
console.log(function(){} instanceof Object);//true
```
**instanceof原理剖析:**

在javaScript中每个对象都有一个__proto__属性,这是对象的隐式原型,它指向父对象的prototype(原型,又称为显式原型)。使用instanceof判断变量是否属于某个对象的实例时,首先会判断变量的__proto__是否具有某个对象的实例,如果有则说明该变量是属于此对象的实例,那么会立马返回,如果没有则会通过父对象的__proto__则会一直向上查找,如果查找期间查找到了就说明该变量属于此对象的实例并返回,如果查找到最顶层的Object(Object的原型为null)还未查找到,则说明该变量不属于此对象实例,这个过程产生的原型查找链就被成为原型链,而instanceof正是通过原型链查找的方式判断变量是否属于某个对象的实例。
```js
// 手写instanceof
function instanceof_of(L,R){
    //拿到L的__proto__,它指向父对象实例的prototype
    L=L.__proto__;
    //不停向上查找原型
    while(true){
        /**
        * 如果查找到了最顶层(查找到Object,Object的__proto__为null)还没有匹配到,
        * 就立马终止,说明L instanceof R 的结果为false
        */
        if(L===null){
            return false
        }
        //如果L.__proto__===R.prototype 则说明匹配到了,返回true
        if(L===R.prototype){
            return true
        }
        //没有匹配到就一直向上查找,直到匹配到为止
        L=L.__proto__;
    }
}
//使用instanceof_of方法
console.log(instanceof_of({},Object)); // true
console.log(instanceof_of([],Object)); // true
console.log(instanceof_of([],Array)); // true
```
### 类型判断的几种方式
+ 通过Object.prototype.toString获取类型(推荐)
```js
//从下面可以看出返回[object xxx]中的xxx就是变量的类型
console.log(Object.prototype.toString.call("")); // [object String]
console.log(Object.prototype.toString.call(null)); // [object Null]
console.log(Object.prototype.toString.call([])); // [object Array]
console.log(Object.prototype.toString.call({})); // [object Object]


/*封装成函数:判断obj是否是type类型*/
function isType(obj,type){
  const typeinof=Object.prototype.toString.call(obj);
  return typeinof.substring(8,typeinof.length-1)===type
}

//测试
console.log(isType({},"Object")); // true
console.log(isType([],"Object")); // false
console.log(isType(null,"Object")); // false

/*封装成一个函数(使用高阶函数特性):判断obj是否是type类型*/
const isType=obj=>type=>Object.prototype.toString.call(obj)===`[object ${type}]`;

//测试
console.log(isType("123")("String")); // true
console.log(isType("123")("Number")); // false
console.log(isType({})("Object")); // true
console.log(isType({})("Object"));
```
+ 通过构造器判断类型:
```js
var a=123
console.log(a.constructor===Number); //true
var s="zxp"
console.log(s.constructor===String); //true
var b=false;
console.log(b.constructor===Boolean);//true
var obj={}
console.log(obj.constructor===Object);//true
var arr=[]
console.log(arr.constructor===Array);//true
var fn=function(){}
console.log(fn.constructor===Function);//true
```
+ 通过typeof 获取表达式类型:
```js
console.log(typeof 123);//number
console.log(typeof(123));//number
console.log(typeof 'zxp');//string
console.log(typeof true);//boolean
console.log(typeof undefined);//undefined
console.log(typeof null);//object
console.log(typeof []);//object
console.log(typeof {});//object
console.log(typeof function(){});//function
console.log(typeof class Person{});//function
```
+ 通过instanceof判断表达式是否属于某个类型的实例:
```js
console.log([] instanceof Array);//true
console.log([] instanceof Object);//true
console.log({} instanceof Object);//true
console.log(function(){} instanceof Function);//true
console.log(function(){} instanceof Object);//true
```

### 总结
+ typeof操作符在判断Null和Array类型时为object。
+ instanceof操作符在判断Array和Function类型时都为true。
+ 判断类型最佳方式是使用Object.prototype.toString方式。
+ instanceof操作符的原理是通过原型链机制不停向上匹配目标类型,如果对象的__proto__中途匹配上了目标类型的prototype则中断原型链查找(返回true),否则一直向上查找,直到对象的__proto__为null时才终止查找(返回false)。


## 类型转换
### 类型隐式转换
在JavaScript中,当变量在运算时,如果两边数据类型不统一,CPU就无法进行计算,此时编译器会自动将运算符两边数据的类型进行转换,转成一样相同数据类型再进行计算。隐式类型转换遵循如下规则:
+ 使用字符串连接符(+:只要+号两侧任意一侧为string类型)连接数据时,会把其他数据类型调用String()转成字符串再进行拼接。使用算术运算符时,会把其他数据类型调用Number()转为数字再进行加法运算。
```js
// 由于使用字符串连接符(+),会把1调用String()转为字符串。下面代码等同:String(1) + "true"
console.log(1 + "true") // 1true

// 等同于:1 + Number(true) = 1+1=2
console.log(1 + true) // 2

// 等同于:1+Number(undefined)=1+NaN=NaN
console.log(1 + undefined) // NaN

// 等同于:1+Number(null)= 1 + 0 = 1
console.log(1 + null) // 1
```

+ 使用关系运算符时,会把其他数据类型通过Number()转换为number类型在进行比较。如果关系运算符两侧均为string类型时并不是按照Number()转为数字,而是根据字符串对应的unicode编码来转成数字后进行比较。
```js
// 等同于:Number("2") > 10
console.log("2" > 10) // false

/*
 * 由于关系运算符两侧都是string类型,则会根据字符串对应的unicode编码转为数字后进行比较,
 * "2".charCodeAt()的值为50,"10".charCodeAt()的值为49。
 */
console.log("2" > "10") // true

// 当有多个字符串将从左到右依次比较。
// 先比较"a"和“b”,a.charCodeAt()为97,"b".charCodeAt()的值为98,"b" > "a" 可直接得出结果
console.log("abc" > "b") // false 
console.log("abc" > "aad") // true

// 特殊情况
```

# 类型Api介绍
