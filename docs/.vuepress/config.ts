import type { DefaultThemeOptions } from '@vuepress/theme-default'
import { defineUserConfig } from '@vuepress/cli'

import { navbar, sidebar } from './configs'


export default defineUserConfig<DefaultThemeOptions>({
    base: '/frontEnd-repository/',
    title:"前端知识库",
    description:"路漫漫其修远兮,吾将上下而求索!",
    head: [
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: `https://github.com/vuepress/vuepress-next/blob/a7ecb0038dc3dce7b72810729d193bdd70525f99/docs/.vuepress/public/images/icons/favicon-16x16.png`,
      },
    ]
  ],
  themeConfig:{
    locales:{
      "/":{
        navbar,
        sidebar
      }
    }
  },
   
});