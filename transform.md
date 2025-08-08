# Vant Weapp 到 Uni-app Vue3 + TypeScript 转换文档

## 项目概述

本文档描述了将 `vant-weapp-dev/packages` 下的微信小程序组件转换为 uni-app + Vue3 + setup + TypeScript 组件的完整流程和规范。

## 转换目标

- **源代码**: vant-weapp 微信小程序组件
- **目标**: uni-app Vue3 组件 (Composition API + setup + TypeScript)
- **兼容性**: 跨平台支持 (微信小程序、H5、App 等)
- **功能**: 保持与源组件完全一致的功能和 API

## 技术栈对比

### 源技术栈 (vant-weapp)

- 微信小程序原生框架
- wxml 模板语法
- wxss 样式
- JavaScript/TypeScript
- VantComponent 组件定义

### 目标技术栈 (uni-app)

- Vue 3 Composition API
- Template 模板语法
- CSS/SCSS 样式
- TypeScript
- defineComponent + setup 语法

## 转换规则

### 1. 文件结构转换

#### 源文件结构

```
button/
├── index.ts          # 组件逻辑
├── index.wxml        # 模板
├── index.wxss        # 样式
└── index.wxs         # 小程序脚本
```

### 转换后的文件结构

```
app/src/uni_modules/vant-weapp-uni/
├── utils/
│   └── index.ts          # 公共工具函数 (bem, addUnit 等)
└── components/
    ├── van-button/
    │   ├── van-button.vue    # 主组件文件
    │   ├── props.ts          # Props 类型定义
    │   ├── style.css         # 样式文件 (来自 vant-weapp build)
    │   └── index.ts          # 导出文件
    └── van-icon/
        ├── van-icon.vue      # 主组件文件
        ├── props.ts          # Props 类型定义
        ├── style.css         # 样式文件 (来自 vant-weapp build)
        └── index.ts          # 导出文件
```

### 新的代码结构规范

#### 1. Props 类型定义 (props.ts)

```typescript
import type { ExtractPropTypes, PropType, CSSProperties } from "vue";

export const buttonProps = {
  // 有默认值的必须字段
  type: {
    type: String as PropType<
      "default" | "primary" | "info" | "danger" | "warning"
    >,
    default: "default",
  },
  classPrefix: {
    type: String,
    default: "van-icon",
  },

  // 可选字段，无需 default
  disabled: Boolean,
  loading: Boolean,
  color: String,

  // CSSProperties 类型的样式对象
  customStyle: Object as PropType<CSSProperties>,
} as const;

export type ButtonProps = ExtractPropTypes<typeof buttonProps>;
```

#### 2. 工具函数统一管理 (utils/index.ts)

```typescript
export function bem(name: string, modifiers?: any[]): string {
  // BEM 命名规范实现
}

export function addUnit(
  value: string | number | null | undefined
): string | undefined {
  // 添加 px 单位，支持 undefined 返回
  if (value == null) return undefined;
  // ...
}
```

#### 3. 组件文件使用 CSSProperties 直接合并

```vue
<script setup lang="ts">
import type { CSSProperties } from "vue";

const computedStyle = computed((): CSSProperties => {
  const baseStyles: CSSProperties = {};

  // 直接合并 customStyle 对象
  if (props.customStyle) {
    Object.assign(baseStyles, props.customStyle);
  }

  // 设置其他样式
  if (props.color) {
    baseStyles.color = props.color;
  }

  return baseStyles;
});
</script>
```

#### 3. 组件文件使用 CSSProperties 类型

```vue
<script setup lang="ts">
import type { CSSProperties } from "vue";

const rootStyle = computed(
  (): CSSProperties => ({
    color: props.color,
    fontSize: addUnit(props.size),
  })
);
</script>
```

### 2. 组件定义转换

#### 源代码 (vant-weapp)

```typescript
import { VantComponent } from "../common/component";

VantComponent({
  props: {
    type: {
      type: String,
      value: "default",
    },
    plain: Boolean,
    disabled: Boolean,
    // ...
  },

  data: {
    baseStyle: "",
  },

  methods: {
    onClick(event) {
      this.$emit("click", event);
    },
  },
});
```

#### 目标代码 (uni-app Vue3)

```vue
<script setup lang="ts">
import { computed, ref } from "vue";

interface Props {
  type?: "default" | "primary" | "info" | "warning" | "danger";
  plain?: boolean;
  disabled?: boolean;
  // ...
}

const props = withDefaults(defineProps<Props>(), {
  type: "default",
  plain: false,
  disabled: false,
  // ...
});

const emit = defineEmits<{
  click: [event: Event];
  // ...
}>();

const baseStyle = ref("");

const onClick = (event: Event) => {
  emit("click", event);
};
</script>
```

