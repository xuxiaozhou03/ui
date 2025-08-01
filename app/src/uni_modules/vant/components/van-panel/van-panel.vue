<template>
  <view class="van-panel van-hairline--top-bottom custom-class">
    <van-cell
      wx:if="{{ title || desc || status }}"
      title="{{ title }}"
      label="{{ desc }}"
      value="{{ status }}"
      custom-class="header-class"
      value-class="van-panel__header-value"
    />
    <slot wx:else name="header" />

    <view class="van-panel__content">
      <slot />
    </view>

    <view class="van-panel__footer van-hairline--top footer-class">
      <slot name="footer" />
    </view>
  </view>
</template>
<script lang="ts" setup>
import { VantComponent } from "../common/component";

VantComponent({
  classes: ["header-class", "footer-class"],

  props: {
    desc: String,
    title: String,
    status: String,
  },
});

// 转换为 Vue 3 的 computed 属性
</script>
<style>
@import "../common/index.wxss";
.van-panel {
  background: var(--panel-background-color, #fff);
}
.van-panel__header-value {
  color: var(--panel-header-value-color, #ee0a24);
}
.van-panel__footer {
  padding: var(--panel-footer-padding, 8px 16px);
}
.van-panel__footer:empty {
  display: none;
}
</style>
