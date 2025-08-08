# Vant 组件库微信小程序到 Vue3 + TypeScript + uni-app 转换 PRD

## 项目概述

将 Vant Weapp 微信小程序组件库完整转换为基于 Vue3 + TypeScript + uni-app + Composition API (setup) 的跨平台组件库，保持功能一致性的同时提供更好的开发体验。

## 目标和愿景

### 主要目标

- 保持组件功能和 API 完全一致
- 提供完整的 TypeScript 类型支持
- 支持 uni-app 跨平台特性
- 采用 Vue3 Composition API (setup 语法糖)
- 保持原有样式和交互体验

### 技术愿景

- 现代化的组件开发模式
- 更好的类型安全
- 更优的性能表现
- 更灵活的组合式 API

## 当前状态分析

### 已转换组件数量

根据 `app/src/uni_modules/vant/components` 目录分析，当前包含 **67 个组件**：

#### 基础组件 (12 个)

- van-button (按钮)
- van-cell (单元格)
- van-cell-group (单元格组)
- van-col (布局列)
- van-row (布局行)
- van-icon (图标)
- van-image (图片)
- van-popup (弹出层)
- van-transition (动画)
- van-overlay (遮罩层)
- van-loading (加载)
- van-divider (分割线)

#### 表单组件 (14 个)

- van-field (输入框)
- van-checkbox (复选框)
- van-checkbox-group (复选框组)
- van-radio (单选框)
- van-radio-group (单选框组)
- van-switch (开关)
- van-stepper (步进器)
- van-rate (评分)
- van-slider (滑块)
- van-uploader (文件上传)
- van-picker (选择器)
- van-picker-column (选择器列)
- van-datetime-picker (日期时间选择)
- van-cascader (级联选择)

#### 反馈组件 (8 个)

- van-dialog (对话框)
- van-toast (轻提示)
- van-notify (消息通知)
- van-action-sheet (动作面板)
- van-share-sheet (分享面板)
- van-loading (加载)
- van-empty (空状态)
- van-skeleton (骨架屏)

#### 展示组件 (14 个)

- van-card (商品卡片)
- van-tag (标签)
- van-progress (进度条)
- van-circle (环形进度条)
- van-count-down (倒计时)
- van-notice-bar (通知栏)
- van-panel (面板)
- van-collapse (折叠面板)
- van-collapse-item (折叠面板项)
- van-steps (步骤条)
- van-calendar (日历)
- van-info (徽标)
- van-tree-select (分类选择)
- van-area (省市区选择)

#### 导航组件 (8 个)

- van-nav-bar (导航栏)
- van-tab (标签页)
- van-tabs (标签页容器)
- van-tabbar (标签栏)
- van-tabbar-item (标签栏项)
- van-sidebar (侧边导航)
- van-sidebar-item (侧边导航项)
- van-index-bar (索引栏)
- van-index-anchor (索引锚点)

#### 业务组件 (7 个)

- van-goods-action (商品导购)
- van-goods-action-button (商品导购按钮)
- van-goods-action-icon (商品导购图标)
- van-submit-bar (提交订单栏)
- van-grid (宫格)
- van-grid-item (宫格项)
- van-swipe-cell (滑动单元格)

#### 其他组件 (4 个)

- van-sticky (粘性定位)
- van-search (搜索)
- van-dropdown-menu (下拉菜单)
- van-dropdown-item (下拉菜单项)
- van-config-provider (全局配置)

### 当前代码结构问题

1. **混合语法**: 同时存在微信小程序语法 (`wxs`, `wx:if`, `bind:tap`) 和 Vue 语法
2. **组件定义方式**: 使用旧的 `VantComponent` 而非 Vue3 组合式 API
3. **类型支持不完整**: props 类型定义较为简单
4. **wxs 依赖**: 依赖微信小程序特有的 wxs 语法做计算

## 技术方案

### 核心技术栈

- **框架**: Vue 3.x
- **语言**: TypeScript 4.x+
- **构建工具**: Vite
- **跨平台**: uni-app
- **组合式 API**: Composition API (setup 语法糖)

### 文件组织结构

每个组件目录包含以下文件：

```
van-[component-name]/
├── props.ts          # 组件props类型定义
├── van-[name].vue    # 组件主文件
├── style.css         # 样式文件
├── demo.vue          # 示例/演示文件
└── index.ts          # 导出文件(可选)
```

### Props 类型定义规范

#### props.ts 文件结构

```typescript
import type { ExtractPropTypes, PropType, CSSProperties } from 'vue'

export const [ComponentName]Props = {
  // 基础类型
  title: {
    type: String,
    default: ''
  },
  // 联合类型
  size: {
    type: String as PropType<'large' | 'normal' | 'small'>,
    default: 'normal'
  },
  // 布尔类型
  disabled: {
    type: Boolean,
    default: false
  },
  // 数字类型
  count: {
    type: Number,
    default: 0
  },
  // 样式类型 - 必须使用 CSSProperties
  customStyle: {
    type: Object as PropType<CSSProperties>,
    default: () => ({})
  },
  // 复杂类型
  options: {
    type: Array as PropType<OptionItem[]>,
    default: () => []
  }
}

export type [ComponentName]PropsType = ExtractPropTypes<typeof [ComponentName]Props>
```

