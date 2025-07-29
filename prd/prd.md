# vant 组件库 uni-app + Vue3 + TypeScript + <script setup> 迁移方案

## 目标

将 `app/src/uni_modules/vant` 下所有小程序组件，迁移为基于 uni-app、Vue 3、TypeScript、<script setup> 语法的组件库，支持 Web、App、小程序等多端。

## 主要改造点

1. **模板语法迁移**

   - 移除 `<wxs>`、`wx:if`、`wx:else` 等小程序语法，统一为 Vue 3 `<template>` 语法。
   - 事件绑定改为 `@click`、`:class`、`:style` 等 Vue 3/uni-app 语法。
   - 兼容 uni-app 平台指令（如 v-show、v-if、v-for 等）。

2. **组件逻辑迁移**

   - `props`、`emits` 用 `<script setup lang="ts">` 语法声明。
   - 组件逻辑全部采用 Composition API，推荐 <script setup> 语法糖。
   - 支持 TypeScript 类型推导和类型安全。
   - 小程序 API 替换为 uni-app 跨端 API 或 Web 端等价实现。

3. **样式迁移**

   - 保留原有 CSS，按需调整类名，确保样式隔离。
   - 统一采用样式隔离方案（如 scoped），不使用 CSS Modules。
   - 组件内所有 style 属性必须为 TypeScript 的 CSSProperties 格式，禁止字符串拼接 style。
   - 支持 uni-app 平台样式变量和响应式单位（如 rpx、upx）。

4. **依赖与工具**

   - 移除小程序专用依赖，按需引入 Vue 3 生态依赖。
   - 支持按需引入和 tree-shaking。

5. **目录结构**

   - 每个组件独立文件夹，结构如下：
     - `xx.vue`（主组件，xx 为组件名，使用<script setup lang="ts">）
     - `props.ts`（props 类型定义与默认值）
     - `demo.vue`（组件用法示例）
   - 提供统一入口 `index.ts` 导出所有组件，支持按需引入。

6. **测试与文档**
   - 增加基于 Vite/Playwright 的单元测试和 Storybook/HBuilderX 文档。

## 迁移步骤

1. 批量转换模板和脚本为 Vue 3 格式。
2. 替换/重构小程序专用逻辑。
3. 样式适配与优化。
4. 编写测试用例与文档。
5. 发布 npm 包，支持主流前端框架集成。

---

如需具体组件迁移示例或自动化脚本，可进一步细化。
