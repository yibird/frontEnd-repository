export default [
   {
     text:"指南",
     link: '/foo/',
     children: [
        // SidebarItem
      {
        text: 'github',
        link: 'https://github.com',
        children: [],
      },
        // 字符串 - 页面文件路径
      '/foo/bar.md',
      ],
   },
   {
     text:"JavaScript",
     // link: '/foo/',
     children: [
       {
          text: '类型(Type)',
          link: '/js/type.md',
          children: [],
       },
       {
          text: '数组(Array)',
          link: '/js/array.md',
          children: [],
       },
     ]
   }
]