### File 与 FileList 对象

File 在 HTML 中表示一个文件对象,FileList 表示多个 File 对象列表。在上传文件场景中可以将`input`元素的 type 为`type='file'`,然后通过该元素的`files`属性获取已选中的文件列表(返回一个 FileList 对象)。在 HTML4 中,file 控件内只允许放置一个文件,但在 HTML5 中,通过添加`multiple`属性,允许 file 控件一次性选择多个文件,每选择一个文件都是一个 File 对象,FileList 对象表示已选中文件 File 对象的集合。注意:File 继承自 Blob 对象,File 对象是一个特殊类型的 Blob,且可以用在任意的 Blob 类型的 context 中。

| API 名称                               | 描述                                                                                                                                                                                                                                                                                                                      |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| new File(bits,name[,options])          | **bits**: 可以是包含 ArrayBuffer、ArrayBufferView、Blob、或者 DOMString 对象的 Array — 或者任何这些对象的组合(这是 UTF-8 编码的文件内容)。**name**:表示文件名称或文件路径。**options**一个选项对象,包含 type 和 lastModified 两个属性,type 用于配置文件的 MIME 类型,lastModified 用于配置文件最后修改时间的 Unix 时间戳。 |
| lastModified                           | 返回当前文件对象的最后修改日期。为自 1970 年 1 月 1 日 0:00 以来的毫秒数,没有已知的最后修改时间则会返回当前时间。                                                                                                                                                                                                         |
| lastModifiedDate                       | 返回当前文件最后修改时间,是一个 Date 对象。                                                                                                                                                                                                                                                                               |
| name                                   | 当前文件名称。                                                                                                                                                                                                                                                                                                            |
| size                                   | 以字节为单位返回当前文件的大小。                                                                                                                                                                                                                                                                                          |
| webkitRelativePath                     | 返回 File 相关的 path 或 URL。                                                                                                                                                                                                                                                                                            |
| type                                   | 当前文件的 MIME 类型。                                                                                                                                                                                                                                                                                                    |
| slice([start [, end [, contentType]]]) | 该方法继承自 Blob 对象, 返回一个 start 至 end 范围的新 Blob 对象,contentType 用于设置返回 Blob 的类型。                                                                                                                                                                                                                   |

```html
<!-- 设置multiple允许上传文件时选择多个文件 -->
<input id="fileEl" type="file" multiple />

<script>
  const fileEl = document.getElementById("fileEl");
  // 监听change事件
  fileEl.onchange = (e) => {
    // 获取已选中文件列表,返回一个FileList对象,通过Array.from()转为数组
    const files = Array.from(fileEl.files);
    if (files.length === 0) return;
    files.forEach((file) => {
      const {
        name,
        size,
        type,
        lastModified,
        lastModifiedDate,
        webkitRelativePath,
      } = file;
      console.log("文件名:", name);
      console.log("文件大小(字节):", size);
      console.log("文件MIME type:", type);
      console.log("文件最后修改日期:", lastModified);
      console.log("文件最后修改事件:", lastModifiedDate);
      console.log("文件path:", webkitRelativePath);
    });
  };
</script>
```

### ArrayBuffer 与 ArrayBufferView

在 HTML5 出现之前,处理原始二进制数据的方法是将原始二进制数据转化为代表为二进制数据的字符串,并使用 charCodeAt()读取原始二进制数的每个字节,这种处理方式不仅效率低下,而且还容易发生错误(例如当原始二进制数据的数据类型并不是字节类型,而是整数或浮点型时)。HTML5 提供了一种更高效访问原始二进制数据的机制,为了灵活性 HTML5 新增两种对象:ArrayBuffer 和 ArrayBufferView 对象。

#### ArrayBuffer

**ArrayBuffer 对象代表一个存储固定长度的二进制数据缓冲区(通常 ArrayBuffer 的数据来源于文件或网络),注意:ArrayBuffer 不能直接存取 ArrayBuffer 缓存区中的内容,必须通过 TypedArray 和 DataView 对象来操作 ArrayBuffer 缓存区中的内容**。缓冲区(Buffer)就是在内存中预留指定大小的存储空间用来对 I/O 的数据做临时存储,这部分预留的内存空间叫缓冲区。使用缓冲区好处有两点,第一是减少实际物理读写次数,减少读写操作带来的资源损耗;第二是缓冲区可以减少动态分配和回收内存的次数,由于缓冲区在创建时就被分配内存,且这块内存区域可以被一直重用。缓冲区的用于临时存储数据,可以理解为是 I/O 操作中数据的中转站。

#### ArrayBufferView

### Blob 对象

