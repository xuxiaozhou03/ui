# vant-weapp 组件迁移 Vue3 `<script setup lang="ts">` 指南

---

## 1. Props 相关

- **props 转换**：用 `defineProps({ ... })`，保留 type、required、default，确保类型推断和默认值。
- **classes 转 props**：原 `classes: ['xxx-class']` 变为 props（如 `xxxClass: String`），模板用 `:class="cn(xxxClass)"`。
- **customClass/customStyle 统一**：通过 `...commonProps` 合并到 `defineProps`，无需重复声明，模板用 `:class="cn('van-xxx', customClass)"`，`:style="rootStyle"`。
- **props 类型精确化**：所有 props 字段类型尽量精确，避免 any/null。
- **props.ts 强制要求**：所有组件 props 必须单独抽离到同级目录的 `props.ts`，并导出 props 对象和类型，组件内用类型导入。

  示例：

  ```ts
  // props.ts
  import { commonProps } from "../../utils";
  import type { PropType, ExtractPropTypes } from "vue";
  export const buttonProps = { ...commonProps /* 其他 props */ };
  export type ButtonProps = ExtractPropTypes<typeof buttonProps>;
  ```

  组件中：

  ```ts
  import { buttonProps } from "./props";
  const props = defineProps(buttonProps); // 推荐：这样类型推断和运行时校验、默认值都生效
  ```

## 2. 样式与 class

- **动态类名合并**：所有动态 class 合并用 `cn` 工具函数包裹，`bem` 参数结构与 vant-weapp 保持一致。
- **样式保留**：原样式可直接放 `<style>`，禁止全局 wxss 导入，样式应局部隔离。
- **computed 样式类型**：所有 computed 样式（如 `rootStyle`）返回 `CSSProperties` 类型对象。
- **模板中 :style 绑定**：`:style` 绑定对象类型必须为 `CSSProperties`，避免字符串拼接。

  推荐写法：

  ```ts
  import type { CSSProperties } from "vue";
  import { commonProps } from "../../utils";
  const props = defineProps({ ...commonProps /* ... */ });
  const rootStyle = computed<CSSProperties>(() => ({
    color: props.textColor,
    fontSize: props.fontSize,
    ...props.customStyle,
  }));
  ```

## 3. 事件与方法

- **事件定义**：用 `defineEmits` 明确声明所有事件类型。
- **方法转换**：methods 里的方法改为普通函数，直接在 `<script setup>` 作用域下声明，事件触发用 emit。
- **this 替换**：所有 `this.xxx` 替换为 `props.xxx` 或变量名，事件用 emit，数据响应式用 ref/computed。

## 4. 模板与组件引用

- **模板语法调整**：小程序语法（如 `wx:if`、`bind:tap`）替换为 Vue3 语法（如 `v-if`、`@click`），所有 class 合并用 `cn`。
- **组件引用**：usingComponents 里的组件用 import 方式引入并注册，推荐 props 单独抽离。

## 5. 其他最佳实践

- **类型安全**：props、emit、方法参数、computed、ref 等都加上 TS 类型声明。
- **默认值处理**：有 default 的 props，务必在 defineProps 里用 default 字段声明，数组/对象类型用函数返回。
- **通用 props 合并**：如有通用 props（如 commonProps），用 `...commonProps` 合并到 defineProps。
- **wxs/computed 逻辑**：wxs 工具函数直接写在 computed 或函数体内，类型声明为 TS 类型。
- **relation 关系迁移**：父组件用 `useProvide` 提供数据和方法，子组件用 `useInject` 获取，实现父子响应式通信。

---

**迁移后优势**：  
支持灵活 class 合并、props/事件类型安全、模板现代化、样式和通用属性复用，完全符合 Vue3 组件最佳实践。