### 组件转换规范

#### 1. Template 转换规则

| 微信小程序语法          | Vue3 uni-app 语法    | 说明               |
| ----------------------- | -------------------- | ------------------ |
| `wx:if`                 | `v-if`               | 条件渲染           |
| `wx:elif`               | `v-else-if`          | 条件渲染           |
| `wx:else`               | `v-else`             | 条件渲染           |
| `wx:for`                | `v-for`              | 列表渲染           |
| `bind:tap`              | `@tap`               | 事件绑定           |
| `bind:input`            | `@input`             | 输入事件           |
| `{{value}}`             | `{{value}}`          | 数据绑定(保持一致) |
| `class="{{className}}"` | `:class="className"` | 动态类名           |
| `style="{{styleObj}}"`  | `:style="styleObj"`  | 动态样式           |

#### 2. Script 转换规范

```typescript
// 微信小程序 (转换前)
VantComponent({
  props: {
    title: String,
    disabled: Boolean
  },
  data: {
    count: 0
  },
  methods: {
    onClick() {
      this.$emit('click');
    }
  }
});

// Vue3 + TypeScript (转换后)
<script lang="ts" setup>
import { ref, computed } from 'vue'
import { [ComponentName]Props, type [ComponentName]PropsType } from './props'

const props = withDefaults(defineProps<[ComponentName]PropsType>(), [ComponentName]Props)
const emit = defineEmits<{
  click: [event: Event]
  input: [value: string]
}>()

const count = ref(0)

const onClick = (event: Event) => {
  emit('click', event)
}
</script>
```

#### 3. wxs 计算逻辑转换

将 wxs 中的计算逻辑转换为 Vue3 computed 属性：

```typescript
// 原 wxs 逻辑
function titleStyle(data) {
  return style([
    {
      "max-width": addUnit(data.titleWidth),
      "min-width": addUnit(data.titleWidth),
    },
    data.titleStyle,
  ]);
}

// 转换为 computed
const titleStyle = computed(() => {
  return {
    "max-width": addUnit(props.titleWidth),
    "min-width": addUnit(props.titleWidth),
    ...props.titleStyle, // 直接使用 CSSProperties 对象
  };
});
```

### 通用工具函数

已在 `app/src/uni_modules/vant/utils` 目录实现的工具函数：

1. **bem()** - BEM 类名生成器 ✅

   - 支持字符串、数字、数组、对象等多种配置
   - 自动添加 `van-` 前缀
   - 完整的 TypeScript 类型支持

2. **addUnit()** - 自动添加单位 ✅

   - 自动为纯数字添加 `px` 单位
   - 支持 null/undefined 安全处理
   - 保留已有单位的字符串

3. **commonProps** - 通用 Props 定义 ✅
   - `customClass` - 自定义类名
   - `customStyle` - 自定义样式对象 (CSSProperties 类型)
   - `commonTransitionProps` - 动画相关 Props
   - `commonButtonProps` - 按钮相关 Props
   - `linkProps` - 链接跳转相关 Props

**待补充的工具函数**：

- **isDef()** - 值是否已定义
- **isObj()** - 是否为对象

**样式规范**：

- 所有样式相关的 props 必须使用 `CSSProperties` 类型
- 不接受样式字符串，确保类型安全

**工具函数使用示例**：

```typescript
// 在组件中使用已实现的工具函数
import { bem, addUnit, commonProps } from "../utils";
import type { CSSProperties } from "vue";

// BEM 类名生成
const className = bem("cell", [
  props.size,
  {
    center: props.center,
    required: props.required,
    clickable: props.isLink || props.clickable,
  },
]);
// 输出: "van-cell van-cell--large van-cell--center van-cell--clickable"

// 自动添加单位
const style = computed(() => ({
  width: addUnit(props.width), // "100" → "100px"
  height: addUnit(props.height), // "50%" → "50%"
  ...props.customStyle, // 直接合并 CSSProperties 对象
}));

// 使用通用 Props，确保样式类型安全
const props = defineProps({
  ...commonProps, // customClass, customStyle (CSSProperties)
  title: String,
  value: String,
  // 自定义样式 props 必须指定 CSSProperties 类型
  titleStyle: {
    type: Object as PropType<CSSProperties>,
    default: () => ({}),
  },
});
```

## 详细转换计划

### 阶段一：基础设施建设 (Week 1-2)