### 3. 模板转换

#### wxml → Vue Template

- `wx:if` → `v-if`
- `wx:for` → `v-for`
- `wx:else` → `v-else`
- `bindtap` → `@tap` 或 `@click`
- `{{}}` 插值语法保持不变
- `slot` → `<slot>`

#### 示例转换

```xml
<!-- 源代码 (wxml) -->
<button
  wx:if="{{!loading}}"
  class="van-button {{type}}"
  bindtap="onClick"
>
  <text>{{text}}</text>
</button>

<!-- 目标代码 (Vue template) -->
<button
  v-if="!loading"
  :class="cn('van-button', type)"
  @tap="onClick"
>
  <text>{{ text }}</text>
</button>
```

#### 使用 cn 函数优化类名合并

为了更好地处理类名合并和去重，所有组件的 `:class` 属性都应使用 `cn` 函数进行包裹：

```typescript
// utils/cn.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

```vue
<!-- 使用数组方式 (不推荐) -->
:class="[ 'custom-class', bem('button', [type, size, { loading, disabled }]),
hairline ? 'van-hairline--surround' : '' ]"

<!-- 使用 cn 函数 (推荐) -->
:class="cn( 'custom-class', bem('button', [type, size, { loading, disabled }]),
hairline && 'van-hairline--surround' )"
```

`cn` 函数的优势：

- 自动过滤 `false`、`null`、`undefined` 等无效值
- 支持条件类名：`condition && 'class-name'`
- 自动去重重复的类名
- 与 Tailwind CSS 完美集成

### 4. 样式转换

#### wxss → CSS 文件分离

- 从 vant-weapp-dev/build/[component]/index.wxss 提取官方样式
- 移除 @import 语句
- 创建独立的 style.css 文件
- 保持原有的 CSS 变量和 BEM 命名规范
- 在 Vue 组件中通过 @import 引用

#### 转换示例

```css
/* style.css - 来自 vant-weapp 官方构建 */
.van-button {
  -webkit-text-size-adjust: 100%;
  align-items: center;
  -webkit-appearance: none;
  appearance: none;
  border-radius: var(--button-border-radius, 2px);
  box-sizing: border-box;
  /* ... 更多样式 */
}

