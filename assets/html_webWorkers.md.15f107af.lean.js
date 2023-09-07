import{_ as c,C as a,o as p,c as t,H as o,w as e,Q as y,k as s,a as l}from"./chunks/framework.a9ea851b.js";const w=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"html/webWorkers.md","filePath":"html/webWorkers.md","lastUpdated":1694073156000}'),E={name:"html/webWorkers.md"},i=y("",12),k=s("div",{class:"language-js vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"},"js"),s("pre",{class:"shiki github-dark vp-code-dark"},[s("code",null,[s("span",{class:"line"},[s("span",{style:{color:"#6A737D"}},"/**")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#6A737D"}}," * self是Web Worker环境中的全局对象,在专用工作者线程中self")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#6A737D"}}," * 是一个DedicatedWorkerGlobalScope对象。")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#6A737D"}}," *")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#6A737D"}}," * DedicatedWorkerGlobalScope{")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#6A737D"}}," *  cancelAnimationFrame:()=>{ //... },")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#6A737D"}}," *  // 用于关闭工作者线程")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#6A737D"}}," *  close(){ //... },")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#6A737D"}}," *  // 工作者线程名称")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#6A737D"}},' *  name:"",')]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#6A737D"}}," *  // 用于监听主线程通过Worker实例的PostMessage发送的数据")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#6A737D"}}," *  onmessage(){ //... },")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#6A737D"}}," *  // 当Worker收到无法反序列化的消息时触发")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#6A737D"}}," *  onmessageerror(){ //... },")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#6A737D"}}," *  // 用于向主线程发送消息,如果消息是对象则需要序列化")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#6A737D"}}," *  postMessage(){ //... },")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#6A737D"}}," * }")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#6A737D"}}," */")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#E1E4E8"}},"console."),s("span",{style:{color:"#B392F0"}},"log"),s("span",{style:{color:"#E1E4E8"}},"(self);")]),l(`
`),s("span",{class:"line"}),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#6A737D"}},"// 通过importScripts()加载多个脚本文件,importScripts()只能用于Web Worker环境中")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#B392F0"}},"importScripts"),s("span",{style:{color:"#E1E4E8"}},"("),s("span",{style:{color:"#9ECBFF"}},'"./script01.js"'),s("span",{style:{color:"#E1E4E8"}},", "),s("span",{style:{color:"#9ECBFF"}},'"./script02.js"'),s("span",{style:{color:"#E1E4E8"}},"); "),s("span",{style:{color:"#6A737D"}},'// "script01 task" "script02 task"')]),l(`
`),s("span",{class:"line"}),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#6A737D"}},"// 监听主线程使用Worker实例通过postMessage()发送数据,e是一个MessageEvent对象")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#E1E4E8"}},"self."),s("span",{style:{color:"#B392F0"}},"onmessage"),s("span",{style:{color:"#E1E4E8"}}," "),s("span",{style:{color:"#F97583"}},"="),s("span",{style:{color:"#E1E4E8"}}," ("),s("span",{style:{color:"#FFAB70"}},"e"),s("span",{style:{color:"#E1E4E8"}},") "),s("span",{style:{color:"#F97583"}},"=>"),s("span",{style:{color:"#E1E4E8"}}," {")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#E1E4E8"}},"  console."),s("span",{style:{color:"#B392F0"}},"log"),s("span",{style:{color:"#E1E4E8"}},"("),s("span",{style:{color:"#79B8FF"}},"JSON"),s("span",{style:{color:"#E1E4E8"}},"."),s("span",{style:{color:"#B392F0"}},"parse"),s("span",{style:{color:"#E1E4E8"}},"(e.data)); "),s("span",{style:{color:"#6A737D"}},"// {message: 'worker i love you!'}")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#E1E4E8"}},"};")]),l(`
`),s("span",{class:"line"}),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#6A737D"}},"// 监听Worker线程收到无法反序列化的消息时触发")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#E1E4E8"}},"self."),s("span",{style:{color:"#B392F0"}},"onmessageerror"),s("span",{style:{color:"#E1E4E8"}}," "),s("span",{style:{color:"#F97583"}},"="),s("span",{style:{color:"#E1E4E8"}}," ("),s("span",{style:{color:"#FFAB70"}},"e"),s("span",{style:{color:"#E1E4E8"}},") "),s("span",{style:{color:"#F97583"}},"=>"),s("span",{style:{color:"#E1E4E8"}}," {")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#E1E4E8"}},"  console."),s("span",{style:{color:"#B392F0"}},"log"),s("span",{style:{color:"#E1E4E8"}},"(e);")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#E1E4E8"}},"};")]),l(`
`),s("span",{class:"line"}),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F97583"}},"const"),s("span",{style:{color:"#E1E4E8"}}," "),s("span",{style:{color:"#B392F0"}},"sendMessage"),s("span",{style:{color:"#E1E4E8"}}," "),s("span",{style:{color:"#F97583"}},"="),s("span",{style:{color:"#E1E4E8"}}," () "),s("span",{style:{color:"#F97583"}},"=>"),s("span",{style:{color:"#E1E4E8"}}," {")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#E1E4E8"}},"  "),s("span",{style:{color:"#F97583"}},"const"),s("span",{style:{color:"#E1E4E8"}}," "),s("span",{style:{color:"#79B8FF"}},"data"),s("span",{style:{color:"#E1E4E8"}}," "),s("span",{style:{color:"#F97583"}},"="),s("span",{style:{color:"#E1E4E8"}}," {")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#E1E4E8"}},"    type: "),s("span",{style:{color:"#9ECBFF"}},'"worker"'),s("span",{style:{color:"#E1E4E8"}},",")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#E1E4E8"}},"    message: "),s("span",{style:{color:"#9ECBFF"}},'"hello web worker"'),s("span",{style:{color:"#E1E4E8"}},",")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#E1E4E8"}},"  };")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#E1E4E8"}},"  "),s("span",{style:{color:"#6A737D"}},"// 发送引用类型需要进行序列化,另一端需要反序列化")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#E1E4E8"}},"  "),s("span",{style:{color:"#B392F0"}},"postMessage"),s("span",{style:{color:"#E1E4E8"}},"("),s("span",{style:{color:"#79B8FF"}},"JSON"),s("span",{style:{color:"#E1E4E8"}},"."),s("span",{style:{color:"#B392F0"}},"stringify"),s("span",{style:{color:"#E1E4E8"}},"(data));")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#E1E4E8"}},"};")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#B392F0"}},"sendMessage"),s("span",{style:{color:"#E1E4E8"}},"();")])])]),s("pre",{class:"shiki github-light vp-code-light"},[s("code",null,[s("span",{class:"line"},[s("span",{style:{color:"#6A737D"}},"/**")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#6A737D"}}," * self是Web Worker环境中的全局对象,在专用工作者线程中self")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#6A737D"}}," * 是一个DedicatedWorkerGlobalScope对象。")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#6A737D"}}," *")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#6A737D"}}," * DedicatedWorkerGlobalScope{")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#6A737D"}}," *  cancelAnimationFrame:()=>{ //... },")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#6A737D"}}," *  // 用于关闭工作者线程")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#6A737D"}}," *  close(){ //... },")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#6A737D"}}," *  // 工作者线程名称")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#6A737D"}},' *  name:"",')]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#6A737D"}}," *  // 用于监听主线程通过Worker实例的PostMessage发送的数据")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#6A737D"}}," *  onmessage(){ //... },")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#6A737D"}}," *  // 当Worker收到无法反序列化的消息时触发")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#6A737D"}}," *  onmessageerror(){ //... },")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#6A737D"}}," *  // 用于向主线程发送消息,如果消息是对象则需要序列化")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#6A737D"}}," *  postMessage(){ //... },")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#6A737D"}}," * }")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#6A737D"}}," */")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#24292E"}},"console."),s("span",{style:{color:"#6F42C1"}},"log"),s("span",{style:{color:"#24292E"}},"(self);")]),l(`
`),s("span",{class:"line"}),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#6A737D"}},"// 通过importScripts()加载多个脚本文件,importScripts()只能用于Web Worker环境中")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#6F42C1"}},"importScripts"),s("span",{style:{color:"#24292E"}},"("),s("span",{style:{color:"#032F62"}},'"./script01.js"'),s("span",{style:{color:"#24292E"}},", "),s("span",{style:{color:"#032F62"}},'"./script02.js"'),s("span",{style:{color:"#24292E"}},"); "),s("span",{style:{color:"#6A737D"}},'// "script01 task" "script02 task"')]),l(`
`),s("span",{class:"line"}),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#6A737D"}},"// 监听主线程使用Worker实例通过postMessage()发送数据,e是一个MessageEvent对象")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#24292E"}},"self."),s("span",{style:{color:"#6F42C1"}},"onmessage"),s("span",{style:{color:"#24292E"}}," "),s("span",{style:{color:"#D73A49"}},"="),s("span",{style:{color:"#24292E"}}," ("),s("span",{style:{color:"#E36209"}},"e"),s("span",{style:{color:"#24292E"}},") "),s("span",{style:{color:"#D73A49"}},"=>"),s("span",{style:{color:"#24292E"}}," {")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#24292E"}},"  console."),s("span",{style:{color:"#6F42C1"}},"log"),s("span",{style:{color:"#24292E"}},"("),s("span",{style:{color:"#005CC5"}},"JSON"),s("span",{style:{color:"#24292E"}},"."),s("span",{style:{color:"#6F42C1"}},"parse"),s("span",{style:{color:"#24292E"}},"(e.data)); "),s("span",{style:{color:"#6A737D"}},"// {message: 'worker i love you!'}")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#24292E"}},"};")]),l(`
`),s("span",{class:"line"}),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#6A737D"}},"// 监听Worker线程收到无法反序列化的消息时触发")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#24292E"}},"self."),s("span",{style:{color:"#6F42C1"}},"onmessageerror"),s("span",{style:{color:"#24292E"}}," "),s("span",{style:{color:"#D73A49"}},"="),s("span",{style:{color:"#24292E"}}," ("),s("span",{style:{color:"#E36209"}},"e"),s("span",{style:{color:"#24292E"}},") "),s("span",{style:{color:"#D73A49"}},"=>"),s("span",{style:{color:"#24292E"}}," {")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#24292E"}},"  console."),s("span",{style:{color:"#6F42C1"}},"log"),s("span",{style:{color:"#24292E"}},"(e);")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#24292E"}},"};")]),l(`
`),s("span",{class:"line"}),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#D73A49"}},"const"),s("span",{style:{color:"#24292E"}}," "),s("span",{style:{color:"#6F42C1"}},"sendMessage"),s("span",{style:{color:"#24292E"}}," "),s("span",{style:{color:"#D73A49"}},"="),s("span",{style:{color:"#24292E"}}," () "),s("span",{style:{color:"#D73A49"}},"=>"),s("span",{style:{color:"#24292E"}}," {")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#24292E"}},"  "),s("span",{style:{color:"#D73A49"}},"const"),s("span",{style:{color:"#24292E"}}," "),s("span",{style:{color:"#005CC5"}},"data"),s("span",{style:{color:"#24292E"}}," "),s("span",{style:{color:"#D73A49"}},"="),s("span",{style:{color:"#24292E"}}," {")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#24292E"}},"    type: "),s("span",{style:{color:"#032F62"}},'"worker"'),s("span",{style:{color:"#24292E"}},",")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#24292E"}},"    message: "),s("span",{style:{color:"#032F62"}},'"hello web worker"'),s("span",{style:{color:"#24292E"}},",")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#24292E"}},"  };")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#24292E"}},"  "),s("span",{style:{color:"#6A737D"}},"// 发送引用类型需要进行序列化,另一端需要反序列化")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#24292E"}},"  "),s("span",{style:{color:"#6F42C1"}},"postMessage"),s("span",{style:{color:"#24292E"}},"("),s("span",{style:{color:"#005CC5"}},"JSON"),s("span",{style:{color:"#24292E"}},"."),s("span",{style:{color:"#6F42C1"}},"stringify"),s("span",{style:{color:"#24292E"}},"(data));")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#24292E"}},"};")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#6F42C1"}},"sendMessage"),s("span",{style:{color:"#24292E"}},"();")])])])],-1),d=s("div",{class:"language-html vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"},"html"),s("pre",{class:"shiki github-dark vp-code-dark"},[s("code",null,[s("span",{class:"line"},[s("span",{style:{color:"#E1E4E8"}},"<"),s("span",{style:{color:"#85E89D"}},"script"),s("span",{style:{color:"#E1E4E8"}},">")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#E1E4E8"}},"  "),s("span",{style:{color:"#6A737D"}},"/**")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#6A737D"}},"   * Worker接收执行的脚本的URL和配置项(可选)两个参数,配置项包含如下配置:")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#6A737D"}},"   * type:用以指定 worker 类型的 DOMString 值,该值可以是 classic 或 module,")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#6A737D"}},"   * 如果未指定,将使用默认值 classic。")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#6A737D"}},"   *")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#6A737D"}},"   * credentials:用以指定 worker 凭证的 DOMString 值,该值可以是 omit、")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#6A737D"}},"   * same-origin、include。如果未指定,或者type是classic,将使用默认值omit(不要求凭证)。")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#6A737D"}},"   *")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#6A737D"}},"   * name:在 DedicatedWorkerGlobalScope 的情况下,用来表示 worker 的 scope")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#6A737D"}},"   * 的一个 DOMString 值,主要用于调试目的。")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#6A737D"}},"   */")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#E1E4E8"}},"  "),s("span",{style:{color:"#F97583"}},"const"),s("span",{style:{color:"#E1E4E8"}}," "),s("span",{style:{color:"#79B8FF"}},"worker"),s("span",{style:{color:"#E1E4E8"}}," "),s("span",{style:{color:"#F97583"}},"="),s("span",{style:{color:"#E1E4E8"}}," "),s("span",{style:{color:"#F97583"}},"new"),s("span",{style:{color:"#E1E4E8"}}," "),s("span",{style:{color:"#B392F0"}},"Worker"),s("span",{style:{color:"#E1E4E8"}},"("),s("span",{style:{color:"#9ECBFF"}},'"./worker.js"'),s("span",{style:{color:"#E1E4E8"}},", { name: "),s("span",{style:{color:"#9ECBFF"}},'"worker01"'),s("span",{style:{color:"#E1E4E8"}}," });")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#E1E4E8"}},"  "),s("span",{style:{color:"#6A737D"}},"// 监听脚本文件通过postMessage()发送的数据,e是一个MessageEvent对象")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#E1E4E8"}},"  worker."),s("span",{style:{color:"#B392F0"}},"onmessage"),s("span",{style:{color:"#E1E4E8"}}," "),s("span",{style:{color:"#F97583"}},"="),s("span",{style:{color:"#E1E4E8"}}," ("),s("span",{style:{color:"#FFAB70"}},"e"),s("span",{style:{color:"#E1E4E8"}},") "),s("span",{style:{color:"#F97583"}},"=>"),s("span",{style:{color:"#E1E4E8"}}," {")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#E1E4E8"}},"    "),s("span",{style:{color:"#6A737D"}},"// {type: 'worker', message: 'hello web worker'}")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#E1E4E8"}},"    console."),s("span",{style:{color:"#B392F0"}},"log"),s("span",{style:{color:"#E1E4E8"}},"("),s("span",{style:{color:"#79B8FF"}},"JSON"),s("span",{style:{color:"#E1E4E8"}},"."),s("span",{style:{color:"#B392F0"}},"parse"),s("span",{style:{color:"#E1E4E8"}},"(e.data));")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#E1E4E8"}},"    "),s("span",{style:{color:"#6A737D"}},"// 主线程向Worker线程发送数据")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#E1E4E8"}},"    worker."),s("span",{style:{color:"#B392F0"}},"postMessage"),s("span",{style:{color:"#E1E4E8"}},"("),s("span",{style:{color:"#79B8FF"}},"JSON"),s("span",{style:{color:"#E1E4E8"}},"."),s("span",{style:{color:"#B392F0"}},"stringify"),s("span",{style:{color:"#E1E4E8"}},"({ message: "),s("span",{style:{color:"#9ECBFF"}},'"worker i love you!"'),s("span",{style:{color:"#E1E4E8"}}," }));")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#E1E4E8"}},"  };")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#E1E4E8"}},"  "),s("span",{style:{color:"#6A737D"}},"// 监听运行脚本时产生的错误,e是一个ErrorEvent对象")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#E1E4E8"}},"  worker."),s("span",{style:{color:"#B392F0"}},"onerror"),s("span",{style:{color:"#E1E4E8"}}," "),s("span",{style:{color:"#F97583"}},"="),s("span",{style:{color:"#E1E4E8"}}," ("),s("span",{style:{color:"#FFAB70"}},"e"),s("span",{style:{color:"#E1E4E8"}},") "),s("span",{style:{color:"#F97583"}},"=>"),s("span",{style:{color:"#E1E4E8"}}," {")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#E1E4E8"}},"    console."),s("span",{style:{color:"#B392F0"}},"log"),s("span",{style:{color:"#E1E4E8"}},"(e);")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#E1E4E8"}},"  };")]),l(`
`),s("span",{class:"line"}),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#E1E4E8"}},"  "),s("span",{style:{color:"#B392F0"}},"setTimeout"),s("span",{style:{color:"#E1E4E8"}},"(() "),s("span",{style:{color:"#F97583"}},"=>"),s("span",{style:{color:"#E1E4E8"}}," {")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#E1E4E8"}},"    "),s("span",{style:{color:"#6A737D"}},"// 在主线程中终止Worker线程,也可以在Worker线程调用close()关闭Worker线程")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#E1E4E8"}},"    worker."),s("span",{style:{color:"#B392F0"}},"terminate"),s("span",{style:{color:"#E1E4E8"}},"();")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#E1E4E8"}},"  }, "),s("span",{style:{color:"#79B8FF"}},"3000"),s("span",{style:{color:"#E1E4E8"}},");")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#E1E4E8"}},"</"),s("span",{style:{color:"#85E89D"}},"script"),s("span",{style:{color:"#E1E4E8"}},">")])])]),s("pre",{class:"shiki github-light vp-code-light"},[s("code",null,[s("span",{class:"line"},[s("span",{style:{color:"#24292E"}},"<"),s("span",{style:{color:"#22863A"}},"script"),s("span",{style:{color:"#24292E"}},">")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#24292E"}},"  "),s("span",{style:{color:"#6A737D"}},"/**")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#6A737D"}},"   * Worker接收执行的脚本的URL和配置项(可选)两个参数,配置项包含如下配置:")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#6A737D"}},"   * type:用以指定 worker 类型的 DOMString 值,该值可以是 classic 或 module,")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#6A737D"}},"   * 如果未指定,将使用默认值 classic。")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#6A737D"}},"   *")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#6A737D"}},"   * credentials:用以指定 worker 凭证的 DOMString 值,该值可以是 omit、")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#6A737D"}},"   * same-origin、include。如果未指定,或者type是classic,将使用默认值omit(不要求凭证)。")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#6A737D"}},"   *")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#6A737D"}},"   * name:在 DedicatedWorkerGlobalScope 的情况下,用来表示 worker 的 scope")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#6A737D"}},"   * 的一个 DOMString 值,主要用于调试目的。")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#6A737D"}},"   */")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#24292E"}},"  "),s("span",{style:{color:"#D73A49"}},"const"),s("span",{style:{color:"#24292E"}}," "),s("span",{style:{color:"#005CC5"}},"worker"),s("span",{style:{color:"#24292E"}}," "),s("span",{style:{color:"#D73A49"}},"="),s("span",{style:{color:"#24292E"}}," "),s("span",{style:{color:"#D73A49"}},"new"),s("span",{style:{color:"#24292E"}}," "),s("span",{style:{color:"#6F42C1"}},"Worker"),s("span",{style:{color:"#24292E"}},"("),s("span",{style:{color:"#032F62"}},'"./worker.js"'),s("span",{style:{color:"#24292E"}},", { name: "),s("span",{style:{color:"#032F62"}},'"worker01"'),s("span",{style:{color:"#24292E"}}," });")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#24292E"}},"  "),s("span",{style:{color:"#6A737D"}},"// 监听脚本文件通过postMessage()发送的数据,e是一个MessageEvent对象")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#24292E"}},"  worker."),s("span",{style:{color:"#6F42C1"}},"onmessage"),s("span",{style:{color:"#24292E"}}," "),s("span",{style:{color:"#D73A49"}},"="),s("span",{style:{color:"#24292E"}}," ("),s("span",{style:{color:"#E36209"}},"e"),s("span",{style:{color:"#24292E"}},") "),s("span",{style:{color:"#D73A49"}},"=>"),s("span",{style:{color:"#24292E"}}," {")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#24292E"}},"    "),s("span",{style:{color:"#6A737D"}},"// {type: 'worker', message: 'hello web worker'}")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#24292E"}},"    console."),s("span",{style:{color:"#6F42C1"}},"log"),s("span",{style:{color:"#24292E"}},"("),s("span",{style:{color:"#005CC5"}},"JSON"),s("span",{style:{color:"#24292E"}},"."),s("span",{style:{color:"#6F42C1"}},"parse"),s("span",{style:{color:"#24292E"}},"(e.data));")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#24292E"}},"    "),s("span",{style:{color:"#6A737D"}},"// 主线程向Worker线程发送数据")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#24292E"}},"    worker."),s("span",{style:{color:"#6F42C1"}},"postMessage"),s("span",{style:{color:"#24292E"}},"("),s("span",{style:{color:"#005CC5"}},"JSON"),s("span",{style:{color:"#24292E"}},"."),s("span",{style:{color:"#6F42C1"}},"stringify"),s("span",{style:{color:"#24292E"}},"({ message: "),s("span",{style:{color:"#032F62"}},'"worker i love you!"'),s("span",{style:{color:"#24292E"}}," }));")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#24292E"}},"  };")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#24292E"}},"  "),s("span",{style:{color:"#6A737D"}},"// 监听运行脚本时产生的错误,e是一个ErrorEvent对象")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#24292E"}},"  worker."),s("span",{style:{color:"#6F42C1"}},"onerror"),s("span",{style:{color:"#24292E"}}," "),s("span",{style:{color:"#D73A49"}},"="),s("span",{style:{color:"#24292E"}}," ("),s("span",{style:{color:"#E36209"}},"e"),s("span",{style:{color:"#24292E"}},") "),s("span",{style:{color:"#D73A49"}},"=>"),s("span",{style:{color:"#24292E"}}," {")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#24292E"}},"    console."),s("span",{style:{color:"#6F42C1"}},"log"),s("span",{style:{color:"#24292E"}},"(e);")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#24292E"}},"  };")]),l(`
`),s("span",{class:"line"}),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#24292E"}},"  "),s("span",{style:{color:"#6F42C1"}},"setTimeout"),s("span",{style:{color:"#24292E"}},"(() "),s("span",{style:{color:"#D73A49"}},"=>"),s("span",{style:{color:"#24292E"}}," {")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#24292E"}},"    "),s("span",{style:{color:"#6A737D"}},"// 在主线程中终止Worker线程,也可以在Worker线程调用close()关闭Worker线程")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#24292E"}},"    worker."),s("span",{style:{color:"#6F42C1"}},"terminate"),s("span",{style:{color:"#24292E"}},"();")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#24292E"}},"  }, "),s("span",{style:{color:"#005CC5"}},"3000"),s("span",{style:{color:"#24292E"}},");")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#24292E"}},"</"),s("span",{style:{color:"#22863A"}},"script"),s("span",{style:{color:"#24292E"}},">")])])])],-1),W=s("div",{class:"language-js vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"},"js"),s("pre",{class:"shiki github-dark vp-code-dark"},[s("code",null,[s("span",{class:"line"},[s("span",{style:{color:"#E1E4E8"}},"console."),s("span",{style:{color:"#B392F0"}},"log"),s("span",{style:{color:"#E1E4E8"}},"("),s("span",{style:{color:"#9ECBFF"}},'"script01 task"'),s("span",{style:{color:"#E1E4E8"}},");")])])]),s("pre",{class:"shiki github-light vp-code-light"},[s("code",null,[s("span",{class:"line"},[s("span",{style:{color:"#24292E"}},"console."),s("span",{style:{color:"#6F42C1"}},"log"),s("span",{style:{color:"#24292E"}},"("),s("span",{style:{color:"#032F62"}},'"script01 task"'),s("span",{style:{color:"#24292E"}},");")])])])],-1),g=s("div",{class:"language-js vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"},"js"),s("pre",{class:"shiki github-dark vp-code-dark"},[s("code",null,[s("span",{class:"line"},[s("span",{style:{color:"#E1E4E8"}},"console."),s("span",{style:{color:"#B392F0"}},"log"),s("span",{style:{color:"#E1E4E8"}},"("),s("span",{style:{color:"#9ECBFF"}},'"script02 task"'),s("span",{style:{color:"#E1E4E8"}},");")])])]),s("pre",{class:"shiki github-light vp-code-light"},[s("code",null,[s("span",{class:"line"},[s("span",{style:{color:"#24292E"}},"console."),s("span",{style:{color:"#6F42C1"}},"log"),s("span",{style:{color:"#24292E"}},"("),s("span",{style:{color:"#032F62"}},'"script02 task"'),s("span",{style:{color:"#24292E"}},");")])])])],-1);function D(A,F,m,h,b,C){const n=a("CodeGroupItem"),r=a("CodeGroup");return p(),t("div",null,[i,o(r,null,{default:e(()=>[o(n,{title:"worker.js",active:""},{default:e(()=>[k]),_:1}),o(n,{title:"index.html"},{default:e(()=>[d]),_:1}),o(n,{title:"script01.js"},{default:e(()=>[W]),_:1}),o(n,{title:"script02.js"},{default:e(()=>[g]),_:1})]),_:1})])}const S=c(E,[["render",D]]);export{w as __pageData,S as default};
