import{_ as a,o as e,c as t,O as r}from"./chunks/framework.0b8e562d.js";const m=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"engineering/babel/useCase.md","filePath":"engineering/babel/useCase.md","lastUpdated":1684845191000}'),i={name:"engineering/babel/useCase.md"},n=r('<h2 id="_1-插入函数调用参数" tabindex="-1">1.插入函数调用参数 <a class="header-anchor" href="#_1-插入函数调用参数" aria-label="Permalink to &quot;1.插入函数调用参数&quot;">​</a></h2><h2 id="_2-自动埋点" tabindex="-1">2.自动埋点 <a class="header-anchor" href="#_2-自动埋点" aria-label="Permalink to &quot;2.自动埋点&quot;">​</a></h2><p>埋点是指在应用程序或网站中插入追踪代码,以便收集和记录用户行为和信息的过程。埋点通常用于收集数据、进行数据分析和优化用户体验等。当用户在应用程序或网站上进行操作时,埋点代码会自动触发并记录用户的行为和信息,例如页面浏览次数、点击次数、购买行为等等。在开发中通常会有函数执行耗时等埋点需求,通常做法是手动编码在函数执行前后执行(也可以通过装饰器实现)进行统计,这种相对比较繁琐,无法实现自动埋点。此时可以通过 Babel 来实现自动的函数插桩从而完成自动埋点。</p><h2 id="_3-自动国际化" tabindex="-1">3.自动国际化 <a class="header-anchor" href="#_3-自动国际化" aria-label="Permalink to &quot;3.自动国际化&quot;">​</a></h2><h2 id="_4-根据-js-注释自动生成-api-文档" tabindex="-1">4.根据 JS 注释自动生成 API 文档 <a class="header-anchor" href="#_4-根据-js-注释自动生成-api-文档" aria-label="Permalink to &quot;4.根据 JS 注释自动生成 API 文档&quot;">​</a></h2><h2 id="_5-实现-linter" tabindex="-1">5.实现 Linter <a class="header-anchor" href="#_5-实现-linter" aria-label="Permalink to &quot;5.实现 Linter&quot;">​</a></h2><h2 id="_6-实现类型检查" tabindex="-1">6.实现类型检查 <a class="header-anchor" href="#_6-实现类型检查" aria-label="Permalink to &quot;6.实现类型检查&quot;">​</a></h2><h2 id="_7-实现代码压缩混淆" tabindex="-1">7.实现代码压缩混淆 <a class="header-anchor" href="#_7-实现代码压缩混淆" aria-label="Permalink to &quot;7.实现代码压缩混淆&quot;">​</a></h2><h2 id="_8-实现-js-解释器" tabindex="-1">8.实现 JS 解释器 <a class="header-anchor" href="#_8-实现-js-解释器" aria-label="Permalink to &quot;8.实现 JS 解释器&quot;">​</a></h2><h2 id="_9-实现模块遍历" tabindex="-1">9.实现模块遍历 <a class="header-anchor" href="#_9-实现模块遍历" aria-label="Permalink to &quot;9.实现模块遍历&quot;">​</a></h2>',10),o=[n];function l(s,h,_,d,c,u){return e(),t("div",null,o)}const q=a(i,[["render",l]]);export{m as __pageData,q as default};