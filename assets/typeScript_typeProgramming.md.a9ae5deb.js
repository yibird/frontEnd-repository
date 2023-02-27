import{_ as s,c as a,o as n,a as l}from"./app.352f6789.js";const A=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[{"level":2,"title":"数组相关类型工具","slug":"数组相关类型工具","link":"#数组相关类型工具","children":[{"level":3,"title":"获取数组第一个元素类型","slug":"获取数组第一个元素类型","link":"#获取数组第一个元素类型","children":[]}]}],"relativePath":"typeScript/typeProgramming.md","lastUpdated":1677480774000}'),o={name:"typeScript/typeProgramming.md"},p=l(`<h2 id="数组相关类型工具" tabindex="-1">数组相关类型工具 <a class="header-anchor" href="#数组相关类型工具" aria-hidden="true">#</a></h2><h3 id="获取数组第一个元素类型" tabindex="-1">获取数组第一个元素类型 <a class="header-anchor" href="#获取数组第一个元素类型" aria-hidden="true">#</a></h3><details class="details custom-block"><summary>基于 const 断言+索引类型</summary><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#676E95;font-style:italic;">// const断言后arr的类型为 readonly [&quot;haha&quot;, 123]</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> arr </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> [</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">haha</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">123</span><span style="color:#A6ACCD;">] </span><span style="color:#89DDFF;font-style:italic;">as</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">const</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// type ArrFirst = &quot;haha&quot;</span></span>
<span class="line"><span style="color:#C792EA;">type</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ArrFirst</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">typeof</span><span style="color:#A6ACCD;"> arr[</span><span style="color:#F78C6C;">0</span><span style="color:#A6ACCD;">]</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span></code></pre></div></details><details class="details custom-block"><summary>基于 const 断言+infer 关键字</summary><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#676E95;font-style:italic;">/*</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> * 思路:根据ES6的数组解构方法获取数组首个元素,</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> * 通过infer关键字推断首个元素类型。</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> */</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// const断言后arr的类型为 readonly [&quot;haha&quot;, 123]</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> arr </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> [</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">haha</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">123</span><span style="color:#A6ACCD;">] </span><span style="color:#89DDFF;font-style:italic;">as</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">const</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> * T为传入的数组类型,如果T可赋值为readonly [infer F, ...infer O],则通过ES6数组解构</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> * 首个元素和剩余元素,再通过infer关键字推断首个元素类型为F,最终返回F,否则返回any。</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> */</span></span>
<span class="line"><span style="color:#C792EA;">type</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">First</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">T</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">T</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">extends</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">readonly</span><span style="color:#A6ACCD;"> [</span><span style="color:#89DDFF;">infer</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">F</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">...infer</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">O</span><span style="color:#A6ACCD;">] </span><span style="color:#89DDFF;">?</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">F</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">any</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// type ArrFirst = &quot;haha&quot;</span></span>
<span class="line"><span style="color:#C792EA;">type</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ArrFirst</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">First</span><span style="color:#89DDFF;">&lt;typeof</span><span style="color:#A6ACCD;"> arr</span><span style="color:#89DDFF;">&gt;;</span></span>
<span class="line"></span></code></pre></div></details>`,4),t=[p];function e(c,r,y,i,C,D){return n(),a("div",null,t)}const d=s(o,[["render",e]]);export{A as __pageData,d as default};