.van-button--primary {
  background: var(--button-primary-background-color, #07c160);
  border: var(--button-border-width, 1px) solid var(
      --button-primary-border-color,
      #07c160
    );
  color: var(--button-primary-color, #fff);
}
```

```vue
<!-- van-button.vue -->
<style>
@import "./style.css";
</style>
```

### 5. 事件系统转换

#### 事件名映射

- `bindtap` → `@tap` (uni-app) 或 `@click` (H5)
- `bindinput` → `@input`
- `bindchange` → `@change`
- `bind*` → `@*`

#### 自定义事件

```typescript
// 源代码
this.$emit("click", event);

// 目标代码
const emit = defineEmits<{
  click: [event: Event];
}>();

emit("click", event);
```

### 6. 生命周期转换

#### 小程序 → Vue3 Composition API

- `attached` → `onMounted`
- `detached` → `onUnmounted`
- `ready` → `onMounted`

```typescript
// 源代码
VantComponent({
  attached() {
    // 组件初始化
  },
  detached() {
    // 组件销毁
  },
});

// 目标代码
import { onMounted, onUnmounted } from "vue";

onMounted(() => {
  // 组件初始化
});

onUnmounted(() => {
  // 组件销毁
});
```

### 7. 响应式数据转换

#### data → ref/reactive

```typescript
// 源代码
data: {
  loading: false,
  userInfo: {}
}

// 目标代码
const loading = ref(false);
const userInfo = reactive({});
```

#### computed 计算属性

```typescript
// 源代码 (wxs)
computed: {
  buttonClass() {
    return `van-button van-button--${this.data.type}`;
  }
}

// 目标代码
const buttonClass = computed(() => {
  return `van-button van-button--${props.type}`;
});
```

## 转换步骤

### 第一步: 分析源组件结构

1. 解析 AST 获取组件信息
2. 提取 props 定义
3. 提取 data 数据
4. 提取 methods 方法
5. 分析模板结构
6. 提取样式文件

### 第二步: 生成类型定义

```typescript
interface VanButtonProps {
  type?: "default" | "primary" | "info" | "warning" | "danger";
  size?: "large" | "normal" | "small" | "mini";
  plain?: boolean;
  round?: boolean;
  square?: boolean;
  disabled?: boolean;
  loading?: boolean;
  // ...
}

interface VanButtonEmits {
  click: [event: Event];
  // ...
}
```

### 第三步: 转换组件模板

1. 解析 wxml 语法树
2. 转换指令语法
3. 转换事件绑定
4. 转换插值表达式
5. 处理条件渲染和列表渲染

### 第四步: 转换组件逻辑

1. 创建 setup 函数
2. 转换 props 定义
3. 转换响应式数据
4. 转换计算属性
5. 转换方法定义
6. 处理生命周期

### 第五步: 转换样式

1. 从 vant-weapp-dev/build/[component]/index.wxss 提取官方构建样式
2. 移除 @import 语句
3. 创建独立的 style.css 文件
4. 保持 CSS 变量和主题系统
5. 在组件中引用样式文件

## 特殊处理

### 微信小程序 API 转换

```typescript
// wx.* API 需要转换为 uni.* API
wx.showToast() → uni.showToast()
wx.navigateTo() → uni.navigateTo()
wx.getUserProfile() → uni.getUserProfile()
```

### 平台兼容性处理

```typescript
// 使用条件编译处理平台差异
// #ifdef MP-WEIXIN
// 微信小程序特定代码
// #endif

// #ifdef H5
// H5 特定代码
// #endif
```

### 组件引用转换

```typescript
// 源代码
import { VantComponent } from "../common/component";

// 目标代码
import { defineComponent } from "vue";
```

## 质量保证

### 1. 功能一致性检查

- 对比 props API
- 对比 events API
- 对比渲染结果
- 对比交互行为

### 2. 性能优化

- 使用 shallowRef 优化大对象
- 合理使用 computed 缓存
- 避免不必要的响应式转换

### 3. 类型安全

- 完整的 TypeScript 类型定义
- Props 类型检查
- Emits 类型检查

## 转换实现方案

通过直接读取和分析源代码文件，手动进行转换：

### 转换流程

1. **读取源文件**: 分析 `vant-weapp-dev/packages/[component]/` 目录下的文件

   - `index.ts` - 组件逻辑和配置
   - `index.wxml` - 模板结构
   - `index.wxss` - 样式文件
   - `index.wxs` - 辅助脚本

2. **解析组件结构**: 手动分析源代码获取

   - Props 定义和默认值
   - Data 数据定义
   - Methods 方法定义
   - 生命周期函数
   - 事件处理

3. **生成目标代码**: 基于分析结果生成
   - TypeScript 接口定义
   - Vue3 Composition API 代码
   - 模板转换
   - 样式适配

### 实施步骤

1. **选择组件**: 从 vant-weapp 组件库中选择要转换的组件
2. **分析源码**: 逐个分析源文件的结构和功能
3. **手动转换**: 按照转换规则逐步生成目标代码
4. **测试验证**: 确保功能和 API 的一致性

## 实际转换示例: Button 组件

### 源代码分析

通过读取 `vant-weapp-dev/packages/button/` 目录下的文件：

1. **index.ts** - 组件配置和逻辑
2. **index.wxml** - 模板结构
3. **index.wxs** - 计算函数
4. **index.wxss** - 样式文件

### 转换后的文件结构

```
app/src/uni_modules/vant-weapp-uni/components/van-button/
├── van-button.vue    # 主组件文件
└── index.ts          # 导出文件
```

### 关键转换点

#### 1. Props 转换

```typescript
// 源代码 - vant-weapp
props: {
  type: { type: String, value: 'default' },
  disabled: Boolean,
  loading: Boolean,
}

// 转换后 - Vue3 TypeScript
interface Props {
  type?: 'default' | 'primary' | 'info' | 'danger' | 'warning'
  disabled?: boolean
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'default',
  disabled: false,
  loading: false,
})
```

#### 1.1 类名 Props 转换

将 `xx-class` 属性转换为可配置的 props，提高组件的灵活性：

```typescript
// props.ts
export const buttonProps = {
  // 基础类名 props
  customClass: {
    type: String,
    default: "",
  },
  hoverClass: {
    type: String,
    default: "van-button--active",
  },
  loadingClass: {
    type: String,
    default: "",
  },
  // 其他 props...
} as const;
```

```vue
<!-- 使用方式 -->
<template>
  <button
    :class="
      cn(props.customClass, bem('button', [type, size, { loading, disabled }]))
    "
    :hover-class="disabled || loading ? '' : props.hoverClass"
  >
    <van-loading :custom-class="props.loadingClass" />
  </button>
</template>
```

常见的类名 props 包括：

- `customClass`: 自定义根元素类名
- `hoverClass`: 悬停状态类名
- `loadingClass`: 加载状态类名
- `infoClass`: 信息提示类名
- `iconClass`: 图标类名

#### 1.2 类名 Props 使用示例

```vue
<!-- 使用自定义类名 props -->
<template>
  <!-- 基础使用 -->
  <van-button type="primary">默认按钮</van-button>

  <!-- 自定义根类名 -->
  <van-button type="primary" custom-class="my-custom-button">
    自定义样式按钮
  </van-button>

  <!-- 自定义悬停效果 -->
  <van-button type="primary" hover-class="my-custom-hover">
    自定义悬停效果
  </van-button>

  <!-- 自定义加载样式 -->
  <van-button type="primary" loading loading-class="my-custom-loading">
    自定义加载样式
  </van-button>

  <!-- 图标按钮自定义 -->
  <van-button type="primary" icon="star" icon-class="my-custom-icon">
    自定义图标样式
  </van-button>

  <!-- Icon 组件使用 -->
  <van-icon
    name="star"
    info="99+"
    custom-class="my-icon"
    info-class="my-icon__info"
  />
</template>

<style>
.my-custom-button {
  border-radius: 20px !important;
  background: linear-gradient(45deg, #ff6b6b, #feca57) !important;
}

.my-custom-hover {
  transform: scale(1.05);
  transition: transform 0.2s;
}

.my-custom-loading {
  color: #fff !important;
}

.my-custom-icon {
  color: #feca57 !important;
}

.my-icon {
  color: #1989fa !important;
  font-size: 28px !important;
}

.my-icon__info {
  background: #07c160 !important;
  color: #fff !important;
}
</style>
```

#### 2. 模板转换

```xml
<!-- 源代码 wxml -->
<button
  wx:if="{{!loading}}"
  class="van-button {{type}}"
  bindtap="onClick"
>
  <van-icon wx:if="{{icon}}" name="{{icon}}" />
  <view class="van-button__text">
    <slot />
  </view>
</button>

<!-- 转换后 Vue template -->
<button
  v-if="!loading"
  :class="cn(
    'custom-class',
    bem('button', [type, size, { loading, disabled }]),
    hairline && 'van-hairline--surround'
  )"
  @tap="onClick"
>
  <van-icon v-if="icon" :name="icon" />
  <view class="van-button__text">
    <slot />
  </view>
</button>
```

#### 3. 完整组件转换示例

```vue
<template>
  <button
    :class="
      cn(
        'custom-class',
        bem('button', [
          type,
          size,
          {
            block,
            round,
            plain,
            square,
            loading,
            disabled,
            hairline,
            unclickable: disabled || loading,
          },
        ]),
        hairline && 'van-hairline--surround'
      )
    "
    @tap="onClick"
  >
    <template v-if="loading">
      <van-loading />
    </template>
    <template v-else>
      <van-icon v-if="icon" :name="icon" />
      <view class="van-button__text">
        <slot />
      </view>
    </template>
  </button>
</template>

<script setup lang="ts">
import { bem, cn } from "../../utils";
import { buttonProps } from "./props";

const props = defineProps(buttonProps);
const emit = defineEmits<{
  click: [event: Event];
}>();

const onClick = (event: Event) => {
  emit("click", event);
};
</script>

<style>
@import "./style.css";
</style>
```

#### 3. 计算属性转换

```typescript
// 源代码 wxs
function rootStyle(data) {
  if (!data.color) return data.customStyle;
  return style([properties, data.customStyle]);
}

// 转换后 Vue3 computed
const rootStyle = computed(() => {
  if (!props.color) return props.customStyle;
  return { ...props.customStyle, color: props.color };
});
```

#### 4. 事件处理转换

```typescript
// 源代码
methods: {
  onClick(event) {
    this.$emit('click', event);
  }
}

// 转换后
const emit = defineEmits<{
  click: [event: Event]
}>()

const onClick = (event: Event) => {
  emit('click', event)
}
```

### 转换后的完整组件

已生成完整的组件文件，新的代码结构包含：

- ✅ **Props 类型定义分离**: 使用 `const xxProps = {}` + `ExtractPropTypes` 模式
- ✅ **CSSProperties 类型支持**: 样式对象使用 Vue 的 CSSProperties 类型
- ✅ **样式文件分离**: 使用独立的 style.css 文件，来自 vant-weapp 官方构建
- ✅ **工具函数统一管理**: bem、addUnit 等函数在 utils 目录统一管理
- ✅ **完整的 TypeScript 类型定义**: 类型安全和智能提示
- ✅ **Vue3 Composition API 语法**: 现代化的组件开发方式
- ✅ **原有的所有 Props 和事件**: 功能完全保持一致
- ✅ **条件编译支持**: 微信小程序 API 兼容
- ✅ **样式完全保持一致**: 保持原有的 BEM 命名和 CSS 变量

### 使用方式

```vue
<template>
  <van-button
    type="primary"
    :loading="loading"
    :custom-style="buttonStyle"
    @click="handleClick"
  >
    点击按钮
  </van-button>

  <van-icon
    name="star"
    :size="20"
    color="#ff6b6b"
    :custom-style="iconStyle"
    @click="handleIconClick"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { CSSProperties } from "vue";
import { VanButton } from "@/uni_modules/vant-weapp-uni/components/van-button";
import { VanIcon } from "@/uni_modules/vant-weapp-uni/components/van-icon";

const loading = ref(false);

// 样式对象，获得完整的类型提示
const buttonStyle: CSSProperties = {
  marginTop: "20px",
  borderRadius: "8px",
};

const iconStyle: CSSProperties = {
  marginRight: "10px",
};

const handleClick = () => {
  console.log("按钮被点击");
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 2000);
};

