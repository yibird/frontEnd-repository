import { defineConfig } from "vitepress";
import sidebar from "./sidebar";

const head = [
  [
    "link",
    { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
  ],
];

const footer = {
  message: "Released under the MIT License.",
  copyright: "Copyright © 2019-present zchengfeng",
};

// 社交链接
const socialLinks=[
  { icon: "github",link: "https://github.com/vuejs/vitepress" },
  { icon: "twitter", link: "..." },
];

// 主题
const themeConfig = {
  logo: "/assets/images/logo.jpg",
  siteTitle: "前端知识库",
  sidebar,
  socialLinks,
  outlineTitle: "文章大纲",
  footer,
};



export default defineConfig({
  //   base: "../",
  title: "前端学习路线",
  description: "一个前端知识库",
  head,
  themeConfig,
  
   
  lastUpdated: true,
  ignoreDeadLinks: true,
});
