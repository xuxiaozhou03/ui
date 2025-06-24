# vant-weapp 组件迁移 Vue3 `<script setup lang="ts">` 详细 Prompt

1. **props 转换**  
   将原 props 配置转为 `defineProps({ ... })` 形式，保留 type、required、default 等属性，确保类型推断和默认值都生效。

2. **classes 转 props**  
   将原 `classes: ['xxx-class']` 变为 props（如 `xxxClass: String`），并在 template 中用 `:class="cn(xxxClass)"` 绑定，支持外部自定义 class。

3. **custom-class/customStyle 统一用 commonProps**  
   组件的 `customClass`、`customStyle` 不需单独声明，直接通过 `...commonProps` 合并到 `defineProps`，类型安全且全局一致：

   ```ts
   import { commonProps } from "../../utils";
   const props = defineProps({
     ...commonProps,
     // 其他 props
   });
   ```

   - `commonProps` 已包含：
     ```ts
     customClass: { type: String, default: '' },
     customStyle: { type: Object as PropType<CSSProperties>, default: () => ({}) },
     ```
   - 模板中直接用 `:class="cn('van-xxx', customClass)"`，`:style="rootStyle"`，无需重复声明。

4. **动态类名合并**  
   所有动态 class 合并都用 `cn` 工具函数包裹（如 `:class="cn(bem('xxx', [type, size, { block, round }]), item.className)"`），`bem` 的参数和结构应与原 vant-weapp 保持一致，保证灵活性和可扩展性。

5. **事件定义**  
   用 `defineEmits` 明确声明所有事件类型，便于 IDE 智能提示和类型检查。

6. **方法转换**  
   将 methods 里的每个方法都改为普通的函数（function 或 const + 箭头函数），直接在 `<script setup>` 作用域下声明，事件触发用 emit。

7. **this 替换**  
   所有 `this.xxx` 替换为 `props.xxx` 或直接变量名，事件用 emit，数据响应式用 ref/computed。

8. **模板语法调整**  
   将小程序模板语法（如 `wx:if`、`bind:tap`、`class="{{...}}"`、`wx:for`）替换为 Vue3 语法（如 `v-if`、`@click`、`:class="..."`、`v-for`），并用 v-if、v-else、v-show 等标准指令，所有 class 合并用 `cn` 工具。

9. **组件引用与 props 结构**

   - 将 usingComponents 里的组件用 import 方式引入，并在 `<script setup>` 里注册（如需全局注册可忽略），推荐类型安全的 import 路径。
   - 推荐将 `defineProps` 的内容（即 props 对象）单独抽离到同级目录的 `props.ts` 文件，命名为 `xxxProps`（xxx 为组件名小驼峰且不带 van 前缀），并同时导出 props 的类型定义，便于类型复用和团队协作：
     ```ts
     // props.ts
     import { commonProps } from "../../utils";
     import type { PropType, ExtractPropTypes } from "vue";
     export const buttonProps = {
       ...commonProps,
       // 其他 props
     };
     export type ButtonProps = ExtractPropTypes<typeof buttonProps>;
     ```
     在组件中：
     ```ts
     import { buttonProps, type ButtonProps } from "./props";
     const props = defineProps<ButtonProps>();
     ```
   - 这样可实现 props 类型的集中管理、自动类型推断和多组件复用。

**props.ts 拆分强制要求**
所有组件的 props 对象（即 defineProps 的参数）必须单独抽离到同级目录的 props.ts 文件，并导出 props 对象和类型。例如：

```ts
// props.ts
import { commonProps } from "../../utils";
import type { PropType, ExtractPropTypes } from "vue";
export const radioGroupProps = {
  ...commonProps,
  value: { type: null, default: undefined },
  direction: String,
  disabled: { type: Boolean, default: false },
};
export type RadioGroupProps = ExtractPropTypes<typeof radioGroupProps>;
```

组件中必须这样用：

```ts
import { radioGroupProps, type RadioGroupProps } from "./props";
const props = defineProps<RadioGroupProps>();
```

这样可确保 props 结构统一、类型安全、便于团队协作和自动化迁移。

10. **样式保留**  
    原样式可直接放在 `<style>`。**注意：禁止 `@import "../common/index.wxss";` 等全局 wxss，避免全局样式污染，所有样式应局部隔离。**

11. **wxs/computed 逻辑**  
    如有 wxs 工具函数，直接写在 computed 或函数体内，或用 computed 包裹，类型声明为 TS 类型，返回值类型安全。

12. **类型安全**  
    props、emit、方法参数、computed、ref 等都加上 TypeScript 类型声明，提升类型安全和开发体验。

13. **默认值处理**  
    所有有 default 的 props，务必在 defineProps({ ... }) 里用 default 字段声明，数组/对象类型用函数返回，类型推断完整。

14. **通用 props 合并**  
    如有通用 props（如 commonProps），用 `...commonProps` 合并到 defineProps，避免重复声明。

15. **computed 样式类型**  
    所有通过 computed 计算出来的样式（如 `rootStyle`、`sizeStyle` 等）都应返回 `CSSProperties` 类型对象，确保类型安全和 IDE 智能提示。

16. **模板中 :style 绑定**  
    组件模板中 `:style` 绑定的对象类型必须为 `CSSProperties`，避免字符串拼接式 style，推荐所有样式都用对象合并。

    推荐写法：

    ```ts
    import type { CSSProperties } from "vue";
    import { commonProps } from "../../utils";

    const props = defineProps({
      ...commonProps,
      // ...
    });

    const rootStyle = computed<CSSProperties>(() => ({
      color: props.textColor,
      fontSize: props.fontSize,
      ...props.customStyle,
    }));
    ```

17. **relation 关系迁移**
    relation 场景下，父组件用 `useProvide` 提供数据和方法，子组件用 `useInject` 获取和使用父组件的数据与方法，实现父子响应式通信。

---

这样迁移后，组件将支持灵活 class 合并、props/事件类型安全、模板现代化、样式和通用属性复用，完全符合 Vue3 组件最佳实践。
