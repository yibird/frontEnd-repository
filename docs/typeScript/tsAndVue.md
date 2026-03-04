## TypeScript 与 Vue3 结合

## 定义组件

在 Vue3 中支持 defineComponent 等 Composition API 和 `setup` 语法糖两种方式来定义组件,Vue 对 `setup` 语法糖的 TS 支持非常友好,提供内置宏来定义 Props(或 Props 默认值)、Emits 等组件配置,而 defineComponent 定义复杂类型的 Props 时,通常借助 Vue 的内置的工具`PropType`进行类型断言。

<CodeGroup>
<CodeGroupItem title="defineComponent定义组件" active>

```vue
<script lang="ts">
  import { defineComponent, PropType, Component } from 'vue'
  export default defineComponent({
    props: {
      name: {
        type: String,
        required: true,
      },
      data: {
        type: Array as PropType<Array<Record<string, any>>>,
        default: () => [],
      },
      footer: {
        type: Object as PropType<Component>,
        default: () => {},
      },
    },
    emits: {
      add(obj: Record<string, any>) {},
      del(id: number) {},
      update(name: string) {},
    },
    setup(props, ctx) {
      return {}
    },
    components: {},
  })
</script>
```

</CodeGroupItem>
<CodeGroupItem title="setup定义组件">

```vue
<script setup lang="ts">
  import { Component } from 'vue'
  /**
   * withDefaults()用于defineProps声明时提供Props默认值。
   * defineProps()用于定义组件的Props。
   * defineEmits()用于定义组件的emit事件。
   *
   * 在setup语法中 withDefaults、defineProps、defineEmits都不需要显式导入。
   */
  interface Props {
    title: string
    data?: Array<Record<string, any>>
    footer?: Component
  }
  interface Emits {
    add: (obj: Record<string, any>) => void
    del: (id: number) => void
    update: (name: string) => void
  }
  const props = withDefaults(defineProps<Props>(), {
    data: () => [],
    footer: () => {},
  })
  const emits = defineEmits<Emits>()
</script>
```

</CodeGroupItem>
</CodeGroup>