const handleIconClick = () => {
  console.log("图标被点击");
};
</script>
```

### 类型提示示例

通过 TypeScript 类型定义，开发时可以获得完整的类型提示：

```typescript
// Button 组件的 Props 类型
type ButtonType = "default" | "primary" | "info" | "danger" | "warning";
type ButtonSize = "normal" | "large" | "small" | "mini";

// Icon 组件的 Props 类型
type IconInfo = string | number | null;
```

通过这套转换规范和工具，可以确保 vant-weapp 组件完整、准确地转换为 uni-app Vue3 组件，保持功能一致性的同时获得更好的开发体验和跨平台兼容性。

## 更多转换示例

### Icon 组件转换

#### 源代码特点

- 支持字体图标和图片两种模式
- 包含 wxs 计算函数
- 样式动态计算

#### 转换关键点

1. **条件渲染**: `wx:if` → `v-if`
2. **计算属性**: wxs 函数 → Vue computed
3. **样式处理**: 动态样式计算
4. **类型安全**: 完整的 TypeScript 支持

### 转换最佳实践

#### 1. 组件命名规范

- 文件名: `van-[component].vue`
- 组件名: `VanComponent`
- 类名: 保持 BEM 规范

#### 2. 类型定义规范

```typescript
// Props 接口定义
interface Props {
  // 可选属性使用 ?
  type?: "default" | "primary";
  // 有默认值的属性
  size?: string | number;
  // 布尔值属性
  disabled?: boolean;
}