1. **工具函数库开发** ✅ **部分完成**

   - ✅ BEM 类名生成器已实现
   - ✅ 自动添加单位工具已实现
   - ✅ 通用 Props 类型已定义
   - ⏳ 补充类型检查工具 (isDef, isObj)

2. **通用 Props 类型定义** ✅ **已完成**

   - ✅ 定义常用的 Props 类型 (commonProps)
   - ✅ 建立 Props 继承体系 (commonTransitionProps, commonButtonProps, linkProps)

3. **样式适配**
   - ⏳ CSS 变量系统建立
   - ⏳ 主题定制支持
   - 主题定制支持

### 阶段二：核心组件转换 (Week 3-6)

按优先级转换基础组件：

**高优先级** (Week 3-4)

1. van-button
2. van-cell / van-cell-group
3. van-icon
4. van-popup
5. van-overlay

**中优先级** (Week 5) 6. van-field 7. van-dialog 8. van-toast 9. van-loading 10. van-image

**低优先级** (Week 6) 11. van-checkbox / van-checkbox-group 12. van-radio / van-radio-group 13. van-switch 14. van-stepper

### 阶段三：表单和反馈组件 (Week 7-10)

**表单组件**

- van-picker / van-picker-column
- van-datetime-picker
- van-cascader
- van-rate
- van-slider
- van-uploader

**反馈组件**

- van-action-sheet
- van-share-sheet
- van-notify
- van-empty
- van-skeleton

### 阶段四：展示和导航组件 (Week 11-14)

**展示组件**

- van-card
- van-tag
- van-progress / van-circle
- van-count-down
- van-notice-bar
- van-calendar
- van-steps

**导航组件**

- van-nav-bar
- van-tabs / van-tab
- van-tabbar / van-tabbar-item
- van-sidebar / van-sidebar-item

### 阶段五：业务和高级组件 (Week 15-18)

**业务组件**

- van-goods-action 系列
- van-submit-bar
- van-grid / van-grid-item
- van-swipe-cell

**高级组件**

- van-tree-select
- van-area
- van-dropdown-menu / van-dropdown-item
- van-index-bar / van-index-anchor

### 阶段六：测试和优化 (Week 19-20)

1. **单元测试编写**
2. **跨平台兼容性测试**
3. **性能优化**
4. **文档完善**

## 质量保证

### 1. TypeScript 类型检查

- 所有 props 必须有完整类型定义
- 事件参数类型必须明确
- 使用严格的 TypeScript 配置

### 2. 功能一致性测试

- 对比原组件功能
- API 保持向前兼容
- 交互行为保持一致

### 3. 跨平台测试

- 微信小程序
- H5
- App（iOS/Android）
- 支付宝小程序等

### 4. 性能监控

- 组件渲染性能
- 包体积大小
- 运行时内存占用

## 风险和挑战

### 技术风险

1. **wxs 依赖**: 部分复杂计算逻辑依赖 wxs，需要完全重写
2. **平台差异**: uni-app 在不同平台的兼容性问题
3. **性能影响**: Vue3 在小程序环境的性能表现
4. **类型复杂性**: 复杂组件的 TypeScript 类型定义

### 解决方案

1. **逐步重构**: 分阶段进行，降低风险
2. **充分测试**: 建立完整的测试体系
3. **回退机制**: 保留原始实现作为备份
4. **性能优化**: 针对性的性能优化措施

## 成功标准

### 功能标准

- [ ] 所有 67 个组件功能完整转换
- [ ] API 保持 100%兼容
- [ ] 支持所有原有特性

### 质量标准

- [ ] TypeScript 类型覆盖率 100%
- [ ] 单元测试覆盖率 >= 80%
- [ ] 所有平台功能正常

### 性能标准

- [ ] 包体积不超过原版本 120%
- [ ] 渲染性能不低于原版本
- [ ] 内存占用保持稳定

## 时间规划

| 阶段     | 时间周期   | 主要内容           | 交付物       | 状态       |
| -------- | ---------- | ------------------ | ------------ | ---------- |
| 基础设施 | Week 1-2   | 工具函数、类型定义 | 基础工具库   | ✅ 70%完成 |
| 核心组件 | Week 3-6   | 15 个核心组件转换  | 可用组件库   | ⏳ 待开始  |
| 表单反馈 | Week 7-10  | 表单和反馈组件     | 完整表单方案 | ⏳ 待开始  |
| 展示导航 | Week 11-14 | 展示和导航组件     | 完整 UI 方案 | ⏳ 待开始  |
| 业务高级 | Week 15-18 | 业务和高级组件     | 完整组件库   | ⏳ 待开始  |
| 测试优化 | Week 19-20 | 测试、优化、文档   | 生产就绪版本 | ⏳ 待开始  |

## 结论

此次转换将为项目带来现代化的开发体验，提供更好的类型安全和跨平台支持。通过分阶段实施和严格的质量控制，确保转换过程平滑且高质量完成。
