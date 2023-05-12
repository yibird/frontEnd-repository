export default {
  text: "构建工具",
  collapsible: true,
  collapsed: true,
  items: [
    {
      text: "Webpack",
      link: "/buildTools/webpack/base.md",
      items: [
        {
          text: "Webpack基础",
          link: "/buildTools/webpack/base.md",
        },
        {
          text: "Webpack实践",
          link: "/buildTools/webpack/use.md",
        },
        {
          text: "Loader",
          link: "/buildTools/webpack/loader.md",
        },
        {
          text: "Plugin",
          link: "/buildTools/webpack/plugin.md",
        },
        {
          text: "Webpack 优化",
          link: "/buildTools/webpack/optimization.md",
        },
      ],
    },
    {
      text: "Vite",
      items: [
        {
          text: "Vite基础",
          link: "/buildTools/vite/base.md",
        },
        {
          text: "Plugin",
          link: "/buildTools/vite/plugin.md",
        },
        {
          text: "Vite优化",
          link: "/buildTools/vite/optimization.md",
        },
      ],
    },
  ],
};
