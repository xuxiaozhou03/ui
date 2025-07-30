# vant 组件库 uni-app + Vue3 + TypeScript + <script setup> 迁移方案

## 一、目标

将 `app/src/uni_modules/vant` 下已有的所有微信小程序组件，仅转换为基于 uni-app、Vue 3、TypeScript、<script setup> 语法的组件库，支持 Web、App、小程序等多端，无需新建组件，仅做语法和逻辑迁移。

## 二、技术选型与目录结构

- **技术栈**：uni-app + Vue 3 + TypeScript + <script setup> + Composition API
- **目录结构**：
  - 组件已全部位于 `app/src/uni_modules/vant` 下，每个组件为独立文件夹
  - `xx.vue`：主组件，使用 `<script setup lang="ts">`
  - `demo.vue`：组件用法示例

## 三、迁移要点

1. **模板语法**：
   - 仅将微信小程序语法（如 `<wxs>`、`wx:if`、`wx:else` 等）转换为 Vue 3 `<template>` 语法
   - 事件、指令统一用 Vue/uni-app 语法（如 `@click`、`:class`、`v-if` 等）
2. **组件逻辑**：
   - 仅将微信小程序写法迁移为 `<script setup lang="ts">`，全部采用 Composition API
   - `props`、`emits` 用 TypeScript 声明，支持类型推导和类型安全，props 推荐使用 `{ type:xx, default?:xx }` 格式声明。能明确类型的 props 不要用 string 等泛类型，应使用联合字面量类型（如 'circular' | 'spinner'）。所有 `xx-class` 相关属性需作为 props 传递。非必填的 string 类型 props 不建议设置 default。
   - 小程序 API 替换为 uni-app 跨端 API 或 Web 端等价实现
   - `addUnit` 工具函数统一通过 `import { addUnit } from '../../utils'` 引入，禁止本地实现
3. **样式**：
   - 保留/适配原有 CSS，确保样式隔离（scoped），移除 @import '../common/index.wxss'
   - style 属性用 TypeScript 的 CSSProperties，禁止字符串拼接，`customStyle` 只能为 CSSProperties 类型，不能为字符串
   - 支持 uni-app 响应式单位（rpx、upx）
4. **依赖与工具**：
   - 移除小程序专用依赖，按需引入 Vue 3 生态依赖
   - 支持 tree-shaking
5. **测试与文档**：
   - 增加基于 Vite/Playwright 的单元测试
   - Storybook/HBuilderX 组件文档

## 四、自动化与发布

1. 批量转换微信小程序模板和脚本为 Vue 3/uni-app/TypeScript 格式
2. 替换/重构小程序专用逻辑
3. 样式适配与优化
4. 编写测试用例与文档
5. 发布 npm 包，支持主流前端框架集成

## 五、特殊场景与补充说明

1. **插槽与作用域插槽**：
   - 明确 slot、scoped-slot 的迁移方式，统一用 Vue 3 slot 语法，支持具名插槽和作用域插槽。
2. **国际化（i18n）**：
   - 如有多语言需求，建议统一采用 vue-i18n 或 uni-app 国际化方案，迁移原有多语言逻辑。
3. **动画与过渡**：
   - 动画与过渡需组件自行实现，不使用 Vue/uni-app 的 `<transition>`、`<transition-group>`，可用 JS/CSS 动画方案，兼容多端。
4. **第三方依赖**：
   - 如组件依赖小程序专用第三方库，需评估替换为 Web/uni-app 生态等价库，或自行实现。
5. **平台差异与兼容性**：
   - 针对 uni-app 平台特有 API 或兼容性问题，需有兜底方案或条件编译处理。
6. **性能优化**：
   - 涉及虚拟列表、懒加载等场景，建议采用 Vue 3/uni-app 推荐方案，关注响应式性能。
7. **自动化工具链**：
   - 推荐使用 AST 脚本、正则、lint 规则等工具批量辅助迁移，提升效率和一致性。
8. **CI/CD 与发布流程**：
   - 建议集成自动化测试、构建、npm 发布、版本管理等流程，保障质量和可持续集成。
9. **组件依赖关系与通信**：
   - 涉及复杂组件通信（如 provide/inject、事件总线等），需明确迁移为 Vue 3 推荐模式。

如需具体组件迁移示例、自动化脚本或上述特殊场景的详细方案，可进一步细化。