// 事件接口定义
interface Emits {
  click: [event: Event];
  change: [value: string];
}
```

#### 3. 计算属性转换模式

```typescript
// wxs 转 computed 的标准模式
const computedValue = computed(() => {
  // 转换 wxs 逻辑
  return processLogic(props);
});
```

#### 4. 样式处理规范

- 保持原有 CSS 变量
- 兼容性前缀 (-webkit- + 标准属性)
- BEM 命名规范不变

#### 5. 平台兼容性处理

```typescript
// 微信小程序特定 API
// #ifdef MP-WEIXIN
// @ts-ignore
uni.someWxAPI();
// #endif

// H5 特定处理
// #ifdef H5
// H5 specific code
// #endif
```

## 已转换组件列表

✅ **van-button** - 按钮组件

- 完整的 Props 和事件支持
- 加载状态、禁用状态
- 多种样式类型和尺寸
- 微信小程序 API 兼容

✅ **van-icon** - 图标组件

- 字体图标和图片支持
- 动态样式计算
- 信息提示点支持

## 待转换组件

根据 `vant-weapp-dev/packages` 目录，还有以下组件待转换：

- van-loading (加载中)
- van-cell (单元格)
- van-popup (弹出层)
- van-toast (轻提示)
- van-dialog (对话框)
- van-field (输入框)
- 等 60+ 个组件

## 转换质量检查

### 功能一致性

- [ ] Props API 完全一致
- [ ] Events API 完全一致
- [ ] 视觉效果一致
- [ ] 交互行为一致

### 代码质量

- [ ] TypeScript 类型完整
- [ ] 无 ESLint 错误
- [ ] 性能优化
- [ ] 跨平台兼容

### 文档完善

- [ ] 使用示例
- [ ] API 文档
- [ ] 迁移指南
