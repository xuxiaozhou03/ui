<template>
  <div class="van-panel van-hairline--top-bottom custom-class">
    <van-cell
      v-if="title || desc || status"
      :title="title"
      :label="desc"
      :value="status"
      class="header-class"
      value-class="van-panel__header-value"
    />
    <slot v-else name="header" />
    <div class="van-panel__content">
      <slot />
    </div>
    <div class="van-panel__footer van-hairline--top footer-class">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { panelProps } from "./props";

defineProps(panelProps);
</script>

<style>
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