HTML5 中 Blob 对象用于表示原始二进制数据(File 对象继承自 Blob),Blob 数据可以按文本或二进制的格式进行读取,也可以转换成 ReadableStream 来用于数据操作。Blob 对象包含 size 与 type 两个属性,size 表示一个 Blob 对象的字节长度,type 表示 Blob 对象的 MIME 类型,如果是未知类型,则返回一个空字符串。

| API 名称                               | 描述                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| size                                   | 用于返回 Blob 对象的字节长度                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| type                                   | 用于返回 Blob 对象的 MIME 类型                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| new Blob(array, options)               | 创建一个新的 Blob 对象,array 是一个由 ArrayBuffer,ArrayBufferView,Blob,DOMString 等对象构成的 Array ,或者其他类似对象的混合体,它将会被放进 Blob,array 可选,默认为一个空数组。options 是一个 Blob 配置项(可选),包含 type 和 endings 两个属性,type 用于指定 Blob 的 MIME 类型,endings 用于指定包含行结束符\n 的字符串如何被写入,可选值为`transparent`和 `native`(默认`transparent`),`native`代表行结束符会被更改为适合宿主操作系统文件系统的换行符,`transparent`代表会保持 blob 中保存的结束符不变 |
| slice([start [, end [, contentType]]]) | 返回一个 start 至 end 范围的新 Blob 对象,contentType 用于设置返回 Blob 的类型。                                                                                                                                                                                                                                                                                                                                                                                                                  |
| stream()                               | 返回一个可读取 Blob 内容的 ReadableStream 对象                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| text()                                 | 返回一个 Promise 且包含 Blob 所有内容的 UTF-8 格式字符串                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| arrayBuffer()                          | 返回一个 Promise 且包含 Blob 所有内容的二进制格式的 ArrayBuffer                                                                                                                                                                                                                                                                                                                                                                                                                                  |

```js
/*
 * 创建Blob对象
 */

// 1.创建一个空数据的Blob对象
const blob01 = new Blob(); // Blob {size: 0, type: ''}

// 2.创建一个DOMString内容、MIME类型为text/html的Blob对象
const blob02 = new Blob(['<a id="a"><b id="b">hey!</b></a>'], {
  type: "text/html",
});
console.log(blob02); // Blob {size: 32, type: 'text/html'}

// 3.创建一个Blob内容的Blob对象
const blob03 = new Blob([new Blob(["hahaha"])], {
  type: "",
});
console.log(blob03); // Blob {size: 6, type: ''}

// 4.创建一个ArrayBuffer内容的Blob对象
const arrayBuffer = new ArrayBuffer(10); // 创建一个长度为10字节的ArrayBuffer
const blob04 = new Blob([arrayBuffer], {
  type: "text/plain",
});
console.log(blob04); // Blob{Blob {size: 10, type: 'text/plain'}}

// 5.创建一个ArrayBufferView内容的Blob对象
// 根据ArrayBuffer创建一个ArrayBufferView对象,DataView属于ArrayBufferView的子类
const view = new DataView(new ArrayBuffer(16));
const blob05 = new Blob([view]);
console.log(blob05); // Blob {size: 16, type: ''}
```

### FileReader 对象

FileReader 用于将文件的加载到内存中,并且异步的读取文件中的数据。

| API 名称                 | 描述                                                                                                                                                               |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| error                    | 一个 DOMException，表示在读取文件时发生的错误                                                                                                                      |
| readyState               | 返回 FileReader 读取状态。枚举值有 EMPTY、LOADING、DONE。 EMPTY(值为 0)表示还没有加载任何数据,LOADING(值为 1)表示数据正在加载,DONE(值为 2)表示已完成全部的读取请求 |
| result                   | 文件的内容,该属性仅在读取操作完成后才有效                                                                                                                          |
| new FileReader()         | 创建一个新的 FileReader 对象                                                                                                                                       |
| abort()                  | 中止 FileReader 读取。在返回时,readyState 属性为 DONE                                                                                                              |
| readAsArrayBuffer(blob)  | 开始读取指定的 Blob 中的内容,读取完成后,result 属性中保存的将是被读取文件的 ArrayBuffer 数据对象(result 属性返回一个包含 Blob 内容的 ArrayBuffer 对象)             |
| readAsBinaryString(blob) | 开始读取指定的 Blob 中的内容,读取完成后,result 属性中将包含所读取文件的原始二进制数据                                                                              |
| readAsDataURL(blob)      | 开始读取指定的 Blob 中的内容,读取完成后,result 属性中将包含一个 data: URL 格式的 Base64 字符串以表示所读取文件的内容,简单来说该方法用于 Blob 转 Base64 字符串      |
| readAsText(blob)         | 开始读取指定的 Blob 中的内容,读取完成后,result 属性中将包含一个字符串以表示所读取的文件内容。                                                                      |
